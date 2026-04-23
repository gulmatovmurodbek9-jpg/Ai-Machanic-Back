export type SupportedLanguage = 'tj' | 'ru' | 'en';
export declare const DEFAULT_LANGUAGE: SupportedLanguage;
export declare function normalizeLanguage(language?: string): SupportedLanguage;
export declare function getLanguageInstruction(language?: string): string;
