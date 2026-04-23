import { ObdService } from './obd.service';
import { CreateObdLogDto } from './dto/create-obd-log.dto';
import { ObdLog } from './obd-log.entity';
export declare class ObdController {
    private readonly obdService;
    constructor(obdService: ObdService);
    logCodes(dto: CreateObdLogDto): Promise<ObdLog>;
    getLogsByDiagnosisId(diagnosisId: string): Promise<ObdLog[]>;
    getAllCodes(): Promise<{
        code: string;
        description: string;
        severity: string;
    }[]>;
    analyze(dto: CreateObdLogDto): Promise<ObdLog>;
}
