import { IsString, IsNumber, IsOptional, IsUUID, MaxLength, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQuoteDto {
  @ApiProperty({ description: 'Diagnosis ID to validate quote for', example: 'uuid' })
  @IsUUID()
  diagnosisId: string;

  @ApiProperty({ description: 'Amount quoted by the mechanic', example: 450.0 })
  @IsNumber()
  @Min(0)
  @Max(100000)
  quotedAmount: number;

  @ApiPropertyOptional({ description: 'Mechanic name or shop name', example: "John's Auto" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  mechanicName?: string;

  @ApiPropertyOptional({ description: 'Notes from the mechanic about the repair', example: 'Includes parts and labor' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  mechanicNotes?: string;
}
