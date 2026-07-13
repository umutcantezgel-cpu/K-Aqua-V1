// K-Aqua — NewsDeep: "Mehr aus dem Hause K-Aqua" — aufklappbare Hintergrund-Artikel + ISH-Hinweis.
//
// QUELLE: kaqua-deep-sections-3.jsx (NewsDeep). PORTIERT 1:1 (Read-more-Toggle pro Karte,
// ein Artikel gleichzeitig offen — wie im Prototyp, kein Multi-Open).
// ANGEPASST: usePageL('newsx') -> useTranslations('newsx') + t.raw() für posts[] (next-intl
// t() liefert nur Strings). Icons.ChevronDown -> benannter Import (siehe PROMPT.txt:
// ChevronDown muss in components/ui/icon.tsx ergänzt werden).
// Eigener State (offener Artikel-Index) -> "use client".
"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Card } from "@/components/ui/Card";
import { ChevronDown } from "@/components/ui/icon";

interface Post {
  date: string;
  tag: string;
  t: string;
  teaser: string;
  body: string[];
}

export function NewsDeep() {
  const t = useTranslations("newsx");
  const [open, setOpen] = useState(-1);
  const posts = t.raw("posts") as Post[];

  return (
    <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="news-more">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <SectionHead eyebrow={t("moreEyebrow")} title={t("moreTitle")} lead={t("moreLead")} />
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {posts.map((p, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={p.t} delay={i * 0.07}>
                <Card className="h-full text-start">
                  <div className="flex items-center gap-3 text-tiny font-semibold text-faint-foreground">
                    <span>{p.date}</span>
                    <span className="rounded-full bg-primary-soft px-2.5 py-1 font-bold text-primary">{p.tag}</span>
                  </div>
                  <h3 className="font-heading text-body font-bold text-foreground">{p.t}</h3>
                  <p className="text-small text-muted-foreground">{p.teaser}</p>
                  <div className={`mt-3 flex flex-col gap-3 text-small leading-relaxed text-muted-foreground ${isOpen ? 'block' : 'hidden md:block'}`}>
                    {p.body.map((para, pi) => (
                      <p key={pi}>{para}</p>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="mt-3 inline-flex md:hidden items-center gap-1.5 self-start bg-transparent p-0 text-small font-bold text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {isOpen ? t("readLess") : t("readMore")}
                    <ChevronDown size={15} className={isOpen ? "rotate-180" : ""} />
                  </button>
                </Card>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.2}>
          <Card className="mt-6">
            <h3 className="font-heading text-small font-bold text-foreground">{t("ishTitle")}</h3>
            <p className="text-body text-muted-foreground">{t("ishText")}</p>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
