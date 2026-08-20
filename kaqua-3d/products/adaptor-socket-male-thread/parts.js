/* K-Aqua Übergangsmuffe mit Außengewinde — Kontur.

   Zwei Teile, zwei Werkstoffe:
     1. PP-Körper: Schweißmuffe mit geriffelter Mantelfläche (grooveMod)
     2. Messingzapfen: Sechskantbund (hexPrism) + kegeliges R-Gewinde
        (threadProfile)

   Das ist der erste echte Einsatz von threadProfile, hexPrism und
   knurl. Kein CSG. */

import {
  buildProfile, revolve, mergeGeometries, capFromProfile, hexPrism,
  threadProfile, knurl, thetaSamples, grooveMod,
  DRAFT, SEG_VIS, SEG_INT, SEG_FINE,
} from '../../core/index.js';

/* PP-Muffenteil. Die Riffelung sitzt auf der Mantelfläche und läuft
   an beiden Enden aus — sie ist eine Griffhilfe beim Verschrauben, kein
   Zierrat, und deshalb dort am tiefsten, wo die Hand fasst. */
export function buildSleeve(P) {
  const xA = -P.xEnd;                  // Mundloch der Schweißmuffe
  const xB = xA + P.ppLen;             // Fügestelle zum Messing
  const rSock = (x) => P.d / 2 - P.sockTaper * (x - xA);

  const kn = knurl(P.rSleeve, P.ppLen, P.ribCount, P.ribDepth);
  const rMouth = Math.max(1.0, P.rSleeve * 0.06);

  const outer = [
    { a: xA, r: P.rSleeve, fillet: rMouth, w: 0 },
    { a: xA + rMouth * 0.7, r: P.rSleeve - DRAFT * rMouth * 0.7, fillet: 0.4, w: 1 },
    { a: xB - 1.2, r: P.rSleeve, fillet: 0.5, w: 1 },
    { a: xB, r: P.rSleeve + 0.15, chamfer: 0.5, w: 0 },
  ];
  const inner = [
    { a: xB, r: P.boreR, fillet: 0.6, w: 0 },
    { a: xA + P.socket, r: P.boreR, fillet: 1.0, w: 0 },
    { a: xA + P.socket, r: rSock(xA + P.socket), fillet: 1.0, w: 0 },
    { a: xA + 2, r: rSock(xA + 2), fillet: 0.4, w: 0 },
    { a: xA, r: P.d / 2 + P.lead, fillet: 0, w: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geo = revolve(profile, { axis: 'x', thetas: kn.thetas, mod: kn.mod, segments: SEG_VIS });
  return { geo, cap: capFromProfile(profile, 'x'), profile, xB };
}

/* Messingzapfen: Sechskantbund plus kegeliges Rohrgewinde. Die
   Gewindekontur kommt aus threadProfile — eine echte Helix kostet
   zehntausende Dreiecke und ist im Katalogmaßstab nicht zu sehen. */
export function buildBrass(P, xStart) {
  const rThread = P.threadOD / 2;
  const xCollarEnd = xStart + P.collarLen;
  const xTip = P.xEnd;

  /* Gewindekontur ab dem Bundende bis zur Spitze, kegelig 1:16. */
  const thread = threadProfile(P.threadOD, P.threadPitch, P.turns, 'R')
    .map((p) => ({ a: xCollarEnd + p.a, r: p.r, fillet: p.fillet }))
    .filter((p) => p.a <= xTip);

  /* Über der Sechskantlänge liegt der Rotationskörper auf dem
     INKREISRADIUS (af/2), nicht auf dem Umkreis (D/2). Sonst umhüllt er
     den Sechskant und die Schlüsselflächen verschwinden im Material —
     genau das war der erste Versuch. D wird vom Sechskant über Ecke
     getragen, nicht vom Bund. */
  const rIn = P.af / 2;
  const hexA = xStart + (P.collarLen - P.hexLen) * 0.5;
  const hexB = hexA + P.hexLen;

  const outer = [
    { a: xStart, r: P.rSleeve - 0.2, fillet: 0.4 },
    { a: xStart + 0.8, r: rIn, fillet: 0.6 },
    { a: hexA - 0.4, r: rIn, fillet: 0.4 },
    { a: hexB + 0.4, r: rIn, fillet: 0.4 },
    { a: xCollarEnd - 1.0, r: rIn, fillet: 0.5 },
    { a: xCollarEnd, r: Math.min(rIn, rThread + P.threadPitch * 0.2), chamfer: 0.6 },
    ...thread,
    { a: xTip, r: rThread * 0.93 - 1 / 32 * (xTip - xCollarEnd), chamfer: 0.8 },
  ];
  const inner = [
    { a: xTip, r: P.boreR + 0.4, fillet: 0.5 },
    { a: xCollarEnd, r: P.boreR, fillet: 0.6 },
    { a: xStart, r: P.boreR, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Sechskant: er trägt jetzt die Silhouette. hexPrism baut in +X ab
     a = 0, deshalb versetzt. */
  /* bevel = 0: die Stirnfase von hexPrism nimmt vom Umkreis und würde
     das Eckenmaß D unterschreiten. Der Sechskant sitzt zwischen zwei
     Bundabschnitten, eine Stirnfase ist dort nicht sichtbar. Der
     Eckenradius bleibt klein, damit D erreicht wird. */
  const hex = hexPrism(P.af, P.hexLen, 0.3, 0);
  hex.translate(hexA, 0, 0);
  geos.push(hex);

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'), profile };
}
