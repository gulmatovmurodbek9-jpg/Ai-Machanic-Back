import { Diagnosis } from '../diagnosis/diagnosis.entity';
export declare class Quote {
    id: string;
    diagnosisId: string;
    quotedAmount: number;
    mechanicName: string;
    mechanicNotes: string;
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
    savingsPotential: number;
    createdAt: Date;
    diagnosis: Diagnosis;
}
