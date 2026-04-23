"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sdk_1 = require("@anthropic-ai/sdk");
const openai_1 = require("openai");
const prompts_1 = require("../../prompts");
const language_1 = require("./language");
let AiService = AiService_1 = class AiService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(AiService_1.name);
        this.anthropic = null;
        this.openai = null;
        this.groqApiKey = null;
        this.usesGroq = false;
        const anthropicKey = this.configService.get('ANTHROPIC_API_KEY');
        const openaiKey = this.configService.get('OPENAI_API_KEY');
        const groqKey = this.configService.get('GROQ_API_KEY');
        this.hasAnthropicKey = !!anthropicKey;
        this.hasOpenAiLikeKey = !!(openaiKey || groqKey);
        this.groqApiKey = groqKey || null;
        if (anthropicKey) {
            this.anthropic = new sdk_1.default({ apiKey: anthropicKey });
        }
        if (openaiKey) {
            this.openai = new openai_1.default({ apiKey: openaiKey });
        }
        else if (groqKey) {
            this.openai = new openai_1.default({
                apiKey: groqKey,
                baseURL: 'https://api.groq.com/openai/v1',
            });
            this.usesGroq = true;
        }
        if (!this.hasAnthropicKey) {
            this.logger.warn('ANTHROPIC_API_KEY not set - Anthropic image analysis disabled');
        }
        if (!this.hasOpenAiLikeKey) {
            this.logger.warn('OPENAI_API_KEY or GROQ_API_KEY not set - using mock audio/video/quote analysis');
        }
    }
    parseJson(content) {
        try {
            const cleaned = content.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
            return JSON.parse(cleaned);
        }
        catch (e) {
            const match = content.match(/\{[\s\S]*\}/);
            if (match) {
                return JSON.parse(match[0]);
            }
            throw new Error(`Failed to parse AI response JSON: ${content}`);
        }
    }
    async localizeDiagnosisResult(result, language) {
        const normalized = (0, language_1.normalizeLanguage)(language);
        if (normalized === 'en') {
            return result;
        }
        const prompt = `Translate this automotive diagnosis JSON into ${normalized === 'tj' ? 'Tajik' : 'Russian'}.
Rules:
- Return ONLY valid JSON.
- Keep the same keys and structure.
- Keep numeric values unchanged.
- Keep "severity" exactly as one of LOW, MEDIUM, HIGH, CRITICAL.
- Translate "problem", "diagnosis", each item in "partsNeeded", each item in "recommendations", and "urgency".
- Do not add or remove fields.

JSON:
${JSON.stringify(result)}`;
        try {
            if (this.hasOpenAiLikeKey && this.openai) {
                const completion = await this.openai.chat.completions.create({
                    model: this.getTextModel(),
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.1,
                });
                return this.parseJson(completion.choices[0].message.content || '');
            }
            if (this.hasAnthropicKey && this.anthropic) {
                const message = await this.anthropic.messages.create({
                    model: 'claude-opus-4-5',
                    max_tokens: 1024,
                    messages: [{ role: 'user', content: prompt }],
                });
                const text = message.content[0];
                if (text.type !== 'text') {
                    throw new Error('Unexpected Anthropic translation response type');
                }
                return this.parseJson(text.text);
            }
        }
        catch (error) {
            this.logger.error(`Diagnosis localization failed: ${error.message}`);
        }
        return result;
    }
    getTextModel() {
        return this.usesGroq ? 'llama-3.3-70b-versatile' : 'gpt-4';
    }
    mockDiagnosisResult(fileType, language) {
        const normalized = (0, language_1.normalizeLanguage)(language);
        const mocks = {
            en: {
                image: {
                    problem: 'Demo mode: AI image analysis unavailable',
                    diagnosis: 'No image-analysis API key is configured, so the backend cannot inspect the uploaded photo yet. Add ANTHROPIC_API_KEY or GROQ_API_KEY or OPENAI_API_KEY in Back/.env to get a real visual diagnosis.',
                    severity: 'MEDIUM',
                    estimatedCostMin: 0,
                    estimatedCostMax: 0,
                    partsNeeded: ['Configure AI API key'],
                    laborHours: 0,
                    recommendations: [
                        'Add ANTHROPIC_API_KEY, GROQ_API_KEY, or OPENAI_API_KEY to Back/.env',
                        'Restart the backend after updating environment variables',
                        'Re-upload the same image for a real AI analysis',
                    ],
                    urgency: 'Can wait',
                },
                audio: {
                    problem: 'Engine knocking noise detected',
                    diagnosis: 'Rhythmic knocking sound suggests pre-ignition or rod bearing wear. Could indicate low oil pressure or incorrect fuel octane.',
                    severity: 'HIGH',
                    estimatedCostMin: 200,
                    estimatedCostMax: 1500,
                    partsNeeded: ['Engine oil', 'Oil filter', 'Rod bearings (possible)'],
                    laborHours: 3,
                    recommendations: [
                        'Check oil level immediately',
                        'Use correct octane fuel',
                        'Schedule full engine inspection',
                    ],
                    urgency: 'Fix immediately',
                },
                video: {
                    problem: 'Transmission slipping observed',
                    diagnosis: 'Video shows delayed gear engagement and RPM fluctuation consistent with worn transmission clutch packs or low transmission fluid.',
                    severity: 'HIGH',
                    estimatedCostMin: 800,
                    estimatedCostMax: 2500,
                    partsNeeded: ['Transmission fluid', 'Transmission filter', 'Clutch pack (possible)'],
                    laborHours: 5,
                    recommendations: [
                        'Check transmission fluid level',
                        'Schedule transmission service',
                        'Avoid highway driving until repaired',
                    ],
                    urgency: 'Should fix soon',
                },
            },
            ru: {
                image: {
                    problem: 'Демо-режим: анализ изображения недоступен',
                    diagnosis: 'Ключ API для анализа изображений не настроен, поэтому backend пока не может проверить загруженную фотографию. Добавьте ANTHROPIC_API_KEY, GROQ_API_KEY или OPENAI_API_KEY в Back/.env для реальной визуальной диагностики.',
                    severity: 'MEDIUM',
                    estimatedCostMin: 0,
                    estimatedCostMax: 0,
                    partsNeeded: ['Настроить AI API ключ'],
                    laborHours: 0,
                    recommendations: [
                        'Добавьте ANTHROPIC_API_KEY, GROQ_API_KEY или OPENAI_API_KEY в Back/.env',
                        'Перезапустите backend после обновления переменных окружения',
                        'Загрузите то же изображение повторно для реального AI-анализа',
                    ],
                    urgency: 'Can wait',
                },
                audio: {
                    problem: 'Обнаружен стук двигателя',
                    diagnosis: 'Ритмичный стук может указывать на раннее воспламенение или износ шатунных вкладышей. Также возможны низкое давление масла или неподходящее октановое число топлива.',
                    severity: 'HIGH',
                    estimatedCostMin: 200,
                    estimatedCostMax: 1500,
                    partsNeeded: ['Моторное масло', 'Масляный фильтр', 'Шатунные вкладыши (возможно)'],
                    laborHours: 3,
                    recommendations: [
                        'Сразу проверьте уровень масла',
                        'Используйте топливо с правильным октановым числом',
                        'Запланируйте полную диагностику двигателя',
                    ],
                    urgency: 'Fix immediately',
                },
                video: {
                    problem: 'Обнаружено проскальзывание коробки передач',
                    diagnosis: 'Видео показывает задержку включения передачи и скачки оборотов, что может говорить об износе пакетов сцепления АКПП или низком уровне трансмиссионной жидкости.',
                    severity: 'HIGH',
                    estimatedCostMin: 800,
                    estimatedCostMax: 2500,
                    partsNeeded: ['Трансмиссионная жидкость', 'Фильтр коробки', 'Пакет сцепления (возможно)'],
                    laborHours: 5,
                    recommendations: [
                        'Проверьте уровень трансмиссионной жидкости',
                        'Запланируйте обслуживание коробки передач',
                        'Избегайте дальнейшей активной езды до ремонта',
                    ],
                    urgency: 'Should fix soon',
                },
            },
            tj: {
                image: {
                    problem: 'Ҳолати намоишӣ: таҳлили сурат дастнорас аст',
                    diagnosis: 'Калиди API барои таҳлили сурат танзим нашудааст, бинобар ин backend ҳоло наметавонад сурати боршударо тафтиш кунад. Барои ташхиси воқеӣ ба Back/.env ANTHROPIC_API_KEY, GROQ_API_KEY ё OPENAI_API_KEY илова кунед.',
                    severity: 'MEDIUM',
                    estimatedCostMin: 0,
                    estimatedCostMax: 0,
                    partsNeeded: ['Калиди AI API-ро танзим кунед'],
                    laborHours: 0,
                    recommendations: [
                        'Ба Back/.env ANTHROPIC_API_KEY, GROQ_API_KEY ё OPENAI_API_KEY илова кунед',
                        'Пас аз иваз кардани environment variables backend-ро аз нав оғоз кунед',
                        'Ҳамин суратро боз бор кунед, то таҳлили воқеии AI гиред',
                    ],
                    urgency: 'Can wait',
                },
                audio: {
                    problem: 'Садои кӯфтани муҳаррик ошкор шуд',
                    diagnosis: 'Садои кӯфтани ритмнок метавонад ба оташгирии пешазвақтӣ ё фарсудашавии подшипникҳои шатун ишора кунад. Инчунин метавонад аз паст будани фишори равған ё октани нодурусти сӯзишворӣ бошад.',
                    severity: 'HIGH',
                    estimatedCostMin: 200,
                    estimatedCostMax: 1500,
                    partsNeeded: ['Равғани муҳаррик', 'Филтри равған', 'Подшипникҳои шатун (эҳтимолан)'],
                    laborHours: 3,
                    recommendations: [
                        'Сатҳи равғанро фавран санҷед',
                        'Аз сӯзишвории бо октани дуруст истифода баред',
                        'Ташхиси пурраи муҳаррикро ба нақша гиред',
                    ],
                    urgency: 'Fix immediately',
                },
                video: {
                    problem: 'Лағжиши қуттии суръат ошкор шуд',
                    diagnosis: 'Дар видео дер даргир шудани фишанг ва тағйири номунтазами гардишҳо дида мешавад, ки метавонад ба фарсудашавии clutch pack-и қуттии суръат ё кам будани равғани трансмиссионӣ ишора кунад.',
                    severity: 'HIGH',
                    estimatedCostMin: 800,
                    estimatedCostMax: 2500,
                    partsNeeded: ['Равғани трансмиссионӣ', 'Филтри қуттӣ', 'Clutch pack (эҳтимолан)'],
                    laborHours: 5,
                    recommendations: [
                        'Сатҳи равғани трансмиссиониро санҷед',
                        'Хизматрасонии қуттии суръатро ба нақша гиред',
                        'То таъмир аз рондани фаъоли мошин худдорӣ кунед',
                    ],
                    urgency: 'Should fix soon',
                },
            },
        };
        return mocks[normalized][fileType] || mocks[normalized].image;
    }
    async analyzeImageWithGroq(imageBase64, carInfo) {
        if (!this.groqApiKey) {
            return this.mockDiagnosisResult('image', carInfo.language);
        }
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.groqApiKey}`,
            },
            body: JSON.stringify({
                model: 'meta-llama/llama-4-scout-17b-16e-instruct',
                temperature: 0.2,
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: (0, prompts_1.buildImagePrompt)(carInfo.make, carInfo.model, carInfo.year, carInfo.description, carInfo.language),
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: `data:image/jpeg;base64,${imageBase64}`,
                                },
                            },
                        ],
                    },
                ],
            }),
        });
        if (!response.ok) {
            throw new Error(`Groq image request failed with status ${response.status}`);
        }
        const payload = (await response.json());
        const content = payload.choices?.[0]?.message?.content;
        if (!content) {
            throw new Error('Groq image request returned empty content');
        }
        return this.parseJson(content);
    }
    async analyzeImage(imageBase64, carInfo) {
        if (this.hasAnthropicKey) {
            try {
                const message = await this.anthropic.messages.create({
                    model: 'claude-opus-4-5',
                    max_tokens: 1024,
                    messages: [
                        {
                            role: 'user',
                            content: [
                                {
                                    type: 'text',
                                    text: (0, prompts_1.buildImagePrompt)(carInfo.make, carInfo.model, carInfo.year, carInfo.description, carInfo.language),
                                },
                                {
                                    type: 'image',
                                    source: {
                                        type: 'base64',
                                        media_type: 'image/jpeg',
                                        data: imageBase64,
                                    },
                                },
                            ],
                        },
                    ],
                });
                const text = message.content[0];
                if (text.type !== 'text') {
                    throw new Error('Unexpected Anthropic response type');
                }
                const parsed = this.parseJson(text.text);
                return this.localizeDiagnosisResult(parsed, carInfo.language);
            }
            catch (error) {
                this.logger.error(`Anthropic image analysis failed: ${error.message}`);
            }
        }
        if (this.usesGroq) {
            try {
                const parsed = await this.analyzeImageWithGroq(imageBase64, carInfo);
                return this.localizeDiagnosisResult(parsed, carInfo.language);
            }
            catch (error) {
                this.logger.error(`Groq image analysis failed: ${error.message} \n Response Data if any.`, error);
            }
        }
        if (!this.hasAnthropicKey) {
            this.logger.warn('No image-analysis provider configured, returning demo response');
        }
        return this.localizeDiagnosisResult(this.mockDiagnosisResult('image', carInfo.language), carInfo.language);
    }
    async analyzeAudio(audioUrl, carInfo) {
        if (!this.hasOpenAiLikeKey) {
            this.logger.warn('Using mock audio diagnosis');
            return this.localizeDiagnosisResult(this.mockDiagnosisResult('audio', carInfo.language), carInfo.language);
        }
        try {
            const audioDescription = `Audio file at: ${audioUrl}. ${carInfo.description || 'Engine making unusual noise.'}`;
            const completion = await this.openai.chat.completions.create({
                model: this.getTextModel(),
                messages: [
                    {
                        role: 'system',
                        content: (0, prompts_1.buildAudioPrompt)(carInfo.make, carInfo.model, carInfo.year, carInfo.description, carInfo.language),
                    },
                    { role: 'user', content: audioDescription },
                ],
            });
            const parsed = this.parseJson(completion.choices[0].message.content || '');
            return this.localizeDiagnosisResult(parsed, carInfo.language);
        }
        catch (error) {
            this.logger.error(`Audio analysis failed: ${error.message}`);
            return this.localizeDiagnosisResult(this.mockDiagnosisResult('audio', carInfo.language), carInfo.language);
        }
    }
    async analyzeVideo(videoUrl, carInfo) {
        if (!this.hasOpenAiLikeKey) {
            this.logger.warn('Using mock video diagnosis');
            return this.localizeDiagnosisResult(this.mockDiagnosisResult('video', carInfo.language), carInfo.language);
        }
        try {
            const videoDescription = `Video file at: ${videoUrl}. ${carInfo.description || 'Vehicle showing unusual behavior.'}`;
            const completion = await this.openai.chat.completions.create({
                model: this.getTextModel(),
                messages: [
                    {
                        role: 'system',
                        content: (0, prompts_1.buildVideoPrompt)(carInfo.make, carInfo.model, carInfo.year, carInfo.description, carInfo.language),
                    },
                    { role: 'user', content: videoDescription },
                ],
            });
            const parsed = this.parseJson(completion.choices[0].message.content || '');
            return this.localizeDiagnosisResult(parsed, carInfo.language);
        }
        catch (error) {
            this.logger.error(`Video analysis failed: ${error.message}`);
            return this.localizeDiagnosisResult(this.mockDiagnosisResult('video', carInfo.language), carInfo.language);
        }
    }
    async checkQuoteFairness(diagnosis, quotedAmount) {
        if (!this.hasOpenAiLikeKey) {
            this.logger.warn('Using mock quote verdict');
            const estMin = Number(diagnosis.estimatedCostMin) || 0;
            const estMax = Number(diagnosis.estimatedCostMax) || 0;
            const midpoint = (estMin + estMax) / 2;
            const diff = midpoint === 0 ? 0 : ((quotedAmount - midpoint) / midpoint) * 100;
            return {
                verdict: diff > 30 ? 'OVERPRICED' : diff < -30 ? 'CHEAP' : 'FAIR',
                percentageDifference: Math.abs(Math.round(diff)),
                explanation: `Quote of $${quotedAmount} compared to estimated range $${estMin}-$${estMax}.`,
                recommendedRange: { min: estMin, max: estMax },
                breakdown: {
                    partsEstimate: estMin * 0.4,
                    laborEstimate: estMin * 0.6,
                    reasonableTotal: midpoint,
                },
                negotiationTips: [
                    'Ask for itemized parts and labor breakdown',
                    'Get a second opinion from another shop',
                ],
            };
        }
        try {
            const prompt = (0, prompts_1.buildCheckQuotePrompt)(diagnosis.carYear, diagnosis.carMake, diagnosis.carModel, diagnosis.problem, diagnosis.diagnosis, quotedAmount, Number(diagnosis.estimatedCostMin), Number(diagnosis.estimatedCostMax));
            const completion = await this.openai.chat.completions.create({
                model: this.getTextModel(),
                messages: [{ role: 'system', content: prompt }],
            });
            return this.parseJson(completion.choices[0].message.content || '');
        }
        catch (error) {
            this.logger.error(`Quote fairness check failed: ${error.message}`);
            const estMin = Number(diagnosis.estimatedCostMin) || 0;
            const estMax = Number(diagnosis.estimatedCostMax) || 0;
            return {
                verdict: 'FAIR',
                percentageDifference: 0,
                explanation: 'Unable to analyze quote at this time. Quote appears within general range.',
                recommendedRange: { min: estMin, max: estMax },
                breakdown: { partsEstimate: 0, laborEstimate: 0, reasonableTotal: 0 },
                negotiationTips: ['Request an itemized invoice'],
            };
        }
    }
    async analyzeObdCodes(codes) {
        const knownCodes = {
            P0300: {
                description: 'Random/Multiple Cylinder Misfire',
                severity: 'HIGH',
                recommendation: 'Check spark plugs, ignition coils, and fuel injectors',
            },
            P0301: {
                description: 'Cylinder 1 Misfire',
                severity: 'HIGH',
                recommendation: 'Inspect cylinder 1 spark plug and ignition coil',
            },
            P0171: {
                description: 'System Too Lean (Bank 1)',
                severity: 'MEDIUM',
                recommendation: 'Check for vacuum leaks and inspect MAF sensor',
            },
            P0172: {
                description: 'System Too Rich (Bank 1)',
                severity: 'MEDIUM',
                recommendation: 'Inspect fuel pressure regulator and O2 sensors',
            },
            P0420: {
                description: 'Catalyst Efficiency Below Threshold',
                severity: 'MEDIUM',
                recommendation: 'Inspect catalytic converter and O2 sensors',
            },
            P0442: {
                description: 'EVAP System Small Leak',
                severity: 'LOW',
                recommendation: 'Check gas cap and EVAP hoses',
            },
            P0455: {
                description: 'EVAP System Large Leak',
                severity: 'MEDIUM',
                recommendation: 'Inspect EVAP canister and purge valve',
            },
            P0101: {
                description: 'MAF Sensor Range/Performance',
                severity: 'MEDIUM',
                recommendation: 'Clean or replace MAF sensor',
            },
            P0128: {
                description: 'Coolant Below Thermostat Temp',
                severity: 'LOW',
                recommendation: 'Replace thermostat',
            },
            P0401: {
                description: 'EGR Flow Insufficient',
                severity: 'MEDIUM',
                recommendation: 'Clean or replace EGR valve',
            },
            P0700: {
                description: 'Transmission Control System Fault',
                severity: 'CRITICAL',
                recommendation: 'Immediate transmission inspection required',
            },
        };
        if (!this.hasOpenAiLikeKey) {
            return codes.map((code) => {
                const known = knownCodes[code];
                return {
                    code,
                    description: known?.description || `Unknown OBD code: ${code}`,
                    severity: known?.severity || 'MEDIUM',
                    recommendation: known?.recommendation || 'Consult a certified mechanic for diagnosis',
                };
            });
        }
        try {
            const completion = await this.openai.chat.completions.create({
                model: this.getTextModel(),
                messages: [
                    {
                        role: 'system',
                        content: `You are an OBD-II diagnostic expert. Analyze these error codes and return ONLY valid JSON array - no markdown:
[{"code":"P0300","description":"...","severity":"HIGH","recommendation":"..."}]
Severity must be one of: LOW, MEDIUM, HIGH, CRITICAL`,
                    },
                    { role: 'user', content: `Analyze these OBD codes: ${codes.join(', ')}` },
                ],
            });
            return this.parseJson(completion.choices[0].message.content || '');
        }
        catch (error) {
            this.logger.error(`OBD analysis failed: ${error.message}`);
            return codes.map((code) => {
                const known = knownCodes[code];
                return {
                    code,
                    description: known?.description || `Unknown OBD code: ${code}`,
                    severity: known?.severity || 'MEDIUM',
                    recommendation: known?.recommendation || 'Consult a certified mechanic',
                };
            });
        }
    }
    async runSecondaryAgents(primary, carInfo) {
        const defaultData = {
            shops: [],
            videos: [],
            partsStores: [],
            mechanics: [],
            pricing: { summary: 'Mock pricing summary', comparison: 'Fair' },
        };
        if (!this.hasOpenAiLikeKey) {
            return defaultData;
        }
        const city = carInfo.city || 'local area';
        const context = `Car: ${carInfo.year} ${carInfo.make} ${carInfo.model}. Problem: ${primary.problem}. Parts needed: ${primary.partsNeeded?.join(', ') || 'unknown'}. City: ${city}.`;
        try {
            const p1 = this.openai.chat.completions.create({
                model: this.getTextModel(),
                messages: [
                    { role: 'system', content: `You are Agent 1 (Location). You MUST find 3 real or highly realistic repair shops specifically located in: ${city}. Return ONLY valid JSON array: [{"name":"Shop A","address":"123 St","distance":"1.2 miles"}]` },
                    { role: 'user', content: context }
                ]
            });
            const p2 = this.openai.chat.completions.create({
                model: this.getTextModel(),
                messages: [
                    { role: 'system', content: `You are Agent 3 (Videos). Propose 3 specific, highly relevant YouTube search queries for this repair. Return ONLY valid JSON array where the URL is a real YouTube search link: [{"title":"How to fix an engine oil leak","url":"https://www.youtube.com/results?search_query=how+to+fix+engine+oil+leak"}]` },
                    { role: 'user', content: context }
                ]
            });
            const p3 = this.openai.chat.completions.create({
                model: this.getTextModel(),
                messages: [
                    { role: 'system', content: `You are Agent 4 (Store Parts). Find 3 specific parts required for this repair with estimated local prices in ${city}. Use online stores available to that region. Return ONLY valid JSON array: [{"store":"AutoZone","price":45,"link":"https://autozone.com"}]` },
                    { role: 'user', content: context }
                ]
            });
            const p4 = this.openai.chat.completions.create({
                model: this.getTextModel(),
                messages: [
                    { role: 'system', content: `You are Agent 5 (Mechanic Finder). Find 3 mobile or private mechanics specifically in ${city}. Return ONLY valid JSON array: [{"name":"John Express","phone":"+1-555-0102","specialty":"Engines"}]` },
                    { role: 'user', content: context }
                ]
            });
            const p5 = this.openai.chat.completions.create({
                model: this.getTextModel(),
                messages: [
                    { role: 'system', content: `You are Agent 6 (Pricing Expert). Analyze labor hours and part costs. Return ONLY valid JSON: {"summary":"Labor expects 2h ($150), Parts ($80).","comparison":"Dealer would charge twice this."}` },
                    { role: 'user', content: context }
                ]
            });
            const results = await Promise.allSettled([p1, p2, p3, p4, p5]);
            const parseOrEmptyArr = (res) => {
                if (res.status === 'fulfilled' && res.value?.choices?.[0]?.message?.content) {
                    try {
                        return this.parseJson(res.value.choices[0].message.content);
                    }
                    catch {
                        return [];
                    }
                }
                return [];
            };
            const parseOrEmptyObj = (res, def) => {
                if (res.status === 'fulfilled' && res.value?.choices?.[0]?.message?.content) {
                    try {
                        return this.parseJson(res.value.choices[0].message.content);
                    }
                    catch {
                        return def;
                    }
                }
                return def;
            };
            return {
                shops: parseOrEmptyArr(results[0]),
                videos: parseOrEmptyArr(results[1]),
                partsStores: parseOrEmptyArr(results[2]),
                mechanics: parseOrEmptyArr(results[3]),
                pricing: parseOrEmptyObj(results[4], defaultData.pricing),
            };
        }
        catch (e) {
            this.logger.error('Orchestration failed', e);
            return defaultData;
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = AiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AiService);
//# sourceMappingURL=ai.service.js.map