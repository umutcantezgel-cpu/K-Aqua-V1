/* Zwei Drehteile, beide um Y. */
import {
  buildProfile, revolve, capFromProfile, threadProfile, SEG_VIS, SEG_INT,
} from '../../core/index.js';

export function buildHuelse(P) {
  const gew = threadProfile(P.threadOD, P.threadPitch, P.turns, 'G')
    .map((q) => ({ a: 2 + q.a, r: q.r, fillet: q.fillet }))
    .filter((q) => q.a <= P.L - 1);
  const rIn = P.threadOD / 2 - P.huelseWand;
  const profile = buildProfile([
    { a: 0, r: P.threadOD / 2 - 0.8, chamfer: 0.5 },
    ...gew,
    { a: P.L, r: P.threadOD / 2 - 0.5, chamfer: 0.6 },
    { a: P.L, r: rIn, chamfer: 0.4 },
    { a: P.L / 2, r: rIn, fillet: 0 },
    { a: 0, r: rIn, fillet: 0 },
  ], { segs: 4 });
  return { geo: revolve(profile, { axis: 'y', segments: SEG_VIS }),
           cap: capFromProfile(profile, 'y') };
}

export function buildZapfen(P) {
  const r = P.zapfenR;
  const profile = buildProfile([
    { a: 0, r: r * 0.7, chamfer: 0.4 },
    { a: 3, r: r * 0.7, fillet: 0.3 },
    { a: 3, r: r, fillet: 0.3 },
    { a: P.zapfenL - 4, r: r, fillet: 0.3 },
    { a: P.zapfenL - 4, r: r * 0.78, fillet: 0.3 },
    { a: P.zapfenL, r: r * 0.78, chamfer: 0.5 },
    { a: P.zapfenL, r: 0.02, fillet: 0 },
    { a: 0, r: 0.02, fillet: 0 },
  ], { segs: 3 });
  return { geo: revolve(profile, { axis: 'y', segments: SEG_INT }),
           cap: capFromProfile(profile, 'y') };
}
