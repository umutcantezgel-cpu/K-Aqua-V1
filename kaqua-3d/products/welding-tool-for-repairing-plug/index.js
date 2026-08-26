/* Schweißwerkzeug für Reparaturstopfen — Produktpaket. PROTOTYP. */
import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildWerkzeug } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'tools/welding-tool-for-repairing-plug',
  module: 'kaqua-welding-tool-for-repairing-plug',
  titleDe: 'Schweißwerkzeug für Reparaturstopfen',
  titleEn: 'Welding tool for repairing plug',
  category: 'tools',
  brandLine: 'K-Aqua Werkzeug',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'key',
  sizeLabel: (k) => 'd' + k,
  defaultSize: '7',
  dimensionKey: DIMENSION_KEY, metaFields: ['d'], dimensions: [],
  ariaFields: ['d'], variants: [], states: null,
  tile: 'Heizt Leckbohrung und Stopfen in einem Zug an — Maße vorläufig.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Reparaturwerkzeug', materials: ['steel'], seed: 223, clipPlane,
    });
    const w = buildWerkzeug(P);
    A.part('werkzeug', { name: 'Werkzeug', label: 'Heizwerkzeug (Stahl)', mat: 'steel',
      geo: w.geo, cap: w.cap, anchor: V3(P.kopfR + 3, P.kopfH * 0.5, 0) });
    A.light(V3(0, P.kopfH, 0)); A.light(V3(0, -P.schaftL * 0.5, 0));

    A.measures = [
      { key: 'stift', label: 'Heizstift-Ø (= Stopfen d)', soll: P.d,
        ist: () => {
          const hit = A.probeAxial('werkzeug', V3(0, P.kopfH + P.d * 0.5, P.d * 2), V3(0, 0, -1));
          return hit ? r2(2 * hit.z) : NaN;
        } },
      { key: 'kopf', label: 'Heizkopf-Ø (ASSUMPTION d + 5)', soll: r2(2 * P.kopfR),
        ist: () => {
          const hit = A.probeAxial('werkzeug', V3(0, P.kopfH * 0.5, P.d * 3), V3(0, 0, -1));
          return hit ? r2(2 * hit.z) : NaN;
        } },
    ];
    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};
export default product;
