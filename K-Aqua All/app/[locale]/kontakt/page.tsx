import React from "react";
import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { MapPin, Phone, Wrench, ArrowUpRight } from "@/components/ui/icon";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("contact") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/kontakt",
    locale,
  });
}

const COMPANY_NAME = "KWT GmbH";
const STREET_ADDRESS = "Auweg 3";
const CITY_ZIP = "35647 Waldsolms-Brandoberndorf";

const SALES_PHONE = "Tel. +49 (0)60 85 / 9868-410";
const SALES_FAX = "Fax +49 (0)60 85 / 9868-420";
const SALES_EMAIL = "info@k-aqua.de";
const SALES_EMAIL_HREF = "mailto:info@k-aqua.de";

const SUPPORT_EMAIL = "support@k-aqua.de";
const SUPPORT_EMAIL_HREF = "mailto:support@k-aqua.de";

export default async function KontaktPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });


  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${t("title1")} ${t("titleGrad")}`,
    "description": `${t("locTitle")} - ${t("salesTitle")}`,
    "url": `${siteUrl}/${locale}/kontakt`,
  };

  return (
    <>
      <JsonLd schema={webPageSchema} />
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

        {/* Contact Cards Section */}
        <section className="py-20 bg-background">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Physical Location */}
              <Reveal>
                <Card className="h-full text-start p-8 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-[14px] grid place-items-center bg-primary-soft text-primary shrink-0 mb-6">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                      {t("locTitle")}
                    </h3>
                    <p className="text-body text-muted-foreground leading-relaxed mb-6">
                      {COMPANY_NAME}
                      <br />
                      {STREET_ADDRESS}
                      <br />
                      {CITY_ZIP}
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Auweg+3,+35647+Waldsolms"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary hover:text-primary-hover font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    {tFooter("directions")}
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </a>
                </Card>
              </Reveal>

              {/* Sales Contact */}
              <Reveal delay={0.08}>
                <Card className="h-full text-start p-8 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-[14px] grid place-items-center bg-primary-soft text-primary shrink-0 mb-6">
                      <Phone className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                      {t("salesTitle")}
                    </h3>
                    <p className="text-body text-muted-foreground leading-relaxed mb-6">
                      {SALES_PHONE}
                      <br />
                      {SALES_FAX}
                    </p>
                  </div>
                  <a
                    href={SALES_EMAIL_HREF}
                    className="inline-flex items-center gap-1.5 text-primary hover:text-primary-hover font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    {SALES_EMAIL}
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </a>
                </Card>
              </Reveal>

              {/* Technical Support */}
              <Reveal delay={0.16}>
                <Card className="h-full text-start p-8 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-[14px] grid place-items-center bg-primary-soft text-primary shrink-0 mb-6">
                      <Wrench className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                      {t("supportTitle")}
                    </h3>
                    <p className="text-body text-muted-foreground leading-relaxed mb-6">
                      {t("supportText")}
                    </p>
                  </div>
                  <a
                    href={SUPPORT_EMAIL_HREF}
                    className="inline-flex items-center gap-1.5 text-primary hover:text-primary-hover font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    {SUPPORT_EMAIL}
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </a>
                </Card>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
