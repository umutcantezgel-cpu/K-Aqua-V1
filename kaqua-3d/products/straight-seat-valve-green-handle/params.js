/* Parametrik — alles ASSUMPTION (siehe data.js), Maßstab am Gewinde
   und an der Massenprobe kalibriert. */
import { threadSpec } from '../../core/index.js';
import { article } from './data.js';

export function params() {
  const a = article();
  const P = Object.assign({}, a);
  const th = threadSpec(a.G);
  P.threadOD = th.od;                  // 26,44 — der Maßstabsanker
  P.threadPitch = th.pitch;
  P.turns = 6;

  P.yG0 = 0;                           // Gewindeanfang
  P.yG1 = 14;                          // ASSUMPTION Gewindelänge
  P.hexAf = 32;                        // ASSUMPTION SW über dem Gewinde
  P.yHex1 = P.yG1 + 8;
  P.spindelR = 5.2;
  P.ySpindelTop = 34;
  P.yTeller = -16;                     // ASSUMPTION Hub + Tellerlage
  P.tellerR = 14;
  P.tellerH = 4;
  P.dichtH = 3;
  P.radY = P.ySpindelTop - 2;
  P.radR = 27;                         // ASSUMPTION Handrad
  P.radDicke = 7.5;
  return P;
}
