/* K-Aqua Wandscheibe 90° IG — Parametrik.

   Die Rechnung steht in ../_bracket/params.js: dieses Produkt und der
   Anschlussbogen teilen den Körper (Fall 32). Hier steht nur, was
   dieses Produkt daran festlegt — und das ist genau eines: die Lasche. */

import { bracketParams } from '../_bracket/params.js';
import { article } from './data.js';

export const CONFIG = { lug: true };

export function params(key) {
  return bracketParams(article(key), CONFIG);
}
