// K-Aqua — PartnerDeep: KESSEL-Ökosystem, Wasserwege (Versorgung+Entwässerung), gemeinsame
// Roadmap, Spezifikations-Kanäle (GAEB/BIM/Datenblätter).
//
// QUELLE: kaqua-deep-sections-2.jsx (PartnerDeep). PORTIERT 1:1 (4 Abschnitte).
// ANGEPASST: usePageL('partnerx') -> getTranslations('partnerx') (Server Component).
// BentoCard -> Card. Roadmap-Schritte behalten den Status-Chip (r.s: "Heute"/"Im Ausbau"/
// "Perspektive") bei — dafür kein StepFlow (das kennt keinen Chip), sondern die
// Original-Markup-Struktur 1:1 nachgebaut.
// Reine Server Component -> KEIN "use client".
import React from "react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Card } from "@/components/ui/Card";

interface EcoItem {
  t: string;
  d: string;
}
interface FlowItem {
  t: string;
  d: string;
}
interface RoadItem {
  t: string;
  d: string;
  s: string;
}
interface SpecItem {
  t: string;
  d: string;
}

export async function PartnerDeep() {
  const t = await getTranslations("partnerx");
  const eco = t.raw("eco") as EcoItem[];
  const flow = t.raw("flow") as FlowItem[];
  const road = t.raw("road") as RoadItem[];
  const spec = t.raw("spec") as SpecItem[];

  return (
    <React.Fragment>
      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="partner-ecosystem">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("ecoEyebrow")} title={t("ecoTitle")} lead={t("ecoLead")} />
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {eco.map((e, i) => (
              <Reveal key={e.t} delay={i * 0.07}>
                <Card className="h-full">
                  <h3 className="font-heading text-small font-bold text-foreground">{e.t}</h3>
                  <p className="text-tiny text-muted-foreground">{e.d}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="partner-flow">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("flowEyebrow")} title={t("flowTitle")} lead={t("flowLead")} />
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {flow.map((f, i) => (
              <Reveal key={f.t} delay={i * 0.08}>
                <Card tint={i === 2} className="h-full">
                  <h3 className="font-heading text-body font-bold text-foreground">{f.t}</h3>
                  <p className="text-small text-muted-foreground">{f.d}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="partner-roadmap">
        <div className="mx-auto max-w-[760px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("roadEyebrow")} title={t("roadTitle")} />
          </Reveal>
          <div className="flex flex-col">
            {road.map((r, i) => (
              <div
                key={r.t}
                className={i > 0 ? "grid grid-cols-[44px_minmax(0,1fr)] gap-4 border-t border-dashed border-card-border py-4" : "grid grid-cols-[44px_minmax(0,1fr)] gap-4 py-4"}
              >
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft font-heading text-lead font-extrabold text-primary"
                >
                  {i + 1}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-heading text-body font-bold text-foreground">{r.t}</h4>
                    <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-tiny font-bold text-primary">{r.s}</span>
                  </div>
                  <p className="text-small leading-relaxed text-muted-foreground">{r.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="partner-spec">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("specEyebrow")} title={t("specTitle")} lead={t("specLead")} />
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {spec.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.08}>
                <Card className="h-full">
                  <h3 className="font-heading text-small font-bold text-foreground">{s.t}</h3>
                  <p className="text-tiny text-muted-foreground">{s.d}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
