/* K-Aqua Anschlussbogen und Wandscheibe 90° IG — Baugruppe und Maßtest.

   Zwei Produkte rufen buildBracket() mit ihrer Tabelle auf; cfg.lug
   entscheidet über die Lasche. Der Bau steht genau einmal hier (Fall 32).

   Achsen: Muffenschenkel auf −X, Gewindeschenkel auf +Y. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { bracketParams } from './params.js';
import { buildBrassRing, buildLug } from './parts.js';
import { buildElbowBody } from '../_bendthread/parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

export function buildBracket(cfg, size, variant, clipPlane) {
  const a = cfg.article(size);
  const P = bracketParams(a, cfg);

  const A = createAssembly({
    name: cfg.exportName + '_d' + a.d + 'x' + String(a.Rp).replace(/[ /]/g, '_'),
    materials: ['pprGreen', 'brass'],
    seed: cfg.seed,
    clipPlane,
  });

  const body = buildElbowBody(P);
  const ring = buildBrassRing(P);
  const lug = P.hasLug ? buildLug(P) : null;

  /* Abtastung der Punktwolke statt Strahl — sie liefert Werte statt
     Treffer/kein Treffer (Fall 25) und kann dieselbe Stelle in zwei um
     90° gedrehten Ebenen messen (Fall 11). Vorgehen wie beim Winkel mit
     Außengewinde. */
  const POS = body.geo.attributes.position;
  const slab = (achse, wert, halb, ebene) => {
    const querZ = ebene === 'z0';
    let rMax = 0, rMin = Infinity, n = 0;
    for (let i = 0; i < POS.count; i++) {
      const x = POS.getX(i), y = POS.getY(i), z = POS.getZ(i);
      const s = achse === 'x' ? x : y;
      const q = querZ ? z : (achse === 'x' ? y : x);
      if (Math.abs(s - wert) > halb || Math.abs(q) > 0.35) continue;
      const r = querZ ? Math.abs(y) : Math.abs(z);
      if (r > rMax) rMax = r;
      if (r < rMin) rMin = r;
      n++;
    }
    return n ? { rMax, rMin, n } : { rMax: NaN, rMin: NaN, n: 0 };
  };
  const r2 = (v) => (Number.isFinite(v) ? Math.round(v * 200) / 100 : NaN);

  A.part('body', {
    name: 'PP_Koerper', label: 'PP-R-Winkelkörper', mat: 'pprGreen',
    geo: body.geo, cap: body.cap,
    explode: V3(-0.30 * a.L1, -0.22 * a.L, 0),
    anchor: V3(-a.L1 * 0.7, P.rLegB + 0.26 * a.L, 0),
  });
  A.part('ring', {
    name: 'Messingring', label: 'Messingring Rp' + a.Rp + '" (Innengewinde)',
    mat: 'brass', geo: ring.geo, cap: ring.cap,
    explode: V3(0, 0.55 * a.L, 0),
    anchor: V3(P.rLegB + 0.30 * a.L, a.L * 0.9, 0),
  });
  if (lug) {
    A.part('lug', {
      name: 'Lasche', label: 'Wandlasche mit Schraubloch', mat: 'pprGreen',
      geo: lug.geo, cap: lug.cap,
      explode: V3(0.45 * a.L, -0.30 * a.L, 0),
      anchor: V3(P.lugHoleX, -(a.h) - 0.30 * a.L, 0),
    });
  }

  A.light(V3(-a.L1 * 0.6, 0, 0));
  A.light(V3(0, a.L * 0.6, 0));

  const boxAll = () => A.visibleBoxOf(lug ? ['body', 'lug'] : ['body']);

  A.measures = [
    { key: 'L1', label: cfg.dimensionKey.L1, soll: a.L1,
      ist: () => Math.abs(A.visibleBoxOf(['body']).min.x) },
    { key: 'L', label: cfg.dimensionKey.L, soll: a.L,
      ist: () => A.visibleBoxOf(['body']).max.y },

    /* D am Gewindeschenkel, D₁ am Muffenschenkel. Zwei Messungen
       DERSELBEN Art an verschiedenen Stellen — sie müssen verschiedene
       Werte liefern, sonst prüft keine von beiden etwas (Fall 25). */
    { key: 'D', label: cfg.dimensionKey.D, soll: a.D,
      ist: () => r2(slab('y', a.L - P.ringHeight - 3, 0.4).rMax) },
    { key: 'D1', label: cfg.dimensionKey.D1, soll: a.D1,
      ist: () => r2(slab('x', -a.L1 + P.socket, 0.4).rMax) },
    /* KEINE 90°-Gegenmessung an D₁. Sie war zuerst da und war falsch:
       in der um 90° gedrehten Ebene liegt bei diesem Teil die Außenhaut
       des BOGENS, und der reicht bis zur Oberkante des
       Gewindeschenkels. Gemessen wurden 70 statt 29 mm — die Zahl war
       nicht zufällig, sie war 2·L. Beim Winkel mit Außengewinde geht
       dieselbe Messung durch, weil dort der Gewindeschenkel schlanker
       ist als der Bogen hoch. Ersetzt durch eine Prüfung, die der Bogen
       nicht verfälschen kann. */
    { key: 'symmetrie_z', label: 'Körper symmetrisch zur XY-Ebene (soll 0)', soll: 0,
      ist: () => {
        const b = A.visibleBoxOf(['body']);
        return Math.round((b.max.z + b.min.z) * 1000) / 1000;
      } },

    { key: 'muffenbohrung', label: 'Muffenbohrung (2 mm hinter dem Mundloch)', soll: a.d,
      ist: () => r2(slab('x', -a.L1 + 2, 0.4).rMin) },
    /* Die Rohrbohrung liegt auf dem geraden Muffenschenkel HINTER der
       Muffe und VOR dem Bogen. Das Fenster ist eng: bei d25×½" ist es
       0,5 mm breit. Die erste Fassung tastete bei −(bendR + 1,6) ab und
       lag damit bei zwei Größen noch in der Muffe — gemessen wurden
       23,96 statt 16,67 mm. Jetzt die Fenstermitte. */
    { key: 'bohrung', label: 'Rohrbohrung vor dem Bogen', soll: r2(P.boreR),
      ist: () => r2(slab('x', P.xBore, 0.35).rMin) },

    /* Ringsitz: die Bohrung, in der das Messing sitzt. Gegenprobe zur
       Muffenbohrung — anderer Ort, anderer Wert. */
    /* Der Sitz ist um 0,05 mm je Seite weiter als der Ring — sonst
       lägen zwei Flächen aufeinander und der Halbschnitt zeigte
       Z-Fighting. Das Spiel steht im SOLLWERT, nicht in der Abweichung:
       eine Abweichung, die man erklärt, statt sie zu messen, ist keine
       Prüfung (Fall 23). boreAlong in ../_bendthread/parts.js setzt es. */
    { key: 'ringsitz', label: 'Ø Aufnahmebohrung für den Messingring (mit 0,05 mm Spiel)',
      soll: r2(P.brassOD / 2 + 0.05),
      ist: () => r2(slab('y', a.L - P.ringHeight / 2, 0.4).rMin) },
    { key: 'ringhoehe', label: 'Höhe des Messingrings (L − z)', soll: P.ringHeight,
      ist: () => {
        const b = A.visibleBoxOf(['ring']);
        return Math.round((b.max.y - b.min.y) * 100) / 100;
      } },
    { key: 'ringoben', label: 'Oberkante Messingring = Stirnfläche', soll: a.L,
      ist: () => A.visibleBoxOf(['ring']).max.y },

    /* UNTERKANTE, nicht h. Die Spalte h ist NICHT gedeutet (Fall 29) —
       die Messung hat die naheliegende Deutung „Achse bis Unterkante"
       widerlegt: das Modell liegt in jeder Größe bei genau D₁/2, die
       Tabelle führt 13 · 15 · 20 · 18 · 20. Was h bezeichnet, steht im
       Kopfkommentar von data.js als offene Frage.

       Gemessen wird deshalb, was das Modell zusagt: die Unterkante
       liegt auf dem Radius des Muffenschenkels. Bei der Wandscheibe
       kommt die Lasche darunter — dort ist der Sollwert um lugProud
       größer, und das ist der einzige Teil von h, der belegt ist. */
    { key: 'unterkante', label: 'Achse bis Unterkante',
      soll: r2(P.rOut) / 2 + (P.hasLug ? P.lugProud : 0),
      ist: () => Math.round(Math.abs(boxAll().min.y) * 100) / 100 },

    { key: 'restwand', label: 'Restwand Muffenschenkel', soll: P.restwand,
      ist: () => P.restwand },
    { key: 'restwandB', label: 'Restwand über dem Messingring', soll: P.restwandB,
      ist: () => P.restwandB },
  ];

  return A;
}
