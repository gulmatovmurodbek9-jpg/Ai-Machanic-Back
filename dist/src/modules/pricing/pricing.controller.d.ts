import { PricingService } from './pricing.service';
import { PartPrice } from './part-price.entity';
export declare class PricingController {
    private readonly pricingService;
    constructor(pricingService: PricingService);
    searchPrices(part: string, carMake?: string, carModel?: string): Promise<import("./pricing.service").PricingResponse>;
    findPopular(): Promise<PartPrice[]>;
}
