/* K-Aqua T-Stück — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Fittings K-Aqua/screencapture-…-fittings-tee-2026-06-20-05_41_48.pdf
   (Seitenbilder quellen/fg-tee-p1.jpg, -p2.jpg). Tabelle über den
   Seitenumbruch: Seite 1 endet bei d75, Seite 2 führt d90–d125.

   Spaltenköpfe wie abgebildet:
     Code · d · D · l · L · l1 · z · s · kg · Pack.
   Die Spalte s ist in JEDER Zeile ein Gedankenstrich — sie gilt für die
   Stumpfschweißvarianten und ist hier durchgehend leer. Nicht übernommen.

   MASSSCHLÜSSEL (technische Zeichnung neben dem Produktfoto):
     d   Rohr-Außendurchmesser = Muffenbohrung
     D   Außendurchmesser
     l   Achse Abzweig → Stirnfläche Durchgang
     L   Gesamtlänge Durchgang, Stirnfläche bis Stirnfläche
     l1  Achse Durchgang → Stirnfläche Abzweig
     z   Einbaulänge

   Transkriptionsprobe: L muss 2·l ergeben. Kleine Abweichungen sind
   Herstellerrundungen (d20: L = 55 gegen 2·l = 54; d125: L = 250 gegen
   2·l = 250 ✓). Maßgeblich ist L; die Hälfte wird daraus gerechnet,
   damit das Modell symmetrisch bleibt. Die Differenz steht als
   P.lDelta im Prüfbericht.

   ── MUFFENTIEFE: warum NICHT l − z ──
   Die Tiefe ist physikalisch durch das Schweißwerkzeug bestimmt: ein
   Werkzeug je Nennweite, für alle Fittings dieser Nennweite. Sie kann
   bei Muffe, Winkel und T-Stück derselben Größe nicht abweichen.

   Die Muffentabelle bestätigt über (l − z)/2 die Normreihe
   DVS 2207-11 bei d20 bis d63 auf die Zehntelstelle. Hier streut
   l − z dagegen:

     d20  27 − 11 = 16,0   Norm 14,5   (+1,5)
     d25  32 − 13 = 19,0   Norm 16,0   (+3,0)
     d32  37 − 16 = 21,0   Norm 18,0   (+3,0)
     d40  43 − 23 = 20,0   Norm 20,5   (−0,5)
     d50  51 − 28 = 23,0   Norm 23,5   (−0,5)
     d63  62 − 34 = 28,0   Norm 27,5   (+0,5)
     d110 100 − 62 = 38,0  Norm 41,0   (−3,0)

   Bei Winkel und T-Stück bezeichnet z offenbar nicht dasselbe wie bei
   der Muffe — dort ist es nachweislich die Dicke des mittleren
   Anschlags, hier ein Einbaumaß mit anderem Bezugspunkt. Modelliert
   wird deshalb die Normreihe; l − z läuft als Gegenprobe mit und
   erscheint im Prüfbericht.

   ── ABWEICHUNGEN gegen docs Unterseiten/fittings/tee.md ──
   Die Markdown-Datei ist gegen diese Tabelle zu prüfen, sobald sie
   vorliegt; im angebundenen Ordner fehlt sie. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 10;
export const SDR = 6;

export const ARTICLES = [
  { code: 'AQ13020', d: 20, D: 29, l: 27, L: 55, l1: 27, z: 11, kg: 0.02, pack: 200 },
  { code: 'AQ13025', d: 25, D: 35, l: 32, L: 62, l1: 31, z: 13, kg: 0.04, pack: 100 },
  { code: 'AQ13032', d: 32, D: 44, l: 37, L: 74, l1: 37, z: 16, kg: 0.06, pack: 60 },
  { code: 'AQ13040', d: 40, D: 52, l: 43, L: 88, l1: 44, z: 23, kg: 0.09, pack: 42 },
  { code: 'AQ13050', d: 50, D: 65, l: 51, L: 104, l1: 52, z: 28, kg: 0.17, pack: 28 },
  { code: 'AQ13063', d: 63, D: 84, l: 62, L: 124, l1: 62, z: 34, kg: 0.34, pack: 15 },
  { code: 'AQ13075', d: 75, D: 100, l: 73, L: 142, l1: 71, z: 41, kg: 0.54, pack: 12 },
  { code: 'AQ13090', d: 90, D: 120, l: 84, L: 166, l1: 83, z: 50, kg: 0.95, pack: 6 },
  { code: 'AQ130110', d: 110, D: 148, l: 100, L: 198, l1: 99, z: 62, kg: 1.56, pack: 4 },
  { code: 'AQ130125', d: 125, D: 165, l: 125, L: 250, l1: 124, z: 78, kg: 2.7, pack: 1 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  D: 'Außendurchmesser',
  l: 'Achse Abzweig bis Stirnfläche',
  L: 'Gesamtlänge Durchgang',
  l1: 'Abzweiglänge',
  z: 'Einbaulänge',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
