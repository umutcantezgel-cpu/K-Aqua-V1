/* eslint-disable react/jsx-no-literals */
"use client";

import React, { useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { Link } from "@/lib/i18n/navigation";
import { GEO_MARKETS, REGIONS, haversineKm, WALDSOLMS, GeoMarket } from "@/lib/data/geo";
import { FilterChip } from "@/components/ui/FilterChip";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { MapPin, ArrowRight } from "@/components/ui/icon";
import LiquidMagneticButton from "@/components/ui/LiquidMagneticButton";
import clsx from "clsx";
import type { GlobeRef, GlobeMarker } from "@/components/globe/Globe";
import { LazyGlobe } from "@/components/globe/LazyGlobe";

// Load Globe dynamically with ssr: false to prevent server-side canvas rendering errors
const Globe = dynamic(
  () => import("@/components/globe/Globe").then((mod) => mod.Globe),
  { ssr: false }
);

interface MarketsHubProps {
  locale: string;
  geoTrans: {
    eyebrow: string;
    title1: string;
    title2: string;
    lead: string;
    all: string;
    fromPlant: string;
    canvasAria: string;
  };
  regionsTrans: Record<string, string>;
  geoContentTrans: Record<string, {
    regulator: string;
    water: string;
    focus: string[];
    note: string;
    focusHeading: string;
  }>;
}

export default function MarketsHub({
  locale,
  geoTrans,
  regionsTrans,
  geoContentTrans,
}: MarketsHubProps) {
  const shouldReduceMotion = useReducedMotion();
  const globeRef = useRef<GlobeRef | null>(null);

  // States
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // Filtered markets
  const filteredMarkets = useMemo(() => {
    if (selectedRegion === "all") return GEO_MARKETS;
    return GEO_MARKETS.filter((g) => g.region === selectedRegion);
  }, [selectedRegion]);



  // Active market details
  const activeMarket = useMemo(() => {
    return GEO_MARKETS.find((g) => g.slug === activeSlug);
  }, [activeSlug]);

  // Distance calculations
  const distance = useMemo(() => {
    if (!activeMarket) return null;
    return haversineKm(WALDSOLMS, activeMarket);
  }, [activeMarket]);

  const formattedDistance = useMemo(() => {
    if (distance === null) return "";
    return new Intl.NumberFormat(locale).format(distance);
  }, [distance, locale]);

  // Pre-computed labels for chips to satisfy react/jsx-no-literals
  const allLabel = `${geoTrans.all} (${GEO_MARKETS.length})`;
  const regionChips = useMemo(() => {
    return REGIONS.map((r) => {
      const count = GEO_MARKETS.filter((g) => g.region === r.id).length;
      const label = regionsTrans[r.id] || r.id;
      return {
        id: r.id,
        labelText: `${label} (${count})`,
      };
    });
  }, [regionsTrans]);

  // Sync the globe focus
  const handleMarketSelect = (g: GeoMarket | null) => {
    if (!g) {
      setActiveSlug(null);
      if (globeRef.current?.setActive) {
        globeRef.current.setActive(null);
      }
      return;
    }
    
    setActiveSlug(g.slug);
    if (globeRef.current) {
      globeRef.current.flyTo(g.lon, g.lat);
      if (globeRef.current.setActive) {
        globeRef.current.setActive(g.slug);
      }
    }
  };

  // Map markets to GlobeMarkers
  const globeMarkers = useMemo<GlobeMarker[]>(() => {
    return GEO_MARKETS.map((g) => ({
      lat: g.lat,
      lon: g.lon,
      title: g.slug,
      label: g.city,
    }));
  }, []);

  // Click handler for Globe markers
  const handleMarkerClick = (mk: GlobeMarker) => {
    const market = GEO_MARKETS.find((g) => g.slug === mk.title);
    if (market) {
      handleMarketSelect(market);
      // scroll to the list item if possible
      const el = document.getElementById(`market-item-${market.slug}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32 kq-band kq-band--curve-b">
        <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
          <Reveal>
            <Eyebrow>{geoTrans.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="text-h1 font-heading font-extrabold tracking-tight mt-4 mb-6 text-foreground leading-[1.1] text-wrap-balance">
              {geoTrans.title1}{" "}
              <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">
                {geoTrans.title2}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-lead text-muted-foreground leading-relaxed max-w-[64ch]">
              <span className="sr-only" aria-hidden="true">{geoTrans.title1} {geoTrans.title2} </span>
              {geoTrans.lead}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main content grid */}
      <section className="py-12 lg:py-20 bg-background-subtle border-b border-card-border">
        <div className="max-w-[1200px] mx-auto px-6">
          
          {/* Chips Filter Container */}
          <h2 className="sr-only">{geoTrans.all}</h2>
          <div className="flex flex-wrap gap-2 mb-8 text-start justify-start" role="group" aria-label="Regionen-Filter">
            <FilterChip
              pressed={selectedRegion === "all"}
              onClick={() => setSelectedRegion("all")}
              className="motion-reduce:transition-none"
            >
              {allLabel}
            </FilterChip>
            {regionChips.map((chip) => {
              return (
                <FilterChip
                  key={chip.id}
                  pressed={selectedRegion === chip.id}
                  onClick={() => setSelectedRegion(chip.id)}
                  className="motion-reduce:transition-none"
                >
                  {chip.labelText}
                </FilterChip>
              );
            })}
          </div>

          {/* Map & List Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Globe Column */}
            <div className="lg:col-span-7 flex justify-center items-center relative min-h-[400px] lg:min-h-[600px]">
              <LazyGlobe 
                className="relative flex items-center justify-center select-none w-full max-w-[600px] aspect-square shrink-0 kq-liquid kq-ix-whirl"
                aria-label={geoTrans.canvasAria}
              >
                <Globe
                  ref={globeRef}
                  markers={globeMarkers}
                  interactive={true}
                  whirl={true}
                  speed={shouldReduceMotion ? 0 : 0.006}
                  onMarkerClick={handleMarkerClick}
                />

                {/* Tooltip Card overlay */}
                {activeMarket ? (
                  <div 
                    className="absolute top-4 start-1/2 -translate-x-1/2 z-20 bg-card border border-card-border rounded-xl shadow-lift px-5 py-3 flex flex-col gap-0.5 pointer-events-none text-center min-w-[200px] transition-all duration-fast motion-reduce:transition-none"
                    role="status"
                  >
                    <span className="font-heading font-bold text-base text-foreground block mb-1">{activeMarket.city}</span>
                    <span className="text-small text-muted-foreground">
                      {activeMarket.country} · {formattedDistance} {geoTrans.fromPlant}
                    </span>
                  </div>
                ) : null}
              </LazyGlobe>
            </div>

            {/* Right: Scrollable Markets List Column */}
            <div className="lg:col-span-5 flex flex-col gap-2 max-h-[600px] overflow-y-auto pe-1.5 text-start scrollbar-thin scrollbar-thumb-card-border">
              {filteredMarkets.map((g) => {
                const isActive = activeSlug === g.slug;
                const localizedRegulator = geoContentTrans[g.slug]?.regulator || g.regulator;
                const parts = localizedRegulator.split(" - ")[0]?.split("/");
                const shortRegulator = (parts?.[0] || "").trim();
                
                return (
                  <div
                    key={g.slug}
                    id={`market-item-${g.slug}`}
                    tabIndex={0}
                    className={`w-full text-start flex flex-col items-start gap-0.5 py-3 ps-4 pe-4 rounded-xl border transition-all duration-300 relative group outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transition-none ${
                      isActive
                        ? "bg-card border-card-border shadow-sm"
                        : "border-transparent hover:bg-background-subtle cursor-pointer"
                    }`}
                    onClick={() => {
                      if (!isActive) handleMarketSelect(g);
                    }}
                    onMouseEnter={() => {
                      handleMarketSelect(g);
                    }}
                    onFocus={() => {
                      handleMarketSelect(g);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (!isActive) handleMarketSelect(g);
                      }
                    }}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex flex-col">
                        <Link href={`/maerkte/${g.hubSlug}/${g.slug}`} className="font-heading font-bold text-[17px] text-foreground hover:text-primary transition-colors relative z-10" onClick={(e) => e.stopPropagation()}>
                          {g.city}{g.city === g.country ? ' (Stadt)' : ''}
                        </Link>
                        <span className="text-[13px] text-muted-foreground">
                          <Link 
                            href={`/maerkte/${g.hubSlug}`} 
                            className="hover:underline relative z-10"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {g.country}{g.city === g.country ? ' (Region)' : ''}
                          </Link>
                          {" "}· {shortRegulator}
                        </span>
                      </div>
                      {!isActive && (
                        <ArrowRight 
                          size={18} 
                          className="text-muted-foreground transition-transform group-hover:translate-x-1" 
                        />
                      )}
                    </div>
                    
                    {/* Expanded Content */}
                    <div className={clsx(
                      "border-card-border w-full flex flex-col gap-3 transition-all duration-300 overflow-hidden",
                      isActive ? "mt-4 pt-4 border-t opacity-100 max-h-[500px]" : "opacity-0 max-h-0 border-t-0"
                    )}>
                      <p className="text-sm text-muted-foreground">
                        {geoContentTrans[g.slug]?.focusHeading || geoContentTrans[g.slug]?.focus?.join(", ") || `Hochwertige PP-R Rohrsysteme für ${g.city}.`}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 mt-1">
                        <LiquidMagneticButton
                          fill="crest"
                          size="md"
                          href={`/maerkte/${g.hubSlug}/${g.slug}`}
                          className="flex-1 w-full"
                          tabIndex={isActive ? 0 : -1}
                          aria-label={g.city}
                        >
                          Marktseite {g.city} öffnen
                        </LiquidMagneticButton>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarketSelect(null);
                          }}
                          className="inline-flex items-center justify-center font-heading font-semibold rounded-lg border border-card-border bg-card text-foreground hover:bg-background-subtle h-10 px-4 text-sm transition-colors"
                          tabIndex={isActive ? 0 : -1}
                        >
                          Schließen
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          


          <div className="sr-only">
            <p>
              {locale === 'de' ? 'K-Aqua ist Ihr weltweiter Partner für PP-R und PP-RCT Rohrsysteme.' : locale === 'ar' ? 'K-Aqua هي شريكك العالمي لأنظمة أنابيب PP-R و PP-RCT.' : 'K-Aqua is your global partner for PP-R and PP-RCT piping systems.'}
              {locale === 'de' ? ' Wir beliefern internationale Märkte mit erstklassiger deutscher Ingenieurskunst.' : locale === 'ar' ? ' نقوم بتوريد الأسواق الدولية بأفضل الهندسة الألمانية.' : ' We supply international markets with first-class German engineering.'}
            </p>
            <p>
              {locale === 'de' ? 'Unsere globalen Hubs und lokalen Vertriebsnetze gewährleisten eine schnelle Verfügbarkeit.' : locale === 'ar' ? 'تضمن مراكزنا العالمية وشبكات المبيعات المحلية توفرًا سريعًا.' : 'Our global hubs and local sales networks ensure fast availability.'}
              {locale === 'de' ? ' Von Europa bis zum Nahen Osten bieten wir maßgeschneiderte Lösungen.' : locale === 'ar' ? ' من أوروبا إلى الشرق الأوسط ، نقدم حلولاً مخصصة.' : ' From Europe to the Middle East, we offer tailored solutions.'}
            </p>
            <p>
              {locale === 'de' ? 'Wählen Sie Ihren Zielmarkt aus der interaktiven Karte aus, um spezifische Zertifizierungen und Kontakte zu finden.' : locale === 'ar' ? 'اختر السوق المستهدف من الخريطة التفاعلية للعثور على شهادات وجهات اتصال محددة.' : 'Select your target market from the interactive map to find specific certifications and contacts.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
