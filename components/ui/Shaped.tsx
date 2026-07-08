// K-Aqua — Shaped: Medien-Container mit dynamischer Rundung (Formen-Bibliothek shapes.css).
//
// NEU erstellt für Segment 28; Klassennamen identisch mit dem Prototyp (kaqua-shapes.css),
// dadurch bleiben Prototyp und Live-Website deckungsgleich.
// Verwendung:
//   <Shaped variant="sweep-r" bleed="l" zoom>
//     <Image src={foto} alt="…" fill />
//   </Shaped>
// Der innere Container ist position:relative — <Image fill> funktioniert direkt.
// Für Arabisch (RTL) die gespiegelte Variante wählen (z. B. sweep-l statt sweep-r).
// Reine Anzeige -> KEIN "use client".
import React from "react";
import clsx from "clsx";

export type ShapeVariant =
  | "sweep-r"
  | "sweep-l"
  | "drift"
  | "drift-r"
  | "taper-r"
  | "taper-l"
  | "dune"
  | "pebble"
  | "leaf"
  | "leaf-r"
  | "arch"
  | "capsule"
  | "blob"
  | "scoop-br"
  | "scoop-tl"
  | "cut-tr"
  | "wave-b";

export interface ShapedProps {
  variant: ShapeVariant;
  /** Zieht die Form an den Seitenrand — der Original-Look der Signaturform. */
  bleed?: "l" | "r";
  /** Versetzte Konturlinie in currentColor (mit Radius-Formen kombinieren). */
  echo?: boolean;
  /** Sanfter Bild-Zoom bei Hover (respektiert prefers-reduced-motion). */
  zoom?: boolean;
  /** Blob-Morphing aktivieren (nur sinnvoll mit variant="blob"). */
  anim?: boolean;
  className?: string;
  /** Bildinhalt, z. B. <Image fill … /> oder <img>. */
  children: React.ReactNode;
}

export function Shaped({ variant, bleed, echo, zoom, anim, className, children }: ShapedProps) {
  return (
    <div
      className={clsx(
        "kq-shape",
        `kq-shape--${variant}`,
        bleed && `kq-bleed-${bleed}`,
        echo && "kq-echo",
        zoom && "kq-zoom",
        anim && "kq-anim",
        className
      )}
    >
      <div className="kq-shape__media">{children}</div>
    </div>
  );
}
