/* K-Aqua Winkel 45° Muffe/Spitzende — Artikeltabelle.

   PHASE 1, verifiziert am 24.08.2026 gegen den Druckkatalog
   Marketing/Print/KA-Katalog_GB_06-2025_NEU.pdf, Seite 84 (unterer
   Block), und gegen die Website-Aufnahme
   K-Aqua Unterseitem Kopie/Fittings K-Aqua/
     screencapture-…-fittings-elbow-45-femalemale-….pdf

   Spaltenköpfe wie abgebildet:
     Code · d · D · l · z · z₁ · kg · Pack.
   2 Größen — mehr führt der Katalog nicht. Nach der letzten Zeile folgt
   der ORDER-Knopf (Fall 2).

   MASSSCHLÜSSEL: siehe ../_femalemale/params.js.

   ── GEGENPROBE l − z GEGEN DIE NORMREIHE DVS 2207-11 ──
     d20  20 − 5 = 15     Normreihe 14,5
     d25  22 − 6 = 16     Normreihe 16,0
   Beide Zeilen auf 0…0,5 mm. Die Muffentiefe kommt trotzdem aus
   fusionDepth(d); der Tabellenwert steht als socketFromTable im
   Prüfbericht (Fall 4).

   ── GEGENPROBE D GEGEN DIE MUFFENTABELLE ──
   29 bei d20, 34 bei d25 — dieselben Werte wie products/socket und wie
   der einfache Winkel. Der Muffenschenkel ist derselbe Körper. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 2;
export const SDR = 6;
export const ANGLE = 45;

export const ARTICLES = [
  { code: 'AQ04120', key: '20', d: 20, l: 20, z: 5, D: 29, z1: 28, kg: 0.02, pack: 300 },
  { code: 'AQ04125', key: '25', d: 25, l: 22, z: 6, D: 34, z1: 34, kg: 0.02, pack: 200 },
];

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Nennmaß Rohr',
  D: 'Außendurchmesser am Muffenschenkel',
  l: 'Achse bis Stirnfläche der Muffe',
  z: 'Einbaulänge der Muffe',
  z1: 'Achse bis Spitze des Rohrendes',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}

export function sizeLabel(key) { return 'd' + key; }
