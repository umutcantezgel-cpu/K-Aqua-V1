/* K-Aqua 3D · Reparaturstopfen — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID tools/repairing-plug.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  SEG_VIS, buildProfile, capFromProfile, createAssembly, materials, revolve,
} from '../kaqua-3d-core.mjs';

/* == repairing-plug/data.js ============================================ */
/* K-Aqua Reparaturstopfen — PROTOTYP.
   QUELLE: S. 116: Code AQ5937/AQ59311, d 7/11, Pack 1 — sonst nichts.
   Das Katalogbild (Kontaktbogen s116-04) zeigt einen LANGEN GRÜNEN
   KEGELSTAB — nicht den Pilz mit Innensechskant, den die Visuelle
   Referenz §4.1 beschrieb (dort berichtigt). Der Stab wird in die
   Leckbohrung geschweißt und abgeschnitten. Länge ASSUMPTION. */
export const DATA_STATUS = 'prototyp';
export const ARTICLES = [
  { key: '7', code: 'AQ5937', d: 7, pack: 1 },
  { key: '11', code: 'AQ59311', d: 11, pack: 1 },
];
export const SIZES = ARTICLES.map((a) => a.key);
export const DIMENSION_KEY = { d: 'Stopfen-Ø' };
export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua Reparaturstopfen: unbekannte Größe ' + key);
  return a;
}


/* == repairing-plug/params.js ========================================== */
export function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);
  P.len = Math.max(90, a.d * 11);      // ASSUMPTION aus dem Bildverhältnis
  P.spitzL = a.d * 2.2;
  return P;
}


/* == repairing-plug/parts.js =========================================== */
export function buildStab(P) {
  const r = P.d / 2;
  const profile = buildProfile([
    { a: 0, r: r * 0.96, chamfer: 0.4 },
    { a: P.len - P.spitzL, r: r, fillet: 0.4 },
    { a: P.len - P.spitzL * 0.3, r: r * 0.45, fillet: 1.2 },
    { a: P.len, r: 0.25, fillet: 0.3 },
    { a: P.len, r: 0.02, fillet: 0 },
    { a: 0, r: 0.02, fillet: 0 },
  ], { segs: 4 });
  return { geo: revolve(profile, { axis: 'y', segments: SEG_VIS }),
           cap: capFromProfile(profile, 'y') };
}


/* == repairing-plug/index.js =========================================== */
/* Reparaturstopfen — Produktpaket. PROTOTYP (data.js). */

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'tools/repairing-plug',
  module: 'kaqua-repairing-plug',
  titleDe: 'Reparaturstopfen',
  titleEn: 'Repairing plug',
  category: 'tools',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'key',
  sizeLabel: (k) => 'd' + k,
  defaultSize: '7',
  dimensionKey: DIMENSION_KEY, metaFields: ['d'], dimensions: [],
  ariaFields: ['d'], variants: [], states: null,
  tile: 'PP-R-Kegelstab zum Einschweißen in die Leckbohrung — Länge ' +
        'vorläufig, Durchmesser aus der Tabelle.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Reparaturstopfen', materials: ['pprGreen'], seed: 227, clipPlane,
    });
    const stab = buildStab(P);
    A.part('stab', { name: 'Stab', label: 'Reparaturstab (PP-R)', mat: 'pprGreen',
      geo: stab.geo, cap: stab.cap, anchor: V3(P.d, P.len * 0.6, 0) });
    A.light(V3(0, P.len * 0.4, 0)); A.light(V3(0, P.len * 0.9, 0));

    A.measures = [
      /* Das eine Tabellenmaß: der Stabdurchmesser. */
      { key: 'd', label: 'Stab-Ø (Tabellenmaß)', soll: P.d,
        ist: () => {
          const hit = A.probeAxial('stab', V3(0, P.len * 0.4, P.d), V3(0, 0, -1));
          return hit ? r2(2 * hit.z) : NaN;
        } },
      { key: 'len', label: 'Länge (ASSUMPTION)', soll: P.len,
        ist: () => { const b = A.boxOf(); return r2(b.max.y - b.min.y); } },
    ];
    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};
export { product as default };
