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
exports.Diagnosis = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let Diagnosis = class Diagnosis {
};
exports.Diagnosis = Diagnosis;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Diagnosis.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Diagnosis.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Toyota' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Diagnosis.prototype, "carMake", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Camry' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Diagnosis.prototype, "carModel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2020 }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Diagnosis.prototype, "carYear", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Diagnosis.prototype, "fileUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['image', 'audio', 'video'] }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Diagnosis.prototype, "fileType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Worn brake pads' }),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Diagnosis.prototype, "problem", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Detailed diagnosis...' }),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Diagnosis.prototype, "diagnosis", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] }),
    (0, typeorm_1.Column)({ default: 'MEDIUM' }),
    __metadata("design:type", String)
], Diagnosis.prototype, "severity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 100 }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Diagnosis.prototype, "estimatedCostMin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 300 }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Diagnosis.prototype, "estimatedCostMax", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Array)
], Diagnosis.prototype, "partsNeeded", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2 }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 1, nullable: true }),
    __metadata("design:type", Number)
], Diagnosis.prototype, "laborHours", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Array)
], Diagnosis.prototype, "recommendations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], Diagnosis.prototype, "agentData", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Fix immediately' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Diagnosis.prototype, "urgency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Diagnosis.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Diagnosis.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('Quote', 'diagnosis'),
    __metadata("design:type", Array)
], Diagnosis.prototype, "quotes", void 0);
exports.Diagnosis = Diagnosis = __decorate([
    (0, typeorm_1.Entity)('diagnoses')
], Diagnosis);
//# sourceMappingURL=diagnosis.entity.js.map