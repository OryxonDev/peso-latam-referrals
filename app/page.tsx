'use client';

import { ReferralList } from '@/features/referrals/components/ReferralList/ReferralList';
import { TotalEarnedBanner } from '@/features/referrals/components/TotalEarnedBanner/TotalEarnedBanner';
import { useTranslations } from '@/lib/i18n/useTranslations';

export default function Home() {
  const { t } = useTranslations();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          {t('home.title')}
        </h1>
        <p className="text-gray-600">
          {t('home.subtitle')}
        </p>
      </div>
      <TotalEarnedBanner />
      <ReferralList />
    </div>
  );
}
