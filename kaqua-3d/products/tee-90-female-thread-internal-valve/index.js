/* K-Aqua T-Stück 90° mit Innengewinde für Innenventil — Produktpaket.

   Der Katalog führt es unter „Valves", nicht unter den Übergangsfittings,
   und die Tabelle sagt warum: D1 = 45 und h = 33 sind über ALLE vier
   Größen konstant, während d von 20 auf 32 wächst. Das ist keine
   Gewindemuffe, sondern die Aufnahme für ein genormtes Ventiloberteil.

   Nachweisen lässt sich das ohne eigene Messung: der Selbsttest führt
   alle vier Größen einzeln auf, und die Zeilen D1 und h müssen in allen
   vieren dieselbe Zahl tragen, während d und G wechseln. Genau das ist
   die Aussage. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, DATA_STATUS, DIMENSION_KEY, SIZES } from './data.js';
import { params } from './params.js';
import { buildVentilKoerper, buildVentilRing } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'valves/tee-90-female-thread-internal-valve',
  module: 'kaqua-tee-90-female-thread-internal-valve',
  titleDe: 'T-Stück 90° mit Innengewinde für Innenventil',
  titleEn: 'Tee 90° (Female thread) for internal valve',
  category: 'valves',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel: (k) => {
    const [d, g] = String(k).split('x');
    return 'd' + d + ' · G' + g.replace('_', '/') + '"';
  },
  sizeTitle: 'Nennweite · Gewinde',
  defaultSize: '25x3_4',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'G', 'D1', 'h', 'kg'],
  dimensions: ['L', 'h'],
  ariaFields: ['d', 'G', 'D', 'D1', 'L', 'h'],

  variants: [],
  states: null,

  tile: 'Ventilkörper in T-Form — die Aufnahme oben ist über alle ' +
        'Nennweiten gleich, damit dasselbe Oberteil überall passt.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Innenventil_T_' + P.key.replace('x', '_'),
      materials: ['pprGreen', 'brass'],
      seed: 173,
      clipPlane,
    });

    const koerper = buildVentilKoerper(P);
    const ring = buildVentilRing(P);

    A.part('koerper', {
      name: 'Ventilkoerper', label: 'Ventilkörper (PP-R)', mat: 'pprGreen',
      geo: koerper.geo, cap: koerper.cap,
      anchor: V3(-P.half * 0.6, P.rOut + 0.20 * P.yTop, 0),
    });
    A.part('ring', {
      name: 'Messingring', label: 'Messingring G' + P.G + '" für das Ventiloberteil',
      mat: 'brass', geo: ring.geo, cap: ring.cap,
      explode: V3(0, 0.9 * P.yTop, 0),
      anchor: V3(0.12 * P.half, P.yTop + 0.35 * P.yTop, 0),
    });

    A.light(V3(-P.half * 0.7, 0, 0));
    A.light(V3(P.half * 0.7, 0, 0));

    A.hotspot({
      v: V3(0, P.yTop - P.ringLen * 0.45, P.rDom * 0.72),
      n: V3(0, 0.35, 0.94),
      text: 'Aufnahme G' + P.G + '" für das Ventiloberteil — Dom Ø ' + P.domOD +
        ' mm und Höhe ' + P.h + ' mm sind über ALLE Nennweiten gleich',
    });
    A.hotspot({
      v: V3(-P.half + Math.max(3, 0.10 * P.socket), P.rOut * 0.45, P.rOut * 0.85),
      n: V3(0, 0.45, 0.89),
      text: 'Schweißmuffe d' + P.d + ' für Polyfusion, Muffentiefe ' +
        String(P.socket).replace('.', ',') + ' mm',
    });

    const zf = P.rDom + 0.30 * P.yTop;
    A.dim({ label: 'L', value: P.run,
      a: V3(-P.half, -P.rOut - 0.55 * P.yTop, zf), b: V3(P.half, -P.rOut - 0.55 * P.yTop, zf),
      off: V3(0, -0.16 * P.yTop, 0) });
    A.dim({ label: 'h', value: P.yTop,
      a: V3(-P.half - 0.30 * P.yTop, 0, zf), b: V3(-P.half - 0.30 * P.yTop, P.yTop, zf),
      off: V3(-0.16 * P.yTop, 0, 0) });

    const pos = koerper.geo.attributes.position.array;
    const inY = (y0, y1) => {
      let max = 0, min = Infinity, n = 0;
      for (let i = 0; i < pos.length; i += 3) {
        const y = pos[i + 1];
        if (y < y0 || y > y1) continue;
        const r = Math.hypot(pos[i], pos[i + 2]);
        if (r > max) max = r;
        if (r < min) min = r;
        n++;
      }
      return { max, min, n };
    };
    const inX = (x0, x1) => {
      let max = 0, min = Infinity, n = 0;
      for (let i = 0; i < pos.length; i += 3) {
        const x = pos[i];
        if (x < x0 || x > x1) continue;
        const r = Math.hypot(pos[i + 1], pos[i + 2]);
        if (r > max) max = r;
        if (r < min) min = r;
        n++;
      }
      return { max, min, n };
    };

    A.measures = [
      { key: 'L', label: DIMENSION_KEY.L, soll: P.run,
        ist: () => { const b = A.boxOf(['koerper']); return r2(b.max.x - b.min.x); } },
      /* h zählt ab der DURCHGANGSACHSE, nicht ab der Unterkante — die
         Achse liegt auf y = 0, also ist es schlicht max.y. */
      { key: 'h', label: DIMENSION_KEY.h, soll: P.yTop,
        ist: () => r2(A.boxOf(['koerper']).max.y) },
      /* D am Mundlochbund. Eine Box3 wäre untauglich: der Dom ist mit
         D1 = 45 in jeder Zeile dicker als der Durchgang und würde
         stattdessen gemessen. */
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => {
          const g = inX(P.xBell - 0.2, P.xBell + 0.2);
          return g.n ? r2(2 * g.max) : NaN;
        } },
      /* D1 am Dom, oberhalb des Durchgangs — dort kann nur der Dom
         liegen. */
      { key: 'D1', label: DIMENSION_KEY.D1, soll: P.domOD,
        ist: () => {
          const g = inY(P.yMess - 0.2, P.yMess + 0.2);
          return g.n ? r2(2 * g.max) : NaN;
        } },
      /* DASS D1 UND h KONSTANT SIND, zeigt die Messtabelle selbst: der
         Selbsttest führt alle vier Größen einzeln auf, und beide Zeilen
         müssen in allen vieren dieselbe Zahl tragen. Eine eigene
         Konstanz-Messung wäre nur eine Summe zweier Maße, die schon
         dastehen — sie sähe nach mehr Prüfung aus, als sie ist. */
      /* Gewindekern im Messingring, radial von der Achse. */
      { key: 'kern', label: 'Innengewinde-Kerndurchmesser G' + P.G + '"',
        soll: P.threadCore,
        ist: () => {
          const rp = ring.geo.attributes.position.array;
          const y0 = P.yTop - P.ringLen + 1.0 + P.threadPitch * 0.6;
          const y1 = y0 + P.threadPitch * 1.8;
          let min = Infinity;
          for (let i = 0; i < rp.length; i += 3) {
            const y = rp[i + 1];
            if (y < y0 || y > y1) continue;
            const r = Math.hypot(rp[i], rp[i + 2]);
            if (r < min) min = r;
          }
          return isFinite(min) ? r2(2 * min) : NaN;
        } },
      /* GEGENPROBE: die Durchgangsbohrung. Sie MUSS enger sein als der
         Gewindekern — sonst wäre der Dom keine Ventilaufnahme, sondern
         ein zweiter Durchgang. */
      { key: 'bohrung', label: 'Durchgangsbohrung (Gegenprobe)', soll: r2(P.bore),
        /* An der Kreuzung gemessen: dort liegt ein Profilpunkt der
           Durchgangsbohrung, und nichts im Modell ist enger. */
        ist: () => {
          const g = inX(-0.3, 0.3);
          return g.n ? r2(2 * g.min) : NaN;
        } },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
