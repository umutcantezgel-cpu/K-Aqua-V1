import {
  buildProfile, revolve, capFromProfile, mergeGeometries, SEG_VIS, SEG_INT,
} from '../../core/index.js';

/* Zwei Heizköpfe koaxial am Schaft (Bohrkopf für die Leckstelle,
   Muffenkopf für den Stopfen), dazwischen ein Isolierkragen. */
export function buildWerkzeug(P) {
  const profile = buildProfile([
    { a: -P.schaftL, r: P.schaftR, chamfer: 0.5 },
    { a: -6, r: P.schaftR, fillet: 0.4 },
    { a: -6, r: P.kragenR, chamfer: 0.6 },
    { a: 0, r: P.kragenR, fillet: 0.5 },
    { a: 0, r: P.kopfR, fillet: 0.4 },
    { a: P.kopfH, r: P.kopfR, chamfer: 0.8 },
    { a: P.kopfH, r: P.d / 2, fillet: 0.4 },
    { a: P.kopfH + P.d * 1.1, r: P.d / 2, chamfer: 0.6 },
    { a: P.kopfH + P.d * 1.1, r: 0.02, fillet: 0 },
    { a: -P.schaftL, r: 0.02, fillet: 0 },
  ], { segs: 4 });
  return { geo: revolve(profile, { axis: 'y', segments: SEG_VIS }),
           cap: capFromProfile(profile, 'y') };
}
