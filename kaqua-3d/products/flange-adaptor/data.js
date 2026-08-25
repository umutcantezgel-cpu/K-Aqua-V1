/* K-Aqua Flanschadapter (Bundbuchse) — Artikeltabelle.

   QUELLE: Druckkatalog KA-Katalog_GB_06-2025_NEU.pdf, Seite 90, untere
   Tabelle „Flange adaptor". 11 Größen.

   ZWEI BAUARTEN wie beim Reduzier-T-Stück, getrennt durch die
   Zwischenzeile „SDR 11*":
     · oben  7 Größen mit SCHWEISSMUFFE (d40–d125), Spalten D und l
       belegt, s leer,
     · unten 4 Größen mit SPITZENDE (d160–d315) für Heizelement-
       stumpf- oder Elektroschweißung, D und l leer, dafür s.

   D UND D1 BEDEUTEN IN DEN BEIDEN BLÖCKEN VERSCHIEDENES, und das ist
   nicht geraten, sondern an einer DRITTEN Tabelle belegt. Der
   Gegenflansch auf S. 110 (AQ750) führt die Spalte D2 — die Bohrung,
   mit der er über den Adapter geschoben wird. Sie muss größer sein als
   der Schaft und kleiner als der Bund:

       d      Adapter D1   Flansch D2   Adapter D
       40         50           51           60
       50         60           62           70
       63         76           78           89
       75         89           92          105
       90        109          110          125
       110       132          133          158
       125       146          150          162

   In allen sieben Zeilen gilt D1 < D2 < D. Damit steht fest:
   **D ist der Bund, D1 der Schaft.**

   Bei der Spitzendbauart ist es umgekehrt. Dort führt der Adapter kein
   D, und seine D1-Werte (212 · 269 · 320 · 370) liegen ÜBER den
   Flanschbohrungen (178 · 235 · 288 · 338). D1 ist dort also der Bund,
   und der Schaft ist schlicht das Rohr mit dem Maß d. Genau so zeigt es
   auch die untere Zeichnung auf S. 90.

   MASSSCHLÜSSEL:
     Muffenbauart     d  Muffenbohrung · D Bund-Ø · D1 Schaft-Ø
                      l  Schaftlänge · z l − Muffentiefe · h Bunddicke
     Spitzendbauart   d  Rohr-Außen-Ø · D1 Bund-Ø
                      z  Gesamtlänge · h Bunddicke · s Wandstärke

   GEGENPROBE der Muffenbauart: z = l − Muffentiefe.
       d50   33−23,5 = 9,5   Tabelle 9,7
       d63   40−27,5 = 12,5  Tabelle 12,9
   Bei d40, d75, d90, d110 und d125 weicht es um 1 bis 3 mm ab —
   derselbe Drift wie beim Reduzier-T-Stück und beim Kugelhahn: der
   Katalog rechnet mit etwas anderen Muffentiefen als DVS 2207-11.
   Gebaut wird nach l und der Normreihe, z steht als Gegenprobe daneben.

   ZWEI AUFFÄLLIGKEITEN, dokumentiert statt aufgelöst:

   1. AQ79075 (d75) FÄLLT IN DREI SPALTEN GLEICHZEITIG AUS DER REIHE.
      l sinkt von 40 (d63) auf 37, obwohl es mit der Nennweite wachsen
      müsste; h sinkt von 15,5 auf 15; z stürzt von 12,9 auf 7,5. Drei
      Spalten zugleich, und alle nach unten. Die Nachbarzeilen d63 und
      d90 sind untereinander stimmig. NICHT geändert.

   2. AQ790200 (d200) führt z = 201 gegen 207 bei d160 — die
      Gesamtlänge sinkt bei wachsender Nennweite. d250 und d315 steigen
      dann wieder auf 220 und 239. NICHT geändert. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 11;

const MUFFE = [
  { code: 'AQ79040',  d: 40,  D: 60,  D1: 50,  l: 29, z: 7.4,  h: 7.8,  kg: 0.03, pack: 80 },
  { code: 'AQ79050',  d: 50,  D: 70,  D1: 60,  l: 33, z: 9.7,  h: 9.5,  kg: 0.05, pack: 60 },
  { code: 'AQ79063',  d: 63,  D: 89,  D1: 76,  l: 40, z: 12.9, h: 15.5, kg: 0.08, pack: 48 },
  { code: 'AQ79075',  d: 75,  D: 105, D1: 89,  l: 37, z: 7.5,  h: 15,   kg: 0.13, pack: 40,
    anmerkung: 'l, z und h fallen zugleich aus der Reihe — siehe AUFFÄLLIGKEIT 1' },
  { code: 'AQ79090',  d: 90,  D: 125, D1: 109, l: 46, z: 9.5,  h: 19.5, kg: 0.25, pack: 26 },
  { code: 'AQ790110', d: 110, D: 158, D1: 132, l: 57, z: 13,   h: 18,   kg: 0.38, pack: 12 },
  { code: 'AQ790125', d: 125, D: 162, D1: 146, l: 62, z: 13,   h: 21,   kg: 0.48, pack: 10 },
];

const SPITZENDE = [
  { code: 'AQ790160', d: 160, D1: 212, z: 207, h: 25, s: 14.6, kg: 1.8, pack: 1 },
  { code: 'AQ790200', d: 200, D1: 269, z: 201, h: 32, s: 18.2, kg: 3.0, pack: 1,
    anmerkung: 'z sinkt gegenüber d160 — siehe AUFFÄLLIGKEIT 2' },
  { code: 'AQ790250', d: 250, D1: 320, z: 220, h: 35, s: 22.7, kg: 4.9, pack: 1 },
  { code: 'AQ790315', d: 315, D1: 370, z: 239, h: 35, s: 28.6, kg: 7.5, pack: 1 },
];

export const ARTICLES = [
  ...MUFFE.map((a) => ({ ...a, bauart: 'muffe' })),
  ...SPITZENDE.map((a) => ({ ...a, bauart: 'spitzende' })),
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  D: 'Außendurchmesser Bund',
  D1: 'Außendurchmesser Schaft (Muffe) bzw. Bund (Spitzende)',
  l: 'Schaftlänge',
  z: 'Einbaulänge (Muffe) bzw. Gesamtlänge (Spitzende)',
  h: 'Bunddicke',
  s: 'Wandstärke',
};

/* Der Gegenflansch, für die Gegenprobe im Prüfbericht — S. 110, AQ750,
   Spalte D2. Er wird NICHT modelliert; er belegt nur die Deutung von
   D und D1. */
export const FLANSCHBOHRUNG = {
  40: 51, 50: 62, 63: 78, 75: 92, 90: 110, 110: 133, 125: 150,
  160: 178, 200: 235, 250: 288, 315: 338,
};

export function article(dNom) {
  const a = ARTICLES.find((x) => x.d === dNom);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + dNom);
  return a;
}
