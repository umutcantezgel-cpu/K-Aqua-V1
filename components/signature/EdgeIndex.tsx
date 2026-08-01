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

  // ── hover handlers ──────────────────────────────────────────
  const handleEnter = useCallback((e: React.PointerEvent<HTMLAnchorElement>) => {
    const row = e.currentTarget;
    const rect = row.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    const fromTop = e.clientY < midY;

    row.classList.toggle('from-top', fromTop);
    requestAnimationFrame(() => { row.classList.add('is-hover'); });
  }, []);

  const handleLeave = useCallback((e: React.PointerEvent<HTMLAnchorElement>) => {
    const row = e.currentTarget;
    const rect = row.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    const fromTop = e.clientY < midY;

    row.classList.remove('is-hover');
    row.classList.toggle('from-top', fromTop);
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
    <nav className={`ka-edgeindex ${className}`} aria-label={t('edgePageIndex')} data-ka-init="1">
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
