// components/search/SearchModal.tsx
'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from '@/lib/i18n/navigation';
import { searchKAqua, SearchResult, escapeRegExp } from '@/lib/search-engine';
import { SearchCategory } from '@/lib/search-data';
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
  CornerDownLeft,
  Clock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_TABS: { id: string; label: Record<string, string> }[] = [
  { id: 'all', label: { de: 'Alle', en: 'All', ar: 'الكل' } },
  { id: 'products', label: { de: 'Produkte', en: 'Products', ar: 'المنتجات' } },
  { id: 'knowledge', label: { de: 'Wissen & Normen', en: 'Knowledge & Standards', ar: 'المعرفة والمعايير' } },
  { id: 'tools', label: { de: 'Tools & BIM', en: 'Tools & BIM', ar: 'الأدوات و BIM' } },
  { id: 'solutions', label: { de: 'Lösungen', en: 'Solutions', ar: 'الحلول' } },
  { id: 'certifications', label: { de: 'Zertifikate', en: 'Certificates', ar: 'الشهادات' } },
  { id: 'company', label: { de: 'Unternehmen', en: 'Company', ar: 'الشركة' } },
];

const POPULAR_SUGGESTIONS = [
  'PP-RCT SDR 7.4',
  'Schallschutz',
  'Trinkwasserhygiene',
  'BIM Revit',
  'CO2-Rechner',
  'DVGW',
  'Heizelementmuffenschweißen',
  'DZR Messing',
  'Hochhausbau',
];

export default function SearchModal({ isOpen, onClose }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kaqua_recent_searches');
      if (saved) {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const saveRecentSearch = useCallback((term: string) => {
    const clean = term.trim();
    if (!clean) return;
    try {
      setRecentSearches((prev) => {
        const updated = [clean, ...prev.filter((item) => item.toLowerCase() !== clean.toLowerCase())].slice(0, 5);
        localStorage.setItem('kaqua_recent_searches', JSON.stringify(updated));
        return updated;
      });
    } catch {
      // Ignore
    }
  }, []);

  // Autofocus when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setActiveCategory('all');
    }
  }, [isOpen]);

  // Compute search results
  const results = useMemo(() => {
    return searchKAqua({
      query,
      category: activeCategory,
      locale,
      maxResults: 20,
    });
  }, [query, activeCategory, locale]);

  // Reset selected index on query/category change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  const handleSelectResult = useCallback(
    (result: SearchResult) => {
      saveRecentSearch(query || result.entry.title[locale] || result.entry.title['de'] || '');
      onClose();
      router.push(result.deepHref);
    },
    [query, locale, router, onClose, saveRecentSearch]
  );

  const handleOpenFullSearch = useCallback(() => {
    if (query.trim()) saveRecentSearch(query.trim());
    onClose();
    const targetUrl = `/suche${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`;
    router.push(targetUrl);
  }, [query, router, onClose, saveRecentSearch]);

  // Keyboard navigation inside modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results.length > 0 && results[selectedIndex]) {
          handleSelectResult(results[selectedIndex]);
        } else if (query.trim()) {
          handleOpenFullSearch();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, query, handleSelectResult, handleOpenFullSearch, onClose]);

  // Scroll selected item into view in the list
  useEffect(() => {
    if (listRef.current && results.length > 0) {
      const selectedElem = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElem) {
        selectedElem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex, results.length]);

  const getCategoryIcon = (category: SearchCategory) => {
    switch (category) {
      case 'products':
        return <Layers className="w-4 h-4 text-primary" />;
      case 'tools':
        return <Cpu className="w-4 h-4 text-accent" />;
      case 'solutions':
        return <Building2 className="w-4 h-4 text-primary" />;
      case 'knowledge':
        return <BookOpen className="w-4 h-4 text-secondary" />;
      case 'certifications':
        return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
      case 'company':
        return <Compass className="w-4 h-4 text-foreground" />;
      default:
        return <Search className="w-4 h-4 text-muted-foreground" />;
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
            <mark key={i} className="bg-primary/20 text-primary font-bold rounded px-1 py-0.2">
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 sm:px-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-md transition-opacity"
        />

        {/* Command Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          role="dialog"
          aria-modal="true"
          aria-label={locale === 'de' ? 'Globale Suche' : locale === 'ar' ? 'البحث الشامل' : 'Global Search'}
          className="relative w-full max-w-2xl bg-card border-2 border-card-border rounded-3xl shadow-lift overflow-hidden flex flex-col max-h-[85vh] z-10"
        >
          {/* Header Search Input */}
          <div role="search" className="relative flex items-center px-4 py-3.5 border-b border-card-border">
            <Search className="w-5 h-5 text-primary shrink-0 ms-1" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                locale === 'de'
                  ? 'Suche nach Rohren, SDR, Schallschutz, BIM, DVGW...'
                  : locale === 'ar'
                  ? 'ابحث عن الأنابيب، العزل الصوتي، نماذج BIM، المعايير...'
                  : 'Search pipes, SDR, acoustics, BIM, DVGW...'
              }
              className="w-full ps-3 pe-10 py-1.5 text-base sm:text-lg bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {query ? (
              <button
                onClick={() => setQuery('')}
                className="p-1.5 rounded-full hover:bg-background-subtle text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                title="Löschen"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground bg-background-subtle border border-card-border px-2 py-0.5 rounded-md">
                <span>ESC</span>
              </div>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 px-4 py-2.5 overflow-x-auto scrollbar-none border-b border-card-border/60 bg-background-subtle/50">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              const label = tab.label[locale] || tab.label['de'];
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-heading font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card border border-transparent'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Suggestions & Recent Searches (when query is empty) */}
          {!query && (
            <div className="p-4 flex flex-col gap-4 border-b border-card-border/40 bg-card">
              {recentSearches.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-2">
                    <Clock className="w-3 h-3" />
                    {locale === 'de' ? 'Zuletzt gesucht' : locale === 'ar' ? 'عمليات البحث الأخيرة' : 'Recent Searches'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-2.5 py-1 rounded-lg bg-background-subtle hover:bg-primary-soft hover:text-primary text-xs font-medium text-foreground border border-card-border transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3 h-3" />
                  {locale === 'de' ? 'Vorgeschlagene Themen' : locale === 'ar' ? 'موضوعات مقترحة' : 'Popular Topics'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SUGGESTIONS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-2.5 py-1 rounded-lg bg-background-subtle hover:bg-primary-soft hover:text-primary text-xs font-medium text-muted-foreground hover:text-foreground border border-card-border transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results List */}
          <div ref={listRef} className="flex-1 overflow-y-auto p-2 divide-y divide-card-border/30">
            {results.length > 0 ? (
              results.map((res, index) => {
                const item = res.entry;
                const isSelected = index === selectedIndex;
                const title = item.title[locale] || item.title['de'] || '';
                const originPath = item.origin?.path[locale] || item.origin?.path['de'] || '';
                const badge = item.badge[locale] || item.badge['de'] || '';

                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectResult(res)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`group flex items-start gap-3.5 p-3.5 rounded-2xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary-soft/80 border border-primary/40 shadow-sm'
                        : 'hover:bg-background-subtle border border-transparent'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-xl shrink-0 mt-0.5 transition-colors ${
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-background-subtle text-primary'
                      }`}
                    >
                      {getCategoryIcon(item.category)}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Breadcrumb / Origin & Badge */}
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-card border border-card-border text-muted-foreground">
                          {badge}
                        </span>
                        {originPath && (
                          <span className="text-[11px] text-muted-foreground/80 truncate font-mono">
                            {originPath}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h4
                        className={`text-sm sm:text-base font-heading font-bold transition-colors line-clamp-1 ${
                          isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'
                        }`}
                      >
                        {highlightMatch(title, query)}
                      </h4>

                      {/* Context Snippet */}
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed mt-1">
                        {highlightMatch(res.snippet, query)}
                      </p>

                      {/* Specs Tags */}
                      {item.specs && item.specs.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          {item.specs.slice(0, 3).map((spec, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-background-subtle text-foreground/70 border border-card-border/60"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="shrink-0 flex items-center gap-1 text-muted-foreground self-center">
                      <ArrowRight
                        className={`w-4 h-4 rtl-flip transition-transform ${
                          isSelected ? 'translate-x-1 rtl:-translate-x-1 text-primary' : 'group-hover:translate-x-1 group-hover:rtl:-translate-x-1'
                        }`}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center flex flex-col items-center justify-center p-6">
                <Search className="w-10 h-10 text-muted-foreground/40 mb-3" />
                <h4 className="text-base font-heading font-bold text-foreground mb-1">
                  {locale === 'de'
                    ? 'Keine passenden Treffer gefunden'
                    : locale === 'ar'
                    ? 'لم يتم العثور على نتائج مطابقة'
                    : 'No matching results found'}
                </h4>
                <p className="text-xs text-muted-foreground max-w-sm mb-4">
                  {locale === 'de'
                    ? `Für "${query}" liegen keine direkten Einträge vor. Versuchen Sie es mit Begriffen wie PP-RCT, SDR 7.4, Schallschutz oder DVGW.`
                    : `No entries for "${query}". Try searching for PP-RCT, SDR 7.4, Acoustics, or DVGW.`}
                </p>
                <button
                  onClick={() => setQuery('')}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-xs shadow-sm hover:bg-primary-hover transition-all cursor-pointer"
                >
                  {locale === 'de' ? 'Suche zurücksetzen' : 'Reset search'}
                </button>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-4 py-3 bg-background-subtle/80 border-t border-card-border flex items-center justify-between text-xs text-muted-foreground">
            <div className="hidden sm:flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-card border border-card-border rounded text-[10px] font-mono">↑↓</kbd>
                {locale === 'de' ? 'Navigieren' : 'Navigate'}
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-card border border-card-border rounded text-[10px] font-mono">↵</kbd>
                {locale === 'de' ? 'Öffnen & Hervorheben' : 'Open & Highlight'}
              </span>
            </div>

            <button
              onClick={handleOpenFullSearch}
              className="text-primary font-heading font-semibold hover:underline flex items-center gap-1 ml-auto cursor-pointer"
            >
              <span>{locale === 'de' ? 'Vollständiges Suchzentrum öffnen' : 'Open Full Search Hub'}</span>
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
