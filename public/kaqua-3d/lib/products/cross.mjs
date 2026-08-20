/* K-Aqua 3D · Kreuz — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID fittings/cross.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, SEG_FINE, SEG_VIS, branchJoin, buildProfile, capFromProfile, createAssembly, fusionDepth, materials, mergeGeometries, mirrorProfile, revolve,
} from '../kaqua-3d-core.mjs';

/* == cross/data.js ===================================================== */
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

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 2;
export const SDR = 6;

export const ARTICLES = [
  { code: 'AQ18025', d: 25, L: 60, z: 27, kg: 0.06, pack: 80 },
  { code: 'AQ18032', d: 32, L: 75, z: 34, kg: 0.08, pack: 50 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  L: 'Gesamtlänge',
  z: 'Einbaulänge',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}


/* == cross/params.js =================================================== */
/* K-Aqua Kreuz — Parametrik.

   Vier gleiche Anschlüsse in einer Ebene. Beide Achsen tragen dasselbe
   Maß L, deshalb genügt ein Halbmaß.

   ASSUMPTION Außendurchmesser: die Tabelle führt keinen. Angesetzt
   1,375·d — der Wert, den T-Stück und Muffe bei d25 und d32 zeigen
   (T-Stück d32: D = 44 = 1,375·32; Muffe d32: D = 44). Gegen die
   Zeichnung zu verifizieren. */


export function params(dNom) {
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


/* == cross/parts.js ==================================================== */
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

export function buildCross(P) {
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


/* == cross/index.js ==================================================== */
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

export { product as default };
