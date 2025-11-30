import { create } from 'zustand';

interface ErrorSimulationStore {
  enabled: boolean;
  statusCode: number | null;
  toggle: () => void;
  setStatusCode: (code: number | null) => void;
  reset: () => void;
}

export const useErrorSimulationStore = create<ErrorSimulationStore>((set) => ({
  enabled: false,
  statusCode: null,
  toggle: () => set((state) => ({ enabled: !state.enabled })),
  setStatusCode: (code) => set({ statusCode: code }),
  reset: () => set({ enabled: false, statusCode: null }),
}));

