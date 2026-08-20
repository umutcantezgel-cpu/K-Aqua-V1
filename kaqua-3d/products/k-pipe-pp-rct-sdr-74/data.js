/* K-Aqua K-Rohr PP-RCT SDR 7,4 — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-pipe-pp-rct-sdr-74-….pdf
   (Seitenbilder quellen/pg-k-pipe-pp-rct-sdr-74-p1.jpg, -p2.jpg). Die Tabelle läuft
   über den Seitenumbruch.

   Spaltenköpfe: Code · D · DN · Di · S min. · Pack. · Weight (kg/m) ·
   Water capacity (l/m)
   Kopfzeile: „K-Pipe PP-RCT SDR 7,4" SDR 7,4 — S 3,2 (20 °C/2,5 MPa — 60 °C/1,2 MPa), length 4 meter

   Zeichnungsangabe wörtlich (Miniatur neben dem Produktfoto):
     Material: PP-RCT
     Colour:   green with 1 red stripe
     Standards: DIN EN ISO 15874
   Am 17.08.2026 nachgelesen — vorher stimmte.

   Transkriptionsprobe D − 2·S = Di: über alle 10 Zeilen erfüllt.
 */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 10;
export const SDR = 7.4;
export const STOCK_LENGTH_M = 4;

export const ARTICLES = [
  { code: 'AQ20020', d: 20, dn: 15, di: 14.4, s: 2.8, pack: 100, kgm: 0.16, lm: 0.16 },
  { code: 'AQ20025', d: 25, dn: 20, di: 18, s: 3.5, pack: 100, kgm: 0.23, lm: 0.25 },
  { code: 'AQ20032', d: 32, dn: 25, di: 23.2, s: 4.4, pack: 60, kgm: 0.37, lm: 0.42 },
  { code: 'AQ20040', d: 40, dn: 32, di: 29, s: 5.5, pack: 40, kgm: 0.57, lm: 0.66 },
  { code: 'AQ20050', d: 50, dn: 40, di: 36.2, s: 6.9, pack: 20, kgm: 0.88, lm: 1.03 },
  { code: 'AQ20063', d: 63, dn: 50, di: 45.8, s: 8.6, pack: 20, kgm: 1.39, lm: 1.63 },
  { code: 'AQ20075', d: 75, dn: null, di: 54.4, s: 10.3, pack: 12, kgm: 1.98, lm: 2.31 },
  { code: 'AQ20090', d: 90, dn: 65, di: 65.4, s: 12.3, pack: 8, kgm: 2.83, lm: 3.32 },
  { code: 'AQ200110', d: 110, dn: 80, di: 79.8, s: 15.1, pack: 4, kgm: 4.25, lm: 4.97 },
  { code: 'AQ200125', d: 125, dn: 90, di: 90.8, s: 17.1, pack: 4, kgm: 5.41, lm: 6.47 },
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
  { key: 'pprGreen', frac: 1, label: 'PP-RCT' },
];

export const STRIPES = [
  { key: 'redStripe', angleDeg: 0, widthDeg: 7 },
];

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
