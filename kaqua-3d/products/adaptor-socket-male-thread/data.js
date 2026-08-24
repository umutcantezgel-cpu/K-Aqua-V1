/* K-Aqua Übergangsmuffe mit Außengewinde — Artikeltabelle.

   PHASE 1, verifiziert am 18.08.2026 gegen
   Transition Fittings K-Aqua/screencapture-…-adaptor-socket-male-thread-….png
   (quellen/t-adaptor-male.png, 3004 × 9636 px).

   Spaltenköpfe wie abgebildet: Code · d · R · D · D1 · l · z · kg · Pack.

   ERSTES VERBUNDTEIL DES KATALOGS. Das Produktfoto zeigt zwei
   Werkstoffe: einen grünen PP-R-Körper mit geriffelter Mantelfläche und
   einen eingepressten Messing-Gewindezapfen. Beide werden modelliert —
   im Halbschnitt ist die Fügestelle sichtbar, und das ist der Punkt,
   den ein Katalogfoto nicht zeigen kann.

   MASSSCHLÜSSEL:
     d   Rohr-Außendurchmesser = Muffenbohrung
     R   Rohrgewinde in Zoll (kegelig, ISO 7-1 / DIN 2999)
     D   größter Außendurchmesser — der Bund am Messingteil
     D1  Außendurchmesser des PP-Muffenteils
     l   Gesamtlänge
     z   Einbaulänge

   Gegenprobe D1: bei d20 ist D1 = 29, und die Muffe d20 führt D = 29.
   Bei d32 ist D1 = 43, Muffe d32 führt 44. D1 ist also der
   Außendurchmesser des Muffenteils — dieselbe Wandstärke wie bei jedem
   anderen Fitting derselben Nennweite.

   ZWEI NENNWEITEN: dieselbe Rohrgröße kommt mit verschiedenen
   Gewindegrößen (d20 mit ½" und ¾", d32 mit ¾" und 1"). Die Zeile wird
   erst durch das Paar (d, R) eindeutig — deshalb der zusammengesetzte
   Schlüssel `key` und sizeKey im Produkt.

   ASSUMPTION Gewindemaße: die Tabelle nennt nur die Zollgröße. Kern-
   und Steigungsmaße kommen aus ISO 7-1 (R½" = 20,955 mm / 1,814 mm
   Steigung). Das ist Norm, keine Schätzung — die Zollangabe bestimmt
   sie eindeutig. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 12;
export const SDR = 6;

/* Die Gewindetabelle steht seit dem 24.08.2026 im Core
   (core/geometry.js, threadSpec) — sie stand fünfmal im Produktcode
   und gehört dorthin, wo FUSION_DEPTH steht (Fall 19). */

export const ARTICLES = [
  { key: '20x1/2', code: 'AQ243G2012', d: 20, R: '1/2', D: 35, D1: 29, l: 53, z: 40, kg: 0.08, pack: 200 },
  { key: '20x3/4', code: 'AQ243G2034', d: 20, R: '3/4', D: 43, D1: 34, l: 58, z: 42, kg: 0.12, pack: 140 },
  { key: '25x1/2', code: 'AQ243G2512', d: 25, R: '1/2', D: 35, D1: 34, l: 53, z: 40, kg: 0.08, pack: 160 },
  { key: '25x3/4', code: 'AQ243G2534', d: 25, R: '3/4', D: 43, D1: 34, l: 58, z: 42, kg: 0.12, pack: 160 },
  { key: '32x3/4', code: 'AQ243G3234', d: 32, R: '3/4', D: 43, D1: 43, l: 58, z: 42, kg: 0.13, pack: 150 },
  { key: '32x1', code: 'AQ243G321', d: 32, R: '1', D: 50, D1: 43, l: 66, z: 48, kg: 0.19, pack: 75 },
  { key: '40x1_1/4', code: 'AQ243G40114', d: 40, R: '1 1/4', D: 62, D1: 52, l: 74, z: 53, kg: 0.31, pack: 48 },
  { key: '50x1_1/2', code: 'AQ243G50112', d: 50, R: '1 1/2', D: 69, D1: 64, l: 77, z: 54, kg: 0.35, pack: 36 },
  { key: '63x2', code: 'AQ243G632', d: 63, R: '2', D: 84, D1: 79, l: 92, z: 65, kg: 0.65, pack: 24 },
  { key: '75x2_1/2', code: 'AQ243G75212', d: 75, R: '2 1/2', D: 112, D1: 99, l: 112, z: 82, kg: 1.19, pack: 8 },
  { key: '90x3', code: 'AQ243G903', d: 90, R: '3', D: 134, D1: 124, l: 143, z: 111, kg: 1.98, pack: 6 },
  { key: '110x4', code: 'AQ243G1104', d: 110, R: '4', D: 169, D1: 151, l: 161, z: 124, kg: 2.8, pack: 3 },
];

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  R: 'Rohrgewinde',
  D: 'Außendurchmesser Bund',
  D1: 'Außendurchmesser Muffe',
  l: 'Gesamtlänge',
  z: 'Einbaulänge',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}
