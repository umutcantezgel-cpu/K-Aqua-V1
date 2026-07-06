// K-Aqua — AboutDeep: Werk-Kennzahlen, Fertigungsstationen, House-of-KWT-Werte, Meilensteine.
//
// QUELLE: kaqua-deep-sections-3.jsx (AboutDeep). PORTIERT 1:1 (4 Abschnitte). Meilensteine
// nutzen bewusst KEIN StepFlow (das nummeriert 1..n) — die Original-Struktur zeigt ein
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
            <StatBand stats={nums} />
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
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {house.map((h, i) => (
              <Reveal key={h.t} delay={i * 0.07}>
                <Card tint className="h-full">
                  <h3 className="font-heading text-small font-bold text-foreground">{h.t}</h3>
                  <p className="text-tiny text-muted-foreground">{h.d}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="about-milestones">
        <div className="mx-auto max-w-[760px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("mileEyebrow")} title={t("mileTitle")} />
          </Reveal>
          <div className="flex flex-col">
            {miles.map((m, i) => (
              <div
                key={m.t}
                className={i > 0 ? "grid grid-cols-[44px_minmax(0,1fr)] gap-4 border-t border-dashed border-card-border py-4" : "grid grid-cols-[44px_minmax(0,1fr)] gap-4 py-4"}
              >
                <span
                  aria-hidden="true"
                  className="flex h-10 min-w-10 items-center justify-center rounded-full bg-primary-soft px-1 font-heading text-tiny font-extrabold text-primary"
                >
                  {m.y}
                </span>
                <div>
                  <h4 className="font-heading text-body font-bold text-foreground">{m.t}</h4>
                  <p className="text-small leading-relaxed text-muted-foreground">{m.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
