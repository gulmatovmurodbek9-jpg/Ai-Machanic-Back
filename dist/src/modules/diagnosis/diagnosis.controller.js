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
exports.DiagnosisController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const swagger_1 = require("@nestjs/swagger");
const diagnosis_service_1 = require("./diagnosis.service");
const create_diagnosis_dto_1 = require("./dto/create-diagnosis.dto");
const diagnosis_entity_1 = require("./diagnosis.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let DiagnosisController = class DiagnosisController {
    constructor(diagnosisService) {
        this.diagnosisService = diagnosisService;
    }
    async analyzeImage(file, dto, req) {
        if (!file)
            throw new common_1.BadRequestException('Image file is required');
        return this.diagnosisService.createFromImage(file, dto, req.user?.sub);
    }
    async analyzeAudio(file, dto, req) {
        if (!file)
            throw new common_1.BadRequestException('Audio file is required');
        return this.diagnosisService.createFromAudio(file, dto, req.user?.sub);
    }
    async analyzeVideo(file, dto, req) {
        if (!file)
            throw new common_1.BadRequestException('Video file is required');
        return this.diagnosisService.createFromVideo(file, dto, req.user?.sub);
    }
    async findAll(page = 1, limit = 10, req) {
        return this.diagnosisService.findAll(Number(page), Number(limit), req.user?.sub);
    }
    async findById(id, req) {
        return this.diagnosisService.findById(id, req.user?.sub);
    }
    async delete(id, req) {
        await this.diagnosisService.delete(id, req.user?.sub);
        return { message: 'Diagnosis deleted successfully' };
    }
};
exports.DiagnosisController = DiagnosisController;
DiagnosisController.uploadOptions = {
    storage: (0, multer_1.memoryStorage)(),
};
__decorate([
    (0, common_1.Post)('image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', DiagnosisController.uploadOptions)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['file', 'carMake', 'carModel', 'carYear'],
            properties: {
                file: { type: 'string', format: 'binary' },
                carMake: { type: 'string', example: 'Toyota' },
                carModel: { type: 'string', example: 'Camry' },
                carYear: { type: 'number', example: 2020 },
                description: { type: 'string', example: 'Grinding noise when braking' },
                language: { type: 'string', enum: ['tj', 'ru', 'en'], example: 'tj' },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Upload image for AI diagnosis' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Diagnosis created', type: diagnosis_entity_1.Diagnosis }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid file or parameters' }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_diagnosis_dto_1.CreateDiagnosisDto, Object]),
    __metadata("design:returntype", Promise)
], DiagnosisController.prototype, "analyzeImage", null);
__decorate([
    (0, common_1.Post)('audio'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', DiagnosisController.uploadOptions)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['file', 'carMake', 'carModel', 'carYear'],
            properties: {
                file: { type: 'string', format: 'binary' },
                carMake: { type: 'string', example: 'Toyota' },
                carModel: { type: 'string', example: 'Camry' },
                carYear: { type: 'number', example: 2020 },
                description: { type: 'string' },
                language: { type: 'string', enum: ['tj', 'ru', 'en'], example: 'ru' },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Upload audio for AI diagnosis' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Diagnosis created', type: diagnosis_entity_1.Diagnosis }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_diagnosis_dto_1.CreateDiagnosisDto, Object]),
    __metadata("design:returntype", Promise)
], DiagnosisController.prototype, "analyzeAudio", null);
__decorate([
    (0, common_1.Post)('video'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', DiagnosisController.uploadOptions)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['file', 'carMake', 'carModel', 'carYear'],
            properties: {
                file: { type: 'string', format: 'binary' },
                carMake: { type: 'string', example: 'Toyota' },
                carModel: { type: 'string', example: 'Camry' },
                carYear: { type: 'number', example: 2020 },
                description: { type: 'string' },
                language: { type: 'string', enum: ['tj', 'ru', 'en'], example: 'en' },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Upload video for AI diagnosis' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Diagnosis created', type: diagnosis_entity_1.Diagnosis }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_diagnosis_dto_1.CreateDiagnosisDto, Object]),
    __metadata("design:returntype", Promise)
], DiagnosisController.prototype, "analyzeVideo", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all diagnoses with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Paginated diagnoses list' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DiagnosisController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get diagnosis by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Diagnosis found', type: diagnosis_entity_1.Diagnosis }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Diagnosis not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DiagnosisController.prototype, "findById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete diagnosis by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Diagnosis deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Diagnosis not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DiagnosisController.prototype, "delete", null);
exports.DiagnosisController = DiagnosisController = __decorate([
    (0, swagger_1.ApiTags)('diagnosis'),
    (0, common_1.Controller)('diagnosis'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [diagnosis_service_1.DiagnosisService])
], DiagnosisController);
//# sourceMappingURL=diagnosis.controller.js.map