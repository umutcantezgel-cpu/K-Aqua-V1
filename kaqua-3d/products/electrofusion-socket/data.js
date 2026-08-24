/* K-Aqua Elektroschweißmuffe — Artikeltabelle.

   PHASE 1, verifiziert am 24.08.2026 gegen ZWEI unabhängige
   Rang-1-Quellen:

     Marketing/Print/KA-Katalog_GB_06-2025_NEU.pdf, Seite 92
     K-Aqua Unterseitem Kopie/Fittings K-Aqua/
       screencapture-…-fittings-electrofusion-socket-….pdf

   Die Website-Aufnahme ist ein reines Bild; ihre Tabelle wurde aus dem
   eingebetteten JPEG gelesen (Fall 34). Die Katalogseite trägt dieselben
   Zahlen, dort aber spaltenweise zerwürfelt — beide Lesungen stimmen
   überein.

   Spaltenköpfe wie abgebildet:
     Code · d · D · L · h · L₁ · kg · Pack.
   14 Größen, d20 bis d315. Nach der letzten Zeile folgt der ORDER-Knopf
   (Fall 2).

   ── MASSSCHLÜSSEL, aus der Maßzeichnung ──
     d    Rohr-Außendurchmesser = Muffenbohrung
     D    Außendurchmesser des Muffenkörpers
     L    Gesamtlänge
     L₁   Einstecktiefe je Seite, von der Stirnfläche bis zum Anschlag
     h    GESAMTHÖHE EINSCHLIESSLICH DER BEIDEN KONTAKTSTIFTE

   Die Zeichnung zeigt zwei Kontaktdome auf dem Mantel; h greift von der
   Unterkante des Körpers bis zu ihrer Oberkante. Damit sind zwei Maße
   ABGELEITET statt geschätzt:

     Stiftüberstand  = h − D
     Anschlagbreite  = L − 2·L₁

   ── GEGENPROBEN ──

   1 · L − 2·L₁ über alle 14 Zeilen: 2 · 2 · 2 · 3 · 4 · 4 · 3 · 2 · 1 ·
       2 · 3 · 3 · 0 · 0 mm. Durchgehend ≥ 0, nie negativ — die beiden
       Einstecktiefen überschneiden sich in keiner Zeile (Fall 28). Bei
       d250 und d315 ist der Anschlag rechnerisch null; dort ist die
       Muffe durchgehend, was zu Stumpf- und Elektroschweißung ab d160
       passt.

   2 · h − D über alle 14 Zeilen: 19 · 20 · 20 · 20 · 19 · 18 · 16 · 17 ·
       8 · 11 · 11 · 11 · 4 · 0,5 mm. Immer positiv, also steht h nie
       unter D — eine Gesamthöhe unter dem Außendurchmesser wäre
       unmöglich und hätte die Deutung widerlegt. Dass der Überstand mit
       der Größe schrumpft, ist auffällig und steht in LOOP-STATUS.md.

   3 · Wandstärke (D − d)/2: 6,5 · 6,5 · 6,5 · 7,5 · 9 · 9,5 · 11,5 ·
       11,5 · 13 · 15,5 · 15 · 16 · 23 · 28,75 mm. Wächst monoton bis auf
       eine Delle bei d160 (15 gegen 15,5 bei d125). */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 14;
export const SDR = 6;

export const ARTICLES = [
  { code: 'AQ27120', key: '20', d: 20, D: 33, L: 70, h: 52, L1: 34, kg: 0.05, pack: 60 },
  { code: 'AQ27125', key: '25', d: 25, D: 38, L: 70, h: 58, L1: 34, kg: 0.05, pack: 50 },
  { code: 'AQ27132', key: '32', d: 32, D: 45, L: 70, h: 65, L1: 34, kg: 0.07, pack: 40 },
  { code: 'AQ27140', key: '40', d: 40, D: 55, L: 85, h: 75, L1: 41, kg: 0.11, pack: 30 },
  { code: 'AQ27150', key: '50', d: 50, D: 68, L: 88, h: 87, L1: 42, kg: 0.15, pack: 20 },
  { code: 'AQ27163', key: '63', d: 63, D: 82, L: 98, h: 100, L1: 47, kg: 0.22, pack: 20 },
  { code: 'AQ27175', key: '75', d: 75, D: 98, L: 125, h: 114, L1: 61, kg: 0.34, pack: 10 },
  { code: 'AQ27190', key: '90', d: 90, D: 113, L: 146, h: 130, L1: 72, kg: 0.50, pack: 6 },
  { code: 'AQ271110', key: '110', d: 110, D: 136, L: 155, h: 144, L1: 77, kg: 0.66, pack: 5 },
  { code: 'AQ271125', key: '125', d: 125, D: 156, L: 166, h: 167, L1: 82, kg: 1.00, pack: 5 },
  { code: 'AQ271160', key: '160', d: 160, D: 190, L: 175, h: 201, L1: 86, kg: 1.50, pack: 1 },
  { code: 'AQ271200', key: '200', d: 200, D: 232, L: 185, h: 243, L1: 91, kg: 2.17, pack: 1 },
  { code: 'AQ271250', key: '250', d: 250, D: 296, L: 212, h: 300, L1: 106, kg: 4.46, pack: 1 },
  { code: 'AQ271315', key: '315', d: 315, D: 372.5, L: 240, h: 373, L1: 120, kg: 9.65, pack: 1 },
];

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Nennmaß Rohr = Muffenbohrung',
  D: 'Außendurchmesser des Körpers',
  L: 'Gesamtlänge',
  L1: 'Einstecktiefe je Seite',
  h: 'Gesamthöhe mit Kontaktstiften',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}

export function sizeLabel(key) { return 'd' + key; }
