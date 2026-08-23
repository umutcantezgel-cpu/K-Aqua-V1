import React from 'react';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import pick from 'lodash/pick';
import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';
import { wrapGraph, getWebPageGraphNode, getBreadcrumbGraphNode, getWebApplicationGraphNode } from '@/lib/seo/schema';
import { getBaseUrl } from '@/lib/env';
import JsonLd from '@/components/seo/JsonLd';
import { Box, Layers, ShieldCheck } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import Native3DShowroom from '@/components/3d/Native3DShowroom';

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
      {/* `viewer3d` versorgt Native3DShowroom:39 und Native3DCanvas:78 — jede
          Beschriftung, jeder Tooltip und jeder Fehlertext des Viewers. */}
      <NextIntlClientProvider messages={pick(await getMessages(), ['viewer3d'])}>
        <Native3DShowroom locale={locale} />
      </NextIntlClientProvider>
    </main>
  );
}
