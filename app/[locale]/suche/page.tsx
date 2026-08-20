import React, { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { constructMetadata } from '@/lib/seo/metadata';
import { wrapGraph, getWebPageGraphNode, getBreadcrumbGraphNode } from '@/lib/seo/schema';
import { getBaseUrl } from '@/lib/env';
import JsonLd from '@/components/seo/JsonLd';
import GlobalSearch from '@/components/search/GlobalSearch';
import { Metadata } from 'next';
import { Search } from 'lucide-react';

interface Props {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ q?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const titles: Record<string, string> = {
    de: 'Suche & Index · Produkte, BIM, Wissen',
    en: 'Search & Index · Products, BIM, Knowledge',
    ar: 'البحث والفهرس · المنتجات، BIM، المعرفة',
  };

  const descriptions: Record<string, string> = {
    de: 'Durchsuchen Sie die gesamte K-Aqua Plattform nach Rohrsystemen, BIM-Modellen, technischen Datenblättern, Lösungen und Branchenwissen.',
    en: 'Search the complete K-Aqua platform for piping systems, BIM models, technical datasheets, solutions, and industry knowledge.',
    ar: 'ابحث في منصة K-Aqua الكاملة عن أنظمة الأنابيب ونماذج BIM وأوراق البيانات الفنية والحلول.',
  };

  const title = (titles[locale] as string | undefined) || 'Suche & Index · Produkte, BIM, Wissen';
  const description = (descriptions[locale] as string | undefined) || 'Durchsuchen Sie die gesamte K-Aqua Plattform nach Rohrsystemen, BIM-Modellen, technischen Datenblättern, Lösungen und Branchenwissen.';

  return constructMetadata({
    title,
    description,
    path: '/suche',
    locale,
  });
}

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const initialQuery = (resolvedSearchParams as Record<string, string | undefined>)?.q || 
                       (resolvedSearchParams as Record<string, string | undefined>)?.query || 
                       (resolvedSearchParams as Record<string, string | undefined>)?.highlight || '';
  setRequestLocale(locale);

  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: "/suche",
      type: "SearchResultsPage",
      name: locale === 'de' ? 'Suche & Index | K-Aqua' : locale === 'ar' ? 'البحث والفهرس | K-Aqua' : 'Search & Index | K-Aqua',
      description: locale === 'de' ? 'K-Aqua Suchzentrum für Produkte, BIM-Dateien und technische Dokumente.' : 'Search hub for K-Aqua products, BIM files and technical datasheets.',
      breadcrumbId: `${siteUrl}/${locale}/suche#breadcrumb`,
      mainEntityId: `${siteUrl}/#organization`,
    }),
    getBreadcrumbGraphNode(locale, [
      { name: locale === 'de' ? 'Startseite' : locale === 'ar' ? 'الرئيسية' : 'Home', path: '/' },
      { name: locale === 'de' ? 'Suche' : locale === 'ar' ? 'البحث' : 'Search', path: '/suche' },
    ]),
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground py-12 md:py-20">
      <JsonLd schema={jsonLd} />
      
      {/* Header Banner */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 mb-10 md:mb-14">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold font-heading uppercase tracking-widest text-primary">
            {locale === 'de' ? 'K-Aqua Suchzentrum' : locale === 'ar' ? 'مركز البحث' : 'K-Aqua Search Hub'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-foreground tracking-tight mb-4">
          {locale === 'de'
            ? 'Finden Sie Produkte, BIM & Wissen'
            : locale === 'ar'
            ? 'ابحث عن المنتجات ونماذج BIM والمعرفة'
            : 'Find Products, BIM & Technical Knowledge'}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
          {locale === 'de'
            ? 'Schneller Zugriff auf alle Produktreihen, Dimensionen, Ausschreibungstexte, Schulungen und globale Marktdaten.'
            : locale === 'ar'
            ? 'وصول سريع إلى جميع نطاقات المنتجات، والأبعاد، ونصوص المواصفات، والتدريبات.'
            : 'Fast access to all product series, dimensions, specification texts, trainings, and market data.'}
        </p>
      </div>

      {/* Main Search Interface */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-spin w-8 h-8 rounded-full border-2 border-primary border-t-transparent" /></div>}>
          <GlobalSearch initialQuery={initialQuery} />
        </Suspense>
      </div>
    </main>
  );
}
