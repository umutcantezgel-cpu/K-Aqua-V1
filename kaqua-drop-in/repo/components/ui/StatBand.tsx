// K-Aqua — StatBand: responsives Kennzahlen-Band (großer Wert + Einheit + Label).
//
// QUELLE: kaqua-deep-ui.jsx (StatBand). PORTIERT 1:1 (Layout: auto-fit Grid, min. Spaltenbreite
// per `cols`-Prop steuerbar).
// ANGEPASST: BentoCard -> Card (components/ui/Card, deckungsgleiche Props — siehe
// PROMPT.txt). Reveal-Delay von Millisekunden (Prototyp: `i * 70`) auf Sekunden
// umgerechnet (`i * 0.07`) — reales Reveal.tsx (Framer Motion) erwartet Sekunden.
// Reine Anzeige (Reveal kapselt seine eigene Motion-Logik) -> KEIN "use client" hier nötig.
import React from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";

export interface Stat {
  /** The headline number/value, e.g. "14.000" or "20–630". */
  n: string;
  /** Optional unit/suffix, e.g. "m", "%", "Jahre". */
  u?: string;
  l: string;
}

export interface StatBandProps {
  stats: Stat[];
  /** Minimum column width in px for the auto-fit grid. Default 220. */
  cols?: number;
}

export function StatBand({ stats, cols = 220 }: StatBandProps) {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${cols}px, 1fr))` }}>
      {(stats || []).map((s, i) => (
        <Reveal key={i} delay={i * 0.07}>
          <Card className="h-full justify-center gap-0">
            <span className="font-heading text-h3 font-extrabold text-foreground">
              {s.n}
              {s.u ? <span className="ms-1 text-[0.45em] font-bold text-accent-strong">{s.u}</span> : null}
            </span>
            <span className="text-small text-muted-foreground">{s.l}</span>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
