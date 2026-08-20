/* K-Aqua K-Rohr Violett PP-R SDR 11 — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-pipe-purple-pp-r-sdr-11-….pdf
   (Seitenbilder quellen/pg-k-pipe-purple-pp-r-sdr-11-p1.jpg, -p2.jpg). Die Tabelle läuft
   über den Seitenumbruch.

   Spaltenköpfe: Code · D · DN · Di · S min. · Pack. · Weight (kg/m) ·
   Water capacity (l/m)
   Kopfzeile: „K-Pipe Purple PP-R SDR 11" SDR 11 — S 5 (20 °C/1,6 MPa — 60 °C/0,8 MPa), length 4 meter

   Zeichnungsangabe wörtlich (Miniatur neben dem Produktfoto):
     Material: PP-R
     Colour:   green with 1 red stripe
     Standards: DIN EN ISO 15874
   Am 17.08.2026 nachgelesen — vorher war ohne Streifen.

   WIDERSPRUCH IN DER QUELLE: die Zeichnungsminiatur nennt „PP-R, green
   with 1 red stripe" — wörtlich dasselbe wie beim grünen SDR-11-Rohr,
   dazu dieselben Normen und dieselbe Maßtabelle. Produktname, Titel und
   Slug sagen dagegen „Purple". Die Miniatur ist offenbar eine nicht
   angepasste Vorlage.

   Entschieden für Violett als Körperfarbe (pprPurple), weil Name und
   Titel spezifisch sind und eine violette Kennfarbe im Rohrleitungsbau
   für Betriebs- und Regenwasser steht — eine Kodierung, die ein
   Hersteller nicht ohne Grund in den Produktnamen schreibt. Der rote
   Kennstreifen ist wie gezeichnet übernommen.

   Beim Hersteller zu klären. Ist die Miniatur maßgeblich, genügt in
   LAYERS ein Wechsel von 'pprPurple' auf 'pprGreen' — eine Zeile.

   Transkriptionsprobe D − 2·S = Di: über alle 9 Zeilen erfüllt.
 */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 9;
export const SDR = 11;
export const STOCK_LENGTH_M = 4;

export const ARTICLES = [
  { code: 'AQ111PL20', d: 20, dn: 15, di: 16.2, s: 1.9, pack: 100, kgm: 0.11, lm: 0.21 },
  { code: 'AQ111PL25', d: 25, dn: 20, di: 20.4, s: 2.3, pack: 100, kgm: 0.16, lm: 0.33 },
  { code: 'AQ111PL32', d: 32, dn: 25, di: 26.2, s: 2.9, pack: 60, kgm: 0.26, lm: 0.54 },
  { code: 'AQ111PL40', d: 40, dn: 32, di: 32.6, s: 3.7, pack: 40, kgm: 0.41, lm: 0.83 },
  { code: 'AQ111PL50', d: 50, dn: 40, di: 40.8, s: 4.6, pack: 20, kgm: 0.64, lm: 1.31 },
  { code: 'AQ111PL63', d: 63, dn: 50, di: 51.4, s: 5.8, pack: 20, kgm: 1.01, lm: 2.07 },
  { code: 'AQ111PL75', d: 75, dn: null, di: 61.4, s: 6.8, pack: 12, kgm: 1.41, lm: 2.96 },
  { code: 'AQ111PL90', d: 90, dn: 65, di: 73.6, s: 8.2, pack: 8, kgm: 2.03, lm: 4.25 },
  { code: 'AQ111PL110', d: 110, dn: 80, di: 90, s: 10, pack: 4, kgm: 3.01, lm: 6.36 },
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
  { key: 'pprPurple', frac: 1, label: 'PP-R violett' },
];

export const STRIPES = [
  { key: 'redStripe', angleDeg: 0, widthDeg: 7 },
];

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
