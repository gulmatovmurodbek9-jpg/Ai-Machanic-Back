import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  MaxLength,
  Min,
  Max,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateDiagnosisDto {
  @ApiProperty({ description: 'Car make', example: 'Toyota' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Transform(({ value }) => value?.trim())
  carMake: string;

  @ApiProperty({ description: 'Car model', example: 'Camry' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Transform(({ value }) => value?.trim())
  carModel: string;

  @ApiProperty({ description: 'Car year', example: 2020 })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  carYear: number;

  @ApiPropertyOptional({ description: 'Additional description of the problem' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  @Transform(({ value }) => value?.trim())
  description?: string;

  @ApiPropertyOptional({
    description: 'Response language',
    enum: ['tj', 'ru', 'en'],
    example: 'tj',
  })
  @IsOptional()
  @IsString()
  @IsIn(['tj', 'ru', 'en'])
  @Transform(({ value }) => value?.trim()?.toLowerCase())
  language?: 'tj' | 'ru' | 'en';

  @ApiPropertyOptional({ description: 'City for location-based search', example: 'Dushanbe' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  city?: string;
}
