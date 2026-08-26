/* K-Aqua 3D · Schweißmaschine 50–125 (Set) — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID tools/welding-machine-50-125.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  SEG_INT, buildProfile, createAssembly, materials, mergeGeometries, revolve, roundedPad,
} from '../kaqua-3d-core.mjs';

/* == welding-machine-50-125/data.js ==================================== */
/* K-Aqua Schweißmaschine 50–125 (Set) — PROTOTYP.
   QUELLE: S. 116: nur Code AQ988125, Pack 1. Gestalt nach dem
   Katalogrender (Kontaktbogen s116-02); alle Maße ASSUMPTION. */
export const DATA_STATUS = 'prototyp';
export const ARTICLES = [ { key: 'set', code: 'AQ988125', pack: 1 } ];
export const SIZES = ['set'];
export const DIMENSION_KEY = {};
export function article() { return ARTICLES[0]; }


/* == welding-machine-50-125/params.js ================================== */
export function params() {
  const P = Object.assign({}, article());
  P.bettL = 420; P.bettB = 150; P.bettH = 60;   // ASSUMPTION Bank
  P.backenR = 82; P.backenX = [-150, -50, 50, 150];
  P.sollBreite = 422.2;   // konstruktiv, inkl. Fasen
  return P;
}


/* == welding-machine-50-125/parts.js =================================== */
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


/* == welding-machine-50-125/index.js =================================== */
/* Schweißmaschine 50–125 (Set) — Produktpaket. PROTOTYP (data.js). */

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'tools/welding-machine-50-125',
  module: 'kaqua-welding-machine-50-125',
  titleDe: 'Schweißmaschine 50–125 (Set)',
  titleEn: 'Welding machine 50-125 (complete set)',
  category: 'tools',
  brandLine: 'K-Aqua Werkzeug',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'key', defaultSize: 'set',
  dimensionKey: DIMENSION_KEY, metaFields: [], dimensions: [],
  ariaFields: [], variants: [], states: null,
  tile: 'Bankmaschine mit vier Klemmbacken für d50–125 — Maße vorläufig.',

  build(size, variant, clipPlane) {
    const P = params();
    const A = createAssembly({
      name: 'K-Aqua_welding-machine-50-125'.replace(/-/g, '_'), materials: ['toolRed', 'steel'], seed: 241, clipPlane,
    });
    const b = buildBank(P);
    const k = buildBacken(P);
    A.part('bank', { name: 'Bank', label: 'Maschinenbett (rot)', mat: 'toolRed',
      geo: b.geo, cap: null, anchor: V3(-P.bettL * 0.3, P.bettH, 0) });
    A.part('backen', { name: 'Backen', label: 'Klemmbacken', mat: 'steel',
      geo: k.geo, cap: null, explode: V3(0, 60, 0) });
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
