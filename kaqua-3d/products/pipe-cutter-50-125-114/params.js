import { article } from './data.js';
export function params() {
  const P = Object.assign({}, article());
  P.laenge = 150; P.breite = 62; P.dicke = 26;   // ASSUMPTION Handmaß
  P.klingenB = 55;
  return P;
}
