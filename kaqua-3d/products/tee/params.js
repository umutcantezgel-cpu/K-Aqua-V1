/* K-Aqua T-Stück — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */

import { teeParams } from '../_tee/params.js';
import { article, SDR } from './data.js';

export function params(dNom) {
  return teeParams(article(dNom), { sdr: SDR });
}
