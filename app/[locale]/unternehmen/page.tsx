import React from "react";
import { getTranslations, getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import pick from 'lodash/pick';
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHead } from "@/components/ui/SectionHead";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
import { Users, Handshake, Leaf, Award, Check } from "@/components/ui/icon";
import { AboutDeep } from "@/components/sections/AboutDeep";
import LiquidHeadline from '@/components/signature/LiquidHeadline';
import { getWebPageJsonLd, constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  const meta = await getTranslations({ locale, namespace: "about.meta" });
  return constructMetadata({
    title: meta("title"),
    description: meta("desc"),
    path: "/unternehmen",
    locale,
  });
}

// TIMELINE_ITEMS moved into component

// STICKY_SCROLL_ITEMS moved into component

const POLICY_ICONS: React.ComponentType<{ className?: string }>[] = [Handshake, Users, Leaf];

export default async function UnternehmenPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const jsonLd = await getWebPageJsonLd(locale, "about");
  const t = await getTranslations({ locale, namespace: "about" });
  const tMeta = await getTranslations({ locale, namespace: "about.meta" });
  const metaTitle = tMeta("title");

  const cards = t.raw("cards") as { t: string; d: string }[];
  const points = t.raw("points") as string[];

  const messages = await getMessages();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  
  return (
    <NextIntlClientProvider messages={pick(messages, ['about', 'homex'])}>
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
              <h1 className="text-h1 font-heading font-extrabold tracking-tight text-foreground leading-[1.1] mt-4 mb-4">
                {t("title1")}{" "}
                <span className="ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-primary to-accent-strong bg-clip-text text-transparent">
                  {t("titleGrad")}
                </span>

              </h1>
              <p className="text-lead text-muted-foreground leading-relaxed max-w-[64ch] font-normal mb-6">
                <span className="font-bold text-foreground">{t("title1")} {t("titleGrad")}</span> &ndash; {t("lead")}
              </p>

            </Reveal>
          </div>
        </section>

        {/* Signature: Liquid Headline */}
        <section className="py-24 bg-background flex justify-center">
          <LiquidHeadline />
        </section>

        {/* History / Partner Section */}
        <section className="py-24 lg:py-32 bg-background kq-band kq-band--curve-b">
          <div className="max-w-[1200px] mx-auto px-6">
            <Reveal>
              <Card className="overflow-hidden border border-card-border p-0 shadow-diffuse group">
                <div className="grid grid-cols-1 lg:grid-cols-[38%_62%] items-stretch">
                  <div className="relative min-h-[300px] h-full lg:h-auto overflow-hidden">
                    <MediaSlot label={t("h2")} className="w-full h-full min-h-[300px] rounded-none border-none" />
                  </div>
                  <div className="p-8 lg:p-16 flex flex-col justify-center text-start bg-card/80 backdrop-blur-sm">
                    <Eyebrow>{t("eyebrow")}</Eyebrow>
                    <h2 className="text-h2 font-heading font-extrabold tracking-tight text-foreground leading-snug mt-6 mb-6">
                      {t("h2")}
                    </h2>
                    <p className="text-body text-muted-foreground leading-relaxed mb-4">
                      {t("p1")}
                    </p>
                    <p className="text-body text-muted-foreground leading-relaxed">
                      {t("p2")}
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* Values / Policies Section */}
        <section className="py-24 bg-background border-b border-card-border">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-start mb-12">
              <SectionHead
                eyebrow={t("polEyebrow")}
                title={t("polTitle")}
                lead={t("polLead")}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-[62%_1fr] gap-6 items-stretch">
              {/* Golden Ratio: 62% for the first card */}
              <Reveal delay={0}>
                <Card tint className="h-full flex flex-col gap-6 text-start p-10 lg:p-12 relative overflow-hidden group">
                  <div className="absolute -top-24 ltr:-right-24 rtl:-left-24 text-[300px] font-heading font-black opacity-[0.03] text-primary select-none group-hover:scale-110 transition-transform duration-1000 ease-out">
                    01
                  </div>
                  <div className="w-16 h-16 rounded-[18px] grid place-items-center bg-primary-soft text-primary shrink-0 relative z-10">
                    {React.createElement(POLICY_ICONS[0]!, { className: "w-8 h-8" })}
                  </div>
                  <div className="relative z-10 mt-auto">
                    <h3 className="font-heading font-bold text-3xl text-foreground mb-4">
                      {cards[0]?.t}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-[80%]">
                      {cards[0]?.d}
                    </p>
                  </div>
                </Card>
              </Reveal>
              
              {/* Remaining 38% split into two smaller stacked cards */}
              <div className="flex flex-col gap-6 h-full">
                {cards.slice(1, 3).map((c, i) => {
                  const Icon = POLICY_ICONS[i + 1]!;
                  const num = i + 2;
                  return (
                    <Reveal key={c.t} delay={0.1 + (i * 0.1)} className="flex-1">
                      <Card className="h-full flex flex-col gap-3 text-start p-8 relative overflow-hidden group hover:border-primary/50 transition-colors">
                        <div className="absolute -bottom-10 ltr:-right-10 rtl:-left-10 text-[140px] font-heading font-black opacity-[0.02] text-primary select-none group-hover:scale-110 transition-transform duration-1000 ease-out">
                          0{num}
                        </div>
                        <div className="w-12 h-12 rounded-[14px] grid place-items-center bg-primary/10 text-primary shrink-0 relative z-10 mb-2">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-heading font-bold text-xl text-foreground relative z-10">
                          {c.t}
                        </h3>
                        <p className="text-body text-muted-foreground leading-relaxed relative z-10">
                          {c.d}
                        </p>
                      </Card>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Brand System Info Section */}
        <section className="py-24 bg-background">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Golden Ratio Grid: 62% content, 38% badge */}
            <div className="grid grid-cols-1 lg:grid-cols-[62%_1fr] gap-12 lg:gap-16 items-center">
              <Reveal>
                <div className="text-start flex flex-col gap-8">
                  <SectionHead
                    eyebrow={t("genauEyebrow")}
                    title={t("genauTitle")}
                    lead={t("genauLead")}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    {points.map((p, idx) => (
                      <div key={idx} className="flex gap-4 items-start p-5 rounded-2xl bg-background-subtle border border-card-border hover:border-primary/30 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary grid place-items-center shrink-0 mt-0.5">
                          <Check className="w-4 h-4 font-bold" />
                        </div>
                        <span className="text-body text-muted-foreground leading-relaxed">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.12} className="h-full">
                <Card tint className="text-start p-10 h-full flex flex-col justify-center gap-8 relative overflow-hidden shadow-diffuse">
                  <div className="absolute -bottom-16 ltr:-right-16 rtl:-left-16 text-[200px] opacity-[0.03] text-primary rotate-12 select-none pointer-events-none">
                    <Award />
                  </div>
                  
                  <div className="w-16 h-16 rounded-[20px] grid place-items-center bg-background shadow-sm text-primary shrink-0 relative z-10 border border-card-border/50">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-heading font-extrabold text-2xl text-foreground mb-3">
                      {t("certTitle")}
                    </h3>
                    <p className="text-body text-muted-foreground leading-relaxed">
                      {t("certText")}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 pt-6 border-t border-card-border/50 relative z-10">
                    {["ISO 9001:2015", "ISO 14001:2015", "ISO 50001:2018"].map((c) => (
                      <div
                        key={c}
                        className="flex items-center justify-between text-sm font-bold px-5 py-3.5 rounded-xl border border-card-border bg-background text-foreground"
                      >
                        <span>{c}</span>
                        <Check className="w-4 h-4 text-primary" />
                      </div>
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
    </NextIntlClientProvider>
  );
}
