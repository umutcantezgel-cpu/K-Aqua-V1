// components/search/OnPageHighlighter.tsx
'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Search, ChevronUp, ChevronDown, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function OnPageHighlighter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = useLocale();

  const highlightQuery = searchParams?.get('highlight') || searchParams?.get('q') || '';
  const [matchCount, setMatchCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const isHighlightingRef = useRef(false);
  const observerRef = useRef<MutationObserver | null>(null);

  // Function to remove any existing marks
  const clearMarks = useCallback(() => {
    const marks = document.querySelectorAll('mark.kaqua-search-mark');
    marks.forEach((mark) => {
      const parent = mark.parentNode;
      if (parent) {
        const textNode = document.createTextNode(mark.textContent || '');
        parent.replaceChild(textNode, mark);
        parent.normalize();
      }
    });
    setMatchCount(0);
    setCurrentIndex(0);
  }, []);

  // Scroll to a specific match index (0-indexed)
  const scrollToMatch = useCallback((index: number) => {
    const marksList = Array.from(document.querySelectorAll('mark.kaqua-search-mark')) as HTMLElement[];
    if (marksList.length === 0) return;
    const safeIndex = (index + marksList.length) % marksList.length;

    marksList.forEach((mark, i) => {
      if (i === safeIndex) {
        mark.classList.add('kaqua-search-mark-active');
        const headerOffset = 120;
        const elementPosition = mark.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      } else {
        mark.classList.remove('kaqua-search-mark-active');
      }
    });

    setCurrentIndex(safeIndex + 1);
  }, []);

  // Function to perform on-page highlighting
  const performHighlight = useCallback((query: string) => {
    if (isHighlightingRef.current) return;
    isHighlightingRef.current = true;

    // Temporarily disconnect observer to avoid infinite loops from DOM mutations
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    try {
      clearMarks();
      const cleanQ = query.trim();
      if (!cleanQ || cleanQ.length < 2) {
        setIsActive(false);
        return;
      }

      // Target content area (prefer #main-content, fallback to document.body)
      const container = document.getElementById('main-content') || document.body;
      if (!container) return;

      // Split terms and create pattern matching variants
      const rawTerms = cleanQ.split(/\s+/).filter((t) => t.length >= 2);
      if (rawTerms.length === 0) {
        setIsActive(false);
        return;
      }

      const patternFragments: string[] = [];
      for (const term of rawTerms) {
        const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        patternFragments.push(escaped);
        
        // Handle PP-R / PP-RCT hyphen variants
        if (term.toLowerCase() === 'ppr' || term.toLowerCase() === 'pp-r') {
          patternFragments.push('pp-?r(?:ct)?');
        } else if (term.toLowerCase() === 'pprct' || term.toLowerCase() === 'pp-rct') {
          patternFragments.push('pp-?rct');
        }
        
        // Handle Umlauts
        if (term.includes('ae') || term.includes('ä')) {
          patternFragments.push(term.replace(/ae/gi, '[äae]').replace(/ä/gi, '[äae]'));
        }
        if (term.includes('oe') || term.includes('ö')) {
          patternFragments.push(term.replace(/oe/gi, '[öoe]').replace(/ö/gi, '[öoe]'));
        }
        if (term.includes('ue') || term.includes('ü')) {
          patternFragments.push(term.replace(/ue/gi, '[üue]').replace(/ü/gi, '[üue]'));
        }
        if (term.includes('ss') || term.includes('ß')) {
          patternFragments.push(term.replace(/ss/gi, '[ßss]').replace(/ß/gi, '[ßss]'));
        }
      }

      const regex = new RegExp(`(${Array.from(new Set(patternFragments)).join('|')})`, 'gi');

      const treeWalker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;

            const tagName = parent.tagName.toLowerCase();
            if (
              ['script', 'style', 'textarea', 'input', 'button', 'select', 'svg', 'noscript'].includes(tagName) ||
              parent.closest('header') ||
              parent.closest('nav') ||
              parent.closest('.kaqua-no-search-highlight') ||
              parent.isContentEditable
            ) {
              return NodeFilter.FILTER_REJECT;
            }

            if (node.textContent && regex.test(node.textContent)) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_SKIP;
          },
        }
      );

      const nodesToHighlight: Text[] = [];
      let currentNode = treeWalker.nextNode();
      while (currentNode) {
        nodesToHighlight.push(currentNode as Text);
        currentNode = treeWalker.nextNode();
      }

      let createdCount = 0;

      nodesToHighlight.forEach((textNode) => {
        const parent = textNode.parentNode;
        if (!parent) return;

        const text = textNode.nodeValue || '';
        const fragments = text.split(regex);

        if (fragments.length <= 1) return;

        const docFrag = document.createDocumentFragment();

        fragments.forEach((fragment) => {
          if (regex.test(fragment)) {
            const mark = document.createElement('mark');
            mark.className = 'kaqua-search-mark';
            mark.textContent = fragment;
            docFrag.appendChild(mark);
            createdCount++;
          } else if (fragment) {
            docFrag.appendChild(document.createTextNode(fragment));
          }
        });

        parent.replaceChild(docFrag, textNode);
      });

      if (createdCount > 0) {
        setMatchCount(createdCount);
        setCurrentIndex(1);
        setIsActive(true);

        // Scroll to the first match with top header offset
        setTimeout(() => {
          scrollToMatch(0);
        }, 150);
      } else {
        setIsActive(false);
      }
    } finally {
      isHighlightingRef.current = false;
      // Re-observe after highlight updates
      if (observerRef.current) {
        const container = document.getElementById('main-content') || document.body;
        if (container) {
          observerRef.current.observe(container, { childList: true, subtree: true });
        }
      }
    }
  }, [clearMarks, scrollToMatch]);

  const handleNext = useCallback(() => {
    const marks = document.querySelectorAll('mark.kaqua-search-mark');
    if (marks.length <= 0) return;
    const nextIdx = currentIndex % marks.length; // 0-indexed target
    scrollToMatch(nextIdx);
  }, [currentIndex, scrollToMatch]);

  const handlePrev = useCallback(() => {
    const marks = document.querySelectorAll('mark.kaqua-search-mark');
    if (marks.length <= 0) return;
    const prevIdx = (currentIndex - 2 + marks.length) % marks.length; // 0-indexed target
    scrollToMatch(prevIdx);
  }, [currentIndex, scrollToMatch]);

  const handleClose = useCallback(() => {
    clearMarks();
    setIsActive(false);

    // Clean URL without full reload
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete('highlight');
    currentUrl.searchParams.delete('q');
    window.history.replaceState({}, '', currentUrl.toString());
  }, [clearMarks]);

  // Run highlight on param change or path change
  useEffect(() => {
    if (highlightQuery) {
      const timer = setTimeout(() => {
        performHighlight(highlightQuery);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      clearMarks();
      setIsActive(false);
    }
  }, [highlightQuery, pathname, performHighlight, clearMarks]);

  // Setup MutationObserver instance
  useEffect(() => {
    if (!highlightQuery || highlightQuery.length < 2) return;

    const container = document.getElementById('main-content') || document.body;
    if (!container) return;

    let debounceTimer: NodeJS.Timeout | null = null;

    const observer = new MutationObserver((mutations) => {
      if (isHighlightingRef.current) return;

      const hasNewContent = mutations.some((m) => m.addedNodes.length > 0);
      if (hasNewContent) {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          performHighlight(highlightQuery);
        }, 300);
      }
    });

    observerRef.current = observer;
    observer.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      observerRef.current = null;
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [highlightQuery, performHighlight]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    if (!isActive || matchCount === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'F3' || (e.key === 'Enter' && !e.shiftKey)) {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, matchCount, handleNext, handlePrev, handleClose]);

  if (!isActive || matchCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        aria-live="polite"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 p-2 sm:p-2.5 rounded-2xl bg-card/95 backdrop-blur-xl border-2 border-primary/30 shadow-lift text-foreground select-none max-w-[calc(100vw-3rem)]"
      >
        {/* Term & Badge */}
        <div className="flex items-center gap-2 pl-2 pr-1.5 border-r border-card-border">
          <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Search className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col min-w-0 max-w-[160px] sm:max-w-[200px]">
            <span className="text-[10px] font-heading font-bold text-primary uppercase tracking-wider truncate flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              {locale === 'de' ? 'Hervorgehoben' : locale === 'ar' ? 'مميز في الصفحة' : 'Highlighted'}
            </span>
            <span className="text-xs font-semibold text-foreground truncate" title={highlightQuery}>
              &quot;{highlightQuery}&quot;
            </span>
          </div>
        </div>

        {/* Counter */}
        <div className="px-2 font-mono text-xs font-bold text-muted-foreground whitespace-nowrap">
          <span className="text-primary">{currentIndex}</span> / <span>{matchCount}</span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            title={locale === 'de' ? 'Vorheriger Treffer (Shift+Enter)' : 'Previous match (Shift+Enter)'}
            aria-label="Previous search match"
            className="p-1.5 rounded-lg hover:bg-background-subtle text-foreground active:scale-95 transition-all cursor-pointer"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            title={locale === 'de' ? 'Nächster Treffer (Enter)' : 'Next match (Enter)'}
            aria-label="Next search match"
            className="p-1.5 rounded-lg hover:bg-background-subtle text-foreground active:scale-95 transition-all cursor-pointer"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          title={locale === 'de' ? 'Hervorhebung beenden (Esc)' : 'Dismiss highlights (Esc)'}
          aria-label="Dismiss search highlights"
          className="p-1.5 rounded-lg hover:bg-red-500/10 hover:text-red-500 text-muted-foreground active:scale-95 transition-all ml-0.5 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
