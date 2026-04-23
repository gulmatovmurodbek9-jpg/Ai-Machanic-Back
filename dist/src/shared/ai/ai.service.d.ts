import { ConfigService } from '@nestjs/config';
import { Diagnosis } from '../../modules/diagnosis/diagnosis.entity';
import { SupportedLanguage } from './language';
export interface CarInfo {
    make: string;
    model: string;
    year: number;
    description?: string;
    language?: SupportedLanguage;
    city?: string;
}
export interface DiagnosisResult {
    problem: string;
    diagnosis: string;
    severity: string;
    estimatedCostMin: number;
    estimatedCostMax: number;
    partsNeeded: string[];
    laborHours: number;
    recommendations: string[];
    urgency: string;
}
export interface QuoteResult {
    verdict: string;
    percentageDifference: number;
    explanation: string;
    recommendedRange: {
        min: number;
        max: number;
    };
    breakdown: {
        partsEstimate: number;
        laborEstimate: number;
        reasonableTotal: number;
    };
    negotiationTips: string[];
}
export interface ObdAnalysisItem {
    code: string;
    description: string;
    severity: string;
    recommendation: string;
}
export interface AgentData {
    shops: {
        name: string;
        address: string;
        distance: string;
    }[];
    videos: {
        title: string;
        url: string;
    }[];
    partsStores: {
        store: string;
        price: number;
        link: string;
    }[];
    mechanics: {
        name: string;
        phone: string;
        specialty: string;
    }[];
    pricing: {
        summary: string;
        comparison: string;
    };
}
export declare class AiService {
    private configService;
    private readonly logger;
    private anthropic;
    private openai;
    private hasAnthropicKey;
    private hasOpenAiLikeKey;
    private groqApiKey;
    private usesGroq;
    constructor(configService: ConfigService);
    private parseJson;
    private localizeDiagnosisResult;
    private getTextModel;
    private mockDiagnosisResult;
    private analyzeImageWithGroq;
    analyzeImage(imageBase64: string, carInfo: CarInfo): Promise<DiagnosisResult>;
    analyzeAudio(audioUrl: string, carInfo: CarInfo): Promise<DiagnosisResult>;
    analyzeVideo(videoUrl: string, carInfo: CarInfo): Promise<DiagnosisResult>;
    checkQuoteFairness(diagnosis: Diagnosis, quotedAmount: number): Promise<QuoteResult>;
    analyzeObdCodes(codes: string[]): Promise<ObdAnalysisItem[]>;
    runSecondaryAgents(primary: DiagnosisResult, carInfo: CarInfo): Promise<AgentData>;
}
