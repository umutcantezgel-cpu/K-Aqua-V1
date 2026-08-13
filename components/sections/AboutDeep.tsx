// K-Aqua - AboutDeep: Werk-Kennzahlen, Fertigungsstationen, House-of-KWT-Werte, Meilensteine.
//
// QUELLE: kaqua-deep-sections-3.jsx (AboutDeep). PORTIERT 1:1 (4 Abschnitte). Meilensteine
// nutzen bewusst KEIN StepFlow (das nummeriert 1..n) - die Original-Struktur zeigt ein
// Jahres-/Phasen-Chip statt einer laufenden Nummer, hier 1:1 nachgebaut.
// ANGEPASST: usePageL('aboutx') -> getTranslations('aboutx') (Server Component). BentoCard -> Card.
// Reine Server Component -> KEIN "use client".
import React from "react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Card } from "@/components/ui/Card";
import { StatBand } from "@/components/ui/StatBand";
import { StepFlow } from "@/components/ui/StepFlow";
import { MediaSlot } from "@/components/ui/MediaSlot";

interface HouseItem {
  t: string;
  d: string;
}
interface Milestone {
  y: string;
  t: string;
  d: string;
}

export async function AboutDeep() {
  const t = await getTranslations("aboutx");
  const tAd = await getTranslations("aboutDeep");
  const nums = t.raw("nums") as Array<{ n: string; u?: string; l: string }>;
  const prod = t.raw("prod") as Array<{ t: string; d: string }>;
  const house = t.raw("house") as HouseItem[];
  const miles = t.raw("miles") as Milestone[];

  return (
    <React.Fragment>
      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="about-numbers">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("numEyebrow")} title={t("numTitle")} lead={t("numLead")} />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
              {nums.map((s, i) => (
                <Card key={i} tint className="flex flex-col gap-2 p-8 text-center items-center justify-center relative overflow-hidden group shadow-sm hover:shadow-diffuse hover:border-primary/30 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="font-heading font-extrabold text-5xl md:text-6xl text-primary tracking-tight relative z-10">
                    {s.n}{s.u && <span className="text-3xl text-primary/70 ml-1">{s.u}</span>}
                  </div>
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-2 relative z-10">
                    {s.l}
                  </div>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="about-production">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("prodEyebrow")} title={t("prodTitle")} lead={t("prodLead")} />
          </Reveal>
          <Reveal delay={0.08}>
            <StepFlow steps={prod} />
          </Reveal>
        </div>
      </section>

      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="about-house-of-kwt">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("houseEyebrow")} title={t("houseTitle")} lead={t("houseLead")} />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 pb-8 md:pb-0">
            {house.map((h, i) => (
              <Reveal key={h.t} delay={i * 0.07}>
                <Card tint className="h-full">
                  <div className="font-heading text-small font-bold text-foreground">{h.t}</div>
                  <p className="text-tiny text-muted-foreground">{h.d}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="about-milestones">
        <div className="mx-auto max-w-[800px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("mileEyebrow")} title={t("mileTitle")} />
          </Reveal>
          <div className="relative border-l-2 border-card-border/60 ml-4 md:ml-6 mt-16 space-y-12">
            {miles.map((m, i) => (
              <Reveal key={m.t} delay={i * 0.08}>
                <div className="relative pl-10 md:pl-16 group">
                  {/* Timeline Dot */}
                  <div className="absolute w-4 h-4 rounded-full bg-primary-soft border-2 border-primary left-[-9px] top-2 transition-transform duration-300 group-hover:scale-125 group-hover:bg-primary shadow-sm" />
                  
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-3">
                    <span className="font-heading font-black text-3xl md:text-4xl text-primary/80 w-28 shrink-0 tracking-tight">
                      {m.y}
                    </span>
                    <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                      {m.t}
                    </h3>
                  </div>
                  <p className="text-body text-muted-foreground leading-relaxed md:pl-[144px]">
                    {m.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[clamp(64px,9vw,120px)] border-t border-card-border" data-screen-label="about-insights">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={tAd("eyebrow")} title={tAd("title")} lead={tAd("lead")} />
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 mt-12 pb-8 md:pb-0 h-auto md:h-[640px]">
            {/* Big Main Feature (60% width, 100% height) */}
            <Reveal delay={0.07} className="md:col-span-2 md:row-span-2 h-[350px] md:h-full">
              <div className="w-full h-full relative rounded-[24px] overflow-hidden shadow-diffuse group">
                <img 
                  src="/images/new-k-aqua/ppr-rohre-vorteile.jpg" 
                  alt="PPR-Rohre als beste Lösung" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-background/95 backdrop-blur-md px-4 py-2 rounded-lg inline-block shadow-sm">
                    <span className="text-sm font-bold text-foreground">Langlebigkeit & Effizienz</span>
                  </div>
                </div>
              </div>
            </Reveal>
            
            {/* Top Right Horizontal (40% width, 50% height) */}
            <Reveal delay={0.14} className="md:col-span-2 md:row-span-1 h-[250px] md:h-full">
              <div className="w-full h-full relative rounded-[24px] overflow-hidden shadow-sm group">
                <img 
                  src="/images/new-k-aqua/was-ist-ppr.jpg" 
                  alt="Was ist PPR?" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" 
                />
              </div>
            </Reveal>
            
            {/* Bottom Right 1 (20% width, 50% height) */}
            <Reveal delay={0.21} className="md:col-span-1 md:row-span-1 h-[250px] md:h-full">
              <div className="w-full h-full relative rounded-[24px] overflow-hidden shadow-sm group">
                <img 
                  src="/images/new-k-aqua/flexibilitaet-ppr-rohre.jpg" 
                  alt="K-Aqua Flexibilität" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" 
                />
              </div>
            </Reveal>
            
            {/* Bottom Right 2 (20% width, 50% height) */}
            <Reveal delay={0.28} className="md:col-span-1 md:row-span-1 h-[250px] md:h-full">
              <div className="w-full h-full relative rounded-[24px] overflow-hidden shadow-sm group">
                <img 
                  src="/images/new-k-aqua/messingfittings-ppr.jpg" 
                  alt="Hochwertige Messingeinsätze" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" 
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
