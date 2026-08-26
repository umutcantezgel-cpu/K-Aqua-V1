import { article } from './data.js';
export function params() {
  const P = Object.assign({}, article());
  P.plattL = 190; P.plattB = 74; P.plattT = 14;   // ASSUMPTION Schwert
  P.lochR = 9; P.kastenL = 64; P.stielL = 130; P.stielR = 14;
  P.sollBreite = 381;   // konstruktiv, inkl. Fasen
  return P;
}
