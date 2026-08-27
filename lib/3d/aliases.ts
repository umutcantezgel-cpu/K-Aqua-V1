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
  /* Die grossen Nennweiten sind seit dem 24.08.2026 im Reduzier-T-Stueck
     selbst enthalten (10 Spitzendgroessen, Katalog S. 89). Vorher zeigte
     diese Seite die Reduziermuffe, also ein Bauteil ohne Abzweig. */
  "reducing-tee-large-sizes": "fittings/reducing-tee",
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
  /* Sechs weitere Armaturen standen hier bis zum 26.08.2026 ebenfalls auf
     „pp-r-ball-valve-ball-in-pp": straight-seat-valve-green-handle,
     concealed-valve-chrome-light-part, concealed-valve-chrome-heavy-part,
     battery-female-thread, adjustable-battery-female-thread und
     elongation-pieces. Solange es kein eigenes Modell gab, war das ein
     Notbehelf; seit dem Bibliotheksstand mit 70 Modellen gibt es für jede
     dieser sechs ein eigenes. Sechs Produktseiten zeigten bis dahin einen
     KUGELHAHN — ein Unterputzventil, ein Batterieanschluss und ein
     Verlängerungsstück sind etwas völlig anderes.
     Entfernt, damit die erzeugte Zuordnung greift. */
  /* Die Seite heisst „…-for-internal-valve", das Modell heisst
     „…-internal-valve" — ein „for" Unterschied, den die erzeugte Zuordnung
     nicht ueberbrueckt. Vorher zeigte die Seite den Kugelhahn, also ein
     ganz anderes Geraet. Seit dem 25.08.2026 gibt es das eigene Modell
     (Katalog S. 108). */
  "tee-90-female-thread-for-internal-valve": "valves/tee-90-female-thread-internal-valve",
  "union-for-watermeters": "transition-fittings/union",
  // Acht Ersatz-Zuordnungen sind hier entfallen, weil es die Modelle inzwischen
  // wirklich gibt (Bibliotheksstand 24.08.2026):
  //   adaptor-socket-female-thread — zeigte die AG-Muffe, also ein fremdes
  //   Bauteil; das eigene Modell steht seit dem 24.08.2026 (Katalog S. 94).
  //   pp-r-ball-valve-brass — zeigte den Kugelhahn mit PP-Kugel; das ist ein
  //   anderes Geraet (einteiliger Korpus statt Verschraubung, Katalog S. 107).
  //   reducing-tee — zeigte die Reduziermuffe, also ein Bauteil ohne Abzweig.
  //   Das eigene Modell traegt beide Bauarten und alle 37 Groessen
  //   (Katalog S. 88-89).
  //   flange-adaptor — zeigte den losen GEGENFLANSCH. Der gehoert dazu, ist
  //   aber ein anderes Teil: Stahl statt PP-R, und er wird ueber den Adapter
  //   geschoben. Das eigene Modell steht seit dem 24.08.2026 (Katalog S. 90).
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
  "flat-gasket-for-unions-pp-r": "accessories/flat-gasket-for-unions",
  "backing-flange-pp-steel-sfbf": "accessories/backing-flange",
  /* Die drei Schneid- und Schabwerkzeuge zeigten bis zum 26.08.2026 auf
     „accessories/pipe-clamps" — auf ROHRSCHELLEN. Eigene Modelle gibt es
     inzwischen; die Seiten-Slugs schreiben die Nennweiten aber ohne
     Bindestriche („50125"), die Modelle mit („50-125"). Die erzeugte
     Zuordnung überbrückt das nicht, deshalb bleiben die Einträge stehen und
     werden umgehängt statt entfernt.
     „pipe-cutter-50125-1" ist der Rohrschaber AQ974 von Katalogseite 114 —
     der Modellname trägt die alte, irreführende Bezeichnung weiter, sein
     Titel in der Registry lautet aber „Rohrschaber". */
  "pipe-cutter-2040": "tools/pipe-cutter-20-40",
  "pipe-cutter-50125": "tools/pipe-cutter-50-125",
  "pipe-cutter-50125-1": "tools/pipe-cutter-50-125-114",
  /* „welding-tool" und „repairing-plug" standen hier auf
     „accessories/plug", also auf einem Rohrstopfen. Beide haben seit dem
     Bibliotheksstand mit 70 Modellen ein eigenes; entfernt, damit die
     erzeugte Zuordnung greift. */
};
