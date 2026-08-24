/* K-Aqua T-Stück 90° mit Außengewinde — Parametrik.

   Die Rechnung steht in ../_teethread/params.js: beide Produkte teilen
   die Baugruppe, und zweimal dieselbe Rechnung driftet (Fall 32). */

import { teeThreadParams } from '../_teethread/params.js';
import { article } from './data.js';

export const CONFIG = { threadKind: 'R' };

export function params(key) {
  return teeThreadParams(article(key), CONFIG);
}
