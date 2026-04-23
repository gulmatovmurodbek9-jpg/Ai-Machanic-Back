"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_LANGUAGE = void 0;
exports.normalizeLanguage = normalizeLanguage;
exports.getLanguageInstruction = getLanguageInstruction;
exports.DEFAULT_LANGUAGE = 'en';
function normalizeLanguage(language) {
    if (language === 'tj' || language === 'ru' || language === 'en') {
        return language;
    }
    return exports.DEFAULT_LANGUAGE;
}
function getLanguageInstruction(language) {
    const normalized = normalizeLanguage(language);
    if (normalized === 'tj') {
        return 'Write all human-readable values in Tajik. Keep JSON keys in English.';
    }
    if (normalized === 'ru') {
        return 'Write all human-readable values in Russian. Keep JSON keys in English.';
    }
    return 'Write all human-readable values in English. Keep JSON keys in English.';
}
//# sourceMappingURL=language.js.map