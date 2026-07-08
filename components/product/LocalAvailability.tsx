'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { MapPin, ArrowRight } from 'lucide-react';
import { GEO_MARKETS } from '@/lib/data/geo';

interface LocalAvailabilityProps {
  locale: string;
}

export default function LocalAvailability({ locale }: LocalAvailabilityProps) {
  const t = useTranslations('products');
  
  // Simple heuristic: 
  // If locale is 'de', show top DACH markets.
  // If locale is 'ar', show top NAHOST markets.
  // Otherwise, show some global mix.
  let markets = GEO_MARKETS.slice(0, 3);
  
  if (locale === 'de') {
    markets = GEO_MARKETS.filter(m => m.region === 'dach').slice(0, 3);
  } else if (locale === 'ar') {
    markets = GEO_MARKETS.filter(m => m.region === 'nahost').slice(0, 3);
  } else if (locale === 'en') {
    markets = [
      (GEO_MARKETS.find(m => m.slug === 'london') || GEO_MARKETS[6]) as NonNullable<typeof GEO_MARKETS[0]>,
      (GEO_MARKETS.find(m => m.slug === 'dubai') || GEO_MARKETS[12]) as NonNullable<typeof GEO_MARKETS[0]>,
      (GEO_MARKETS.find(m => m.slug === 'singapur') || GEO_MARKETS[23]) as NonNullable<typeof GEO_MARKETS[0]>
    ];
  } else {
    // Randomish selection for other languages
    markets = [
      GEO_MARKETS[0] as NonNullable<typeof GEO_MARKETS[0]>, 
      GEO_MARKETS[12] as NonNullable<typeof GEO_MARKETS[0]>, 
      GEO_MARKETS[23] as NonNullable<typeof GEO_MARKETS[0]>
    ];
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-heading font-bold text-lg text-foreground border-b border-card-border pb-3 mt-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-primary" />
        {t('localAvailability') || 'Local Availability'}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {t('localDesc') || 'Find local distributors, projects, and specific water quality info in your region.'}
      </p>
      
      <div className="flex flex-col gap-2 mt-2">
        {markets.map((market) => (
          <Link 
            key={market.slug} 
            href={`/maerkte/${market.slug}`} 
            className="flex items-center justify-between p-3 rounded-lg border border-card-border bg-card hover:border-primary hover:bg-primary-soft/10 transition-colors group"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-foreground text-sm">{market.city}</span>
              <span className="text-xs text-muted-foreground">{market.country}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors rtl:-scale-x-100" />
          </Link>
        ))}
        <Link 
          href="/maerkte" 
          className="text-center text-sm font-semibold text-primary hover:text-primary-strong transition-colors mt-2"
        >
          {t('allMarkets') || 'View all 50+ Markets'}
        </Link>
      </div>
    </div>
  );
}
