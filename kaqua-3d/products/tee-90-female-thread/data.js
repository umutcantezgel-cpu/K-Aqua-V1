/* K-Aqua T-Stück 90° mit Innengewinde im Abzweig — Artikeltabelle.

   PHASE 1, verifiziert am 23.08.2026 gegen
   Transition Fittings K-Aqua/screencapture-…-tee-90-female-thread-….png (quellen/w4-tee-fem.png)
   Ausschnitte: Zeichnung quellen/w4-zeichnung-tee-fem.png,
   Tabelle quellen/w4-tabelle-tee-fem-a.png und -b.png.
   Vollständige Quellenlesung: pruefung/w4-tee-gewinde-phase1.md.

   Spaltenköpfe wie abgebildet:
     Code · d · Rp · D · l · z · h · z₁ · kg · Pack.
   5 Größen. Nach der letzten Zeile folgt der ORDER-Knopf —
   die Tabelle ist vollständig gelesen (Fall 2).

   MASSSCHLÜSSEL:
     d    Nennweite des Durchgangs
     Rp   zylindrisches Innengewinde des Abzweigs, in Zoll (ISO 228-1)
     D    Außendurchmesser des Durchgangs
     l    Achse Abzweig bis Stirnfläche Durchgang (HALBE Baulänge)
     z    Achse bis Muffengrund des Durchgangs
     h    Achse Durchgang bis OBERKANTE des Teils
     z₁   Achse Durchgang bis Schulter, wo der Messingring beginnt

   h − z₁ ist damit die Höhe des Messingrings:
     13 · 13 · 15 · 15 · 18 mm — sie wächst mit dem Gewinde, wie sie
     muss. Über alle fünf Zeilen positiv (Fall 28).

   SIZEKEY NÖTIG. Dieselbe Nennweite kommt mit verschiedenen Gewinden
   vor, d allein ist kein Schlüssel. Aufbau wie bei
   products/adaptor-socket-male-thread: '<d>x<gewinde>'.

   ── DREI GEGENPROBEN ──

   1 · l − z gegen die Normreihe DVS 2207-11:
         d20  28 − 14 = 14      Normreihe 14,5
         d25  31 − 16 = 15  ·  32 − 16 = 16     Normreihe 16,0
         d32  38 − 20 = 18                      Normreihe 18,0
       Die Muffentiefe kommt aus fusionDepth(d); der Tabellenwert
       wandert als socketFromTable in den Prüfbericht (Fall 4).

   2 · D deckt sich mit der Muffentabelle (products/socket/data.js):
       d20 → 29 ✓ · d25 → 35 · d32 → 44 gegen 43 hier.

   ── WIDERSPRUCH IN DER SPALTE D BEI d25 ──

   Diese Tabelle führt bei d25 ZWEI verschiedene Außendurchmesser:

       AQ130G2512  d25 Rp1/2  D = 35
       AQ130G2534  d25 Rp3/4  D = 34

   D ist der Außendurchmesser des DURCHGANGS. Er kann nicht davon
   abhängen, welches Gewinde der Abzweig trägt. Eine der beiden Zahlen
   ist falsch.

   Gesetzt sind beide so, wie sie gedruckt stehen — der Widerspruch
   wird dokumentiert, nicht durch Nachgeben aufgelöst (Fall 31). Die
   Muffentabelle stützt die 35; die Außengewindeseite dieses Produkts
   druckt bei d25 durchgehend 34. params.js führt die Differenz zur
   Muffentabelle als odDeltaToSocket mit, der Prüfbericht nennt sie.

   3 · Die Außengewindevariante führt dieselben d, D, l und z. Nur die
       Abzweighöhe unterscheidet sich — zwei unabhängig gelesene
       Tabellen bestätigen sich gegenseitig.

   ── DIE KANTE HEISST HIER h UND AUF DER ANDEREN SEITE l1 ──
   Bei sonst gleichen d, D, l und z steht hier h = 33 und dort l1 = 34
   (d20, Gewinde 1/2"). Das ist dieselbe Kante, verschieden benannt. Im
   Modell heißt sie einheitlich P.ppTop; DIMENSION_KEY führt den hier
   gedruckten Buchstaben (Fall 19). */

export const DATA_STATUS = 'tabelle-verifiziert-zeichnung-gelesen';
export const SIZES_SOURCE_VERIFIED = 5;

export const ARTICLES = [
  { code: 'AQ130G2012', key: '20x1_2', d: 20, Rp: '1/2', D: 29, l: 28, z: 14, h: 33, z1: 20, kg: 0.08, pack: 180 },
  { code: 'AQ130G2512', key: '25x1_2', d: 25, Rp: '1/2', D: 35, l: 31, z: 16, h: 37, z1: 24, kg: 0.09, pack: 100 },
  { code: 'AQ130G2534', key: '25x3_4', d: 25, Rp: '3/4', D: 34, l: 32, z: 16, h: 40, z1: 25, kg: 0.13, pack: 80 },
  { code: 'AQ130G3234', key: '32x3_4', d: 32, Rp: '3/4', D: 43, l: 38, z: 20, h: 45, z1: 30, kg: 0.15, pack: 60 },
  { code: 'AQ130G321', key: '32x1', d: 32, Rp: '1', D: 43, l: 38, z: 20, h: 48, z1: 30, kg: 0.2, pack: 60 },
];

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Nennmaß Durchgang',
  Rp: 'Innengewinde',
  D: 'Außendurchmesser',
  l: 'Achse bis Stirnfläche',
  z: 'Einbaulänge',
  h: 'Gesamthöhe Abzweig',
  z1: 'Höhe PP-R-Körper',
};

export function sizeLabel(key) {
  const a = article(key);
  return 'd' + a.d + ' · Rp' + a.Rp + '"';
}

export function article(key) {
  const a = ARTICLES.find((x) => x.key === key);
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}
