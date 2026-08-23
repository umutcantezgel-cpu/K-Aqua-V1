// K-Aqua - ServiceDeep: Dokumentenbibliothek, Support-Wege, Service-FAQ.
//
// QUELLE: kaqua-deep-sections-2.jsx (ServiceDeep). PORTIERT 1:1. Dokumentzeilen sind im
// Prototyp bewusst immer "aufgeklappt" (kein Akkordeon, nur je eine Zeile mit
// Download-Button ODER "im Trust Center anfordern"-Chip) - hier beibehalten.
// ANGEPASST: usePageL('servicex') -> getTranslations('servicex') (Server Component).
// KButton -> Button, variant="secondary" -> variant="ghost" (siehe PROMPT.txt).
// Reine Server Component -> KEIN "use client".
import React from "react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Card } from "@/components/ui/Card";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { Button } from "@/components/ui/Button";
import LiquidMagneticButton from "@/components/ui/LiquidMagneticButton";
import { Download, FileText } from "@/components/ui/icon";

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {libRows.map((r, idx) => (
                <div 
                  key={r.t + idx} 
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-card-border bg-card p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FileText className="w-6 h-6" />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <h4 className="font-heading text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                        {r.t}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {r.s}
                      </p>
                      <div className="mt-2 inline-block w-max rounded-full bg-background-subtle border border-card-border px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                        {r.lang}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-card-border/50">
                    {r.href ? (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        href={r.href} 
                        icon={<Download size={16} />}
                        className="w-full justify-between px-4 hover:bg-primary hover:text-primary-foreground group/btn"
                      >
                        {t("libOpen")}
                      </Button>
                    ) : (
                      <div className="flex w-full items-center justify-center rounded-lg bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
                        {t("libRequest")}
                      </div>
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
          {/* Rückfall auf eine volle Spalte bis `sm` — sonst bleibt bei 320 px
              eine zu schmale Spalte stehen, deren Inhalt überläuft. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
            {sup.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.08}>
                <Card className="h-full">
                  <div className="font-heading text-body font-bold text-foreground">{s.t}</div>
                  <p className="text-small text-muted-foreground">{s.d}</p>
                  {s.href ? (
                    <LiquidMagneticButton fill="flood" variant="ghost" size="md" href={s.href} aria-label={`${s.c} - ${s.t}`} className="mt-2 self-start">
                      {s.c}
                    </LiquidMagneticButton>
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
