/* K-Aqua Ventiloberteile (S. 106) — gemeinsame Bausteine.

   PROTOTYPEN: die Seite 106 bemaßt außer G (Gewinde), L = 30 beim
   Verlängerungsstück und den kg-Angaben NICHTS (LOOP-STATUS §3.22).
   Jede Zahl hier ist ASSUMPTION; der Maßstab kommt aus zwei Ankern:
     1. dem Gewinde G ¾" (Normmaß, OD 26,44) — es setzt den Foto-Maßstab,
     2. der kg-Spalte über die Massenprobe (meshVolume × Dichte).

   Bausteine: Kleeblatt-Handrad (grün, fünf Lappen), Chromknauf auf
   Rosette, Messing-Oberteil mit Sechskant, Spindel und Ventilteller. */

import {
  buildProfile, revolve, mergeGeometries, capFromProfile, hexPrism,
  threadProfile, SEG_VIS, SEG_INT, SEG_FINE,
} from '../../core/index.js';

/* Fünflappiges Handrad um Y: Grundscheibe, deren Radius über θ
   zwischen Kern und Lappenspitze pendelt. */
export function buildKleeHandrad(P) {
  const R = P.radR, rKern = R * 0.52, dicke = P.radDicke;
  const mod = (th) => {
    const lappen = Math.cos(5 * th);           // 5 Lappen
    return (R - rKern) * 0.5 * (lappen - 1);   // 0 am Lappen, −(R−rKern) in der Kerbe
  };
  const thetas = [];
  { const K = 5 * 24; for (let j = 0; j <= K; j++) thetas.push((j / K) * Math.PI * 2); }
  const y0 = P.radY;
  const profile = buildProfile([
    { a: y0, r: R * 0.14, fillet: 0 },
    { a: y0, r: R, fillet: dicke * 0.45, w: 1 },
    { a: y0 + dicke, r: R, fillet: dicke * 0.45, w: 1 },
    { a: y0 + dicke, r: R * 0.14, fillet: 0 },
  ], { segs: 3 });
  const geo = revolve(profile, { axis: 'y', thetas, mod });
  /* Nabe in der Mitte. */
  const nabe = revolve(buildProfile([
    { a: y0 - 1, r: P.spindelR + 0.4, fillet: 0 },
    { a: y0 - 1, r: R * 0.16, fillet: 0.8 },
    { a: y0 + dicke + 2.5, r: R * 0.16, chamfer: 1.0 },
    { a: y0 + dicke + 2.5, r: P.spindelR + 0.4, fillet: 0 },
  ], { segs: 3 }), { axis: 'y', segments: SEG_INT });
  return { geo: mergeGeometries([geo, nabe]), cap: capFromProfile(profile, 'y') };
}

/* Messing-Oberteil um Y: Ventilteller unten (mit EPDM-Ring als
   eigenem Teil), Spindelschaft, Sechskant-Sockel mit G-Außengewinde. */
export function buildOberteil(P) {
  const geos = [];
  /* Gewindesockel: AG G von yG0 bis yG1, darüber Sechskant. */
  const gew = threadProfile(P.threadOD, P.threadPitch, P.turns, 'G')
    .map((q) => ({ a: P.yG0 + q.a, r: q.r, fillet: q.fillet }))
    .filter((q) => q.a <= P.yG1);
  const sockel = buildProfile([
    { a: P.yG0, r: P.threadOD / 2 - 0.8, chamfer: 0.5 },
    ...gew,
    { a: P.yG1, r: P.threadOD / 2 - 0.3, fillet: 0.3 },
    { a: P.yG1, r: P.spindelR + 0.6, fillet: 0.4 },
    { a: P.yHex1 + 2, r: P.spindelR + 0.6, fillet: 0.3 },
    { a: P.yHex1 + 2, r: P.spindelR, fillet: 0 },
    { a: P.yG0, r: P.spindelR, fillet: 0 },
  ], { segs: 4 });
  geos.push(revolve(sockel, { axis: 'y', segments: SEG_VIS }));
  const hex = hexPrism(P.hexAf, P.yHex1 - P.yG1, 0.4, 0);
  hex.rotateZ(Math.PI / 2);
  hex.translate(0, P.yG1, 0);
  geos.push(hex);
  /* Spindel bis zur Handrad-Nabe. */
  const spindel = buildProfile([
    { a: P.yHex1, r: P.spindelR, fillet: 0 },
    { a: P.ySpindelTop, r: P.spindelR, chamfer: 0.6 },
    { a: P.ySpindelTop, r: 0.02, fillet: 0 },
    { a: P.yHex1, r: 0.02, fillet: 0 },
  ], { segs: 3 });
  geos.push(revolve(spindel, { axis: 'y', segments: SEG_INT }));
  /* Ventilteller unten. */
  const teller = buildProfile([
    { a: P.yG0, r: P.spindelR, fillet: 0 },
    { a: P.yTeller + P.tellerH, r: P.spindelR + 0.6, fillet: 0.4 },
    { a: P.yTeller + P.tellerH, r: P.tellerR, fillet: 0.6 },
    { a: P.yTeller, r: P.tellerR, chamfer: 0.8 },
    { a: P.yTeller, r: 0.02, fillet: 0 },
    { a: P.yG0, r: 0.02, fillet: 0 },
  ], { segs: 3 });
  geos.push(revolve(teller, { axis: 'y', segments: SEG_INT }));
  return { geo: mergeGeometries(geos), cap: capFromProfile(sockel, 'y') };
}

/* EPDM-Dichtscheibe unter dem Teller. */
export function buildTellerDichtung(P) {
  const profile = buildProfile([
    { a: P.yTeller - P.dichtH, r: 0.02, fillet: 0 },
    { a: P.yTeller - P.dichtH, r: P.tellerR - 0.4, fillet: 0.4 },
    { a: P.yTeller, r: P.tellerR - 0.4, fillet: 0.2 },
    { a: P.yTeller, r: 0.02, fillet: 0 },
  ], { segs: 2 });
  return { geo: revolve(profile, { axis: 'y', segments: SEG_INT }),
           cap: capFromProfile(profile, 'y') };
}

/* Chromknauf auf Rosette, um Y. profilArt 'zylinder' (light) oder
   'konus' (heavy). */
export function buildChromKnauf(P) {
  const R = P.rosR, h = P.knaufH, r0 = P.knaufR;
  const kn = P.art === 'konus'
    ? [
        { a: P.yRos + P.rosH, r: r0 * 0.72, fillet: 0.8 },
        { a: P.yRos + P.rosH + h * 0.72, r: r0, fillet: 2.2 },
        { a: P.yRos + P.rosH + h, r: r0 * 0.86, fillet: 2.0 },
      ]
    : [
        { a: P.yRos + P.rosH, r: r0, fillet: 0.8 },
        { a: P.yRos + P.rosH + h - 1.5, r: r0 * 0.97, fillet: 1.6 },
        { a: P.yRos + P.rosH + h, r: r0 * 0.88, fillet: 1.4 },
      ];
  /* HOHLKÖRPER: der erste Wurf rechnete den Knauf massiv und wog
     +86 % gegen die kg-Spalte — reale Chromknäufe sind dünnwandige
     Drehteile. Wand 2,8 mm (kalibriert: 2,0 wog −24 %, massiv +86 %). */
  const w = 2.8;
  const innen = kn.slice().reverse().map((q) => ({ a: q.a - w * 0.7, r: Math.max(0.4, q.r - w), fillet: q.fillet }));
  const profile = buildProfile([
    { a: P.yRos, r: R, fillet: P.rosH * 0.4 },
    { a: P.yRos + P.rosH, r: R, fillet: P.rosH * 0.45 },
    ...kn,
    { a: P.yRos + P.rosH + h - w, r: 0.02, fillet: 0 },
    ...innen.slice(1).map((q) => ({ ...q, a: q.a - 0 })),
    { a: P.yRos + P.rosH - w, r: Math.max(1, P.knaufR - w), fillet: 0.4 },
    { a: P.yRos + P.rosH - w, r: R - w, fillet: 0.4 },
    { a: P.yRos, r: R - w, fillet: 0 },
  ], { segs: 4 });
  return { geo: revolve(profile, { axis: 'y', segments: SEG_VIS }),
           cap: capFromProfile(profile, 'y') };
}

/* Gewinde-Unterteil der UP-Ventile: kurzes AG-Rohr mit O-Ring-Nut. */
export function buildUPUnterteil(P) {
  const gew = threadProfile(P.threadOD, P.threadPitch, P.turns, 'G')
    .map((q) => ({ a: P.yU0 + q.a, r: q.r, fillet: q.fillet }))
    .filter((q) => q.a <= P.yRos - 1);
  const profile = buildProfile([
    { a: P.yU0, r: P.threadOD / 2 - 0.8, chamfer: 0.5 },
    ...gew,
    { a: P.yRos - 1, r: P.threadOD / 2 - 0.3, fillet: 0.3 },
    { a: P.yRos - 1, r: P.boreR, fillet: 0 },
    { a: P.yU0, r: P.boreR, fillet: 0 },
  ], { segs: 4 });
  return { geo: revolve(profile, { axis: 'y', segments: SEG_VIS }),
           cap: capFromProfile(profile, 'y') };
}
