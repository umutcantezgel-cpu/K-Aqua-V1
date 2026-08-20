/* K-Aqua Flachdichtung für Verschraubungen — Produktpaket.

   Der Maßtest ist hier aussagekräftiger als bei der einfachen
   Flachdichtung: alle drei Maße stehen in der Quelle. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildGasket } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'accessories/flat-gasket-for-unions',
  module: 'kaqua-flat-gasket-for-unions',
  titleDe: 'Flachdichtung für Verschraubungen',
  titleEn: 'Flat gasket for unions PP-R',
  category: 'accessories',
  brandLine: 'K-Aqua · EPDM',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 25,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'd1', 's'],
  dimensions: ['D', 'd1'],
  ariaFields: ['d', 'D', 'd1', 's'],

  variants: [],
  states: null,

  tile: 'Dichtet die lösbare Verschraubung — gestanztes EPDM, 3 mm, ' +
        'passend zu d20, d25 und d32.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Flachdichtung_Verschraubung_d' + size,
      materials: ['epdm'],
      seed: 139,
      clipPlane,
    });

    const g = buildGasket(P);
    A.part('gasket', {
      name: 'Flachdichtung', label: 'Flachdichtung (EPDM)', mat: 'epdm',
      geo: g.geo, cap: g.cap,
      anchor: V3(0, P.rOut + 0.55 * P.D, 0),
    });

    A.light(V3(P.s * 2, 0, 0));

    A.hotspot({
      v: V3(0, (P.rOut + P.rIn) / 2 * 0.7, (P.rOut + P.rIn) / 2 * 0.7),
      n: V3(0.4, 0.65, 0.65),
      text: 'Dichtbreite ' + String(P.width).replace('.', ',') +
        ' mm — liegt im Grund der Verschraubung R' + P.R + '"',
    });

    const zf = P.rOut + 0.24 * P.D;
    A.dim({ label: 'D', value: P.D,
      a: V3(-P.s * 4, -P.rOut, zf), b: V3(-P.s * 4, P.rOut, zf),
      off: V3(P.s * 3.5, 0, 0) });
    A.dim({ label: 'd1', value: P.d1,
      a: V3(P.s * 4, -P.rIn, zf), b: V3(P.s * 4, P.rIn, zf),
      off: V3(-P.s * 3.5, 0, 0) });

    A.measures = [
      { key: 'D', label: DIMENSION_KEY.D, soll: P.D,
        ist: () => { const b = A.boxOf(['gasket']); return b.max.z - b.min.z; } },
      { key: 'd1', label: DIMENSION_KEY.d1, soll: P.d1,
        ist: () => {
          const hit = A.probeAxial('gasket', V3(0, 0, 0), V3(0, 1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      { key: 's', label: DIMENSION_KEY.s, soll: P.s,
        ist: () => { const b = A.boxOf(['gasket']); return b.max.x - b.min.x; } },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
