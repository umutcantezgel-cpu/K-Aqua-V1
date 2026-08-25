/* K-Aqua Flanschadapter (Bundbuchse) — Produktpaket.

   Das Teil wird nicht allein verbaut: der lose Gegenflansch (S. 110)
   schiebt sich über den Schaft und drückt gegen den Bund. Genau diese
   Passung ist es, die D und D1 eindeutig macht — und das Modell prüft
   sie mit, obwohl der Flansch selbst nicht dazugehört. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, DATA_STATUS, DIMENSION_KEY, SIZES } from './data.js';
import { params } from './params.js';
import { buildAdaptor } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'fittings/flange-adaptor',
  module: 'kaqua-flange-adaptor',
  titleDe: 'Flanschadapter (Bundbuchse)',
  titleEn: 'Flange adaptor',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'd',
  sizeLabel: (k) => 'd' + k,
  sizeTitle: 'Nennweite',
  defaultSize: 63,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'D1', 'h', 'kg'],
  dimensions: ['D', 'h'],
  ariaFields: ['d', 'D', 'D1', 'h'],

  variants: [],
  states: null,

  tile: 'Bundbuchse für den losen Gegenflansch — sieben Größen mit ' +
        'Schweißmuffe, vier mit Spitzende.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const spitz = P.bauart === 'spitzende';
    const A = createAssembly({
      name: 'K-Aqua_Flanschadapter_d' + P.d,
      materials: ['pprGreen'],
      seed: 149,
      clipPlane,
    });

    const body = buildAdaptor(P);

    A.part('koerper', {
      name: 'Bundbuchse', label: 'Flanschadapter (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(P.xStart + P.schaftLen * 0.4, P.rBund + 0.20 * P.len, 0),
    });

    A.light(V3(P.xStart * 0.7, 0, 0));
    A.light(V3(P.xEnd * 0.7, 0, 0));

    A.hotspot({
      v: V3(P.xEnd - P.bundDicke * 0.5, P.rBund * 0.45, P.rBund * 0.86),
      n: V3(0.2, 0.45, 0.87),
      text: 'Bund Ø ' + P.bund + ' mm — der lose Gegenflansch (Bohrung ' +
        P.flanschBohrung + ' mm) schiebt sich über den Schaft Ø ' +
        P.schaft + ' mm und drückt dagegen',
    });
    A.hotspot(spitz ? {
      v: V3(P.xStart + P.schaftLen * 0.3, P.rSchaft * 0.45, P.rSchaft * 0.86),
      n: V3(0, 0.45, 0.89),
      text: 'Spitzende für Heizelementstumpf- oder Elektroschweißung, ' +
        'Wandstärke ' + String(P.s).replace('.', ',') + ' mm (SDR 11)',
    } : {
      v: V3(P.xStart + Math.max(2, 0.08 * P.len), P.rSchaft * 0.45, P.rSchaft * 0.86),
      n: V3(0, 0.45, 0.89),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        String(P.socket).replace('.', ',') + ' mm nach DVS 2207-11',
    });

    const zf = P.rBund + 0.16 * P.len;
    const yL = -(P.rBund + 0.34 * P.len);
    A.dim({ label: 'D', value: P.bund,
      a: V3(P.xEnd + 0.22 * P.len, -P.rBund, zf), b: V3(P.xEnd + 0.22 * P.len, P.rBund, zf),
      off: V3(-0.10 * P.len, 0, 0) });
    A.dim({ label: 'h', value: P.bundDicke,
      a: V3(P.xBund, yL, zf), b: V3(P.xEnd, yL, zf), off: V3(0, 0.10 * P.len, 0) });

    /* Gemessen am gebauten Netz. Über Halbräume in x, die je genau ein
       Merkmal enthalten — der Adapter ist rotationssymmetrisch, es gibt
       keine zweite Achse, die hineinragen könnte.

       Die Grenzen sind nachgemessen: mit [xStart+2, xBund−2] war das
       Fenster bei allen vier Spitzendgrößen LEER — der zylindrische
       Schaft trägt nur an seinen Enden Netzpunkte, und die lagen beide
       außerhalb. Bei den Muffengrößen traf es stattdessen die Bohrung
       und las 10 bis 22 mm zu wenig. */
    const pos = body.geo.attributes.position.array;
    const radien = (von, bis) => {
      let max = 0, min = Infinity;
      for (let i = 0; i < pos.length; i += 3) {
        const x = pos[i];
        if (x < von || x > bis) continue;
        const r = Math.hypot(pos[i + 1], pos[i + 2]);
        if (r > max) max = r;
        if (r < min) min = r;
      }
      return { max, min };
    };

    A.measures = [
      { key: 'laenge', label: spitz ? 'Gesamtlänge (z)' : 'Gesamtlänge (l + h)',
        soll: P.len,
        ist: () => { const b = A.boxOf(['koerper']); return r2(b.max.x - b.min.x); } },
      /* Bund: größter Durchmesser überhaupt. */
      { key: 'bund', label: spitz ? DIMENSION_KEY.D1 : DIMENSION_KEY.D, soll: P.bund,
        ist: () => { const b = A.boxOf(['koerper']); return r2(b.max.y - b.min.y); } },
      { key: 'h', label: DIMENSION_KEY.h, soll: P.bundDicke,
        ist: () => {
          /* Der Bund beginnt dort, wo der Radius von rSchaft auf rBund
             springt. Gesucht ist der kleinste x mit einem Punkt über
             dem Schaftradius plus einem Millimeter. */
          /* Gesucht ist der kleinste x mit VOLLEM Bundradius. Eine
             Schwelle knapp über dem Schaft wäre untauglich: sie träfe
             die Fase am Fuß, und die liegt vor dem Bund. */
          const schwelle = P.rBund - 0.05;
          let xMin = Infinity;
          for (let i = 0; i < pos.length; i += 3) {
            if (Math.hypot(pos[i + 1], pos[i + 2]) >= schwelle && pos[i] < xMin) xMin = pos[i];
          }
          return isFinite(xMin) ? r2(P.xEnd - xMin) : NaN;
        } },
      /* Schaft: das Maß, über das der Gegenflansch geschoben wird.
         Gemessen im Halbraum vor dem Bund, wo nur der Schaft liegt. */
      { key: 'schaft', label: spitz ? DIMENSION_KEY.d : DIMENSION_KEY.D1,
        soll: P.schaft,
        ist: () => r2(2 * radien(P.xStart + 1.0, P.xBund - 0.5).max) },
      /* GEGENPROBE aus einer FREMDEN Tabelle: die Bohrung des
         Gegenflansches (S. 110, Spalte D2) muss über den gemessenen
         Schaft passen und unter dem gemessenen Bund bleiben. Ein
         Modell, das diese Probe besteht, hat D und D1 richtig gedeutet —
         und das lässt sich an der eigenen Tabelle allein nicht zeigen. */
      { key: 'passung', label: 'Gegenflansch passt (Schaft < D2 < Bund)',
        soll: 1,
        ist: () => {
          const schaft = 2 * radien(P.xStart + 1.0, P.xBund - 0.5).max;
          const b = A.boxOf(['koerper']);
          const bund = b.max.y - b.min.y;
          return (schaft < P.flanschBohrung && P.flanschBohrung < bund) ? 1 : 0;
        } },
      spitz
        ? { key: 's', label: DIMENSION_KEY.s, soll: P.s,
            ist: () => { const g = radien(P.xStart + 1.0, P.xBund - 0.5);
              return r2(g.max - g.min); } }
        : { key: 'd', label: DIMENSION_KEY.d,
            soll: r2(P.d - 4 * P.sockTaper),
            ist: () => r2(2 * radien(P.xStart + 2, P.xStart + P.socket - 2).min) },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
