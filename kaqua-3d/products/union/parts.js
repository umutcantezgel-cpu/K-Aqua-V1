/* K-Aqua Verschraubung — Kontur.

   Vier Teile nach der dritten Deutung (data.js):
     1. Gewindeteil links (l1): Schweißmuffe, geriffelte Sichtzone,
        glatter Gewindeschaft unter der Mutter
     2. Überwurfmutter (l), mittig, geriffelt
     3. Muffenstück rechts (L − l1): Bund und Schweißmuffe
     4. O-Ring an der Fuge, unter der Mutter

   Kein CSG. Das Gewinde zwischen Mutter und Gewindeteil wird nicht
   modelliert: es liegt vollständig verdeckt, auch im Halbschnitt sieht
   man dort nur die Fügefläche. Ein Gewinde, das niemand sehen kann,
   kostet Dreiecke ohne Gegenwert.

   Die Riffelung der Sichtstutzen steuert das w-Feld der Profilpunkte:
   w = 1 nur auf der Sichtzone, der verdeckte Schaft bleibt glatt. */

import {
  buildProfile, revolve, mergeGeometries, capFromProfile, arcPts,
  knurl, DRAFT, SEG_VIS, SEG_INT, SEG_FINE,
} from '../../core/index.js';

/* Gewindeteil: von der linken Stirn (Muffe) bis unter die Mutter. */
export function buildStub(P) {
  const xA = -P.xEnd;                    // Mundloch links
  const xShow = xA + P.stubShow;         // linke Mutterkante
  const xB = P.xNutB;                    // Stub-Stirn (Fuge)
  const rSock = (x) => P.d / 2 - P.sockTaper * (x - xA);
  const kn = knurl(P.rStub, P.stubShow, P.stubRibs, P.stubRibDepth);

  const outer = [
    { a: xA, r: P.rStub - 0.5, chamfer: 0.7, w: 0 },
    { a: xA + 1.2, r: P.rStub, fillet: 0.5, w: 1 },
    { a: xShow - 0.8, r: P.rStub, fillet: 0.4, w: 1 },
    /* Stufe auf den Gewindeschaft — verdeckt, deshalb schlicht. */
    { a: xShow, r: Math.min(P.rStub, P.rThread) - 0.3, fillet: 0.3, w: 0 },
    { a: xShow + 1.0, r: P.rThread, fillet: 0.3, w: 0 },
    { a: xB - 0.6, r: P.rThread, fillet: 0, w: 0 },
    { a: xB, r: P.rThread - 0.5, chamfer: 0.5, w: 0 },
  ];
  const inner = [
    { a: xB, r: P.boreR, fillet: 0 },
    /* Netzpunkt auf halber Schaftlänge: gerade Strecke, sonst leer. */
    { a: (xB + xA + P.socket) / 2, r: P.boreR, fillet: 0 },
    { a: xA + P.socket, r: P.boreR, fillet: 0.8 },
    { a: xA + P.socket, r: rSock(xA + P.socket), fillet: 1.0 },
    { a: xA + 2, r: rSock(xA + 2), fillet: 0.4 },
    { a: xA, r: P.d / 2 + P.lead, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geo = revolve(profile, { axis: 'x', thetas: kn.thetas, mod: kn.mod, segments: SEG_VIS });
  return { geo, cap: capFromProfile(profile, 'x'), profile };
}

/* Überwurfmutter: Hülse mit Riffelung, Zugbund an der RECHTEN Seite —
   dort greift sie hinter den Bund des Muffenstücks. */
export function buildNut(P) {
  const xA = P.xNutA;
  const xB = P.xNutB;
  const kn = knurl(P.rOut, P.nutLen, P.ribCount, P.ribDepth);
  const rMouth = Math.max(1.2, P.rOut * 0.05);
  const rCollar = Math.min(P.rThread, P.rStub) * 0.92;

  const outer = [
    { a: xA, r: P.rOut - 0.4, fillet: rMouth * 0.5, w: 0 },
    { a: xA + rMouth * 0.6, r: P.rOut, fillet: 0.5, w: 1 },
    { a: xB - 1.2, r: P.rOut, fillet: 0.5, w: 1 },
    { a: xB, r: P.rOut - 0.5, chamfer: 0.6, w: 0 },
  ];
  const inner = [
    { a: xB, r: rCollar, chamfer: 0.5 },
    { a: xB - 1.6, r: rCollar, fillet: 0.6 },
    { a: xB - 2.5, r: P.rThread + 0.25, fillet: 0.8 },
    { a: xA, r: P.rThread + 0.25, fillet: 0.5 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geo = revolve(profile, { axis: 'x', thetas: kn.thetas, mod: kn.mod, segments: SEG_VIS });
  return { geo, cap: capFromProfile(profile, 'x'), profile };
}

/* Muffenstück rechts: Bund an der Fuge, dann Schweißmuffe. Die
   Sichtzone trägt dieselbe feine Riffelung wie der Stub (beide Bilder
   zeigen sie auf beiden Stutzen). */
export function buildTail(P) {
  const xGrip = P.xNutB - 2.2;           // Bund greift unter die Mutter
  const xShow = P.xNutB;                 // rechte Mutterkante
  const xB = P.xEnd;                     // Mundloch rechts
  const rSock = (x) => P.d / 2 - P.sockTaper * (xB - x);
  const kn = knurl(P.rStub, P.tailShow, P.stubRibs, P.stubRibDepth);
  const rFlange = Math.min(P.rThread, P.rStub) * 0.90;

  const outer = [
    { a: xGrip, r: rFlange - 0.6, chamfer: 0.5, w: 0 },
    { a: xGrip + 0.5, r: rFlange, fillet: 0.4, w: 0 },
    { a: xShow + 0.4, r: rFlange, fillet: 0.4, w: 0 },
    { a: xShow + 1.4, r: P.rStub, fillet: 0.5, w: 1 },
    { a: xB - 1.6, r: P.rStub - DRAFT * (xB - xShow) * 0.4, fillet: 0.5, w: 1 },
    { a: xB, r: P.rStub - 0.6, chamfer: 0.7, w: 0 },
  ];
  const inner = [
    { a: xB, r: P.d / 2 + P.lead, fillet: 0 },
    { a: xB - 2, r: rSock(xB - 2), fillet: 0.4 },
    { a: xB - P.socket, r: rSock(xB - P.socket), fillet: 1.0 },
    { a: xB - P.socket, r: P.boreR, fillet: 0.8 },
    { a: xGrip + 1.0, r: P.boreR, chamfer: 0.5 },
    { a: xGrip, r: P.boreR + 0.4, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', thetas: kn.thetas, mod: kn.mod, segments: SEG_VIS })];

  /* Auswerfermarke auf der Sichtzone. */
  const disc = revolve(buildProfile([
    { a: 0, r: 0, fillet: 0 },
    { a: 0, r: P.emR, chamfer: 0.2 },
    { a: 0.09, r: P.emR, fillet: 0.09 },
    { a: 0.09, r: 0, fillet: 0 },
  ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
  disc.rotateX(Math.PI);
  disc.translate((xShow + xB) / 2, -(P.rStub - P.stubRibDepth - 0.05), 0);
  geos.push(disc);

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'), profile };
}

/* O-Ring an der Fuge: Kreisprofil um X, unter der Mutter. */
export function buildORing(P) {
  const r = P.oRingD / 2;
  const pts = [];
  arcPts(pts, P.oRingX, P.oRingR, r, 0, Math.PI * 2, 20, { fillet: 0 });
  const profile = buildProfile(pts, { segs: 2 });
  return { geo: revolve(profile, { axis: 'x', segments: SEG_INT }),
           cap: capFromProfile(profile, 'x') };
}
