// components/search/GlobalSearch.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { searchKAqua, SearchResult, escapeRegExp } from '@/lib/search-engine';
import { SearchCategory, SEARCH_INDEX } from '@/lib/search-data';
import { Link } from '@/lib/i18n/navigation';
import {
  Search,
  X,
  ArrowRight,
  Layers,
  Cpu,
  BookOpen,
  Compass,
  Building2,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  SlidersHorizontal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  initialQuery?: string;
}

const CATEGORY_TABS: { id: string; category?: SearchCategory; label: Record<string, string> }[] = [
  { id: 'all', label: { de: 'Alle Ergebnisse', en: 'All Results', ar: 'جميع النتائج' } },
  { id: 'products', category: 'products', label: { de: 'Produkte & Rohre', en: 'Products & Pipes', ar: 'المنتجات والأنابيب' } },
  { id: 'knowledge', category: 'knowledge', label: { de: 'Wissen & Fachartikel', en: 'Knowledge & Articles', ar: 'المعرفة والمقالات' } },
  { id: 'tools', category: 'tools', label: { de: 'Tools & BIM', en: 'Tools & BIM', ar: 'الأدوات و BIM' } },
  { id: 'solutions', category: 'solutions', label: { de: 'Lösungen & Märkte', en: 'Solutions & Markets', ar: 'الحلول والأسواق' } },
  { id: 'certifications', category: 'certifications', label: { de: 'Zertifikate & Normen', en: 'Standards & Certs', ar: 'المعايير والشهادات' } },
  { id: 'company', category: 'company', label: { de: 'Unternehmen & Kontakt', en: 'Company & Contact', ar: 'الشركة والاتصال' } },
];

const POPULAR_TAGS = [
  'PP-RCT SDR 7.4',
  'Schallschutz',
  'Trinkwasserhygiene',
  'BIM Revit',
  'CO2-Rechner',
  'DVGW',
  'DZR Messing',
  'Heizelementmuffenschweißen',
  'Brandschutz EI90',
  'Hochhausbau',
  'K-Fiber UV',
  'Philipp Nickel',
];

export default function GlobalSearch({ initialQuery = '' }: Props) {
  const locale = useLocale();
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState('all');

  // Compute search results using the ranking engine
  const results = useMemo(() => {
    return searchKAqua({
      query,
      category: activeCategory,
      locale,
      maxResults: 60,
    });
  }, [query, activeCategory, locale]);

  // Compute counts per category tab for the current query
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 };
    for (const tab of CATEGORY_TABS) {
      if (tab.id === 'all') continue;
      const filtered = searchKAqua({
        query,
        category: tab.id,
        locale,
        maxResults: 200,
      });
      counts[tab.id] = filtered.length;
    }
    const allFiltered = searchKAqua({
      query,
      category: 'all',
      locale,
      maxResults: 200,
    });
    counts['all'] = allFiltered.length;
    return counts;
  }, [query, locale]);

  const getCategoryIcon = (category: SearchCategory) => {
    switch (category) {
      case 'products':
        return <Layers className="w-5 h-5 text-primary" />;
      case 'tools':
        return <Cpu className="w-5 h-5 text-accent" />;
      case 'solutions':
        return <Building2 className="w-5 h-5 text-primary" />;
      case 'knowledge':
        return <BookOpen className="w-5 h-5 text-secondary" />;
      case 'certifications':
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case 'company':
        return <Compass className="w-5 h-5 text-foreground" />;
      default:
        return <Search className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const highlightMatch = (text: string, term: string) => {
    if (!term.trim()) return text;
    const cleanTerm = escapeRegExp(term.trim());
    const parts = text.split(new RegExp(`(${cleanTerm})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === term.trim().toLowerCase() ? (
            <mark key={i} className="bg-primary/20 text-primary font-bold rounded px-1 py-0.5">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Search Input Bar */}
      <div role="search" className="relative w-full">
        <div className="relative flex items-center bg-card border-2 border-card-border focus-within:border-primary rounded-2xl shadow-lift overflow-hidden transition-all duration-200">
          <div className="ps-5 pe-3 text-muted-foreground flex items-center justify-center">
            <Search className="w-6 h-6 text-primary" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              locale === 'de'
                ? 'Suche nach Begriffen, Artikeln, Normen, SDR, BIM, Schweißen...'
                : locale === 'ar'
                ? 'ابحث عن المصطلحات، المقالات، المعايير، SDR، نماذج BIM...'
                : 'Search terms, articles, standards, SDR, BIM, welding...'
            }
            className="w-full py-4 pe-12 text-base md:text-lg bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute end-4 p-2 rounded-full hover:bg-background-subtle text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
          <span className="text-muted-foreground font-medium flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            {locale === 'de' ? 'Häufig gesucht:' : locale === 'ar' ? 'الأكثر بحثاً:' : 'Popular searches:'}
          </span>
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-background-subtle hover:bg-primary-soft hover:text-primary text-muted-foreground font-medium transition-colors border border-card-border cursor-pointer active:scale-95"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-card-border">
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeCategory === tab.id;
          const label = tab.label[locale] || tab.label['de'];
          const count = categoryCounts[tab.id] ?? 0;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-heading font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-background-subtle border border-card-border'
              }`}
            >
              <span>{label}</span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-mono font-bold ${
                  isActive ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-background-subtle text-muted-foreground'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
        <span className="flex items-center gap-1.5">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          {locale === 'de'
            ? `${results.length} Treffer in der Datenbank`
            : locale === 'ar'
            ? `${results.length} نتيجة في قاعدة البيانات`
            : `${results.length} matches in database`}
        </span>
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setActiveCategory('all');
            }}
            className="text-primary hover:underline text-xs cursor-pointer font-medium"
          >
            {locale === 'de' ? 'Filter zurücksetzen' : locale === 'ar' ? 'إعادة ضبط' : 'Reset filters'}
          </button>
        )}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {results.length > 0 ? (
            results.map((res) => {
              const item = res.entry;
              const itemTitle = item.title[locale] || item.title['de'] || '';
              const originPath = item.origin?.path[locale] || item.origin?.path['de'] || '';
              const badge = item.badge[locale] || item.badge['de'] || '';

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={res.deepHref}
                    className="group flex flex-col justify-between h-full p-6 rounded-2xl bg-card border border-card-border hover:border-primary hover:shadow-lift transition-all duration-200 relative overflow-hidden"
                  >
                    <div>
                      {/* Origin Breadcrumb & Category Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <div className="p-2 rounded-xl bg-background-subtle group-hover:bg-primary-soft transition-colors">
                            {getCategoryIcon(item.category)}
                          </div>
                          <span className="px-2.5 py-1 text-xs font-bold font-heading rounded-md bg-background-subtle text-foreground border border-card-border">
                            {badge}
                          </span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:rtl:-translate-x-1 rtl-flip transition-all shrink-0" />
                      </div>

                      {/* Origin Path */}
                      {originPath && (
                        <div className="text-[11px] font-mono text-muted-foreground mb-2 flex items-center gap-1">
                          <span>{originPath}</span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-heading font-bold text-foreground group-hover:text-primary transition-colors mb-2.5 line-clamp-2 leading-snug">
                        {highlightMatch(itemTitle, query)}
                      </h3>

                      {/* Snippet */}
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                        {highlightMatch(res.snippet, query)}
                      </p>

                      {/* Specs / Tags */}
                      {item.specs && item.specs.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {item.specs.map((spec, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-background-subtle text-foreground/80 border border-card-border/60"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Article Codes */}
                      {item.articleCodes && item.articleCodes.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1 mt-2 text-[11px] text-muted-foreground">
                          <span className="font-semibold">Codes:</span>
                          {item.articleCodes.slice(0, 4).map((code) => (
                            <span key={code} className="font-mono bg-card px-1.5 py-0.5 rounded border border-card-border">
                              {highlightMatch(code, query)}
                            </span>
                          ))}
                          {item.articleCodes.length > 4 && <span>+{item.articleCodes.length - 4} mehr</span>}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-5 pt-3.5 border-t border-card-border/60 flex items-center justify-between text-xs font-semibold text-primary">
                      <span className="flex items-center gap-1">
                        {locale === 'de'
                          ? 'Seite aufrufen & Begriff automatisch anspringen'
                          : locale === 'ar'
                          ? 'فتح الصفحة والتمييز التلقائي'
                          : 'Open page & auto-highlight keyword'}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                    </div>
                  </Link>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full py-16 text-center flex flex-col items-center justify-center bg-card rounded-3xl border border-card-border p-8">
              <Search className="w-12 h-12 text-muted-foreground/40 mb-4" />
              <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                {locale === 'de'
                  ? 'Keine Ergebnisse gefunden'
                  : locale === 'ar'
                  ? 'لم يتم العثور على نتائج'
                  : 'No results found'}
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mb-6">
                {locale === 'de'
                  ? `Für den Suchbegriff "${query}" konnten keine Einträge gefunden werden. Bitte überprüfen Sie die Schreibweise oder versuchen Sie allgemeine Begriffe wie "PP-RCT", "Schallschutz", "BIM" oder "DVGW".`
                  : `No matches found for "${query}". Try searching for terms like "PP-RCT", "Acoustics", "BIM", or "DVGW".`}
              </p>
              <button
                onClick={() => setQuery('')}
                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-sm shadow-sm hover:bg-primary-hover transition-all cursor-pointer"
              >
                {locale === 'de' ? 'Alle Inhalte anzeigen' : locale === 'ar' ? 'عرض جميع المحتويات' : 'View all content'}
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
