import { create } from 'zustand';

export const useNfcStore = create<NfcStore>()((set) => ({
  state: {
    supported: false,
    enabled: false,
    scanning: false,
    writing: false,
    status: '',
  },
  updateState: (state) => set({ state: { ...state } }),
}));

interface NfcStore {
  state: {
    supported?: boolean | undefined;
    enabled?: boolean | undefined;
    scanning?: boolean | undefined;
    status?: string | undefined;
    writing?: boolean | undefined;
  };
  updateState: (state: Partial<NfcStore['state']>) => void;
}
