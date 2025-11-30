import { useQuery } from '@tanstack/react-query';
import { referralService } from '../services/referralService';
import { useReferralStore } from '../store/referralStore';

export function useReferrals() {
  const { currentPage } = useReferralStore();
  const STALE_TIME = 1000 * 60 * 5;

  const referrals = useQuery({
    queryKey: ['referrals', currentPage],
    queryFn: () => referralService.getReferrals(currentPage, 9),
    retry: 3,
    staleTime: STALE_TIME,
  });

  const allReferrals = useQuery({
    queryKey: ['all-referrals'],
    queryFn: () => referralService.getAllReferrals(),
    retry: 3,
    staleTime: STALE_TIME,
  });

  const referralById = (id: string) => useQuery({
    queryKey: ['referral-by-id', id],
    queryFn: () => referralService.getReferralById(id),
    retry: 3,
    enabled: !!id,
    staleTime: STALE_TIME,
  });

  return {
    referrals,
    allReferrals,
    referralById,
  };
}

