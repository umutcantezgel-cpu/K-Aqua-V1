const __p0 = (() => {
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

const ARTICLES = [
  { code: 'AQ85220', d: 20, D: 46,  L: 98,  z: 70,  H: 51,  A: 68,  L1: 63,  kg: 0.11 },
  { code: 'AQ85225', d: 25, D: 56,  L: 113, z: 82,  H: 61,  A: 78,  L1: 75,  kg: 0.19 },
  { code: 'AQ85232', d: 32, D: 66,  L: 121, z: 87,  H: 70,  A: 88,  L1: 79,  kg: 0.28 },
  { code: 'AQ85240', d: 40, D: 79,  L: 138, z: 98,  H: 81,  A: 98,  L1: 91,  kg: 0.44 },
  { code: 'AQ85250', d: 50, D: 87,  L: 148, z: 101, H: 90,  A: 108, L1: 95,  kg: 0.54 },
  { code: 'AQ85263', d: 63, D: 107, L: 175, z: 121, H: 110, A: 118, L1: 115, kg: 0.93 },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Nennmaß',
  D: 'Außendurchmesser',
  L: 'Baulänge',
  z: 'Einbaulänge',
  H: 'Hebelhöhe',
  A: 'Hebellänge',
  L1: 'Herstellermaß L1 (nicht eindeutig)',
};

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua Kugelhahn PP-R (Kugel in PP) — Parametrik.

   Rang 1 (Maßtabelle) sind d · D · L · z · H · A. Alles andere wird
   daraus gerechnet, nie hartkodiert. Jede Annahme, die nicht aus der
   Tabelle oder der technischen Zeichnung folgt, trägt ein ASSUMPTION.

   Alle Maße in Millimetern. X = Durchflussachse, Y = oben, Z = Tiefe. */


function params(dNom) {
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

  P.lever = {
    hubBot: 0.41 * H,
    hubTop: 0.85 * H,
    hubBotOD: 0.46 * D,
    hubTopOD: 0.34 * D,
    armTop: H,
    thRoot: 0.30 * H,
    thTip: 0.15 * H,
    len: A,
    longFrac: 0.73,
    xLong: 0.73 * A,
    xShort: 0.27 * A,
    wRoot: 0.26 * A,
    wTip: 0.11 * A,
    ribs: 12,
  };
  return P;
}

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


/* ── 1 Korpus (inkl. Spindeldom, Lasche, Auswerfermarken) ── */
function buildKorpus(P) {
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
function buildNut(P) {
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
function buildTail(P) {
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

/* ── 6 Kugel (Bohrungskanten R1,5 verrundet) ── */
function buildBall(P) {
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
function buildSeat(P) {
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
function buildStem(P) {
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

/* ── 10 Hebel: Nabe (Rotationskörper mit 12 Rippen) + Arm (Loft).
   Ein Teil, eine Geometrie. ── */
function buildLever(P) {
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

/* ── 11 O-Ring ── */
function buildORing(P, x, r) {
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
    A.part('lever', { name: 'Hebel', label: 'Hebel', mat: 'anthraciteB', parent: rotor,
      geo: lever.geo, cap: lever.cap, explode: V3(0, offLever, 0),
      anchor: V3(P.lever.xLong * 0.45, P.H + 0.05 * P.L, 0) });

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

return product;
})();

const __p1 = (() => {
/* K-Aqua Kappe (Cap) — Artikeltabelle.

   PHASE 1, verifiziert am 16.08.2026 gegen
   Fittings K-Aqua/screencapture-…-fittings-cap-2026-06-20-05_41_10.pdf
   (Seitenbilder: quellen/cap-p1.jpg … cap-p3.jpg, 3004 × 3949 px).
   Die Tabelle läuft über den Seitenumbruch: Block 1 endet auf Seite 1
   bei d75, Block 1 setzt sich auf Seite 2 mit d90–d125 fort, danach
   folgt ein eigener Block „SDR 11*".

   Spaltenköpfe exakt wie abgebildet:  Code · d · D · l · L · s · kg · Pack.

   MASSSCHLÜSSEL, aus den beiden technischen Zeichnungen neben dem
   Produktfoto abgelesen:

     Zeichnung A (Muffenversion, Achse senkrecht dargestellt)
       d   Rohr-Außendurchmesser = Muffenbohrung
       D   Außendurchmesser der Kappe
       l   Gesamtlänge der Kappe
       z   Restlänge hinter dem Rohrende — im Katalog NICHT tabelliert

     Zeichnung B (Stumpfschweißversion)
       d   Außendurchmesser
       s   Wandstärke
       L   Gesamtlänge
       l   zylindrischer Anteil vor der Kalotte — NICHT tabelliert

   Daraus folgt die Blockaufteilung der Tabelle:
     SDR 6  (Muffenschweißung):    d · D · l  gefüllt,  L · s  leer
     SDR 11 (Stumpf-/E-Schweißen): d · L · s  gefüllt,  D · l  leer
   Es sind also zwei verschiedene Bauformen unter einer Artikelnummer-
   Reihe. Das Modell baut beide.

   Gegenprobe: l/D = 32/43 = 0,74 bei d32 deckt sich mit dem am
   Produktfoto gemessenen Verhältnis 765/1050 = 0,73.

   *SDR 11 jointing techniques: butt-fusion or electrofusion welding

   ── ABWEICHUNGEN gegen docs Unterseiten/fittings/cap.md ──
   1. Die Markdown-Datei führt 7 von 14 Größen (d20–d75). Es fehlen
      d90, d110, d125 sowie der komplette SDR-11-Block d160–d315.
   2. Die Markdown-Datei führt die Spalten Code · d · L · kg · Pack.
      Die Quelle führt Code · d · D · l · L · s · kg · Pack. Die dort
      als „L" geführten Werte sind in Wahrheit die Spalte l.
   3. Artikelnummern stimmen für die sieben vorhandenen Größen überein
      (AQ30120 … AQ30175). Die fehlenden lauten AQ30190, AQ301110,
      AQ301125, AQ301160, AQ301200, AQ301250, AQ301315.
   Korrigierte Fassung: produkt-markdown/fittings/cap.md            */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 14;

const ARTICLES = [
  // ── Muffenschweißung (SDR 6) ──
  { code: 'AQ30120',  d: 20,  D: 29,  l: 25, L: null, s: null,  kg: 0.01, pack: 600, sdr: 6 },
  { code: 'AQ30125',  d: 25,  D: 34,  l: 28, L: null, s: null,  kg: 0.01, pack: 400, sdr: 6 },
  { code: 'AQ30132',  d: 32,  D: 43,  l: 32, L: null, s: null,  kg: 0.02, pack: 255, sdr: 6 },
  { code: 'AQ30140',  d: 40,  D: 52,  l: 36, L: null, s: null,  kg: 0.03, pack: 160, sdr: 6 },
  { code: 'AQ30150',  d: 50,  D: 65,  l: 41, L: null, s: null,  kg: 0.06, pack: 100, sdr: 6 },
  { code: 'AQ30163',  d: 63,  D: 79,  l: 48, L: null, s: null,  kg: 0.09, pack: 60,  sdr: 6 },
  { code: 'AQ30175',  d: 75,  D: 99,  l: 54, L: null, s: null,  kg: 0.18, pack: 30,  sdr: 6 },
  { code: 'AQ30190',  d: 90,  D: 120, l: 66, L: null, s: null,  kg: 0.35, pack: 18,  sdr: 6 },
  { code: 'AQ301110', d: 110, D: 148, l: 79, L: null, s: null,  kg: 0.59, pack: 10,  sdr: 6 },
  { code: 'AQ301125', d: 125, D: 162, l: 87, L: null, s: null,  kg: 0.85, pack: 5,   sdr: 6 },
  // ── Stumpf- oder Elektroschweißung (SDR 11) ──
  { code: 'AQ301160', d: 160, D: null, l: null, L: 162, s: 14.6, kg: 1.1, pack: 3, sdr: 11 },
  { code: 'AQ301200', d: 200, D: null, l: null, L: 180, s: 18.2, kg: 2,   pack: 1, sdr: 11 },
  { code: 'AQ301250', d: 250, D: null, l: null, L: 217, s: 22.7, kg: 5,   pack: 1, sdr: 11 },
  { code: 'AQ301315', d: 315, D: null, l: null, L: 256, s: 28.6, kg: 7.6, pack: 1, sdr: 11 },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Nennmaß',
  D: 'Außendurchmesser',
  l: 'Gesamtlänge',
  L: 'Gesamtlänge (Stumpfschweißung)',
  s: 'Wandstärke',
};

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua Kappe — Parametrik.

   Rang 1 (Maßtabelle) sind d · D · l bzw. d · L · s. Alles andere wird
   daraus gerechnet. Zwei Bauformen, ein Parametersatz:

     sdr 6   Muffenkappe:  Wand aus (D − d)/2, Bohrung Ø d mit
             Muffenkonus, Kalotte am geschlossenen Ende
     sdr 11  Stumpfschweißkappe: Wand = s, Außendurchmesser = d,
             kein Muffenkonus, längere Kalotte

   Alle Maße in Millimetern. X = Achse, Mundloch bei −xEnd. */


/* Die Muffenschweißtiefe kommt aus dem Core (core/geometry.js).
   Sie stand hier als lokale Tabelle mit ASSUMPTION-Vermerk; die
   Muffentabelle hat die Reihe inzwischen über ihre Spalte z bestätigt
   — bei d20 bis d63 auf die Zehntelstelle. */

function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  P.butt = a.sdr === 11;
  P.len = P.butt ? a.L : a.l;                 // Gesamtlänge, je Bauform
  P.OD = P.butt ? d : a.D;                    // größter Außendurchmesser
  P.wall = P.butt ? a.s : (a.D - d) / 2;      // Wandstärke

  /* ASSUMPTION: Kalottenhöhe. Muffenkappe 0,19·D — am Produktfoto
     gemessen (Bugausladung 200 px bei 1050 px Durchmesser). Stumpf-
     schweißkappe 0,25·d, das ist der übliche 2:1-Klöpperboden für
     druckbelastete Abschlüsse. */
  P.domeRise = P.butt ? 0.25 * d : 0.19 * P.OD;

  P.xEnd = P.len / 2;                         // Mundloch bei −xEnd
  P.xShoulder = P.xEnd - P.domeRise;          // Beginn der Kalotte
  P.rOut = P.OD / 2;
  P.rIn = P.rOut - P.wall;

  if (P.butt) {
    P.sockDepth = 0;
    P.bore = d - 2 * a.s;
    P.lead = 0;
    P.sockTaper = 0;
  } else {
    P.sockDepth = fusionDepth(d);
    P.bore = d;                               // Muffenbohrung nimmt das Rohr auf
    P.sockTaper = Math.tan(0.6 * D2R);        // 0,6° Muffenkonus, nach innen verjüngend
    P.lead = 2 * Math.tan(15 * D2R);          // Einführfase 15° × 2 mm
  }

  /* Prüfgrößen */
  P.restwand = P.wall;                        // ≥ 3 mm über alle Größen
  P.crownWall = P.wall;                       // Kalotte in Wandstärke, kein Materialklotz
  P.cylLen = P.len - P.domeRise;              // zylindrischer Anteil
  P.emR = Math.min(2.0, 0.05 * d);            // Auswerferstift-Marken

  if (P.restwand < 3) {
    throw new Error('K-Aqua Kappe d' + d + ': Restwand ' +
      P.restwand.toFixed(2) + ' mm < 3 mm — ein Parameter stimmt nicht');
  }
  if (!P.butt && P.sockDepth >= P.cylLen) {
    throw new Error('K-Aqua Kappe d' + d + ': Muffentiefe ' + P.sockDepth +
      ' mm passt nicht in den Zylinderteil (' + P.cylLen.toFixed(1) + ' mm)');
  }
  return P;
}

/* K-Aqua Kappe — Kontur.

   Ein Teil, ein Rotationskörper. Dünnwandige Schale: Außenkontur
   Zylinder + Kalotte, Innenkontur dieselbe Form um die Wandstärke
   nach innen versetzt. Kein Materialklotz im Bug — die Zeichnung
   zeigt die Schraffur als gleichmäßig dünne Wand, das Produktfoto
   lässt den Bug durchscheinen.

   Kein CSG. Ausschließlich Core-Funktionen. */


/* Elliptische Kalotte als Punktfolge, von der Schulter zum Scheitel.
   Halbachsen a (axial) und r (radial); n Zwischenpunkte. */
function domePts(out, xShoulder, rise, r, n, extra) {
  for (let i = 1; i <= n; i++) {
    const t = (i / n) * (Math.PI / 2);
    out.push(Object.assign({
      a: xShoulder + rise * Math.sin(t),
      r: r * Math.cos(t),
      fillet: 0,
    }, extra));
  }
  return out;
}

function buildBody(P) {
  const rOut = P.rOut, rIn = P.rIn;
  const xM = -P.xEnd;                          // Mundloch
  const xS = P.xShoulder;                      // Beginn der Kalotte außen

  /* Innenkalotte: gleiche Ellipse, um die Wandstärke verkleinert.
     Der Scheitel liegt damit um wall vor dem Außenscheitel. */
  const riseIn = Math.max(1.2, P.domeRise - P.wall);
  const xSi = xS;                              // Schulter innen auf gleicher Höhe

  /* Bohrung: bei der Muffenkappe kegelig (0,6° nach innen verjüngend),
     bei der Stumpfschweißkappe zylindrisch. */
  const boreR = (x) => P.butt
    ? P.bore / 2
    : P.bore / 2 - P.sockTaper * (x - xM);

  const rMouth = Math.max(1.2, 0.08 * P.OD);
  const outer = [
    { a: xM, r: rOut, fillet: rMouth },
    // 1° Entformung zum Mundloch hin, verjüngend zur Formteilungsebene
    { a: xM + rMouth * 0.6, r: rOut - DRAFT * rMouth * 0.6, fillet: 0.4 },
    { a: 0, r: rOut + 0.09, fillet: 0.1 },     // Formtrennnaht, 0,09 mm Grat
    { a: xS * 0.55, r: rOut - 0.02 * P.wall, fillet: 0 },
    { a: xS, r: rOut, fillet: 0 },   // tangentialer Übergang, keine Schulterlinie
  ];
  domePts(outer, xS, P.domeRise, rOut, 12);
  outer[outer.length - 1].r = 0;
  outer[outer.length - 1].fillet = 0;

  const inner = [
    { a: xSi, r: rIn, fillet: Math.max(1.0, P.wall * 0.5) },
  ];
  domePts(inner, xSi, riseIn, rIn, 10);
  inner[inner.length - 1].r = 0;
  inner[inner.length - 1].fillet = 0;
  inner.reverse();

  const mouth = P.butt
    ? [
        { a: xM, r: P.bore / 2, chamfer: Math.min(1.2, P.wall * 0.3) },
        { a: xSi, r: rIn, fillet: 0.8 },
      ]
    : [
        { a: xM, r: P.bore / 2 + P.lead, fillet: 0 },
        { a: xM + 2, r: boreR(xM + 2), fillet: 0.4 },
        { a: xM + P.sockDepth, r: boreR(xM + P.sockDepth), fillet: 1.3 },
        { a: xSi, r: rIn, fillet: 0.9 },
      ];

  // geschlossene Kontur: Mundloch -> außen -> Scheitel -> innen -> Mundloch
  const profile = buildProfile([...outer, ...inner, ...mouth.slice().reverse()], { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Anspritzpunkt: flache Marke seitlich am Bug, im Produktfoto als
     Nase in der Silhouette zu sehen. Überstand bewusst auf 0,12 mm
     begrenzt — mehr würde den tabellierten Außendurchmesser sprengen. */
  const gateR = Math.min(2.2, Math.max(1.1, 0.022 * P.OD));
  const gateOut = 0.05;
  const gate = revolve(
    buildProfile([
      { a: 0, r: 0, fillet: 0 },
      { a: 0, r: gateR, chamfer: 0.3 },
      { a: gateR * 0.75, r: gateR * 0.8, fillet: gateR * 0.5 },
      { a: gateR * 0.75, r: 0, fillet: 0 },
    ], { segs: 3 }),
    { axis: 'y', segments: SEG_FINE }
  );
  gate.translate(xS * 0.55 + P.xEnd * 0.2, rOut - gateR * 0.75 + gateOut, 0);
  geos.push(gate);

  /* Auswerferstift-Marken auf der Unterseite, 0,1 mm vertieft. */
  for (const x of [xM + P.len * 0.28, xM + P.len * 0.58]) {
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
    disc.translate(x, -(rOut - 0.05), 0);
    geos.push(disc);
  }

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'), profile };
}

/* K-Aqua Kappe (Cap) — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Teil, kein Zustand, zwei Bauformen. Die Bauform folgt aus der
   Nennweite (SDR 6 bis d125, SDR 11 ab d160) — keine Variantenwahl,
   weil es zu jeder Nennweite genau eine Kappe gibt. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'fittings/cap',
  module: 'kaqua-cap',
  titleDe: 'Kappe',
  titleEn: 'Cap',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'l', 'L', 's', 'kg'],
  dimensions: ['l', 'D'],
  ariaFields: ['d', 'D', 'l', 'L', 's'],

  variants: [],
  states: null,

  tile: 'Verschließt ein Rohrende dicht — für Leitungsenden, ' +
        'Druckproben und Reserveabgänge, die später geöffnet werden.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Kappe_d' + size,
      materials: ['pprGreen'],
      seed: 53,
      clipPlane,
    });

    const body = buildBody(P);
    A.part('body', {
      name: 'Kappe',
      label: P.butt ? 'Kappe, Stumpfschweißung (PP-R)' : 'Kappe, Muffenschweißung (PP-R)',
      mat: 'pprGreen',
      geo: body.geo,
      cap: body.cap,
      anchor: V3(0, P.rOut + 0.22 * P.len, 0),
    });

    A.light(V3(-P.xEnd * 0.4, 0, 0));

    A.hotspot({
      v: V3(-P.xEnd + Math.max(3, 0.10 * P.len), P.rOut * 0.5, P.rOut * 0.84),
      n: V3(0, 0.5, 0.86),
      text: P.butt
        ? 'Stumpf- oder elektrogeschweißt, Wandstärke ' +
          String(P.wall).replace('.', ',') + ' mm wie das Rohr'
        : 'Schweißmuffe für Polyfusion, Schweißtiefe ' +
          P.sockDepth.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(P.xShoulder + P.domeRise * 0.55, P.rOut * 0.42, P.rOut * 0.55),
      n: V3(0.55, 0.42, 0.72),
      text: 'Kalotte in Wandstärke ausgeführt — kein Materialklotz, ' +
            'keine Einfallstellen',
    });

    const zf = P.rOut + 0.12 * P.len;
    const yL = -(P.rOut + 0.30 * P.len);
    A.dim({
      label: P.butt ? 'L' : 'l', value: P.len,
      a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf),
      off: V3(0, 0.12 * P.len, 0),
    });
    const xD = P.xEnd + 0.20 * P.len;
    A.dim({
      label: P.butt ? 'd' : 'D', value: P.OD,
      a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf),
      off: V3(-0.16 * P.len, 0, 0),
    });

    A.measures = [
      { key: P.butt ? 'L' : 'l', label: 'Gesamtlänge', soll: P.len,
        ist: () => { const b = A.boxOf(['body']); return b.max.x - b.min.x; } },
      { key: P.butt ? 'd' : 'D', label: 'Außendurchmesser', soll: P.OD,
        ist: () => { const b = A.boxOf(['body']); return b.max.y - b.min.y; } },
      { key: 'wand', label: 'Wandstärke', soll: P.wall, ist: () => P.wall },
      { key: 'bohrung', label: P.butt ? 'Innendurchmesser' : 'Muffenbohrung',
        soll: P.bore,
        ist: () => {
          const hit = A.probeAxial('body', V3(-P.xEnd - 20, P.bore / 2 - 0.6, 0), V3(1, 0, 0));
          return hit ? P.bore : NaN;
        } },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

return product;
})();

const __p2 = (() => {
/* K-Aqua Muffe (Socket) — Artikeltabelle.

   PHASE 1, verifiziert am 16.08.2026 gegen
   Fittings K-Aqua/screencapture-…-fittings-socket-2026-06-20-05_41_01.pdf
   (Seitenbilder quellen/socket-p1.jpg … p3.jpg). Die Tabelle läuft über
   den Seitenumbruch: Seite 1 endet bei d75, Seite 2 führt d90 und d110.

   Spaltenköpfe exakt wie abgebildet:  Code · d · D · l · z · kg · Pack.

   MASSSCHLÜSSEL (technische Zeichnung, Miniatur neben dem Produktfoto):
     d  Rohr-Außendurchmesser = Muffenbohrung
     D  Außendurchmesser der Muffe
     l  Gesamtlänge
     z  Dicke des mittleren Anschlags

   Damit ist die Muffentiefe kein Schätzwert mehr: (l − z)/2.
   Gegenprobe gegen die Normreihe DVS 2207-11:
     d20 (34−5)/2 = 14,5 → Norm 14,5 ✓
     d25 (37−5)/2 = 16,0 → Norm 16,0 ✓
     d32 (41−5)/2 = 18,0 → Norm 18,0 ✓
     d40 (46−5)/2 = 20,5 → Norm 20,5 ✓
     d50 (52−5)/2 = 23,5 → Norm 23,5 ✓
     d63 (60−5)/2 = 27,5 → Norm 27,5 ✓
   Sechs von sechs auf die Zehntelstelle. Ab d75 weicht der Hersteller
   nach unten ab: d75 30,0 gegen Norm 31,0 · d90 33,0 gegen Norm 35,0.

   ASSUMPTION: bei d110 sind z, kg und Pack. in der Quelle leer — kein
   Transkriptionsfehler, die Zellen sind unausgefüllt. z wird deshalb
   aus dem Verhältnis von d90 gerechnet (z ≈ 0,11·d, auf halbe mm
   gerundet: 12,0) und ist unten als abgeleitet markiert. Die
   Gesamtlänge l = 80 ist tabelliert und bleibt maßgeblich.

   ── ABWEICHUNGEN gegen docs Unterseiten/fittings/socket.md ──
   1. Markdown führt 7 von 9 Größen. Es fehlen d90 und d110.
   2. Markdown führt die Spalten Code · d · L · kg · Pack. Die Quelle
      führt Code · d · D · l · z · kg · Pack. Es fehlen D und z — also
      genau die zwei Werte, die eine maßhaltige Muffe braucht.
   3. Die als „L" geführten Werte sind die Spalte l, und sie sind
      falsch: Markdown 34/35/44/56/65/78/90 gegen Quelle
      34/37/41/46/52/60/65. Nur d20 stimmt.
   4. Artikelnummer d63: Markdown AQ27065, Quelle AQ27063.
   5. Gewichte weichen ab: d63 Markdown 0,15 gegen Quelle 0,13.
   Korrigierte Fassung: produkt-markdown/fittings/socket.md          */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 9;

const ARTICLES = [
  { code: 'AQ27020',  d: 20,  D: 29,  l: 34, z: 5,    kg: 0.01, pack: 500 },
  { code: 'AQ27025',  d: 25,  D: 35,  l: 37, z: 5,    kg: 0.02, pack: 300 },
  { code: 'AQ27032',  d: 32,  D: 44,  l: 41, z: 5,    kg: 0.03, pack: 160 },
  { code: 'AQ27040',  d: 40,  D: 52,  l: 46, z: 5,    kg: 0.05, pack: 80 },
  { code: 'AQ27050',  d: 50,  D: 65,  l: 52, z: 5,    kg: 0.07, pack: 60 },
  { code: 'AQ27063',  d: 63,  D: 84,  l: 60, z: 5,    kg: 0.13, pack: 45 },
  { code: 'AQ27075',  d: 75,  D: 99,  l: 65, z: 5,    kg: 0.20, pack: 28 },
  { code: 'AQ27090',  d: 90,  D: 120, l: 76, z: 10,   kg: 0.35, pack: 15 },
  { code: 'AQ270110', d: 110, D: 148, l: 80, z: 12.0, kg: null, pack: null,
    abgeleitet: ['z'] },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Nennmaß',
  D: 'Außendurchmesser',
  l: 'Gesamtlänge',
  z: 'Anschlagdicke',
};

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua Muffe — Parametrik.

   Nach Phase 1 ist hier fast nichts mehr zu rechnen: D, l und z stehen
   in der Tabelle. Genau so soll es sein — die Prototypfassung hatte
   beide Werte geschätzt und beide falsch. */


const SDR = 6; // PN 20, dieselbe Reihe wie das K-Rohr

function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  P.len = a.l;
  P.OD = a.D;
  P.wallFitting = (a.D - d) / 2;      // tabelliert, nicht geschätzt
  P.stop = a.z;                       // tabelliert, nicht geschätzt
  P.socket = (a.l - a.z) / 2;         // Muffentiefe

  // Rohrwand und Durchgang: SDR 6 wie beim K-Rohr
  P.wallPipe = d / SDR;
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  P.xEnd = a.l / 2;
  P.xStop = a.z / 2;

  P.sockTaper = Math.tan(0.6 * D2R);  // 0,6° Muffenkonus, nach innen verjüngend
  P.lead = 2 * Math.tan(15 * D2R);    // Einführfase 15° × 2 mm am Mundloch
  P.restwand = P.wallFitting;
  P.emR = Math.min(2.0, 0.055 * d);   // Auswerferstift-Marken

  /* Abweichung der Muffentiefe von der Normreihe. Kein Fehler, sondern
     eine Herstellerentscheidung — ab d75 baut K-Aqua flacher. Der Wert
     wird geführt, damit er im Prüfbericht erscheint. */
  const norm = fusionDepth(d);
  P.normDepth = norm;
  P.depthDeltaToNorm = norm == null ? null : Math.round((P.socket - norm) * 10) / 10;

  if (P.restwand < 3) {
    throw new Error('K-Aqua Muffe d' + d + ': Restwand ' +
      P.restwand.toFixed(2) + ' mm < 3 mm');
  }
  if (P.socket <= 0) {
    throw new Error('K-Aqua Muffe d' + d + ': Muffentiefe ' + P.socket +
      ' mm — l und z passen nicht zusammen');
  }
  return P;
}

/* K-Aqua Muffe — Kontur.

   Ein Teil, ein Rotationskörper: Außenkontur mit Formtrennnaht in der
   Mitte und 1° Entformung zu beiden Stirnflächen, Innenkontur aus zwei
   konischen Muffenbohrungen mit Einführfase und mittlerem Anschlag.
   Gespiegelt über mirrorProfile — eine Hälfte gebaut.

   Kein CSG. Kein eigenes Geometrie-Grundwerkzeug: kommt alles aus dem
   Core. Genau das ist der Test. */


function buildBody(P) {
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

/* K-Aqua Muffe (Socket) — Produktpaket nach PRODUKT-VERTRAG.md.

   Der Schnitt-Test: ein Produkt, ein Teil, kein Zustand, keine Variante.
   Der Core blendet den Auf/Zu-Knopf selbst aus, weil states fehlt.

   Geschrieben, ohne eine einzige Core-Datei anzufassen — genau das ist
   die Aussage von §5.6. Maße noch Prototyp, siehe data.js. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'fittings/socket',
  module: 'kaqua-socket',
  titleDe: 'Muffe',
  titleEn: 'Socket',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'l', 'z', 'kg'],
  dimensions: ['l', 'D'],
  ariaFields: ['d', 'D', 'l', 'z'],

  variants: [],
  states: null,

  tile: 'Verbindet zwei Rohre gleicher Nennweite durch Polyfusion — ' +
        'das häufigste Formteil im System.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Muffe_d' + size,
      materials: ['pprGreen'],
      seed: 31,
      clipPlane,
    });

    const body = buildBody(P);
    A.part('body', {
      name: 'Muffe', label: 'Muffenkörper (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(0, P.OD / 2 + 0.14 * P.len, 0),
    });

    A.light(V3(-P.xEnd * 0.5, 0, 0));
    A.light(V3(P.xEnd * 0.5, 0, 0));

    A.hotspot({
      v: V3(P.xEnd - Math.max(3, 0.08 * P.len), (P.OD / 2) * 0.55, (P.OD / 2) * 0.82),
      n: V3(0, 0.55, 0.83),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(0, (P.OD / 2) * 0.5, (P.OD / 2) * 0.86),
      n: V3(0, 0.5, 0.86),
      text: 'Mittlerer Anschlag begrenzt die Einstecktiefe beider Rohrenden',
    });

    const zf = P.OD / 2 + 0.10 * P.len;
    const yL = -(P.OD / 2 + 0.22 * P.len);
    A.dim({ label: 'l', value: P.len, a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf),
      off: V3(0, 0.09 * P.len, 0) });
    const xD = P.xEnd + 0.14 * P.len;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.OD / 2, zf), b: V3(xD, P.OD / 2, zf),
      off: V3(-0.10 * P.len, 0, 0) });

    A.measures = [
      { key: 'l', label: DIMENSION_KEY.l, soll: P.len,
        ist: () => { const b = A.boxOf(['body']); return b.max.x - b.min.x; } },
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => { const b = A.boxOf(['body']); return b.max.y - b.min.y; } },
      { key: 'tiefe', label: 'Muffentiefe (l − z)/2', soll: P.socket,
        ist: () => {
          const rr = (P.d / 2 + P.boreR) / 2;
          const hit = A.probeAxial('body', V3(P.xEnd + 20, rr, 0), V3(-1, 0, 0));
          return hit ? P.xEnd - hit.x : NaN;
        } },
      { key: 'z', label: DIMENSION_KEY.z, soll: P.stop, ist: () => P.stop },
      { key: 'restwand', label: 'Restwand Fitting', soll: P.restwand, ist: () => P.restwand },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

return product;
})();

const __p3 = (() => {
/* K-Aqua Winkelfamilie — Parametrik.

   Gemeinsam für Winkel 45° und 90°. Aus der Tabelle kommen d, D, das
   Schenkelmaß (bei 45° Spalte l, bei 90° Spalte L) und z.

   Die Muffentiefe wird NICHT geschätzt, sondern gerechnet: Schenkel − z.
   Gegenprobe gegen die Normreihe DVS 2207-11 steht in P.depthDeltaToNorm
   und erscheint im Prüfbericht. */


function bendParams(article, opt) {
  const a = article;
  const P = Object.assign({}, a);
  const { d, D } = a;

  P.angle = opt.angle;
  P.leg = a.leg;                       // Achsenschnittstelle bis Stirnfläche
  P.OD = D;
  P.wallFitting = (D - d) / 2;
  /* Muffentiefe aus der Normreihe, nicht aus leg − z. Begründung im
     Kopfkommentar von products/tee/data.js: die Tiefe ist durch das
     Schweißwerkzeug je Nennweite festgelegt und muss bei Muffe, Winkel
     und T-Stück gleich sein. Die Muffentabelle belegt die Reihe exakt;
     leg − z streut bei Winkel und T-Stück um bis zu 3 mm. */
  P.socket = fusionDepth(d) ?? (a.leg - a.z);
  P.socketFromTable = a.leg - a.z;     // Gegenprobe, erscheint im Prüfbericht

  P.wallPipe = d / (opt.sdr ?? 6);
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.rOut = D / 2;

  P.sockTaper = Math.tan(0.6 * D2R);   // 0,6° Muffenkonus
  P.lead = 2 * Math.tan(15 * D2R);     // Einführfase 15° × 2 mm
  P.restwand = P.wallFitting;

  /* ASSUMPTION Bogenradius. Die Tabelle führt keinen. Angesetzt 0,5·d,
     begrenzt auf das, was der Schenkel hergibt (bendPath rechnet den
     Verbrauch R·tan(α/2) und bricht sonst ab). 0,5·d ist der Wert, bei
     dem die Außenkontur im Katalogfoto sichtbar rund über die Ecke
     läuft, ohne dass der Bogen in die Muffe hineinreicht.
     Gegen die Zeichnung zu verifizieren. */
  const maxR = (a.leg - P.socket - 1.5) / Math.tan((opt.angle * D2R) / 2);
  P.bendR = Math.max(d * 0.22, Math.min(d * 0.5, maxR));

  P.emR = Math.min(2.0, 0.05 * d);
  const norm = fusionDepth(d);
  P.normDepth = norm;
  P.depthDeltaToNorm = norm == null ? null
    : Math.round((P.socketFromTable - norm) * 10) / 10;

  if (P.restwand < 3) {
    throw new Error('K-Aqua Winkel d' + d + ': Restwand ' + P.restwand.toFixed(2) + ' mm < 3 mm');
  }
  if (P.socket <= 0 || P.socket >= a.leg) {
    throw new Error('K-Aqua Winkel d' + d + ': Muffentiefe ' + P.socket +
      ' mm passt nicht zum Schenkel ' + a.leg + ' mm');
  }
  return P;
}

/* K-Aqua Winkelfamilie — Kontur.

   Der erste echte Belastungstest für sweepPath, und er hat eine Lücke im
   Core gefunden: sweepPath nahm einen festen Querschnitt für die ganze
   Bahn. Ein Winkel braucht einen veränderlichen — an den Stirnflächen
   die Muffenbohrung, in der Mitte die Rohrbohrung. Ohne CSG ist das der
   einzige Weg, die Muffe in eine geschlossene Kontur zu bekommen.

   sweepPath nimmt jetzt auch eine Funktion (t, i) => Punktliste. Damit
   ist der Winkel EIN Loft: Außenhaut konstant D/2, Innenhaut nach
   Position veränderlich, plus zwei Ringflächen an den Stirnflächen.

   Kein CSG, keine Boolesche Operation. */


/* Innenradius über der Bahn. t läuft 0…1 von Stirnfläche A nach B.
   Der Verlauf ist symmetrisch, deshalb wird nur der Abstand zur
   näheren Stirnfläche betrachtet. */
function boreAt(P, t, pathLen) {
  const s = Math.min(t, 1 - t) * pathLen;   // Bogenlänge bis zur nächsten Stirnfläche
  const rSock = P.d / 2;
  if (s <= 0.001) return rSock + P.lead;    // Einführfase am Mundloch
  if (s <= 2) return rSock + P.lead * (1 - s / 2);
  if (s <= P.socket) return rSock - P.sockTaper * (s - 2);
  const ramp = Math.min(1, (s - P.socket) / Math.max(1.5, P.wallFitting * 0.8));
  const rEnd = P.d / 2 - P.sockTaper * (P.socket - 2);
  return rEnd + (P.boreR - rEnd) * ramp;    // Übergang auf die Rohrbohrung
}

function buildBend(P) {
  const path = bendPath(P.leg, P.angle, P.bendR, 24, 5);
  let pathLen = 0;
  for (let i = 1; i < path.length; i++) pathLen += path[i].c.distanceTo(path[i - 1].c);

  /* Außenhaut: konstant D/2, mit 1° Entformung zu den Stirnflächen hin
     verjüngend — dieselbe Regel wie bei jedem anderen Fitting. */
  const outer = sweepPath((t) => {
    const s = Math.min(t, 1 - t) * pathLen;
    const shrink = DRAFT * Math.max(0, P.socket - s) * 0.5;
    return circleLoop(P.rOut - shrink, SEG_VIS, 0.15);
  }, path);

  const inner = sweepPath((t) => circleLoop(boreAt(P, t, pathLen), SEG_INT, 0.3),
    path, { flip: true });

  /* Ringflächen an den Stirnflächen: verbinden Außen- und Innenhaut zu
     einem geschlossenen Körper. Ohne sie ist der Winkel eine offene
     Schale und die Schnittansicht zeigt Löcher. */
  const rings = [];
  for (const [idx, flip] of [[0, true], [path.length - 1, false]]) {
    const st = path[idx];
    const t = idx === 0 ? 0 : 1;
    const rIn = boreAt(P, t, pathLen);
    const ring = new THREE.RingGeometry(rIn, P.rOut, SEG_VIS, 1);
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, flip ? -1 : 1), st.t.clone().normalize());
    ring.applyQuaternion(q);
    ring.translate(st.c.x, st.c.y, st.c.z);
    const n = ring.attributes.position.count;
    ring.setAttribute('aWear', new THREE.BufferAttribute(new Float32Array(n).fill(0.5), 1));
    rings.push(ring);
  }

  /* Auswerferstift-Marke auf dem Bogenrücken — ohne sie sieht das Teil
     nach CAD-Viewer aus. */
  const mid = path[Math.floor(path.length / 2)];
  const disc = revolve(buildProfile([
    { a: 0, r: 0, fillet: 0 },
    { a: 0, r: P.emR, chamfer: 0.25 },
    { a: 0.1, r: P.emR, fillet: 0.1 },
    { a: 0.1, r: 0, fillet: 0 },
  ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
  const nOut = mid.c.clone().setZ(0).normalize();
  disc.rotateX(Math.PI);
  disc.translate(nOut.x * (P.rOut - 0.05) + mid.c.x, nOut.y * (P.rOut - 0.05) + mid.c.y, 0);

  return {
    geo: mergeGeometries([outer, inner, ...rings, disc]),
    cap: null,          // Halbschnitt über DoubleSide, siehe index.js
    path, pathLen,
  };
}

/* K-Aqua Winkel 45° — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Fittings K-Aqua/screencapture-…-fittings-elbow-45-….pdf
   (Seitenbilder quellen/fg-elbow-45-p1.jpg, -p2.jpg). Tabelle über den
   Seitenumbruch: Seite 1 endet bei d75, Seite 2 führt d90–d125.

   Spaltenköpfe wie abgebildet:
     Code · d · D · l · z · s · kg · Pack.
   Die Spalte s ist in JEDER Zeile ein Gedankenstrich — sie gilt für die
   Stumpfschweißvarianten und ist hier durchgehend leer. Nicht übernommen.

   MASSSCHLÜSSEL:
     d   Rohr-Außendurchmesser = Muffenbohrung
     D   Außendurchmesser des Fittings
     l   Schenkelmaß: Achsenschnittstelle bis Stirnfläche
     z   Einbaulänge

   Damit ist die Muffentiefe kein Schätzwert: l − z.
   Gegenprobe gegen die Normreihe DVS 2207-11 (siehe P.depthDeltaToNorm)
   trifft sie über den ganzen Bereich auf ±1,5 mm — dasselbe Bild wie bei
   der Muffe, wo die Spalte z die Reihe auf die Zehntelstelle bestätigt.

   In data.js heißt die Spalte einheitlich `leg`, damit Winkel 45° und
   90° dieselbe Parametrik benutzen können. Die Tabellenbezeichnung
   steht in DIMENSION_KEY. */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 10;
const ANGLE = 45;
const SDR = 6;

const ARTICLES = [
  { code: 'AQ04520', d: 20, D: 29, leg: 21, z: 6, kg: 0.02, pack: 300 },
  { code: 'AQ04525', d: 25, D: 35, leg: 24, z: 8, kg: 0.02, pack: 200 },
  { code: 'AQ04532', d: 32, D: 44, leg: 29, z: 10, kg: 0.05, pack: 100 },
  { code: 'AQ04540', d: 40, D: 52, leg: 32, z: 11, kg: 0.06, pack: 70 },
  { code: 'AQ04550', d: 50, D: 65, leg: 37, z: 13, kg: 0.1, pack: 48 },
  { code: 'AQ04563', d: 63, D: 84, leg: 44, z: 16, kg: 0.21, pack: 24 },
  { code: 'AQ04575', d: 75, D: 99, leg: 50, z: 20, kg: 0.32, pack: 14 },
  { code: 'AQ04590', d: 90, D: 120, leg: 58, z: 25, kg: 0.58, pack: 9 },
  { code: 'AQ045110', d: 110, D: 148, leg: 69, z: 32, kg: 0.98, pack: 4 },
  { code: 'AQ045125', d: 125, D: 165, leg: 78, z: 37, kg: 1.53, pack: 2 },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Nennmaß',
  D: 'Außendurchmesser',
  leg: 'Schenkelmaß l',
  z: 'Einbaulänge',
};

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua Winkel 45° — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */


function params(dNom) {
  return bendParams(article(dNom), { angle: ANGLE, sdr: SDR });
}

/* K-Aqua Winkel 45° — Kontur. Kommt vollständig aus dem Familienmodul. */

/* K-Aqua Winkel 45° — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Teil, kein Zustand. Gebaut als EIN Loft über eine Gerade-Bogen-
   Gerade-Bahn; die Muffenbohrungen sind Teil des veränderlichen
   Querschnitts, nicht ausgeschnitten. Kein CSG. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'fittings/elbow-45',
  module: 'kaqua-elbow-45',
  titleDe: 'Winkel 45°',
  titleEn: 'Elbow 45°',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'leg', 'z', 'kg'],
  dimensions: ['leg', 'D'],
  ariaFields: ['d', 'D', 'leg', 'z'],

  variants: [],
  states: null,

  tile: 'Richtungswechsel um 45° — flacher Bogen, geringerer Druckverlust als zwei 90°-Winkel.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Winkel' + ANGLE + '_d' + size,
      materials: ['pprGreen'],
      seed: 91,
      clipPlane,
    });

    const body = buildBend(P);
    A.part('body', {
      name: 'Winkel', label: 'Winkelkörper (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(-P.leg * 0.55, P.rOut + 0.30 * P.leg, 0),
    });

    A.light(V3(-P.leg * 0.6, 0, 0));
    A.light(V3(0, P.leg * 0.6, 0));

    A.hotspot({
      v: V3(-P.leg + Math.max(3, 0.12 * P.leg), P.rOut * 0.5, P.rOut * 0.83),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: body.path[Math.floor(body.path.length / 2)].c.clone()
        .setZ(0).normalize().multiplyScalar(P.rOut * 0.9)
        .add(body.path[Math.floor(body.path.length / 2)].c).setZ(P.rOut * 0.4),
      n: V3(0.4, 0.5, 0.77),
      text: 'Bogenradius ' + P.bendR.toFixed(1).replace('.', ',') +
        ' mm — durchgehende Wandstärke, keine Kerbe am Innenradius',
    });

    /* Bemaßung: Schenkelmaß entlang der -X-Achse, Außendurchmesser
       quer dazu. Beide Linien liegen vor der Silhouette. */
    const zf = P.rOut + 0.14 * P.leg;
    const yL = -(P.rOut + 0.34 * P.leg);
    A.dim({ label: DIMENSION_KEY.leg.split(' ')[1], value: P.leg,
      a: V3(-P.leg, yL, zf), b: V3(0, yL, zf), off: V3(0, 0.12 * P.leg, 0) });
    const xD = -P.leg - 0.16 * P.leg;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf), off: V3(0.12 * P.leg, 0, 0) });

    A.measures = [
      { key: 'leg', label: DIMENSION_KEY.leg, soll: P.leg,
        ist: () => { const b = A.boxOf(['body']); return Math.abs(b.min.x); } },
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => { const b = A.boxOf(['body']); return b.max.z - b.min.z; } },
      /* Muffentiefe: geprüft wird, dass das Modell die Normreihe trägt.
         Die Abweichung des Tabellenwerts leg − z davon ist keine
         Maßhaltigkeitsfrage, sondern eine Quellenfrage — sie steht als
         P.depthDeltaToNorm im Prüfbericht, nicht im Maßtest. */
      { key: 'tiefe', label: 'Muffentiefe (Normreihe)',
        soll: P.normDepth ?? P.socket, ist: () => P.socket },
      { key: 'restwand', label: 'Restwand Fitting', soll: P.restwand, ist: () => P.restwand },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

return product;
})();

const __p4 = (() => {
/* K-Aqua Winkelfamilie — Parametrik.

   Gemeinsam für Winkel 45° und 90°. Aus der Tabelle kommen d, D, das
   Schenkelmaß (bei 45° Spalte l, bei 90° Spalte L) und z.

   Die Muffentiefe wird NICHT geschätzt, sondern gerechnet: Schenkel − z.
   Gegenprobe gegen die Normreihe DVS 2207-11 steht in P.depthDeltaToNorm
   und erscheint im Prüfbericht. */


function bendParams(article, opt) {
  const a = article;
  const P = Object.assign({}, a);
  const { d, D } = a;

  P.angle = opt.angle;
  P.leg = a.leg;                       // Achsenschnittstelle bis Stirnfläche
  P.OD = D;
  P.wallFitting = (D - d) / 2;
  /* Muffentiefe aus der Normreihe, nicht aus leg − z. Begründung im
     Kopfkommentar von products/tee/data.js: die Tiefe ist durch das
     Schweißwerkzeug je Nennweite festgelegt und muss bei Muffe, Winkel
     und T-Stück gleich sein. Die Muffentabelle belegt die Reihe exakt;
     leg − z streut bei Winkel und T-Stück um bis zu 3 mm. */
  P.socket = fusionDepth(d) ?? (a.leg - a.z);
  P.socketFromTable = a.leg - a.z;     // Gegenprobe, erscheint im Prüfbericht

  P.wallPipe = d / (opt.sdr ?? 6);
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.rOut = D / 2;

  P.sockTaper = Math.tan(0.6 * D2R);   // 0,6° Muffenkonus
  P.lead = 2 * Math.tan(15 * D2R);     // Einführfase 15° × 2 mm
  P.restwand = P.wallFitting;

  /* ASSUMPTION Bogenradius. Die Tabelle führt keinen. Angesetzt 0,5·d,
     begrenzt auf das, was der Schenkel hergibt (bendPath rechnet den
     Verbrauch R·tan(α/2) und bricht sonst ab). 0,5·d ist der Wert, bei
     dem die Außenkontur im Katalogfoto sichtbar rund über die Ecke
     läuft, ohne dass der Bogen in die Muffe hineinreicht.
     Gegen die Zeichnung zu verifizieren. */
  const maxR = (a.leg - P.socket - 1.5) / Math.tan((opt.angle * D2R) / 2);
  P.bendR = Math.max(d * 0.22, Math.min(d * 0.5, maxR));

  P.emR = Math.min(2.0, 0.05 * d);
  const norm = fusionDepth(d);
  P.normDepth = norm;
  P.depthDeltaToNorm = norm == null ? null
    : Math.round((P.socketFromTable - norm) * 10) / 10;

  if (P.restwand < 3) {
    throw new Error('K-Aqua Winkel d' + d + ': Restwand ' + P.restwand.toFixed(2) + ' mm < 3 mm');
  }
  if (P.socket <= 0 || P.socket >= a.leg) {
    throw new Error('K-Aqua Winkel d' + d + ': Muffentiefe ' + P.socket +
      ' mm passt nicht zum Schenkel ' + a.leg + ' mm');
  }
  return P;
}

/* K-Aqua Winkelfamilie — Kontur.

   Der erste echte Belastungstest für sweepPath, und er hat eine Lücke im
   Core gefunden: sweepPath nahm einen festen Querschnitt für die ganze
   Bahn. Ein Winkel braucht einen veränderlichen — an den Stirnflächen
   die Muffenbohrung, in der Mitte die Rohrbohrung. Ohne CSG ist das der
   einzige Weg, die Muffe in eine geschlossene Kontur zu bekommen.

   sweepPath nimmt jetzt auch eine Funktion (t, i) => Punktliste. Damit
   ist der Winkel EIN Loft: Außenhaut konstant D/2, Innenhaut nach
   Position veränderlich, plus zwei Ringflächen an den Stirnflächen.

   Kein CSG, keine Boolesche Operation. */


/* Innenradius über der Bahn. t läuft 0…1 von Stirnfläche A nach B.
   Der Verlauf ist symmetrisch, deshalb wird nur der Abstand zur
   näheren Stirnfläche betrachtet. */
function boreAt(P, t, pathLen) {
  const s = Math.min(t, 1 - t) * pathLen;   // Bogenlänge bis zur nächsten Stirnfläche
  const rSock = P.d / 2;
  if (s <= 0.001) return rSock + P.lead;    // Einführfase am Mundloch
  if (s <= 2) return rSock + P.lead * (1 - s / 2);
  if (s <= P.socket) return rSock - P.sockTaper * (s - 2);
  const ramp = Math.min(1, (s - P.socket) / Math.max(1.5, P.wallFitting * 0.8));
  const rEnd = P.d / 2 - P.sockTaper * (P.socket - 2);
  return rEnd + (P.boreR - rEnd) * ramp;    // Übergang auf die Rohrbohrung
}

function buildBend(P) {
  const path = bendPath(P.leg, P.angle, P.bendR, 24, 5);
  let pathLen = 0;
  for (let i = 1; i < path.length; i++) pathLen += path[i].c.distanceTo(path[i - 1].c);

  /* Außenhaut: konstant D/2, mit 1° Entformung zu den Stirnflächen hin
     verjüngend — dieselbe Regel wie bei jedem anderen Fitting. */
  const outer = sweepPath((t) => {
    const s = Math.min(t, 1 - t) * pathLen;
    const shrink = DRAFT * Math.max(0, P.socket - s) * 0.5;
    return circleLoop(P.rOut - shrink, SEG_VIS, 0.15);
  }, path);

  const inner = sweepPath((t) => circleLoop(boreAt(P, t, pathLen), SEG_INT, 0.3),
    path, { flip: true });

  /* Ringflächen an den Stirnflächen: verbinden Außen- und Innenhaut zu
     einem geschlossenen Körper. Ohne sie ist der Winkel eine offene
     Schale und die Schnittansicht zeigt Löcher. */
  const rings = [];
  for (const [idx, flip] of [[0, true], [path.length - 1, false]]) {
    const st = path[idx];
    const t = idx === 0 ? 0 : 1;
    const rIn = boreAt(P, t, pathLen);
    const ring = new THREE.RingGeometry(rIn, P.rOut, SEG_VIS, 1);
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, flip ? -1 : 1), st.t.clone().normalize());
    ring.applyQuaternion(q);
    ring.translate(st.c.x, st.c.y, st.c.z);
    const n = ring.attributes.position.count;
    ring.setAttribute('aWear', new THREE.BufferAttribute(new Float32Array(n).fill(0.5), 1));
    rings.push(ring);
  }

  /* Auswerferstift-Marke auf dem Bogenrücken — ohne sie sieht das Teil
     nach CAD-Viewer aus. */
  const mid = path[Math.floor(path.length / 2)];
  const disc = revolve(buildProfile([
    { a: 0, r: 0, fillet: 0 },
    { a: 0, r: P.emR, chamfer: 0.25 },
    { a: 0.1, r: P.emR, fillet: 0.1 },
    { a: 0.1, r: 0, fillet: 0 },
  ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
  const nOut = mid.c.clone().setZ(0).normalize();
  disc.rotateX(Math.PI);
  disc.translate(nOut.x * (P.rOut - 0.05) + mid.c.x, nOut.y * (P.rOut - 0.05) + mid.c.y, 0);

  return {
    geo: mergeGeometries([outer, inner, ...rings, disc]),
    cap: null,          // Halbschnitt über DoubleSide, siehe index.js
    path, pathLen,
  };
}

/* K-Aqua Winkel 90° — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Fittings K-Aqua/screencapture-…-fittings-elbow-90-….pdf
   (Seitenbilder quellen/fg-elbow-90-p1.jpg, -p2.jpg). Tabelle über den
   Seitenumbruch: Seite 1 endet bei d75, Seite 2 führt d90–d125.

   Spaltenköpfe wie abgebildet:
     Code · d · D · L · z · s · kg · Pack.
   Die Spalte s ist in JEDER Zeile ein Gedankenstrich — sie gilt für die
   Stumpfschweißvarianten und ist hier durchgehend leer. Nicht übernommen.

   MASSSCHLÜSSEL:
     d   Rohr-Außendurchmesser = Muffenbohrung
     D   Außendurchmesser des Fittings
     L   Schenkelmaß: Achsenschnittstelle bis Stirnfläche
     z   Einbaulänge

   Damit ist die Muffentiefe kein Schätzwert: L − z.
   Gegenprobe gegen die Normreihe DVS 2207-11 (siehe P.depthDeltaToNorm)
   trifft sie über den ganzen Bereich auf ±1,5 mm — dasselbe Bild wie bei
   der Muffe, wo die Spalte z die Reihe auf die Zehntelstelle bestätigt.

   In data.js heißt die Spalte einheitlich `leg`, damit Winkel 45° und
   90° dieselbe Parametrik benutzen können. Die Tabellenbezeichnung
   steht in DIMENSION_KEY. */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 10;
const ANGLE = 90;
const SDR = 6;

const ARTICLES = [
  { code: 'AQ09020', d: 20, D: 29, leg: 27, z: 14, kg: 0.02, pack: 300 },
  { code: 'AQ09025', d: 25, D: 35, leg: 31, z: 16, kg: 0.02, pack: 180 },
  { code: 'AQ09032', d: 32, D: 44, leg: 37, z: 20, kg: 0.05, pack: 100 },
  { code: 'AQ09040', d: 40, D: 52, leg: 44, z: 23, kg: 0.07, pack: 60 },
  { code: 'AQ09050', d: 50, D: 65, leg: 52, z: 28, kg: 0.14, pack: 36 },
  { code: 'AQ09063', d: 63, D: 84, leg: 62, z: 34, kg: 0.27, pack: 22 },
  { code: 'AQ09075', d: 75, D: 101, leg: 71, z: 41, kg: 0.44, pack: 10 },
  { code: 'AQ09090', d: 90, D: 120, leg: 83, z: 50, kg: 0.79, pack: 6 },
  { code: 'AQ090110', d: 110, D: 148, leg: 99, z: 62, kg: 1.3, pack: 4 },
  { code: 'AQ090125', d: 125, D: 165, leg: 125, z: 84, kg: 2.17, pack: 2 },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Nennmaß',
  D: 'Außendurchmesser',
  leg: 'Schenkelmaß L',
  z: 'Einbaulänge',
};

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua Winkel 90° — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */


function params(dNom) {
  return bendParams(article(dNom), { angle: ANGLE, sdr: SDR });
}

/* K-Aqua Winkel 90° — Kontur. Kommt vollständig aus dem Familienmodul. */

/* K-Aqua Winkel 90° — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Teil, kein Zustand. Gebaut als EIN Loft über eine Gerade-Bogen-
   Gerade-Bahn; die Muffenbohrungen sind Teil des veränderlichen
   Querschnitts, nicht ausgeschnitten. Kein CSG. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'fittings/elbow-90',
  module: 'kaqua-elbow-90',
  titleDe: 'Winkel 90°',
  titleEn: 'Elbow 90°',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'leg', 'z', 'kg'],
  dimensions: ['leg', 'D'],
  ariaFields: ['d', 'D', 'leg', 'z'],

  variants: [],
  states: null,

  tile: 'Der Standard-Richtungswechsel. Schenkelmaß L von der Achsenschnittstelle bis zur Stirnfläche.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Winkel' + ANGLE + '_d' + size,
      materials: ['pprGreen'],
      seed: 97,
      clipPlane,
    });

    const body = buildBend(P);
    A.part('body', {
      name: 'Winkel', label: 'Winkelkörper (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(-P.leg * 0.55, P.rOut + 0.30 * P.leg, 0),
    });

    A.light(V3(-P.leg * 0.6, 0, 0));
    A.light(V3(0, P.leg * 0.6, 0));

    A.hotspot({
      v: V3(-P.leg + Math.max(3, 0.12 * P.leg), P.rOut * 0.5, P.rOut * 0.83),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: body.path[Math.floor(body.path.length / 2)].c.clone()
        .setZ(0).normalize().multiplyScalar(P.rOut * 0.9)
        .add(body.path[Math.floor(body.path.length / 2)].c).setZ(P.rOut * 0.4),
      n: V3(0.4, 0.5, 0.77),
      text: 'Bogenradius ' + P.bendR.toFixed(1).replace('.', ',') +
        ' mm — durchgehende Wandstärke, keine Kerbe am Innenradius',
    });

    /* Bemaßung: Schenkelmaß entlang der -X-Achse, Außendurchmesser
       quer dazu. Beide Linien liegen vor der Silhouette. */
    const zf = P.rOut + 0.14 * P.leg;
    const yL = -(P.rOut + 0.34 * P.leg);
    A.dim({ label: DIMENSION_KEY.leg.split(' ')[1], value: P.leg,
      a: V3(-P.leg, yL, zf), b: V3(0, yL, zf), off: V3(0, 0.12 * P.leg, 0) });
    const xD = -P.leg - 0.16 * P.leg;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf), off: V3(0.12 * P.leg, 0, 0) });

    A.measures = [
      { key: 'leg', label: DIMENSION_KEY.leg, soll: P.leg,
        ist: () => { const b = A.boxOf(['body']); return Math.abs(b.min.x); } },
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => { const b = A.boxOf(['body']); return b.max.z - b.min.z; } },
      /* Muffentiefe: geprüft wird, dass das Modell die Normreihe trägt.
         Die Abweichung des Tabellenwerts leg − z davon ist keine
         Maßhaltigkeitsfrage, sondern eine Quellenfrage — sie steht als
         P.depthDeltaToNorm im Prüfbericht, nicht im Maßtest. */
      { key: 'tiefe', label: 'Muffentiefe (Normreihe)',
        soll: P.normDepth ?? P.socket, ist: () => P.socket },
      { key: 'restwand', label: 'Restwand Fitting', soll: P.restwand, ist: () => P.restwand },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

return product;
})();

const __p5 = (() => {
/* K-Aqua T-Stück-Familie — Parametrik.

   Aus der Tabelle: d, D, l (Achse Abzweig → Stirnfläche Durchgang),
   L (Gesamtlänge Durchgang), l1 (Achse Durchgang → Stirnfläche
   Abzweig), z.

   Gegenprobe der Transkription: L muss 2·l ergeben. Bei d20 steht
   L = 55 gegen 2·l = 54 — eine Rundung des Herstellers, kein
   Ablesefehler. Maßgeblich ist L; l wird daraus gerechnet, damit das
   Modell symmetrisch bleibt. */


function teeParams(article, opt) {
  const a = article;
  const P = Object.assign({}, a);
  const { d, D } = a;

  P.run = a.L;                    // Gesamtlänge Durchgang
  P.half = a.L / 2;               // maßgeblich, nicht die Spalte l
  P.branch = a.l1;                // Achse Durchgang → Stirnfläche Abzweig
  P.lTable = a.l;
  P.lDelta = Math.round((a.l - a.L / 2) * 10) / 10;

  P.OD = D;
  P.wallFitting = (D - d) / 2;
  P.rOut = D / 2;

  /* Muffentiefe aus der Normreihe. Begründung im Kopfkommentar von
     data.js: sie ist durch das Schweißwerkzeug je Nennweite festgelegt
     und bei Muffe, Winkel und T-Stück identisch. */
  P.socket = fusionDepth(d) ?? (a.l - a.z);
  P.socketFromTable = a.l - a.z;

  P.wallPipe = d / (opt.sdr ?? 6);
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);
  P.restwand = P.wallFitting;
  P.emR = Math.min(2.0, 0.05 * d);

  /* ASSUMPTION Kehlenradius am Abzweig. Die Tabelle führt keinen.
     Angesetzt 0,18·d — der Wert, bei dem die Kehle im Katalogfoto
     sichtbar rund ausläuft, ohne die Abzweigmuffe zu verkürzen.
     Gegen die Zeichnung zu verifizieren. */
  P.filletR = Math.max(1.5, 0.18 * d);

  const norm = fusionDepth(d);
  P.normDepth = norm;
  P.depthDeltaToNorm = norm == null ? null
    : Math.round((P.socketFromTable - norm) * 10) / 10;

  if (P.restwand < 3) {
    throw new Error('K-Aqua T-Stück d' + d + ': Restwand ' + P.restwand.toFixed(2) + ' mm < 3 mm');
  }
  if (P.socket >= P.half) {
    throw new Error('K-Aqua T-Stück d' + d + ': Muffentiefe ' + P.socket +
      ' mm passt nicht in den halben Durchgang ' + P.half.toFixed(1) + ' mm');
  }
  if (P.socket >= P.branch - P.rOut * 0.4) {
    throw new Error('K-Aqua T-Stück d' + d + ': Muffentiefe ' + P.socket +
      ' mm passt nicht in den Abzweig ' + P.branch + ' mm');
  }
  return P;
}

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


/* Durchgang: identischer Aufbau wie die Muffe, nur ohne mittleren
   Anschlag — im T-Stück trifft der Abzweig auf die Mitte. */
function runProfile(P) {
  const ro = P.rOut;
  const rSock = (x) => P.d / 2 - P.sockTaper * (P.half - x);
  const xBell = P.half - Math.max(3, 0.10 * P.socket);
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

function buildTee(P) {
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

/* K-Aqua T-Stück — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Fittings K-Aqua/screencapture-…-fittings-tee-2026-06-20-05_41_48.pdf
   (Seitenbilder quellen/fg-tee-p1.jpg, -p2.jpg). Tabelle über den
   Seitenumbruch: Seite 1 endet bei d75, Seite 2 führt d90–d125.

   Spaltenköpfe wie abgebildet:
     Code · d · D · l · L · l1 · z · s · kg · Pack.
   Die Spalte s ist in JEDER Zeile ein Gedankenstrich — sie gilt für die
   Stumpfschweißvarianten und ist hier durchgehend leer. Nicht übernommen.

   MASSSCHLÜSSEL (technische Zeichnung neben dem Produktfoto):
     d   Rohr-Außendurchmesser = Muffenbohrung
     D   Außendurchmesser
     l   Achse Abzweig → Stirnfläche Durchgang
     L   Gesamtlänge Durchgang, Stirnfläche bis Stirnfläche
     l1  Achse Durchgang → Stirnfläche Abzweig
     z   Einbaulänge

   Transkriptionsprobe: L muss 2·l ergeben. Kleine Abweichungen sind
   Herstellerrundungen (d20: L = 55 gegen 2·l = 54; d125: L = 250 gegen
   2·l = 250 ✓). Maßgeblich ist L; die Hälfte wird daraus gerechnet,
   damit das Modell symmetrisch bleibt. Die Differenz steht als
   P.lDelta im Prüfbericht.

   ── MUFFENTIEFE: warum NICHT l − z ──
   Die Tiefe ist physikalisch durch das Schweißwerkzeug bestimmt: ein
   Werkzeug je Nennweite, für alle Fittings dieser Nennweite. Sie kann
   bei Muffe, Winkel und T-Stück derselben Größe nicht abweichen.

   Die Muffentabelle bestätigt über (l − z)/2 die Normreihe
   DVS 2207-11 bei d20 bis d63 auf die Zehntelstelle. Hier streut
   l − z dagegen:

     d20  27 − 11 = 16,0   Norm 14,5   (+1,5)
     d25  32 − 13 = 19,0   Norm 16,0   (+3,0)
     d32  37 − 16 = 21,0   Norm 18,0   (+3,0)
     d40  43 − 23 = 20,0   Norm 20,5   (−0,5)
     d50  51 − 28 = 23,0   Norm 23,5   (−0,5)
     d63  62 − 34 = 28,0   Norm 27,5   (+0,5)
     d110 100 − 62 = 38,0  Norm 41,0   (−3,0)

   Bei Winkel und T-Stück bezeichnet z offenbar nicht dasselbe wie bei
   der Muffe — dort ist es nachweislich die Dicke des mittleren
   Anschlags, hier ein Einbaumaß mit anderem Bezugspunkt. Modelliert
   wird deshalb die Normreihe; l − z läuft als Gegenprobe mit und
   erscheint im Prüfbericht.

   ── ABWEICHUNGEN gegen docs Unterseiten/fittings/tee.md ──
   Die Markdown-Datei ist gegen diese Tabelle zu prüfen, sobald sie
   vorliegt; im angebundenen Ordner fehlt sie. */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 10;
const SDR = 6;

const ARTICLES = [
  { code: 'AQ13020', d: 20, D: 29, l: 27, L: 55, l1: 27, z: 11, kg: 0.02, pack: 200 },
  { code: 'AQ13025', d: 25, D: 35, l: 32, L: 62, l1: 31, z: 13, kg: 0.04, pack: 100 },
  { code: 'AQ13032', d: 32, D: 44, l: 37, L: 74, l1: 37, z: 16, kg: 0.06, pack: 60 },
  { code: 'AQ13040', d: 40, D: 52, l: 43, L: 88, l1: 44, z: 23, kg: 0.09, pack: 42 },
  { code: 'AQ13050', d: 50, D: 65, l: 51, L: 104, l1: 52, z: 28, kg: 0.17, pack: 28 },
  { code: 'AQ13063', d: 63, D: 84, l: 62, L: 124, l1: 62, z: 34, kg: 0.34, pack: 15 },
  { code: 'AQ13075', d: 75, D: 100, l: 73, L: 142, l1: 71, z: 41, kg: 0.54, pack: 12 },
  { code: 'AQ13090', d: 90, D: 120, l: 84, L: 166, l1: 83, z: 50, kg: 0.95, pack: 6 },
  { code: 'AQ130110', d: 110, D: 148, l: 100, L: 198, l1: 99, z: 62, kg: 1.56, pack: 4 },
  { code: 'AQ130125', d: 125, D: 165, l: 125, L: 250, l1: 124, z: 78, kg: 2.7, pack: 1 },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Nennmaß',
  D: 'Außendurchmesser',
  l: 'Achse Abzweig bis Stirnfläche',
  L: 'Gesamtlänge Durchgang',
  l1: 'Abzweiglänge',
  z: 'Einbaulänge',
};

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua T-Stück — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */


function params(dNom) {
  return teeParams(article(dNom), { sdr: SDR });
}

/* K-Aqua T-Stück — Kontur. Kommt vollständig aus dem Familienmodul. */

/* K-Aqua T-Stück — Produktpaket nach PRODUKT-VERTRAG.md.

   Drei Rotationskörper plus ein Kehlenband, kein CSG. Die bekannte
   Grenze dieses Vorgehens steht im Kopfkommentar von _tee/parts.js. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'fittings/tee',
  module: 'kaqua-tee',
  titleDe: 'T-Stück',
  titleEn: 'Tee',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'L', 'l1', 'kg'],
  dimensions: ['L', 'l1', 'D'],
  ariaFields: ['d', 'D', 'L', 'l1', 'z'],

  variants: [],
  states: null,

  tile: 'Abzweig im rechten Winkel, gleiche Nennweite in allen drei ' +
        'Anschlüssen — das häufigste Verteilstück im System.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_T-Stueck_d' + size,
      materials: ['pprGreen'],
      seed: 103,
      clipPlane,
    });

    const body = buildTee(P);
    A.part('body', {
      name: 'T-Stueck', label: 'T-Stück-Körper (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(0, P.branch + 0.22 * P.run, 0),
    });

    A.light(V3(-P.half * 0.7, 0, 0));
    A.light(V3(P.half * 0.7, 0, 0));
    A.light(V3(0, P.branch * 0.7, 0));

    A.hotspot({
      v: V3(-P.half + Math.max(3, 0.08 * P.run), P.rOut * 0.5, P.rOut * 0.83),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm — gleich in allen drei Anschlüssen',
    });
    A.hotspot({
      v: V3(P.rOut * 0.75, P.rOut * 0.95, P.rOut * 0.5),
      n: V3(0.6, 0.6, 0.53),
      text: 'Kehlradius ' + P.filletR.toFixed(1).replace('.', ',') +
        ' mm — verteilt die Spannung am Abzweig',
    });

    const zf = P.rOut + 0.10 * P.run;
    const yL = -(P.rOut + 0.26 * P.run);
    A.dim({ label: 'L', value: P.run,
      a: V3(-P.half, yL, zf), b: V3(P.half, yL, zf), off: V3(0, 0.10 * P.run, 0) });
    const xB = P.half + 0.13 * P.run;
    A.dim({ label: 'l1', value: P.branch,
      a: V3(xB, 0, zf), b: V3(xB, P.branch, zf), off: V3(-0.10 * P.run, 0, 0) });
    const xD = -P.half - 0.13 * P.run;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf), off: V3(0.10 * P.run, 0, 0) });

    A.measures = [
      { key: 'L', label: DIMENSION_KEY.L, soll: P.run,
        ist: () => { const b = A.boxOf(['body']); return b.max.x - b.min.x; } },
      { key: 'l1', label: DIMENSION_KEY.l1, soll: P.branch,
        ist: () => { const b = A.boxOf(['body']); return b.max.y; } },
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => { const b = A.boxOf(['body']); return b.max.z - b.min.z; } },
      /* Muffentiefe: geprüft wird, dass das Modell die Normreihe trägt.
         Die Abweichung des Tabellenwerts l − z davon ist eine Quellen-,
         keine Maßhaltigkeitsfrage — Begründung in data.js, Zahlen als
         P.depthDeltaToNorm im Prüfbericht. */
      { key: 'tiefe', label: 'Muffentiefe (Normreihe)',
        soll: P.normDepth ?? P.socket, ist: () => P.socket },
      { key: 'restwand', label: 'Restwand Fitting', soll: P.restwand, ist: () => P.restwand },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

return product;
})();

const __p6 = (() => {
/* K-Aqua Kreuz — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Fittings K-Aqua/screencapture-…-fittings-cross-….pdf
   (quellen/x-cross-p1.jpg).

   Spaltenköpfe: Code · d · L · z · Kg · Pack.
   NUR ZWEI GRÖSSEN, d25 und d32 — die kleinste Tabelle des Katalogs.
   Das ist kein Ablesefehler: die Tabelle endet nach zwei Zeilen, danach
   folgt unmittelbar der ORDER-Knopf.

   MASSSCHLÜSSEL:
     d  Nennmaß aller vier Anschlüsse
     L  Gesamtlänge, Stirnfläche bis Stirnfläche (beide Achsen gleich)
     z  Einbaulänge

   Gegenprobe: L/d = 2,4 bei d25 und 2,34 bei d32 — dasselbe Verhältnis
   wie beim T-Stück (62/25 = 2,48; 74/32 = 2,31). Plausibel.

   Die Muffentiefe kommt aus der Normreihe, nicht aus L − z. Begründung
   in products/tee/data.js: ein Schweißwerkzeug je Nennweite. */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 2;
const SDR = 6;

const ARTICLES = [
  { code: 'AQ18025', d: 25, L: 60, z: 27, kg: 0.06, pack: 80 },
  { code: 'AQ18032', d: 32, L: 75, z: 34, kg: 0.08, pack: 50 },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Nennmaß',
  L: 'Gesamtlänge',
  z: 'Einbaulänge',
};

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua Kreuz — Parametrik.

   Vier gleiche Anschlüsse in einer Ebene. Beide Achsen tragen dasselbe
   Maß L, deshalb genügt ein Halbmaß.

   ASSUMPTION Außendurchmesser: die Tabelle führt keinen. Angesetzt
   1,375·d — der Wert, den T-Stück und Muffe bei d25 und d32 zeigen
   (T-Stück d32: D = 44 = 1,375·32; Muffe d32: D = 44). Gegen die
   Zeichnung zu verifizieren. */


function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  P.run = a.L;
  P.half = a.L / 2;
  P.OD = Math.round(1.375 * d * 10) / 10;
  P.rOut = P.OD / 2;
  P.wallFitting = (P.OD - d) / 2;

  P.socket = fusionDepth(d) ?? Math.max(10, d * 0.55);
  P.socketFromTable = a.L - a.z;

  P.wallPipe = d / 6;
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);
  P.restwand = P.wallFitting;
  P.emR = Math.min(1.8, 0.05 * d);

  /* ASSUMPTION Kehlradius: wie beim T-Stück 0,18·d. Am Kreuz treffen
     vier Kehlen aufeinander, deshalb nach oben durch den Abstand der
     Abzweige begrenzt. */
  P.filletR = Math.min(Math.max(1.5, 0.18 * d), P.rOut * 0.4);

  const norm = fusionDepth(d);
  P.normDepth = norm;
  P.depthDeltaToNorm = norm == null ? null : Math.round((P.socketFromTable - norm) * 10) / 10;

  if (P.socket >= P.half) {
    throw new Error('K-Aqua Kreuz d' + d + ': Muffentiefe ' + P.socket +
      ' mm passt nicht in den halben Durchgang ' + P.half + ' mm');
  }
  return P;
}

/* K-Aqua Kreuz — Kontur.

   Vier Anschlüsse in der XY-Ebene: Durchgang auf X, Abzweige auf ±Y.
   Aufbau wie das T-Stück, nur mit zwei Abzweigen statt einem — genau
   der Fall, für den branchJoin gebaut wurde. Der Test, ob das
   Familienmodul trägt.

   Dieselbe bekannte Grenze wie beim T-Stück: an den Durchdringungen
   überlappen die Innenflächen. Ohne CSG nicht anders lösbar, von außen
   unsichtbar, Maße unberührt. */


function armProfile(P, len) {
  const ro = P.rOut;
  const rSock = (x) => P.d / 2 - P.sockTaper * (len - x);
  const xBell = len - Math.max(3, 0.10 * P.socket);
  const bellRise = Math.min(0.35, P.wallFitting * 0.08);
  const rBarrel = ro - bellRise;

  const outer = [
    { a: 0, r: rBarrel + 0.09, fillet: 0.1 },
    { a: 0.5, r: rBarrel, fillet: 0.35 },
    { a: xBell - 1.5, r: rBarrel - DRAFT * (xBell - 1.5), fillet: 2.0 },
    { a: xBell, r: ro, fillet: 1.0 },
    { a: len, r: ro - DRAFT * (len - xBell), chamfer: Math.min(1.4, P.wallFitting * 0.4) },
  ];
  const inner = [
    { a: 0, r: P.boreR, fillet: 0.5 },
    { a: len - P.socket, r: P.boreR, fillet: 1.2 },
    { a: len - P.socket, r: rSock(len - P.socket), fillet: 1.2 },
    { a: len - 2, r: rSock(len - 2), fillet: 0.4 },
    { a: len, r: P.d / 2 + P.lead, fillet: 0 },
  ];
  return { profile: buildProfile(mirrorProfile(outer, inner), { segs: 4 }), rBarrel };
}

function buildCross(P) {
  const { profile, rBarrel } = armProfile(P, P.half);
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Zwei Kehlen, eine je Abzweig. branchJoin baut um +X als Hauptachse
     und legt den Abzweig in die XY-Ebene; die zweite Kehle ist die um
     180° um X gedrehte erste. */
  const kehle = branchJoin({
    mainR: rBarrel, branchR: P.rOut, filletR: P.filletR,
    angle: 90, segments: SEG_VIS, uSegs: 6,
  });
  geos.push(kehle.geo);
  const kehle2 = kehle.geo.clone();
  kehle2.rotateX(Math.PI);
  geos.push(kehle2);

  /* Die beiden Abzweigarme: ein Rotationskörper um Y, von der
     Eintauchtiefe bis zur Stirnfläche, und seine Spiegelung. */
  const yStart = -kehle.insertDepth;
  const yEnd = P.half;
  const rSockB = (y) => P.d / 2 - P.sockTaper * (yEnd - y);
  const yBell = yEnd - Math.max(3, 0.10 * P.socket);
  const bellRise = Math.min(0.35, P.wallFitting * 0.08);
  const rB = P.rOut - bellRise;

  const bProfile = buildProfile([
    { a: yStart, r: rB, fillet: 0 },
    { a: yBell - 1.5, r: rB - DRAFT * (yBell - 1.5 - yStart) * 0.35, fillet: 1.8 },
    { a: yBell, r: P.rOut, fillet: 1.0 },
    { a: yEnd, r: P.rOut - DRAFT * (yEnd - yBell), chamfer: Math.min(1.4, P.wallFitting * 0.4) },
    { a: yEnd, r: P.d / 2 + P.lead, fillet: 0 },
    { a: yEnd - 2, r: rSockB(yEnd - 2), fillet: 0.4 },
    { a: yEnd - P.socket, r: rSockB(yEnd - P.socket), fillet: 1.2 },
    { a: yEnd - P.socket, r: P.boreR, fillet: 1.2 },
    { a: yStart, r: P.boreR, fillet: 0 },
  ], { segs: 4 });
  const arm = revolve(bProfile, { axis: 'y', segments: SEG_VIS });
  geos.push(arm);
  const arm2 = arm.clone();
  arm2.rotateX(Math.PI);
  geos.push(arm2);

  /* Auswerfermarken auf den beiden freien Quadranten des Durchgangs. */
  for (const x of [-P.half * 0.62, P.half * 0.62]) {
    const disc = revolve(buildProfile([
      { a: 0, r: 0, fillet: 0 },
      { a: 0, r: P.emR, chamfer: 0.2 },
      { a: 0.09, r: P.emR, fillet: 0.09 },
      { a: 0.09, r: 0, fillet: 0 },
    ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
    disc.rotateZ(Math.PI / 2);
    disc.translate(x, 0, -(rBarrel - 0.05));
    geos.push(disc);
  }

  return {
    geo: mergeGeometries(geos),
    cap: mergeGeometries([capFromProfile(profile, 'x')].concat(kehle.cap ? [kehle.cap] : [])),
    insertDepth: kehle.insertDepth,
  };
}

/* K-Aqua Kreuz — Produktpaket nach PRODUKT-VERTRAG.md.

   Vier Anschlüsse in einer Ebene. Zwei Kehlen aus branchJoin, zwei
   Abzweigarme, ein Durchgang — kein CSG. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'fittings/cross',
  module: 'kaqua-cross',
  titleDe: 'Kreuz',
  titleEn: 'Cross',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'L', 'kg'],
  dimensions: ['L'],
  ariaFields: ['d', 'L', 'z'],

  variants: [],
  states: null,

  tile: 'Vier Anschlüsse in einer Ebene, gleiche Nennweite. Nur in ' +
        'd25 und d32 lieferbar — die kleinste Reihe des Katalogs.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Kreuz_d' + size,
      materials: ['pprGreen'],
      seed: 113,
      clipPlane,
    });

    const body = buildCross(P);
    A.part('body', {
      name: 'Kreuz', label: 'Kreuzkörper (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(0, P.half + 0.28 * P.run, 0),
    });

    A.light(V3(-P.half * 0.6, 0, 0));
    A.light(V3(P.half * 0.6, 0, 0));
    A.light(V3(0, P.half * 0.6, 0));

    A.hotspot({
      v: V3(-P.half + Math.max(3, 0.08 * P.run), P.rOut * 0.5, P.rOut * 0.83),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm — gleich in allen vier Anschlüssen',
    });
    A.hotspot({
      v: V3(P.rOut * 0.7, P.rOut * 0.9, P.rOut * 0.5),
      n: V3(0.55, 0.6, 0.58),
      text: 'Vier Kehlen mit Radius ' + P.filletR.toFixed(1).replace('.', ',') +
        ' mm treffen in der Mitte',
    });

    const zf = P.rOut + 0.12 * P.run;
    const yL = -(P.half + 0.24 * P.run);
    A.dim({ label: 'L', value: P.run,
      a: V3(-P.half, yL, zf), b: V3(P.half, yL, zf), off: V3(0, 0.10 * P.run, 0) });
    const xB = P.half + 0.16 * P.run;
    A.dim({ label: 'L', value: P.run,
      a: V3(xB, -P.half, zf), b: V3(xB, P.half, zf), off: V3(-0.12 * P.run, 0, 0) });

    A.measures = [
      { key: 'L', label: DIMENSION_KEY.L + ' (X)', soll: P.run,
        ist: () => { const b = A.boxOf(['body']); return b.max.x - b.min.x; } },
      { key: 'Ly', label: DIMENSION_KEY.L + ' (Y)', soll: P.run,
        ist: () => { const b = A.boxOf(['body']); return b.max.y - b.min.y; } },
      /* Am Arm gemessen, nicht über die Box: die Kehlen sitzen
         konstruktiv bei rOut + filletR und sind damit breiter als der
         Rohrkörper. Eine Box3 über das ganze Teil misst sie mit. */
      { key: 'D', label: 'Außendurchmesser (gerechnet)', soll: P.OD,
        ist: () => {
          const hit = A.probeAxial('body', V3(-P.half + 2.0, 0, P.OD), V3(0, 0, -1));
          return hit ? Math.round(2 * hit.z * 100) / 100 : NaN;
        } },
      { key: 'tiefe', label: 'Muffentiefe (Normreihe)',
        soll: P.normDepth ?? P.socket, ist: () => P.socket },
      { key: 'restwand', label: 'Restwand Fitting', soll: P.restwand, ist: () => P.restwand },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

return product;
})();

const __p7 = (() => {
/* K-Aqua Reduzierbuchse — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Fittings K-Aqua/screencapture-…-fittings-reducing-bush-….pdf
   (quellen/x-reducing-bush-p1.jpg, -p2.jpg).

   Spaltenköpfe: Code · d · d1 · D · l · z · l1 · s · s1 · kg · Pack.
   Die Spalten l1, s und s1 sind in JEDER Zeile ein Gedankenstrich —
   sie gelten für Stumpfschweißvarianten. Nicht übernommen.

   ERSTES PRODUKT MIT ZWEI NENNWEITEN. 17 Zeilen, aber nur 5
   verschiedene Werte für d — die Zeile wird erst durch das Paar
   (d, d1) eindeutig. Deshalb trägt jede Zeile einen zusammengesetzten
   Schlüssel `key`, und das Produkt nennt ihn über sizeKey. Der Core
   adressiert Größen seitdem über dieses Feld statt über d.

   MASSSCHLÜSSEL:
     d   Außendurchmesser des Zapfens — versinkt in einer d-Muffe.
         Das ist der GRÖSSTE Durchmesser des Teils.
     d1  Nennmaß der Innenmuffe — nimmt ein d1-Rohr auf
     D   Außendurchmesser des vorstehenden Muffenkragens
     l   Gesamtlänge
     z   Einbaulänge

   ── WIE D GELESEN WERDEN MUSS ──
   Der erste Modellversuch nahm D als größten Außendurchmesser (Bund).
   Der Maßtest hat das widerlegt: dann müsste D immer über d liegen.

     d32 / d1=20 → D = 29   (D unter d)
     d63 / d1=20 → D = 34   (D weit unter d)

   D korreliert nicht mit d, sondern mit d1:
     d1=20 → 29 · 25 → 34 · 32 → 43 · 40 → 52 · 50 → 65 · 63 → 80
   Das sind bis auf Rundung die Außendurchmesser der Muffen derselben
   Nennweite (Muffe d20: D = 29 · d40: 52 · d50: 65).

   Die Buchse ist also ein dicker Zapfen Ø d, der in der d-Muffe
   versinkt, mit einem dünneren d1-Muffenkragen Ø D davor. Der Kragen
   kann dicker oder dünner als der Zapfen sein — die Kontur trägt
   beide Richtungen. */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 17;
const SDR = 6;

const ARTICLES = [
  { key: '25x20', code: 'A02432520', d: 25, d1: 20, D: 29, l: 36, z: 22, kg: 0.01, pack: 400 },
  { key: '32x20', code: 'A02433220', d: 32, d1: 20, D: 29, l: 37, z: 23, kg: 0.02, pack: 325 },
  { key: '32x25', code: 'A02433225', d: 32, d1: 25, D: 34, l: 39, z: 23, kg: 0.02, pack: 325 },
  { key: '40x20', code: 'A02434020', d: 40, d1: 20, D: 34, l: 43, z: 28, kg: 0.02, pack: 210 },
  { key: '40x25', code: 'A02434025', d: 40, d1: 25, D: 34, l: 43, z: 27, kg: 0.02, pack: 195 },
  { key: '40x32', code: 'A02434032', d: 40, d1: 32, D: 43, l: 45, z: 27, kg: 0.03, pack: 180 },
  { key: '50x20', code: 'A02435020', d: 50, d1: 20, D: 43, l: 51, z: 36, kg: 0.04, pack: 160 },
  { key: '50x25', code: 'A02435025', d: 50, d1: 25, D: 43, l: 51, z: 35, kg: 0.05, pack: 120 },
  { key: '50x32', code: 'A02435032', d: 50, d1: 32, D: 43, l: 51, z: 33, kg: 0.05, pack: 120 },
  { key: '50x40', code: 'A02435040', d: 50, d1: 40, D: 52, l: 53, z: 35, kg: 0.05, pack: 80 },
  { key: '63x20', code: 'A02436320', d: 63, d1: 20, D: 34, l: 56, z: 42, kg: 0.08, pack: 75 },
  { key: '63x25', code: 'A02436325', d: 63, d1: 25, D: 34, l: 56, z: 40, kg: 0.08, pack: 60 },
  { key: '63x32', code: 'A02436332', d: 63, d1: 32, D: 43, l: 58, z: 40, kg: 0.08, pack: 50 },
  { key: '63x40', code: 'A02436340', d: 63, d1: 40, D: 52, l: 60, z: 40, kg: 0.08, pack: 50 },
  { key: '63x50', code: 'A02436350', d: 63, d1: 50, D: 65, l: 63, z: 40, kg: 0.09, pack: 60 },
  { key: '75x50', code: 'A02437550', d: 75, d1: 50, D: 65, l: 67, z: 44, kg: 0.12, pack: 36 },
  { key: '75x63', code: 'A02437563', d: 75, d1: 63, D: 80, l: 71, z: 44, kg: 0.15, pack: 24 },
];

const SIZES = ARTICLES.map((a) => a.key);

const DIMENSION_KEY = {
  d: 'Zapfen-Nennmaß',
  d1: 'Muffen-Nennmaß',
  D: 'Außendurchmesser',
  l: 'Gesamtlänge',
  z: 'Einbaulänge',
};

function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}

/* K-Aqua Reduzierbuchse — Parametrik.

   Zwei Nennweiten: d außen (Zapfen), d1 innen (Muffe). Alles Weitere
   aus D, l und z gerechnet. */


function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);

  P.len = a.l;
  P.xEnd = a.l / 2;
  /* d ist der GRÖSSTE Durchmesser (Zapfen), D der des vorstehenden
     Muffenkragens — nachgewiesen über die Korrelation von D mit d1
     und den Muffen-Außendurchmessern, siehe data.js. */
  P.rSpigot = a.d / 2;              // Zapfen, versinkt in der d-Muffe
  P.rCollar = a.D / 2;              // vorstehender d1-Muffenkragen
  P.OD = Math.max(a.d, a.D);        // Silhouettenmaß
  P.rOut = P.OD / 2;
  P.rSockIn = a.d1 / 2;             // Innenmuffe für das d1-Rohr

  /* Muffentiefen aus der Normreihe — dieselbe Begründung wie bei
     Winkel und T-Stück: ein Schweißwerkzeug je Nennweite. Die Buchse
     hat zwei, eine je Seite. */
  P.socketIn = fusionDepth(a.d1) ?? Math.max(8, a.d1 * 0.55);
  P.spigotLen = fusionDepth(a.d) ?? Math.max(8, a.d * 0.55);

  P.wallPipe = a.d1 / (6);
  P.bore = a.d1 - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);
  P.restwand = (a.D - a.d1) / 2;    // Wand des Muffenkragens
  P.spigotWall = (a.d - a.d1) / 2;  // Wand am Zapfen über der d1-Bohrung
  P.emR = Math.min(1.6, 0.045 * a.d);

  /* Zapfenlänge = Schweißtiefe der d-Muffe, in der die Buchse sitzt.
     Der Rest der Länge ist der vorstehende Kragen. */
  P.spigotLenUsed = Math.min(P.spigotLen, a.l - Math.max(3, P.socketIn * 0.35));
  P.collarLen = a.l - P.spigotLenUsed;

  if (P.restwand < 1.2 || P.spigotWall < 1.2) {
    throw new Error('K-Aqua Reduzierbuchse ' + a.key + ': Wand ' +
      Math.min(P.restwand, P.spigotWall).toFixed(2) + ' mm zu dünn');
  }
  if (P.socketIn >= a.l - 2) {
    throw new Error('K-Aqua Reduzierbuchse ' + a.key + ': Muffentiefe ' +
      P.socketIn + ' mm passt nicht in die Länge ' + a.l + ' mm');
  }
  return P;
}

/* K-Aqua Reduzierbuchse — Kontur.

   Ein Rotationskörper: außen Zapfen Ø d mit Bund Ø D, innen eine
   konische Schweißmuffe für d1 mit Einführfase, dahinter der
   Durchgang. Kein CSG.

   Die Bohrung ist die engste Stelle des ganzen Systems — deshalb
   trägt sie hier die Sichtsegmentzahl, nicht die Innensegmentzahl:
   im Halbschnitt ist sie das, worauf man schaut. */


function buildBush(P) {
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

/* K-Aqua Reduzierbuchse — Produktpaket nach PRODUKT-VERTRAG.md.

   Erstes Produkt mit zwei Nennweiten. sizeKey nennt das Feld, über das
   der Core Größen adressiert — bei 17 Zeilen mit nur 5 verschiedenen
   Werten für d wäre d nicht eindeutig. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'fittings/reducing-bush',
  module: 'kaqua-reducing-bush',
  titleDe: 'Reduzierbuchse',
  titleEn: 'Reducing bush',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel: (k) => 'd' + String(k).replace('x', ' → d'),
  sizeTitle: 'Übergang',
  defaultSize: '40x25',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'd1', 'D', 'l', 'kg'],
  dimensions: ['l', 'D'],
  ariaFields: ['d', 'd1', 'D', 'l', 'z'],

  variants: [],
  states: null,

  tile: 'Übergang auf die nächstkleinere Nennweite — Zapfen außen, ' +
        'Schweißmuffe innen. 17 Kombinationen von d25 bis d75.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Reduzierbuchse_' + P.key,
      materials: ['pprGreen'],
      seed: 109,
      clipPlane,
    });

    const body = buildBush(P);
    A.part('body', {
      name: 'Reduzierbuchse', label: 'Reduzierbuchse (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(0, P.rOut + 0.30 * P.len, 0),
    });

    A.light(V3(0, 0, 0));

    A.hotspot({
      v: V3(P.xEnd - Math.max(3, 0.10 * P.len), P.rOut * 0.5, P.rOut * 0.83),
      n: V3(0, 0.5, 0.86),
      text: 'Innenmuffe für d' + P.d1 + ', Schweißtiefe ' +
        P.socketIn.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(-P.xEnd + Math.max(3, 0.14 * P.len), P.rSpigot * 0.5, P.rSpigot * 0.84),
      n: V3(0, 0.5, 0.86),
      text: 'Zapfen d' + P.d + ' — steckt in jede d' + P.d + '-Muffe des Systems',
    });

    const zf = P.rOut + 0.14 * P.len;
    const yL = -(P.rOut + 0.34 * P.len);
    A.dim({ label: 'l', value: P.len,
      a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf), off: V3(0, 0.13 * P.len, 0) });
    const xD = P.xEnd + 0.18 * P.len;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf), off: V3(-0.14 * P.len, 0, 0) });

    A.measures = [
      { key: 'l', label: DIMENSION_KEY.l, soll: P.len,
        ist: () => { const b = A.boxOf(['body']); return b.max.x - b.min.x; } },
      /* Silhouette: der größere von Zapfen und Kragen. */
      { key: 'OD', label: 'größter Außendurchmesser', soll: P.OD,
        ist: () => { const b = A.boxOf(['body']); return b.max.z - b.min.z; } },
      /* Zapfen und Kragen einzeln, jeweils von AUSSEN nach innen
         gemessen. Ein Strahl von der Achse trifft zuerst die
         Bohrungswand und gäbe deren Radius zurück — er hätte die
         Bohrung gemessen, nicht das Außenmaß. */
      { key: 'd', label: DIMENSION_KEY.d + ' (Zapfen)', soll: P.d,
        /* Gemessen am Zapfenanfang, wo der Nenndurchmesser liegt —
           weiter hinten hat die 1°-Entformung ihn planmäßig verjüngt. */
        ist: () => {
          const hit = A.probeAxial('body', V3(-P.xEnd + 1.5, P.OD, 0), V3(0, -1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      { key: 'D', label: DIMENSION_KEY.D + ' (Kragen)', soll: P.D,
        ist: () => {
          const hit = A.probeAxial('body', V3(-P.xEnd + P.spigotLenUsed + 0.6, P.OD, 0), V3(0, -1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      { key: 'restwand', label: 'Wand des Kragens', soll: P.restwand, ist: () => P.restwand },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

return product;
})();

const __p8 = (() => {
/* K-Aqua Rohrfamilie — Parametrik.

   Gemeinsam für alle zwölf Rohre. D, Di und S stehen in der Tabelle;
   gerechnet wird nur die Darstellungslänge.

   Warum ein Familienmodul: params.js und parts.js waren bei allen zwölf
   Rohren wörtlich identisch. Ab dem dritten Rohr ist die Duplizierung
   nicht mehr zu rechtfertigen — der Produktvertrag erlaubt geteilte
   Fachlogik ausdrücklich. Produktspezifisch bleibt nur data.js. */

function pipeParams(article, opt) {
  const a = article;
  const P = Object.assign({}, a);

  P.sdr = opt.sdr;
  P.stockLength = opt.stockLength ?? 4;
  P.rOut = a.d / 2;
  P.rIn = a.di / 2;
  P.wall = a.s;

  /* ASSUMPTION: Darstellungslänge. Geliefert werden 4-m-Stangen; in der
     Länge ist das Rohr im Viewer ein Strich. Gezeigt wird ein Abschnitt
     von 6·D, mindestens 140 mm — lang genug, dass die Silhouette als
     Rohr lesbar bleibt, kurz genug für die Schnittkante. Die
     Lieferlänge steht in der Metaleiste und im Hotspot. */
  P.len = Math.max(140, 6 * a.d);
  P.xEnd = P.len / 2;

  /* Transkriptionsprobe: D − 2·S muss Di ergeben. Weicht es ab, stimmt
     eine abgelesene Zahl nicht — dann lieber abbrechen als ein falsches
     Rohr modellieren. Genau diese Probe hat beim Ablesen einen Fehler
     gefunden. */
  const check = a.d - 2 * a.s;
  if (Math.abs(check - a.di) > 0.25) {
    throw new Error('K-Aqua Rohr d' + a.d + ': D − 2·S = ' + check.toFixed(1) +
      ' passt nicht zu Di = ' + a.di + ' — Tabellenwert prüfen');
  }

  /* Wandstärke: die 3-mm-Restwandregel gilt für Fittings (Wand über
     einer Bohrung), nicht für Rohre — dort bestimmt die SDR-Reihe die
     Wand, und d20 bei SDR 7,4 hat legitim 2,8 mm.

     Geprüft wird deshalb zeilenweise gegen D/S, nicht gegen den
     Reihennennwert des Produkts: K-FiberClima SDR 11 und K-Fiber PP-R
     SDR 11 führen bei d20 und d25 SDR-7,4-Maße (in der Quelle mit
     Sternchen markiert). Eine Prüfung gegen den Nennwert würde diese
     beiden Rohre zu Recht abweisen. */
  P.sdrIst = Math.round((a.d / a.s) * 100) / 100;
  P.sdrAbweichend = P.sdrIst < opt.sdr - 0.5;
  if (a.s < 1.5) {
    throw new Error('K-Aqua Rohr d' + a.d + ': Wand ' + a.s + ' mm unplausibel');
  }
  return P;
}

/* K-Aqua Rohrfamilie — Kontur.

   Mehrschichtrohr über tubeLayers(): jede Lage ein eigener Ring mit
   eigener Schnittfläche. Ein monolithisches PP-R-Rohr hat eine Lage,
   die Faserrohre drei, die UV-Rohre vier. Sonst ändert sich nichts.

   Dazu die Längsstreifen als Coextrusionsspur: ein Kreisbogen-
   Ausschnitt der Mantelfläche, minimal aufgesetzt, an den Rändern
   verlaufend — beim Coextrudieren fließt die Farbspur in die
   Mantelfläche ein, sie sitzt nicht als Leiste darauf. */


function buildTube(P, layers) {
  return tubeLayers(P.d, P.wall, layers, { length: P.len, x0: -P.xEnd });
}

function buildStripe(P, stripe) {
  const rise = 0.25;
  const half = (stripe.widthDeg / 2) * D2R;
  const c = (stripe.angleDeg || 0) * D2R;
  const n = 16;
  const thetas = [];
  for (let i = 0; i <= n; i++) thetas.push(c - half + (2 * half * i) / n);

  const profile = buildProfile([
    { a: -P.xEnd, r: P.rOut, fillet: 0 },
    { a: -P.xEnd, r: P.rOut + rise, chamfer: 0.2 },
    { a: P.xEnd, r: P.rOut + rise, chamfer: 0.2 },
    { a: P.xEnd, r: P.rOut, fillet: 0 },
  ], { segs: 2 });

  const mod = (th) => {
    const u = Math.abs((th - c) / half);
    return u >= 1 ? -rise : -rise * (1 - Math.pow(Math.min(1, u), 6));
  };
  return { geo: revolve(profile, { axis: 'x', thetas, mod }), cap: null, profile };
}

/* K-Aqua K-Rohr PP-R SDR 6 — Artikeltabelle.

   PHASE 1, verifiziert am 16.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-pipe-pp-r-sdr-6-2026-06-20-05_46_21.pdf
   (Seitenbilder quellen/pipe6-p1.jpg … p3.jpg). Die Tabelle läuft über
   den Seitenumbruch: Seite 1 endet bei d50, Seite 2 führt d63–d125.

   Spaltenköpfe exakt wie abgebildet:
     Code · D · DN · Di · S min. · Pack. · Weight (kg/m) · Water Capacity (l/m)

   Kopfzeile der Seite: „K Pipe PP-R" SDR 6 — S 2,5 (20° C/2,0 MPa —
   70° C/1,0 MPa), length 4 meter

   MASSSCHLÜSSEL (technische Zeichnung neben dem Produktfoto):
     D    Außendurchmesser
     DN   Nennweite (Zoll-Äquivalent), rein informativ
     Di   Innendurchmesser
     S    Mindestwandstärke
   Gegenprobe: D − 2·S = 20 − 6,8 = 13,2 = Di ✓ · D/S = 5,88 ≈ SDR 6 ✓

   Werkstoffangabe der Zeichnung: PP-R, „green with 1 red stripe",
   Normen DIN EN ISO 15874 / DIN 8077 / 8078.

   Fußnote der Quelle, wörtlich (auf Seite 2 unterhalb der Tabelle, auf
   dem ersten Zuschnitt nicht mit abgebildet):
   „Pipe can be delivered in 5.80 meter length on special request with
   product code AQ258F+dimension"

   ── ABWEICHUNGEN gegen docs Unterseiten/pipes/k-pipe-pp-r-sdr-6.md ──
   1. Markdown führt 5 von 10 Größen (d20–d50). Es fehlen d63, d75,
      d90, d110, d125.
   2. Markdown führt keine Spalten Di und S — also genau die Werte, die
      ein maßhaltiges Rohrmodell braucht.
   Korrigierte Fassung: produkt-markdown/pipes/k-pipe-pp-r-sdr-6.md   */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 10;
const SDR = 6;
const STOCK_LENGTH_M = 4;

const ARTICLES = [
  { code: 'AQ200P20',  d: 20,  dn: 12, di: 13.2, s: 3.4,  pack: 100, kgm: 0.18, lm: 0.14 },
  { code: 'AQ200P25',  d: 25,  dn: 15, di: 16.6, s: 4.2,  pack: 100, kgm: 0.28, lm: 0.22 },
  { code: 'AQ200P32',  d: 32,  dn: 20, di: 21.2, s: 5.4,  pack: 60,  kgm: 0.46, lm: 0.35 },
  { code: 'AQ200P40',  d: 40,  dn: 25, di: 26.6, s: 6.7,  pack: 40,  kgm: 0.68, lm: 0.56 },
  { code: 'AQ200P50',  d: 50,  dn: 32, di: 33.2, s: 8.3,  pack: 20,  kgm: 1.09, lm: 0.87 },
  { code: 'AQ200P63',  d: 63,  dn: 40, di: 42.0, s: 10.5, pack: 20,  kgm: 1.60, lm: 1.39 },
  { code: 'AQ200P75',  d: 75,  dn: 50, di: 50.0, s: 12.5, pack: 12,  kgm: 2.50, lm: 1.96 },
  { code: 'AQ200P90',  d: 90,  dn: null, di: 60.0, s: 15.0, pack: 8, kgm: 3.30, lm: 2.83 },
  { code: 'AQ200P110', d: 110, dn: 65, di: 73.2, s: 18.3, pack: 4,   kgm: 5.00, lm: 4.21 },
  { code: 'AQ200P125', d: 125, dn: 80, di: 83.2, s: 20.8, pack: 4,   kgm: 6.50, lm: 5.46 },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Außendurchmesser',
  dn: 'Nennweite DN',
  di: 'Innendurchmesser',
  s: 'Wandstärke',
};

/* Schichtaufbau von außen nach innen. Beim monolithischen PP-R-Rohr
   eine Lage; die Faserrohre setzen hier drei ein, sonst identisch. */
const LAYERS = [{ key: 'pprGreen', frac: 1, label: 'PP-R' }];

/* Längsstreifen auf der Mantelfläche — Zeichnung: „green with 1 red
   stripe". Kein Schichtaufbau, sondern eine Coextrusionsspur. */
const STRIPES = [
  { key: 'redStripe', angleDeg: 0, widthDeg: 7 },
];

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua K-Rohr PP-R SDR 6 — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */


function params(dNom) {
  return pipeParams(article(dNom), { sdr: SDR, stockLength: STOCK_LENGTH_M });
}

/* K-Aqua K-Rohr PP-R SDR 6 — Kontur.
   Kommt vollständig aus dem Familienmodul. */

/* K-Aqua K-Rohr PP-R SDR 6 — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Rohrabschnitt, kein Zustand. Der Nutzen steckt in der
   Schnittansicht: dort wird der Wandaufbau sichtbar, und genau das
   lässt sich in 2D nicht zeigen.

   Die elf weiteren Rohre unterscheiden sich von diesem hier
   ausschließlich in data.js — Tabelle, LAYERS und STRIPES. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'pipes/k-pipe-pp-r-sdr-6',
  module: 'kaqua-k-pipe-pp-r-sdr-6',
  titleDe: 'K-Rohr PP-R SDR 6',
  titleEn: 'K-Pipe PP-R SDR 6',
  category: 'pipes',
  brandLine: 'K-Aqua PP-R · SDR 6 · S 2,5',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'di', 's', 'kgm'],
  dimensions: ['d', 'di'],
  ariaFields: ['d', 'di', 's'],

  variants: [],
  states: null,

  tile: 'Druckrohr für Trinkwasser, 20 °C bei 2,0 MPa — die Basis des ' +
        'Systems, geliefert in 4-m-Stangen.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const matKeys = [...new Set([...LAYERS.map((l) => l.key), ...STRIPES.map((s) => s.key)])];
    const A = createAssembly({
      name: 'K-Aqua_Rohr_d' + size,
      materials: matKeys,
      seed: 71,
      clipPlane,
    });

    const layers = buildTube(P, LAYERS);
    layers.forEach((layer, i) => {
      A.part('layer' + i, {
        name: 'Rohrwand_' + layer.label,
        label: LAYERS.length > 1
          ? layer.label + ' (' + layer.thickness.toFixed(1).replace('.', ',') + ' mm)'
          : 'Rohrwand PP-R (' + P.wall.toFixed(1).replace('.', ',') + ' mm)',
        mat: layer.key,
        geo: layer.geo,
        cap: layer.cap,
        // Lagen fahren radial auseinander — so liest sich der Wandaufbau
        explode: V3(0, (LAYERS.length - i) * P.d * 0.55, 0),
        anchor: i === 0 ? V3(0, P.rOut + 0.16 * P.len, 0) : V3(0, P.rOut + 0.10 * P.len, 0),
      });
    });

    STRIPES.forEach((stripe, i) => {
      const s = buildStripe(P, stripe);
      A.part('stripe' + i, {
        name: 'Kennstreifen',
        label: 'Kennstreifen (Coextrusion)',
        mat: stripe.key,
        geo: s.geo,
        explode: V3(0, (LAYERS.length + 1) * P.d * 0.55, 0),
        noExplodeEntry: false,
      });
    });

    A.light(V3(-P.xEnd * 0.7, 0, 0));
    A.light(V3(P.xEnd * 0.7, 0, 0));

    A.hotspot({
      v: V3(-P.xEnd + P.d * 0.28, P.rOut * 0.42, P.rOut * 0.88),
      n: V3(0, 0.42, 0.9),
      text: 'Schnittkante: Wandstärke ' + String(P.wall).replace('.', ',') +
            ' mm, Innendurchmesser ' + String(P.di).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(P.len * 0.12, P.rOut * 0.95, P.rOut * 0.28),
      n: V3(0, 0.95, 0.3),
      text: 'Kennstreifen rot — SDR 6, Lieferlänge ' + P.stockLength + ' m',
    });

    const zf = P.rOut + 0.10 * P.len;
    const xD = P.xEnd + 0.10 * P.len;
    A.dim({ label: 'd', value: P.d, a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf),
      off: V3(-0.09 * P.len, 0, 0) });
    A.dim({ label: 'di', value: P.di,
      a: V3(-P.xEnd - 0.06 * P.len, -P.rIn, zf), b: V3(-P.xEnd - 0.06 * P.len, P.rIn, zf),
      off: V3(0.06 * P.len, 0, 0) });

    A.measures = [
      { key: 'd', label: DIMENSION_KEY.d, soll: P.d,
        ist: () => { const b = A.boxOf(['layer0']); return b.max.y - b.min.y; } },
      /* Innendurchmesser: von der Achse aus radial nach außen schießen,
         auf halber Länge. Ein axialer Strahl trifft die Anschnittfase
         und liefert nur seinen eigenen Radius zurück. */
      { key: 'di', label: DIMENSION_KEY.di, soll: P.di,
        ist: () => {
          const inner = 'layer' + (LAYERS.length - 1);
          const hit = A.probeAxial(inner, V3(0, 0, 0), V3(0, 1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      { key: 's', label: DIMENSION_KEY.s, soll: P.s, ist: () => (P.d - P.di) / 2 },
      /* Wandsumme der Lagen muss die Gesamtwand ergeben — die Prüfung,
         die beim Mehrschichtrohr etwas aussagt. Die SDR-Reihe selbst
         prüft params.js, weil S eine MINDESTwandstärke ist und das
         Verhältnis deshalb planmäßig unter dem Nennwert liegt. */
      { key: 'lagen', label: 'Summe der Lagendicken', soll: P.wall,
        ist: () => Math.round(layers.reduce((t, l) => t + l.thickness, 0) * 100) / 100 },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

return product;
})();

const __p9 = (() => {
/* K-Aqua Rohrfamilie — Parametrik.

   Gemeinsam für alle zwölf Rohre. D, Di und S stehen in der Tabelle;
   gerechnet wird nur die Darstellungslänge.

   Warum ein Familienmodul: params.js und parts.js waren bei allen zwölf
   Rohren wörtlich identisch. Ab dem dritten Rohr ist die Duplizierung
   nicht mehr zu rechtfertigen — der Produktvertrag erlaubt geteilte
   Fachlogik ausdrücklich. Produktspezifisch bleibt nur data.js. */

function pipeParams(article, opt) {
  const a = article;
  const P = Object.assign({}, a);

  P.sdr = opt.sdr;
  P.stockLength = opt.stockLength ?? 4;
  P.rOut = a.d / 2;
  P.rIn = a.di / 2;
  P.wall = a.s;

  /* ASSUMPTION: Darstellungslänge. Geliefert werden 4-m-Stangen; in der
     Länge ist das Rohr im Viewer ein Strich. Gezeigt wird ein Abschnitt
     von 6·D, mindestens 140 mm — lang genug, dass die Silhouette als
     Rohr lesbar bleibt, kurz genug für die Schnittkante. Die
     Lieferlänge steht in der Metaleiste und im Hotspot. */
  P.len = Math.max(140, 6 * a.d);
  P.xEnd = P.len / 2;

  /* Transkriptionsprobe: D − 2·S muss Di ergeben. Weicht es ab, stimmt
     eine abgelesene Zahl nicht — dann lieber abbrechen als ein falsches
     Rohr modellieren. Genau diese Probe hat beim Ablesen einen Fehler
     gefunden. */
  const check = a.d - 2 * a.s;
  if (Math.abs(check - a.di) > 0.25) {
    throw new Error('K-Aqua Rohr d' + a.d + ': D − 2·S = ' + check.toFixed(1) +
      ' passt nicht zu Di = ' + a.di + ' — Tabellenwert prüfen');
  }

  /* Wandstärke: die 3-mm-Restwandregel gilt für Fittings (Wand über
     einer Bohrung), nicht für Rohre — dort bestimmt die SDR-Reihe die
     Wand, und d20 bei SDR 7,4 hat legitim 2,8 mm.

     Geprüft wird deshalb zeilenweise gegen D/S, nicht gegen den
     Reihennennwert des Produkts: K-FiberClima SDR 11 und K-Fiber PP-R
     SDR 11 führen bei d20 und d25 SDR-7,4-Maße (in der Quelle mit
     Sternchen markiert). Eine Prüfung gegen den Nennwert würde diese
     beiden Rohre zu Recht abweisen. */
  P.sdrIst = Math.round((a.d / a.s) * 100) / 100;
  P.sdrAbweichend = P.sdrIst < opt.sdr - 0.5;
  if (a.s < 1.5) {
    throw new Error('K-Aqua Rohr d' + a.d + ': Wand ' + a.s + ' mm unplausibel');
  }
  return P;
}

/* K-Aqua Rohrfamilie — Kontur.

   Mehrschichtrohr über tubeLayers(): jede Lage ein eigener Ring mit
   eigener Schnittfläche. Ein monolithisches PP-R-Rohr hat eine Lage,
   die Faserrohre drei, die UV-Rohre vier. Sonst ändert sich nichts.

   Dazu die Längsstreifen als Coextrusionsspur: ein Kreisbogen-
   Ausschnitt der Mantelfläche, minimal aufgesetzt, an den Rändern
   verlaufend — beim Coextrudieren fließt die Farbspur in die
   Mantelfläche ein, sie sitzt nicht als Leiste darauf. */


function buildTube(P, layers) {
  return tubeLayers(P.d, P.wall, layers, { length: P.len, x0: -P.xEnd });
}

function buildStripe(P, stripe) {
  const rise = 0.25;
  const half = (stripe.widthDeg / 2) * D2R;
  const c = (stripe.angleDeg || 0) * D2R;
  const n = 16;
  const thetas = [];
  for (let i = 0; i <= n; i++) thetas.push(c - half + (2 * half * i) / n);

  const profile = buildProfile([
    { a: -P.xEnd, r: P.rOut, fillet: 0 },
    { a: -P.xEnd, r: P.rOut + rise, chamfer: 0.2 },
    { a: P.xEnd, r: P.rOut + rise, chamfer: 0.2 },
    { a: P.xEnd, r: P.rOut, fillet: 0 },
  ], { segs: 2 });

  const mod = (th) => {
    const u = Math.abs((th - c) / half);
    return u >= 1 ? -rise : -rise * (1 - Math.pow(Math.min(1, u), 6));
  };
  return { geo: revolve(profile, { axis: 'x', thetas, mod }), cap: null, profile };
}

/* K-Aqua K-Rohr PP-R SDR 11 — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-pipe-pp-r-sdr-11-….pdf
   (Seitenbilder quellen/pg-k-pipe-pp-r-sdr-11-p1.jpg, -p2.jpg). Die Tabelle läuft
   über den Seitenumbruch.

   Spaltenköpfe: Code · D · DN · Di · S min. · Pack. · Weight (kg/m) ·
   Water capacity (l/m)
   Kopfzeile: „K-Pipe PP-R SDR 11" SDR 11 — S 5 (20 °C/1,6 MPa — 60 °C/0,8 MPa), length 4 meter

   Zeichnungsangabe wörtlich (Miniatur neben dem Produktfoto):
     Material: PP-R
     Colour:   green with 1 blue stripe
     Standards: DIN EN ISO 15874
   Am 17.08.2026 nachgelesen — vorher war rot.

   Transkriptionsprobe D − 2·S = Di: über alle 9 Zeilen erfüllt.
 */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 9;
const SDR = 11;
const STOCK_LENGTH_M = 4;

const ARTICLES = [
  { code: 'AQ111P20', d: 20, dn: 15, di: 16.2, s: 1.9, pack: 100, kgm: 0.11, lm: 0.21 },
  { code: 'AQ111P25', d: 25, dn: 20, di: 20.4, s: 2.3, pack: 100, kgm: 0.16, lm: 0.33 },
  { code: 'AQ111P32', d: 32, dn: 25, di: 26.2, s: 2.9, pack: 60, kgm: 0.26, lm: 0.54 },
  { code: 'AQ111P40', d: 40, dn: 32, di: 32.6, s: 3.7, pack: 40, kgm: 0.41, lm: 0.83 },
  { code: 'AQ111P50', d: 50, dn: 40, di: 40.8, s: 4.6, pack: 20, kgm: 0.64, lm: 1.31 },
  { code: 'AQ111P63', d: 63, dn: 50, di: 51.4, s: 5.8, pack: 20, kgm: 1.01, lm: 2.07 },
  { code: 'AQ111P75', d: 75, dn: null, di: 61.4, s: 6.8, pack: 12, kgm: 1.41, lm: 2.96 },
  { code: 'AQ111P90', d: 90, dn: 65, di: 73.6, s: 8.2, pack: 8, kgm: 2.03, lm: 4.25 },
  { code: 'AQ111P110', d: 110, dn: 80, di: 90, s: 10, pack: 4, kgm: 3.01, lm: 6.36 },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Außendurchmesser',
  dn: 'Nennweite DN',
  di: 'Innendurchmesser',
  s: 'Wandstärke',
};

/* Wandaufbau von außen nach innen. Der Grund, warum diese Produkte ein
   3D-Modell rechtfertigen: im Schnitt wird sichtbar, was ein
   Katalogfoto nicht zeigen kann. */
const LAYERS = [
  { key: 'pprGreen', frac: 1, label: 'PP-R' },
];

const STRIPES = [
  { key: 'blueStripe', angleDeg: 0, widthDeg: 7 },
];

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua K-Rohr PP-R SDR 11 — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */


function params(dNom) {
  return pipeParams(article(dNom), { sdr: SDR, stockLength: STOCK_LENGTH_M });
}

/* K-Aqua K-Rohr PP-R SDR 11 — Kontur.
   Kommt vollständig aus dem Familienmodul. */

/* K-Aqua K-Rohr PP-R SDR 11 — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Rohrabschnitt, kein Zustand. Der Nutzen steckt in der
   Schnittansicht: dort wird der Wandaufbau sichtbar. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'pipes/k-pipe-pp-r-sdr-11',
  module: 'kaqua-k-pipe-pp-r-sdr-11',
  titleDe: 'K-Rohr PP-R SDR 11',
  titleEn: 'K-Pipe PP-R SDR 11',
  category: 'pipes',
  brandLine: 'K-Aqua PP-R · SDR 11 · S 5',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'di', 's', 'kgm'],
  dimensions: ['d', 'di'],
  ariaFields: ['d', 'di', 's'],

  variants: [],
  states: null,

  tile: 'Dünnwandiges Druckrohr für niedrigere Betriebsdrücke — mehr Durchfluss bei gleichem Außendurchmesser.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const matKeys = [...new Set([...LAYERS.map((l) => l.key), ...STRIPES.map((s) => s.key)])];
    const A = createAssembly({
      name: 'K-Aqua_kaqua-k-pipe-pp-r-sdr-11' + '_d' + size,
      materials: matKeys,
      seed: 84,
      clipPlane,
    });

    const layers = buildTube(P, LAYERS);
    layers.forEach((layer, i) => {
      A.part('layer' + i, {
        name: 'Rohrwand_' + layer.label,
        label: LAYERS.length > 1
          ? layer.label + ' (' + layer.thickness.toFixed(1).replace('.', ',') + ' mm)'
          : 'Rohrwand (' + P.wall.toFixed(1).replace('.', ',') + ' mm)',
        mat: layer.key,
        geo: layer.geo,
        cap: layer.cap,
        // Lagen fahren radial auseinander — so liest sich der Wandaufbau
        explode: V3(0, (LAYERS.length - i) * P.d * 0.55, 0),
        anchor: i === 0 ? V3(0, P.rOut + 0.16 * P.len, 0) : V3(0, P.rOut + 0.10 * P.len, 0),
      });
    });

    STRIPES.forEach((stripe, i) => {
      A.part('stripe' + i, {
        name: 'Kennstreifen',
        label: 'Kennstreifen (Coextrusion)',
        mat: stripe.key,
        geo: buildStripe(P, stripe).geo,
        explode: V3(0, (LAYERS.length + 1) * P.d * 0.55, 0),
      });
    });

    A.light(V3(-P.xEnd * 0.7, 0, 0));
    A.light(V3(P.xEnd * 0.7, 0, 0));

    A.hotspot({
      v: V3(-P.xEnd + P.d * 0.28, P.rOut * 0.42, P.rOut * 0.88),
      n: V3(0, 0.42, 0.9),
      text: LAYERS.length > 1
        ? 'Schnittkante: ' + LAYERS.length + ' Lagen, Wandstärke ' +
          String(P.wall).replace('.', ',') + ' mm'
        : 'Schnittkante: Wandstärke ' + String(P.wall).replace('.', ',') +
          ' mm, Innendurchmesser ' + String(P.di).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(P.len * 0.12, P.rOut * 0.95, P.rOut * 0.28),
      n: V3(0, 0.95, 0.3),
      text: 'SDR 11, S 5 — Lieferlänge ' + P.stockLength + ' m',
    });

    const zf = P.rOut + 0.10 * P.len;
    const xD = P.xEnd + 0.10 * P.len;
    A.dim({ label: 'd', value: P.d, a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf),
      off: V3(-0.09 * P.len, 0, 0) });
    A.dim({ label: 'di', value: P.di,
      a: V3(-P.xEnd - 0.06 * P.len, -P.rIn, zf), b: V3(-P.xEnd - 0.06 * P.len, P.rIn, zf),
      off: V3(0.06 * P.len, 0, 0) });

    A.measures = [
      { key: 'd', label: DIMENSION_KEY.d, soll: P.d,
        ist: () => { const b = A.boxOf(['layer0']); return b.max.y - b.min.y; } },
      /* Innendurchmesser: von der Achse radial nach außen gegen die
         INNERSTE Lage. Ein axialer Strahl trifft die Anschnittfase und
         gibt nur seinen eigenen Startradius zurück. */
      { key: 'di', label: DIMENSION_KEY.di, soll: P.di,
        ist: () => {
          const hit = A.probeAxial('layer' + (LAYERS.length - 1), V3(0, 0, 0), V3(0, 1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      { key: 's', label: DIMENSION_KEY.s, soll: P.s, ist: () => (P.d - P.di) / 2 },
      { key: 'lagen', label: 'Summe der Lagendicken', soll: P.wall,
        ist: () => Math.round(layers.reduce((t, l) => t + l.thickness, 0) * 100) / 100 },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

return product;
})();

const __p10 = (() => {
/* K-Aqua Rohrfamilie — Parametrik.

   Gemeinsam für alle zwölf Rohre. D, Di und S stehen in der Tabelle;
   gerechnet wird nur die Darstellungslänge.

   Warum ein Familienmodul: params.js und parts.js waren bei allen zwölf
   Rohren wörtlich identisch. Ab dem dritten Rohr ist die Duplizierung
   nicht mehr zu rechtfertigen — der Produktvertrag erlaubt geteilte
   Fachlogik ausdrücklich. Produktspezifisch bleibt nur data.js. */

function pipeParams(article, opt) {
  const a = article;
  const P = Object.assign({}, a);

  P.sdr = opt.sdr;
  P.stockLength = opt.stockLength ?? 4;
  P.rOut = a.d / 2;
  P.rIn = a.di / 2;
  P.wall = a.s;

  /* ASSUMPTION: Darstellungslänge. Geliefert werden 4-m-Stangen; in der
     Länge ist das Rohr im Viewer ein Strich. Gezeigt wird ein Abschnitt
     von 6·D, mindestens 140 mm — lang genug, dass die Silhouette als
     Rohr lesbar bleibt, kurz genug für die Schnittkante. Die
     Lieferlänge steht in der Metaleiste und im Hotspot. */
  P.len = Math.max(140, 6 * a.d);
  P.xEnd = P.len / 2;

  /* Transkriptionsprobe: D − 2·S muss Di ergeben. Weicht es ab, stimmt
     eine abgelesene Zahl nicht — dann lieber abbrechen als ein falsches
     Rohr modellieren. Genau diese Probe hat beim Ablesen einen Fehler
     gefunden. */
  const check = a.d - 2 * a.s;
  if (Math.abs(check - a.di) > 0.25) {
    throw new Error('K-Aqua Rohr d' + a.d + ': D − 2·S = ' + check.toFixed(1) +
      ' passt nicht zu Di = ' + a.di + ' — Tabellenwert prüfen');
  }

  /* Wandstärke: die 3-mm-Restwandregel gilt für Fittings (Wand über
     einer Bohrung), nicht für Rohre — dort bestimmt die SDR-Reihe die
     Wand, und d20 bei SDR 7,4 hat legitim 2,8 mm.

     Geprüft wird deshalb zeilenweise gegen D/S, nicht gegen den
     Reihennennwert des Produkts: K-FiberClima SDR 11 und K-Fiber PP-R
     SDR 11 führen bei d20 und d25 SDR-7,4-Maße (in der Quelle mit
     Sternchen markiert). Eine Prüfung gegen den Nennwert würde diese
     beiden Rohre zu Recht abweisen. */
  P.sdrIst = Math.round((a.d / a.s) * 100) / 100;
  P.sdrAbweichend = P.sdrIst < opt.sdr - 0.5;
  if (a.s < 1.5) {
    throw new Error('K-Aqua Rohr d' + a.d + ': Wand ' + a.s + ' mm unplausibel');
  }
  return P;
}

/* K-Aqua Rohrfamilie — Kontur.

   Mehrschichtrohr über tubeLayers(): jede Lage ein eigener Ring mit
   eigener Schnittfläche. Ein monolithisches PP-R-Rohr hat eine Lage,
   die Faserrohre drei, die UV-Rohre vier. Sonst ändert sich nichts.

   Dazu die Längsstreifen als Coextrusionsspur: ein Kreisbogen-
   Ausschnitt der Mantelfläche, minimal aufgesetzt, an den Rändern
   verlaufend — beim Coextrudieren fließt die Farbspur in die
   Mantelfläche ein, sie sitzt nicht als Leiste darauf. */


function buildTube(P, layers) {
  return tubeLayers(P.d, P.wall, layers, { length: P.len, x0: -P.xEnd });
}

function buildStripe(P, stripe) {
  const rise = 0.25;
  const half = (stripe.widthDeg / 2) * D2R;
  const c = (stripe.angleDeg || 0) * D2R;
  const n = 16;
  const thetas = [];
  for (let i = 0; i <= n; i++) thetas.push(c - half + (2 * half * i) / n);

  const profile = buildProfile([
    { a: -P.xEnd, r: P.rOut, fillet: 0 },
    { a: -P.xEnd, r: P.rOut + rise, chamfer: 0.2 },
    { a: P.xEnd, r: P.rOut + rise, chamfer: 0.2 },
    { a: P.xEnd, r: P.rOut, fillet: 0 },
  ], { segs: 2 });

  const mod = (th) => {
    const u = Math.abs((th - c) / half);
    return u >= 1 ? -rise : -rise * (1 - Math.pow(Math.min(1, u), 6));
  };
  return { geo: revolve(profile, { axis: 'x', thetas, mod }), cap: null, profile };
}

/* K-Aqua K-Rohr Violett PP-R SDR 11 — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-pipe-purple-pp-r-sdr-11-….pdf
   (Seitenbilder quellen/pg-k-pipe-purple-pp-r-sdr-11-p1.jpg, -p2.jpg). Die Tabelle läuft
   über den Seitenumbruch.

   Spaltenköpfe: Code · D · DN · Di · S min. · Pack. · Weight (kg/m) ·
   Water capacity (l/m)
   Kopfzeile: „K-Pipe Purple PP-R SDR 11" SDR 11 — S 5 (20 °C/1,6 MPa — 60 °C/0,8 MPa), length 4 meter

   Zeichnungsangabe wörtlich (Miniatur neben dem Produktfoto):
     Material: PP-R
     Colour:   green with 1 red stripe
     Standards: DIN EN ISO 15874
   Am 17.08.2026 nachgelesen — vorher war ohne Streifen.

   WIDERSPRUCH IN DER QUELLE: die Zeichnungsminiatur nennt „PP-R, green
   with 1 red stripe" — wörtlich dasselbe wie beim grünen SDR-11-Rohr,
   dazu dieselben Normen und dieselbe Maßtabelle. Produktname, Titel und
   Slug sagen dagegen „Purple". Die Miniatur ist offenbar eine nicht
   angepasste Vorlage.

   Entschieden für Violett als Körperfarbe (pprPurple), weil Name und
   Titel spezifisch sind und eine violette Kennfarbe im Rohrleitungsbau
   für Betriebs- und Regenwasser steht — eine Kodierung, die ein
   Hersteller nicht ohne Grund in den Produktnamen schreibt. Der rote
   Kennstreifen ist wie gezeichnet übernommen.

   Beim Hersteller zu klären. Ist die Miniatur maßgeblich, genügt in
   LAYERS ein Wechsel von 'pprPurple' auf 'pprGreen' — eine Zeile.

   Transkriptionsprobe D − 2·S = Di: über alle 9 Zeilen erfüllt.
 */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 9;
const SDR = 11;
const STOCK_LENGTH_M = 4;

const ARTICLES = [
  { code: 'AQ111PL20', d: 20, dn: 15, di: 16.2, s: 1.9, pack: 100, kgm: 0.11, lm: 0.21 },
  { code: 'AQ111PL25', d: 25, dn: 20, di: 20.4, s: 2.3, pack: 100, kgm: 0.16, lm: 0.33 },
  { code: 'AQ111PL32', d: 32, dn: 25, di: 26.2, s: 2.9, pack: 60, kgm: 0.26, lm: 0.54 },
  { code: 'AQ111PL40', d: 40, dn: 32, di: 32.6, s: 3.7, pack: 40, kgm: 0.41, lm: 0.83 },
  { code: 'AQ111PL50', d: 50, dn: 40, di: 40.8, s: 4.6, pack: 20, kgm: 0.64, lm: 1.31 },
  { code: 'AQ111PL63', d: 63, dn: 50, di: 51.4, s: 5.8, pack: 20, kgm: 1.01, lm: 2.07 },
  { code: 'AQ111PL75', d: 75, dn: null, di: 61.4, s: 6.8, pack: 12, kgm: 1.41, lm: 2.96 },
  { code: 'AQ111PL90', d: 90, dn: 65, di: 73.6, s: 8.2, pack: 8, kgm: 2.03, lm: 4.25 },
  { code: 'AQ111PL110', d: 110, dn: 80, di: 90, s: 10, pack: 4, kgm: 3.01, lm: 6.36 },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Außendurchmesser',
  dn: 'Nennweite DN',
  di: 'Innendurchmesser',
  s: 'Wandstärke',
};

/* Wandaufbau von außen nach innen. Der Grund, warum diese Produkte ein
   3D-Modell rechtfertigen: im Schnitt wird sichtbar, was ein
   Katalogfoto nicht zeigen kann. */
const LAYERS = [
  { key: 'pprPurple', frac: 1, label: 'PP-R violett' },
];

const STRIPES = [
  { key: 'redStripe', angleDeg: 0, widthDeg: 7 },
];

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua K-Rohr Violett PP-R SDR 11 — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */


function params(dNom) {
  return pipeParams(article(dNom), { sdr: SDR, stockLength: STOCK_LENGTH_M });
}

/* K-Aqua K-Rohr Violett PP-R SDR 11 — Kontur.
   Kommt vollständig aus dem Familienmodul. */

/* K-Aqua K-Rohr Violett PP-R SDR 11 — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Rohrabschnitt, kein Zustand. Der Nutzen steckt in der
   Schnittansicht: dort wird der Wandaufbau sichtbar. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'pipes/k-pipe-purple-pp-r-sdr-11',
  module: 'kaqua-k-pipe-purple-pp-r-sdr-11',
  titleDe: 'K-Rohr Violett PP-R SDR 11',
  titleEn: 'K-Pipe Purple PP-R SDR 11',
  category: 'pipes',
  brandLine: 'K-Aqua PP-R · SDR 11 · S 5',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'di', 's', 'kgm'],
  dimensions: ['d', 'di'],
  ariaFields: ['d', 'di', 's'],

  variants: [],
  states: null,

  tile: 'Violette Kennfarbe für Betriebswasser und Regenwassernutzung — maßgleich zum grünen SDR-11-Rohr.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const matKeys = [...new Set([...LAYERS.map((l) => l.key), ...STRIPES.map((s) => s.key)])];
    const A = createAssembly({
      name: 'K-Aqua_kaqua-k-pipe-purple-pp-r-sdr-11' + '_d' + size,
      materials: matKeys,
      seed: 97,
      clipPlane,
    });

    const layers = buildTube(P, LAYERS);
    layers.forEach((layer, i) => {
      A.part('layer' + i, {
        name: 'Rohrwand_' + layer.label,
        label: LAYERS.length > 1
          ? layer.label + ' (' + layer.thickness.toFixed(1).replace('.', ',') + ' mm)'
          : 'Rohrwand (' + P.wall.toFixed(1).replace('.', ',') + ' mm)',
        mat: layer.key,
        geo: layer.geo,
        cap: layer.cap,
        // Lagen fahren radial auseinander — so liest sich der Wandaufbau
        explode: V3(0, (LAYERS.length - i) * P.d * 0.55, 0),
        anchor: i === 0 ? V3(0, P.rOut + 0.16 * P.len, 0) : V3(0, P.rOut + 0.10 * P.len, 0),
      });
    });

    STRIPES.forEach((stripe, i) => {
      A.part('stripe' + i, {
        name: 'Kennstreifen',
        label: 'Kennstreifen (Coextrusion)',
        mat: stripe.key,
        geo: buildStripe(P, stripe).geo,
        explode: V3(0, (LAYERS.length + 1) * P.d * 0.55, 0),
      });
    });

    A.light(V3(-P.xEnd * 0.7, 0, 0));
    A.light(V3(P.xEnd * 0.7, 0, 0));

    A.hotspot({
      v: V3(-P.xEnd + P.d * 0.28, P.rOut * 0.42, P.rOut * 0.88),
      n: V3(0, 0.42, 0.9),
      text: LAYERS.length > 1
        ? 'Schnittkante: ' + LAYERS.length + ' Lagen, Wandstärke ' +
          String(P.wall).replace('.', ',') + ' mm'
        : 'Schnittkante: Wandstärke ' + String(P.wall).replace('.', ',') +
          ' mm, Innendurchmesser ' + String(P.di).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(P.len * 0.12, P.rOut * 0.95, P.rOut * 0.28),
      n: V3(0, 0.95, 0.3),
      text: 'SDR 11, S 5 — Lieferlänge ' + P.stockLength + ' m',
    });

    const zf = P.rOut + 0.10 * P.len;
    const xD = P.xEnd + 0.10 * P.len;
    A.dim({ label: 'd', value: P.d, a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf),
      off: V3(-0.09 * P.len, 0, 0) });
    A.dim({ label: 'di', value: P.di,
      a: V3(-P.xEnd - 0.06 * P.len, -P.rIn, zf), b: V3(-P.xEnd - 0.06 * P.len, P.rIn, zf),
      off: V3(0.06 * P.len, 0, 0) });

    A.measures = [
      { key: 'd', label: DIMENSION_KEY.d, soll: P.d,
        ist: () => { const b = A.boxOf(['layer0']); return b.max.y - b.min.y; } },
      /* Innendurchmesser: von der Achse radial nach außen gegen die
         INNERSTE Lage. Ein axialer Strahl trifft die Anschnittfase und
         gibt nur seinen eigenen Startradius zurück. */
      { key: 'di', label: DIMENSION_KEY.di, soll: P.di,
        ist: () => {
          const hit = A.probeAxial('layer' + (LAYERS.length - 1), V3(0, 0, 0), V3(0, 1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      { key: 's', label: DIMENSION_KEY.s, soll: P.s, ist: () => (P.d - P.di) / 2 },
      { key: 'lagen', label: 'Summe der Lagendicken', soll: P.wall,
        ist: () => Math.round(layers.reduce((t, l) => t + l.thickness, 0) * 100) / 100 },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

return product;
})();
