/* K-Aqua Kugelhahn PP-R, Kugel Messing verchromt — Artikeltabelle.

   QUELLE: Druckkatalog KA-Katalog_GB_06-2025_NEU.pdf, Seite 107, obere
   Tabelle „PP-R Ball valve (Ball in brass, chromium plated)".
   Acht Größen, d20 bis d90.

   GEGENPROBE DER LESART: auf derselben Seite steht darunter der
   Kugelhahn mit PP-Kugel (AQ852), und der ist seit Phase 1 gebaut —
   damals aus einem Website-Screenshot. Katalog und gebautes Produkt
   stimmen in allen sechs Zeilen und allen acht Spalten überein. Beide
   Tabellen wurden gleich gelesen; die eine bürgt für die andere. Damit
   ist nebenbei auch der alte Befund bestätigt, dass die Markdown-Datei
   mit AQ50020–AQ50063 und den Spalten d/L/H falsch war.

   MASSSCHLÜSSEL, an der Schnittzeichnung S. 107 abgelesen (Achse
   waagerecht, Hebel oben):
     d   Rohr-Außendurchmesser = Muffenbohrung
     A   Baulänge Stirnfläche–Stirnfläche
     C   Muffentiefe, vom Stirnende nach innen
     H   Rohrachse bis Oberkante Hebel
     L   Hebellänge, von der Spindel bis zur Spitze
     P   Durchgang der Kugel

   C IST DIE MUFFENTIEFE, und das ist mehr als eine Deutung: die Spalte
   deckt sich in sieben von acht Zeilen AUF DEN ZEHNTEL mit der
   FUSION_DEPTH-Tabelle im Core, die aus ganz anderer Quelle stammt
   (DVS 2207-11):

       d      20    25    32    40    50    63    75    90
       C     14,5  16,0  18,0  20,5  23,5  27,5  31,0  35,5
       Core  14,5  16,0  18,0  20,5  23,5  27,5  31,0  35,0

   Nur d90 weicht um 0,5 mm ab. Zwei unabhängige Quellen, die über acht
   Zeilen so zusammenfallen, bestätigen sich gegenseitig — und das
   Modell nimmt trotzdem den TABELLENWERT C, nicht den Core-Wert, denn
   für dieses Produkt ist die Tabelle Rang 1.

   P IST TABELLIERT und wird nicht geschätzt. Beim PP-Kugelhahn musste
   der Durchgang mit 0,667·d angenommen werden, weil seine Tabelle ihn
   nicht führt. Hier steht er da. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 8;

export const ARTICLES = [
  { code: 'AQ85020', d: 20, A: 67.5,  C: 14.5, H: 60,  L: 102,   P: 15 },
  { code: 'AQ85025', d: 25, A: 70.5,  C: 16,   H: 60,  L: 102,   P: 15 },
  { code: 'AQ85032', d: 32, A: 79.5,  C: 18,   H: 63,  L: 102,   P: 20 },
  { code: 'AQ85040', d: 40, A: 94,    C: 20.5, H: 78,  L: 119.5, P: 25 },
  { code: 'AQ85050', d: 50, A: 109,   C: 23.5, H: 83,  L: 119.5, P: 32 },
  { code: 'AQ85063', d: 63, A: 130,   C: 27.5, H: 103, L: 146,   P: 40 },
  { code: 'AQ85075', d: 75, A: 151,   C: 31,   H: 110, L: 146,   P: 50 },
  { code: 'AQ85090', d: 90, A: 173,   C: 35.5, H: 133, L: 205,   P: 65 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  A: 'Baulänge',
  C: 'Muffentiefe',
  H: 'Höhe Achse–Hebeloberkante',
  L: 'Hebellänge',
  P: 'Durchgang',
};

export function article(dNom) {
  const a = ARTICLES.find((x) => x.d === dNom);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + dNom);
  return a;
}
