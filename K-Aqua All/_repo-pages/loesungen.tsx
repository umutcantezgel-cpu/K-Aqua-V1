import React from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHead } from "@/components/ui/SectionHead";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
import { Leaf, Recycle, Shield, Thermometer, ArrowRight } from "@/components/ui/icon";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("solutions") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/loesungen",
    locale,
  });
}

interface BenefitItem {
  t: string;
  d: string;
}

const BENEFIT_ICONS = [Leaf, Recycle, Shield, Thermometer];

export default async function LoesungenPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions" });

  const benefits = t.raw("benefits") as BenefitItem[];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${t("title1")} ${t("titleGrad")} ${t("title2")}`,
    "description": t("lead"),
    "url": `${siteUrl}/${locale}/loesungen`,
  };

  return (
    <>
      <JsonLd schema={webPageSchema} />
      <div className="flex flex-col w-full min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24 border-b border-card-border">
          <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
          <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
            <Reveal>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="text-h1 font-heading font-extrabold tracking-tight mt-4 mb-6 text-foreground leading-[1.1] text-wrap-balance">
                {t("title1")}{" "}
                <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">
                  {t("titleGrad")}
                </span>{" "}
                {t("title2")}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-lead text-muted-foreground leading-relaxed max-w-[64ch]">
                {t("lead")}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Bento Grid Sektion */}
        <section className="py-20 bg-background border-b border-card-border">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {benefits.map((b, i) => {
                const Icon = BENEFIT_ICONS[i] as React.ComponentType<{ className?: string }>;
                const wide = i === 0 || i === 3;
                const hasImage = i < 3; // Index 0, 1, 2 have images; 3 does not

                return (
                  <Reveal
                    key={b.t}
                    delay={i * 0.08}
                    className={wide ? "md:col-span-4" : "md:col-span-2"}
                  >
                    <Card tint={i === 3} className="h-full flex flex-col justify-between text-start p-8">
                      <div>
                        {hasImage ? (
                          <MediaSlot
                            label={b.t}
                            aspectRatio={wide ? "16/6" : "16/9"}
                            className="mb-6 shadow-sm"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-[14px] grid place-items-center bg-primary-soft text-primary shrink-0 mb-6">
                            <Icon className="w-7 h-7" />
                          </div>
                        )}
                        <div className="flex items-center gap-3 mb-4">
                          {hasImage && (
                            <div className="w-10 h-10 rounded-[12px] grid place-items-center bg-primary-soft text-primary shrink-0">
                              <Icon className="w-5 h-5" />
                            </div>
                          )}
                          <h3 className="font-heading font-bold text-xl text-foreground">
                            {b.t}
                          </h3>
                        </div>
                        <p className="text-body text-muted-foreground leading-relaxed">
                          {b.d}
                        </p>
                      </div>
                    </Card>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Next Step Section */}
        <section className="py-20 bg-background-subtle text-center">
          <div className="max-w-[1200px] mx-auto px-6">
            <Reveal>
              <div className="flex flex-col items-center">
                <SectionHead
                  align="center"
                  eyebrow={t("nextEyebrow")}
                  title={t("nextTitle")}
                  lead={t("nextLead")}
                />
                <Link href="/produkte" className="inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-lg active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring outline-none transition-all duration-fast ease-out bg-primary text-primary-foreground shadow-diffuse hover:bg-primary-hover hover:shadow-lift hover:-translate-y-0.5 min-h-[56px] px-8 text-lead">
                    {t("nextCta")}
                    <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
