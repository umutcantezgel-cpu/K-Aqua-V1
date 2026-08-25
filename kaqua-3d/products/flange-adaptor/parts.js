/* K-Aqua Flanschadapter — Kontur.

   Ein Rotationskörper, zwei Bauarten. Der Bund sitzt bei beiden rechts,
   das Anschlussende links: bei der Muffenbauart eine Schweißmuffe, bei
   der Spitzendbauart ein glattes Rohrende mit tabellierter Wandstärke.

   Kein CSG: die Rillen der Dichtfläche stehen in derselben Kontur. */

import {
  buildProfile, revolve, capFromProfile, DRAFT, SEG_VIS,
} from '../../core/index.js';

export function buildAdaptor(P) {
  const x0 = P.xStart, x1 = P.xEnd, xB = P.xBund;
  const spitz = P.bauart === 'spitzende';

  /* Außenkontur: Schaft, Bundunterkante, Bund, Dichtfläche.
     Der Zwischenpunkt bei xB − 1 setzt einen Netzpunkt am Schaftende;
     ohne ihn hat der zylindrische Schaft zwischen seinen Enden keinen. */
  const outer = [
    { a: x0, r: P.rSchaft, chamfer: Math.min(1.2, P.wall * 0.25) },
    { a: x0 + 1.5, r: P.rSchaft - DRAFT * 1.5, fillet: 0.5 },
    { a: xB - 1, r: P.rSchaft, fillet: 0.4 },
    /* Der Fuß des Bundes ist die SITZFLÄCHE des losen Gegenflansches.
       Sie muss senkrecht stehen — der erste Entwurf hatte dort einen
       Radius von bis zu 1,5 mm, und damit war die Bunddicke h um bis zu
       0,24 mm zu groß gemessen, weil der Radius schon vor dem Bund
       anstieg. Ein Sitz, der nicht eben ist, trägt auch nicht. */
    { a: xB, r: P.rSchaft, fillet: 0.4 },
    /* Die Außenkante des Bundfußes bleibt SCHARF. Eine Fase von 0,4 mm
       stand hier zuerst und lag damit genau auf dem Maßort: der volle
       Bunddurchmesser wurde erst 0,36 mm später erreicht, und h las sich
       in allen elf Zeilen um genau diesen Betrag zu klein. Eine
       Konstante über alle Größen ist nie eine Rundung. Am Sitz einer
       Bundbuchse ist eine Fase auch sachlich falsch — dort läuft die
       Dichtkante des Gegenflansches auf. */
    { a: xB, r: P.rBund, fillet: 0 },
    { a: x1, r: P.rBund, chamfer: Math.min(1.2, P.bundDicke * 0.14) },
  ];

  /* Dichtfläche mit zwei flachen Rillen, dann nach innen zur Bohrung. */
  const inner = [
    { a: x1, r: P.rilleR2 + 0.9, fillet: 0.3 },
    { a: x1 - P.rilleTiefe, r: P.rilleR2, fillet: 0.25 },
    { a: x1 - P.rilleTiefe, r: P.rilleR2 - 0.9, fillet: 0.25 },
    { a: x1, r: P.rilleR2 - 1.8, fillet: 0.3 },
    { a: x1, r: P.rilleR1 + 0.9, fillet: 0.3 },
    { a: x1 - P.rilleTiefe, r: P.rilleR1, fillet: 0.25 },
    { a: x1 - P.rilleTiefe, r: P.rilleR1 - 0.9, fillet: 0.25 },
    { a: x1, r: P.rilleR1 - 1.8, fillet: 0.3 },
    { a: x1, r: P.boreR, chamfer: Math.min(1.0, P.wall * 0.2) },
  ];

  if (spitz) {
    /* Spitzende: durchgehende Bohrung, Wandstärke s. */
    inner.push({ a: x0, r: P.boreR, chamfer: Math.min(1.2, P.wall * 0.2) });
  } else {
    /* Muffenbauart: Bohrung bis zum Muffengrund, dann die Muffe. */
    const rSock = (x) => P.d / 2 - P.sockTaper * (x - x0);
    inner.push(
      { a: x0 + P.socket, r: P.boreR, fillet: 1.0 },
      { a: x0 + P.socket, r: rSock(x0 + P.socket), fillet: 1.0 },
      { a: x0 + 2, r: rSock(x0 + 2), fillet: 0.4 },
      { a: x0, r: P.d / 2 + P.lead, fillet: 0 },
    );
  }

  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  return {
    geo: revolve(profile, { axis: 'x', segments: SEG_VIS }),
    cap: capFromProfile(profile, 'x'),
    profile,
  };
}
