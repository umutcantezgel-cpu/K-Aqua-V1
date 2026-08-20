/* K-Aqua Stopfen — Artikeltabelle.

   PHASE 1, verifiziert am 18.08.2026 gegen
   Accessories K-Aqua/screencapture-…-accessories-plug-….png
   (quellen/w1-plug.png, 3004 × 8338 px).

   Spaltenköpfe wie abgebildet:  Code · G · kg · Pack.
   EINE Größe. Die Tabelle endet nach einer Zeile, danach folgt der
   ORDER-Knopf.

   ── WAS DAS TEIL IST ──
   Das Produktfoto korrigiert die naheliegende Annahme: es ist KEIN
   Muffenstopfen, sondern ein Gewindestopfen. Von oben nach unten:

     1. G½"-Außengewinde, etwa 5 Gänge
     2. eine dunkle Ringnut darunter — ein O-Ring, im Foto schwarz
     3. ein glatter, weiterer Zylinderkörper
     4. am unteren Rand VIER Kerben, gleichmäßig verteilt

   Die Kerben nehmen ein Werkzeug auf; das Teil wird also von der
   Gewindeseite her eingeschraubt und von unten gedreht. Es verschließt
   einen G½"-Innengewindeanschluss.

   ── KEINE GEOMETRIEMASSE IN DER QUELLE ──
   Die Tabelle führt weder Länge noch Durchmesser. Alle Maße sind aus
   dem Produktfoto abgeleitet und tragen ASSUMPTION. Gegenprobe über das
   Gewicht:

     Foto: Höhe/Breite = 230 px / 105 px = 2,19
     G½"-Gewinde außen 20,955 mm → Körper im Foto 1,34 × Gewinde ≈ 28 mm
     Länge = 2,19 × 28 ≈ 61 mm
     Hohlkörper Ø28 × 61, Wand 3 mm → 16,3 cm³ × 0,9 g/cm³ ≈ 15 g
     Tabelle: 0,02 kg = 20 g

   15 g gegen 20 g bei einem aus Pixeln abgeleiteten Volumen ist eine
   brauchbare Übereinstimmung — sie bestätigt Größenordnung und
   Hohlbauweise. Am Originalteil zu verifizieren. */

export const DATA_STATUS = 'verifiziert-ohne-masse';
export const SIZES_SOURCE_VERIFIED = 1;

/* G-Gewinde nach ISO 228-1 (zylindrisch, im Gegensatz zum kegeligen R). */
export const THREAD = {
  '1/2': { od: 20.955, pitch: 1.814 },
  '3/4': { od: 26.441, pitch: 1.814 },
};

export const ARTICLES = [
  { key: '1/2', code: 'AQ90912', G: '1/2', kg: 0.02, pack: 1 },
];

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  G: 'Rohrgewinde',
  D: 'Außendurchmesser Körper',
  l: 'Gesamtlänge',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}
