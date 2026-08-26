/* Elektroschweißgerät — Produktpaket. PROTOTYP (data.js). */
import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildFront, buildKasten } from './parts.js';

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
export default product;
