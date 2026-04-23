import { Repository } from 'typeorm';
import { Diagnosis } from './diagnosis.entity';
import { AiService } from '../../shared/ai/ai.service';
import { UploadService } from '../../shared/upload/upload.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
export declare class DiagnosisService {
    private diagnosisRepository;
    private aiService;
    private uploadService;
    constructor(diagnosisRepository: Repository<Diagnosis>, aiService: AiService, uploadService: UploadService);
    private extractCarInfo;
    createFromImage(file: Express.Multer.File, dto: CreateDiagnosisDto, userId?: number): Promise<Diagnosis>;
    createFromAudio(file: Express.Multer.File, dto: CreateDiagnosisDto, userId?: number): Promise<Diagnosis>;
    createFromVideo(file: Express.Multer.File, dto: CreateDiagnosisDto, userId?: number): Promise<Diagnosis>;
    findAll(page?: number, limit?: number, userId?: number): Promise<{
        data: Diagnosis[];
        total: number;
        page: number;
        limit: number;
    }>;
    findById(id: string, userId?: number): Promise<Diagnosis>;
    delete(id: string, userId?: number): Promise<void>;
}
