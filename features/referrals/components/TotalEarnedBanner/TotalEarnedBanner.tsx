'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useGetReferrals } from '@/features/referrals/hooks/useGetReferrals';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { TotalEarnedBannerError } from '@/features/referrals/components/TotalEarnedBanner/TotalEarnedBannerError';
import { TotalEarnedBannerLoading } from '@/features/referrals/components/TotalEarnedBanner/TotalEarnedBannerLoading';
import { PRICE_PER_REFERRAL } from '@/features/referrals/consts/referralConsts';
import { useTranslations } from '@/lib/i18n/useTranslations';

export function TotalEarnedBanner() {
  const { t } = useTranslations();
  const { allReferrals } = useGetReferrals();
  const videoRef = useRef<HTMLVideoElement>(null);
  const totalConfirmed = allReferrals.data?.list?.filter((referral) => referral.state).length ?? 0;
  const totalPending = allReferrals.data?.list?.filter((referral) => !referral.state).length ?? 0;
  const totalEarned = totalConfirmed * PRICE_PER_REFERRAL;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  if (allReferrals.isLoading) {
    return <TotalEarnedBannerLoading />;
  }

  if (allReferrals.isError) {
    return <TotalEarnedBannerError error={allReferrals.error} refetch={allReferrals.refetch} />;
  }

  return (
    <div className="mb-8 rounded-lg overflow-hidden relative">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/total-earned-bg-optimized.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 bg-gradient-to-br from-accent/20 to-accent/10 p-6">
        <div className="flex flex-col md:flex-row items-center text-center md:text-left justify-between gap-4">
          <div className="w-1/2 md:w-2/3">
            <h3 className="text-lg font-semibold text-primary mb-1">
              {t('totalEarned.title')}
            </h3>
            <p className="mb-4 text-4xl md:text-5xl font-bold text-primary">
              {formatCurrency(totalEarned)}
            </p>
            <p className="text-sm text-gray-900">
            <span className="font-semibold text-primary">{totalConfirmed}</span> {t('totalEarned.confirmed')}
            </p>
            <p className="text-sm text-gray-900">
              <span className="font-semibold text-primary">{totalPending}</span> {t('totalEarned.invited')}
            </p>
          </div>
          <div className="text-center md:text-right space-y-4 w-1/1 md:w-2/3 lg:w-1/3">
            <div className="ml-auto">{t('totalEarned.message', { amount: formatCurrency(PRICE_PER_REFERRAL) })}</div>
            <Link
              href="/add-referral"
              className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 active:bg-accent active:text-primary transition-colors"
            >
              {t('totalEarned.inviteButton')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

