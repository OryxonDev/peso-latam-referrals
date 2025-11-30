import { apiClient } from '@/lib/api/client';
import type { Referral, CreateReferralInput, ReferralsResponse } from '../types/referral.types';

export const referralService = {
  async getReferrals(page: number = 1, limit: number = 9): Promise<ReferralsResponse> {
    const allReferrals = await apiClient<Referral[]>('/referrals');
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedReferrals = allReferrals.slice(startIndex, endIndex);
    
    return {
      list: paginatedReferrals,
      total: allReferrals.length,
    };
  },

  async getAllReferrals(): Promise<ReferralsResponse> {
    const allReferrals = await apiClient<Referral[]>('/referrals');

    return {
      list: allReferrals,
      total: allReferrals.length,
    };
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
};

