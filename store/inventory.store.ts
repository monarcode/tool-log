import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { InventoryStore } from '~/types/inventory';

const useInventoryStore = create<InventoryStore>()(
  persist(
    (set, get) => ({
      tools: [],
      addTool: (item) => {
        const { tools } = get();
        set({
          tools: [
            ...tools,
            {
              ...item,
              id: uuid.v4().toString(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              isAvailable: true,
            },
          ],
        });
      },
      updateTool: (id, item) => {
        const { tools } = get();
        const targetTool = tools.find((tool) => tool.id === id);
        if (!targetTool) return;
        const updatedTool = { ...targetTool, ...item };

        set({ tools: tools.map((tool) => (tool.id === id ? updatedTool : tool)) });
      },
      deleteTool: (id) => {
        const { tools } = get();
        set({ tools: tools.filter((tool) => tool.id !== id) });
      },
    }),
    {
      name: 'inventory-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export { useInventoryStore };
