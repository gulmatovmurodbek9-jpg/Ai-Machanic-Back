import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PricingService } from './pricing.service';
import { PartPrice } from './part-price.entity';

@ApiTags('pricing')
@Controller('pricing')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Get('search')
  @ApiOperation({ summary: 'Search part prices by name, make and model' })
  @ApiQuery({ name: 'part', required: true, example: 'Brake Pads' })
  @ApiQuery({ name: 'carMake', required: false, example: 'Toyota' })
  @ApiQuery({ name: 'carModel', required: false, example: 'Camry' })
  @ApiResponse({ status: 200, description: 'Pricing results with cheapest and average' })
  async searchPrices(
    @Query('part') part: string,
    @Query('carMake') carMake?: string,
    @Query('carModel') carModel?: string,
  ) {
    return this.pricingService.searchPrices(part, carMake, carModel);
  }

  @Get('popular')
  @ApiOperation({ summary: 'Get cheapest listing for popular parts' })
  @ApiResponse({ status: 200, description: 'Popular parts prices', type: [PartPrice] })
  async findPopular() {
    return this.pricingService.findPopular();
  }
}
