import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Locale } from './translations';

interface I18nStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useI18nStore = create<I18nStore>()(
  persist(
    (set) => ({
      locale: 'es',
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: 'i18n-storage',
    }
  )
);

