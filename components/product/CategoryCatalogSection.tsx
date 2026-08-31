'use client';

import React, { useState, useMemo } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { CatalogItem } from '@/lib/data/catalog';
import { Search, ArrowRight, Layers, ShieldCheck, Gauge, Ruler, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface CategoryCatalogSectionProps {
  category: string;
  items: CatalogItem[];
  title?: string;
  subtitle?: string;
  locale?: string;
}

const I18N = {
  de: {
    defaultTitle: 'Produktübersicht & Varianten',
    defaultSubtitle: 'Entdecken Sie das vollständige Sortiment an geprüften und zertifizierten Komponenten für anspruchsvolle B2B-Projekte.',
    catalogBadge: (cat: string, count: number) => `${cat.toUpperCase()} KATALOG (${count} PRODUKTFAMILIEN)`,
    searchPlaceholder: 'Produkte, Codes suchen...',
    filterLabel: 'Filter:',
    all: 'Alle',
    artNo: 'Art.-Nr.:',
    dimensions: 'Dimensionen:',
    pressure: 'Druckstufe:',
    length: 'Lieferlänge:',
    sizesAvailable: (count: number) => `${count} Standardgrößen verfügbar`,
    details: 'Details & Datenblatt',
    specs: 'Technische Daten & Varianten',
    noResults: 'Keine Produkte gefunden, die den Such- oder Filterkriterien entsprechen.',
    resetFilter: 'Filter zurücksetzen',
  },
  en: {
    defaultTitle: 'Product Overview & Variants',
    defaultSubtitle: 'Discover the complete range of tested and certified components for demanding B2B projects.',
    catalogBadge: (cat: string, count: number) => `${cat.toUpperCase()} CATALOG (${count} PRODUCT FAMILIES)`,
    searchPlaceholder: 'Search products, codes...',
    filterLabel: 'Filter:',
    all: 'All',
    artNo: 'Art. No.:',
    dimensions: 'Dimensions:',
    pressure: 'Pressure Rating:',
    length: 'Delivery Length:',
    sizesAvailable: (count: number) => `${count} standard sizes available`,
    details: 'Details & Datasheet',
    specs: 'Technical Specs & Variants',
    noResults: 'No products found matching your search or filter criteria.',
    resetFilter: 'Reset filters',
  },
  ar: {
    defaultTitle: 'نظرة عامة على المنتجات والمتغيرات',
    defaultSubtitle: 'اكتشف المجموعة الكاملة من المكونات المختبرة والمعتمدة للمشاريع الهندسية والتجارية المتطلبة.',
    catalogBadge: (cat: string, count: number) => `كتالوج ${cat.toUpperCase()} (${count} عائلة منتجات)`,
    searchPlaceholder: 'البحث عن المنتجات والأكواد...',
    filterLabel: 'تصفية:',
    all: 'الكل',
    artNo: 'رقم الصنف:',
    dimensions: 'الأبعاد:',
    pressure: 'فئة الضغط:',
    length: 'طول التوريد:',
    sizesAvailable: (count: number) => `${count} مقاسات قياسية متوفرة`,
    details: 'التفاصيل وصحيفة البيانات',
    specs: 'البيانات الفنية والمتغيرات',
    noResults: 'لم يتم العثور على منتجات تطابق معايير البحث أو التصفية.',
    resetFilter: 'إعادة ضبط الفلاتر',
  }
};

export function CategoryCatalogSection({
  category,
  items,
  title,
  subtitle,
  locale = 'de',
}: CategoryCatalogSectionProps) {
  const t = I18N[locale as 'de' | 'en' | 'ar'] || (locale.startsWith('ar') ? I18N.ar : locale === 'de' ? I18N.de : I18N.en);
  const displayTitle = title || t.defaultTitle;
  const displaySubtitle = subtitle || t.defaultSubtitle;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [selectedSdr, setSelectedSdr] = useState<string>('all');

  // Extract unique materials & SDRs for filtering
  const materials = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      if (item.material) set.add(item.material);
    });
    return Array.from(set);
  }, [items]);

  const sdrs = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      if (item.sdr !== undefined && item.sdr !== null) {
        set.add(`SDR ${item.sdr}`);
      }
    });
    return Array.from(set);
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        (item.codes && item.codes.toLowerCase().includes(q)) ||
        (item.material && item.material.toLowerCase().includes(q));

      const matchesMaterial =
        selectedMaterial === 'all' || item.material === selectedMaterial;

      const matchesSdr =
        selectedSdr === 'all' ||
        (item.sdr !== undefined && `SDR ${item.sdr}` === selectedSdr);

      return matchesQuery && matchesMaterial && matchesSdr;
    });
  }, [items, searchQuery, selectedMaterial, selectedSdr]);

  const getDimensionRange = (item: CatalogItem): string => {
    if (!item.rows || item.rows.length === 0 || !item.rows[0]) return '-';
    const firstVal = item.rows[0][0];
    const lastRow = item.rows[item.rows.length - 1];
    const lastVal = lastRow ? lastRow[0] : firstVal;
    return typeof firstVal === 'number' && typeof lastVal === 'number'
      ? `d ${firstVal} – d ${lastVal} mm`
      : `${firstVal} – ${lastVal}`;
  };

  return (
    <section id="catalog-section" className="py-20 bg-background-subtle border-y border-card-border">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
              <Layers size={14} />
              <span>{t.catalogBadge(category, items.length)}</span>
            </div>
            <h2 className="text-h2 font-heading font-extrabold text-foreground tracking-tight">
              {displayTitle}
            </h2>
            <p className="text-muted-foreground text-lead mt-2 max-w-2xl">
              {displaySubtitle}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground rtl:left-auto rtl:right-3.5"
            />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 rounded-xl bg-card border border-card-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm shadow-sm transition"
            />
          </div>
        </div>

        {/* Filter Bar */}
        {(materials.length > 0 || sdrs.length > 0) && (
          <div className="flex flex-wrap items-center gap-2 mb-8 p-3 rounded-xl bg-card border border-card-border">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mr-2 rtl:mr-0 rtl:ml-2">
              {t.filterLabel}
            </span>

            {/* Material Filters */}
            <button
              onClick={() => {
                setSelectedMaterial('all');
                setSelectedSdr('all');
              }}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition',
                selectedMaterial === 'all' && selectedSdr === 'all'
                  ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                  : 'bg-background hover:bg-background-subtle text-foreground'
              )}
            >
              {t.all} ({items.length})
            </button>

            {materials.map((mat) => (
              <button
                key={mat}
                onClick={() => setSelectedMaterial(selectedMaterial === mat ? 'all' : mat)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition',
                  selectedMaterial === mat
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'bg-background hover:bg-background-subtle text-foreground'
                )}
              >
                {mat}
              </button>
            ))}

            {sdrs.map((sdr) => (
              <button
                key={sdr}
                onClick={() => setSelectedSdr(selectedSdr === sdr ? 'all' : sdr)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition',
                  selectedSdr === sdr
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'bg-background hover:bg-background-subtle text-foreground'
                )}
              >
                {sdr}
              </button>
            ))}
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const dimRange = getDimensionRange(item);
              const detailHref = `/produkte/${category}/${item.slug}`;

              return (
                <div
                  key={item.slug}
                  className="group relative flex flex-col justify-between rounded-2xl bg-card border border-card-border p-6 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300"
                >
                  <div>
                    {/* Badges row */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {item.material && (
                        <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-bold font-mono">
                          {item.material}
                        </span>
                      )}
                      {item.sdr !== undefined && (
                        <span className="px-2.5 py-0.5 rounded-md bg-accent-strong/10 text-accent-strong text-xs font-bold font-mono">
                          SDR {item.sdr}
                        </span>
                      )}
                      {item.series && (
                        <span className="px-2.5 py-0.5 rounded-md bg-background-subtle text-muted-foreground text-xs font-mono border border-card-border">
                          {item.series}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                      <Link href={detailHref} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {item.title}
                      </Link>
                    </h3>

                    {/* Article Code */}
                    {item.codes && (
                      <p className="text-xs font-mono text-muted-foreground mt-1 mb-4">
                        {t.artNo} <span className="text-foreground font-semibold">{item.codes}</span>
                      </p>
                    )}

                    {/* Key Technical Specs */}
                    <div className="space-y-2 py-3 border-y border-card-border my-4 text-xs">
                      <div className="flex items-center justify-between text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Ruler size={14} className="text-primary" />
                          {t.dimensions}
                        </span>
                        <span className="font-semibold text-foreground">{dimRange}</span>
                      </div>

                      {item.pressure && (
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Gauge size={14} className="text-primary" />
                            {t.pressure}
                          </span>
                          <span className="font-semibold text-foreground text-right rtl:text-left max-w-[180px] truncate" title={item.pressure}>
                            {item.pressure}
                          </span>
                        </div>
                      )}

                      {item.len && (
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <ShieldCheck size={14} className="text-primary" />
                            {t.length}
                          </span>
                          <span className="font-semibold text-foreground">{item.len}</span>
                        </div>
                      )}
                      {/* Die 4 m sind die Standardlänge, nicht die einzige.
                          Vier Rohre liefern laut Katalogfußnote auf Anfrage
                          5,80 m unter eigener Artikelnummer — das stand bisher
                          nur im Markdown und nirgends im Web-Katalog. */}
                      {item.lenNote && (
                        <p className="text-xs text-muted-foreground leading-relaxed pt-0.5">
                          {item.lenNote}
                        </p>
                      )}
                    </div>

                    {/* Matrix sample info */}
                    {item.rows && item.rows.length > 0 && (
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <span>{t.sizesAvailable(item.rows.length)}</span>
                        <span className="text-primary font-medium flex items-center gap-1">
                          {t.details}
                          <ChevronRight size={14} className="rtl-flip" />
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Link Footer */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                      {t.specs}
                      <ArrowRight size={16} className="rtl-flip" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-2xl border border-card-border">
            <p className="text-muted-foreground text-base">
              {t.noResults}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedMaterial('all');
                setSelectedSdr('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-sm"
            >
              {t.resetFilter}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
