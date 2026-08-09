// K-Aqua - DeepMatrix: generische Vergleichs-/Datenmatrix-Tabelle.
//
// QUELLE: kaqua-deep-ui.jsx (DeepMatrix). PORTIERT 1:1 (Struktur: erste Spalte als <th>,
// optionale hervorgehobene Spalte via heroCol, optionale Fußnote).
// ANGEPASST: CSS-Klassen (k-matrix*) -> Tailwind-Utilities auf bestehende Tokens
// (bg-card, border-card-border, text-foreground, text-muted-foreground, bg-primary-soft,
// text-primary - siehe docs/TOKENS.md im Zielrepo). Keine neue Stylesheet-Datei nötig.
// Reine Anzeige-Komponente, kein State -> KEIN "use client", Server-Component-fähig.
import React from "react";
import clsx from "clsx";

export interface DeepMatrixProps {
  /** Column headers. Pass already-localized strings (e.g. via resolveCatalogHead). */
  head?: React.ReactNode[];
  rows?: Array<Array<React.ReactNode>>;
  data?: Array<Array<React.ReactNode>>;
  /** 0-based column index to visually emphasize (e.g. the recommended SDR column). Omit for none. */
  heroCol?: number;
  /** Optional footnote rendered below the table. */
  note?: string;
}

export function DeepMatrix({ head, rows, data, heroCol = -1, note }: DeepMatrixProps) {
  let finalHead = head;
  let finalRows = rows;
  
  if (data && data.length > 0) {
     finalHead = data[0];
     finalRows = data.slice(1);
  }
  
  if (!finalHead || !finalRows) return null;

  return (
    <div>
      {/* Mobile Card Layout (Vertical) */}
      <div className="md:hidden flex flex-col gap-4">
        {finalRows.map((row, ri) => (
          <div key={ri} className="rounded-xl border border-card-border bg-card p-4 shadow-sm flex flex-col gap-3">
            {(row || []).map((c, ci) => {
              if (ci === 0) {
                return (
                  <h3 key={ci} className="font-heading font-bold text-lg text-foreground border-b border-card-border pb-2 mb-1">
                    {c}
                  </h3>
                );
              }
              return (
                <div key={ci} className={clsx(
                  "flex flex-col gap-1 rounded-lg p-2.5",
                  ci === heroCol ? "bg-primary-soft/50" : "bg-background-subtle"
                )}>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {finalHead && finalHead[ci]}
                  </span>
                  <div className={clsx(
                    "text-sm",
                    ci === heroCol ? "font-semibold text-primary" : "text-foreground"
                  )}>
                    {c}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Desktop Table Layout (Horizontal) */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-card-border bg-card shadow-sm">
        <table className="w-full min-w-max border-collapse text-small">
          <thead>
            <tr>
              {finalHead.map((h, i) => (
                <th
                  key={i}
                  className="sticky top-0 border-b border-card-border bg-background-subtle px-5 py-4 text-start font-heading text-xs uppercase tracking-wider text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {finalRows.map((row, ri) => (
              <tr key={ri} className="group transition-colors hover:bg-background-subtle">
                {(row || []).map((c, ci) =>
                  ci === 0 ? (
                    <th
                      key={ci}
                      scope="row"
                      className="whitespace-normal sm:whitespace-nowrap border-b border-card-border px-5 py-4 text-start font-semibold text-foreground group-last:border-b-0 max-w-[200px]"
                    >
                      {c}
                    </th>
                  ) : (
                    <td
                      key={ci}
                      className={clsx(
                        "border-b border-card-border px-5 py-4 align-top text-muted-foreground group-last:border-b-0 leading-relaxed max-w-[300px]",
                        ci === heroCol && "bg-primary-soft/30 font-semibold text-primary-strong"
                      )}
                    >
                      {c}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note ? <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{note}</p> : null}
    </div>
  );
}
