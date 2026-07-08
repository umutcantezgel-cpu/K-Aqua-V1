// K-Aqua — ShapeDefs: unsichtbare SVG-Clip-Definitionen für die Formen-Bibliothek (shapes.css).
//
// QUELLE: kaqua-shapes.js (Prototyp). PORTIERT 1:1 — gleiche Pfade, gleiche IDs.
// Einmal im Root-Layout mounten (direkt nach dem öffnenden <body>), damit die
// Klassen kq-shape--taper-r/-l, --dune, --pebble, --wave-b und kq-band--wave-b
// ihre clip-path-Referenzen (url(#kq-clip-…)) auflösen können.
// Reine Anzeige -> KEIN "use client".
import React from "react";

const KQ_CLIP_PATHS: Record<string, string> = {
  /* Echtes Trapez mit großen Radien — die Referenzform:
     linke Kante senkrecht, rechte Kante läuft nach unten ein. */
  "kq-clip-taper-r":
    "M .045 0 L .952 0 C .984 0 .999 .028 .996 .062 L .942 .908 " +
    "C .938 .968 .912 1 .868 1 L .045 1 C .016 1 0 .978 0 .945 " +
    "L 0 .055 C 0 .022 .016 0 .045 0 Z",
  "kq-clip-taper-l":
    "M .048 0 L .955 0 C .984 0 1 .022 1 .055 L 1 .945 " +
    "C 1 .978 .984 1 .955 1 L .132 1 C .088 1 .062 .968 .058 .908 " +
    "L .004 .062 C .001 .028 .016 0 .048 0 Z",
  /* Fließende Oberkante — für Hero-/Stimmungsbilder */
  "kq-clip-dune":
    "M 0 .34 C .1 .12 .26 .02 .46 .05 C .64 .078 .78 .01 .93 .06 " +
    "C .975 .075 1 .11 1 .17 L 1 .94 C 1 .974 .978 1 .946 1 " +
    "L .054 1 C .022 1 0 .974 0 .94 Z",
  /* Ruhige, asymmetrische Freiform */
  "kq-clip-pebble":
    "M .52 .015 C .73 .002 .92 .1 .965 .3 C .998 .52 .945 .78 .755 .915 " +
    "C .555 .998 .26 .99 .115 .84 C .005 .68 .01 .4 .105 .22 C .2 .06 .34 .03 .52 .015 Z",
  /* Sanfte Welle an der Unterkante (für Formen und Sektionsbänder) */
  "kq-clip-wave-b":
    "M 0 0 L 1 0 L 1 .88 C .92 .955 .84 .955 .75 .9 C .66 .845 .58 .845 .5 .9 " +
    "C .42 .955 .34 .955 .25 .9 C .16 .845 .08 .845 0 .92 Z",
};

export function ShapeDefs() {
  return (
    <svg id="kq-shape-defs" aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        {Object.entries(KQ_CLIP_PATHS).map(([id, d]) => (
          <clipPath key={id} id={id} clipPathUnits="objectBoundingBox">
            <path d={d} />
          </clipPath>
        ))}
      </defs>
    </svg>
  );
}
