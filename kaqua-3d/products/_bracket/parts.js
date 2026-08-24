/* K-Aqua Anschlussbogen und Wandscheibe 90° IG — Konturen.

   Der Winkelkörper kommt aus ../_bendthread/parts.js — derselbe, den
   auch der Winkel mit Außengewinde trägt. Hier stehen nur die beiden
   Teile, die ihn von jenem unterscheiden: der Messingring mit
   Innengewinde und die Lasche der Wandscheibe.

   BEKANNTE DOPPLUNG: buildBrassRing steht Zeichen für Zeichen auch in
   ../_teethread/parts.js. Beide Ringe sind reine Kerngeometrie — ein
   Rotationskörper mit Innengewinde — und gehören in den Core, neben
   threadProfile und hexPrism. Das ist ein eigener Arbeitsschritt mit
   Vollbau danach und steht als solcher in LOOP-STATUS.md; hier
   benannt statt stillschweigend angelegt (Fall 32). */

import {
  SEG_VIS, buildProfile, capFromProfile, plateWithHoles, revolve, threadProfile,
} from '../../core/index.js';

/* 1 · Messingring mit zylindrischem Innengewinde Rp.

   Bündig im PP: sichtbar ist von außen nur der schmale goldene Kreis an
   der Stirnfläche und das Gewinde in der Bohrung — genau das, was
   AQ090GP und das Katalogfoto S. 95 zeigen.

   threadProfile mit kind 'Rp': die Kuppe liegt auf dem KERN
   (threadOD − 2h), der Grund auf dem Nennmaß. */
export function buildBrassRing(P) {
  const yA = P.brassBottom;
  const yB = P.brassTop;
  const rIn = P.threadCore / 2;

  const thread = threadProfile(P.threadOD, P.threadPitch, P.turns, 'Rp')
    .map((p) => ({ a: yA + 1.0 + p.a, r: p.r, fillet: p.fillet }))
    .filter((p) => p.a <= yB - 0.8);

  const outer = [
    { a: yA, r: P.brassR - 0.15, chamfer: 0.5 },
    { a: yB, r: P.brassR - 0.15, chamfer: 0.5 },
  ];
  const inner = [
    { a: yB, r: rIn + P.threadPitch * 0.25, chamfer: 0.8 },
    ...thread.slice().reverse(),
    { a: yA + 1.0, r: rIn, fillet: 0.4 },
    { a: yA, r: rIn, chamfer: 0.4 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  return {
    geo: revolve(profile, { axis: 'y', segments: SEG_VIS }),
    cap: capFromProfile(profile, 'y'),
  };
}

/* 2 · Lasche der Wandscheibe.

   Eine flache Platte am Boden des Teils, mit einem Durchgangsloch. Sie
   liegt waagrecht — ihre Fläche ist die Wandauflage, das Loch nimmt die
   Schraube auf.

   ALLE Maße sind ASSUMPTION bis auf EINES: wie weit sie unter dem
   Körper hervorsteht. Das steht in der Tabelle, wenn auch nicht als
   eigene Spalte — h ist bei AQ472G in jeder vergleichbaren Zeile genau
   2 mm größer als bei AQ090G, und der Körper ist derselbe. Herleitung
   im Kopfkommentar von params.js.

   Gestalt: das Foto zeigt einen gewaisteten Umriss, außen rund um das
   Loch, zur Mitte hin schmaler. Modelliert ist die runde Platte um das
   Loch, weit genug, dass sie den Körper erreicht und mit ihm
   verschmilzt. Die Waise ist nicht bemaßt und aus einem einzigen
   Blickwinkel nicht auflösbar; sie zu erfinden hieße raten. Der Umkreis
   ist damit das größte Maß, und das ist die sichere Seite.

   plateWithHoles extrudiert in +X. Die Platte liegt aber waagrecht,
   also wird sie um Z gedreht: aus +X wird +Y. */
export function buildLug(P) {
  const rPad = P.lugPadR;
  /* Unterkante NICHT aus h — die Spalte ist nicht gedeutet. Der
     Körper selbst gibt sie her: seine tiefste Stelle liegt auf dem
     Radius des Muffenschenkels. Darunter steht die Lasche um
     lugProud hervor, und DAS ist aus der Tabelle belegt (Differenz
     h(AQ472G) − h(AQ090G) = 2 mm in jeder Zeile). */
  const yBottom = -(P.rOut + P.lugProud);
  /* Koordinaten: plateWithHoles legt die Scheibe in der Shape-Ebene an
     und extrudiert in +X. Nach rotateZ(90°) wird aus der Dicke +Y, aus
     Shape-y wird −X und aus Shape-x wird −Z. Das Loch sitzt deshalb bei
     Shape-y = −(Lochmitte − Plattenmitte). */
  const dx = P.lugHoleX - P.lugCenterX;
  const geo = plateWithHoles(rPad, 0, P.lugThick,
    [{ r: P.lugHoleD / 2, x: 0, y: -dx }],
    { bevel: Math.min(0.6, P.lugThick * 0.2), segments: SEG_VIS, x0: 0 });

  geo.rotateZ(Math.PI / 2);              // Dicke von +X nach +Y
  geo.translate(P.lugCenterX, yBottom, 0);
  return { geo, cap: null };
}
