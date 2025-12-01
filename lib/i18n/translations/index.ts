import { es } from './es';
import { pt } from './pt';

export const translations = {
  es,
  pt,
} as const;

export type TranslationKey = string;
export type Locale = keyof typeof translations;

