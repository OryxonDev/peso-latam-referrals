'use client';

import { useLayoutStore } from '@/features/layout/store/layoutStore';
import { useTranslations } from '@/lib/i18n/useTranslations';

export function MobileMenu() {
  const { t } = useTranslations();
  const { toggleSidebar } = useLayoutStore();

  return (
    <button
      onClick={toggleSidebar}
      className="md:hidden p-2 text-primary hover:bg-gray-100 rounded-lg transition-colors"
      aria-label={t('layout.header.toggleMenu')}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
}

