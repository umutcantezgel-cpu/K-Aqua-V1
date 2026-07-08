/**
 * Bento-Karte — Standard-Inhaltsfläche (24px Radius, diffuser Schatten, Hover-Lift).
 * @startingPoint section="Components" subtitle="Bento-Karte, Standard + Tint" viewport="700x260"
 */
export interface CardProps {
  children: React.ReactNode;
  /** getönte Variante (--card-tint) zur Hervorhebung — max. 1–2 pro Raster */
  tint?: boolean;
  /** Hover-Lift (Standard an) */
  hover?: boolean;
  style?: React.CSSProperties;
  as?: string;
}
