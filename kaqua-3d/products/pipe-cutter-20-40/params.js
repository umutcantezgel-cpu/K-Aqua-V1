import { article } from './data.js';
export function params() {
  const P = Object.assign({}, article());
  P.maxRohr = 40;
  P.griffL = 150; P.griffB = 30; P.griffT = 16;
  P.klingeL = 70; P.klingeH = 46; P.klingeT = 2.2;
  P.ambossR = 26;
  return P;
}
