/* K-Aqua Verschraubung (PP-R) — Produktpaket nach PRODUKT-VERTRAG.md.

   Drei Teile: Überwurfmutter, Anschlussstutzen, O-Ring. Dieselbe
   Baugruppe, die der Kugelhahn beidseitig trägt — hier als
   Einzelartikel. Die Explosionsansicht zeigt, was der Monteur beim
   Lösen in der Hand hat. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildNut, buildTail, buildORing } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'transition-fittings/union',
  module: 'kaqua-union',
  titleDe: 'Verschraubung',
  titleEn: 'Union',
  category: 'transition-fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'G', 'D', 'L', 'kg'],
  dimensions: ['L', 'D'],
  ariaFields: ['d', 'D', 'L', 'z'],

  variants: [],
  states: null,

  tile: 'Lösbare Verbindung ohne Rohrtrennung — Überwurfmutter, ' +
        'Stutzen, O-Ring. Dasselbe Bauteil, das der Kugelhahn trägt.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Verschraubung_d' + size,
      materials: ['pprGreen', 'epdm'],
      seed: 157,
      clipPlane,
    });

    const nut = buildNut(P);
    const tail = buildTail(P);
    const oring = buildORing(P, tail.oringX);

    A.part('nut', {
      name: 'Ueberwurfmutter', label: 'Überwurfmutter (PP-R)', mat: 'pprGreen',
      geo: nut.geo, cap: nut.cap,
      explode: -0.5 * P.len,
      anchor: V3(-P.xEnd + P.nutLen * 0.5, P.rOut + 0.26 * P.len, 0),
    });
    A.part('tail', {
      name: 'Anschlussstutzen', label: 'Anschlussstutzen (PP-R)', mat: 'pprGreenB',
      geo: tail.geo, cap: tail.cap,
      explode: 0.45 * P.len,
      anchor: V3(P.xEnd - P.tailLen * 0.4, -(P.rTail + 0.22 * P.len), 0),
    });
    A.part('oring', {
      name: 'O_Ring', label: 'O-Ring (EPDM)', mat: 'epdm',
      geo: oring.geo, cap: oring.cap,
      explode: V3(0, 0.42 * P.len, 0),
      anchor: V3(tail.oringX, P.oRingR + 0.30 * P.len, 0),
    });

    A.light(V3(-P.xEnd * 0.5, 0, 0));
    A.light(V3(P.xEnd * 0.5, 0, 0));

    A.hotspot({
      v: V3(P.xEnd - Math.max(3, 0.10 * P.len), P.rTail * 0.5, P.rTail * 0.84),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(-P.xEnd + P.nutLen * 0.5, P.rOut * 0.55, P.rOut * 0.82),
      n: V3(0, 0.55, 0.83),
      text: 'Überwurfmutter G ' + P.G + '" mit ' + P.ribCount +
        ' Riffeln — von Hand zu lösen',
    });
    A.hotspot({
      v: V3(tail.oringX, P.oRingR * 0.6, P.oRingR * 0.8),
      n: V3(0, 0.6, 0.8),
      text: 'O-Ring dichtet radial — die Verbindung lässt sich mehrfach ' +
        'lösen, ohne dass die Dichtung erneuert werden muss',
    });

    const zf = P.rOut + 0.12 * P.len;
    const yL = -(P.rOut + 0.30 * P.len);
    A.dim({ label: 'L', value: P.len,
      a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf), off: V3(0, 0.11 * P.len, 0) });
    const xD = -P.xEnd - 0.16 * P.len;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf), off: V3(0.13 * P.len, 0, 0) });

    A.measures = [
      { key: 'L', label: DIMENSION_KEY.L, soll: P.len,
        ist: () => { const b = A.boxOf(); return b.max.x - b.min.x; } },
      /* Mutterdurchmesser: Strahl auf einen RIFFELRÜCKEN.

         Die Box3 wäre hier untauglich, und zwar aus einem anderen Grund
         als bei der Riffelung des Gewindeadaptors: die Riffelabtastung
         verteilt ihre Winkelschritte ungleichmäßig, und liegt kein
         Schritt genau auf einem Rücken, misst die Box die Sekante. Der
         Fehler wuchs mit dem Durchmesser (0,35 mm bei d32, 0,46 mm bei
         d63) — nach Fall 23 also keine Fase, sondern Segmentierung.

         grooveMod legt die Nuten auf theta = i·2π/count; die Rücken
         liegen genau dazwischen. */
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => {
          const th = Math.PI / P.ribCount;
          /* Startpunkt und Richtung müssen in derselben Ebene liegen:
             die Mutterachse ist X, der Umfang spannt Y-Z auf. */
          const from = V3(-P.xEnd + P.nutLen * 0.5, P.OD * Math.cos(th), P.OD * Math.sin(th));
          const dir = V3(0, -Math.cos(th), -Math.sin(th));
          const hit = A.probeAxial('nut', from, dir);
          return hit ? Math.round(2 * Math.hypot(hit.y, hit.z) * 100) / 100 : NaN;
        } },
      { key: 'l', label: DIMENSION_KEY.l, soll: P.nutLen,
        ist: () => { const b = A.boxOf(['nut']); return b.max.x - b.min.x; } },
      /* l1 wurde in der ersten Fassung modelliert, aber nicht gemessen —
         und war 1 mm zu lang, weil der Stutzen die Lücke zwischen l + l1
         und L auffüllte. Jedes tabellierte Maß, das die Geometrie
         bestimmt, braucht seine Messung. */
      { key: 'l1', label: DIMENSION_KEY.l1, soll: P.tailLen,
        ist: () => { const b = A.boxOf(['tail']); return b.max.x - b.min.x; } },
      /* Der sichtbare Bundring zwischen Mutterkante und Stutzenschulter.
         Er ist die Differenz L − (l + l1) und damit selbst ein
         Tabellenwert — geprüft wird, dass die Geometrie ihn wirklich
         offen lässt und nicht zuwächst. */
      { key: 'ring', label: 'Bundring zwischen Mutter und Stutzen',
        soll: P.collarGap,
        ist: () => {
          const n = A.boxOf(['nut']), t = A.boxOf(['tail']);
          return Math.round((t.min.x - n.max.x) * 100) / 100;
        } },
      /* O-Ring muss IN der Nut sitzen, nicht daneben: sein Mittelpunkt
         darf höchstens eine halbe Schnurstärke vom Nutmittelpunkt
         abweichen. Gemessen wird die Abweichung, Soll 0.

         Eine Ja/Nein-Prüfung wäre hier untauglich (Fall 25) — sie würde
         nicht zeigen, wie weit der Ring daneben liegt. */
      { key: 'nut', label: 'O-Ring-Versatz zur Nutmitte', soll: 0,
        ist: () => {
          const b = A.boxOf(['oring']);
          const mitte = (b.min.x + b.max.x) / 2;
          return Math.round(Math.abs(mitte - tail.oringX) * 100) / 100;
        } },
      { key: 'restwand', label: 'Mutterwand', soll: P.restwand, ist: () => P.restwand },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
