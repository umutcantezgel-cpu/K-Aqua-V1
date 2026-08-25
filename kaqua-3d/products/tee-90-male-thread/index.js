/* K-Aqua T-Stück 90° mit Außengewinde — Produktpaket nach PRODUKT-VERTRAG.md.

   Zwei Werkstoffe. Der Halbschnitt zeigt, wie tief das Messingteil im
   PP-R-Körper sitzt und wo die Fügestelle liegt; die Explosionsansicht
   zieht es nach oben heraus. */

import {
  ARTICLES, DATA_STATUS, DIMENSION_KEY, SIZES, article, sizeLabel
} from './data.js';
import { CONFIG } from './params.js';
import { buildTeeThread } from './parts.js';

const product = {
  id: 'transition-fittings/tee-90-male-thread',
  module: 'kaqua-tee-90-male-thread',
  titleDe: 'T-Stück 90° mit Außengewinde',
  titleEn: 'Tee 90° (Male thread)',
  category: 'transition-fittings',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  /* Zwei Nennweiten je Zeile: der Artikel wird erst durch das Paar
     (d, Rp) eindeutig, deshalb der zusammengesetzte Schlüssel. OHNE
     diese Zeile fällt articleOf auf 'd' zurück, sucht ein Bauteil mit
     d = '25x1_2' und wirft — die Seite zeigte dann zwar das Modell,
     aber die Bedienung war tot und window.kaqua fehlte. */
  sizeKey: 'key',
  sizeLabel,
  sizeTitle: 'Nennweite · Gewinde',
  defaultSize: '25x1_2',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'R', 'D', 'z1'],
  dimensions: ['D', 'l', 'z1'],
  ariaFields: ['d', 'R', 'D', 'l', 'z1'],

  variants: [],
  states: null,

  tile: 'Abzweig auf kegeliges Außengewinde, Durchgang bleibt PP-R-Muffe — ' +
        'der Messingzapfen trägt einen Sechskant zum Gegenhalten.',

  build(size, variant, clipPlane) {
    return buildTeeThread({
      ...CONFIG,
      article,
      topLabel: 'z1',
      exportName: 'K-Aqua_TStueck_AG',
      seed: 197,
    }, size, variant, clipPlane);
  },
};

export default product;
