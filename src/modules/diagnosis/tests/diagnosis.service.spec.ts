import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { DiagnosisService } from '../diagnosis.service';
import { Diagnosis } from '../diagnosis.entity';
import { AiService } from '../../../shared/ai/ai.service';
import { UploadService } from '../../../shared/upload/upload.service';

const mockDiagnosisRepo = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  findAndCount: jest.fn(),
  remove: jest.fn(),
});

const mockAiService = () => ({
  analyzeImage: jest.fn(),
  analyzeAudio: jest.fn(),
  analyzeVideo: jest.fn(),
});

const mockUploadService = () => ({
  uploadFile: jest.fn(),
});

const mockAiResult = {
  problem: 'Worn brake pads',
  diagnosis: 'Brake pads are worn below safe threshold',
  severity: 'HIGH',
  estimatedCostMin: 150,
  estimatedCostMax: 300,
  partsNeeded: ['Brake pads'],
  laborHours: 1.5,
  recommendations: ['Replace brake pads immediately'],
  urgency: 'Fix immediately',
};

const mockFallbackAiResult = {
  problem: 'Possible brake wear',
  diagnosis: 'Fallback analysis indicates worn brake components that should be inspected.',
  severity: 'MEDIUM',
  estimatedCostMin: 120,
  estimatedCostMax: 240,
  partsNeeded: ['Brake pads'],
  laborHours: 1,
  recommendations: ['Book a brake inspection'],
  urgency: 'Should fix soon',
};

describe('DiagnosisService', () => {
  let service: DiagnosisService;
  let repo: ReturnType<typeof mockDiagnosisRepo>;
  let aiService: ReturnType<typeof mockAiService>;
  let uploadService: ReturnType<typeof mockUploadService>;

  const mockFile = {
    buffer: Buffer.from('fake-image'),
    originalname: 'car.jpg',
    mimetype: 'image/jpeg',
    size: 1024,
  } as Express.Multer.File;

  const mockDto = { carMake: 'Toyota', carModel: 'Camry', carYear: 2020 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiagnosisService,
        { provide: getRepositoryToken(Diagnosis), useFactory: mockDiagnosisRepo },
        { provide: AiService, useFactory: mockAiService },
        { provide: UploadService, useFactory: mockUploadService },
      ],
    }).compile();

    service = module.get<DiagnosisService>(DiagnosisService);
    repo = module.get(getRepositoryToken(Diagnosis));
    aiService = module.get(AiService);
    uploadService = module.get(UploadService);
  });

  it('should create diagnosis from image successfully', async () => {
    const createdDiagnosis: Partial<Diagnosis> = {
      id: 'uuid-1',
      carMake: 'Toyota',
      carModel: 'Camry',
      carYear: 2020,
      fileUrl: 'https://s3.example.com/car.jpg',
      fileType: 'image',
      ...mockAiResult,
    };

    uploadService.uploadFile.mockResolvedValue('https://s3.example.com/car.jpg');
    aiService.analyzeImage.mockResolvedValue(mockAiResult);
    repo.create.mockReturnValue(createdDiagnosis);
    repo.save.mockResolvedValue(createdDiagnosis);

    const result = await service.createFromImage(mockFile, mockDto);

    expect(uploadService.uploadFile).toHaveBeenCalledWith(mockFile);
    expect(aiService.analyzeImage).toHaveBeenCalledWith('ZmFrZS1pbWFnZQ==', {
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      description: undefined,
    });
    expect(repo.create).toHaveBeenCalledWith({
      carMake: 'Toyota',
      carModel: 'Camry',
      carYear: 2020,
      fileUrl: 'https://s3.example.com/car.jpg',
      fileType: 'image',
      ...mockAiResult,
    });
    expect(result.problem).toBe('Worn brake pads');
    expect(result.severity).toBe('HIGH');
    expect(result.estimatedCostMin).toBeGreaterThan(0);
  });

  it('should return diagnosis by id', async () => {
    const diagnosis: Partial<Diagnosis> = { id: 'uuid-2', carMake: 'Honda', problem: 'Oil leak' };
    repo.findOne.mockResolvedValue(diagnosis);

    const result = await service.findById('uuid-2');

    expect(result.id).toBe('uuid-2');
    expect(result.carMake).toBe('Honda');
  });

  it('should throw NotFoundException when diagnosis not found', async () => {
    repo.findOne.mockResolvedValue(null);

    await expect(service.findById('nonexistent-uuid')).rejects.toThrow(NotFoundException);
  });

  it('should save fallback diagnosis data returned by AiService', async () => {
    uploadService.uploadFile.mockResolvedValue('local://uploads/car.jpg');
    aiService.analyzeImage.mockResolvedValue(mockFallbackAiResult);
    repo.create.mockImplementation((payload) => payload);
    repo.save.mockImplementation(async (payload) => payload);

    const result = await service.createFromImage(mockFile, mockDto);

    expect(result.problem).toBe('Possible brake wear');
    expect(result.severity).toBe('MEDIUM');
    expect(result.urgency).toBe('Should fix soon');
    expect(repo.save).toHaveBeenCalledWith(
      expect.objectContaining({
        fileType: 'image',
        problem: 'Possible brake wear',
      }),
    );
  });

  it('should throw when S3 upload fails', async () => {
    uploadService.uploadFile.mockRejectedValue(new Error('S3 connection timeout'));

    await expect(service.createFromImage(mockFile, mockDto)).rejects.toThrow('S3 connection timeout');
  });
});
