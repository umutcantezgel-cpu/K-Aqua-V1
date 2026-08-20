/* K-Aqua Muffe — Kontur.

   Ein Teil, ein Rotationskörper: Außenkontur mit Formtrennnaht in der
   Mitte und 1° Entformung zu beiden Stirnflächen, Innenkontur aus zwei
   konischen Muffenbohrungen mit Einführfase und mittlerem Anschlag.
   Gespiegelt über mirrorProfile — eine Hälfte gebaut.

   Kein CSG. Kein eigenes Geometrie-Grundwerkzeug: kommt alles aus dem
   Core. Genau das ist der Test. */

import {
  buildProfile, mirrorProfile, revolve, arcPts, mergeGeometries,
  capFromProfile, DRAFT, SEG_VIS, SEG_FINE,
} from '../../core/index.js';

export function buildBody(P) {
  const ro = P.OD / 2;
  const rSock = (x) => P.d / 2 - P.sockTaper * (P.xEnd - x); // verjüngt nach innen
  const xBell = P.xEnd - Math.max(3, 0.10 * P.socket);       // Bund am Mundloch

  /* Außen: von der Formteilungsebene (a = 0) zur Stirnfläche.
     0,09 mm Grat auf der Naht — an einem Spritzgussteil ist die Naht
     sichtbar, und sie fängt Licht. */
  /* D ist das größte Maß der Muffe und liegt auf dem Bund am Mundloch.
     Der Zylinder dazwischen sitzt um bellRise tiefer — im Produktfoto
     als umlaufende Stufe kurz vor der Stirnfläche zu sehen. */
  const bellRise = Math.min(0.35, P.wallFitting * 0.08);
  const rBarrel = ro - bellRise;
  const outer = [
    { a: 0, r: rBarrel + 0.09, fillet: 0.1 },
    { a: 0.5, r: rBarrel, fillet: 0.35 },
    { a: xBell - 1.5, r: rBarrel - DRAFT * (xBell - 1.5), fillet: 2.2 },
    { a: xBell, r: ro, fillet: 1.0 },
    { a: P.xEnd, r: ro - DRAFT * (P.xEnd - xBell), chamfer: Math.min(1.4, P.wallFitting * 0.4) },
  ];

  /* Innen: Anschlagfläche, Durchgang, Muffenkonus, Einführfase. */
  const inner = [
    { a: 0, r: P.boreR, fillet: 0.5 },
    { a: P.xStop, r: P.boreR, fillet: 0.6 },
    { a: P.xStop, r: rSock(P.xStop), fillet: 1.2 },
    { a: P.xEnd - 2, r: rSock(P.xEnd - 2), fillet: 0.4 },
    { a: P.xEnd, r: P.d / 2 + P.lead, fillet: 0 },
  ];

  const profile = buildProfile(mirrorProfile(outer, inner), { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Auswerferstift-Marken: drei flache Kreise, 0,1 mm vertieft, auf der
     Unterseite — ohne sie sieht das Teil nach CAD-Viewer aus. */
  for (const x of [-P.xEnd * 0.55, 0, P.xEnd * 0.55]) {
    const disc = revolve(
      buildProfile([
        { a: 0, r: 0, fillet: 0 },
        { a: 0, r: P.emR, chamfer: 0.25 },
        { a: 0.1, r: P.emR, fillet: 0.1 },
        { a: 0.1, r: 0, fillet: 0 },
      ], { segs: 3 }),
      { axis: 'y', segments: SEG_FINE }
    );
    disc.rotateX(Math.PI);
    disc.translate(x, -(rBarrel - 0.05), 0);
    geos.push(disc);
  }

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'), profile };
}
