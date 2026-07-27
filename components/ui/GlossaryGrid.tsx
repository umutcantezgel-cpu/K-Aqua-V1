// K-Aqua - GlossaryGrid: Definitionsliste als responsives Karten-Grid.
//
// QUELLE: kaqua-deep-ui.jsx (GlossaryGrid). PORTIERT 1:1 (Datenform: Array von
// [term, definition]-Tupeln, wie im Prototyp/Ausgabe der Deep-i18n-Dateien).
// ANGEPASST: CSS-Klassen (k-gloss*) -> Tailwind. Reine Anzeige -> KEIN "use client".
import React from "react";

export interface GlossaryGridProps {
  title?: string;
  items: Array<[term: string, definition: string] | { term: string; definition: string; icon?: React.ReactNode }>;
}

export function GlossaryGrid({ items, title }: GlossaryGridProps) {
  return (
    <div className="w-full">
      {title && <h3 className="text-2xl font-bold mb-6">{title}</h3>}
      <dl className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
        {(items || []).map((item, idx) => {
          const isTuple = Array.isArray(item);
          const term = isTuple ? item[0] : item.term;
          const def = isTuple ? item[1] : item.definition;
          const icon = isTuple ? null : item.icon;
          
          return (
            <div key={term || idx} className="rounded-lg border border-card-border bg-card p-4 flex flex-col">
              {icon && <div className="mb-3 text-primary">{icon}</div>}
              <dt className="mb-1 font-heading text-body font-extrabold text-primary">{term}</dt>
              <dd className="m-0 text-small leading-snug text-muted-foreground">{def}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
