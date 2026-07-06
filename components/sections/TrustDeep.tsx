// K-Aqua — TrustDeep: Buying-Center-Rollen, Beschaffungsstatistiken, Prüfinstitute,
// Audit-Fahrplan, Compliance-FAQ.
//
// QUELLE: kaqua-deep-sections-2.jsx (TrustDeep). PORTIERT 1:1 (5 Abschnitte in dieser
// Reihenfolge).
// ANGEPASST: usePageL('trustx') -> getTranslations('trustx') (Server Component, kein
// eigener State im Original). t.raw() für stakeRows/stats/inst/audit/faq. BentoCard -> Card.
// Reine Server Component -> KEIN "use client".
import React from "react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Card } from "@/components/ui/Card";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { StatBand } from "@/components/ui/StatBand";
import { StepFlow } from "@/components/ui/StepFlow";
import { DeepFAQ } from "@/components/ui/DeepFAQ";

interface InstItem {
  t: string;
  d: string;
}

export async function TrustDeep() {
  const t = await getTranslations("trustx");
  const stakeHead = t.raw("stakeHead") as string[];
  const stakeRows = t.raw("stakeRows") as string[][];
  const stats = t.raw("stats") as Array<{ n: string; u?: string; l: string }>;
  const inst = t.raw("inst") as InstItem[];
  const audit = t.raw("audit") as Array<{ t: string; d: string }>;
  const faq = t.raw("faq") as Array<{ q: string; a: string }>;

  return (
    <React.Fragment>
      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="trust-stakeholders">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("stakeEyebrow")} title={t("stakeTitle")} lead={t("stakeLead")} />
          </Reveal>
          <Reveal delay={0.08}>
            <DeepMatrix head={stakeHead} rows={stakeRows} />
          </Reveal>
        </div>
      </section>

      <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="trust-stats">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("statEyebrow")} title={t("statTitle")} />
          </Reveal>
          <Reveal delay={0.08}>
            <StatBand stats={stats} />
          </Reveal>
          <p className="mt-3 text-tiny leading-relaxed text-faint-foreground">{t("statNote")}</p>
        </div>
      </section>

      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="trust-institutes">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("instEyebrow")} title={t("instTitle")} />
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
            {inst.map((it, i) => (
              <Reveal key={it.t} delay={i * 0.08}>
                <Card className="h-full">
                  <h3 className="font-heading text-body font-bold text-foreground">{it.t}</h3>
                  <p className="text-small text-muted-foreground">{it.d}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="trust-audit">
        <div className="mx-auto max-w-[720px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("auditEyebrow")} title={t("auditTitle")} lead={t("auditLead")} />
          </Reveal>
          <Reveal delay={0.08}>
            <StepFlow steps={audit} />
          </Reveal>
        </div>
      </section>

      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="trust-faq">
        <div className="mx-auto max-w-[820px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("faqEyebrow")} title={t("faqTitle")} />
          </Reveal>
          <Reveal delay={0.08}>
            <DeepFAQ items={faq} />
          </Reveal>
        </div>
      </section>
    </React.Fragment>
  );
}
