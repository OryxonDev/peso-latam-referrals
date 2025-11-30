'use client';

import { useReferrals } from '@/features/referrals/hooks/useReferrals';
import { ReferralCard } from '@/features/referrals/components/ReferralList/ReferralCard';
import { ReferralListLoading } from '@/features/referrals/components/ReferralList/ReferralListLoading';
import { ReferralListError } from '@/features/referrals/components/ReferralList/ReferralListError';
import { useReferralStore } from '@/features/referrals/store/referralStore';

export function ReferralList() {
  const { referrals } = useReferrals();
  const { currentPage, setCurrentPage } = useReferralStore();

  if (referrals.isLoading) {
    return <ReferralListLoading />;
  }

  if (referrals.isError) {
    return <ReferralListError error={referrals.error} />;
  }

  if (!referrals.data?.list || referrals.data.list.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No hay referidos disponibles</p>
      </div>
    );
  }

  const totalPages = Math.ceil(referrals.data.total / 9);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {referrals.data.list.map((referral) => (
          <ReferralCard key={referral.id} referral={referral} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={!hasPrevPage}
            className="px-4 py-2 bg-[#082422] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#082422]/90 transition-colors"
          >
            Anterior
          </button>
          <span className="text-gray-600">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={!hasNextPage}
            className="px-4 py-2 bg-[#082422] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#082422]/90 transition-colors"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

