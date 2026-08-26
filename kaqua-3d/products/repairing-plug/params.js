import { article } from './data.js';
export function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);
  P.len = Math.max(90, a.d * 11);      // ASSUMPTION aus dem Bildverhältnis
  P.spitzL = a.d * 2.2;
  return P;
}
