/* K-Aqua T-Stück für Innenventil — Parametrik.

   Der Durchgang ist ein gewöhnlicher T-Stück-Durchgang und kommt aus
   ../_tee/parts.js (runProfile). Was dieses Produkt ausmacht, sitzt
   oben: eine Aufnahme mit konstantem Außendurchmesser D1 = 45 und
   konstanter Höhe h = 33, in die ein genormtes Ventiloberteil
   eingeschraubt wird.

   DASS BEIDE KONSTANT SIND, IST DIE AUSSAGE DES PRODUKTS. Deshalb
   werden sie nicht aus d gerechnet, sondern aus der Tabelle genommen —
   und data.js bricht ab, wenn eine Zeile davon abweicht. */

import { D2R, fusionDepth, threadSpec } from '../../core/index.js';
import { article } from './data.js';

export function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);
  const d = a.d;

  const th = threadSpec(a.G);
  if (!th) throw new Error('K-Aqua Innenventil-T ' + a.code + ': kein Normmaß für G' + a.G);
  P.threadOD = th.od;
  P.threadPitch = th.pitch;
  P.threadH = 0.640327 * th.pitch;
  P.threadCore = Math.round((th.od - 2 * P.threadH) * 1000) / 1000;
  P.threadRd = Math.max(0.3, 0.137 * th.pitch);
  P.threadRootRise = Math.round(2 * P.threadRd * (1 / Math.sin(27.5 * D2R) - 1) * 1000) / 1000;

  /* Durchgang — dieselben Felder, die runProfile erwartet. */
  P.half = a.L / 2;
  P.run = a.L;
  P.OD = a.D;
  P.rOut = a.D / 2;
  P.wallFitting = (a.D - d) / 2;
  P.socket = fusionDepth(d);
  if (!P.socket) throw new Error('K-Aqua Innenventil-T ' + a.code + ': keine Schweißtiefe für d' + d);
  P.wallPipe = d / 6;
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);
  P.restwand = P.wallFitting;
  P.emR = Math.min(2.0, 0.05 * d);
  P.xBell = P.half - Math.max(3, 0.10 * P.socket);
  P.filletR = Math.max(1.5, 0.18 * d);

  /* Ventildom. */
  P.domOD = a.D1;
  P.rDom = a.D1 / 2;
  P.yTop = a.h;

  /* ASSUMPTION Gewindetiefe im Dom. Nicht bemaßt. Die Aufnahme muss das
     Oberteil so tief fassen, wie es einschraubt; die Einschraubtiefe
     eines G-Gewindes entspricht der eines R-Gewindes gleicher Größe, und
     die steht im Katalog auf S. 94 als l − z der AG-Übergangsmuffe:
     16 mm bei ¾", 18 mm bei 1". Nach oben begrenzt durch die Höhe, die
     der Dom über dem Durchgang überhaupt hat. */
  const einschraub = { '3/4': 16, '1': 18 }[a.G];
  if (!einschraub) throw new Error('K-Aqua Innenventil-T ' + a.code + ': keine Einschraubtiefe für G' + a.G);
  P.ringLen = Math.min(einschraub + 2, a.h - P.rOut * 0.55);
  P.turns = Math.max(3, Math.floor((P.ringLen - 1.6) / P.threadPitch));

  /* Der Messingring sitzt im PP-Dom; außen bleibt Kunststoff stehen. */
  P.rRing = Math.min(P.threadOD / 2 + Math.max(2.0, 0.13 * P.threadOD), P.rDom - 3.0);
  P.ringWand = P.rRing - P.threadOD / 2;

  /* Messhöhe am Dom. Sie muss über der Kehle liegen (sonst misst man den
     Verrundungsübergang) und unter der Stirnfase. Dass sie hier steht und
     nicht in index.js, hat einen Grund: parts.js setzt an genau dieser
     Höhe einen Profilpunkt. Ohne ihn hat der zylindrische Dom zwischen
     Kehle und Stirnfläche ÜBERHAUPT KEINEN Netzpunkt, und die Messung
     fände ein leeres Fenster vor — heute der sechste Fall dieser Art. */
  P.yMess = Math.min(P.rOut + P.filletR + 1.5, P.yTop - 4);

  /* Gegenprobe der Spalte z, nicht zum Bauen. */
  P.socketFromTable = Math.round(((a.L - a.z) / 2) * 10) / 10;
  P.depthDeltaToNorm = Math.round((P.socketFromTable - P.socket) * 10) / 10;

  if (P.rDom <= P.rOut) {
    throw new Error('K-Aqua Innenventil-T ' + a.code + ': Dom D1 = ' + a.D1 +
      ' ist nicht dicker als der Durchgang D = ' + a.D);
  }
  if (P.ringWand < 1.5) {
    throw new Error('K-Aqua Innenventil-T ' + a.code + ': Ringwand ' +
      P.ringWand.toFixed(2) + ' mm — G' + a.G + ' passt nicht in den Dom D1 = ' + a.D1);
  }
  if (P.yTop - P.ringLen <= P.boreR + 2) {
    throw new Error('K-Aqua Innenventil-T ' + a.code + ': das Gewinde reicht bis in die Durchgangsbohrung');
  }
  if (P.socket >= P.half - 2) {
    throw new Error('K-Aqua Innenventil-T ' + a.code + ': Muffentiefe ' + P.socket +
      ' passt nicht in die halbe Baulänge ' + P.half);
  }
  if (P.threadCore <= P.bore) {
    throw new Error('K-Aqua Innenventil-T ' + a.code + ': Gewindekern ' + P.threadCore +
      ' liegt nicht über der Durchgangsbohrung ' + P.bore.toFixed(1));
  }
  return P;
}
