/* K-Aqua Kappe — Kontur.

   Ein Teil, ein Rotationskörper. Dünnwandige Schale: Außenkontur
   Zylinder + Kalotte, Innenkontur dieselbe Form um die Wandstärke
   nach innen versetzt. Kein Materialklotz im Bug — die Zeichnung
   zeigt die Schraffur als gleichmäßig dünne Wand, das Produktfoto
   lässt den Bug durchscheinen.

   Kein CSG. Ausschließlich Core-Funktionen. */

import {
  buildProfile, revolve, arcPts, mergeGeometries, capFromProfile,
  DRAFT, SEG_VIS, SEG_FINE,
} from '../../core/index.js';

/* Elliptische Kalotte als Punktfolge, von der Schulter zum Scheitel.
   Halbachsen a (axial) und r (radial); n Zwischenpunkte. */
function domePts(out, xShoulder, rise, r, n, extra) {
  for (let i = 1; i <= n; i++) {
    const t = (i / n) * (Math.PI / 2);
    out.push(Object.assign({
      a: xShoulder + rise * Math.sin(t),
      r: r * Math.cos(t),
      fillet: 0,
    }, extra));
  }
  return out;
}

export function buildBody(P) {
  const rOut = P.rOut, rIn = P.rIn;
  const xM = -P.xEnd;                          // Mundloch
  const xS = P.xShoulder;                      // Beginn der Kalotte außen

  /* Innenkalotte: gleiche Ellipse, um die Wandstärke verkleinert.
     Der Scheitel liegt damit um wall vor dem Außenscheitel. */
  const riseIn = Math.max(1.2, P.domeRise - P.wall);
  const xSi = xS;                              // Schulter innen auf gleicher Höhe

  /* Bohrung: bei der Muffenkappe kegelig (0,6° nach innen verjüngend),
     bei der Stumpfschweißkappe zylindrisch. */
  const boreR = (x) => P.butt
    ? P.bore / 2
    : P.bore / 2 - P.sockTaper * (x - xM);

  const rMouth = Math.max(1.2, 0.08 * P.OD);
  const outer = [
    { a: xM, r: rOut, fillet: rMouth },
    // 1° Entformung zum Mundloch hin, verjüngend zur Formteilungsebene
    { a: xM + rMouth * 0.6, r: rOut - DRAFT * rMouth * 0.6, fillet: 0.4 },
    { a: 0, r: rOut + 0.09, fillet: 0.1 },     // Formtrennnaht, 0,09 mm Grat
    { a: xS * 0.55, r: rOut - 0.02 * P.wall, fillet: 0 },
    { a: xS, r: rOut, fillet: 0 },   // tangentialer Übergang, keine Schulterlinie
  ];
  domePts(outer, xS, P.domeRise, rOut, 12);
  outer[outer.length - 1].r = 0;
  outer[outer.length - 1].fillet = 0;

  const inner = [
    { a: xSi, r: rIn, fillet: Math.max(1.0, P.wall * 0.5) },
  ];
  domePts(inner, xSi, riseIn, rIn, 10);
  inner[inner.length - 1].r = 0;
  inner[inner.length - 1].fillet = 0;
  inner.reverse();

  const mouth = P.butt
    ? [
        { a: xM, r: P.bore / 2, chamfer: Math.min(1.2, P.wall * 0.3) },
        { a: xSi, r: rIn, fillet: 0.8 },
      ]
    : [
        { a: xM, r: P.bore / 2 + P.lead, fillet: 0 },
        { a: xM + 2, r: boreR(xM + 2), fillet: 0.4 },
        { a: xM + P.sockDepth, r: boreR(xM + P.sockDepth), fillet: 1.3 },
        { a: xSi, r: rIn, fillet: 0.9 },
      ];

  // geschlossene Kontur: Mundloch -> außen -> Scheitel -> innen -> Mundloch
  const profile = buildProfile([...outer, ...inner, ...mouth.slice().reverse()], { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Anspritzpunkt: flache Marke seitlich am Bug, im Produktfoto als
     Nase in der Silhouette zu sehen. Überstand bewusst auf 0,12 mm
     begrenzt — mehr würde den tabellierten Außendurchmesser sprengen. */
  const gateR = Math.min(2.2, Math.max(1.1, 0.022 * P.OD));
  const gateOut = 0.05;
  const gate = revolve(
    buildProfile([
      { a: 0, r: 0, fillet: 0 },
      { a: 0, r: gateR, chamfer: 0.3 },
      { a: gateR * 0.75, r: gateR * 0.8, fillet: gateR * 0.5 },
      { a: gateR * 0.75, r: 0, fillet: 0 },
    ], { segs: 3 }),
    { axis: 'y', segments: SEG_FINE }
  );
  gate.translate(xS * 0.55 + P.xEnd * 0.2, rOut - gateR * 0.75 + gateOut, 0);
  geos.push(gate);

  /* Auswerferstift-Marken auf der Unterseite, 0,1 mm vertieft. */
  for (const x of [xM + P.len * 0.28, xM + P.len * 0.58]) {
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
    disc.translate(x, -(rOut - 0.05), 0);
    geos.push(disc);
  }

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'), profile };
}
