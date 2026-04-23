import { getLanguageInstruction } from '../shared/ai/language';

export const buildAudioPrompt = (
  make: string,
  model: string,
  year: number,
  description?: string,
  language?: string,
) => `
You are an expert automotive mechanic and diagnostics specialist with 20+ years of experience.

Analyze this audio description of a vehicle problem for a ${year} ${make} ${model}.
${description ? `Additional context: "${description}"` : ''}
${getLanguageInstruction(language)}

Return ONLY a valid JSON object with this exact structure - no markdown, no explanation:
{
  "problem": "Brief problem title (max 10 words)",
  "diagnosis": "Detailed technical explanation of the issue",
  "severity": "LOW",
  "estimatedCostMin": 100,
  "estimatedCostMax": 300,
  "partsNeeded": ["part1", "part2"],
  "laborHours": 2.5,
  "recommendations": ["action1", "action2"],
  "urgency": "Should fix soon"
}

Severity must be exactly one of: LOW, MEDIUM, HIGH, CRITICAL
Urgency must be exactly one of: Can wait, Should fix soon, Fix immediately, Emergency
`;

export const DIAGNOSE_AUDIO_PROMPT = buildAudioPrompt('the vehicle', '', 0);
