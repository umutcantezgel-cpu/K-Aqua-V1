/* K-Aqua Anschlussbogen 90° mit Innengewinde — Artikeltabelle.

   PHASE 1, verifiziert am 24.08.2026 gegen ZWEI unabhängige
   Rang-1-Quellen, die sich Zeile für Zeile bestätigen:

     Marketing/Print/KA-Katalog_GB_06-2025_NEU.pdf, Seite 95 (unten)
     K-Aqua Unterseitem Kopie/Transition Fittings K-Aqua/
       screencapture-…-elbow-bracket-90-female-thread-….png

   Spaltenköpfe wie abgebildet:
     Code · d · Rp · D · L · z · h · D₁ · L₁ · z₁ · kg · Pack.
   5 Größen. Nach der letzten Zeile folgt der ORDER-Knopf — die Tabelle
   ist vollständig gelesen (Fall 2).

   MASSSCHLÜSSEL: siehe ../_bracket/params.js. Dort steht auch, warum D
   am Gewindeschenkel und D₁ am Muffenschenkel liegt und wie das über
   alle Zeilen gegengerechnet ist.

   SIZEKEY NÖTIG. Dieselbe Nennweite kommt mit verschiedenen Gewinden
   vor (d25 mit ½" und ¾", d32 mit ½" und 1"), d allein ist kein
   Schlüssel. Aufbau wie bei tee-90-female-thread: '<d>x<gewinde>'.

   ── DER CODE NENNT DIE FAMILIE, NICHT NUR DIE GRÖSSE ──
   AQ090G ist der Anschlussbogen, AQ092G der Winkel 90° mit
   AUSSENgewinde — zwei verschiedene Produkte. Die Registry führte
   für dieses Produkt den unverifizierten Präfix AQ09BRP; der ist
   falsch. Siehe pipeline/25-BILDQUELLEN.md §6.

   ── DREI GEGENPROBEN ──

   1 · D₁ hängt allein an d, D wächst mit dem Gewinde:
         d20 → D₁ 29 · d25 → 34 · d32 → 43, ausnahmslos
         d25×½" → D 35 gegen d25×¾" → D 43
       Ein vertauschtes Paar würde diese Abhängigkeit zerreißen (Fall 28).

   2 · L₁ − z₁ gegen die Normreihe DVS 2207-11:
         d20  27 − 11   = 16     Normreihe 14,5
         d25  30 − 14   = 16     Normreihe 16,0
         d25  32 − 19   = 13     Normreihe 16,0
         d32  36,5 − 18 = 18,5   Normreihe 18,0
         d32  39,5 − 17 = 22,5   Normreihe 18,0
       Die Streuung ist größer als beim Winkel. Modelliert wird die
       Norm; der Tabellenwert steht als socketFromTable im Prüfbericht.

   3 · L − z ist die Höhe des Messingrings:
         14 · 14 · 11 · 15 · 17 mm
       Die 11 mm bei AQ090G2534 fallen aus der Reihe — ½" bekommt dort
       14. KEIN Lesefehler: Katalog und Website führen den Wert beide,
       identisch. Zwei Rang-1-Quellen bestätigen sich, das Modell folgt
       der Tabelle. Am Originalteil zu prüfen. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 5;
export const SDR = 6;

export const ARTICLES = [
  { code: 'AQ090G2012', key: '20x1_2', d: 20, Rp: '1/2', D: 35, L: 35, z: 21, h: 13, D1: 29, L1: 27, z1: 11, kg: 0.08, pack: 200 },
  { code: 'AQ090G2512', key: '25x1_2', d: 25, Rp: '1/2', D: 35, L: 37, z: 23, h: 15, D1: 34, L1: 30, z1: 14, kg: 0.09, pack: 130 },
  { code: 'AQ090G2534', key: '25x3_4', d: 25, Rp: '3/4', D: 43, L: 39, z: 28, h: 20, D1: 34, L1: 32, z1: 19, kg: 0.14, pack: 120 },
  { code: 'AQ090G3212', key: '32x1_2', d: 32, Rp: '1/2', D: 48, L: 43, z: 28, h: 18, D1: 43, L1: 36.5, z1: 18, kg: 0.10, pack: 60 },
  { code: 'AQ090G321', key: '32x1', d: 32, Rp: '1', D: 48, L: 45, z: 28, h: 20, D1: 43, L1: 39.5, z1: 17, kg: 0.17, pack: 60 },
];

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Nennmaß Rohr',
  Rp: 'Rohrgewinde innen',
  D: 'Außendurchmesser Gewindeschenkel',
  L: 'Achse bis Stirnfläche Gewindeschenkel',
  z: 'Achse bis Schulter des Messingrings',
  h: 'Achse bis Unterkante',
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
