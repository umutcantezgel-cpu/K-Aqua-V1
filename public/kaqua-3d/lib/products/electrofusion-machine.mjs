/* K-Aqua 3D · Elektroschweißgerät — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID tools/electrofusion-machine.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  createAssembly, materials, mergeGeometries, roundedPad,
} from '../kaqua-3d-core.mjs';

/* == electrofusion-machine/data.js ===================================== */
/* K-Aqua Elektroschweißgerät — PROTOTYP.
   QUELLE: S. 117: nur Code AQ990, Pack 1. Gestalt nach dem
   Katalogrender (Kontaktbogen s117-02); alle Maße ASSUMPTION. */
export const DATA_STATUS = 'prototyp';
export const ARTICLES = [ { key: 'set', code: 'AQ990', pack: 1 } ];
export const SIZES = ['set'];
export const DIMENSION_KEY = {};
export function article() { return ARTICLES[0]; }


/* == electrofusion-machine/params.js =================================== */
export function params() {
  const P = Object.assign({}, article());
  P.kastenB = 240; P.kastenH = 200; P.kastenT = 150;
  P.sollBreite = 242;   // konstruktiv, inkl. Fasen
  return P;
}


/* == electrofusion-machine/parts.js ==================================== */
export function buildKasten(P) {
  const geos = [];
  const korpus = roundedPad(P.kastenB, P.kastenH, P.kastenT, 14);
  geos.push(korpus);
  const deckel = roundedPad(P.kastenB * 0.9, 24, P.kastenT * 0.9, 8);
  deckel.translate(0, P.kastenH / 2 + 10, 0);
  geos.push(deckel);
  return { geo: mergeGeometries(geos), cap: null };
}

export function buildFront(P) {
  const geos = [];
  const display = roundedPad(P.kastenB * 0.42, 40, 4, 3);
  display.translate(-P.kastenB * 0.12, P.kastenH * 0.18, P.kastenT / 2 + 1);
  geos.push(display);
  const tasten = roundedPad(P.kastenB * 0.3, 26, 4, 3);
  tasten.translate(P.kastenB * 0.2, -P.kastenH * 0.05, P.kastenT / 2 + 1);
  geos.push(tasten);
  return { geo: mergeGeometries(geos), cap: null };
}


/* == electrofusion-machine/index.js ==================================== */
/* Elektroschweißgerät — Produktpaket. PROTOTYP (data.js). */

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'tools/electrofusion-machine',
  module: 'kaqua-electrofusion-machine',
  titleDe: 'Elektroschweißgerät',
  titleEn: 'Electrofusion machine',
  category: 'tools',
  brandLine: 'K-Aqua Werkzeug',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'key', defaultSize: 'set',
  dimensionKey: DIMENSION_KEY, metaFields: [], dimensions: [],
  ariaFields: [], variants: [], states: null,
  tile: 'Steuergerät für Elektroschweißmuffen — kastenförmig, nicht rotationssymmetrisch. Maße vorläufig.',

  build(size, variant, clipPlane) {
    const P = params();
    const A = createAssembly({
      name: 'K-Aqua_electrofusion-machine'.replace(/-/g, '_'), materials: ['steel', 'toolBlack'], seed: 241, clipPlane,
    });
    const kk = buildKasten(P);
    const f = buildFront(P);
    A.part('kasten', { name: 'Kasten', label: 'Gerätekoffer', mat: 'steel',
      geo: kk.geo, cap: null, anchor: V3(0, P.kastenH * 0.65, 0) });
    A.part('front', { name: 'Front', label: 'Display und Tasten', mat: 'toolBlack',
      geo: f.geo, cap: null, explode: V3(0, 0, 40) });
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
