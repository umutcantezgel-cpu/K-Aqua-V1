"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/Card";
import { FilterChip } from "@/components/ui/FilterChip";
import { IconChip } from "@/components/ui/IconChip";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { MapPin } from "@/components/ui/icon";
import type { GlobeRef, GlobeMarker } from "@/components/globe/Globe";
import { LazyGlobe } from "@/components/globe/LazyGlobe";

// Load Globe dynamically with ssr: false to prevent server-side canvas rendering errors
const Globe = dynamic(
  () => import("@/components/globe/Globe").then((mod) => mod.Globe),
  { ssr: false }
);

interface ReferenceProject {
  id: string;
  lat: number;
  lon: number;
  title: string;
  d: string;
}

interface ReferencesProps {
  referencesData: {
    locale: string;
    eyebrow: string;
    title1: string;
    titleGrad: string;
    lead: string;
    canvasAria: string;
    note: string;
    projects: ReferenceProject[];
  };
}

export default function References({ referencesData }: ReferencesProps) {
  const { projects } = referencesData;
  const globeRef = useRef<GlobeRef | null>(null);
  
  // Default to the first project
  const [activeProject, setActiveProject] = useState<ReferenceProject>(
    projects[0] || { id: "", lat: 0, lon: 0, title: "", d: "" }
  );

  // Sync the globe flyTo when activeProject changes
  useEffect(() => {
    if (activeProject && globeRef.current) {
      globeRef.current.flyTo(activeProject.lon, activeProject.lat);
    }
  }, [activeProject]);

  // Handle chip click
  const handleSelectProject = (project: ReferenceProject) => {
    setActiveProject(project);
  };

  // Helper to split city and country/region using LTR and RTL commas
  const getCityName = (title: string) => {
    return title.split(/[,،]/)[0]?.trim() || title;
  };

  // Map reference projects to GlobeMarkers
  const globeMarkers: GlobeMarker[] = projects.map((p) => ({
    lat: p.lat,
    lon: p.lon,
    title: p.title,
    label: getCityName(p.title),
  }));

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-card-border">
        <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
          <Reveal>
            <Eyebrow>{referencesData.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="text-h1 font-heading font-extrabold tracking-tight mt-4 mb-6 text-foreground leading-[1.1] text-wrap-balance">
              {referencesData.title1}{" "}
              <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">
                {referencesData.titleGrad}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-lead text-muted-foreground leading-relaxed max-w-[64ch]">
              {referencesData.lead}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Globe Section */}
      <section className="py-16 lg:py-24 bg-background-subtle border-b border-card-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Globe Canvas Container */}
            <div className="lg:col-span-7 flex justify-center items-center min-h-[350px] sm:min-h-[500px]">
              <LazyGlobe 
                className="relative flex items-center justify-center border border-card-border/30 rounded-full p-6 bg-background/50 shadow-diffuse select-none w-[368px] h-[368px] md:w-[508px] md:h-[508px]"
                aria-label={referencesData.canvasAria}
              >
                <Globe
                  ref={globeRef}
                  markers={globeMarkers}
                  interactive={true}
                  whirl={false}
                  speed={0.006}
                  onMarkerClick={(mk) => {
                    const matched = projects.find((p) => p.title === mk.title);
                    if (matched) {
                      setActiveProject(matched);
                    }
                  }}
                />
              </LazyGlobe>
            </div>

            {/* Information Card & Synchronized Selector Chips */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-start">
              <Reveal>
                <Card tint className="text-start p-8 shadow-diffuse hover:shadow-lift transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <IconChip className="bg-primary-soft text-primary">
                      <MapPin className="w-6 h-6" />
                    </IconChip>
                    <h3 className="text-h3 font-heading font-bold text-foreground">
                      {activeProject.title}
                    </h3>
                  </div>
                  <p className="text-body text-muted-foreground leading-relaxed mt-2">
                    {activeProject.d}
                  </p>
                </Card>
              </Reveal>

              {/* Synchronized Chips */}
              <Reveal delay={0.1}>
                <div className="flex flex-wrap gap-2 justify-start">
                  {projects.map((p) => {
                    const isActive = activeProject.id === p.id;
                    return (
                      <FilterChip
                        key={p.id}
                        pressed={isActive}
                        onClick={() => handleSelectProject(p)}
                        className="py-3 px-5 min-h-[44px]"
                      >
                        {getCityName(p.title)}
                      </FilterChip>
                    );
                  })}
                </div>
              </Reveal>

              {/* Editorial note/disclaimer */}
              <Reveal delay={0.2}>
                <p className="text-small text-muted-foreground italic leading-relaxed">
                  {referencesData.note}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
