import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObdLog } from './obd-log.entity';
import { AiService } from '../../shared/ai/ai.service';
import { CreateObdLogDto } from './dto/create-obd-log.dto';

const OBD_CODE_DESCRIPTIONS: Record<string, { description: string; severity: string }> = {
  P0300: { description: 'Random/Multiple Cylinder Misfire Detected', severity: 'HIGH' },
  P0301: { description: 'Cylinder 1 Misfire Detected', severity: 'HIGH' },
  P0171: { description: 'System Too Lean (Bank 1)', severity: 'MEDIUM' },
  P0172: { description: 'System Too Rich (Bank 1)', severity: 'MEDIUM' },
  P0420: { description: 'Catalyst System Efficiency Below Threshold (Bank 1)', severity: 'MEDIUM' },
  P0442: { description: 'Evaporative Emission Control System Leak Detected (Small Leak)', severity: 'LOW' },
  P0455: { description: 'Evaporative Emission Control System Leak Detected (Large Leak)', severity: 'MEDIUM' },
  P0101: { description: 'Mass Air Flow Sensor Circuit Range/Performance', severity: 'MEDIUM' },
  P0113: { description: 'Intake Air Temperature Sensor Circuit High', severity: 'LOW' },
  P0128: { description: 'Coolant Temperature Below Thermostat Regulating Temperature', severity: 'LOW' },
  P0401: { description: 'Exhaust Gas Recirculation Flow Insufficient Detected', severity: 'MEDIUM' },
  P0500: { description: 'Vehicle Speed Sensor Malfunction', severity: 'HIGH' },
  P0562: { description: 'System Voltage Low', severity: 'HIGH' },
  P0700: { description: 'Transmission Control System Malfunction', severity: 'CRITICAL' },
  P0741: { description: 'Torque Converter Clutch Circuit Performance or Stuck Off', severity: 'HIGH' },
};

@Injectable()
export class ObdService {
  constructor(
    @InjectRepository(ObdLog)
    private obdLogRepository: Repository<ObdLog>,
    private aiService: AiService,
  ) {}

  async logCodes(dto: CreateObdLogDto): Promise<ObdLog> {
    const analysis = await this.aiService.analyzeObdCodes(dto.codes);

    const severities = analysis.map((a) => a.severity);
    const severityOrder = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
    const overallSeverity = severityOrder.find((s) => severities.includes(s)) || 'LOW';

    const log = this.obdLogRepository.create({
      codes: dto.codes,
      diagnosisId: dto.diagnosisId,
      sensorData: dto.sensorData,
      analysis,
      overallSeverity,
    });
    return this.obdLogRepository.save(log);
  }

  async getLogsByDiagnosisId(diagnosisId: string): Promise<ObdLog[]> {
    return this.obdLogRepository.find({
      where: { diagnosisId },
      order: { createdAt: 'DESC' },
    });
  }

  async getAllCodes(): Promise<Array<{ code: string; description: string; severity: string }>> {
    return Object.entries(OBD_CODE_DESCRIPTIONS).map(([code, info]) => ({
      code,
      ...info,
    }));
  }

  async analyze(dto: CreateObdLogDto): Promise<ObdLog> {
    return this.logCodes(dto);
  }
}
