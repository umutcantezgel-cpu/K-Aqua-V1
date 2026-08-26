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

import {
  buildProfile, mirrorProfile, revolve, loft, arcPts, ringGrooves,
  mergeGeometries, capFromProfile, polygonCap, roundedPad,
  thetaSamples, grooveMod, ribMod, D2R, DRAFT, SEG_VIS, SEG_FINE,
} from '../../core/index.js';

/* Kugel, Sitze, Spindel und O-Ring stehen seit dem 24.08.2026 in der
   Familie — der Messingkugelhahn AQ850 hat dieselben Innereien bei
   ganz anderem Gehäuse. Hier bleibt, was DIESE Bauart ausmacht:
   Korpus, Überwurfmuttern, Anschlussstutzen, Hebel. */
export { buildBall, buildSeat, buildStem, buildORing } from '../_ballvalve/parts.js';

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
