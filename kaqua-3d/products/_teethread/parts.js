/* K-Aqua T-Stück 90° mit Gewinde im Abzweig — Konturen.

   Drei bis vier Teile, kein CSG:

     1. PP-R-Körper: Durchgang (Rotationskörper um X) + Kehle
        (branchJoin) + Abzweigstutzen (Rotationskörper um Y), der oben
        auf die Aufnahmebohrung für das Messingteil endet.
     2. Messingteil: Ring mit Innengewinde (Rp) oder Zapfen mit
        Sechskant und kegeligem Außengewinde (R).

   Der Durchgang kommt aus ../_tee/parts.js — derselbe Körper wie beim
   reinen T-Stück, nur der Abzweig unterscheidet sich.

   BEKANNTE GRENZE, wie beim T-Stück: an der Durchdringung überlappen
   die Innenflächen von Durchgang und Abzweig. Von außen unsichtbar, im
   Halbschnitt an der Kehle als zwei Flächen sichtbar. Preis dafür, ohne
   CSG zu arbeiten. Alle Maße sind davon unberührt. */

import {
  DRAFT, SEG_FINE, SEG_VIS, branchJoin, buildProfile, capFromProfile,
  hexPrism, mergeGeometries, revolve, threadProfile, threadRing
} from '../../core/index.js';
import { runProfile } from '../_tee/parts.js';

/* 1 · PP-R-Körper. */
export function buildBody(P) {
  const { profile, rBarrel } = runProfile(P);
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  const kehle = branchJoin({
    mainR: rBarrel, branchR: P.rOut, filletR: P.filletR,
    angle: 90, segments: SEG_VIS, uSegs: 6,
  });
  geos.push(kehle.geo);

  /* Abzweigstutzen um Y, von der Eintauchtiefe bis ppTop. Oben sitzt
     nicht die Schweißmuffe, sondern die Aufnahmebohrung des
     Messingteils — deshalb keine Einführfase und kein Muffenkonus. */
  const yStart = -kehle.insertDepth;
  const yEnd = P.ppTop;
  const yBell = yEnd - Math.max(3, 0.10 * P.rOut);
  const bellRise = Math.min(0.35, P.wallFitting * 0.08);
  const rB = P.rOut - bellRise;
  const rSeat = P.brassR;

  const bOuter = [
    { a: yStart, r: rB, fillet: 0 },
    { a: yBell - 1.5, r: rB - DRAFT * (yBell - 1.5 - yStart) * 0.35, fillet: 2.0 },
    { a: yBell, r: P.rOut, fillet: 1.0 },
    { a: yEnd, r: P.rOut - DRAFT * (yEnd - yBell), chamfer: Math.min(1.2, P.wallFitting * 0.35) },
  ];
  const bInner = [
    /* Sitz für das Messingteil: zylindrisch, mit Absatz auf die
       Rohrbohrung. Der Absatz trägt den Ring axial. */
    { a: yEnd, r: rSeat, chamfer: 0.6 },
    { a: P.brassBottom + 0.4, r: rSeat, fillet: 0.5 },
    { a: P.brassBottom, r: Math.max(P.boreR, P.threadCore / 2 - 0.6), fillet: 0.6 },
    { a: yStart, r: P.boreR, fillet: 0 },
  ];
  const bProfile = buildProfile([...bOuter, ...bInner], { segs: 4 });
  geos.push(revolve(bProfile, { axis: 'y', segments: SEG_VIS }));

  /* Auswerferstift-Marken auf der Unterseite des Durchgangs. */
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
    cap: mergeGeometries([capFromProfile(profile, 'x'), capFromProfile(bProfile, 'y')]
      .concat(kehle.cap ? [kehle.cap] : [])),
    insertDepth: kehle.insertDepth,
  };
}

/* 2a · Messingring mit zylindrischem Innengewinde Rp.
   Der Ring selbst steht seit dem 24.08.2026 im Core (threadRing) — er ist
   reine Kerngeometrie und wurde vom Anschlussbogen ein zweites Mal
   gebraucht (Fall 32). Hier bleibt nur die Zuordnung der P-Werte.

   Sichtbar ist von außen nur der schmale goldene Kreis an der
   Stirnfläche. */
export function buildBrassRing(P) {
  return threadRing({
    a0: P.brassBottom, a1: P.brassTop, rOuter: P.brassR,
    od: P.threadOD, pitch: P.threadPitch, turns: P.turns,
    coreDia: P.threadCore, axis: 'y', segs: SEG_VIS,
  });
}

/* 2b · Messingzapfen mit Sechskant und kegeligem Außengewinde R.

   Der Rotationskörper liegt über der Sechskantlänge auf dem INKREIS
   (af/2) — läge er auf dem Umkreis, umhüllte er den Sechskant und die
   Schlüsselflächen verschwänden im Material (Fall 11).

   ASSUMPTION Messebene: das Nennmaß liegt am Gewindeanfang, von dort
   verjüngt sich das Gewinde 1:16 zur Spitze. Die Tabelle führt keine
   Einschraublänge. */
export function buildBrassSpigot(P) {
  const yA = P.brassBottom;
  const yPP = P.ppTop;
  const yRingB = yPP + P.bundRing;      // schmaler Bundring statt Sechskant (M7)
  const yTip = P.threadTip;

  const thread = threadProfile(P.threadOD, P.threadPitch, P.turns, 'R')
    .map((p) => ({ a: yRingB + 0.8 + p.a, r: p.r, fillet: p.fillet }))
    .filter((p) => p.a <= yTip - 0.8);

  const outer = [
    { a: yA, r: P.brassR - 0.15, chamfer: 0.5 },
    { a: yPP - 0.6, r: P.brassR - 0.15, fillet: 0.4 },
    { a: yPP + 0.2, r: P.threadOD / 2 + 0.8, fillet: 0.3 },
    { a: yRingB, r: P.threadOD / 2 + 0.8, fillet: 0.3 },
    /* Gewindeauslauf auf dem Kerndurchmesser, dann die Kontur. Kein
       Punkt auf demselben a wie die erste Kuppe (Fall 23). */
    { a: yRingB + 0.35, r: P.threadOD / 2 - P.threadH, chamfer: 0.4 },
    ...thread,
    { a: yTip, r: P.threadOD / 2 - P.threadH - 0.3, chamfer: 0.4 },
  ];
  const inner = [
    { a: yTip, r: P.boreR * 0.92, chamfer: 0.6 },
    { a: yA + 0.8, r: P.boreR * 0.92, fillet: 0.5 },
    { a: yA, r: P.boreR * 0.92 + 0.4, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geos = [revolve(profile, { axis: 'y', segments: SEG_VIS })];


  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'y') };
}
