/* K-Aqua Elektroschweißmuffe — Kontur.

   Ein Rotationskörper plus zwei Kontaktdome. Kein CSG.

   Die Außenkontur ist ein GLATTER Zylinder mit gebrochenen Kanten —
   anders als bei der Schweißmuffe, die einen Bund am Mundloch trägt.
   Die Maßzeichnung zeigt es so, und das Produktfoto der Kategorieseite
   bestätigt es: D ist hier über die ganze Länge derselbe.

   Die Innenkontur ist ZYLINDRISCH, ohne Muffenkonus. Beim
   Elektroschweißen wird das Rohr eingeschoben, nicht eingepresst; die
   Heizwendel schmilzt Muffe und Rohr an Ort und Stelle zusammen. Nur
   die Einführfase am Mundloch bleibt.

   Die Heizwendel selbst wird NICHT modelliert. Sie liegt im Material
   und ist von außen unsichtbar; die Zeichnung deutet sie nur als
   schraffiertes Band an. Sie zu erfinden hieße, eine Gestalt zu zeigen,
   die keine Quelle bemaßt. */

import {
  DRAFT, SEG_FINE, SEG_VIS, buildProfile, capFromProfile, mergeGeometries,
  mirrorProfile, revolve,
} from '../../core/index.js';

export function buildBody(P) {
  const ro = P.rOut;
  const rk = P.cornerR;

  /* Außen: von der Formteilungsebene (a = 0) zur Stirnfläche. 0,09 mm
     Grat auf der Naht, 1° Entformung zur Stirnfläche. */
  const outer = [
    { a: 0, r: ro + 0.09, fillet: 0.1 },
    { a: 0.5, r: ro, fillet: 0.35 },
    { a: P.xEnd - rk, r: ro - DRAFT * (P.xEnd - rk) * 0.5, fillet: rk },
    { a: P.xEnd, r: ro - DRAFT * P.xEnd * 0.5 - rk * 0.35, chamfer: 0.4 },
  ];

  /* Innen: Anschlag (wenn vorhanden), dann zylindrische Muffenbohrung
     bis zur Einführfase. */
  const inner = P.hasStop
    ? [
        { a: 0, r: P.boreR, fillet: 0.5 },
        { a: P.xStop, r: P.boreR, fillet: 0.6 },
        { a: P.xStop, r: P.d / 2, fillet: 1.2 },
        { a: P.xEnd - 2, r: P.d / 2, fillet: 0.4 },
        { a: P.xEnd, r: P.d / 2 + P.lead, fillet: 0 },
      ]
    : [
        { a: 0, r: P.d / 2, fillet: 0.5 },
        { a: P.xEnd - 2, r: P.d / 2, fillet: 0.4 },
        { a: P.xEnd, r: P.d / 2 + P.lead, fillet: 0 },
      ];

  const profile = buildProfile(mirrorProfile(outer, inner), { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Zwei Kontaktdome auf dem Mantel, +Y. Sie sitzen auf dem Zylinder
     auf; ihre Höhe über ihm ist h − D und kommt damit aus der Tabelle.
     Bei d250 und d315 ist sie fast null — dort liegen sie praktisch
     bündig, und genau das sagt die Tabelle. */
  /* Der Domfuß steckt 0,4 mm im Mantel, damit kein Spalt entsteht. Diese
     0,4 mm gehören NICHT zum Überstand — die Profilhöhe trägt sie
     zusätzlich, sonst käme die Domoberkante 0,4 mm zu tief und h wäre in
     jeder Zeile um denselben Betrag zu klein. Genau das war der erste
     Befund des Maßtests. */
  const BURY = 0.4;
  const domeH = Math.max(0.2, P.termProud) + BURY;
  for (const x of [-P.termX, P.termX]) {
    const dome = revolve(
      buildProfile([
        { a: 0, r: 0, fillet: 0 },
        { a: 0, r: P.termR, fillet: Math.min(0.6, P.termR * 0.2) },
        { a: domeH, r: P.termR * 0.86, fillet: Math.min(0.8, P.termR * 0.25) },
        { a: domeH, r: P.termR * 0.42, chamfer: 0.3 },
        { a: domeH - Math.min(3, domeH * 0.6), r: P.termR * 0.42, fillet: 0.2 },
        { a: domeH - Math.min(3, domeH * 0.6), r: 0, fillet: 0 },
      ], { segs: 3 }),
      { axis: 'y', segments: SEG_VIS }
    );
    /* Der Dom beginnt IM Mantel, damit kein Spalt entsteht. */
    dome.translate(x, P.rOut - BURY, 0);
    geos.push(dome);
  }

  /* Auswerferstift-Marken auf der Unterseite. */
  for (const x of [-P.xEnd * 0.55, P.xEnd * 0.55]) {
    const disc = revolve(
      buildProfile([
        { a: 0, r: 0, fillet: 0 },
        { a: 0, r: P.emR, chamfer: 0.25 },
        { a: 0.1, r: P.emR, fillet: 0.1 },
        { a: 0.1, r: 0, fillet: 0 },
      ], { segs: 3 }),
      { axis: 'y', segments: SEG_FINE }
    );
    disc.rotateX(Math.PI);
    disc.translate(x, -(P.rOut - 0.05), 0);
    geos.push(disc);
  }

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'), profile };
}
