/* K-Aqua K-Fiber Rohr PP-R SDR 11 — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-fiber-pipe-pp-r-sdr-11-….pdf
   (Seitenbilder quellen/pg-k-fiber-pipe-pp-r-sdr-11-p1.jpg, -p2.jpg). Die Tabelle läuft
   über den Seitenumbruch.

   Spaltenköpfe: Code · D · DN · Di · S min. · Pack. · Weight (kg/m) ·
   Water capacity (l/m)
   Kopfzeile: „K-Fiber Pipe PP-R SDR 11" SDR 11 — S 5 (20 °C/1,6 MPa — 60 °C/0,8 MPa), length 4 meter

   Zeichnungsangabe wörtlich (Miniatur neben dem Produktfoto):
     Material: PP-R GF
     Colour:   green with 4 red stripes
     Standards: DIN EN ISO 15874
   Am 17.08.2026 nachgelesen — vorher war grau.

   Transkriptionsprobe D − 2·S = Di: über alle 9 Zeilen erfüllt.

   Wie beim K-FiberClima tragen d20 und d25 ein Sternchen an S min. und führen SDR-7,4-Maße (2,8 / 3,5 mm). Ab d32 gilt SDR 11.
 */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 9;
export const SDR = 11;
export const STOCK_LENGTH_M = 4;

export const ARTICLES = [
  { code: 'AQ111PF20', d: 20, dn: 15, di: 14.4, s: 2.8, pack: 100, kgm: 0.16, lm: 0.16 },
  { code: 'AQ111PF25', d: 25, dn: 20, di: 18, s: 3.5, pack: 100, kgm: 0.25, lm: 0.25 },
  { code: 'AQ111PF32', d: 32, dn: 25, di: 26.2, s: 2.9, pack: 60, kgm: 0.28, lm: 0.54 },
  { code: 'AQ111PF40', d: 40, dn: 32, di: 32.6, s: 3.7, pack: 40, kgm: 0.43, lm: 0.83 },
  { code: 'AQ111PF50', d: 50, dn: 40, di: 40.8, s: 4.6, pack: 20, kgm: 0.67, lm: 1.31 },
  { code: 'AQ111PF63', d: 63, dn: 50, di: 51.4, s: 5.8, pack: 20, kgm: 1.04, lm: 2.07 },
  { code: 'AQ111PF75', d: 75, dn: null, di: 61.4, s: 6.8, pack: 12, kgm: 1.44, lm: 2.96 },
  { code: 'AQ111PF90', d: 90, dn: 65, di: 73.6, s: 8.2, pack: 8, kgm: 2.08, lm: 4.25 },
  { code: 'AQ111PF110', d: 110, dn: 80, di: 90, s: 10, pack: 4, kgm: 3.1, lm: 6.36 },
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

   Das Modell trug vier rote Streifen. Der Katalog sagt auf S. 80
   „green with 4 blue stripes". Geändert auf den Katalog.

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
