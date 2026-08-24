/* K-Aqua 3D · T-Stück 90° mit Außengewinde — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID transition-fittings/tee-90-male-thread.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, ISO, SEG_FINE, SEG_VIS, branchJoin, buildProfile, capFromProfile, createAssembly, fusionDepth, hexPrism, materials, mergeGeometries, mirrorProfile, revolve, threadProfile, threadRing, threadSpec,
} from '../kaqua-3d-core.mjs';

/* == _tee/parts.js ===================================================== */
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


/* == _teethread/params.js ============================================== */
/* K-Aqua T-Stück 90° mit Gewinde im Abzweig — gemeinsame Parametrik.

   Zwei Produkte teilen sie:
     tee-90-female-thread   Rp, Messingring bündig    AQ130Gxxxx
     tee-90-male-thread     R,  Messingzapfen mit SW  AQ133Gxxxx

   Quellen und Spaltendeutung: pruefung/w4-tee-gewinde-phase1.md.
   Beide Zeichnungen liegen als zweite Miniatur unter dem Produktfoto.

   ── DIE BEIDEN SEITEN BENENNEN DIESELBE KANTE VERSCHIEDEN ──

   Die Innengewindeseite nennt die Höhe des PP-R-Körpers am Abzweig `h`,
   die Außengewindeseite nennt sie `l1`:

     fem  d20 Rp1/2  h  = 33        male d20 R1/2  l1 = 34
     fem  d25 Rp1/2  h  = 37        male d25 R1/2  l1 = 38

   Ein Millimeter Unterschied bei sonst gleichen d, D, l und z — das ist
   dieselbe Kante. Hier heißt sie einheitlich `ppTop`; welcher Buchstabe
   auf welcher Seite gedruckt steht, führt DIMENSION_KEY je Produkt.
   Fall 19: ein Begriff, der an zwei Stellen entsteht, driftet.

   ── DIE ZWEITE SPALTE z1 BEDEUTET JE VARIANTE ETWAS ANDERES ──

     fem   z1 = Achse Durchgang bis SCHULTER, wo der Messingring beginnt
           h − z1 = 13 · 13 · 15 · 15 · 18 — wächst mit dem Gewinde
     male  z1 = Achse Durchgang bis GEWINDESPITZE
           z1 − l1 = 15 · 15 · 15 · 15 — konstant, der Messingzapfen
           ist über beide Nennweiten und beide Gewinde derselbe

   Beide Deutungen sind über alle Zeilen durchgerechnet (Fall 28). Die
   Vorzeichen sind durchgehend positiv; keine Zeile bricht aus.

   ── l − z TRIFFT DIE NORMREIHE ──

     d20  28 − 14 = 14      Normreihe DVS 2207-11: 14,5
     d25  31 − 16 = 15  ·  32 − 16 = 16                16,0
     d32  38 − 20 = 18                                 18,0

   Die Muffentiefe kommt wie überall aus fusionDepth(d), der
   Tabellenwert wandert als socketFromTable in den Prüfbericht (Fall 4). */


/* Die Gewindetabelle steht seit dem 24.08.2026 im Core
   (core/geometry.js, threadSpec) — sie stand fünfmal im Produktcode
   und gehört dorthin, wo FUSION_DEPTH steht (Fall 19). */

/* Muffen-Außendurchmesser aus products/socket/data.js, Spalte D.
   Dient nur der Gegenprobe des Widerspruchs bei d25 (siehe unten). */
export const SOCKET_OD = { 20: 29, 25: 35, 32: 44 };

export function teeThreadParams(a, cfg) {
  const kind = cfg.threadKind;                 // 'R' oder 'Rp'
  const P = Object.assign({}, a);
  const d = a.d;
  const gewinde = kind === 'R' ? a.R : a.Rp;

  const th = threadSpec(gewinde);
  if (!th) throw new Error('K-Aqua Gewinde-T-Stück: kein Normmaß für ' + kind + gewinde);
  P.threadKind = kind;
  P.threadLabel = gewinde;
  P.threadOD = th.od;
  P.threadPitch = th.pitch;
  P.threadH = 0.640327 * th.pitch;
  P.threadCore = Math.round((th.od - 2 * P.threadH) * 1000) / 1000;
  P.threadRd = Math.max(0.3, 0.137 * th.pitch);
  P.threadRootRise = Math.round(2 * P.threadRd * (1 / Math.sin(27.5 * D2R) - 1) * 1000) / 1000;

  /* Durchgang. l ist die HALBE Baulänge (Achse bis Stirnfläche), anders
     als beim reinen T-Stück, wo L die Gesamtlänge führt. */
  P.half = a.l;
  P.run = 2 * a.l;
  P.OD = a.D;
  P.rOut = a.D / 2;
  P.wallFitting = (a.D - d) / 2;

  P.socket = fusionDepth(d);
  if (!P.socket) throw new Error('K-Aqua Gewinde-T-Stück d' + d + ': keine Schweißtiefe in der Normreihe');
  P.socketFromTable = a.l - a.z;
  P.depthDeltaToNorm = Math.round((P.socketFromTable - P.socket) * 10) / 10;

  P.wallPipe = d / 6;                          // SDR 6
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);
  P.restwand = P.wallFitting;
  P.emR = Math.min(2.0, 0.05 * d);
  /* Lage des Mundlochbunds. D liegt AUF diesem Bund; davor zieht die
     Entformungsschräge, dahinter die Stirnfase. Der Maßtest tastet
     genau hier ab (Fall 15: am Nennmaßort messen). runProfile in
     ../_tee/parts.js übernimmt den Wert. */
  P.xBell = P.half - Math.max(3, 0.10 * P.socket);
  /* ASSUMPTION Kehlenradius, übernommen aus products/_tee/params.js. */
  P.filletR = Math.max(1.5, 0.18 * d);

  /* Abzweig. */
  P.ppTop = kind === 'R' ? a.l1 : a.h;
  if (kind === 'R') {
    P.threadTip = a.z1;
    P.brassStick = Math.round((a.z1 - a.l1) * 10) / 10;
    /* ASSUMPTION Einbettung des Messingzapfens: 0,62·Gewinde-Ø. Der
       Faktor kommt aus der Innengewindevariante, wo die Ringhöhe
       tabelliert ist — h − z1 gegen threadOD ergibt 0,62 · 0,62 · 0,57
       · 0,57 · 0,54. Genommen wird der Wert der kleinen Gewinde, weil
       nur 1/2" und 3/4" in dieser Tabelle vorkommen. */
    P.brassEmbed = Math.round(0.62 * P.threadOD * 10) / 10;
    P.brassBottom = P.ppTop - P.brassEmbed;
    P.brassTop = a.z1;
    /* ASSUMPTION Schlüsselweite. Die Zeichnung zeigt einen Sechskant am
       Zapfen und beschriftet ihn SW; die Tabelle führt ihn NICHT.
       Angesetzt 1,32·Gewinde-Ø — der Faktor, den der Gewindeadaptor bei
       denselben Gewinden zeigt. Am Originalteil zu prüfen. */
    P.afHex = Math.round(1.32 * P.threadOD * 10) / 10;
    P.hexFillet = Math.max(0.3, P.afHex * 0.03);
    P.cornerHex = Math.round((2 * (P.afHex / Math.sqrt(3)
      - (1 / Math.sin(60 * D2R) - 1) * P.hexFillet)) * 100) / 100;
    P.hexLen = Math.round(Math.max(4, P.brassStick * 0.42) * 10) / 10;
  } else {
    P.brassBottom = a.z1;
    P.brassTop = a.h;
    P.brassRing = Math.round((a.h - a.z1) * 10) / 10;
    P.threadTip = a.h;
  }
  P.branchTotal = kind === 'R' ? P.threadTip : P.ppTop;

  /* Gänge über die tragende Gewindelänge, mindestens drei. */
  P.threadLen = kind === 'R' ? P.brassStick - (P.hexLen ?? 0) - 1.2 : P.brassRing - 2.0;
  P.turns = Math.max(3, Math.floor((P.threadLen - 0.6) / P.threadPitch));

  /* Außendurchmesser des Messingteils im PP-Körper. */
  P.brassOD = Math.min(P.OD - 2.2, P.threadOD + 2 * Math.max(2.2, 0.09 * P.threadOD));
  P.brassR = P.brassOD / 2;

  /* ── Zusicherungen ── */
  if (P.restwand < 3) {
    throw new Error('K-Aqua Gewinde-T-Stück d' + d + ': Restwand ' +
      P.restwand.toFixed(2) + ' mm < 3 mm');
  }
  if (P.socket >= P.half) {
    throw new Error('K-Aqua Gewinde-T-Stück d' + d + ': Muffentiefe ' + P.socket +
      ' mm passt nicht in den halben Durchgang ' + P.half.toFixed(1) + ' mm');
  }
  if (!(P.brassBottom > P.rOut * 0.5)) {
    throw new Error('K-Aqua Gewinde-T-Stück d' + d + ': Messingteil beginnt bei ' +
      P.brassBottom.toFixed(1) + ' mm und ragt in den Durchgang');
  }
  if (!(P.brassOD < P.OD - 2)) {
    throw new Error('K-Aqua Gewinde-T-Stück d' + d + ': Messing-Ø ' +
      P.brassOD.toFixed(1) + ' sprengt den Abzweig Ø' + P.OD);
  }
  if (P.threadLen < P.threadPitch * 3) {
    throw new Error('K-Aqua Gewinde-T-Stück d' + d + ': Gewindelänge ' +
      P.threadLen.toFixed(1) + ' mm trägt kein Gewinde ' + kind + gewinde);
  }
  if (kind === 'Rp' && !(P.threadCore > P.bore * 0.5)) {
    throw new Error('K-Aqua Gewinde-T-Stück d' + d + ': Innengewindekern Ø' +
      P.threadCore.toFixed(2) + ' unplausibel');
  }
  /* Der Widerspruch in D bei d25: die Innengewindetabelle führt 35 und
     34, die Muffentabelle 35. Nicht geworfen — nur vermerkt, damit er
     im Prüfbericht auftaucht (Fall 31: dokumentieren, nicht nachgeben). */
  P.socketTableOD = SOCKET_OD[d] ?? null;
  P.odDeltaToSocket = P.socketTableOD == null ? null
    : Math.round((a.D - P.socketTableOD) * 10) / 10;
  return P;
}


/* == _teethread/parts.js =============================================== */
/* K-Aqua T-Stück 90° mit Gewinde im Abzweig — Konturen.

   Drei bis vier Teile, kein CSG:

     1. PP-R-Körper: Durchgang (Rotationskörper um X) + Kehle
        (branchJoin) + Abzweigstutzen (Rotationskörper um Y), der oben
        auf die Aufnahmebohrung für das Messingteil endet.
     2. Messingteil: Ring mit Innengewinde (Rp) oder Zapfen mit
        Sechskant und kegeligem Außengewinde (R).

   Der Durchgang kommt aus ../_tee/parts.js — derselbe Körper wie beim
   reinen T-Stück, nur der Abzweig unterscheidet sich.

   BEKANNTE GRENZE, wie beim T-Stück: an der Durchdringung überlappen
   die Innenflächen von Durchgang und Abzweig. Von außen unsichtbar, im
   Halbschnitt an der Kehle als zwei Flächen sichtbar. Preis dafür, ohne
   CSG zu arbeiten. Alle Maße sind davon unberührt. */


/* 1 · PP-R-Körper. */
export function buildBody(P) {
  const { profile, rBarrel } = runProfile(P);
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  const kehle = branchJoin({
    mainR: rBarrel, branchR: P.rOut, filletR: P.filletR,
    angle: 90, segments: SEG_VIS, uSegs: 6,
  });
  geos.push(kehle.geo);

  /* Abzweigstutzen um Y, von der Eintauchtiefe bis ppTop. Oben sitzt
     nicht die Schweißmuffe, sondern die Aufnahmebohrung des
     Messingteils — deshalb keine Einführfase und kein Muffenkonus. */
  const yStart = -kehle.insertDepth;
  const yEnd = P.ppTop;
  const yBell = yEnd - Math.max(3, 0.10 * P.rOut);
  const bellRise = Math.min(0.35, P.wallFitting * 0.08);
  const rB = P.rOut - bellRise;
  const rSeat = P.brassR;

  const bOuter = [
    { a: yStart, r: rB, fillet: 0 },
    { a: yBell - 1.5, r: rB - DRAFT * (yBell - 1.5 - yStart) * 0.35, fillet: 2.0 },
    { a: yBell, r: P.rOut, fillet: 1.0 },
    { a: yEnd, r: P.rOut - DRAFT * (yEnd - yBell), chamfer: Math.min(1.2, P.wallFitting * 0.35) },
  ];
  const bInner = [
    /* Sitz für das Messingteil: zylindrisch, mit Absatz auf die
       Rohrbohrung. Der Absatz trägt den Ring axial. */
    { a: yEnd, r: rSeat, chamfer: 0.6 },
    { a: P.brassBottom + 0.4, r: rSeat, fillet: 0.5 },
    { a: P.brassBottom, r: Math.max(P.boreR, P.threadCore / 2 - 0.6), fillet: 0.6 },
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
    cap: mergeGeometries([capFromProfile(profile, 'x'), capFromProfile(bProfile, 'y')]
      .concat(kehle.cap ? [kehle.cap] : [])),
    insertDepth: kehle.insertDepth,
  };
}

/* 2a · Messingring mit zylindrischem Innengewinde Rp.
   Der Ring selbst steht seit dem 24.08.2026 im Core (threadRing) — er ist
   reine Kerngeometrie und wurde vom Anschlussbogen ein zweites Mal
   gebraucht (Fall 32). Hier bleibt nur die Zuordnung der P-Werte.

   Sichtbar ist von außen nur der schmale goldene Kreis an der
   Stirnfläche. */
export function buildBrassRing(P) {
  return threadRing({
    a0: P.brassBottom, a1: P.brassTop, rOuter: P.brassR,
    od: P.threadOD, pitch: P.threadPitch, turns: P.turns,
    coreDia: P.threadCore, axis: 'y', segs: SEG_VIS,
  });
}

/* 2b · Messingzapfen mit Sechskant und kegeligem Außengewinde R.

   Der Rotationskörper liegt über der Sechskantlänge auf dem INKREIS
   (af/2) — läge er auf dem Umkreis, umhüllte er den Sechskant und die
   Schlüsselflächen verschwänden im Material (Fall 11).

   ASSUMPTION Messebene: das Nennmaß liegt am Gewindeanfang, von dort
   verjüngt sich das Gewinde 1:16 zur Spitze. Die Tabelle führt keine
   Einschraublänge. */
export function buildBrassSpigot(P) {
  const yA = P.brassBottom;
  const yPP = P.ppTop;
  const yHexA = yPP + 0.8;
  const yHexB = yHexA + P.hexLen;
  const yTip = P.threadTip;
  const rHexIn = P.afHex / 2;

  const thread = threadProfile(P.threadOD, P.threadPitch, P.turns, 'R')
    .map((p) => ({ a: yHexB + 0.8 + p.a, r: p.r, fillet: p.fillet }))
    .filter((p) => p.a <= yTip - 0.8);

  const outer = [
    { a: yA, r: P.brassR - 0.15, chamfer: 0.5 },
    { a: yPP - 0.6, r: P.brassR - 0.15, fillet: 0.4 },
    { a: yHexA, r: rHexIn, fillet: 0.5 },
    { a: yHexB, r: rHexIn, fillet: 0.4 },
    /* Gewindeauslauf auf dem Kerndurchmesser, dann die Kontur. Kein
       Punkt auf demselben a wie die erste Kuppe (Fall 23). */
    { a: yHexB + 0.35, r: P.threadOD / 2 - P.threadH, chamfer: 0.4 },
    ...thread,
    { a: yTip, r: P.threadOD / 2 - P.threadH - 0.3, chamfer: 0.4 },
  ];
  const inner = [
    { a: yTip, r: P.boreR * 0.92, chamfer: 0.6 },
    { a: yA + 0.8, r: P.boreR * 0.92, fillet: 0.5 },
    { a: yA, r: P.boreR * 0.92 + 0.4, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geos = [revolve(profile, { axis: 'y', segments: SEG_VIS })];

  /* hexPrism baut entlang +X und legt eine SCHLÜSSELFLÄCHE auf Z, eine
     ECKE auf Y. Für den Abzweig um Y muss er gedreht werden — die
     Drehung VOR dem Verschieben, sonst läuft das Teil auf einer
     Kreisbahn um den Ursprung (Fall 24).

     Nach rotateZ(+90°) zeigt die frühere +X-Richtung nach +Y; die
     Schlüsselfläche liegt weiterhin auf Z, die Ecke jetzt auf −X. */
  const hex = hexPrism(P.afHex, P.hexLen, P.hexFillet, 0);
  hex.rotateZ(Math.PI / 2);
  hex.translate(0, yHexA, 0);
  geos.push(hex);

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'y') };
}


/* == _teethread/assembly.js ============================================ */
/* K-Aqua T-Stück 90° mit Gewinde — gemeinsame Baugruppe und Maßtest.

   Zwei Produkte rufen buildTeeThread() mit ihrer Tabelle und ihrem
   Gewindetyp auf. Der Bau steht genau einmal hier (Fall 32).

   Achsen: Durchgang auf X, Abzweig auf +Y. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;
const komma = (v) => String(v).replace('.', ',');

export function buildTeeThread(cfg, size, variant, clipPlane) {
  const a = cfg.article(size);
  const P = teeThreadParams(a, cfg);
  const male = cfg.threadKind === 'R';

  const A = createAssembly({
    name: cfg.exportName + '_d' + a.d + 'x' + P.threadLabel.replace(/[ /]/g, '_'),
    materials: ['pprGreen', 'brass'],
    seed: cfg.seed,
    clipPlane,
  });

  const body = buildBody(P);
  const brass = male ? buildBrassSpigot(P) : buildBrassRing(P);

  A.part('body', {
    name: 'PP_Koerper', label: 'T-Stück-Körper (PP-R)', mat: 'pprGreen',
    geo: body.geo, cap: body.cap,
    explode: V3(0, -0.30 * P.branchTotal, 0),
    anchor: V3(-P.half * 0.6, -(P.rOut + 0.22 * P.run), 0),
  });
  A.part('brass', {
    name: 'Messingteil',
    label: male
      ? 'Messingzapfen ' + P.threadKind + P.threadLabel + '" mit Sechskant'
      : 'Messingring ' + P.threadKind + P.threadLabel + '" (Innengewinde)',
    mat: 'brass',
    geo: brass.geo, cap: brass.cap,
    explode: V3(0, 0.55 * P.branchTotal, 0),
    anchor: V3(P.rOut + 0.30 * P.run, P.brassTop, 0),
  });

  A.light(V3(-P.half * 0.5, 0, 0));
  A.light(V3(P.half * 0.5, 0, 0));
  A.light(V3(0, P.ppTop * 0.6, 0));

  A.hotspot({
    v: V3(-P.half + Math.max(3, 0.10 * P.half), P.rOut * 0.45, P.rOut * 0.86),
    n: V3(0, 0.45, 0.89),
    text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
      komma(P.socket) + ' mm nach DVS 2207-11',
  });
  A.hotspot({
    v: male
      ? V3(0, P.threadTip - P.threadLen * 0.45, P.threadOD * 0.45)
      : V3(0, P.brassTop - P.brassRing * 0.4, P.threadCore * 0.42),
    n: V3(0, 0.35, 0.94),
    text: male
      ? 'Außengewinde R' + P.threadLabel + '" nach ISO 7-1, kegelig 1:16, ' +
        P.turns + ' Gänge'
      : 'Innengewinde Rp' + P.threadLabel + '" nach ISO 228-1, zylindrisch, ' +
        P.turns + ' Gänge',
  });
  A.hotspot({
    v: V3(0, P.ppTop * 0.55, P.rOut * 0.9),
    n: V3(0, 0.2, 0.98),
    text: 'Messingteil im PP-R-Körper eingebettet — die Fügestelle ist ' +
      'im Halbschnitt sichtbar',
  });
  if (male) {
    A.hotspot({
      v: V3(0, P.ppTop + 0.8 + P.hexLen * 0.5, P.afHex / 2),
      n: V3(0, 0.2, 0.98),
      text: 'Schlüsselflächen SW ' + komma(P.afHex) + ' zum Gegenhalten',
    });
  }

  const zf = P.rOut + 0.16 * P.run;
  A.dim({ label: 'D', value: P.OD,
    a: V3(-P.half - 0.10 * P.run, -P.rOut, zf), b: V3(-P.half - 0.10 * P.run, P.rOut, zf),
    off: V3(0.08 * P.run, 0, 0) });
  A.dim({ label: 'l', value: P.half,
    a: V3(0, -(P.rOut + 0.22 * P.run), zf), b: V3(P.half, -(P.rOut + 0.22 * P.run), zf),
    off: V3(0, 0.07 * P.run, 0) });
  A.dim({ label: cfg.topLabel, value: P.branchTotal,
    a: V3(P.rOut + 0.20 * P.run, 0, zf), b: V3(P.rOut + 0.20 * P.run, P.branchTotal, zf),
    off: V3(-0.07 * P.run, 0, 0) });

  /* ── MASSTEST ──
     Jede ist()-Funktion wertet gebaute Geometrie aus. Ausnahme mit
     Namen: restwand ist ein Parameter (Fall 12). */

  const strahl = (id, from, dir) => A.probeAxial(id, from, dir) || null;
  const yHexMid = P.ppTop + 0.8 + (P.hexLen ?? 0) * 0.5;

  const messungen = [
    { key: 'run', label: 'Baulänge Durchgang (2·l)', soll: r2(P.run),
      ist: () => { const b = A.boxOf(['body']); return r2(b.max.x - b.min.x); } },

    /* D am Mundlochbund, nicht über die Box: die Box erfasst auch die
       Kehle, die bis rOut + filletR reicht (Fall 16, dritte Variante).
       Und nicht an der Stirnfläche: dort zieht die Fase (Fall 15). */
    { key: 'D', label: 'Außendurchmesser Durchgang', soll: P.OD,
      ist: () => {
        const h = strahl('body', V3(P.xBell, 0, P.OD), V3(0, 0, -1));
        return h ? r2(2 * h.z) : NaN;
      } },

    /* Muffentiefe: Strahl axial von außen in die Muffe, knapp über der
       Rohrbohrung und in der Z-EBENE. Dort ist die Muffe weiter, der
       Strahl fliegt durch und trifft erst die Ringfläche am
       Muffengrund.

       Der Radius liegt auf halber Höhe zwischen Rohrbohrung und
       Muffenbohrung — dort ist die Ringfläche am Muffengrund flach.
       Näher an der Bohrung trifft der Strahl die Verrundung des
       Muffengrunds und meldet bis zu 0,95 mm zu viel; sie beginnt eine
       Fillet-Länge früher (Fall 23, Fase auf einem Katalogmaß).

       Der Versatz muss in Z liegen, nicht in Y: der Abzweig steht auf
       +Y, und ein in Y versetzter Strahl läuft in dessen Innenwand
       statt in den Muffengrund. Das ist Fall 16 in der ersten Variante,
       nur an einem T-Stück statt an einem Rohr.

       Sollwert ist die NORMREIHE, nicht der Tabellenwert. Der Vergleich
       der beiden gehört in den Prüfbericht, nicht in measures
       (Fall 14). */
    { key: 'muffe', label: 'Muffentiefe Durchgang', soll: r2(P.socket),
      ist: () => {
        const rMess = P.boreR + (P.d / 2 - P.boreR) * 0.5;
        const h = strahl('body', V3(P.half + 6, 0, rMess), V3(-1, 0, 0));
        return h ? r2(P.half - h.x) : NaN;
      } },

    /* Höhe des PP-R-Körpers am Abzweig — die Kante, die auf der einen
       Seite h und auf der anderen l1 heißt. */
    { key: 'ppTop', label: 'Höhe PP-R-Körper am Abzweig', soll: r2(P.ppTop),
      ist: () => { const b = A.visibleBoxOf(['body']); return r2(b.max.y); } },

    /* Gesamthöhe über alles. */
    { key: 'hoehe', label: 'Gesamthöhe Abzweig', soll: r2(P.branchTotal),
      ist: () => { const b = A.visibleBoxOf(); return r2(b.max.y); } },

    /* Das Messingteil darf den Durchgang nicht durchdringen. Ein Wert,
       keine Ja/Nein-Prüfung (Fall 25). */
    { key: 'brassUnten', label: 'Unterkante Messingteil über der Achse',
      soll: r2(P.brassBottom),
      ist: () => { const b = A.visibleBoxOf(['brass']); return r2(b.min.y); } },

    { key: 'restwand', label: 'Fittingwand (Parameter, nicht gemessen)',
      soll: r2(P.restwand), ist: () => P.restwand },
  ];

  if (male) {
    const yTh0 = P.ppTop + 0.8 + P.hexLen + 0.8;
    const kuppe = (i) => yTh0 + i * P.threadPitch;
    const sollKuppe = (i) => r2(P.threadOD - 2 * (i * P.threadPitch) / 32);
    messungen.push(
      /* Schlüsselweite: Strahl in −Z auf eine Schlüsselfläche.
         hexPrism ist um Z gedreht — die Fläche liegt weiterhin auf Z. */
      { key: 'SW', label: 'Schlüsselweite Sechskant', soll: P.afHex,
        ist: () => {
          const h = strahl('brass', V3(0, yHexMid, P.afHex), V3(0, 0, -1));
          return h ? r2(2 * h.z) : NaN;
        } },
      /* GEGENPROBE: nach rotateZ(+90°) liegt die ECKE auf −X. Der Wert
         MUSS hier das Eckenmaß sein. Käme wieder SW heraus, umhüllte
         ein Zylinder den Sechskant (Fall 11 und 13). */
      { key: 'SW_ecke', label: 'Eckenmaß Sechskant', soll: P.cornerHex,
        ist: () => {
          const h = strahl('brass', V3(-P.afHex, yHexMid, 0), V3(1, 0, 0));
          return h ? r2(2 * Math.abs(h.x)) : NaN;
        } },
      { key: 'gewinde', label: 'Gewinde-Außendurchmesser (1. Kuppe)', soll: sollKuppe(1),
        ist: () => {
          const h = strahl('brass', V3(0, kuppe(1), P.threadOD), V3(0, 0, -1));
          return h ? r2(2 * h.z) : NaN;
        } },
      /* GEGENPROBE: der Grund zwischen zwei Kuppen MUSS eine
         Gewindetiefe tiefer liegen. Der Grund trägt keinen
         Scheitelausgleich, sein Fillet schiebt ihn nach außen. */
      { key: 'gewindegrund', label: 'Gewinde-Kerndurchmesser',
        soll: r2(P.threadOD - 2 * (1.5 * P.threadPitch) / 32 - 2 * P.threadH
          + P.threadRootRise),
        ist: () => {
          const h = strahl('brass', V3(0, kuppe(1.5), P.threadOD), V3(0, 0, -1));
          return h ? r2(2 * h.z) : NaN;
        } },
    );
  } else {
    const yTh0 = P.brassBottom + 1.0;
    const kuppe = (i) => yTh0 + i * P.threadPitch;
    messungen.push(
      /* Innengewinde: Strahl von der ACHSE nach außen. Der engste Punkt
         der Bohrung ist die Kuppe und liegt auf dem Kerndurchmesser.
         Das ist der Abtastnachweis nach Fall 20. */
      { key: 'kern', label: 'Innengewinde-Kerndurchmesser', soll: P.threadCore,
        ist: () => {
          const h = strahl('brass', V3(0, kuppe(1), 0), V3(0, 0, 1));
          return h ? r2(2 * h.z) : NaN;
        } },
      /* GEGENPROBE: zwischen zwei Kuppen liegt der Grund auf dem
         Nennmaß, abzüglich des Fillet-Rückzugs. Der Strahl MUSS dort
         weiter fliegen. */
      { key: 'nenn', label: 'Innengewinde-Nenndurchmesser (Grund)',
        soll: r2(P.threadOD - P.threadRootRise),
        ist: () => {
          const h = strahl('brass', V3(0, kuppe(1.5), 0), V3(0, 0, 1));
          return h ? r2(2 * h.z) : NaN;
        } },
    );
  }

  A.measures = messungen;
  A.setExplode(0);
  A.setSection(false, clipPlane);
  A.P = P;
  return A;
}


/* == tee-90-male-thread/data.js ======================================== */
/* K-Aqua T-Stück 90° mit Außengewinde im Abzweig — Artikeltabelle.

   PHASE 1, verifiziert am 23.08.2026 gegen
   Transition Fittings K-Aqua/screencapture-…-tee-90-male-thread-….png (quellen/w4-tee-male.png)
   Ausschnitte: Zeichnung quellen/w4-zeichnung-tee-male.png,
   Tabelle quellen/w4-tabelle-tee-male-a.png und -b.png.
   Vollständige Quellenlesung: pruefung/w4-tee-gewinde-phase1.md.

   Spaltenköpfe wie abgebildet:
     Code · d · R · D · l · z · l1 · z1 · kg · Pack.
   4 Größen. Nach der letzten Zeile folgt der ORDER-Knopf —
   die Tabelle ist vollständig gelesen (Fall 2).

   MASSSCHLÜSSEL:
     d    Nennweite des Durchgangs
     R    kegeliges Außengewinde des Abzweigs, in Zoll (ISO 7-1)
     D    Außendurchmesser des Durchgangs
     l    Achse Abzweig bis Stirnfläche Durchgang (HALBE Baulänge)
     z    Achse bis Muffengrund des Durchgangs
     l1   Achse Durchgang bis Ende des PP-R-Körpers
     z1   Achse Durchgang bis GEWINDESPITZE

   z1 − l1 ist der freistehende Messingzapfen:
     15 · 15 · 15 · 15 mm — über beide Nennweiten und beide Gewinde
     KONSTANT. Derselbe Zapfen wird in allen vier Artikeln verbaut.
     Über alle Zeilen positiv (Fall 28).

   SIZEKEY NÖTIG. Dieselbe Nennweite kommt mit verschiedenen Gewinden
   vor, d allein ist kein Schlüssel. Aufbau wie bei
   products/adaptor-socket-male-thread: '<d>x<gewinde>'.

   ── DREI GEGENPROBEN ──

   1 · l − z gegen die Normreihe DVS 2207-11:
         d20  28 − 14 = 14      Normreihe 14,5
         d25  32 − 16 = 16      Normreihe 16,0
       Die Muffentiefe kommt aus fusionDepth(d); der Tabellenwert
       wandert als socketFromTable in den Prüfbericht (Fall 4).

   2 · D deckt sich mit der Muffentabelle (products/socket/data.js):
       d20 → 29 ✓ · d25 → 35 · d32 → 44 gegen 43 hier.
       Bei d25 steht hier durchgehend 34, die Muffentabelle sagt 35.
       Die Innengewindeseite druckt bei d25 beides (35 und 34) — der
       Widerspruch ist dort im Kopfkommentar ausgeführt.

   3 · d, D, l und z decken sich zeilenweise mit der
       Innengewindevariante, soweit dieselben Nennweiten vorkommen.

   ── DIE SPALTE SW WIRD NICHT TABELLIERT, ABER GEZEICHNET ──
   Die Maßzeichnung zeigt einen Sechskant am Messingzapfen und
   beschriftet ihn SW. Die Tabelle führt keine solche Spalte.

   Der Sechskant WIRD gebaut — er ist in Zeichnung und Foto da. Seine
   Schlüsselweite ist eine ASSUMPTION (1,32·Gewinde-Ø, der Faktor des
   Gewindeadaptors bei denselben Gewinden) und in params.js als solche
   benannt. Der Maßtest misst Schlüsselweite UND Eckenmaß als Paar,
   damit wenigstens bewiesen ist, dass der Sechskant die Silhouette
   bildet (Fälle 11 und 13). Am Originalteil zu prüfen.

   ── DIE KANTE HEISST HIER l1 UND AUF DER ANDEREN SEITE h ──
   Siehe Kopfkommentar von tee-90-female-thread/data.js. */

export const DATA_STATUS = 'tabelle-verifiziert-zeichnung-gelesen';
export const SIZES_SOURCE_VERIFIED = 4;

export const ARTICLES = [
  { code: 'AQ133G2012', key: '20x1_2', d: 20, R: '1/2', D: 29, l: 28, z: 14, l1: 34, z1: 49, kg: 0.11, pack: 100 },
  { code: 'AQ133G2034', key: '20x3_4', d: 20, R: '3/4', D: 29, l: 28, z: 14, l1: 35, z1: 50, kg: 0.15, pack: 100 },
  { code: 'AQ133G2512', key: '25x1_2', d: 25, R: '1/2', D: 34, l: 32, z: 16, l1: 38, z1: 53, kg: 0.11, pack: 80 },
  { code: 'AQ133G2534', key: '25x3_4', d: 25, R: '3/4', D: 34, l: 32, z: 16, l1: 40, z1: 55, kg: 0.15, pack: 80 },
];

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Nennmaß Durchgang',
  R: 'Außengewinde',
  D: 'Außendurchmesser',
  l: 'Achse bis Stirnfläche',
  z: 'Einbaulänge',
  l1: 'Höhe PP-R-Körper',
  z1: 'Gesamthöhe Abzweig',
};

export function sizeLabel(key) {
  const a = article(key);
  return 'd' + a.d + ' · R' + a.R + '"';
}

export function article(key) {
  const a = ARTICLES.find((x) => x.key === key);
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}


/* == tee-90-male-thread/params.js ====================================== */
/* K-Aqua T-Stück 90° mit Außengewinde — Parametrik.

   Die Rechnung steht in ../_teethread/params.js: beide Produkte teilen
   die Baugruppe, und zweimal dieselbe Rechnung driftet (Fall 32). */


export const CONFIG = { threadKind: 'R' };

export function params(key) {
  return teeThreadParams(article(key), CONFIG);
}


/* == tee-90-male-thread/parts.js ======================================= */
/* K-Aqua T-Stück 90° mit Außengewinde — Konturen.

   Alle Teile kommen aus ../_teethread/parts.js. Der Unterschied
   zwischen den beiden Varianten ist das Messingteil: ein bündiger Ring
   mit Innengewinde (Rp) oder ein Zapfen mit Sechskant und kegeligem
   Außengewinde (R).

   Die Paarungsregel verlangt, beide zusammen zu prüfen (Fall 10) —
   der Maßtest liegt in pruefung/w4-masstest.html. */


/* == tee-90-male-thread/index.js ======================================= */
/* K-Aqua T-Stück 90° mit Außengewinde — Produktpaket nach PRODUKT-VERTRAG.md.

   Zwei Werkstoffe. Der Halbschnitt zeigt, wie tief das Messingteil im
   PP-R-Körper sitzt und wo die Fügestelle liegt; die Explosionsansicht
   zieht es nach oben heraus. */


const product = {
  id: 'transition-fittings/tee-90-male-thread',
  module: 'kaqua-tee-90-male-thread',
  titleDe: 'T-Stück 90° mit Außengewinde',
  titleEn: 'Tee 90° (Male thread)',
  category: 'transition-fittings',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeLabel,
  sizeTitle: 'Nennweite · Gewinde',
  defaultSize: '25x1_2',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'R', 'D', 'z1'],
  dimensions: ['D', 'l', 'z1'],
  ariaFields: ['d', 'R', 'D', 'l', 'z1'],

  variants: [],
  states: null,

  tile: 'Abzweig auf kegeliges Außengewinde, Durchgang bleibt PP-R-Muffe — ' +
        'der Messingzapfen trägt einen Sechskant zum Gegenhalten.',

  build(size, variant, clipPlane) {
    return buildTeeThread({
      ...CONFIG,
      article,
      topLabel: 'z1',
      exportName: 'K-Aqua_TStueck_AG',
      seed: 197,
    }, size, variant, clipPlane);
  },
};

export { product as default };
