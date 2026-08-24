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
  SEG_VIS, plateWithHoles, threadRing,
} from '../../core/index.js';

/* 1 · Messingring mit zylindrischem Innengewinde Rp.
   Der Ring steht im Core (threadRing); hier bleibt nur die Zuordnung der
   P-Werte. Bis zum 24.08.2026 stand er wortgleich hier UND in
   ../_teethread/parts.js — genau die Dopplung, die dieser Kopf benannte.

   Sichtbar ist von außen nur der schmale goldene Kreis an der
   Stirnfläche. */
export function buildBrassRing(P) {
  return threadRing({
    a0: P.brassBottom, a1: P.brassTop, rOuter: P.brassR,
    od: P.threadOD, pitch: P.threadPitch, turns: P.turns,
    coreDia: P.threadCore, axis: 'y', segs: SEG_VIS,
  });
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
