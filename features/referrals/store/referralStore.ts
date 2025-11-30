import { create } from 'zustand';

interface ReferralStore {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const useReferralStore = create<ReferralStore>((set) => ({
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
}));

