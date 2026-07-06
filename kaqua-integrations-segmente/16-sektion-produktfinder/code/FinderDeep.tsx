// K-Aqua — FinderDeep: Lesehilfe + Workflow-Erklärung für den Produktfinder.
//
// QUELLE: kaqua-deep-sections-1.jsx (FinderDeep). PORTIERT 1:1 (Glossar-Grid + Step-Flow).
// ANGEPASST: usePageL('finderx') -> getTranslations('finderx') (next-intl, Server Component
// — kein eigener State im Original). t.raw() für help[]/flow[] (strukturiert).
// Reine Server Component -> KEIN "use client".
import React from "react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { GlossaryGrid } from "@/components/ui/GlossaryGrid";
import { StepFlow } from "@/components/ui/StepFlow";

export async function FinderDeep() {
  const t = await getTranslations("finderx");
  const help = t.raw("help") as Array<[string, string]>;
  const flow = t.raw("flow") as Array<{ t: string; d: string }>;

  return (
    <React.Fragment>
      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="finder-help">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("helpEyebrow")} title={t("helpTitle")} lead={t("helpLead")} />
          </Reveal>
          <Reveal delay={0.08}>
            <GlossaryGrid items={help} />
          </Reveal>
        </div>
      </section>
      <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="finder-workflow">
        <div className="mx-auto max-w-[720px] px-6">
          <Reveal>
            <SectionHead title={t("flowTitle")} />
          </Reveal>
          <Reveal delay={0.08}>
            <StepFlow steps={flow} />
          </Reveal>
        </div>
      </section>
    </React.Fragment>
  );
}
