"use client";

import React, { useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { Link, useRouter } from "@/lib/i18n/navigation";
import { GEO_MARKETS, REGIONS, haversineKm, WALDSOLMS, GeoMarket } from "@/lib/data/geo";
import { FilterChip } from "@/components/ui/FilterChip";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/icon";
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
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const globeRef = useRef<GlobeRef | null>(null);

  // States
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  // Filtered markets
  const filteredMarkets = useMemo(() => {
    if (selectedRegion === "all") return GEO_MARKETS;
    return GEO_MARKETS.filter((g) => g.region === selectedRegion);
  }, [selectedRegion]);



  // Active market details
  const activeMarket = useMemo(() => {
    return GEO_MARKETS.find((g) => g.slug === hoveredSlug);
  }, [hoveredSlug]);

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

  // Sync the globe hover/highlight
  const handleMarketHover = (g: GeoMarket | null) => {
    if (!g) {
      setHoveredSlug(null);
      if (globeRef.current?.setActive) {
        globeRef.current.setActive(null);
      }
      return;
    }
    
    setHoveredSlug(g.slug);
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
    router.push(`/maerkte/${mk.title}`);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-card-border">
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
            <div className="lg:col-span-7 flex justify-center items-center relative min-h-[350px] sm:min-h-[500px]">
              <LazyGlobe 
                className="relative flex items-center justify-center border border-card-border/30 rounded-full p-6 bg-background/50 shadow-diffuse select-none w-full max-w-[368px] aspect-square sm:w-[428px] sm:h-[428px] lg:w-[508px] lg:h-[508px]"
                aria-label={geoTrans.canvasAria}
              >
                <Globe
                  ref={globeRef}
                  markers={globeMarkers}
                  interactive={true}
                  whirl={false}
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
            <div className="lg:col-span-5 flex flex-col gap-1.5 max-h-[580px] overflow-y-auto pe-1.5 text-start scrollbar-thin scrollbar-thumb-card-border">
              {filteredMarkets.map((g) => {
                const isHovered = hoveredSlug === g.slug;
                const localizedRegulator = geoContentTrans[g.slug]?.regulator || g.regulator;
                const parts = localizedRegulator.split("—")[0]?.split("/");
                const shortRegulator = (parts?.[0] || "").trim();
                
                return (
                  <Link
                    key={g.slug}
                    href={`/maerkte/${g.slug}`}
                    className={`w-full text-start flex flex-col items-start gap-0.5 min-h-[56px] py-2.5 ps-4 pe-12 rounded-xl border border-transparent transition-all duration-fast relative group outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent motion-reduce:transition-none motion-reduce:transform-none ${
                      isHovered
                        ? "bg-primary-soft border-card-border translate-x-1 rtl:-translate-x-1"
                        : "hover:bg-primary-soft hover:border-card-border hover:translate-x-1 hover:rtl:-translate-x-1"
                    }`}
                    onMouseEnter={() => handleMarketHover(g)}
                    onFocus={() => handleMarketHover(g)}
                    onMouseLeave={() => handleMarketHover(null)}
                    onBlur={() => handleMarketHover(null)}
                    aria-label={`${g.city}, ${g.country}. ${shortRegulator}`}
                  >
                    <span className="font-heading font-bold text-[17px] text-foreground">{g.city}</span>
                    <span className="text-[13px] text-muted-foreground">
                      {g.country} · {shortRegulator}
                    </span>
                    <ArrowRight 
                      size={18} 
                      className={`absolute end-4 top-1/2 -translate-y-1/2 text-primary transition-opacity duration-fast motion-reduce:transition-none ${
                        isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`} 
                    />
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
