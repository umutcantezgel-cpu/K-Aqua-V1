/* Rohrabschneider 50–125 — Produktpaket. PROTOTYP (data.js). */
import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildSchneider } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'tools/pipe-cutter-50-125',
  module: 'kaqua-pipe-cutter-50-125',
  titleDe: 'Rohrabschneider 50–125',
  titleEn: 'Pipe cutter 50-125',
  category: 'tools',
  brandLine: 'K-Aqua Werkzeug',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'key', defaultSize: '50-125',
  dimensionKey: DIMENSION_KEY, metaFields: ['bereich'], dimensions: [],
  ariaFields: ['bereich'], variants: [], states: null,
  tile: 'Rollenschneider mit C-Bügel für Rohre bis d125 — Gestalt nach ' +
        'Katalogbild, Maße vorläufig.',

  build(size, variant, clipPlane) {
    const P = params();
    const A = createAssembly({
      name: 'K-Aqua_Rohrabschneider', materials: ['steel'], seed: 233, clipPlane,
    });
    const s = buildSchneider(P);
    A.part('schneider', { name: 'Schneider', label: 'Rollenschneider (Metall)', mat: 'steel',
      geo: s.geo, cap: null, anchor: V3(P.buegelR * 0.5, P.buegelR * 0.8, 0) });
    A.light(V3(0, P.buegelR, 0)); A.light(V3(0, -P.buegelR * 0.4, 0));

    A.measures = [
      /* Anker: der Bügel muss ein d125-Rohr umgreifen. */
      { key: 'buegel', label: 'Bügelöffnung ≥ d125', soll: P.maxRohr,
        ist: () => r2(Math.min(P.maxRohr, 2 * (P.buegelR - 16 - 3))) },
      { key: 'teil', label: 'Ein Werkzeugkörper', soll: 1,
        ist: () => A.parts.length },
    ];
    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};
export default product;
