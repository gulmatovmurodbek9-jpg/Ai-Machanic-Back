import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckQuoteDto {
  @ApiProperty({ description: 'The ID of the diagnosis the quote is for', example: 1 })
  @IsNumber()
  diagnosisId: number;

  @ApiProperty({ description: 'The raw text of the quote from the mechanic', example: 'Replace front brake pads and rotors - $250' })
  @IsString()
  quoteText: string;

  @ApiProperty({ description: 'The total price quoted by the mechanic', example: 250.00 })
  @IsNumber()
  quotedPrice: number;
}