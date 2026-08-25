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
  // Die Seiten-Slugs schreiben "femalemale" ohne Bindestriche, die Modelle
  // "female-male" mit. Sie kollidieren deshalb NICHT sichtbar — sie gingen
  // aneinander vorbei, und beide Seiten zeigten bis zum 24.08.2026 den
  // einfachen Winkel statt der Muffe/Spitzende-Ausführung.
  "elbow-45-femalemale": "fittings/elbow-45-female-male",
  "elbow-90-femalemale": "fittings/elbow-90-female-male",
  "elbow-90-large-sizes": "fittings/elbow-90",
  "reducing-tee": "fittings/reducing-bush",
  "reducing-tee-large-sizes": "fittings/reducing-bush",
  "flange-adaptor": "accessories/backing-flange",
  "cross-over": "fittings/elbow-90",
  "cross-over-pipe": "fittings/elbow-90",
  // „stub-end" und „cross-over-with-socket" sind hier entfallen: Beide Seiten
  // waren Dubletten derselben Katalogtabellen (S. 90 bzw. S. 91) und leiten
  // seit next.config.ts permanent auf „flange-adaptor" bzw. „cross-over" um.
  // Ein stehengebliebener Alias hätte auf einen Slug gezeigt, den es nicht
  // mehr gibt — `npm run 3d:check` prüft die erzeugte Zuordnung, nicht diese
  // Ausnahmen.
  "k-pipe-pp-rct-sdr-7-4": "pipes/k-pipe-pp-rct-sdr-7-4",
  "k-fiber-pipe-pp-r-sdr-7-4": "pipes/k-fiber-pipe-pp-r-sdr-7-4",
  "k-fiber-pipe-pp-rct-sdr-7-4": "pipes/k-fiber-pipe-pp-rct-sdr-7-4",
  "k-fiber-uv-pipe-pp-r-sdr-7-4": "pipes/k-fiber-uv-pipe-pp-r-sdr-7-4",
  "k-fiber-uv-pipe-pp-rct-sdr-7-4": "pipes/k-fiber-uv-pipe-pp-rct-sdr-7-4",
  "pp-r-ball-valve-ball-in-pp": "valves/pp-r-ball-valve-ball-in-pp",
  "pp-r-ball-valve-ball-in-brass-chromium-plated": "valves/pp-r-ball-valve-ball-in-pp",
  "straight-seat-valve-green-handle": "valves/pp-r-ball-valve-ball-in-pp",
  "concealed-valve-chrome-light-part": "valves/pp-r-ball-valve-ball-in-pp",
  "concealed-valve-chrome-heavy-part": "valves/pp-r-ball-valve-ball-in-pp",
  "battery-female-thread": "valves/pp-r-ball-valve-ball-in-pp",
  "adjustable-battery-female-thread": "valves/pp-r-ball-valve-ball-in-pp",
  "elongation-pieces": "valves/pp-r-ball-valve-ball-in-pp",
  "tee-90-female-thread-for-internal-valve": "valves/pp-r-ball-valve-ball-in-pp",
  "union-for-watermeters": "transition-fittings/union",
  // Acht Ersatz-Zuordnungen sind hier entfallen, weil es die Modelle inzwischen
  // wirklich gibt (Bibliotheksstand 24.08.2026):
  //   adaptor-socket-female-thread — zeigte die AG-Muffe, also ein fremdes
  //   Bauteil; das eigene Modell steht seit dem 24.08.2026 (Katalog S. 94).
  //   pp-r-ball-valve-brass — zeigte den Kugelhahn mit PP-Kugel; das ist ein
  //   anderes Geraet (einteiliger Korpus statt Verschraubung, Katalog S. 107).
  //   metal-union-female-thread-brass · metal-union-male-thread ·
  //   metal-union-male-thread-brass · elbow-90-male-thread ·
  //   tee-90-female-thread · tee-90-male-thread
  //
  // Sie zeigten auf ein ähnlich aussehendes Bauteil, solange kein eigenes Modell
  // vorlag. Diese Datei wird nach der erzeugten Zuordnung ausgebreitet
  // (`{ ...GENERATED_SLUG_MAP, ...SLUG_ALIASES }` in lib/3d/resolve.ts) und
  // gewinnt damit jeden Konflikt — ein stehengebliebener Eintrag hätte das neue
  // Modell dauerhaft verdeckt. Auf der T-Stück-Seite stand dadurch eine
  // Übergangsmuffe.
  //
  // Wer die Bibliothek erweitert, muss diese Liste gegen die neuen Modelle
  // prüfen. Das merkt jetzt `npm run 3d:coverage`: es bricht ab, sobald ein
  // Eintrag hier auf ein anderes Modell zeigt als die erzeugte Datei — auch
  // dann, wenn sich die Schlüssel nur in Bindestrichen unterscheiden.
  //
  // Am 24.08.2026 waren es fünf: electrofusion-socket,
  // elbow-bracket-90-female-thread, elbow-wall-bracket-90-female-thread
  // (alle drei entfernt, die erzeugte Zuordnung trägt sie jetzt) sowie
  // elbow-45-femalemale und elbow-90-femalemale (auf das eigene Modell
  // umgehängt). Fünf Produktseiten zeigten bis dahin ein fremdes Bauteil.
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
