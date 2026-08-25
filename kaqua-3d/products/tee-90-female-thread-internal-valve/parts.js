/* K-Aqua T-Stück für Innenventil — Kontur.

   Der Durchgang kommt aus ../_tee/parts.js (runProfile) — es ist
   derselbe Durchgang wie beim T-Stück und beim Gewinde-T-Stück, und
   dreimal geschrieben würde er driften (Fall 32).

   Der Ventildom ist eigen: ein Zylinder mit konstantem Außendurchmesser
   D1 = 45 über allen Nennweiten, in dem ein Messingring mit
   G-Innengewinde sitzt. Kein CSG — die Kehle zum Durchgang baut
   branchJoin, wie beim T-Stück. */

import {
  buildProfile, revolve, mergeGeometries, capFromProfile, branchJoin,
  threadRing, SEG_VIS, SEG_FINE,
} from '../../core/index.js';
import { runProfile } from '../_tee/parts.js';

export function buildVentilKoerper(P) {
  const { profile, rBarrel } = runProfile(P);
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Kehle zwischen Durchgang und Dom. Sie liefert insertDepth — wie weit
     der Dom in den Durchgang eintauchen muss, damit kein Spalt bleibt. */
  const kehle = branchJoin({
    mainR: rBarrel, branchR: P.rDom, filletR: P.filletR,
    angle: 90, segments: SEG_VIS, uSegs: 6,
  });
  geos.push(kehle.geo);

  /* Der Dom. Außen ein Zylinder auf D1 mit leichter Stirnfase, innen der
     Ringsitz und darunter der Übergang auf die Durchgangsbohrung. */
  const yStart = -kehle.insertDepth;
  const yEnd = P.yTop;
  const yRing = yEnd - P.ringLen;

  const dOuter = [
    { a: yStart, r: P.rDom, fillet: 0 },
    /* Messpunkt: siehe P.yMess in params.js. Er ändert die zylindrische
       Mantelfläche nicht, gibt der Messung aber etwas zu treffen. */
    { a: P.yMess, r: P.rDom, fillet: 0 },
    { a: yEnd - 1.5, r: P.rDom, fillet: 0.6 },
    { a: yEnd, r: P.rDom, chamfer: 0.9 },
  ];
  const dInner = [
    { a: yEnd, r: P.rRing, chamfer: 0.5 },
    { a: yRing, r: P.rRing, fillet: 0.6 },
    { a: yRing, r: P.boreR, fillet: 1.0 },
    /* Ein Netzpunkt auf halbem Weg zwischen Ringsitz und Durchgang.
       buildProfile unterteilt gerade Strecken nicht, und ohne ihn hat
       die Ventilbohrung zwischen ihren Enden keinen Punkt — jede
       Messung dort fände nur die Außenkontur vor. */
    { a: (yRing + yStart) / 2, r: P.boreR, fillet: 0 },
    { a: yStart, r: P.boreR, fillet: 0 },
  ];
  const dProfile = buildProfile([...dOuter, ...dInner], { segs: 4 });
  geos.push(revolve(dProfile, { axis: 'y', segments: SEG_VIS }));

  /* Auswerfermarken wie beim T-Stück — dasselbe Werkzeugprinzip. */
  for (const x of [-P.half * 0.55, P.half * 0.55]) {
    const disc = revolve(buildProfile([
      { a: 0, r: 0, fillet: 0 },
      { a: 0, r: P.emR, chamfer: 0.25 },
      { a: 0.1, r: P.emR, fillet: 0.1 },
      { a: 0.1, r: 0, fillet: 0 },
    ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
    disc.rotateX(Math.PI);
    disc.translate(x, -(rBarrel - 0.05), 0);
    geos.push(disc);
  }

  return {
    geo: mergeGeometries(geos),
    cap: mergeGeometries([
      capFromProfile(profile, 'x'),
      capFromProfile(dProfile, 'y'),
    ].concat(kehle.cap ? [kehle.cap] : [])),
  };
}

/* Der Messingring mit G-Innengewinde. threadRing im Core baut die
   Rp-Kontur; G und Rp haben dieselben Nennmaße nach ISO 228-1 bzw.
   ISO 7-1 — der Unterschied liegt in der Dichtstelle, nicht in der
   Geometrie. Deshalb dieselbe Funktion. */
export function buildVentilRing(P) {
  return threadRing({
    a0: P.yTop - P.ringLen,
    a1: P.yTop,
    rOuter: P.rRing,
    od: P.threadOD,
    pitch: P.threadPitch,
    turns: P.turns,
    axis: 'y',
  });
}
