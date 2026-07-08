// K-Aqua — StepFlow: nummerierte Prozess-Schritte (Anleitungen, Roadmaps).
//
// QUELLE: kaqua-deep-ui.jsx (StepFlow). PORTIERT 1:1.
// ANGEPASST: CSS-Klassen (k-steps/k-step*) -> Tailwind. Reine Anzeige, kein State ->
// KEIN "use client".
import React from "react";
import clsx from "clsx";

export interface Step {
  t: string;
  d: string;
}

export interface StepFlowProps {
  steps: Step[];
}

export function StepFlow({ steps }: StepFlowProps) {
  return (
    <div className="flex flex-col">
      {(steps || []).map((s, i) => (
        <div
          key={i}
          className={clsx(
            "grid grid-cols-[44px_minmax(0,1fr)] gap-4 py-4",
            i > 0 && "border-t border-dashed border-card-border"
          )}
        >
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft font-heading text-lead font-extrabold text-primary"
          >
            {i + 1}
          </span>
          <div>
            <h4 className="mb-1 font-heading text-body font-bold text-foreground">{s.t}</h4>
            <p className="text-small leading-relaxed text-muted-foreground">{s.d}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
