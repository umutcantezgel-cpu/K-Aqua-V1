import React from 'react';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';
import { wrapGraph, getWebPageGraphNode, getBreadcrumbGraphNode, getWebApplicationGraphNode } from '@/lib/seo/schema';
import { getBaseUrl } from '@/lib/env';
import JsonLd from '@/components/seo/JsonLd';
import { Box, Layers, ShieldCheck } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  return constructMetadata({
    title: locale === 'de' 
      ? 'K-Aqua 3D Studio — Alle 70 Produkte interaktiv in CAD' 
      : 'K-Aqua 3D Studio — All 70 Products Interactive in CAD',
    description: locale === 'de'
      ? 'Interaktiver 3D CAD-Showroom für alle 70 K-Aqua PP-R & PP-RCT Produkte: 360° Drehen, Bemaßung, Halbschnitt, Explosionsansicht & OBJ/GLTF Export.'
      : 'Interactive 3D CAD showroom for all 70 K-Aqua PP-R & PP-RCT products: 360° rotation, dimensioning, cross-section, explode view & OBJ/GLTF export.',
    path: '/3d',
    locale,
  });
}

export default async function ThreeDShowroomPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const siteUrl = getBaseUrl().replace(/\/+$/, '');
  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: '/3d',
      type: 'ItemPage',
      name: 'K-Aqua 3D CAD Showroom',
      description: 'Alle 70 K-Aqua PP-R Produkte als interaktive maßhaltige 3D-CAD-Modelle in Echtzeit.',
      breadcrumbId: `${siteUrl}/${locale}/3d#breadcrumb`,
    }),
    getWebApplicationGraphNode({
      locale,
      path: '/3d',
      name: 'K-Aqua 3D CAD Showroom & Viewer',
      description: 'Interaktive CAD-Präzisionsmodelle, Bemaßung und OBJ/GLTF Export für alle 70 K-Aqua Produkte.',
      applicationCategory: 'EngineeringTool',
    }),
    getBreadcrumbGraphNode(locale, [
      { name: 'K-Aqua', path: '' },
      { name: '3D Studio', path: '3d' },
    ]),
  ]);

  return (
    <main className="flex flex-col w-full min-h-screen bg-background text-foreground">
      <JsonLd schema={jsonLd} />

      {/* Hero Header */}
      <section className="relative pt-28 pb-12 px-6 border-b border-card-border bg-gradient-to-b from-background-subtle to-background">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-heading font-bold mb-4">
              <Box className="w-4 h-4" />
              <span>3D CAD ECHTHEITS-STUDIO</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-foreground tracking-tight">
              {locale === 'de' ? 'K-Aqua 3D Produkt-Showroom' : 'K-Aqua 3D Product Showroom'}
            </h1>
            <p className="text-muted-foreground mt-3 max-w-2xl text-base sm:text-lg leading-relaxed">
              {locale === 'de' 
                ? 'Erkunden Sie alle 70 K-Aqua PP-R & PP-RCT Rohrleitungsprodukte, Fittings, Ventile und Schweißmaschinen in maßhaltiger 3D-Präzision.'
                : 'Explore all 70 K-Aqua PP-R & PP-RCT piping products, fittings, valves, and welding equipment in precise 3D dimensions.'}
            </p>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-2 text-xs font-mono text-muted-foreground shrink-0">
            <span className="px-3 py-1.5 rounded-lg bg-card border border-card-border flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" /> 100% DIN/ISO Maßhaltig
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-card border border-card-border flex items-center gap-1.5 shadow-sm">
              <Layers className="w-3.5 h-3.5 text-primary" /> Halbschnitt &amp; Bemaßung
            </span>
          </div>
        </div>
      </section>

      {/* 3D Full Studio Frame */}
      <section className="w-full flex-1 p-4 sm:p-6 lg:p-8 bg-background">
        <div className="max-w-[1400px] mx-auto h-[82vh] rounded-3xl overflow-hidden border-2 border-card-border shadow-2xl bg-card relative">
          <iframe
            src="/api/3d-view/galerie"
            title="K-Aqua 3D Interaktive Galerie"
            className="w-full h-full border-0 bg-card"
            allow="fullscreen"
          />
        </div>
      </section>

      {/* Quick Navigation Footer */}
      <section className="py-12 px-6 border-t border-card-border bg-background-subtle">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-start">
          <div>
            <h3 className="font-heading font-bold text-foreground text-lg">
              {locale === 'de' ? 'Benötigen Sie CAD/BIM-Daten für Ihre Planung?' : 'Need CAD/BIM data for engineering?'}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {locale === 'de' 
                ? 'Exportieren Sie GLTF/OBJ direkt aus dem 3D-Viewer oder fordern Sie Ausschreibungstexte an.'
                : 'Export GLTF/OBJ directly from the 3D viewer or request tender specifications.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/produkte"
              className="px-5 py-2.5 rounded-xl bg-card border border-card-border hover:bg-background text-foreground text-sm font-semibold transition-colors"
            >
              {locale === 'de' ? 'Produktkatalog' : 'Product Catalog'}
            </Link>
            <Link
              href="/projektanfrage"
              className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover text-sm font-semibold shadow-diffuse transition-all"
            >
              {locale === 'de' ? 'Projekt anfragen' : 'Request Quote'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
