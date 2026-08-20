/* K-Aqua Kappe (Cap) — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Teil, kein Zustand, zwei Bauformen. Die Bauform folgt aus der
   Nennweite (SDR 6 bis d125, SDR 11 ab d160) — keine Variantenwahl,
   weil es zu jeder Nennweite genau eine Kappe gibt. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildBody } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'fittings/cap',
  module: 'kaqua-cap',
  titleDe: 'Kappe',
  titleEn: 'Cap',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'l', 'L', 's', 'kg'],
  dimensions: ['l', 'D'],
  ariaFields: ['d', 'D', 'l', 'L', 's'],

  variants: [],
  states: null,

  tile: 'Verschließt ein Rohrende dicht — für Leitungsenden, ' +
        'Druckproben und Reserveabgänge, die später geöffnet werden.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Kappe_d' + size,
      materials: ['pprGreen'],
      seed: 53,
      clipPlane,
    });

    const body = buildBody(P);
    A.part('body', {
      name: 'Kappe',
      label: P.butt ? 'Kappe, Stumpfschweißung (PP-R)' : 'Kappe, Muffenschweißung (PP-R)',
      mat: 'pprGreen',
      geo: body.geo,
      cap: body.cap,
      anchor: V3(0, P.rOut + 0.22 * P.len, 0),
    });

    A.light(V3(-P.xEnd * 0.4, 0, 0));

    A.hotspot({
      v: V3(-P.xEnd + Math.max(3, 0.10 * P.len), P.rOut * 0.5, P.rOut * 0.84),
      n: V3(0, 0.5, 0.86),
      text: P.butt
        ? 'Stumpf- oder elektrogeschweißt, Wandstärke ' +
          String(P.wall).replace('.', ',') + ' mm wie das Rohr'
        : 'Schweißmuffe für Polyfusion, Schweißtiefe ' +
          P.sockDepth.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(P.xShoulder + P.domeRise * 0.55, P.rOut * 0.42, P.rOut * 0.55),
      n: V3(0.55, 0.42, 0.72),
      text: 'Kalotte in Wandstärke ausgeführt — kein Materialklotz, ' +
            'keine Einfallstellen',
    });

    const zf = P.rOut + 0.12 * P.len;
    const yL = -(P.rOut + 0.30 * P.len);
    A.dim({
      label: P.butt ? 'L' : 'l', value: P.len,
      a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf),
      off: V3(0, 0.12 * P.len, 0),
    });
    const xD = P.xEnd + 0.20 * P.len;
    A.dim({
      label: P.butt ? 'd' : 'D', value: P.OD,
      a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf),
      off: V3(-0.16 * P.len, 0, 0),
    });

    A.measures = [
      { key: P.butt ? 'L' : 'l', label: 'Gesamtlänge', soll: P.len,
        ist: () => { const b = A.boxOf(['body']); return b.max.x - b.min.x; } },
      { key: P.butt ? 'd' : 'D', label: 'Außendurchmesser', soll: P.OD,
        ist: () => { const b = A.boxOf(['body']); return b.max.y - b.min.y; } },
      { key: 'wand', label: 'Wandstärke', soll: P.wall, ist: () => P.wall },
      { key: 'bohrung', label: P.butt ? 'Innendurchmesser' : 'Muffenbohrung',
        soll: P.bore,
        ist: () => {
          const hit = A.probeAxial('body', V3(-P.xEnd - 20, P.bore / 2 - 0.6, 0), V3(1, 0, 0));
          return hit ? P.bore : NaN;
        } },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
