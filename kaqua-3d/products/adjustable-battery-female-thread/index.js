/* K-Aqua Verstellbarer Batterieanschluss IG — Produktpaket.

   Zwei antiparallele Schlitten; die Stellung des Anschlussabstands L
   (100 · 135 · 150 aus der Tabelle) ist die Variantenachse. Beim
   Zusammenschieben schrumpft die Gesamtlänge mit — L1 = 230 gilt bei
   der weitesten Stellung (ASSUMPTION, in data.js begründet). */

import * as THREE from 'three';
import { createAssembly, mergeGeometries } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildSchlitten, buildBockRing } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

function netzVolumen(geo) {
  const p = geo.attributes.position.array;
  const idx = geo.index ? geo.index.array : null;
  const n = idx ? idx.length : p.length / 3;
  let v = 0;
  for (let i = 0; i < n; i += 3) {
    const a = (idx ? idx[i] : i) * 3;
    const b = (idx ? idx[i + 1] : i + 1) * 3;
    const c = (idx ? idx[i + 2] : i + 2) * 3;
    v += (
      p[a] * (p[b + 1] * p[c + 2] - p[b + 2] * p[c + 1])
      - p[a + 1] * (p[b] * p[c + 2] - p[b + 2] * p[c])
      + p[a + 2] * (p[b] * p[c + 1] - p[b + 1] * p[c])
    ) / 6;
  }
  return Math.abs(v);
}

const product = {
  id: 'valves/adjustable-battery-female-thread',
  module: 'kaqua-adjustable-battery-female-thread',
  titleDe: 'Verstellbarer Batterieanschluss mit Innengewinde',
  titleEn: 'Adjustable battery (Female thread)',
  category: 'valves',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 20,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'Rp', 'L1', 'kg'],
  dimensions: ['L', 'L1'],
  ariaFields: ['d', 'Rp', 'L1'],

  variants: [],
  /* Die Verstellung ist ein ZUSTAND, kein Größenwechsel: der Viewer
     schiebt die Schlitten kontinuierlich zwischen L = 150 (Tabellen-
     stellung, in der gemessen wird) und L = 100. Erster Nutzer der
     states-Mechanik außerhalb des Kugelhahns. */
  states: {
    open:   { short: 'L = 150', note: 'weiteste Stellung — das Tabellenmaß', action: 'Ausziehen' },
    closed: { short: 'L = 100', note: 'engste Stellung', action: 'Zusammenschieben' },
    pickPart: 'schlittenA',
    pickHint: 'Klick auf einen Schlitten verstellt',
  },

  tile: 'Zwei Schlitten, gegeneinander verschiebbar — der ' +
        'Anschlussabstand stellt sich von 100 bis 150 mm.',

  build(size, variant, clipPlane) {
    const P = params(size, 150);
    const A = createAssembly({
      name: 'K-Aqua_Batterie_verstellbar_d' + size,
      materials: ['pprGreen', 'brass'],
      seed: 187,
      clipPlane,
    });

    /* Der Bock sitzt FIX auf seinem Schlitten: sein Abstand vom
       Muffenmund ist (L1 − Lmax)/2 = 40 mm, unabhängig von der
       Stellung — nur die Überlappung der Schienen wandert. Die
       Schlittenlänge trägt bei Lmax eine Überlappreserve von 30 mm
       (ASSUMPTION; ohne Reserve fiele das Teleskop bei 150 auseinander). */
    const xBock = (P.L1 - P.Lmax) / 2;
    /* Schlittenlänge: das Foto zeigt die Rohre fast durchlaufend — die
       Schiene endet kurz vor der GEGENÜBERLIEGENDEN Muffe (ASSUMPTION
       aus dem Foto; die erste Annahme „halbe Länge plus Reserve" wog
       −29 % gegen die kg-Spalte). */
    const schlittenLen = P.L1 - P.muffH - 6;
    const ab = P.schienenAbstand / 2;

    const s1 = buildSchlitten(P, schlittenLen, xBock);
    const ring1 = buildBockRing(P, s1.zTop);
    ring1.geo.translate(xBock, 0, 0);
    if (ring1.cap) ring1.cap.translate(xBock, 0, 0);
    /* Schlitten A: Mund links. */
    for (const g of [s1.geo, s1.cap, ring1.geo, ring1.cap]) {
      if (g) { g.translate(-P.xEnd, ab, 0); }
    }

    const s2 = buildSchlitten(P, schlittenLen, xBock);
    const ring2 = buildBockRing(P, s2.zTop);
    ring2.geo.translate(xBock, 0, 0);
    if (ring2.cap) ring2.cap.translate(xBock, 0, 0);
    /* Schlitten B: um Y gespiegelt (Mund rechts), Bock bleibt vorn. */
    for (const g of [s2.geo, s2.cap, ring2.geo, ring2.cap]) {
      if (g) { g.rotateZ(Math.PI); g.translate(P.xEnd, -ab, 0); }
    }

    A.part('schlittenA', {
      name: 'SchlittenA', label: 'Schlitten mit Anschlussbock (PP-R)', mat: 'pprGreen',
      geo: s1.geo, cap: s1.cap,
      explode: V3(-0.22 * P.len, 0, 0),
      anchor: V3(-P.xEnd + 8, ab + P.rSock + 14, 0),
    });
    A.part('schlittenB', {
      name: 'SchlittenB', label: 'Schlitten mit Anschlussbock (PP-R)', mat: 'pprGreenB',
      geo: s2.geo, cap: s2.cap,
      explode: V3(0.22 * P.len, 0, 0),
    });
    A.part('ringA', {
      name: 'MessingringA', label: 'Messingring Rp' + P.Rp + '"', mat: 'brass',
      geo: ring1.geo, cap: ring1.cap,
      explode: V3(0, 0, 0.35 * P.len),
      anchor: V3(-P.xAchse, ab - P.rBlock - 10, s1.zTop),
    });
    A.part('ringB', {
      name: 'MessingringB', label: 'Messingring Rp' + P.Rp + '"', mat: 'brass',
      geo: ring2.geo, cap: ring2.cap,
      explode: V3(0, 0, 0.5 * P.len),
    });

    A.light(V3(-P.xAchse, ab, 0));
    A.light(V3(P.xAchse, -ab, 0));

    A.hotspot({
      v: V3(0, 0, P.rohrOD * 0.5),
      n: V3(0, 0, 1),
      text: 'Die Schienen überlappen in der Mitte — Verschieben stellt L ' +
        'zwischen ' + P.Lmin + ' und ' + P.Lmax + ' mm',
    });
    A.hotspot({
      v: V3(P.xAchse, -ab, s2.zTop),
      n: V3(0, 0, 1),
      text: 'Rp ' + P.Rp + '" im Sechskantkopf — die Griffzone zum Kontern ' +
        'beim Anschluss der Armatur',
    });

    const yD = -(ab + P.rSock + 12);
    A.dim({ label: 'L', value: P.L,
      a: V3(-P.xAchse, yD, P.rBlock), b: V3(P.xAchse, yD, P.rBlock),
      off: V3(0, -8, 0) });
    A.dim({ label: 'L1', value: P.len,
      a: V3(-P.xEnd, yD - 14, P.rBlock), b: V3(P.xEnd, yD - 14, P.rBlock),
      off: V3(0, -8, 0) });

    A.measures = [
      { key: 'L', label: DIMENSION_KEY.L + ' (Stellung L = 150)', soll: P.L,
        ist: () => {
          const a = A.boxOf(['ringA']), b = A.boxOf(['ringB']);
          return r2(((b.min.x + b.max.x) / 2) - ((a.min.x + a.max.x) / 2));
        } },
      /* L1 hat nur bei L = 150 einen Tabellenanker; in den anderen
         Stellungen ist das Soll die konstruktive Gesamtlänge aus
         Mundabstand und Schienenüberstand (data.js). */
      { key: 'L1', label: DIMENSION_KEY.L1 + ' (Tabellenmaß bei L = 150)',
        /* Das Schienenende liegt im Profil 0,8 mm vor der Nennlänge
           (Stirnfase) — der Überstand rechnet damit. */
        soll: r2(Math.max(2 * P.xEnd, 2 * (schlittenLen - 0.8 - P.xEnd))),
        ist: () => { const b = A.boxOf(); return r2(b.max.x - b.min.x); } },
      /* Sechskant-Gegenprobe per STRAHL — die Mantelflächen von
         hexPrism sind punktlose Quads, eine Punktabtastung sieht nur
         die Eckenzonen (so kam im ersten Wurf 1,0 heraus). Nach der
         Drehung liegt die Schlüsselfläche auf ±X, die Ecke auf ±Y. */
      { key: 'sw', label: 'Schlüsselweite der Griffzone', soll: P.afBlock,
        ist: () => {
          const xW = -P.xEnd + xBock, zM = (s1.zTop - 3);
          const hit = A.probeAxial('schlittenA', V3(xW - P.blockOD, ab, zM), V3(1, 0, 0));
          return hit ? r2(2 * Math.abs(hit.x - xW)) : NaN;
        } },
      /* …und der Eckenstrahl MUSS das größere Eckenmaß liefern
         (Fall 25): käme wieder SW heraus, wäre der Kopf ein Zylinder. */
      { key: 'sw_ecke', label: 'Eckenmaß der Griffzone', soll: r2(2 * (P.afBlock / Math.sqrt(3))),
        ist: () => {
          const xW = -P.xEnd + xBock, zM = (s1.zTop - 3);
          const hit = A.probeAxial('schlittenA', V3(xW, ab + P.blockOD, zM), V3(0, -1, 0));
          return hit ? r2(2 * Math.abs(hit.y - ab)) : NaN;
        } },
      { key: 'kern', label: 'Rp-Kerndurchmesser', soll: P.threadCore,
        ist: () => {
          const arr = ring1.geo.attributes.position.array;
          const z0 = s1.zTop - P.ringLen + 1.0 + P.threadPitch * 0.6;
          const z1 = z0 + P.threadPitch * 1.8;
          let min = Infinity;
          for (let i = 0; i < arr.length; i += 3) {
            const z = arr[i + 2];
            if (z < z0 || z > z1) continue;
            const r = Math.hypot(arr[i] + P.xEnd - xBock, arr[i + 1] - ab);
            if (r < min) min = r;
          }
          return isFinite(min) ? r2(2 * min) : NaN;
        } },
      { key: 'masse', label: 'Masse aus dem Volumen (PP 0,9 · CuZn 8,4)', soll: P.kg,
        ist: () => {
          let g = 0;
          for (const t of A.parts) {
            const dichte = /Messing/i.test(t.label || '') ? 8.4 : 0.9;
            let v = 0;
            t.obj.traverse((o) => { if (o.isMesh) v += netzVolumen(o.geometry); });
            g += (v * dichte) / 1e6;
          }
          return r2(g);
        } },
    ];

    /* ── Zustand: Teleskopweg 150 → 100 ── */
    const pA = A.parts.find((t) => t.id === 'schlittenA').obj;
    const pB = A.parts.find((t) => t.id === 'schlittenB').obj;
    const rA = A.parts.find((t) => t.id === 'ringA').obj;
    const rB = A.parts.find((t) => t.id === 'ringB').obj;
    A.setOpen = (t) => {
      const dx = (P.Lmax - (P.Lmin + (P.Lmax - P.Lmin) * t)) / 2;
      pA.position.x = dx;  rA.position.x = dx;
      pB.position.x = -dx; rB.position.x = -dx;
    };
    A.setOpen(1);

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
