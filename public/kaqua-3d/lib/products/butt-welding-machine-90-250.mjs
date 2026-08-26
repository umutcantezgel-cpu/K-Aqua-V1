/* K-Aqua 3D · Stumpfschweißmaschine 90–250 — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID tools/butt-welding-machine-90-250.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  SEG_INT, buildProfile, createAssembly, materials, mergeGeometries, revolve, roundedPad,
} from '../kaqua-3d-core.mjs';

/* == butt-welding-machine-90-250/data.js =============================== */
/* K-Aqua Stumpfschweißmaschine 90–250 — PROTOTYP.
   QUELLE: S. 117: nur Code AQ989250, Pack 1. Gestalt nach dem
   Katalogrender (Kontaktbogen s117-01); alle Maße ASSUMPTION. */
export const DATA_STATUS = 'prototyp';
export const ARTICLES = [ { key: 'set', code: 'AQ989250', pack: 1 } ];
export const SIZES = ['set'];
export const DIMENSION_KEY = {};
export function article() { return ARTICLES[0]; }


/* == butt-welding-machine-90-250/params.js ============================= */
export function params() {
  const P = Object.assign({}, article());
  P.bettL = 560; P.bettB = 240; P.bettH = 80;
  P.backenR = 160; P.backenX = [-190, -70, 70, 190];
  P.sollBreite = 562.6;   // konstruktiv, inkl. Fasen
  return P;
}


/* == butt-welding-machine-90-250/parts.js ============================== */
/* Rote Bank mit Klemmbacken-Paaren (Halbring-Backen angedeutet). */
export function buildBank(P) {
  const geos = [];
  const bett = roundedPad(P.bettL, P.bettB, P.bettH, 8);
  geos.push(bett);
  for (const fx of [-P.bettL * 0.36, P.bettL * 0.36]) {
    const fuss = roundedPad(P.bettB * 0.85, 24, P.bettH, 6);
    fuss.rotateZ(Math.PI / 2);
    fuss.translate(fx, -P.bettB * 0.15 - 12, 0);
    geos.push(fuss);
  }
  return { geo: mergeGeometries(geos), cap: null };
}

export function buildBacken(P) {
  const geos = [];
  for (const fx of P.backenX) {
    const backe = revolve(buildProfile([
      { a: -9, r: P.backenR, chamfer: 2 },
      { a: 9, r: P.backenR, chamfer: 2 },
      { a: 9, r: P.backenR * 0.42, fillet: 0 },
      { a: -9, r: P.backenR * 0.42, fillet: 0 },
    ], { segs: 3 }), { axis: 'x', segments: SEG_INT });
    backe.translate(fx, P.backenR * 0.55, 0);
    geos.push(backe);
  }
  return { geo: mergeGeometries(geos), cap: null };
}


/* == butt-welding-machine-90-250/index.js ============================== */
/* Stumpfschweißmaschine 90–250 — Produktpaket. PROTOTYP (data.js). */

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'tools/butt-welding-machine-90-250',
  module: 'kaqua-butt-welding-machine-90-250',
  titleDe: 'Stumpfschweißmaschine 90–250',
  titleEn: 'Butt welding machine 90-250',
  category: 'tools',
  brandLine: 'K-Aqua Werkzeug',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'key', defaultSize: 'set',
  dimensionKey: DIMENSION_KEY, metaFields: [], dimensions: [],
  ariaFields: [], variants: [], states: null,
  tile: 'Stumpfschweißmaschine für d90–250 — Maße vorläufig.',

  build(size, variant, clipPlane) {
    const P = params();
    const A = createAssembly({
      name: 'K-Aqua_butt-welding-machine-90-250'.replace(/-/g, '_'), materials: ['toolRed', 'brass'], seed: 241, clipPlane,
    });
    const b = buildBank(P);
    const k = buildBacken(P);
    A.part('bank', { name: 'Bank', label: 'Maschinenbett (rot)', mat: 'toolRed',
      geo: b.geo, cap: null, anchor: V3(-P.bettL * 0.3, P.bettH, 0) });
    A.part('backen', { name: 'Backen', label: 'Spannringe', mat: 'brass',
      geo: k.geo, cap: null, explode: V3(0, 80, 0) });
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
