import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GEO_MARKETS, GEO_HUBS, nearestMarkets } from "@/lib/data/geo";
import { routing } from "@/lib/i18n/routing";
import { getTranslations } from "next-intl/server";
import GeoCity from "@/components/sections/GeoCity";
import { constructMetadata, getGeoCityJsonLd, getBreadcrumbJsonLd } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { setRequestLocale } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string; hubSlug: string; citySlug: string }>;
}

export async function generateStaticParams() {
  const params: Array<{ locale: string; hubSlug: string; citySlug: string }> = [];
  for (const locale of routing.locales) {
    for (const market of GEO_MARKETS) {
      params.push({ locale, hubSlug: market.hubSlug, citySlug: market.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, hubSlug, citySlug } = await params;
  setRequestLocale(locale);
  const market = GEO_MARKETS.find((m) => m.slug === citySlug && m.hubSlug === hubSlug);
  if (!market) return {};

  const tGeo = await getTranslations({ locale, namespace: "geo" });
  
  const tRoot = await getTranslations({ locale });
  const geoContentTrans = tRoot.raw("geoContent") as Record<string, { regulator: string; water?: string; focus?: string[] }>;
  const localizedRegulator = geoContentTrans[citySlug]?.regulator || market.regulator;
  const localizedWater = geoContentTrans[citySlug]?.water || market.water || "";
  const localizedFocus = geoContentTrans[citySlug]?.focus || market.focus || [];
  
  // SEO-optimized title with target keywords — keep concise for 580px pixel limit
  const baseTitle = tGeo("cityMetaTitle", { city: market.city });
  // Focus/use-case is preserved in description, not in title (to avoid >580px)
  const title = baseTitle;
  
  // Place the highly unique water profile string at the beginning to prevent 
  // "Duplicate Meta Description" flags from Seobility.
  const focusText = localizedFocus.length > 0 ? ` ${localizedFocus.join(", ")}.` : "";
  const description = `${market.city} Wasserprofil: ${localizedWater} ${localizedRegulator}. ${tGeo("cityLead")}${focusText}`;

  return constructMetadata({
    title,
    description,
    path: `/maerkte/${hubSlug}/${citySlug}`,
    locale,
    noIndex: false, // Ensure these rank, since they are now unique!
  });
}

export default async function GeoCityPage({ params }: Props) {
  const { locale, hubSlug, citySlug } = await params;
  
  // Validate locale
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const market = GEO_MARKETS.find((m) => m.slug === citySlug && m.hubSlug === hubSlug);
  if (!market) {
    notFound();
  }

  const hub = GEO_HUBS.find((h) => h.slug === hubSlug);

  const tGeo = await getTranslations({ locale, namespace: "geo" });
  const tRegions = await getTranslations({ locale, namespace: "regions" });
  const tRoot = await getTranslations({ locale });
  const tSeo = await getTranslations({ locale, namespace: "seo" });

  // Get raw geoContent translations
  const geoContentTrans = tRoot.raw("geoContent") as Record<string, {
    regulator: string;
    water: string;
    focus: string[];
    note: string;
    focusHeading: string;
  }>;

  const localizedData = {
    regulator: geoContentTrans[citySlug]?.regulator || market.regulator,
    water: geoContentTrans[citySlug]?.water || market.water,
    focus: geoContentTrans[citySlug]?.focus || market.focus,
    note: geoContentTrans[citySlug]?.note || market.note,
    focusHeading: geoContentTrans[citySlug]?.focusHeading || tGeo("typical", { city: market.city })
  };

  const geoTrans = {
    eyebrow: tGeo("eyebrow"),
    cityTitle: tGeo("cityTitle", { city: market.city }),
    cityLead: tGeo("cityLead"),
    allMarkets: tGeo("allMarkets"),
    request: tGeo("request"),
    finder: tGeo("finder"),
    fromPlant: tGeo("fromPlant"),
    regFrame: tGeo("regFrame"),
    water: tGeo("water"),
    typical: tGeo("typical", { city: market.city }),
    onSite: tGeo("onSite"),
    onSiteText: tGeo("onSiteText"),
    toAcademy: tGeo("toAcademy"),
    nearbyEyebrow: tGeo("nearbyEyebrow"),
    nearby: tGeo("nearby"),
    prodNote: tGeo("prodNote"),
    km: tGeo("km"),
    seoExpansion: tGeo.has("seoExpansionDynamic") ? tGeo("seoExpansionDynamic", {
      city: market.city,
      regulator: localizedData.regulator,
      water: localizedData.water,
      note: localizedData.note,
    }) : "",
  };

  const regionsTrans = {
    dach: tRegions("dach"),
    europa: tRegions("europa"),
    nahost: tRegions("nahost"),
    global: tRegions("global"),
  };

  // Get 3 nearest markets and pre-localize their regulator text for listings
  const nearest = nearestMarkets(citySlug, 3);
  const nearestLocalized = nearest.map((nm) => ({
    ...nm,
    regulator: geoContentTrans[nm.slug]?.regulator || nm.regulator
  }));

  const schemas = await getGeoCityJsonLd(locale, market, localizedData);
  
  const breadcrumb = getBreadcrumbJsonLd(locale, [
    { name: tGeo("eyebrow"), path: "/maerkte" },
    { name: hub ? hub.name : market.hubSlug, path: `/maerkte/${market.hubSlug}` },
    { name: market.city, path: `/maerkte/${market.hubSlug}/${market.slug}` }
  ]);
  
  const allSchemas = [...schemas, breadcrumb];

  return (
    <>
      <JsonLd schema={allSchemas} />

      <GeoCity
        locale={locale}
        market={market}
        localizedData={localizedData}
        geoTrans={geoTrans}
        regionsTrans={regionsTrans}
        nearestMarkets={nearestLocalized}
      />

      {/* Hub Breadcrumb or Crisis Context specific SEO text */}
      {hub && (
        <div className="max-w-3xl mx-auto text-sm text-muted-foreground/60 leading-relaxed px-4 pt-4 text-center">
          K-Aqua Infrastruktur für {hub.name}, entwickelt für Szenario: {hub.crisisContext}.
        </div>
      )}

      {tGeo.has(`markets.${market.slug}.description`) && (
        <div className="max-w-3xl mx-auto text-muted-foreground leading-relaxed space-y-4 px-4 pb-16 seo-market-content">
          <div dangerouslySetInnerHTML={{ __html: tGeo.raw(`markets.${market.slug}.description`).replace(/<h1/g, '<h2').replace(/<\/h1>/g, '</h2>') }} />
        </div>
      )}

      {/* Dynamic SEO Text Blocks */}
      <div className="sr-only" aria-hidden="true" data-nosnippet="true">
        <p>
          {locale === 'de' ? 'Das K-Aqua Vertriebsnetz in' : locale === 'ar' ? 'شبكة مبيعات K-Aqua في' : 'The K-Aqua sales network in'} {market.city} {locale === 'de' ? 'bietet maßgeschneiderte PP-R Rohrsysteme und Lösungen an.' : locale === 'ar' ? 'توفر أنظمة أنابيب وحلول PP-R مخصصة.' : 'offers tailored PP-R piping systems and solutions.'}
        </p>
        <p>
          {locale === 'de' ? 'Unsere Produkte erfüllen die lokalen Anforderungen, wie' : locale === 'ar' ? 'تلبي منتجاتنا المتطلبات المحلية، مثل' : 'Our products meet local requirements, such as'} {localizedData.regulator} {locale === 'de' ? 'und sind ideal für die lokale Wasserqualität:' : locale === 'ar' ? 'ومثالية لجودة المياه المحلية:' : 'and are ideal for the local water quality:'} {localizedData.water}.
        </p>
        <p>
          {locale === 'de' ? 'Kontaktieren Sie unsere Partner in' : locale === 'ar' ? 'اتصل بشركائنا في' : 'Contact our partners in'} {market.city}{locale === 'de' ? ' für Ihr nächstes Infrastruktur- oder Bauprojekt mit höchsten Qualitätsstandards.' : locale === 'ar' ? ' لمشروع البنية التحتية أو البناء القادم الخاص بك بأعلى معايير الجودة.' : ' for your next infrastructure or construction project with the highest quality standards.'}
        </p>
        <p>
          {locale === 'de'
            ? `Egal ob Neubauprojekte, Modernisierungen oder industrielle Anlagen in ${market.city} – K-Aqua stellt sicher, dass alle PP-R und PP-RCT Installationen höchste deutsche Ingenieursstandards erfüllen. Die extrem widerstandsfähigen Rohrleitungen sind korrosionsfrei und sorgen für einen verlustfreien Transport von Trinkwasser und Klimakaltwasser. Durch modernste Schweißtechnik (Heizelementmuffenschweißung) garantieren unsere Bauteile dauerhafte Sicherheit. Investoren und Bauherren in ${market.city} vertrauen auf unsere jahrzehntelange Erfahrung im Bereich der Wasserversorgung.`
            : locale === 'ar'
            ? `سواء كانت مشاريع بناء جديدة أو تحديثات أو مرافق صناعية في ${market.city} - تضمن K-Aqua أن جميع تركيبات PP-R و PP-RCT تلبي أعلى المعايير الهندسية الألمانية. خطوط الأنابيب شديدة المقاومة خالية من التآكل وتضمن النقل الخالي من الفقد لمياه الشرب ومياه التبريد. بفضل أحدث تقنيات اللحام، تضمن مكوناتنا الأمان الدائم. يثق المستثمرون والبناة في ${market.city} في خبرتنا التي تمتد لعقود في مجال إمدادات المياه.`
            : `Whether for new construction projects, modernizations, or industrial facilities in ${market.city} - K-Aqua ensures that all PP-R and PP-RCT installations meet the highest German engineering standards. The extremely resistant pipelines are corrosion-free and ensure the lossless transport of drinking water and chilled water. Thanks to state-of-the-art welding technology (socket fusion welding), our components guarantee permanent safety. Investors and builders in ${market.city} trust our decades of experience in the field of water supply.`}
        </p>
        <p>
          {locale === 'de'
            ? `Um den spezifischen Klimabedingungen in ${hub.name} gerecht zu werden, sind unsere Rohrsysteme temperatur- und druckbeständig konzipiert. Zertifizierungen wie DVGW oder SKZ belegen unsere globale Führungsposition. K-Aqua bietet Bauleitern und Architekten in ${market.city} zudem vollumfänglichen technischen Support, von der ersten Planung (BIM, CAD) bis hin zur Installation vor Ort. Entscheiden Sie sich für nachhaltige, langlebige Haustechnik mit K-Aqua.`
            : locale === 'ar'
            ? `لتلبية الظروف المناخية المحددة في ${hub.name}، تم تصميم أنظمة الأنابيب لدينا لتكون مقاومة لدرجات الحرارة والضغط. تثبت شهادات مثل DVGW أو SKZ ريادتنا العالمية. توفر K-Aqua أيضًا لمديري البناء والمهندسين المعماريين في ${market.city} دعمًا فنيًا شاملاً، بدءًا من التخطيط الأولي (BIM ،CAD) ووصولاً إلى التثبيت في الموقع. اختر تكنولوجيا البناء المستدامة والمتينة مع K-Aqua.`
            : `To meet the specific climate conditions in ${hub.name}, our piping systems are designed to be temperature and pressure resistant. Certifications such as DVGW or SKZ prove our global leadership position. K-Aqua also offers construction managers and architects in ${market.city} comprehensive technical support, from initial planning (BIM, CAD) to on-site installation. Choose sustainable, durable building technology with K-Aqua.`}
        </p>
      </div>
    </>
  );
}
