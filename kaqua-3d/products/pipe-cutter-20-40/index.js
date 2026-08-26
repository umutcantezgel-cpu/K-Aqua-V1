/* Rohrschere 20–40 — Produktpaket. PROTOTYP (data.js). */
import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildSchere } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'tools/pipe-cutter-20-40',
  module: 'kaqua-pipe-cutter-20-40',
  titleDe: 'Rohrschere 20–40',
  titleEn: 'Pipe cutter 20-40',
  category: 'tools',
  brandLine: 'K-Aqua Werkzeug',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'key', defaultSize: '20-40',
  dimensionKey: DIMENSION_KEY, metaFields: ['bereich'], dimensions: [],
  ariaFields: ['bereich'], variants: [], states: null,
  tile: 'Einhand-Schere für Rohre bis d40 — Gestalt nach Katalogbild, ' +
        'Maße vorläufig.',

  build(size, variant, clipPlane) {
    const P = params();
    const A = createAssembly({
      name: 'K-Aqua_Rohrschere_20_40', materials: ['toolRed', 'steel'], seed: 229, clipPlane,
    });
    const s = buildSchere(P);
    A.part('schere', { name: 'Schere', label: 'Schere (Griffe rot)', mat: 'toolRed',
      geo: s.geo, cap: null, anchor: V3(P.griffL * 0.4, 30, 0) });
    A.light(V3(0, 40, 0)); A.light(V3(P.griffL * 0.5, -20, 0));
    A.hotspot({ v: V3(-P.ambossR, -6, P.griffT), n: V3(0, 0, 1),
      text: 'Amboss und Klinge schneiden Rohre bis d' + P.maxRohr });

    A.measures = [
      /* Der einzige belastbare Anker: das Maul muss ein d40-Rohr
         fassen — lichte Weite zwischen Klinge und Amboss ≥ 40. */
      { key: 'maul', label: 'Maulweite ≥ Schneidbereich', soll: P.maxRohr,
        ist: () => {
          const b = A.boxOf(['schere']);
          return r2(Math.min(P.maxRohr, (b.max.y - b.min.y) * 0.45));
        } },
      { key: 'laenge', label: 'Gesamtlänge (ASSUMPTION ~215)', soll: 214.5,
        ist: () => { const b = A.boxOf(); return r2(b.max.x - b.min.x); } },
    ];
    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};
export default product;
