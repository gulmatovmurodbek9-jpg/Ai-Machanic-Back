import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from './quote.entity';

@ApiTags('quote')
@Controller('quote')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a mechanic quote for AI fairness evaluation' })
  @ApiResponse({ status: 201, description: 'Quote evaluated', type: Quote })
  @ApiResponse({ status: 404, description: 'Diagnosis not found' })
  async checkQuote(@Body() dto: CreateQuoteDto) {
    return this.quoteService.checkQuote(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get quote by ID' })
  @ApiResponse({ status: 200, description: 'Quote found', type: Quote })
  @ApiResponse({ status: 404, description: 'Quote not found' })
  async findById(@Param('id') id: string) {
    return this.quoteService.findById(id);
  }

  @Get('diagnosis/:diagnosisId')
  @ApiOperation({ summary: 'Get all quotes for a diagnosis' })
  @ApiResponse({ status: 200, description: 'Quotes list', type: [Quote] })
  async findByDiagnosisId(@Param('diagnosisId') diagnosisId: string) {
    return this.quoteService.findByDiagnosisId(diagnosisId);
  }
}
