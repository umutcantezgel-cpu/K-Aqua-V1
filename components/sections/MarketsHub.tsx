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
import { ArrowRight } from "@/components/ui/icon";
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
                    <strong className="font-heading font-bold text-base text-foreground">{activeMarket.city}</strong>
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
                const parts = localizedRegulator.split("—")[0]?.split("/");
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
                        <span className="font-heading font-bold text-[17px] text-foreground">{g.city}</span>
                        <span className="text-[13px] text-muted-foreground">
                          {g.country} · {shortRegulator}
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
                        {geoContentTrans[g.slug]?.note || `Hochwertige PP-R Rohrsysteme für ${g.city}.`}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 mt-1">
                        <Link
                          href={`/maerkte/${g.slug}`}
                          className="inline-flex items-center justify-center flex-1 font-heading font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover h-10 px-4 text-sm transition-colors"
                          tabIndex={isActive ? 0 : -1}
                        >
                          <span className="sr-only">{g.city} </span>Marktseite öffnen
                        </Link>
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
          


        </div>
      </section>
    </div>
  );
}
