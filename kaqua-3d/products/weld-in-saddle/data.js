/* K-Aqua Anbohrsattel mit Schweißmuffe — Artikeltabelle.

   QUELLE: Druckkatalog KA-Katalog_GB_06-2025_NEU.pdf, Seite 102, obere
   Tabelle „Weld-in saddle". 11 Größen.

   Spalten wie abgebildet: Code · d · d1 · d2 · h · Pack.
   Die gemeinsame Deutung der Spalten steht in _saddle/data-gemeinsam.js.

   MASSSCHLÜSSEL:
     d   Rohrgruppe des HAUPTROHRS, auf das der Sattel gesetzt wird
     d1  Nennweite der Abzweigmuffe
     d2  Durchmesser des Sattelfußes = Bohrung im Hauptrohr
     h   Höhe über der Rohroberfläche

   d2 IST KLEINER ALS d1, WENN DAS ROHR ES VERLANGT. Bei AQ130S406332
   sitzt eine Abzweigmuffe d32 auf einem Fuß von nur 25 mm. Auf einem
   Rohr von 40 mm wäre eine Bohrung von 32 mm kaum noch tragfähig — der
   Hersteller schnürt den Durchgang ein, statt die Rohrwand zu opfern.
   Genau deshalb sind d1 und d2 getrennte Spalten. */

import { H_JE_FUSS } from '../_saddle/data-gemeinsam.js';

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 11;

export const ARTICLES = [
  { code: 'AQ130S406320',   bereich: '40-63',   d1: 20, d2: 25, h: 29, pack: 150 },
  { code: 'AQ130S406325',   bereich: '40-63',   d1: 25, d2: 25, h: 29, pack: 90 },
  { code: 'AQ130S406332',   bereich: '40-63',   d1: 32, d2: 25, h: 29, pack: 90 },
  { code: 'AQ130S7512525',  bereich: '75-125',  d1: 25, d2: 25, h: 29, pack: 60 },
  { code: 'AQ130S7512532',  bereich: '75-125',  d1: 32, d2: 32, h: 35, pack: 60 },
  { code: 'AQ130S7512540',  bereich: '75-125',  d1: 40, d2: 40, h: 38, pack: 60 },
  { code: 'AQ130S16025025', bereich: '160-250', d1: 25, d2: 25, h: 29, pack: 40 },
  { code: 'AQ130S16025032', bereich: '160-250', d1: 32, d2: 32, h: 35, pack: 40 },
  { code: 'AQ130S16025040', bereich: '160-250', d1: 40, d2: 40, h: 38, pack: 40 },
  { code: 'AQ130S16025050', bereich: '160-250', d1: 50, d2: 50, h: 39, pack: 30 },
  { code: 'AQ130S16025063', bereich: '160-250', d1: 63, d2: 63, h: 45, pack: 20 },
].map((a) => ({ ...a, key: a.bereich + 'x' + a.d1 }));

/* Selbstprüfung der Transkription: h muss der Reihe aus
   data-gemeinsam.js folgen. Schlägt beim Laden zu, nicht erst im Bau. */
ARTICLES.forEach((a) => {
  if (H_JE_FUSS[a.d2] !== a.h) {
    throw new Error('K-Aqua Anbohrsattel ' + a.code + ': h = ' + a.h +
      ' passt nicht zur Reihe (d2 ' + a.d2 + ' → ' + H_JE_FUSS[a.d2] + ')');
  }
});

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  bereich: 'Rohrgruppe Hauptrohr',
  d1: 'Nennweite Abzweigmuffe',
  d2: 'Durchmesser Sattelfuß / Bohrung',
  h: 'Höhe über der Rohroberfläche',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}
