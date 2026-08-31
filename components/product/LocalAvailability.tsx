'use client';

import React from 'react';
import { Link } from '@/lib/i18n/navigation';
import { MapPin, ArrowRight } from 'lucide-react';
import { GEO_MARKETS } from '@/lib/data/geo';

interface LocalAvailabilityProps {
  locale: string;
  translations: {
    localAvailability: string;
    localDesc: string;
    allMarkets: string;
  };
}

/**
 * Regionsvorrang je Sprache.
 *
 * Vorher standen hier vier Zweige mit fest verdrahteten Marktindizes
 * (`GEO_MARKETS[12]`, `[23]`) und einem Kommentar „Randomish selection". Diese
 * Indizes zeigen auf Positionen im Datensatz, nicht auf gemeinte Staedte —
 * wird in lib/data/geo.ts ein Markt eingefuegt, zeigen sie stillschweigend
 * woandershin. Und `en` bekam London/Dubai/Singapur unabhaengig davon, ob es
 * diese Maerkte noch gibt.
 *
 * Jetzt wird nach REGION ausgewaehlt und nur der Vorrang je Sprache
 * festgelegt. Fehlt eine Region, greift die naechste — es bleibt also immer
 * eine sinnvolle Auswahl, ohne Indexarithmetik.
 */
const REGIONSVORRANG: Record<string, readonly string[]> = {
  de: ['dach', 'europa', 'global'],
  ar: ['nahost', 'global', 'europa'],
  en: ['europa', 'global', 'nahost'],
};

const VORRANG_STANDARD = ['global', 'europa', 'nahost', 'dach'] as const;

export default function LocalAvailability({ locale, translations }: LocalAvailabilityProps) {
  /* Drei Maerkte, nach Regionsvorrang der Sprache aufgefuellt. Die Reihenfolge
     innerhalb einer Region ist die des Datensatzes — dort stehen die
     wichtigsten Maerkte vorn. */
  const vorrang = REGIONSVORRANG[locale] ?? VORRANG_STANDARD;
  const markets: typeof GEO_MARKETS = [];
  for (const region of vorrang) {
    for (const m of GEO_MARKETS) {
      if (markets.length >= 3) break;
      if (m.region === region && !markets.includes(m)) markets.push(m);
    }
    if (markets.length >= 3) break;
  }
  /* Sollte der Datensatz einmal weniger hergeben, lieber weniger Kacheln als
     eine leere Liste — der Block verschwindet dann von selbst. */
  if (markets.length === 0) return null;

  return (
    /* Kein data-nosnippet mehr: Das war der einzige lokale Baustein auf 74
       Produktseiten — Ueberschrift, Einordnung und die internen Links auf die
       Stadtseiten — und er war damit ausdruecklich von der Snippet-Nutzung
       ausgeschlossen. Genau dieser Block soll lokal ranken. */
    <div className="flex flex-col gap-4">
      <h3 className="font-heading font-bold text-lg text-foreground border-b border-card-border pb-3 mt-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-primary" />
        {translations.localAvailability}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {translations.localDesc}
      </p>
      
      <div className="flex flex-col gap-2 mt-2">
        {markets.map((market) => (
          <Link 
            key={market.slug} 
            href={`/maerkte/${market.hubSlug}/${market.slug}`} 
            title={market.city}
            aria-label={market.city}
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
          {translations.allMarkets}
        </Link>
      </div>
    </div>
  );
}
