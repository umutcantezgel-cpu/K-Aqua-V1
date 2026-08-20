/* K-Aqua Winkel 90° — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Fittings K-Aqua/screencapture-…-fittings-elbow-90-….pdf
   (Seitenbilder quellen/fg-elbow-90-p1.jpg, -p2.jpg). Tabelle über den
   Seitenumbruch: Seite 1 endet bei d75, Seite 2 führt d90–d125.

   Spaltenköpfe wie abgebildet:
     Code · d · D · L · z · s · kg · Pack.
   Die Spalte s ist in JEDER Zeile ein Gedankenstrich — sie gilt für die
   Stumpfschweißvarianten und ist hier durchgehend leer. Nicht übernommen.

   MASSSCHLÜSSEL:
     d   Rohr-Außendurchmesser = Muffenbohrung
     D   Außendurchmesser des Fittings
     L   Schenkelmaß: Achsenschnittstelle bis Stirnfläche
     z   Einbaulänge

   Damit ist die Muffentiefe kein Schätzwert: L − z.
   Gegenprobe gegen die Normreihe DVS 2207-11 (siehe P.depthDeltaToNorm)
   trifft sie über den ganzen Bereich auf ±1,5 mm — dasselbe Bild wie bei
   der Muffe, wo die Spalte z die Reihe auf die Zehntelstelle bestätigt.

   In data.js heißt die Spalte einheitlich `leg`, damit Winkel 45° und
   90° dieselbe Parametrik benutzen können. Die Tabellenbezeichnung
   steht in DIMENSION_KEY. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 10;
export const ANGLE = 90;
export const SDR = 6;

export const ARTICLES = [
  { code: 'AQ09020', d: 20, D: 29, leg: 27, z: 14, kg: 0.02, pack: 300 },
  { code: 'AQ09025', d: 25, D: 35, leg: 31, z: 16, kg: 0.02, pack: 180 },
  { code: 'AQ09032', d: 32, D: 44, leg: 37, z: 20, kg: 0.05, pack: 100 },
  { code: 'AQ09040', d: 40, D: 52, leg: 44, z: 23, kg: 0.07, pack: 60 },
  { code: 'AQ09050', d: 50, D: 65, leg: 52, z: 28, kg: 0.14, pack: 36 },
  { code: 'AQ09063', d: 63, D: 84, leg: 62, z: 34, kg: 0.27, pack: 22 },
  { code: 'AQ09075', d: 75, D: 101, leg: 71, z: 41, kg: 0.44, pack: 10 },
  { code: 'AQ09090', d: 90, D: 120, leg: 83, z: 50, kg: 0.79, pack: 6 },
  { code: 'AQ090110', d: 110, D: 148, leg: 99, z: 62, kg: 1.3, pack: 4 },
  { code: 'AQ090125', d: 125, D: 165, leg: 125, z: 84, kg: 2.17, pack: 2 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  D: 'Außendurchmesser',
  leg: 'Schenkelmaß L',
  z: 'Einbaulänge',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
