/* Handschweißgerät 20–32 (Set) — Produktpaket. PROTOTYP (data.js). */
import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildGeraet, buildStiel } from './parts.js';

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
export default product;
