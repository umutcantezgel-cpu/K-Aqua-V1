/* K-Aqua Übergangsmuffe mit Innengewinde — Artikeltabelle.

   QUELLE: Druckkatalog KA-Katalog_GB_06-2025_NEU.pdf, Seite 94, obere
   Tabelle „Adaptor socket (Female thread)". Zeilenfolge und Werte am
   gerenderten Seitenbild abgelesen, nicht an der Textextraktion — die
   PDF-Textreihenfolge dieser Seite ist spaltenweise und vertauscht die
   Zeilen (dieselbe Falle wie auf S. 97).

   DIE WEBSITE-SEITE ZEIGT EIN ANDERES PRODUKT. Die Aufnahme
   „…-transition-fittings-adaptor-socket-female-thread-….png" trägt
   zwar diesen Titel, aber:
     · sie hat ÜBERHAUPT KEINE Gewindespalte — bei einem Gewindefitting
       unmöglich,
     · ihre Codes lauten AQ271xx statt AQ270G,
     · sie führt 14 Größen bis d315, während das größte Gewinde des
       ganzen Katalogs 4" bei d110 ist,
     · ihre Spalten heißen d · D · L · h · L1 und ihr Foto zeigt kein
       Messing.
   Das ist die Elektroschweißmuffe. Die Welle-4-Festlegung „nur d20–d63,
   status prototyp" stützte sich auf diese Tabelle und ist damit
   gegenstandslos: der Katalog bemaßt alle zwölf Größen vollständig.

   GEGENPROBE DER LESART: auf derselben Seite steht die Übergangsmuffe
   mit AUSSENgewinde (AQ243G). Deren Tabelle stimmt mit dem bereits
   gebauten Produkt in allen zwölf Zeilen und allen acht Spalten
   überein — Wert für Wert. Beide Tabellen wurden gleich gelesen; die
   eine ist damit für die andere bürge.

   ZWEITE GEGENPROBE: der Artikelcode verschlüsselt d und Gewinde
   (AQ270G**2034** = d20 × ¾"). Über alle zwölf Zeilen deckt sich der
   Code mit der d-Spalte UND der Rp-Spalte. Der Code ist eine dritte,
   von den Zahlenspalten unabhängige Quelle.

   MASSSCHLÜSSEL (Zeichnung S. 94, Achse senkrecht gezeichnet,
   Gewinde oben, Muffe unten):
     d   Rohr-Außendurchmesser = Muffenbohrung
     Rp  zylindrisches Innengewinde in Zoll (ISO 7-1)
     D   Außendurchmesser des Bundes am Gewindeende — größtes Maß
     D1  Außendurchmesser des Muffenteils
     l   Gesamtlänge
     z   siehe OFFENER PUNKT 1
     kg  Stückgewicht, Pack. Verpackungseinheit

   BAUART, am Katalogfoto S. 94 abgelesen: der Körper ist DURCHGEHEND
   grün. Das Messing ist ein eingebetteter Ring, von dem nur die
   Stirnfläche und das Gewinde frei liegen. Das unterscheidet dieses
   Teil von der AG-Muffe, wo der Messingzapfen mit Sechskant heraussteht.
   Beide Abschnitte des Mantels tragen senkrechte Facetten.

   OFFENER PUNKT 1 — die Spalte z ist nicht gedeutet.
   Geprüft und VERWORFEN wurde: z = l − Gewindetiefe − Muffentiefe.
   Mit den echten Muffentiefen aus der Muffentabelle des Katalogs
   ((l − z)/2 der Artikel AQ270xx) ergäbe das bei d20 × ½" 13,5 mm
   gegen tabellierte 11, bei d63 × 2" 13,5 gegen 19. Eine Deutung, die
   über die Zeilen nicht trägt, ist keine (Fall 28). Für die Geometrie
   wird z nicht gebraucht; der Wert steht hier, wird aber NICHT
   modelliert und NICHT gemessen (Fall 29).

   OFFENER PUNKT 2 — l = 165 bei d110 fällt aus der Reihe.
   Drei voneinander unabhängige Anzeichen:
     · l/d fällt monoton 2,05 → 1,64 → 1,38 → 1,35 → 1,14 → 1,08 →
       1,09 → 1,02 und springt dann auf 1,50;
     · die AG-Muffe ist in jeder anderen Zeile 12–51 mm LÄNGER als die
       IG-Muffe, bei d110 wäre sie 4 mm kürzer;
     · der Steg zwischen Muffengrund und Messingring wächst über elf
       Zeilen gleichmäßig von 9 auf 25 mm und betrüge bei d110 87 mm.
   Der Katalog ist hier die einzige Quelle — die Website zeigt ein
   anderes Produkt. Also NICHT geändert: das Modell baut 165 und zeigt
   damit genau das, was im Katalog steht. Wird die Zahl korrigiert, ist
   es eine Zahl. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 12;
export const SDR = 6;

export const ARTICLES = [
  { key: '20x1/2',   code: 'AQ270G2012',  d: 20,  Rp: '1/2',     D: 35,  D1: 29,  l: 41,  z: 11, kg: 0.07, pack: 200 },
  { key: '20x3/4',   code: 'AQ270G2034',  d: 20,  Rp: '3/4',     D: 43,  D1: 34,  l: 42,  z: 11, kg: 0.10, pack: 240 },
  { key: '25x1/2',   code: 'AQ270G2512',  d: 25,  Rp: '1/2',     D: 35,  D1: 34,  l: 41,  z: 11, kg: 0.07, pack: 200 },
  { key: '25x3/4',   code: 'AQ270G2534',  d: 25,  Rp: '3/4',     D: 43,  D1: 34,  l: 41,  z: 11, kg: 0.11, pack: 180 },
  { key: '32x3/4',   code: 'AQ270G3234',  d: 32,  Rp: '3/4',     D: 43,  D1: 43,  l: 44,  z: 11, kg: 0.11, pack: 160 },
  { key: '32x1',     code: 'AQ270G321',   d: 32,  Rp: '1',       D: 50,  D1: 43,  l: 48,  z: 12, kg: 0.15, pack: 130 },
  { key: '40x1_1/4', code: 'AQ270G40114', d: 40,  Rp: '1 1/4',   D: 62,  D1: 52,  l: 54,  z: 13, kg: 0.22, pack: 70 },
  { key: '50x1_1/2', code: 'AQ270G50112', d: 50,  Rp: '1 1/2',   D: 69,  D1: 64,  l: 57,  z: 14, kg: 0.24, pack: 48 },
  { key: '63x2',     code: 'AQ270G632',   d: 63,  Rp: '2',       D: 84,  D1: 79,  l: 68,  z: 19, kg: 0.49, pack: 30 },
  { key: '75x2_1/2', code: 'AQ270G75212', d: 75,  Rp: '2 1/2',   D: 113, D1: 99,  l: 82,  z: 22, kg: 0.81, pack: 14 },
  { key: '90x3',     code: 'AQ270G903',   d: 90,  Rp: '3',       D: 129, D1: 124, l: 92,  z: 27, kg: 1.44, pack: 6 },
  { key: '110x4',    code: 'AQ270G1104',  d: 110, Rp: '4',       D: 160, D1: 151, l: 165, z: 27, kg: 2.15, pack: 4, anmerkung: 'l aus der Reihe — siehe OFFENER PUNKT 2' },
];

/* Einschraubtiefe je Gewindegröße, in mm.

   NICHT GESCHÄTZT, sondern aus dem Katalog gerechnet: die AG-Muffe auf
   DERSELBEN SEITE führt l und z, und l − z ist genau der Teil des
   Fittings, der im Gegenstück verschwindet — also die Einschraubtiefe.
   Über alle zwölf AG-Zeilen hängt l − z ausschließlich von der
   Gewindegröße ab, nie von d:
     ½" 53−40 = 13    ¾" 58−42 = 16    1" 66−48 = 18
     1¼" 74−53 = 21   1½" 77−54 = 23   2" 92−65 = 27
     2½" 112−82 = 30  3" 143−111 = 32  4" 161−124 = 37

   GEGENPROBE gegen ISO 7-1, nutzbare Gewindelänge L2: 13,2 · 14,5 ·
   16,8 · 19,1 · 19,1 · 23,4 · 26,7 · 29,8 · 35,8. Die Katalogwerte
   liegen durchweg 0–4 mm darüber, mit der Größe wachsend — genau der
   Betrag, den die Dichtfläche vor dem Gewinde zusätzlich braucht. Zwei
   unabhängige Quellen, systematischer und erklärter Versatz (Fall 23).

   ASSUMPTION: die Muffe mit Innengewinde muss den Gegenzapfen so tief
   aufnehmen können, wie er einschraubt. Die nutzbare Gewindetiefe der
   IG-Muffe wird deshalb gleich der Einschraubtiefe des AG-Zapfens
   gesetzt. Das ist eine untere Schranke, scharf ausgenutzt.

   Steht bewusst HIER und nicht im Core: es gibt genau einen Verbraucher.
   Die anderen Innengewindeprodukte (_teethread, _bracket) leiten ihre
   Gewindelänge aus einer eigenen Tabellenspalte ab und brauchen sie
   nicht. Kommt ein zweiter Verbraucher, zieht sie in den Core um. */
const THREAD_ENGAGE = {
  '1/2': 13, '3/4': 16, '1': 18, '1 1/4': 21, '1 1/2': 23,
  '2': 27, '2 1/2': 30, '3': 32, '4': 37,
};

export function threadEngage(size) {
  const v = THREAD_ENGAGE[size];
  if (!v) throw new Error('K-Aqua: keine Einschraubtiefe für Rp' + size);
  return v;
}

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  Rp: 'Innengewinde',
  D: 'Außendurchmesser Bund',
  D1: 'Außendurchmesser Muffe',
  l: 'Gesamtlänge',
  z: 'z (Bedeutung offen)',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}
