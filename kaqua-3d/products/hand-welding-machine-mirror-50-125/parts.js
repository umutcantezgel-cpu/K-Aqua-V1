import {
  mergeGeometries, roundedPad, revolve, buildProfile, SEG_VIS,
} from '../../core/index.js';
import { buildRundgriff } from '../_handtools/parts.js';

export function buildSpiegel(P) {
  const geos = [];
  const scheibe = revolve(buildProfile([
    { a: -P.spiegelT / 2, r: P.spiegelR, chamfer: 2 },
    { a: P.spiegelT / 2, r: P.spiegelR, chamfer: 2 },
    { a: P.spiegelT / 2, r: 6, fillet: 0 },
    { a: -P.spiegelT / 2, r: 6, fillet: 0 },
  ], { segs: 4 }), { axis: 'y', segments: SEG_VIS });
  scheibe.rotateX(Math.PI / 2);
  geos.push(scheibe);
  const kasten = roundedPad(P.kastenL, 52, 30, 6);
  kasten.translate(P.spiegelR + P.kastenL / 2 - 4, 0, 0);
  geos.push(kasten);
  return { geo: mergeGeometries(geos), cap: null };
}

export function buildStiel(P) {
  const g = buildRundgriff(P.stielL, P.stielR);
  g.rotateZ(-Math.PI / 2);
  g.translate(P.spiegelR + P.kastenL - 6, 0, 0);
  return { geo: g, cap: null };
}
