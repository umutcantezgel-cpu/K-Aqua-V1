/* K-Aqua Rohrschelle — Artikeltabelle.

   PHASE 1, verifiziert am 19.08.2026 gegen
   Accessories K-Aqua/screencapture-…-accessories-pipe-clamps-….png
   (quellen/w2-pipe-clamp.png, 3004 × 9734 px).

   Spaltenköpfe wie abgebildet:  Code · d · kg · Pack.
   9 Größen, d20 bis d110.

   ── WAS DAS FOTO ZEIGT ──
   Ein Verbundteil aus vier Werkstoffen, deutlich erkennbar:

     1. zwei grüne PP-Halbschalen, an einer Seite scharnierartig
        zusammenlaufend, an der anderen mit Laschen
     2. eine DUNKELGRÜNE Gummieinlage in beiden Schalen — sie liegt am
        Rohr an und dämmt Körperschall
     3. zwei Sechskantschrauben durch die Laschen, metallisch glänzend,
        mit Beilagscheibe
     4. eine Metallmutter mit Innengewinde am unteren Bogen — dort wird
        die Gewindestange der Deckenbefestigung eingeschraubt

   Die Schelle ist damit das komplexeste Zubehörteil des Katalogs und
   das erste Produkt mit einer Gummieinlage.

   ── KEINE GEOMETRIEMASSE IN DER QUELLE ──
   Die Tabelle führt nur die Nennweite. Alle Maße sind aus dem Foto
   abgeleitet und über das Gewicht gegengeprüft — Herleitung in
   params.js.

   Gewichtsverlauf: 0,06 · 0,06 · 0,07 · 0,08 · 0,08 · 0,13 · 0,20 ·
   0,21 · 0,24 kg. Der Sprung von d50 (0,08) auf d63 (0,13) ist
   auffällig groß; dort wechselt offenbar die Schalenstärke oder die
   Schraubengröße von M8 auf M10. Als ASSUMPTION in params.js
   berücksichtigt. */

export const DATA_STATUS = 'verifiziert-ohne-masse';
export const SIZES_SOURCE_VERIFIED = 9;

export const ARTICLES = [
  { code: 'AQ50020', d: 20, kg: 0.06, pack: 100 },
  { code: 'AQ50025', d: 25, kg: 0.06, pack: 100 },
  { code: 'AQ50032', d: 32, kg: 0.07, pack: 75 },
  { code: 'AQ50040', d: 40, kg: 0.08, pack: 50 },
  { code: 'AQ50050', d: 50, kg: 0.08, pack: 50 },
  { code: 'AQ50063', d: 63, kg: 0.13, pack: 50 },
  { code: 'AQ50075', d: 75, kg: 0.2, pack: 25 },
  { code: 'AQ50090', d: 90, kg: 0.21, pack: 25 },
  { code: 'AQ500110', d: 110, kg: 0.24, pack: 25 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennweite',
  D: 'Außendurchmesser Schelle',
  B: 'Bandbreite',
  M: 'Anschlussgewinde',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
