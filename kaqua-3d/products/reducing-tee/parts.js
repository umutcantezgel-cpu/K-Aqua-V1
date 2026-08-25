/* K-Aqua Reduzier-T-Stück — Kontur.

   Die Muffenbauart kommt vollständig aus der Familie: buildTee baut seit
   dem 24.08.2026 auch ungleiche Abzweige, weil die Abzweigfelder ohne
   d1 auf die Werte des Durchgangs zurückfallen. Für das
   gleichschenklige T-Stück und die beiden Gewinde-T-Stücke hat sich
   dadurch keine einzige Zahl geändert (Prüfbericht §2).

   Die Spitzendbauart steht hier, weil sie sonst niemand hat: kein
   anderes Produkt im Katalog wird stumpf geschweißt. Kommt ein zweites
   dazu — das gleichschenklige T-Stück führt dieselben vier SDR-11-
   Größen und hat sie noch nicht —, zieht sie in die Familie um. */

import {
  buildProfile, revolve, mergeGeometries, capFromProfile, branchJoin,
  SEG_VIS, SEG_FINE,
} from '../../core/index.js';

export { buildTee } from '../_tee/parts.js';

/* Stumpfschweiß-T-Stück: außen durchgehend Rohrmaß, innen zwei Stufen.
   Das dünnwandige Spitzende trägt die Länge l und die tabellierte
   Wandstärke s; dahinter verdickt sich die Wand zum Körper. Genau diese
   Stufe gibt der Spalte l ihren Sinn — ohne sie gäbe es nichts, wovon
   sie sich abgrenzt. */
export function buildSpigotTee(P) {
  const h = P.half;
  const xSp = h - P.spigot;                 // Ende des Spitzendes
  const xBody = xSp - P.uebergang;          // Beginn der vollen Körperwand

  /* Der Mantel ist außen durchgehend zylindrisch. Die vier
     Zwischenpunkte bei ±xSp und ±xBody ändern daran nichts — sie setzen
     nur Netzpunkte dort, wo die Wand innen springt. Ohne sie hat das
     Netz zwischen den Stirnflächen ÜBERHAUPT KEINE Punkte, weil
     buildProfile gerade Strecken nicht unterteilt, und jede Messung im
     Körperbereich fände ein leeres Fenster vor. */
  const outer = [
    { a: -h, r: P.rOut, chamfer: Math.min(1.5, P.wallPipe * 0.25) },
    { a: -xSp, r: P.rOut, fillet: 0 },
    { a: -xBody, r: P.rOut, fillet: 0 },
    { a: xBody, r: P.rOut, fillet: 0 },
    { a: xSp, r: P.rOut, fillet: 0 },
    { a: h, r: P.rOut, chamfer: Math.min(1.5, P.wallPipe * 0.25) },
  ];
  const inner = [
    { a: h, r: P.boreR, chamfer: Math.min(1.2, P.wallPipe * 0.2) },
    { a: xSp, r: P.boreR, fillet: 0.8 },
    { a: xBody, r: P.boreBodyR, fillet: 1.2 },
    { a: -xBody, r: P.boreBodyR, fillet: 1.2 },
    { a: -xSp, r: P.boreR, fillet: 0.8 },
    { a: -h, r: P.boreR, chamfer: Math.min(1.2, P.wallPipe * 0.2) },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  const kehle = branchJoin({
    mainR: P.rOut, branchR: P.rOutB, filletR: P.filletR,
    angle: 90, segments: SEG_VIS, uSegs: 6,
  });
  geos.push(kehle.geo);

  const yStart = -kehle.insertDepth;
  const yEnd = P.branch;
  const ySp = yEnd - P.spigotB;
  const uebB = Math.min(P.wallBodyB - P.wallPipeB, 0.5 * (ySp - yStart));
  const yBody = ySp - uebB;

  /* Zwischenpunkte wie beim Durchgang: sie ändern die zylindrische
     Mantelfläche nicht, setzen aber Netzpunkte am Wandsprung. */
  const bOuter = [
    { a: yStart, r: P.rOutB, fillet: 0 },
    { a: yBody, r: P.rOutB, fillet: 0 },
    { a: ySp, r: P.rOutB, fillet: 0 },
    { a: yEnd, r: P.rOutB, chamfer: Math.min(1.5, P.wallPipeB * 0.25) },
  ];
  const bInner = [
    { a: yEnd, r: P.boreRB, chamfer: Math.min(1.2, P.wallPipeB * 0.2) },
    { a: ySp, r: P.boreRB, fillet: 0.8 },
    { a: yBody, r: P.boreBodyRB, fillet: 1.2 },
    { a: yStart, r: P.boreBodyRB, fillet: 0 },
  ];
  const bProfile = buildProfile([...bOuter, ...bInner], { segs: 4 });
  geos.push(revolve(bProfile, { axis: 'y', segments: SEG_VIS }));

  /* Auswerfermarken wie beim Muffen-T — dasselbe Werkzeugprinzip. */
  for (const x of [-h * 0.6, h * 0.6]) {
    const disc = revolve(buildProfile([
      { a: 0, r: 0, fillet: 0 },
      { a: 0, r: P.emR, chamfer: 0.25 },
      { a: 0.1, r: P.emR, fillet: 0.1 },
      { a: 0.1, r: 0, fillet: 0 },
    ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
    disc.rotateX(Math.PI);
    disc.translate(x, -(P.rOut - 0.05), 0);
    geos.push(disc);
  }

  return {
    geo: mergeGeometries(geos),
    cap: mergeGeometries([capFromProfile(profile, 'x')].concat(kehle.cap ? [kehle.cap] : [])),
    insertDepth: kehle.insertDepth,
  };
}
