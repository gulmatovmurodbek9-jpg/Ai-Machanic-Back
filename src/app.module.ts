import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { DiagnosisModule } from './modules/diagnosis/diagnosis.module';
import { QuoteModule } from './modules/quote/quote.module';
import { PricingModule } from './modules/pricing/pricing.module';
import { ObdModule } from './modules/obd/obd.module';
import { AiModule } from './shared/ai/ai.module';
import { UploadModule } from './shared/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'sqlite',
        database: 'database.sqlite',
        entities: [__dirname + '/**/*.entity{.ts,.js}', __dirname + '/config/*.entity{.ts,.js}'],
        synchronize: true, // for demo, in production use migrations
        // migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      }),
    }),
    AuthModule,
    DiagnosisModule,
    QuoteModule,
    PricingModule,
    ObdModule,
    AiModule,
    UploadModule,
  ],
})
export class AppModule {}
