/* K-Aqua Stopfen — Kontur.

   Ein Rotationskörper plus vier Kerben plus ein O-Ring. Die Kerben sind
   KEIN CSG: sie entstehen als radiale Modulation über grooveMod, also
   als Einbuchtung der Mantelfläche an vier Winkelpositionen — dasselbe
   Verfahren wie die Riffelung der Überwurfmutter, nur mit vier statt
   zwölf Positionen und größerer Breite.

   Vorlage für Gewinde und Bund: products/adaptor-socket-male-thread. */

import {
  buildProfile, revolve, mergeGeometries, capFromProfile, threadProfile,
  grooveMod, thetaSamples, arcPts, DRAFT, SEG_VIS, SEG_FINE,
} from '../../core/index.js';

/* Der Körper. a = 0 ist die Gewindestirn, a = len das Kerbenende. */
export function buildBody(P) {
  const xThreadEnd = P.threadLen;
  const xGrooveEnd = xThreadEnd + P.grooveLen;
  const xShoulder = xGrooveEnd + Math.max(1.2, P.wall * 0.4);
  const xEnd = P.len;

  const thread = threadProfile(P.threadOD, P.threadPitch, P.turns, 'G')
    .map((p) => ({ a: p.a, r: p.r, fillet: p.fillet }))
    .filter((p) => p.a <= xThreadEnd);

  const outer = [
    /* Auf der Achse beginnen — sonst ist das Profil nicht geschlossen
       und der Revolve baut einen Kegel statt einer Stirnfläche. */
    { a: 0, r: 0, fillet: 0 },
    { a: 0, r: P.rThread * 0.93, chamfer: 0.8 },          // Einführfase
    ...thread,
    { a: xThreadEnd, r: P.rThread - P.threadPitch * 0.15, fillet: 0.4 },
    // O-Ring-Nut: Grund liegt unter dem Gewindekern
    { a: xThreadEnd + 0.6, r: P.oRingR - P.oRingD * 0.3, fillet: 0.5 },
    { a: xGrooveEnd - 0.6, r: P.oRingR - P.oRingD * 0.3, fillet: 0.5 },
    { a: xGrooveEnd, r: P.rThread - P.threadPitch * 0.15, fillet: 0.4 },
    { a: xShoulder, r: P.rOut, fillet: Math.min(1.4, P.wall * 0.45) },
    // 1° Entformung zum Kerbenende, Formtrennnaht in der Körpermitte
    { a: (xShoulder + xEnd) / 2, r: P.rOut + 0.09, fillet: 0.1, w: 1 },
    { a: xEnd - 1.0, r: P.rOut - DRAFT * (xEnd - xShoulder), fillet: 0.6, w: 1 },
    { a: xEnd, r: P.rOut - DRAFT * (xEnd - xShoulder) - 0.8, chamfer: 0.5, w: 1 },
  ];

  /* Innen: die Bohrung endet vor der Gewindestirn — der Stopfen ist
     geschlossen, sonst dichtet er nicht. */
  /* Der Bohrungsgrund liegt bei xBore. Ein großzügiger Fillet macht ihn
     gewölbt — ein flacher Grund fällt beim Spritzguss ein. */
  const xBore = P.xBore;
  const inner = [
    { a: xEnd, r: P.boreR + 0.6, fillet: 0 },
    { a: xEnd - 1.2, r: P.boreR, chamfer: 0.6 },
    { a: xBore, r: P.boreR, fillet: Math.min(P.boreR * 0.5, P.wall * 1.2) },
    { a: xBore, r: 0, fillet: 0 },
  ];

  const profile = buildProfile([...outer, ...inner], { segs: 4 });

  /* Vier Kerben am unteren Rand. w = 1 an den Punkten der Mantelfläche
     lässt die Modulation nur dort greifen — Gewinde und O-Ring-Nut
     bleiben rund. */
  const mod = grooveMod(P.notchCount, P.notchWidth * 0.6, P.notchDepth, P.rOut);
  const thetas = thetaSamples(P.notchCount, mod.halfAng, 5, 7);
  const geos = [revolve(profile, { axis: 'x', thetas, mod, segments: SEG_VIS })];

  /* Auswerfermarke auf der Schulter. */
  const disc = revolve(buildProfile([
    { a: 0, r: 0, fillet: 0 },
    { a: 0, r: P.emR, chamfer: 0.2 },
    { a: 0.09, r: P.emR, fillet: 0.09 },
    { a: 0.09, r: 0, fillet: 0 },
  ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
  disc.rotateX(Math.PI);
  disc.translate(xShoulder + (xEnd - xShoulder) * 0.35, -(P.rOut - 0.04), 0);
  geos.push(disc);

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'),
           profile, xThreadEnd, xGrooveEnd, xShoulder, xBore };
}

/* O-Ring in der Nut. Torus als Rotationskörper: Kreisprofil um X. */
export function buildORing(P) {
  const xMid = P.threadLen + P.grooveLen / 2;
  const r = P.oRingD / 2;
  const pts = [];
  arcPts(pts, xMid, P.oRingR, r, 0, Math.PI * 2, 20, { fillet: 0 });
  const profile = buildProfile(pts, { segs: 2 });
  return { geo: revolve(profile, { axis: 'x', segments: SEG_VIS }),
           cap: capFromProfile(profile, 'x') };
}
