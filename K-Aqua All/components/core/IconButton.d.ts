/** Runde 44px-Icon-Schaltfläche (Header-Aktionen: Theme, Menü, Sprache). */
export interface IconButtonProps {
  /** das Icon, 19–20px */
  children: React.ReactNode;
  /** Pflicht: zugängliche Beschriftung */
  label: string;
  onClick?: () => void;
  active?: boolean;
  expanded?: boolean;
}
