/* K-Aqua Batterieanschluss mit Innengewinde — Produktpaket.

   Ein H-förmiges, einteiliges Spritzgussteil: zwei Winkelblöcke
   (Schweißmuffe oben, Rp-Anschluss vorn) auf einem verrippten Flachsteg
   mit zwei Montagelöchern. L = 150 ist der Standard-Armaturenabstand;
   die Blockdicke ist über L1 − L = D(½") belegt (data.js).

   Die Massenprobe ist hier die schärfste Zusicherung: das Teil wiegt
   laut Katalog 0,18/0,19 kg, und die beiden Messingringe (8,4 g/cm³)
   tragen davon etwa die Hälfte — eine falsche Ringgröße oder ein
   falscher Steg fliegt sofort auf. */

import * as THREE from 'three';
import { createAssembly, mergeGeometries, meshVolume } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildWinkelblock, buildBatterieRing, buildSteg } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;


const product = {
  id: 'valves/battery-female-thread',
  module: 'kaqua-battery-female-thread',
  titleDe: 'Batterieanschluss mit Innengewinde',
  titleEn: 'Battery (Female thread)',
  category: 'valves',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 20,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'Rp', 'L', 'L1', 'kg'],
  dimensions: ['L', 'L1'],
  ariaFields: ['d', 'Rp', 'L', 'L1'],

  variants: [],
  states: null,

  tile: 'Zwei Rp-Anschlüsse im Standardabstand 150 mm auf einem ' +
        'verrippten Steg — die Wandplatte für die Armatur.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Batterie_d' + size,
      materials: ['pprGreen', 'brass'],
      seed: 181,
      clipPlane,
    });

    const blockL = buildWinkelblock(P);
    const blockR = buildWinkelblock(P);
    blockL.geo.translate(-P.xAchse, 0, 0);
    if (blockL.cap) blockL.cap.translate(-P.xAchse, 0, 0);
    blockR.geo.translate(P.xAchse, 0, 0);
    if (blockR.cap) blockR.cap.translate(P.xAchse, 0, 0);
    const steg = buildSteg(P, P.xAchse - P.rBlock * 0.4);
    /* Der Steg sitzt hinter den Blöcken, auf halber Höhe. */
    steg.geo.translate(0, P.vAchse * 0.45, -P.rBlock + P.stegT * 0.4);

    const ringL = buildBatterieRing(P);
    const ringR = buildBatterieRing(P);
    ringL.geo.translate(-P.xAchse, 0, 0);
    if (ringL.cap) ringL.cap.translate(-P.xAchse, 0, 0);
    ringR.geo.translate(P.xAchse, 0, 0);
    if (ringR.cap) ringR.cap.translate(P.xAchse, 0, 0);

    /* Ein Teil, drei Geometrien: Spritzguss kennt hier keine Fuge —
       beide Blöcke und der Steg laufen als EIN Part, damit die
       Werkstoffzahl stimmt (Foto: grün + Messing, sonst nichts). */
    A.part('koerper', {
      name: 'Batteriekoerper', label: 'Batteriekörper (PP-R)', mat: 'pprGreen',
      geo: mergeGeometries([blockL.geo, blockR.geo, steg.geo]),
      cap: mergeGeometries([blockL.cap, blockR.cap].filter(Boolean)),
      anchor: V3(-P.xAchse - P.rBlock * 0.4, P.vAchse + 0.14 * P.len, 0),
    });
    A.part('ringL', {
      name: 'MessingringL', label: 'Messingring Rp' + P.Rp + '" links', mat: 'brass',
      geo: ringL.geo, cap: ringL.cap,
      explode: V3(0, 0, 0.4 * P.len),
      anchor: V3(-P.xAchse, -P.rBlock - 0.1 * P.len, P.blockLen / 2),
    });
    A.part('ringR', {
      name: 'MessingringR', label: 'Messingring Rp' + P.Rp + '" rechts', mat: 'brass',
      geo: ringR.geo, cap: ringR.cap,
      explode: V3(0, 0, 0.55 * P.len),
    });

    A.light(V3(-P.xAchse, P.vAchse * 0.5, 0));
    A.light(V3(P.xAchse, P.vAchse * 0.5, 0));

    A.hotspot({
      v: V3(0, P.vAchse * 0.45 + P.stegH * 0.3, -P.rBlock + P.stegT + 1),
      n: V3(0, 0.2, 1),
      text: 'Verrippter Montagesteg mit zwei Schraublöchern — er hält den ' +
        'Achsabstand L = ' + P.L + ' mm beim Einputzen',
    });
    A.hotspot({
      v: V3(P.xAchse, 0, P.blockLen / 2),
      n: V3(0, 0, 1),
      text: 'Rp ' + P.Rp + '" Innengewinde im Messingring — hier schraubt ' +
        'der S-Anschluss der Armatur ein',
    });

    const zf = P.rBlock + 6;
    A.dim({ label: 'L', value: P.L,
      a: V3(-P.xAchse, -P.rBlock - 14, zf), b: V3(P.xAchse, -P.rBlock - 14, zf),
      off: V3(0, -8, 0) });
    A.dim({ label: 'L1', value: P.L1,
      a: V3(-P.xEnd, -P.rBlock - 26, zf), b: V3(P.xEnd, -P.rBlock - 26, zf),
      off: V3(0, -8, 0) });

    A.measures = [
      { key: 'L1', label: DIMENSION_KEY.L1, soll: P.L1,
        ist: () => { const b = A.boxOf(['koerper']); return r2(b.max.x - b.min.x); } },
      /* L: Abstand der Rp-Achsen — gemessen an den beiden Ringen. */
      { key: 'L', label: DIMENSION_KEY.L, soll: P.L,
        ist: () => {
          const l = A.boxOf(['ringL']), r = A.boxOf(['ringR']);
          return r2(((r.min.x + r.max.x) / 2) - ((l.min.x + l.max.x) / 2));
        } },
      /* Blockdurchmesser — die belegte Gegenprobe L1 − L = D(½"). */
      { key: 'block', label: 'Anschlussblock-Ø (= L1 − L)', soll: P.blockOD,
        ist: () => {
          const b = A.boxOf(['koerper']);
          return r2(b.max.x - b.min.x - P.L);
        } },
      { key: 'kern', label: 'Rp-Kerndurchmesser', soll: P.threadCore,
        ist: () => {
          const arr = ringL.geo.attributes.position.array;
          /* Fenster bodennah mit 1 mm Abstand — wie beim Innenventil-T:
             mündungsnah läuft das Gewinde aus (Δ −0,52 im zweiten Lauf),
             direkt am Boden liegt der Übergang zum Grund (7,35 im
             ersten). */
          const z0 = P.blockLen / 2 - P.ringLen + 1.0 + P.threadPitch * 0.6;
          const z1 = z0 + P.threadPitch * 1.8;
          let min = Infinity;
          for (let i = 0; i < arr.length; i += 3) {
            const z = arr[i + 2];
            if (z < z0 || z > z1) continue;
            const r = Math.hypot(arr[i] + P.xAchse, arr[i + 1]);
            if (r < min) min = r;
          }
          return isFinite(min) ? r2(2 * min) : NaN;
        } },
      /* DIE MASSENPROBE: Netzvolumen × Dichte gegen die kg-Spalte.
         Messing trägt hier rund die Hälfte des Gewichts. */
      { key: 'masse', label: 'Masse aus dem Volumen (PP 0,9 · CuZn 8,4)', soll: P.kg,
        ist: () => {
          let g = 0;
          for (const t of A.parts) {
            const dichte = /Messing/i.test(t.label || '') ? 8.4 : 0.9;
            let v = 0;
            t.obj.traverse((o) => { if (o.isMesh) v += meshVolume(o.geometry); });
            g += (v * dichte) / 1e6;
          }
          return r2(g * 100) / 100;
        } },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
