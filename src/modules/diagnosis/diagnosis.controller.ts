import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Query,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { DiagnosisService } from './diagnosis.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { Diagnosis } from './diagnosis.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('diagnosis')
@Controller('diagnosis')
@UseGuards(JwtAuthGuard)
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  private static readonly uploadOptions = {
    storage: memoryStorage(),
  };

  @Post('image')
  @UseInterceptors(FileInterceptor('file', DiagnosisController.uploadOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file', 'carMake', 'carModel', 'carYear'],
      properties: {
        file: { type: 'string', format: 'binary' },
        carMake: { type: 'string', example: 'Toyota' },
        carModel: { type: 'string', example: 'Camry' },
        carYear: { type: 'number', example: 2020 },
        description: { type: 'string', example: 'Grinding noise when braking' },
        language: { type: 'string', enum: ['tj', 'ru', 'en'], example: 'tj' },
      },
    },
  })
  @ApiOperation({ summary: 'Upload image for AI diagnosis' })
  @ApiResponse({ status: 201, description: 'Diagnosis created', type: Diagnosis })
  @ApiResponse({ status: 400, description: 'Invalid file or parameters' })
  async analyzeImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateDiagnosisDto,
    @Req() req: any,
  ) {
    if (!file) throw new BadRequestException('Image file is required');
    return this.diagnosisService.createFromImage(file, dto, req.user?.sub);
  }

  @Post('audio')
  @UseInterceptors(FileInterceptor('file', DiagnosisController.uploadOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file', 'carMake', 'carModel', 'carYear'],
      properties: {
        file: { type: 'string', format: 'binary' },
        carMake: { type: 'string', example: 'Toyota' },
        carModel: { type: 'string', example: 'Camry' },
        carYear: { type: 'number', example: 2020 },
        description: { type: 'string' },
        language: { type: 'string', enum: ['tj', 'ru', 'en'], example: 'ru' },
      },
    },
  })
  @ApiOperation({ summary: 'Upload audio for AI diagnosis' })
  @ApiResponse({ status: 201, description: 'Diagnosis created', type: Diagnosis })
  async analyzeAudio(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateDiagnosisDto,
    @Req() req: any,
  ) {
    if (!file) throw new BadRequestException('Audio file is required');
    return this.diagnosisService.createFromAudio(file, dto, req.user?.sub);
  }

  @Post('video')
  @UseInterceptors(FileInterceptor('file', DiagnosisController.uploadOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file', 'carMake', 'carModel', 'carYear'],
      properties: {
        file: { type: 'string', format: 'binary' },
        carMake: { type: 'string', example: 'Toyota' },
        carModel: { type: 'string', example: 'Camry' },
        carYear: { type: 'number', example: 2020 },
        description: { type: 'string' },
        language: { type: 'string', enum: ['tj', 'ru', 'en'], example: 'en' },
      },
    },
  })
  @ApiOperation({ summary: 'Upload video for AI diagnosis' })
  @ApiResponse({ status: 201, description: 'Diagnosis created', type: Diagnosis })
  async analyzeVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateDiagnosisDto,
    @Req() req: any,
  ) {
    if (!file) throw new BadRequestException('Video file is required');
    return this.diagnosisService.createFromVideo(file, dto, req.user?.sub);
  }

  @Get()
  @ApiOperation({ summary: 'List all diagnoses with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Paginated diagnoses list' })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10, @Req() req: any) {
    return this.diagnosisService.findAll(Number(page), Number(limit), req.user?.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get diagnosis by ID' })
  @ApiResponse({ status: 200, description: 'Diagnosis found', type: Diagnosis })
  @ApiResponse({ status: 404, description: 'Diagnosis not found' })
  async findById(@Param('id') id: string, @Req() req: any) {
    return this.diagnosisService.findById(id, req.user?.sub);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete diagnosis by ID' })
  @ApiResponse({ status: 200, description: 'Diagnosis deleted' })
  @ApiResponse({ status: 404, description: 'Diagnosis not found' })
  async delete(@Param('id') id: string, @Req() req: any) {
    await this.diagnosisService.delete(id, req.user?.sub);
    return { message: 'Diagnosis deleted successfully' };
  }
}
