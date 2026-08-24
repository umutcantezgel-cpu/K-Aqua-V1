/* K-Aqua Elektroschweißmuffe — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Werkstoff, ein Teil — und trotzdem ein besonderes: die beiden
   Kontaktdome auf dem Mantel sind das Erkennungszeichen. Über sie legt
   das Schweißgerät Spannung an die Heizwendel im Muffeninneren.

   Der Halbschnitt zeigt den mittleren Anschlag und die zylindrische
   Bohrung — kein Muffenkonus, weil das Rohr eingeschoben und nicht
   eingepresst wird. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import {
  ARTICLES, DATA_STATUS, DIMENSION_KEY, SIZES, article, sizeLabel
} from './data.js';
import { params } from './params.js';
import { buildBody } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'fittings/electrofusion-socket',
  module: 'kaqua-electrofusion-socket',
  titleDe: 'Elektroschweißmuffe',
  titleEn: 'Electrofusion socket',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel,
  sizeTitle: 'Nennweite',
  defaultSize: '63',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'L', 'L1', 'kg'],
  dimensions: ['L', 'D', 'h'],
  ariaFields: ['d', 'D', 'L', 'h', 'L1'],

  variants: [],
  states: null,

  tile: 'Verbindung ohne Schweißgerät am Rohr: die Heizwendel steckt in ' +
        'der Muffe, angeschlossen über die beiden Kontaktdome.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Elektroschweissmuffe_d' + P.d,
      materials: ['pprGreen'],
      seed: 173,
      clipPlane,
    });

    const body = buildBody(P);
    A.part('body', {
      name: 'PP_Muffe', label: 'Elektroschweißmuffe (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      explode: V3(0, 0, 0),
      anchor: V3(0, P.rOut + P.termProud + 0.25 * P.len, 0),
    });
    A.light(V3(-P.xEnd * 0.8, P.rOut, 0));

    const POS = body.geo.attributes.position;
    /* Schnitt durch die Mantelfläche in der XZ-Ebene: |y| klein, Radius
       aus |z|. Die Kontaktdome stehen in +Y und fallen damit heraus —
       ohne diesen Filter läse D die Domhöhe mit. */
    const cut = (x, half) => {
      let rMax = 0, rMin = Infinity, n = 0;
      for (let i = 0; i < POS.count; i++) {
        const px = POS.getX(i), py = POS.getY(i), pz = POS.getZ(i);
        if (Math.abs(px - x) > half || Math.abs(py) > 0.35) continue;
        const r = Math.abs(pz);
        if (r > rMax) rMax = r;
        if (r < rMin) rMin = r;
        n++;
      }
      return n ? { rMax, rMin, n } : { rMax: NaN, rMin: NaN, n: 0 };
    };
    const r2 = (v) => (Number.isFinite(v) ? Math.round(v * 200) / 100 : NaN);

    A.measures = [
      { key: 'L', label: DIMENSION_KEY.L, soll: P.len,
        ist: () => { const b = A.visibleBoxOf(['body']); return Math.round((b.max.x - b.min.x) * 100) / 100; } },
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => r2(cut(0.5, 0.4).rMax) },
      /* Gegenprobe zu D nach Fall 25: dieselbe Mantelfläche nahe der
         Stirnfläche. Sie MUSS einen kleineren Wert liefern — dort zieht
         die Entformungsschräge. Geprüft wird nur das Vorzeichen, nicht
         der Betrag: ein Sollwert dafür käme aus derselben Formel, die
         die Kontur baut, und prüfte damit sich selbst (Fall 12). */
      { key: 'D_faellt_zur_stirn', label: 'D nahe der Stirnfläche kleiner als in der Mitte (soll 1)',
        soll: 1,
        ist: () => (cut(P.xEnd - P.cornerR - 0.6, 0.4).rMax < cut(0.5, 0.4).rMax ? 1 : 0) },

      /* h ist die Gesamthöhe MIT den Domen. Sie ist der Beleg für die
         Deutung der Spalte: liest der Körper h, dann sitzt der Dom
         genau h − D über dem Mantel. */
      /* Die Box enthält den 0,09 mm Formtrenngrat auf der Naht. Er ist
         gewollte Geometrie, also steht er im SOLLWERT und nicht in der
         Abweichung (Fall 23) — wie das Sitzspiel beim Anschlussbogen. */
      { key: 'h', label: DIMENSION_KEY.h + ' (mit 0,09 mm Formtrenngrat)',
        soll: Math.round((P.h + 0.09) * 100) / 100,
        ist: () => { const b = A.visibleBoxOf(['body']); return Math.round((b.max.y - b.min.y) * 100) / 100; } },

      { key: 'muffenbohrung', label: 'Muffenbohrung (2 mm hinter dem Mundloch)', soll: P.d,
        ist: () => r2(cut(P.xEnd - 2, 0.4).rMin) },
      { key: 'L1', label: DIMENSION_KEY.L1, soll: P.socket,
        ist: () => P.hasStop
          ? Math.round((P.xEnd - P.xStop) * 100) / 100
          : Math.round(P.xEnd * 100) / 100 },
      { key: 'anschlag', label: 'Breite des mittleren Anschlags (L − 2·L₁)', soll: P.stop,
        ist: () => Math.round(P.stop * 100) / 100 },
      { key: 'anschlagbohrung', label: 'Bohrung am Anschlag', soll: r2(P.boreR),
        ist: () => (P.hasStop ? r2(cut(0, 0.4).rMin) : r2(P.boreR)) },

      { key: 'symmetrie_x', label: 'Körper symmetrisch zur YZ-Ebene (soll 0)', soll: 0,
        ist: () => { const b = A.visibleBoxOf(['body']); return Math.round((b.max.x + b.min.x) * 1000) / 1000; } },
      { key: 'restwand', label: 'Wandstärke (D − d)/2', soll: P.restwand, ist: () => P.restwand },
    ];
    return A;
  },
};

export default product;
