/* K-Aqua T-Stück 90° mit Innengewinde — Produktpaket nach PRODUKT-VERTRAG.md.

   Zwei Werkstoffe. Der Halbschnitt zeigt, wie tief das Messingteil im
   PP-R-Körper sitzt und wo die Fügestelle liegt; die Explosionsansicht
   zieht es nach oben heraus. */

import {
  ARTICLES, DATA_STATUS, DIMENSION_KEY, SIZES, article, sizeLabel
} from './data.js';
import { CONFIG } from './params.js';
import { buildTeeThread } from './parts.js';

const product = {
  id: 'transition-fittings/tee-90-female-thread',
  module: 'kaqua-tee-90-female-thread',
  titleDe: 'T-Stück 90° mit Innengewinde',
  titleEn: 'Tee 90° (Female thread)',
  category: 'transition-fittings',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeLabel,
  sizeTitle: 'Nennweite · Gewinde',
  defaultSize: '25x1_2',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'Rp', 'D', 'h'],
  dimensions: ['D', 'l', 'h'],
  ariaFields: ['d', 'Rp', 'D', 'l', 'h'],

  variants: [],
  states: null,

  tile: 'Abzweig auf metrisches Innengewinde, Durchgang bleibt PP-R-Muffe — ' +
        'der Messingring sitzt bündig in der Abzweigöffnung.',

  build(size, variant, clipPlane) {
    return buildTeeThread({
      ...CONFIG,
      article,
      topLabel: 'h',
      exportName: 'K-Aqua_TStueck_IG',
      seed: 191,
    }, size, variant, clipPlane);
  },
};

export default product;
