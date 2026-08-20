/* K-Aqua Muffe (Socket) — Artikeltabelle.

   PHASE 1, verifiziert am 16.08.2026 gegen
   Fittings K-Aqua/screencapture-…-fittings-socket-2026-06-20-05_41_01.pdf
   (Seitenbilder quellen/socket-p1.jpg … p3.jpg). Die Tabelle läuft über
   den Seitenumbruch: Seite 1 endet bei d75, Seite 2 führt d90 und d110.

   Spaltenköpfe exakt wie abgebildet:  Code · d · D · l · z · kg · Pack.

   MASSSCHLÜSSEL (technische Zeichnung, Miniatur neben dem Produktfoto):
     d  Rohr-Außendurchmesser = Muffenbohrung
     D  Außendurchmesser der Muffe
     l  Gesamtlänge
     z  Dicke des mittleren Anschlags

   Damit ist die Muffentiefe kein Schätzwert mehr: (l − z)/2.
   Gegenprobe gegen die Normreihe DVS 2207-11:
     d20 (34−5)/2 = 14,5 → Norm 14,5 ✓
     d25 (37−5)/2 = 16,0 → Norm 16,0 ✓
     d32 (41−5)/2 = 18,0 → Norm 18,0 ✓
     d40 (46−5)/2 = 20,5 → Norm 20,5 ✓
     d50 (52−5)/2 = 23,5 → Norm 23,5 ✓
     d63 (60−5)/2 = 27,5 → Norm 27,5 ✓
   Sechs von sechs auf die Zehntelstelle. Ab d75 weicht der Hersteller
   nach unten ab: d75 30,0 gegen Norm 31,0 · d90 33,0 gegen Norm 35,0.

   ASSUMPTION: bei d110 sind z, kg und Pack. in der Quelle leer — kein
   Transkriptionsfehler, die Zellen sind unausgefüllt. z wird deshalb
   aus dem Verhältnis von d90 gerechnet (z ≈ 0,11·d, auf halbe mm
   gerundet: 12,0) und ist unten als abgeleitet markiert. Die
   Gesamtlänge l = 80 ist tabelliert und bleibt maßgeblich.

   ── ABWEICHUNGEN gegen docs Unterseiten/fittings/socket.md ──
   1. Markdown führt 7 von 9 Größen. Es fehlen d90 und d110.
   2. Markdown führt die Spalten Code · d · L · kg · Pack. Die Quelle
      führt Code · d · D · l · z · kg · Pack. Es fehlen D und z — also
      genau die zwei Werte, die eine maßhaltige Muffe braucht.
   3. Die als „L" geführten Werte sind die Spalte l, und sie sind
      falsch: Markdown 34/35/44/56/65/78/90 gegen Quelle
      34/37/41/46/52/60/65. Nur d20 stimmt.
   4. Artikelnummer d63: Markdown AQ27065, Quelle AQ27063.
   5. Gewichte weichen ab: d63 Markdown 0,15 gegen Quelle 0,13.
   Korrigierte Fassung: produkt-markdown/fittings/socket.md          */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 9;

export const ARTICLES = [
  { code: 'AQ27020',  d: 20,  D: 29,  l: 34, z: 5,    kg: 0.01, pack: 500 },
  { code: 'AQ27025',  d: 25,  D: 35,  l: 37, z: 5,    kg: 0.02, pack: 300 },
  { code: 'AQ27032',  d: 32,  D: 44,  l: 41, z: 5,    kg: 0.03, pack: 160 },
  { code: 'AQ27040',  d: 40,  D: 52,  l: 46, z: 5,    kg: 0.05, pack: 80 },
  { code: 'AQ27050',  d: 50,  D: 65,  l: 52, z: 5,    kg: 0.07, pack: 60 },
  { code: 'AQ27063',  d: 63,  D: 84,  l: 60, z: 5,    kg: 0.13, pack: 45 },
  { code: 'AQ27075',  d: 75,  D: 99,  l: 65, z: 5,    kg: 0.20, pack: 28 },
  { code: 'AQ27090',  d: 90,  D: 120, l: 76, z: 10,   kg: 0.35, pack: 15 },
  { code: 'AQ270110', d: 110, D: 148, l: 80, z: 12.0, kg: null, pack: null,
    abgeleitet: ['z'] },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  D: 'Außendurchmesser',
  l: 'Gesamtlänge',
  z: 'Anschlagdicke',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
