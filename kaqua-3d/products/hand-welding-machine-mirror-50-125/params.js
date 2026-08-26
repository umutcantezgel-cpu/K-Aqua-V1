import { article } from './data.js';
export function params() {
  const P = Object.assign({}, article());
  P.spiegelR = 95; P.spiegelT = 14;   // ASSUMPTION für d125-Fittings
  P.kastenL = 70; P.stielL = 120; P.stielR = 13;
  P.sollBreite = 374;   // konstruktiv, inkl. Fasen
  return P;
}
