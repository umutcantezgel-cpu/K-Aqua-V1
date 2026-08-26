/* K-Aqua 3D · Kugelhahn PP-R (Kugel in PP) — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID valves/pp-r-ball-valve-ball-in-pp.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, SEG_FINE, SEG_INT, SEG_VIS, arcPts, buildProfile, capFromProfile, createAssembly, grooveMod, loft, materials, mergeGeometries, mirrorProfile, polygonCap, revolve, ribMod, ringGrooves, roundedPad, thetaSamples,
} from '../kaqua-3d-core.mjs';

/* == _ballvalve/parts.js =============================================== */
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


/* == ball-valve-pp/data.js ============================================= */
/* K-Aqua PP-R Kugelhahn (Ball in PP) — Artikeltabelle.

   Quelle: Produktseite-Screenshot, per Auge transkribiert (Phase 1 der
   Vorsession). Die Markdown-Datei führt AQ50020–AQ50063 mit den Spalten
   d/L/H — beides falsch. Verbindlich ist diese Tabelle.

   Alle Maße in mm.
   d  = Nennmaß / Rohr-Außendurchmesser = Muffenbohrung
   D  = größter Außendurchmesser (Überwurfmutter)
   L  = Baulänge Stirnfläche–Stirnfläche
   z  = Einbaulänge (Rohrende–Rohrende)
   H  = Rohrachse bis Oberkante Hebel
   A  = Hebellänge horizontal
   L1 = Herstellerangabe, in der Zeichnung nicht eindeutig auflösbar —
        nur informativ, NICHT als Constraint verwendet. */

export const ARTICLES = [
  { code: 'AQ85220', d: 20, D: 46,  L: 98,  z: 70,  H: 51,  A: 68,  L1: 63,  kg: 0.11 },
  { code: 'AQ85225', d: 25, D: 56,  L: 113, z: 82,  H: 61,  A: 78,  L1: 75,  kg: 0.19 },
  { code: 'AQ85232', d: 32, D: 66,  L: 121, z: 87,  H: 70,  A: 88,  L1: 79,  kg: 0.28 },
  { code: 'AQ85240', d: 40, D: 79,  L: 138, z: 98,  H: 81,  A: 98,  L1: 91,  kg: 0.44 },
  { code: 'AQ85250', d: 50, D: 87,  L: 148, z: 101, H: 90,  A: 108, L1: 95,  kg: 0.54 },
  { code: 'AQ85263', d: 63, D: 107, L: 175, z: 121, H: 110, A: 118, L1: 115, kg: 0.93 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  D: 'Außendurchmesser',
  L: 'Baulänge',
  z: 'Einbaulänge',
  H: 'Hebelhöhe',
  A: 'Hebellänge',
  L1: 'Herstellermaß L1 (nicht eindeutig)',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}


/* == ball-valve-pp/params.js =========================================== */
/* K-Aqua Kugelhahn PP-R (Kugel in PP) — Parametrik.

   Rang 1 (Maßtabelle) sind d · D · L · z · H · A. Alles andere wird
   daraus gerechnet, nie hartkodiert. Jede Annahme, die nicht aus der
   Tabelle oder der technischen Zeichnung folgt, trägt ein ASSUMPTION.

   Alle Maße in Millimetern. X = Durchflussachse, Y = oben, Z = Tiefe. */


export function params(dNom) {
  const a = article(dNom);
  const { d, D, L, z, H, A } = a;
  const P = Object.assign({}, a);

  P.socket = (L - z) / 2;                       // Muffentiefe
  P.bore = 0.667 * d;                           // ASSUMPTION: Vollstrom = Rohr-ID bei SDR 6 / PN 20
  P.ballD = 1.0 * d;                            // ASSUMPTION: ergibt ~4,5 mm Restwand
  P.bodyOD = Math.max(0.62 * D, d + 9);
  P.tailOD = P.bodyOD;
  P.bundOD = 0.82 * D;
  P.threadOD = 0.78 * D;
  P.collarOD = 0.76 * D;
  P.collarT = 0.07 * D;
  P.nutLen = 0.19 * L;
  P.bundW = 0.08 * D;

  // Axiale Aufteilung: sichtbare Zonen ergeben in Summe exakt L
  P.xEnd = L / 2;                               // Stirnfläche
  P.xNutOut = 0.395 * L;                        // äußere Mutterkante
  P.xNutIn = 0.205 * L;                         // innere Mutterkante = sichtbares Korpusende
  P.xSocket = z / 2;                            // Muffengrund (= Rohrende)
  // ASSUMPTION: Stirnfläche Korpus / Anlagefläche Stutzen. Aus der Zeichnung
  // nicht ableitbar; so gewählt, dass hinter dem Muffengrund 0,16·d Material
  // bleibt und der Stutzenkragen innerhalb der Mutter liegt.
  P.xJoint = z / 2 - 0.16 * d;

  P.boreR = P.bore / 2;
  P.seatW = 0.125 * d;                          // Sitzringbreite (3,9 mm bei d32 ~ "bohrung+8")
  P.seatT = 0.094 * d;                          // Sitzdicke (3,0 mm bei d32)
  P.seatOD = P.bore + 2 * P.seatW;
  P.seatSphR = P.ballD / 2 + 0.15;
  P.seatBack = Math.sqrt(P.seatSphR ** 2 - P.boreR ** 2) + P.seatT;
  P.chamberR = P.ballD / 2 + 0.2;               // Kugelkammer
  P.bodyBoreR = P.boreR + P.seatW + 0.2;        // Korpusbohrung (nimmt Stutzennase auf)
  P.noseR = P.bodyBoreR - 0.2;                  // Stutzennase
  P.chamberX = Math.sqrt(Math.max(0.01, P.chamberR ** 2 - P.bodyBoreR ** 2));

  P.domeOD = 0.36 * D;
  P.domeTop = 0.42 * H;
  P.stemOD = 0.20 * D;
  P.padZ = 0.30 * D;                            // Lasche: Breite
  P.padX = 0.22 * D;                            // Lasche: Dicke in X
  P.padH = 0.05 * D;                            // Lasche: Höhe über Zylinder

  P.oringCord = 2.4;
  P.oringDepth = 1.8;

  /* ── ZUR GRIFFLÄNGE, nach dem Bildabgleich vom 25.08.2026 ──
     Der Mangelverdacht M9 („Griff zu lang") hat sich als Fehler des
     PRÜFERS erwiesen: die Grifflänge ist TABELLIERT (Spalte A), und
     A/L = 0,73 deckt sich mit dem Foto — verglichen worden war
     fälschlich gegen die Korpuslänge ohne Überwurfmuttern. Die Länge
     bleibt A. Aus dem Foto übernommen ist nur die GRÜNE DECKEINLAGE
     auf dem Griffkopf (zweiter Werkstoff des Griffs). */
  const gripA = A;
  P.lever = {
    hubBot: 0.41 * H,
    hubTop: 0.85 * H,
    hubBotOD: 0.46 * D,
    hubTopOD: 0.34 * D,
    armTop: H,
    thRoot: 0.30 * H,
    thTip: 0.15 * H,
    len: gripA,
    longFrac: 0.73,
    xLong: 0.73 * gripA,
    xShort: 0.27 * gripA,
    wRoot: 0.26 * gripA,
    wTip: 0.11 * gripA,
    ribs: 12,
    inlayOD: 0.30 * D,          // grüne Einlage auf dem Kopf, aus dem Foto
    inlayH: 0.9,
  };
  return P;
}


/* == ball-valve-pp/parts.js ============================================ */
/* K-Aqua Kugelhahn PP-R (Kugel in PP) — die Einzelteilkonturen.

   Jedes Teil ist ein geschlossener Rotationskörper (bzw. ein Loft), in
   absoluten Modellkoordinaten aufgebaut: X = Durchflussachse, Y = oben,
   Z = Tiefe, Rohrachse auf Y = 0. Die rechte Seite wird gebaut, die
   linke durch Drehung um Y gespiegelt (kein Scale, damit die Normalen
   stimmen).

   Kein CSG: jede Bohrung ist Teil der geschlossenen Profilkontur.

   Alle Geometrie-Grundfunktionen kommen aus dem Core. Steht hier eine
   Funktion, die ein anderes Produkt auch bräuchte, ist sie am falschen
   Ort. */


/* Kugel, Sitze, Spindel und O-Ring stehen seit dem 24.08.2026 in der
   Familie — der Messingkugelhahn AQ850 hat dieselben Innereien bei
   ganz anderem Gehäuse. Hier bleibt, was DIESE Bauart ausmacht:
   Korpus, Überwurfmuttern, Anschlussstutzen, Hebel. */

/* ── 1 Korpus (inkl. Spindeldom, Lasche, Auswerfermarken) ── */
export function buildKorpus(P) {
  const bo = P.bodyOD / 2, bu = P.bundOD / 2, th = P.threadOD / 2;
  const aBundOut = P.xNutIn;
  const aBundIn = aBundOut - P.bundW;
  const aTaper = aBundIn - 0.14 * P.xNutIn;

  const outer = [
    { a: 0, r: bo + 0.09, fillet: 0.1 },            // Formtrennnaht (0,09 mm Grat)
    { a: 0.45, r: bo, fillet: 0.3 },
    { a: aTaper, r: bo - DRAFT * aTaper, fillet: 3.0 },
    { a: aBundIn, r: bu, fillet: 1.5 },
    { a: aBundOut, r: bu - DRAFT * P.bundW, chamfer: 1.2 },
    { a: aBundOut, r: th, fillet: 0.8 },
  ];
  ringGrooves(outer, aBundOut + 2.2, P.xJoint - 1.4, th, 4, 0.35, 1.7);
  outer.push({ a: P.xJoint, r: th, chamfer: 1.5 });

  const inner = [];
  arcPts(inner, 0, 0, P.chamberR, Math.PI / 2, Math.asin(P.bodyBoreR / P.chamberR), 10);
  inner[inner.length - 1].fillet = 1.2;
  inner.push({ a: P.xJoint, r: P.bodyBoreR, chamfer: 0.9 });

  const profile = buildProfile(mirrorProfile(outer, inner), { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Spindeldom: eigener Rotationskörper um Y, mit Fußkegel, der die
     Durchdringung mit dem Korpuszylinder flach auslaufen lässt. */
  const dr = P.domeOD / 2;
  const br = P.stemOD / 2 + 0.3;
  const yBase = P.bodyOD / 2 * 0.76;
  const yTop = P.domeTop;
  const gY = yTop - 2;
  const domeOuter = [
    { a: yBase, r: dr + 1.7, fillet: 0.8 },
    { a: yBase + (yTop - yBase) * 0.34, r: dr, fillet: 2.4 },
    { a: gY - 1.1, r: dr - DRAFT * (gY - yBase), fillet: 0.3 },
    { a: gY - 0.7, r: dr - 1.0, fillet: 0.3 },
    { a: gY + 0.7, r: dr - 1.0, fillet: 0.3 },
    { a: gY + 1.1, r: dr - DRAFT * (gY - yBase) - 0.1, fillet: 0.4 },
    { a: yTop, r: dr - DRAFT * (yTop - yBase), chamfer: 1.0 },
    { a: yTop, r: br, fillet: 0.5 },
    { a: yBase + 3.2, r: br, fillet: 0.5 },
    { a: yBase + 3.2, r: br + 2.3, fillet: 0.4 },
    { a: yBase, r: br + 2.3, fillet: 0.4 },
  ];
  const domeProfile = buildProfile(domeOuter, { segs: 4 });
  geos.push(revolve(domeProfile, { axis: 'y', segments: SEG_VIS }));

  /* Lasche unten (Verdrehsicherung) + 3 Auswerferstift-Marken.
     ASSUMPTION: die im Prompt ebenfalls geforderte obere Lasche
     (0,30·D × 0,22·D) wird vom Spindeldom (Ø 0,36·D) vollständig
     überdeckt und daher durch den Domfuß ersetzt. */
  const pad = roundedPad(P.padX, P.padZ, P.padH + 5.5, Math.min(2.4, P.padX * 0.16), 1.0);
  pad.rotateX(Math.PI);
  pad.translate(0, -(bo + P.padH), 0);
  geos.push(pad);

  const emR = Math.min(2.0, P.padZ * 0.11);
  for (const z of [-P.padZ * 0.28, 0, P.padZ * 0.28]) {
    const disc = revolve(
      buildProfile([
        { a: 0, r: 0, fillet: 0 },
        { a: 0, r: emR, chamfer: 0.25 },
        { a: 0.12, r: emR, fillet: 0.1 },
        { a: 0.12, r: 0, fillet: 0 },
      ], { segs: 3 }),
      { axis: 'y', segments: SEG_FINE }
    );
    disc.rotateX(Math.PI);
    disc.translate(0, -(bo + P.padH), z);
    geos.push(disc);
  }

  return {
    geo: mergeGeometries(geos),
    cap: mergeGeometries([
      capFromProfile(profile, 'x'),
      capFromProfile(domeProfile, 'y'),
      polygonCap([
        [-P.padX / 2, -(bo + P.padH)], [P.padX / 2, -(bo + P.padH)],
        [P.padX / 2, -bo * 0.9], [-P.padX / 2, -bo * 0.9],
      ]),
    ]),
  };
}

/* ── 2+3 Überwurfmutter (12 halbrunde Längsriffel) ── */
export function buildNut(P) {
  const rn = P.D / 2;
  const aIn = P.xNutIn, aOut = P.xNutOut, mid = (aIn + aOut) / 2;
  const dr = (a) => rn - DRAFT * Math.abs(mid - a); // verjüngt von der Formteilungsebene weg
  const flute = grooveMod(12, 0.030 * P.D, 0.022 * P.D, rn);
  const rSh = P.tailOD / 2 + Math.max(1.2, 0.02 * P.D);
  const shT = P.collarT * 0.9;
  const rTb = P.threadOD / 2 + 0.4;

  const outer = [
    { a: aIn, r: dr(aIn), chamfer: 1.2 },
    { a: aIn + 1.5, r: dr(aIn + 1.5), fillet: 0.5, w: 0 },
    { a: aIn + 3.4, r: dr(aIn + 3.4), fillet: 0, w: 1 },
    { a: mid - 0.4, r: rn, fillet: 0.15, w: 1 },
    { a: mid, r: rn + 0.08, fillet: 0.1, w: 1 },       // Formtrennnaht
    { a: mid + 0.4, r: rn, fillet: 0.15, w: 1 },
    { a: aOut - 3.4, r: dr(aOut - 3.4), fillet: 0, w: 1 },
    { a: aOut - 1.5, r: dr(aOut - 1.5), fillet: 0.5, w: 0 },
    { a: aOut, r: dr(aOut), chamfer: 1.2 },
  ];
  const inner = [{ a: aIn, r: rTb, chamfer: 0.8 }];
  ringGrooves(inner, aIn + 2.5, aOut - shT - 1.5, rTb, 3, 0.4, 1.8);
  inner.push(
    { a: aOut - shT, r: rTb, fillet: 0.5 },
    { a: aOut - shT, r: rSh, fillet: 0.5 },
    { a: aOut, r: rSh, chamfer: 0.6 }
  );

  const profile = buildProfile([...outer, ...inner.reverse()], { segs: 4 });
  return {
    geo: revolve(profile, { axis: 'x', thetas: thetaSamples(12, flute.halfAng, 5, 6), mod: flute }),
    cap: capFromProfile(profile, 'x'),
  };
}

/* ── 4+5 Anschlussstutzen (Schweißmuffe, Kragen, Nase, O-Ring-Nut) ── */
export function buildTail(P) {
  const rt = P.tailOD / 2, rc = P.collarOD / 2, rb = P.boreR;
  const aNose = P.seatBack;
  const gA = P.xJoint - Math.max(2.6, P.oringCord * 1.35);
  const sockR = (a) => P.d / 2 - Math.tan(0.6 * D2R) * (P.xEnd - a); // 0,6° Muffenkonus
  const tubeR = (a) => rt - DRAFT * (P.xEnd - a);
  const lead = 2 * Math.tan(15 * D2R);

  const outer = [
    { a: aNose, r: P.noseR, chamfer: 0.8 },
    { a: gA - P.oringCord * 0.95, r: P.noseR, fillet: 0.3 },
    { a: gA - P.oringCord * 0.5, r: P.noseR - P.oringDepth, fillet: 0.6 },
    { a: gA + P.oringCord * 0.5, r: P.noseR - P.oringDepth, fillet: 0.6 },
    { a: gA + P.oringCord * 0.95, r: P.noseR, fillet: 0.3 },
    { a: P.xJoint, r: P.noseR, fillet: 0.7 },
    { a: P.xJoint, r: rc, fillet: 0.9 },
    { a: P.xJoint + P.collarT, r: rc, chamfer: 0.9 },
    { a: P.xJoint + P.collarT + 2.4, r: tubeR(P.xJoint + P.collarT + 2.4) + 0.5, fillet: 1.4 },
    { a: P.xEnd, r: rt, chamfer: 1.2 },
  ];
  const inner = [
    { a: aNose, r: rb, fillet: 0.7 },
    { a: P.xSocket, r: rb, fillet: 0.9 },
    { a: P.xSocket, r: sockR(P.xSocket), fillet: 1.3 },
    { a: P.xEnd - 2, r: sockR(P.xEnd - 2), fillet: 0.4 },
    { a: P.xEnd, r: P.d / 2 + lead, fillet: 0 },
  ];

  const profile = buildProfile([...outer, ...inner.reverse()], { segs: 4 });
  return {
    geo: revolve(profile, { axis: 'x', segments: SEG_VIS }),
    cap: capFromProfile(profile, 'x'),
    oringX: gA,
    oringR: P.noseR - P.oringDepth + P.oringCord / 2,
  };
}

/* ── 10 Hebel: Nabe (Rotationskörper mit 12 Rippen) + Arm (Loft).
   Ein Teil, eine Geometrie. ── */
export function buildLever(P) {
  const Lv = P.lever;
  const xLong = Lv.xLong;
  const xShort = Lv.xShort;
  const rBot = Lv.hubBotOD / 2, rTop = Lv.hubTopOD / 2;
  const bore = P.stemOD / 2 + 0.25;
  const yB = Lv.hubBot, yT = Lv.hubTop;
  const hubH = yT - yB;
  const crownH = hubH * 0.22;
  const yC = yT - crownH;
  const rAt = (y) => rBot + ((rTop - rBot) * (y - yB)) / hubH;
  const rC = rAt(yC);
  const u = (-rC * rC - yC * yC + yT * yT) / (2 * (yT - yC));
  const Rc = yT - u;

  const hubPts = [
    { a: yB, r: bore + 1.4, fillet: 0.4 },
    { a: yB, r: rBot, chamfer: 0.8 },
    { a: yB + hubH * 0.09, r: rAt(yB + hubH * 0.09), fillet: 0, w: 0 },
    { a: yB + hubH * 0.16, r: rAt(yB + hubH * 0.16), fillet: 0, w: 1 },
    { a: yC - 1.2, r: rAt(yC - 1.2), fillet: 0, w: 1 },
    { a: yC, r: rC, fillet: 0, w: 0.4 },
  ];
  arcPts(hubPts, u, 0, Rc, Math.acos((yC - u) / Rc), 0.02, 9, { w: 0 });
  hubPts.push(
    { a: yC + crownH * 0.55, r: 0.02, fillet: 0 },
    { a: yC + crownH * 0.55, r: bore, fillet: 0.7 },
    { a: yB, r: bore, chamfer: 0.6 }
  );
  const hubProfile = buildProfile(hubPts, { segs: 4 });
  const rib = ribMod(Lv.ribs, (0.4 * Math.PI) / Lv.ribs, Math.max(1.0, 0.021 * P.D));
  const hubGeo = revolve(hubProfile, {
    axis: 'y',
    thetas: thetaSamples(Lv.ribs, rib.halfAng, 5, 5),
    mod: rib,
  });

  /* Armquerschnitt: Kanalprofil mit Längsrippe — Spritzgussteil,
     nie massiv. In der Untersicht sichtbar. */
  const wallT = Math.max(1.2, 0.019 * P.H);
  const topWall = Math.max(1.5, 0.024 * P.H);
  const ribHalf = Math.max(0.7, 0.012 * P.H);
  const rTip = Math.max(1.6, 0.03 * P.H);
  const hubGate = rTop * 1.15;
  const ribStations = [];
  {
    const step = Lv.len / 6.5;
    for (let x = -xShort + step; x < xLong - rTip - 3; x += step) {
      if (Math.abs(x) > hubGate + 5) ribStations.push(x);
    }
  }

  function section(x) {
    const side = x >= 0 ? xLong : xShort;
    const t = Math.min(1, Math.abs(x) / side);
    const th = Lv.thTip + (Lv.thRoot - Lv.thTip) * Math.pow(1 - t, 2.1);
    let hw = (Lv.wTip + (Lv.wRoot - Lv.wTip) * Math.pow(1 - t, 1.5)) / 2;
    const sag = (hw * hw) / (2 * 3 * Lv.len);
    let yTopE = P.H - sag;
    let yBot = P.H - th;
    // Spitzenverrundung R2
    const edge = x >= 0 ? xLong - x : x + xShort;
    if (edge < rTip) {
      const s = Math.sqrt(Math.max(0.0025, 1 - Math.pow((rTip - edge) / rTip, 2)));
      const mid = (yTopE + yBot) / 2;
      hw = Math.max(0.1, hw * s);
      yTopE = mid + (yTopE - mid) * s;
      yBot = mid - (mid - yBot) * s;
    }
    // Hohlraum: an der Nabe geschlossen, an Querrippen auf Relief reduziert
    let cav = Math.max(0, th - topWall);
    const ax = Math.abs(x);
    if (ax < hubGate) cav = 0;
    else cav *= Math.min(1, (ax - hubGate) / 5);
    if (edge < rTip + 2) cav *= Math.max(0, (edge - rTip * 0.5) / (rTip + 2));
    for (const rs of ribStations) {
      const dd = Math.abs(x - rs);
      if (dd < 1.05) cav = Math.min(cav, 0.45);
    }
    cav = Math.max(0, Math.min(cav, th - topWall));
    const relief = Math.min(0.45, cav);
    const iw = Math.max(ribHalf + 0.35, hw - wallT);
    const pts = [
      { a: 0, r: yBot + relief, fillet: 0 },
      { a: ribHalf, r: yBot + relief, fillet: 0.3 },
      { a: ribHalf, r: yBot + cav, fillet: 0.5 },
      { a: iw, r: yBot + cav, fillet: 0.5 },
      { a: iw, r: yBot, fillet: 0.4 },
      { a: hw, r: yBot, fillet: 0.7 },
      { a: hw, r: yTopE, fillet: 1.2 },
      { a: hw * 0.72, r: yTopE + sag * 0.48, fillet: 0 },
      { a: hw * 0.38, r: yTopE + sag * 0.86, fillet: 0 },
      { a: 0, r: yTopE + sag, fillet: 0 },
    ];
    const half = buildProfile(pts, { closed: false, segs: 3, fillet: 0.3, keep: true });
    const full = half.concat(
      half.slice(1, -1).reverse().map((p) => ({ a: -p.a, r: p.r, wear: p.wear }))
    );
    return { x, pts: full, yTop: yTopE + sag, yBot: yBot + relief };
  }

  const xs = new Set([-xShort, xLong]);
  const add = (v) => { if (v > -xShort && v < xLong) xs.add(v); };
  for (let i = 1; i < 5; i++) { add(-xShort + (rTip * i) / 5); add(xLong - (rTip * i) / 5); }
  const N = Math.ceil(Lv.len / 3.2);
  for (let i = 0; i <= N; i++) add(-xShort + (Lv.len * i) / N);
  for (const rs of ribStations) [-1.75, -1.02, -0.98, 0.98, 1.02, 1.75].forEach((o) => add(rs + o));
  add(-hubGate - 0.02); add(-hubGate + 0.02); add(hubGate - 0.02); add(hubGate + 0.02);
  const stations = [...xs].sort((a, b) => a - b).map(section);

  const armGeo = loft(stations);
  const capPts = stations.map((s) => [s.x, s.yTop])
    .concat(stations.slice().reverse().map((s) => [s.x, s.yBot]));

  return {
    geo: mergeGeometries([hubGeo, armGeo]),
    cap: mergeGeometries([capFromProfile(hubProfile, 'y'), polygonCap(capPts)]),
    xLong, xShort,
  };
}


/* Grüne Deckeinlage auf dem Griffkopf — im Foto AQ852 der zweite
   Werkstoff des Griffs. Eine flache Scheibe mit Fase, konzentrisch auf
   der Kopfkuppe. */
export function buildLeverInlay(P) {
  const Lv = P.lever;
  const yTop = Lv.hubTop;
  const r = Lv.inlayOD / 2;
  const pts = [
    { a: yTop - 0.2, r: 0.02, fillet: 0 },
    { a: yTop - 0.2, r: r, fillet: 0.3 },
    { a: yTop + Lv.inlayH, r: r - 0.25, chamfer: 0.35 },
    { a: yTop + Lv.inlayH, r: 0.02, fillet: 0 },
  ];
  const profile = buildProfile(pts, { segs: 3 });
  return { geo: revolve(profile, { axis: 'y', segments: SEG_FINE }),
           cap: capFromProfile(profile, 'y') };
}


/* == ball-valve-pp/index.js ============================================ */
/* K-Aqua PP-R Kugelhahn (Ball in PP) — Produktpaket nach PRODUKT-VERTRAG.md.

   Zwölf Einzelteile, alle modelliert — auch die verdeckten, weil sie in
   Explosions- und Schnittansicht sichtbar werden. Kein CSG.

   Der Core wird hier nur benutzt, nie erweitert. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'valves/pp-r-ball-valve-ball-in-pp',
  module: 'kaqua-pp-r-ball-valve-ball-in-pp',
  titleDe: 'Kugelhahn PP-R (Kugel in PP)',
  titleEn: 'PP-R Ball Valve (Ball in PP)',
  category: 'valves',
  brandLine: 'K-Aqua PP-R',

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'L', 'H', 'kg'],
  dimensions: ['L', 'D', 'H', 'A'],
  ariaFields: ['d', 'L', 'D', 'H', 'A'],

  variants: [],
  states: {
    open:   { short: 'Offen',       note: 'Hebel parallel zur Rohrachse', action: 'Öffnen' },
    closed: { short: 'Geschlossen', note: 'Hebel quer',                   action: 'Schließen' },
    pickPart: 'lever',
    pickHint: 'Klick auf den Hebel schaltet',
  },

  tile: 'Absperrarmatur mit lösbarer Verschraubung — das Ventil lässt ' +
        'sich ohne Rohrtrennung ausbauen.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Kugelhahn_d' + size,
      materials: ['pprGreen', 'ptfe', 'epdm', 'steel', 'anthracite'],
      seed: 17,
      clipPlane,
    });

    const korpus = buildKorpus(P);
    const nut = buildNut(P);
    const tail = buildTail(P);
    const ball = buildBall(P);
    const seat = buildSeat(P);
    const stem = buildStem(P);
    const lever = buildLever(P);
    const inlay = buildLeverInlay(P);
    const oring = buildORing(P, tail.oringX, tail.oringR);

    /* Explosionsversatz: aus den Teilelängen gerechnet, damit sich bei
       t = 1 kein Teil überschneidet. Gespiegelte Gruppen (rotation.y = π)
       invertieren die lokale X-Achse — der Versatz ist für beide Seiten
       derselbe positive Wert. */
    const gap = 0.06 * P.L;
    const offSeat = P.xJoint - Math.sqrt(P.seatSphR ** 2 - (P.boreR + P.seatW * 0.55) ** 2) + gap;
    const offNut = P.seatBack + offSeat + gap - P.xNutIn;
    const offTail = P.xNutOut + offNut + gap - P.seatBack;
    const offORing = P.xNutOut + offNut + gap * 0.5 - tail.oringX;
    const offStem = 0.30 * P.L;
    const offLever = offStem + (P.domeTop + 3.5) - P.lever.hubBot + gap;

    const rotor = A.subgroup('Rotor');

    /* Beschriftungsanker: Höhen bewusst gestaffelt, damit sich die
       Labels in der Explosionsansicht nicht überlagern. */
    A.part('korpus', { name: 'Korpus', label: 'Korpus (PP-R)', mat: 'pprGreen',
      geo: korpus.geo, cap: korpus.cap,
      anchor: V3(0, P.bodyOD / 2 + 0.05 * P.L, 0) });

    A.part('nutR', { name: 'Ueberwurfmutter_rechts', label: 'Überwurfmutter', mat: 'pprGreen',
      geo: nut.geo, cap: nut.cap, explode: offNut,
      anchor: V3(0.5 * (P.xNutIn + P.xNutOut), P.D / 2 + 0.10 * P.L, 0) });
    A.part('nutL', { name: 'Ueberwurfmutter_links', label: 'Überwurfmutter', mat: 'pprGreen',
      geo: nut.geo, cap: nut.cap, explode: offNut, mirror: true });

    A.part('tailR', { name: 'Anschlussstutzen_rechts', label: 'Anschlussstutzen', mat: 'pprGreenB',
      geo: tail.geo, cap: tail.cap, explode: offTail,
      anchor: V3(0.5 * (P.xNutOut + P.xEnd), -(P.tailOD / 2 + 0.06 * P.L), 0) });
    A.part('tailL', { name: 'Anschlussstutzen_links', label: 'Anschlussstutzen', mat: 'pprGreenB',
      geo: tail.geo, cap: tail.cap, explode: offTail, mirror: true });

    A.part('oringR', { name: 'O_Ring_rechts', label: 'O-Ring (EPDM)', mat: 'epdm',
      geo: oring.geo, cap: oring.cap, explode: offORing,
      anchor: V3(tail.oringX, tail.oringR + 0.19 * P.L, 0) });
    A.part('oringL', { name: 'O_Ring_links', label: 'O-Ring (EPDM)', mat: 'epdm',
      geo: oring.geo, cap: oring.cap, explode: offORing, mirror: true });

    A.part('seatR', { name: 'Kugelsitz_rechts', label: 'Kugelsitz (PTFE)', mat: 'ptfe',
      geo: seat.geo, cap: seat.cap, explode: offSeat,
      anchor: V3(P.seatBack * 0.6, -(P.seatOD / 2 + 0.15 * P.L), 0) });
    A.part('seatL', { name: 'Kugelsitz_links', label: 'Kugelsitz (PTFE)', mat: 'ptfe',
      geo: seat.geo, cap: seat.cap, explode: offSeat, mirror: true });

    A.part('ball', { name: 'Kugel', label: 'Kugel', mat: 'pprGreenB', parent: rotor,
      geo: ball.geo, cap: ball.cap,
      anchor: V3(0, -(P.ballD / 2 + 0.05 * P.L), 0) });
    A.part('stem', { name: 'Spindel', label: 'Spindel', mat: 'steel', parent: rotor,
      geo: stem.geo, cap: stem.cap, explode: V3(0, offStem, 0),
      anchor: V3(0.07 * P.L, P.domeTop + 0.03 * P.L, 0) });
    A.part('lever', { name: 'Knebelgriff', label: 'Knebelgriff', mat: 'anthraciteB', parent: rotor,
      geo: lever.geo, cap: lever.cap, explode: V3(0, offLever, 0),
      anchor: V3(P.lever.xLong * 0.45, P.H + 0.05 * P.L, 0) });
    /* Grüne Deckeinlage — der zweite Werkstoff des Griffs (Foto AQ852). */
    A.part('inlay', { name: 'Griffeinlage', label: 'Griffeinlage (PP-R)', mat: 'pprGreen', parent: rotor,
      geo: inlay.geo, cap: inlay.cap, explode: V3(0, offLever + 0.06 * P.L, 0) });

    /* Innenlicht-Positionen (mm) — der Core setzt die Lampen. */
    A.light(V3(-P.xJoint * 0.8, 0, 0));
    A.light(V3(P.xJoint * 0.8, 0, 0));

    /* Hotspots: je ein fachlich korrekter Satz. n = Flächennormale,
       damit ein Punkt auf der Rückseite ausgeblendet wird. */
    A.hotspot({
      v: V3(0.5 * (P.xNutIn + P.xNutOut), (P.D / 2) * 0.72, (P.D / 2) * 0.72),
      n: V3(0, 0.7, 0.71),
      text: 'Lösbare Verschraubung — Ventil ohne Rohrtrennung demontierbar',
    });
    A.hotspot({
      v: V3(P.xEnd - Math.max(4, 0.05 * P.L), (P.tailOD / 2) * 0.5, (P.tailOD / 2) * 0.86),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(P.lever.xLong * 0.62, P.H, 0),
      n: V3(0, 1, 0),
      text: '90°-Betätigung, Stellung zeigt Durchfluss an',
    });

    /* Bemaßung: Maßlinien liegen vor dem größten Durchmesser, sonst
       verdeckt die Überwurfmutter die L- und D-Linie. */
    const zf = P.D / 2 + 0.05 * P.L;
    const yL = -(P.bodyOD / 2 + P.padH + 0.10 * P.L);
    A.dim({ label: 'L', value: P.L, a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf),
      off: V3(0, 0.045 * P.L, 0) });
    // D abgesetzt neben der Mutter, mit Maßhilfslinien zurück auf die
    // Silhouette — keine Linie über das Bauteil.
    const xD = P.xNutOut + 0.05 * P.L;
    A.dim({ label: 'D', value: P.D, a: V3(xD, -P.D / 2, zf), b: V3(xD, P.D / 2, zf),
      off: V3(0.5 * (P.xNutIn + P.xNutOut) - xD, 0, 0) });
    const xH = P.lever.xLong + 0.10 * P.L;
    A.dim({ label: 'H', value: P.H, a: V3(xH, 0, zf), b: V3(xH, P.H, zf),
      off: V3(-0.03 * P.L, 0, 0) });
    const yA = P.H + 0.09 * P.L;
    A.dim({ label: 'A', value: P.A, a: V3(-P.lever.xShort, yA, zf), b: V3(P.lever.xLong, yA, zf),
      off: V3(0, -0.035 * P.L, 0) });

    /* ── Zustand ── */
    let openT = 1;
    A.setOpen = (t) => {
      openT = t;
      rotor.rotation.y = ((1 - t) * Math.PI) / 2;
    };

    /* ── Maßtest (Phase 4): messen, nicht behaupten ── */
    const withNeutral = (fn) => {
      const e = A.explode, o = openT;
      A.setExplode(0); A.setOpen(1);
      const r = fn();
      A.setExplode(e); A.setOpen(o);
      return r;
    };
    A.measures = [
      { key: 'L', label: DIMENSION_KEY.L, soll: P.L, ist: () => withNeutral(() => {
          // Baulänge = Stirnfläche bis Stirnfläche der Stutzen; der Hebel
          // ragt bei der 0,73/0,27-Teilung konstruktiv darüber hinaus.
          const b = A.boxOf(['korpus', 'tailR', 'tailL', 'nutR', 'nutL']);
          return b.max.x - b.min.x;
        }) },
      { key: 'D', label: DIMENSION_KEY.D, soll: P.D, ist: () => withNeutral(() => {
          const b = A.boxOf(['nutR']);
          return Math.max(b.max.y - b.min.y, b.max.z - b.min.z);
        }) },
      { key: 'H', label: DIMENSION_KEY.H, soll: P.H, ist: () => withNeutral(() => A.boxOf().max.y) },
      { key: 'A', label: DIMENSION_KEY.A, soll: P.A, ist: () => withNeutral(() => {
          const b = A.boxOf(['lever']);
          return b.max.x - b.min.x;
        }) },
      { key: 'l', label: 'Muffentiefe', soll: P.socket, ist: () => withNeutral(() => {
          const rr = (P.d / 2 + P.boreR) / 2;
          const hit = A.probeAxial('tailR', V3(P.xEnd + 20, rr, 0), V3(-1, 0, 0));
          return hit ? P.xEnd - hit.x : NaN;
        }) },
      { key: 'restwand', label: 'Restwand Korpus über Kugel',
        soll: (P.bodyOD - P.ballD) / 2, ist: () => (P.bodyOD - P.ballD) / 2 },
    ];

    A.setOpen(1);
    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export { product as default };
