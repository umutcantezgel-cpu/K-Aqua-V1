import React from 'react';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { setRequestLocale } from 'next-intl/server';
import { 
  Wrench, 
  Thermometer, 
  Shield, 
  Factory, 
  Ruler, 
  Flame,
  Layers
} from '@/components/ui/icon';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'products.tools' });
  return constructMetadata({
    title: t('metaTitle'),
    description: t('metaDesc'),
    path: "/produkte/tools",
    locale,
  });
}

export default function Page() {
  const t = useTranslations('products.tools');  return (
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

      {/* 5) Deep Dive Specs Grid */}
      <section className="py-32 bg-background border-b border-card-border">
         <div className="mx-auto max-w-[1400px] px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="flex flex-col gap-6">
                <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight" dangerouslySetInnerHTML={{ __html: t.raw('specsTitle') }}></h2>
                <div className="flex flex-col gap-4 text-muted-foreground text-lg leading-relaxed mt-4">
                  <p>
                    {t('specsP1')}
                  </p>
                  <p>
                    {t('specsP2')}
                  </p>
                </div>
                <ul className="flex flex-col gap-4 mt-8">
                  {[
                    { title: t('specsList1'), icon: <Shield className="text-primary w-6 h-6" /> },
                    { title: t('specsList2'), icon: <Layers className="text-primary w-6 h-6" /> },
                    { title: t('specsList3'), icon: <Thermometer className="text-primary w-6 h-6" /> }
                  ].map((li, i) => (
                    <li key={i} className="flex items-center gap-4 font-medium text-lg border border-card-border p-4 rounded-xl bg-card">
                      {li.icon}
                      <span>{li.title}</span>
                    </li>
                  ))}
                </ul>
             </div>
             <div className="h-[600px] w-full">
               <PremiumAssetPlaceholder label="K-Aqua Toolkit Pro" />
             </div>
           </div>
         </div>
      </section>

      {/* 6) CTA Band */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('ctaTitle')}
            </h2>
            <p className="text-xl text-inverse-foreground/80 leading-relaxed max-w-[600px] mt-4 mb-8">
              {t('ctaDesc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="inverse" size="lg" href="/projektanfrage">
                {t('ctaBtn')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
