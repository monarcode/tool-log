import { create } from 'zustand';

export const useNfcStore = create<NfcStore>()((set, get) => ({
  supported: false,
  enabled: false,
  scanning: false,
  writing: false,
  status: '',
  toggleSupported: () => set({ supported: !get().supported }),
  toggleEnabled: () => set({ enabled: !get().enabled }),
  toggleScanning: () => set({ scanning: !get().scanning }),
  toggleWriting: () => set({ writing: !get().writing }),
  disableScanning: () => set({ scanning: false }),
  updateStatus: (status) => set({ status }),
  enableSupported: () => set({ supported: true }),
  enableEnabled: () => set({ enabled: true }),
}));

interface NfcStoreState {
  supported?: boolean | undefined;
  enabled?: boolean | undefined;
  scanning?: boolean | undefined;
  status?: string | undefined;
  writing?: boolean | undefined;
}

interface NfcStoreActions {
  toggleSupported: () => void;
  toggleEnabled: () => void;
  toggleScanning: () => void;
  toggleWriting: () => void;
  disableScanning: () => void;
  updateStatus: (status: string) => void;
  enableSupported: () => void;
  enableEnabled: () => void;
}

type NfcStore = NfcStoreState & NfcStoreActions;
