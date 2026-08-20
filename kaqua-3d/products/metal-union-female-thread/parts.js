/* K-Aqua Metallverschraubung (Innengewinde) — Kontur.

   Drei Teile von links nach rechts:
     1. PP-R-Muffe (grün), Rotationskörper mit Schweißmuffe
     2. Messingkörper mit Sechskant SW1
     3. Messingmutter mit Sechskant SW und Innengewinde Rp

   Kein CSG. Die Sechskante kommen aus hexPrism; die Innengewindekontur
   aus threadProfile mit kind 'Rp' — dort liegt die Kuppe nach innen,
   also unter dem Nenndurchmesser.

   Sechskant-Orientierung nach dem Vermerk in hexPrism: nach der
   internen rotateY(pi/2) liegt eine SCHLÜSSELFLÄCHE auf Z und eine ECKE
   auf Y. Die Messung berücksichtigt das. */

import {
  buildProfile, revolve, mergeGeometries, capFromProfile, hexPrism,
  threadProfile, DRAFT, SEG_VIS, SEG_FINE,
} from '../../core/index.js';

/* PP-R-Muffe: Schweißmuffe mit Konus und Einführfase, links. */
export function buildSleeve(P) {
  const xA = -P.xEnd;
  const xB = P.xSleeveEnd;
  const rSock = (x) => P.d / 2 - P.sockTaper * (x - xA);
  const rMouth = Math.max(1.0, P.rSleeve * 0.06);

  const outer = [
    { a: xA, r: P.rSleeve, fillet: rMouth, w: 0 },
    { a: xA + rMouth * 0.7, r: P.rSleeve - DRAFT * rMouth * 0.7, fillet: 0.4, w: 0 },
    { a: xB - 1.2, r: P.rSleeve, fillet: 0.5, w: 0 },
    /* Ohne Fase am Profilende: eine Fase dort reicht über xB hinaus und
       macht den gemessenen Bundring negativ. */
    { a: xB, r: P.rSleeve - 0.6, fillet: 0.3, w: 0 },
  ];
  const inner = [
    { a: xB, r: P.boreR, fillet: 0.6 },
    { a: xA + P.socket, r: P.boreR, fillet: 1.0 },
    { a: xA + P.socket, r: rSock(xA + P.socket), fillet: 1.0 },
    { a: xA + 2, r: rSock(xA + 2), fillet: 0.4 },
    { a: xA, r: P.d / 2 + P.lead, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  return { geo: revolve(profile, { axis: 'x', segments: SEG_VIS }),
           cap: capFromProfile(profile, 'x'), profile };
}

/* Messingteil: Körpersechskant SW1, Mutter­sechskant SW, Innengewinde.

   Beide Sechskante sitzen auf einem Rotationskörper, der jeweils auf
   dem INKREIS liegt (af/2) — sonst umhüllt er den Sechskant und die
   Schlüsselflächen verschwinden im Material. Das war Fall 11. */
export function buildMetal(P) {
  const xA = P.xBodyStart;
  const xNut = P.xNutStart;
  const xB = P.xEnd;
  const rIn = P.threadOD / 2;

  /* Innengewindekontur ab dem Mutteranfang. kind 'Rp': zylindrisch,
     Kuppen nach innen gerichtet. */
  const thread = threadProfile(P.threadOD, P.threadPitch, P.turns, 'Rp')
    .map((p) => ({ a: xNut + 1.2 + p.a, r: p.r, fillet: p.fillet }))
    .filter((p) => p.a <= xB - 1.0);

  /* Der Rotationskörper liegt über der Sechskantlänge auf dem Inkreis
     (afBody/2), sonst umhüllt er den Sechskant (Fall 11). Rechts davon
     ein runder Bund, der unter dem Muffendurchmesser bleibt — so zeigt
     es das Foto. */
  const rBodyIn = P.afBody / 2;

  const outer = [
    { a: xA, r: P.rSleeve * 0.90, chamfer: 0.6 },
    { a: xA + 0.8, r: rBodyIn, fillet: 0.5 },
    { a: xNut - 0.6, r: rBodyIn, fillet: 0.4 },
    { a: xNut, r: P.rCollar, fillet: 0.6 },
    { a: xB, r: P.rCollar, chamfer: 0.8 },
  ];
  const inner = [
    { a: xB, r: rIn + P.threadPitch * 0.25, chamfer: 0.9 },
    ...thread.slice().reverse(),
    { a: xNut + 1.2, r: rIn - P.threadPitch * 0.35, fillet: 0.5 },
    { a: xNut, r: P.boreR, fillet: 0.8 },
    { a: xA + 1.0, r: P.boreR, chamfer: 0.5 },
    { a: xA, r: P.boreR + 0.5, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Ein Sechskant, aus SW1. bevel = 0, weil das Eckenmaß aus SW1 folgt
     und ein Bevel es unterschreiten würde (Fall 23). SW wird nicht
     modelliert — Begründung in data.js. */
  const hexBody = hexPrism(P.afBody, Math.max(3, xNut - xA - 0.8), 0.3, 0);
  hexBody.translate(xA + 0.8, 0, 0);
  geos.push(hexBody);

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'), profile };
}
