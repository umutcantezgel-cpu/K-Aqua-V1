/* K-Aqua 3D · Verlängerungsstück — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID valves/elongation-pieces.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  SEG_INT, SEG_VIS, buildProfile, capFromProfile, createAssembly, materials, meshVolume, revolve, threadProfile, threadSpec,
} from '../kaqua-3d-core.mjs';

/* == elongation-pieces/data.js ========================================= */
/* K-Aqua Verlängerungsstück — PROTOTYP mit EINEM Tabellenmaß.

   QUELLE: Druckkatalog S. 106, unterste Tabelle: Code AQ599E, L 30,
   kg 0,05, Pack 1. Die Maßskizze bemaßt GENAU L — sonst nichts
   (LOOP-STATUS §3.22, Präzisierung). Das Foto zeigt ZWEI Messingteile:
   eine Gewindehülse (außen G-AG, innen IG — sie verlängert das
   UP-Ventiloberteil um L) und einen kleinen Stufenzapfen
   (Spindelverlängerung). Durchmesser sind ASSUMPTION am G-¾"-Anker;
   die kg-Spalte hält die Summe fest. */

export const DATA_STATUS = 'prototyp';
export const SIZES_SOURCE_VERIFIED = 1;
export const ARTICLES = [ { code: 'AQ599E', L: 30, kg: 0.05, pack: 1 } ];
export const SIZES = ['30'];
export const DIMENSION_KEY = { L: 'Verlängerung', kg: 'Gewicht' };
export function article() { return ARTICLES[0]; }


/* == elongation-pieces/params.js ======================================= */
export function params() {
  const a = article();
  const P = Object.assign({}, a);
  const th = threadSpec('3/4');        // ASSUMPTION: G ¾ wie die Oberteile daneben
  P.threadOD = th.od;
  P.threadPitch = th.pitch;
  P.turns = Math.max(5, Math.floor((a.L - 4) / th.pitch));
  P.huelseWand = 2.6;                  // ASSUMPTION, Massenanker
  P.zapfenR = 4.2;                     // ASSUMPTION Spindelmaß
  P.zapfenL = a.L + 8;
  return P;
}


/* == elongation-pieces/parts.js ======================================== */
/* Zwei Drehteile, beide um Y. */

export function buildHuelse(P) {
  const gew = threadProfile(P.threadOD, P.threadPitch, P.turns, 'G')
    .map((q) => ({ a: 2 + q.a, r: q.r, fillet: q.fillet }))
    .filter((q) => q.a <= P.L - 1);
  const rIn = P.threadOD / 2 - P.huelseWand;
  const profile = buildProfile([
    { a: 0, r: P.threadOD / 2 - 0.8, chamfer: 0.5 },
    ...gew,
    { a: P.L, r: P.threadOD / 2 - 0.5, chamfer: 0.6 },
    { a: P.L, r: rIn, chamfer: 0.4 },
    { a: P.L / 2, r: rIn, fillet: 0 },
    { a: 0, r: rIn, fillet: 0 },
  ], { segs: 4 });
  return { geo: revolve(profile, { axis: 'y', segments: SEG_VIS }),
           cap: capFromProfile(profile, 'y') };
}

export function buildZapfen(P) {
  const r = P.zapfenR;
  const profile = buildProfile([
    { a: 0, r: r * 0.7, chamfer: 0.4 },
    { a: 3, r: r * 0.7, fillet: 0.3 },
    { a: 3, r: r, fillet: 0.3 },
    { a: P.zapfenL - 4, r: r, fillet: 0.3 },
    { a: P.zapfenL - 4, r: r * 0.78, fillet: 0.3 },
    { a: P.zapfenL, r: r * 0.78, chamfer: 0.5 },
    { a: P.zapfenL, r: 0.02, fillet: 0 },
    { a: 0, r: 0.02, fillet: 0 },
  ], { segs: 3 });
  return { geo: revolve(profile, { axis: 'y', segments: SEG_INT }),
           cap: capFromProfile(profile, 'y') };
}


/* == elongation-pieces/index.js ======================================== */
/* Verlängerungsstück — Produktpaket. PROTOTYP (data.js), aber mit
   dem einen tabellierten Maß L = 30 als echtem Anker. */

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
export { product as default };
