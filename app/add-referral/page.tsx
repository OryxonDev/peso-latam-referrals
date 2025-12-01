'use client';

import { ReferralForm } from '@/features/referrals/components/ReferralInvite/ReferralForm';
import { ReferralLinkCard } from '@/features/referrals/components/ReferralInvite/ReferralLinkCard';
import { PRICE_PER_REFERRAL } from '@/features/referrals/consts/referralConsts';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { useTranslations } from '@/lib/i18n/useTranslations';

export default function AddReferralPage() {
  const { t } = useTranslations();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          {t('referrals.invite.title')}
        </h1>
        <p className="text-gray-600">
          {t('referrals.invite.subtitle', { amount: formatCurrency(PRICE_PER_REFERRAL) })}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8">
        <ReferralForm />
      </div>
      <div className="mt-10 mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">
          {t('referrals.invite.shareLinkTitle')}
        </h2>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8">
        <ReferralLinkCard />
      </div>
    </div>
  );
}

