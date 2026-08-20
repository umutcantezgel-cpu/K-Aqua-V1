/* K-Aqua Flachdichtung — Kontur.

   Das einfachste Teil des Katalogs: ein Rechteckquerschnitt, um X
   rotiert. Vier Konturpunkte.

   Bewusst OHNE Verrundung: eine gestanzte EPDM-Dichtung hat scharfe
   Kanten. Die 0,2-mm-Fase ist nur da, damit die Kante im Render nicht
   flimmert — sie ist keine Konstruktionsfase. */

import {
  buildProfile, revolve, capFromProfile, SEG_VIS,
} from '../../core/index.js';

export function buildGasket(P) {
  const x0 = -P.s / 2, x1 = P.s / 2;
  const profile = buildProfile([
    { a: x0, r: P.rIn, chamfer: P.edge },
    { a: x0, r: P.rOut, chamfer: P.edge },
    { a: x1, r: P.rOut, chamfer: P.edge },
    { a: x1, r: P.rIn, chamfer: P.edge },
  ], { segs: 2 });
  return { geo: revolve(profile, { axis: 'x', segments: SEG_VIS }),
           cap: capFromProfile(profile, 'x'), profile };
}
