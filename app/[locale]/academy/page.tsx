/* eslint-disable react/jsx-no-literals */
import React from "react";
import { getTranslations } from "next-intl/server";
import { constructMetadata, getArticleJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

import { PremiumAssetPlaceholder } from "@/components/ui/PremiumAssetPlaceholder";
import { Button } from "@/components/ui/Button";
import { setRequestLocale } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("academy") as string[];
  return constructMetadata({
    title: meta[0] ?? "K-Aqua Academy",
    description: meta[1] ?? "Zertifizierte Systemkompetenz für industrielle Rohrleitungssysteme.",
    path: "/academy",
    locale,
  });
}

export default async function AcademyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("academy") as string[];
  const jsonLd = await getArticleJsonLd(locale, "academy");
  return (
    <>
      <div className="sr-only">
        <p>{meta[0]}</p>
        <p>{meta[1]}</p>
      </div>
      <JsonLd schema={jsonLd} />

      {/* Outro CTA */}
      <section className="py-32 px-6 bg-background relative overflow-hidden flex items-center justify-center border-t border-card-border z-30">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_top,var(--primary-soft)_0%,transparent_100%)] opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-black tracking-tight mb-8">
            BEREIT FÜR DIE <span className="text-primary">AUTORISIERUNG?</span>
          </h2>
          <p className="text-2xl text-muted-foreground mb-12">
            Registrieren Sie Ihr Unternehmen für das nächste Zertifizierungsaudit. Sichern Sie sich den entscheidenden Wettbewerbsvorteil durch nachgewiesene Systemkompetenz in der Rohrleitungstechnik.
          </p>
          <Button variant="primary" size="lg" className="text-lg tracking-widest uppercase font-bold px-12 py-6">
            Audit Anfragen
          </Button>
        </div>
      </section>
    </>
  );
}
