/* K-Aqua Unterputzventil-Oberteil (schwere Ausführung) — PROTOTYP.

   QUELLE: Druckkatalog S. 106. Die Tabelle führt NUR Code, G ¾",
   kg 0.31, Pack 1 — keine Maßspalten, keine Maßskizze (LOOP-STATUS
   §3.22). Alle Formmaße sind ASSUMPTION aus dem Katalogfoto; Anker:
   G-Gewinde (Norm) und kg-Spalte (Massenprobe). Der Knauf ist
   verchromtes Messing — Dichte 8,4. */

export const DATA_STATUS = 'prototyp';
export const SIZES_SOURCE_VERIFIED = 1;
export const ARTICLES = [ { code: 'AQ5993', G: '3/4', kg: 0.31, pack: 1 } ];
export const SIZES = ['3/4'];
export const DIMENSION_KEY = { G: 'Gewinde', kg: 'Gewicht' };
export function article() { return ARTICLES[0]; }
