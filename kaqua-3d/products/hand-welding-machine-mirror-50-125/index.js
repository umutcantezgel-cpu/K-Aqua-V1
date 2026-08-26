/* Heizspiegel 50–125 — Produktpaket. PROTOTYP (data.js). */
import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildSpiegel, buildStiel } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'tools/hand-welding-machine-mirror-50-125',
  module: 'kaqua-hand-welding-machine-mirror-50-125',
  titleDe: 'Heizspiegel 50–125',
  titleEn: 'Hand welding machine (only mirror) 50-125',
  category: 'tools',
  brandLine: 'K-Aqua Werkzeug',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'key', defaultSize: 'set',
  dimensionKey: DIMENSION_KEY, metaFields: [], dimensions: [],
  ariaFields: [], variants: [], states: null,
  tile: 'Runder Heizspiegel für die großen Nennweiten — Maße vorläufig.',

  build(size, variant, clipPlane) {
    const P = params();
    const A = createAssembly({
      name: 'K-Aqua_hand-welding-machine-mirror-50-125'.replace(/-/g, '_'), materials: ['steel', 'toolBlack'], seed: 241, clipPlane,
    });
    const g = buildSpiegel(P);
    const s = buildStiel(P);
    A.part('spiegel', { name: 'Spiegel', label: 'Heizspiegel (rund)', mat: 'steel',
      geo: g.geo, cap: null, anchor: V3(0, P.spiegelR * 0.7, 0) });
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
