import React from "react";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Check, Download, MapPin } from "@/components/ui/icon";
import { NewsDeep } from "@/components/sections/NewsDeep";
import { constructMetadata, getArticleJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("news") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/news",
    locale,
  });
}

const CERT_DE_URL = "https://www.k-aqua.de/PDF/KWT%20Zertifikat%20Deutsch.pdf";
const CERT_EN_URL = "https://www.k-aqua.de/PDF/KWT%20Zertifikate%20English.pdf";
const DASH = " — ";

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const jsonLd = await getArticleJsonLd(locale, "news");
  const t = await getTranslations({ locale, namespace: "news" });

  const iso = t.raw("iso") as string[][];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  
  return (
    <>
      <JsonLd schema={jsonLd} />
      <div className="flex flex-col w-full min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-20 border-b border-card-border">
          <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
          <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
            <Reveal>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="text-h1 font-heading font-extrabold tracking-tight mt-4 mb-6 text-foreground leading-[1.1]">
                {t("title1")}{" "}
                <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">
                  {t("titleGrad")}
                </span>
              </h1>
            </Reveal>
          </div>
        </section>

        {/* News Content Section */}
        <section className="py-20 bg-background">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 items-start">
              {/* Primary News Release */}
              <Reveal>
                <Card className="p-8 text-start flex flex-col gap-6">
                  <div>
                    <span className="text-[13.5px] font-semibold text-muted-foreground">
                      {t("date")}
                    </span>
                    <h2 className="font-heading font-extrabold text-2xl lg:text-3xl text-foreground mt-2 mb-4 leading-snug">
                      {t("h2")}
                    </h2>
                    <p className="text-body text-muted-foreground leading-relaxed">
                      {t("p")}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {iso.map(([code, label]) => (
                      <li key={code} className="flex gap-3 items-center text-muted-foreground">
                        <span className="text-accent-strong shrink-0">
                          <Check className="w-5 h-5" />
                        </span>
                        <span className="text-body leading-normal">
                          <strong className="text-foreground font-semibold">{code}</strong>
                          {DASH}
                          {label}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Button
                      size="sm"
                      href={CERT_DE_URL}
                      icon={<Download className="w-4 h-4" />}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t("btnDe")}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      href={CERT_EN_URL}
                      icon={<Download className="w-4 h-4" />}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t("btnEn")}
                    </Button>
                  </div>
                </Card>
              </Reveal>

              {/* Sidebar events */}
              <Reveal delay={0.12}>
                <Card tint className="p-8 text-start flex flex-col gap-6">
                  <div className="w-12 h-12 rounded-[14px] grid place-items-center bg-primary-soft text-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                      {t("eventsTitle")}
                    </h3>
                    <p className="text-body text-muted-foreground leading-relaxed">
                      {t("eventsText")}
                    </p>
                  </div>
                </Card>
              </Reveal>
            </div>
          </div>
        </section>
        {/* Deep Content am Ende der News Seite */}
        <NewsDeep />
      </div>
    </>
  );
}
