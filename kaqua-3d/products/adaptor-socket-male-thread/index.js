/* K-Aqua Übergangsmuffe mit Außengewinde — Produktpaket.

   Erstes Verbundteil: PP-R-Körper plus Messingzapfen. Zwei Teile,
   deshalb auch die erste Explosionsansicht seit dem Kugelhahn, die
   etwas zeigt — die Fügestelle. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, DATA_STATUS, DIMENSION_KEY, SIZES } from './data.js';
import { params } from './params.js';
import { buildBrass, buildSleeve } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'transition-fittings/adaptor-socket-male-thread',
  module: 'kaqua-adaptor-socket-male-thread',
  titleDe: 'Übergangsmuffe mit Außengewinde',
  titleEn: 'Adaptor socket (Male thread)',
  category: 'transition-fittings',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel: (k) => {
    const [d, r] = String(k).split('x');
    return 'd' + d + ' · R' + r.replace(/_/g, ' ') + '"';
  },
  sizeTitle: 'Nennweite · Gewinde',
  defaultSize: '32x1',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'R', 'D', 'l', 'kg'],
  dimensions: ['l', 'D'],
  ariaFields: ['d', 'D', 'D1', 'l', 'z'],

  variants: [],
  states: null,

  tile: 'Übergang von PP-R auf Rohrgewinde — Messingzapfen im ' +
        'PP-Körper. Im Schnitt wird die Fügestelle sichtbar.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Uebergangsmuffe_AG_' + P.key,
      materials: ['pprGreen', 'brass'],
      seed: 127,
      clipPlane,
    });

    const sleeve = buildSleeve(P);
    const brass = buildBrass(P, sleeve.xB);

    A.part('sleeve', {
      name: 'PP_Koerper', label: 'PP-R-Körper mit Schweißmuffe', mat: 'pprGreen',
      geo: sleeve.geo, cap: sleeve.cap,
      explode: -0.55 * P.len,
      anchor: V3(-P.xEnd + P.ppLen * 0.5, P.rSleeve + 0.26 * P.len, 0),
    });
    A.part('brass', {
      name: 'Messingzapfen', label: 'Messingzapfen R' + P.R + '"', mat: 'brass',
      geo: brass.geo, cap: brass.cap,
      explode: 0.55 * P.len,
      anchor: V3(P.xEnd - P.brassLen * 0.4, -(P.rOut + 0.22 * P.len), 0),
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
      v: V3(P.xEnd - P.threadLen * 0.5, P.threadOD * 0.45, P.threadOD * 0.32),
      n: V3(0.2, 0.8, 0.56),
      text: 'Kegeliges Rohrgewinde R' + P.R + '" nach ISO 7-1, ' +
        P.turns + ' Gänge, Steigung ' + String(P.threadPitch).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(-P.xEnd + P.ppLen + P.collarLen * 0.5, P.af * 0.42, P.af * 0.3),
      n: V3(0, 0.8, 0.6),
      text: 'Sechskant SW ' + String(P.af).replace('.', ',') + ' mm zum Gegenhalten',
    });

    const zf = P.rOut + 0.12 * P.len;
    const yL = -(P.rOut + 0.30 * P.len);
    A.dim({ label: 'l', value: P.len,
      a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf), off: V3(0, 0.11 * P.len, 0) });
    const xD = -P.xEnd - 0.16 * P.len;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf), off: V3(0.13 * P.len, 0, 0) });

    A.measures = [
      { key: 'l', label: DIMENSION_KEY.l, soll: P.len,
        ist: () => { const b = A.boxOf(); return b.max.x - b.min.x; } },
      /* Eckenmaß des Sechskants — das ist D. Die Box3-Ausdehnung
         allein wäre blind: sie ist für einen runden Bund mit R = D/2
         und einen Sechskant über Ecke identisch. Genau so ist der
         unsichtbare Sechskant durch den Test gekommen. */
      /* Eckenmaß = D. hexPrism legt die Ecke auf die Y-Achse. Der
         0,3-mm-Eckenradius setzt den Scheitel um rund 0,05 mm zurück;
         die restliche Differenz ist der Radius selbst — dieselbe Art
         beabsichtigter Abweichung wie der Formtrenngrat am PP-Teil. */
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => { const b = A.boxOf(['brass']); return b.max.y - b.min.y; } },
      /* Schlüsselweite: quer zur Fläche gemessen. Nur diese Messung
         beweist, dass der Sechskant die Silhouette bildet — bei einem
         umhüllenden Zylinder käme hier D heraus, nicht af. */
      { key: 'af', label: 'Schlüsselweite SW', soll: P.af,
        /* Strahl auf die Sechskantmitte, in −Z: dort liegt die
           Schlüsselfläche (Orientierungsvermerk bei hexPrism). Eine
           Box3 wäre hier untauglich — bei kleinen Größen ist der
           Anschlussbund am PP-Körper breiter als der Sechskant und
           würde stattdessen gemessen.

           Nur diese Messung beweist, dass der Sechskant die Silhouette
           bildet: bei einem umhüllenden Zylinder käme D heraus, nicht af. */
        ist: () => {
          const x = -P.xEnd + P.ppLen + (P.collarLen - P.hexLen) * 0.5 + P.hexLen * 0.5;
          const hit = A.probeAxial('brass', V3(x, 0, P.OD), V3(0, 0, -1));
          return hit ? Math.round(2 * hit.z * 100) / 100 : NaN;
        } },
      /* Am Riffelrücken gemessen: die Nuten liegen planmäßig unter dem
         Nennmaß, und ein einzelner Strahl trifft je nach Winkel Nut
         oder Rücken. Die Box3 des PP-Teils erfasst immer den Rücken. */
      { key: 'D1', label: DIMENSION_KEY.D1, soll: P.D1,
        ist: () => { const b = A.boxOf(['sleeve']); return b.max.z - b.min.z; } },
      /* ── Der Gewindescheitel, abgetastet ──
         Hier stand: `soll: P.threadOD, ist: () => P.threadOD`. Das ist
         Fall 12 in Reinform — die Messung gibt die Annahme zurück, die
         sie prüfen soll, und meldet auf ewig 0,00 mm. Fall 20 verlangt
         genau das Gegenteil: kommt ein Katalogmaß aus einer
         Core-Funktion, muss mindestens ein Produkt es ABTASTEN.

         Der Strahl fährt die zweite Kuppe an (die erste liegt auf der
         Profilfuge zum Bund). Der Kegel 1:16 verjüngt sie gegenüber
         dem Nennmaß um 2·pitch/32.

         Korrigiert am 23.08.2026 zusammen mit den
         Metallverschraubungen, die denselben Nachweis führen. */
      { key: 'gewinde', label: 'Gewinde-Außendurchmesser R' + P.R + '" (2. Kuppe)',
        soll: Math.round((P.threadOD - 2 * P.threadPitch / 32) * 100) / 100,
        ist: () => {
          const x = -P.xEnd + P.ppLen + P.collarLen + P.threadPitch;
          const hit = A.probeAxial('brass', V3(x, 0, P.threadOD), V3(0, 0, -1));
          return hit ? Math.round(2 * hit.z * 100) / 100 : NaN;
        } },
      /* GEGENPROBE: der Grund zwischen zwei Kuppen MUSS eine
         Gewindetiefe tiefer liegen. Gleicher Wert hieße, das Gewinde
         ist ein glatter Kegel (Fall 25). Der Grund trägt keinen
         Scheitelausgleich, sein Fillet schiebt ihn nach außen. */
      { key: 'gewindegrund', label: 'Gewinde-Kerndurchmesser',
        soll: (() => {
          const h = 0.640327 * P.threadPitch;
          const rd = Math.max(0.3, 0.137 * P.threadPitch);
          return Math.round((P.threadOD - 2 * (1.5 * P.threadPitch) / 32 - 2 * h
            + 2 * rd * (1 / Math.sin(27.5 * Math.PI / 180) - 1)) * 100) / 100;
        })(),
        ist: () => {
          const x = -P.xEnd + P.ppLen + P.collarLen + 1.5 * P.threadPitch;
          const hit = A.probeAxial('brass', V3(x, 0, P.threadOD), V3(0, 0, -1));
          return hit ? Math.round(2 * hit.z * 100) / 100 : NaN;
        } },
      { key: 'restwand', label: 'Muffenwand', soll: P.restwand, ist: () => P.restwand },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
