import { translations } from './translations';
import { getNestedValue, replacePlaceholders } from './utils';

export function getTranslation(
  key: string,
  locale: keyof typeof translations = 'es',
  params?: Record<string, string | number>
): string {
  const translation = getNestedValue(translations[locale], key);
  if (params) {
    return replacePlaceholders(translation, params);
  }
  return translation;
}

