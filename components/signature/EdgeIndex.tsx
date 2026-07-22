'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { K_CATALOG } from '@/lib/data/products';
import { GEO_MARKETS } from '@/lib/data/geo';

export default function EdgeIndex({ className = '' }: { className?: string }) {
  const t = useTranslations('nav');
  
  // Real metrics
  const productCount = K_CATALOG.length;
  const marketCount = GEO_MARKETS.length;

  return (
    <nav className={`ka-edgeindex ${className}`} aria-label="Seiten-Index">
      <Link className="row" data-tone="purple" href="/produkte">
        <i>01</i><b>{t('products')}</b><span className="meta">{productCount} Artikel</span><span className="arrow" aria-hidden="true">→</span>
        <span className="ov" aria-hidden="true"><span className="track"></span></span>
      </Link>
      <Link className="row" data-tone="aqua" href="/produkte/finder">
        <i>02</i><b>{t('finder')}</b><span className="meta">Live-Filter</span><span className="arrow" aria-hidden="true">→</span>
        <span className="ov" aria-hidden="true"><span className="track"></span></span>
      </Link>
      <Link className="row" data-tone="inverse" href="/co2-rechner">
        <i>03</i><b>{t('co2')}</b><span className="meta">3 Vergleiche</span><span className="arrow" aria-hidden="true">→</span>
        <span className="ov" aria-hidden="true"><span className="track"></span></span>
      </Link>
      <Link className="row" data-tone="purple" href="/referenzen">
        <i>04</i><b>{t('references')}</b><span className="meta">{marketCount} Märkte</span><span className="arrow" aria-hidden="true">→</span>
        <span className="ov" aria-hidden="true"><span className="track"></span></span>
      </Link>
    </nav>
  );
}
