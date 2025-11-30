import { apiClient } from '@/lib/api/client';
import type { Referral, CreateReferralInput, ReferralsResponse } from '../types/referral.types';

export const referralService = {
  async getReferrals(page: number = 1, limit: number = 9): Promise<ReferralsResponse> {
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
};

