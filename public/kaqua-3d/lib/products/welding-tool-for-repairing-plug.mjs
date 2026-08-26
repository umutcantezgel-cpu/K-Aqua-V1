/* K-Aqua 3D · Schweißwerkzeug für Reparaturstopfen — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID tools/welding-tool-for-repairing-plug.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  SEG_INT, SEG_VIS, buildProfile, capFromProfile, createAssembly, materials, mergeGeometries, revolve,
} from '../kaqua-3d-core.mjs';

/* == welding-tool-for-repairing-plug/data.js =========================== */
/* K-Aqua Schweißwerkzeug für Reparaturstopfen — PROTOTYP.
   QUELLE: S. 116: Code AQ9837/AQ98311, d 7/11, Pack 1 — sonst nichts.
   Formmaße ASSUMPTION; Anker ist der Stopfendurchmesser d. */
export const DATA_STATUS = 'prototyp';
export const ARTICLES = [
  { key: '7', code: 'AQ9837', d: 7, pack: 1 },
  { key: '11', code: 'AQ98311', d: 11, pack: 1 },
];
export const SIZES = ARTICLES.map((a) => a.key);
export const DIMENSION_KEY = { d: 'Stopfen-Ø' };
export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua Reparaturwerkzeug: unbekannte Größe ' + key);
  return a;
}


/* == welding-tool-for-repairing-plug/params.js ========================= */
export function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);
  P.kopfR = a.d / 2 + 2.5;             // ASSUMPTION Heizkopf um den Stopfen
  P.kopfH = Math.max(10, a.d * 1.6);
  P.schaftR = 3.2;
  P.schaftL = 55;
  P.kragenR = P.kopfR + 2;             // gelber Isolierring im Render
  return P;
}


/* == welding-tool-for-repairing-plug/parts.js ========================== */
/* Zwei Heizköpfe koaxial am Schaft (Bohrkopf für die Leckstelle,
   Muffenkopf für den Stopfen), dazwischen ein Isolierkragen. */
export function buildWerkzeug(P) {
  const profile = buildProfile([
    { a: -P.schaftL, r: P.schaftR, chamfer: 0.5 },
    { a: -6, r: P.schaftR, fillet: 0.4 },
    { a: -6, r: P.kragenR, chamfer: 0.6 },
    { a: 0, r: P.kragenR, fillet: 0.5 },
    { a: 0, r: P.kopfR, fillet: 0.4 },
    { a: P.kopfH, r: P.kopfR, chamfer: 0.8 },
    { a: P.kopfH, r: P.d / 2, fillet: 0.4 },
    { a: P.kopfH + P.d * 1.1, r: P.d / 2, chamfer: 0.6 },
    { a: P.kopfH + P.d * 1.1, r: 0.02, fillet: 0 },
    { a: -P.schaftL, r: 0.02, fillet: 0 },
  ], { segs: 4 });
  return { geo: revolve(profile, { axis: 'y', segments: SEG_VIS }),
           cap: capFromProfile(profile, 'y') };
}


/* == welding-tool-for-repairing-plug/index.js ========================== */
/* Schweißwerkzeug für Reparaturstopfen — Produktpaket. PROTOTYP. */

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'tools/welding-tool-for-repairing-plug',
  module: 'kaqua-welding-tool-for-repairing-plug',
  titleDe: 'Schweißwerkzeug für Reparaturstopfen',
  titleEn: 'Welding tool for repairing plug',
  category: 'tools',
  brandLine: 'K-Aqua Werkzeug',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'key',
  sizeLabel: (k) => 'd' + k,
  defaultSize: '7',
  dimensionKey: DIMENSION_KEY, metaFields: ['d'], dimensions: [],
  ariaFields: ['d'], variants: [], states: null,
  tile: 'Heizt Leckbohrung und Stopfen in einem Zug an — Maße vorläufig.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Reparaturwerkzeug', materials: ['steel'], seed: 223, clipPlane,
    });
    const w = buildWerkzeug(P);
    A.part('werkzeug', { name: 'Werkzeug', label: 'Heizwerkzeug (Stahl)', mat: 'steel',
      geo: w.geo, cap: w.cap, anchor: V3(P.kopfR + 3, P.kopfH * 0.5, 0) });
    A.light(V3(0, P.kopfH, 0)); A.light(V3(0, -P.schaftL * 0.5, 0));

    A.measures = [
      { key: 'stift', label: 'Heizstift-Ø (= Stopfen d)', soll: P.d,
        ist: () => {
          const hit = A.probeAxial('werkzeug', V3(0, P.kopfH + P.d * 0.5, P.d * 2), V3(0, 0, -1));
          return hit ? r2(2 * hit.z) : NaN;
        } },
      { key: 'kopf', label: 'Heizkopf-Ø (ASSUMPTION d + 5)', soll: r2(2 * P.kopfR),
        ist: () => {
          const hit = A.probeAxial('werkzeug', V3(0, P.kopfH * 0.5, P.d * 3), V3(0, 0, -1));
          return hit ? r2(2 * hit.z) : NaN;
        } },
    ];
    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};
export { product as default };
