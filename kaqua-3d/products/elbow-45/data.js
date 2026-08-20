/* K-Aqua Winkel 45° — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Fittings K-Aqua/screencapture-…-fittings-elbow-45-….pdf
   (Seitenbilder quellen/fg-elbow-45-p1.jpg, -p2.jpg). Tabelle über den
   Seitenumbruch: Seite 1 endet bei d75, Seite 2 führt d90–d125.

   Spaltenköpfe wie abgebildet:
     Code · d · D · l · z · s · kg · Pack.
   Die Spalte s ist in JEDER Zeile ein Gedankenstrich — sie gilt für die
   Stumpfschweißvarianten und ist hier durchgehend leer. Nicht übernommen.

   MASSSCHLÜSSEL:
     d   Rohr-Außendurchmesser = Muffenbohrung
     D   Außendurchmesser des Fittings
     l   Schenkelmaß: Achsenschnittstelle bis Stirnfläche
     z   Einbaulänge

   Damit ist die Muffentiefe kein Schätzwert: l − z.
   Gegenprobe gegen die Normreihe DVS 2207-11 (siehe P.depthDeltaToNorm)
   trifft sie über den ganzen Bereich auf ±1,5 mm — dasselbe Bild wie bei
   der Muffe, wo die Spalte z die Reihe auf die Zehntelstelle bestätigt.

   In data.js heißt die Spalte einheitlich `leg`, damit Winkel 45° und
   90° dieselbe Parametrik benutzen können. Die Tabellenbezeichnung
   steht in DIMENSION_KEY. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 10;
export const ANGLE = 45;
export const SDR = 6;

export const ARTICLES = [
  { code: 'AQ04520', d: 20, D: 29, leg: 21, z: 6, kg: 0.02, pack: 300 },
  { code: 'AQ04525', d: 25, D: 35, leg: 24, z: 8, kg: 0.02, pack: 200 },
  { code: 'AQ04532', d: 32, D: 44, leg: 29, z: 10, kg: 0.05, pack: 100 },
  { code: 'AQ04540', d: 40, D: 52, leg: 32, z: 11, kg: 0.06, pack: 70 },
  { code: 'AQ04550', d: 50, D: 65, leg: 37, z: 13, kg: 0.1, pack: 48 },
  { code: 'AQ04563', d: 63, D: 84, leg: 44, z: 16, kg: 0.21, pack: 24 },
  { code: 'AQ04575', d: 75, D: 99, leg: 50, z: 20, kg: 0.32, pack: 14 },
  { code: 'AQ04590', d: 90, D: 120, leg: 58, z: 25, kg: 0.58, pack: 9 },
  { code: 'AQ045110', d: 110, D: 148, leg: 69, z: 32, kg: 0.98, pack: 4 },
  { code: 'AQ045125', d: 125, D: 165, leg: 78, z: 37, kg: 1.53, pack: 2 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  D: 'Außendurchmesser',
  leg: 'Schenkelmaß l',
  z: 'Einbaulänge',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
