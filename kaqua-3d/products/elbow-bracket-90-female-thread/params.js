/* K-Aqua Anschlussbogen 90° IG — Parametrik.

   Die Rechnung steht in ../_bracket/params.js: dieses Produkt und die
   Wandscheibe teilen den Körper, und zweimal dieselbe Rechnung driftet
   (Fall 32). Hier steht nur, was dieses Produkt daran festlegt. */

import { bracketParams } from '../_bracket/params.js';
import { article } from './data.js';

export const CONFIG = { lug: false };

export function params(key) {
  return bracketParams(article(key), CONFIG);
}
