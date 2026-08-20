/* K-Aqua K-Fiber Rohr PP-R SDR 9 — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-fiber-pipe-pp-r-sdr-9-….pdf
   (Seitenbilder quellen/pg-k-fiber-pipe-pp-r-sdr-9-p1.jpg, -p2.jpg). Die Tabelle läuft
   über den Seitenumbruch.

   Spaltenköpfe: Code · D · DN · Di · S min. · Pack. · Weight (kg/m) ·
   Water capacity (l/m)
   Kopfzeile: „K-Fiber Pipe PP-R SDR 9" SDR 9 — S 4 (20 °C/2,0 MPa — 60 °C/1,0 MPa), length 4 meter

   Zeichnungsangabe wörtlich (Miniatur neben dem Produktfoto):
     Material: PP-R GF
     Colour:   green with 4 blue stripes
     Standards: DIN EN ISO 15874
   Am 17.08.2026 nachgelesen — vorher war grau.

   Transkriptionsprobe D − 2·S = Di: über alle 8 Zeilen erfüllt.
 */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 8;
export const SDR = 9;
export const STOCK_LENGTH_M = 4;

export const ARTICLES = [
  { code: 'AQ169PF32', d: 32, dn: 25, di: 24.8, s: 3.6, pack: 60, kgm: 0.33, lm: 0.48 },
  { code: 'AQ169PF40', d: 40, dn: 32, di: 31, s: 4.5, pack: 40, kgm: 0.52, lm: 0.75 },
  { code: 'AQ169PF50', d: 50, dn: 40, di: 38.8, s: 5.6, pack: 20, kgm: 0.8, lm: 1.18 },
  { code: 'AQ169PF63', d: 63, dn: 50, di: 48.8, s: 7.1, pack: 20, kgm: 1.25, lm: 1.87 },
  { code: 'AQ169PF75', d: 75, dn: null, di: 58.2, s: 8.4, pack: 12, kgm: 1.77, lm: 2.66 },
  { code: 'AQ169PF90', d: 90, dn: 65, di: 69.8, s: 10.1, pack: 8, kgm: 2.55, lm: 3.83 },
  { code: 'AQ169PF110', d: 110, dn: 80, di: 85.4, s: 12.3, pack: 4, kgm: 3.78, lm: 5.73 },
  { code: 'AQ169PF125', d: 125, dn: 100, di: 97, s: 14, pack: 4, kgm: 4.89, lm: 7.39 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Außendurchmesser',
  dn: 'Nennweite DN',
  di: 'Innendurchmesser',
  s: 'Wandstärke',
};

/* Wandaufbau von außen nach innen. Der Grund, warum diese Produkte ein
   3D-Modell rechtfertigen: im Schnitt wird sichtbar, was ein
   Katalogfoto nicht zeigen kann. */
export const LAYERS = [
  { key: 'pprGreen', frac: 0.3, label: 'PP-R außen' },
  { key: 'fiberLayer', frac: 0.4, label: 'PP-R GF, glasfaserverstärkt' },
  { key: 'pprGreen', frac: 0.3, label: 'PP-R innen' },
];

export const STRIPES = [
  { key: 'blueStripe', angleDeg: 0, widthDeg: 7 },
  { key: 'blueStripe', angleDeg: 90, widthDeg: 7 },
  { key: 'blueStripe', angleDeg: 180, widthDeg: 7 },
  { key: 'blueStripe', angleDeg: 270, widthDeg: 7 },
];

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
