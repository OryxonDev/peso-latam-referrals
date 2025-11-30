import { useQuery } from '@tanstack/react-query';
import { referralService } from '../services/referralService';
import { useReferralStore } from '../store/referralStore';

export function useReferrals() {
  const { currentPage } = useReferralStore();

  const referrals = useQuery({
    queryKey: ['referrals', currentPage],
    queryFn: () => referralService.getReferrals(currentPage, 9),
    retry: 3,
  });

  const allReferrals = useQuery({
    queryKey: ['all-referrals'],
    queryFn: () => referralService.getAllReferrals(),
    retry: 3,
  });

  return {
    referrals,
    allReferrals,
  };
}

