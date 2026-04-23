import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartPrice } from './part-price.entity';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PartPrice]), AuthModule],
  providers: [PricingService],
  controllers: [PricingController],
})
export class PricingModule {}