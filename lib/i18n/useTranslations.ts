import { translations } from './translations';
import { getNestedValue, replacePlaceholders } from './utils';
import { useI18nStore } from './store';

export function useTranslations() {
  const locale = useI18nStore((state) => state.locale);
  
  const t = (key: string, params?: Record<string, string | number>): string => {
    const translation = getNestedValue(translations[locale], key);
    if (params) {
      return replacePlaceholders(translation, params);
    }
    return translation;
  };

  return { t };
}

