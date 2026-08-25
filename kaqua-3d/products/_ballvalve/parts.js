/* K-Aqua Kugelhähne — die INNEREIEN, gemeinsam für alle Bauarten.

   Der Katalog führt zwei Kugelhähne, die von außen nichts miteinander
   zu tun haben: die Verschraubungsbauart mit zwei Überwurfmuttern
   (AQ852) und den einteiligen Korpus mit Messingkugel und Stahlhebel
   (AQ850). INNEN sind sie dasselbe Gerät — Kugel, zwei PTFE-Sitze,
   Spindel, O-Ringe.

   Diese vier Funktionen standen bis zum 24.08.2026 in
   ball-valve-pp/parts.js zwischen den gehäusespezifischen Teilen. Sie
   sind hierher gezogen, unverändert Zeile für Zeile, weil ein zweites
   Produkt sie braucht (Fall 19: eine Aussage, eine Quelle).

   GEHÄUSE GEHÖREN NICHT HIERHER. buildKorpus, buildNut, buildTail und
   buildLever bleiben beim PP-Kugelhahn — sie beschreiben SEINE Bauart.

   Der Nachweis, dass der Umzug nichts verändert hat, steht im
   Prüfbericht: der Selbsttest muss nach dem Umzug Zahl für Zahl
   dasselbe melden wie davor. */

import * as THREE from 'three';
import {
  buildProfile, revolve, arcPts, mergeGeometries, capFromProfile,
  polygonCap, roundedPad, SEG_VIS, SEG_INT,
} from '../../core/index.js';

/* ── 6 Kugel (Bohrungskanten R1,5 verrundet) ── */
export function buildBall(P) {
  const R = P.ballD / 2, rb = P.boreR;
  const tEnd = Math.asin(rb / R);
  const pts = [];
  arcPts(pts, 0, 0, R, Math.PI - tEnd, tEnd, 30);
  pts[0].fillet = 1.5;
  pts[pts.length - 1].fillet = 1.5;
  const profile = buildProfile(pts, { segs: 5 });
  return {
    geo: revolve(profile, { axis: 'x', segments: SEG_VIS }),
    cap: capFromProfile(profile, 'x'),
  };
}

/* ── 7+8 Kugelsitze (PTFE, sphärisch gehöhlt) ── */
export function buildSeat(P) {
  const rID = P.boreR, rOD = P.seatOD / 2, Rs = P.seatSphR;
  const rC = rID + P.seatW * 0.55;
  const tID = Math.asin(rID / Rs), tC = Math.asin(rC / Rs);
  const aC = Rs * Math.cos(tC);
  const front = [];
  arcPts(front, 0, 0, Rs, tID, tC, 8);
  front[front.length - 1].fillet = 0.4;
  const profile = buildProfile([
    { a: aC, r: rOD, fillet: 0.4 },
    { a: P.seatBack, r: rOD, chamfer: 0.5 },
    { a: P.seatBack, r: rID, chamfer: 0.5 },
    { a: Rs * Math.cos(tID), r: rID, fillet: 0.4 },
    ...front.slice(1),
  ], { segs: 3 });
  return { geo: revolve(profile, { axis: 'x', segments: SEG_INT }), cap: capFromProfile(profile, 'x') };
}

/* ── 9 Spindel ── */
export function buildStem(P) {
  const rs = P.stemOD / 2;
  const yF = P.ballD / 2 + 0.4;
  const yTop = P.domeTop + 3.5;
  const gY = P.domeTop - 2;
  const profile = buildProfile([
    { a: yF - 1.2, r: 0, fillet: 0 },
    { a: yF - 1.2, r: rs + 1.9, chamfer: 0.5 },
    { a: yF + 1.8, r: rs + 1.9, chamfer: 0.7 },
    { a: yF + 1.8, r: rs, fillet: 0.5 },
    { a: gY - 0.9, r: rs, fillet: 0.3 },
    { a: gY - 0.5, r: rs - 0.9, fillet: 0.3 },
    { a: gY + 0.5, r: rs - 0.9, fillet: 0.3 },
    { a: gY + 0.9, r: rs, fillet: 0.3 },
    { a: yTop, r: rs, chamfer: 0.8 },
    { a: yTop, r: 0, fillet: 0 },
  ], { segs: 3 });
  const geo = revolve(profile, { axis: 'y', segments: SEG_INT });

  /* Mitnehmer: Vierkant im Kugelschlitz. Langachse quer zur Bohrung,
     damit der Schlitzgrund über der dicksten Kugelwand liegt.
     ASSUMPTION: Schlitztiefe auf 0,14·d reduziert — 0,18·d würde bei
     Bohrung 0,667·d in die Kugelbohrung durchbrechen. */
  const slotD = Math.min(0.18 * P.d, P.ballD / 2 - P.boreR - 1.0);
  const tongue = roundedPad(0.30 * P.d, 0.45 * P.d, slotD + 1.2, 0.30 * P.d * 0.22, 0.5);
  tongue.translate(0, P.ballD / 2 - slotD, 0);
  return {
    geo: mergeGeometries([geo, tongue]),
    cap: mergeGeometries([
      capFromProfile(profile, 'y'),
      polygonCap([
        [-0.15 * P.d, P.ballD / 2 - slotD], [0.15 * P.d, P.ballD / 2 - slotD],
        [0.15 * P.d, P.ballD / 2 + 1.2], [-0.15 * P.d, P.ballD / 2 + 1.2],
      ]),
    ]),
    slotD,
  };
}

/* ── 11 O-Ring ── */
export function buildORing(P, x, r) {
  const g = new THREE.TorusGeometry(r, P.oringCord / 2, 22, SEG_INT);
  g.rotateY(Math.PI / 2);
  g.translate(x, 0, 0);
  const n = g.attributes.position.count;
  g.setAttribute('aWear', new THREE.BufferAttribute(new Float32Array(n), 1));
  return {
    geo: g,
    cap: mergeGeometries([
      polygonCap([[x - P.oringCord / 2, r - P.oringCord / 2], [x + P.oringCord / 2, r - P.oringCord / 2],
        [x + P.oringCord / 2, r + P.oringCord / 2], [x - P.oringCord / 2, r + P.oringCord / 2]]),
      polygonCap([[x - P.oringCord / 2, -r - P.oringCord / 2], [x + P.oringCord / 2, -r - P.oringCord / 2],
        [x + P.oringCord / 2, -r + P.oringCord / 2], [x - P.oringCord / 2, -r + P.oringCord / 2]]),
    ]),
  };
}
