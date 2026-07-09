import React from "react";
import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHead } from "@/components/ui/SectionHead";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
import { Users, Handshake, Leaf, Award, Check } from "@/components/ui/icon";
import { AboutDeep } from "@/components/sections/AboutDeep";
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("about") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/unternehmen",
    locale,
  });
}

interface PolicyItem {
  t: string;
  d: string;
}

const POLICY_ICONS = [Users, Handshake, Leaf];

export default async function UnternehmenPage({ params }: Props) {
  const { locale } = await params;
  const jsonLd = await getWebPageJsonLd(locale, "about");
  const t = await getTranslations({ locale, namespace: "about" });

  const cards = t.raw("cards") as PolicyItem[];
  const points = t.raw("points") as string[];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  
  return (
    <>
      <JsonLd schema={jsonLd} />
      <div className="flex flex-col w-full min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 lg:py-32 kq-band kq-band--slant-b">
          <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
          <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
            <Reveal>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="text-h1 font-heading font-extrabold tracking-tight mt-4 mb-6 text-foreground leading-[1.1]">
                {t("title1")}{" "}
                <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">
                  {t("titleGrad")}
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-lead text-muted-foreground leading-relaxed max-w-[64ch]">
                {t("lead")}
              </p>
            </Reveal>
          </div>
        </section>

        {/* History / Partner Section */}
        <section className="py-24 lg:py-32 bg-background kq-band kq-band--curve-b">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Reveal>
                <MediaSlot label={t("h2")} aspectRatio="4/3" className="shadow-lift" shapeVariant="sweep-r" />
              </Reveal>
              <Reveal delay={0.12}>
                <div className="text-start flex flex-col gap-6">
                  <Eyebrow>{t("eyebrow")}</Eyebrow>
                  <h2 className="text-h2 font-heading font-extrabold tracking-tight text-foreground leading-snug">
                    {t("h2")}
                  </h2>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {t("p1")}
                  </p>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {t("p2")}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Values / Policies Section */}
        <section className="py-20 bg-background border-b border-card-border">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-start">
              <SectionHead
                eyebrow={t("polEyebrow")}
                title={t("polTitle")}
                lead={t("polLead")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {cards.map((c, i) => {
                const Icon = POLICY_ICONS[i] as React.ComponentType<{ className?: string }>;
                return (
                  <Reveal key={c.t} delay={i * 0.08}>
                    <Card className="h-full flex flex-col gap-4 text-start p-8">
                      <div className="w-12 h-12 rounded-[14px] grid place-items-center bg-primary-soft text-primary shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading font-bold text-xl text-foreground">
                        {c.t}
                      </h3>
                      <p className="text-body text-muted-foreground leading-relaxed">
                        {c.d}
                      </p>
                    </Card>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Brand System Info Section */}
        <section className="py-20 bg-background">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
              <Reveal>
                <div className="text-start flex flex-col gap-6">
                  <SectionHead
                    eyebrow={t("genauEyebrow")}
                    title={t("genauTitle")}
                    lead={t("genauLead")}
                  />
                  <ul className="flex flex-col gap-4 mt-2">
                    {points.map((p, idx) => (
                      <li key={idx} className="flex gap-3 items-center text-body text-muted-foreground">
                        <span className="text-accent shrink-0">
                          <Check className="w-5 h-5 font-bold" />
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <Card tint className="text-start p-8 flex flex-col gap-6">
                  <div className="w-12 h-12 rounded-[14px] grid place-items-center bg-primary-soft text-primary shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                      {t("certTitle")}
                    </h3>
                    <p className="text-body text-muted-foreground leading-relaxed">
                      {t("certText")}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-card-border/50">
                    {["ISO 9001:2015", "ISO 14001:2015", "ISO 50001:2018"].map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center text-[13.5px] font-semibold px-4 py-2 rounded-full border border-card-border bg-card text-foreground select-none"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </Card>
              </Reveal>
            </div>
          </div>
        </section>
        {/* Deep Content am Ende der Unternehmens-Seite */}
        <AboutDeep />
      </div>
    </>
  );
}
