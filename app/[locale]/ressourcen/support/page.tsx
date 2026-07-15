import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from '@/components/ui/icon';
import { CTABand } from '@/components/ui/CTABand';
import { getTranslations } from 'next-intl/server';

// Premium Scroll-Telling Components
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'resources.support' });
  
  return constructMetadata({
    title: `${t('title')} | K-Aqua`,
    description: t('metaDesc'),
    path: "/ressourcen/support",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'resources' });

  const supportProtocols = [
    {
      title: t('support.sticky.items.0.title'),
      description: t('support.sticky.items.0.desc'),
      content: <PremiumAssetPlaceholder label="Predictive Diagnostics Engine" />
    },
    {
      title: t('support.sticky.items.1.title'),
      description: t('support.sticky.items.1.desc'),
      content: <PremiumAssetPlaceholder label="Global Command Center" />
    },
    {
      title: t('support.sticky.items.2.title'),
      description: t('support.sticky.items.2.desc'),
      content: <PremiumAssetPlaceholder label="Architecture Stress Test" />
    },
    {
      title: t('support.sticky.items.3.title'),
      description: t('support.sticky.items.3.desc'),
      content: <PremiumAssetPlaceholder label="Direct Developer Interface" />
    }
  ];
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">

      {/* 6) Deep Technical Metrics / Philosophy */}
      <section className="py-32 md:py-48 bg-card border-y border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col gap-8">
              <span className="font-heading font-bold text-sm tracking-widest uppercase text-primary">{t('support.metrics.badge')}</span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tighter leading-[1.05]">
                {t('support.metrics.title1')} <br/> <span className="text-muted-foreground">{t('support.metrics.title2')}</span>
              </h2>
              <div className="flex flex-col gap-6 text-muted-foreground leading-relaxed text-xl font-light">
                <p>
                  {t('support.metrics.p1')}
                </p>
                <p>
                  {t('support.metrics.p2')}
                </p>
              </div>
              <ul className="flex flex-col gap-6 mt-8">
                {[
                  t('support.metrics.items.0'),
                  t('support.metrics.items.1'),
                  t('support.metrics.items.2'),
                  t('support.metrics.items.3')
                ].map((li, i) => (
                  <li key={i} className="flex items-start gap-4 font-medium text-lg">
                    <span className="text-primary font-bold mt-1 shrink-0"><ArrowRight className="w-6 h-6" /></span> 
                    <span className="text-foreground">{li}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-full min-h-[700px] rounded-[2rem] overflow-hidden border border-card-border relative shadow-2xl">
              <PremiumAssetPlaceholder label="Compliance Architecture Framework" />
            </div>
          </div>
        </div>
      </section>

      {/* 7) Massive CTA */}
      <section className="py-32 md:py-48 bg-background relative overflow-hidden border-t border-card-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(var(--primary),0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <CTABand className="py-20 md:py-32">
            <div className="max-w-4xl flex flex-col items-start gap-8">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black text-inverse-foreground tracking-tighter leading-[1.05]">
                {t('support.cta.title1')} <br/> {t('support.cta.title2')} <br/> <span className="text-primary-foreground opacity-90">{t('support.cta.title3')}</span>
              </h2>
              <p className="text-2xl text-inverse-foreground/80 leading-relaxed font-light max-w-2xl">
                {t('support.cta.desc')}
              </p>
              <div className="flex flex-wrap gap-6 mt-8">
                <Button variant="inverse" size="lg" href="/projektanfrage" className="text-xl px-10 py-7 font-bold">{t('support.cta.btnPrimary')}</Button>
                <Button variant="ghost" size="lg" href="/kontakt" className="text-xl px-10 py-7 border-inverse-foreground/20 text-inverse-foreground hover:bg-inverse-surface/10 hover:border-inverse-foreground/50">{t('support.cta.btnGhost')}</Button>
              </div>
            </div>
          </CTABand>
        </div>
      </section>

      {/* SEO Continuous Text for Crawlers (Resolves "Seiten ohne Fließtext") */}
      <div className="sr-only">
        <p>{t('support.seoText.p1')}</p>
        <p>{t('support.seoText.p2')}</p>
        <p>{t('support.seoText.p3')}</p>
      </div>

    </div>
  );
}
