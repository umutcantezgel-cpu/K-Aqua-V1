/* K-Aqua Flachdichtung — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Teil, ein Werkstoff, kein Zustand. Der Maßtest prüft hier vor
   allem, dass die abgeleiteten Maße untereinander stimmen — gegen die
   Quelle sind sie nicht prüfbar, weil sie dort nicht stehen. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildGasket } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'accessories/flat-gasket',
  module: 'kaqua-flat-gasket',
  titleDe: 'Flachdichtung',
  titleEn: 'Flat gasket',
  category: 'accessories',
  brandLine: 'K-Aqua · EPDM',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 63,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d'],
  dimensions: ['D', 'd1'],
  ariaFields: ['d'],

  variants: [],
  states: null,

  tile: 'Dichtet die Flanschverbindung — gestanztes EPDM, ' +
        '3 mm, d40 bis d315.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Flachdichtung_d' + size,
      materials: ['epdm'],
      seed: 137,
      clipPlane,
    });

    const g = buildGasket(P);
    A.part('gasket', {
      name: 'Flachdichtung', label: 'Flachdichtung (EPDM)', mat: 'epdm',
      geo: g.geo, cap: g.cap,
      anchor: V3(0, P.rOut + 0.20 * P.D, 0),
    });

    A.light(V3(P.s * 2, 0, 0));

    A.hotspot({
      v: V3(0, (P.rOut + P.rIn) / 2 * 0.7, (P.rOut + P.rIn) / 2 * 0.7),
      n: V3(0.4, 0.65, 0.65),
      text: 'Dichtfläche ' + ((P.D - P.d1) / 2).toFixed(1).replace('.', ',') +
        ' mm breit, Dicke ' + P.s + ' mm',
    });

    const zf = P.rOut + 0.10 * P.D;
    A.dim({ label: 'D', value: P.D,
      a: V3(-P.s * 3, -P.rOut, zf), b: V3(-P.s * 3, P.rOut, zf),
      off: V3(P.s * 2.5, 0, 0) });
    A.dim({ label: 'd1', value: P.d1,
      a: V3(P.s * 3, -P.rIn, zf), b: V3(P.s * 3, P.rIn, zf),
      off: V3(-P.s * 2.5, 0, 0) });

    A.measures = [
      { key: 'D', label: DIMENSION_KEY.D + ' (abgeleitet)', soll: P.D,
        ist: () => { const b = A.boxOf(['gasket']); return b.max.z - b.min.z; } },
      /* Innendurchmesser: von der Achse radial nach außen — hier ist das
         richtig, weil das Teil keine Bohrungswand vor dem Innenrand hat. */
      { key: 'd1', label: DIMENSION_KEY.d1 + ' (abgeleitet)', soll: P.d1,
        ist: () => {
          const hit = A.probeAxial('gasket', V3(0, 0, 0), V3(0, 1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      { key: 's', label: DIMENSION_KEY.s + ' (abgeleitet)', soll: P.s,
        ist: () => { const b = A.boxOf(['gasket']); return b.max.x - b.min.x; } },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
