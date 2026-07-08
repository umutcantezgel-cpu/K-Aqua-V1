// K-Aqua — CareerDeep: Arbeitsbereiche, Warum-K-Aqua-Gründe, Bewerbungsprozess.
//
// QUELLE: kaqua-deep-sections-3.jsx (CareerDeep). PORTIERT 1:1 (3 Abschnitte).
// ANGEPASST: usePageL('careerx') -> getTranslations('careerx') (Server Component). BentoCard -> Card.
// Reine Server Component -> KEIN "use client".
import React from "react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Card } from "@/components/ui/Card";
import { StepFlow } from "@/components/ui/StepFlow";

interface AreaItem {
  t: string;
  d: string;
  p: string;
}
interface WhyItem {
  t: string;
  d: string;
}

export async function CareerDeep() {
  const t = await getTranslations("careerx");
  const areas = t.raw("areas") as AreaItem[];
  const why = t.raw("why") as WhyItem[];
  const proc = t.raw("proc") as Array<{ t: string; d: string }>;

  return (
    <React.Fragment>
      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="career-areas">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("areaEyebrow")} title={t("areaTitle")} lead={t("areaLead")} />
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
            {areas.map((a, i) => (
              <Reveal key={a.t} delay={i * 0.08}>
                <Card className="h-full">
                  <h3 className="font-heading text-body font-bold text-foreground">{a.t}</h3>
                  <p className="text-small text-muted-foreground">{a.d}</p>
                  <p className="mt-2 text-tiny text-faint-foreground">{a.p}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-tiny leading-relaxed text-faint-foreground">{t("areaNote")}</p>
        </div>
      </section>

      <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="career-why">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("whyEyebrow")} title={t("whyTitle")} />
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {why.map((w, i) => (
              <Reveal key={w.t} delay={i * 0.07}>
                <Card tint className="h-full">
                  <h3 className="font-heading text-small font-bold text-foreground">{w.t}</h3>
                  <p className="text-tiny text-muted-foreground">{w.d}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="career-process">
        <div className="mx-auto max-w-[720px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("procEyebrow")} title={t("procTitle")} />
          </Reveal>
          <Reveal delay={0.08}>
            <StepFlow steps={proc} />
          </Reveal>
          <p className="mt-4 font-semibold text-foreground">{t("procContact")}</p>
        </div>
      </section>
    </React.Fragment>
  );
}
