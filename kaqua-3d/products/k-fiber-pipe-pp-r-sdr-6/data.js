/* K-Aqua K-Fiber Rohr PP-R SDR 6 — Artikeltabelle.

   PHASE 1, verifiziert am 24.08.2026 gegen
   Marketing/Print/KA-Katalog_GB_06-2025_NEU.pdf, Seite 79 (oberer Block).

   ── EINZIGE QUELLE, UND DAS IST HIER KEIN MANGEL ──
   Dieses Produkt hat KEINE Website-Aufnahme: unter den zwölf Rohrseiten in
   'K-Aqua Unterseitem Kopie/Piepes K-Aqua' fehlt es. Genau deshalb fehlte
   es auch in der 71er-Produktliste, die aus dem Website-Scrape stammte.
   Der Druckkatalog führt es dagegen im Rohr-Inhaltsverzeichnis (S. 75) und
   auf S. 79 mit vollständiger Tabelle. Aufgenommen am 24.08.2026.

   Kopfzeile wörtlich:
     „K-Fiber Pipe PP-R" SDR 6 – S 2,5 (20° C/2,0 MPa – 70° C/1,0 MPa),
     length 4 meter

   Spaltenköpfe: Code · D · DN · Di · S min. · Pack. · Weight (kg/m) ·
   Water capacity (l/m)

   Angaben neben der Tabelle, wörtlich:
     Material:  PP-R GF
     Colour:    green with 4 red stripes
     Standards: DIN EN ISO 15874, DIN 8077 / 8078

   ── TRANSKRIPTIONSPROBE D − 2·S = Di ──
   Sie geht in sieben der zehn Zeilen exakt auf. Drei weichen um 0,2 mm ab:

     d50   50 − 16,6 = 33,4   Tabelle Di 33,2
     d110  110 − 36,6 = 73,4  Tabelle Di 73,2
     d125  125 − 41,6 = 83,4  Tabelle Di 83,2

   Das ist KEIN Lesefehler und wird nicht korrigiert: die Spalte heißt
   „S min.", also Mindestwandstärke. Ist die wirkliche Wand um 0,1 mm
   dicker, wird die Bohrung um 0,2 mm enger — die Abweichung hat genau
   dieses Vorzeichen und diese Größe. Modelliert wird Di aus der Tabelle,
   die Wand ergibt sich daraus.

   ── STREIFENFARBE: WIDERSPRUCH IN DER FAMILIE, HIER ABER EINDEUTIG ──
   Der Katalog gibt für dieses Rohr „4 red stripes". Eine zweite Quelle
   gibt es nicht, also ist die Farbe hier unstrittig.

   Bei drei Schwesterrohren widersprechen sich Katalog und
   Website-Aufnahme allerdings, und zwar als sauberer Ringtausch:

     k-fiber-pipe-pp-r-sdr-7-4   Website grau  · Katalog rot
     k-fiber-pipe-pp-r-sdr-9     Website blau  · Katalog grau
     k-fiber-pipe-pp-r-sdr-11    Website rot   · Katalog blau

   Die Streifenzahl stimmt überall (vier). Zwei Rang-1-Quellen, keine
   gewinnt — der Widerspruch steht in LOOP-STATUS.md und wird nicht durch
   Nachgeben aufgelöst. Dieses Produkt ist davon unberührt. */

export const DATA_STATUS = 'verifiziert-nur-katalog';
export const SIZES_SOURCE_VERIFIED = 10;
export const SDR = 6;
export const STOCK_LENGTH_M = 4;

export const ARTICLES = [
  { code: 'AQ206PF20', d: 20, dn: 12, di: 13.2, s: 3.4, pack: 100, kgm: 0.18, lm: 0.14 },
  { code: 'AQ206PF25', d: 25, dn: 15, di: 16.6, s: 4.2, pack: 100, kgm: 0.28, lm: 0.22 },
  { code: 'AQ206PF32', d: 32, dn: 20, di: 21.2, s: 5.4, pack: 60, kgm: 0.46, lm: 0.35 },
  { code: 'AQ206PF40', d: 40, dn: 25, di: 26.6, s: 6.7, pack: 40, kgm: 0.68, lm: 0.56 },
  { code: 'AQ206PF50', d: 50, dn: 32, di: 33.2, s: 8.3, pack: 20, kgm: 1.09, lm: 0.87 },
  { code: 'AQ206PF63', d: 63, dn: 40, di: 42, s: 10.5, pack: 20, kgm: 1.6, lm: 1.39 },
  { code: 'AQ206PF75', d: 75, dn: 50, di: 50, s: 12.5, pack: 12, kgm: 2.5, lm: 1.96 },
  { code: 'AQ206PF90', d: 90, dn: null, di: 60, s: 15, pack: 8, kgm: 3.3, lm: 2.83 },
  { code: 'AQ206PF110', d: 110, dn: 65, di: 73.2, s: 18.3, pack: 4, kgm: 5, lm: 4.21 },
  { code: 'AQ206PF125', d: 125, dn: 80, di: 83.2, s: 20.8, pack: 4, kgm: 6.5, lm: 5.46 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Außendurchmesser',
  dn: 'Nennweite DN',
  di: 'Innendurchmesser',
  s: 'Wandstärke (Mindestmaß)',
};

/* Wandaufbau von außen nach innen — wie bei den Schwesterrohren der
   K-Fiber-Reihe. Im Schnitt wird der Faserkern sichtbar; das ist der
   Grund, warum ein Rohr überhaupt ein 3D-Modell rechtfertigt. */
export const LAYERS = [
  { key: 'pprGreen', frac: 0.3, label: 'PP-R außen' },
  { key: 'fiberLayer', frac: 0.4, label: 'PP-R GF, glasfaserverstärkt' },
  { key: 'pprGreen', frac: 0.3, label: 'PP-R innen' },
];

export const STRIPES = [
  { key: 'redStripe', angleDeg: 0, widthDeg: 7 },
  { key: 'redStripe', angleDeg: 90, widthDeg: 7 },
  { key: 'redStripe', angleDeg: 180, widthDeg: 7 },
  { key: 'redStripe', angleDeg: 270, widthDeg: 7 },
];

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
