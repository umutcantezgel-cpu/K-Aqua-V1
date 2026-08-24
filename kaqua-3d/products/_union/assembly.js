/* K-Aqua Metallverschraubungen — gemeinsame Baugruppe und Maßtest.

   Vier Produkte rufen buildUnion() mit ihrer Tabelle, ihrem
   Gewindetyp und ihrem Werkstoffschlüssel auf. Der Bau steht genau
   einmal hier.

   Warum nicht vier Kopien in vier index.js: viermal derselbe Aufbau
   driftet — vier von 33 Fällen im Fehlerkatalog sind genau dieser
   Mechanismus (Fälle 19, 28, 32 und die drei Anzeigestring-Funde).
   Ein Begriff, der an mehreren Stellen entsteht, gehört an eine. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { unionParams } from './params.js';
import { buildBody, buildGasket, buildNut, buildSleeve } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;
const komma = (v) => String(v).replace('.', ',');

export function buildUnion(cfg, size, variant, clipPlane) {
  const a = cfg.article(size);
  const P = unionParams(a, cfg);
  const metal = cfg.metal;                     // 'steel' oder 'brass'

  const A = createAssembly({
    name: cfg.exportName + '_d' + size,
    materials: ['pprGreen', metal, 'epdm'],
    seed: cfg.seed,
    clipPlane,
  });

  const sleeve = buildSleeve(P);
  const gasket = buildGasket(P);
  const body = buildBody(P);
  const nut = buildNut(P);

  A.part('sleeve', {
    name: 'PP_Muffe', label: 'PP-R-Muffe mit Schweißmuffe', mat: 'pprGreen',
    geo: sleeve.geo, cap: sleeve.cap,
    explode: -0.62 * P.len,
    anchor: V3(P.xA + P.socket * 0.5, P.rSleeve + 0.26 * P.len, 0),
  });
  A.part('gasket', {
    name: 'Flachdichtung', label: 'Flachdichtung EPDM, ' +
      komma(r2(P.gasketTh)) + ' mm', mat: 'epdm',
    geo: gasket.geo, cap: gasket.cap,
    explode: -0.18 * P.len,
    anchor: V3(P.xSealA, P.rFlange + 0.13 * P.len, 0),
  });
  A.part('nut', {
    name: 'Ueberwurfmutter', label: 'Überwurfmutter SW ' + P.afNut +
      ' (' + cfg.metalLabel + ')', mat: metal,
    geo: nut.geo, cap: nut.cap,
    explode: V3(-0.30 * P.len, 0.55 * P.cornerNut, 0),
    anchor: V3(P.xNutHexA + P.nutHexLen * 0.5, -(P.rNutCirc + 0.22 * P.len), 0),
  });
  A.part('body', {
    name: 'Gewindekoerper', label: 'Gewindekörper ' + P.threadKind +
      P.threadLabel + '" (' + cfg.metalLabel + ')', mat: metal,
    geo: body.geo, cap: body.cap,
    explode: 0.62 * P.len,
    anchor: V3(P.xBodyHexEnd, P.rBodyCirc + 0.20 * P.len, 0),
  });

  A.light(V3(P.xA + P.socket * 0.5, 0, 0));
  A.light(V3(P.xEnd * 0.6, 0, 0));

  A.hotspot({
    v: V3(P.xA + Math.max(3, 0.08 * P.len), P.rSleeve * 0.5, P.rSleeve * 0.84),
    n: V3(0, 0.5, 0.86),
    text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
      komma(P.socket) + ' mm nach DVS 2207-11',
  });
  A.hotspot({
    v: V3(P.xNutHexA + P.nutHexLen * 0.5, 0, P.afNut / 2),
    n: V3(0, 0.2, 0.98),
    text: 'Überwurfmutter, Schlüsselweite ' + P.afNut +
      ' — lösbar, ohne die Schweißnaht zu öffnen',
  });
  A.hotspot({
    v: V3(P.xCouplingEnd + (P.xBodyHexEnd - P.xCouplingEnd) * 0.5, 0, P.afBody / 2),
    n: V3(0, 0.24, 0.97),
    text: 'Schlüsselweite ' + P.afBody + ' am Körper — zum Gegenhalten ' +
      'beim Anziehen der Mutter',
  });
  A.hotspot({
    v: cfg.threadKind === 'R'
      ? V3(P.xEnd - P.threadLen * 0.4, P.threadOD * 0.35, P.threadOD * 0.35)
      : V3(P.xEnd - P.threadLen * 0.35, P.threadCore * 0.3, P.threadCore * 0.3),
    n: V3(0.25, 0.68, 0.69),
    text: cfg.threadKind === 'R'
      ? 'Außengewinde R' + P.threadLabel + '" nach ISO 7-1, kegelig 1:16, ' +
        P.turns + ' Gänge'
      : 'Innengewinde Rp' + P.threadLabel + '" nach ISO 228-1, zylindrisch, ' +
        P.turns + ' Gänge',
  });
  A.hotspot({
    v: V3(P.xSealA + P.gasketTh * 0.5, P.rFlange * 0.72, P.rFlange * 0.72),
    n: V3(0, 0.7, 0.71),
    text: 'Flachdichtung zwischen PP-R-Bund und Messingkörper',
  });

  const zf = P.rNutCirc + 0.12 * P.len;
  const yL = -(P.rNutCirc + 0.30 * P.len);
  A.dim({ label: 'L', value: P.len,
    a: V3(P.xA, yL, zf), b: V3(P.xEnd, yL, zf), off: V3(0, 0.11 * P.len, 0) });
  A.dim({ label: 'l', value: P.sleeveLen,
    a: V3(P.xA, yL * 0.72, zf), b: V3(P.xSealA, yL * 0.72, zf),
    off: V3(0, 0.07 * P.len, 0) });
  A.dim({ label: 'l1', value: P.bodyLen,
    a: V3(P.xSealB, yL * 0.72, zf), b: V3(P.xEnd, yL * 0.72, zf),
    off: V3(0, 0.07 * P.len, 0) });
  const xD = P.xA - 0.14 * P.len;
  A.dim({ label: 'SW', value: P.afNut,
    a: V3(xD, -P.afNut / 2, zf), b: V3(xD, P.afNut / 2, zf),
    off: V3(0.12 * P.len, 0, 0) });

  /* ── MASSTEST ──
     Jede ist()-Funktion wertet gebaute Geometrie aus. Keine gibt einen
     P.-Wert zurück außer der ausdrücklich als Parameter benannten
     Restwand (Fall 12).

     Zu jeder Sechskant- und Gewindemessung gehört eine GEGENPROBE an
     einer Stelle, wo sie einen anderen Wert liefern MUSS (Fall 25).
     Liefert das Paar zweimal dasselbe, ist der Sechskant nicht da
     beziehungsweise das Gewinde glatt. */

  const xNutMid = P.xNutHexA + P.nutHexLen * 0.5;
  const xBodyMid = P.xCouplingEnd + (P.xBodyHexEnd - P.xCouplingEnd) * 0.5;
  const strahl = (id, from, dir) => {
    const hit = A.probeAxial(id, from, dir);
    return hit || null;
  };

  const messungen = [
    { key: 'L', label: 'Gesamtlänge', soll: P.len,
      ist: () => { const b = A.boxOf(); return r2(b.max.x - b.min.x); } },

    { key: 'l', label: 'Länge PP-R-Teil', soll: P.sleeveLen,
      ist: () => { const b = A.visibleBoxOf(['sleeve']); return r2(b.max.x - b.min.x); } },

    { key: 'l1', label: 'Länge Gewindekörper', soll: P.bodyLen,
      ist: () => { const b = A.visibleBoxOf(['body']); return r2(b.max.x - b.min.x); } },

    /* Dichtungsdicke einmal am Teil selbst … */
    { key: 'dicht', label: 'Dicke der Flachdichtung', soll: r2(P.gasketTh),
      ist: () => { const b = A.visibleBoxOf(['gasket']); return r2(b.max.x - b.min.x); } },

    /* … und einmal als Abstand der beiden Nachbarn. Zwei Wege zu
       derselben Zahl: wird dieser hier negativ, durchdringen sich
       Muffe und Körper (Fall 31). */
    { key: 'spalt', label: 'Abstand Muffe zu Körper', soll: r2(P.gasketTh),
      ist: () => {
        const s = A.visibleBoxOf(['sleeve']), b = A.visibleBoxOf(['body']);
        return r2(b.min.x - s.max.x);
      } },

    /* Die Dicke allein fiele auch bei einer Dichtung richtig aus, die
       den falschen Durchmesser hat oder zum Strich entartet ist
       (Frage b). Deshalb der Außendurchmesser dazu — Strahl von außen
       auf die Mitte der Dichtung. */
    { key: 'dichtOD', label: 'Außendurchmesser der Dichtung', soll: P.gasketOD,
      ist: () => {
        const h = strahl('gasket', V3(P.xSealA + P.gasketTh * 0.5, 0, P.gasketOD),
          V3(0, 0, -1));
        return h ? r2(2 * h.z) : NaN;
      } },

    /* Die Mutter darf den Körper nicht durchdringen. Strahl von der
       ACHSE nach außen in der Kupplungszone: er trifft die
       Mutterbohrung. Sie muss über dem Außenmaß der Kupplungszone
       liegen, sonst stecken zwei Teile ineinander (Fall 31). */
    { key: 'mutterbohrung', label: 'Bohrung der Mutter über der Kupplungszone',
      soll: r2(2 * P.rCoupling),
      ist: () => {
        const h = strahl('nut', V3(P.xSealB + P.couplingLen * 0.5, 0, 0), V3(0, 0, 1));
        return h ? r2(2 * h.z) : NaN;
      } },

    /* Schlüsselweite der Mutter: Strahl in −Z auf eine Schlüsselfläche. */
    { key: 'SW', label: 'Schlüsselweite Mutter', soll: P.afNut,
      ist: () => {
        const h = strahl('nut', V3(xNutMid, 0, P.afNut), V3(0, 0, -1));
        return h ? r2(2 * h.z) : NaN;
      } },

    /* GEGENPROBE zu SW: Strahl in −Y auf eine Ecke. hexPrism legt die
       Fläche auf Z und die Ecke auf Y — der Wert MUSS hier das
       Eckenmaß sein. Käme wieder SW heraus, läge ein Zylinder über dem
       Sechskant und die Schlüsselflächen wären im Material (Fall 11). */
    { key: 'SW_ecke', label: 'Eckenmaß Mutter', soll: P.cornerNut,
      ist: () => {
        const h = strahl('nut', V3(xNutMid, P.afNut, 0), V3(0, -1, 0));
        return h ? r2(2 * h.y) : NaN;
      } },

    { key: 'SW1', label: 'Schlüsselweite Körper', soll: P.afBody,
      ist: () => {
        const h = strahl('body', V3(xBodyMid, 0, P.afBody), V3(0, 0, -1));
        return h ? r2(2 * h.z) : NaN;
      } },

    { key: 'SW1_ecke', label: 'Eckenmaß Körper', soll: P.cornerBody,
      ist: () => {
        const h = strahl('body', V3(xBodyMid, P.afBody, 0), V3(0, -1, 0));
        return h ? r2(2 * h.y) : NaN;
      } },

    /* Überdeckung der Mutter über die Kupplungszone des Körpers.
       Ein Wert, keine Ja/Nein-Prüfung (Fall 25). */
    { key: 'griff', label: 'Überdeckung Mutter über Körper', soll: r2(P.couplingLen),
      ist: () => {
        const n = A.visibleBoxOf(['nut']), b = A.visibleBoxOf(['body']);
        return r2(n.max.x - b.min.x);
      } },

    /* Grünanteil. Soll ist die Schweißtiefe der Normreihe, nicht der
       Fotowert — Begründung in params.js. visibleBoxOf, weil der
       Schnittflächen-Stencil unsichtbar ist, aber in boxOf eingeht. */
    { key: 'gruen', label: 'Sichtbare PP-R-Länge', soll: r2(P.greenVisible),
      ist: () => {
        const s = A.visibleBoxOf(['sleeve']), n = A.visibleBoxOf(['nut']);
        return r2(n.min.x - s.min.x);
      } },

    { key: 'restwand', label: 'Muffenwand (Parameter, nicht gemessen)',
      soll: P.restwand, ist: () => P.restwand },
  ];

  if (cfg.threadKind === 'R') {
    /* Außengewinde: Strahl von außen auf eine Kuppe. Der Nennmaßort
       liegt am Gewindeanfang; die Kuppe i verjüngt sich um
       2·i·pitch/32 (Kegel 1:16 auf den Durchmesser). */
    const xTh0 = P.xBodyHexEnd + 0.8;
    const kuppe = (i) => xTh0 + i * P.threadPitch;
    const sollKuppe = (i) => r2(P.threadOD - 2 * (i * P.threadPitch) / 32);
    /* Der Grund trägt keinen Scheitelausgleich — sein Fillet schiebt
       ihn um threadRootRise nach außen (params.js, Fall 23). */
    const sollGrund = (i) => r2(P.threadOD - 2 * (i * P.threadPitch) / 32
      - 2 * P.threadH + P.threadRootRise);
    const iA = 1;
    const iB = Math.max(2, P.turns - 1);

    messungen.push(
      { key: 'gewinde', label: 'Gewinde-Außendurchmesser (1. Kuppe)', soll: sollKuppe(iA),
        ist: () => {
          const h = strahl('body', V3(kuppe(iA), 0, P.threadOD), V3(0, 0, -1));
          return h ? r2(2 * h.z) : NaN;
        } },
      /* GEGENPROBE 1 — der Gewindegrund zwischen zwei Kuppen MUSS eine
         Gewindetiefe darunter liegen. Gleicher Wert wie die Kuppe
         hieße: das Gewinde ist ein glatter Kegel. */
      { key: 'gewindegrund', label: 'Gewinde-Kerndurchmesser',
        soll: sollGrund(iA + 0.5),
        ist: () => {
          const h = strahl('body', V3(kuppe(iA + 0.5), 0, P.threadOD), V3(0, 0, -1));
          return h ? r2(2 * h.z) : NaN;
        } },
      /* GEGENPROBE 2 — dieselbe Messung an der letzten Kuppe MUSS
         einen kleineren Wert liefern. Gleicher Wert hieße: der Kegel
         1:16 fehlt und das Gewinde ist zylindrisch. */
      { key: 'kegel', label: 'Verjüngung über ' + (iB - iA) + ' Gänge',
        soll: r2(2 * ((iB - iA) * P.threadPitch) / 32),
        ist: () => {
          const hA = strahl('body', V3(kuppe(iA), 0, P.threadOD), V3(0, 0, -1));
          const hB = strahl('body', V3(kuppe(iB), 0, P.threadOD), V3(0, 0, -1));
          return hA && hB ? r2(2 * (hA.z - hB.z)) : NaN;
        } },
    );
  } else {
    /* Innengewinde: Strahl von der ACHSE nach außen. Er trifft die
       Bohrungswand — und genau die ist hier gesucht (Fall 16 nutzt
       denselben Effekt umgekehrt als Fehlerquelle).

       Der engste Punkt der Bohrung ist die Kuppe des Innengewindes und
       liegt auf dem Kerndurchmesser threadOD − 2h. Diese Messung ist
       der Abtastnachweis, den threadProfile bisher nie bekommen hat
       (Fall 20) — sie hat den Versatz um eine volle Gewindetiefe
       gefunden. */
    const xTh0 = P.xEnd - 1.2 - P.turns * P.threadPitch;
    const kuppe = (i) => xTh0 + i * P.threadPitch;
    const iA = 1;

    messungen.push(
      { key: 'kern', label: 'Innengewinde-Kerndurchmesser', soll: P.threadCore,
        ist: () => {
          const h = strahl('body', V3(kuppe(iA), 0, 0), V3(0, 0, 1));
          return h ? r2(2 * h.z) : NaN;
        } },
      /* GEGENPROBE — zwischen zwei Kuppen liegt der Gewindegrund auf
         dem NENNMASS Rp, abzüglich des Fillet-Rückzugs nach innen. Der
         Strahl MUSS dort weiter fliegen. Gleicher Wert hieße: die
         Bohrung ist glatt. */
      { key: 'nenn', label: 'Innengewinde-Nenndurchmesser (Grund)',
        soll: r2(P.threadOD - P.threadRootRise),
        ist: () => {
          const h = strahl('body', V3(kuppe(iA + 0.5), 0, 0), V3(0, 0, 1));
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
