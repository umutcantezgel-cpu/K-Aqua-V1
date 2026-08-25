/* K-Aqua Reduzier-T-Stück — Produktpaket.

   Ein Produkt, zwei Bauarten, 37 Größen. Welche Bauart gilt, entscheidet
   die Zeile selbst — nicht eine Variantenauswahl. Der Grund ist der
   Selbsttest: er läuft über `sizes`, nicht über `variants`, und würde
   bei einer Variantenauswahl nur die halbe Tabelle messen.

   Deshalb hat auch jede Bauart ihren EIGENEN Messsatz. Die Spalten l und
   z bedeuten in den beiden Blöcken Verschiedenes (Begründung in
   data.js), und ein gemeinsamer Messsatz müsste sie gleich behandeln —
   also falsch. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, DATA_STATUS, DIMENSION_KEY, SIZES } from './data.js';
import { params } from './params.js';
import { buildTee, buildSpigotTee } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'fittings/reducing-tee',
  module: 'kaqua-reducing-tee',
  titleDe: 'Reduzier-T-Stück',
  titleEn: 'Reducing tee',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel: (k) => {
    const [d, d1] = String(k).split('x');
    return 'd' + d + ' × d' + d1;
  },
  sizeTitle: 'Durchgang × Abzweig',
  defaultSize: '63x32',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'd1', 'l', 'l1', 'kg'],
  dimensions: ['l', 'l1'],
  ariaFields: ['d', 'd1', 'D', 'D1', 'l', 'l1'],

  variants: [],
  states: null,

  tile: 'Abzweig auf kleinere Nennweite — 27 Größen mit Schweißmuffe, ' +
        'zehn mit Spitzende für die Stumpfschweißung.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const spitz = P.bauart === 'spitzende';
    const A = createAssembly({
      name: 'K-Aqua_Reduzier_T_' + P.key.replace('x', '_'),
      materials: ['pprGreen'],
      seed: 139,
      clipPlane,
    });

    const body = spitz ? buildSpigotTee(P) : buildTee(P);

    A.part('koerper', {
      name: 'Reduzier_T', label: 'Reduzier-T-Stück (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(-P.half * 0.6, P.rOut + 0.16 * P.half, 0),
    });

    A.light(V3(-P.half * 0.7, 0, 0));
    A.light(V3(P.half * 0.7, 0, 0));

    if (spitz) {
      A.hotspot({
        v: V3(P.half - P.spigot * 0.5, P.rOut * 0.42, P.rOut * 0.86),
        n: V3(0, 0.45, 0.89),
        text: 'Spitzende für Heizelementstumpf- oder Elektroschweißung, ' +
          'Wandstärke ' + String(P.s).replace('.', ',') + ' mm (SDR 11)',
      });
      A.hotspot({
        v: V3(0, P.branch - P.spigotB * 0.5, P.rOutB * 0.8),
        n: V3(0, 0.3, 0.95),
        text: 'Abzweig d' + P.d1 + ', Wandstärke ' +
          String(P.s1).replace('.', ',') + ' mm',
      });
    } else {
      A.hotspot({
        v: V3(P.half - Math.max(3, 0.10 * P.socket), P.rOut * 0.42, P.rOut * 0.86),
        n: V3(0, 0.45, 0.89),
        text: 'Schweißmuffe d' + P.d + ' für Polyfusion, Muffentiefe ' +
          P.socket.toFixed(1).replace('.', ',') + ' mm',
      });
      A.hotspot({
        v: V3(0, P.branch - Math.max(3, 0.10 * P.socketB), P.rOutB * 0.82),
        n: V3(0, 0.3, 0.95),
        text: 'Abzweigmuffe d' + P.d1 + ' — reduziert um ' +
          (P.d - P.d1) + ' mm gegenüber dem Durchgang',
      });
    }

    const zf = P.rOut + 0.14 * P.half;
    const yL = -(P.rOut + 0.34 * P.half);
    A.dim({ label: spitz ? '2·z' : 'L', value: 2 * P.half,
      a: V3(-P.half, yL, zf), b: V3(P.half, yL, zf), off: V3(0, 0.12 * P.half, 0) });
    const xB = P.half + 0.24 * P.half;
    A.dim({ label: spitz ? 'z₁' : 'l₁', value: P.branch,
      a: V3(xB, 0, zf), b: V3(xB, P.branch, zf), off: V3(0.10 * P.half, 0, 0) });

    /* GEMESSEN WIRD AM GEBAUTEN NETZ, nicht mit Strahlen.

       Der erste Messsatz tastete axial an und las bei acht von 37
       Größen die falsche Fläche — bis zu 11,3 mm daneben, systematisch
       bei den GROSSEN Abzweigen. Der Grund ist der Bauweise geschuldet:
       es gibt kein CSG. Die Mantelfläche des Durchgangs existiert auch
       UNTER dem Abzweig und die des Abzweigs auch INNERHALB des
       Durchgangs; ein Strahl trifft die erste Fläche, nicht die
       gesuchte. Ein Strahlenfächer half nur teilweise und kostete bei
       37 Größen zu viel Zeit.

       Die Punkte des Netzes stehen dagegen unmittelbar zur Verfügung.
       Über ein Fenster in der jeweiligen Achsrichtung liefert das
       größte und das kleinste Radienmaß genau das gesuchte Maß —
       exakt, ohne Facettenfehler und ohne Fremdflächen, solange das
       Fenster nur eine der beiden Achsen trifft. Genau das prüfen die
       Wächter in params.js.

       Das ist keine Rückgabe einer Annahme (Fall 12): gemessen werden
       die Koordinaten, die revolve tatsächlich geschrieben hat. */
    const pos = body.geo.attributes.position.array;
    const radien = (achse, von, bis) => {
      let max = 0, min = Infinity;
      for (let i = 0; i < pos.length; i += 3) {
        const a = achse === 'x' ? pos[i] : pos[i + 1];
        if (a < von || a > bis) continue;
        const r = achse === 'x'
          ? Math.hypot(pos[i + 1], pos[i + 2])
          : Math.hypot(pos[i], pos[i + 2]);
        if (r > max) max = r;
        if (r < min) min = r;
      }
      return { max, min };
    };

    /* HALBRÄUME, aber die richtigen.

       Ein schmales Fenster kann leer sein — buildProfile unterteilt
       gerade Strecken nicht, und wo kein Profilpunkt liegt, liegt auch
       kein Netzpunkt. Ein zu weiter Halbraum fängt dagegen die Punkte
       der ANDEREN Achse mit ein: die Mantelfläche des Durchgangs liegt
       auch unter dem Abzweig und umgekehrt, denn der Bau kennt kein
       CSG. Beide Fehler sind mir hier unterlaufen, und beide sahen
       völlig verschieden aus — der eine meldete Unendlich, der andere
       Abweichungen von 113 mm.

       Richtig ist der Halbraum, der HINTER der Kreuzung beginnt:
       jenseits von Außenradius plus Kehlenradius der anderen Achse
       kann nur noch eine Fläche liegen. Dass er nicht leer ist,
       sichert der Mundlochbund, der immer darin liegt.

       Die 2 mm Zugabe sind kein Sicherheitsabstand, sondern zweimal
       nachgemessen: ohne sie begann der Halbraum EXAKT auf dem
       Muffengrund und nahm den Punkt der Durchflussbohrung mit — bei
       sechs Größen 22,6 mm daneben. Mit nur 0,5 mm reichte noch der
       Verrundungsradius von 1,2 mm am Muffengrund hinein und zog die
       Messung um 0,7 mm nach innen. Erst jenseits dieses Radius liegt
       die reine Muffenwand. */
    const grenzeX = Math.max(P.half - (spitz ? P.spigot : P.socket) + 2.0,
      P.rOutB + P.filletR + 0.5);
    const grenzeY = Math.max(P.branch - (spitz ? P.spigotB : P.socketB) + 2.0,
      P.rOut + P.filletR + 0.5);

    const gemeinsam = [
      { key: 'lauf', label: spitz ? 'Baulänge Durchgang (2·z)' : 'Baulänge Durchgang (2·l)',
        soll: 2 * P.half,
        ist: () => { const b = A.boxOf(['koerper']); return r2(b.max.x - b.min.x); } },
      { key: 'abzweig', label: spitz ? DIMENSION_KEY.z1 : DIMENSION_KEY.l1,
        soll: P.branch,
        ist: () => r2(A.boxOf(['koerper']).max.y) },
    ];

    A.measures = spitz ? [
      ...gemeinsam,
      /* Beim Spitzende IST das Außenmaß das Rohrmaß d — es gibt keine
         Muffe, die dicker wäre. Genau das unterscheidet die Bauart von
         den 27 Muffengrößen. */
      /* Gemessen am Wandsprung selbst: dort tragen Außen- und
         Innenkontur je einen Punkt, und die Mundlochfase des Spitzendes
         bleibt außen vor. Sie hatte im Halbraum 0,15 mm beigesteuert. */
      { key: 'd', label: DIMENSION_KEY.d, soll: P.d,
        ist: () => r2(2 * radien('x', P.xStep - 0.2, P.xStep + 0.2).max) },
      { key: 'd1', label: DIMENSION_KEY.d1, soll: P.d1,
        ist: () => r2(2 * radien('y', P.yStep - 0.2, P.yStep + 0.2).max) },
      { key: 's', label: DIMENSION_KEY.s, soll: P.s,
        ist: () => { const g = radien('x', P.xStep - 0.2, P.xStep + 0.2);
          return r2(g.max - g.min); } },
      { key: 's1', label: DIMENSION_KEY.s1, soll: P.s1,
        ist: () => { const g = radien('y', P.yStep - 0.2, P.yStep + 0.2);
          return r2(g.max - g.min); } },
      /* GEGENPROBE: hinter dem Spitzende ist die Wand DICKER. Gleicher
         Wert hieße, die Stufe fehlt und die Spalte l wäre ohne Sinn.
         Gemessen am Wandsprung selbst, wo Außen- und Innenkontur je
         einen Punkt tragen — die vier Zwischenpunkte im Mantel stehen
         nur deswegen dort. */
      { key: 'wandKoerper', label: 'Wandstärke Körper (Gegenprobe)',
        soll: r2(P.wallBody),
        ist: () => {
          const xB = P.xStep - P.uebergang;
          const g = radien('x', xB - 0.2, xB + 0.2);
          return r2(g.max - g.min);
        } },
    ] : [
      ...gemeinsam,
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => r2(2 * radien('x', grenzeX, P.half).max) },
      /* D1 lässt sich NICHT über eine Box3 messen: bei AQ1307563 ist der
         Abzweigbund einen Millimeter DICKER als der Durchgang
         (data.js §4), und die Box misst dann ihn statt D. */
      { key: 'D1', label: DIMENSION_KEY.D1, soll: P.ODB,
        ist: () => r2(2 * radien('y', grenzeY, P.branch).max) },
      /* Muffenbohrung. Die Muffe ist um 0,6° konisch, damit sich das
         Rohr beim Fügen zentriert; der engste Punkt im Halbraum liegt
         2 mm hinter der Stirnfläche und damit planmäßig unter dem
         Nennmaß. Der erklärte Betrag gehört in den Sollwert (Fall 23),
         nicht in die Abweichung. */
      { key: 'd', label: DIMENSION_KEY.d,
        soll: r2(P.d - 4 * P.sockTaper),
        ist: () => r2(2 * radien('x', grenzeX, P.half).min) },
      /* GEGENPROBE und zugleich der Beleg der REDUKTION: die
         Abzweigbohrung MUSS kleiner sein als die des Durchgangs. */
      { key: 'd1', label: DIMENSION_KEY.d1,
        soll: r2(P.dB - 4 * P.sockTaper),
        ist: () => r2(2 * radien('y', grenzeY, P.branch).min) },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
