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
exports.Quote = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const diagnosis_entity_1 = require("../diagnosis/diagnosis.entity");
let Quote = class Quote {
};
exports.Quote = Quote;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Quote.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Quote.prototype, "diagnosisId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 450.0 }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Quote.prototype, "quotedAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'John\'s Auto Shop' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Quote.prototype, "mechanicName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Includes parts and labor' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Quote.prototype, "mechanicNotes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['FAIR', 'OVERPRICED', 'CHEAP'] }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Quote.prototype, "verdict", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15.5 }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 8, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Quote.prototype, "percentageDifference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'The quote is within market range.' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Quote.prototype, "explanation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], Quote.prototype, "recommendedRange", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], Quote.prototype, "breakdown", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Array)
], Quote.prototype, "negotiationTips", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 50 }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Quote.prototype, "savingsPotential", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Quote.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => diagnosis_entity_1.Diagnosis, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'diagnosisId' }),
    __metadata("design:type", diagnosis_entity_1.Diagnosis)
], Quote.prototype, "diagnosis", void 0);
exports.Quote = Quote = __decorate([
    (0, typeorm_1.Entity)('quotes')
], Quote);
//# sourceMappingURL=quote.entity.js.map