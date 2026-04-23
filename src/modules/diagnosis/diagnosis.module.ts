import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { Diagnosis } from './diagnosis.entity';
import { DiagnosisService } from './diagnosis.service';
import { DiagnosisController } from './diagnosis.controller';
import { AiModule } from '../../shared/ai/ai.module';
import { UploadModule } from '../../shared/upload/upload.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Diagnosis]),
    MulterModule.register({ dest: './uploads' }),
    AiModule,
    UploadModule,
    AuthModule,
  ],
  providers: [DiagnosisService],
  controllers: [DiagnosisController],
})
export class DiagnosisModule {}