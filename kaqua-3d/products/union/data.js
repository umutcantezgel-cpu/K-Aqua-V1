/* K-Aqua Verschraubung (PP-R) — Artikeltabelle.

   PHASE 1, verifiziert am 19.08.2026 gegen
   Transition Fittings K-Aqua/screencapture-…-transition-fittings-union-….png
   (quellen/w3-union.png, 3004 × 8924 px).

   Spaltenköpfe wie abgebildet:
     Code · d · G · D · l · L · z · l1 · kg · Pack.
   6 Größen, d20 bis d63.

   ── DIE ENTSCHEIDENDE GEGENPROBE ──
   Die Spalte D lautet 46 · 56 · 66 · 79 · 87 · 107. Das sind **exakt**
   die D-Werte des Kugelhahns (products/ball-valve-pp/data.js) bei
   denselben Nennweiten. Diese Verschraubung ist damit dasselbe Bauteil,
   das der Kugelhahn beidseitig trägt — hier als Einzelartikel.

   Das ist mehr als eine Kuriosität: es bestätigt beide Tabellen
   gegenseitig und legt die Überwurfmutter-Geometrie fest, ohne dass sie
   geschätzt werden muss.

   MASSSCHLÜSSEL (aus Spaltenlogik und Kugelhahn-Vergleich):
     d   Rohr-Außendurchmesser = Muffenbohrung
     G   Gewinde der Überwurfmutter, in Zoll
     D   Außendurchmesser der Überwurfmutter — größtes Maß
     l   Länge des Mutterteils
     L   Gesamtlänge, Stirnfläche bis Stirnfläche
     z   Einbaulänge (Rohrende bis Rohrende)
     l1  Länge des Stutzenteils

   Gegenproben:
     l + l1 ≈ L in jeder Zeile (18+26=44 ✓ · 21+30=51 gegen L=52 ·
       30+47=77 gegen L=79). Die 1–2 mm Differenz ist die Überlappung
       im Gewinde — beide Teile greifen ineinander.
     z < L in jeder Zeile ✓
     D wächst monoton, G wächst monoton ✓

   ── KORREKTUR DER ERSTEN DEUTUNG ──
   Die erste Fassung dieses Kommentars nannte die Differenz zwischen
   l + l1 und L eine „Überlappung im Gewinde". Das ist falsch:

     d20  18+26 = 44  L 44  → 0 mm
     d25  19+28 = 47  L 48  → 1 mm fehlt
     d32  21+30 = 51  L 52  → 1 mm
     d40  23+34 = 57  L 58  → 1 mm
     d50  26+39 = 65  L 66  → 1 mm
     d63  30+47 = 77  L 79  → 2 mm

   l + l1 ist nie GRÖSSER als L. Es überlappt nichts, es fehlt ein
   Stück. Gedeutet als der freiliegende Ring des Stutzenbundes zwischen
   Mutterkante und Stutzenschulter — an einer angezogenen Verschraubung
   genau dort sichtbar. Er wird als P.collarGap modelliert und gemessen.

   ── DIE SPALTE z WIRD NICHT MODELLIERT ──
   z lautet 15 · 15 · 15 · 17 · 19 · 23 — bei d20 bis d32 konstant, dann
   steigend. Bei der Muffe (products/socket/data.js) ist z nachweislich
   die Dicke des mittleren Anschlags; hier gibt es keinen Anschlag, und
   kein Verhältnis zu L, l oder l1 ist erkennbar:

     z/L  = 0,34 · 0,31 · 0,29 · 0,29 · 0,29 · 0,29
     z/d  = 0,75 · 0,60 · 0,47 · 0,43 · 0,38 · 0,37
     L−z  = 29 · 33 · 37 · 41 · 47 · 56
     l1−z = 11 · 13 · 15 · 17 · 20 · 24

   L − z wächst gleichmäßig, aber ohne erkennbaren Bezug zu einer
   Baugruppenkante. Ohne technische Zeichnung ist z nicht auflösbar.

   Es wird deshalb NICHT modelliert und erscheint nur in aria-label und
   Fallback-Tabelle. Ein geratener Bezugspunkt wäre schlechter als eine
   benannte Lücke — bei der Reduzierbuchse hat eine falsch gedeutete
   Spalte einen ganzen Modellversuch gekostet.

   ASSUMPTION Muffentiefe: aus der Normreihe DVS 2207-11, nicht aus l
   oder z. Begründung wie bei Winkel und T-Stück (products/tee/data.js):
   ein Schweißwerkzeug je Nennweite für alle Fittings. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 6;
export const SDR = 6;

export const ARTICLES = [
  { code: 'AQ330A20', d: 20, G: '1', D: 46, l: 18, L: 44, z: 15, l1: 26, kg: 0.04, pack: 120 },
  { code: 'AQ330A25', d: 25, G: '1 1/4', D: 56, l: 19, L: 48, z: 15, l1: 28, kg: 0.06, pack: 100 },
  { code: 'AQ330A32', d: 32, G: '1 1/2', D: 66, l: 21, L: 52, z: 15, l1: 30, kg: 0.09, pack: 40 },
  { code: 'AQ330A40', d: 40, G: '2', D: 79, l: 23, L: 58, z: 17, l1: 34, kg: 0.14, pack: 30 },
  { code: 'AQ330A50', d: 50, G: '2 1/4', D: 87, l: 26, L: 66, z: 19, l1: 39, kg: 0.16, pack: 30 },
  { code: 'AQ330A63', d: 63, G: '2 3/4', D: 107, l: 30, L: 79, z: 23, l1: 47, kg: 0.27, pack: 10 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  G: 'Muttergewinde',
  D: 'Außendurchmesser Mutter',
  l: 'Länge Mutterteil',
  L: 'Gesamtlänge',
  z: 'Einbaulänge',
  l1: 'Länge Stutzenteil',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
