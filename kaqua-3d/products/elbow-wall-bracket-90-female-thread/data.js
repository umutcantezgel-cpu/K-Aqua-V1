/* K-Aqua Wandscheibe 90° mit Innengewinde — Artikeltabelle.

   PHASE 1, verifiziert am 24.08.2026 gegen ZWEI unabhängige
   Rang-1-Quellen, die sich Zeile für Zeile bestätigen:

     Marketing/Print/KA-Katalog_GB_06-2025_NEU.pdf, Seite 95 (oben)
     K-Aqua Unterseitem Kopie/Transition Fittings K-Aqua/
       screencapture-…-elbowwall-bracket-90-female-thread-….png

   Spaltenköpfe wie abgebildet:
     Code · d · Rp · D · L · z · h · D₁ · L₁ · z₁ · kg · Pack.
   5 Größen. Nach der letzten Zeile folgt der ORDER-Knopf (Fall 2).

   Die Markdown-Datei führt 4 Größen. Beide Quellen führen 5. Die
   Markdown-Zahl ist eine untere Schranke, kein Maß (Fall 1).

   ── DIE TABELLE STAND IM KATALOG SPALTENWEISE ──
   Die Textebene des PDF läuft nicht in Leserichtung: auf Seite 95
   stehen erst beide Überschriften, dann die Codes, dann Spalte für
   Spalte die Werte. Zusammengesetzt wurde nach Spaltenposition und
   anschließend gegen die Website-Aufnahme geprüft — alle fünf Zeilen,
   alle zwölf Spalten identisch. Ohne diese Gegenprobe wäre die
   Reihenfolge geraten (Fall 28).

   MASSSCHLÜSSEL: siehe ../_bracket/params.js.

   ── DER UNTERSCHIED ZUM ANSCHLUSSBOGEN IST DIE LASCHE ──
   AQ472G und AQ090G teilen den Körper. Wo beide dieselbe Größe führen,
   sind D₁, z, z₁ gleich und h ist bei AQ472G um genau 2 mm größer:

     d20×½"   h 15 gegen 13
     d25×½"   h 17 gegen 15
     d25×¾"   h 22 gegen 20
     d32×1"   h 22 gegen 20

   Viermal dieselbe Differenz. Das ist die Lasche, die unter dem Körper
   hervorsteht — der einzige Teil ihrer Geometrie, der belegt ist. Alles
   Übrige an ihr ist ASSUMPTION aus dem Foto, siehe ../_bracket/params.js.

   ── GEGENPROBE L₁ − z₁ gegen die Normreihe DVS 2207-11 ──
     d20  27 − 11 = 16     Normreihe 14,5
     d25  30 − 14 = 16     Normreihe 16,0
     d25  35 − 19 = 16     Normreihe 16,0
     d32  35 − 17 = 18     Normreihe 18,0  (zweimal)
   Vier von fünf Zeilen treffen die Reihe auf 0…1,5 mm — deutlich enger
   als beim Anschlussbogen. Modelliert wird die Norm.

   ── L − z ist die Höhe des Messingrings ──
     14 · 14 · 15 · 15 · 15 mm — wächst mit dem Gewinde und bleibt in
     jeder Zeile positiv (Fall 28). */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 5;
export const SDR = 6;

export const ARTICLES = [
  { code: 'AQ472G2012', key: '20x1_2', d: 20, Rp: '1/2', D: 35, L: 35, z: 21, h: 15, D1: 29, L1: 27, z1: 11, kg: 0.08, pack: 150 },
  { code: 'AQ472G2512', key: '25x1_2', d: 25, Rp: '1/2', D: 35, L: 37, z: 23, h: 17, D1: 34, L1: 30, z1: 14, kg: 0.09, pack: 130 },
  { code: 'AQ472G2534', key: '25x3_4', d: 25, Rp: '3/4', D: 43, L: 43, z: 28, h: 22, D1: 34, L1: 35, z1: 19, kg: 0.14, pack: 90 },
  { code: 'AQ472G3234', key: '32x3_4', d: 32, Rp: '3/4', D: 43, L: 43, z: 28, h: 22, D1: 43, L1: 35, z1: 17, kg: 0.15, pack: 60 },
  { code: 'AQ472G321', key: '32x1', d: 32, Rp: '1', D: 43, L: 43, z: 28, h: 22, D1: 43, L1: 35, z1: 17, kg: 0.17, pack: 60 },
];

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Nennmaß Rohr',
  Rp: 'Rohrgewinde innen',
  D: 'Außendurchmesser Gewindeschenkel',
  L: 'Achse bis Stirnfläche Gewindeschenkel',
  z: 'Achse bis Schulter des Messingrings',
  h: 'Achse bis Unterkante (Spalte nicht gedeutet)',
  D1: 'Außendurchmesser Muffenschenkel',
  L1: 'Achse bis Stirnfläche Muffe',
  z1: 'Achse bis Muffengrund',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}

export function sizeLabel(key) {
  const [d, g] = String(key).split('x');
  return 'd' + d + ' · Rp' + g.replace('_', '/') + '"';
}
