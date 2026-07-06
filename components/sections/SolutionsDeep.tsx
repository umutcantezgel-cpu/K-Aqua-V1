// K-Aqua — SolutionsDeep: Einsatzfelder-Segmente, Werkstoffvergleich, Lebenszyklus.
//
// QUELLE: kaqua-deep-sections-3.jsx (SolutionsDeep). PORTIERT 1:1 (3 Abschnitte).
// ANGEPASST: usePageL('solutionsx') -> getTranslations('solutionsx') (Server Component).
// BentoCard -> Card. Icons.Check -> benannter Import (bereits in components/ui/icon.tsx
// vorhanden, keine Lücke).
// Reine Server Component -> KEIN "use client".
import React from "react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Card } from "@/components/ui/Card";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { StepFlow } from "@/components/ui/StepFlow";
import { Check } from "@/components/ui/icon";

interface Segment {
  t: string;
  d: string;
  pts: string[];
}

export async function SolutionsDeep() {
  const t = await getTranslations("solutionsx");
  const segments = t.raw("segments") as Segment[];
  const cmpHead = t.raw("cmpHead") as string[];
  const cmpRows = t.raw("cmpRows") as string[][];
  const life = t.raw("life") as Array<{ t: string; d: string }>;

  return (
    <React.Fragment>
      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="solutions-segments">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("segEyebrow")} title={t("segTitle")} lead={t("segLead")} />
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
            {segments.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.07}>
                <Card className="h-full">
                  <h3 className="font-heading text-body font-bold text-foreground">{s.t}</h3>
                  <p className="text-small text-muted-foreground">{s.d}</p>
                  <ul className="mt-2 flex list-none flex-col gap-1 p-0">
                    {s.pts.map((pt) => (
                      <li key={pt} className="flex items-start gap-1.5 text-tiny text-muted-foreground">
                        <Check size={14} className="mt-0.5 shrink-0 text-primary" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="solutions-comparison">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("cmpEyebrow")} title={t("cmpTitle")} lead={t("cmpLead")} />
          </Reveal>
          <Reveal delay={0.08}>
            <DeepMatrix head={cmpHead} rows={cmpRows} heroCol={1} note={t("cmpNote")} />
          </Reveal>
        </div>
      </section>

      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="solutions-lifecycle">
        <div className="mx-auto max-w-[760px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("lifeEyebrow")} title={t("lifeTitle")} lead={t("lifeLead")} />
          </Reveal>
          <Reveal delay={0.08}>
            <StepFlow steps={life} />
          </Reveal>
        </div>
      </section>
    </React.Fragment>
  );
}
