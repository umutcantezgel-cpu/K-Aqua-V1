"use client";

import React, { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { Link } from "@/lib/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { IconChip } from "@/components/ui/IconChip";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import {
  ArrowRight,
  Globe as GlobeIcon,
  MapPin,
  Shield,
  Check,
  Droplet,
  Factory,
  Wrench,
} from "@/components/ui/icon";
import { GeoMarket, WALDSOLMS, haversineKm } from "@/lib/data/geo";
import type { GlobeRef, GlobeMarker } from "@/components/globe/Globe";

// Load Globe dynamically with ssr: false to prevent server-side canvas rendering errors
const Globe = dynamic(
  () => import("@/components/globe/Globe").then((mod) => mod.Globe),
  { ssr: false }
);

interface GeoCityProps {
  locale: string;
  market: GeoMarket;
  localizedData: {
    regulator: string;
    water: string;
    focus: string[];
    note: string;
    focusHeading: string;
  };
  geoTrans: {
    eyebrow: string;
    cityTitle: string;
    cityLead: string;
    allMarkets: string;
    request: string;
    finder: string;
    fromPlant: string;
    regFrame: string;
    water: string;
    typical: string;
    onSite: string;
    onSiteText: string;
    toAcademy: string;
    nearbyEyebrow: string;
    nearby: string;
    prodNote: string;
    km: string;
  };
  regionsTrans: Record<string, string>;
  nearestMarkets: Array<GeoMarket & { regulator: string }>;
}



const SLASH = " / ";
const DOT = " · ";

export default function GeoCity({
  locale,
  market,
  localizedData,
  geoTrans,
  regionsTrans,
  nearestMarkets,
}: GeoCityProps) {
  const globeRef = useRef<GlobeRef | null>(null);

  // Distance from manufacturing plant (Waldsolms)
  const distFromPlant = useMemo(() => {
    return haversineKm(WALDSOLMS, market);
  }, [market]);

  const formattedDist = useMemo(() => {
    return new Intl.NumberFormat(locale).format(distFromPlant);
  }, [distFromPlant, locale]);

  // Globe markers setup
  const globeMarkers = useMemo<GlobeMarker[]>(() => [
    {
      lat: market.lat,
      lon: market.lon,
      title: market.slug,
      label: market.city,
    }
  ], [market]);

  // Callback ref for reliable dynamic Globe centering
  const handleGlobeRef = (node: GlobeRef | null) => {
    if (node) {
      globeRef.current = node;
      node.flyTo(market.lon, market.lat);
      if (node.setActive) {
        node.setActive(market.slug);
      }
    }
  };

  const regionLabel = regionsTrans[market.region] || market.region;
  const heroEyebrow = `${market.country}${DOT}${regionLabel}`;
  const plantDistLabel = `${formattedDist} ${geoTrans.fromPlant}`;
  const prodNote = geoTrans.prodNote;

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-20 border-b border-card-border">
        <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading and Description */}
          <div className="lg:col-span-7 flex flex-col items-start text-start gap-4">
            <Reveal>
              <Link href="/maerkte" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                <GlobeIcon size={16} />
                {geoTrans.allMarkets}
              </Link>
            </Reveal>
            <Reveal delay={0.06}>
              <Eyebrow>{heroEyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 className="text-h1 font-heading font-extrabold tracking-tight text-foreground leading-[1.1] mt-2">
                {geoTrans.cityTitle}
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-lead text-muted-foreground leading-relaxed max-w-[60ch]">
                {geoTrans.cityLead} {localizedData.regulator}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="flex flex-wrap gap-4 mt-4">
                <Link href="/kontakt" className="inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-lg active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring outline-none transition-all duration-fast ease-out bg-primary text-primary-foreground shadow-diffuse hover:bg-primary-hover hover:shadow-lift hover:-translate-y-0.5 min-h-[48px] px-6 text-body">
                    {geoTrans.request}
                    <ArrowRight size={18} />
                </Link>
                <Link href="/produkte/finder" className="inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-lg active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring outline-none transition-all duration-fast ease-out bg-transparent text-foreground border border-card-border hover:border-primary hover:text-primary hover:bg-primary-soft min-h-[48px] px-6 text-body">
                    {geoTrans.finder}
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Mini-Globus */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <Reveal delay={0.15}>
              <div className="flex flex-col items-center gap-4">
                <div 
                  className="relative flex items-center justify-center border border-card-border/30 rounded-full p-4 bg-background/50 shadow-diffuse select-none w-[252px] h-[252px] sm:w-[312px] sm:h-[312px]"
                >
                  <Globe
                    ref={handleGlobeRef}
                    markers={globeMarkers}
                    interactive={true}
                    whirl={false}
                    speed={0}
                  />
                </div>
                <span className="inline-flex items-center gap-2 text-small font-semibold px-4 py-2 rounded-full border border-card-border bg-card text-foreground shadow-diffuse select-none">
                  <MapPin size={14} className="text-primary" />
                  {plantDistLabel}
                </span>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* Bento Grid Info Section */}
      <section className="py-16 lg:py-24 bg-background-subtle border-b border-card-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            
            {/* Card 1: Regulatorik-Karte (span 3) */}
            <Reveal className="md:col-span-3">
              <Card tint className="h-full flex flex-col gap-5 text-start p-8">
                <IconChip>
                  <Shield size={24} />
                </IconChip>
                <div>
                  <h2 className="font-heading font-bold text-xl text-foreground mb-2">
                    {geoTrans.regFrame}
                  </h2>
                  <p className="font-semibold text-foreground leading-relaxed mb-4">
                    {localizedData.regulator}
                  </p>
                </div>
                <ul className="flex flex-col gap-2.5 mt-auto">
                  {market.norms.map((norm) => (
                    <li key={norm} className="flex gap-2.5 items-center text-muted-foreground text-body">
                      <span className="text-accent-strong shrink-0">
                        <Check size={16} />
                      </span>
                      <span>{norm}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>

            {/* Card 2: Wasserprofil (span 3) */}
            <Reveal className="md:col-span-3" delay={0.08}>
              <Card className="h-full flex flex-col gap-5 text-start p-8">
                <IconChip>
                  <Droplet size={24} />
                </IconChip>
                <div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                    {geoTrans.water}
                  </h3>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {localizedData.water}
                  </p>
                </div>
              </Card>
            </Reveal>

            {/* Card 3: Fokus-Projekte + Logistik (span 4) */}
            <Reveal className="md:col-span-4" delay={0.12}>
              <Card className="h-full flex flex-col gap-6 text-start p-8">
                <IconChip>
                  <Factory size={24} />
                </IconChip>
                <div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                    {localizedData.focusHeading}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {localizedData.focus.map((item) => (
                      <Chip key={item}>
                        {item}
                      </Chip>
                    ))}
                  </div>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {localizedData.note}
                  </p>
                </div>
              </Card>
            </Reveal>

            {/* Card 4: Academy-Verweis (span 2) */}
            <Reveal className="md:col-span-2" delay={0.18}>
              <Card className="h-full flex flex-col gap-5 text-start p-8 justify-between">
                <IconChip>
                  <Wrench size={24} />
                </IconChip>
                <div className="flex-grow">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                    {geoTrans.onSite}
                  </h3>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {geoTrans.onSiteText}
                  </p>
                </div>
                <Link 
                  href="/academy" 
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:underline mt-4 group"
                >
                  {geoTrans.toAcademy}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:rtl:-translate-x-1" />
                </Link>
              </Card>
            </Reveal>

          </div>
        </div>
      </section>

      {/* "In der Nähe" (Verwandte Märkte) Sektion */}
      <section className="py-16 lg:py-24 bg-background border-b border-card-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHead
            eyebrow={geoTrans.nearbyEyebrow}
            title={geoTrans.nearby}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {nearestMarkets.map((nm, idx) => {
              const nmDist = haversineKm(market, nm);
              const formattedNmDist = new Intl.NumberFormat(locale).format(nmDist);
              const shortRegulator = nm.regulator.split(SLASH)[0]?.split(DOT)[0]?.trim() || "";
              const distanceText = `${nm.country}${DOT}${formattedNmDist} ${geoTrans.km}`;

              return (
                <Reveal key={nm.slug} delay={idx * 0.08}>
                  <Link href={`/maerkte/${nm.slug}`} className="group block h-full">
                    <Card className="h-full cursor-pointer hover:border-primary hover:shadow-lift transition-all duration-fast p-8">
                      <div className="flex flex-col gap-3 text-start h-full justify-between">
                        <div>
                          <span className="text-small text-muted-foreground block mb-2">
                            {distanceText}
                          </span>
                          <h4 className="text-h3 font-heading font-bold flex items-center justify-between text-foreground group-hover:text-primary transition-colors duration-fast">
                            {nm.city}
                            <ArrowRight
                              size={18}
                              className="text-primary opacity-0 group-hover:opacity-100 transition-all duration-fast translate-x-[-4px] group-hover:translate-x-0 group-hover:rtl:translate-x-0"
                            />
                          </h4>
                        </div>
                        <p className="text-small text-muted-foreground leading-relaxed">
                          {shortRegulator}
                        </p>
                      </div>
                    </Card>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {/* Localized Production Note */}
          <Reveal delay={0.3}>
            <p className="text-[13px] text-muted-foreground/60 leading-relaxed mt-12 text-start max-w-[90ch] border-t border-card-border/40 pt-6">
              {prodNote}
            </p>
          </Reveal>

        </div>
      </section>
    </div>
  );
}
