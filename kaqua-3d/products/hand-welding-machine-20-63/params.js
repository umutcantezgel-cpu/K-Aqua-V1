import { article } from './data.js';
export function params() {
  const P = Object.assign({}, article());
  P.plattL = 240; P.plattB = 74; P.plattT = 14;   // ASSUMPTION Schwert
  P.lochR = 9; P.kastenL = 64; P.stielL = 130; P.stielR = 14;
  P.sollBreite = 431;   // konstruktiv, inkl. Fasen
  return P;
}
