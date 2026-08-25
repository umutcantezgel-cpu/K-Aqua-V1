/* K-Aqua Anbohrsattel mit Innengewinde — Produktpaket.

   Derselbe Grundkörper wie der Muffensattel, mit eingebettetem
   Messingteil. Die Gegenprobe `ueberstand` hält fest, was der Katalog
   an dieser Stelle unterscheidet: h endet am Kunststoff, und beim
   Außengewinde ragt das Messing darüber hinaus (siehe
   _saddle/data-gemeinsam.js). */

import { ARTICLES, DATA_STATUS, DIMENSION_KEY, GEWINDEART, SIZES, article } from './data.js';
import { buildSattel } from '../_saddle/assembly.js';

const product = {
  id: 'weld-in-saddles/weld-in-saddle-female-thread',
  module: 'kaqua-weld-in-saddle-female-thread',
  titleDe: 'Anbohrsattel mit Innengewinde',
  titleEn: 'Weld-in saddle (Female thread)',
  category: 'weld-in-saddles',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel: (k) => {
    const [b, g] = String(k).split('x');
    return 'd' + b.replace('-', '–') + ' · Rp' + g.replace('_', '/') + '"';
  },
  sizeTitle: 'Rohrgruppe · Gewinde',
  defaultSize: '40-63x3_4',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['bereich', 'gewinde', 'd2', 'h'],
  dimensions: ['h'],
  ariaFields: ['bereich', 'gewinde', 'd2', 'h'],

  variants: [],
  states: null,

  tile: 'Abzweig aus einem laufenden Rohr auf Innengewinde — Sattelfläche ' +
        'und Messingteil im Schnitt sichtbar.',

  build(size, variant, clipPlane) {
    return buildSattel({
      art: 'gewinde',
      gewindeArt: GEWINDEART,
      article,
      dimensionKey: DIMENSION_KEY,
      exportName: 'K-Aqua_Anbohrsattel_IG',
      seed: 153,
      /* Die beiden Gewindemessungen stehen in der Familie — nur dort
         ist die Ringgeometrie in Reichweite. */
      messungen: () => [
      ],
    }, size, variant, clipPlane);
  },
};

export default product;
