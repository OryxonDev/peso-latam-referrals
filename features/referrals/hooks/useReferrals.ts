import { useQuery } from '@tanstack/react-query';
import { referralService } from '@/features/referrals/services/referralService';
import { useReferralStore } from '@/features/referrals/store/referralStore';

export function useReferrals() {
  const { currentPage } = useReferralStore();
  const STALE_TIME = 1000 * 60 * 5;

  const referrals = useQuery({
    queryKey: ['referrals', currentPage],
    queryFn: () => referralService.getReferrals(currentPage, 9),
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

