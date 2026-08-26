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
  P.art = 'zylinder';
  P.yRos = 0; P.rosR = 30; P.rosH = 5;
  P.knaufR = 17; P.knaufH = 30;
  P.yU0 = -20; P.boreR = 8;
  return P;
}
