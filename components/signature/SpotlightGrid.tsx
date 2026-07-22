'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

export default function SpotlightGrid({ className = '' }: { className?: string }) {
  const t = useTranslations('homex');
  
  // Cast tools array, it contains objects with id, t, d, cta
  const tools = t.raw('tools') as { id: string; t: string; d: string; cta: string }[];

  const getHref = (id: string) => {
    switch (id) {
      case 'finder': return '/produkte/finder';
      case 'co2': return '/co2-rechner';
      case 'academy': return '/academy';
      case 'references': return '/referenzen';
      case 'trust': return '/trust-center';
      case 'partner': return '/partnerschaft';
      case 'career': return '/karriere';
      default: return '/';
    }
  };

  return (
    <div className={`ka-spotgrid ${className}`}>
      {tools.slice(0, 6).map((tool, idx) => (
        <Link key={idx} className="cell" href={getHref(tool.id)}>
          <b>{tool.t}</b>
          <span>{tool.d}</span>
        </Link>
      ))}
    </div>
  );
}
