/* K-Aqua Übergangsmuffe mit Innengewinde — Produktpaket.

   Gegenstück zur AG-Muffe, aber anders gebaut: der Messingring liegt
   versenkt im grünen Körper. Die Explosionsansicht zieht ihn heraus —
   im geschlossenen Zustand sieht man von ihm nur die Stirnfläche. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, DATA_STATUS, DIMENSION_KEY, SIZES } from './data.js';
import { params } from './params.js';
import { buildBody, buildRing } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'transition-fittings/adaptor-socket-female-thread',
  module: 'kaqua-adaptor-socket-female-thread',
  titleDe: 'Übergangsmuffe mit Innengewinde',
  titleEn: 'Adaptor socket (Female thread)',
  category: 'transition-fittings',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel: (k) => {
    const [d, r] = String(k).split('x');
    return 'd' + d + ' · Rp' + r.replace(/_/g, ' ') + '"';
  },
  sizeTitle: 'Nennweite · Gewinde',
  defaultSize: '32x1',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'Rp', 'D', 'l', 'kg'],
  dimensions: ['l', 'D'],
  ariaFields: ['d', 'Rp', 'D', 'D1', 'l'],

  variants: [],
  states: null,

  tile: 'Übergang von PP-R auf Rohrgewinde — der Messingring liegt ' +
        'versenkt im grünen Körper, sichtbar nur im Schnitt.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Uebergangsmuffe_IG_' + P.key,
      materials: ['pprGreen', 'brass'],
      seed: 131,
      clipPlane,
    });

    const body = buildBody(P);
    const ring = buildRing(P);

    A.part('body', {
      name: 'PP_Koerper', label: 'PP-R-Körper mit Schweißmuffe', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      explode: -0.35 * P.len,
      anchor: V3(-P.xEnd + P.socket * 0.6, P.rSleeve + 0.26 * P.len, 0),
    });
    A.part('ring', {
      name: 'Messingring', label: 'Messingring Rp' + P.Rp + '"', mat: 'brass',
      geo: ring.geo, cap: ring.cap,
      explode: 0.7 * P.len,
      anchor: V3(P.xEnd - P.brassLen * 0.4, -(P.rCollar + 0.22 * P.len), 0),
    });

    A.light(V3(-P.xEnd * 0.6, 0, 0));
    A.light(V3(P.xEnd * 0.6, 0, 0));

    A.hotspot({
      v: V3(-P.xEnd + Math.max(3, 0.10 * P.len), P.rSleeve * 0.5, P.rSleeve * 0.84),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(P.xEnd - P.brassLen * 0.5, P.threadCore * 0.42, P.threadCore * 0.30),
      n: V3(0.25, 0.8, 0.55),
      text: 'Zylindrisches Innengewinde Rp' + P.Rp + '" nach ISO 7-1, ' +
        P.turns + ' Gänge, nutzbar ' + P.threadLen + ' mm',
    });
    A.hotspot({
      v: V3(P.xStep + 0.4, P.rCollar * 0.55, P.rCollar * 0.78),
      n: V3(-0.3, 0.6, 0.74),
      text: 'Absatz vom Muffenteil D1 = ' + P.D1 + ' auf den Bund D = ' + P.OD + ' mm',
    });

    const zf = P.rCollar + 0.12 * P.len;
    const yL = -(P.rCollar + 0.30 * P.len);
    A.dim({ label: 'l', value: P.len,
      a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf), off: V3(0, 0.11 * P.len, 0) });
    const xD = P.xEnd + 0.16 * P.len;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.rCollar, zf), b: V3(xD, P.rCollar, zf), off: V3(-0.13 * P.len, 0, 0) });

    const strahl = (id, from, dir) => A.probeAxial(id, from, dir);

    A.measures = [
      { key: 'l', label: DIMENSION_KEY.l, soll: P.len,
        ist: () => { const b = A.boxOf(['body']); return b.max.x - b.min.x; } },
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => { const b = A.boxOf(['body']); return b.max.y - b.min.y; } },
      /* D1 lässt sich NICHT über eine Box3 messen: der Bund ist in zehn
         von zwölf Zeilen größer und würde stattdessen anschlagen.
         Nur diese Messung beweist, dass der Absatz wirklich da ist.

         Getastet wird MITTEN AUF EINER FACETTE des Rückens, ein Strahl
         je Riffel. grooveMod legt die Nuten auf k·pitch mit der
         Halbbreite halfAng; dazwischen liegt der Rücken auf dem vollen
         Radius, und thetaSamples setzt dort sechs Profilpunkte. Der
         Strahl zielt zwischen den vierten und den fünften — auf eine
         FLÄCHE, nie auf eine Kante.

         DER EIGENTLICHE FEHLER SASS WOANDERS, und er ist der Grund,
         warum drei Anläufe scheiterten: der Strahl setzte den Winkel als
         y = R·sin t, z = R·cos t an, revolve legt bei Achse x aber
         y = r·cos θ, z = r·sin θ ab. Das spiegelt den Winkel und
         verschiebt ihn um π/2. Ob das noch auf dem Rücken landet, hängt
         allein davon ab, ob π/2 ein ganzes Vielfaches der Teilung ist —
         und das ist bei acht der zwölf Größen zufällig fast der Fall.
         Daher acht scheinbar richtige Zeilen und vier falsche:

           32×1"   Teilung 15,00°  ·  90°/15,00 = 6,00   → Versatz 0
           40×1¼"  Teilung 12,00°  ·  90°/12,00 = 7,50   → ½ Teilung
           90×3"   Teilung  5,81°  ·  90°/ 5,81 = 15,50  → ½ Teilung
           110×4"  Teilung  4,67°  ·  90°/ 4,67 = 19,25  → ¼ Teilung

         Und der Fehlbetrag war in jeder betroffenen Zeile GENAU die
         doppelte Nuttiefe — ein Maß, das um exakt ein Bauteilmerkmal
         danebenliegt, misst dieses Merkmal statt des gesuchten. Diese
         Signatur hätte ich beim ersten Mal lesen müssen, statt am
         Winkelraster zu drehen.

         Die beiden vorherigen Anläufe bleiben trotzdem lehrreich: ein
         Raster aus 72 Strahlen las die Sehne statt des Scheitels, und
         der Fehler wuchs LINEAR MIT DEM RADIUS — die Handschrift eines
         Abtastfehlers, denn ein Formfehler skaliert nicht mit r, ein
         Sehnenfehler r·(1−cos(Δθ/2)) schon. Der Preis der Facettenmitte
         ist die Sehne über EINE Facette, rund drei Zehntausendstel
         Millimeter bei d90. Das rundet auf null. */
      { key: 'D1', label: DIMENSION_KEY.D1, soll: P.D1,
        ist: () => {
          /* Station dicht unter dem Absatz, nicht in der Mitte der
             Muffe. Der Mantel trägt 1° Entformungsschräge (DRAFT): vom
             Mundlochwulst läuft er leicht ein und erst am Absatz wieder
             auf volles Maß. In der Muffenmitte fehlten dadurch 0,01 mm
             bei d20 und 0,05 mm bei d110 — wieder linear mit dem
             Radius, aber diesmal ein ECHTES Merkmal des Bauteils und
             kein Messfehler. Eine Spritzgussmuffe ohne Schräge ließe
             sich nicht entformen. Gemessen wird deshalb dort, wo D1
             gilt. */
          const x = P.xStep - 1.0;
          const pitch = (2 * Math.PI) / P.ribCount;
          let best = 0;
          for (let i = 0; i < P.ribCount; i++) {
            const t = i * pitch + body.halfAng
              + (pitch - 2 * body.halfAng) * (3.5 / 6);
            /* WINKELKONVENTION: revolve legt bei Achse x ab als
               y = r·cos θ, z = r·sin θ. Der Strahl MUSS genauso rechnen.
               Er tat es zuerst umgekehrt, und das kostete drei Anläufe —
               siehe oben. */
            const cs = Math.cos(t), sn = Math.sin(t);
            const hit = strahl('body', V3(x, P.OD * cs, P.OD * sn), V3(0, -cs, -sn));
            if (hit) best = Math.max(best, Math.hypot(hit.y, hit.z));
          }
          return r2(2 * best);
        } },
      /* Muffenbohrung an der Nennebene, radial von der Achse aus
         angetastet. Der Sollwert ist das TABELLENMASS d — die Messung
         prüft das Modell gegen den Katalog, nicht gegen sich selbst. */
      { key: 'd', label: DIMENSION_KEY.d, soll: P.d,
        ist: () => {
          const hit = strahl('body', V3(P.xNenn, 0, 0), V3(0, 0, 1));
          return hit ? r2(2 * hit.z) : NaN;
        } },
      /* Muffentiefe. Der Strahl MUSS vom Muffenmund kommen: von der
         anderen Seite läge der Absatz zum Ringsitz im Weg, und der
         liegt im selben Radiusfenster wie der Muffengrund. */
      { key: 'tiefe', label: 'Muffentiefe (Katalog-Muffentabelle)', soll: P.socket,
        ist: () => {
          const rr = (P.d / 2 + P.boreR) / 2;
          const hit = strahl('body', V3(-P.xEnd - 20, rr, 0), V3(1, 0, 0));
          return hit ? r2(hit.x + P.xEnd) : NaN;
        } },
      /* Innengewinde: Strahl von der Achse nach außen. Der engste Punkt
         der Bohrung ist die Kuppe und liegt auf dem Kerndurchmesser.
         Zweite Kuppe — die erste sitzt auf der Fuge zum Ringsitz. */
      { key: 'kern', label: 'Innengewinde-Kerndurchmesser', soll: P.threadCore,
        ist: () => {
          const x = P.xEnd - P.brassLen + 1.0 + P.threadPitch;
          const hit = strahl('ring', V3(x, 0, 0), V3(0, 0, 1));
          return hit ? r2(2 * hit.z) : NaN;
        } },
      /* GEGENPROBE: zwischen zwei Kuppen liegt der Grund auf dem
         Nenndurchmesser, abzüglich des Fillet-Rückzugs. Der Strahl MUSS
         dort weiter fliegen — gleicher Wert hieße glatte Bohrung. */
      { key: 'nenn', label: 'Innengewinde-Nenndurchmesser (Grund)',
        soll: r2(P.threadOD - P.threadRootRise),
        ist: () => {
          const x = P.xEnd - P.brassLen + 1.0 + 1.5 * P.threadPitch;
          const hit = strahl('ring', V3(x, 0, 0), V3(0, 0, 1));
          return hit ? r2(2 * hit.z) : NaN;
        } },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
