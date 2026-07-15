import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { getTranslations } from 'next-intl/server';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from '@/components/ui/icon';
import { CTABand } from '@/components/ui/CTABand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'academy.glossar.meta' });
  return constructMetadata({
    title: t('title'),
    description: t('desc'),
    path: "/academy/glossar",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'academy.glossar' });
  
  // Data for StickyScrollReveal
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">

      {/* 6) Deep Technical Text / Final Argument */}
      <section className="py-32 bg-background border-t border-card-border">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl lg:text-5xl font-heading font-extrabold tracking-tight mb-12">
            {t('conclusion.title')}
          </h2>
          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
            <p className="mb-6 text-xl" dangerouslySetInnerHTML={{ __html: t.raw('conclusion.p1') }} />
            <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.raw('conclusion.p2') }} />
            <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.raw('conclusion.p3') }} />
            <p dangerouslySetInnerHTML={{ __html: t.raw('conclusion.p4') }} />
          </div>
        </div>
      </section>

      {/* 7) CTA Band */}
      <section className="py-24 bg-card border-t border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('cta.title1')} <br />{t('cta.title2')}
            </h2>
            <p className="text-lg md:text-xl text-inverse-foreground/80 leading-relaxed max-w-[600px] mt-4">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
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
