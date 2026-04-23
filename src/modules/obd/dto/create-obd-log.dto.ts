import { IsArray, IsString, IsOptional, IsUUID, IsObject, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateObdLogDto {
  @ApiProperty({ description: 'OBD-II error codes', example: ['P0300', 'P0171'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @Matches(/^[A-Z]\d{4}$/, { each: true, message: 'Each code must be a valid OBD-II format (e.g. P0300)' })
  codes: string[];

  @ApiPropertyOptional({ description: 'Associated diagnosis ID', example: 'uuid' })
  @IsOptional()
  @IsUUID()
  diagnosisId?: string;

  @ApiPropertyOptional({ description: 'Sensor readings at time of scan', example: { rpm: 750, temperature: 90 } })
  @IsOptional()
  @IsObject()
  sensorData?: Record<string, number>;
}
