/* K-Aqua Überbogen-Rohr — Artikeltabelle.

   QUELLE: Druckkatalog KA-Katalog_GB_06-2025_NEU.pdf, Seite 91, untere
   Tabelle „Cross over pipe". Drei Größen.

   Dasselbe Prinzip wie der Überbogen, aber als langes Rohrstück mit
   SPITZENDEN statt Muffen: es wird in zwei Muffen eingeschweißt und
   überquert dazwischen ein kreuzendes Rohr.

   MASSSCHLÜSSEL (Maßskizze S. 91 unten):
     d   Rohr-Außendurchmesser
     s   Wandstärke
     H   BAUHÖHE, Unterkante Rohr bis Oberkante Scheitel
     L   Baulänge

   s IST DIE SDR-6-WAND, und das bestätigt die Spalte:

       d 20 → s 3,4   d/s = 5,88
       d 25 → s 4,2   d/s = 5,95
       d 32 → s 5,4   d/s = 5,93

   Alle drei Zeilen liegen auf SDR 6, wie jedes andere K-Aqua-Fitting.
   Damit steht auch fest, dass s wirklich eine Wandstärke ist und nicht
   etwa ein Abstand.

   AUFFÄLLIGKEIT, dokumentiert statt aufgelöst: L wächst nicht monoton
   mit der Nennweite — 365 bei d20, dann zweimal 370. Und H springt von
   53 über 56 auf 68, wächst also zwischen d25 und d32 doppelt so stark
   wie zwischen d20 und d25. Beides ist möglich (die Bauhöhe muss das
   kreuzende Rohr freihalten, und das wächst sprunghaft), aber es ist
   keine glatte Reihe. NICHT geändert. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 3;

export const ARTICLES = [
  { code: 'AQ28520', d: 20, s: 3.4, H: 53, L: 365, kg: 0.06, pack: 100 },
  { code: 'AQ28525', d: 25, s: 4.2, H: 56, L: 370, kg: 0.09, pack: 70 },
  { code: 'AQ28532', d: 32, s: 5.4, H: 68, L: 370, kg: 0.15, pack: 50 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Rohr-Außendurchmesser',
  s: 'Wandstärke',
  H: 'Bauhöhe',
  L: 'Baulänge',
};

export function article(dNom) {
  const a = ARTICLES.find((x) => x.d === dNom);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + dNom);
  return a;
}
