// Redaktionelle Ausnahmen der 3D-Zuordnung.
//
// Nicht jedes Katalogprodukt hat ein eigenes Modell. Varianten teilen sich
// bewusst eins: ein Winkel 45° Innen/Außen zeigt dasselbe Modell wie der
// Standardwinkel 45°, weil sich die Geometrie nur im Gewinde unterscheidet.
// Solche Entscheidungen sind redaktionell und gehören deshalb von Hand hierher,
// nicht in die erzeugte Datei.
//
// Die triviale Zuordnung (Katalog-Slug entspricht der Modul-ID) entsteht
// automatisch in lib/3d/slug-map.generated.ts — dort ist nichts zu pflegen.

export const SLUG_ALIASES: Record<string, string> = {
  "elbow-45-femalemale": "fittings/elbow-45",
  "elbow-90-femalemale": "fittings/elbow-90",
  "elbow-90-large-sizes": "fittings/elbow-90",
  "reducing-tee": "fittings/reducing-bush",
  "reducing-tee-large-sizes": "fittings/reducing-bush",
  "flange-adaptor": "accessories/backing-flange",
  "stub-end": "accessories/backing-flange",
  "electrofusion-socket": "fittings/socket",
  "cross-over": "fittings/elbow-90",
  "cross-over-pipe": "fittings/elbow-90",
  "cross-over-with-socket": "fittings/socket",
  "k-pipe-pp-rct-sdr-7-4": "pipes/k-pipe-pp-rct-sdr-7-4",
  "k-fiber-pipe-pp-r-sdr-7-4": "pipes/k-fiber-pipe-pp-r-sdr-7-4",
  "k-fiber-pipe-pp-rct-sdr-7-4": "pipes/k-fiber-pipe-pp-rct-sdr-7-4",
  "k-fiber-uv-pipe-pp-r-sdr-7-4": "pipes/k-fiber-uv-pipe-pp-r-sdr-7-4",
  "k-fiber-uv-pipe-pp-rct-sdr-7-4": "pipes/k-fiber-uv-pipe-pp-rct-sdr-7-4",
  "pp-r-ball-valve-ball-in-pp": "valves/pp-r-ball-valve-ball-in-pp",
  "pp-r-ball-valve-brass": "valves/pp-r-ball-valve-ball-in-pp",
  "pp-r-ball-valve-ball-in-brass-chromium-plated": "valves/pp-r-ball-valve-ball-in-pp",
  "straight-seat-valve-green-handle": "valves/pp-r-ball-valve-ball-in-pp",
  "concealed-valve-chrome-light-part": "valves/pp-r-ball-valve-ball-in-pp",
  "concealed-valve-chrome-heavy-part": "valves/pp-r-ball-valve-ball-in-pp",
  "battery-female-thread": "valves/pp-r-ball-valve-ball-in-pp",
  "adjustable-battery-female-thread": "valves/pp-r-ball-valve-ball-in-pp",
  "elongation-pieces": "valves/pp-r-ball-valve-ball-in-pp",
  "tee-90-female-thread-for-internal-valve": "valves/pp-r-ball-valve-ball-in-pp",
  "adaptor-socket-female-thread": "transition-fittings/adaptor-socket-male-thread",
  "union-for-watermeters": "transition-fittings/union",
  "metal-union-female-thread-brass": "transition-fittings/metal-union-female-thread",
  "metal-union-male-thread": "transition-fittings/metal-union-female-thread",
  "metal-union-male-thread-brass": "transition-fittings/metal-union-female-thread",
  "elbow-90-male-thread": "transition-fittings/adaptor-socket-male-thread",
  "elbow-bracket-90-female-thread": "transition-fittings/adaptor-socket-male-thread",
  "elbow-wall-bracket-90-female-thread": "transition-fittings/adaptor-socket-male-thread",
  "tee-90-female-thread": "transition-fittings/adaptor-socket-male-thread",
  "tee-90-male-thread": "transition-fittings/adaptor-socket-male-thread",
  "weld-in-saddle": "fittings/socket",
  "weld-in-saddle-female-thread": "transition-fittings/adaptor-socket-male-thread",
  "weld-in-saddle-male-thread": "transition-fittings/adaptor-socket-male-thread",
  "flat-gasket-for-unions-pp-r": "accessories/flat-gasket-for-unions",
  "backing-flange-pp-steel-sfbf": "accessories/backing-flange",
  "pipe-cutter-2040": "accessories/pipe-clamps",
  "pipe-cutter-50125": "accessories/pipe-clamps",
  "pipe-cutter-50125-1": "accessories/pipe-clamps",
  "welding-tool": "accessories/plug",
  "repairing-plug": "accessories/plug",
};
