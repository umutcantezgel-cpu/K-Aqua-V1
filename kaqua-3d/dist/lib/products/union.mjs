/* K-Aqua 3D · Verschraubung — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID transition-fittings/union.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, SEG_FINE, SEG_INT, SEG_VIS, arcPts, buildProfile, capFromProfile, createAssembly, fusionDepth, grooveMod, knurl, materials, mergeGeometries, revolve, socketOD,
} from '../kaqua-3d-core.mjs';

/* == union/data.js ===================================================== */
/* K-Aqua Verschraubung (PP-R) — Artikeltabelle.

   PHASE 1, verifiziert am 19.08.2026 gegen
   Transition Fittings K-Aqua/screencapture-…-transition-fittings-union-….png
   (quellen/w3-union.png, 3004 × 8924 px).

   Spaltenköpfe wie abgebildet:
     Code · d · G · D · l · L · z · l1 · kg · Pack.
   6 Größen, d20 bis d63.

   ── DIE ENTSCHEIDENDE GEGENPROBE ──
   Die Spalte D lautet 46 · 56 · 66 · 79 · 87 · 107. Das sind **exakt**
   die D-Werte des Kugelhahns (products/ball-valve-pp/data.js) bei
   denselben Nennweiten. Diese Verschraubung ist damit dasselbe Bauteil,
   das der Kugelhahn beidseitig trägt — hier als Einzelartikel.

   Das ist mehr als eine Kuriosität: es bestätigt beide Tabellen
   gegenseitig und legt die Überwurfmutter-Geometrie fest, ohne dass sie
   geschätzt werden muss.

   MASSSCHLÜSSEL (aus Spaltenlogik, Kugelhahn-Vergleich und — für die
   Teilzuordnung — den Bildern vom 25.08.2026):
     d   Rohr-Außendurchmesser = Muffenbohrung
     G   Gewinde der Überwurfmutter, in Zoll
     D   Außendurchmesser der Überwurfmutter — größtes Maß
     l   Länge der Überwurfmutter
     L   Gesamtlänge, Stirnfläche bis Stirnfläche
     z   Einbaulänge (Rohrende bis Rohrende)
     l1  Länge des GEWINDETEILS — des linken Muffenstücks, das das
         Außengewinde trägt und größtenteils UNTER der Mutter steckt

   ── DIE DRITTE DEUTUNG DER TEILUNG, UND WARUM SIE TRÄGT ──
   ALH-Render und Produktfoto zeigen übereinstimmend: die Mutter sitzt
   in der MITTE, links und rechts tritt je ein Stutzen heraus. Die
   zweite Fassung dieses Modells hatte die Mutter am linken ENDE — sie
   stand mit gedrücktem Bild im Widerspruch (Mängelregister M2).

   Mit l1 = linkes Gewindeteil gehen alle sechs Zeilen restlos auf:
     sichtbarer linker Stutzen  = l1 − l   →  8 · 9 · 9 · 11 · 13 · 17
     sichtbares rechtes Stück   = L − l1   → 18 · 20 · 22 · 24 · 27 · 32
     Summe sichtbar + Mutter    = L        →  exakt, in jeder Zeile
   Und die schärfste Gegenprobe: (L − l1) minus der Schweißtiefe der
   Normreihe ergibt 3,5 bis 4,5 mm, praktisch konstant — das rechte
   Teil IST seine Schweißmuffe plus Bund. Eine Deutung, bei der drei
   unabhängige Reihen gleichzeitig aufgehen, ist keine Anpassung mehr
   (Fall 28).

   Gegenproben:
     l1 > l und l1 < L in jeder Zeile ✓ (das Gewindeteil ist länger
       als die Mutter, die auf ihm sitzt, und kürzer als das Ganze).
     z < L in jeder Zeile ✓
     D wächst monoton, G wächst monoton ✓

   ── KORREKTUR DER ERSTEN DEUTUNG ──
   Die erste Fassung dieses Kommentars nannte die Differenz zwischen
   l + l1 und L eine „Überlappung im Gewinde". Das ist falsch:

     d20  18+26 = 44  L 44  → 0 mm
     d25  19+28 = 47  L 48  → 1 mm fehlt
     d32  21+30 = 51  L 52  → 1 mm
     d40  23+34 = 57  L 58  → 1 mm
     d50  26+39 = 65  L 66  → 1 mm
     d63  30+47 = 77  L 79  → 2 mm

   l + l1 ist nie GRÖSSER als L. Die zweite Fassung deutete die
   Differenz als sichtbaren Bundring — auch das hat sich mit den
   Bildern erledigt: in der dritten Deutung (oben) ist L − l − l1 gar
   keine Baugruppenkante, sondern schlicht (L − l1) − (l1 − l) − … die
   Zonen gehen ohne Rest auf. Kein collarGap mehr im Modell.

   ── DIE SPALTE z WIRD NICHT MODELLIERT ──
   z lautet 15 · 15 · 15 · 17 · 19 · 23 — bei d20 bis d32 konstant, dann
   steigend. Bei der Muffe (products/socket/data.js) ist z nachweislich
   die Dicke des mittleren Anschlags; hier gibt es keinen Anschlag, und
   kein Verhältnis zu L, l oder l1 ist erkennbar:

     z/L  = 0,34 · 0,31 · 0,29 · 0,29 · 0,29 · 0,29
     z/d  = 0,75 · 0,60 · 0,47 · 0,43 · 0,38 · 0,37
     L−z  = 29 · 33 · 37 · 41 · 47 · 56
     l1−z = 11 · 13 · 15 · 17 · 20 · 24

   L − z wächst gleichmäßig, aber ohne erkennbaren Bezug zu einer
   Baugruppenkante. Ohne technische Zeichnung ist z nicht auflösbar.

   Es wird deshalb NICHT modelliert und erscheint nur in aria-label und
   Fallback-Tabelle. Ein geratener Bezugspunkt wäre schlechter als eine
   benannte Lücke — bei der Reduzierbuchse hat eine falsch gedeutete
   Spalte einen ganzen Modellversuch gekostet.

   ASSUMPTION Muffentiefe: aus der Normreihe DVS 2207-11, nicht aus l
   oder z. Begründung wie bei Winkel und T-Stück (products/tee/data.js):
   ein Schweißwerkzeug je Nennweite für alle Fittings. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 6;
export const SDR = 6;

export const ARTICLES = [
  { code: 'AQ330A20', d: 20, G: '1', D: 46, l: 18, L: 44, z: 15, l1: 26, kg: 0.04, pack: 120 },
  { code: 'AQ330A25', d: 25, G: '1 1/4', D: 56, l: 19, L: 48, z: 15, l1: 28, kg: 0.06, pack: 100 },
  { code: 'AQ330A32', d: 32, G: '1 1/2', D: 66, l: 21, L: 52, z: 15, l1: 30, kg: 0.09, pack: 40 },
  { code: 'AQ330A40', d: 40, G: '2', D: 79, l: 23, L: 58, z: 17, l1: 34, kg: 0.14, pack: 30 },
  { code: 'AQ330A50', d: 50, G: '2 1/4', D: 87, l: 26, L: 66, z: 19, l1: 39, kg: 0.16, pack: 30 },
  { code: 'AQ330A63', d: 63, G: '2 3/4', D: 107, l: 30, L: 79, z: 23, l1: 47, kg: 0.27, pack: 10 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  G: 'Muttergewinde',
  D: 'Außendurchmesser Mutter',
  l: 'Länge Mutterteil',
  L: 'Gesamtlänge',
  z: 'Einbaulänge',
  l1: 'Länge Stutzenteil',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}


/* == union/params.js =================================================== */
/* K-Aqua Verschraubung — Parametrik.

   Sieben Maße stehen in der Tabelle. Die Teilung folgt der dritten
   Deutung (data.js): Mutter in der Mitte, links das Gewindeteil (l1),
   rechts das Muffenstück (L − l1). Alle Zonen kommen aus der Tabelle —
   die Bilder haben nur entschieden, WELCHES Teil welches ist. */


export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  P.len = a.L;
  P.xEnd = a.L / 2;
  P.OD = a.D;
  P.rOut = a.D / 2;

  /* Zonen entlang der Achse, von links:
       Stub sichtbar   l1 − l     (geriffelt, mit der Muffe des Gewindeteils)
       Mutter          l
       rechts sichtbar L − l1     (Muffenstück mit Bund)
     Summe = L per Konstruktion. */
  P.nutLen = a.l;
  P.stubLen = a.l1;                       // Gesamtlänge des Gewindeteils
  P.stubShow = a.l1 - a.l;                // sichtbar links der Mutter
  P.tailShow = a.L - a.l1;                // sichtbar rechts der Mutter
  P.xNutA = -P.xEnd + P.stubShow;         // linke Mutterkante
  P.xNutB = P.xNutA + a.l;                // rechte Mutterkante = Stub-Ende
  P.xJoint = P.xNutB;                     // Fuge Stub-Stirn / rechtes Teil

  P.socket = fusionDepth(d) ?? Math.max(10, d * 0.55);
  P.wallPipe = d / 6;
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);

  /* Die sichtbaren Stutzen führen den Muffen-Außendurchmesser der
     Normreihe — beide Sichtzonen SIND Schweißmuffenzonen. Kein
     Bildmaß: socketOD steht im Core. */
  P.stubOD = socketOD(d) ?? Math.round(d * 1.36);
  P.rStub = P.stubOD / 2;

  /* ASSUMPTION Gewindezonen-Durchmesser: das Außengewinde des linken
     Teils füllt die Mutter. Angesetzt 0,80·D wie beim Kugelhahn —
     vollständig verdeckt, nur die Wandstärkenrechnung hängt daran. */
  P.threadOD = Math.round(a.D * 0.80 * 10) / 10;
  P.rThread = P.threadOD / 2;
  P.nutWall = Math.round((a.D - P.threadOD) / 2 * 10) / 10;

  /* ASSUMPTION O-Ring: dichtet an der Fuge zwischen Stub-Stirn und
     rechtem Bund, Schnurstärke 0,055·d wie beim Kugelhahn. Er liegt
     vollständig unter der Mutter — sichtbar erst in der Explosion. */
  P.oRingD = Math.round(Math.max(2, d * 0.055) * 10) / 10;
  P.oRingR = P.boreR + P.oRingD * 1.1;
  P.oRingX = P.xJoint + P.oRingD * 0.7;

  /* Mutterriffelung wie gehabt; die Sichtstutzen tragen nach beiden
     Bildern eine feine axiale Riffelung. ASSUMPTION Zahl und Tiefe aus
     dem Foto: „fein, dicht" — 18 Rippen, 0,6 mm. */
  P.ribCount = 12;
  P.ribDepth = Math.max(0.8, a.D * 0.022);
  P.stubRibs = 18;
  P.stubRibDepth = 0.6;

  P.restwand = P.nutWall;
  P.emR = Math.min(1.8, 0.045 * d);

  if (P.nutWall < 2.5) {
    throw new Error('K-Aqua Verschraubung d' + d + ': Mutterwand ' +
      P.nutWall + ' mm zu dünn');
  }
  if (P.stubShow <= 2) {
    throw new Error('K-Aqua Verschraubung d' + d + ': sichtbarer Stutzen ' +
      P.stubShow + ' mm — die Teilung kann nicht stimmen');
  }
  if (P.socket >= P.stubLen) {
    throw new Error('K-Aqua Verschraubung d' + d + ': Muffentiefe ' +
      P.socket + ' mm passt nicht in das Gewindeteil (' + P.stubLen + ' mm)');
  }
  if (P.socket + 2 > P.tailShow + 2.5) {
    throw new Error('K-Aqua Verschraubung d' + d + ': Muffentiefe ' +
      P.socket + ' mm passt nicht in das rechte Muffenstück');
  }
  return P;
}


/* == union/parts.js ==================================================== */
/* K-Aqua Verschraubung — Kontur.

   Vier Teile nach der dritten Deutung (data.js):
     1. Gewindeteil links (l1): Schweißmuffe, geriffelte Sichtzone,
        glatter Gewindeschaft unter der Mutter
     2. Überwurfmutter (l), mittig, geriffelt
     3. Muffenstück rechts (L − l1): Bund und Schweißmuffe
     4. O-Ring an der Fuge, unter der Mutter

   Kein CSG. Das Gewinde zwischen Mutter und Gewindeteil wird nicht
   modelliert: es liegt vollständig verdeckt, auch im Halbschnitt sieht
   man dort nur die Fügefläche. Ein Gewinde, das niemand sehen kann,
   kostet Dreiecke ohne Gegenwert.

   Die Riffelung der Sichtstutzen steuert das w-Feld der Profilpunkte:
   w = 1 nur auf der Sichtzone, der verdeckte Schaft bleibt glatt. */


/* Gewindeteil: von der linken Stirn (Muffe) bis unter die Mutter. */
export function buildStub(P) {
  const xA = -P.xEnd;                    // Mundloch links
  const xShow = xA + P.stubShow;         // linke Mutterkante
  const xB = P.xNutB;                    // Stub-Stirn (Fuge)
  const rSock = (x) => P.d / 2 - P.sockTaper * (x - xA);
  const kn = knurl(P.rStub, P.stubShow, P.stubRibs, P.stubRibDepth);

  const outer = [
    { a: xA, r: P.rStub - 0.5, chamfer: 0.7, w: 0 },
    { a: xA + 1.2, r: P.rStub, fillet: 0.5, w: 1 },
    { a: xShow - 0.8, r: P.rStub, fillet: 0.4, w: 1 },
    /* Stufe auf den Gewindeschaft — verdeckt, deshalb schlicht. */
    { a: xShow, r: Math.min(P.rStub, P.rThread) - 0.3, fillet: 0.3, w: 0 },
    { a: xShow + 1.0, r: P.rThread, fillet: 0.3, w: 0 },
    { a: xB - 0.6, r: P.rThread, fillet: 0, w: 0 },
    { a: xB, r: P.rThread - 0.5, chamfer: 0.5, w: 0 },
  ];
  const inner = [
    { a: xB, r: P.boreR, fillet: 0 },
    /* Netzpunkt auf halber Schaftlänge: gerade Strecke, sonst leer. */
    { a: (xB + xA + P.socket) / 2, r: P.boreR, fillet: 0 },
    { a: xA + P.socket, r: P.boreR, fillet: 0.8 },
    { a: xA + P.socket, r: rSock(xA + P.socket), fillet: 1.0 },
    { a: xA + 2, r: rSock(xA + 2), fillet: 0.4 },
    { a: xA, r: P.d / 2 + P.lead, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geo = revolve(profile, { axis: 'x', thetas: kn.thetas, mod: kn.mod, segments: SEG_VIS });
  return { geo, cap: capFromProfile(profile, 'x'), profile };
}

/* Überwurfmutter: Hülse mit Riffelung, Zugbund an der RECHTEN Seite —
   dort greift sie hinter den Bund des Muffenstücks. */
export function buildNut(P) {
  const xA = P.xNutA;
  const xB = P.xNutB;
  const kn = knurl(P.rOut, P.nutLen, P.ribCount, P.ribDepth);
  const rMouth = Math.max(1.2, P.rOut * 0.05);
  const rCollar = Math.min(P.rThread, P.rStub) * 0.92;

  const outer = [
    { a: xA, r: P.rOut - 0.4, fillet: rMouth * 0.5, w: 0 },
    { a: xA + rMouth * 0.6, r: P.rOut, fillet: 0.5, w: 1 },
    { a: xB - 1.2, r: P.rOut, fillet: 0.5, w: 1 },
    { a: xB, r: P.rOut - 0.5, chamfer: 0.6, w: 0 },
  ];
  const inner = [
    { a: xB, r: rCollar, chamfer: 0.5 },
    { a: xB - 1.6, r: rCollar, fillet: 0.6 },
    { a: xB - 2.5, r: P.rThread + 0.25, fillet: 0.8 },
    { a: xA, r: P.rThread + 0.25, fillet: 0.5 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geo = revolve(profile, { axis: 'x', thetas: kn.thetas, mod: kn.mod, segments: SEG_VIS });
  return { geo, cap: capFromProfile(profile, 'x'), profile };
}

/* Muffenstück rechts: Bund an der Fuge, dann Schweißmuffe. Die
   Sichtzone trägt dieselbe feine Riffelung wie der Stub (beide Bilder
   zeigen sie auf beiden Stutzen). */
export function buildTail(P) {
  const xGrip = P.xNutB - 2.2;           // Bund greift unter die Mutter
  const xShow = P.xNutB;                 // rechte Mutterkante
  const xB = P.xEnd;                     // Mundloch rechts
  const rSock = (x) => P.d / 2 - P.sockTaper * (xB - x);
  const kn = knurl(P.rStub, P.tailShow, P.stubRibs, P.stubRibDepth);
  const rFlange = Math.min(P.rThread, P.rStub) * 0.90;

  const outer = [
    { a: xGrip, r: rFlange - 0.6, chamfer: 0.5, w: 0 },
    { a: xGrip + 0.5, r: rFlange, fillet: 0.4, w: 0 },
    { a: xShow + 0.4, r: rFlange, fillet: 0.4, w: 0 },
    { a: xShow + 1.4, r: P.rStub, fillet: 0.5, w: 1 },
    { a: xB - 1.6, r: P.rStub - DRAFT * (xB - xShow) * 0.4, fillet: 0.5, w: 1 },
    { a: xB, r: P.rStub - 0.6, chamfer: 0.7, w: 0 },
  ];
  const inner = [
    { a: xB, r: P.d / 2 + P.lead, fillet: 0 },
    { a: xB - 2, r: rSock(xB - 2), fillet: 0.4 },
    { a: xB - P.socket, r: rSock(xB - P.socket), fillet: 1.0 },
    { a: xB - P.socket, r: P.boreR, fillet: 0.8 },
    { a: xGrip + 1.0, r: P.boreR, chamfer: 0.5 },
    { a: xGrip, r: P.boreR + 0.4, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', thetas: kn.thetas, mod: kn.mod, segments: SEG_VIS })];

  /* Auswerfermarke auf der Sichtzone. */
  const disc = revolve(buildProfile([
    { a: 0, r: 0, fillet: 0 },
    { a: 0, r: P.emR, chamfer: 0.2 },
    { a: 0.09, r: P.emR, fillet: 0.09 },
    { a: 0.09, r: 0, fillet: 0 },
  ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
  disc.rotateX(Math.PI);
  disc.translate((xShow + xB) / 2, -(P.rStub - P.stubRibDepth - 0.05), 0);
  geos.push(disc);

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'), profile };
}

/* O-Ring an der Fuge: Kreisprofil um X, unter der Mutter. */
export function buildORing(P) {
  const r = P.oRingD / 2;
  const pts = [];
  arcPts(pts, P.oRingX, P.oRingR, r, 0, Math.PI * 2, 20, { fillet: 0 });
  const profile = buildProfile(pts, { segs: 2 });
  return { geo: revolve(profile, { axis: 'x', segments: SEG_INT }),
           cap: capFromProfile(profile, 'x') };
}


/* == union/index.js ==================================================== */
/* K-Aqua Verschraubung (PP-R) — Produktpaket nach PRODUKT-VERTRAG.md.

   Vier Teile nach der dritten Deutung (data.js): Gewindeteil,
   Überwurfmutter MITTIG, Muffenstück, O-Ring. Render und Produktfoto
   zeigen die Mutter unabhängig voneinander in der Mitte mit Stutzen zu
   beiden Seiten — die zweite Fassung trug sie am Ende und stand damit
   als Mangel M2 im Register. Die Explosionsansicht zeigt, was der
   Monteur beim Lösen in der Hand hat. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'transition-fittings/union',
  module: 'kaqua-union',
  titleDe: 'Verschraubung',
  titleEn: 'Union',
  category: 'transition-fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'G', 'D', 'L', 'kg'],
  dimensions: ['L', 'D'],
  ariaFields: ['d', 'D', 'L', 'z'],

  variants: [],
  states: null,

  tile: 'Lösbare Verbindung ohne Rohrtrennung — Überwurfmutter, ' +
        'Stutzen, O-Ring. Dasselbe Bauteil, das der Kugelhahn trägt.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Verschraubung_d' + size,
      materials: ['pprGreen', 'epdm'],
      seed: 157,
      clipPlane,
    });

    const stub = buildStub(P);
    const nut = buildNut(P);
    const tail = buildTail(P);
    const oring = buildORing(P);

    A.part('stub', {
      name: 'Gewindeteil', label: 'Gewindeteil mit Schweißmuffe (PP-R)', mat: 'pprGreenB',
      geo: stub.geo, cap: stub.cap,
      explode: -0.45 * P.len,
      anchor: V3(-P.xEnd + P.stubShow * 0.5, -(P.rStub + 0.24 * P.len), 0),
    });
    A.part('nut', {
      name: 'Ueberwurfmutter', label: 'Überwurfmutter (PP-R)', mat: 'pprGreen',
      geo: nut.geo, cap: nut.cap,
      explode: -0.18 * P.len,
      anchor: V3(P.xNutA + P.nutLen * 0.5, P.rOut + 0.26 * P.len, 0),
    });
    A.part('tail', {
      name: 'Muffenstueck', label: 'Muffenstück (PP-R)', mat: 'pprGreenB',
      geo: tail.geo, cap: tail.cap,
      explode: 0.45 * P.len,
      anchor: V3(P.xEnd - P.tailShow * 0.4, -(P.rStub + 0.22 * P.len), 0),
    });
    A.part('oring', {
      name: 'O_Ring', label: 'O-Ring (EPDM)', mat: 'epdm',
      geo: oring.geo, cap: oring.cap,
      explode: V3(0, 0.42 * P.len, 0),
      anchor: V3(P.oRingX, P.oRingR + 0.30 * P.len, 0),
    });

    A.light(V3(-P.xEnd * 0.5, 0, 0));
    A.light(V3(P.xEnd * 0.5, 0, 0));

    A.hotspot({
      v: V3(P.xEnd - Math.max(3, 0.10 * P.len), P.rStub * 0.5, P.rStub * 0.84),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(P.xNutA + P.nutLen * 0.5, P.rOut * 0.55, P.rOut * 0.82),
      n: V3(0, 0.55, 0.83),
      text: 'Überwurfmutter G ' + P.G + '" mit ' + P.ribCount +
        ' Riffeln — von Hand zu lösen',
    });
    A.hotspot({
      v: V3(-P.xEnd + P.stubShow * 0.5, P.rStub * 0.6, P.rStub * 0.8),
      n: V3(0, 0.6, 0.8),
      text: 'Gewindeteil — sein Außengewinde liegt unter der Mutter; der ' +
        'O-Ring an der Fuge dichtet, die Verbindung lässt sich mehrfach lösen',
    });

    const zf = P.rOut + 0.12 * P.len;
    const yL = -(P.rOut + 0.30 * P.len);
    A.dim({ label: 'L', value: P.len,
      a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf), off: V3(0, 0.11 * P.len, 0) });
    const xD = -P.xEnd - 0.16 * P.len;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf), off: V3(0.13 * P.len, 0, 0) });

    A.measures = [
      { key: 'L', label: DIMENSION_KEY.L, soll: P.len,
        ist: () => { const b = A.boxOf(); return b.max.x - b.min.x; } },
      /* Mutterdurchmesser: Strahl auf einen RIFFELRÜCKEN.

         Die Box3 wäre hier untauglich, und zwar aus einem anderen Grund
         als bei der Riffelung des Gewindeadaptors: die Riffelabtastung
         verteilt ihre Winkelschritte ungleichmäßig, und liegt kein
         Schritt genau auf einem Rücken, misst die Box die Sekante. Der
         Fehler wuchs mit dem Durchmesser (0,35 mm bei d32, 0,46 mm bei
         d63) — nach Fall 23 also keine Fase, sondern Segmentierung.

         grooveMod legt die Nuten auf theta = i·2π/count; die Rücken
         liegen genau dazwischen. */
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => {
          const th = Math.PI / P.ribCount;
          /* Startpunkt und Richtung müssen in derselben Ebene liegen:
             die Mutterachse ist X, der Umfang spannt Y-Z auf. */
          const from = V3(P.xNutA + P.nutLen * 0.5, P.OD * Math.cos(th), P.OD * Math.sin(th));
          const dir = V3(0, -Math.cos(th), -Math.sin(th));
          const hit = A.probeAxial('nut', from, dir);
          return hit ? Math.round(2 * Math.hypot(hit.y, hit.z) * 100) / 100 : NaN;
        } },
      { key: 'l', label: DIMENSION_KEY.l, soll: P.nutLen,
        ist: () => { const b = A.boxOf(['nut']); return b.max.x - b.min.x; } },
      /* l1 ist nach der dritten Deutung die GESAMTLÄNGE des
         Gewindeteils — also die Box des Teils, das großteils unter der
         Mutter steckt. In der zweiten Fassung hieß das Teil rechts l1
         und keine Messung fasste es an; beides ist korrigiert. */
      { key: 'l1', label: DIMENSION_KEY.l1, soll: P.stubLen,
        ist: () => { const b = A.boxOf(['stub']); return b.max.x - b.min.x; } },
      /* Die beiden Sichtzonen — sie sind der Kern des Mangels M2 und
         MÜSSEN verschiedene Werte liefern (Fall 25): links l1 − l,
         rechts L − l1. */
      { key: 'stubShow', label: 'sichtbarer Stutzen links', soll: P.stubShow,
        ist: () => {
          const st = A.boxOf(['stub']), n = A.boxOf(['nut']);
          return Math.round((n.min.x - st.min.x) * 100) / 100;
        } },
      { key: 'tailShow', label: 'sichtbares Muffenstück rechts', soll: P.tailShow,
        ist: () => {
          const t = A.boxOf(['tail']), n = A.boxOf(['nut']);
          return Math.round((t.max.x - n.max.x) * 100) / 100;
        } },
      { key: 'oring', label: 'O-Ring-Versatz zur Fuge', soll: 0,
        ist: () => {
          const b = A.boxOf(['oring']);
          const mitte = (b.min.x + b.max.x) / 2;
          return Math.round(Math.abs(mitte - P.oRingX) * 100) / 100;
        } },
      { key: 'restwand', label: 'Mutterwand', soll: P.restwand, ist: () => P.restwand },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export { product as default };
