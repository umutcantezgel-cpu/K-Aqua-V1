/* K-Aqua T-Stück-Familie — Kontur.

   Belastungstest für branchJoin. Aufbau in drei Teilen, alle drei
   Rotationskörper oder Loft-Bänder — kein CSG:

     1. Durchgang: Rotationskörper um X, mit zwei Muffenbohrungen.
        Das ist geometrisch dasselbe wie die Muffe.
     2. Abzweig: Rotationskörper um Y, taucht in den Durchgang ein.
     3. Kehle: das Loft-Band aus branchJoin(), das beide tangential
        verbindet.

   BEKANNTE GRENZE, ausdrücklich: an der Durchdringung überlappen die
   Innenflächen von Durchgang und Abzweig. Von außen unsichtbar; im
   Halbschnitt sieht man an der Kehle zwei Flächen statt einer. Das ist
   der Preis dafür, ohne CSG zu arbeiten — eine boolesche Vereinigung
   wäre die einzige saubere Lösung und ist im Auftrag ausgeschlossen.
   Alle Maße sind davon unberührt. */

import {
  DRAFT, SEG_FINE, SEG_VIS, branchJoin, buildProfile, capFromProfile,
  mergeGeometries, mirrorProfile, revolve
} from '../../core/index.js';

/* Durchgang: identischer Aufbau wie die Muffe, nur ohne mittleren
   Anschlag — im T-Stück trifft der Abzweig auf die Mitte.

   Exportiert, weil die Gewinde-T-Stücke (products/_teethread/) denselben
   Durchgang tragen. Zweimal geschrieben würde er driften (Fall 32). */
export function runProfile(P) {
  const ro = P.rOut;
  const rSock = (x) => P.d / 2 - P.sockTaper * (P.half - x);
  /* Der Aufrufer kann die Lage des Mundlochbunds vorgeben. Die
     Gewinde-T-Stücke tun das, weil ihr Maßtest genau dort D abtastet —
     die Formel zweimal zu schreiben hieße, sie driften zu lassen
     (Fall 32). */
  const xBell = P.xBell ?? (P.half - Math.max(3, 0.10 * P.socket));
  const bellRise = Math.min(0.35, P.wallFitting * 0.08);
  const rBarrel = ro - bellRise;

  const outer = [
    { a: 0, r: rBarrel + 0.09, fillet: 0.1 },
    { a: 0.5, r: rBarrel, fillet: 0.35 },
    { a: xBell - 1.5, r: rBarrel - DRAFT * (xBell - 1.5), fillet: 2.2 },
    { a: xBell, r: ro, fillet: 1.0 },
    { a: P.half, r: ro - DRAFT * (P.half - xBell), chamfer: Math.min(1.4, P.wallFitting * 0.4) },
  ];
  const inner = [
    { a: 0, r: P.boreR, fillet: 0.5 },
    { a: P.half - P.socket, r: P.boreR, fillet: 1.2 },
    { a: P.half - P.socket, r: rSock(P.half - P.socket), fillet: 1.2 },
    { a: P.half - 2, r: rSock(P.half - 2), fillet: 0.4 },
    { a: P.half, r: P.d / 2 + P.lead, fillet: 0 },
  ];
  return { profile: buildProfile(mirrorProfile(outer, inner), { segs: 4 }), rBarrel };
}

export function buildTee(P) {
  const { profile, rBarrel } = runProfile(P);
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Kehle zuerst: sie liefert insertDepth, also wie weit der
     Abzweigstutzen in den Durchgang eintauchen muss. */
  const kehle = branchJoin({
    mainR: rBarrel, branchR: P.rOut, filletR: P.filletR,
    angle: 90, segments: SEG_VIS, uSegs: 6,
  });
  // branchJoin baut um +X als Hauptachse und legt den Abzweig in die
  // XY-Ebene. Der Durchgang liegt hier auf X, der Abzweig soll auf +Y —
  // das ist genau die Vorgabe angle = 90.
  geos.push(kehle.geo);

  /* Abzweigstutzen: Rotationskörper um Y, von der Eintauchtiefe bis zur
     Stirnfläche bei y = branch. */
  const yStart = -kehle.insertDepth;
  const yEnd = P.branch;
  const rSockB = (y) => P.d / 2 - P.sockTaper * (yEnd - y);
  const yBell = yEnd - Math.max(3, 0.10 * P.socket);
  const bellRise = Math.min(0.35, P.wallFitting * 0.08);
  const rB = P.rOut - bellRise;

  const bOuter = [
    { a: yStart, r: rB, fillet: 0 },
    { a: yBell - 1.5, r: rB - DRAFT * (yBell - 1.5 - yStart) * 0.35, fillet: 2.0 },
    { a: yBell, r: P.rOut, fillet: 1.0 },
    { a: yEnd, r: P.rOut - DRAFT * (yEnd - yBell), chamfer: Math.min(1.4, P.wallFitting * 0.4) },
  ];
  const bInner = [
    { a: yEnd, r: P.d / 2 + P.lead, fillet: 0 },
    { a: yEnd - 2, r: rSockB(yEnd - 2), fillet: 0.4 },
    { a: yEnd - P.socket, r: rSockB(yEnd - P.socket), fillet: 1.2 },
    { a: yEnd - P.socket, r: P.boreR, fillet: 1.2 },
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
    cap: mergeGeometries([capFromProfile(profile, 'x')].concat(kehle.cap ? [kehle.cap] : [])),
    insertDepth: kehle.insertDepth,
  };
}
