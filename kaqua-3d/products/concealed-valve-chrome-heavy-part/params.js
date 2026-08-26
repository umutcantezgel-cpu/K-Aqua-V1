import { threadSpec } from '../../core/index.js';
import { article } from './data.js';

export function params() {
  const a = article();
  const P = Object.assign({}, a);
  const th = threadSpec(a.G);
  P.threadOD = th.od;
  P.threadPitch = th.pitch;
  P.turns = 6;
  /* Alles ASSUMPTION (data.js), an Foto und Waage kalibriert. */
  P.art = 'konus';
  P.yRos = 0; P.rosR = 33; P.rosH = 6;
  P.knaufR = 21; P.knaufH = 38;
  P.yU0 = -24; P.boreR = 8;
  return P;
}
