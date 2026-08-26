import {
  buildProfile, revolve, capFromProfile, SEG_VIS,
} from '../../core/index.js';

export function buildStab(P) {
  const r = P.d / 2;
  const profile = buildProfile([
    { a: 0, r: r * 0.96, chamfer: 0.4 },
    { a: P.len - P.spitzL, r: r, fillet: 0.4 },
    { a: P.len - P.spitzL * 0.3, r: r * 0.45, fillet: 1.2 },
    { a: P.len, r: 0.25, fillet: 0.3 },
    { a: P.len, r: 0.02, fillet: 0 },
    { a: 0, r: 0.02, fillet: 0 },
  ], { segs: 4 });
  return { geo: revolve(profile, { axis: 'y', segments: SEG_VIS }),
           cap: capFromProfile(profile, 'y') };
}
