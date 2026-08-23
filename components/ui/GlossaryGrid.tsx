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
      {/* 280 px Untergrenze ist die härteste im Baum. Rückfall auf eine volle
          Spalte bis `sm`, sonst bleibt bei 320 px eine Spalte stehen, die
          breiter ist als der Platz, der ihr bleibt. */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
        {(items || []).map((item, idx) => {
          const isTuple = Array.isArray(item);
          const term = isTuple ? item[0] : item.term;
          const def = isTuple ? item[1] : item.definition;
          const icon = isTuple ? null : item.icon;
          
          return (
            <div 
              key={term || idx} 
              className="group relative overflow-hidden rounded-2xl border border-card-border bg-card p-6 flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {icon && <div className="mb-4 text-primary bg-primary/10 w-10 h-10 flex items-center justify-center rounded-lg">{icon}</div>}
              <dt className="mb-3 font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">{term}</dt>
              <dd className="m-0 text-base leading-relaxed text-muted-foreground">{def}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
