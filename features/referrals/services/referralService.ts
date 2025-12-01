import { apiClient, ApiError } from '@/lib/api/client';
import type { Referral, CreateReferralInput, ReferralsResponse } from '@/features/referrals/types/referral.types';
import { REFERRALS_BY_PAGE } from '@/features/referrals/consts/referralConsts';
import { useErrorSimulationStore } from '@/lib/store/errorSimulationStore';

function simulateError() {
  const { enabled, statusCode } = useErrorSimulationStore.getState();
  if (enabled) {
    throw new ApiError(
      `Simulated API error: ${statusCode || 500}`,
      statusCode || 500,
      { simulated: true }
    );
  }
}

export const referralService = {
  async getReferrals(page: number = 1, limit: number = REFERRALS_BY_PAGE): Promise<ReferralsResponse> {
    simulateError();

    const allReferrals = await apiClient<Referral[]>('/referrals?sortBy=id&order=desc');
    const sortedReferrals = allReferrals.sort((a, b) => {
      return Number(b.id) - Number(a.id);
    });
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedReferrals = sortedReferrals.slice(startIndex, endIndex);
    
    return {
      list: paginatedReferrals,
      total: sortedReferrals.length,
    };
  },

  async getAllReferrals(): Promise<ReferralsResponse> {
    simulateError();

    const allReferrals = await apiClient<Referral[]>('/referrals?sortBy=id&order=desc');
    const sortedReferrals = allReferrals.sort((a, b) => {
      return Number(b.id) - Number(a.id);
    });

    return {
      list: sortedReferrals,
      total: sortedReferrals.length,
    };
  },

  async getReferralById(id: string): Promise<Referral> {
    simulateError();
    
    const referral = await apiClient<Referral>(`/referrals/${id}`);
    
    return referral;
  },

  async createReferral(input: CreateReferralInput): Promise<Referral> {
    const newReferral = await apiClient<Referral>('/referrals', {
      method: 'POST',
      body: JSON.stringify({
        ...input,
        avatar: `https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/${Math.floor(Math.random() * 100)}.jpg`,
        description: '',
        user: input.name.toLowerCase().replace(/\s+/g, '_'),
        state: false,
      }),
    });
    return newReferral;
  },

  async deleteReferral(id: string): Promise<void> {
    simulateError();
    
    await apiClient<void>(`/referrals/${id}`, {
      method: 'DELETE',
    });
  },
};

