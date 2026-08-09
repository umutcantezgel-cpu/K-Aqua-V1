/* eslint-disable react/jsx-no-literals, @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { FilterChip } from "@/components/ui/FilterChip";
import { Button } from "@/components/ui/Button";
import LiquidMagneticButton from "@/components/ui/LiquidMagneticButton";
import { Download, ArrowRight } from "@/components/ui/icon";
import { Search } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Link, usePathname, useRouter } from "@/lib/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface ProductMeta {
  slug: string;
  category: string;
  title: string;
  article_codes: string | string[];
}

const CATEGORIES = [
  { id: "all", key: "catAll", fallback: "Alle" },
  { id: "pipes", key: "catPipes", fallback: "Rohre" },
  { id: "fittings", key: "catFittings", fallback: "Formteile" },
  { id: "valves", key: "catValves", fallback: "Armaturen" },
  { id: "tools", key: "catTools", fallback: "Werkzeuge" },
  { id: "transition-fittings", key: "catTransitionFittings", fallback: "Übergangsfittings" },
  { id: "accessories", key: "catAccessories", fallback: "Zubehör" },
  { id: "weld-in-saddles", key: "catWeldInSaddles", fallback: "Einschweißsattel" }
];

export default function ProductFinder({ initialProducts = [] }: { initialProducts?: ProductMeta[] }) {
  const t = useTranslations("finder");
  const locale = useLocale();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const activeCategory = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("q") || "";
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const updateParams = (newParams: { category?: string; q?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newParams.category !== undefined) {
      if (newParams.category === "all") {
        params.delete("category");
      } else {
        params.set("category", newParams.category);
      }
    }
    
    if (newParams.q !== undefined) {
      if (newParams.q === "") {
        params.delete("q");
      } else {
        params.set("q", newParams.q);
      }
    }
    
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const rows = useMemo(() => {
    return initialProducts.filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const codesStr = Array.isArray(p.article_codes) ? p.article_codes.join(", ") : (p.article_codes || "");
      const matchSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        codesStr.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [initialProducts, activeCategory, searchQuery]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-card-border">
        <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
          <Reveal>
            <span className="inline-block px-3 py-1 text-[13px] font-bold tracking-[0.1em] text-primary bg-primary-soft rounded-full uppercase mb-4">
              {t("eyebrow")}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-h1 font-heading font-extrabold tracking-tight mt-4 mb-6 text-foreground leading-[1.1] text-wrap-balance">
              {t("title1")}{" "}
              <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">
                Katalog
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-lead text-muted-foreground leading-relaxed max-w-[64ch]">
              <span className="sr-only" aria-hidden="true">{t("title1")} Katalog </span>
              Durchsuchen Sie unser komplettes Produktsortiment nach Kategorie, Name oder Artikelnummer.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main content grid */}
      <section className="py-16 bg-background">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.3fr_0.7fr] gap-8 items-start">
            {/* Sticky Filters Column */}
            <div className="flex flex-col gap-6 lg:sticky lg:top-24 z-20">
              <Reveal>
                <Card className="p-6 flex flex-col gap-6 text-start">
                  <div>
                    <h2 className="font-heading font-bold text-base text-foreground mb-3">
                      {t("category") || "Kategorie"}
                    </h2>
                    <div className="flex flex-col gap-2">
                      {CATEGORIES.map((cat) => (
                        <FilterChip
                          key={cat.id}
                          pressed={activeCategory === cat.id}
                          onClick={() => updateParams({ category: cat.id })}
                        >
                          {t.has(cat.key) ? t(cat.key) : cat.fallback}
                        </FilterChip>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="font-heading font-bold text-base text-foreground mb-3">
                      {t("search") || "Suche"}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-3 flex items-center pointer-events-none text-muted-foreground">
                        <Search className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        placeholder={t("searchPlaceholder") || "Artikelnummer oder Name..."}
                        className="k-input h-11 py-2.5 ps-10 pe-4 w-full bg-background-subtle border border-card-border focus:border-primary focus:ring-1 focus:ring-primary rounded-lg transition-all outline-none"
                        value={localSearchQuery}
                        onChange={(e) => {
                          setLocalSearchQuery(e.target.value);
                          updateParams({ q: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </Card>
              </Reveal>

              <Reveal delay={0.08}>
                <Card tint className="p-6 flex flex-col gap-3 items-start text-start">
                  <span className="text-[44px] font-heading font-extrabold text-foreground leading-none">
                    {rows.length}
                  </span>
                  <span className="text-body text-muted-foreground">
                    {t("foundFam") || "Artikelfamilien gefunden"}
                  </span>
                  <LiquidMagneticButton
                    fill="crest"
                    variant="ghost"
                    size="md"
                    href="/pdf/k-aqua-product-range-en.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t("catalogPdf") || "Katalog als PDF"}
                  </LiquidMagneticButton>
                </Card>
              </Reveal>
            </div>

            {/* Dynamic Table Column (Responsive) */}
            <div className="w-full">
              <Reveal delay={0.12}>
                <Card className="p-4 sm:p-6 text-start">
                  <div className="hidden md:block overflow-x-auto rounded-lg border border-card-border max-h-[640px] overflow-y-auto">
                    <table className="w-full border-collapse text-[15px] text-start">
                      <thead className="sticky top-0 bg-card z-10">
                        <tr className="border-b-2 border-primary">
                          <th className="font-heading font-bold text-start p-3 px-4 whitespace-nowrap text-foreground bg-card">
                            {t("colName") || "Produktname"}
                          </th>
                          <th className="font-heading font-bold text-start p-3 px-4 whitespace-nowrap text-foreground bg-card">
                            {t("colCat") || "Kategorie"}
                          </th>
                          <th className="font-heading font-bold text-start p-3 px-4 whitespace-nowrap text-foreground bg-card">
                            {t("colCodes") || "Artikelnummern"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((r, i) => {
                          const slugOnly = r.slug.includes("/") ? r.slug.split("/").pop() : r.slug;
                          const catObj = CATEGORIES.find((c) => c.id === r.category);
                          const catLabel = catObj ? (t.has(catObj.key) ? t(catObj.key) : catObj.fallback) : r.category;
                          return (
                          <tr
                            key={i}
                            className="hover:bg-primary-soft/50 transition-colors duration-fast group cursor-pointer"
                          >
                            <td className="p-3 px-4 border-b border-card-border font-semibold text-foreground text-start">
                              <Link href={`/produkte/${r.category}/${slugOnly}`} className="hover:text-primary transition-colors flex items-center justify-between gap-2" title={r.title}>
                                <span>{r.title}</span>
                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                              </Link>
                            </td>
                            <td className="p-3 px-4 border-b border-card-border text-muted-foreground text-start">
                              <span>{catLabel}</span>
                            </td>
                            <td className="p-3 px-4 border-b border-card-border text-muted-foreground text-start font-mono text-sm max-w-[200px] truncate">
                              {Array.isArray(r.article_codes) ? r.article_codes.join(", ") : (r.article_codes || "-")}
                            </td>
                          </tr>
                           );
                         })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card Layout for Products */}
                  <div className="grid grid-cols-1 gap-4 md:hidden">
                    {rows.map((r, i) => {
                      const slugOnly = r.slug.includes("/") ? r.slug.split("/").pop() : r.slug;
                      const catObj = CATEGORIES.find((c) => c.id === r.category);
                      const catLabel = catObj ? (t.has(catObj.key) ? t(catObj.key) : catObj.fallback) : r.category;
                      return (
                        <Link 
                          key={i} 
                          href={`/produkte/${r.category}/${slugOnly}`}
                          className="block rounded-lg border border-card-border p-4 bg-background-subtle hover:border-primary/50 transition-colors"
                        >
                          <div className="flex flex-col gap-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-primary">{catLabel}</span>
                            <h3 className="font-heading font-bold text-foreground leading-tight">{r.title}</h3>
                            <div className="text-muted-foreground font-mono text-xs mt-2 line-clamp-2">
                              {Array.isArray(r.article_codes) ? r.article_codes.join(", ") : (r.article_codes || "-")}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                    {rows.length === 0 && (
                      <div className="flex flex-col items-center justify-center p-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-background-subtle flex items-center justify-center mb-4">
                          <Search className="w-8 h-8 text-muted-foreground/50" />
                        </div>
                        <h4 className="text-lg font-heading font-bold text-foreground mb-2">
                          {t("none") || "Keine Treffer"}
                        </h4>
                        <p className="text-body text-muted-foreground max-w-[40ch]">
                          {t("noResultsText") || "Wir konnten keine Produkte finden, die Ihren Suchkriterien entsprechen. Bitte versuchen Sie es mit einem anderen Begriff oder ändern Sie die Kategorie."}
                        </p>
                        <Button 
                          variant="secondary" 
                          className="mt-6"
                          onClick={() => {
                            setLocalSearchQuery("");
                            updateParams({ category: "all", q: "" });
                          }}
                        >
                          {t("resetFilters") || "Filter zurücksetzen"}
                        </Button>
                      </div>
                    )}
                </Card>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
