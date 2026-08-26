/* Rohrschaber — Produktpaket. PROTOTYP (data.js). */
import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildSchaber, buildKlinge } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'tools/pipe-cutter-50-125-114',
  module: 'kaqua-pipe-cutter-50-125-114',
  titleDe: 'Rohrschaber',
  titleEn: 'Pipe scraper',
  category: 'tools',
  brandLine: 'K-Aqua Werkzeug',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'key', defaultSize: 'schaber',
  dimensionKey: DIMENSION_KEY, metaFields: [], dimensions: [],
  ariaFields: [], variants: [], states: null,
  tile: 'Schält die Oxidschicht vor dem Schweißen — Gestalt nach ' +
        'Katalogbild, Maße vorläufig.',

  build(size, variant, clipPlane) {
    const P = params();
    const A = createAssembly({
      name: 'K-Aqua_Rohrschaber', materials: ['toolRed', 'steel'], seed: 239, clipPlane,
    });
    const k1 = buildSchaber(P);
    const k2 = buildKlinge(P);
    A.part('koerper', { name: 'Koerper', label: 'Schaberkörper (rot)', mat: 'toolRed',
      geo: k1.geo, cap: null, anchor: V3(P.laenge * 0.4, P.dicke, 0) });
    A.part('klinge', { name: 'Klinge', label: 'Klinge (Stahl)', mat: 'steel',
      geo: k2.geo, cap: null, explode: V3(18, 0, 0) });
    A.light(V3(P.laenge * 0.3, P.dicke * 2, 0)); A.light(V3(P.laenge, 0, 0));

    A.measures = [
      { key: 'laenge', label: 'Gesamtlänge (ASSUMPTION)', soll: 155,
        ist: () => { const b = A.boxOf(); return r2(b.max.x - b.min.x); } },
      { key: 'teile', label: 'Körper + Klinge', soll: 2,
        ist: () => A.parts.length },
    ];
    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};
export default product;
