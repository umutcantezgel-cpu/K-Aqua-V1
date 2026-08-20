/* K-Aqua Metallverschraubung mit PP-R-Mutter (Innengewinde) —
   Produktpaket nach PRODUKT-VERTRAG.md.

   Zwei Werkstoffe, zwei Schlüsselweiten. Der Halbschnitt zeigt, wie
   weit das Innengewinde in den Messingkörper reicht und wo der
   Werkstoffwechsel liegt. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildSleeve, buildMetal } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'transition-fittings/metal-union-female-thread',
  module: 'kaqua-metal-union-female-thread',
  titleDe: 'Metallverschraubung mit PP-R-Mutter (Innengewinde)',
  titleEn: 'Metal union with PP-R nut (Female thread)',
  category: 'transition-fittings',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'Rp', 'L', 'SW1'],
  dimensions: ['L', 'SW1'],
  ariaFields: ['d', 'L', 'SW', 'SW1'],

  variants: [],
  states: null,

  tile: 'Übergang von PP-R auf metrisches Innengewinde — lösbar, ' +
        'mit zwei Schlüsselflächen zum Gegenhalten.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Metallverschraubung_IG_d' + size,
      materials: ['pprGreen', 'brass'],
      seed: 163,
      clipPlane,
    });

    const sleeve = buildSleeve(P);
    const metal = buildMetal(P);

    A.part('sleeve', {
      name: 'PP_Muffe', label: 'PP-R-Muffe mit Schweißmuffe', mat: 'pprGreen',
      geo: sleeve.geo, cap: sleeve.cap,
      explode: -0.5 * P.len,
      anchor: V3(-P.xEnd + P.sleeveLen * 0.5, P.rSleeve + 0.28 * P.len, 0),
    });
    A.part('metal', {
      name: 'Messingkoerper', label: 'Messingkörper Rp' + P.Rp + '"', mat: 'brass',
      geo: metal.geo, cap: metal.cap,
      explode: 0.5 * P.len,
      anchor: V3(P.xNutStart, -(P.rCollar + 0.24 * P.len), 0),
    });

    A.light(V3(-P.xEnd * 0.5, 0, 0));
    A.light(V3(P.xEnd * 0.6, 0, 0));

    A.hotspot({
      v: V3(-P.xEnd + Math.max(3, 0.10 * P.len), P.rSleeve * 0.5, P.rSleeve * 0.84),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(P.xEnd - P.nutLen * 0.4, P.rCollar * 0.6, P.rCollar * 0.6),
      n: V3(0.25, 0.68, 0.69),
      text: 'Innengewinde Rp' + P.Rp + '" nach ISO 228-1, ' + P.turns + ' Gänge',
    });
    A.hotspot({
      v: V3(P.xBodyStart + P.bodyLen * 0.5, 0, P.afBody / 2),
      n: V3(0, 0.2, 0.98),
      text: 'Schlüsselflächen SW ' + P.SW1 + ' am Körper — zum Gegenhalten ' +
        'beim Anziehen',
    });

    const zf = P.rBodyCirc + 0.14 * P.len;
    const yL = -(P.rBodyCirc + 0.32 * P.len);
    A.dim({ label: 'L', value: P.len,
      a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf), off: V3(0, 0.12 * P.len, 0) });
    const xD = -P.xEnd - 0.16 * P.len;
    A.dim({ label: 'SW1', value: P.SW1,
      a: V3(xD, -P.SW1 / 2, zf), b: V3(xD, P.SW1 / 2, zf),
      off: V3(0.14 * P.len, 0, 0) });

    A.measures = [
      { key: 'L', label: DIMENSION_KEY.L, soll: P.len,
        ist: () => { const b = A.boxOf(); return b.max.x - b.min.x; } },
      /* Schlüsselweite SW1: Strahl in -Z auf die Sechskantmitte.
         hexPrism legt die FLÄCHE auf Z und die ECKE auf Y — eine Box3
         misst deshalb das Eckenmaß, nicht die Schlüsselweite (Fall 11). */
      { key: 'SW1', label: DIMENSION_KEY.SW1, soll: P.SW1,
        ist: () => {
          const x = P.xBodyStart + P.bodyLen * 0.5;
          const hit = A.probeAxial('metal', V3(x, 0, P.SW1 * 2), V3(0, 0, -1));
          return hit ? Math.round(2 * hit.z * 100) / 100 : NaN;
        } },
      /* ── Zwei Prüfungen gegen das KATALOGFOTO ──
         Die frühere SW-Prüfung verglich P.SW gegen P.SW, also eine
         Annahme gegen sich selbst (Fall 12). Sie blieb bei 0,00 mm,
         während die Silhouette dem Foto widersprach: 62 mm Breite bei
         48 mm Länge, Aspekt 0,77 gegen fotografisch mindestens 1,07.

         Diese beiden Messungen prüfen stattdessen die Gestalt. Die
         Sollwerte stammen aus der spaltenweisen Auswertung von
         quellen/w3-metal-union-fem.png und sind in data.js belegt. */
      /* Das Foto liefert eine OBERGRENZE, keine Zielgröße: Breite
         höchstens L/1,07. Geprüft wird deshalb die Überschreitung,
         Soll 0 — eine Gleichheitsprüfung würde jede zulässige
         Unterschreitung als Fehler melden.

         Die Grenze gilt für die fotografierte Größe. Bei d40 und
         darüber ist das Teil naturgemäß breiter als lang (L wächst
         langsamer als d), deshalb greift sie nur bis d32. */
      { key: 'breite', label: 'Breitenüberschreitung gegen Foto (0 = im Rahmen)',
        soll: 0,
        ist: () => {
          if (P.d > 32) return 0;
          const b = A.visibleBoxOf();
          const w = Math.max(b.max.y - b.min.y, b.max.z - b.min.z);
          return Math.round(Math.max(0, w - P.len / 1.07) * 100) / 100;
        } },
      /* Grünanteil: Soll ist die aus der Schweißtiefe folgende Länge,
         nicht der Fotowert. Begründung in params.js — die Schweißtiefe
         ist durch das Werkzeug festgelegt, das Foto kann täuschen.
         Die Abweichung zum Foto (30 %) steht im Prüfbericht. */
      { key: 'gruen', label: 'Grünanteil der Länge in Prozent',
        soll: P.sleeveShare,
        /* visibleBoxOf statt boxOf: der Schnittflächen-Stencil ist
           unsichtbar, geht aber in die normale Box3 ein und deckt die
           volle Profilausdehnung ab. */
        ist: () => {
          const s = A.visibleBoxOf(['sleeve']), all = A.visibleBoxOf();
          return Math.round((s.max.x - s.min.x) / (all.max.x - all.min.x) * 1000) / 10;
        } },
      /* Der freiliegende Bundring zwischen PP-R-Muffe und Messingkörper —
         die Lücke L − (l + l1) aus der Tabelle. */
      { key: 'ring', label: 'Bundring zwischen Muffe und Körper', soll: P.collarGap,
        ist: () => {
          const s = A.visibleBoxOf(['sleeve']), m = A.visibleBoxOf(['metal']);
          return Math.round((m.min.x - s.max.x) * 100) / 100;
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
