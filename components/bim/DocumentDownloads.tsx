import React from 'react';
import fs from 'node:fs';
import path from 'node:path';
import { FileText, ShieldCheck, Layers, Download } from '@/components/ui/icon';
import { Link } from '@/lib/i18n/navigation';
import { getAllBimRecords, CATALOG_EDITION } from '@/lib/bim/product';

/* Die Dateiliste des Download-Centers.
 *
 * DATEIGROESSEN WERDEN GEMESSEN, NICHT GEPFLEGT. Zur Bauzeit wird jede Datei
 * unter public/pdf/ am Dateisystem nachgeschlagen; steht sie nicht da, taucht
 * sie hier nicht auf. Das ist kein Aufwand, sondern die Behebung eines
 * Befunds: die Seite hat bis heute „Hauptkatalog 2026, PDF, 42 MB"
 * angekuendigt — die Datei gibt es nicht, und die einzige vorhandene
 * Katalogdatei ist 12,9 MB gross. Eine gepflegte Groessenangabe geht
 * unweigerlich auseinander; eine gemessene nicht.
 *
 * Ebenso verschwunden ist die „BIM/Revit Bibliothek, ZIP, 850 MB". An ihrer
 * Stelle steht der Verweis auf /ressourcen/bim, wo es die Daten wirklich gibt.
 */

type Lang = 'de' | 'en' | 'ar';

function pickLang(locale: string): Lang {
  if (locale.startsWith('de')) return 'de';
  if (locale.startsWith('ar')) return 'ar';
  return 'en';
}

interface DocumentEntry {
  /** Datei unter public/, ohne fuehrenden Schraegstrich. */
  file: string;
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
  /** Sprache des Dokuments, wie sie im Kennzeichen erscheint. */
  docLang: string;
  icon: React.ReactNode;
}

const DOCUMENTS: DocumentEntry[] = [
  {
    file: 'pdf/k-aqua-product-range-en.pdf',
    title: {
      de: 'Hauptkatalog 06-2025',
      en: 'Main catalogue 06-2025',
      ar: 'الكتالوج الرئيسي 06-2025',
    },
    desc: {
      de: '121 Seiten mit sämtlichen Artikeltabellen, Werkstoffkennwerten, Anwendungsklassen, Druckverlust- und Halterungstabellen. Die Quelle, auf die sich jede Angabe dieser Website beruft.',
      en: '121 pages with every article table, material property, application class, pressure-loss and support-spacing table. The source every figure on this site refers to.',
      ar: '121 صفحة تضم جميع جداول الأصناف وخصائص المواد وفئات الاستخدام وجداول فقد الضغط ومسافات التثبيت. المصدر الذي تستند إليه كل بيانات هذا الموقع.',
    },
    docLang: 'EN',
    icon: <FileText className="w-6 h-6" />,
  },
  {
    file: 'pdf/k-aqua-product-features-en.pdf',
    title: {
      de: 'Produkteigenschaften',
      en: 'Product features',
      ar: 'خصائص المنتج',
    },
    desc: {
      de: 'Werkstoff, Aufbau und Eigenschaften der PP-R- und PP-RCT-Systeme im Überblick.',
      en: 'Material, structure and properties of the PP-R and PP-RCT systems at a glance.',
      ar: 'المادة والتركيب والخصائص لأنظمة PP-R و PP-RCT في لمحة.',
    },
    docLang: 'EN',
    icon: <FileText className="w-6 h-6" />,
  },
  {
    file: 'pdf/k-aqua-quality-assurance-en.pdf',
    title: {
      de: 'Qualitätssicherung',
      en: 'Quality assurance',
      ar: 'ضمان الجودة',
    },
    desc: {
      de: 'Prüfverfahren und Fremdüberwachung durch SKZ und IMA, zugelassen durch die DVGW.',
      en: 'Test procedures and external supervision by SKZ and IMA, authorised by DVGW.',
      ar: 'إجراءات الاختبار والإشراف الخارجي من SKZ و IMA، بترخيص من DVGW.',
    },
    docLang: 'EN',
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    file: 'pdf/kwt-iso-zertifikat-de.pdf',
    title: {
      de: 'ISO-Zertifikate 9001 · 14001 · 50001',
      en: 'ISO certificates 9001 · 14001 · 50001',
      ar: 'شهادات ISO ‏9001 · 14001 · 50001',
    },
    desc: {
      de: 'Qualitäts-, Umwelt- und Energiemanagement, ausgestellt auf die KWT GmbH.',
      en: 'Quality, environmental and energy management, issued to KWT GmbH.',
      ar: 'إدارة الجودة والبيئة والطاقة، صادرة لشركة KWT GmbH.',
    },
    docLang: 'DE',
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    file: 'pdf/kwt-iso-certificates-en.pdf',
    title: {
      de: 'ISO-Zertifikate 9001 · 14001 · 50001',
      en: 'ISO certificates 9001 · 14001 · 50001',
      ar: 'شهادات ISO ‏9001 · 14001 · 50001',
    },
    desc: {
      de: 'Dieselben Urkunden in englischer Ausfertigung.',
      en: 'The same certificates in the English issue.',
      ar: 'الشهادات نفسها بالنسخة الإنجليزية.',
    },
    docLang: 'EN',
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    file: 'pdf/k-aqua-flyer-en-2025.pdf',
    title: {
      de: 'Systemüberblick 2025',
      en: 'System overview 2025',
      ar: 'نظرة عامة على النظام 2025',
    },
    desc: {
      de: 'Kurzfassung des Systems auf wenigen Seiten — für die erste Vorstellung im Projekt.',
      en: 'The system in brief — for the first presentation in a project.',
      ar: 'ملخص موجز للنظام — لأول عرض في المشروع.',
    },
    docLang: 'EN',
    icon: <FileText className="w-6 h-6" />,
  },
];

const TEXT: Record<Lang, Record<string, string>> = {
  de: {
    docsTitle: 'Dokumente',
    docsLead: 'Jede Datei liegt hier wirklich; die Größe ist gemessen, nicht gepflegt.',
    dataTitle: 'Planungsdaten',
    dataLead: 'Maschinenlesbar, aus dem Katalog erzeugt, ohne Registrierung.',
    bimTitle: 'BIM-Daten',
    bimDesc: 'IFC 4 je Nennweite mit Anschlusspunkten und Merkmalen, Artikeltabellen, Revit-Typenkataloge.',
    csvTitle: 'Gesamtkatalog als Tabelle',
    jsonTitle: 'Gesamtkatalog als Datensatz',
    articles: 'Artikel',
    edition: 'Katalogstand',
    toBim: 'Zum BIM-Portal',
  },
  en: {
    docsTitle: 'Documents',
    docsLead: 'Every file here really exists; the size is measured, not maintained.',
    dataTitle: 'Planning data',
    dataLead: 'Machine readable, generated from the catalogue, no registration.',
    bimTitle: 'BIM data',
    bimDesc: 'IFC 4 per size with ports and properties, article tables, Revit type catalogues.',
    csvTitle: 'Complete catalogue as a table',
    jsonTitle: 'Complete catalogue as a dataset',
    articles: 'articles',
    edition: 'Catalogue edition',
    toBim: 'To the BIM portal',
  },
  ar: {
    docsTitle: 'المستندات',
    docsLead: 'كل ملف هنا موجود فعلاً؛ الحجم مُقاس وليس مُدخلاً يدوياً.',
    dataTitle: 'بيانات التخطيط',
    dataLead: 'قابلة للقراءة آلياً، مولّدة من الكتالوج، بدون تسجيل.',
    bimTitle: 'بيانات BIM',
    bimDesc: 'IFC 4 لكل مقاس مع نقاط التوصيل والخصائص، جداول الأصناف، كتالوجات أنواع Revit.',
    csvTitle: 'الكتالوج الكامل كجدول',
    jsonTitle: 'الكتالوج الكامل كمجموعة بيانات',
    articles: 'صنف',
    edition: 'إصدار الكتالوج',
    toBim: 'إلى بوابة BIM',
  },
};

/** Liest die Dateigroesse in Megabyte. Null, wenn die Datei fehlt. */
function fileSizeMb(relative: string): number | null {
  try {
    const bytes = fs.statSync(path.join(process.cwd(), 'public', relative)).size;
    return Math.round((bytes / 1024 / 1024) * 10) / 10;
  } catch {
    return null;
  }
}

export default function DocumentDownloads({ locale }: { locale: string }) {
  const lang = pickLang(locale);
  const t = TEXT[lang];
  const articleCount = getAllBimRecords().length;
  const editionNote = `${t.edition}: ${CATALOG_EDITION}`;
  const bimBadge = `IFC 4 · ${articleCount} ${t.articles}`;

  // Nur Dateien anbieten, die es gibt. Eine fehlende verschwindet, statt als
  // toter Link stehenzubleiben.
  const documents = DOCUMENTS.map((d) => ({ ...d, sizeMb: fileSizeMb(d.file) }))
    .filter((d): d is DocumentEntry & { sizeMb: number } => d.sizeMb !== null)
    .map((d) => ({ ...d, badge: `${d.docLang} · PDF · ${d.sizeMb} MB` }));

  return (
    <div className="flex flex-col gap-20">
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-3">
          <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">
            {t.docsTitle}
          </h3>
          <span className="font-mono text-xs text-muted-foreground">{editionNote}</span>
        </div>
        <p className="text-muted-foreground mb-8 max-w-2xl">{t.docsLead}</p>

        <div className="flex flex-col gap-3">
          {documents.map((doc) => (
            <a
              key={doc.file}
              href={`/${doc.file}`}
              download
              className="group flex items-center justify-between gap-6 p-5 rounded-xl border border-card-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-lg bg-background-subtle flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary-soft transition-colors shrink-0">
                  {doc.icon}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-heading font-semibold text-sm">
                    {doc.title[lang]}
                  </span>
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    {doc.desc[lang]}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <div className="w-8 h-8 rounded-full bg-background-subtle flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Download className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                  {doc.badge}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight mb-3">
          {t.dataTitle}
        </h3>
        <p className="text-muted-foreground mb-8 max-w-2xl">{t.dataLead}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/ressourcen/bim"
            className="group flex flex-col gap-3 p-6 rounded-2xl border border-card-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300 md:col-span-3"
          >
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-primary" />
              <span className="font-heading font-semibold">{t.bimTitle}</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-primary-soft text-primary font-semibold ms-auto">
                {bimBadge}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.bimDesc}</p>
            <span className="text-xs font-mono text-primary group-hover:underline">
              {t.toBim}
            </span>
          </Link>

          {/*
            `no-html-link-for-pages` hält /api/bim/katalog fälschlich für eine
            Seite. Es ist ein Route Handler, der eine Datei ausliefert.
          */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/api/bim/katalog?format=csv"
            className="flex items-center gap-3 p-5 rounded-xl border border-card-border bg-card hover:border-primary/50 transition-colors"
          >
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">{t.csvTitle}</span>
            <span className="font-mono text-[10px] text-muted-foreground ms-auto">CSV</span>
          </a>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/api/bim/katalog?format=json"
            className="flex items-center gap-3 p-5 rounded-xl border border-card-border bg-card hover:border-primary/50 transition-colors"
          >
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">{t.jsonTitle}</span>
            <span className="font-mono text-[10px] text-muted-foreground ms-auto">JSON</span>
          </a>
          <a
            href="/pdf/k-aqua-product-range-en.pdf"
            download
            className="flex items-center gap-3 p-5 rounded-xl border border-card-border bg-card hover:border-primary/50 transition-colors"
          >
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">{DOCUMENTS[0]!.title[lang]}</span>
            <span className="font-mono text-[10px] text-muted-foreground ms-auto">PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
}
