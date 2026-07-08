// K-Aqua — AcademyDeep: Schweißparameter (DVS 2207-11), Verfahren-Schritte, Fehlerkunde, Glossar.
//
// QUELLE: kaqua-deep-sections-2.jsx (AcademyDeep) + kaqua-deep-data.js (K_DEEP.WELD).
// PORTIERT 1:1: 4 Abschnitte (Parameter-Matrix, Tab-gesteuerte Verfahren-Schritte,
// Fehler-Matrix, Glossar-Grid) in exakt dieser Reihenfolge.
// ANGEPASST: usePageL('academyx') -> useTranslations('academyx') + t.raw() für
// procTabs/procs/errRows/gloss (strukturiert). K_DEEP.WELD -> getSocketWeldParams() (I01).
// Eigener State (aktives Verfahren) -> "use client".
"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Card } from "@/components/ui/Card";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { GlossaryGrid } from "@/components/ui/GlossaryGrid";
import { StepFlow } from "@/components/ui/StepFlow";
import { getSocketWeldParams } from "@/lib/data/repositories";

interface Procedure {
  t: string;
  steps: Array<{ t: string; d: string }>;
}

export function AcademyDeep() {
  const t = useTranslations("academyx");
  const [proc, setProc] = useState(0);

  const paramHead = t.raw("paramHead") as string[];
  const procTabs = t.raw("procTabs") as string[];
  const procs = t.raw("procs") as Procedure[];
  const errHead = t.raw("errHead") as string[];
  const errRows = t.raw("errRows") as string[][];
  const gloss = t.raw("gloss") as Array<[string, string]>;
  const weldRows = getSocketWeldParams();

  return (
    <React.Fragment>
      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="academy-params">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("paramEyebrow")} title={t("paramTitle")} lead={t("paramLead")} />
          </Reveal>
          <Reveal delay={0.08}>
            <DeepMatrix head={paramHead} rows={weldRows} note={t("paramNote")} />
          </Reveal>
        </div>
      </section>

      <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="academy-procedures">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("stepEyebrow")} title={t("stepTitle")} lead={t("stepLead")} />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mb-5 flex flex-wrap gap-2">
              {procTabs.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={proc === i}
                  onClick={() => setProc(i)}
                  className={
                    proc === i
                      ? "min-h-11 rounded-full border border-primary bg-primary px-4 text-small font-semibold text-primary-foreground"
                      : "min-h-11 rounded-full border border-card-border bg-card px-4 text-small font-semibold text-muted-foreground hover:border-primary hover:text-primary"
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <Card>
              <h3 className="mb-3 font-heading text-body font-bold text-foreground">{procs[proc].t}</h3>
              <StepFlow steps={procs[proc].steps} />
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="academy-errors">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("errEyebrow")} title={t("errTitle")} />
          </Reveal>
          <Reveal delay={0.08}>
            <DeepMatrix head={errHead} rows={errRows} heroCol={2} />
          </Reveal>
        </div>
      </section>

      <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="academy-glossary">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("glossEyebrow")} title={t("glossTitle")} />
          </Reveal>
          <Reveal delay={0.08}>
            <GlossaryGrid items={gloss} />
          </Reveal>
        </div>
      </section>
    </React.Fragment>
  );
}
