'use client';

import { useEffect, useRef, useState } from 'react';
import { useGetReferrals } from '@/features/referrals/hooks/useGetReferrals';
import { ReferralCard } from '@/features/referrals/components/ReferralList/ReferralCard';
import { ReferralListLoading } from '@/features/referrals/components/ReferralList/ReferralListLoading';
import { ReferralListError } from '@/features/referrals/components/ReferralList/ReferralListError';
import { ReferralListEmpty } from '@/features/referrals/components/ReferralList/ReferralListEmpty';
import { useReferralStore } from '@/features/referrals/store/referralStore';
import { REFERRALS_BY_PAGE } from '@/features/referrals/consts/referralConsts';
import { useTranslations } from '@/lib/i18n/useTranslations';

export function ReferralList() {
  const { t } = useTranslations();
  const { referrals } = useGetReferrals();
  const { currentPage, setCurrentPage } = useReferralStore();
  const listRef = useRef<HTMLDivElement>(null);
  const [pageChanged, setPageChanged] = useState<boolean>(false);

  useEffect(() => {
    if (listRef.current && !referrals.isLoading && referrals.data?.list && pageChanged) {
      const rect = listRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop - 90;
      window.scrollTo({ top: elementTop, behavior: 'smooth' });
    }
  }, [currentPage, referrals.isLoading, referrals.data?.list, pageChanged]);

  if (referrals.isLoading) {
    return <ReferralListLoading />;
  }

  if (referrals.isError) {
    return <ReferralListError error={referrals.error} refetch={referrals.refetch} />;
  }

  if (!referrals.data?.list || referrals.data.list.length === 0) {
    return <ReferralListEmpty />;
  }

  const totalPages = Math.ceil(referrals.data.total / REFERRALS_BY_PAGE);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const handlePrevPage = () => {
    setPageChanged(true);
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setPageChanged(true);
    setCurrentPage(currentPage + 1);
  };
  return (
    <div ref={listRef}>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {referrals.data.list.map((referral) => (
          <ReferralCard key={referral.id} referral={referral} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrevPage}
            disabled={!hasPrevPage}
            className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 active:bg-accent active:text-primary transition-colors"
          >
            {t('common.previous')}
          </button>
          <span className="text-gray-600">
            {t('referrals.list.pagination.page', { current: currentPage, total: totalPages })}
          </span>
          <button
            onClick={handleNextPage}
            disabled={!hasNextPage}
            className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 active:bg-accent active:text-primary transition-colors"
          >
            {t('common.next')}
          </button>
        </div>
      )}
    </div>
  );
}

