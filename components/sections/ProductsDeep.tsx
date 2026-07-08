/* eslint-disable react/jsx-no-literals */
// K-Aqua — ProductsDeep: Rohrfamilien, Dimensionstabellen, Werkstoffdaten, Normen, FAQ.
//
// QUELLE: kaqua-deep-sections-1.jsx (ProductsDeep) + kaqua-deep-data.js (K_DEEP).
// PORTIERT 1:1: 5 Abschnitte in exakt dieser Reihenfolge (Rohrfamilien-Karten,
// SDR-Tab-gesteuerte Dimensionstabelle + Auslegungsanker, Werkstoffdaten-Tabelle,
// Normen-Tabelle, FAQ-Akkordeon).
// ANGEPASST: usePageL('productsx') -> useTranslations('productsx') + t.raw() für
// strukturierte Felder (pipes/anchors/matRows/norms/faq — siehe PROMPT.txt).
// K_DEEP.tableForSdr/fmtPn -> lib/data/deep.ts. BentoCard -> Card. Reveal-Delays
// von ms auf s umgerechnet.
// Eigener State (aktive SDR) -> "use client".
"use client";
import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Card } from "@/components/ui/Card";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { PipeFX } from "@/components/ui/PipeFX";
import { formatPN, SDRS, tableForSdr } from "@/lib/data/deep";

interface PipeFamily {
  t: string;
  d: string;
  tags: string[];
}
interface Anchor {
  v: string;
  t: string;
  c: string;
}

export function ProductsDeep() {
  const t = useTranslations("productsx");
  const locale = useLocale() as "de" | "en" | "ar";
  const [sdr, setSdr] = useState<number>(6);

  const pipes = t.raw("pipes") as PipeFamily[];
  const anchors = t.raw("anchors") as Anchor[];
  const matHead = t.raw("matHead") as string[];
  const matRows = t.raw("matRows") as string[][];
  const normHead = t.raw("normHead") as string[];
  const norms = t.raw("norms") as string[][];
  const faq = t.raw("faq") as Array<{ q: string; a: string }>;
  const dimHead = t.raw("dimHead") as string[];

  const fmtSdr = (s: number) => "SDR " + (locale === "de" ? String(s).replace(".", ",") : String(s));
  const rows = tableForSdr(sdr).map((r) => [r.d, r.s, r.di, formatPN(r.pn, locale), r.water, r.weight]);

  return (
    <React.Fragment>
      {/* Rohrfamilien */}
      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="products-pipe-families">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("pipesEyebrow")} title={t("pipesTitle")} lead={t("pipesLead")} />
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
            {pipes.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.07}>
                <Card className="h-full">
                  <h3 className="font-heading text-lead font-bold text-foreground">{p.t}</h3>
                  <p className="text-small text-muted-foreground">{p.d}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.tags.map((tg) => (
                      <span key={tg} className="rounded-full bg-primary-soft px-3 py-1 text-tiny font-semibold text-foreground">
                        {tg}
                      </span>
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PipeFX Showcase */}
      <section className="py-[clamp(64px,9vw,120px)] border-t border-card-border" data-screen-label="products-pipefx">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow="Visualisierung" title="K-Aqua PipeFX" lead="Echtzeit-Simulationen unserer Produktionsprozesse." />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <Card className="flex flex-col items-center justify-center p-6 gap-4">
              <PipeFX variant="flow" size={240} />
              <h4 className="font-heading font-bold text-foreground">Flow</h4>
            </Card>
            <Card className="flex flex-col items-center justify-center p-6 gap-4">
              <PipeFX variant="blueprint" size={240} />
              <h4 className="font-heading font-bold text-foreground">Blueprint</h4>
            </Card>
            <Card className="flex flex-col items-center justify-center p-6 gap-4">
              <PipeFX variant="pressure" size={240} />
              <h4 className="font-heading font-bold text-foreground">Pressure</h4>
            </Card>
            <Card className="flex flex-col items-center justify-center p-6 gap-4">
              <PipeFX variant="isonet" size={240} />
              <h4 className="font-heading font-bold text-foreground">Isometric</h4>
            </Card>
          </div>
        </div>
      </section>

      {/* Dimensionstabellen */}
      <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="products-dimensions">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("dimEyebrow")} title={t("dimTitle")} lead={t("dimLead")} />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label={t("dimTabAria")}>
              {SDRS.map((s) => (
                <button
                  key={s}
                  type="button"
                  role="tab"
                  aria-selected={sdr === s}
                  onClick={() => setSdr(s)}
                  className={
                    sdr === s
                      ? "min-h-11 rounded-full border border-primary bg-primary px-4 text-small font-semibold text-primary-foreground"
                      : "min-h-11 rounded-full border border-card-border bg-card px-4 text-small font-semibold text-muted-foreground hover:border-primary hover:text-primary"
                  }
                >
                  {fmtSdr(s)}
                </button>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <DeepMatrix head={dimHead} rows={rows} heroCol={3} note={t("dimNote")} />
          </Reveal>
          <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
            {anchors.map((a, i) => (
              <Reveal key={a.t} delay={i * 0.08}>
                <Card tint className="h-full">
                  <span className="font-heading text-h3 font-extrabold text-foreground">{a.v}</span>
                  <h3 className="font-heading text-small font-bold text-foreground">{a.t}</h3>
                  <p className="text-tiny text-muted-foreground">{a.c}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <p className="mt-3 text-tiny leading-relaxed text-faint-foreground">{t("anchorsTitle")}</p>
        </div>
      </section>

      {/* Werkstoffdaten */}
      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="products-material">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("matEyebrow")} title={t("matTitle")} lead={t("matLead")} />
          </Reveal>
          <Reveal delay={0.08}>
            <DeepMatrix head={matHead} rows={matRows} heroCol={1} />
          </Reveal>
        </div>
      </section>

      {/* Normen & Nachweise */}
      <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="products-norms">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("normEyebrow")} title={t("normTitle")} lead={t("normLead")} />
          </Reveal>
          <Reveal delay={0.08}>
            <DeepMatrix head={normHead} rows={norms} heroCol={0} />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="products-faq">
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
