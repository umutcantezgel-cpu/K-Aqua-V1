/* K-Aqua Verschraubung (PP-R) — Produktpaket nach PRODUKT-VERTRAG.md.

   Vier Teile nach der dritten Deutung (data.js): Gewindeteil,
   Überwurfmutter MITTIG, Muffenstück, O-Ring. Render und Produktfoto
   zeigen die Mutter unabhängig voneinander in der Mitte mit Stutzen zu
   beiden Seiten — die zweite Fassung trug sie am Ende und stand damit
   als Mangel M2 im Register. Die Explosionsansicht zeigt, was der
   Monteur beim Lösen in der Hand hat. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildStub, buildNut, buildTail, buildORing } from './parts.js';

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

    const stub = buildStub(P);
    const nut = buildNut(P);
    const tail = buildTail(P);
    const oring = buildORing(P);

    A.part('stub', {
      name: 'Gewindeteil', label: 'Gewindeteil mit Schweißmuffe (PP-R)', mat: 'pprGreenB',
      geo: stub.geo, cap: stub.cap,
      explode: -0.45 * P.len,
      anchor: V3(-P.xEnd + P.stubShow * 0.5, -(P.rStub + 0.24 * P.len), 0),
    });
    A.part('nut', {
      name: 'Ueberwurfmutter', label: 'Überwurfmutter (PP-R)', mat: 'pprGreen',
      geo: nut.geo, cap: nut.cap,
      explode: -0.18 * P.len,
      anchor: V3(P.xNutA + P.nutLen * 0.5, P.rOut + 0.26 * P.len, 0),
    });
    A.part('tail', {
      name: 'Muffenstueck', label: 'Muffenstück (PP-R)', mat: 'pprGreenB',
      geo: tail.geo, cap: tail.cap,
      explode: 0.45 * P.len,
      anchor: V3(P.xEnd - P.tailShow * 0.4, -(P.rStub + 0.22 * P.len), 0),
    });
    A.part('oring', {
      name: 'O_Ring', label: 'O-Ring (EPDM)', mat: 'epdm',
      geo: oring.geo, cap: oring.cap,
      explode: V3(0, 0.42 * P.len, 0),
      anchor: V3(P.oRingX, P.oRingR + 0.30 * P.len, 0),
    });

    A.light(V3(-P.xEnd * 0.5, 0, 0));
    A.light(V3(P.xEnd * 0.5, 0, 0));

    A.hotspot({
      v: V3(P.xEnd - Math.max(3, 0.10 * P.len), P.rStub * 0.5, P.rStub * 0.84),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(P.xNutA + P.nutLen * 0.5, P.rOut * 0.55, P.rOut * 0.82),
      n: V3(0, 0.55, 0.83),
      text: 'Überwurfmutter G ' + P.G + '" mit ' + P.ribCount +
        ' Riffeln — von Hand zu lösen',
    });
    A.hotspot({
      v: V3(-P.xEnd + P.stubShow * 0.5, P.rStub * 0.6, P.rStub * 0.8),
      n: V3(0, 0.6, 0.8),
      text: 'Gewindeteil — sein Außengewinde liegt unter der Mutter; der ' +
        'O-Ring an der Fuge dichtet, die Verbindung lässt sich mehrfach lösen',
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
          const from = V3(P.xNutA + P.nutLen * 0.5, P.OD * Math.cos(th), P.OD * Math.sin(th));
          const dir = V3(0, -Math.cos(th), -Math.sin(th));
          const hit = A.probeAxial('nut', from, dir);
          return hit ? Math.round(2 * Math.hypot(hit.y, hit.z) * 100) / 100 : NaN;
        } },
      { key: 'l', label: DIMENSION_KEY.l, soll: P.nutLen,
        ist: () => { const b = A.boxOf(['nut']); return b.max.x - b.min.x; } },
      /* l1 ist nach der dritten Deutung die GESAMTLÄNGE des
         Gewindeteils — also die Box des Teils, das großteils unter der
         Mutter steckt. In der zweiten Fassung hieß das Teil rechts l1
         und keine Messung fasste es an; beides ist korrigiert. */
      { key: 'l1', label: DIMENSION_KEY.l1, soll: P.stubLen,
        ist: () => { const b = A.boxOf(['stub']); return b.max.x - b.min.x; } },
      /* Die beiden Sichtzonen — sie sind der Kern des Mangels M2 und
         MÜSSEN verschiedene Werte liefern (Fall 25): links l1 − l,
         rechts L − l1. */
      { key: 'stubShow', label: 'sichtbarer Stutzen links', soll: P.stubShow,
        ist: () => {
          const st = A.boxOf(['stub']), n = A.boxOf(['nut']);
          return Math.round((n.min.x - st.min.x) * 100) / 100;
        } },
      { key: 'tailShow', label: 'sichtbares Muffenstück rechts', soll: P.tailShow,
        ist: () => {
          const t = A.boxOf(['tail']), n = A.boxOf(['nut']);
          return Math.round((t.max.x - n.max.x) * 100) / 100;
        } },
      { key: 'oring', label: 'O-Ring-Versatz zur Fuge', soll: 0,
        ist: () => {
          const b = A.boxOf(['oring']);
          const mitte = (b.min.x + b.max.x) / 2;
          return Math.round(Math.abs(mitte - P.oRingX) * 100) / 100;
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
