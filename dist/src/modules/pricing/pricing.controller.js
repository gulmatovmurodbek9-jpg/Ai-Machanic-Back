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
exports.PricingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const pricing_service_1 = require("./pricing.service");
const part_price_entity_1 = require("./part-price.entity");
let PricingController = class PricingController {
    constructor(pricingService) {
        this.pricingService = pricingService;
    }
    async searchPrices(part, carMake, carModel) {
        return this.pricingService.searchPrices(part, carMake, carModel);
    }
    async findPopular() {
        return this.pricingService.findPopular();
    }
};
exports.PricingController = PricingController;
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search part prices by name, make and model' }),
    (0, swagger_1.ApiQuery)({ name: 'part', required: true, example: 'Brake Pads' }),
    (0, swagger_1.ApiQuery)({ name: 'carMake', required: false, example: 'Toyota' }),
    (0, swagger_1.ApiQuery)({ name: 'carModel', required: false, example: 'Camry' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pricing results with cheapest and average' }),
    __param(0, (0, common_1.Query)('part')),
    __param(1, (0, common_1.Query)('carMake')),
    __param(2, (0, common_1.Query)('carModel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "searchPrices", null);
__decorate([
    (0, common_1.Get)('popular'),
    (0, swagger_1.ApiOperation)({ summary: 'Get cheapest listing for popular parts' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Popular parts prices', type: [part_price_entity_1.PartPrice] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "findPopular", null);
exports.PricingController = PricingController = __decorate([
    (0, swagger_1.ApiTags)('pricing'),
    (0, common_1.Controller)('pricing'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [pricing_service_1.PricingService])
], PricingController);
//# sourceMappingURL=pricing.controller.js.map