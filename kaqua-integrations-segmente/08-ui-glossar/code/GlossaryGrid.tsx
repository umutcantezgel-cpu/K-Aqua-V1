// K-Aqua — GlossaryGrid: Definitionsliste als responsives Karten-Grid.
//
// QUELLE: kaqua-deep-ui.jsx (GlossaryGrid). PORTIERT 1:1 (Datenform: Array von
// [term, definition]-Tupeln, wie im Prototyp/Ausgabe der Deep-i18n-Dateien).
// ANGEPASST: CSS-Klassen (k-gloss*) -> Tailwind. Reine Anzeige -> KEIN "use client".
import React from "react";

export interface GlossaryGridProps {
  items: Array<[term: string, definition: string]>;
}

export function GlossaryGrid({ items }: GlossaryGridProps) {
  return (
    <dl className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
      {(items || []).map(([term, def]) => (
        <div key={term} className="rounded-lg border border-card-border bg-card p-4">
          <dt className="mb-1 font-heading text-body font-extrabold text-primary">{term}</dt>
          <dd className="m-0 text-small leading-snug text-muted-foreground">{def}</dd>
        </div>
      ))}
    </dl>
  );
}
