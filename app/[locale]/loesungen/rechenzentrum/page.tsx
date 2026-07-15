import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from '@/components/ui/icon';
import { CTABand } from '@/components/ui/CTABand';

import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';

import { getTranslations } from "next-intl/server";
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "solutions.rechenzentrum" });
  return constructMetadata({
    title: t('meta.title'),
    description: t('meta.desc'),
    path: "/loesungen/rechenzentrum",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions.rechenzentrum" });  return (
    <div className="flex flex-col w-full min-h-screen bg-background selection:bg-primary/20 selection:text-primary">

      {/* Bottom CTA */}
      <section className="py-32 lg:py-40 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--primary-soft)_0%,transparent_100%)] opacity-20 pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <CTABand>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-inverse-foreground/80 leading-relaxed max-w-[600px]">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Button variant="inverse" size="lg" href="/projektanfrage">
                {t('cta.button')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
