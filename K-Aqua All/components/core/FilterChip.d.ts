/** Klickbarer Filter-Chip (Produktfinder, Regionsfilter). */
export interface FilterChipProps {
  children: React.ReactNode;
  /** aktiver Zustand — füllt mit --primary */
  on?: boolean;
  onClick?: () => void;
}
