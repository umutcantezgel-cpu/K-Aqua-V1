/* K-Aqua PP-R Kugelhahn (Ball in PP) — Artikeltabelle.

   Quelle: Produktseite-Screenshot, per Auge transkribiert (Phase 1 der
   Vorsession). Die Markdown-Datei führt AQ50020–AQ50063 mit den Spalten
   d/L/H — beides falsch. Verbindlich ist diese Tabelle.

   Alle Maße in mm.
   d  = Nennmaß / Rohr-Außendurchmesser = Muffenbohrung
   D  = größter Außendurchmesser (Überwurfmutter)
   L  = Baulänge Stirnfläche–Stirnfläche
   z  = Einbaulänge (Rohrende–Rohrende)
   H  = Rohrachse bis Oberkante Hebel
   A  = Hebellänge horizontal
   L1 = Herstellerangabe, in der Zeichnung nicht eindeutig auflösbar —
        nur informativ, NICHT als Constraint verwendet. */

export const ARTICLES = [
  { code: 'AQ85220', d: 20, D: 46,  L: 98,  z: 70,  H: 51,  A: 68,  L1: 63,  kg: 0.11 },
  { code: 'AQ85225', d: 25, D: 56,  L: 113, z: 82,  H: 61,  A: 78,  L1: 75,  kg: 0.19 },
  { code: 'AQ85232', d: 32, D: 66,  L: 121, z: 87,  H: 70,  A: 88,  L1: 79,  kg: 0.28 },
  { code: 'AQ85240', d: 40, D: 79,  L: 138, z: 98,  H: 81,  A: 98,  L1: 91,  kg: 0.44 },
  { code: 'AQ85250', d: 50, D: 87,  L: 148, z: 101, H: 90,  A: 108, L1: 95,  kg: 0.54 },
  { code: 'AQ85263', d: 63, D: 107, L: 175, z: 121, H: 110, A: 118, L1: 115, kg: 0.93 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  D: 'Außendurchmesser',
  L: 'Baulänge',
  z: 'Einbaulänge',
  H: 'Hebelhöhe',
  A: 'Hebellänge',
  L1: 'Herstellermaß L1 (nicht eindeutig)',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
