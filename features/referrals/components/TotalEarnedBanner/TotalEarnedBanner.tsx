'use client';

import { useReferrals } from '@/features/referrals/hooks/useReferrals';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { TotalEarnedBannerError } from '@/features/referrals/components/TotalEarnedBanner/TotalEarnedBannerError';
import { TotalEarnedBannerLoading } from '@/features/referrals/components/TotalEarnedBanner/TotalEarnedBannerLoading';

export function TotalEarnedBanner() {
  const { allReferrals } = useReferrals();
  const totalConfirmed = allReferrals.data?.list?.filter((referral) => referral.state).length ?? 0;
  const totalPending = allReferrals.data?.list?.filter((referral) => !referral.state).length ?? 0;
  const totalEarned = totalConfirmed * 50;

  if (allReferrals.isLoading) {
    return <TotalEarnedBannerLoading />;
  }

  if (allReferrals.isError) {
    return <TotalEarnedBannerError error={allReferrals.error} />;
  }

  return (
    <div className="mb-8 rounded-lg bg-gradient-to-br from-[#ffdb3a]/20 to-[#ffdb3a]/10 p-6 border border-[#ffdb3a]/30">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#082422] mb-1">
            Total ganado
          </h3>
          <p className="mb-4 text-3xl font-bold text-[#082422]">
            {formatCurrency(totalEarned)}
          </p>
          <p className="text-sm text-gray-600">
            Confirmados: <span className="font-semibold text-[#082422]">{totalConfirmed}</span>
          </p>
          <p className="text-sm text-gray-600">
            Pendientes: <span className="font-semibold text-[#082422]">{totalPending}</span>
          </p>
        </div>
        <div className="hidden md:block">
          <div className="w-16 h-16 rounded-full bg-[#ffdb3a]/30 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#ffdb3a]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

