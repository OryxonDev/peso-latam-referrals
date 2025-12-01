import { useMutation, useQueryClient } from '@tanstack/react-query';
import { referralService } from '@/features/referrals/services/referralService';
import { useRouter } from 'next/navigation';

export function useDeleteReferral() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (id: string) => referralService.deleteReferral(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
      queryClient.invalidateQueries({ queryKey: ['all-referrals'] });
      router.push('/');
    },
    retry: 3,
  });
}

