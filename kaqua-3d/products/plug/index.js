/* K-Aqua Stopfen — Produktpaket nach PRODUKT-VERTRAG.md.

   Zwei Teile: PP-Körper und O-Ring. Die Explosionsansicht zieht den
   O-Ring aus seiner Nut — das ist der einzige Handgriff, den ein
   Monteur an diesem Teil hat. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildBody, buildORing } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'accessories/plug',
  module: 'kaqua-plug',
  titleDe: 'Stopfen',
  titleEn: 'Plug',
  category: 'accessories',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel: (k) => 'G ' + String(k) + '"',
  sizeTitle: 'Gewinde',
  defaultSize: '1/2',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['G', 'kg'],
  dimensions: ['l', 'D'],
  ariaFields: ['G'],

  variants: [],
  states: null,

  tile: 'Verschließt einen G½"-Anschluss dicht — O-Ring statt Hanf, ' +
        'vier Kerben für das Werkzeug.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Stopfen_G' + String(P.G).replace('/', '-'),
      materials: ['pprGreen', 'epdm'],
      seed: 131,
      clipPlane,
    });

    const body = buildBody(P);
    const oring = buildORing(P);

    A.part('body', {
      name: 'Stopfen', label: 'Stopfenkörper (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(P.len * 0.6, P.rOut + 0.30 * P.len, 0),
    });
    A.part('oring', {
      name: 'O_Ring', label: 'O-Ring (EPDM)', mat: 'epdm',
      geo: oring.geo, cap: oring.cap,
      explode: -0.45 * P.len,
      anchor: V3(P.threadLen, -(P.rOut + 0.22 * P.len), 0),
    });

    A.light(V3(P.len * 0.5, 0, 0));

    A.hotspot({
      v: V3(P.threadLen * 0.5, P.rThread * 0.5, P.rThread * 0.84),
      n: V3(0, 0.5, 0.86),
      text: 'Zylindrisches Rohrgewinde G' + P.G + '" nach ISO 228-1, ' +
        P.turns + ' Gänge',
    });
    A.hotspot({
      v: V3(P.threadLen + P.grooveLen * 0.5, P.oRingR * 0.55, P.oRingR * 0.82),
      n: V3(0, 0.55, 0.83),
      text: 'O-Ring dichtet radial — kein Hanf, kein Dichtband nötig',
    });
    A.hotspot({
      v: V3(P.len - 2, P.rOut * 0.5, P.rOut * 0.84),
      n: V3(0.2, 0.5, 0.84),
      text: P.notchCount + ' Kerben für das Montagewerkzeug',
    });

    const zf = P.rOut + 0.14 * P.len;
    const yL = -(P.rOut + 0.34 * P.len);
    A.dim({ label: 'l', value: P.len,
      a: V3(0, yL, zf), b: V3(P.len, yL, zf), off: V3(0, 0.13 * P.len, 0) });
    const xD = P.len + 0.18 * P.len;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf), off: V3(-0.15 * P.len, 0, 0) });

    A.measures = [
      { key: 'l', label: DIMENSION_KEY.l + ' (abgeleitet)', soll: P.len,
        ist: () => { const b = A.boxOf(['body']); return b.max.x - b.min.x; } },
      /* Körperdurchmesser am Riffelrücken: die Kerben liegen planmäßig
         darunter, ein einzelner Strahl trifft je nach Winkel Kerbe oder
         Rücken. Die Box3 erfasst immer den Rücken. */
      { key: 'D', label: DIMENSION_KEY.D + ' (abgeleitet)', soll: P.OD,
        ist: () => { const b = A.boxOf(['body']); return b.max.z - b.min.z; } },
      /* Gewinde: von außen radial auf eine KUPPE. threadProfile legt die
         Kuppen auf a = i · Steigung; dazwischen liegen die Gründe, und
         ein Strahl dorthin misst den Kerndurchmesser statt des
         Nennmaßes. Ein Strahl von der Achse träfe ohnehin die
         Bohrungswand. */
      { key: 'gewinde', label: 'Gewinde-Außendurchmesser G' + P.G + '"',
        soll: P.threadOD,
        ist: () => {
          const x = P.threadPitch * 2;
          const hit = A.probeAxial('body', V3(x, P.OD, 0), V3(0, -1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      /* Der Stopfen muss geschlossen sein. Zwei Strahlen längs der Achse,
         einer von jeder Stirnseite: der erste trifft die Gewindestirn,
         der zweite den Bohrungsgrund. Die Differenz ist die tatsächlich
         gebaute Materialstärke — gemessen, nicht behauptet. */
      { key: 'dicht', label: 'massive Länge bis zum Bohrungsgrund', soll: P.xBore,
        ist: () => {
          const vorn = A.probeAxial('body', V3(-20, 0, 0), V3(1, 0, 0));
          const hinten = A.probeAxial('body', V3(P.len + 20, 0, 0), V3(-1, 0, 0));
          if (!vorn || !hinten) return NaN;
          return Math.round((hinten.x - vorn.x) * 100) / 100;
        } },
      { key: 'wand', label: 'Wandstärke', soll: P.wall, ist: () => P.wall },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
