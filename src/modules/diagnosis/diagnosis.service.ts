import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diagnosis } from './diagnosis.entity';
import { AiService } from '../../shared/ai/ai.service';
import { UploadService } from '../../shared/upload/upload.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';

@Injectable()
export class DiagnosisService {
  constructor(
    @InjectRepository(Diagnosis)
    private diagnosisRepository: Repository<Diagnosis>,
    private aiService: AiService,
    private uploadService: UploadService,
  ) {}

  /** When user sends 'Unknown Vehicle', try to parse car make/model from the AI's problem field */
  private extractCarInfo(dto: CreateDiagnosisDto, aiProblem: string): { carMake: string; carModel: string } {
    if (dto.carMake?.toLowerCase() !== 'unknown') {
      return { carMake: dto.carMake, carModel: dto.carModel };
    }
    // Try to parse "Toyota Corolla — some problem" format
    const match = aiProblem.match(/^([A-Z][a-zA-Z]+)\s+([A-Z][a-zA-Z0-9]+)\s*[—-]/);
    if (match) {
      return { carMake: match[1], carModel: match[2] };
    }
    return { carMake: 'Unknown', carModel: 'Vehicle' };
  }

  async createFromImage(file: Express.Multer.File, dto: CreateDiagnosisDto, userId?: number): Promise<Diagnosis> {
    const fileUrl = await this.uploadService.uploadFile(file);
    const base64 = file.buffer.toString('base64');
    const carInfo = {
      make: dto.carMake,
      model: dto.carModel,
      year: dto.carYear,
      description: dto.description,
      language: dto.language,
      city: dto.city,
    };
    const result = await this.aiService.analyzeImage(base64, carInfo);
    const agentData = await this.aiService.runSecondaryAgents(result, carInfo);
    const { carMake, carModel } = this.extractCarInfo(dto, result.problem);

    const diagnosis = this.diagnosisRepository.create({
      carMake,
      carModel,
      carYear: dto.carYear,
      fileUrl,
      fileType: 'image',
      agentData,
      userId,
      ...result,
    });
    return this.diagnosisRepository.save(diagnosis);
  }

  async createFromAudio(file: Express.Multer.File, dto: CreateDiagnosisDto, userId?: number): Promise<Diagnosis> {
    const fileUrl = await this.uploadService.uploadFile(file);
    const carInfo = {
      make: dto.carMake,
      model: dto.carModel,
      year: dto.carYear,
      description: dto.description,
      language: dto.language,
      city: dto.city,
    };
    const result = await this.aiService.analyzeAudio(fileUrl, carInfo);
    const agentData = await this.aiService.runSecondaryAgents(result, carInfo);
    const { carMake, carModel } = this.extractCarInfo(dto, result.problem);

    const diagnosis = this.diagnosisRepository.create({
      carMake,
      carModel,
      carYear: dto.carYear,
      fileUrl,
      fileType: 'audio',
      agentData,
      userId,
      ...result,
    });
    return this.diagnosisRepository.save(diagnosis);
  }

  async createFromVideo(file: Express.Multer.File, dto: CreateDiagnosisDto, userId?: number): Promise<Diagnosis> {
    const fileUrl = await this.uploadService.uploadFile(file);
    const carInfo = {
      make: dto.carMake,
      model: dto.carModel,
      year: dto.carYear,
      description: dto.description,
      language: dto.language,
      city: dto.city,
    };
    const result = await this.aiService.analyzeVideo(fileUrl, carInfo);
    const agentData = await this.aiService.runSecondaryAgents(result, carInfo);
    const { carMake, carModel } = this.extractCarInfo(dto, result.problem);

    const diagnosis = this.diagnosisRepository.create({
      carMake,
      carModel,
      carYear: dto.carYear,
      fileUrl,
      fileType: 'video',
      agentData,
      userId,
      ...result,
    });
    return this.diagnosisRepository.save(diagnosis);
  }

  async findAll(page = 1, limit = 10, userId?: number): Promise<{ data: Diagnosis[]; total: number; page: number; limit: number }> {
    const [data, total] = await this.diagnosisRepository.findAndCount({
      where: userId ? { userId } : {},
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, limit };
  }

  async findById(id: string, userId?: number): Promise<Diagnosis> {
    const whereClause: any = { id };
    if (userId) {
      whereClause.userId = userId;
    }
    const diagnosis = await this.diagnosisRepository.findOne({ where: whereClause });
    if (!diagnosis) {
      throw new NotFoundException(`Diagnosis with id ${id} not found`);
    }
    return diagnosis;
  }

  async delete(id: string, userId?: number): Promise<void> {
    const diagnosis = await this.findById(id, userId);
    await this.diagnosisRepository.remove(diagnosis);
  }
}
