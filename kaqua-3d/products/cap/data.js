/* K-Aqua Kappe (Cap) — Artikeltabelle.

   PHASE 1, verifiziert am 16.08.2026 gegen
   Fittings K-Aqua/screencapture-…-fittings-cap-2026-06-20-05_41_10.pdf
   (Seitenbilder: quellen/cap-p1.jpg … cap-p3.jpg, 3004 × 3949 px).
   Die Tabelle läuft über den Seitenumbruch: Block 1 endet auf Seite 1
   bei d75, Block 1 setzt sich auf Seite 2 mit d90–d125 fort, danach
   folgt ein eigener Block „SDR 11*".

   Spaltenköpfe exakt wie abgebildet:  Code · d · D · l · L · s · kg · Pack.

   MASSSCHLÜSSEL, aus den beiden technischen Zeichnungen neben dem
   Produktfoto abgelesen:

     Zeichnung A (Muffenversion, Achse senkrecht dargestellt)
       d   Rohr-Außendurchmesser = Muffenbohrung
       D   Außendurchmesser der Kappe
       l   Gesamtlänge der Kappe
       z   Restlänge hinter dem Rohrende — im Katalog NICHT tabelliert

     Zeichnung B (Stumpfschweißversion)
       d   Außendurchmesser
       s   Wandstärke
       L   Gesamtlänge
       l   zylindrischer Anteil vor der Kalotte — NICHT tabelliert

   Daraus folgt die Blockaufteilung der Tabelle:
     SDR 6  (Muffenschweißung):    d · D · l  gefüllt,  L · s  leer
     SDR 11 (Stumpf-/E-Schweißen): d · L · s  gefüllt,  D · l  leer
   Es sind also zwei verschiedene Bauformen unter einer Artikelnummer-
   Reihe. Das Modell baut beide.

   Gegenprobe: l/D = 32/43 = 0,74 bei d32 deckt sich mit dem am
   Produktfoto gemessenen Verhältnis 765/1050 = 0,73.

   *SDR 11 jointing techniques: butt-fusion or electrofusion welding

   ── ABWEICHUNGEN gegen docs Unterseiten/fittings/cap.md ──
   1. Die Markdown-Datei führt 7 von 14 Größen (d20–d75). Es fehlen
      d90, d110, d125 sowie der komplette SDR-11-Block d160–d315.
   2. Die Markdown-Datei führt die Spalten Code · d · L · kg · Pack.
      Die Quelle führt Code · d · D · l · L · s · kg · Pack. Die dort
      als „L" geführten Werte sind in Wahrheit die Spalte l.
   3. Artikelnummern stimmen für die sieben vorhandenen Größen überein
      (AQ30120 … AQ30175). Die fehlenden lauten AQ30190, AQ301110,
      AQ301125, AQ301160, AQ301200, AQ301250, AQ301315.
   Korrigierte Fassung: produkt-markdown/fittings/cap.md            */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 14;

export const ARTICLES = [
  // ── Muffenschweißung (SDR 6) ──
  { code: 'AQ30120',  d: 20,  D: 29,  l: 25, L: null, s: null,  kg: 0.01, pack: 600, sdr: 6 },
  { code: 'AQ30125',  d: 25,  D: 34,  l: 28, L: null, s: null,  kg: 0.01, pack: 400, sdr: 6 },
  { code: 'AQ30132',  d: 32,  D: 43,  l: 32, L: null, s: null,  kg: 0.02, pack: 255, sdr: 6 },
  { code: 'AQ30140',  d: 40,  D: 52,  l: 36, L: null, s: null,  kg: 0.03, pack: 160, sdr: 6 },
  { code: 'AQ30150',  d: 50,  D: 65,  l: 41, L: null, s: null,  kg: 0.06, pack: 100, sdr: 6 },
  { code: 'AQ30163',  d: 63,  D: 79,  l: 48, L: null, s: null,  kg: 0.09, pack: 60,  sdr: 6 },
  { code: 'AQ30175',  d: 75,  D: 99,  l: 54, L: null, s: null,  kg: 0.18, pack: 30,  sdr: 6 },
  { code: 'AQ30190',  d: 90,  D: 120, l: 66, L: null, s: null,  kg: 0.35, pack: 18,  sdr: 6 },
  { code: 'AQ301110', d: 110, D: 148, l: 79, L: null, s: null,  kg: 0.59, pack: 10,  sdr: 6 },
  { code: 'AQ301125', d: 125, D: 162, l: 87, L: null, s: null,  kg: 0.85, pack: 5,   sdr: 6 },
  // ── Stumpf- oder Elektroschweißung (SDR 11) ──
  { code: 'AQ301160', d: 160, D: null, l: null, L: 162, s: 14.6, kg: 1.1, pack: 3, sdr: 11 },
  { code: 'AQ301200', d: 200, D: null, l: null, L: 180, s: 18.2, kg: 2,   pack: 1, sdr: 11 },
  { code: 'AQ301250', d: 250, D: null, l: null, L: 217, s: 22.7, kg: 5,   pack: 1, sdr: 11 },
  { code: 'AQ301315', d: 315, D: null, l: null, L: 256, s: 28.6, kg: 7.6, pack: 1, sdr: 11 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  D: 'Außendurchmesser',
  l: 'Gesamtlänge',
  L: 'Gesamtlänge (Stumpfschweißung)',
  s: 'Wandstärke',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
