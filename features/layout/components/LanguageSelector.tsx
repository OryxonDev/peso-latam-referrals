'use client';

import { useState, useRef, useEffect } from 'react';
import { useI18nStore } from '@/lib/i18n/store';
import type { Locale } from '@/lib/i18n/translations';

const languages: { code: Locale; name: string }[] = [
  { code: 'es', name: 'Español' },
  { code: 'pt', name: 'Português' },
];

export function LanguageSelector() {
  const { locale, setLocale } = useI18nStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (code: Locale) => {
    setLocale(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Seleccionar idioma"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-gray-700">
          {currentLanguage.name}
        </span>
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleSelect(language.code)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                locale === language.code ? 'bg-accent/20' : ''
              }`}
            >
              <span className="text-sm font-medium text-gray-700">{language.name}</span>
              {locale === language.code && (
                <svg
                  className="w-4 h-4 text-primary ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

