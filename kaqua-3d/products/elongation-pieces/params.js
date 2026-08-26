import { threadSpec } from '../../core/index.js';
import { article } from './data.js';

export function params() {
  const a = article();
  const P = Object.assign({}, a);
  const th = threadSpec('3/4');        // ASSUMPTION: G ¾ wie die Oberteile daneben
  P.threadOD = th.od;
  P.threadPitch = th.pitch;
  P.turns = Math.max(5, Math.floor((a.L - 4) / th.pitch));
  P.huelseWand = 2.6;                  // ASSUMPTION, Massenanker
  P.zapfenR = 4.2;                     // ASSUMPTION Spindelmaß
  P.zapfenL = a.L + 8;
  return P;
}
