/* K-Aqua Winkel 45° Muffe/Spitzende — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Winkel mit ZWEI verschiedenen Enden: der eine Schenkel ist eine
   Schweißmuffe, der andere ein Rohrende, das in die Muffe des nächsten
   Teils gesteckt wird. Damit lässt sich die Richtung wechseln, ohne ein
   Rohrstück dazwischenzusetzen.

   Ein Werkstoff, ein Teil. Der Halbschnitt zeigt, dass die Bohrung vom
   Muffengrund bis in die Spitze durchläuft.

   Der Körper ist derselbe wie beim Winkel mit Außengewinde — ungleiche
   Schenkel, ungleiche Außendurchmesser (../_bendthread/parts.js). Er
   trägt seit dem 24.08.2026 auch den Ablenkwinkel als Parameter; vorher
   war 90° fest verdrahtet. */

import {
  ARTICLES, ANGLE, DATA_STATUS, DIMENSION_KEY, SIZES, article, sizeLabel
} from './data.js';
import { CONFIG } from './params.js';
import { buildFemaleMale } from './parts.js';

const product = {
  id: 'fittings/elbow-45-female-male',
  module: 'kaqua-elbow-45-female-male',
  titleDe: 'Winkel 45° Muffe/Spitzende',
  titleEn: 'Elbow 45° (Female/male)',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel,
  sizeTitle: 'Nennweite',
  defaultSize: '25',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'l', 'z1', 'kg'],
  dimensions: ['l', 'z1'],
  ariaFields: ['d', 'D', 'l', 'z', 'z1'],

  variants: [],
  states: null,

  tile: 'Richtungswechsel um 45° ohne Zwischenrohr: Muffe am einen ' +
        'Schenkel, Spitzende am anderen.',

  build(size, variant, clipPlane) {
    return buildFemaleMale({
      ...CONFIG,
      article,
      dimensionKey: DIMENSION_KEY,
      exportName: 'K-Aqua_Winkel45_MS',
      seed: 241,
    }, size, variant, clipPlane);
  },
};

export default product;
