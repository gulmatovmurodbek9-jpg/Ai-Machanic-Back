export declare class Diagnosis {
    id: string;
    userId: number;
    carMake: string;
    carModel: string;
    carYear: number;
    fileUrl: string;
    fileType: string;
    problem: string;
    diagnosis: string;
    severity: string;
    estimatedCostMin: number;
    estimatedCostMax: number;
    partsNeeded: string[];
    laborHours: number;
    recommendations: string[];
    agentData: any;
    urgency: string;
    createdAt: Date;
    updatedAt: Date;
    quotes: any[];
}
