/* Schweißwerkzeug (Heizelement-Paar) — Produktpaket. PROTOTYP (data.js). */
import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildDorn, buildBuchse } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'tools/welding-tool',
  module: 'kaqua-welding-tool',
  titleDe: 'Schweißwerkzeug (Heizelement-Paar)',
  titleEn: 'Welding tool',
  category: 'tools',
  brandLine: 'K-Aqua Werkzeug',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'key',
  sizeLabel: (k) => 'd' + k,
  defaultSize: SIZES[0],
  dimensionKey: DIMENSION_KEY, metaFields: ['d'], dimensions: [],
  ariaFields: ['d'], variants: [], states: null,
  tile: 'Heizdorn und Heizbuchse als Paar — Maße vorläufig, nur die ' +
        'Nennweite ist Katalogangabe.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_welding-tool'.replace(/-/g, '_'), materials: ['steel'], seed: 199, clipPlane,
    });
    const dorn = buildDorn(P);
    const buchse = buildBuchse(P, { sattel: false });
    const abstand = P.bundR * 2.4;
    buchse.geo.translate(abstand, 0, 0);
    if (buchse.cap) buchse.cap.translate(abstand, 0, 0);
    A.part('dorn', { name: 'Dorn', label: 'Heizdorn (PTFE-beschichtet)', mat: 'steel',
      geo: dorn.geo, cap: dorn.cap, explode: V3(-P.bundR * 0.7, 0, 0),
      anchor: V3(0, P.bundH + P.kopfH + 4, 0) });
    A.part('buchse', { name: 'Buchse', label: 'Heizbuchse (PTFE-beschichtet)', mat: 'steel',
      geo: buchse.geo, cap: buchse.cap, explode: V3(P.bundR * 0.7, 0, 0) });
    A.light(V3(0, P.kopfH, 0)); A.light(V3(abstand, P.kopfH, 0));
    A.hotspot({ v: V3(0, P.bundH + P.kopfH * 0.6, P.d * 0.45), n: V3(0, 0.2, 0.98),
      text: 'Dorn heizt das Rohrende, Buchse die Muffe — ein Paar je Nennweite' });

    A.measures = [
      /* Der Nennweiten-Anker: Buchsenbohrung ≈ d (die Reihe MUSS über
         alle Größen mit d wachsen — das prüft die Formel, nicht das
         einzelne Maß). */
      { key: 'bohrung', label: 'Buchsenbohrung (≈ d + Spiel)', soll: r2(P.d + 2 * P.spiel),
        ist: () => {
          const hit = A.probeAxial('buchse', V3(abstand, P.bundH + P.kopfH - 0.4, 0), V3(0, 0, 1));
          return hit ? r2(2 * Math.abs(hit.z)) : NaN;
        } },
      /* Auf halber Kopfhöhe — die Spitzenmessung schnitt die Fase und
         las konstant −0,73 über alle Größen (die Konstanz benannte den
         Fehler). Soll linear auf dem Kegel interpoliert. */
      { key: 'dorn', label: 'Dorn-Ø auf halber Kopfhöhe', soll: r2(P.d - 2 * P.spiel + P.konus),
        ist: () => {
          const hit = A.probeAxial('dorn', V3(0, P.bundH + P.kopfH * 0.5, P.d), V3(0, 0, -1));
          return hit ? r2(2 * hit.z) : NaN;
        } },
      { key: 'paar', label: 'Werkzeuge im Paar', soll: 2,
        ist: () => A.parts.length },
    ];
    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};
export default product;
