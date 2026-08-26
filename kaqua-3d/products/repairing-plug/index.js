/* Reparaturstopfen — Produktpaket. PROTOTYP (data.js). */
import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildStab } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'tools/repairing-plug',
  module: 'kaqua-repairing-plug',
  titleDe: 'Reparaturstopfen',
  titleEn: 'Repairing plug',
  category: 'tools',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'key',
  sizeLabel: (k) => 'd' + k,
  defaultSize: '7',
  dimensionKey: DIMENSION_KEY, metaFields: ['d'], dimensions: [],
  ariaFields: ['d'], variants: [], states: null,
  tile: 'PP-R-Kegelstab zum Einschweißen in die Leckbohrung — Länge ' +
        'vorläufig, Durchmesser aus der Tabelle.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Reparaturstopfen', materials: ['pprGreen'], seed: 227, clipPlane,
    });
    const stab = buildStab(P);
    A.part('stab', { name: 'Stab', label: 'Reparaturstab (PP-R)', mat: 'pprGreen',
      geo: stab.geo, cap: stab.cap, anchor: V3(P.d, P.len * 0.6, 0) });
    A.light(V3(0, P.len * 0.4, 0)); A.light(V3(0, P.len * 0.9, 0));

    A.measures = [
      /* Das eine Tabellenmaß: der Stabdurchmesser. */
      { key: 'd', label: 'Stab-Ø (Tabellenmaß)', soll: P.d,
        ist: () => {
          const hit = A.probeAxial('stab', V3(0, P.len * 0.4, P.d), V3(0, 0, -1));
          return hit ? r2(2 * hit.z) : NaN;
        } },
      { key: 'len', label: 'Länge (ASSUMPTION)', soll: P.len,
        ist: () => { const b = A.boxOf(); return r2(b.max.y - b.min.y); } },
    ];
    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};
export default product;
