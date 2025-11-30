import { useQuery } from '@tanstack/react-query';
import { referralService } from '../services/referralService';
import { useReferralStore } from '../store/referralStore';

export function useReferrals() {
  const { currentPage } = useReferralStore();

  return useQuery({
    queryKey: ['referrals', currentPage],
    queryFn: () => referralService.getReferrals(currentPage, 9),
    retry: 3,
  });
}

