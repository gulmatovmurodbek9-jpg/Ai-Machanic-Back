import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './quote.entity';
import { Diagnosis } from '../diagnosis/diagnosis.entity';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { AiModule } from '../../shared/ai/ai.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Quote, Diagnosis]), AiModule, AuthModule],
  providers: [QuoteService],
  controllers: [QuoteController],
})
export class QuoteModule {}