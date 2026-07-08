/** Standard-Sektionskopf: Eyebrow (versal, mit Akzentstrich) + H2 + Lead. */
export interface SectionHeadProps {
  /** kurzes Themen-Label, z. B. "Interaktive Werkzeuge" */
  eyebrow?: string;
  /** H2 — ein Schlüsselwort darf per .k-grad-text hervorgehoben werden */
  title: React.ReactNode;
  /** 1–2 Sätze Unterzeile */
  lead?: string;
  align?: 'left' | 'center';
}
