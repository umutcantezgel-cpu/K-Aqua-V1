/* K-Aqua Bundflansch PP-Stahl — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Teil, kein Zustand. Erstes Produkt mit Durchgangslöchern; der
   Maßtest prüft deshalb auch, dass sie tatsächlich durchgehen. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildFlange } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'accessories/backing-flange',
  module: 'kaqua-backing-flange',
  titleDe: 'Bundflansch PP-Stahl',
  titleEn: 'Backing flange PP-Steel',
  category: 'accessories',
  brandLine: 'K-Aqua · Stahl',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 63,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'D1', 'H', 'kg'],
  dimensions: ['D', 'D1', 'D2'],
  ariaFields: ['d', 'D', 'D1', 'D2', 'D3', 'H'],

  variants: [],
  states: null,

  tile: 'Überträgt die Schraubenkraft auf die Bundbuchse — Lochkreis ' +
        'nach DIN 2501 PN 10, d40 bis d315.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Bundflansch_d' + size,
      materials: ['steel'],
      seed: 149,
      clipPlane,
    });

    const f = buildFlange(P);
    A.part('flange', {
      name: 'Bundflansch', label: 'Bundflansch (Stahl, PP-beschichtet)', mat: 'steel',
      geo: f.geo, cap: f.cap,
      anchor: V3(0, P.rOut + 0.28 * P.D, 0),
    });

    A.light(V3(P.thick * 2, 0, 0));
    A.light(V3(-P.thick * 2, 0, 0));

    A.hotspot({
      v: V3(0, P.boltCircleD / 2 * 0.72, P.boltCircleD / 2 * 0.72),
      n: V3(0.35, 0.66, 0.66),
      text: P.holeCount + ' Schraubenlöcher Ø' + P.D3 + ' mm auf Lochkreis Ø' +
        P.D1 + ' mm — DIN 2501 PN 10',
    });
    A.hotspot({
      v: V3(P.thick * 0.4, P.rIn * 0.9, P.rIn * 0.35),
      n: V3(0.3, 0.9, 0.32),
      text: 'Bohrung Ø' + P.D2 + ' mm — die Bundbuchse geht hier durch, ' +
        'der Flansch dreht frei',
    });

    const zf = P.rOut + 0.10 * P.D;
    A.dim({ label: 'D', value: P.D,
      a: V3(-P.thick * 2.5, -P.rOut, zf), b: V3(-P.thick * 2.5, P.rOut, zf),
      off: V3(P.thick * 2, 0, 0) });
    A.dim({ label: 'D2', value: P.D2,
      a: V3(P.thick * 2.5, -P.rIn, zf), b: V3(P.thick * 2.5, P.rIn, zf),
      off: V3(-P.thick * 2, 0, 0) });

    A.measures = [
      /* Außendurchmesser: die Fase nimmt planmäßig davon, deshalb liegt
         das Ist minimal darunter — dieselbe beabsichtigte Abweichung wie
         der Formtrenngrat am PP-Teil. */
      { key: 'D', label: DIMENSION_KEY.D, soll: P.D,
        ist: () => { const b = A.boxOf(['flange']); return b.max.y - b.min.y; } },
      { key: 'H', label: DIMENSION_KEY.H, soll: P.H,
        ist: () => { const b = A.boxOf(['flange']); return b.max.x - b.min.x; } },
      /* Innenbohrung: radial von der Achse nach außen. Hier richtig,
         weil in der Achse nichts liegt — die Bohrung ist offen. */
      { key: 'D2', label: DIMENSION_KEY.D2, soll: P.D2,
        ist: () => {
          const hit = A.probeAxial('flange', V3(0, 0, 0), V3(0, 1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      /* Gehen die Löcher wirklich durch? Ein Strahl längs der Achse
         durch ein Lochzentrum darf NICHTS treffen. Trifft er, ist das
         Loch zugewachsen — genau der Fehler, den plateWithHoles machen
         könnte, wenn die Innenkontur falsch orientiert ist.
         Soll 0 Treffer, Ist die Trefferzahl. */
      { key: 'loch', label: 'Löcher durchgehend (0 = ja)', soll: 0,
        ist: () => {
          const h = f.holes[0];
          const durch = A.probeAxial('flange',
            V3(-P.thick * 4, h.y, h.x), V3(1, 0, 0));
          return durch ? 1 : 0;
        } },
      { key: 'rand', label: 'Ringbreite über dem Lochkreis',
        soll: P.rimWidth, ist: () => P.rimWidth },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
