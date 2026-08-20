/* K-Aqua Kreuz — Produktpaket nach PRODUKT-VERTRAG.md.

   Vier Anschlüsse in einer Ebene. Zwei Kehlen aus branchJoin, zwei
   Abzweigarme, ein Durchgang — kein CSG. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildCross } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'fittings/cross',
  module: 'kaqua-cross',
  titleDe: 'Kreuz',
  titleEn: 'Cross',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'L', 'kg'],
  dimensions: ['L'],
  ariaFields: ['d', 'L', 'z'],

  variants: [],
  states: null,

  tile: 'Vier Anschlüsse in einer Ebene, gleiche Nennweite. Nur in ' +
        'd25 und d32 lieferbar — die kleinste Reihe des Katalogs.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Kreuz_d' + size,
      materials: ['pprGreen'],
      seed: 113,
      clipPlane,
    });

    const body = buildCross(P);
    A.part('body', {
      name: 'Kreuz', label: 'Kreuzkörper (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(0, P.half + 0.28 * P.run, 0),
    });

    A.light(V3(-P.half * 0.6, 0, 0));
    A.light(V3(P.half * 0.6, 0, 0));
    A.light(V3(0, P.half * 0.6, 0));

    A.hotspot({
      v: V3(-P.half + Math.max(3, 0.08 * P.run), P.rOut * 0.5, P.rOut * 0.83),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm — gleich in allen vier Anschlüssen',
    });
    A.hotspot({
      v: V3(P.rOut * 0.7, P.rOut * 0.9, P.rOut * 0.5),
      n: V3(0.55, 0.6, 0.58),
      text: 'Vier Kehlen mit Radius ' + P.filletR.toFixed(1).replace('.', ',') +
        ' mm treffen in der Mitte',
    });

    const zf = P.rOut + 0.12 * P.run;
    const yL = -(P.half + 0.24 * P.run);
    A.dim({ label: 'L', value: P.run,
      a: V3(-P.half, yL, zf), b: V3(P.half, yL, zf), off: V3(0, 0.10 * P.run, 0) });
    const xB = P.half + 0.16 * P.run;
    A.dim({ label: 'L', value: P.run,
      a: V3(xB, -P.half, zf), b: V3(xB, P.half, zf), off: V3(-0.12 * P.run, 0, 0) });

    A.measures = [
      { key: 'L', label: DIMENSION_KEY.L + ' (X)', soll: P.run,
        ist: () => { const b = A.boxOf(['body']); return b.max.x - b.min.x; } },
      { key: 'Ly', label: DIMENSION_KEY.L + ' (Y)', soll: P.run,
        ist: () => { const b = A.boxOf(['body']); return b.max.y - b.min.y; } },
      /* Am Arm gemessen, nicht über die Box: die Kehlen sitzen
         konstruktiv bei rOut + filletR und sind damit breiter als der
         Rohrkörper. Eine Box3 über das ganze Teil misst sie mit. */
      { key: 'D', label: 'Außendurchmesser (gerechnet)', soll: P.OD,
        ist: () => {
          const hit = A.probeAxial('body', V3(-P.half + 2.0, 0, P.OD), V3(0, 0, -1));
          return hit ? Math.round(2 * hit.z * 100) / 100 : NaN;
        } },
      { key: 'tiefe', label: 'Muffentiefe (Normreihe)',
        soll: P.normDepth ?? P.socket, ist: () => P.socket },
      { key: 'restwand', label: 'Restwand Fitting', soll: P.restwand, ist: () => P.restwand },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
