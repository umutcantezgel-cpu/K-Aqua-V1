/* K-Aqua Reduzierbuchse — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Fittings K-Aqua/screencapture-…-fittings-reducing-bush-….pdf
   (quellen/x-reducing-bush-p1.jpg, -p2.jpg).

   Spaltenköpfe: Code · d · d1 · D · l · z · l1 · s · s1 · kg · Pack.
   Die Spalten l1, s und s1 sind in JEDER Zeile ein Gedankenstrich —
   sie gelten für Stumpfschweißvarianten. Nicht übernommen.

   ERSTES PRODUKT MIT ZWEI NENNWEITEN. 17 Zeilen, aber nur 5
   verschiedene Werte für d — die Zeile wird erst durch das Paar
   (d, d1) eindeutig. Deshalb trägt jede Zeile einen zusammengesetzten
   Schlüssel `key`, und das Produkt nennt ihn über sizeKey. Der Core
   adressiert Größen seitdem über dieses Feld statt über d.

   MASSSCHLÜSSEL:
     d   Außendurchmesser des Zapfens — versinkt in einer d-Muffe.
         Das ist der GRÖSSTE Durchmesser des Teils.
     d1  Nennmaß der Innenmuffe — nimmt ein d1-Rohr auf
     D   Außendurchmesser des vorstehenden Muffenkragens
     l   Gesamtlänge
     z   Einbaulänge

   ── WIE D GELESEN WERDEN MUSS ──
   Der erste Modellversuch nahm D als größten Außendurchmesser (Bund).
   Der Maßtest hat das widerlegt: dann müsste D immer über d liegen.

     d32 / d1=20 → D = 29   (D unter d)
     d63 / d1=20 → D = 34   (D weit unter d)

   D korreliert nicht mit d, sondern mit d1:
     d1=20 → 29 · 25 → 34 · 32 → 43 · 40 → 52 · 50 → 65 · 63 → 80
   Das sind bis auf Rundung die Außendurchmesser der Muffen derselben
   Nennweite (Muffe d20: D = 29 · d40: 52 · d50: 65).

   Die Buchse ist also ein dicker Zapfen Ø d, der in der d-Muffe
   versinkt, mit einem dünneren d1-Muffenkragen Ø D davor. Der Kragen
   kann dicker oder dünner als der Zapfen sein — die Kontur trägt
   beide Richtungen. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 17;
export const SDR = 6;

export const ARTICLES = [
  { key: '25x20', code: 'A02432520', d: 25, d1: 20, D: 29, l: 36, z: 22, kg: 0.01, pack: 400 },
  { key: '32x20', code: 'A02433220', d: 32, d1: 20, D: 29, l: 37, z: 23, kg: 0.02, pack: 325 },
  { key: '32x25', code: 'A02433225', d: 32, d1: 25, D: 34, l: 39, z: 23, kg: 0.02, pack: 325 },
  { key: '40x20', code: 'A02434020', d: 40, d1: 20, D: 34, l: 43, z: 28, kg: 0.02, pack: 210 },
  { key: '40x25', code: 'A02434025', d: 40, d1: 25, D: 34, l: 43, z: 27, kg: 0.02, pack: 195 },
  { key: '40x32', code: 'A02434032', d: 40, d1: 32, D: 43, l: 45, z: 27, kg: 0.03, pack: 180 },
  { key: '50x20', code: 'A02435020', d: 50, d1: 20, D: 43, l: 51, z: 36, kg: 0.04, pack: 160 },
  { key: '50x25', code: 'A02435025', d: 50, d1: 25, D: 43, l: 51, z: 35, kg: 0.05, pack: 120 },
  { key: '50x32', code: 'A02435032', d: 50, d1: 32, D: 43, l: 51, z: 33, kg: 0.05, pack: 120 },
  { key: '50x40', code: 'A02435040', d: 50, d1: 40, D: 52, l: 53, z: 35, kg: 0.05, pack: 80 },
  { key: '63x20', code: 'A02436320', d: 63, d1: 20, D: 34, l: 56, z: 42, kg: 0.08, pack: 75 },
  { key: '63x25', code: 'A02436325', d: 63, d1: 25, D: 34, l: 56, z: 40, kg: 0.08, pack: 60 },
  { key: '63x32', code: 'A02436332', d: 63, d1: 32, D: 43, l: 58, z: 40, kg: 0.08, pack: 50 },
  { key: '63x40', code: 'A02436340', d: 63, d1: 40, D: 52, l: 60, z: 40, kg: 0.08, pack: 50 },
  { key: '63x50', code: 'A02436350', d: 63, d1: 50, D: 65, l: 63, z: 40, kg: 0.09, pack: 60 },
  { key: '75x50', code: 'A02437550', d: 75, d1: 50, D: 65, l: 67, z: 44, kg: 0.12, pack: 36 },
  { key: '75x63', code: 'A02437563', d: 75, d1: 63, D: 80, l: 71, z: 44, kg: 0.15, pack: 24 },
];

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Zapfen-Nennmaß',
  d1: 'Muffen-Nennmaß',
  D: 'Außendurchmesser',
  l: 'Gesamtlänge',
  z: 'Einbaulänge',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}
