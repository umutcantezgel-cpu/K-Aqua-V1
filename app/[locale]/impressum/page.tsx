import React from "react";
import { getTranslations } from "next-intl/server";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { LegalContent } from "@/components/sections/LegalContent";
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import { SeoExpand } from "@/components/seo/SeoExpand";
import type { Metadata } from "next";
import { setRequestLocale } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal.impressum" });
  
  let description = `${t("title")} - K-Aqua`;
  if (locale === "de") description = "Impressum und rechtliche Pflichtangaben der KWT GmbH (K-Aqua) in Waldsolms. Geschäftsführung, Handelsregister und Kontaktdaten.";
  else if (locale === "en") description = "Legal notice and mandatory information of KWT GmbH (K-Aqua) in Waldsolms, Germany. Management, trade register and contact details.";
  else if (locale === "ar") description = "الإشعار القانوني والمعلومات الإلزامية لشركة KWT GmbH (K-Aqua) في فالدزولمس. الإدارة والسجل التجاري وبيانات الاتصال.";

  const baseMetadata = constructMetadata({
    title: t("title"),
    description,
    path: "/impressum",
    locale,
  });
  return {
    ...baseMetadata,
    robots: { index: false, follow: false }
  };
}

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;
  const jsonLd = await getWebPageJsonLd(locale, "legal.impressum");
  const t = await getTranslations({ locale, namespace: "legal.impressum" });

  const title = t("title");
  const sections = t.raw("sections") as { title: string; icon: string; content: string }[];
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
              <h1 className="text-h1 font-heading font-extrabold tracking-tight text-foreground leading-[1.1] mt-4 mb-4">
                {title}
              </h1>
              <p className="text-lead text-muted-foreground leading-relaxed max-w-[64ch] font-normal mb-6">
                {tLegal("seoH1_imprint") || `Impressum von K-Aqua: Rechtliche Hinweise und Anbieterkennzeichnung`}
              </p>
              <p className="sr-only">{title} {tLegal("seoH1_imprint") || `Impressum von K-Aqua: Rechtliche Hinweise und Anbieterkennzeichnung`}</p>
            </Reveal>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="max-w-[1200px] mx-auto px-6">
            <LegalContent sections={sections} title={tLegal("toc")} />
          </div>
        </section>
        <SeoExpand pageType="impressum" />
      </div>
    </>
  );
}
