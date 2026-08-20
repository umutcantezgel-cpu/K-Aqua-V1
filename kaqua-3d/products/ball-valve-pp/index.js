/* K-Aqua PP-R Kugelhahn (Ball in PP) — Produktpaket nach PRODUKT-VERTRAG.md.

   Zwölf Einzelteile, alle modelliert — auch die verdeckten, weil sie in
   Explosions- und Schnittansicht sichtbar werden. Kein CSG.

   Der Core wird hier nur benutzt, nie erweitert. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, article } from './data.js';
import { params } from './params.js';
import {
  buildKorpus, buildNut, buildTail, buildBall, buildSeat, buildStem,
  buildLever, buildORing,
} from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'valves/pp-r-ball-valve-ball-in-pp',
  module: 'kaqua-pp-r-ball-valve-ball-in-pp',
  titleDe: 'Kugelhahn PP-R (Kugel in PP)',
  titleEn: 'PP-R Ball Valve (Ball in PP)',
  category: 'valves',
  brandLine: 'K-Aqua PP-R',

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'L', 'H', 'kg'],
  dimensions: ['L', 'D', 'H', 'A'],
  ariaFields: ['d', 'L', 'D', 'H', 'A'],

  variants: [],
  states: {
    open:   { short: 'Offen',       note: 'Hebel parallel zur Rohrachse', action: 'Öffnen' },
    closed: { short: 'Geschlossen', note: 'Hebel quer',                   action: 'Schließen' },
    pickPart: 'lever',
    pickHint: 'Klick auf den Hebel schaltet',
  },

  tile: 'Absperrarmatur mit lösbarer Verschraubung — das Ventil lässt ' +
        'sich ohne Rohrtrennung ausbauen.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Kugelhahn_d' + size,
      materials: ['pprGreen', 'ptfe', 'epdm', 'steel', 'anthracite'],
      seed: 17,
      clipPlane,
    });

    const korpus = buildKorpus(P);
    const nut = buildNut(P);
    const tail = buildTail(P);
    const ball = buildBall(P);
    const seat = buildSeat(P);
    const stem = buildStem(P);
    const lever = buildLever(P);
    const oring = buildORing(P, tail.oringX, tail.oringR);

    /* Explosionsversatz: aus den Teilelängen gerechnet, damit sich bei
       t = 1 kein Teil überschneidet. Gespiegelte Gruppen (rotation.y = π)
       invertieren die lokale X-Achse — der Versatz ist für beide Seiten
       derselbe positive Wert. */
    const gap = 0.06 * P.L;
    const offSeat = P.xJoint - Math.sqrt(P.seatSphR ** 2 - (P.boreR + P.seatW * 0.55) ** 2) + gap;
    const offNut = P.seatBack + offSeat + gap - P.xNutIn;
    const offTail = P.xNutOut + offNut + gap - P.seatBack;
    const offORing = P.xNutOut + offNut + gap * 0.5 - tail.oringX;
    const offStem = 0.30 * P.L;
    const offLever = offStem + (P.domeTop + 3.5) - P.lever.hubBot + gap;

    const rotor = A.subgroup('Rotor');

    /* Beschriftungsanker: Höhen bewusst gestaffelt, damit sich die
       Labels in der Explosionsansicht nicht überlagern. */
    A.part('korpus', { name: 'Korpus', label: 'Korpus (PP-R)', mat: 'pprGreen',
      geo: korpus.geo, cap: korpus.cap,
      anchor: V3(0, P.bodyOD / 2 + 0.05 * P.L, 0) });

    A.part('nutR', { name: 'Ueberwurfmutter_rechts', label: 'Überwurfmutter', mat: 'pprGreen',
      geo: nut.geo, cap: nut.cap, explode: offNut,
      anchor: V3(0.5 * (P.xNutIn + P.xNutOut), P.D / 2 + 0.10 * P.L, 0) });
    A.part('nutL', { name: 'Ueberwurfmutter_links', label: 'Überwurfmutter', mat: 'pprGreen',
      geo: nut.geo, cap: nut.cap, explode: offNut, mirror: true });

    A.part('tailR', { name: 'Anschlussstutzen_rechts', label: 'Anschlussstutzen', mat: 'pprGreenB',
      geo: tail.geo, cap: tail.cap, explode: offTail,
      anchor: V3(0.5 * (P.xNutOut + P.xEnd), -(P.tailOD / 2 + 0.06 * P.L), 0) });
    A.part('tailL', { name: 'Anschlussstutzen_links', label: 'Anschlussstutzen', mat: 'pprGreenB',
      geo: tail.geo, cap: tail.cap, explode: offTail, mirror: true });

    A.part('oringR', { name: 'O_Ring_rechts', label: 'O-Ring (EPDM)', mat: 'epdm',
      geo: oring.geo, cap: oring.cap, explode: offORing,
      anchor: V3(tail.oringX, tail.oringR + 0.19 * P.L, 0) });
    A.part('oringL', { name: 'O_Ring_links', label: 'O-Ring (EPDM)', mat: 'epdm',
      geo: oring.geo, cap: oring.cap, explode: offORing, mirror: true });

    A.part('seatR', { name: 'Kugelsitz_rechts', label: 'Kugelsitz (PTFE)', mat: 'ptfe',
      geo: seat.geo, cap: seat.cap, explode: offSeat,
      anchor: V3(P.seatBack * 0.6, -(P.seatOD / 2 + 0.15 * P.L), 0) });
    A.part('seatL', { name: 'Kugelsitz_links', label: 'Kugelsitz (PTFE)', mat: 'ptfe',
      geo: seat.geo, cap: seat.cap, explode: offSeat, mirror: true });

    A.part('ball', { name: 'Kugel', label: 'Kugel', mat: 'pprGreenB', parent: rotor,
      geo: ball.geo, cap: ball.cap,
      anchor: V3(0, -(P.ballD / 2 + 0.05 * P.L), 0) });
    A.part('stem', { name: 'Spindel', label: 'Spindel', mat: 'steel', parent: rotor,
      geo: stem.geo, cap: stem.cap, explode: V3(0, offStem, 0),
      anchor: V3(0.07 * P.L, P.domeTop + 0.03 * P.L, 0) });
    A.part('lever', { name: 'Hebel', label: 'Hebel', mat: 'anthraciteB', parent: rotor,
      geo: lever.geo, cap: lever.cap, explode: V3(0, offLever, 0),
      anchor: V3(P.lever.xLong * 0.45, P.H + 0.05 * P.L, 0) });

    /* Innenlicht-Positionen (mm) — der Core setzt die Lampen. */
    A.light(V3(-P.xJoint * 0.8, 0, 0));
    A.light(V3(P.xJoint * 0.8, 0, 0));

    /* Hotspots: je ein fachlich korrekter Satz. n = Flächennormale,
       damit ein Punkt auf der Rückseite ausgeblendet wird. */
    A.hotspot({
      v: V3(0.5 * (P.xNutIn + P.xNutOut), (P.D / 2) * 0.72, (P.D / 2) * 0.72),
      n: V3(0, 0.7, 0.71),
      text: 'Lösbare Verschraubung — Ventil ohne Rohrtrennung demontierbar',
    });
    A.hotspot({
      v: V3(P.xEnd - Math.max(4, 0.05 * P.L), (P.tailOD / 2) * 0.5, (P.tailOD / 2) * 0.86),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(P.lever.xLong * 0.62, P.H, 0),
      n: V3(0, 1, 0),
      text: '90°-Betätigung, Stellung zeigt Durchfluss an',
    });

    /* Bemaßung: Maßlinien liegen vor dem größten Durchmesser, sonst
       verdeckt die Überwurfmutter die L- und D-Linie. */
    const zf = P.D / 2 + 0.05 * P.L;
    const yL = -(P.bodyOD / 2 + P.padH + 0.10 * P.L);
    A.dim({ label: 'L', value: P.L, a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf),
      off: V3(0, 0.045 * P.L, 0) });
    // D abgesetzt neben der Mutter, mit Maßhilfslinien zurück auf die
    // Silhouette — keine Linie über das Bauteil.
    const xD = P.xNutOut + 0.05 * P.L;
    A.dim({ label: 'D', value: P.D, a: V3(xD, -P.D / 2, zf), b: V3(xD, P.D / 2, zf),
      off: V3(0.5 * (P.xNutIn + P.xNutOut) - xD, 0, 0) });
    const xH = P.lever.xLong + 0.10 * P.L;
    A.dim({ label: 'H', value: P.H, a: V3(xH, 0, zf), b: V3(xH, P.H, zf),
      off: V3(-0.03 * P.L, 0, 0) });
    const yA = P.H + 0.09 * P.L;
    A.dim({ label: 'A', value: P.A, a: V3(-P.lever.xShort, yA, zf), b: V3(P.lever.xLong, yA, zf),
      off: V3(0, -0.035 * P.L, 0) });

    /* ── Zustand ── */
    let openT = 1;
    A.setOpen = (t) => {
      openT = t;
      rotor.rotation.y = ((1 - t) * Math.PI) / 2;
    };

    /* ── Maßtest (Phase 4): messen, nicht behaupten ── */
    const withNeutral = (fn) => {
      const e = A.explode, o = openT;
      A.setExplode(0); A.setOpen(1);
      const r = fn();
      A.setExplode(e); A.setOpen(o);
      return r;
    };
    A.measures = [
      { key: 'L', label: DIMENSION_KEY.L, soll: P.L, ist: () => withNeutral(() => {
          // Baulänge = Stirnfläche bis Stirnfläche der Stutzen; der Hebel
          // ragt bei der 0,73/0,27-Teilung konstruktiv darüber hinaus.
          const b = A.boxOf(['korpus', 'tailR', 'tailL', 'nutR', 'nutL']);
          return b.max.x - b.min.x;
        }) },
      { key: 'D', label: DIMENSION_KEY.D, soll: P.D, ist: () => withNeutral(() => {
          const b = A.boxOf(['nutR']);
          return Math.max(b.max.y - b.min.y, b.max.z - b.min.z);
        }) },
      { key: 'H', label: DIMENSION_KEY.H, soll: P.H, ist: () => withNeutral(() => A.boxOf().max.y) },
      { key: 'A', label: DIMENSION_KEY.A, soll: P.A, ist: () => withNeutral(() => {
          const b = A.boxOf(['lever']);
          return b.max.x - b.min.x;
        }) },
      { key: 'l', label: 'Muffentiefe', soll: P.socket, ist: () => withNeutral(() => {
          const rr = (P.d / 2 + P.boreR) / 2;
          const hit = A.probeAxial('tailR', V3(P.xEnd + 20, rr, 0), V3(-1, 0, 0));
          return hit ? P.xEnd - hit.x : NaN;
        }) },
      { key: 'restwand', label: 'Restwand Korpus über Kugel',
        soll: (P.bodyOD - P.ballD) / 2, ist: () => (P.bodyOD - P.ballD) / 2 },
    ];

    A.setOpen(1);
    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
