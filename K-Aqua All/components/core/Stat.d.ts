/** Große Kennzahl (Outfit 800, --primary) mit Akzent-Einheit und Label. */
export interface StatProps {
  /** die Zahl, z. B. "630" oder "100" */
  value: string;
  /** Einheit in --accent-strong, z. B. "mm", "%", "ISO" */
  unit?: string;
  /** erklärende Unterzeile */
  label: string;
}
