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
exports.DiagnosisService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const diagnosis_entity_1 = require("./diagnosis.entity");
const ai_service_1 = require("../../shared/ai/ai.service");
const upload_service_1 = require("../../shared/upload/upload.service");
let DiagnosisService = class DiagnosisService {
    constructor(diagnosisRepository, aiService, uploadService) {
        this.diagnosisRepository = diagnosisRepository;
        this.aiService = aiService;
        this.uploadService = uploadService;
    }
    extractCarInfo(dto, aiProblem) {
        if (dto.carMake?.toLowerCase() !== 'unknown') {
            return { carMake: dto.carMake, carModel: dto.carModel };
        }
        const match = aiProblem.match(/^([A-Z][a-zA-Z]+)\s+([A-Z][a-zA-Z0-9]+)\s*[—-]/);
        if (match) {
            return { carMake: match[1], carModel: match[2] };
        }
        return { carMake: 'Unknown', carModel: 'Vehicle' };
    }
    async createFromImage(file, dto, userId) {
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
    async createFromAudio(file, dto, userId) {
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
    async createFromVideo(file, dto, userId) {
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
    async findAll(page = 1, limit = 10, userId) {
        const [data, total] = await this.diagnosisRepository.findAndCount({
            where: userId ? { userId } : {},
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        return { data, total, page, limit };
    }
    async findById(id, userId) {
        const whereClause = { id };
        if (userId) {
            whereClause.userId = userId;
        }
        const diagnosis = await this.diagnosisRepository.findOne({ where: whereClause });
        if (!diagnosis) {
            throw new common_1.NotFoundException(`Diagnosis with id ${id} not found`);
        }
        return diagnosis;
    }
    async delete(id, userId) {
        const diagnosis = await this.findById(id, userId);
        await this.diagnosisRepository.remove(diagnosis);
    }
};
exports.DiagnosisService = DiagnosisService;
exports.DiagnosisService = DiagnosisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(diagnosis_entity_1.Diagnosis)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ai_service_1.AiService,
        upload_service_1.UploadService])
], DiagnosisService);
//# sourceMappingURL=diagnosis.service.js.map