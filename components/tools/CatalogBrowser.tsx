// K-Aqua - CatalogBrowser: echter Produktkatalog-Browser (71 Artikelfamilien, 7 Kategorien,
// reale Artikelnummern aus dem Alt-System).
//
// QUELLE: kaqua-catalog-view.jsx (CatalogDeep) + kaqua-catalog-data.js.
// PORTIERT 1:1: Kategorie-Tabs mit Live-Zähler, Suche über Titel+Artikelnummer, Akkordeon
// mit Eigenschaften-Chips + Maßtabelle. `note`-Feld bewusst NUR bei locale==='de' gezeigt
// (geerbte, noch offene Entscheidung - siehe PROMPT.txt - hier NICHT eigenmächtig
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
import { useLocale } from 'next-intl';
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import EngineeredCard from "@/components/ui/EngineeredCard";
import { CATALOG, CATALOG_COL_LABELS } from "@/lib/data/catalog";
import type { CatalogItem } from "@/lib/data/catalog";

interface CatalogTabMeta {
  label: string;
  desc: string;
  title?: string;
}

export interface CatalogBrowserTranslations {
  cats: Record<string, CatalogTabMeta>;
  eyebrow: string;
  title: string;
  lead: string;
  searchPlaceholder: string;
  noResults: string;
  materialLabel: string;
  sdrLabel: string;
  seriesLabel: string;
  pressureLabel: string;
  lenLabel: string;
  viewDetails: string;
}

interface CatalogBrowserProps {
  translations: CatalogBrowserTranslations;
}

export function CatalogBrowser({ translations }: CatalogBrowserProps) {
  const [cat, setCat] = useState(0);
  const [q, setQ] = useState("");

  const {
    cats: catsMeta,
    eyebrow,
    title,
    lead,
    searchPlaceholder,
    noResults,
    materialLabel,
    sdrLabel,
    seriesLabel,
    pressureLabel,
    lenLabel,
    viewDetails
  } = translations;

  const locale = useLocale() as 'de' | 'en' | 'ar';
  const L = CATALOG_COL_LABELS[locale] || CATALOG_COL_LABELS.en;

  const CATS = CATALOG;
  const active = CATS[cat] ?? CATS[0];
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
          <SectionHead eyebrow={eyebrow} title={title} lead={lead} />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label={eyebrow}>
            {CATS.map((c, i) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={cat === i}
                onClick={() => {
                  setCat(i);
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
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="mb-6 block min-h-12 w-full max-w-[520px] rounded-lg border border-card-border bg-card px-4 text-body text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </Reveal>

        <div className="flex flex-col gap-2">
          {items.length === 0 ? (
            <p className="text-body text-muted-foreground">{noResults}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((it, i) => {
                const specs = [];
                if (it.material) specs.push({ label: materialLabel || "Material", value: it.material });
                if (it.sdr) specs.push({ label: sdrLabel || "SDR", value: String(it.sdr) });
                if (it.series) specs.push({ label: seriesLabel || "Serie", value: it.series });
                if (it.pressure) specs.push({ label: pressureLabel || "Druck", value: it.pressure });
                if (it.len) specs.push({ label: lenLabel || "Länge", value: it.len });

                // Wenn es sich um ein Formteil, Werkzeug etc. handelt, fehlen diese Angaben oft.
                // Wir extrahieren stattdessen Dimensionen und VPE aus den rohen Tabellendaten.
                if (specs.length === 0 || active!.id !== 'pipes') {
                  // Finde Spalte für Dimension (d, d1, mainPipe)
                  const dIdx = it.head.findIndex(h => h.startsWith('d ') || h === 'd1 (mm)' || h === '#mainPipe' || h === '#dim');
                  if (dIdx !== -1 && it.rows.length > 0) {
                    const dVals = it.rows.map(r => {
                      const v = String(r[dIdx]).replace(/[^0-9.]/g, '');
                      return parseFloat(v);
                    }).filter(n => !isNaN(n));

                    if (dVals.length > 0) {
                      const minD = Math.min(...dVals);
                      const maxD = Math.max(...dVals);
                      const unit = it.head[dIdx].includes('mm') || it.head[dIdx] === '#mainPipe' ? ' mm' : '';
                      const dStr = minD === maxD ? `${minD}${unit}` : `${minD} - ${maxD}${unit}`;
                      specs.push({ label: L.dim || "Dimension", value: dStr });
                    } else if (it.rows.length === 1 && it.rows[0][dIdx]) {
                      // Fallback für Strings wie "1/2"
                      specs.push({ label: L.dim || "Dimension", value: String(it.rows[0][dIdx]) });
                    }
                  }

                  // Finde Spalte für Gewinde (Rp, R, thread)
                  const thIdx = it.head.findIndex(h => h === 'Rp' || h === 'R' || h === '#thread');
                  if (thIdx !== -1 && it.rows.length > 0) {
                     const thVals = it.rows.map(r => String(r[thIdx])).filter(v => v && v !== '-');
                     if (thVals.length > 0) {
                       const unique = Array.from(new Set(thVals));
                       if (unique.length === 1) {
                         specs.push({ label: L.thread || "Gewinde", value: unique[0] });
                       } else {
                         specs.push({ label: L.thread || "Gewinde", value: `${unique[0]} ... ${unique[unique.length - 1]}` });
                       }
                     }
                  }

                  // Finde Spalte für Packungsgröße (VPE)
                  const pIdx = it.head.findIndex(h => h === '#pack');
                  if (pIdx !== -1 && it.rows.length > 0) {
                    const pVals = it.rows.map(r => Number(r[pIdx])).filter(n => !isNaN(n));
                    if (pVals.length > 0) {
                      const maxP = Math.max(...pVals);
                      specs.push({ label: L.pack || "VPE", value: `≤ ${maxP}` });
                    }
                  }
                }

                return (
                  <Reveal key={it.slug} delay={i * 0.05}>
                    <EngineeredCard
                      glow={280}
                      stagger={22}
                      overline={it.codes || activeMeta?.title || "K-Aqua"}
                      title={it.title}
                      lead={it.note || ""}
                      specs={specs}
                      cta={`${viewDetails || "Produktdetails"}: ${it.title}`}
                      href={`/produkte/${active!.id}/${it.slug}`}
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
