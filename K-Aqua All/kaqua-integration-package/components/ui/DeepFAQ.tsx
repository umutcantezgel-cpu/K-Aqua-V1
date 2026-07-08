// K-Aqua — DeepFAQ: Akkordeon für Frage/Antwort-Listen.
//
// QUELLE: kaqua-deep-ui.jsx (DeepFAQ). PORTIERT 1:1 (ein Panel offen zur Zeit, erstes
// Panel initial offen — index 0 — wie im Prototyp).
// ANGEPASST: CSS-Klassen (k-acc*) -> Tailwind. Icons.ChevronDown -> benannter Import aus
// components/ui/icon — ACHTUNG: ChevronDown fehlt dort noch, siehe INTEGRATION-PIPELINE.md
// Segment I03 (Vorbedingung 1) und 00-FINDINGS.md §0.8.
// Eigener State (offenes Panel) -> "use client".
"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { ChevronDown } from "@/components/ui/icon";

export interface DeepFAQItem {
  q: string;
  a: string;
}

export interface DeepFAQProps {
  items: DeepFAQItem[];
}

export function DeepFAQ({ items }: DeepFAQProps) {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex flex-col gap-2">
      {(items || []).map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={clsx(
              "overflow-hidden rounded-lg border bg-card transition-colors",
              isOpen ? "border-primary" : "border-card-border"
            )}
          >
            <button
              type="button"
              className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-start font-heading text-body font-bold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{it.q}</span>
              <ChevronDown
                size={18}
                className={clsx("shrink-0 text-primary transition-transform duration-fast", isOpen && "rotate-180")}
              />
            </button>
            {isOpen ? (
              <div className="px-5 pb-5 text-small leading-relaxed text-muted-foreground">
                <p>{it.a}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
