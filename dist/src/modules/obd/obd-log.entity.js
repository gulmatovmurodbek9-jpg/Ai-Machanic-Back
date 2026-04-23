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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObdLog = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let ObdLog = class ObdLog {
};
exports.ObdLog = ObdLog;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ObdLog.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], example: ['P0300', 'P0171'] }),
    (0, typeorm_1.Column)({ type: 'simple-json' }),
    __metadata("design:type", Array)
], ObdLog.prototype, "codes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ObdLog.prototype, "diagnosisId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: { rpm: 750, temperature: 90 } }),
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], ObdLog.prototype, "sensorData", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [Object] }),
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Array)
], ObdLog.prototype, "analysis", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ObdLog.prototype, "overallSeverity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ObdLog.prototype, "createdAt", void 0);
exports.ObdLog = ObdLog = __decorate([
    (0, typeorm_1.Entity)('obd_logs')
], ObdLog);
//# sourceMappingURL=obd-log.entity.js.map