/* eslint-disable react/jsx-no-literals */
import React from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

import { Reveal } from "@/components/ui/Reveal";
import { PremiumAssetPlaceholder } from "@/components/ui/PremiumAssetPlaceholder";
import { SolutionsDeep } from "@/components/sections/SolutionsDeep";
import { ArrowRight, Droplet, Shield, Thermometer, Factory, Layers, Flame, Wrench } from "@/components/ui/icon";
import { setRequestLocale } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "solutions.index" });
  return constructMetadata({
    title: t('meta.title'),
    description: t('meta.desc'),
    path: "/loesungen",
    locale,
  });
}

export default async function LoesungenPage({ params }: Props) {
  const { locale } = await params;
  const jsonLd = await getWebPageJsonLd(locale, "solutions");
  const t = await getTranslations({ locale, namespace: "solutions.index" });

  const stickyItems = t.raw('sticky.items') as Array<{ title: string; p1: string; p2: string }>;
  
  const stickyContent = stickyItems.map((item, index) => ({
    title: item.title,
    description: (
      <div className="space-y-4">
        <p>{item.p1}</p>
        <p>{item.p2}</p>
      </div>
    ),
    content: <PremiumAssetPlaceholder label={item.title} />
  }));
  return (
    <>
      <div className="sr-only">
        <p>{t('meta.title')}</p>
        <p>{t('meta.desc')}</p>
      </div>
      <JsonLd schema={jsonLd} />
      <div className="flex flex-col w-full min-h-screen bg-background">

        {/* Final CTA / Hero */}

        {/* Deep Content am Ende der Lösungsseite */}
        <SolutionsDeep />
      </div>
    </>
  );
}
