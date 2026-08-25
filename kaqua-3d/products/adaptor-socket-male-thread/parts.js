/* K-Aqua Übergangsmuffe mit Außengewinde — Kontur.

   Zwei Teile, zwei Werkstoffe — neu geschnitten nach M3:
     1. PP-Körper: glatte Schweißmuffenzone (D1), dann die geriffelte
        GRIFFZONE (D) am Gewindeende. Sie ist das dickste Maß des
        Teils — die Spalte D der Tabelle (Deutung in params.js).
     2. Messingzapfen: schmaler Bundring + kegeliges R-Gewinde
        (threadProfile). KEIN freier Sechskant — beide Bilder zeigen
        keinen; wo die Hand gegenhält, liegt PP.

   Kein CSG. */

import {
  buildProfile, revolve, mergeGeometries, capFromProfile,
  threadProfile, knurl, DRAFT, SEG_VIS, SEG_FINE,
} from '../../core/index.js';

/* PP-Körper: Muffenzone glatt, Griffzone geriffelt. */
export function buildSleeve(P) {
  const xA = -P.xEnd;                  // Mundloch der Schweißmuffe
  const xB = xA + P.ppLen;             // Fügestelle zum Messing
  const xGrip = xB - P.gripLen;        // Beginn der Griffzone
  const rSock = (x) => P.d / 2 - P.sockTaper * (x - xA);
  const kn = knurl(P.rGrip, P.gripLen, P.ribCount, P.ribDepth);
  const rMouth = Math.max(1.0, P.rSleeve * 0.06);

  const outer = [
    { a: xA, r: P.rSleeve, fillet: rMouth, w: 0 },
    { a: xA + rMouth * 0.7, r: P.rSleeve - DRAFT * rMouth * 0.7, fillet: 0.4, w: 0 },
    { a: xGrip - 1.6, r: P.rSleeve, fillet: 0.8, w: 0 },
    /* Schulter auf die Griffzone. Bei Größen mit D = D1 (32x3/4)
       entfällt sie von selbst. */
    { a: xGrip, r: P.rGrip - 0.3, fillet: 0.5, w: 0 },
    { a: xGrip + 0.9, r: P.rGrip, fillet: 0.4, w: 1 },
    { a: xB - 1.0, r: P.rGrip, fillet: 0.4, w: 1 },
    { a: xB, r: P.rGrip - 0.6, chamfer: 0.7, w: 0 },
  ];
  const inner = [
    { a: xB, r: P.boreR, fillet: 0.6, w: 0 },
    /* Netzpunkt auf der geraden Bohrstrecke. */
    { a: (xB + xA + P.socket) / 2, r: P.boreR, fillet: 0, w: 0 },
    { a: xA + P.socket, r: P.boreR, fillet: 1.0, w: 0 },
    { a: xA + P.socket, r: rSock(xA + P.socket), fillet: 1.0, w: 0 },
    { a: xA + 2, r: rSock(xA + 2), fillet: 0.4, w: 0 },
    { a: xA, r: P.d / 2 + P.lead, fillet: 0, w: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geo = revolve(profile, { axis: 'x', thetas: kn.thetas, mod: kn.mod, segments: SEG_VIS });
  return { geo, cap: capFromProfile(profile, 'x'), profile, xB };
}

/* Messingzapfen: Bundring + kegeliges Rohrgewinde. Die Gewindekontur
   kommt aus threadProfile — eine echte Helix kostet zehntausende
   Dreiecke und ist im Katalogmaßstab nicht zu sehen. */
export function buildBrass(P, xStart) {
  const rThread = P.threadOD / 2;
  const xRingEnd = xStart + P.bundRing;
  const xTip = P.xEnd;

  const thread = threadProfile(P.threadOD, P.threadPitch, P.turns, 'R')
    .map((p) => ({ a: xRingEnd + p.a, r: p.r, fillet: p.fillet }))
    .filter((p) => p.a <= xTip);

  const xEmbed = xStart - P.embedLen;   // umspritzter Kern, unsichtbar

  const outer = [
    { a: xEmbed, r: P.rEmbed, fillet: 0 },
    { a: xStart - 0.5, r: P.rEmbed, fillet: 0 },
    { a: xStart, r: P.rGrip - 1.2, fillet: 0.3 },
    { a: xStart + 0.4, r: rThread + 0.8, fillet: 0.4 },
    { a: xRingEnd - 0.3, r: rThread + 0.8, fillet: 0.3 },
    { a: xRingEnd, r: Math.min(rThread + 0.8, rThread + P.threadPitch * 0.2), chamfer: 0.4 },
    ...thread,
    { a: xTip, r: rThread * 0.93 - 1 / 32 * (xTip - xRingEnd), chamfer: 0.8 },
  ];
  const inner = [
    { a: xTip, r: P.boreR + 0.4, fillet: 0.5 },
    { a: xRingEnd, r: P.boreR, fillet: 0.6 },
    { a: xEmbed, r: P.boreR, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geo = revolve(profile, { axis: 'x', segments: SEG_VIS });
  return { geo, cap: capFromProfile(profile, 'x'), profile };
}
