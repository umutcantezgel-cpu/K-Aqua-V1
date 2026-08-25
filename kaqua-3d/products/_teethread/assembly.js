/* K-Aqua T-Stück 90° mit Gewinde — gemeinsame Baugruppe und Maßtest.

   Zwei Produkte rufen buildTeeThread() mit ihrer Tabelle und ihrem
   Gewindetyp auf. Der Bau steht genau einmal hier (Fall 32).

   Achsen: Durchgang auf X, Abzweig auf +Y. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { teeThreadParams } from './params.js';
import { buildBody, buildBrassRing, buildBrassSpigot } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;
const komma = (v) => String(v).replace('.', ',');

export function buildTeeThread(cfg, size, variant, clipPlane) {
  const a = cfg.article(size);
  const P = teeThreadParams(a, cfg);
  const male = cfg.threadKind === 'R';

  const A = createAssembly({
    name: cfg.exportName + '_d' + a.d + 'x' + P.threadLabel.replace(/[ /]/g, '_'),
    materials: ['pprGreen', 'brass'],
    seed: cfg.seed,
    clipPlane,
  });

  const body = buildBody(P);
  const brass = male ? buildBrassSpigot(P) : buildBrassRing(P);

  A.part('body', {
    name: 'PP_Koerper', label: 'T-Stück-Körper (PP-R)', mat: 'pprGreen',
    geo: body.geo, cap: body.cap,
    explode: V3(0, -0.30 * P.branchTotal, 0),
    anchor: V3(-P.half * 0.6, -(P.rOut + 0.22 * P.run), 0),
  });
  A.part('brass', {
    name: 'Messingteil',
    label: male
      ? 'Messingzapfen ' + P.threadKind + P.threadLabel + '" mit Sechskant'
      : 'Messingring ' + P.threadKind + P.threadLabel + '" (Innengewinde)',
    mat: 'brass',
    geo: brass.geo, cap: brass.cap,
    explode: V3(0, 0.55 * P.branchTotal, 0),
    anchor: V3(P.rOut + 0.30 * P.run, P.brassTop, 0),
  });

  A.light(V3(-P.half * 0.5, 0, 0));
  A.light(V3(P.half * 0.5, 0, 0));
  A.light(V3(0, P.ppTop * 0.6, 0));

  A.hotspot({
    v: V3(-P.half + Math.max(3, 0.10 * P.half), P.rOut * 0.45, P.rOut * 0.86),
    n: V3(0, 0.45, 0.89),
    text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
      komma(P.socket) + ' mm nach DVS 2207-11',
  });
  A.hotspot({
    v: male
      ? V3(0, P.threadTip - P.threadLen * 0.45, P.threadOD * 0.45)
      : V3(0, P.brassTop - P.brassRing * 0.4, P.threadCore * 0.42),
    n: V3(0, 0.35, 0.94),
    text: male
      ? 'Außengewinde R' + P.threadLabel + '" nach ISO 7-1, kegelig 1:16, ' +
        P.turns + ' Gänge'
      : 'Innengewinde Rp' + P.threadLabel + '" nach ISO 228-1, zylindrisch, ' +
        P.turns + ' Gänge',
  });
  A.hotspot({
    v: V3(0, P.ppTop * 0.55, P.rOut * 0.9),
    n: V3(0, 0.2, 0.98),
    text: 'Messingteil im PP-R-Körper eingebettet — die Fügestelle ist ' +
      'im Halbschnitt sichtbar',
  });
  if (male) {
    A.hotspot({
      v: V3(0, P.ppTop + 0.8 + P.hexLen * 0.5, P.afHex / 2),
      n: V3(0, 0.2, 0.98),
      text: 'Schlüsselflächen SW ' + komma(P.afHex) + ' zum Gegenhalten',
    });
  }

  const zf = P.rOut + 0.16 * P.run;
  A.dim({ label: 'D', value: P.OD,
    a: V3(-P.half - 0.10 * P.run, -P.rOut, zf), b: V3(-P.half - 0.10 * P.run, P.rOut, zf),
    off: V3(0.08 * P.run, 0, 0) });
  A.dim({ label: 'l', value: P.half,
    a: V3(0, -(P.rOut + 0.22 * P.run), zf), b: V3(P.half, -(P.rOut + 0.22 * P.run), zf),
    off: V3(0, 0.07 * P.run, 0) });
  A.dim({ label: cfg.topLabel, value: P.branchTotal,
    a: V3(P.rOut + 0.20 * P.run, 0, zf), b: V3(P.rOut + 0.20 * P.run, P.branchTotal, zf),
    off: V3(-0.07 * P.run, 0, 0) });

  /* ── MASSTEST ──
     Jede ist()-Funktion wertet gebaute Geometrie aus. Ausnahme mit
     Namen: restwand ist ein Parameter (Fall 12). */

  const strahl = (id, from, dir) => A.probeAxial(id, from, dir) || null;
  const yHexMid = P.ppTop + 0.8 + (P.hexLen ?? 0) * 0.5;

  const messungen = [
    { key: 'run', label: 'Baulänge Durchgang (2·l)', soll: r2(P.run),
      ist: () => { const b = A.boxOf(['body']); return r2(b.max.x - b.min.x); } },

    /* D am Mundlochbund, nicht über die Box: die Box erfasst auch die
       Kehle, die bis rOut + filletR reicht (Fall 16, dritte Variante).
       Und nicht an der Stirnfläche: dort zieht die Fase (Fall 15). */
    { key: 'D', label: 'Außendurchmesser Durchgang', soll: P.OD,
      ist: () => {
        const h = strahl('body', V3(P.xBell, 0, P.OD), V3(0, 0, -1));
        return h ? r2(2 * h.z) : NaN;
      } },

    /* Muffentiefe: Strahl axial von außen in die Muffe, knapp über der
       Rohrbohrung und in der Z-EBENE. Dort ist die Muffe weiter, der
       Strahl fliegt durch und trifft erst die Ringfläche am
       Muffengrund.

       Der Radius liegt auf halber Höhe zwischen Rohrbohrung und
       Muffenbohrung — dort ist die Ringfläche am Muffengrund flach.
       Näher an der Bohrung trifft der Strahl die Verrundung des
       Muffengrunds und meldet bis zu 0,95 mm zu viel; sie beginnt eine
       Fillet-Länge früher (Fall 23, Fase auf einem Katalogmaß).

       Der Versatz muss in Z liegen, nicht in Y: der Abzweig steht auf
       +Y, und ein in Y versetzter Strahl läuft in dessen Innenwand
       statt in den Muffengrund. Das ist Fall 16 in der ersten Variante,
       nur an einem T-Stück statt an einem Rohr.

       Sollwert ist die NORMREIHE, nicht der Tabellenwert. Der Vergleich
       der beiden gehört in den Prüfbericht, nicht in measures
       (Fall 14). */
    { key: 'muffe', label: 'Muffentiefe Durchgang', soll: r2(P.socket),
      ist: () => {
        const rMess = P.boreR + (P.d / 2 - P.boreR) * 0.5;
        const h = strahl('body', V3(P.half + 6, 0, rMess), V3(-1, 0, 0));
        return h ? r2(P.half - h.x) : NaN;
      } },

    /* Höhe des PP-R-Körpers am Abzweig — die Kante, die auf der einen
       Seite h und auf der anderen l1 heißt. */
    { key: 'ppTop', label: 'Höhe PP-R-Körper am Abzweig', soll: r2(P.ppTop),
      ist: () => { const b = A.visibleBoxOf(['body']); return r2(b.max.y); } },

    /* Gesamthöhe über alles. */
    { key: 'hoehe', label: 'Gesamthöhe Abzweig', soll: r2(P.branchTotal),
      ist: () => { const b = A.visibleBoxOf(); return r2(b.max.y); } },

    /* Das Messingteil darf den Durchgang nicht durchdringen. Ein Wert,
       keine Ja/Nein-Prüfung (Fall 25). */
    { key: 'brassUnten', label: 'Unterkante Messingteil über der Achse',
      soll: r2(P.brassBottom),
      ist: () => { const b = A.visibleBoxOf(['brass']); return r2(b.min.y); } },

    { key: 'restwand', label: 'Fittingwand (Parameter, nicht gemessen)',
      soll: r2(P.restwand), ist: () => P.restwand },
  ];

  if (male) {
    const yTh0 = P.ppTop + P.bundRing + 0.8;
    const kuppe = (i) => yTh0 + i * P.threadPitch;
    const sollKuppe = (i) => r2(P.threadOD - 2 * (i * P.threadPitch) / 32);
    messungen.push(
      /* Der Bundring über dem PP — der einzige freie Messingring vor
         dem Gewinde. GEGENPROBE zum Gewindemaß: er MUSS dicker sein
         als die erste Kuppe (Fall 25). */
      { key: 'bund', label: 'Bundring über dem PP-Abzweig', soll: r2(P.threadOD + 1.6),
        ist: () => {
          const h = strahl('brass', V3(0, P.ppTop + P.bundRing * 0.5, P.threadOD), V3(0, 0, -1));
          return h ? r2(2 * h.z) : NaN;
        } },
      { key: 'gewinde', label: 'Gewinde-Außendurchmesser (1. Kuppe)', soll: sollKuppe(1),
        ist: () => {
          const h = strahl('brass', V3(0, kuppe(1), P.threadOD), V3(0, 0, -1));
          return h ? r2(2 * h.z) : NaN;
        } },
      /* GEGENPROBE: der Grund zwischen zwei Kuppen MUSS eine
         Gewindetiefe tiefer liegen. Der Grund trägt keinen
         Scheitelausgleich, sein Fillet schiebt ihn nach außen. */
      { key: 'gewindegrund', label: 'Gewinde-Kerndurchmesser',
        soll: r2(P.threadOD - 2 * (1.5 * P.threadPitch) / 32 - 2 * P.threadH
          + P.threadRootRise),
        ist: () => {
          const h = strahl('brass', V3(0, kuppe(1.5), P.threadOD), V3(0, 0, -1));
          return h ? r2(2 * h.z) : NaN;
        } },
    );
  } else {
    const yTh0 = P.brassBottom + 1.0;
    const kuppe = (i) => yTh0 + i * P.threadPitch;
    messungen.push(
      /* Innengewinde: Strahl von der ACHSE nach außen. Der engste Punkt
         der Bohrung ist die Kuppe und liegt auf dem Kerndurchmesser.
         Das ist der Abtastnachweis nach Fall 20. */
      { key: 'kern', label: 'Innengewinde-Kerndurchmesser', soll: P.threadCore,
        ist: () => {
          const h = strahl('brass', V3(0, kuppe(1), 0), V3(0, 0, 1));
          return h ? r2(2 * h.z) : NaN;
        } },
      /* GEGENPROBE: zwischen zwei Kuppen liegt der Grund auf dem
         Nennmaß, abzüglich des Fillet-Rückzugs. Der Strahl MUSS dort
         weiter fliegen. */
      { key: 'nenn', label: 'Innengewinde-Nenndurchmesser (Grund)',
        soll: r2(P.threadOD - P.threadRootRise),
        ist: () => {
          const h = strahl('brass', V3(0, kuppe(1.5), 0), V3(0, 0, 1));
          return h ? r2(2 * h.z) : NaN;
        } },
    );
  }

  A.measures = messungen;
  A.setExplode(0);
  A.setSection(false, clipPlane);
  A.P = P;
  return A;
}
