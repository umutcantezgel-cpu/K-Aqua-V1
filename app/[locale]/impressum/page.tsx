import React from "react";
import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { DataTable } from "@/components/ui/DataTable";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "imprint" });
  return constructMetadata({
    title: t("title"),
    description: t("eyebrow"),
    path: "/impressum",
    locale,
  });
}

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "imprint" });

  const rows = t.raw("rows") as string[][];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t("title"),
    "description": t("eyebrow"),
    "url": `${siteUrl}/${locale}/impressum`,
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
                {t("title")}
              </h1>
            </Reveal>
          </div>
        </section>

        {/* Corporate Info Table Section */}
        <section className="py-20 bg-background">
          <div className="max-w-[820px] mx-auto px-6">
            <Reveal>
              <Card className="p-6">
                <DataTable>
                  <tbody>
                    {rows.map(([k, v]) => (
                      <tr key={k}>
                        <th className="w-[180px] border-b border-card-border p-3 text-start align-top">
                          {k}
                        </th>
                        <td className="p-3 border-b border-card-border text-start align-top">
                          {v}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </DataTable>
              </Card>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
