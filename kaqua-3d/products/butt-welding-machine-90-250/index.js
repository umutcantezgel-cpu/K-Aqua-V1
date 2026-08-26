/* Stumpfschweißmaschine 90–250 — Produktpaket. PROTOTYP (data.js). */
import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildBacken, buildBank } from './parts.js';

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
export default product;
