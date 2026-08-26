import {
  mergeGeometries, roundedPad, revolve, buildProfile, SEG_INT,
} from '../../core/index.js';
import { buildRundgriff } from '../_handtools/parts.js';

/* Heizschwert: flache Platte mit Werkzeuglöchern (als Hülsenringe
   angedeutet), hinten Griffkörper mit Stiel. */
export function buildGeraet(P) {
  const geos = [];
  const platte = roundedPad(P.plattL, P.plattB, P.plattT, P.plattB * 0.35);
  geos.push(platte);
  for (const fx of [-P.plattL * 0.22, P.plattL * 0.18]) {
    const ring = revolve(buildProfile([
      { a: -P.plattT / 2 - 0.8, r: P.lochR + 2.2, chamfer: 0.4 },
      { a: P.plattT / 2 + 0.8, r: P.lochR + 2.2, chamfer: 0.4 },
      { a: P.plattT / 2 + 0.8, r: P.lochR, fillet: 0 },
      { a: -P.plattT / 2 - 0.8, r: P.lochR, fillet: 0 },
    ], { segs: 3 }), { axis: 'y', segments: SEG_INT });
    ring.rotateX(Math.PI / 2);
    ring.translate(fx, 0, 0);
    geos.push(ring);
  }
  const kasten = roundedPad(P.kastenL, P.plattB * 0.8, P.plattT * 2.6, 6);
  kasten.translate(P.plattL / 2 + P.kastenL / 2 - 4, 0, 0);
  geos.push(kasten);
  const geo = mergeGeometries(geos);
  return { geo, cap: null };
}

export function buildStiel(P) {
  const g = buildRundgriff(P.stielL, P.stielR);
  g.rotateZ(-Math.PI / 2);
  g.translate(P.plattL / 2 + P.kastenL - 4, 0, 0);
  return { geo: g, cap: null };
}
