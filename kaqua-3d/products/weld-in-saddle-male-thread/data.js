/* K-Aqua Anbohrsattel mit Außengewinde — Artikeltabelle.

   QUELLE: Druckkatalog KA-Katalog_GB_06-2025_NEU.pdf, Seite 103,
   Tabelle „Weld-in saddle (Male thread)". 4 Größen.

   Spalten wie abgebildet: Code · d · Rp · -d2 · h · Pack.
   Die gemeinsame Deutung steht in _saddle/data-gemeinsam.js, dort auch
   die beiden Auffälligkeiten der Spaltenköpfe.

   DIESE TABELLE UND DIE DES AQ243-GEGENSTÜCKS SIND ZAHLENGLEICH.
   AQ270S und AQ243S führen dieselben vier Rohrgruppen, dieselben
   Gewindegrößen, dieselben d2 und dieselben h. Nur die Codes und das
   Gewinde unterscheiden sie. Das ist kein Zufall: es ist derselbe
   Grundkörper mit verschiedenem Messingteil, und es bestätigt beide
   Transkriptionen gegenseitig.

   GEGENPROBE ZUR MUFFENVERSION: bei gleichem d2 liegt h hier höher.

       d2    Muffe (AQ130S)   Gewinde   Differenz
       25          29            43        14
       32          35            50        15

   Nahezu konstant — der eingebettete Messingteil baut auf, unabhängig
   von der Fußgröße. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 4;

export const ARTICLES = [
  { code: 'AQ243S406312',  bereich: '40-63',  gewinde: '1/2', d2: 25, h: 43, pack: 150 },
  { code: 'AQ243S406334',  bereich: '40-63',  gewinde: '3/4', d2: 32, h: 50, pack: 90 },
  { code: 'AQ243S7512512', bereich: '75-125', gewinde: '1/2', d2: 25, h: 43, pack: 90 },
  { code: 'AQ243S7512534', bereich: '75-125', gewinde: '3/4', d2: 32, h: 50, pack: 60 },
].map((a) => ({ ...a, key: a.bereich + 'x' + a.gewinde.replace('/', '_') }));

export const SIZES = ARTICLES.map((a) => a.key);

export const GEWINDEART = 'R';

export const DIMENSION_KEY = {
  bereich: 'Rohrgruppe Hauptrohr',
  gewinde: 'Außengewinde in Zoll',
  d2: 'Durchmesser Sattelfuß / Bohrung',
  h: 'Höhe über der Rohroberfläche',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}
