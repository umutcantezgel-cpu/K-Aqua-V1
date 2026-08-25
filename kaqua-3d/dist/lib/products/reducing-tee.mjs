/* K-Aqua 3D · Reduzier-T-Stück — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID fittings/reducing-tee.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, SEG_FINE, SEG_VIS, branchJoin, buildProfile, capFromProfile, createAssembly, fusionDepth, materials, mergeGeometries, mirrorProfile, revolve,
} from '../kaqua-3d-core.mjs';

/* == _tee/params.js ==================================================== */
/* K-Aqua T-Stück-Familie — Parametrik.

   Aus der Tabelle: d, D, l (Achse Abzweig → Stirnfläche Durchgang),
   L (Gesamtlänge Durchgang), l1 (Achse Durchgang → Stirnfläche
   Abzweig), z.

   Gegenprobe der Transkription: L muss 2·l ergeben. Bei d20 steht
   L = 55 gegen 2·l = 54 — eine Rundung des Herstellers, kein
   Ablesefehler. Maßgeblich ist L; l wird daraus gerechnet, damit das
   Modell symmetrisch bleibt. */


export function teeParams(article, opt) {
  const a = article;
  const P = Object.assign({}, a);
  const { d, D } = a;

  /* L steht nur beim gleichschenkligen T-Stück in der Tabelle. Das
     Reduzier-T führt keine Gesamtlänge, sondern nur l — dort ist der
     Durchgang zwangsläufig 2·l. Das `??` lässt das T-Stück unberührt,
     denn es HAT ein L. */
  P.run = a.L ?? 2 * a.l;
  P.half = P.run / 2;
  P.branch = a.l1;                // Achse Durchgang → Stirnfläche Abzweig
  P.lTable = a.l;
  P.lDelta = Math.round((a.l - P.run / 2) * 10) / 10;

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

  /* ABZWEIG. Beim gleichschenkligen T-Stück ist er in allem gleich dem
     Durchgang; beim Reduzier-T hat er eigene Nennweite d1 und eigenen
     Muffenaußendurchmesser D1. Alle Felder fallen ohne d1 auf die Werte
     des Durchgangs zurück — deshalb ändert sich für das T-Stück und die
     Gewinde-T-Stücke KEINE Zahl. Nachgewiesen im Prüfbericht. */
  P.dB = a.d1 ?? d;
  P.ODB = a.D1 ?? D;
  P.rOutB = P.ODB / 2;
  P.socketB = fusionDepth(P.dB) ?? P.socket;
  P.wallPipeB = P.dB / (opt.sdr ?? 6);
  P.boreRB = (P.dB - 2 * P.wallPipeB) / 2;
  P.wallFittingB = (P.ODB - P.dB) / 2;
  P.reduziert = P.dB !== d;

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
     Abzweigstutzen in den Durchgang eintauchen muss.

     Der Abzweig kann kleiner sein als der Durchgang (Reduzier-T). Ohne
     d1 in der Tabelle sind rOutB, socketB und boreRB identisch mit den
     Werten des Durchgangs — für das gleichschenklige T-Stück ändert
     sich damit nichts. */
  const rOutB = P.rOutB ?? P.rOut;
  const socketB = P.socketB ?? P.socket;
  const boreRB = P.boreRB ?? P.boreR;
  const dB = P.dB ?? P.d;
  const wallB = P.wallFittingB ?? P.wallFitting;

  const kehle = branchJoin({
    mainR: rBarrel, branchR: rOutB, filletR: P.filletR,
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
  const rSockB = (y) => dB / 2 - P.sockTaper * (yEnd - y);
  const yBell = yEnd - Math.max(3, 0.10 * socketB);
  const bellRise = Math.min(0.35, wallB * 0.08);
  const rB = rOutB - bellRise;

  const bOuter = [
    { a: yStart, r: rB, fillet: 0 },
    { a: yBell - 1.5, r: rB - DRAFT * (yBell - 1.5 - yStart) * 0.35, fillet: 2.0 },
    { a: yBell, r: rOutB, fillet: 1.0 },
    { a: yEnd, r: rOutB - DRAFT * (yEnd - yBell), chamfer: Math.min(1.4, wallB * 0.4) },
  ];
  const bInner = [
    { a: yEnd, r: dB / 2 + P.lead, fillet: 0 },
    { a: yEnd - 2, r: rSockB(yEnd - 2), fillet: 0.4 },
    { a: yEnd - socketB, r: rSockB(yEnd - socketB), fillet: 1.2 },
    { a: yEnd - socketB, r: boreRB, fillet: 1.2 },
    { a: yStart, r: boreRB, fillet: 0 },
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


/* == reducing-tee/data.js ============================================== */
/* K-Aqua Reduzier-T-Stück — Artikeltabelle.

   QUELLE: Druckkatalog KA-Katalog_GB_06-2025_NEU.pdf, Seiten 88 und 89,
   Tabelle „Reducing tee". 37 Größen.

   ZWEI BAUARTEN IN EINER TABELLE, getrennt durch die Zwischenzeile
   „SDR 11*" und die Fußnote „SDR 11 jointing techniques: butt-fusion or
   electrofusion welding":

     · oben  27 Größen mit SCHWEISSMUFFEN — Spalten D und D1 belegt,
       s und s1 leer,
     · unten 10 Größen mit SPITZENDEN für Heizelementstumpf- oder
       Elektroschweißung — D und D1 leer, dafür die Wandstärken s und s1.

   DIE SPALTEN l UND z BEDEUTEN IN DEN BEIDEN BLÖCKEN VERSCHIEDENES.
   Das steht nirgends geschrieben; es ergibt sich aus den beiden
   Zeichnungen auf S. 89 und ist an den Zahlen nachgerechnet:

     Muffenbauart   l  = Achse → Stirnfläche
                    z  = l − Muffentiefe (Einbaulänge)
                    l1 = Achse → Stirnfläche Abzweig
                    z1 = l1 − Muffentiefe Abzweig

     Spitzendbauart z  = Achse → Stirnfläche
                    l  = Länge des dünnwandigen Spitzendes
                    z1 = Achse → Stirnfläche Abzweig
                    l1 = Länge des Abzweig-Spitzendes

   NACHGERECHNET, nicht angenommen. Bei der Muffenbauart ergibt l − z
   genau die Muffentiefe:

       d25  32−16 = 16,0   Norm 16,0      d63  62−35 = 27,0   Norm 27,5
       d32  38−20 = 18,0   Norm 18,0      d75  71−41 = 30,0   Norm 31,0
       d40  44−24 = 20,0   Norm 20,5      d90  83−50 = 33,0   Norm 35,0
       d50  52−28 = 24,0   Norm 23,5      d110 99−62 = 37,0   Norm 41,0

   Bis d63 auf einen halben Millimeter, darüber wächst die Abweichung.
   Denselben Drift zeigt der Kugelhahn (S. 107, Spalte C) mit 35,5 gegen
   35,0 bei d90. Der Katalog rechnet oberhalb d75 mit etwas kürzeren
   Muffen als DVS 2207-11. Gebaut wird nach der TABELLE.

   Bei der Spitzendbauart wäre dieselbe Deutung unmöglich: z = 206 bei
   l = 104 (AQ13016090) — eine Einbaulänge, die die Baulänge übersteigt,
   gibt es nicht. Umgekehrt geht es auf: z = 206 als halbe Baulänge, l =
   104 als Länge des Spitzendes davor.

   d2 IST IMMER GLEICH d. Über alle 36 Zeilen. Der Katalog führt die
   Spalte für ein allgemeines Reduzier-T; reduziert wird hier aber nur
   der ABZWEIG, nie der Durchgang. Die Spalte ist mitgeführt und wird
   geprüft, aber nicht modelliert.

   VIER AUFFÄLLIGKEITEN, dokumentiert statt aufgelöst:

   1. AQ1307520 (d75 × 20) führt D = 85. Alle anderen d75-Zeilen führen
      D = 100, und das gleichschenklige T-Stück d75 (AQ13075) ebenfalls.
      D ist der Muffenaußendurchmesser des DURCHGANGS und kann nicht vom
      Abzweig abhängen. Wahrscheinlich ein Satzfehler. NICHT geändert —
      das Modell baut 85 und weicht damit sichtbar von seinen
      Nachbarzeilen ab.

   2. AQ1305032 (d50 × 32) führt l1 = 62, die Nachbarzeilen d50 × 20 und
      d50 × 25 führen l1 = 46. Ein Sprung von 16 mm für eine um eine
      Nennweite größere Abzweigung, während d50 × 40 ebenfalls 62 führt.
      Möglich, aber auffällig. NICHT geändert.

   3. z HÄNGT IN ZWEI ZEILEN VOM ABZWEIG AB, was es nicht dürfte: z ist
      die Einbaulänge des DURCHGANGS, also l minus dessen Muffentiefe —
      und die kann von der Abzweiggröße nicht abhängen. AQ1305040
      (d50 × 40) und AQ1306340 (d63 × 40) führen je z = 39, alle anderen
      Zeilen derselben Durchgangsgröße 28 bzw. 35. Beide Ausreißer sind
      genau die Zeilen mit dem größten Abzweig ihrer Gruppe und führen
      zugleich als einzige ein D1 in Höhe des Durchgangs-D.
      Möglicherweise eine eigene Bauform. NICHT geändert; das Modell
      nimmt l, nicht z.

   4. AQ1307563 (d75 × 63) führt D1 = 101 bei D = 100 — die
      Abzweigmuffe wäre einen Millimeter DICKER als die Durchgangsmuffe.
      Bei den übrigen 26 Muffenzeilen ist D1 ≤ D. Ein Millimeter ist zu
      wenig, um daraus einen Satzfehler zu machen, und zu viel, um ihn
      zu übersehen. NICHT geändert; der Wächter im Modell lässt bis
      D + 1,5 mm zu und meldet darüber. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 37;

/* Muffenbauart — Spalten: d · d1 · d2 · D · l · z · l1 · D1 · z1 */
const MUFFE = [
  { code: 'AQ1302520',  d: 25,  d1: 20,  d2: 25,  D: 44,  l: 32,  z: 16, l1: 32,  D1: 29,  z1: 17, kg: 0.04, pack: 150 },
  { code: 'AQ1303220',  d: 32,  d1: 20,  d2: 32,  D: 43,  l: 38,  z: 20, l1: 36,  D1: 34,  z1: 21, kg: 0.06, pack: 80 },
  { code: 'AQ1303225',  d: 32,  d1: 25,  d2: 32,  D: 43,  l: 38,  z: 20, l1: 36,  D1: 34,  z1: 20, kg: 0.06, pack: 80 },
  { code: 'AQ1304020',  d: 40,  d1: 20,  d2: 40,  D: 52,  l: 44,  z: 24, l1: 39,  D1: 43,  z1: 24, kg: 0.08, pack: 48 },
  { code: 'AQ1304025',  d: 40,  d1: 25,  d2: 40,  D: 52,  l: 44,  z: 23, l1: 40,  D1: 43,  z1: 24, kg: 0.09, pack: 48 },
  { code: 'AQ1304032',  d: 40,  d1: 32,  d2: 40,  D: 52,  l: 44,  z: 23, l1: 40,  D1: 43,  z1: 22, kg: 0.09, pack: 48 },
  { code: 'AQ1305020',  d: 50,  d1: 20,  d2: 50,  D: 65,  l: 52,  z: 28, l1: 46,  D1: 43,  z1: 31, kg: 0.16, pack: 36 },
  { code: 'AQ1305025',  d: 50,  d1: 25,  d2: 50,  D: 65,  l: 52,  z: 28, l1: 46,  D1: 43,  z1: 30, kg: 0.16, pack: 30 },
  { code: 'AQ1305032',  d: 50,  d1: 32,  d2: 50,  D: 65,  l: 52,  z: 28, l1: 62,  D1: 43,  z1: 28, kg: 0.16, pack: 30 },
  { code: 'AQ1305040',  d: 50,  d1: 40,  d2: 50,  D: 65,  l: 62,  z: 39, l1: 62,  D1: 65,  z1: 35, kg: 0.16, pack: 30 },
  { code: 'AQ1306320',  d: 63,  d1: 20,  d2: 63,  D: 85,  l: 62,  z: 35, l1: 62,  D1: 43,  z1: 48, kg: 0.31, pack: 16 },
  { code: 'AQ1306325',  d: 63,  d1: 25,  d2: 63,  D: 85,  l: 62,  z: 35, l1: 62,  D1: 43,  z1: 46, kg: 0.31, pack: 18 },
  { code: 'AQ1306332',  d: 63,  d1: 32,  d2: 63,  D: 85,  l: 62,  z: 35, l1: 62,  D1: 43,  z1: 44, kg: 0.31, pack: 18 },
  { code: 'AQ1306340',  d: 63,  d1: 40,  d2: 63,  D: 85,  l: 62,  z: 39, l1: 62,  D1: 85,  z1: 42, kg: 0.37, pack: 18 },
  { code: 'AQ1306350',  d: 63,  d1: 50,  d2: 63,  D: 85,  l: 62,  z: 35, l1: 62,  D1: 85,  z1: 39, kg: 0.32, pack: 16 },
  { code: 'AQ1307520',  d: 75,  d1: 20,  d2: 75,  D: 85,  l: 71,  z: 41, l1: 71,  D1: 43,  z1: 57, kg: 0.51, pack: 12,
    anmerkung: 'D = 85 statt 100 — siehe WIDERSPRUCH 1 im Kopf' },
  { code: 'AQ1307525',  d: 75,  d1: 25,  d2: 75,  D: 100, l: 71,  z: 41, l1: 71,  D1: 43,  z1: 55, kg: 0.51, pack: 12 },
  { code: 'AQ1307532',  d: 75,  d1: 32,  d2: 75,  D: 100, l: 71,  z: 41, l1: 71,  D1: 43,  z1: 53, kg: 0.51, pack: 12 },
  { code: 'AQ1307540',  d: 75,  d1: 40,  d2: 75,  D: 100, l: 71,  z: 41, l1: 71,  D1: 65,  z1: 51, kg: 0.51, pack: 12 },
  { code: 'AQ1307550',  d: 75,  d1: 50,  d2: 75,  D: 100, l: 71,  z: 41, l1: 71,  D1: 65,  z1: 48, kg: 0.51, pack: 12 },
  { code: 'AQ1307563',  d: 75,  d1: 63,  d2: 75,  D: 100, l: 71,  z: 41, l1: 71,  D1: 101, z1: 44, kg: 0.52, pack: 12 },
  { code: 'AQ1309063',  d: 90,  d1: 63,  d2: 90,  D: 120, l: 83,  z: 50, l1: 83,  D1: 120, z1: 55, kg: 0.91, pack: 5 },
  { code: 'AQ1309075',  d: 90,  d1: 75,  d2: 90,  D: 120, l: 83,  z: 50, l1: 83,  D1: 120, z1: 53, kg: 0.91, pack: 5 },
  { code: 'AQ13011063', d: 110, d1: 63,  d2: 110, D: 148, l: 99,  z: 62, l1: 99,  D1: 85,  z1: 71, kg: 1.53, pack: 4 },
  { code: 'AQ13011075', d: 110, d1: 75,  d2: 110, D: 148, l: 99,  z: 62, l1: 99,  D1: 100, z1: 69, kg: 1.54, pack: 4 },
  { code: 'AQ13011090', d: 110, d1: 90,  d2: 110, D: 148, l: 99,  z: 62, l1: 99,  D1: 120, z1: 66, kg: 1.57, pack: 4 },
  { code: 'AQ130125110', d: 125, d1: 110, d2: 125, D: 165, l: 124, z: 84, l1: 110, D1: 148, z1: 87, kg: 2.60, pack: 1 },
];

/* Spitzendbauart, SDR 11 — Spalten: d · d1 · d2 · l · z · l1 · z1 · s · s1
   Fußnote: „SDR 11 jointing techniques: butt-fusion or electrofusion welding" */
const SPITZENDE = [
  { code: 'AQ13016090',  d: 160, d1: 90,  d2: 160, l: 104, z: 206, l1: 83,  z1: 190, s: 14.6, s1: 8.2,  kg: 3.6,  pack: 1 },
  { code: 'AQ130160110', d: 160, d1: 110, d2: 160, l: 104, z: 207, l1: 89,  z1: 200, s: 14.6, s1: 10,   kg: 3.8,  pack: 1 },
  { code: 'AQ13020090',  d: 200, d1: 90,  d2: 200, l: 124, z: 250, l1: 82,  z1: 216, s: 18.2, s1: 8.2,  kg: 6.9,  pack: 1 },
  { code: 'AQ130200110', d: 200, d1: 110, d2: 200, l: 124, z: 250, l1: 86,  z1: 219, s: 18.2, s1: 10,   kg: 7.1,  pack: 1 },
  { code: 'AQ130200160', d: 200, d1: 160, d2: 200, l: 120, z: 250, l1: 101, z1: 253, s: 18.2, s1: 14.6, kg: 7.6,  pack: 1 },
  { code: 'AQ130250110', d: 250, d1: 110, d2: 250, l: 133, z: 288, l1: 85,  z1: 248, s: 22.7, s1: 10,   kg: 11.9, pack: 1 },
  { code: 'AQ130250160', d: 250, d1: 160, d2: 250, l: 134, z: 292, l1: 102, z1: 266, s: 22.7, s1: 14.6, kg: 12.4, pack: 1 },
  { code: 'AQ130315110', d: 315, d1: 110, d2: 315, l: 155, z: 346, l1: 85,  z1: 282, s: 28.6, s1: 10,   kg: 22.1, pack: 1 },
  { code: 'AQ130315160', d: 315, d1: 160, d2: 315, l: 155, z: 352, l1: 101, z1: 301, s: 28.6, s1: 14.6, kg: 22.8, pack: 1 },
  { code: 'AQ130315250', d: 315, d1: 250, d2: 315, l: 154, z: 346, l1: 135, z1: 331, s: 28.6, s1: 22.7, kg: 24.4, pack: 1 },
];

export const ARTICLES = [
  ...MUFFE.map((a) => ({ ...a, bauart: 'muffe', key: a.d + 'x' + a.d1 })),
  ...SPITZENDE.map((a) => ({ ...a, bauart: 'spitzende', key: a.d + 'x' + a.d1 })),
];

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Nennmaß Durchgang',
  d1: 'Nennmaß Abzweig',
  d2: 'Nennmaß Durchgang, zweites Ende',
  D: 'Außendurchmesser Durchgangsmuffe',
  D1: 'Außendurchmesser Abzweigmuffe',
  l: 'Achse → Stirnfläche (Muffe) bzw. Spitzendlänge',
  z: 'Einbaulänge (Muffe) bzw. Achse → Stirnfläche (Spitzende)',
  l1: 'Achse → Stirnfläche Abzweig (Muffe) bzw. Spitzendlänge Abzweig',
  z1: 'Einbaulänge Abzweig (Muffe) bzw. Achse → Stirnfläche (Spitzende)',
  s: 'Wandstärke Durchgang',
  s1: 'Wandstärke Abzweig',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}


/* == reducing-tee/params.js ============================================ */
/* K-Aqua Reduzier-T-Stück — Parametrik.

   Zwei Bauarten, ein Produkt. Welche gilt, steht in der Zeile selbst
   (`bauart`) und nicht in einer Variantenauswahl — nur so misst der
   Selbsttest beide Hälften.

   MUFFENBAUART: die Familie rechnet. `teeParams` fällt ohne L auf
   2·l zurück und übernimmt d1/D1 als Abzweigmaße; ohne diese Felder
   ändert sich für das gleichschenklige T-Stück nichts.

   SPITZENDBAUART: eigene Rechnung, weil es keine Muffen gibt. Aus der
   Tabelle kommen z (Achse → Stirnfläche), l (Länge des Spitzendes) und
   die Wandstärken s und s1. */


export function params(key) {
  const a = article(key);
  if (a.bauart === 'muffe') return muffenParams(a);
  return spitzendParams(a);
}

function muffenParams(a) {
  const P = teeParams(a, { sdr: 6 });
  P.bauart = 'muffe';
  P.key = a.key;

  /* Die Tabelle nennt die Muffentiefe indirekt: l − z. Sie wird NICHT
     zum Bauen benutzt (dafür steht die Normreihe im Core), aber als
     Gegenprobe mitgeführt — bis d63 stimmen beide auf einen halben
     Millimeter, darüber rechnet der Katalog kürzer. */
  P.socketFromTable = a.l - a.z;
  P.socketFromTableB = a.l1 - a.z1;
  P.depthDeltaToNorm = Math.round((P.socketFromTable - (fusionDepth(a.d) ?? 0)) * 10) / 10;

  if (P.socketB >= P.branch) {
    throw new Error('K-Aqua Reduzier-T ' + a.key + ': Abzweigmuffe ' +
      P.socketB + ' mm passt nicht in die Abzweiglänge ' + P.branch + ' mm');
  }
  /* D1 ≤ D gilt in 26 von 27 Zeilen. AQ1307563 führt 101 gegen 100 —
     ein Millimeter, dokumentiert in data.js §4. Die Schranke lässt das
     zu und meldet alles darüber. */
  if (P.rOutB > P.rOut + 0.75) {
    throw new Error('K-Aqua Reduzier-T ' + a.key + ': Abzweigmuffe D1 = ' +
      P.ODB + ' ist deutlich dicker als der Durchgang D = ' + P.OD);
  }
  return P;
}

function spitzendParams(a) {
  const P = Object.assign({}, a);
  P.bauart = 'spitzende';

  P.half = a.z;                 // Achse → Stirnfläche Durchgang
  P.run = 2 * a.z;
  P.branch = a.z1;              // Achse → Stirnfläche Abzweig
  P.spigot = a.l;               // Länge des dünnwandigen Spitzendes
  P.spigotB = a.l1;

  P.OD = a.d;                   // Spitzende: außen Rohrmaß, keine Muffe
  P.rOut = a.d / 2;
  P.ODB = a.d1;
  P.rOutB = a.d1 / 2;

  P.wallPipe = a.s;             // TABELLIERT, nicht aus SDR gerechnet
  P.wallPipeB = a.s1;
  P.bore = a.d - 2 * a.s;
  P.boreR = P.bore / 2;
  P.boreB = a.d1 - 2 * a.s1;
  P.boreRB = P.boreB / 2;

  /* GEGENPROBE der Wandstärken gegen SDR 11: die Fußnote nennt SDR 11,
     also s = d/11. Bei d160 wären das 14,5 gegen tabellierte 14,6, bei
     d315 28,6 gegen 28,6. Die Tabelle folgt der Norm — das bestätigt
     zugleich, dass s wirklich die Wandstärke ist und nicht etwa ein
     Abstand. */
  P.wallFromSdr = Math.round((a.d / 11) * 10) / 10;
  P.wallDeltaToSdr = Math.round((a.s - P.wallFromSdr) * 10) / 10;

  /* ASSUMPTION Körperwand. Der Katalog bemaßt nur die Wand der
     SPITZENDEN. Die Zeichnung zeigt, dass der Körper dahinter dicker
     ist — sonst hätte die Spalte l (Länge des Spitzendes) keinen Sinn,
     denn es gäbe nichts, wovon sie sich abgrenzt. Angesetzt: 1,55·s,
     mit einem 45°-Übergang. Der Wert ist so gewählt, dass die
     Körperbohrung bei ALLEN zehn Zeilen noch über der Abzweigbohrung
     bleibt — das ist die Bedingung, die ihn nach oben begrenzt. */
  P.wallBody = 1.55 * a.s;
  P.boreBodyR = P.rOut - P.wallBody;
  P.xStep = a.z - a.l;          // Ende des Spitzendes
  P.uebergang = Math.min(P.wallBody - P.wallPipe, 0.5 * P.xStep);

  P.wallBodyB = 1.55 * a.s1;
  P.boreBodyRB = P.rOutB - P.wallBodyB;
  P.yStep = a.z1 - a.l1;

  P.sockTaper = 0;
  P.lead = 0;
  P.filletR = Math.max(3, 0.10 * a.d);
  P.emR = Math.min(2.0, 0.05 * a.d);
  P.wallFitting = P.wallBody;
  P.restwand = P.wallBody;
  P.reduziert = true;

  /* Die Bedingung lautet: die Abzweig-BOHRUNG muss in die Körperbohrung
     münden. Der erste Anlauf verglich mit dem AUSSENdurchmesser des
     Abzweigs und schlug bei 200×160 und 315×250 an — zu Unrecht. Der
     Abzweig sitzt AUF dem Durchgang; sein Mantel muss nicht
     hineinpassen, nur sein Durchfluss. */
  if (P.boreBodyR <= P.boreRB) {
    throw new Error('K-Aqua Reduzier-T ' + a.key + ': Körperbohrung r' +
      P.boreBodyR.toFixed(1) + ' mündet nicht in die Abzweigbohrung r' +
      P.boreRB.toFixed(1));
  }
  if (P.xStep <= 5) {
    throw new Error('K-Aqua Reduzier-T ' + a.key +
      ': zwischen Spitzende und Achse bleibt kein Körper');
  }
  if (P.yStep <= 2) {
    throw new Error('K-Aqua Reduzier-T ' + a.key +
      ': Abzweig-Spitzende reicht bis an die Achse');
  }
  return P;
}


/* == reducing-tee/parts.js ============================================= */
/* K-Aqua Reduzier-T-Stück — Kontur.

   Die Muffenbauart kommt vollständig aus der Familie: buildTee baut seit
   dem 24.08.2026 auch ungleiche Abzweige, weil die Abzweigfelder ohne
   d1 auf die Werte des Durchgangs zurückfallen. Für das
   gleichschenklige T-Stück und die beiden Gewinde-T-Stücke hat sich
   dadurch keine einzige Zahl geändert (Prüfbericht §2).

   Die Spitzendbauart steht hier, weil sie sonst niemand hat: kein
   anderes Produkt im Katalog wird stumpf geschweißt. Kommt ein zweites
   dazu — das gleichschenklige T-Stück führt dieselben vier SDR-11-
   Größen und hat sie noch nicht —, zieht sie in die Familie um. */



/* Stumpfschweiß-T-Stück: außen durchgehend Rohrmaß, innen zwei Stufen.
   Das dünnwandige Spitzende trägt die Länge l und die tabellierte
   Wandstärke s; dahinter verdickt sich die Wand zum Körper. Genau diese
   Stufe gibt der Spalte l ihren Sinn — ohne sie gäbe es nichts, wovon
   sie sich abgrenzt. */
export function buildSpigotTee(P) {
  const h = P.half;
  const xSp = h - P.spigot;                 // Ende des Spitzendes
  const xBody = xSp - P.uebergang;          // Beginn der vollen Körperwand

  /* Der Mantel ist außen durchgehend zylindrisch. Die vier
     Zwischenpunkte bei ±xSp und ±xBody ändern daran nichts — sie setzen
     nur Netzpunkte dort, wo die Wand innen springt. Ohne sie hat das
     Netz zwischen den Stirnflächen ÜBERHAUPT KEINE Punkte, weil
     buildProfile gerade Strecken nicht unterteilt, und jede Messung im
     Körperbereich fände ein leeres Fenster vor. */
  const outer = [
    { a: -h, r: P.rOut, chamfer: Math.min(1.5, P.wallPipe * 0.25) },
    { a: -xSp, r: P.rOut, fillet: 0 },
    { a: -xBody, r: P.rOut, fillet: 0 },
    { a: xBody, r: P.rOut, fillet: 0 },
    { a: xSp, r: P.rOut, fillet: 0 },
    { a: h, r: P.rOut, chamfer: Math.min(1.5, P.wallPipe * 0.25) },
  ];
  const inner = [
    { a: h, r: P.boreR, chamfer: Math.min(1.2, P.wallPipe * 0.2) },
    { a: xSp, r: P.boreR, fillet: 0.8 },
    { a: xBody, r: P.boreBodyR, fillet: 1.2 },
    { a: -xBody, r: P.boreBodyR, fillet: 1.2 },
    { a: -xSp, r: P.boreR, fillet: 0.8 },
    { a: -h, r: P.boreR, chamfer: Math.min(1.2, P.wallPipe * 0.2) },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  const kehle = branchJoin({
    mainR: P.rOut, branchR: P.rOutB, filletR: P.filletR,
    angle: 90, segments: SEG_VIS, uSegs: 6,
  });
  geos.push(kehle.geo);

  const yStart = -kehle.insertDepth;
  const yEnd = P.branch;
  const ySp = yEnd - P.spigotB;
  const uebB = Math.min(P.wallBodyB - P.wallPipeB, 0.5 * (ySp - yStart));
  const yBody = ySp - uebB;

  /* Zwischenpunkte wie beim Durchgang: sie ändern die zylindrische
     Mantelfläche nicht, setzen aber Netzpunkte am Wandsprung. */
  const bOuter = [
    { a: yStart, r: P.rOutB, fillet: 0 },
    { a: yBody, r: P.rOutB, fillet: 0 },
    { a: ySp, r: P.rOutB, fillet: 0 },
    { a: yEnd, r: P.rOutB, chamfer: Math.min(1.5, P.wallPipeB * 0.25) },
  ];
  const bInner = [
    { a: yEnd, r: P.boreRB, chamfer: Math.min(1.2, P.wallPipeB * 0.2) },
    { a: ySp, r: P.boreRB, fillet: 0.8 },
    { a: yBody, r: P.boreBodyRB, fillet: 1.2 },
    { a: yStart, r: P.boreBodyRB, fillet: 0 },
  ];
  const bProfile = buildProfile([...bOuter, ...bInner], { segs: 4 });
  geos.push(revolve(bProfile, { axis: 'y', segments: SEG_VIS }));

  /* Auswerfermarken wie beim Muffen-T — dasselbe Werkzeugprinzip. */
  for (const x of [-h * 0.6, h * 0.6]) {
    const disc = revolve(buildProfile([
      { a: 0, r: 0, fillet: 0 },
      { a: 0, r: P.emR, chamfer: 0.25 },
      { a: 0.1, r: P.emR, fillet: 0.1 },
      { a: 0.1, r: 0, fillet: 0 },
    ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
    disc.rotateX(Math.PI);
    disc.translate(x, -(P.rOut - 0.05), 0);
    geos.push(disc);
  }

  return {
    geo: mergeGeometries(geos),
    cap: mergeGeometries([capFromProfile(profile, 'x')].concat(kehle.cap ? [kehle.cap] : [])),
    insertDepth: kehle.insertDepth,
  };
}


/* == reducing-tee/index.js ============================================= */
/* K-Aqua Reduzier-T-Stück — Produktpaket.

   Ein Produkt, zwei Bauarten, 37 Größen. Welche Bauart gilt, entscheidet
   die Zeile selbst — nicht eine Variantenauswahl. Der Grund ist der
   Selbsttest: er läuft über `sizes`, nicht über `variants`, und würde
   bei einer Variantenauswahl nur die halbe Tabelle messen.

   Deshalb hat auch jede Bauart ihren EIGENEN Messsatz. Die Spalten l und
   z bedeuten in den beiden Blöcken Verschiedenes (Begründung in
   data.js), und ein gemeinsamer Messsatz müsste sie gleich behandeln —
   also falsch. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'fittings/reducing-tee',
  module: 'kaqua-reducing-tee',
  titleDe: 'Reduzier-T-Stück',
  titleEn: 'Reducing tee',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel: (k) => {
    const [d, d1] = String(k).split('x');
    return 'd' + d + ' × d' + d1;
  },
  sizeTitle: 'Durchgang × Abzweig',
  defaultSize: '63x32',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'd1', 'l', 'l1', 'kg'],
  dimensions: ['l', 'l1'],
  ariaFields: ['d', 'd1', 'D', 'D1', 'l', 'l1'],

  variants: [],
  states: null,

  tile: 'Abzweig auf kleinere Nennweite — 27 Größen mit Schweißmuffe, ' +
        'zehn mit Spitzende für die Stumpfschweißung.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const spitz = P.bauart === 'spitzende';
    const A = createAssembly({
      name: 'K-Aqua_Reduzier_T_' + P.key.replace('x', '_'),
      materials: ['pprGreen'],
      seed: 139,
      clipPlane,
    });

    const body = spitz ? buildSpigotTee(P) : buildTee(P);

    A.part('koerper', {
      name: 'Reduzier_T', label: 'Reduzier-T-Stück (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(-P.half * 0.6, P.rOut + 0.16 * P.half, 0),
    });

    A.light(V3(-P.half * 0.7, 0, 0));
    A.light(V3(P.half * 0.7, 0, 0));

    if (spitz) {
      A.hotspot({
        v: V3(P.half - P.spigot * 0.5, P.rOut * 0.42, P.rOut * 0.86),
        n: V3(0, 0.45, 0.89),
        text: 'Spitzende für Heizelementstumpf- oder Elektroschweißung, ' +
          'Wandstärke ' + String(P.s).replace('.', ',') + ' mm (SDR 11)',
      });
      A.hotspot({
        v: V3(0, P.branch - P.spigotB * 0.5, P.rOutB * 0.8),
        n: V3(0, 0.3, 0.95),
        text: 'Abzweig d' + P.d1 + ', Wandstärke ' +
          String(P.s1).replace('.', ',') + ' mm',
      });
    } else {
      A.hotspot({
        v: V3(P.half - Math.max(3, 0.10 * P.socket), P.rOut * 0.42, P.rOut * 0.86),
        n: V3(0, 0.45, 0.89),
        text: 'Schweißmuffe d' + P.d + ' für Polyfusion, Muffentiefe ' +
          P.socket.toFixed(1).replace('.', ',') + ' mm',
      });
      A.hotspot({
        v: V3(0, P.branch - Math.max(3, 0.10 * P.socketB), P.rOutB * 0.82),
        n: V3(0, 0.3, 0.95),
        text: 'Abzweigmuffe d' + P.d1 + ' — reduziert um ' +
          (P.d - P.d1) + ' mm gegenüber dem Durchgang',
      });
    }

    const zf = P.rOut + 0.14 * P.half;
    const yL = -(P.rOut + 0.34 * P.half);
    A.dim({ label: spitz ? '2·z' : 'L', value: 2 * P.half,
      a: V3(-P.half, yL, zf), b: V3(P.half, yL, zf), off: V3(0, 0.12 * P.half, 0) });
    const xB = P.half + 0.24 * P.half;
    A.dim({ label: spitz ? 'z₁' : 'l₁', value: P.branch,
      a: V3(xB, 0, zf), b: V3(xB, P.branch, zf), off: V3(0.10 * P.half, 0, 0) });

    /* GEMESSEN WIRD AM GEBAUTEN NETZ, nicht mit Strahlen.

       Der erste Messsatz tastete axial an und las bei acht von 37
       Größen die falsche Fläche — bis zu 11,3 mm daneben, systematisch
       bei den GROSSEN Abzweigen. Der Grund ist der Bauweise geschuldet:
       es gibt kein CSG. Die Mantelfläche des Durchgangs existiert auch
       UNTER dem Abzweig und die des Abzweigs auch INNERHALB des
       Durchgangs; ein Strahl trifft die erste Fläche, nicht die
       gesuchte. Ein Strahlenfächer half nur teilweise und kostete bei
       37 Größen zu viel Zeit.

       Die Punkte des Netzes stehen dagegen unmittelbar zur Verfügung.
       Über ein Fenster in der jeweiligen Achsrichtung liefert das
       größte und das kleinste Radienmaß genau das gesuchte Maß —
       exakt, ohne Facettenfehler und ohne Fremdflächen, solange das
       Fenster nur eine der beiden Achsen trifft. Genau das prüfen die
       Wächter in params.js.

       Das ist keine Rückgabe einer Annahme (Fall 12): gemessen werden
       die Koordinaten, die revolve tatsächlich geschrieben hat. */
    const pos = body.geo.attributes.position.array;
    const radien = (achse, von, bis) => {
      let max = 0, min = Infinity;
      for (let i = 0; i < pos.length; i += 3) {
        const a = achse === 'x' ? pos[i] : pos[i + 1];
        if (a < von || a > bis) continue;
        const r = achse === 'x'
          ? Math.hypot(pos[i + 1], pos[i + 2])
          : Math.hypot(pos[i], pos[i + 2]);
        if (r > max) max = r;
        if (r < min) min = r;
      }
      return { max, min };
    };

    /* HALBRÄUME, aber die richtigen.

       Ein schmales Fenster kann leer sein — buildProfile unterteilt
       gerade Strecken nicht, und wo kein Profilpunkt liegt, liegt auch
       kein Netzpunkt. Ein zu weiter Halbraum fängt dagegen die Punkte
       der ANDEREN Achse mit ein: die Mantelfläche des Durchgangs liegt
       auch unter dem Abzweig und umgekehrt, denn der Bau kennt kein
       CSG. Beide Fehler sind mir hier unterlaufen, und beide sahen
       völlig verschieden aus — der eine meldete Unendlich, der andere
       Abweichungen von 113 mm.

       Richtig ist der Halbraum, der HINTER der Kreuzung beginnt:
       jenseits von Außenradius plus Kehlenradius der anderen Achse
       kann nur noch eine Fläche liegen. Dass er nicht leer ist,
       sichert der Mundlochbund, der immer darin liegt.

       Die 2 mm Zugabe sind kein Sicherheitsabstand, sondern zweimal
       nachgemessen: ohne sie begann der Halbraum EXAKT auf dem
       Muffengrund und nahm den Punkt der Durchflussbohrung mit — bei
       sechs Größen 22,6 mm daneben. Mit nur 0,5 mm reichte noch der
       Verrundungsradius von 1,2 mm am Muffengrund hinein und zog die
       Messung um 0,7 mm nach innen. Erst jenseits dieses Radius liegt
       die reine Muffenwand. */
    const grenzeX = Math.max(P.half - (spitz ? P.spigot : P.socket) + 2.0,
      P.rOutB + P.filletR + 0.5);
    const grenzeY = Math.max(P.branch - (spitz ? P.spigotB : P.socketB) + 2.0,
      P.rOut + P.filletR + 0.5);

    const gemeinsam = [
      { key: 'lauf', label: spitz ? 'Baulänge Durchgang (2·z)' : 'Baulänge Durchgang (2·l)',
        soll: 2 * P.half,
        ist: () => { const b = A.boxOf(['koerper']); return r2(b.max.x - b.min.x); } },
      { key: 'abzweig', label: spitz ? DIMENSION_KEY.z1 : DIMENSION_KEY.l1,
        soll: P.branch,
        ist: () => r2(A.boxOf(['koerper']).max.y) },
    ];

    A.measures = spitz ? [
      ...gemeinsam,
      /* Beim Spitzende IST das Außenmaß das Rohrmaß d — es gibt keine
         Muffe, die dicker wäre. Genau das unterscheidet die Bauart von
         den 27 Muffengrößen. */
      /* Gemessen am Wandsprung selbst: dort tragen Außen- und
         Innenkontur je einen Punkt, und die Mundlochfase des Spitzendes
         bleibt außen vor. Sie hatte im Halbraum 0,15 mm beigesteuert. */
      { key: 'd', label: DIMENSION_KEY.d, soll: P.d,
        ist: () => r2(2 * radien('x', P.xStep - 0.2, P.xStep + 0.2).max) },
      { key: 'd1', label: DIMENSION_KEY.d1, soll: P.d1,
        ist: () => r2(2 * radien('y', P.yStep - 0.2, P.yStep + 0.2).max) },
      { key: 's', label: DIMENSION_KEY.s, soll: P.s,
        ist: () => { const g = radien('x', P.xStep - 0.2, P.xStep + 0.2);
          return r2(g.max - g.min); } },
      { key: 's1', label: DIMENSION_KEY.s1, soll: P.s1,
        ist: () => { const g = radien('y', P.yStep - 0.2, P.yStep + 0.2);
          return r2(g.max - g.min); } },
      /* GEGENPROBE: hinter dem Spitzende ist die Wand DICKER. Gleicher
         Wert hieße, die Stufe fehlt und die Spalte l wäre ohne Sinn.
         Gemessen am Wandsprung selbst, wo Außen- und Innenkontur je
         einen Punkt tragen — die vier Zwischenpunkte im Mantel stehen
         nur deswegen dort. */
      { key: 'wandKoerper', label: 'Wandstärke Körper (Gegenprobe)',
        soll: r2(P.wallBody),
        ist: () => {
          const xB = P.xStep - P.uebergang;
          const g = radien('x', xB - 0.2, xB + 0.2);
          return r2(g.max - g.min);
        } },
    ] : [
      ...gemeinsam,
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => r2(2 * radien('x', grenzeX, P.half).max) },
      /* D1 lässt sich NICHT über eine Box3 messen: bei AQ1307563 ist der
         Abzweigbund einen Millimeter DICKER als der Durchgang
         (data.js §4), und die Box misst dann ihn statt D. */
      { key: 'D1', label: DIMENSION_KEY.D1, soll: P.ODB,
        ist: () => r2(2 * radien('y', grenzeY, P.branch).max) },
      /* Muffenbohrung. Die Muffe ist um 0,6° konisch, damit sich das
         Rohr beim Fügen zentriert; der engste Punkt im Halbraum liegt
         2 mm hinter der Stirnfläche und damit planmäßig unter dem
         Nennmaß. Der erklärte Betrag gehört in den Sollwert (Fall 23),
         nicht in die Abweichung. */
      { key: 'd', label: DIMENSION_KEY.d,
        soll: r2(P.d - 4 * P.sockTaper),
        ist: () => r2(2 * radien('x', grenzeX, P.half).min) },
      /* GEGENPROBE und zugleich der Beleg der REDUKTION: die
         Abzweigbohrung MUSS kleiner sein als die des Durchgangs. */
      { key: 'd1', label: DIMENSION_KEY.d1,
        soll: r2(P.dB - 4 * P.sockTaper),
        ist: () => r2(2 * radien('y', grenzeY, P.branch).min) },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export { product as default };
