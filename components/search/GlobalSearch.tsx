// components/search/GlobalSearch.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { SEARCH_INDEX, SearchEntry } from '@/lib/search-data';
import { Link } from '@/lib/i18n/navigation';
import { Search, X, ArrowRight, Layers, Cpu, BookOpen, Compass, Wrench, Building2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  initialQuery?: string;
}

const CATEGORY_TABS = [
  { id: 'all', label: { de: 'Alle Ergebnisse', en: 'All Results', ar: 'جميع النتائج' } },
  { id: 'products', label: { de: 'Produkte & Rohre', en: 'Products & Pipes', ar: 'المنتجات والأنابيب' } },
  { id: 'tools', label: { de: 'Tools & BIM', en: 'Tools & BIM', ar: 'الأدوات ونماذج BIM' } },
  { id: 'solutions', label: { de: 'Lösungen & Märkte', en: 'Solutions & Markets', ar: 'الحلول والأسواق' } },
  { id: 'knowledge', label: { de: 'Wissen & Academy', en: 'Knowledge & Academy', ar: 'المعرفة والأكاديمية' } },
  { id: 'company', label: { de: 'Unternehmen & Kontakt', en: 'Company & Contact', ar: 'الشركة والاتصال' } },
];

const POPULAR_TAGS = ['BIM', 'PP-RCT', 'CO2-Rechner', 'Heizung & Kühlung', 'Schweißen', 'Trinkwasser', 'DZR Messing', 'Hochhaus'];

export default function GlobalSearch({ initialQuery = '' }: Props) {
  const locale = useLocale();
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SEARCH_INDEX.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      if (!q) return true;

      // Text matching across locale title, description, and keywords
      const title = (item.title[locale] || item.title['de'] || '').toLowerCase();
      const desc = (item.description[locale] || item.description['de'] || '').toLowerCase();
      const keywords = item.keywords.join(' ').toLowerCase();

      return title.includes(q) || desc.includes(q) || keywords.includes(q);
    });
  }, [query, activeCategory, locale]);

  const getCategoryIcon = (category: SearchEntry['category']) => {
    switch (category) {
      case 'products':
        return <Layers className="w-4 h-4 text-primary" />;
      case 'tools':
        return <Cpu className="w-4 h-4 text-accent" />;
      case 'solutions':
        return <Building2 className="w-4 h-4 text-primary-strong" />;
      case 'knowledge':
        return <BookOpen className="w-4 h-4 text-secondary" />;
      case 'company':
        return <Compass className="w-4 h-4 text-foreground" />;
      default:
        return <Wrench className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const highlightMatch = (text: string, term: string) => {
    if (!term.trim()) return text;
    const parts = text.split(new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === term.toLowerCase() ? (
            <mark key={i} className="bg-primary/20 text-primary font-semibold rounded px-1 py-0.5">
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
      <div className="relative w-full">
        <div className="relative flex items-center bg-card border-2 border-card-border focus-within:border-primary rounded-2xl shadow-lift overflow-hidden transition-all duration-200">
          <div className="pl-5 pr-3 text-muted-foreground flex items-center justify-center">
            <Search className="w-6 h-6 text-primary" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              locale === 'de'
                ? 'Suche nach Produkten, BIM-Daten, Rohren, SDR, Normen...'
                : locale === 'ar'
                ? 'ابحث عن المنتجات، نماذج BIM، الأنابيب، المعايير...'
                : 'Search products, BIM models, pipes, SDR, standards...'
            }
            className="w-full py-4 pr-12 text-base md:text-lg bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 p-2 rounded-full hover:bg-background-subtle text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
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
          const label = tab.label[locale as keyof typeof tab.label] || tab.label.de;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-heading font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-background-subtle border border-card-border'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Search Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
        <span>
          {locale === 'de'
            ? `${filteredResults.length} Ergebnis${filteredResults.length === 1 ? '' : 'se'} gefunden`
            : locale === 'ar'
            ? `تم العثور على ${filteredResults.length} نتيجة`
            : `Found ${filteredResults.length} result${filteredResults.length === 1 ? '' : 's'}`}
        </span>
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setActiveCategory('all');
            }}
            className="text-primary hover:underline text-xs cursor-pointer"
          >
            {locale === 'de' ? 'Filter zurücksetzen' : locale === 'ar' ? 'إعادة ضبط' : 'Reset filters'}
          </button>
        )}
      </div>

      {/* Results List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => {
              const itemTitle = item.title[locale] || item.title['de'] || '';
              const itemDesc = item.description[locale] || item.description['de'] || '';
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
                    href={item.href}
                    className="group flex flex-col justify-between h-full p-5 rounded-2xl bg-card border border-card-border hover:border-primary hover:shadow-lift transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-background-subtle group-hover:bg-primary-soft transition-colors">
                            {getCategoryIcon(item.category)}
                          </div>
                          {item.badge && (
                            <span className="px-2 py-0.5 text-xs font-bold font-heading rounded-md bg-background-subtle text-muted-foreground border border-card-border">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="text-base font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-2">
                        {highlightMatch(itemTitle, query)}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {highlightMatch(itemDesc, query)}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-card-border/60 flex items-center justify-between text-xs text-primary font-medium">
                      <span>{locale === 'de' ? 'Direkt aufrufen' : locale === 'ar' ? 'فتح الصفحة' : 'View details'}</span>
                      <span className="font-mono text-muted-foreground text-[11px]">{item.href}</span>
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
                  ? `Für den Suchbegriff "${query}" konnten keine Einträge gefunden werden. Bitte überprüfen Sie die Schreibweise oder versuchen Sie allgemeine Begriffe wie "Pipes", "BIM" oder "Fittings".`
                  : `No matches found for "${query}". Try searching for general terms like "Pipes", "BIM", or "Valves".`}
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
