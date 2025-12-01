'use client';

import Link from 'next/link';
import { useReferrals } from '@/features/referrals/hooks/useReferrals';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { TotalEarnedBannerError } from '@/features/referrals/components/TotalEarnedBanner/TotalEarnedBannerError';
import { TotalEarnedBannerLoading } from '@/features/referrals/components/TotalEarnedBanner/TotalEarnedBannerLoading';
import { PRICE_PER_REFERRAL } from '@/features/referrals/consts/referralConsts';

export function TotalEarnedBanner() {
  const { allReferrals } = useReferrals();
  const totalConfirmed = allReferrals.data?.list?.filter((referral) => referral.state).length ?? 0;
  const totalPending = allReferrals.data?.list?.filter((referral) => !referral.state).length ?? 0;
  const totalEarned = totalConfirmed * PRICE_PER_REFERRAL;

  if (allReferrals.isLoading) {
    return <TotalEarnedBannerLoading />;
  }

  if (allReferrals.isError) {
    return <TotalEarnedBannerError error={allReferrals.error} refetch={allReferrals.refetch} />;
  }

  return (
    <div className="mb-8 rounded-lg overflow-hidden relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/total-earned-bg-optimized.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 bg-gradient-to-br from-accent/20 to-accent/10 p-6">
        <div className="flex flex-col md:flex-row items-center text-center md:text-left justify-between gap-4">
          <div className="w-1/2 md:w-2/3">
            <h3 className="text-lg font-semibold text-primary mb-1">
              Total ganado
            </h3>
            <p className="mb-4 text-4xl md:text-5xl font-bold text-primary">
              {formatCurrency(totalEarned)}
            </p>
            <p className="text-sm text-gray-900">
            <span className="font-semibold text-primary">{totalConfirmed}</span> confirmados
            </p>
            <p className="text-sm text-gray-900">
              <span className="font-semibold text-primary">{totalPending}</span> invitados
            </p>
          </div>
          <div className="text-center md:text-right space-y-4 w-1/1 md:w-2/3 lg:w-1/3">
            <div className="ml-auto">Puedes invitar a más personas para ganar más dinero. Por cada referido confirmado, ganas <span className="font-semibold text-primary">{formatCurrency(PRICE_PER_REFERRAL)}</span>.</div>
            <Link
              href="/add-referral"
              className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 active:bg-accent active:text-primary transition-colors"
            >
              Invitar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

