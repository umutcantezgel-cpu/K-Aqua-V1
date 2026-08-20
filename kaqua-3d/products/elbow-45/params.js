/* K-Aqua Winkel 45° — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */

import { bendParams } from '../_bend/params.js';
import { article, ANGLE, SDR } from './data.js';

export function params(dNom) {
  return bendParams(article(dNom), { angle: ANGLE, sdr: SDR });
}
