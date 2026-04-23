import { DiagnosisService } from './diagnosis.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { Diagnosis } from './diagnosis.entity';
export declare class DiagnosisController {
    private readonly diagnosisService;
    constructor(diagnosisService: DiagnosisService);
    private static readonly uploadOptions;
    analyzeImage(file: Express.Multer.File, dto: CreateDiagnosisDto, req: any): Promise<Diagnosis>;
    analyzeAudio(file: Express.Multer.File, dto: CreateDiagnosisDto, req: any): Promise<Diagnosis>;
    analyzeVideo(file: Express.Multer.File, dto: CreateDiagnosisDto, req: any): Promise<Diagnosis>;
    findAll(page: number, limit: number, req: any): Promise<{
        data: Diagnosis[];
        total: number;
        page: number;
        limit: number;
    }>;
    findById(id: string, req: any): Promise<Diagnosis>;
    delete(id: string, req: any): Promise<{
        message: string;
    }>;
}
