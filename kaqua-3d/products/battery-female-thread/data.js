/* K-Aqua Batterieanschluss mit Innengewinde — Artikeltabelle.

   QUELLE: Druckkatalog KA-Katalog_GB_06-2025_NEU.pdf, Seite 108,
   mittlere Tabelle „Battery (Female thread)". Zwei Größen. Textebene
   am 25.08.2026 ausgelesen; Spaltenköpfe wie abgebildet:
     Code · d · Rp · L · L1 · kg · Pack.

   MASSSCHLÜSSEL (Skizze S. 108: zwei Rp-Marken, drei d-Marken, L und
   L1 über die Breite):
     d    Nennmaß der Schweißmuffen (oben, Zulauf)
     Rp   Innengewinde der beiden Anschlussblöcke (vorn, zur Armatur)
     L    Achsabstand der beiden Rp-Anschlüsse — 150 mm, das
          Standard-Armaturenmaß
     L1   Gesamtlänge über die Blöcke

   DIE GEGENPROBE, die die Blockdicke festlegt: L1 − L = 35 in beiden
   Zeilen — exakt das D der ½"-Gewindereihe (AQ270G/AQ243G: ½" → 35).
   Die Endblöcke sind die bekannten ½"-Griffzonenkörper; ihre Dicke ist
   damit KEINE Annahme.

   Das Produktfoto AQ490G zeigt das Teil EINTEILIG: zwei Winkelblöcke
   (Muffe oben, Rp vorn), verbunden durch einen verrippten Flachsteg
   mit zwei Montagelöchern. Werkstoffe: PP-R grün + zwei Messingringe.

   kg 0,18/0,19 bei Pack 1: die Massenprobe unten rechnet das Netz
   dagegen (PP 0,9 · Messing 8,4 g/cm³). */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 2;

export const ARTICLES = [
  { code: 'AQ490G2012', d: 20, Rp: '1/2', L: 150, L1: 185, kg: 0.18, pack: 1 },
  { code: 'AQ490G2512', d: 25, Rp: '1/2', L: 150, L1: 185, kg: 0.19, pack: 1 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  Rp: 'Innengewinde',
  L: 'Achsabstand der Anschlüsse',
  L1: 'Gesamtlänge',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
