"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { Droplet, Shield, Thermometer } from "@/components/ui/icon";

const INSET_PERCENTAGES = ["0%", "16.5%", "33%"];
const CENTER_INSET = "41.5%";
const DROPLET_SIZE = 36;
const ICON_SIZE = 24;
const ENSPACE = " ";

interface PartnerRing {
  l: string;
  t: string;
  d: string;
}

interface PartnerCard {
  t: string;
  d: string;
}

interface PartnerData {
  eyebrow: string;
  title1: string;
  titleGrad: string;
  lead: string;
  onionAria: string;
  rings: PartnerRing[];
  whyEyebrow: string;
  whyTitle: string;
  cards: PartnerCard[];
}

interface PartnerProps {
  data: PartnerData;
}

const WHY_ICONS = [Shield, Thermometer, Droplet];

export function Partner({ data }: PartnerProps) {
  const [activeRingIdx, setActiveRingIdx] = useState<number>(0);

  const activeRing = data.rings[activeRingIdx] || data.rings[0] || { l: "", t: "", d: "" };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-20 border-b border-card-border">
        <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
          <Reveal>
            <div className="mb-12 flex flex-col gap-3 text-start items-start">
              <span className="inline-block px-3 py-1 text-[13px] font-bold tracking-[0.1em] text-primary bg-primary-soft rounded-full uppercase mb-4 font-body">
                {data.eyebrow}
              </span>
              <h1 className="text-h1 font-heading font-extrabold tracking-tight mt-4 mb-6 text-foreground leading-[1.1] text-wrap-balance">
                {data.title1}{ENSPACE}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {data.titleGrad}
                </span>
              </h1>
              <p className="text-lead text-muted-foreground max-w-[62ch] mt-1 text-wrap-pretty">
                {data.lead}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Onion Rings Interactive Section */}
      <section className="py-16 border-b border-card-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Onion Layout */}
            <Reveal>
              <div
                className="k-onion"
                role="tablist"
                aria-label={data.onionAria}
              >
                {data.rings.map((ring, idx) => {
                  const insetVal = INSET_PERCENTAGES[idx] || "0%";
                  const isActive = activeRingIdx === idx;

                  return (
                    <button
                      key={ring.l}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`k-onion-ring ${isActive ? "is-on" : ""}`}
                      style={{ inset: insetVal }}
                      onClick={() => setActiveRingIdx(idx)}
                    >
                      <span className="k-onion-label">{ring.l}</span>
                    </button>
                  );
                })}
                {/* Center circle */}
                <div
                  style={{
                    position: "absolute",
                    inset: CENTER_INSET,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    background: "var(--primary)",
                    color: "var(--primary-foreground)",
                    pointerEvents: "none",
                  }}
                >
                  <Droplet size={DROPLET_SIZE} />
                </div>
              </div>
            </Reveal>

            {/* Right: Ring Description Card */}
            <Reveal delay={0.12}>
              <Card tint className="p-5 sm:p-8 text-start min-h-[260px] flex flex-col justify-center">
                <span className="text-small font-bold uppercase tracking-wider text-primary mb-2">
                  {activeRing.l}
                </span>
                <h2 className="font-heading font-extrabold text-2xl text-foreground mb-4">
                  {activeRing.t}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {activeRing.d}
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Material Trust Arguments Sektion */}
      <section className="py-16 bg-background-subtle">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <SectionHead
              eyebrow={data.whyEyebrow}
              title={data.whyTitle}
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {data.cards.map((card, idx) => {
              const Icon = WHY_ICONS[idx] || Shield;

              return (
                <Reveal key={card.t} delay={idx * 0.08}>
                  <Card className="h-full flex flex-col justify-between text-start p-5 sm:p-8">
                    <div>
                      <div className="w-12 h-12 rounded-[14px] grid place-items-center bg-primary-soft text-primary shrink-0 mb-6">
                        <Icon size={ICON_SIZE} />
                      </div>
                      <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                        {card.t}
                      </h3>
                      <p className="text-body text-muted-foreground leading-relaxed">
                        {card.d}
                      </p>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
