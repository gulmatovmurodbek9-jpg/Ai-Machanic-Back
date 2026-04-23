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
exports.PartPrice = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let PartPrice = class PartPrice {
};
exports.PartPrice = PartPrice;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PartPrice.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Brake Pads' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PartPrice.prototype, "partName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Toyota' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PartPrice.prototype, "carMake", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Camry' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PartPrice.prototype, "carModel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2020 }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PartPrice.prototype, "carYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 45.99 }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], PartPrice.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'AutoZone' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PartPrice.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://autozone.com/...' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PartPrice.prototype, "sourceUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'AZ-12345' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PartPrice.prototype, "partNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PartPrice.prototype, "updatedAt", void 0);
exports.PartPrice = PartPrice = __decorate([
    (0, typeorm_1.Entity)('part_prices')
], PartPrice);
//# sourceMappingURL=part-price.entity.js.map