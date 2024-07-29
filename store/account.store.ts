import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { UserAccountStore } from '~/types/account';

const useAccountStore = create<UserAccountStore>()(
  persist(
    (set) => ({
      account: null,
      setAccount: (account) => set({ account: { ...account, id: uuid.v4().toString() } }),
    }),
    {
      name: 'account-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export { useAccountStore };
