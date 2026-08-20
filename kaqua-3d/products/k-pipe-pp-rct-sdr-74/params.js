/* K-Aqua K-Rohr PP-RCT SDR 7,4 — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */

import { pipeParams } from '../_pipe/params.js';
import { article, SDR, STOCK_LENGTH_M } from './data.js';

export function params(dNom) {
  return pipeParams(article(dNom), { sdr: SDR, stockLength: STOCK_LENGTH_M });
}
