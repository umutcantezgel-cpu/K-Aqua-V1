'use client';

import React, { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { K_CATALOG } from '@/lib/data/products';
import { GEO_MARKETS } from '@/lib/data/geo';

/**
 * EdgeIndex – animated page-index navigation.
 *
 * Each row has a coloured overlay (.ov) that slides in on hover.
 * Direction is determined by the cursor's vertical entry point:
 *   - enter from above  → overlay slides down  (from-top)
 *   - enter from below  → overlay slides up    (default)
 *
 * Inside the overlay a marquee track scrolls the translated label.
 */
export default function EdgeIndex({ className = '' }: { className?: string }) {
  const t = useTranslations('nav');

  // Real metrics
  const productCount = K_CATALOG.length;
  const marketCount = GEO_MARKETS.length;

  const containerRef = React.useRef<HTMLElement>(null);

  // ── hover handlers (Desktop) ────────────────────────────────
  const handleEnter = useCallback((e: React.PointerEvent<HTMLElement>) => {
    // Only apply if it's a mouse (cursor) interaction
    if (e.pointerType !== 'mouse') return;
    const row = e.currentTarget;
    const rect = row.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    const fromTop = e.clientY < midY;

    row.classList.toggle('from-top', fromTop);
    requestAnimationFrame(() => { row.classList.add('is-hover'); });
  }, []);

  const handleLeave = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    const row = e.currentTarget;
    const rect = row.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    const fromTop = e.clientY < midY;

    row.classList.remove('is-hover');
    row.classList.toggle('from-top', fromTop);
  }, []);

  // ── Touch Screen Animation (Mobile Intersection Observer) ───
  React.useEffect(() => {
    // Only run on small screens (mobile horizontal scroll)
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    let observer: IntersectionObserver | null = null;

    const setupObserver = () => {
      if (!mediaQuery.matches || !containerRef.current) return;
      
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const row = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              row.classList.add('is-hover');
              row.classList.remove('from-top');
            } else {
              row.classList.remove('is-hover');
            }
          });
        },
        {
          root: containerRef.current,
          rootMargin: '0px',
          threshold: 0.6 // Trigger when at least 60% of the card is visible in the scroll container
        }
      );

      const rows = containerRef.current.querySelectorAll('.row');
      rows.forEach((row) => observer?.observe(row));
    };

    const handleResize = () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      // Clean up classes if switching back to desktop
      if (!mediaQuery.matches && containerRef.current) {
        const rows = containerRef.current.querySelectorAll('.row');
        rows.forEach(r => r.classList.remove('is-hover'));
      }
      setupObserver();
    };

    setupObserver();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (observer) observer.disconnect();
    };
  }, []);

  // Duplicate the label text so the CSS marquee scrolls seamlessly
  const marquee = (label: string) => `${label}\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0`.repeat(12);

  // Row data ───────────────────────────────────────────────────
  const rows: {
    num: string;
    tone: string;
    href: string;
    label: string;
    meta: string;
    marqueeText: string;
  }[] = [
    {
      num: '01',
      tone: 'purple',
      href: '/produkte',
      label: t('products'),
      meta: t('edgeArticles', { count: productCount }),
      marqueeText: t('products'),
    },
    {
      num: '02',
      tone: 'aqua',
      href: '/produkte/finder',
      label: t('finder'),
      meta: t('edgeLiveFilter'),
      marqueeText: t('finder'),
    },
    {
      num: '03',
      tone: 'inverse',
      href: '/co2-rechner',
      label: t('co2'),
      meta: t('edgeComparisons'),
      marqueeText: t('co2'),
    },
    {
      num: '04',
      tone: 'purple',
      href: '/referenzen',
      label: t('references'),
      meta: t('edgeMarkets', { count: marketCount }),
      marqueeText: t('references'),
    },
  ];

  return (
    <nav ref={containerRef} className={`ka-edgeindex ${className}`} aria-label={t('edgePageIndex')} data-ka-init="1">
      {rows.map((r) => (
        <div
          key={r.num}
          className="row"
          data-tone={r.tone}
          onPointerEnter={handleEnter}
          onPointerLeave={handleLeave}
          style={{ position: 'relative' }}
        >
          <Link href={r.href} style={{ position: 'absolute', inset: 0, zIndex: 10 }} aria-label={r.label} />
          <i aria-hidden="true">{r.num}</i>
          <span className="font-bold" aria-hidden="true">{r.label}</span>
          <span className="meta" aria-hidden="true">{r.meta}</span>
          <span className="arrow" aria-hidden="true">→</span>
          <span className="ov" aria-hidden="true">
            <span className="track">{marquee(r.marqueeText)}</span>
          </span>
        </div>
      ))}
    </nav>
  );
}
