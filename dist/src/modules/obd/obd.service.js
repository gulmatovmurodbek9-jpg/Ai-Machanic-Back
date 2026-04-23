"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObdService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const obd_log_entity_1 = require("./obd-log.entity");
const ai_service_1 = require("../../shared/ai/ai.service");
const OBD_CODE_DESCRIPTIONS = {
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
let ObdService = class ObdService {
    constructor(obdLogRepository, aiService) {
        this.obdLogRepository = obdLogRepository;
        this.aiService = aiService;
    }
    async logCodes(dto) {
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
    async getLogsByDiagnosisId(diagnosisId) {
        return this.obdLogRepository.find({
            where: { diagnosisId },
            order: { createdAt: 'DESC' },
        });
    }
    async getAllCodes() {
        return Object.entries(OBD_CODE_DESCRIPTIONS).map(([code, info]) => ({
            code,
            ...info,
        }));
    }
    async analyze(dto) {
        return this.logCodes(dto);
    }
};
exports.ObdService = ObdService;
exports.ObdService = ObdService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(obd_log_entity_1.ObdLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ai_service_1.AiService])
], ObdService);
//# sourceMappingURL=obd.service.js.map