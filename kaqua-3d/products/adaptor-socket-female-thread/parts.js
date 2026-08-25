/* K-Aqua Übergangsmuffe mit Innengewinde — Kontur.

   Zwei Teile, zwei Werkstoffe, aber anders gefügt als bei der AG-Muffe:
   dort steht der Messingzapfen mit Sechskant heraus, hier liegt ein
   Messingring VERSENKT im grünen Körper. Frei liegen nur seine
   Stirnfläche und das Gewinde. Genau das zeigt das Katalogfoto S. 94 —
   der Körper ist von oben bis unten grün.

   Der Ring kommt aus dem Core (threadRing). Er stand vorher zweimal im
   Produktcode und ist am 24.08.2026 dorthin gezogen; dies ist der
   dritte Verbraucher und der erste, der ihn nicht als Kopie hat. */

import {
  buildProfile, revolve, capFromProfile, knurl, threadRing,
  DRAFT, SEG_VIS,
} from '../../core/index.js';

/* PP-Körper: Schweißmuffe unten, Bund mit Ringsitz oben, dazwischen
   der Steg. Die Facetten laufen über beide Abschnitte durch und
   schneiden nach innen — D und D1 bleiben die größten Maße. */
export function buildBody(P) {
  const xA = -P.xEnd;
  const xStep = P.xStep;
  const xRing = P.xEnd - P.brassLen;
  const rSock = (x) => P.d / 2 - P.sockTaper * (x - P.xNenn);

  const kn = knurl(P.rCollar, P.len, P.ribCount, P.ribDepth);
  const rMouth = Math.max(1.0, P.rSleeve * 0.06);

  const outer = [
    { a: xA, r: P.rSleeve, fillet: rMouth, w: 0 },
    { a: xA + rMouth * 0.7, r: P.rSleeve - DRAFT * rMouth * 0.7, fillet: 0.4, w: 1 },
    { a: xStep, r: P.rSleeve, fillet: 0.6, w: 1 },
    { a: xStep + 0.8, r: P.rCollar, fillet: 0.6, w: 1 },
    { a: P.xEnd, r: P.rCollar, chamfer: 0.7, w: 0 },
  ];
  const inner = [
    { a: P.xEnd, r: P.rBrass, chamfer: 0.5, w: 0 },
    { a: xRing, r: P.rBrass, fillet: 0.5, w: 0 },
    { a: xRing, r: P.boreR, fillet: 0.6, w: 0 },
    { a: xA + P.socket, r: P.boreR, fillet: 1.0, w: 0 },
    { a: xA + P.socket, r: rSock(xA + P.socket), fillet: 1.0, w: 0 },
    { a: P.xNenn, r: P.d / 2, fillet: 0.4, w: 0 },
    { a: xA, r: P.d / 2 + P.lead, fillet: 0, w: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geo = revolve(profile, {
    axis: 'x', thetas: kn.thetas, mod: kn.mod, segments: SEG_VIS,
  });
  /* halfAng geht mit hinaus: nur damit weiß die Messung, WO der
     Facettenrücken liegt, und kann ihn treffen statt zu rastern. */
  return { geo, cap: capFromProfile(profile, 'x'), profile, halfAng: kn.halfAng };
}

/* Messingring mit zylindrischem Rp-Innengewinde. Der Mantel liegt
   0,15 mm unter dem Sitz im PP — threadRing bringt das mit. */
export function buildRing(P) {
  return threadRing({
    a0: P.xEnd - P.brassLen,
    a1: P.xEnd,
    rOuter: P.rBrass,
    od: P.threadOD,
    pitch: P.threadPitch,
    turns: P.turns,
    axis: 'x',
  });
}
