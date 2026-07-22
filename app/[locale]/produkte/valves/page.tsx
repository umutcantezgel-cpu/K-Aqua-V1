import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'products.valves' });
  return constructMetadata({
    title: t("metaTitle"),
    description: t("metaDesc"),
    path: "/produkte/valves",
    locale,
  });
}

export default function Page() {
  const t = useTranslations('products.valves');

  const scrollRevealContent = [
    {
      title: t("scroll1Title"),
      description: t("scroll1Desc"),
      content: <PremiumAssetPlaceholder label="Mikrostruktur Analyse" className="w-full h-full bg-card" />
    },
    {
      title: t("scroll2Title"),
      description: t("scroll2Desc"),
      content: <PremiumAssetPlaceholder label="5-Achs CNC Fräsung" className="w-full h-full bg-card" />
    },
    {
      title: t("scroll3Title"),
      description: t("scroll3Desc"),
      content: <PremiumAssetPlaceholder label="CFD Strömungsprofil" className="w-full h-full bg-card" />
    },
    {
      title: t("scroll4Title"),
      description: t("scroll4Desc"),
      content: <PremiumAssetPlaceholder label="Automatisierte Druckprüfung" className="w-full h-full bg-card" />
    }
  ];
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">

      {/* Hero */}
      <section className="pt-24 pb-16 bg-background border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            as="h1"
            eyebrow={t('hero.eyebrow')}
            title={t('hero.title')}
            lead={t('hero.lead')}
            align="center"
            className="mb-0"
          />
        </div>
      </section>

      {/* 7) Final Text Section before CTA */}
      <section className="py-32 lg:py-48 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--primary-soft)_0%,transparent_50%)] opacity-20 pointer-events-none" />
        <div className="mx-auto max-w-[1000px] px-6 relative z-10 text-center">
          <h2 className="text-4xl sm:text-6xl font-heading font-black tracking-tight mb-8" dangerouslySetInnerHTML={{__html: t.raw('finalTitle')}}>
          </h2>
          <p className="text-2xl text-muted-foreground leading-relaxed font-light">
            {t("finalDesc")}
          </p>
        </div>
      </section>

      {/* 8) Final Massive CTA Band */}
      <section className="pb-32 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand className="py-20 px-10 md:px-20 bg-primary rounded-[3rem] text-primary-foreground relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="relative z-10 max-w-3xl flex flex-col gap-8">
              <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight leading-[1.1]">
                {t("ctaTitle")}
              </h2>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed font-light">
                {t("ctaDesc")}
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Button variant="inverse" size="lg" href="/projektanfrage" className="h-14 px-8 text-lg text-primary font-bold">
                  {t("ctaBtnPrimary")}
                </Button>
                <Button variant="ghost" size="lg" href="/ressourcen/ausschreibungstexte" className="h-14 px-8 text-lg border-white text-white hover:bg-white hover:text-primary">
                  {t("ctaBtnSecondary")}
                </Button>
              </div>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
