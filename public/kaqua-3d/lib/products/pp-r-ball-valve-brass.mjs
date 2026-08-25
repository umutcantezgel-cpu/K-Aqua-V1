/* K-Aqua 3D · Kugelhahn PP-R (Kugel Messing verchromt) — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID valves/pp-r-ball-valve-brass.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, SEG_INT, SEG_VIS, arcPts, buildProfile, capFromProfile, createAssembly, loft, materials, mergeGeometries, polygonCap, revolve, roundedPad,
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


/* == pp-r-ball-valve-brass/data.js ===================================== */
/* K-Aqua Kugelhahn PP-R, Kugel Messing verchromt — Artikeltabelle.

   QUELLE: Druckkatalog KA-Katalog_GB_06-2025_NEU.pdf, Seite 107, obere
   Tabelle „PP-R Ball valve (Ball in brass, chromium plated)".
   Acht Größen, d20 bis d90.

   GEGENPROBE DER LESART: auf derselben Seite steht darunter der
   Kugelhahn mit PP-Kugel (AQ852), und der ist seit Phase 1 gebaut —
   damals aus einem Website-Screenshot. Katalog und gebautes Produkt
   stimmen in allen sechs Zeilen und allen acht Spalten überein. Beide
   Tabellen wurden gleich gelesen; die eine bürgt für die andere. Damit
   ist nebenbei auch der alte Befund bestätigt, dass die Markdown-Datei
   mit AQ50020–AQ50063 und den Spalten d/L/H falsch war.

   MASSSCHLÜSSEL, an der Schnittzeichnung S. 107 abgelesen (Achse
   waagerecht, Hebel oben):
     d   Rohr-Außendurchmesser = Muffenbohrung
     A   Baulänge Stirnfläche–Stirnfläche
     C   Muffentiefe, vom Stirnende nach innen
     H   Rohrachse bis Oberkante Hebel
     L   Hebellänge, von der Spindel bis zur Spitze
     P   Durchgang der Kugel

   C IST DIE MUFFENTIEFE, und das ist mehr als eine Deutung: die Spalte
   deckt sich in sieben von acht Zeilen AUF DEN ZEHNTEL mit der
   FUSION_DEPTH-Tabelle im Core, die aus ganz anderer Quelle stammt
   (DVS 2207-11):

       d      20    25    32    40    50    63    75    90
       C     14,5  16,0  18,0  20,5  23,5  27,5  31,0  35,5
       Core  14,5  16,0  18,0  20,5  23,5  27,5  31,0  35,0

   Nur d90 weicht um 0,5 mm ab. Zwei unabhängige Quellen, die über acht
   Zeilen so zusammenfallen, bestätigen sich gegenseitig — und das
   Modell nimmt trotzdem den TABELLENWERT C, nicht den Core-Wert, denn
   für dieses Produkt ist die Tabelle Rang 1.

   P IST TABELLIERT und wird nicht geschätzt. Beim PP-Kugelhahn musste
   der Durchgang mit 0,667·d angenommen werden, weil seine Tabelle ihn
   nicht führt. Hier steht er da. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 8;

export const ARTICLES = [
  { code: 'AQ85020', d: 20, A: 67.5,  C: 14.5, H: 60,  L: 102,   P: 15 },
  { code: 'AQ85025', d: 25, A: 70.5,  C: 16,   H: 60,  L: 102,   P: 15 },
  { code: 'AQ85032', d: 32, A: 79.5,  C: 18,   H: 63,  L: 102,   P: 20 },
  { code: 'AQ85040', d: 40, A: 94,    C: 20.5, H: 78,  L: 119.5, P: 25 },
  { code: 'AQ85050', d: 50, A: 109,   C: 23.5, H: 83,  L: 119.5, P: 32 },
  { code: 'AQ85063', d: 63, A: 130,   C: 27.5, H: 103, L: 146,   P: 40 },
  { code: 'AQ85075', d: 75, A: 151,   C: 31,   H: 110, L: 146,   P: 50 },
  { code: 'AQ85090', d: 90, A: 173,   C: 35.5, H: 133, L: 205,   P: 65 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  A: 'Baulänge',
  C: 'Muffentiefe',
  H: 'Höhe Achse–Hebeloberkante',
  L: 'Hebellänge',
  P: 'Durchgang',
};

export function article(dNom) {
  const a = ARTICLES.find((x) => x.d === dNom);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + dNom);
  return a;
}


/* == pp-r-ball-valve-brass/params.js =================================== */
/* K-Aqua Kugelhahn PP-R (Kugel Messing verchromt) — Parametrik.

   Rang 1 sind d · A · C · H · L · P. Der Katalog bemaßt damit mehr als
   beim PP-Kugelhahn: Muffentiefe UND Durchgang stehen in der Tabelle
   und müssen nicht angenommen werden.

   Was die Tabelle NICHT nennt, ist der Außendurchmesser des Korpus. Er
   kommt aus der Schnittzeichnung S. 107 — und zwar erst, nachdem
   feststand, WELCHE Größe dort gezeichnet ist (Fall 35). Das Verhältnis
   A/H der Zeichnung beträgt 235/215 = 1,09; in der Tabelle liegt d20
   bei 1,125 und alles darüber bei 1,18 bis 1,37. Gezeichnet ist also
   d20, und nur für d20 dürfen Verhältnisse abgegriffen werden.

   Alle Maße in Millimetern. X = Durchflussachse, Y = oben, Z = Tiefe. */


export function params(dNom) {
  const a = article(dNom);
  const { d, A, C, H, L } = a;
  const P = Object.assign({}, a);

  P.len = A;
  P.xEnd = A / 2;
  P.socket = C;                    // TABELLIERT
  P.bore = a.P;                    // TABELLIERT
  P.boreR = P.bore / 2;

  /* ASSUMPTION Korpusdurchmesser, aus der Zeichnung bei d20:
     158 px von 235 px Baulänge = 0,672·A. Angesetzt 0,67·A.
     Über A skaliert und nicht über d, weil der Hahn NICHT
     selbstähnlich ist: A/d fällt von 3,38 bei d20 auf 1,92 bei d90. */
  P.bodyOD = 0.67 * A;

  /* ASSUMPTION Muffenstutzen, gleiche Zeichnung: die Stirnfläche misst
     102 px = 29,3 mm, also 1,465·d bei d20. Statt dieses Verhältnis
     blind hochzuziehen, ist es gegen die MUFFENTABELLE des Katalogs
     (AQ270xx, Spalte D) gefittet, die für dieselben Nennweiten
     29/35/44/52/65/84/99/120 führt:

         d + 2·max(4,5; 0,165·d)
         →  29 · 34 · 42,6 · 53,2 · 66,5 · 83,8 · 99,8 · 119,7

     Das trifft die Muffentabelle über alle acht Zeilen auf 1,5 mm.
     Nach oben begrenzt durch den Korpus, damit der Stutzen nie dicker
     wird als der Bauch. */
  P.socketOD = Math.min(0.90 * P.bodyOD, d + 2 * Math.max(4.5, 0.165 * d));
  P.rSocket = P.socketOD / 2;
  P.rBody = P.bodyOD / 2;

  /* ASSUMPTION Kugeldurchmesser: Zeichnung 78 px gegen 235 px Baulänge
     = 22,4 mm bei d20, das ist 1,49·P. Über den DURCHGANG skaliert und
     nicht über A oder d — die Kugel trägt den Durchgang, und nur ihn.
     Über A gerechnet käme bei d90 eine Kugel von 57 mm heraus, die den
     eigenen Durchgang von 65 mm nicht fassen kann. */
  P.ballD = 1.49 * P.bore;

  P.seatW = 0.125 * d;
  P.seatT = 0.094 * d;
  P.seatOD = P.bore + 2 * P.seatW;
  P.seatSphR = P.ballD / 2 + 0.15;
  P.seatBack = Math.sqrt(P.seatSphR ** 2 - P.boreR ** 2) + P.seatT;
  P.chamberR = P.ballD / 2 + 0.2;

  /* Der Innenverlauf hat DREI Stufen, nicht zwei. Der erste Entwurf
     führte die Korpusbohrung durchgehend auf Sitzmaß — bei d20 wurde
     sie damit WEITER als die Muffenbohrung (10,2 gegen 10,0), und dem
     Rohr fehlte der Anschlag. Richtig ist:

       Muffe Ø d  →  Kanal auf Durchgangsmaß  →  Sitzaufnahme  →  Kammer

     Der Kanal trägt den Durchfluss, die Sitzaufnahme nimmt den PTFE-Ring
     auf, und zwischen Muffe und Kanal liegt die Schulter, an der das
     Rohr aufsitzt. */
  P.kanalR = P.boreR + 0.4;
  P.seatRingR = P.seatOD / 2 + 0.2;
  P.chamberX = Math.sqrt(Math.max(0.01, P.chamberR ** 2 - P.seatRingR ** 2));
  P.xSeatBack = P.seatBack;              // Rückseite des Sitzrings
  P.xShoulder = P.xEnd - P.socket;       // Muffengrund = Rohranschlag


  /* Der Kegel von der Stirnfläche auf den Bauch läuft unter 45° — in
     der Zeichnung 25 px lang bei einer Radiendifferenz von 28 px.
     45° heißt: die Kegellänge IST die Radiendifferenz. */
  P.coneLen = P.rBody - P.rSocket;
  P.xCone = P.xEnd - P.coneLen;

  /* Spindeldom. Zeichnung bei d20: Domoberkante 34,5 mm über der Achse
     bei H = 60, also 0,575·H. */
  P.domeTop = 0.575 * H;
  P.domeOD = Math.max(P.ballD * 0.62, 2 * (P.boreR + 4));
  P.stemOD = Math.max(6, 0.34 * P.bore);
  /* O-Ringe sitzen bei DIESER Bauart auf der SPINDEL, nicht im
     Durchfluss — es gibt keine Anschlussstutzen, die zu dichten wären.
     Zwei Stück im Dom, wie in der Schnittzeichnung.

     STEHT HIER UND NICHT WEITER OBEN: die Höhen hängen an domeTop, und
     domeTop wird erst darüber gesetzt. Beim ersten Anlauf stand der
     Block vor domeTop — das Ergebnis war NaN, und ein einziges
     NaN-Teil macht die Bounding-Box der ganzen Baugruppe ungültig. Die
     Seite blieb leer, WÄHREND ALLE ACHT MASSE 0,00 mm meldeten, weil
     keines die O-Ringe anfasst. Nur der Blick auf die Seite hat es
     gezeigt (Fall 38). */
  P.oringY = [0.42 * P.domeTop, 0.72 * P.domeTop];
  P.oringCord = Math.max(1.8, 0.030 * d);
  P.oringDepth = 0.7 * P.oringCord;

  /* Hebel: flacher Stahlbügel, kunststoffummantelt, gekröpft. Nur zwei
     Maße sind tabelliert — L (Länge ab Spindel) und H (Oberkante über
     der Achse). Der Rest ist Gestalt aus der Zeichnung. */
  P.lever = {
    len: L,
    thick: Math.max(4, 0.09 * H),          // Bügeldicke
    wRoot: Math.max(8, 0.115 * H),         // Breite an der Nabe
    wTip: Math.max(6, 0.085 * H),          // Breite an der Spitze
    hubBot: P.domeTop - 2,
    hubOD: Math.max(P.stemOD + 7, 0.34 * P.bodyOD),
    xBend: 0.30 * L,                       // Ende der Kröpfung
    yBend: P.domeTop + 3.0,                // Höhe an der Nabe
  };

  if (P.chamberR > P.rBody - 3.5) {
    throw new Error('K-Aqua Kugelhahn Messing d' + d + ': Kugelkammer ' +
      P.chamberR.toFixed(1) + ' passt nicht in den Korpus r' + P.rBody.toFixed(1));
  }
  if (P.socketOD - d < 7) {
    throw new Error('K-Aqua Kugelhahn Messing d' + d + ': Muffenwand ' +
      ((P.socketOD - d) / 2).toFixed(2) + ' mm zu dünn');
  }
  if (P.ballD <= P.bore + 3) {
    throw new Error('K-Aqua Kugelhahn Messing d' + d + ': Kugelwand zu dünn');
  }
  if (P.xSeatBack + 2 >= P.xShoulder) {
    throw new Error('K-Aqua Kugelhahn Messing d' + d + ': Sitzring endet bei ' +
      P.xSeatBack.toFixed(1) + ', der Muffengrund liegt schon bei ' +
      P.xShoulder.toFixed(1));
  }
  if (P.kanalR >= P.d / 2 - 0.8) {
    throw new Error('K-Aqua Kugelhahn Messing d' + d + ': Kanal r' +
      P.kanalR.toFixed(2) + ' lässt der Muffe r' + (d / 2).toFixed(1) +
      ' keine Schulter');
  }
  if (P.seatRingR >= P.chamberR) {
    throw new Error('K-Aqua Kugelhahn Messing d' + d +
      ': Sitzaufnahme ist weiter als die Kugelkammer');
  }
  if (P.lever.yBend + P.lever.thick > H) {
    throw new Error('K-Aqua Kugelhahn Messing d' + d + ': Dom ' +
      P.domeTop.toFixed(1) + ' lässt für den Hebel unter H = ' + H + ' keinen Platz');
  }
  return P;
}


/* == pp-r-ball-valve-brass/parts.js ==================================== */
/* K-Aqua Kugelhahn PP-R (Kugel Messing verchromt) — die Gehäuseteile.

   Kugel, Sitze, Spindel und O-Ringe kommen aus der Familie
   (_ballvalve/parts.js) — innen ist dieser Hahn dasselbe Gerät wie der
   PP-Kugelhahn. Hier steht nur, was IHN ausmacht:

     · ein EINTEILIGER Korpus mit zwei Schweißmuffen, statt der
       Verschraubung mit zwei Überwurfmuttern,
     · ein flacher, gekröpfter Stahlbügel statt des Kunststoffhebels.

   Kein CSG: jede Bohrung ist Teil der geschlossenen Profilkontur. */


/* Der Korpus re-exportiert die Familie, damit index.js wie bei jedem
   anderen Produkt nur aus './parts.js' importiert. */

/* ── Korpus: Muffe – Kegel – Bauch – Kegel – Muffe, dazu der Spindeldom ── */
export function buildBody(P) {
  const xE = P.xEnd;
  const taper = Math.tan(0.6 * D2R);
  const lead = 2 * Math.tan(15 * D2R);
  const rSockBottom = P.d / 2 - taper * (P.socket - 1.5);

  const outer = [
    { a: -xE, r: P.rSocket, chamfer: 0.8 },
    { a: -P.xCone, r: P.rBody, fillet: 1.4 },
    { a: P.xCone, r: P.rBody, fillet: 1.4 },
    { a: xE, r: P.rSocket, chamfer: 0.8 },
  ];

  /* Kugelkammer: ein Kreisbogen um den Ursprung mit dem Kammerradius.
     Er trifft die Sitzaufnahme dort, wo r = seatRingR ist — der Winkel
     folgt daraus und wird nicht gesetzt. */
  const t0 = Math.atan2(P.seatRingR, P.chamberX);
  const kammer = [];
  arcPts(kammer, 0, 0, P.chamberR, t0, Math.PI - t0, 18);

  /* Drei Stufen nach innen: Muffe → Schulter → Kanal → Sitzaufnahme →
     Kammer. Die Schulter bei xShoulder ist der Rohranschlag; ohne sie
     verschwände das Rohr im Ventil. */
  const inner = [
    { a: xE, r: P.d / 2 + lead, fillet: 0 },
    { a: xE - 1.5, r: P.d / 2, fillet: 0.4 },
    { a: P.xShoulder, r: rSockBottom, fillet: 0.6 },
    { a: P.xShoulder, r: P.kanalR, fillet: 0.6 },
    { a: P.xSeatBack, r: P.kanalR, fillet: 0.5 },
    { a: P.xSeatBack, r: P.seatRingR, fillet: 0.5 },
    { a: P.chamberX, r: P.seatRingR, fillet: 0.4 },
    ...kammer,
    { a: -P.chamberX, r: P.seatRingR, fillet: 0.4 },
    { a: -P.xSeatBack, r: P.seatRingR, fillet: 0.5 },
    { a: -P.xSeatBack, r: P.kanalR, fillet: 0.5 },
    { a: -P.xShoulder, r: P.kanalR, fillet: 0.6 },
    { a: -P.xShoulder, r: rSockBottom, fillet: 0.6 },
    { a: -(xE - 1.5), r: P.d / 2, fillet: 0.4 },
    { a: -xE, r: P.d / 2 + lead, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geo = revolve(profile, { axis: 'x', segments: SEG_VIS });

  /* Spindeldom, abgesetzt wie in der Zeichnung: breiter Sockel, darüber
     der schlankere Stopfbuchsenhals. Der Fuß liegt auf y = 0 und damit
     im Korpus — es wird verschmolzen, nicht verschnitten. */
  const rD = P.domeOD / 2, rH = P.domeOD * 0.38;
  const yStep = P.domeTop * 0.62;
  const rBohr = P.stemOD / 2 + 0.3;
  const domProfile = buildProfile([
    { a: 0, r: rD, fillet: 0 },
    { a: yStep, r: rD, chamfer: 0.8 },
    { a: yStep + 0.9, r: rH, fillet: 0.5 },
    { a: P.domeTop, r: rH, chamfer: 0.6 },
    { a: P.domeTop, r: rBohr, chamfer: 0.5 },
    { a: 0, r: rBohr, fillet: 0 },
  ], { segs: 4 });
  const dom = revolve(domProfile, { axis: 'y', segments: SEG_VIS });

  return {
    geo: mergeGeometries([geo, dom]),
    cap: mergeGeometries([capFromProfile(profile, 'x'), capFromProfile(domProfile, 'y')]),
    profile,
  };
}

/* ── Hebel: Nabe (Rotationskörper) + gekröpfter Bügel (Loft) ──
   Tabelliert sind nur L (Länge ab Spindel) und H (Oberkante über der
   Achse). Der Bügel steigt von der Nabe bis xBend an und läuft dann
   waagerecht — genau diese waagerechte Oberkante IST H. */
export function buildLever(P) {
  const Lv = P.lever;
  const rHub = Lv.hubOD / 2, rBohr = P.stemOD / 2 + 0.2;

  /* Die Nabe endet dicht über der WURZEL des Bügels, nicht über seinem
     waagerechten Teil. Der erste Anlauf zog sie bis H − Dicke hoch und
     machte daraus einen 23 mm hohen Stahlzylinder, der den grünen Dom
     vollständig verdeckte. Der Bügel steigt aber von der Nabe aus an —
     die Nabe muss nur seine Wurzel fassen. */
  const yHubTop = Lv.yBend + Lv.thick + 0.6;

  const hubProfile = buildProfile([
    { a: Lv.hubBot, r: rHub, chamfer: 0.7 },
    { a: yHubTop, r: rHub * 0.88, fillet: 0.5 },
    { a: yHubTop, r: rBohr, chamfer: 0.4 },
    { a: Lv.hubBot, r: rBohr, chamfer: 0.4 },
  ], { segs: 4 });
  const hub = revolve(hubProfile, { axis: 'y', segments: SEG_INT });

  const yTopAt = (x) => (x <= Lv.xBend
    ? Lv.yBend + Lv.thick + ((P.H - Lv.yBend - Lv.thick) * x) / Lv.xBend
    : P.H);
  const hwAt = (x) => (Lv.wRoot + ((Lv.wTip - Lv.wRoot) * x) / Lv.len) / 2;

  const N = 34;
  const rTip = Lv.thick * 0.5;
  const sections = [];
  for (let i = 0; i <= N; i++) {
    const x = (i / N) * Lv.len;
    let yTop = yTopAt(x), yBot = yTop - Lv.thick, hw = hwAt(x);
    /* Spitze verrunden: die letzten rTip Millimeter kugelig einziehen.
       Die Station x = L bleibt bestehen — L muss messbar sein. */
    const edge = Lv.len - x;
    if (edge < rTip) {
      const s = Math.sqrt(Math.max(0.0016, 1 - ((rTip - edge) / rTip) ** 2));
      const mid = (yTop + yBot) / 2;
      hw = Math.max(0.08, hw * s);
      yTop = mid + (yTop - mid) * s;
      yBot = mid - (mid - yBot) * s;
    }
    const c = Math.min(1.1, (yTop - yBot) * 0.28, hw * 0.28);
    sections.push({
      x,
      pts: [
        { r: yBot, a: -hw + c }, { r: yBot, a: hw - c },
        { r: yBot + c, a: hw }, { r: yTop - c, a: hw },
        { r: yTop, a: hw - c }, { r: yTop, a: -hw + c },
        { r: yTop - c, a: -hw }, { r: yBot + c, a: -hw },
      ],
    });
  }
  const arm = loft(sections);

  /* Schnittkappe des Bügels: sein Umriss in der Ebene z = 0. */
  const oben = [], unten = [];
  for (let i = 0; i <= N; i++) {
    const x = (i / N) * Lv.len;
    oben.push([x, yTopAt(x)]);
    unten.push([x, yTopAt(x) - Lv.thick]);
  }
  const armCap = polygonCap([...oben, ...unten.reverse()]);

  return {
    geo: mergeGeometries([hub, arm]),
    cap: mergeGeometries([capFromProfile(hubProfile, 'y'), armCap]),
  };
}

/* ── O-Ring auf der SPINDEL ──
   Der Familien-O-Ring liegt in der Durchflussachse; dieser Hahn hat
   keine Anschlussstutzen zu dichten, seine Ringe sitzen im Dom um die
   Spindel. Gleicher Torus, andere Achse — deshalb hier und nicht in
   der Familie. */
export function buildStemORing(P, y, r) {
  const c = P.oringCord / 2;
  const g = new THREE.TorusGeometry(r, c, 20, SEG_INT);
  g.rotateX(Math.PI / 2);
  g.translate(0, y, 0);
  const n = g.attributes.position.count;
  g.setAttribute('aWear', new THREE.BufferAttribute(new Float32Array(n), 1));
  return {
    geo: g,
    cap: mergeGeometries([
      polygonCap([[r - c, y - c], [r + c, y - c], [r + c, y + c], [r - c, y + c]]),
      polygonCap([[-r - c, y - c], [-r + c, y - c], [-r + c, y + c], [-r - c, y + c]]),
    ]),
  };
}


/* == pp-r-ball-valve-brass/index.js ==================================== */
/* K-Aqua Kugelhahn PP-R (Kugel Messing verchromt) — Produktpaket.

   Der Zwilling zum PP-Kugelhahn und doch ein anderes Gerät: einteiliger
   Korpus statt Verschraubung, verchromte Messingkugel statt PP-Kugel,
   gekröpfter Stahlbügel statt Kunststoffhebel. Gemeinsam sind die
   Innereien — sie kommen aus der Familie.

   Der Schnitt zeigt, was kein Katalogfoto zeigen kann: die Kugel
   zwischen zwei PTFE-Sitzen, den Durchgang P gegen die Muffenbohrung d
   und die Muffentiefe C. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'valves/pp-r-ball-valve-brass',
  module: 'kaqua-pp-r-ball-valve-brass',
  titleDe: 'Kugelhahn PP-R (Kugel Messing verchromt)',
  titleEn: 'PP-R Ball Valve (Ball in Brass, Chromium Plated)',
  category: 'valves',
  brandLine: 'K-Aqua PP-R · Messing verchromt',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'd',
  sizeLabel: (k) => 'd' + k,
  sizeTitle: 'Nennweite',
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'A', 'H', 'L', 'P'],
  dimensions: ['A', 'H'],
  ariaFields: ['d', 'A', 'C', 'H', 'L', 'P'],

  variants: [],
  states: null,

  tile: 'Einteiliger Korpus mit verchromter Messingkugel und ' +
        'Stahlbügel — im Schnitt liegt der Durchgang frei.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Kugelhahn_Messing_d' + P.d,
      materials: ['pprGreen', 'chrome', 'steel', 'ptfe', 'epdm'],
      seed: 137,
      clipPlane,
    });

    const body = buildBody(P);
    const ball = buildBall(P);
    const seat = buildSeat(P);
    const stem = buildStem(P);
    const lever = buildLever(P);
    const rORing = P.stemOD / 2 + P.oringCord * 0.30;
    const oringU = buildStemORing(P, P.oringY[0], rORing);
    const oringO = buildStemORing(P, P.oringY[1], rORing);

    const gap = 0.07 * P.A;
    const offSeat = P.chamberX + gap;
    const offStem = 0.30 * P.H;
    const offLever = offStem + (P.domeTop + 3.5) - P.lever.hubBot + gap;

    const rotor = A.subgroup('Rotor');

    A.part('korpus', { name: 'Korpus', label: 'Korpus (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(-P.xEnd * 0.55, P.rBody + 0.06 * P.A, 0) });

    A.part('seatR', { name: 'Kugelsitz_rechts', label: 'Kugelsitz (PTFE)', mat: 'ptfe',
      geo: seat.geo, cap: seat.cap, explode: offSeat,
      anchor: V3(P.seatBack * 0.6, -(P.seatOD / 2 + 0.16 * P.A), 0) });
    A.part('seatL', { name: 'Kugelsitz_links', label: 'Kugelsitz (PTFE)', mat: 'ptfe',
      geo: seat.geo, cap: seat.cap, explode: offSeat, mirror: true });

    A.part('oringU', { name: 'O_Ring_unten', label: 'O-Ring Spindel (EPDM)', mat: 'epdm',
      geo: oringU.geo, cap: oringU.cap, parent: rotor,
      explode: V3(0, offStem * 0.55, 0),
      anchor: V3(-0.16 * P.A, P.oringY[0], 0) });
    A.part('oringO', { name: 'O_Ring_oben', label: 'O-Ring Spindel (EPDM)', mat: 'epdm',
      geo: oringO.geo, cap: oringO.cap, parent: rotor,
      explode: V3(0, offStem * 0.78, 0) });

    A.part('ball', { name: 'Kugel', label: 'Kugel (Messing, verchromt)', mat: 'chrome',
      parent: rotor, geo: ball.geo, cap: ball.cap,
      anchor: V3(0, -(P.ballD / 2 + 0.05 * P.A), 0) });
    A.part('stem', { name: 'Spindel', label: 'Spindel', mat: 'steel', parent: rotor,
      geo: stem.geo, cap: stem.cap, explode: V3(0, offStem, 0),
      anchor: V3(0.09 * P.A, P.domeTop + 0.03 * P.A, 0) });
    A.part('hebel', { name: 'Hebel', label: 'Hebel (Stahl)', mat: 'steel', parent: rotor,
      geo: lever.geo, cap: lever.cap, explode: V3(0, offLever, 0),
      anchor: V3(P.lever.len * 0.55, P.H + 0.06 * P.A, 0) });

    A.light(V3(-P.xEnd * 0.7, 0, 0));
    A.light(V3(P.xEnd * 0.7, 0, 0));

    A.hotspot({
      v: V3(-P.xEnd + Math.max(3, 0.06 * P.A), P.rSocket * 0.5, P.rSocket * 0.84),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe C = ' +
        String(P.socket).replace('.', ',') + ' mm laut Tabelle',
    });
    A.hotspot({
      v: V3(0, -(P.ballD * 0.28), P.ballD * 0.40),
      n: V3(0, -0.4, 0.92),
      text: 'Kugel aus Messing, verchromt — Durchgang P = ' + P.bore +
        ' mm bei Nennmaß d' + P.d,
    });
    A.hotspot({
      v: V3(0, P.domeTop * 0.72, P.domeOD * 0.30),
      n: V3(0, 0.45, 0.89),
      text: 'Spindel mit Vierkant im Kugelschlitz, zwei O-Ringe im Dom',
    });

    const zf = P.rBody + 0.12 * P.A;
    const yL = -(P.rBody + 0.26 * P.A);
    A.dim({ label: 'A', value: P.A,
      a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf), off: V3(0, 0.10 * P.A, 0) });
    const xH = P.xEnd + 0.30 * P.A;
    A.dim({ label: 'H', value: P.H,
      a: V3(xH, 0, zf), b: V3(xH, P.H, zf), off: V3(0.10 * P.A, 0, 0) });

    A.measures = [
      { key: 'A', label: DIMENSION_KEY.A, soll: P.A,
        ist: () => { const b = A.boxOf(['korpus']); return b.max.x - b.min.x; } },
      /* H ist die Oberkante des HEBELS über der Rohrachse, nicht die
         Bauhöhe des Korpus. Deshalb wird der Hebel gemessen und die
         Achse als Nullpunkt genommen — max.y allein, nicht die
         Ausdehnung. */
      { key: 'H', label: DIMENSION_KEY.H, soll: P.H,
        ist: () => A.boxOf(['hebel']).max.y },
      /* L ist die Hebellänge AB DER SPINDEL, und die Spindel steht auf
         x = 0. Also max.x des Hebels. Die Nabe reicht ein Stück ins
         Negative — sie darf hier nicht mitzählen, und genau deshalb
         steht hier nicht die Box-Ausdehnung. */
      { key: 'L', label: DIMENSION_KEY.L, soll: P.lever.len,
        ist: () => A.boxOf(['hebel']).max.x },
      /* Muffentiefe: Strahl von außen auf den Muffengrund, im
         Radiusfenster zwischen Korpusbohrung und Muffenbohrung. */
      { key: 'C', label: DIMENSION_KEY.C, soll: P.socket,
        ist: () => {
          const rr = (P.kanalR + P.d / 2) / 2;
          const hit = A.probeAxial('korpus', V3(P.xEnd + 30, rr, 0), V3(-1, 0, 0));
          return hit ? r2(P.xEnd - hit.x) : NaN;
        } },
      /* Muffenbohrung an der Nennebene, radial von der Achse. */
      { key: 'd', label: DIMENSION_KEY.d, soll: P.d,
        ist: () => {
          const hit = A.probeAxial('korpus', V3(P.xEnd - 1.5, 0, 0), V3(0, 0, 1));
          return hit ? r2(2 * hit.z) : NaN;
        } },
      /* DURCHGANG: das Maß, das dieses Produkt vom PP-Kugelhahn
         unterscheidet — dort musste er angenommen werden, hier steht er
         in der Tabelle. Gemessen wird die Kugelbohrung selbst, nicht
         der Sitz: Strahl längs der Achse durch die offene Kugel, knapp
         außerhalb des Solldurchmessers. Trifft er die Kugel, ist die
         Bohrung zu eng. */
      { key: 'P', label: DIMENSION_KEY.P, soll: P.bore,
        ist: () => r2(2 * bohrungTasten(A, P)) },
      /* GEGENPROBE zum Durchgang: die Kugel selbst. Sie MUSS deutlich
         größer sein als ihre Bohrung — gleicher Wert hieße, es gibt
         keine Kugel, nur ein Rohr. */
      { key: 'kugel', label: 'Kugeldurchmesser (Gegenprobe)', soll: r2(P.ballD),
        ist: () => { const b = A.boxOf(['ball']); return r2(b.max.y - b.min.y); } },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

/* Kugelbohrung durch Einschachtelung: der größte Radius, bei dem ein
   achsparalleler Strahl die Kugel noch NICHT trifft, ist ihr
   Bohrungsradius. Zwölf Halbierungsschritte reichen für 0,01 mm. */
function bohrungTasten(A, P) {
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const trifft = (m) => !!A.probeAxial('ball', V(-P.ballD, m, 0), V(1, 0, 0));
  /* ABSICHERUNG: dicht unter dem Kugeläquator MUSS der Strahl treffen.
     Fehlt das Teil, liefert probeAxial NaN — also immer „kein Treffer",
     und die Einschachtelung liefe stumm auf den Kugelradius zu. Ein
     Messmittel, das bei fehlendem Prüfling eine Zahl ausgibt, ist
     schlimmer als keins. */
  if (!trifft(P.ballD * 0.48)) return NaN;
  let lo = 0, hi = P.ballD / 2;
  for (let i = 0; i < 16; i++) {
    const m = (lo + hi) / 2;
    if (trifft(m)) hi = m; else lo = m;
  }
  return lo;
}

export { product as default };
