import { useMutation, useQueryClient } from '@tanstack/react-query';
import { referralService } from '../services/referralService';
import type { CreateReferralInput } from '../types/referral.types';

export function useCreateReferral() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateReferralInput) =>
      referralService.createReferral(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
    },
    retry: 3,
  });
}

