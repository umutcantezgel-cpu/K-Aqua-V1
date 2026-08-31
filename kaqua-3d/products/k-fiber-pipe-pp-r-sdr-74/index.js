/* K-Aqua K-Fiber Rohr PP-R SDR 7,4 — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Rohrabschnitt, kein Zustand. Der Nutzen steckt in der
   Schnittansicht: dort wird der Wandaufbau sichtbar. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS, LAYERS, STRIPES } from './data.js';
import { params } from './params.js';
import { buildTube, buildStripe, mitFarbvariante, ROHR_VARIANTEN } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'pipes/k-fiber-pipe-pp-r-sdr-7-4',
  module: 'kaqua-k-fiber-pipe-pp-r-sdr-7-4',
  titleDe: 'K-Fiber Rohr PP-R SDR 7,4',
  titleEn: 'K-Fiber Pipe PP-R SDR 7,4',
  category: 'pipes',
  brandLine: 'K-Aqua PP-R GF · SDR 7,4 · S 3,2',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'di', 's', 'kgm'],
  dimensions: ['d', 'di'],
  ariaFields: ['d', 'di', 's'],

  /* Serienfarben laut Herstellerarchiv — der Viewer blendet die Auswahl
     von selbst ein, sobald diese Liste nicht leer ist. */
  variants: ROHR_VARIANTEN,
  states: null,

  tile: 'Glasfaserverstärkt: der Faserkern nimmt die Längsdehnung auf, die Leitung braucht weniger Festpunkte. Im Schnitt sichtbar.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const LAGEN = mitFarbvariante(LAYERS, variant);
    const matKeys = [...new Set([...LAGEN.map((l) => l.key), ...STRIPES.map((s) => s.key)])];
    const A = createAssembly({
      name: 'K-Aqua_kaqua-k-fiber-pipe-pp-r-sdr-7-4' + '_d' + size,
      materials: matKeys,
      seed: 71,
      // Rohre werden extrudiert: Kennzeichnung als Aufdruck, nicht als Prägung.
      emboss: false,
      clipPlane,
    });

    const layers = buildTube(P, LAGEN);
    layers.forEach((layer, i) => {
      A.part('layer' + i, {
        name: 'Rohrwand_' + layer.label,
        label: LAGEN.length > 1
          ? layer.label + ' (' + layer.thickness.toFixed(1).replace('.', ',') + ' mm)'
          : 'Rohrwand (' + P.wall.toFixed(1).replace('.', ',') + ' mm)',
        mat: layer.key,
        geo: layer.geo,
        cap: layer.cap,
        // Lagen fahren radial auseinander — so liest sich der Wandaufbau
        explode: V3(0, (LAGEN.length - i) * P.d * 0.55, 0),
        anchor: i === 0 ? V3(0, P.rOut + 0.16 * P.len, 0) : V3(0, P.rOut + 0.10 * P.len, 0),
      });
    });

    STRIPES.forEach((stripe, i) => {
      A.part('stripe' + i, {
        name: 'Kennstreifen',
        label: 'Kennstreifen (Coextrusion)',
        mat: stripe.key,
        geo: buildStripe(P, stripe).geo,
        explode: V3(0, (LAGEN.length + 1) * P.d * 0.55, 0),
      });
    });

    A.light(V3(-P.xEnd * 0.7, 0, 0));
    A.light(V3(P.xEnd * 0.7, 0, 0));

    A.hotspot({
      v: V3(-P.xEnd + P.d * 0.28, P.rOut * 0.42, P.rOut * 0.88),
      n: V3(0, 0.42, 0.9),
      text: LAGEN.length > 1
        ? 'Schnittkante: ' + LAGEN.length + ' Lagen, Wandstärke ' +
          String(P.wall).replace('.', ',') + ' mm'
        : 'Schnittkante: Wandstärke ' + String(P.wall).replace('.', ',') +
          ' mm, Innendurchmesser ' + String(P.di).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(P.len * 0.12, P.rOut * 0.95, P.rOut * 0.28),
      n: V3(0, 0.95, 0.3),
      text: 'SDR 7,4, S 3,2 — Lieferlänge ' + P.stockLength + ' m',
    });

    const zf = P.rOut + 0.10 * P.len;
    const xD = P.xEnd + 0.10 * P.len;
    A.dim({ label: 'd', value: P.d, a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf),
      off: V3(-0.09 * P.len, 0, 0) });
    A.dim({ label: 'di', value: P.di,
      a: V3(-P.xEnd - 0.06 * P.len, -P.rIn, zf), b: V3(-P.xEnd - 0.06 * P.len, P.rIn, zf),
      off: V3(0.06 * P.len, 0, 0) });

    A.measures = [
      { key: 'd', label: DIMENSION_KEY.d, soll: P.d,
        ist: () => { const b = A.boxOf(['layer0']); return b.max.y - b.min.y; } },
      /* Innendurchmesser: von der Achse radial nach außen gegen die
         INNERSTE Lage. Ein axialer Strahl trifft die Anschnittfase und
         gibt nur seinen eigenen Startradius zurück. */
      { key: 'di', label: DIMENSION_KEY.di, soll: P.di,
        ist: () => {
          const hit = A.probeAxial('layer' + (LAGEN.length - 1), V3(0, 0, 0), V3(0, 1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      /* Die modellierte Wand ist die Differenz der beiden Tabellenenden,
         nicht die Spalte „S min.". Der Tabellenwert steht als eigene
         Zeile daneben: eine Messung, die zwei Tabellenspalten
         gegeneinander hält, prüft das Modell nicht (Fall 14). */
      { key: 's', label: DIMENSION_KEY.s, soll: P.wall,
        ist: () => Math.round(((P.d - P.di) / 2) * 1000) / 1000 },
      { key: 's_min_tabelle', label: 'Tabelle „S min." (Gegenprobe, kein Modellmaß)',
        soll: P.wallMin, ist: () => P.wallMin },
      { key: 'lagen', label: 'Summe der Lagendicken', soll: P.wall,
        ist: () => Math.round(layers.reduce((t, l) => t + l.thickness, 0) * 100) / 100 },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
