/* K-Aqua Winkel 90° mit Außengewinde — Produktpaket nach PRODUKT-VERTRAG.md.

   Verbundteil aus PP-R-Winkel und Messingeinsatz. Der Winkel ist EIN
   Loft über eine Bahn mit UNGLEICHEN SCHENKELN — der erste im Katalog.

   Der Messingeinsatz steckt im PP; sichtbar ist außen nur das Gewinde.
   Im Halbschnitt wird die Verzahnung sichtbar, mit der er im Körper
   sitzt — das ist der Punkt, den das Katalogfoto nicht zeigt. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import {
  ANGLE, ARTICLES, DATA_STATUS, DIMENSION_KEY, SIZES
} from './data.js';
import { params } from './params.js';
import { buildElbowBody, buildStud } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'transition-fittings/elbow-90-male-thread',
  module: 'kaqua-elbow-90-male-thread',
  titleDe: 'Winkel 90° mit Außengewinde',
  titleEn: 'Elbow 90° (Male thread)',
  category: 'transition-fittings',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel: (k) => {
    const [d, r] = String(k).split('x');
    return 'd' + d + ' · R' + r + '"';
  },
  sizeTitle: 'Nennweite · Gewinde',
  defaultSize: '25x3/4',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'R', 'D', 'l', 'kg'],
  dimensions: ['l', 'z1'],
  ariaFields: ['d', 'R', 'D', 'l', 'z', 'L1', 'z1'],

  variants: [],
  states: null,

  tile: 'Richtungswechsel mit Rohrgewinde: Schweißmuffe am einen Schenkel, ' +
        'Messingzapfen am anderen. Im Schnitt wird seine Verzahnung im PP sichtbar.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Winkel' + ANGLE + '_AG_' + String(P.key).replace('/', '-'),
      materials: ['pprGreen', 'brass'],
      seed: 131,
      clipPlane,
    });

    const body = buildElbowBody(P);
    const stud = buildStud(P);

    /* ── Silhouetten-Abtastung statt Strahl am PP-Körper ──
       Ein Raycast von außen lief hier zunächst durch die Außenhaut
       hindurch und traf erst die Bohrung. Ursache war die Wicklung in
       sweepPath — sie ist im Core behoben (Fall 39), und ein Strahl
       träfe jetzt richtig.

       Die Abtastung der Punktwolke bleibt trotzdem: sie liefert Werte
       statt Treffer/kein Treffer (Fall 25), ist unabhängig von Wicklung
       und Materialseite, und sie kann dieselbe Stelle in zwei um 90°
       gedrehten Ebenen messen — das ist der Nachweis, den ein einzelner
       Strahl nicht führen kann (Fall 11). Vorgehen nach
       20-VISUELLE-REFERENZ §6. */
    const POS = body.geo.attributes.position;
    /* Schenkel A liegt auf −X, Schenkel B auf +Y. Ein reiner x-Schnitt
       fängt aber auch Punkte des anderen Schenkels und des Bogens ein —
       ein Zylinder um Y reicht in x bis ±r. Deshalb zusätzlich die
       Querebene: Schenkel A wird bei y ≈ 0 abgetastet, Schenkel B bei
       x ≈ 0. In beiden Fällen ist der Radius dann |z|, und circleLoop
       legt bei 96 Segmenten Punkte exakt auf ±z (Fall 27: keine
       Sekante). Geprüft: in dieser Querebene liegt kein Punkt des
       jeweils anderen Schenkels und keiner des Bogens. */
    const slab = (achse, wert, halb, ebene) => {
      const querZ = ebene === 'z0';   // Radius aus |y| statt aus |z|
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
      name: 'PP_Winkel', label: 'PP-R-Winkelkörper', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      explode: V3(-0.35 * P.l, -0.20 * P.z1, 0),
      anchor: V3(-P.l * 0.7, P.rOut + 0.28 * P.l, 0),
    });
    A.part('stud', {
      name: 'Messingeinsatz', label: 'Messingeinsatz R' + P.R + '"', mat: 'brass',
      geo: stud.geo, cap: stud.cap,
      /* Der Zapfen sitzt in +Y — er muss auch in +Y auseinanderfahren.
         Eine Zahl würde ihn in X versetzen und quer durch den Winkel
         ziehen. */
      explode: V3(0, 0.55 * P.z1, 0),
      anchor: V3(P.rLegB + 0.30 * P.z1, P.z1 * 0.85, 0),
    });

    A.light(V3(-P.l * 0.6, 0, 0));
    A.light(V3(0, P.z1 * 0.6, 0));

    A.hotspot({
      v: V3(-P.l + Math.max(3, 0.12 * P.l), P.rOut * 0.5, P.rOut * 0.83),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(0, P.L1 + P.threadLen * 0.5, P.threadOD * 0.46),
      n: V3(0.35, 0.2, 0.91),
      text: 'Kegeliges Rohrgewinde R' + P.R + '" nach ISO 7-1, ' +
        P.turns + ' Gänge, Steigung ' + String(P.threadPitch).replace('.', ',') +
        ' mm, Gewindelänge ' + P.threadLen + ' mm',
    });
    A.hotspot({
      v: V3(0, P.L1 - P.insertDepth * 0.5, P.rLegB * 0.92),
      n: V3(0.2, -0.2, 0.96),
      text: 'Messingeinsatz mit Ringzähnen im PP-R verankert, ' +
        'Einbautiefe ' + P.insertDepth.toFixed(1).replace('.', ',') + ' mm',
    });

    /* Bemaßung: Muffenschenkel entlang −X, Gesamthöhe des
       Gewindeschenkels entlang +Y. Beide Linien liegen vor der
       Silhouette. */
    const zf = P.rOut + 0.16 * P.l;
    const yL = -(P.rOut + 0.34 * P.l);
    A.dim({ label: 'l', value: P.l,
      a: V3(-P.l, yL, zf), b: V3(0, yL, zf), off: V3(0, 0.12 * P.l, 0) });
    const xR = P.rOut + 0.30 * P.l;
    A.dim({ label: 'z₁', value: P.z1,
      a: V3(xR, 0, zf), b: V3(xR, P.z1, zf), off: V3(0.12 * P.l, 0, 0) });

    A.measures = [
      /* ── Die vier Katalogmaße, jedes an der Geometrie abgetastet ── */
      { key: 'l', label: DIMENSION_KEY.l, soll: P.l,
        ist: () => { const b = A.visibleBoxOf(['body']); return Math.abs(b.min.x); } },
      { key: 'L1', label: DIMENSION_KEY.L1, soll: P.L1,
        ist: () => { const b = A.visibleBoxOf(['body']); return b.max.y; } },
      { key: 'z1', label: DIMENSION_KEY.z1, soll: P.z1,
        ist: () => { const b = A.visibleBoxOf(['stud']); return b.max.y; } },
      /* Gewindelänge als eigenständiges Maß: die Differenz zweier
         GEMESSENER Kanten, nicht zweier Tabellenwerte (Fall 14). Sie
         beweist, dass der Zapfen genau so weit aus dem PP ragt, wie
         z1 − L1 verlangt. */
      { key: 'ueberstand', label: 'Freiliegendes Gewinde z₁ − L₁', soll: P.threadLen,
        ist: () => A.visibleBoxOf(['stud']).max.y - A.visibleBoxOf(['body']).max.y },

      /* D am Nennmaßort: bei sA = Muffentiefe, wo die 1°-Entformung
         ausgelaufen ist (Fall 15). Nicht über eine Box3 — die erfässt
         auch Bogen und Gewindeschenkel und wäre gegen einen zu dünnen
         Muffenschenkel blind (Fall 13). */
      { key: 'D', label: DIMENSION_KEY.D, soll: P.D,
        ist: () => r2(slab('x', -P.l + P.socket, 0.4).rMax) },
      /* GEGENPROBE zu D (Fall 25): dieselbe Abtastung an zwei anderen
         Stellen MUSS zwei andere Werte liefern — am Absatz vor dem
         Messing und am schlankeren Körper darüber. Käme dreimal D
         heraus, tastet die Messung nicht den Ort ab, den sie nennt. */
      { key: 'D_kragen', label: 'Ø Absatz vor dem Messing', soll: r2(P.collarR),
        ist: () => r2(slab('y', P.L1 - P.collarLen * 0.5, 0.4).rMax) },
      { key: 'D_schenkelB', label: 'Ø Gewindeschenkel über dem Einsatz', soll: r2(P.rLegB),
        ist: () => r2(slab('y', P.L1 - P.collarLen - 4, 0.4).rMax) },
      /* Was die Abtastung bei y ≈ 0 NICHT finden kann (Fall 13): eine
         Silhouette, die nur in dieser einen Ebene stimmt — ein Sechskant
         über Ecke oder ein ovaler Querschnitt liest sich dort wie ein
         Kreis. Deshalb dieselbe Stelle noch einmal um 90° gedreht, in
         der Ebene z ≈ 0. Erst das Paar beweist den runden Schenkel. */
      { key: 'D_quer', label: 'D um 90° gedreht gemessen', soll: P.D,
        ist: () => r2(slab('x', -P.l + P.socket, 0.4, 'z0').rMax) },

      /* Muffenbohrung am Nennmaßort: 2 mm hinter dem Mundloch, hinter
         der Einführfase. Dort muss das Rohr d passen. */
      { key: 'muffenbohrung', label: 'Muffenbohrung (2 mm hinter dem Mundloch)', soll: P.d,
        ist: () => r2(slab('x', -P.l + 2, 0.4).rMin) },
      /* GEGENPROBE: kurz vor dem Bogen ist die Rohrbohrung erreicht —
         ein deutlich anderer Wert. */
      { key: 'bohrung', label: 'Rohrbohrung vor dem Bogen', soll: r2(P.boreR),
        ist: () => r2(slab('x', -(P.bendR + 1.6), 0.4).rMin) },

      /* Muffentiefe: gesucht ist die Stelle, an der die Bohrung auf die
         Hälfte zwischen Muffen- und Rohrmaß abgefallen ist. Der
         Grundübergang ist ein symmetrischer Smoothstep über groundLen,
         seine Mitte liegt also genau groundLen/2 hinter dem Muffengrund
         — dieser bekannte Betrag wird abgezogen. Gemessen wird die
         gebaute Punktwolke, gerechnet nur die Umrechnung. */
      { key: 'tiefe', label: 'Muffentiefe (abgetastet)', soll: P.socket,
        ist: () => {
          const rMid = (P.rSockGround + P.boreR) / 2;
          const reihen = new Map();
          for (let i = 0; i < POS.count; i++) {
            if (Math.abs(POS.getY(i)) > 0.35) continue;
            const x = POS.getX(i);
            if (x < -P.l + 2.5 || x > -P.bendR - 0.2) continue;
            const k = Math.round(x * 50) / 50;
            const r = Math.abs(POS.getZ(i));
            const cur = reihen.get(k);
            if (cur === undefined || r < cur) reihen.set(k, r);
          }
          const xs = [...reihen.keys()].sort((a, b) => a - b);
          for (let i = 1; i < xs.length; i++) {
            const r0 = reihen.get(xs[i - 1]), r1 = reihen.get(xs[i]);
            if (r0 >= rMid && r1 < rMid) {
              const f = (r0 - rMid) / (r0 - r1);
              const xc = xs[i - 1] + f * (xs[i] - xs[i - 1]);
              return Math.round((xc + P.l - P.groundLen / 2) * 100) / 100;
            }
          }
          return NaN;
        } },

      /* ── Der Gewindescheitel, abgetastet (Fall 20) ──
         Der Strahl fährt die zweite Kuppe an; die erste liegt auf der
         Profilfuge zum PP-Ende. Der Kegel 1:16 verjüngt sie gegenüber
         dem Nennmaß um 2·pitch/32. */
      { key: 'gewinde', label: 'Gewinde-Außendurchmesser R' + P.R + '" (2. Kuppe)',
        soll: Math.round((P.threadOD - 2 * P.threadPitch / 32) * 100) / 100,
        ist: () => {
          const hit = A.probeAxial('stud',
            V3(0, P.L1 + P.threadPitch, P.threadOD), V3(0, 0, -1));
          return hit ? Math.round(2 * hit.z * 100) / 100 : NaN;
        } },
      /* GEGENPROBE: der Grund zwischen zwei Kuppen MUSS eine
         Gewindetiefe tiefer liegen. Gleicher Wert hieße, das Gewinde ist
         ein glatter Kegel (Fall 25). */
      { key: 'gewindegrund', label: 'Gewinde-Kerndurchmesser',
        soll: (() => {
          const h = 0.640327 * P.threadPitch;
          const rd = Math.max(0.3, 0.137 * P.threadPitch);
          return Math.round((P.threadOD - 2 * (1.5 * P.threadPitch) / 32 - 2 * h
            + 2 * rd * (1 / Math.sin(27.5 * Math.PI / 180) - 1)) * 100) / 100;
        })(),
        ist: () => {
          const hit = A.probeAxial('stud',
            V3(0, P.L1 + 1.5 * P.threadPitch, P.threadOD), V3(0, 0, -1));
          return hit ? Math.round(2 * hit.z * 100) / 100 : NaN;
        } },

      /* Wandstärken sind per Definition Parameter, keine Messungen —
         und heißen deshalb so (Fall 12, zulässige Ausnahme). */
      { key: 'restwand', label: 'Restwand Muffenschenkel', soll: P.restwand, ist: () => P.restwand },
      { key: 'restwandB', label: 'Restwand über dem Einsatz', soll: P.restwandB, ist: () => P.restwandB },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
