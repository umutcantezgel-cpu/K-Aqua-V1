import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'products.pipes.meta' });
  return constructMetadata({
    title: t('title'),
    description: t('desc'),
    path: "/produkte/pipes",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products.pipes' });
  const tSeo = await getTranslations({ locale, namespace: "products.seoArticle.pipes" });
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

      {/* CTA Band */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[600px]">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="inverse" href="/projektanfrage">
                {t('cta.primary')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    
      {/* Category Guide Section */}
      {tSeo.has("guideText") && (
        <section className="py-20 bg-background border-t border-card-border" data-nosnippet="true">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="max-w-3xl mx-auto text-left mb-12">
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <div dangerouslySetInnerHTML={{ __html: String(tSeo.raw("guideText")).replace(/<h1/g, '<h2').replace(/<\/h1>/g, '</h2>') }} />
              </div>
            </div>
          </div>
        </section>
      )}
</div>
  );
}
