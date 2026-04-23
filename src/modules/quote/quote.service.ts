import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './quote.entity';
import { AiService } from '../../shared/ai/ai.service';
import { Diagnosis } from '../diagnosis/diagnosis.entity';
import { CreateQuoteDto } from './dto/create-quote.dto';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,
    @InjectRepository(Diagnosis)
    private diagnosisRepository: Repository<Diagnosis>,
    private aiService: AiService,
  ) {}

  async checkQuote(dto: CreateQuoteDto): Promise<Quote> {
    const diagnosis = await this.diagnosisRepository.findOne({ where: { id: dto.diagnosisId } });
    if (!diagnosis) {
      throw new NotFoundException(`Diagnosis with id ${dto.diagnosisId} not found`);
    }

    const result = await this.aiService.checkQuoteFairness(diagnosis, dto.quotedAmount);

    const savingsPotential =
      result.verdict === 'OVERPRICED' && result.recommendedRange
        ? dto.quotedAmount - result.recommendedRange.max
        : 0;

    const quote = this.quoteRepository.create({
      diagnosisId: dto.diagnosisId,
      quotedAmount: dto.quotedAmount,
      mechanicName: dto.mechanicName,
      mechanicNotes: dto.mechanicNotes,
      verdict: result.verdict,
      percentageDifference: result.percentageDifference,
      explanation: result.explanation,
      recommendedRange: result.recommendedRange,
      breakdown: result.breakdown,
      negotiationTips: result.negotiationTips,
      savingsPotential: savingsPotential > 0 ? savingsPotential : 0,
    });

    return this.quoteRepository.save(quote);
  }

  async findById(id: string): Promise<Quote> {
    const quote = await this.quoteRepository.findOne({
      where: { id },
      relations: ['diagnosis'],
    });
    if (!quote) {
      throw new NotFoundException(`Quote with id ${id} not found`);
    }
    return quote;
  }

  async findByDiagnosisId(diagnosisId: string): Promise<Quote[]> {
    return this.quoteRepository.find({
      where: { diagnosisId },
      order: { createdAt: 'DESC' },
    });
  }
}
