import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { wrapGraph, getWebPageGraphNode, getBreadcrumbGraphNode } from '@/lib/seo/schema';
import { getBaseUrl } from '@/lib/env';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/Button';
import TechnicalTables from '@/components/bim/TechnicalTables';
import { CATALOG_EDITION } from '@/lib/bim/product';

/* Das technische Handbuch.
 *
 * Die Systemtabellen des Herstellerkatalogs — Werkstoffkennwerte,
 * Anwendungsklassen, Halterungsabstaende, Waermeausdehnung, Schweissparameter,
 * Normen — als Seite fuer Menschen. Es sind dieselben Daten, die als
 * IFC-Merkmale in jede Bauteildatei wandern; beide lesen aus lib/bim/tables/.
 *
 * Warum das eine eigene Seite verdient: Bis heute lagen diese Zahlen
 * ausschliesslich in einem 121-seitigen PDF. Wer den Halterungsabstand fuer
 * d110 bei 60 °C brauchte, musste ihn dort suchen. Jetzt steht er auf einer
 * Seite, ist auffindbar, verlinkbar und maschinenlesbar.
 *
 * KEINE NEUEN NACHRICHTENSCHLUESSEL: wie bei den uebrigen BIM-Seiten fuehrt
 * die Tabellenkomponente ihre wenigen Woerter selbst. Der Inhalt — Zahlen,
 * Einheiten, Normbezeichnungen — ist sprachunabhaengig.
 */

const PATH = '/ressourcen/technik';

const TITEL: Record<string, { title: string; desc: string; lead: string }> = {
  de: {
    /* „Technisches Handbuch" allein waren 20 Zeichen und kein Suchbegriff.
       Der Zusatz nennt, wonach hier tatsaechlich gesucht wird, und dient
       zugleich als H1 der Seite. */
    title: 'Technisches Handbuch: Werkstoffe & Schweißparameter',
    desc: 'Werkstoffkennwerte, Anwendungsklassen, Halterungsabstände, Wärmeausdehnung, Schweißparameter und Normen des K-Aqua-Rohrleitungssystems — mit Seitenbeleg aus dem Herstellerkatalog.',
    lead: 'Die Systemtabellen des Herstellerkatalogs, auf einer Seite. Dieselben Zahlen stehen als Merkmale in jeder IFC-Datei.',
  },
  en: {
    title: 'Technical Handbook: Materials & Welding Parameters',
    desc: 'Material properties, application classes, support spacing, thermal expansion, welding parameters and standards of the K-Aqua piping system — with page references to the manufacturer catalogue.',
    lead: 'The system tables of the manufacturer catalogue, on one page. The same figures appear as properties in every IFC file.',
  },
  ar: {
    title: 'الدليل الفني: المواد ومعاملات اللحام',
    desc: 'خصائص المواد وفئات الاستخدام ومسافات التثبيت والتمدد الحراري ومعاملات اللحام والمعايير لنظام أنابيب K-Aqua — مع مراجع الصفحات من كتالوج الشركة المصنّعة.',
    lead: 'جداول النظام من كتالوج الشركة المصنّعة، في صفحة واحدة. القيم نفسها ترد كخصائص في كل ملف IFC.',
  },
};

function texte(locale: string) {
  if (locale.startsWith('de')) return TITEL.de!;
  if (locale.startsWith('ar')) return TITEL.ar!;
  return TITEL.en!;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = texte(locale);
  return constructMetadata({
    title: t.title,
    description: t.desc,
    path: PATH,
    locale,
  });
}

/** Die Abschnitte in der Reihenfolge, in der die Komponente sie rendert. */
const ANKER: Record<string, { id: string; de: string; en: string; ar: string }[]> = {
  all: [
    { id: 'werkstoff', de: 'Werkstoff', en: 'Material', ar: 'المواد' },
    { id: 'zeitstand', de: 'Zeitstand', en: 'Long-term', ar: 'الزحف' },
    { id: 'anwendungsklassen', de: 'Anwendungsklassen', en: 'Application classes', ar: 'فئات الاستخدام' },
    { id: 'halterung', de: 'Halterungsabstände', en: 'Support spacing', ar: 'مسافات التثبيت' },
    { id: 'ausdehnung', de: 'Wärmeausdehnung', en: 'Expansion', ar: 'التمدد' },
    { id: 'schweissen', de: 'Schweißparameter', en: 'Welding', ar: 'اللحام' },
    { id: 'normen', de: 'Normen', en: 'Standards', ar: 'المعايير' },
  ],
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = texte(locale);
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const lang = locale.startsWith('de') ? 'de' : locale.startsWith('ar') ? 'ar' : 'en';

  const siteUrl = getBaseUrl().replace(/\/+$/, '');
  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: PATH,
      type: 'WebPage',
      name: t.title,
      description: t.desc,
      breadcrumbId: `${siteUrl}/${locale}${PATH}#breadcrumb`,
      mainEntityId: `${siteUrl}/#organization`,
    }),
    getBreadcrumbGraphNode(locale, [
      {
        name:
          tNav('home') ||
          (locale === 'de' ? 'Startseite' : locale === 'ar' ? 'الرئيسية' : 'Home'),
        path: '/',
      },
      { name: t.title, path: PATH },
    ]),
  ]);

  return (
    <>
      <JsonLd schema={jsonLd} />
      <div className="flex flex-col w-full min-h-screen bg-background">
        {/* Kopf — bewusst schlicht: das hier ist ein Nachschlagewerk,
            kein Werbeauftritt. Wer herkommt, sucht eine Zahl. */}
        <header className="pt-32 pb-16 md:pt-44 md:pb-20 border-b border-card-border">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
              {CATALOG_EDITION}
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight leading-[1.1] text-balance mb-6">
              {t.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {t.lead}
            </p>

            <nav className="flex flex-wrap gap-2 mt-10">
              {ANKER.all!.map((a) => (
                <a
                  key={a.id}
                  href={`#${a.id}`}
                  className="px-3.5 py-1.5 rounded-lg border border-card-border bg-card text-xs font-mono hover:border-primary hover:text-primary transition-colors"
                >
                  {a[lang as 'de' | 'en' | 'ar']}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <main className="py-20 md:py-28">
          <div className="mx-auto max-w-[1200px] px-6">
            <TechnicalTables locale={locale} />
          </div>
        </main>

        <section className="py-20 border-t border-card-border bg-card">
          <div className="mx-auto max-w-[1200px] px-6 flex flex-wrap items-center gap-4">
            <Button variant="primary" size="lg" href="/ressourcen/bim">
              {lang === 'de'
                ? 'Dieselben Daten als IFC 4'
                : lang === 'ar'
                  ? 'البيانات نفسها بصيغة IFC 4'
                  : 'The same data as IFC 4'}
            </Button>
            <Button variant="ghost" size="lg" href="/ressourcen/downloads">
              {lang === 'de'
                ? 'Zum Download-Center'
                : lang === 'ar'
                  ? 'إلى مركز التنزيل'
                  : 'To the download centre'}
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
