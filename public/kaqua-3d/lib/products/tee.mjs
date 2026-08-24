/* K-Aqua 3D · T-Stück — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID fittings/tee.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, SEG_FINE, SEG_INT, SEG_VIS, branchJoin, buildProfile, capFromProfile, createAssembly, fusionDepth, materials, mergeGeometries, mirrorProfile, revolve,
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


/* == tee/data.js ======================================================= */
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

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 10;
export const SDR = 6;

export const ARTICLES = [
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

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  D: 'Außendurchmesser',
  l: 'Achse Abzweig bis Stirnfläche',
  L: 'Gesamtlänge Durchgang',
  l1: 'Abzweiglänge',
  z: 'Einbaulänge',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}


/* == tee/params.js ===================================================== */
/* K-Aqua T-Stück — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */


export function params(dNom) {
  return teeParams(article(dNom), { sdr: SDR });
}


/* == tee/parts.js ====================================================== */
/* K-Aqua T-Stück — Kontur. Kommt vollständig aus dem Familienmodul. */


/* == tee/index.js ====================================================== */
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

export { product as default };
