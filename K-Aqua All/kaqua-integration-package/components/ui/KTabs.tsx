// K-Aqua — KTabs: kontrollierte Tab-/Filter-Chip-Leiste.
//
// QUELLE: kaqua-deep-ui.jsx (KTabs). PORTIERT 1:1 (kontrolliert über active/onChange,
// kein eigener State im Prototyp — bleibt so).
// ANGEPASST: CSS-Klassen (k-chips/k-filter-chip) -> Tailwind auf bestehende Tokens.
// Braucht "use client" NUR wegen onClick (Next.js App Router: Event-Handler erfordern
// eine Client-Component-Grenze) — kann aber problemlos aus einer Server-Component-Section
// heraus gerendert werden.
"use client";
import React from "react";
import clsx from "clsx";

export interface KTabsProps {
  tabs: React.ReactNode[];
  active: number;
  onChange: (index: number) => void;
  ariaLabel?: string;
}

export function KTabs({ tabs, active, onChange, ariaLabel }: KTabsProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label={ariaLabel}>
      {tabs.map((t, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={active === i}
          onClick={() => onChange(i)}
          className={clsx(
            "min-h-11 rounded-full border px-4 text-small font-semibold outline-none transition-colors duration-fast focus-visible:ring-2 focus-visible:ring-ring",
            active === i
              ? "border-primary bg-primary text-primary-foreground"
              : "border-card-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
