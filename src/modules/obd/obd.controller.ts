import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ObdService } from './obd.service';
import { CreateObdLogDto } from './dto/create-obd-log.dto';
import { ObdLog } from './obd-log.entity';

@ApiTags('obd')
@Controller('obd')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ObdController {
  constructor(private readonly obdService: ObdService) {}

  @Post('log')
  @ApiOperation({ summary: 'Log OBD error codes with AI analysis' })
  @ApiResponse({ status: 201, description: 'OBD codes logged and analyzed', type: ObdLog })
  async logCodes(@Body() dto: CreateObdLogDto) {
    return this.obdService.logCodes(dto);
  }

  @Get('logs/:diagnosisId')
  @ApiOperation({ summary: 'Get OBD logs for a specific diagnosis' })
  @ApiResponse({ status: 200, description: 'OBD logs list', type: [ObdLog] })
  async getLogsByDiagnosisId(@Param('diagnosisId') diagnosisId: string) {
    return this.obdService.getLogsByDiagnosisId(diagnosisId);
  }

  @Get('codes')
  @ApiOperation({ summary: 'Get all known OBD P-codes with descriptions' })
  @ApiResponse({ status: 200, description: 'List of known OBD codes' })
  async getAllCodes() {
    return this.obdService.getAllCodes();
  }

  @Post('analyze')
  @ApiOperation({ summary: 'Analyze OBD codes with AI (alias for POST /log)' })
  @ApiResponse({ status: 201, description: 'OBD codes analyzed', type: ObdLog })
  async analyze(@Body() dto: CreateObdLogDto) {
    return this.obdService.analyze(dto);
  }
}
