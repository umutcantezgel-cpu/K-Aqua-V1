/* K-Aqua Bundflansch PP-Stahl — Artikeltabelle.

   PHASE 1, verifiziert am 19.08.2026 gegen
   Accessories K-Aqua/screencapture-…-accessories-backing-flange-pp-steel-….png
   (quellen/w2-backing-flange.png, 3004 × 9746 px).

   Spaltenköpfe wie abgebildet:
     Code · d · D · D1 · D2 · D3 · H · System · kg · Pack.
   11 Größen, d40 bis d315. Tabelle über zwei Zuschnitte.

   MASSSCHLÜSSEL (aus Foto und Spaltenlogik):
     d   Rohr-Nennweite, für die der Flansch gilt
     D   Außendurchmesser des Flanschrings
     D1  Lochkreisdurchmesser
     D2  Innendurchmesser — die Bohrung, durch die die Bundbuchse geht
     D3  Durchmesser der Schraubenlöcher
     H   Dicke
     System  SF = Muffenschweißung · BF = Stumpfschweißung · SF/BF = beides

   Gegenproben:
     D > D1 > D2 in jeder Zeile ✓
     D2 > d in jeder Zeile ✓ (der Flansch schiebt sich über die Buchse)
     H wächst monoton 16 → 34 ✓
     D3 springt bei d160 von 18 auf 22 — dort wechselt das System auf BF

   ── LOCHZAHL: NICHT TABELLIERT, ABER HERLEITBAR ──
   Die Tabelle nennt Lochkreis und Lochdurchmesser, nicht aber die Zahl
   der Löcher. Das Foto zeigt vier — aber nur für eine Größe.

   Die Herleitung geht über die Norm: D, D1 und D3 stimmen in JEDER
   Zeile mit der Reihe DIN 2501 / EN 1092-1 PN 10 überein, wenn man die
   Rohr-Nennweite d auf die Flansch-Nennweite DN abbildet:

     d40  → DN32:  D140 D1 100 4×18  ✓
     d50  → DN40:  D150 D1 110 4×18  ✓
     d63  → DN50:  D165 D1 125 4×18  ✓
     d75  → DN65:  D185 D1 145 4×18  ✓
     d90  → DN80:  D200 D1 160 8×18  ✓
     d110 → DN100: D220 D1 180 8×18  ✓
     d125 → DN125: D250 D1 210 8×18  ✓
     d160 → DN150: D285 D1 240 8×22  ✓
     d200 → DN200: D340 D1 295 8×22  ✓
     d250 → DN250: D395 D1 350 12×22 ✓
     d315 → DN300: D445 D1 400 12×22 ✓

   Elf von elf Zeilen treffen drei Normmaße gleichzeitig. Damit ist die
   Reihe eindeutig identifiziert, und die vierte Größe — die Lochzahl —
   folgt daraus. Sie steht unten als `holes` und ist als abgeleitet
   markiert, nicht als gelesen.

   Die DN-Spalte ist ebenfalls abgeleitet und dient nur der
   Nachvollziehbarkeit dieser Herleitung. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 11;

export const ARTICLES = [
  { code: 'AQ75040', d: 40, D: 140, D1: 100, D2: 51, D3: 18, H: 16, system: 'SF/BF', kg: 0.62, pack: 20, dn: 32, holes: 4, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ75050', d: 50, D: 150, D1: 110, D2: 62, D3: 18, H: 18, system: 'SF/BF', kg: 0.82, pack: 17, dn: 40, holes: 4, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ75063', d: 63, D: 165, D1: 125, D2: 78, D3: 18, H: 18, system: 'SF/BF', kg: 0.94, pack: 15, dn: 50, holes: 4, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ75075', d: 75, D: 185, D1: 145, D2: 92, D3: 18, H: 18, system: 'SF/BF', kg: 1.35, pack: 11, dn: 65, holes: 4, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ75090', d: 90, D: 200, D1: 160, D2: 110, D3: 18, H: 20, system: 'SF', kg: 1.39, pack: 13, dn: 80, holes: 8, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ750110', d: 110, D: 220, D1: 180, D2: 133, D3: 18, H: 20, system: 'SF', kg: 1.41, pack: 13, dn: 100, holes: 8, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ750125', d: 125, D: 250, D1: 210, D2: 150, D3: 18, H: 20, system: 'SF', kg: 1.41, pack: 12, dn: 125, holes: 8, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ750160', d: 160, D: 285, D1: 240, D2: 178, D3: 22, H: 24, system: 'BF', kg: 3.6, pack: 1, dn: 150, holes: 8, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ750200', d: 200, D: 340, D1: 295, D2: 235, D3: 22, H: 27, system: 'BF', kg: 5.2, pack: 1, dn: 200, holes: 8, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ750250', d: 250, D: 395, D1: 350, D2: 288, D3: 22, H: 30, system: 'BF', kg: 6.63, pack: 1, dn: 250, holes: 12, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ750315', d: 315, D: 445, D1: 400, D2: 338, D3: 22, H: 34, system: 'BF', kg: 8.4, pack: 1, dn: 300, holes: 12, abgeleitet: ['holes', 'dn'] },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennweite',
  D: 'Außendurchmesser',
  D1: 'Lochkreis',
  D2: 'Innendurchmesser',
  D3: 'Lochdurchmesser',
  H: 'Dicke',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
