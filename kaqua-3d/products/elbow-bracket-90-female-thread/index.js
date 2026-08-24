/* K-Aqua Anschlussbogen 90° mit Innengewinde — Produktpaket nach
   PRODUKT-VERTRAG.md.

   Verbundteil aus PP-R-Winkel und Messingring. Der Winkel ist EIN Loft
   über eine Bahn mit ungleichen Schenkeln — Muffe auf −X, Gewinde auf
   +Y — und trägt damit dieselbe Kontur wie der Winkel mit Außengewinde.

   Der Messingring sitzt bündig: von außen ist nur der schmale goldene
   Kreis an der Stirnfläche zu sehen. Der Halbschnitt zeigt, wie tief er
   im PP steckt.

   KEIN SECHSKANT. Die Tabelle führt keine Spalte SW, und beide Fotos
   des Katalogs (Seite 95) und der Produktreihe (AQ090GP) zeigen einen
   runden, bündigen Messingring.

   WIDERSPRUCH, dokumentiert statt aufgelöst: der ALH-Render
   AQ090G2012 zeigt denselben Artikel mit einem SECHSKANTIGEN Kragen.
   Die Produktfotos belegen dazu eine zweite Ausführung mit
   vorstehender Messing-Sechskantmutter (AQ0906GP gegen AQ090GP) — der
   Katalog kennt sie nicht. Zwei Bilder derselben Familie, die sich
   widersprechen: keines gewinnt (25-BILDQUELLEN.md §1.4). Gebaut ist
   die Fassung, die die Tabelle trägt. Offener Punkt in LOOP-STATUS.md. */

import {
  ARTICLES, DATA_STATUS, DIMENSION_KEY, SIZES, article, sizeLabel
} from './data.js';
import { CONFIG } from './params.js';
import { buildBracket } from './parts.js';

const product = {
  id: 'transition-fittings/elbow-bracket-90-female-thread',
  module: 'kaqua-elbow-bracket-90-female-thread',
  titleDe: 'Anschlussbogen 90° mit Innengewinde',
  titleEn: 'Elbow bracket 90° (Female thread)',
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
  dimensions: ['L', 'L1', 'h'],
  ariaFields: ['d', 'Rp', 'D', 'L', 'z', 'h', 'D1', 'L1', 'z1'],

  variants: [],
  states: null,

  tile: 'Richtungswechsel auf Rohrgewinde innen: Schweißmuffe am einen ' +
        'Schenkel, bündiger Messingring am anderen.',

  build(size, variant, clipPlane) {
    return buildBracket({
      ...CONFIG,
      article,
      dimensionKey: DIMENSION_KEY,
      exportName: 'K-Aqua_Anschlussbogen_IG',
      seed: 211,
    }, size, variant, clipPlane);
  },
};

export default product;
