// K-Aqua — ContactDeep: Direkte Wege (Postfächer), Gut-zu-wissen-Fakten, Kontakt-FAQ.
//
// QUELLE: kaqua-deep-sections-3.jsx (ContactDeep). PORTIERT 1:1 (3 Abschnitte).
// ANGEPASST: usePageL('contactx') -> getTranslations('contactx') (Server Component).
// BentoCard -> Card, KButton -> Button (variant="secondary" -> "ghost", siehe PROMPT.txt).
// Reine Server Component -> KEIN "use client".
import React from "react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DeepFAQ } from "@/components/ui/DeepFAQ";

interface RouteItem {
  t: string;
  d: string;
  c: string;
  href: string;
}

export async function ContactDeep() {
  const t = await getTranslations("contactx");
  const routes = t.raw("routes") as RouteItem[];
  const facts = t.raw("facts") as Array<[string, string]>;
  const faq = t.raw("faq") as Array<{ q: string; a: string }>;

  return (
    <React.Fragment>
      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="contact-routes">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("routeEyebrow")} title={t("routeTitle")} lead={t("routeLead")} />
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {routes.map((r, i) => (
              <Reveal key={r.t} delay={i * 0.08}>
                <Card className="h-full">
                  <h3 className="font-heading text-body font-bold text-foreground">{r.t}</h3>
                  <p className="text-small text-muted-foreground">{r.d}</p>
                  <Button variant="ghost" size="sm" href={r.href} className="mt-2 self-start">
                    {r.c}
                  </Button>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="contact-facts">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead title={t("factsTitle")} />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex flex-col gap-2">
              {facts.map(([k, v]) => (
                <div key={k} className="rounded-lg border border-card-border bg-card">
                  <div className="flex min-h-14 items-center justify-between gap-4 px-5 py-4">
                    <span className="font-bold text-foreground">{k}</span>
                    <span className="text-end text-small text-muted-foreground">{v}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="contact-faq">
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
