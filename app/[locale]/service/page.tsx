import React from "react";
import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { FileText, Download, Play } from "@/components/ui/icon";
import { ServiceDeep } from "@/components/sections/ServiceDeep";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("service") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/service",
    locale,
  });
}


interface DownloadItem {
  t: string;
  s: string;
}

interface VideoItem {
  t: string;
  s: string;
}

const K_DL_LINKS = [
  "https://www.k-aqua.de/PDF/K-Aqua_Product_Range_en.pdf",
  "https://www.k-aqua.de/PDF/K-Aqua_Product_Features_en.pdf",
  "https://www.k-aqua.de/PDF/K-Aqua_Quality_Assurance_en.pdf",
];

import { LocalVideo } from "@/components/ui/LocalVideo";

// Mappings for Service videos: local path and YouTube SEO fallback
const VIDEO_ASSETS = [
  { src: '/videos/socket-welding-hand.mp4', fallback: 'https://www.youtube.com/watch?v=d56p048YB2o&t=20s' },
  { src: '/videos/socket-welding-machine.mp4', fallback: 'https://www.youtube.com/watch?v=yD99teROIKc&t=59s' },
  { src: '/videos/electrofusion.mp4', fallback: 'https://www.youtube.com/watch?v=ob2wMFZgm0k' },
  { src: '/videos/butt-fusion.mp4', fallback: 'https://www.youtube.com/watch?v=Ws7-whaL-q8&t=43s' }
];


export default async function ServicePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "service" });

  const downloads = t.raw("downloads") as DownloadItem[];
  const videos = t.raw("videos") as VideoItem[];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${t("title1")} ${t("titleGrad")}`,
    "description": t("eyebrow"),
    "url": `${siteUrl}/${locale}/service`,
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
            <Reveal delay={0.12}>
              <p className="text-lead text-muted-foreground leading-relaxed max-w-[64ch]">
                {t("lead")}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Downloads Grid */}
        <section className="py-20 bg-background border-b border-card-border">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-start">
              <SectionHead
                eyebrow={t("dlEyebrow")}
                title={t("dlTitle")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {downloads.map((d, i) => (
                <Reveal key={d.t} delay={i * 0.08} className="h-full">
                  <a
                    href={K_DL_LINKS[i]}
                    target="_blank"
                    rel="noreferrer"
                    className="no-underline block h-full focus-visible:outline-none"
                  >
                    <Card className="h-full flex flex-row items-center gap-4 p-6 hover:border-primary transition-colors text-start">
                      <div className="w-12 h-12 rounded-[14px] grid place-items-center bg-primary-soft text-primary shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-bold text-[17px] text-foreground leading-snug truncate">
                          {d.t}
                        </h3>
                        <p className="text-small text-muted-foreground leading-normal mt-1 line-clamp-2">
                          {d.s}
                        </p>
                      </div>
                      <Download className="w-5 h-5 text-primary shrink-0" />
                    </Card>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Video Tutorials Grid */}
        <section className="py-20 bg-background">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-start">
              <SectionHead
                eyebrow={t("vidEyebrow")}
                title={t("vidTitle")}
                lead={t("vidLead")}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {videos.map((v, i) => {
                const asset = VIDEO_ASSETS[i] || VIDEO_ASSETS[0];
                return (
                  <Reveal key={v.t} delay={i * 0.08} className="h-full">
                    <div className="block h-full">
                      <Card className="h-full flex flex-col justify-between text-start p-6 hover:-translate-y-1 transition-all duration-200">
                        <div>
                          <LocalVideo
                            src={asset?.src || ""}
                            title={v.t}
                            description={v.s}
                            fallbackYoutubeUrl={asset?.fallback}
                            className="mb-4"
                          />
                          <h3 className="font-heading font-bold text-[17px] text-foreground leading-snug mb-2">
                            {v.t}
                          </h3>
                          <p className="text-small text-muted-foreground leading-normal">
                            {v.s}
                          </p>
                        </div>
                      </Card>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
        {/* Deep Content am Ende der Service Seite */}
        <ServiceDeep />
      </div>
    </>
  );
}
