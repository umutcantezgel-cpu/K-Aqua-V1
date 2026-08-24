/* K-Aqua Metallverschraubung (Innengewinde, Messing) — Parametrik.

   Die Rechnung steht in ../_union/params.js: vier Produkte teilen die
   Baugruppe, und viermal dieselbe Rechnung driftet (Fall 32). Hier
   steht nur, was dieses Produkt daran festlegt. */

import { unionParams } from '../_union/params.js';
import { article } from './data.js';

export const CONFIG = { threadKind: 'Rp' };

export function params(dNom) {
  return unionParams(article(dNom), CONFIG);
}
