// K-Aqua — NewsDeep: "Mehr aus dem Hause K-Aqua"
// Linkt auf die 50 eigenständigen News-Detailseiten (aktuell die ersten 4).
"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Card } from "@/components/ui/Card";
import { Link } from '@/lib/i18n/navigation';

interface Post {
  date: string;
  tag: string;
  t: string;
  teaser: string;
  body: string[];
}

const SLUGS = [
  'iso-zertifizierung-qualitaet-umwelt-energie',
  'fortlaufende-kennzeichnung-rueckverfolgbarkeit',
  'warum-eigentlich-ppr-materialkunde',
  'messing-trifft-polypropylen-uebergaenge-bestand'
];

export function NewsDeep() {
  const t = useTranslations("newsx");
  const posts = t.raw("posts") as Post[];

  return (
    <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="news-more">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <SectionHead eyebrow={t("moreEyebrow")} title={t("moreTitle")} lead={t("moreLead")} />
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {posts.map((p, i) => {
            const slug = SLUGS[i] || 'unknown';
            return (
              <Reveal key={p.t} delay={i * 0.07}>
                <Link href={`/news/${slug}`} className="block h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-3xl">
                  <Card className="h-full text-start transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-md">
                    <div className="flex items-center gap-3 text-tiny font-semibold text-faint-foreground">
                      <span>{p.date}</span>
                      <span className="rounded-full bg-primary-soft px-2.5 py-1 font-bold text-primary">{p.tag}</span>
                    </div>
                    <h3 className="font-heading text-body font-bold text-foreground mt-3 group-hover:text-primary transition-colors">{p.t}</h3>
                    <p className="text-small text-muted-foreground mt-2 line-clamp-3">{p.teaser}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 self-start text-small font-bold text-primary opacity-90 group-hover:opacity-100 transition-opacity">
                      {t("readMore")} <span className="translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </Card>
                </Link>
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
