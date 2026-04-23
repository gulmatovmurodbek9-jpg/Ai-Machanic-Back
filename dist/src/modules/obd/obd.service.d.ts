import { Repository } from 'typeorm';
import { ObdLog } from './obd-log.entity';
import { AiService } from '../../shared/ai/ai.service';
import { CreateObdLogDto } from './dto/create-obd-log.dto';
export declare class ObdService {
    private obdLogRepository;
    private aiService;
    constructor(obdLogRepository: Repository<ObdLog>, aiService: AiService);
    logCodes(dto: CreateObdLogDto): Promise<ObdLog>;
    getLogsByDiagnosisId(diagnosisId: string): Promise<ObdLog[]>;
    getAllCodes(): Promise<Array<{
        code: string;
        description: string;
        severity: string;
    }>>;
    analyze(dto: CreateObdLogDto): Promise<ObdLog>;
}
