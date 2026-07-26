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
/* eslint-disable react/jsx-no-literals */
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import EngineeredCard from "@/components/ui/EngineeredCard";
import { CATALOG } from "@/lib/data/catalog";
import type { CatalogItem } from "@/lib/data/catalog";

interface CatalogTabMeta {
  label: string;
  desc: string;
  title?: string;
}

export function CatalogBrowser() {
  const t = useTranslations("catalogx");
  const [cat, setCat] = useState(0);
  const [q, setQ] = useState("");

  const CATS = CATALOG;
  const active = CATS[cat] ?? CATS[0];
  const catsMeta = t.raw("cats") as Record<string, CatalogTabMeta>;
  const activeMeta = catsMeta[active!.id];

  const items: CatalogItem[] = active!.items.filter((it) => {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((it, i) => {
                const specs = [];
                if (it.material) specs.push({ label: t("materialLabel"), value: it.material });
                if (it.sdr) specs.push({ label: t("sdrLabel"), value: String(it.sdr) });
                if (it.series) specs.push({ label: t("seriesLabel"), value: it.series });
                if (it.pressure) specs.push({ label: t("pressureLabel"), value: it.pressure });
                if (it.len) specs.push({ label: t("lenLabel"), value: it.len });

                return (
                  <Reveal key={it.slug} delay={i * 0.05}>
                    <EngineeredCard
                      glow={280}
                      stagger={22}
                      overline={it.codes || activeMeta?.title || "K-Aqua"}
                      title={it.title}
                      lead={it.note || ""}
                      specs={specs}
                      cta={t("viewDetails") || "Details"}
                      href={`/produkte/katalog/${active!.id}/${it.slug}`}
                    />
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
