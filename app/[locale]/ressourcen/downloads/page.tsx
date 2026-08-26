import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { wrapGraph, getWebPageGraphNode, getBreadcrumbGraphNode } from '@/lib/seo/schema';
import { getBaseUrl } from '@/lib/env';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { FileText, ShieldCheck, Layers, Ruler } from '@/components/ui/icon';
import { CTABand } from '@/components/ui/CTABand';
import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import DocumentDownloads from '@/components/bim/DocumentDownloads';

/* Das Download-Center.
 *
 * Dieses Verzeichnis lag leer im Baum, und drei Weiterleitungen schoben jeden
 * Aufruf auf die Ausschreibungsseite ab — auf der ebenfalls keine Datei liegt.
 * Zugleich stand unter `resources.downloads` seit jeher eine vollstaendig
 * uebersetzte Seite, die keine Route gelesen hat.
 *
 * Beides ist damit erledigt: die Seite gibt es, die Weiterleitungen sind
 * aufgeloest, und die Dateiliste kommt aus dem Dateisystem statt aus einer
 * gepflegten Aufzaehlung mit erfundenen Groessenangaben.
 *
 * Der Abschnitt `files` des Namensraums bleibt bewusst ungenutzt: er zaehlt
 * sechs Dateien auf, von denen vier nicht existieren, darunter eine
 * „BIM/Revit Bibliothek, ZIP, 850 MB". Ihn zu rendern hiesse, die Zusage zu
 * wiederholen. Was es wirklich gibt, listet `DocumentDownloads`.
 */

const PATH = '/ressourcen/downloads';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'resources.downloads' });
  return constructMetadata({
    title: t('meta.title'),
    description: t('meta.desc'),
    path: PATH,
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'resources.downloads' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const siteUrl = getBaseUrl().replace(/\/+$/, '');
  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: PATH,
      type: 'CollectionPage',
      name: t('meta.title'),
      description: t('meta.desc'),
      breadcrumbId: `${siteUrl}/${locale}${PATH}#breadcrumb`,
      mainEntityId: `${siteUrl}/#organization`,
    }),
    getBreadcrumbGraphNode(locale, [
      {
        name:
          tNav('home') ||
          (locale === 'de' ? 'Startseite' : locale === 'ar' ? 'الرئيسية' : 'Home'),
        path: '/',
      },
      { name: t('title'), path: PATH },
    ]),
  ]);

  const deepDive = [0, 1, 2, 3].map((i) => ({
    title: t(`sticky.items.${i}.title`),
    description: t(`sticky.items.${i}.desc`),
    content: <PremiumAssetPlaceholder label={t(`sticky.items.${i}.title`)} />,
  }));

  const bentoIcons = [
    <FileText key="0" className="w-8 h-8 text-primary" />,
    <ShieldCheck key="1" className="w-8 h-8 text-primary" />,
    <Layers key="2" className="w-8 h-8 text-primary" />,
    <Ruler key="3" className="w-8 h-8 text-primary" />,
  ];

  return (
    <>
      <JsonLd schema={jsonLd} />
      <div className="sr-only">{t('meta.title')}</div>
      <div className="flex flex-col w-full min-h-screen bg-background">
        <ParallaxHero
          eyebrow={t('hero.eyebrow')}
          title={
            <>
              {t('hero.title1')}
              <br />
              <span className="text-muted-foreground">{t('hero.title2')}</span>
            </>
          }
          description={t('hero.desc')}
        >
          <div className="flex flex-wrap gap-4 mt-12 justify-center lg:justify-start">
            <Button variant="primary" size="lg" href="#dokumente">
              {t('hero.cta2')}
            </Button>
            <Button variant="ghost" size="lg" href="/projektanfrage">
              {t('hero.cta1')}
            </Button>
          </div>
        </ParallaxHero>

        {/* Die Dateien — der Zweck dieser Seite */}
        <section
          id="dokumente"
          className="py-32 md:py-40 bg-card border-y border-card-border scroll-mt-24"
        >
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="max-w-3xl mb-16">
              <SectionHead
                eyebrow={t('files.eyebrow')}
                title={t('files.title')}
                lead={t('files.lead')}
                align="left"
              />
            </div>
            <DocumentDownloads locale={locale} />
          </div>
        </section>

        {/* Was in den Unterlagen steht */}
        <section className="bg-background">
          <StickyScrollReveal content={deepDive} />
        </section>

        {/* Übersicht */}
        <section className="py-32 md:py-48 bg-card kq-band kq-band--slant-b relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--primary-soft)_0%,transparent_70%)] opacity-20 pointer-events-none" />
          <div className="mx-auto max-w-[1400px] px-6 relative z-10">
            <div className="max-w-3xl mb-20">
              <SectionHead
                eyebrow={t('bento.eyebrow')}
                title={t('bento.title')}
                lead={t('bento.lead')}
                align="left"
              />
            </div>
            <BentoGrid>
              {[0, 1, 2, 3].map((i) => (
                <BentoGridItem
                  key={i}
                  title={t(`bento.items.${i}.title`)}
                  description={t(`bento.items.${i}.desc`)}
                  icon={bentoIcons[i]}
                  colSpan={i === 0 || i === 3 ? 2 : 1}
                  className="bg-background/50 backdrop-blur-sm"
                />
              ))}
            </BentoGrid>
          </div>
        </section>

        {/* Methodik */}
        <section className="py-32 md:py-48 bg-background border-y border-card-border">
          <div className="mx-auto max-w-[1200px] px-6">
            <SectionHead
              eyebrow={t('methodology.subtitle')}
              title={t('methodology.title')}
              align="left"
            />
            <div className="max-w-3xl mt-10 space-y-8 text-lg text-muted-foreground leading-relaxed font-light">
              <p>{t('methodology.p1')}</p>
              <p>{t('methodology.p2')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 max-w-3xl">
              {[1, 2].map((n) => (
                <div
                  key={n}
                  className="p-8 bg-card border border-card-border rounded-2xl"
                >
                  <div className="font-heading font-extrabold text-3xl text-primary mb-3">
                    {t(`methodology.card${n}.title`)}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`methodology.card${n}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 bg-background">
          <div className="mx-auto max-w-[1400px] px-6">
            <CTABand>
              <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
                {t('cta.title')}
              </h2>
              <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[700px] mt-6 mb-10">
                {t('cta.desc')}
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <Button variant="inverse" size="lg" href="#dokumente">
                  {t('files.title')}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  href="/projektanfrage"
                  className="text-inverse-foreground border-inverse-foreground/20 hover:bg-inverse-foreground hover:text-foreground"
                >
                  {t('cta.btn')}
                </Button>
              </div>
            </CTABand>
          </div>
        </section>
      </div>
    </>
  );
}
