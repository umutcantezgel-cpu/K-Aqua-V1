/* K-Aqua Reduzier-T-Stück — Artikeltabelle.

   QUELLE: Druckkatalog KA-Katalog_GB_06-2025_NEU.pdf, Seiten 88 und 89,
   Tabelle „Reducing tee". 37 Größen.

   ZWEI BAUARTEN IN EINER TABELLE, getrennt durch die Zwischenzeile
   „SDR 11*" und die Fußnote „SDR 11 jointing techniques: butt-fusion or
   electrofusion welding":

     · oben  27 Größen mit SCHWEISSMUFFEN — Spalten D und D1 belegt,
       s und s1 leer,
     · unten 10 Größen mit SPITZENDEN für Heizelementstumpf- oder
       Elektroschweißung — D und D1 leer, dafür die Wandstärken s und s1.

   DIE SPALTEN l UND z BEDEUTEN IN DEN BEIDEN BLÖCKEN VERSCHIEDENES.
   Das steht nirgends geschrieben; es ergibt sich aus den beiden
   Zeichnungen auf S. 89 und ist an den Zahlen nachgerechnet:

     Muffenbauart   l  = Achse → Stirnfläche
                    z  = l − Muffentiefe (Einbaulänge)
                    l1 = Achse → Stirnfläche Abzweig
                    z1 = l1 − Muffentiefe Abzweig

     Spitzendbauart z  = Achse → Stirnfläche
                    l  = Länge des dünnwandigen Spitzendes
                    z1 = Achse → Stirnfläche Abzweig
                    l1 = Länge des Abzweig-Spitzendes

   NACHGERECHNET, nicht angenommen. Bei der Muffenbauart ergibt l − z
   genau die Muffentiefe:

       d25  32−16 = 16,0   Norm 16,0      d63  62−35 = 27,0   Norm 27,5
       d32  38−20 = 18,0   Norm 18,0      d75  71−41 = 30,0   Norm 31,0
       d40  44−24 = 20,0   Norm 20,5      d90  83−50 = 33,0   Norm 35,0
       d50  52−28 = 24,0   Norm 23,5      d110 99−62 = 37,0   Norm 41,0

   Bis d63 auf einen halben Millimeter, darüber wächst die Abweichung.
   Denselben Drift zeigt der Kugelhahn (S. 107, Spalte C) mit 35,5 gegen
   35,0 bei d90. Der Katalog rechnet oberhalb d75 mit etwas kürzeren
   Muffen als DVS 2207-11. Gebaut wird nach der TABELLE.

   Bei der Spitzendbauart wäre dieselbe Deutung unmöglich: z = 206 bei
   l = 104 (AQ13016090) — eine Einbaulänge, die die Baulänge übersteigt,
   gibt es nicht. Umgekehrt geht es auf: z = 206 als halbe Baulänge, l =
   104 als Länge des Spitzendes davor.

   d2 IST IMMER GLEICH d. Über alle 36 Zeilen. Der Katalog führt die
   Spalte für ein allgemeines Reduzier-T; reduziert wird hier aber nur
   der ABZWEIG, nie der Durchgang. Die Spalte ist mitgeführt und wird
   geprüft, aber nicht modelliert.

   VIER AUFFÄLLIGKEITEN, dokumentiert statt aufgelöst:

   1. AQ1307520 (d75 × 20) führt D = 85. Alle anderen d75-Zeilen führen
      D = 100, und das gleichschenklige T-Stück d75 (AQ13075) ebenfalls.
      D ist der Muffenaußendurchmesser des DURCHGANGS und kann nicht vom
      Abzweig abhängen. Wahrscheinlich ein Satzfehler. NICHT geändert —
      das Modell baut 85 und weicht damit sichtbar von seinen
      Nachbarzeilen ab.

   2. AQ1305032 (d50 × 32) führt l1 = 62, die Nachbarzeilen d50 × 20 und
      d50 × 25 führen l1 = 46. Ein Sprung von 16 mm für eine um eine
      Nennweite größere Abzweigung, während d50 × 40 ebenfalls 62 führt.
      Möglich, aber auffällig. NICHT geändert.

   3. z HÄNGT IN ZWEI ZEILEN VOM ABZWEIG AB, was es nicht dürfte: z ist
      die Einbaulänge des DURCHGANGS, also l minus dessen Muffentiefe —
      und die kann von der Abzweiggröße nicht abhängen. AQ1305040
      (d50 × 40) und AQ1306340 (d63 × 40) führen je z = 39, alle anderen
      Zeilen derselben Durchgangsgröße 28 bzw. 35. Beide Ausreißer sind
      genau die Zeilen mit dem größten Abzweig ihrer Gruppe und führen
      zugleich als einzige ein D1 in Höhe des Durchgangs-D.
      Möglicherweise eine eigene Bauform. NICHT geändert; das Modell
      nimmt l, nicht z.

   4. AQ1307563 (d75 × 63) führt D1 = 101 bei D = 100 — die
      Abzweigmuffe wäre einen Millimeter DICKER als die Durchgangsmuffe.
      Bei den übrigen 26 Muffenzeilen ist D1 ≤ D. Ein Millimeter ist zu
      wenig, um daraus einen Satzfehler zu machen, und zu viel, um ihn
      zu übersehen. NICHT geändert; der Wächter im Modell lässt bis
      D + 1,5 mm zu und meldet darüber. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 37;

/* Muffenbauart — Spalten: d · d1 · d2 · D · l · z · l1 · D1 · z1 */
const MUFFE = [
  { code: 'AQ1302520',  d: 25,  d1: 20,  d2: 25,  D: 44,  l: 32,  z: 16, l1: 32,  D1: 29,  z1: 17, kg: 0.04, pack: 150 },
  { code: 'AQ1303220',  d: 32,  d1: 20,  d2: 32,  D: 43,  l: 38,  z: 20, l1: 36,  D1: 34,  z1: 21, kg: 0.06, pack: 80 },
  { code: 'AQ1303225',  d: 32,  d1: 25,  d2: 32,  D: 43,  l: 38,  z: 20, l1: 36,  D1: 34,  z1: 20, kg: 0.06, pack: 80 },
  { code: 'AQ1304020',  d: 40,  d1: 20,  d2: 40,  D: 52,  l: 44,  z: 24, l1: 39,  D1: 43,  z1: 24, kg: 0.08, pack: 48 },
  { code: 'AQ1304025',  d: 40,  d1: 25,  d2: 40,  D: 52,  l: 44,  z: 23, l1: 40,  D1: 43,  z1: 24, kg: 0.09, pack: 48 },
  { code: 'AQ1304032',  d: 40,  d1: 32,  d2: 40,  D: 52,  l: 44,  z: 23, l1: 40,  D1: 43,  z1: 22, kg: 0.09, pack: 48 },
  { code: 'AQ1305020',  d: 50,  d1: 20,  d2: 50,  D: 65,  l: 52,  z: 28, l1: 46,  D1: 43,  z1: 31, kg: 0.16, pack: 36 },
  { code: 'AQ1305025',  d: 50,  d1: 25,  d2: 50,  D: 65,  l: 52,  z: 28, l1: 46,  D1: 43,  z1: 30, kg: 0.16, pack: 30 },
  { code: 'AQ1305032',  d: 50,  d1: 32,  d2: 50,  D: 65,  l: 52,  z: 28, l1: 62,  D1: 43,  z1: 28, kg: 0.16, pack: 30 },
  { code: 'AQ1305040',  d: 50,  d1: 40,  d2: 50,  D: 65,  l: 62,  z: 39, l1: 62,  D1: 65,  z1: 35, kg: 0.16, pack: 30 },
  { code: 'AQ1306320',  d: 63,  d1: 20,  d2: 63,  D: 85,  l: 62,  z: 35, l1: 62,  D1: 43,  z1: 48, kg: 0.31, pack: 16 },
  { code: 'AQ1306325',  d: 63,  d1: 25,  d2: 63,  D: 85,  l: 62,  z: 35, l1: 62,  D1: 43,  z1: 46, kg: 0.31, pack: 18 },
  { code: 'AQ1306332',  d: 63,  d1: 32,  d2: 63,  D: 85,  l: 62,  z: 35, l1: 62,  D1: 43,  z1: 44, kg: 0.31, pack: 18 },
  { code: 'AQ1306340',  d: 63,  d1: 40,  d2: 63,  D: 85,  l: 62,  z: 39, l1: 62,  D1: 85,  z1: 42, kg: 0.37, pack: 18 },
  { code: 'AQ1306350',  d: 63,  d1: 50,  d2: 63,  D: 85,  l: 62,  z: 35, l1: 62,  D1: 85,  z1: 39, kg: 0.32, pack: 16 },
  { code: 'AQ1307520',  d: 75,  d1: 20,  d2: 75,  D: 85,  l: 71,  z: 41, l1: 71,  D1: 43,  z1: 57, kg: 0.51, pack: 12,
    anmerkung: 'D = 85 statt 100 — siehe WIDERSPRUCH 1 im Kopf' },
  { code: 'AQ1307525',  d: 75,  d1: 25,  d2: 75,  D: 100, l: 71,  z: 41, l1: 71,  D1: 43,  z1: 55, kg: 0.51, pack: 12 },
  { code: 'AQ1307532',  d: 75,  d1: 32,  d2: 75,  D: 100, l: 71,  z: 41, l1: 71,  D1: 43,  z1: 53, kg: 0.51, pack: 12 },
  { code: 'AQ1307540',  d: 75,  d1: 40,  d2: 75,  D: 100, l: 71,  z: 41, l1: 71,  D1: 65,  z1: 51, kg: 0.51, pack: 12 },
  { code: 'AQ1307550',  d: 75,  d1: 50,  d2: 75,  D: 100, l: 71,  z: 41, l1: 71,  D1: 65,  z1: 48, kg: 0.51, pack: 12 },
  { code: 'AQ1307563',  d: 75,  d1: 63,  d2: 75,  D: 100, l: 71,  z: 41, l1: 71,  D1: 101, z1: 44, kg: 0.52, pack: 12 },
  { code: 'AQ1309063',  d: 90,  d1: 63,  d2: 90,  D: 120, l: 83,  z: 50, l1: 83,  D1: 120, z1: 55, kg: 0.91, pack: 5 },
  { code: 'AQ1309075',  d: 90,  d1: 75,  d2: 90,  D: 120, l: 83,  z: 50, l1: 83,  D1: 120, z1: 53, kg: 0.91, pack: 5 },
  { code: 'AQ13011063', d: 110, d1: 63,  d2: 110, D: 148, l: 99,  z: 62, l1: 99,  D1: 85,  z1: 71, kg: 1.53, pack: 4 },
  { code: 'AQ13011075', d: 110, d1: 75,  d2: 110, D: 148, l: 99,  z: 62, l1: 99,  D1: 100, z1: 69, kg: 1.54, pack: 4 },
  { code: 'AQ13011090', d: 110, d1: 90,  d2: 110, D: 148, l: 99,  z: 62, l1: 99,  D1: 120, z1: 66, kg: 1.57, pack: 4 },
  { code: 'AQ130125110', d: 125, d1: 110, d2: 125, D: 165, l: 124, z: 84, l1: 110, D1: 148, z1: 87, kg: 2.60, pack: 1 },
];

/* Spitzendbauart, SDR 11 — Spalten: d · d1 · d2 · l · z · l1 · z1 · s · s1
   Fußnote: „SDR 11 jointing techniques: butt-fusion or electrofusion welding" */
const SPITZENDE = [
  { code: 'AQ13016090',  d: 160, d1: 90,  d2: 160, l: 104, z: 206, l1: 83,  z1: 190, s: 14.6, s1: 8.2,  kg: 3.6,  pack: 1 },
  { code: 'AQ130160110', d: 160, d1: 110, d2: 160, l: 104, z: 207, l1: 89,  z1: 200, s: 14.6, s1: 10,   kg: 3.8,  pack: 1 },
  { code: 'AQ13020090',  d: 200, d1: 90,  d2: 200, l: 124, z: 250, l1: 82,  z1: 216, s: 18.2, s1: 8.2,  kg: 6.9,  pack: 1 },
  { code: 'AQ130200110', d: 200, d1: 110, d2: 200, l: 124, z: 250, l1: 86,  z1: 219, s: 18.2, s1: 10,   kg: 7.1,  pack: 1 },
  { code: 'AQ130200160', d: 200, d1: 160, d2: 200, l: 120, z: 250, l1: 101, z1: 253, s: 18.2, s1: 14.6, kg: 7.6,  pack: 1 },
  { code: 'AQ130250110', d: 250, d1: 110, d2: 250, l: 133, z: 288, l1: 85,  z1: 248, s: 22.7, s1: 10,   kg: 11.9, pack: 1 },
  { code: 'AQ130250160', d: 250, d1: 160, d2: 250, l: 134, z: 292, l1: 102, z1: 266, s: 22.7, s1: 14.6, kg: 12.4, pack: 1 },
  { code: 'AQ130315110', d: 315, d1: 110, d2: 315, l: 155, z: 346, l1: 85,  z1: 282, s: 28.6, s1: 10,   kg: 22.1, pack: 1 },
  { code: 'AQ130315160', d: 315, d1: 160, d2: 315, l: 155, z: 352, l1: 101, z1: 301, s: 28.6, s1: 14.6, kg: 22.8, pack: 1 },
  { code: 'AQ130315250', d: 315, d1: 250, d2: 315, l: 154, z: 346, l1: 135, z1: 331, s: 28.6, s1: 22.7, kg: 24.4, pack: 1 },
];

export const ARTICLES = [
  ...MUFFE.map((a) => ({ ...a, bauart: 'muffe', key: a.d + 'x' + a.d1 })),
  ...SPITZENDE.map((a) => ({ ...a, bauart: 'spitzende', key: a.d + 'x' + a.d1 })),
];

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Nennmaß Durchgang',
  d1: 'Nennmaß Abzweig',
  d2: 'Nennmaß Durchgang, zweites Ende',
  D: 'Außendurchmesser Durchgangsmuffe',
  D1: 'Außendurchmesser Abzweigmuffe',
  l: 'Achse → Stirnfläche (Muffe) bzw. Spitzendlänge',
  z: 'Einbaulänge (Muffe) bzw. Achse → Stirnfläche (Spitzende)',
  l1: 'Achse → Stirnfläche Abzweig (Muffe) bzw. Spitzendlänge Abzweig',
  z1: 'Einbaulänge Abzweig (Muffe) bzw. Achse → Stirnfläche (Spitzende)',
  s: 'Wandstärke Durchgang',
  s1: 'Wandstärke Abzweig',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}
