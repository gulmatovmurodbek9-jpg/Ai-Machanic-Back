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
exports.CreateObdLogDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateObdLogDto {
}
exports.CreateObdLogDto = CreateObdLogDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'OBD-II error codes', example: ['P0300', 'P0171'], type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.Matches)(/^[A-Z]\d{4}$/, { each: true, message: 'Each code must be a valid OBD-II format (e.g. P0300)' }),
    __metadata("design:type", Array)
], CreateObdLogDto.prototype, "codes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Associated diagnosis ID', example: 'uuid' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateObdLogDto.prototype, "diagnosisId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Sensor readings at time of scan', example: { rpm: 750, temperature: 90 } }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateObdLogDto.prototype, "sensorData", void 0);
//# sourceMappingURL=create-obd-log.dto.js.map