/* K-Aqua Metallverschraubung mit PP-R-Mutter (Außengewinde) —
   Produktpaket nach PRODUKT-VERTRAG.md.

   Vier Teile, drei Werkstoffe. Der Halbschnitt zeigt, wie die Mutter
   hinter dem PP-R-Dichtbund greift und wo die Flachdichtung sitzt;
   die Explosionsansicht nimmt die Mutter seitlich heraus, weil sie
   das einzige lösbare Teil der Baugruppe ist. */

import {
  ARTICLES, DATA_STATUS, DIMENSION_KEY, SIZES, article
} from './data.js';
import { CONFIG } from './params.js';
import { buildUnion } from './parts.js';

const product = {
  id: 'transition-fittings/metal-union-male-thread',
  module: 'kaqua-metal-union-male-thread',
  titleDe: 'Metallverschraubung mit PP-R-Mutter (Außengewinde)',
  titleEn: 'Metal union with PP-R nut (Male thread)',
  category: 'transition-fittings',
  brandLine: 'K-Aqua PP-R · vernickelt',
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

  tile: 'Lösbarer Übergang von PP-R auf kegeliges Außengewinde — ' +
        'die Überwurfmutter trennt die Verbindung, ohne die Schweißnaht zu öffnen.',

  build(size, variant, clipPlane) {
    return buildUnion({
      ...CONFIG,
      article,
      metal: 'steel',
      metalLabel: 'vernickelt',
      exportName: 'K-Aqua_Metallverschraubung_AG',
      seed: 167,
    }, size, variant, clipPlane);
  },
};

export default product;
