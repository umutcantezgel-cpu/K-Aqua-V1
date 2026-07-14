import React from "react";
import { getTranslations } from "next-intl/server";
import RfqWizard from "@/components/tools/RfqWizard";
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
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("rfq") as string[];
  const baseMetadata = constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/projektanfrage",
    locale,
  });
  return {
    ...baseMetadata,
    robots: { index: false, follow: false }
  };
}

export default async function ProjektanfragePage({ params }: Props) {
  const { locale } = await params;
  const jsonLd = await getWebPageJsonLd(locale, "rfq");
  const tRfq = await getTranslations({ locale, namespace: "rfq" });

  const rfqData = {
    locale,
    eyebrow: tRfq("eyebrow"),
    title1: tRfq("title1"),
    titleGrad: tRfq("titleGrad"),
    lead: tRfq("lead"),
    steps: tRfq.raw("steps") as string[],
    types: tRfq.raw("types") as Array<{ t: string; d: string }>,
    fType: tRfq("fType"),
    fDims: tRfq("fDims"),
    fMeters: tRfq("fMeters"),
    dimsHint: tRfq("dimsHint"),
    fTime: tRfq("fTime"),
    fRegion: tRfq("fRegion"),
    timelines: tRfq.raw("timelines") as string[],
    regions: tRfq.raw("regions") as string[],
    fName: tRfq("fName"),
    fCompany: tRfq("fCompany"),
    fEmail: tRfq("fEmail"),
    fPhone: tRfq("fPhone"),
    fMsg: tRfq("fMsg"),
    privacy: tRfq("privacy"),
    back: tRfq("back"),
    next: tRfq("next"),
    send: tRfq("send"),
    mailSubject: tRfq("mailSubject"),
    promise: tRfq.raw("promise") as string[],
    doneTitle: tRfq("doneTitle"),
    doneText: tRfq("doneText"),
    doneBack: tRfq("doneBack"),
  };

  const infoTitle = tRfq("infoTitle");
  const infoText1 = tRfq("infoText1");
  const infoText2 = tRfq("infoText2");
  const faqTitle = tRfq("faqTitle");
  const faqs = tRfq.raw("faqs") as Array<{ q: string; a: string }>;

  
  return (
    <>
      <JsonLd schema={jsonLd} />
      <div className="sr-only">
        <p>{rfqData.eyebrow}</p>
        <p>{rfqData.title1} {rfqData.titleGrad}</p>
        <p>{rfqData.lead}</p>
      </div>
      <div className="flex flex-col w-full min-h-screen bg-background">
        <RfqWizard rfqData={rfqData} />

        <section className="py-24 bg-card/30 border-t border-card-border/50">
          <div className="max-w-[1000px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">{infoTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{infoText1}</p>
              <p className="text-muted-foreground leading-relaxed">{infoText2}</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">{faqTitle}</h2>
              <div className="flex flex-col gap-6">
                {faqs.map((faq, idx) => (
                  <div key={idx}>
                    <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SeoExpand pageType="projektanfrage" />
      </div>
    </>
  );
}
