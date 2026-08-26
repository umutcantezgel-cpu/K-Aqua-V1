/* K-Aqua 3D · Rohrschaber — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID tools/pipe-cutter-50-125-114.
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


/* == pipe-cutter-50-125-114/data.js ==================================== */
/* K-Aqua Rohrschaber — PROTOTYP.
   QUELLE: S. 114: Code AQ974 „Pipe scraper", Pack 1. Der Registry-Slug
   heißt historisch 'pipe-cutter-50-125-114' (aus dem Website-Scrape);
   das PRODUKT ist der Schaber — die Prosa wurde bereits am 24.08.
   berichtigt (Commit fa1d510d), hier folgt das Modell. Gestalt nach
   Katalogrender (flacher roter Schaber mit Stahlklinge). */
export const DATA_STATUS = 'prototyp';
export const ARTICLES = [ { key: 'schaber', code: 'AQ974', pack: 1 } ];
export const SIZES = ['schaber'];
export const DIMENSION_KEY = {};
export function article() { return ARTICLES[0]; }


/* == pipe-cutter-50-125-114/params.js ================================== */
export function params() {
  const P = Object.assign({}, article());
  P.laenge = 150; P.breite = 62; P.dicke = 26;   // ASSUMPTION Handmaß
  P.klingenB = 55;
  return P;
}


/* == pipe-cutter-50-125-114/parts.js =================================== */
/* Flacher Schaberkörper (rot) mit Stahlklinge vorn. */
export function buildSchaber(P) {
  const sek = (x, b, d, y0) => ({ x, pts: [
    { a: -d / 2 + y0, r: -b / 2 }, { a: -d / 2 + y0, r: b / 2 },
    { a: d / 2 + y0, r: b / 2 }, { a: d / 2 + y0, r: -b / 2 },
    { a: -d / 2 + y0, r: -b / 2 },
  ] });
  const koerper = loft([
    sek(0, P.breite * 0.7, P.dicke * 0.8, 2),
    sek(P.laenge * 0.35, P.breite, P.dicke, 0),
    sek(P.laenge * 0.8, P.breite * 0.9, P.dicke * 0.75, -2),
    sek(P.laenge, P.breite * 0.82, P.dicke * 0.5, -5),
  ]);
  return { geo: koerper, cap: null };
}

export function buildKlinge(P) {
  const k = roundedPad(16, P.klingenB, 2.2, 1.2);
  k.rotateY(Math.PI / 2);
  k.rotateZ(Math.PI / 2);
  k.translate(P.laenge + 5, -8, 0);
  return { geo: k, cap: null };
}


/* == pipe-cutter-50-125-114/index.js =================================== */
/* Rohrschaber — Produktpaket. PROTOTYP (data.js). */

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'tools/pipe-cutter-50-125-114',
  module: 'kaqua-pipe-cutter-50-125-114',
  titleDe: 'Rohrschaber',
  titleEn: 'Pipe scraper',
  category: 'tools',
  brandLine: 'K-Aqua Werkzeug',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'key', defaultSize: 'schaber',
  dimensionKey: DIMENSION_KEY, metaFields: [], dimensions: [],
  ariaFields: [], variants: [], states: null,
  tile: 'Schält die Oxidschicht vor dem Schweißen — Gestalt nach ' +
        'Katalogbild, Maße vorläufig.',

  build(size, variant, clipPlane) {
    const P = params();
    const A = createAssembly({
      name: 'K-Aqua_Rohrschaber', materials: ['toolRed', 'steel'], seed: 239, clipPlane,
    });
    const k1 = buildSchaber(P);
    const k2 = buildKlinge(P);
    A.part('koerper', { name: 'Koerper', label: 'Schaberkörper (rot)', mat: 'toolRed',
      geo: k1.geo, cap: null, anchor: V3(P.laenge * 0.4, P.dicke, 0) });
    A.part('klinge', { name: 'Klinge', label: 'Klinge (Stahl)', mat: 'steel',
      geo: k2.geo, cap: null, explode: V3(18, 0, 0) });
    A.light(V3(P.laenge * 0.3, P.dicke * 2, 0)); A.light(V3(P.laenge, 0, 0));

    A.measures = [
      { key: 'laenge', label: 'Gesamtlänge (ASSUMPTION)', soll: 155,
        ist: () => { const b = A.boxOf(); return r2(b.max.x - b.min.x); } },
      { key: 'teile', label: 'Körper + Klinge', soll: 2,
        ist: () => A.parts.length },
    ];
    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};
export { product as default };
