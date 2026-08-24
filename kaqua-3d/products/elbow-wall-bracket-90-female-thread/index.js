/* K-Aqua Wandscheibe 90° mit Innengewinde — Produktpaket nach
   PRODUKT-VERTRAG.md.

   Derselbe Winkel wie der Anschlussbogen, mit einer flachen Lasche am
   Boden: sie wird an die Wand geschraubt, das Innengewinde nimmt die
   Armatur auf.

   DREI WERKSTOFFTEILE, ZWEI MATERIALIEN: PP-R-Körper, Messingring,
   PP-R-Lasche. Die Lasche ist ein eigenes Teil der Baugruppe, damit die
   Explosionsansicht sie herausziehen kann — am realen Teil ist sie
   angespritzt.

   ── WAS BELEGT IST UND WAS NICHT ──
   Der Körper steht vollständig in der Tabelle. Die Lasche steht in
   KEINER Spalte. Belegt ist an ihr genau ein Maß: sie steht 2 mm unter
   dem Körper hervor — die Differenz von h gegenüber dem
   Anschlussbogen, viermal dieselbe. Umriss, Breite, Lochgröße und
   Lochlage sind am Foto abgegriffen und tragen ASSUMPTION; die
   Einbuchtung an ihrer Oberkante ist aus einem einzigen Blickwinkel
   nicht auflösbar und deshalb NICHT modelliert. Herleitung in
   ../_bracket/params.js. */

import {
  ARTICLES, DATA_STATUS, DIMENSION_KEY, SIZES, article, sizeLabel
} from './data.js';
import { CONFIG } from './params.js';
import { buildBracket } from './parts.js';

const product = {
  id: 'transition-fittings/elbow-wall-bracket-90-female-thread',
  module: 'kaqua-elbow-wall-bracket-90-female-thread',
  titleDe: 'Wandscheibe 90° mit Innengewinde',
  titleEn: 'Elbow/Wall bracket 90° (Female thread)',
  category: 'transition-fittings',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel,
  sizeTitle: 'Nennweite · Gewinde',
  defaultSize: '25x3_4',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'Rp', 'D', 'L', 'kg'],
  dimensions: ['L', 'L1'],
  ariaFields: ['d', 'Rp', 'D', 'L', 'z', 'D1', 'L1', 'z1'],

  variants: [],
  states: null,

  tile: 'Wandanschluss auf Rohrgewinde innen: Schweißmuffe, bündiger ' +
        'Messingring und eine angespritzte Lasche mit Schraubloch.',

  build(size, variant, clipPlane) {
    return buildBracket({
      ...CONFIG,
      article,
      dimensionKey: DIMENSION_KEY,
      exportName: 'K-Aqua_Wandscheibe_IG',
      seed: 223,
    }, size, variant, clipPlane);
  },
};

export default product;
