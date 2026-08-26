import React from 'react';
import { getTranslations } from 'next-intl/server';
import { FileText, Download, Layers, Ruler } from '@/components/ui/icon';
import {
  allProductSlugs,
  getBimRecordsForProduct,
  getAllBimRecords,
  CATALOG_EDITION,
} from '@/lib/bim/product';

/* Die Downloadtabelle des BIM-Portals.
 *
 * Serverkomponente: die Artikelzahlen stammen aus derselben Quelle wie die
 * Dateien selbst, es gibt also keine gepflegte Liste, die veralten koennte.
 *
 * ZU DEN BESCHRIFTUNGEN: Diese Komponente fuehrt ihre wenigen Woerter selbst
 * und greift nicht auf die Sprachdateien zu. Der Grund ist nicht Bequemlichkeit,
 * sondern Vertraeglichkeit: neue Schluessel muessten in allen 65 Sprachdateien
 * angelegt werden, sonst schlaegt die Schluesselparitaetspruefung fehl. Das
 * Uebrige — Formatnamen, Dateiendungen, Artikelnummern — ist ohnehin in jeder
 * Sprache gleich.
 */

type Lang = 'de' | 'en' | 'ar';

function pickLang(locale: string): Lang {
  if (locale.startsWith('de')) return 'de';
  if (locale.startsWith('ar')) return 'ar';
  return 'en';
}

const TEXT: Record<Lang, Record<string, string>> = {
  de: {
    formatsTitle: 'Formate',
    formatsLead: 'Jede Datei entsteht beim Abruf aus dem Herstellerkatalog.',
    catalogTitle: 'Gesamtkatalog',
    catalogLead: 'Alle Artikel auf einmal — für Massenermittlung und Kalkulation.',
    productsTitle: 'Nach Produkt',
    productsLead: 'Je Produkt ein Archiv mit allen Nennweiten, dazu Tabelle und Typenkatalog.',
    articles: 'Artikel',
    size: 'Nennweite',
    sizes: 'Nennweiten',
    package: 'Paket',
    table: 'Tabelle',
    typeCatalog: 'Typenkatalog',
    dataset: 'Datensatz',
    ifcDesc: 'Ein Bauteil je Nennweite, in Millimetern, mit Anschlusspunkten und Merkmalen.',
    ifcNoGeom: 'Nur Sachdaten, ohne Form. Wenige Kilobyte statt einiger Megabyte.',
    csvDesc: 'Semikolon-getrennt, für Excel in deutscher Spracheinstellung.',
    jsonDesc: 'Feldnamen nah an den IFC-Merkmalen, für eigene Auswertungen.',
    txtDesc: 'Neben eine Revit-Familie gelegt: alle Nennweiten zur Auswahl.',
    zipDesc: 'IFC aller Nennweiten, Artikeltabelle, Datensatz und Typenkatalog.',
    note: 'Katalogstand',
    apiNote: 'Alle Adressen sind unmittelbar aufrufbar und lassen sich in eigene Werkzeuge einbinden.',
  },
  en: {
    formatsTitle: 'Formats',
    formatsLead: 'Every file is generated on request, straight from the manufacturer catalogue.',
    catalogTitle: 'Complete catalogue',
    catalogLead: 'Every article at once — for quantity take-off and costing.',
    productsTitle: 'By product',
    productsLead: 'One archive per product with every size, plus table and type catalogue.',
    articles: 'articles',
    size: 'size',
    sizes: 'sizes',
    package: 'Package',
    table: 'Table',
    typeCatalog: 'Type catalogue',
    dataset: 'Dataset',
    ifcDesc: 'One component per size, in millimetres, with ports and properties.',
    ifcNoGeom: 'Data only, no geometry. Kilobytes instead of megabytes.',
    csvDesc: 'Semicolon separated, opens directly in Excel.',
    jsonDesc: 'Field names close to the IFC properties, for your own processing.',
    txtDesc: 'Placed next to a Revit family: every size available for selection.',
    zipDesc: 'IFC for every size, article table, dataset and type catalogue.',
    note: 'Catalogue edition',
    apiNote: 'Every address can be called directly and wired into your own tools.',
  },
  ar: {
    formatsTitle: 'الصيغ',
    formatsLead: 'يتم إنشاء كل ملف عند الطلب مباشرة من كتالوج الشركة المصنّعة.',
    catalogTitle: 'الكتالوج الكامل',
    catalogLead: 'جميع الأصناف دفعة واحدة — لحساب الكميات والتكاليف.',
    productsTitle: 'حسب المنتج',
    productsLead: 'أرشيف لكل منتج بجميع المقاسات، مع الجدول وكتالوج الأنواع.',
    articles: 'صنف',
    size: 'مقاس',
    sizes: 'مقاس',
    package: 'حزمة',
    table: 'جدول',
    typeCatalog: 'كتالوج الأنواع',
    dataset: 'مجموعة بيانات',
    ifcDesc: 'مكوّن واحد لكل مقاس، بالمليمتر، مع نقاط التوصيل والخصائص.',
    ifcNoGeom: 'بيانات فقط، بدون شكل هندسي. كيلوبايتات بدل ميغابايتات.',
    csvDesc: 'مفصول بفاصلة منقوطة، يفتح مباشرة في Excel.',
    jsonDesc: 'أسماء الحقول قريبة من خصائص IFC، للمعالجة الخاصة بك.',
    txtDesc: 'يوضع بجوار عائلة Revit: جميع المقاسات متاحة للاختيار.',
    zipDesc: 'IFC لكل مقاس، جدول الأصناف، مجموعة البيانات وكتالوج الأنواع.',
    note: 'إصدار الكتالوج',
    apiNote: 'يمكن استدعاء كل عنوان مباشرة ودمجه في أدواتك الخاصة.',
  },
};

/** Kategorienamen in den drei gepflegten Sprachen. */
const CATEGORY_LABEL: Record<Lang, Record<string, string>> = {
  de: {
    pipes: 'Rohre',
    fittings: 'Formstücke',
    'transition-fittings': 'Übergangsstücke',
    valves: 'Armaturen',
    'weld-in-saddles': 'Einschweißsättel',
    accessories: 'Zubehör',
    tools: 'Werkzeuge',
  },
  en: {
    pipes: 'Pipes',
    fittings: 'Fittings',
    'transition-fittings': 'Transition fittings',
    valves: 'Valves',
    'weld-in-saddles': 'Weld-in saddles',
    accessories: 'Accessories',
    tools: 'Tools',
  },
  ar: {
    pipes: 'الأنابيب',
    fittings: 'الوصلات',
    'transition-fittings': 'وصلات الانتقال',
    valves: 'الصمامات',
    'weld-in-saddles': 'سروج اللحام',
    accessories: 'الملحقات',
    tools: 'الأدوات',
  },
};

interface FormatRow {
  badge: string;
  extension: string;
  descKey: string;
  href: string;
  icon: React.ReactNode;
}

/**
 * Reihenfolge der Kategorien.
 *
 * Nicht alphabetisch, sondern nach dem Weg durch eine Anlage: erst das Rohr,
 * dann was daran kommt, zuletzt das Werkzeug, mit dem es verbunden wird.
 * Alphabetisch stuenden die Uebergangsstuecke oben und die Rohre unten — genau
 * die Reihenfolge, in der niemand sucht.
 */
const CATEGORY_ORDER = [
  'pipes',
  'fittings',
  'transition-fittings',
  'valves',
  'weld-in-saddles',
  'accessories',
  'tools',
];

interface ProductRow {
  slug: string;
  title: string;
  count: number;
  isTool: boolean;
}

export default async function BimDownloadTable({ locale }: { locale: string }) {
  const lang = pickLang(locale);
  const t = TEXT[lang];
  const categoryLabel = CATEGORY_LABEL[lang];

  // Uebersetzte Produktnamen. Der Bestand fuehrt sie unter `productNames` mit
  // dem Schluessel `<kategorie>_<slug>`; genau so lesen die Produktseiten sie
  // auch. Faellt der Namensraum aus oder fehlt ein Schluessel, bleibt der
  // englische Katalogtitel stehen — besser als eine leere Zelle.
  const tNames = await getTranslations({ locale, namespace: 'productNames' }).catch(
    () => null,
  );

  const all = getAllBimRecords();
  const products = allProductSlugs();
  const catalogNote = `${t.note}: ${CATALOG_EDITION}`;

  const byCategory = new Map<string, ProductRow[]>();
  for (const slug of products) {
    const records = getBimRecordsForProduct(slug);
    const first = records[0];
    if (!first) continue;

    const nameKey = `${first.category}_${slug}`;
    const translated = tNames?.has(nameKey) ? tNames(nameKey) : null;

    const list = byCategory.get(first.category) ?? [];
    list.push({
      slug,
      title: translated ?? first.title,
      count: records.length,
      isTool: first.isTool,
    });
    byCategory.set(first.category, list);
  }

  const orderedCategories = [
    ...CATEGORY_ORDER.filter((c) => byCategory.has(c)),
    ...[...byCategory.keys()].filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  const formats: FormatRow[] = [
    {
      badge: 'IFC 4',
      extension: '.ifc',
      descKey: 'ifcDesc',
      href: '/api/bim/artikel/AQ111P32',
      icon: <Layers className="w-5 h-5 text-primary" />,
    },
    {
      badge: 'IFC 4',
      extension: '.ifc',
      descKey: 'ifcNoGeom',
      href: '/api/bim/artikel/AQ111P32?geometrie=ohne',
      icon: <Layers className="w-5 h-5 text-primary" />,
    },
    {
      badge: 'CSV',
      extension: '.csv',
      descKey: 'csvDesc',
      href: '/api/bim/katalog?format=csv',
      icon: <FileText className="w-5 h-5 text-primary" />,
    },
    {
      badge: 'JSON',
      extension: '.json',
      descKey: 'jsonDesc',
      href: '/api/bim/katalog?format=json',
      icon: <FileText className="w-5 h-5 text-primary" />,
    },
    {
      badge: 'Revit',
      extension: '.txt',
      descKey: 'txtDesc',
      href: '/api/bim/produkt/k-pipe-pp-r-sdr-11?format=txt',
      icon: <Ruler className="w-5 h-5 text-primary" />,
    },
    {
      badge: 'ZIP',
      extension: '.zip',
      descKey: 'zipDesc',
      href: '/api/bim/produkt/elbow-90',
      icon: <Download className="w-5 h-5 text-primary" />,
    },
  ];

  return (
    <div className="flex flex-col gap-20">
      {/* Formatübersicht */}
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-3">
          <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">
            {t.formatsTitle}
          </h3>
          <span className="font-mono text-xs text-muted-foreground">{catalogNote}</span>
        </div>
        <p className="text-muted-foreground mb-8 max-w-2xl">{t.formatsLead}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {formats.map((format) => (
            <a
              key={`${format.badge}-${format.descKey}`}
              href={format.href}
              className="group flex flex-col gap-3 p-6 bg-card border border-card-border rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                {format.icon}
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-primary-soft text-primary font-semibold">
                  {format.badge}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {format.extension}
                </span>
                <Download className="w-4 h-4 text-muted-foreground ms-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t[format.descKey]}
              </p>
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-6 font-mono">{t.apiNote}</p>
      </div>

      {/* Gesamtkatalog */}
      <div>
        <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight mb-3">
          {t.catalogTitle}
        </h3>
        <p className="text-muted-foreground mb-8 max-w-2xl">{t.catalogLead}</p>
        <div className="flex flex-wrap gap-4">
          {/*
            `no-html-link-for-pages` haelt /api/bim/katalog faelschlich fuer
            eine Seite. Es ist ein Route Handler, der eine Datei ausliefert.
            `Link` wuerde clientseitig dorthin navigieren, statt den Download
            anzustossen — also genau das Falsche.
          */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/api/bim/katalog?format=csv"
            className="inline-flex items-center gap-3 px-6 py-4 bg-card border border-card-border rounded-xl hover:border-primary/50 transition-colors"
          >
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-semibold">{t.table}</span>
            <span className="font-mono text-xs text-muted-foreground">
              CSV · {all.length} {t.articles}
            </span>
          </a>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/api/bim/katalog?format=json"
            className="inline-flex items-center gap-3 px-6 py-4 bg-card border border-card-border rounded-xl hover:border-primary/50 transition-colors"
          >
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-semibold">{t.dataset}</span>
            <span className="font-mono text-xs text-muted-foreground">
              JSON · {all.length} {t.articles}
            </span>
          </a>
        </div>
      </div>

      {/* Je Produkt */}
      <div>
        <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight mb-3">
          {t.productsTitle}
        </h3>
        <p className="text-muted-foreground mb-8 max-w-2xl">{t.productsLead}</p>

        <div className="flex flex-col gap-10">
          {orderedCategories.map((category) => {
            const list = byCategory.get(category) ?? [];
            return (
              <div key={category}>
                <h4 className="font-heading font-bold text-lg mb-4 pb-2 border-b border-card-border">
                  {categoryLabel[category] ?? category}
                  <span className="font-mono text-xs text-muted-foreground ms-3 font-normal">
                    {list.length}
                  </span>
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <tbody>
                      {list.map((product) => (
                        <tr
                          key={product.slug}
                          className="border-b border-card-border/60 last:border-0 hover:bg-card/60 transition-colors"
                        >
                          <td className="py-3 pe-4 font-medium">{product.title}</td>
                          <td className="py-3 pe-4 font-mono text-xs text-muted-foreground whitespace-nowrap">
                            {product.count} {product.count === 1 ? t.size : t.sizes}
                          </td>
                          <td className="py-3 text-end whitespace-nowrap">
                            <span className="inline-flex gap-2">
                              {/*
                                Werkzeuge bekommen kein Paket und keinen
                                Typenkatalog: sie sind keine Bauteile, tragen
                                also keine IFC-Datei, und ein Typenkatalog
                                ohne Nennweiten waere eine leere Zusage. Ihre
                                Artikeldaten gibt es als Tabelle.
                              */}
                              {!product.isTool && (
                                <>
                                  <a
                                    href={`/api/bim/produkt/${product.slug}`}
                                    className="font-mono text-xs px-2.5 py-1 rounded border border-card-border hover:border-primary hover:text-primary transition-colors"
                                  >
                                    {t.package}
                                  </a>
                                  <a
                                    href={`/api/bim/produkt/${product.slug}?format=txt`}
                                    className="font-mono text-xs px-2.5 py-1 rounded border border-card-border hover:border-primary hover:text-primary transition-colors"
                                  >
                                    {t.typeCatalog}
                                  </a>
                                </>
                              )}
                              <a
                                href={`/api/bim/produkt/${product.slug}?format=csv`}
                                className="font-mono text-xs px-2.5 py-1 rounded border border-card-border hover:border-primary hover:text-primary transition-colors"
                              >
                                CSV
                              </a>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
