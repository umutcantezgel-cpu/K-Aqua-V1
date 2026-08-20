/* K-Aqua K-FiberClima Rohr PP-RCT SDR 11 — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-fiberclima-pipe-pp-rct-sdr-11-….pdf
   (Seitenbilder quellen/pg-k-fiberclima-pipe-pp-rct-sdr-11-p1.jpg, -p2.jpg). Die Tabelle läuft
   über den Seitenumbruch.

   Spaltenköpfe: Code · D · DN · Di · S min. · Pack. · Weight (kg/m) ·
   Water capacity (l/m)
   Kopfzeile: „K-FiberClima Pipe PP-RCT SDR 11" SDR 11 — S 5 (20 °C/1,6 MPa — 60 °C/0,8 MPa), length 4 meter

   Zeichnungsangabe wörtlich (Miniatur neben dem Produktfoto):
     Material: PP-RCT GF
     Colour:   green with 4 blue stripes
     Standards: DIN EN ISO 15874
   Am 17.08.2026 nachgelesen — vorher war grau.

   Transkriptionsprobe D − 2·S = Di: über alle 9 Zeilen erfüllt.

   Die Zeilen d20 und d25 tragen in der Quelle ein Sternchen an der Spalte S min. und führen SDR-7,4-Maße (2,8 / 3,5 mm) statt SDR-11-Maßen. Ab d32 gilt die SDR-11-Reihe. Übernommen wie abgebildet; params.js prüft deshalb je Zeile gegen D/S und nicht gegen den Reihennennwert.
 */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 9;
export const SDR = 11;
export const STOCK_LENGTH_M = 4;

export const ARTICLES = [
  { code: 'AQ160F20', d: 20, dn: 15, di: 14.4, s: 2.8, pack: 100, kgm: 0.16, lm: 0.16 },
  { code: 'AQ160F25', d: 25, dn: 20, di: 18, s: 3.5, pack: 100, kgm: 0.25, lm: 0.25 },
  { code: 'AQ160F32', d: 32, dn: 25, di: 26.2, s: 2.9, pack: 60, kgm: 0.28, lm: 0.54 },
  { code: 'AQ160F40', d: 40, dn: 32, di: 32.6, s: 3.7, pack: 40, kgm: 0.43, lm: 0.83 },
  { code: 'AQ160F50', d: 50, dn: 40, di: 40.8, s: 4.6, pack: 20, kgm: 0.67, lm: 1.31 },
  { code: 'AQ160F63', d: 63, dn: 50, di: 51.4, s: 5.8, pack: 20, kgm: 1.04, lm: 2.07 },
  { code: 'AQ160F75', d: 75, dn: null, di: 61.4, s: 6.8, pack: 12, kgm: 1.44, lm: 2.96 },
  { code: 'AQ160F90', d: 90, dn: 65, di: 73.6, s: 8.2, pack: 8, kgm: 2.08, lm: 4.25 },
  { code: 'AQ160F110', d: 110, dn: 80, di: 90, s: 10, pack: 4, kgm: 3.1, lm: 6.36 },
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
  { key: 'pprGreen', frac: 0.3, label: 'PP-RCT außen' },
  { key: 'fiberLayer', frac: 0.4, label: 'PP-RCT GF, glasfaserverstärkt' },
  { key: 'pprGreen', frac: 0.3, label: 'PP-RCT innen' },
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
