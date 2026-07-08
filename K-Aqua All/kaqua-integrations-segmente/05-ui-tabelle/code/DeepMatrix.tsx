// K-Aqua — DeepMatrix: generische Vergleichs-/Datenmatrix-Tabelle.
//
// QUELLE: kaqua-deep-ui.jsx (DeepMatrix). PORTIERT 1:1 (Struktur: erste Spalte als <th>,
// optionale hervorgehobene Spalte via heroCol, optionale Fußnote).
// ANGEPASST: CSS-Klassen (k-matrix*) -> Tailwind-Utilities auf bestehende Tokens
// (bg-card, border-card-border, text-foreground, text-muted-foreground, bg-primary-soft,
// text-primary — siehe docs/TOKENS.md im Zielrepo). Keine neue Stylesheet-Datei nötig.
// Reine Anzeige-Komponente, kein State -> KEIN "use client", Server-Component-fähig.
import React from "react";
import clsx from "clsx";

export interface DeepMatrixProps {
  /** Column headers. Pass already-localized strings (e.g. via resolveCatalogHead). */
  head: React.ReactNode[];
  rows: Array<Array<React.ReactNode>>;
  /** 0-based column index to visually emphasize (e.g. the recommended SDR column). Omit for none. */
  heroCol?: number;
  /** Optional footnote rendered below the table. */
  note?: string;
}

export function DeepMatrix({ head, rows, heroCol = -1, note }: DeepMatrixProps) {
  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-card-border bg-card">
        <table className="w-full min-w-[640px] border-collapse text-small">
          <thead>
            <tr>
              {head.map((h, i) => (
                <th
                  key={i}
                  className="sticky top-0 border-b border-card-border bg-background-subtle px-4 py-3 text-start font-heading text-tiny uppercase tracking-wider text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="group">
                {row.map((c, ci) =>
                  ci === 0 ? (
                    <th
                      key={ci}
                      scope="row"
                      className="whitespace-nowrap border-b border-card-border px-4 py-3 text-start font-semibold text-foreground group-hover:bg-background-subtle group-last:border-b-0"
                    >
                      {c}
                    </th>
                  ) : (
                    <td
                      key={ci}
                      className={clsx(
                        "border-b border-card-border px-4 py-3 align-top text-muted-foreground group-last:border-b-0 group-hover:bg-background-subtle",
                        ci === heroCol && "bg-primary-soft font-semibold text-primary group-hover:bg-primary-soft"
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
      {note ? <p className="mt-3 text-tiny leading-relaxed text-faint-foreground">{note}</p> : null}
    </div>
  );
}
