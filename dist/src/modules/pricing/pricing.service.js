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
exports.PricingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const part_price_entity_1 = require("./part-price.entity");
let PricingService = class PricingService {
    constructor(partPriceRepository) {
        this.partPriceRepository = partPriceRepository;
    }
    async searchPrices(partName, carMake, carModel) {
        const qb = this.partPriceRepository.createQueryBuilder('pp');
        qb.where('LOWER(pp.partName) LIKE LOWER(:partName)', { partName: `%${partName}%` });
        if (carMake) {
            qb.andWhere('LOWER(pp.carMake) LIKE LOWER(:carMake)', { carMake: `%${carMake}%` });
        }
        if (carModel) {
            qb.andWhere('LOWER(pp.carModel) LIKE LOWER(:carModel)', { carModel: `%${carModel}%` });
        }
        qb.orderBy('pp.price', 'ASC');
        const results = await qb.getMany();
        if (results.length === 0) {
            return { results: [], cheapest: null, averagePrice: 0, priceRange: { min: 0, max: 0 } };
        }
        const prices = results.map((r) => Number(r.price));
        const averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length;
        return {
            results,
            cheapest: results[0],
            averagePrice: Math.round(averagePrice * 100) / 100,
            priceRange: { min: Math.min(...prices), max: Math.max(...prices) },
        };
    }
    async findPopular() {
        const popularParts = ['Brake Pads', 'Oil Filter', 'Air Filter', 'Spark Plugs', 'Battery'];
        const results = [];
        for (const part of popularParts) {
            const record = await this.partPriceRepository.findOne({
                where: { partName: part },
                order: { price: 'ASC' },
            });
            if (record)
                results.push(record);
        }
        return results;
    }
};
exports.PricingService = PricingService;
exports.PricingService = PricingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(part_price_entity_1.PartPrice)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PricingService);
//# sourceMappingURL=pricing.service.js.map