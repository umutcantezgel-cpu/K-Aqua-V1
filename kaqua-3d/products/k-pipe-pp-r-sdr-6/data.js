/* K-Aqua K-Rohr PP-R SDR 6 — Artikeltabelle.

   PHASE 1, verifiziert am 16.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-pipe-pp-r-sdr-6-2026-06-20-05_46_21.pdf
   (Seitenbilder quellen/pipe6-p1.jpg … p3.jpg). Die Tabelle läuft über
   den Seitenumbruch: Seite 1 endet bei d50, Seite 2 führt d63–d125.

   Spaltenköpfe exakt wie abgebildet:
     Code · D · DN · Di · S min. · Pack. · Weight (kg/m) · Water Capacity (l/m)

   Kopfzeile der Seite: „K Pipe PP-R" SDR 6 — S 2,5 (20° C/2,0 MPa —
   70° C/1,0 MPa), length 4 meter

   MASSSCHLÜSSEL (technische Zeichnung neben dem Produktfoto):
     D    Außendurchmesser
     DN   Nennweite (Zoll-Äquivalent), rein informativ
     Di   Innendurchmesser
     S    Mindestwandstärke
   Gegenprobe: D − 2·S = 20 − 6,8 = 13,2 = Di ✓ · D/S = 5,88 ≈ SDR 6 ✓

   Werkstoffangabe der Zeichnung: PP-R, „green with 1 red stripe",
   Normen DIN EN ISO 15874 / DIN 8077 / 8078.

   Fußnote der Quelle, wörtlich (auf Seite 2 unterhalb der Tabelle, auf
   dem ersten Zuschnitt nicht mit abgebildet):
   „Pipe can be delivered in 5.80 meter length on special request with
   product code AQ258F+dimension"

   ── ABWEICHUNGEN gegen docs Unterseiten/pipes/k-pipe-pp-r-sdr-6.md ──
   1. Markdown führt 5 von 10 Größen (d20–d50). Es fehlen d63, d75,
      d90, d110, d125.
   2. Markdown führt keine Spalten Di und S — also genau die Werte, die
      ein maßhaltiges Rohrmodell braucht.
   Korrigierte Fassung: produkt-markdown/pipes/k-pipe-pp-r-sdr-6.md   */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 10;
export const SDR = 6;
export const STOCK_LENGTH_M = 4;

export const ARTICLES = [
  { code: 'AQ200P20',  d: 20,  dn: 12, di: 13.2, s: 3.4,  pack: 100, kgm: 0.18, lm: 0.14 },
  { code: 'AQ200P25',  d: 25,  dn: 15, di: 16.6, s: 4.2,  pack: 100, kgm: 0.28, lm: 0.22 },
  { code: 'AQ200P32',  d: 32,  dn: 20, di: 21.2, s: 5.4,  pack: 60,  kgm: 0.46, lm: 0.35 },
  { code: 'AQ200P40',  d: 40,  dn: 25, di: 26.6, s: 6.7,  pack: 40,  kgm: 0.68, lm: 0.56 },
  { code: 'AQ200P50',  d: 50,  dn: 32, di: 33.2, s: 8.3,  pack: 20,  kgm: 1.09, lm: 0.87 },
  { code: 'AQ200P63',  d: 63,  dn: 40, di: 42.0, s: 10.5, pack: 20,  kgm: 1.60, lm: 1.39 },
  { code: 'AQ200P75',  d: 75,  dn: 50, di: 50.0, s: 12.5, pack: 12,  kgm: 2.50, lm: 1.96 },
  { code: 'AQ200P90',  d: 90,  dn: null, di: 60.0, s: 15.0, pack: 8, kgm: 3.30, lm: 2.83 },
  { code: 'AQ200P110', d: 110, dn: 65, di: 73.2, s: 18.3, pack: 4,   kgm: 5.00, lm: 4.21 },
  { code: 'AQ200P125', d: 125, dn: 80, di: 83.2, s: 20.8, pack: 4,   kgm: 6.50, lm: 5.46 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Außendurchmesser',
  dn: 'Nennweite DN',
  di: 'Innendurchmesser',
  s: 'Wandstärke',
};

/* Schichtaufbau von außen nach innen. Beim monolithischen PP-R-Rohr
   eine Lage; die Faserrohre setzen hier drei ein, sonst identisch. */
export const LAYERS = [{ key: 'pprGreen', frac: 1, label: 'PP-R' }];

/* Längsstreifen auf der Mantelfläche — Zeichnung: „green with 1 red
   stripe". Kein Schichtaufbau, sondern eine Coextrusionsspur. */
export const STRIPES = [
  { key: 'redStripe', angleDeg: 0, widthDeg: 7 },
];

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
