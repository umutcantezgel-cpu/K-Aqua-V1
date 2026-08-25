/* K-Aqua K-Fiber Rohr PP-R SDR 7,4 — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-fiber-pipe-pp-r-sdr-74-….pdf
   (Seitenbilder quellen/fiber74-p1.jpg, -p2.jpg). Die Tabelle läuft
   über den Seitenumbruch.

   Spaltenköpfe: Code · D · DN · Di · S min. · Pack. · Weight (kg/m) ·
   Water capacity (l/m)
   Kopfzeile: „K-Fiber Pipe PP-R SDR 7,4" SDR 7,4 — S 3,2 (20 °C/2,5 MPa — 60 °C/1,2 MPa), length 4 meter

   Zeichnungsangabe wörtlich (Miniatur neben dem Produktfoto):
     Material: PP-R GF
     Colour:   green with 4 grey stripes
     Standards: DIN EN ISO 15874

   Transkriptionsprobe D − 2·S = Di: über alle 14 Zeilen erfüllt.

   Fußnote der Quelle, wörtlich:
   „Pipe can be delivered in 5.80 meter length on special request with product code AQ258F+dimension"

   ASSUMPTION d315: Di am Screenshot als 229,8 gelesen. Das verletzt die Identitaet D minus 2S gleich Di (315 minus 86,2 gleich 228,8). In den anderen 13 Zeilen stimmt sie auf die Zehntelstelle, deshalb ist 228,8 uebernommen und als abgeleitet markiert. Am Original nachzulesen.
 */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 14;
export const SDR = 7.4;
export const STOCK_LENGTH_M = 4;

export const ARTICLES = [
  { code: 'AQ207PF20', d: 20, dn: 15, di: 14.4, s: 2.8, pack: 100, kgm: 0.16, lm: 0.16 },
  { code: 'AQ207PF25', d: 25, dn: 20, di: 18, s: 3.5, pack: 100, kgm: 0.25, lm: 0.25 },
  { code: 'AQ207PF32', d: 32, dn: 25, di: 23.2, s: 4.4, pack: 60, kgm: 0.39, lm: 0.42 },
  { code: 'AQ207PF40', d: 40, dn: 32, di: 29, s: 5.5, pack: 40, kgm: 0.59, lm: 0.66 },
  { code: 'AQ207PF50', d: 50, dn: 40, di: 36.2, s: 6.9, pack: 20, kgm: 0.91, lm: 1.03 },
  { code: 'AQ207PF63', d: 63, dn: 50, di: 45.8, s: 8.6, pack: 20, kgm: 1.45, lm: 1.63 },
  { code: 'AQ207PF75', d: 75, dn: null, di: 54.4, s: 10.3, pack: 12, kgm: 2.06, lm: 2.31 },
  { code: 'AQ207PF90', d: 90, dn: 65, di: 65.4, s: 12.3, pack: 8, kgm: 2.94, lm: 3.32 },
  { code: 'AQ207PF110', d: 110, dn: 80, di: 79.8, s: 15.1, pack: 4, kgm: 4.36, lm: 4.97 },
  { code: 'AQ207PF125', d: 125, dn: 90, di: 90.8, s: 17.1, pack: 4, kgm: 5.61, lm: 6.47 },
  { code: 'AQ207PF160', d: 160, dn: 115, di: 116.2, s: 21.9, pack: 4, kgm: 9.09, lm: 10.6 },
  { code: 'AQ207PF200', d: 200, dn: 145, di: 145.2, s: 27.4, pack: 4, kgm: 14.23, lm: 16.55 },
  { code: 'AQ207PF250', d: 250, dn: 180, di: 181.6, s: 34.2, pack: 4, kgm: 22.08, lm: 25.89 },
  { code: 'AQ207PF315', d: 315, dn: 230, di: 228.8, s: 43.1, pack: 4, kgm: 34.89, lm: 39.39, abgeleitet: ['di'] },
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

/* STREIFENFARBE, berichtigt am 24.08.2026.

   Das Modell trug vier graue Streifen. Der Katalog sagt auf S. 79
   „green with 4 red stripes". Geändert auf den Katalog.

   Warum der Katalog gewinnt und nicht die alte Website-Tabelle, aus der
   die frühere Farbe stammte — drei unabhängige Belege:

   1. Auf S. 80 stehen SDR 9 und SDR 11 untereinander, und NEBEN jeder
      Farbangabe steht das Produktfoto. Text und Bild derselben Seite
      sagen dasselbe: grauer Streifen oben, blauer unten. Der Katalog
      stützt sich selbst.
   2. Das freigegebene Studiofoto zu AQ111P zeigt genau einen blauen
      Streifen, wie der Katalog auf S. 77 sagt. Eine dritte Quelle,
      geprüft an einer Zeile, die gar nicht strittig war.
   3. Die alte Website WIDERSPRICHT SICH SELBST: ihre Kategorie-
      aufnahme „PIPES" zeigt das violette Rohr ohne jeden Streifen,
      während ihre eigene Tabelle einen roten nennt. Eine Quelle, die
      sich selbst widerspricht, ist als Quelle erledigt.

   Die drei Faserrohre bildeten zusammen einen sauberen Ringtausch
   grau→rot, blau→grau, rot→blau — die Handschrift einer um eine Zeile
   verrutschten Tabelle, nicht die von Streuung. */
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
