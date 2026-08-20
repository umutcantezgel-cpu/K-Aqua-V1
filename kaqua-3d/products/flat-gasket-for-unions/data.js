/* K-Aqua Flachdichtung für Verschraubungen — Artikeltabelle.

   PHASE 1, verifiziert am 18.08.2026 gegen
   Accessories K-Aqua/screencapture-…-accessories-flat-gasket-for-unions-pp-r-….png
   (quellen/w1-gasket-unions.png, 3004 × 8594 px).

   Spaltenköpfe wie abgebildet:
     Code · d · R/Rp · Nut thread · D · d1 · s · Pack.
   3 Größen. Danach folgt unmittelbar der ORDER-Knopf.

   VOLLSTÄNDIG BEMASST — im Gegensatz zur einfachen Flachdichtung, die
   nur die Nennweite führt. Diese Tabelle ist deshalb die Quelle für
   deren abgeleitete Verhältnisse (siehe products/flat-gasket/data.js).

   MASSSCHLÜSSEL:
     d          Nennweite der Verschraubung
     R/Rp       Rohrgewinde der Verschraubung, in Zoll
     Nut thread Gewinde der Überwurfmutter, G-Gewinde in Zoll
     D          Außendurchmesser der Dichtung
     d1         Innendurchmesser der Dichtung
     s          Dicke

   Gegenproben:
     D > d1 in jeder Zeile ✓  (27>20 · 35>25 · 38>28)
     Dichtbreite (D−d1)/2 = 3,5 · 5,0 · 5,0 mm — plausibel für eine
       Flachdichtung dieser Größe
     d1 gegen d: 20/20 = 1,00 · 25/25 = 1,00 · 28/32 = 0,875
       Bei d20 und d25 ist d1 = d, bei d32 liegt d1 darunter. Das ist
       kein Ablesefehler: die Dichtung sitzt im Grund der Verschraubung,
       und deren Durchgang ist bei d32 enger als das Rohr-Außenmaß.
     s = 3 konstant über alle Größen

   Die Spalten R/Rp und Nut thread beschreiben die VERSCHRAUBUNG, nicht
   die Dichtung. Sie sind übernommen, weil sie die Zuordnung eindeutig
   machen — zwei Dichtungen könnten sonst dasselbe D bei verschiedenem
   Gewinde haben. Modelliert werden sie nicht. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 3;

export const ARTICLES = [
  { code: 'AQ490F20', d: 20, R: '1/2', nutThread: '3/4', D: 27, d1: 20, s: 3, pack: 1 },
  { code: 'AQ490F25', d: 25, R: '3/4', nutThread: '1', D: 35, d1: 25, s: 3, pack: 1 },
  { code: 'AQ490F32', d: 32, R: '1', nutThread: '1 1/4', D: 38, d1: 28, s: 3, pack: 1 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennweite',
  R: 'Rohrgewinde',
  nutThread: 'Muttergewinde',
  D: 'Außendurchmesser',
  d1: 'Innendurchmesser',
  s: 'Dicke',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
