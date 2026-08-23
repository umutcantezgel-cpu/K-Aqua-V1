import { GENERATED_SLUG_MAP } from '@/lib/3d/slug-map.generated';
import { SLUG_ALIASES } from '@/lib/3d/aliases';

// Die triviale Zuordnung entsteht aus der Registry (erzeugt), die
// redaktionellen Ausnahmen stehen daneben. Ein neues Produkt braucht damit
// keine Codeänderung mehr — es genügt, die Bibliothek zu aktualisieren und
// `node scripts/sync-3d-registry.mjs` laufen zu lassen.
const SLUG_TO_3D_ID: Record<string, string> = { ...GENERATED_SLUG_MAP, ...SLUG_ALIASES };

/**
 * Ordnet einen Katalog-Slug einer 3D-Modul-ID zu.
 *
 * Gibt null zurück, wenn es für das Produkt (noch) kein Modell gibt. Vorher
 * fiel die Funktion auf 'fittings/socket' zurück — ein Produkt ohne Modell
 * zeigte damit stillschweigend eine Muffe, also ein anderes Bauteil. Für einen
 * maßhaltigen CAD-Viewer ist das schlechter als gar keine Darstellung.
 *
 * Diese Funktion liegt bewusst in einem eigenen Modul und nicht mehr in
 * `Native3DCanvas`: Wer nur wissen will, OB ein Produkt ein Modell hat, soll
 * dafür nicht three.js in sein Bundle ziehen. Genau das geschah, solange
 * `Native3DShowroom` sie aus der Canvas-Datei importierte.
 */
export function resolve3DProductId(slugOrId?: string): string | null {
  if (!slugOrId) return null;
  const clean = slugOrId.replace(/^.*\//, '').toLowerCase().trim();
  return SLUG_TO_3D_ID[clean] ?? SLUG_TO_3D_ID[slugOrId] ?? null;
}
