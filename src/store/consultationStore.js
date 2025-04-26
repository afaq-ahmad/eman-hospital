import { create } from 'zustand';

const useConsultStore = create(set => ({
  step: 1,
  next: () => set(s => ({ step: Math.min(s.step + 1, 3) })),
  prev: () => set(s => ({ step: Math.max(s.step - 1, 1) })),
  reset: () => set({ step: 1 }),
}));

export default useConsultStore;
