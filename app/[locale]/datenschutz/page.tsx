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

  let description = `${t("title")} - K-Aqua`;
  if (locale === "de") description = "Datenschutzerklärung der KWT GmbH (K-Aqua). Erfahren Sie, wie wir Ihre personenbezogenen Daten gemäß DSGVO schützen und verarbeiten.";
  else if (locale === "en") description = "Privacy policy of KWT GmbH (K-Aqua). Learn how we protect and process your personal data in compliance with GDPR regulations.";
  else if (locale === "ar") description = "سياسة الخصوصية لشركة KWT GmbH (K-Aqua). تعرف على كيفية حماية بياناتك الشخصية ومعالجتها وفقًا للائحة العامة لحماية البيانات.";

  return constructMetadata({
    title: t("title"),
    description,
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
  const tLegal = await getTranslations({ locale, namespace: "legal" });


  
  return (
    <>
      <JsonLd schema={jsonLd} />
      <div className="flex flex-col w-full min-h-screen bg-background">
        <section className="relative overflow-hidden py-16 lg:py-20 border-b border-card-border">
          <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
          <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
            <Reveal>
              <Eyebrow>{tLegal("eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="flex flex-col gap-4 mt-4 mb-6">
                <span className="text-h1 font-heading font-extrabold tracking-tight text-foreground leading-[1.1]">
                  {title}
                </span>
                <span className="text-lead text-muted-foreground leading-relaxed max-w-[64ch] font-normal">
                  {tLegal("seoH1_privacy") || `Datenschutzerklärung von K-Aqua: Transparenz und Sicherheit Ihrer Daten`}
                </span>
              </h1>
            </Reveal>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="max-w-[1200px] mx-auto px-6">
            <LegalContent sections={sections} title={tLegal("toc")} />
          </div>
        </section>
      </div>
    </>
  );
}
