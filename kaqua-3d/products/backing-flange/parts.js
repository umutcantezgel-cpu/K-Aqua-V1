/* K-Aqua Bundflansch — Kontur.

   Eine Scheibe mit Mittelbohrung und Schraubenlöchern. Kein CSG:
   plateWithHoles legt die Löcher als Innenkonturen eines THREE.Shape an,
   die Triangulierung setzt sie in einem Zug — dasselbe Verfahren wie bei
   hexPrism. */

import { plateWithHoles, boltCircle, SEG_VIS } from '../../core/index.js';

export function buildFlange(P) {
  const holes = boltCircle(P.holeCount, P.rHole, P.boltCircleD, P.startDeg);
  const geo = plateWithHoles(P.rOut, P.rIn, P.thick, holes, {
    bevel: P.bevel, segments: SEG_VIS,
  });
  /* Keine Schnittfläche: ExtrudeGeometry liefert einen geschlossenen
     Körper, und der Halbschnitt zeigt über DoubleSide die Innenseite.
     Ein Stencil-Cap bräuchte die Kontur als 2D-Profil, und die ist hier
     nicht rotationssymmetrisch. */
  return { geo, cap: null, holes };
}
