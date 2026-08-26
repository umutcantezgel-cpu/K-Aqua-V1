/* K-Aqua Geradsitzventil-Oberteil mit grünem Handrad — PROTOTYP.

   QUELLE: Druckkatalog S. 106 (Textebene 25.08.2026). Die Tabelle
   führt NUR Code, G ¾", kg 0,12, Pack 1 — keine Maßspalten, keine Maßskizze
   (LOOP-STATUS §3.22). Alle Formmaße sind ASSUMPTION aus dem
   Katalogfoto; der Maßstab hängt an zwei Ankern:
     1. Gewinde G 3/4" (Normmaß, threadSpec),
     2. kg-Spalte über die Massenprobe (meshVolume × Dichte).
   Deshalb DATA_STATUS 'prototyp' — die Zahlen sind ehrlich vorläufig. */

export const DATA_STATUS = 'prototyp';
export const SIZES_SOURCE_VERIFIED = 1;

export const ARTICLES = [
  { code: 'AQ5991', G: '3/4', kg: 0.12, pack: 1 },
];
export const SIZES = ['3/4'];
export const DIMENSION_KEY = { G: 'Gewinde', kg: 'Gewicht' };
export function article() { return ARTICLES[0]; }
