'use client';

import Link from 'next/link';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { PRICE_PER_REFERRAL } from '@/features/referrals/consts/referralConsts';
import { useTranslations } from '@/lib/i18n/useTranslations';

export function ReferralListEmpty() {
  const { t } = useTranslations();
  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6 flex justify-center">
          <svg
            className="w-24 h-24 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-primary mb-2">
          {t('referrals.list.empty.title')}
        </h3>
        <p className="text-gray-600 mb-6">
          {t('referrals.list.empty.message', { amount: formatCurrency(PRICE_PER_REFERRAL) })}
        </p>
        <Link
          href="/add-referral"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 active:bg-accent active:text-primary transition-colors"
        >
          {t('referrals.list.empty.inviteFirst')}
        </Link>
      </div>
    </div>
  );
}

