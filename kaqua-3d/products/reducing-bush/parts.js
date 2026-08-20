/* K-Aqua Reduzierbuchse — Kontur.

   Ein Rotationskörper: außen Zapfen Ø d mit Bund Ø D, innen eine
   konische Schweißmuffe für d1 mit Einführfase, dahinter der
   Durchgang. Kein CSG.

   Die Bohrung ist die engste Stelle des ganzen Systems — deshalb
   trägt sie hier die Sichtsegmentzahl, nicht die Innensegmentzahl:
   im Halbschnitt ist sie das, worauf man schaut. */

import {
  buildProfile, revolve, mergeGeometries, capFromProfile,
  DRAFT, SEG_VIS, SEG_FINE,
} from '../../core/index.js';

export function buildBush(P) {
  const xA = -P.xEnd;               // Zapfenstirn, versinkt in der d-Muffe
  const xB = P.xEnd;                // Mundloch des d1-Kragens
  const xStep = xA + P.spigotLenUsed;   // Übergang Zapfen → Kragen

  const rSock = (x) => P.rSockIn - P.sockTaper * (xB - x);
  /* Der Kragen kann dicker ODER dünner als der Zapfen sein: bei
     d25/d20 ist D = 29 > d = 25, bei d63/d20 ist D = 34 < d = 63.
     Die Kontur muss beide Richtungen tragen. */
  const stepUp = P.rCollar > P.rSpigot;

  const outer = [
    { a: xA, r: P.rSpigot - 0.5, chamfer: 0.9 },        // Einführfase am Zapfen
    { a: xA + 1.4, r: P.rSpigot, fillet: 0.4 },
    { a: xStep - 0.8, r: P.rSpigot - DRAFT * (xStep - 0.8 - xA), fillet: 0.5 },
    { a: xStep, r: P.rCollar, fillet: stepUp ? 1.0 : Math.min(1.4, P.restwand * 0.4) },
    { a: xB, r: P.rCollar - DRAFT * P.collarLen, chamfer: Math.min(1.2, P.restwand * 0.35) },
  ];
  const inner = [
    { a: xB, r: P.rSockIn + P.lead, fillet: 0 },
    { a: xB - 2, r: rSock(xB - 2), fillet: 0.4 },
    { a: xB - P.socketIn, r: rSock(xB - P.socketIn), fillet: 1.0 },
    { a: xB - P.socketIn, r: P.boreR, fillet: 0.8 },
    { a: xA + 1.2, r: P.boreR, chamfer: 0.6 },
    { a: xA, r: P.boreR + 0.6, fillet: 0 },
  ];

  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Zwei Auswerfermarken auf dem Bund. */
  for (const th of [0, Math.PI]) {
    const disc = revolve(buildProfile([
      { a: 0, r: 0, fillet: 0 },
      { a: 0, r: P.emR, chamfer: 0.2 },
      { a: 0.08, r: P.emR, fillet: 0.08 },
      { a: 0.08, r: 0, fillet: 0 },
    ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
    disc.rotateX(Math.PI);
    const rr = P.rCollar - 0.04;
    disc.translate(xStep + P.collarLen * 0.5, rr * Math.cos(th), rr * Math.sin(th));
    geos.push(disc);
  }

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'), profile };
}
