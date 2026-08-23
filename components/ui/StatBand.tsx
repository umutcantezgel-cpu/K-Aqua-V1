// K-Aqua - StatBand: responsives Kennzahlen-Band (großer Wert + Einheit + Label).
//
// QUELLE: kaqua-deep-ui.jsx (StatBand). PORTIERT 1:1 (Layout: auto-fit Grid, min. Spaltenbreite
// per `cols`-Prop steuerbar).
// ANGEPASST: BentoCard -> Card (components/ui/Card, deckungsgleiche Props - siehe
// PROMPT.txt). Reveal-Delay von Millisekunden (Prototyp: `i * 70`) auf Sekunden
// umgerechnet (`i * 0.07`) - reales Reveal.tsx (Framer Motion) erwartet Sekunden.
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

export function StatBand({ stats }: StatBandProps) {
  // Einspaltig bis `sm`: Bei 320–390 px bleiben in zwei Spalten rund 130–150 px
  // Textbreite je Kachel. Beschriftungen wie „Zertifizierte Rohrleitungssysteme"
  // stehen darin auf vier Zeilen und wirken gequetscht. Ab `sm` (640 px) sind
  // zwei Spalten wieder angemessen.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {(stats || []).map((s, i) => (
        <Reveal key={i} delay={i * 0.07} className="w-full flex">
          <Card className="h-full justify-center gap-0 w-full p-4 sm:p-6 shadow-sm rounded-2xl border border-card-border">
            <span className="font-heading text-2xl sm:text-3xl lg:text-h3 font-extrabold text-foreground">
              {s.n}
              {s.u ? <span className="ms-1 text-[0.45em] font-bold text-accent-strong">{s.u}</span> : null}
            </span>
            <span className="text-xs sm:text-small text-muted-foreground mt-1">{s.l}</span>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
