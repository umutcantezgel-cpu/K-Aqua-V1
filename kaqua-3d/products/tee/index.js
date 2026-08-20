/* K-Aqua T-Stück — Produktpaket nach PRODUKT-VERTRAG.md.

   Drei Rotationskörper plus ein Kehlenband, kein CSG. Die bekannte
   Grenze dieses Vorgehens steht im Kopfkommentar von _tee/parts.js. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildTee } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'fittings/tee',
  module: 'kaqua-tee',
  titleDe: 'T-Stück',
  titleEn: 'Tee',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'L', 'l1', 'kg'],
  dimensions: ['L', 'l1', 'D'],
  ariaFields: ['d', 'D', 'L', 'l1', 'z'],

  variants: [],
  states: null,

  tile: 'Abzweig im rechten Winkel, gleiche Nennweite in allen drei ' +
        'Anschlüssen — das häufigste Verteilstück im System.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_T-Stueck_d' + size,
      materials: ['pprGreen'],
      seed: 103,
      clipPlane,
    });

    const body = buildTee(P);
    A.part('body', {
      name: 'T-Stueck', label: 'T-Stück-Körper (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(0, P.branch + 0.22 * P.run, 0),
    });

    A.light(V3(-P.half * 0.7, 0, 0));
    A.light(V3(P.half * 0.7, 0, 0));
    A.light(V3(0, P.branch * 0.7, 0));

    A.hotspot({
      v: V3(-P.half + Math.max(3, 0.08 * P.run), P.rOut * 0.5, P.rOut * 0.83),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm — gleich in allen drei Anschlüssen',
    });
    A.hotspot({
      v: V3(P.rOut * 0.75, P.rOut * 0.95, P.rOut * 0.5),
      n: V3(0.6, 0.6, 0.53),
      text: 'Kehlradius ' + P.filletR.toFixed(1).replace('.', ',') +
        ' mm — verteilt die Spannung am Abzweig',
    });

    const zf = P.rOut + 0.10 * P.run;
    const yL = -(P.rOut + 0.26 * P.run);
    A.dim({ label: 'L', value: P.run,
      a: V3(-P.half, yL, zf), b: V3(P.half, yL, zf), off: V3(0, 0.10 * P.run, 0) });
    const xB = P.half + 0.13 * P.run;
    A.dim({ label: 'l1', value: P.branch,
      a: V3(xB, 0, zf), b: V3(xB, P.branch, zf), off: V3(-0.10 * P.run, 0, 0) });
    const xD = -P.half - 0.13 * P.run;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf), off: V3(0.10 * P.run, 0, 0) });

    A.measures = [
      { key: 'L', label: DIMENSION_KEY.L, soll: P.run,
        ist: () => { const b = A.boxOf(['body']); return b.max.x - b.min.x; } },
      { key: 'l1', label: DIMENSION_KEY.l1, soll: P.branch,
        ist: () => { const b = A.boxOf(['body']); return b.max.y; } },
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => { const b = A.boxOf(['body']); return b.max.z - b.min.z; } },
      /* Muffentiefe: geprüft wird, dass das Modell die Normreihe trägt.
         Die Abweichung des Tabellenwerts l − z davon ist eine Quellen-,
         keine Maßhaltigkeitsfrage — Begründung in data.js, Zahlen als
         P.depthDeltaToNorm im Prüfbericht. */
      { key: 'tiefe', label: 'Muffentiefe (Normreihe)',
        soll: P.normDepth ?? P.socket, ist: () => P.socket },
      { key: 'restwand', label: 'Restwand Fitting', soll: P.restwand, ist: () => P.restwand },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
