/* Unterputzventil-Oberteil (schwere Ausführung) — Produktpaket. PROTOTYP (data.js). */
import * as THREE from 'three';
import { createAssembly, meshVolume } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildChromKnauf, buildUPUnterteil } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'valves/concealed-valve-chrome-heavy-part',
  module: 'kaqua-concealed-valve-chrome-heavy-part',
  titleDe: 'Unterputzventil-Oberteil (schwere Ausführung)',
  titleEn: 'Concealed valve (only upper part) chrome heavy part',
  category: 'valves',
  brandLine: 'K-Aqua Messing verchromt',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'G', defaultSize: '3/4',
  dimensionKey: DIMENSION_KEY, metaFields: ['G', 'kg'], dimensions: [],
  ariaFields: ['G'], variants: [], states: null,
  tile: 'Sichtbares Oberteil des Unterputzventils — Maße vorläufig, aus ' +
        'Foto und Gewicht abgeleitet.',

  build(size, variant, clipPlane) {
    const P = params();
    const A = createAssembly({
      name: 'K-Aqua_UP_AQ5993', materials: ['chrome', 'brass'], seed: 193, clipPlane,
    });
    const knauf = buildChromKnauf(P);
    const unten = buildUPUnterteil(P);
    A.part('knauf', { name: 'Knauf', label: 'Knauf mit Rosette (Messing verchromt)', mat: 'chrome',
      geo: knauf.geo, cap: knauf.cap, anchor: V3(P.knaufR * 0.6, P.rosH + P.knaufH * 0.7, 0) });
    A.part('unterteil', { name: 'Unterteil', label: 'Gewindeansatz (Messing)', mat: 'brass',
      geo: unten.geo, cap: unten.cap, explode: V3(0, -16, 0) });
    A.light(V3(0, P.knaufH * 0.5, 0)); A.light(V3(0, P.yU0 * 0.5, 0));
    A.hotspot({ v: V3(0, P.rosH + P.knaufH * 0.6, P.knaufR * 0.9), n: V3(0, 0.2, 0.98),
      text: 'Verchromtes Sichtteil — der Einbaukörper sitzt in der Wand' });

    A.measures = [
      { key: 'gewinde', label: 'G ' + P.G + '\" Außengewinde (Kuppe)', soll: r2(P.threadOD),
        ist: () => {
          let max = 0;
          for (let k = 0; k < 8; k++) {
            const y = P.yU0 + P.threadPitch * (1.2 + k * 0.25);
            const hit = A.probeAxial('unterteil', V3(0, y, P.threadOD), V3(0, 0, -1));
            if (hit) max = Math.max(max, 2 * hit.z);
          }
          return max ? r2(max) : NaN;
        } },
      { key: 'rosette', label: 'Rosetten-Ø (ASSUMPTION)', soll: 2 * P.rosR,
        ist: () => { const b = A.boxOf(['knauf']); return r2(b.max.x - b.min.x); } },
      { key: 'hoehe', label: 'Bauhöhe (ASSUMPTION)', soll: r2(P.rosH + P.knaufH - P.yU0),
        ist: () => { const b = A.boxOf(); return r2(b.max.y - b.min.y); } },
      { key: 'masse', label: 'Masse aus dem Volumen (Anker: kg-Spalte)', soll: P.kg,
        ist: () => {
          let g = 0;
          for (const t of A.parts) {
            let v = 0; t.obj.traverse((o) => { if (o.isMesh) v += meshVolume(o.geometry); });
            g += (v * 8.4) / 1e6;
          }
          return r2(g);
        } },
    ];
    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};
export default product;
