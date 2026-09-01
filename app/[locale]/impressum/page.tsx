import React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { LegalContent } from "@/components/sections/LegalContent";
import { constructMetadata } from '@/lib/seo/metadata';
import { wrapGraph, getWebPageGraphNode, getBreadcrumbGraphNode } from '@/lib/seo/schema';
import { getBaseUrl } from '@/lib/env';
import JsonLd from "@/components/seo/JsonLd";
import { SeoExpand } from "@/components/seo/SeoExpand";
import type { Metadata } from "next";

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

  return constructMetadata({
    title: t("title"),
    description,
    path: "/impressum",
    locale,
  });
}

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal.impressum" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const title = t("title");
  const alleAbschnitte = t.raw("sections") as { title: string; icon: string; content: string }[];
  const tLegal = await getTranslations({ locale, namespace: "legal" });

  /* Unausgefuellte Redaktionsplatzhalter erscheinen nicht oeffentlich.
   *
   * `legal.impressum.sections.4.content` trug in allen drei Kernsprachen einen
   * Platzhalter fuer den nach § 18 Abs. 2 MStV zu benennenden Verantwortlichen
   * ("[NAME EINTRAGEN — freizugeben]" / "[ENTER NAME — pending approval]").
   * Er wurde mitgerendert und stand damit sichtbar auf einer Rechtsseite.
   *
   * Welche natuerliche Person diese Verantwortung traegt, ist eine
   * Haftungsfrage und wird vom Auftraggeber entschieden — sie laesst sich hier
   * nicht ersatzweise setzen. Bis dahin ist es besser, den Abschnitt
   * zurueckzuhalten als einen offenen Platzhalter zu zeigen: Rechtlich ist
   * beides eine Luecke, oeffentlich sichtbar ist nur eine davon.
   *
   * Sobald der Name in den Sprachdateien steht, erscheint der Abschnitt von
   * selbst — hier ist nichts weiter zu tun. */
  const sections = alleAbschnitte.filter((abschnitt) => {
    const offen = /\[[^\]]*\]/.test(abschnitt.content);
    if (offen && process.env.NODE_ENV !== "production") {
      console.warn(
        `[impressum] Abschnitt "${abschnitt.title}" (${locale}) enthaelt noch einen Platzhalter und wird nicht angezeigt.`
      );
    }
    return !offen;
  });

  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: "/impressum",
      type: "AboutPage",
      name: `${title} | K-Aqua`,
      description: `Impressum und Anbieterkennzeichnung der KWT GmbH (K-Aqua).`,
      breadcrumbId: `${siteUrl}/${locale}/impressum#breadcrumb`,
      mainEntityId: `${siteUrl}/#organization`,
    }),
    getBreadcrumbGraphNode(locale, [
      { name: tNav('home') || (locale === "de" ? "Startseite" : locale === "ar" ? "الرئيسية" : "Home"), path: "/" },
      { name: title, path: "/impressum" },
    ]),
  ]);


  
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
                {tLegal.has("seoH1_imprint") ? tLegal("seoH1_imprint") : `Impressum von K-Aqua: Rechtliche Hinweise und Anbieterkennzeichnung`}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="max-w-[1200px] mx-auto px-6">
            <LegalContent sections={sections} title={tLegal("toc")} />
            
            {/* SEO Backlink Directive */}
            <div className="mt-16 pt-8 border-t border-card-border">
              <Reveal>
                <h2 className="text-xl font-heading font-bold text-foreground mb-4">Konzeption & Entwicklung</h2>
                <p className="text-muted-foreground text-sm">
                  Technische Konzeption und Realisierung durch <a href="https://codayweb.de" target="_blank" rel="dofollow noopener noreferrer" className="text-primary hover:underline font-medium">Coday Webdesign Wetzlar</a>.
                </p>
              </Reveal>
            </div>
          </div>
        </section>
        <SeoExpand pageType="impressum" />
      </div>
    </>
  );
}
