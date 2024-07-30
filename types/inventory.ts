export type InventoryItem = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  isAvailable: boolean;
  category: string;
};

export type InventoryState = {
  tools: InventoryItem[];
};

export type InventoryActions = {
  addTool: (item: Pick<InventoryItem, 'name' | 'description' | 'category'| 'id'>) => void;
  updateTool: (
    id: string,
    item: Partial<Pick<InventoryItem, 'name' | 'description' | 'category'>>
  ) => void;
  deleteTool: (id: string) => void;
};

export type InventoryStore = InventoryState & InventoryActions;
