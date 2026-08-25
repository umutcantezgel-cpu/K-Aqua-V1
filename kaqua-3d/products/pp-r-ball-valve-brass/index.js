/* K-Aqua Kugelhahn PP-R (Kugel Messing verchromt) — Produktpaket.

   Der Zwilling zum PP-Kugelhahn und doch ein anderes Gerät: einteiliger
   Korpus statt Verschraubung, verchromte Messingkugel statt PP-Kugel,
   gekröpfter Stahlbügel statt Kunststoffhebel. Gemeinsam sind die
   Innereien — sie kommen aus der Familie.

   Der Schnitt zeigt, was kein Katalogfoto zeigen kann: die Kugel
   zwischen zwei PTFE-Sitzen, den Durchgang P gegen die Muffenbohrung d
   und die Muffentiefe C. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, DATA_STATUS, DIMENSION_KEY, SIZES } from './data.js';
import { params } from './params.js';
import {
  buildBody, buildLever, buildStemORing, buildBall, buildSeat, buildStem,
} from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'valves/pp-r-ball-valve-brass',
  module: 'kaqua-pp-r-ball-valve-brass',
  titleDe: 'Kugelhahn PP-R (Kugel Messing verchromt)',
  titleEn: 'PP-R Ball Valve (Ball in Brass, Chromium Plated)',
  category: 'valves',
  brandLine: 'K-Aqua PP-R · Messing verchromt',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'd',
  sizeLabel: (k) => 'd' + k,
  sizeTitle: 'Nennweite',
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'A', 'H', 'L', 'P'],
  dimensions: ['A', 'H'],
  ariaFields: ['d', 'A', 'C', 'H', 'L', 'P'],

  variants: [],
  states: null,

  tile: 'Einteiliger Korpus mit verchromter Messingkugel und ' +
        'Stahlbügel — im Schnitt liegt der Durchgang frei.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Kugelhahn_Messing_d' + P.d,
      materials: ['pprGreen', 'chrome', 'steel', 'ptfe', 'epdm'],
      seed: 137,
      clipPlane,
    });

    const body = buildBody(P);
    const ball = buildBall(P);
    const seat = buildSeat(P);
    const stem = buildStem(P);
    const lever = buildLever(P);
    const rORing = P.stemOD / 2 + P.oringCord * 0.30;
    const oringU = buildStemORing(P, P.oringY[0], rORing);
    const oringO = buildStemORing(P, P.oringY[1], rORing);

    const gap = 0.07 * P.A;
    const offSeat = P.chamberX + gap;
    const offStem = 0.30 * P.H;
    const offLever = offStem + (P.domeTop + 3.5) - P.lever.hubBot + gap;

    const rotor = A.subgroup('Rotor');

    A.part('korpus', { name: 'Korpus', label: 'Korpus (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(-P.xEnd * 0.55, P.rBody + 0.06 * P.A, 0) });

    A.part('seatR', { name: 'Kugelsitz_rechts', label: 'Kugelsitz (PTFE)', mat: 'ptfe',
      geo: seat.geo, cap: seat.cap, explode: offSeat,
      anchor: V3(P.seatBack * 0.6, -(P.seatOD / 2 + 0.16 * P.A), 0) });
    A.part('seatL', { name: 'Kugelsitz_links', label: 'Kugelsitz (PTFE)', mat: 'ptfe',
      geo: seat.geo, cap: seat.cap, explode: offSeat, mirror: true });

    A.part('oringU', { name: 'O_Ring_unten', label: 'O-Ring Spindel (EPDM)', mat: 'epdm',
      geo: oringU.geo, cap: oringU.cap, parent: rotor,
      explode: V3(0, offStem * 0.55, 0),
      anchor: V3(-0.16 * P.A, P.oringY[0], 0) });
    A.part('oringO', { name: 'O_Ring_oben', label: 'O-Ring Spindel (EPDM)', mat: 'epdm',
      geo: oringO.geo, cap: oringO.cap, parent: rotor,
      explode: V3(0, offStem * 0.78, 0) });

    A.part('ball', { name: 'Kugel', label: 'Kugel (Messing, verchromt)', mat: 'chrome',
      parent: rotor, geo: ball.geo, cap: ball.cap,
      anchor: V3(0, -(P.ballD / 2 + 0.05 * P.A), 0) });
    A.part('stem', { name: 'Spindel', label: 'Spindel', mat: 'steel', parent: rotor,
      geo: stem.geo, cap: stem.cap, explode: V3(0, offStem, 0),
      anchor: V3(0.09 * P.A, P.domeTop + 0.03 * P.A, 0) });
    A.part('hebel', { name: 'Hebel', label: 'Hebel (Stahl)', mat: 'steel', parent: rotor,
      geo: lever.geo, cap: lever.cap, explode: V3(0, offLever, 0),
      anchor: V3(P.lever.len * 0.55, P.H + 0.06 * P.A, 0) });

    A.light(V3(-P.xEnd * 0.7, 0, 0));
    A.light(V3(P.xEnd * 0.7, 0, 0));

    A.hotspot({
      v: V3(-P.xEnd + Math.max(3, 0.06 * P.A), P.rSocket * 0.5, P.rSocket * 0.84),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe C = ' +
        String(P.socket).replace('.', ',') + ' mm laut Tabelle',
    });
    A.hotspot({
      v: V3(0, -(P.ballD * 0.28), P.ballD * 0.40),
      n: V3(0, -0.4, 0.92),
      text: 'Kugel aus Messing, verchromt — Durchgang P = ' + P.bore +
        ' mm bei Nennmaß d' + P.d,
    });
    A.hotspot({
      v: V3(0, P.domeTop * 0.72, P.domeOD * 0.30),
      n: V3(0, 0.45, 0.89),
      text: 'Spindel mit Vierkant im Kugelschlitz, zwei O-Ringe im Dom',
    });

    const zf = P.rBody + 0.12 * P.A;
    const yL = -(P.rBody + 0.26 * P.A);
    A.dim({ label: 'A', value: P.A,
      a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf), off: V3(0, 0.10 * P.A, 0) });
    const xH = P.xEnd + 0.30 * P.A;
    A.dim({ label: 'H', value: P.H,
      a: V3(xH, 0, zf), b: V3(xH, P.H, zf), off: V3(0.10 * P.A, 0, 0) });

    A.measures = [
      { key: 'A', label: DIMENSION_KEY.A, soll: P.A,
        ist: () => { const b = A.boxOf(['korpus']); return b.max.x - b.min.x; } },
      /* H ist die Oberkante des HEBELS über der Rohrachse, nicht die
         Bauhöhe des Korpus. Deshalb wird der Hebel gemessen und die
         Achse als Nullpunkt genommen — max.y allein, nicht die
         Ausdehnung. */
      { key: 'H', label: DIMENSION_KEY.H, soll: P.H,
        ist: () => A.boxOf(['hebel']).max.y },
      /* L ist die Hebellänge AB DER SPINDEL, und die Spindel steht auf
         x = 0. Also max.x des Hebels. Die Nabe reicht ein Stück ins
         Negative — sie darf hier nicht mitzählen, und genau deshalb
         steht hier nicht die Box-Ausdehnung. */
      { key: 'L', label: DIMENSION_KEY.L, soll: P.lever.len,
        ist: () => A.boxOf(['hebel']).max.x },
      /* Muffentiefe: Strahl von außen auf den Muffengrund, im
         Radiusfenster zwischen Korpusbohrung und Muffenbohrung. */
      { key: 'C', label: DIMENSION_KEY.C, soll: P.socket,
        ist: () => {
          const rr = (P.kanalR + P.d / 2) / 2;
          const hit = A.probeAxial('korpus', V3(P.xEnd + 30, rr, 0), V3(-1, 0, 0));
          return hit ? r2(P.xEnd - hit.x) : NaN;
        } },
      /* Muffenbohrung an der Nennebene, radial von der Achse. */
      { key: 'd', label: DIMENSION_KEY.d, soll: P.d,
        ist: () => {
          const hit = A.probeAxial('korpus', V3(P.xEnd - 1.5, 0, 0), V3(0, 0, 1));
          return hit ? r2(2 * hit.z) : NaN;
        } },
      /* DURCHGANG: das Maß, das dieses Produkt vom PP-Kugelhahn
         unterscheidet — dort musste er angenommen werden, hier steht er
         in der Tabelle. Gemessen wird die Kugelbohrung selbst, nicht
         der Sitz: Strahl längs der Achse durch die offene Kugel, knapp
         außerhalb des Solldurchmessers. Trifft er die Kugel, ist die
         Bohrung zu eng. */
      { key: 'P', label: DIMENSION_KEY.P, soll: P.bore,
        ist: () => r2(2 * bohrungTasten(A, P)) },
      /* GEGENPROBE zum Durchgang: die Kugel selbst. Sie MUSS deutlich
         größer sein als ihre Bohrung — gleicher Wert hieße, es gibt
         keine Kugel, nur ein Rohr. */
      { key: 'kugel', label: 'Kugeldurchmesser (Gegenprobe)', soll: r2(P.ballD),
        ist: () => { const b = A.boxOf(['ball']); return r2(b.max.y - b.min.y); } },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

/* Kugelbohrung durch Einschachtelung: der größte Radius, bei dem ein
   achsparalleler Strahl die Kugel noch NICHT trifft, ist ihr
   Bohrungsradius. Zwölf Halbierungsschritte reichen für 0,01 mm. */
function bohrungTasten(A, P) {
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const trifft = (m) => !!A.probeAxial('ball', V(-P.ballD, m, 0), V(1, 0, 0));
  /* ABSICHERUNG: dicht unter dem Kugeläquator MUSS der Strahl treffen.
     Fehlt das Teil, liefert probeAxial NaN — also immer „kein Treffer",
     und die Einschachtelung liefe stumm auf den Kugelradius zu. Ein
     Messmittel, das bei fehlendem Prüfling eine Zahl ausgibt, ist
     schlimmer als keins. */
  if (!trifft(P.ballD * 0.48)) return NaN;
  let lo = 0, hi = P.ballD / 2;
  for (let i = 0; i < 16; i++) {
    const m = (lo + hi) / 2;
    if (trifft(m)) hi = m; else lo = m;
  }
  return lo;
}

export default product;
