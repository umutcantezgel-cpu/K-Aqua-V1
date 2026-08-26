/* Geradsitzventil-Oberteil — Produktpaket. PROTOTYP (data.js). */
import * as THREE from 'three';
import { createAssembly, meshVolume } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildOberteil, buildTellerDichtung, buildKleeHandrad } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'valves/straight-seat-valve-green-handle',
  module: 'kaqua-straight-seat-valve-green-handle',
  titleDe: 'Geradsitzventil-Oberteil (grünes Handrad)',
  titleEn: 'Straight seat valve (only upper part)',
  category: 'valves',
  brandLine: 'K-Aqua Messing · PP',
  dataStatus: DATA_STATUS,
  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'G',
  defaultSize: '3/4',
  dimensionKey: DIMENSION_KEY,
  metaFields: ['G', 'kg'],
  dimensions: [],
  ariaFields: ['G'],
  variants: [],
  states: null,
  tile: 'Ventiloberteil mit Spindel und grünem Handrad — Maße vorläufig, ' +
        'aus Foto und Gewicht abgeleitet.',

  build(size, variant, clipPlane) {
    const P = params();
    const A = createAssembly({
      name: 'K-Aqua_Geradsitz_Oberteil',
      materials: ['brass', 'epdm', 'pprGreen'],
      seed: 191,
      clipPlane,
    });
    const ober = buildOberteil(P);
    const dicht = buildTellerDichtung(P);
    const rad = buildKleeHandrad(P);
    A.part('oberteil', { name: 'Oberteil', label: 'Ventiloberteil (Messing)', mat: 'brass',
      geo: ober.geo, cap: ober.cap, anchor: V3(P.hexAf * 0.4, P.yG1, 0) });
    A.part('dichtung', { name: 'Dichtung', label: 'Tellerdichtung (EPDM)', mat: 'epdm',
      geo: dicht.geo, cap: dicht.cap, explode: V3(0, -14, 0) });
    A.part('handrad', { name: 'Handrad', label: 'Handrad (PP, grün)', mat: 'pprGreen',
      geo: rad.geo, cap: rad.cap, explode: V3(0, 18, 0),
      anchor: V3(P.radR * 0.5, P.radY + P.radDicke + 3, 0) });
    A.light(V3(0, P.radY * 0.5, 0)); A.light(V3(0, -8, 0));
    A.hotspot({ v: V3(0, P.radY + P.radDicke / 2, P.radR * 0.8), n: V3(0, 0.3, 0.95),
      text: 'Mehrgängiges Handrad — Hubventil, keine Vierteldrehung' });

    A.measures = [
      /* Der einzige Normanker: das G-Gewinde, per Strahl auf die Kuppe. */
      /* G ist zylindrisch (kein 1:16-Kegel wie R); der Strahl fährt
         mehrere Stationen ab und nimmt das Maximum — die Kuppenlage von
         threadProfile ist nicht phasenstarr zum Fenster (der erste
         Wurf traf den GRUND und las 2·Gewindetiefe zu wenig). */
      { key: 'gewinde', label: 'G ' + P.G + '" Außengewinde (Kuppe)',
        soll: r2(P.threadOD),
        ist: () => {
          let max = 0;
          for (let k = 0; k < 8; k++) {
            const y = P.yG0 + P.threadPitch * (1.2 + k * 0.25);
            const hit = A.probeAxial('oberteil', V3(0, y, P.threadOD), V3(0, 0, -1));
            if (hit) max = Math.max(max, 2 * hit.z);
          }
          return max ? r2(max) : NaN;
        } },
      { key: 'handrad', label: 'Handrad-Ø (ASSUMPTION)', soll: 2 * P.radR,
        ist: () => { const b = A.boxOf(['handrad']); return r2(b.max.x - b.min.x); } },
      { key: 'hoehe', label: 'Bauhöhe (ASSUMPTION)', soll: r2(P.radY + P.radDicke + 2.5 - (P.yTeller - P.dichtH)),
        ist: () => { const b = A.boxOf(); return r2(b.max.y - b.min.y); } },
      { key: 'masse', label: 'Masse aus dem Volumen (Anker: kg-Spalte)', soll: P.kg,
        ist: () => {
          let g = 0;
          for (const t of A.parts) {
            const dichte = /Messing/.test(t.label) ? 8.4 : /EPDM/.test(t.label) ? 1.2 : 0.9;
            let v = 0; t.obj.traverse((o) => { if (o.isMesh) v += meshVolume(o.geometry); });
            g += (v * dichte) / 1e6;
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
