/* K-Aqua Winkel 90° Muffe/Spitzende — Parametrik.

   Die Rechnung steht in ../_femalemale/params.js: der 45°- und der
   90°-Winkel teilen sie, und zweimal dieselbe Rechnung driftet (Fall 32).
   Hier steht nur der Ablenkwinkel. */

import { femaleMaleParams } from '../_femalemale/params.js';
import { article, ANGLE } from './data.js';

export const CONFIG = { angle: ANGLE };

export function params(key) {
  return femaleMaleParams(article(key), CONFIG);
}
