import { Repository } from 'typeorm';
import { Quote } from './quote.entity';
import { AiService } from '../../shared/ai/ai.service';
import { Diagnosis } from '../diagnosis/diagnosis.entity';
import { CreateQuoteDto } from './dto/create-quote.dto';
export declare class QuoteService {
    private quoteRepository;
    private diagnosisRepository;
    private aiService;
    constructor(quoteRepository: Repository<Quote>, diagnosisRepository: Repository<Diagnosis>, aiService: AiService);
    checkQuote(dto: CreateQuoteDto): Promise<Quote>;
    findById(id: string): Promise<Quote>;
    findByDiagnosisId(diagnosisId: string): Promise<Quote[]>;
}
