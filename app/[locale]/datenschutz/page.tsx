import React from "react";
import { getTranslations } from "next-intl/server";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { LegalContent } from "@/components/sections/LegalContent";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.datenschutz" });
  return constructMetadata({
    title: t("title"),
    description: t("title"),
    path: "/datenschutz",
    locale,
  });
}

export default async function DatenschutzPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.datenschutz" });

  const title = t("title");
  const sections = t.raw("sections") as { title?: string; text?: string; content?: string; items?: string[] }[];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": title,
    "url": `${siteUrl}/${locale}/datenschutz`,
  };

  return (
    <>
      <JsonLd schema={webPageSchema} />
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
