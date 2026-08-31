/* K-Aqua K-Rohr PP-R SDR 6 — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Rohrabschnitt, kein Zustand. Der Nutzen steckt in der
   Schnittansicht: dort wird der Wandaufbau sichtbar, und genau das
   lässt sich in 2D nicht zeigen.

   Die elf weiteren Rohre unterscheiden sich von diesem hier
   ausschließlich in data.js — Tabelle, LAYERS und STRIPES. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS, LAYERS, STRIPES, SDR } from './data.js';
import { params } from './params.js';
import { buildTube, buildStripe, mitFarbvariante, ROHR_VARIANTEN } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'pipes/k-pipe-pp-r-sdr-6',
  module: 'kaqua-k-pipe-pp-r-sdr-6',
  titleDe: 'K-Rohr PP-R SDR 6',
  titleEn: 'K-Pipe PP-R SDR 6',
  category: 'pipes',
  brandLine: 'K-Aqua PP-R · SDR 6 · S 2,5',
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

  tile: 'Druckrohr für Trinkwasser, 20 °C bei 2,0 MPa — die Basis des ' +
        'Systems, geliefert in 4-m-Stangen.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const LAGEN = mitFarbvariante(LAYERS, variant);
    const matKeys = [...new Set([...LAGEN.map((l) => l.key), ...STRIPES.map((s) => s.key)])];
    const A = createAssembly({
      name: 'K-Aqua_Rohr_d' + size,
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
          : 'Rohrwand PP-R (' + P.wall.toFixed(1).replace('.', ',') + ' mm)',
        mat: layer.key,
        geo: layer.geo,
        cap: layer.cap,
        // Lagen fahren radial auseinander — so liest sich der Wandaufbau
        explode: V3(0, (LAGEN.length - i) * P.d * 0.55, 0),
        anchor: i === 0 ? V3(0, P.rOut + 0.16 * P.len, 0) : V3(0, P.rOut + 0.10 * P.len, 0),
      });
    });

    STRIPES.forEach((stripe, i) => {
      const s = buildStripe(P, stripe);
      A.part('stripe' + i, {
        name: 'Kennstreifen',
        label: 'Kennstreifen (Coextrusion)',
        mat: stripe.key,
        geo: s.geo,
        explode: V3(0, (LAGEN.length + 1) * P.d * 0.55, 0),
        noExplodeEntry: false,
      });
    });

    A.light(V3(-P.xEnd * 0.7, 0, 0));
    A.light(V3(P.xEnd * 0.7, 0, 0));

    A.hotspot({
      v: V3(-P.xEnd + P.d * 0.28, P.rOut * 0.42, P.rOut * 0.88),
      n: V3(0, 0.42, 0.9),
      text: 'Schnittkante: Wandstärke ' + String(P.wall).replace('.', ',') +
            ' mm, Innendurchmesser ' + String(P.di).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(P.len * 0.12, P.rOut * 0.95, P.rOut * 0.28),
      n: V3(0, 0.95, 0.3),
      text: 'Kennstreifen rot — SDR 6, Lieferlänge ' + P.stockLength + ' m',
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
      /* Innendurchmesser: von der Achse aus radial nach außen schießen,
         auf halber Länge. Ein axialer Strahl trifft die Anschnittfase
         und liefert nur seinen eigenen Radius zurück. */
      { key: 'di', label: DIMENSION_KEY.di, soll: P.di,
        ist: () => {
          const inner = 'layer' + (LAGEN.length - 1);
          const hit = A.probeAxial(inner, V3(0, 0, 0), V3(0, 1, 0));
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
      /* Wandsumme der Lagen muss die Gesamtwand ergeben — die Prüfung,
         die beim Mehrschichtrohr etwas aussagt. Die SDR-Reihe selbst
         prüft params.js, weil S eine MINDESTwandstärke ist und das
         Verhältnis deshalb planmäßig unter dem Nennwert liegt. */
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
