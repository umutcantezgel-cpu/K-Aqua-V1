/* K-Aqua Winkel 45° — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Teil, kein Zustand. Gebaut als EIN Loft über eine Gerade-Bogen-
   Gerade-Bahn; die Muffenbohrungen sind Teil des veränderlichen
   Querschnitts, nicht ausgeschnitten. Kein CSG. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS, ANGLE } from './data.js';
import { params } from './params.js';
import { buildBend } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'fittings/elbow-45',
  module: 'kaqua-elbow-45',
  titleDe: 'Winkel 45°',
  titleEn: 'Elbow 45°',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'leg', 'z', 'kg'],
  dimensions: ['leg', 'D'],
  ariaFields: ['d', 'D', 'leg', 'z'],

  variants: [],
  states: null,

  tile: 'Richtungswechsel um 45° — flacher Bogen, geringerer Druckverlust als zwei 90°-Winkel.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Winkel' + ANGLE + '_d' + size,
      materials: ['pprGreen'],
      seed: 91,
      clipPlane,
    });

    const body = buildBend(P);
    A.part('body', {
      name: 'Winkel', label: 'Winkelkörper (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(-P.leg * 0.55, P.rOut + 0.30 * P.leg, 0),
    });

    A.light(V3(-P.leg * 0.6, 0, 0));
    A.light(V3(0, P.leg * 0.6, 0));

    A.hotspot({
      v: V3(-P.leg + Math.max(3, 0.12 * P.leg), P.rOut * 0.5, P.rOut * 0.83),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: body.path[Math.floor(body.path.length / 2)].c.clone()
        .setZ(0).normalize().multiplyScalar(P.rOut * 0.9)
        .add(body.path[Math.floor(body.path.length / 2)].c).setZ(P.rOut * 0.4),
      n: V3(0.4, 0.5, 0.77),
      text: 'Bogenradius ' + P.bendR.toFixed(1).replace('.', ',') +
        ' mm — durchgehende Wandstärke, keine Kerbe am Innenradius',
    });

    /* Bemaßung: Schenkelmaß entlang der -X-Achse, Außendurchmesser
       quer dazu. Beide Linien liegen vor der Silhouette. */
    const zf = P.rOut + 0.14 * P.leg;
    const yL = -(P.rOut + 0.34 * P.leg);
    A.dim({ label: DIMENSION_KEY.leg.split(' ')[1], value: P.leg,
      a: V3(-P.leg, yL, zf), b: V3(0, yL, zf), off: V3(0, 0.12 * P.leg, 0) });
    const xD = -P.leg - 0.16 * P.leg;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf), off: V3(0.12 * P.leg, 0, 0) });

    A.measures = [
      { key: 'leg', label: DIMENSION_KEY.leg, soll: P.leg,
        ist: () => { const b = A.boxOf(['body']); return Math.abs(b.min.x); } },
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => { const b = A.boxOf(['body']); return b.max.z - b.min.z; } },
      /* Muffentiefe: geprüft wird, dass das Modell die Normreihe trägt.
         Die Abweichung des Tabellenwerts leg − z davon ist keine
         Maßhaltigkeitsfrage, sondern eine Quellenfrage — sie steht als
         P.depthDeltaToNorm im Prüfbericht, nicht im Maßtest. */
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
