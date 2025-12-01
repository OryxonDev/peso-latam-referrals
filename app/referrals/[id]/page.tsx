'use client';

import { ReferralProfile } from '@/features/referrals/components/ReferralProfile/ReferralProfile';
import Link from 'next/link';
import { useTranslations } from '@/lib/i18n/useTranslations';
import { use } from 'react';

interface ReferralPageProps {
  params: Promise<{ id: string }>;
}

export default function ReferralPage({ params }: ReferralPageProps) {
  const { t } = useTranslations();
  const { id } = use(params);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            {t('referrals.profile.title')}
          </h1>
          <p className="text-gray-600">
            {t('referrals.profile.subtitle')}
          </p>
        </div>

        <Link
            href="/"
            className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 active:bg-accent active:text-primary transition-colors"
          >
            {t('common.back')}
          </Link>
      </div>
      <ReferralProfile id={id} />
    </div>
  );
}

