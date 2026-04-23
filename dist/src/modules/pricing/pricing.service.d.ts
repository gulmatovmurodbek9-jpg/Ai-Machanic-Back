import { Repository } from 'typeorm';
import { PartPrice } from './part-price.entity';
export interface PricingResponse {
    results: PartPrice[];
    cheapest: PartPrice | null;
    averagePrice: number;
    priceRange: {
        min: number;
        max: number;
    };
}
export declare class PricingService {
    private partPriceRepository;
    constructor(partPriceRepository: Repository<PartPrice>);
    searchPrices(partName: string, carMake?: string, carModel?: string): Promise<PricingResponse>;
    findPopular(): Promise<PartPrice[]>;
}
