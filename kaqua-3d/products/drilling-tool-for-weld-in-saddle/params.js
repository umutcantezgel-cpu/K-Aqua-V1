import { article } from './data.js';
export function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);
  P.fraeserR = a.d * 0.5 * 0.66;       // ASSUMPTION: bohrt die Kernöffnung
  P.fraeserH = Math.max(16, a.d * 0.6);
  P.schaftR = 4;                        // ASSUMPTION Aufnahme
  P.schaftL = 40;
  P.nuten = 2;
  return P;
}
