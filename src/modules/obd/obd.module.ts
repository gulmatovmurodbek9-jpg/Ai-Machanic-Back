import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObdLog } from './obd-log.entity';
import { ObdService } from './obd.service';
import { ObdController } from './obd.controller';
import { AiModule } from '../../shared/ai/ai.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ObdLog]), AiModule, AuthModule],
  providers: [ObdService],
  controllers: [ObdController],
})
export class ObdModule {}
