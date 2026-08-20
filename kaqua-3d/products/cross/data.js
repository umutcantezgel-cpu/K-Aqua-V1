/* K-Aqua Kreuz — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Fittings K-Aqua/screencapture-…-fittings-cross-….pdf
   (quellen/x-cross-p1.jpg).

   Spaltenköpfe: Code · d · L · z · Kg · Pack.
   NUR ZWEI GRÖSSEN, d25 und d32 — die kleinste Tabelle des Katalogs.
   Das ist kein Ablesefehler: die Tabelle endet nach zwei Zeilen, danach
   folgt unmittelbar der ORDER-Knopf.

   MASSSCHLÜSSEL:
     d  Nennmaß aller vier Anschlüsse
     L  Gesamtlänge, Stirnfläche bis Stirnfläche (beide Achsen gleich)
     z  Einbaulänge

   Gegenprobe: L/d = 2,4 bei d25 und 2,34 bei d32 — dasselbe Verhältnis
   wie beim T-Stück (62/25 = 2,48; 74/32 = 2,31). Plausibel.

   Die Muffentiefe kommt aus der Normreihe, nicht aus L − z. Begründung
   in products/tee/data.js: ein Schweißwerkzeug je Nennweite. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 2;
export const SDR = 6;

export const ARTICLES = [
  { code: 'AQ18025', d: 25, L: 60, z: 27, kg: 0.06, pack: 80 },
  { code: 'AQ18032', d: 32, L: 75, z: 34, kg: 0.08, pack: 50 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  L: 'Gesamtlänge',
  z: 'Einbaulänge',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
