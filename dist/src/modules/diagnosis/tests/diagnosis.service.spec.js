"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const diagnosis_service_1 = require("../diagnosis.service");
const diagnosis_entity_1 = require("../diagnosis.entity");
const ai_service_1 = require("../../../shared/ai/ai.service");
const upload_service_1 = require("../../../shared/upload/upload.service");
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
    let service;
    let repo;
    let aiService;
    let uploadService;
    const mockFile = {
        buffer: Buffer.from('fake-image'),
        originalname: 'car.jpg',
        mimetype: 'image/jpeg',
        size: 1024,
    };
    const mockDto = { carMake: 'Toyota', carModel: 'Camry', carYear: 2020 };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                diagnosis_service_1.DiagnosisService,
                { provide: (0, typeorm_1.getRepositoryToken)(diagnosis_entity_1.Diagnosis), useFactory: mockDiagnosisRepo },
                { provide: ai_service_1.AiService, useFactory: mockAiService },
                { provide: upload_service_1.UploadService, useFactory: mockUploadService },
            ],
        }).compile();
        service = module.get(diagnosis_service_1.DiagnosisService);
        repo = module.get((0, typeorm_1.getRepositoryToken)(diagnosis_entity_1.Diagnosis));
        aiService = module.get(ai_service_1.AiService);
        uploadService = module.get(upload_service_1.UploadService);
    });
    it('should create diagnosis from image successfully', async () => {
        const createdDiagnosis = {
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
        const diagnosis = { id: 'uuid-2', carMake: 'Honda', problem: 'Oil leak' };
        repo.findOne.mockResolvedValue(diagnosis);
        const result = await service.findById('uuid-2');
        expect(result.id).toBe('uuid-2');
        expect(result.carMake).toBe('Honda');
    });
    it('should throw NotFoundException when diagnosis not found', async () => {
        repo.findOne.mockResolvedValue(null);
        await expect(service.findById('nonexistent-uuid')).rejects.toThrow(common_1.NotFoundException);
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
        expect(repo.save).toHaveBeenCalledWith(expect.objectContaining({
            fileType: 'image',
            problem: 'Possible brake wear',
        }));
    });
    it('should throw when S3 upload fails', async () => {
        uploadService.uploadFile.mockRejectedValue(new Error('S3 connection timeout'));
        await expect(service.createFromImage(mockFile, mockDto)).rejects.toThrow('S3 connection timeout');
    });
});
//# sourceMappingURL=diagnosis.service.spec.js.map