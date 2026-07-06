// K-Aqua — ServiceDeep: Dokumentenbibliothek, Support-Wege, Service-FAQ.
//
// QUELLE: kaqua-deep-sections-2.jsx (ServiceDeep). PORTIERT 1:1. Dokumentzeilen sind im
// Prototyp bewusst immer "aufgeklappt" (kein Akkordeon, nur je eine Zeile mit
// Download-Button ODER "im Trust Center anfordern"-Chip) — hier beibehalten.
// ANGEPASST: usePageL('servicex') -> getTranslations('servicex') (Server Component).
// KButton -> Button, variant="secondary" -> variant="ghost" (siehe 00-FINDINGS.md §0.8/§0.10.4).
// Reine Server Component -> KEIN "use client".
import React from "react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Card } from "@/components/ui/Card";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { Button } from "@/components/ui/Button";
import { Download } from "@/components/ui/icon";

interface LibRow {
  t: string;
  s: string;
  lang: string;
  href: string | null;
}
interface SupportItem {
  t: string;
  d: string;
  c: string;
  href: string | null;
}

export async function ServiceDeep() {
  const t = await getTranslations("servicex");
  const libRows = t.raw("libRows") as LibRow[];
  const sup = t.raw("sup") as SupportItem[];
  const faq = t.raw("faq") as Array<{ q: string; a: string }>;

  return (
    <React.Fragment>
      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="service-library">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("libEyebrow")} title={t("libTitle")} lead={t("libLead")} />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex flex-col gap-2">
              {libRows.map((r) => (
                <div key={r.t} className="rounded-lg border border-card-border bg-card">
                  <div className="flex min-h-14 items-center justify-between gap-4 px-5 py-4">
                    <span className="flex min-w-0 flex-col items-start gap-1">
                      <span className="font-heading text-body font-bold text-foreground">{r.t}</span>
                      <span className="text-small text-muted-foreground">
                        {r.s} · {r.lang}
                      </span>
                    </span>
                    {r.href ? (
                      <Button variant="ghost" size="sm" href={r.href} icon={<Download size={15} />}>
                        {t("libOpen")}
                      </Button>
                    ) : (
                      <span className="shrink-0 rounded-full bg-primary-soft px-3 py-1 text-tiny font-semibold text-primary">
                        {t("libRequest")}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="service-support">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("supEyebrow")} title={t("supTitle")} lead={t("supLead")} />
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
            {sup.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.08}>
                <Card className="h-full">
                  <h3 className="font-heading text-body font-bold text-foreground">{s.t}</h3>
                  <p className="text-small text-muted-foreground">{s.d}</p>
                  {s.href ? (
                    <Button variant="ghost" size="sm" href={s.href} className="mt-2 self-start">
                      {s.c}
                    </Button>
                  ) : (
                    <p className="mt-2 text-small font-semibold text-foreground">{s.c}</p>
                  )}
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="service-faq">
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
