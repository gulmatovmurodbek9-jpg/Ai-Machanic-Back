import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QuoteService } from '../quote.service';
import { Quote } from '../quote.entity';
import { Diagnosis } from '../../diagnosis/diagnosis.entity';
import { AiService } from '../../../shared/ai/ai.service';
import { CreateQuoteDto } from '../dto/create-quote.dto';

const mockQuoteRepo = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
});

const mockDiagnosisRepo = () => ({
  findOne: jest.fn(),
});

const mockAiService = () => ({
  checkQuoteFairness: jest.fn(),
});

describe('QuoteService', () => {
  let service: QuoteService;
  let quoteRepo: ReturnType<typeof mockQuoteRepo>;
  let diagnosisRepo: ReturnType<typeof mockDiagnosisRepo>;
  let aiService: ReturnType<typeof mockAiService>;

  const diagnosis = {
    id: '550e8400-e29b-41d4-a716-446655440001',
    carMake: 'Toyota',
    carModel: 'Camry',
    carYear: 2020,
    problem: 'Worn brake pads',
    diagnosis: 'Brake pads are worn and should be replaced soon.',
    estimatedCostMin: 150,
    estimatedCostMax: 300,
  } as Diagnosis;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuoteService,
        { provide: getRepositoryToken(Quote), useFactory: mockQuoteRepo },
        { provide: getRepositoryToken(Diagnosis), useFactory: mockDiagnosisRepo },
        { provide: AiService, useFactory: mockAiService },
      ],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
    quoteRepo = module.get(getRepositoryToken(Quote));
    diagnosisRepo = module.get(getRepositoryToken(Diagnosis));
    aiService = module.get(AiService);
  });

  it('should return OVERPRICED when quote exceeds the recommended range', async () => {
    const dto: CreateQuoteDto = {
      diagnosisId: diagnosis.id,
      quotedAmount: 450,
      mechanicName: 'Honest Wrench',
      mechanicNotes: 'Pads and rotor resurfacing included.',
    };

    diagnosisRepo.findOne.mockResolvedValue(diagnosis);
    aiService.checkQuoteFairness.mockResolvedValue({
      verdict: 'OVERPRICED',
      percentageDifference: 50,
      explanation: 'The quote is significantly above the expected range.',
      recommendedRange: { min: 150, max: 300 },
      breakdown: { partsEstimate: 120, laborEstimate: 130, reasonableTotal: 250 },
      negotiationTips: ['Ask for a parts list'],
    });
    quoteRepo.create.mockImplementation((payload) => payload);
    quoteRepo.save.mockImplementation(async (payload) => ({ id: 'quote-1', ...payload }));

    const result = await service.checkQuote(dto);

    expect(aiService.checkQuoteFairness).toHaveBeenCalledWith(diagnosis, 450);
    expect(result.verdict).toBe('OVERPRICED');
    expect(result.savingsPotential).toBe(150);
  });

  it('should return FAIR when quote is within range', async () => {
    const dto: CreateQuoteDto = {
      diagnosisId: diagnosis.id,
      quotedAmount: 240,
      mechanicName: 'Neighborhood Garage',
    };

    diagnosisRepo.findOne.mockResolvedValue(diagnosis);
    aiService.checkQuoteFairness.mockResolvedValue({
      verdict: 'FAIR',
      percentageDifference: 4,
      explanation: 'The quote is in line with the expected repair cost.',
      recommendedRange: { min: 150, max: 300 },
      breakdown: { partsEstimate: 110, laborEstimate: 120, reasonableTotal: 230 },
      negotiationTips: ['Confirm warranty coverage'],
    });
    quoteRepo.create.mockImplementation((payload) => payload);
    quoteRepo.save.mockImplementation(async (payload) => ({ id: 'quote-2', ...payload }));

    const result = await service.checkQuote(dto);

    expect(result.verdict).toBe('FAIR');
    expect(result.savingsPotential).toBe(0);
    expect(result.quotedAmount).toBe(240);
  });

  it('should return CHEAP when quote is below market expectation', async () => {
    const dto: CreateQuoteDto = {
      diagnosisId: diagnosis.id,
      quotedAmount: 60,
      mechanicNotes: 'Special discount this week.',
    };

    diagnosisRepo.findOne.mockResolvedValue(diagnosis);
    aiService.checkQuoteFairness.mockResolvedValue({
      verdict: 'CHEAP',
      percentageDifference: 70,
      explanation: 'The quote is unusually low for this kind of repair.',
      recommendedRange: { min: 150, max: 300 },
      breakdown: { partsEstimate: 90, laborEstimate: 110, reasonableTotal: 200 },
      negotiationTips: ['Verify the parts brand and warranty'],
    });
    quoteRepo.create.mockImplementation((payload) => payload);
    quoteRepo.save.mockImplementation(async (payload) => ({ id: 'quote-3', ...payload }));

    const result = await service.checkQuote(dto);

    expect(result.verdict).toBe('CHEAP');
    expect(result.savingsPotential).toBe(0);
    expect(result.recommendedRange).toEqual({ min: 150, max: 300 });
  });
});
