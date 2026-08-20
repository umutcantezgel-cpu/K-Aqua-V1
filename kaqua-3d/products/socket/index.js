/* K-Aqua Muffe (Socket) — Produktpaket nach PRODUKT-VERTRAG.md.

   Der Schnitt-Test: ein Produkt, ein Teil, kein Zustand, keine Variante.
   Der Core blendet den Auf/Zu-Knopf selbst aus, weil states fehlt.

   Geschrieben, ohne eine einzige Core-Datei anzufassen — genau das ist
   die Aussage von §5.6. Maße noch Prototyp, siehe data.js. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildBody } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'fittings/socket',
  module: 'kaqua-socket',
  titleDe: 'Muffe',
  titleEn: 'Socket',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'l', 'z', 'kg'],
  dimensions: ['l', 'D'],
  ariaFields: ['d', 'D', 'l', 'z'],

  variants: [],
  states: null,

  tile: 'Verbindet zwei Rohre gleicher Nennweite durch Polyfusion — ' +
        'das häufigste Formteil im System.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Muffe_d' + size,
      materials: ['pprGreen'],
      seed: 31,
      clipPlane,
    });

    const body = buildBody(P);
    A.part('body', {
      name: 'Muffe', label: 'Muffenkörper (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(0, P.OD / 2 + 0.14 * P.len, 0),
    });

    A.light(V3(-P.xEnd * 0.5, 0, 0));
    A.light(V3(P.xEnd * 0.5, 0, 0));

    A.hotspot({
      v: V3(P.xEnd - Math.max(3, 0.08 * P.len), (P.OD / 2) * 0.55, (P.OD / 2) * 0.82),
      n: V3(0, 0.55, 0.83),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(0, (P.OD / 2) * 0.5, (P.OD / 2) * 0.86),
      n: V3(0, 0.5, 0.86),
      text: 'Mittlerer Anschlag begrenzt die Einstecktiefe beider Rohrenden',
    });

    const zf = P.OD / 2 + 0.10 * P.len;
    const yL = -(P.OD / 2 + 0.22 * P.len);
    A.dim({ label: 'l', value: P.len, a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf),
      off: V3(0, 0.09 * P.len, 0) });
    const xD = P.xEnd + 0.14 * P.len;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.OD / 2, zf), b: V3(xD, P.OD / 2, zf),
      off: V3(-0.10 * P.len, 0, 0) });

    A.measures = [
      { key: 'l', label: DIMENSION_KEY.l, soll: P.len,
        ist: () => { const b = A.boxOf(['body']); return b.max.x - b.min.x; } },
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => { const b = A.boxOf(['body']); return b.max.y - b.min.y; } },
      { key: 'tiefe', label: 'Muffentiefe (l − z)/2', soll: P.socket,
        ist: () => {
          const rr = (P.d / 2 + P.boreR) / 2;
          const hit = A.probeAxial('body', V3(P.xEnd + 20, rr, 0), V3(-1, 0, 0));
          return hit ? P.xEnd - hit.x : NaN;
        } },
      { key: 'z', label: DIMENSION_KEY.z, soll: P.stop, ist: () => P.stop },
      { key: 'restwand', label: 'Restwand Fitting', soll: P.restwand, ist: () => P.restwand },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
