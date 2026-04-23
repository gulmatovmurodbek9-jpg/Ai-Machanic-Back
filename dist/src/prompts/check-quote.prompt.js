"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHECK_QUOTE_PROMPT = exports.buildCheckQuotePrompt = void 0;
const buildCheckQuotePrompt = (carYear, carMake, carModel, problem, diagnosis, quotedAmount, estimatedMin, estimatedMax) => `
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
exports.buildCheckQuotePrompt = buildCheckQuotePrompt;
exports.CHECK_QUOTE_PROMPT = (0, exports.buildCheckQuotePrompt)(0, '', '', '', '', 0, 0, 0);
//# sourceMappingURL=check-quote.prompt.js.map