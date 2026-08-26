/* K-Aqua 3D · Handschweißgerät 20–32 (Set) — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID tools/hand-welding-machine-20-32.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  SEG_FINE, SEG_INT, buildProfile, capFromProfile, createAssembly, loft, materials, mergeGeometries, revolve, roundedPad,
} from '../kaqua-3d-core.mjs';

/* == _handtools/parts.js =============================================== */
/* K-Aqua Handwerkzeuge (S. 114) — Bausteine. PROTOTYPEN.

   Keine Rohrgeometrie: Scherenbügel, Klingen, Griffe. Grundlage sind
   roundedPad und loft, wie 20-VISUELLE-REFERENZ §4.5 es vorgibt.
   Alle Maße ASSUMPTION aus den Katalogrendern (Kontaktbogen s114). */


/* Flacher Griff, leicht keilförmig via loft. Die loft-Sektionen sind
   { x, pts: [{a, r}] } — a wird z, r wird y (der erste Wurf übergab
   Zahlenpaare und der NaN-Wächter aus Welle 1 leerte die Ansicht
   SOFORT statt still: genau wofür er gebaut wurde). */
export function buildGriff(len, breite, dicke) {
  const sek = (x, b, d) => ({ x, pts: [
    { a: -d / 2, r: -b / 2 }, { a: -d / 2, r: b / 2 },
    { a: d / 2, r: b / 2 }, { a: d / 2, r: -b / 2 },
    { a: -d / 2, r: -b / 2 },
  ] });
  return loft([
    sek(0, breite, dicke),
    sek(len * 0.55, breite * 1.12, dicke),
    sek(len, breite * 0.8, dicke * 0.85),
  ]);
}

/* Rundgriff um Y (Maschinenstiel). */
export function buildRundgriff(len, r) {
  const profile = buildProfile([
    { a: 0, r: r * 0.75, fillet: 2 },
    { a: len * 0.2, r: r, fillet: 3 },
    { a: len * 0.8, r: r, fillet: 3 },
    { a: len, r: r * 0.6, chamfer: 2 },
    { a: len, r: 0.02, fillet: 0 },
    { a: 0, r: 0.02, fillet: 0 },
  ], { segs: 4 });
  return revolve(profile, { axis: 'y', segments: SEG_INT });
}


/* == hand-welding-machine-20-32/data.js ================================ */
/* K-Aqua Handschweißgerät 20–32 (Set) — PROTOTYP.
   QUELLE: S. 114: nur Code AQ98032, Pack 1. Gestalt nach dem
   Katalogrender (Kontaktbogen s114-04/05); alle Maße ASSUMPTION. */
export const DATA_STATUS = 'prototyp';
export const ARTICLES = [ { key: 'set', code: 'AQ98032', pack: 1 } ];
export const SIZES = ['set'];
export const DIMENSION_KEY = {};
export function article() { return ARTICLES[0]; }


/* == hand-welding-machine-20-32/params.js ============================== */
export function params() {
  const P = Object.assign({}, article());
  P.plattL = 190; P.plattB = 74; P.plattT = 14;   // ASSUMPTION Schwert
  P.lochR = 9; P.kastenL = 64; P.stielL = 130; P.stielR = 14;
  P.sollBreite = 381;   // konstruktiv, inkl. Fasen
  return P;
}


/* == hand-welding-machine-20-32/parts.js =============================== */
/* Heizschwert: flache Platte mit Werkzeuglöchern (als Hülsenringe
   angedeutet), hinten Griffkörper mit Stiel. */
export function buildGeraet(P) {
  const geos = [];
  const platte = roundedPad(P.plattL, P.plattB, P.plattT, P.plattB * 0.35);
  geos.push(platte);
  for (const fx of [-P.plattL * 0.22, P.plattL * 0.18]) {
    const ring = revolve(buildProfile([
      { a: -P.plattT / 2 - 0.8, r: P.lochR + 2.2, chamfer: 0.4 },
      { a: P.plattT / 2 + 0.8, r: P.lochR + 2.2, chamfer: 0.4 },
      { a: P.plattT / 2 + 0.8, r: P.lochR, fillet: 0 },
      { a: -P.plattT / 2 - 0.8, r: P.lochR, fillet: 0 },
    ], { segs: 3 }), { axis: 'y', segments: SEG_INT });
    ring.rotateX(Math.PI / 2);
    ring.translate(fx, 0, 0);
    geos.push(ring);
  }
  const kasten = roundedPad(P.kastenL, P.plattB * 0.8, P.plattT * 2.6, 6);
  kasten.translate(P.plattL / 2 + P.kastenL / 2 - 4, 0, 0);
  geos.push(kasten);
  const geo = mergeGeometries(geos);
  return { geo, cap: null };
}

export function buildStiel(P) {
  const g = buildRundgriff(P.stielL, P.stielR);
  g.rotateZ(-Math.PI / 2);
  g.translate(P.plattL / 2 + P.kastenL - 4, 0, 0);
  return { geo: g, cap: null };
}


/* == hand-welding-machine-20-32/index.js =============================== */
/* Handschweißgerät 20–32 (Set) — Produktpaket. PROTOTYP (data.js). */

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'tools/hand-welding-machine-20-32',
  module: 'kaqua-hand-welding-machine-20-32',
  titleDe: 'Handschweißgerät 20–32 (Set)',
  titleEn: 'Hand welding machine 20-32 (complete set)',
  category: 'tools',
  brandLine: 'K-Aqua Werkzeug',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'key', defaultSize: 'set',
  dimensionKey: DIMENSION_KEY, metaFields: [], dimensions: [],
  ariaFields: [], variants: [], states: null,
  tile: 'Heizschwert mit Werkzeugaufnahmen — Maße vorläufig.',

  build(size, variant, clipPlane) {
    const P = params();
    const A = createAssembly({
      name: 'K-Aqua_hand-welding-machine-20-32'.replace(/-/g, '_'), materials: ['steel', 'toolBlack'], seed: 241, clipPlane,
    });
    const g = buildGeraet(P);
    const s = buildStiel(P);
    A.part('geraet', { name: 'Geraet', label: 'Heizschwert mit Gerätekörper', mat: 'steel',
      geo: g.geo, cap: null, anchor: V3(0, P.plattB * 0.6, 0) });
    A.part('stiel', { name: 'Stiel', label: 'Handgriff', mat: 'toolBlack',
      geo: s.geo, cap: null, explode: V3(30, 0, 0) });
    A.light(V3(0, 60, 0)); A.light(V3(120, 20, 0));

    A.measures = [
      { key: 'teile', label: 'Baugruppen', soll: 2,
        ist: () => A.parts.length },
      { key: 'breite', label: 'Gesamtbreite (ASSUMPTION)', soll: P.sollBreite,
        ist: () => { const b = A.boxOf(); return r2(b.max.x - b.min.x); } },
    ];
    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};
export { product as default };
