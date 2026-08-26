/* K-Aqua Rohrabschneider 50–125 — PROTOTYP.
   QUELLE: S. 114: Code AQ975125, Pack 1. Gestalt nach Katalogrender
   (C-Bügel-Rollenschneider mit Kurbelgriff); Maße ASSUMPTION. */
export const DATA_STATUS = 'prototyp';
export const ARTICLES = [ { key: '50-125', code: 'AQ975125', bereich: '50–125', pack: 1 } ];
export const SIZES = ['50-125'];
export const DIMENSION_KEY = { bereich: 'Schneidbereich' };
export function article() { return ARTICLES[0]; }
