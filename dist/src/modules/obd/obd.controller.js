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
exports.ObdController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const obd_service_1 = require("./obd.service");
const create_obd_log_dto_1 = require("./dto/create-obd-log.dto");
const obd_log_entity_1 = require("./obd-log.entity");
let ObdController = class ObdController {
    constructor(obdService) {
        this.obdService = obdService;
    }
    async logCodes(dto) {
        return this.obdService.logCodes(dto);
    }
    async getLogsByDiagnosisId(diagnosisId) {
        return this.obdService.getLogsByDiagnosisId(diagnosisId);
    }
    async getAllCodes() {
        return this.obdService.getAllCodes();
    }
    async analyze(dto) {
        return this.obdService.analyze(dto);
    }
};
exports.ObdController = ObdController;
__decorate([
    (0, common_1.Post)('log'),
    (0, swagger_1.ApiOperation)({ summary: 'Log OBD error codes with AI analysis' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'OBD codes logged and analyzed', type: obd_log_entity_1.ObdLog }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_obd_log_dto_1.CreateObdLogDto]),
    __metadata("design:returntype", Promise)
], ObdController.prototype, "logCodes", null);
__decorate([
    (0, common_1.Get)('logs/:diagnosisId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get OBD logs for a specific diagnosis' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OBD logs list', type: [obd_log_entity_1.ObdLog] }),
    __param(0, (0, common_1.Param)('diagnosisId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ObdController.prototype, "getLogsByDiagnosisId", null);
__decorate([
    (0, common_1.Get)('codes'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all known OBD P-codes with descriptions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of known OBD codes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ObdController.prototype, "getAllCodes", null);
__decorate([
    (0, common_1.Post)('analyze'),
    (0, swagger_1.ApiOperation)({ summary: 'Analyze OBD codes with AI (alias for POST /log)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'OBD codes analyzed', type: obd_log_entity_1.ObdLog }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_obd_log_dto_1.CreateObdLogDto]),
    __metadata("design:returntype", Promise)
], ObdController.prototype, "analyze", null);
exports.ObdController = ObdController = __decorate([
    (0, swagger_1.ApiTags)('obd'),
    (0, common_1.Controller)('obd'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [obd_service_1.ObdService])
], ObdController);
//# sourceMappingURL=obd.controller.js.map