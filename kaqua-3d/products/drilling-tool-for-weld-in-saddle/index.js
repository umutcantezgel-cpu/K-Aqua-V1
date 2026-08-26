/* Anbohrwerkzeug — Produktpaket. PROTOTYP (data.js). */
import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildFraeser } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'tools/drilling-tool-for-weld-in-saddle',
  module: 'kaqua-drilling-tool-for-weld-in-saddle',
  titleDe: 'Anbohrwerkzeug für Einschweißsättel',
  titleEn: 'Drilling tool for weld in saddle',
  category: 'tools',
  brandLine: 'K-Aqua Werkzeug',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'key',
  sizeLabel: (k) => 'd' + k,
  defaultSize: '32',
  dimensionKey: DIMENSION_KEY, metaFields: ['d'], dimensions: [],
  ariaFields: ['d'], variants: [], states: null,
  tile: 'Bohrt die Abzweigöffnung durch den geschweißten Sattel — ' +
        'Maße vorläufig.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Anbohrwerkzeug', materials: ['steel'], seed: 211, clipPlane,
    });
    const f = buildFraeser(P);
    A.part('fraeser', { name: 'Fraeser', label: 'Fräskopf mit Schaft (Stahl)', mat: 'steel',
      geo: f.geo, cap: f.cap, anchor: V3(P.fraeserR + 3, P.fraeserH * 0.6, 0) });
    A.light(V3(0, P.fraeserH, 0)); A.light(V3(0, -P.schaftL * 0.5, 0));

    A.measures = [
      /* Box statt Einzelstrahl: die Rücken tragen den Nenn-Ø, ein
         Strahl kann eine Nut treffen. */
      { key: 'kopf', label: 'Fräskopf-Ø (ASSUMPTION 0,66·d)', soll: r2(2 * P.fraeserR),
        /* x-Spanne: die Nuten liegen auf ±z, die Rücken auf ±x — die
           z-Spanne las die Nutrandsekante. */
        ist: () => { const b = A.boxOf(['fraeser']); return r2(b.max.x - b.min.x); } },
      /* Nut-Gegenprobe am Min (Max ist für Nuten blind — Lehre P1). */
      /* Nut-Gegenprobe am Teilnetz (Traverse wie bei P1 — A.geos ist
         hier nicht der verlässliche Griff). */
      { key: 'nut', label: 'Spannut-Tiefe', soll: r2(P.fraeserR * 0.16),
        ist: () => {
          const obj = A.parts.find((t) => t.id === 'fraeser').obj;
          let mx = 0, mn = Infinity;
          obj.traverse((o) => {
            if (!o.isMesh) return;
            const g = o.geometry.attributes.position;
            for (let i = 0; i < g.count; i++) {
              const y = g.getY(i); if (y < 2 || y > P.fraeserH - 2.5) continue;
              const r = Math.hypot(g.getX(i), g.getZ(i));
              if (r < P.fraeserR * 0.7) continue;
              if (r > mx) mx = r; if (r < mn) mn = r;
            }
          });
          return isFinite(mn) ? r2(mx - mn) : NaN;
        } },
    ];
    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};
export default product;
