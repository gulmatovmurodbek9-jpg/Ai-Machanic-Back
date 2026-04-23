export declare class ObdLog {
    id: string;
    codes: string[];
    diagnosisId: string;
    sensorData: Record<string, number>;
    analysis: Array<{
        code: string;
        description: string;
        severity: string;
        recommendation: string;
    }>;
    overallSeverity: string;
    createdAt: Date;
}
