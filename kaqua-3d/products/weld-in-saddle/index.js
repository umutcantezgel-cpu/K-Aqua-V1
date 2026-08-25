/* K-Aqua Anbohrsattel mit Schweißmuffe — Produktpaket.

   Der einfachste der drei: kein Messing, nur PP-R. Genau deshalb fällt
   bei ihm h mit der Gesamthöhe zusammen — bei seinem AG-Bruder tut es
   das nicht (siehe _saddle/data-gemeinsam.js). */

import { ARTICLES, DATA_STATUS, DIMENSION_KEY, SIZES, article } from './data.js';
import { buildSattel } from '../_saddle/assembly.js';

const product = {
  id: 'weld-in-saddles/weld-in-saddle',
  module: 'kaqua-weld-in-saddle',
  titleDe: 'Anbohrsattel mit Schweißmuffe',
  titleEn: 'Weld-in saddle',
  category: 'weld-in-saddles',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel: (k) => {
    const [b, d1] = String(k).split('x');
    return 'd' + b.replace('-', '–') + ' · Abzweig d' + d1;
  },
  sizeTitle: 'Rohrgruppe · Abzweig',
  defaultSize: '75-125x32',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['bereich', 'd1', 'd2', 'h'],
  dimensions: ['h'],
  ariaFields: ['bereich', 'd1', 'd2', 'h'],

  variants: [],
  states: null,

  tile: 'Abzweig aus einem laufenden Rohr — die Unterseite ist ein ' +
        'echter Sattel, im Schnitt sichtbar.',

  build(size, variant, clipPlane) {
    return buildSattel({
      art: 'muffe',
      article,
      dimensionKey: DIMENSION_KEY,
      exportName: 'K-Aqua_Anbohrsattel',
      seed: 151,
      messungen: (P, a, { inFenster }) => [
        /* Die Abzweigmuffe: ihr Außendurchmesser stammt aus der
           Muffentabelle des Katalogs (socketOD im Core), nicht aus
           dieser Tabelle — sie führt ihn nicht. Gemessen wird trotzdem,
           weil er die Silhouette trägt. */
        { key: 'bossOD', label: 'Außendurchmesser Abzweigmuffe (Muffentabelle)',
          soll: P.bossOD,
          ist: () => { const g = inFenster(P.yTop - 1.5, P.yTop);
            return g.n ? Math.round(2 * g.max * 100) / 100 : NaN; } },
        /* Die Muffenbohrung, im Muffenbereich gemessen. Sie MUSS weiter
           sein als der Durchgang darunter — sonst gäbe es keine Muffe,
           sondern ein durchgehendes Rohr. */
        { key: 'd1', label: 'Bohrung Abzweigmuffe',
          soll: Math.round((P.d1 - 4 * P.sockTaper) * 100) / 100,
          ist: () => { const g = inFenster(P.yTop - P.socket + 2, P.yTop - 2);
            return g.n ? Math.round(2 * g.min * 100) / 100 : NaN; } },
        /* GEGENPROBE: der Durchgang zwischen Muffengrund und Bohrung.
           Er liegt planmäßig ENGER als die Muffe. */
        { key: 'durchgang', label: 'Durchgang unter der Muffe (Gegenprobe)',
          soll: Math.round(P.bore * 100) / 100,
          ist: () => { const g = inFenster(P.mainR + 3.5, P.yTop - P.socket - 1.5);
            return g.n ? Math.round(2 * g.min * 100) / 100 : NaN; } },
      ],
    }, size, variant, clipPlane);
  },
};

export default product;
