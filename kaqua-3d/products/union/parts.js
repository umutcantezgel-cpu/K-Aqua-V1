/* K-Aqua Verschraubung — Kontur.

   Drei Teile, wie beim Kugelhahn:
     1. Überwurfmutter, geriffelt (grooveMod)
     2. Anschlussstutzen mit Schweißmuffe und O-Ring-Nut
     3. O-Ring

   Kein CSG. Das Gewinde zwischen Mutter und Stutzen wird nicht
   modelliert: es liegt vollständig verdeckt zwischen den Teilen, auch
   im Halbschnitt sieht man dort nur die Fügefläche. Ein Gewinde, das
   niemand sehen kann, kostet Dreiecke ohne Gegenwert.

   Die Muffe im Stutzen ist dagegen sichtbar und trägt Konus,
   Einführfase und Schweißtiefe wie jedes andere Muffenprodukt. */

import {
  buildProfile, revolve, mergeGeometries, capFromProfile, arcPts,
  grooveMod, thetaSamples, knurl, DRAFT, SEG_VIS, SEG_INT, SEG_FINE,
} from '../../core/index.js';

/* Überwurfmutter: Hülse mit Riffelung außen, Anlagebund innen. */
export function buildNut(P) {
  const xA = -P.xEnd;                    // freie Stirnfläche
  const xB = P.xNutEnd;                  // Mutterkante
  const kn = knurl(P.rOut, P.nutLen, P.ribCount, P.ribDepth);
  const rMouth = Math.max(1.2, P.rOut * 0.05);

  /* Der Bund innen greift hinter den Stutzenbund — dort überträgt die
     Mutter ihre Kraft. Er sitzt an der freien Stirnseite. */
  const rCollar = P.rTail * 0.86;

  const outer = [
    { a: xA, r: P.rOut - 0.4, fillet: rMouth * 0.5, w: 0 },
    { a: xA + rMouth * 0.6, r: P.rOut, fillet: 0.5, w: 1 },
    { a: xB - 1.2, r: P.rOut, fillet: 0.5, w: 1 },
    { a: xB, r: P.rOut - 0.5, chamfer: 0.6, w: 0 },
  ];
  const inner = [
    { a: xB, r: P.rTail + 0.25, fillet: 0.5 },
    { a: xA + 2.5, r: P.rTail + 0.25, fillet: 0.8 },
    { a: xA + 1.6, r: rCollar, fillet: 0.6 },
    { a: xA, r: rCollar, chamfer: 0.5 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geo = revolve(profile, { axis: 'x', thetas: kn.thetas, mod: kn.mod, segments: SEG_VIS });
  return { geo, cap: capFromProfile(profile, 'x'), profile };
}

/* Anschlussstutzen: Bund, Gewindeschaft (glatt, siehe Kopfkommentar),
   O-Ring-Nut, Schweißmuffe. */
export function buildTail(P) {
  const xA = P.xJoint;                   // Stutzenschulter, hinter der Lücke
  const xB = P.xEnd;                     // Muffenmundloch
  const rSock = (x) => P.d / 2 - P.sockTaper * (xB - x);
  const xBell = xB - Math.max(3, 0.12 * P.socket);
  const bellRise = Math.min(0.4, P.nutWall * 0.10);
  const rBarrel = P.rTail - bellRise;

  /* Der Bund am linken Ende ist die Fläche, gegen die die Mutter
     zieht. Er ist das dickste Stück des Stutzens. */
  const rFlange = P.rTail + 0.2;
  const xFlangeEnd = xA + Math.max(2.5, P.oRingD * 0.9);

  const outer = [
    { a: xA, r: rFlange * 0.82, chamfer: 0.6 },
    { a: xA + 0.6, r: rFlange, fillet: 0.5 },
    { a: xFlangeEnd, r: rFlange, fillet: 0.5 },
    // O-Ring-Nut
    { a: xFlangeEnd + 0.5, r: P.oRingR - P.oRingD * 0.28, fillet: 0.5 },
    { a: xFlangeEnd + P.oRingD * 1.3, r: P.oRingR - P.oRingD * 0.28, fillet: 0.5 },
    { a: xFlangeEnd + P.oRingD * 1.8, r: rBarrel, fillet: 0.6 },
    { a: xBell - 1.5, r: rBarrel - DRAFT * (xBell - 1.5 - xA) * 0.4, fillet: 1.6 },
    { a: xBell, r: P.rTail, fillet: 0.9 },
    { a: xB, r: P.rTail - DRAFT * (xB - xBell), chamfer: Math.min(1.3, P.nutWall * 0.35) },
  ];
  const inner = [
    { a: xB, r: P.d / 2 + P.lead, fillet: 0 },
    { a: xB - 2, r: rSock(xB - 2), fillet: 0.4 },
    { a: xB - P.socket, r: rSock(xB - P.socket), fillet: 1.0 },
    { a: xB - P.socket, r: P.boreR, fillet: 0.8 },
    { a: xA + 1.2, r: P.boreR, chamfer: 0.6 },
    { a: xA, r: P.boreR + 0.5, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Auswerfermarke auf dem Stutzenmantel. */
  const disc = revolve(buildProfile([
    { a: 0, r: 0, fillet: 0 },
    { a: 0, r: P.emR, chamfer: 0.2 },
    { a: 0.09, r: P.emR, fillet: 0.09 },
    { a: 0.09, r: 0, fillet: 0 },
  ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
  disc.rotateX(Math.PI);
  disc.translate((xBell + xFlangeEnd) / 2, -(rBarrel - 0.05), 0);
  geos.push(disc);

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'),
           profile, oringX: xFlangeEnd + P.oRingD * 0.65 };
}

/* O-Ring in der Nut: Kreisprofil um X. */
export function buildORing(P, xMid) {
  const r = P.oRingD / 2;
  const pts = [];
  arcPts(pts, xMid, P.oRingR, r, 0, Math.PI * 2, 20, { fillet: 0 });
  const profile = buildProfile(pts, { segs: 2 });
  return { geo: revolve(profile, { axis: 'x', segments: SEG_INT }),
           cap: capFromProfile(profile, 'x') };
}
