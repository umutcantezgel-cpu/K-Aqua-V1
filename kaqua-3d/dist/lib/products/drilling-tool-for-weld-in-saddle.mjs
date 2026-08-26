/* K-Aqua 3D · Anbohrwerkzeug für Einschweißsättel — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID tools/drilling-tool-for-weld-in-saddle.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  SEG_VIS, buildProfile, capFromProfile, createAssembly, grooveMod, materials, revolve, thetaSamples,
} from '../kaqua-3d-core.mjs';

/* == drilling-tool-for-weld-in-saddle/data.js ========================== */
/* K-Aqua Anbohrwerkzeug für Sättel — PROTOTYP.
   QUELLE: S. 116: nur Code (AQ98625…63), Nennweite, Pack. Alle
   Formmaße ASSUMPTION; Anker ist die Nennweite (Fräser bohrt die
   Abzweigöffnung, Ø ≈ Abzweig-Bohrung). */
export const DATA_STATUS = 'prototyp';
export const ARTICLES = [25, 32, 40, 50, 63].map((d) => ({ key: String(d), code: 'AQ986' + d, d, pack: 1 }));
export const SIZES = ARTICLES.map((a) => a.key);
export const DIMENSION_KEY = { d: 'Nennweite' };
export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua Anbohrwerkzeug: unbekannte Größe ' + key);
  return a;
}


/* == drilling-tool-for-weld-in-saddle/params.js ======================== */
export function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);
  P.fraeserR = a.d * 0.5 * 0.66;       // ASSUMPTION: bohrt die Kernöffnung
  P.fraeserH = Math.max(16, a.d * 0.6);
  P.schaftR = 4;                        // ASSUMPTION Aufnahme
  P.schaftL = 40;
  P.nuten = 2;
  return P;
}


/* == drilling-tool-for-weld-in-saddle/parts.js ========================= */
/* Fräskopf mit zwei Längsnuten (Spanraum, angedeutet) + Schaft. */
export function buildFraeser(P) {
  /* Flache angedeutete Spannuten — der erste Wurf (Tiefe 0,42·R) war
     ein halber Ausschnitt, und der Kopf-Strahl las die Nut. */
  const mod = grooveMod(P.nuten, P.fraeserR * 0.30, P.fraeserR * 0.16, P.fraeserR);
  /* Viele Samples zwischen den Nuten: mit 9 lag kein Punkt nahe dem
     Scheitel, und die Kopf-Box las die Sekante — wachsend mit der
     Größe, die Handschrift der Segmentierung (Fall 27). */
  const thetas = thetaSamples(P.nuten, mod.halfAng, 7, 48);
  const profile = buildProfile([
    { a: -P.schaftL, r: P.schaftR, chamfer: 0.6, w: 0 },
    { a: 0, r: P.schaftR, fillet: 0.5, w: 0 },
    { a: 0, r: P.fraeserR, chamfer: 0.6, w: 1 },
    /* Netzpunkt auf halber Kopfhöhe — ohne ihn ist das Messband auf
       der geraden Mantelstrecke leer (die Regel, zum wiederholten
       Mal). */
    { a: P.fraeserH * 0.5, r: P.fraeserR, fillet: 0, w: 1 },
    { a: P.fraeserH - 1.2, r: P.fraeserR, fillet: 0.4, w: 1 },
    { a: P.fraeserH, r: P.fraeserR - 1.2, chamfer: 0.8, w: 0 },
    { a: P.fraeserH, r: 0.02, fillet: 0, w: 0 },
    { a: -P.schaftL, r: 0.02, fillet: 0, w: 0 },
  ], { segs: 4 });
  const geo = revolve(profile, { axis: 'y', thetas, mod });
  return { geo, cap: capFromProfile(profile, 'y') };
}


/* == drilling-tool-for-weld-in-saddle/index.js ========================= */
/* Anbohrwerkzeug — Produktpaket. PROTOTYP (data.js). */

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
export { product as default };
