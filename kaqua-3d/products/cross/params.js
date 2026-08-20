/* K-Aqua Kreuz — Parametrik.

   Vier gleiche Anschlüsse in einer Ebene. Beide Achsen tragen dasselbe
   Maß L, deshalb genügt ein Halbmaß.

   ASSUMPTION Außendurchmesser: die Tabelle führt keinen. Angesetzt
   1,375·d — der Wert, den T-Stück und Muffe bei d25 und d32 zeigen
   (T-Stück d32: D = 44 = 1,375·32; Muffe d32: D = 44). Gegen die
   Zeichnung zu verifizieren. */

import { D2R, fusionDepth } from '../../core/index.js';
import { article } from './data.js';

export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  P.run = a.L;
  P.half = a.L / 2;
  P.OD = Math.round(1.375 * d * 10) / 10;
  P.rOut = P.OD / 2;
  P.wallFitting = (P.OD - d) / 2;

  P.socket = fusionDepth(d) ?? Math.max(10, d * 0.55);
  P.socketFromTable = a.L - a.z;

  P.wallPipe = d / 6;
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);
  P.restwand = P.wallFitting;
  P.emR = Math.min(1.8, 0.05 * d);

  /* ASSUMPTION Kehlradius: wie beim T-Stück 0,18·d. Am Kreuz treffen
     vier Kehlen aufeinander, deshalb nach oben durch den Abstand der
     Abzweige begrenzt. */
  P.filletR = Math.min(Math.max(1.5, 0.18 * d), P.rOut * 0.4);

  const norm = fusionDepth(d);
  P.normDepth = norm;
  P.depthDeltaToNorm = norm == null ? null : Math.round((P.socketFromTable - norm) * 10) / 10;

  if (P.socket >= P.half) {
    throw new Error('K-Aqua Kreuz d' + d + ': Muffentiefe ' + P.socket +
      ' mm passt nicht in den halben Durchgang ' + P.half + ' mm');
  }
  return P;
}
