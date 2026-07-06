// K-Aqua — CatalogBrowser: echter Produktkatalog-Browser (71 Artikelfamilien, 7 Kategorien,
// reale Artikelnummern aus dem Alt-System).
//
// QUELLE: kaqua-catalog-view.jsx (CatalogDeep) + kaqua-catalog-data.js.
// PORTIERT 1:1: Kategorie-Tabs mit Live-Zähler, Suche über Titel+Artikelnummer, Akkordeon
// mit Eigenschaften-Chips + Maßtabelle. `note`-Feld bewusst NUR bei locale==='de' gezeigt
// (geerbte, noch offene Entscheidung — siehe PROMPT.txt — hier NICHT eigenmächtig
// geändert).
// ANGEPASST: usePageL('catalogx')/useT() -> useTranslations('catalogx')/useLocale() (next-intl).
// Strukturierte Werte (cats) über t.raw(), da next-intl t() nur Strings liefert (siehe
// PROMPT.txt). window.K_REAL_CATALOG -> CATALOG/resolveCatalogHead()
// aus lib/data/catalog.ts. Icons.ChevronDown -> benannter Import (Vorbedingung:
// components/ui/icon.tsx muss ChevronDown exportieren, siehe PROMPT.txt (Icon-Segment)).
// Eigener State (Kategorie/Suche/offene Zeile) -> "use client".
"use client";
import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { ChevronDown } from "@/components/ui/icon";
import { CATALOG, resolveCatalogHead } from "@/lib/data/catalog";
import type { CatalogItem } from "@/lib/data/catalog";

interface CatalogTabMeta {
  label: string;
  desc: string;
}

export function CatalogBrowser() {
  const t = useTranslations("catalogx");
  const locale = useLocale() as "de" | "en" | "ar";
  const [cat, setCat] = useState(0);
  const [q, setQ] = useState("");
  const [openIdx, setOpenIdx] = useState(-1);

  const CATS = CATALOG;
  const active = CATS[cat] ?? CATS[0];
  const catsMeta = t.raw("cats") as Record<string, CatalogTabMeta>;
  const activeMeta = catsMeta[active.id];

  const items: CatalogItem[] = active.items.filter((it) => {
    const query = q.trim().toLowerCase();
    if (!query) return true;
    return it.title.toLowerCase().includes(query) || it.codes.toLowerCase().includes(query);
  });

  return (
    <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="products-catalog">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <SectionHead eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label={t("eyebrow")}>
            {CATS.map((c, i) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={cat === i}
                onClick={() => {
                  setCat(i);
                  setOpenIdx(-1);
                }}
                className={
                  cat === i
                    ? "min-h-11 rounded-full border border-primary bg-primary px-4 text-small font-semibold text-primary-foreground"
                    : "min-h-11 rounded-full border border-card-border bg-card px-4 text-small font-semibold text-muted-foreground hover:border-primary hover:text-primary"
                }
              >
                {(catsMeta[c.id]?.label ?? c.id)} · {c.count}
              </button>
            ))}
          </div>
        </Reveal>

        {activeMeta ? (
          <Reveal delay={0.1}>
            <p className="mb-5 max-w-[680px] text-body text-muted-foreground">{activeMeta.desc}</p>
          </Reveal>
        ) : null}

        <Reveal delay={0.12}>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("searchPlaceholder")}
            aria-label={t("searchPlaceholder")}
            className="mb-6 block min-h-12 w-full max-w-[520px] rounded-lg border border-card-border bg-card px-4 text-body text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </Reveal>

        <div className="flex flex-col gap-2">
          {items.length === 0 ? (
            <p className="text-body text-muted-foreground">{t("noResults")}</p>
          ) : (
            items.map((it, i) => {
              const isOpen = openIdx === i;
              return (
                <div
                  key={it.title}
                  className={
                    isOpen
                      ? "overflow-hidden rounded-lg border border-primary bg-card"
                      : "overflow-hidden rounded-lg border border-card-border bg-card"
                  }
                >
                  <button
                    type="button"
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-start outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  >
                    <span className="flex min-w-0 flex-col items-start gap-1">
                      <span className="font-heading text-body font-bold text-foreground">{it.title}</span>
                      <span className="text-tiny font-medium text-faint-foreground">{it.codes}</span>
                    </span>
                    <ChevronDown
                      size={18}
                      className={isOpen ? "shrink-0 rotate-180 text-primary transition-transform" : "shrink-0 text-primary transition-transform"}
                    />
                  </button>
                  {isOpen ? (
                    <div className="px-5 pb-5">
                      {it.material || it.sdr || it.series || it.pressure || it.len ? (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {it.material ? (
                            <span className="rounded-full bg-primary-soft px-3 py-1 text-tiny font-semibold text-foreground">
                              {t("materialLabel")}: <strong>{it.material}</strong>
                            </span>
                          ) : null}
                          {it.sdr ? (
                            <span className="rounded-full bg-primary-soft px-3 py-1 text-tiny font-semibold text-foreground">
                              {t("sdrLabel")}: <strong>{it.sdr}</strong>
                            </span>
                          ) : null}
                          {it.series ? (
                            <span className="rounded-full bg-primary-soft px-3 py-1 text-tiny font-semibold text-foreground">
                              {t("seriesLabel")}: <strong>{it.series}</strong>
                            </span>
                          ) : null}
                          {it.pressure ? (
                            <span className="rounded-full bg-primary-soft px-3 py-1 text-tiny font-semibold text-foreground">
                              {t("pressureLabel")}: <strong>{it.pressure}</strong>
                            </span>
                          ) : null}
                          {it.len ? (
                            <span className="rounded-full bg-primary-soft px-3 py-1 text-tiny font-semibold text-foreground">
                              {t("lenLabel")}: <strong>{it.len}</strong>
                            </span>
                          ) : null}
                        </div>
                      ) : null}
                      <DeepMatrix head={resolveCatalogHead(it.head, locale)} rows={it.rows} />
                      {locale === "de" && it.note ? (
                        <p className="mt-3 text-tiny leading-relaxed text-faint-foreground">{it.note}</p>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
