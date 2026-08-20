/* K-Aqua K-Fiber Rohr PP-R SDR 17 — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-fiber-pipe-pp-r-sdr-17-….pdf
   (Seitenbilder quellen/pg-k-fiber-pipe-pp-r-sdr-17-p1.jpg, -p2.jpg). Die Tabelle läuft
   über den Seitenumbruch.

   Spaltenköpfe: Code · D · DN · Di · S min. · Pack. · Weight (kg/m) ·
   Water capacity (l/m)
   Kopfzeile: „K-Fiber Pipe PP-R SDR 17" SDR 17 — S 8 (20 °C/1,0 MPa), length 4 meter

   Zeichnungsangabe wörtlich (Miniatur neben dem Produktfoto):
     Material: PP-R GF
     Colour:   green with 4 red stripes
     Standards: DIN EN ISO 15874
   Am 17.08.2026 nachgelesen — vorher war grau.

   Transkriptionsprobe D − 2·S = Di: über alle 8 Zeilen erfüllt.
 */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 8;
export const SDR = 17;
export const STOCK_LENGTH_M = 4;

export const ARTICLES = [
  { code: 'AQ117PF90', d: 90, dn: 65, di: 79.2, s: 5.4, pack: 8, kgm: 1.46, lm: 4.93 },
  { code: 'AQ117PF110', d: 110, dn: 80, di: 96.8, s: 6.6, pack: 4, kgm: 2.16, lm: 7.36 },
  { code: 'AQ117PF125', d: 125, dn: 100, di: 110.2, s: 7.4, pack: 4, kgm: 2.77, lm: 9.54 },
  { code: 'AQ117PF160', d: 160, dn: 125, di: 141, s: 9.5, pack: 4, kgm: 4.52, lm: 15.61 },
  { code: 'AQ117PF200', d: 200, dn: 160, di: 176.2, s: 11.9, pack: 4, kgm: 7.05, lm: 24.38 },
  { code: 'AQ117PF250', d: 250, dn: 200, di: 220.4, s: 14.8, pack: 4, kgm: 10.9, lm: 38.15 },
  { code: 'AQ117PF315', d: 315, dn: 250, di: 277.6, s: 18.7, pack: 4, kgm: 17.26, lm: 60.52 },
  { code: 'AQ117PF355', d: 355, dn: 300, di: 312.8, s: 21.1, pack: 4, kgm: 21.83, lm: 76.85 },
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
  { key: 'redStripe', angleDeg: 0, widthDeg: 7 },
  { key: 'redStripe', angleDeg: 90, widthDeg: 7 },
  { key: 'redStripe', angleDeg: 180, widthDeg: 7 },
  { key: 'redStripe', angleDeg: 270, widthDeg: 7 },
];

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
