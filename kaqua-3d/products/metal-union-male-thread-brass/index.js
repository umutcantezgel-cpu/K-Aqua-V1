/* K-Aqua Metallverschraubung Messing CW617N (Außengewinde) —
   Produktpaket nach PRODUKT-VERTRAG.md.

   Vier Teile, drei Werkstoffe. Der Halbschnitt zeigt, wie die Mutter
   hinter dem PP-R-Dichtbund greift und wo die Flachdichtung sitzt;
   die Explosionsansicht nimmt die Mutter seitlich heraus, weil sie das
   einzige lösbare Teil der Baugruppe ist. */

import {
  ARTICLES, DATA_STATUS, DIMENSION_KEY, SIZES, article
} from './data.js';
import { CONFIG } from './params.js';
import { buildUnion } from './parts.js';

const product = {
  id: 'transition-fittings/metal-union-male-thread-brass',
  module: 'kaqua-metal-union-male-thread-brass',
  titleDe: 'Metallverschraubung Messing CW617N (Außengewinde)',
  titleEn: 'Metal union with PP-R nut in yellow brass CW617N (Male thread)',
  category: 'transition-fittings',
  brandLine: 'K-Aqua PP-R · Messing CW617N',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'R', 'L', 'SW'],
  dimensions: ['L', 'l', 'l1', 'SW'],
  ariaFields: ['d', 'R', 'L', 'SW', 'SW1'],

  variants: [],
  states: null,

  tile: 'Außengewindeverschraubung in gelbem Messing CW617N — ' +
        'gleiche Maße wie die vernickelte Variante, anderer Werkstoff.',

  build(size, variant, clipPlane) {
    return buildUnion({
      ...CONFIG,
      article,
      metal: 'brass',
      metalLabel: 'Messing CW617N',
      exportName: 'K-Aqua_Metallverschraubung_AG_Messing',
      seed: 179,
    }, size, variant, clipPlane);
  },
};

export default product;
