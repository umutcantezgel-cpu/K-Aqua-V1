import { article } from './data.js';
export function params() {
  const P = Object.assign({}, article());
  P.maxRohr = 125;
  P.buegelR = 95;            // C-Bügel um das Rohr
  P.buegelB = 26; P.buegelT = 14;
  P.griffL = 120; P.griffR = 14;
  return P;
}
