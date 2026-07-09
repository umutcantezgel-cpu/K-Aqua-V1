import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface B2BState {
  // CO2 Calculator State
  selectedMaterial: string | null;
  weightKg: number;
  transportKm: number;
  endOfLifeMethod: 'recycling' | 'landfill' | 'incineration';
  
  // Results
  calculatedCO2e: number | null;
  
  // Actions
  setMaterial: (material: string) => void;
  setWeight: (weight: number) => void;
  setTransport: (km: number) => void;
  setEndOfLife: (method: 'recycling' | 'landfill' | 'incineration') => void;
  calculateCO2: () => void;
  reset: () => void;
}

export const useB2BStore = create<B2BState>()(
  persist(
    (set, get) => ({
      selectedMaterial: null,
      weightKg: 0,
      transportKm: 0,
      endOfLifeMethod: 'recycling',
      calculatedCO2e: null,

      setMaterial: (material) => set({ selectedMaterial: material }),
      setWeight: (weight) => set({ weightKg: weight }),
      setTransport: (km) => set({ transportKm: km }),
      setEndOfLife: (method) => set({ endOfLifeMethod: method }),
      
      calculateCO2: () => {
        const state = get();
        if (!state.selectedMaterial) return;
        
        // This acts as a fallback or synchronous dispatcher.
        // The real complex math will be offloaded to the Web Worker.
        const baseCO2 = state.weightKg * 2.5; // Dummy base value
        const transportCO2 = state.transportKm * 0.05;
        const eolCO2 = state.endOfLifeMethod === 'recycling' ? -0.5 : 1.2;
        
        set({ calculatedCO2e: baseCO2 + transportCO2 + eolCO2 });
      },
      
      reset: () => set({
        selectedMaterial: null,
        weightKg: 0,
        transportKm: 0,
        endOfLifeMethod: 'recycling',
        calculatedCO2e: null,
      }),
    }),
    {
      name: 'k-aqua-b2b-storage', // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);
