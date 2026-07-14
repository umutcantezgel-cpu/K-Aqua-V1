import React from "react";
import { getTranslations } from "next-intl/server";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { LegalContent } from "@/components/sections/LegalContent";
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { setRequestLocale } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal.datenschutz" });
  return constructMetadata({
    title: t("title"),
    description: `${t("title")} - K-Aqua`,
    path: "/datenschutz",
    locale,
  });
}

export default async function DatenschutzPage({ params }: Props) {
  const { locale } = await params;
  const jsonLd = await getWebPageJsonLd(locale, "legal.datenschutz");
  const t = await getTranslations({ locale, namespace: "legal.datenschutz" });

  const title = t("title");
  const sections = t.raw("sections") as { id?: string; title: string; icon?: string; tldr?: string; content: string }[];


  
  return (
    <>
      <JsonLd schema={jsonLd} />
      <div className="flex flex-col w-full min-h-screen bg-background">
        <section className="relative overflow-hidden py-16 lg:py-20 border-b border-card-border">
          <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
          <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
            <Reveal>
              {/* eslint-disable-next-line react/jsx-no-literals */}
              <Eyebrow>Legal</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="text-h1 font-heading font-extrabold tracking-tight mt-4 mb-6 text-foreground leading-[1.1]">
                {title}
              </h1>
            </Reveal>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="max-w-[1200px] mx-auto px-6">
            <LegalContent sections={sections} />
          </div>
        </section>
      </div>
    </>
  );
}
