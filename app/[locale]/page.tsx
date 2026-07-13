/* eslint-disable react/jsx-no-literals */
import React from 'react';
import { getTranslations } from 'next-intl/server';
import { ArrowRight } from '@/components/ui/icon';
import { Button } from '@/components/ui/Button';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { Card } from '@/components/ui/Card';
import { StatNumber } from '@/components/ui/StatNumber';
import { MediaSlot } from '@/components/ui/MediaSlot';
import { CTABand } from '@/components/ui/CTABand';
import { SectionHead } from '@/components/ui/SectionHead';
import HeroScrolly from '@/components/sections/HeroScrolly';
import HomeBuyers from '@/components/sections/HomeBuyers';
import { HomeDeep } from "@/components/sections/HomeDeep";
import { ExportGlobe } from '@/components/ui/ExportGlobe';
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';
import type { Metadata } from 'next';

const DOT = '•';
const SPACE = ' ';

const toolItems = [
  { id: 'finder', href: '/produkte', span: 2, tint: true },
  { id: 'co2', href: '/co2-rechner', span: 1, tint: false },
  { id: 'academy', href: '/academy', span: 1, tint: false },
  { id: 'references', href: '/referenzen', span: 1, tint: true },
  { id: 'trust', href: '/trust-center', span: 1, tint: false },
  { id: 'career', href: '/karriere', span: 3, tint: false },
];

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const title = `${t("h1a")} ${t("h1b")}`;
  const description = t("lead");
  return constructMetadata({
    title,
    description,
    path: "/",
    locale,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const tHome = await getTranslations({ locale, namespace: 'home' });
  const tHomex = await getTranslations({ locale, namespace: 'homex' });

  // 2) Marquee-Band
  const marqueeItems = [
    tHomex('marquee.0'),
    tHomex('marquee.1'),
    tHomex('marquee.2'),
    tHomex('marquee.3'),
    tHomex('marquee.4'),
    tHomex('marquee.5'),
  ];

  const marqueeTrack = (
    <div className="k-marquee-track">
      {marqueeItems.map((item, idx) => (
        <React.Fragment key={idx}>
          <span>{item}</span>
          <span className="dot font-bold text-accent">{DOT}</span>
        </React.Fragment>
      ))}
    </div>
  );

  // 3) Stat Cards
  const stats = [
    {
      value: tHomex('stats.0.n') + tHomex('stats.0.u'),
      label: tHomex('stats.0.l'),
    },
    {
      value: tHomex('stats.1.n') + SPACE + tHomex('stats.1.u'),
      label: tHomex('stats.1.l'),
    },
    {
      value: tHomex('stats.2.n') + tHomex('stats.2.u'),
      label: tHomex('stats.2.l'),
    },
    {
      value: tHomex('stats.3.n') + tHomex('stats.3.u'),
      label: tHomex('stats.3.l'),
    },
  ];

  // 5) Tools Bento
  const tools = toolItems.map((tool, idx) => ({
    ...tool,
    t: tHomex(`tools.${idx}.t`),
    d: tHomex(`tools.${idx}.d`),
    cta: tHomex(`tools.${idx}.cta`),
  }));

  // 6) Branche vs. K-Aqua Comparison
  const vsBadItems = [
    tHomex('vsBad.0'),
    tHomex('vsBad.1'),
    tHomex('vsBad.2'),
    tHomex('vsBad.3'),
  ];

  const vsGoodItems = [
    tHomex('vsGood.0'),
    tHomex('vsGood.1'),
    tHomex('vsGood.2'),
    tHomex('vsGood.3'),
  ];

  // 7) Corporate Bento
  const qualityCards = [
    { t: tHomex('cards.0.t'), d: tHomex('cards.0.d') },
    { t: tHomex('cards.1.t'), d: tHomex('cards.1.d') },
    { t: tHomex('cards.2.t'), d: tHomex('cards.2.d') },
  ];

  const webPageJsonLd = await getWebPageJsonLd(locale, "home");

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <JsonLd schema={webPageJsonLd} />
      {/* 1) Hero (Hero-Scrollytelling) */}
      <HeroScrolly />

      {/* 2) Marquee-Band */}
      <section className="w-full bg-background select-none relative">
        <div className="k-marquee py-4">
          {marqueeTrack}
          {marqueeTrack}
          {marqueeTrack}
          {marqueeTrack}
        </div>
        <div className="ka-lightrays absolute bottom-0 left-0 w-full" data-count="9" style={{height: '140px'}}></div>
      </section>

      {/* 3) 4 Stat-Cards */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <Card key={idx}>
                <StatNumber value={stat.value} label={stat.label} />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4) Home Buyers Sektion */}
      <HomeBuyers />

      {/* 5) Tools Bento */}
      <section className="py-24 lg:py-32 bg-background kq-band kq-band--slant-b">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={tHome('toolsEyebrow')}
            title={
              <>
                {tHome('toolsTitle1')}
                {SPACE}
                <span className="text-primary">{tHome('toolsTitle2')}</span>
              </>
            }
            lead={tHome('toolsLead')}
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {tools.map((tool) => (
              <Card key={tool.id} span={tool.span} tint={tool.tint} className="justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xl mb-3 text-foreground">
                    {tool.t}
                  </h3>
                  <p className="text-body text-muted-foreground leading-relaxed mb-6">
                    {tool.d}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  href={tool.href}
                  className="w-full justify-between mt-auto"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  {tool.cta}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6) "Branche vs. K-Aqua"-Vergleich */}
      <section className="py-24 lg:py-32 bg-background kq-band kq-band--curve-b">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={tHomex('vsEyebrow')}
            title={tHomex('vsTitle')}
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Bad Industry Standard */}
            <div className="bg-card border border-card-border rounded-xl p-8 flex flex-col gap-6">
              <h3 className="font-heading font-bold text-xl text-muted-foreground border-b border-card-border pb-4">
                {tHomex('vsBadTitle')}
              </h3>
              <ul className="flex flex-col gap-4">
                {vsBadItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-body text-muted-foreground">
                    <span className="text-red-500 font-bold shrink-0">{'×'}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Good K-Aqua */}
            <div className="bg-card border border-primary/20 rounded-xl p-8 flex flex-col gap-6 shadow-diffuse relative overflow-hidden">
              <div className="absolute top-0 start-0 w-1.5 h-full bg-primary" />
              <h3 className="font-heading font-bold text-xl text-primary border-b border-card-border pb-4">
                {tHomex('vsGoodTitle')}
              </h3>
              <ul className="flex flex-col gap-4">
                {vsGoodItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-body font-medium">
                    <span className="text-primary font-bold shrink-0">{'+'}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7) Unternehmens-Bento */}
      <section className="py-24 lg:py-32 bg-background kq-band kq-band--dune">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={tHomex('coEyebrow')}
            title={
              <>
                {tHomex('coTitle1')}
                <br />
                <span className="text-primary">{tHomex('coTitle2')}</span>
              </>
            }
            lead={tHomex('coLead')}
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* K-Aqua Manifest */}
            <Card span={2} className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="flex-1 flex flex-col gap-4 text-start">
                <h3 className="font-heading font-bold text-xl text-foreground">
                  {tHomex('manifestTitle')}
                </h3>
                <p className="text-body text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {tHomex('manifestText')}
                </p>
                <div className="mt-2">
                  <Button variant="ghost" href="/unternehmen">
                    {tHomex('kesselCta')}
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-1/3 shrink-0">
                <MediaSlot label={tHomex('manifestTitle')} aspectRatio="4/3" shapeVariant="sweep-r" />
              </div>
            </Card>

            {/* World References */}
            <Card span={1} className="flex flex-col justify-between">
              <div className="flex flex-col gap-4 text-start">
                <h3 className="font-heading font-bold text-xl text-foreground">
                  {tHomex('worldTitle')}
                </h3>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {tHomex('worldText')}
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-4">
                <MediaSlot label={tHomex('worldTitle')} aspectRatio="16/9" shapeVariant="sweep-l" />
                <Button
                  variant="ghost"
                  href="/referenzen"
                  className="w-full justify-between"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  {tHomex('worldCta')}
                </Button>
              </div>
            </Card>
          </div>

          {/* Quality Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {qualityCards.map((card, idx) => (
              <Card key={idx}>
                <h4 className="font-heading font-bold text-lg text-foreground mb-2">
                  {card.t}
                </h4>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {card.d}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7.5) Deep Content Home */}
      <HomeDeep />

      {/* 7.6) Export- & Handelsrouten Globus */}
      <section className="py-24 lg:py-32 bg-background kq-band kq-band--slant-t overflow-hidden relative">
        <div className="mx-auto max-w-[1400px] px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 z-10">
            <SectionHead
              eyebrow="Global Reach"
              title={
                <>
                  Internationale <span className="text-primary">Handelsrouten</span>
                </>
              }
              lead="Von Deutschland in die Welt: Unsere K-Aqua Rohrsysteme sind das Rückgrat der modernsten Megaprojekte weltweit. Von NEOM in Saudi-Arabien bis zu hochkomplexen Industrieanlagen in Singapur."
              align="left"
            />
            <div className="flex flex-col gap-4 mt-4 border-s-2 border-primary/20 ps-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">HQ & Produktion</span>
                <span className="text-lg font-heading text-foreground">Deutschland (Frankfurt)</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Key Export Markets</span>
                <span className="text-lg font-heading text-foreground">Saudi-Arabien (NEOM), VAE, Katar, Lateinamerika</span>
              </div>
            </div>
            <Button variant="ghost" href="/referenzen" icon={<ArrowRight className="w-4 h-4" />} className="w-max mt-4">
              Weltweite Projekte entdecken
            </Button>
          </div>
          <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
            {/* The Globe handles its own glowing and styling */}
            <ExportGlobe className="w-full max-w-[600px] absolute scale-110 lg:scale-[1.3] translate-x-[10%] lg:translate-x-[20%]" />
          </div>
        </div>
      </section>

      {/* 8) CTA-Band */}
      <section className="py-20 bg-background border-t border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {tHome('bandTitle')}
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[560px]">
              {tHome('bandLead')}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <ButtonPrimary href="/projektanfrage">
                {tHome('bandBtn')}
              </ButtonPrimary>
              <Button
                variant="ghost"
                className="text-inverse-foreground border-inverse-foreground/20 hover:bg-inverse-foreground/10"
                href="/downloads"
              >
                {tHome('bandBtn2')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>
    </div>
  );
}
