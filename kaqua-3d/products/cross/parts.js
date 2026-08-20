/* K-Aqua Kreuz — Kontur.

   Vier Anschlüsse in der XY-Ebene: Durchgang auf X, Abzweige auf ±Y.
   Aufbau wie das T-Stück, nur mit zwei Abzweigen statt einem — genau
   der Fall, für den branchJoin gebaut wurde. Der Test, ob das
   Familienmodul trägt.

   Dieselbe bekannte Grenze wie beim T-Stück: an den Durchdringungen
   überlappen die Innenflächen. Ohne CSG nicht anders lösbar, von außen
   unsichtbar, Maße unberührt. */

import {
  buildProfile, mirrorProfile, revolve, branchJoin, mergeGeometries,
  capFromProfile, DRAFT, SEG_VIS, SEG_FINE,
} from '../../core/index.js';

function armProfile(P, len) {
  const ro = P.rOut;
  const rSock = (x) => P.d / 2 - P.sockTaper * (len - x);
  const xBell = len - Math.max(3, 0.10 * P.socket);
  const bellRise = Math.min(0.35, P.wallFitting * 0.08);
  const rBarrel = ro - bellRise;

  const outer = [
    { a: 0, r: rBarrel + 0.09, fillet: 0.1 },
    { a: 0.5, r: rBarrel, fillet: 0.35 },
    { a: xBell - 1.5, r: rBarrel - DRAFT * (xBell - 1.5), fillet: 2.0 },
    { a: xBell, r: ro, fillet: 1.0 },
    { a: len, r: ro - DRAFT * (len - xBell), chamfer: Math.min(1.4, P.wallFitting * 0.4) },
  ];
  const inner = [
    { a: 0, r: P.boreR, fillet: 0.5 },
    { a: len - P.socket, r: P.boreR, fillet: 1.2 },
    { a: len - P.socket, r: rSock(len - P.socket), fillet: 1.2 },
    { a: len - 2, r: rSock(len - 2), fillet: 0.4 },
    { a: len, r: P.d / 2 + P.lead, fillet: 0 },
  ];
  return { profile: buildProfile(mirrorProfile(outer, inner), { segs: 4 }), rBarrel };
}

export function buildCross(P) {
  const { profile, rBarrel } = armProfile(P, P.half);
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Zwei Kehlen, eine je Abzweig. branchJoin baut um +X als Hauptachse
     und legt den Abzweig in die XY-Ebene; die zweite Kehle ist die um
     180° um X gedrehte erste. */
  const kehle = branchJoin({
    mainR: rBarrel, branchR: P.rOut, filletR: P.filletR,
    angle: 90, segments: SEG_VIS, uSegs: 6,
  });
  geos.push(kehle.geo);
  const kehle2 = kehle.geo.clone();
  kehle2.rotateX(Math.PI);
  geos.push(kehle2);

  /* Die beiden Abzweigarme: ein Rotationskörper um Y, von der
     Eintauchtiefe bis zur Stirnfläche, und seine Spiegelung. */
  const yStart = -kehle.insertDepth;
  const yEnd = P.half;
  const rSockB = (y) => P.d / 2 - P.sockTaper * (yEnd - y);
  const yBell = yEnd - Math.max(3, 0.10 * P.socket);
  const bellRise = Math.min(0.35, P.wallFitting * 0.08);
  const rB = P.rOut - bellRise;

  const bProfile = buildProfile([
    { a: yStart, r: rB, fillet: 0 },
    { a: yBell - 1.5, r: rB - DRAFT * (yBell - 1.5 - yStart) * 0.35, fillet: 1.8 },
    { a: yBell, r: P.rOut, fillet: 1.0 },
    { a: yEnd, r: P.rOut - DRAFT * (yEnd - yBell), chamfer: Math.min(1.4, P.wallFitting * 0.4) },
    { a: yEnd, r: P.d / 2 + P.lead, fillet: 0 },
    { a: yEnd - 2, r: rSockB(yEnd - 2), fillet: 0.4 },
    { a: yEnd - P.socket, r: rSockB(yEnd - P.socket), fillet: 1.2 },
    { a: yEnd - P.socket, r: P.boreR, fillet: 1.2 },
    { a: yStart, r: P.boreR, fillet: 0 },
  ], { segs: 4 });
  const arm = revolve(bProfile, { axis: 'y', segments: SEG_VIS });
  geos.push(arm);
  const arm2 = arm.clone();
  arm2.rotateX(Math.PI);
  geos.push(arm2);

  /* Auswerfermarken auf den beiden freien Quadranten des Durchgangs. */
  for (const x of [-P.half * 0.62, P.half * 0.62]) {
    const disc = revolve(buildProfile([
      { a: 0, r: 0, fillet: 0 },
      { a: 0, r: P.emR, chamfer: 0.2 },
      { a: 0.09, r: P.emR, fillet: 0.09 },
      { a: 0.09, r: 0, fillet: 0 },
    ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
    disc.rotateZ(Math.PI / 2);
    disc.translate(x, 0, -(rBarrel - 0.05));
    geos.push(disc);
  }

  return {
    geo: mergeGeometries(geos),
    cap: mergeGeometries([capFromProfile(profile, 'x')].concat(kehle.cap ? [kehle.cap] : [])),
    insertDepth: kehle.insertDepth,
  };
}
