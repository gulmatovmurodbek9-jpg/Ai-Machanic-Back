export type SupportedLanguage = 'tj' | 'ru' | 'en';

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export function normalizeLanguage(language?: string): SupportedLanguage {
  if (language === 'tj' || language === 'ru' || language === 'en') {
    return language;
  }

  return DEFAULT_LANGUAGE;
}

export function getLanguageInstruction(language?: string): string {
  const normalized = normalizeLanguage(language);

  if (normalized === 'tj') {
    return 'Write all human-readable values in Tajik. Keep JSON keys in English.';
  }

  if (normalized === 'ru') {
    return 'Write all human-readable values in Russian. Keep JSON keys in English.';
  }

  return 'Write all human-readable values in English. Keep JSON keys in English.';
}
