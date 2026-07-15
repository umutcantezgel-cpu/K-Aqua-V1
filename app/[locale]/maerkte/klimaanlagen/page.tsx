import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Thermometer, Shield, Globe, Ruler, Droplet, Factory, Wrench, Layers, Award } from '@/components/ui/icon';
import { CTABand } from '@/components/ui/CTABand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'markets.klimaanlagen' });
  return constructMetadata({
    title: t('metaTitle'),
    description: t('metaDesc'),
    path: "/maerkte/klimaanlagen",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'markets.klimaanlagen' });  return (
    <div className="flex flex-col w-full min-h-screen bg-background selection:bg-primary/20">

      {/* 6) Technical Specifications Deep Dive */}
      <section className="py-32 bg-background relative z-10">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col gap-8 order-2 lg:order-1">
              <PremiumAssetPlaceholder label="Chiller Plant Installation" className="min-h-[600px]" />
            </div>
            <div className="flex flex-col gap-8 order-1 lg:order-2">
              <span className="font-heading font-bold text-sm tracking-widest uppercase text-primary">
                {t('section3Eyebrow')}
              </span>
              <h2 className="text-4xl lg:text-5xl font-heading font-extrabold tracking-tight">
                {t('section3Title')}
              </h2>
              <div className="text-lg text-muted-foreground leading-relaxed space-y-6">
                <p>
                  {t('section3P1')}
                </p>
                <p>
                  {t('section3P2')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <Card className="p-6 bg-card border border-card-border hover:border-primary/50 transition-colors">
                  <Factory className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-heading font-bold text-xl mb-2">{t('card1Title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('card1Desc')}</p>
                </Card>
                <Card className="p-6 bg-card border border-card-border hover:border-primary/50 transition-colors">
                  <Wrench className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-heading font-bold text-xl mb-2">{t('card2Title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('card2Desc')}</p>
                </Card>
                <Card className="p-6 bg-card border border-card-border hover:border-primary/50 transition-colors">
                  <Globe className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-heading font-bold text-xl mb-2">{t('card3Title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('card3Desc')}</p>
                </Card>
                <Card className="p-6 bg-card border border-card-border hover:border-primary/50 transition-colors">
                  <Award className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-heading font-bold text-xl mb-2">{t('card4Title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('card4Desc')}</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7) Final CTA Band */}
      <section className="py-32 bg-background relative z-10 border-t border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('ctaTitle')}
            </h2>
            <p className="text-xl text-inverse-foreground/80 leading-relaxed max-w-2xl mt-6">
              {t('ctaDesc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Button variant="inverse" size="lg" href="/projektanfrage" className="px-8 py-6 text-lg font-bold">
                {t('ctaBtn1')}
              </Button>
              <Button variant="ghost" size="lg" href="/ressourcen/downloads" className="px-8 py-6 text-lg text-inverse-foreground hover:bg-inverse-foreground/10 border border-inverse-foreground/20">
                {t('ctaBtn2')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
