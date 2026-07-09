import { create } from 'zustand';

export interface ProductCatalogState {
  flowSpeed: number;
  activeComponent: string | null;
  waterColor: string;
  isExploded: boolean;
  setFlowSpeed: (speed: number) => void;
  setActiveComponent: (component: string | null) => void;
  setWaterColor: (color: string) => void;
  setIsExploded: (isExploded: boolean) => void;
}

export const useProductCatalogStore = create<ProductCatalogState>((set) => ({
  flowSpeed: 1.0,
  activeComponent: null,
  waterColor: '#1e90ff',
  isExploded: false,
  setFlowSpeed: (flowSpeed) => set({ flowSpeed }),
  setActiveComponent: (activeComponent) => set({ activeComponent }),
  setWaterColor: (waterColor) => set({ waterColor }),
  setIsExploded: (isExploded) => set({ isExploded }),
}));
