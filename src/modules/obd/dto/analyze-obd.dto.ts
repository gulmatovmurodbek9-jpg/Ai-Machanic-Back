import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AnalyzeObdDto {
  @ApiProperty({ description: 'ID of the user', example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'The OBD-II error code to analyze', example: 'P0300' })
  @IsString()
  errorCode: string;
}