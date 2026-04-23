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
exports.QuoteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const quote_entity_1 = require("./quote.entity");
const ai_service_1 = require("../../shared/ai/ai.service");
const diagnosis_entity_1 = require("../diagnosis/diagnosis.entity");
let QuoteService = class QuoteService {
    constructor(quoteRepository, diagnosisRepository, aiService) {
        this.quoteRepository = quoteRepository;
        this.diagnosisRepository = diagnosisRepository;
        this.aiService = aiService;
    }
    async checkQuote(dto) {
        const diagnosis = await this.diagnosisRepository.findOne({ where: { id: dto.diagnosisId } });
        if (!diagnosis) {
            throw new common_1.NotFoundException(`Diagnosis with id ${dto.diagnosisId} not found`);
        }
        const result = await this.aiService.checkQuoteFairness(diagnosis, dto.quotedAmount);
        const savingsPotential = result.verdict === 'OVERPRICED' && result.recommendedRange
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
    async findById(id) {
        const quote = await this.quoteRepository.findOne({
            where: { id },
            relations: ['diagnosis'],
        });
        if (!quote) {
            throw new common_1.NotFoundException(`Quote with id ${id} not found`);
        }
        return quote;
    }
    async findByDiagnosisId(diagnosisId) {
        return this.quoteRepository.find({
            where: { diagnosisId },
            order: { createdAt: 'DESC' },
        });
    }
};
exports.QuoteService = QuoteService;
exports.QuoteService = QuoteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quote_entity_1.Quote)),
    __param(1, (0, typeorm_1.InjectRepository)(diagnosis_entity_1.Diagnosis)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        ai_service_1.AiService])
], QuoteService);
//# sourceMappingURL=quote.service.js.map