import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartPrice } from './part-price.entity';

export interface PricingResponse {
  results: PartPrice[];
  cheapest: PartPrice | null;
  averagePrice: number;
  priceRange: { min: number; max: number };
}

@Injectable()
export class PricingService {
  constructor(
    @InjectRepository(PartPrice)
    private partPriceRepository: Repository<PartPrice>,
  ) {}

  async searchPrices(partName: string, carMake?: string, carModel?: string): Promise<PricingResponse> {
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

  async findPopular(): Promise<PartPrice[]> {
    const popularParts = ['Brake Pads', 'Oil Filter', 'Air Filter', 'Spark Plugs', 'Battery'];
    const results: PartPrice[] = [];

    for (const part of popularParts) {
      const record = await this.partPriceRepository.findOne({
        where: { partName: part },
        order: { price: 'ASC' },
      });
      if (record) results.push(record);
    }

    return results;
  }
}
