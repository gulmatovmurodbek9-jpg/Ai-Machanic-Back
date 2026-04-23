export const buildCheckQuotePrompt = (
  carYear: number,
  carMake: string,
  carModel: string,
  problem: string,
  diagnosis: string,
  quotedAmount: number,
  estimatedMin: number,
  estimatedMax: number,
) => `
You are an automotive pricing expert helping a car owner evaluate a repair quote.

VEHICLE: ${carYear} ${carMake} ${carModel}
PROBLEM: ${problem}
DIAGNOSIS: ${diagnosis}
QUOTED PRICE: $${quotedAmount}
AI ESTIMATED RANGE: $${estimatedMin} - $${estimatedMax}

Return ONLY a valid JSON object — no markdown, no explanation:
{
  "verdict": "FAIR",
  "percentageDifference": 0,
  "explanation": "Clear explanation for the car owner",
  "recommendedRange": {
    "min": ${estimatedMin},
    "max": ${estimatedMax}
  },
  "breakdown": {
    "partsEstimate": 0,
    "laborEstimate": 0,
    "reasonableTotal": 0
  },
  "negotiationTips": ["tip1", "tip2"]
}

verdict must be exactly one of: FAIR, OVERPRICED, CHEAP
percentageDifference: positive number if overpriced (e.g. 25 means 25% above recommended max)
`;

export const CHECK_QUOTE_PROMPT = buildCheckQuotePrompt(0, '', '', '', '', 0, 0, 0);
