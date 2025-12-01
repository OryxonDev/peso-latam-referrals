import { useQuery } from '@tanstack/react-query';
import { referralService } from '@/features/referrals/services/referralService';
import { useReferralStore } from '@/features/referrals/store/referralStore';
import { REFERRALS_BY_PAGE } from '@/features/referrals/consts/referralConsts';

export function useGetReferrals() {
  const { currentPage } = useReferralStore();

  const referrals = useQuery({
    queryKey: ['referrals', currentPage],
    queryFn: () => referralService.getReferrals(currentPage, REFERRALS_BY_PAGE),
  });

  const allReferrals = useQuery({
    queryKey: ['all-referrals'],
    queryFn: () => referralService.getAllReferrals(),
  });

  const referralById = (id: string) => useQuery({
    queryKey: ['referral-by-id', id],
    queryFn: () => referralService.getReferralById(id),
    enabled: !!id,
  });

  return {
    referrals,
    allReferrals,
    referralById,
  };
}

