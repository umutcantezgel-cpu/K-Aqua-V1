/* Verlängerungsstück — Produktpaket. PROTOTYP (data.js), aber mit
   dem einen tabellierten Maß L = 30 als echtem Anker. */
import * as THREE from 'three';
import { createAssembly, meshVolume } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildHuelse, buildZapfen } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'valves/elongation-pieces',
  module: 'kaqua-elongation-pieces',
  titleDe: 'Verlängerungsstück',
  titleEn: 'Elongation pieces',
  category: 'valves',
  brandLine: 'K-Aqua Messing',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'L', defaultSize: '30',
  dimensionKey: DIMENSION_KEY, metaFields: ['L', 'kg'], dimensions: ['L'],
  ariaFields: ['L'], variants: [], states: null,
  tile: 'Verlängert das Unterputz-Oberteil um 30 mm — Hülse und ' +
        'Spindelzapfen, Durchmesser vorläufig.',

  build(size, variant, clipPlane) {
    const P = params();
    const A = createAssembly({
      name: 'K-Aqua_Verlaengerung', materials: ['brass'], seed: 197, clipPlane,
    });
    const huelse = buildHuelse(P);
    const zapfen = buildZapfen(P);
    zapfen.geo.translate(P.threadOD * 1.2, 0, 0);
    if (zapfen.cap) zapfen.cap.translate(P.threadOD * 1.2, 0, 0);
    A.part('huelse', { name: 'Huelse', label: 'Gewindehülse (Messing)', mat: 'brass',
      geo: huelse.geo, cap: huelse.cap, anchor: V3(P.threadOD * 0.4, P.L + 3, 0) });
    A.part('zapfen', { name: 'Zapfen', label: 'Spindelzapfen (Messing)', mat: 'brass',
      geo: zapfen.geo, cap: zapfen.cap, explode: V3(10, 0, 0) });
    A.light(V3(0, P.L * 0.5, 0)); A.light(V3(P.threadOD * 1.2, P.L * 0.5, 0));
    A.hotspot({ v: V3(0, P.L * 0.5, P.threadOD * 0.55), n: V3(0, 0, 1),
      text: 'Das eine Tabellenmaß: L = 30 mm Verlängerung' });
    A.dim({ label: 'L', value: P.L,
      a: V3(-P.threadOD * 0.8, 0, 0), b: V3(-P.threadOD * 0.8, P.L, 0),
      off: V3(-6, 0, 0) });

    A.measures = [
      /* Das EINZIGE Tabellenmaß — am Netz der Hülse. */
      { key: 'L', label: DIMENSION_KEY.L + ' (Tabellenmaß)', soll: P.L,
        ist: () => { const b = A.boxOf(['huelse']); return r2(b.max.y - b.min.y); } },
      { key: 'gewinde', label: 'G ¾" Außengewinde (Kuppe)', soll: r2(P.threadOD),
        ist: () => {
          let max = 0;
          for (let k = 0; k < 8; k++) {
            const y = 2 + P.threadPitch * (1.2 + k * 0.25);
            const hit = A.probeAxial('huelse', V3(0, y, P.threadOD), V3(0, 0, -1));
            if (hit) max = Math.max(max, 2 * hit.z);
          }
          return max ? r2(max) : NaN;
        } },
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
