/** Bereichsregler mit Label links und Live-Wert rechts (CO₂-Rechner-Muster). */
export interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  /** Einheit hinter dem Wert, z. B. "m", "Wohnungen" */
  unit?: string;
  onChange: (value: number) => void;
}
