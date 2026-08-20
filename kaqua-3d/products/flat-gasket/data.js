/* K-Aqua Flachdichtung — Artikeltabelle.

   PHASE 1, verifiziert am 18.08.2026 gegen
   Accessories K-Aqua/screencapture-…-accessories-flat-gasket-….png
   (quellen/w1-gasket.png, 3004 × 9506 px).

   Spaltenköpfe wie abgebildet:  Code · d · Pack.
   11 Größen, d40 bis d315. Die Tabelle läuft über die ganze Seite;
   die letzten Zeilen standen unterhalb des ersten Zuschnitts — deshalb
   ein zweiter Blick auf dieselbe Quelle (Fehlerkatalog Fall 2).

   ── DIE QUELLE FÜHRT NUR EINE ZAHL ──
   Weder Außendurchmesser noch Innendurchmesser noch Dicke. `d` ist die
   Nennweite, für die die Dichtung passt.

   Der Nachbarartikel „Flachdichtung für Verschraubungen" ist dagegen
   vollständig bemaßt (Code · d · R/Rp · Nut thread · D · d1 · s) und
   liefert die fehlenden Verhältnisse:

     d20 → D 27, d1 20, s 3
     d25 → D 35, d1 25, s 3
     d32 → D 38, d1 28, s 3

   Daraus: s = 3 mm konstant, d1 ≈ d (bei d32 leicht darunter),
   D/d ≈ 1,35 bis 1,19 — fallend mit der Größe.

   Diese Dichtung sitzt aber zwischen zwei Flanschen, nicht in einer
   Verschraubung. Für sie gilt: der Innendurchmesser muss den
   Rohrdurchgang freilassen, der Außendurchmesser die Dichtfläche des
   Bundes abdecken. Beides ist in params.js als ASSUMPTION gerechnet und
   gegen die Bundbuchse (fittings/flange-adaptor) zu verifizieren,
   sobald die gebaut ist. */

export const DATA_STATUS = 'verifiziert-ohne-masse';
export const SIZES_SOURCE_VERIFIED = 11;

export const ARTICLES = [
  { code: 'AQ71440', d: 40, pack: 1 },
  { code: 'AQ71450', d: 50, pack: 1 },
  { code: 'AQ71463', d: 63, pack: 1 },
  { code: 'AQ71475', d: 75, pack: 1 },
  { code: 'AQ71490', d: 90, pack: 1 },
  { code: 'AQ714110', d: 110, pack: 1 },
  { code: 'AQ714125', d: 125, pack: 1 },
  { code: 'AQ714160', d: 160, pack: 1 },
  { code: 'AQ714200', d: 200, pack: 1 },
  { code: 'AQ714250', d: 250, pack: 1 },
  { code: 'AQ714315', d: 315, pack: 1 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennweite',
  D: 'Außendurchmesser',
  d1: 'Innendurchmesser',
  s: 'Dicke',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
