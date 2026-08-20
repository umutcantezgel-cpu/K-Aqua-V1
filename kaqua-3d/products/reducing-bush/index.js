/* K-Aqua Reduzierbuchse — Produktpaket nach PRODUKT-VERTRAG.md.

   Erstes Produkt mit zwei Nennweiten. sizeKey nennt das Feld, über das
   der Core Größen adressiert — bei 17 Zeilen mit nur 5 verschiedenen
   Werten für d wäre d nicht eindeutig. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildBush } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'fittings/reducing-bush',
  module: 'kaqua-reducing-bush',
  titleDe: 'Reduzierbuchse',
  titleEn: 'Reducing bush',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel: (k) => 'd' + String(k).replace('x', ' → d'),
  sizeTitle: 'Übergang',
  defaultSize: '40x25',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'd1', 'D', 'l', 'kg'],
  dimensions: ['l', 'D'],
  ariaFields: ['d', 'd1', 'D', 'l', 'z'],

  variants: [],
  states: null,

  tile: 'Übergang auf die nächstkleinere Nennweite — Zapfen außen, ' +
        'Schweißmuffe innen. 17 Kombinationen von d25 bis d75.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Reduzierbuchse_' + P.key,
      materials: ['pprGreen'],
      seed: 109,
      clipPlane,
    });

    const body = buildBush(P);
    A.part('body', {
      name: 'Reduzierbuchse', label: 'Reduzierbuchse (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(0, P.rOut + 0.30 * P.len, 0),
    });

    A.light(V3(0, 0, 0));

    A.hotspot({
      v: V3(P.xEnd - Math.max(3, 0.10 * P.len), P.rOut * 0.5, P.rOut * 0.83),
      n: V3(0, 0.5, 0.86),
      text: 'Innenmuffe für d' + P.d1 + ', Schweißtiefe ' +
        P.socketIn.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(-P.xEnd + Math.max(3, 0.14 * P.len), P.rSpigot * 0.5, P.rSpigot * 0.84),
      n: V3(0, 0.5, 0.86),
      text: 'Zapfen d' + P.d + ' — steckt in jede d' + P.d + '-Muffe des Systems',
    });

    const zf = P.rOut + 0.14 * P.len;
    const yL = -(P.rOut + 0.34 * P.len);
    A.dim({ label: 'l', value: P.len,
      a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf), off: V3(0, 0.13 * P.len, 0) });
    const xD = P.xEnd + 0.18 * P.len;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf), off: V3(-0.14 * P.len, 0, 0) });

    A.measures = [
      { key: 'l', label: DIMENSION_KEY.l, soll: P.len,
        ist: () => { const b = A.boxOf(['body']); return b.max.x - b.min.x; } },
      /* Silhouette: der größere von Zapfen und Kragen. */
      { key: 'OD', label: 'größter Außendurchmesser', soll: P.OD,
        ist: () => { const b = A.boxOf(['body']); return b.max.z - b.min.z; } },
      /* Zapfen und Kragen einzeln, jeweils von AUSSEN nach innen
         gemessen. Ein Strahl von der Achse trifft zuerst die
         Bohrungswand und gäbe deren Radius zurück — er hätte die
         Bohrung gemessen, nicht das Außenmaß. */
      { key: 'd', label: DIMENSION_KEY.d + ' (Zapfen)', soll: P.d,
        /* Gemessen am Zapfenanfang, wo der Nenndurchmesser liegt —
           weiter hinten hat die 1°-Entformung ihn planmäßig verjüngt. */
        ist: () => {
          const hit = A.probeAxial('body', V3(-P.xEnd + 1.5, P.OD, 0), V3(0, -1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      { key: 'D', label: DIMENSION_KEY.D + ' (Kragen)', soll: P.D,
        ist: () => {
          const hit = A.probeAxial('body', V3(-P.xEnd + P.spigotLenUsed + 0.6, P.OD, 0), V3(0, -1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      { key: 'restwand', label: 'Wand des Kragens', soll: P.restwand, ist: () => P.restwand },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
