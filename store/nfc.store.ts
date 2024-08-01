import { create } from 'zustand';

interface NfcStoreState {
  supported: boolean;
  enabled: boolean;
  scanning: boolean;
  writing: boolean;
  status: string;
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

export const useNfcStore = create<NfcStore>()((set) => ({
  supported: false,
  enabled: false,
  scanning: false,
  writing: false,
  status: '',
  toggleSupported: () => set((state) => ({ supported: !state.supported })),
  toggleEnabled: () => set((state) => ({ enabled: !state.enabled })),
  toggleScanning: () => set((state) => ({ scanning: !state.scanning })),
  toggleWriting: () => set((state) => ({ writing: !state.writing })),
  disableScanning: () => set({ scanning: false }),
  updateStatus: (status) => set({ status }),
  enableSupported: () => set({ supported: true }),
  enableEnabled: () => set({ enabled: true }),
}));
