/* K-Aqua Rohrschere 20–40 — PROTOTYP.
   QUELLE: S. 114: Code AQ97040, Pack 1 — sonst nichts. Gestalt nach
   dem Katalogrender (rote Einhand-Schere mit Amboss); alle Maße
   ASSUMPTION am Schneidbereich 20–40 skaliert. */
export const DATA_STATUS = 'prototyp';
export const ARTICLES = [ { key: '20-40', code: 'AQ97040', bereich: '20–40', pack: 1 } ];
export const SIZES = ['20-40'];
export const DIMENSION_KEY = { bereich: 'Schneidbereich' };
export function article() { return ARTICLES[0]; }
