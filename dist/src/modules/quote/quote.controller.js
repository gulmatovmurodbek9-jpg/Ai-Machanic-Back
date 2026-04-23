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
exports.QuoteController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const quote_service_1 = require("./quote.service");
const create_quote_dto_1 = require("./dto/create-quote.dto");
const quote_entity_1 = require("./quote.entity");
let QuoteController = class QuoteController {
    constructor(quoteService) {
        this.quoteService = quoteService;
    }
    async checkQuote(dto) {
        return this.quoteService.checkQuote(dto);
    }
    async findById(id) {
        return this.quoteService.findById(id);
    }
    async findByDiagnosisId(diagnosisId) {
        return this.quoteService.findByDiagnosisId(diagnosisId);
    }
};
exports.QuoteController = QuoteController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Submit a mechanic quote for AI fairness evaluation' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Quote evaluated', type: quote_entity_1.Quote }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Diagnosis not found' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_quote_dto_1.CreateQuoteDto]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "checkQuote", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get quote by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Quote found', type: quote_entity_1.Quote }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Quote not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('diagnosis/:diagnosisId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all quotes for a diagnosis' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Quotes list', type: [quote_entity_1.Quote] }),
    __param(0, (0, common_1.Param)('diagnosisId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "findByDiagnosisId", null);
exports.QuoteController = QuoteController = __decorate([
    (0, swagger_1.ApiTags)('quote'),
    (0, common_1.Controller)('quote'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [quote_service_1.QuoteService])
], QuoteController);
//# sourceMappingURL=quote.controller.js.map