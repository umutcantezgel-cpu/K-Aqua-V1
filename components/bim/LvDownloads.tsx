import React from 'react';
import { FileText, Download } from '@/components/ui/icon';
import { getBimComponentRecords, getBimRecord, CATALOG_EDITION } from '@/lib/bim/product';
import { buildLeistungsverzeichnis, toLvPosition, type LvLang } from '@/lib/bim/lv';

/* Die Ausschreibungstexte auf /ressourcen/ausschreibungstexte.
 *
 * Bis hierher stand auf dieser Seite Marketingprosa ÜBER Ausschreibungstexte,
 * aber kein einziger — keine Ordnungszahl, kein Kurz- oder Langtext, keine
 * Mengeneinheit. Beide Download-Knöpfe führten auf /ressourcen/support, wo
 * ebenfalls keine Datei liegt.
 *
 * Jetzt steht hier ein echtes Beispiel zum Lesen, und die Downloads führen auf
 * Adressen, die wirklich eine Datei liefern.
 *
 * ZU DEN BESCHRIFTUNGEN: wie die Schwesterkomponenten führt diese Datei ihre
 * wenigen Wörter selbst, statt neue Schlüssel in allen 65 Sprachdateien
 * anzulegen. Der Inhalt der Beispielposition ist ohnehin sprachabhängig und
 * kommt aus lib/bim/lv.ts.
 */

type Lang = 'de' | 'en' | 'ar';

function pickLang(locale: string): Lang {
  if (locale.startsWith('de')) return 'de';
  if (locale.startsWith('ar')) return 'ar';
  return 'en';
}

/** Die Texte gibt es in zwei Fassungen; Arabisch liest die englische. */
function lvLang(l: Lang): LvLang {
  return l === 'de' ? 'de' : 'en';
}

const TEXT: Record<Lang, Record<string, string>> = {
  de: {
    exampleTitle: 'So sieht eine Position aus',
    exampleLead:
      'Jede Angabe stammt aus dem Herstellerkatalog. Was dort nicht steht, steht auch nicht im Text — deshalb trägt jede Position ihre Fundstelle.',
    downloadTitle: 'Herunterladen',
    downloadLead:
      'Alle Positionen auf einmal, in der Fassung Ihrer Wahl. Die Dateien entstehen beim Abruf aus demselben Datensatz wie die IFC-Dateien.',
    positions: 'Positionen',
    unit: 'Mengeneinheit',
    edition: 'Katalogstand',
    txt: 'Text',
    csv: 'Tabelle',
    json: 'Datensatz',
    txtDesc: 'Zum Übernehmen in ein AVA-System.',
    csvDesc: 'Semikolon-getrennt, für Excel in deutscher Spracheinstellung.',
    jsonDesc: 'Je Position Ordnungszahl, Kurz- und Langtext, Einheit und Beleg.',
    german: 'Deutsch',
    english: 'Englisch',
    byCategory: 'Nur ein Gewerkeabschnitt',
    gaebTitle: 'GAEB DA XML',
    gaebNote:
      'Noch nicht dabei. Ohne die amtliche Schemadatei und einen Probeimport in ein AVA-System liesse sich die Datei nicht prüfen — und eine ungeprüfte Datei wäre eine Zusage ohne Deckung. Text, Tabelle und Datensatz liest jedes AVA-System ein.',
  },
  en: {
    exampleTitle: 'What a position looks like',
    exampleLead:
      'Every figure comes from the manufacturer catalogue. What is not stated there is not stated here either — which is why each position carries its source.',
    downloadTitle: 'Download',
    downloadLead:
      'All positions at once, in the form you need. The files are generated on request from the same dataset as the IFC files.',
    positions: 'positions',
    unit: 'Unit',
    edition: 'Catalogue edition',
    txt: 'Text',
    csv: 'Spreadsheet',
    json: 'Dataset',
    txtDesc: 'For pasting into a tendering system.',
    csvDesc: 'Semicolon-separated, opens directly in Excel.',
    jsonDesc: 'Item number, short and long text, unit and source per position.',
    german: 'German',
    english: 'English',
    byCategory: 'A single section only',
    gaebTitle: 'GAEB DA XML',
    gaebNote:
      'Not included yet. Without the official schema and a trial import into a tendering system the file could not be verified — and an unverified file would be a promise without cover. Text, spreadsheet and dataset are read by every tendering system.',
  },
  ar: {
    exampleTitle: 'كيف يبدو البند',
    exampleLead:
      'كل قيمة مأخوذة من كتالوج الشركة المصنّعة. وما لا يرد فيه لا يرد هنا — لذلك يحمل كل بند مرجعه.',
    downloadTitle: 'التنزيل',
    downloadLead: 'جميع البنود دفعة واحدة، بالصيغة التي تحتاجها.',
    positions: 'بنود',
    unit: 'وحدة القياس',
    edition: 'إصدار الكتالوج',
    txt: 'نص',
    csv: 'جدول',
    json: 'مجموعة بيانات',
    txtDesc: 'للنقل إلى نظام المناقصات.',
    csvDesc: 'مفصولة بفواصل منقوطة، تُفتح مباشرة في Excel.',
    jsonDesc: 'رقم البند والنص القصير والطويل ووحدة القياس والمرجع.',
    german: 'الألمانية',
    english: 'الإنجليزية',
    byCategory: 'قسم واحد فقط',
    gaebTitle: 'GAEB DA XML',
    gaebNote:
      'غير متاح بعد. من دون المخطط الرسمي واختبار الاستيراد لا يمكن التحقق من الملف.',
  },
};

/** Die Gewerkeabschnitte, in der Reihenfolge des Leistungsverzeichnisses. */
const ABSCHNITTE: { id: string; de: string; en: string; ar: string }[] = [
  { id: 'pipes', de: 'Rohrleitungen', en: 'Pipes', ar: 'الأنابيب' },
  { id: 'fittings', de: 'Formstücke', en: 'Fittings', ar: 'التركيبات' },
  { id: 'transition-fittings', de: 'Übergangsformstücke', en: 'Transition fittings', ar: 'تركيبات انتقالية' },
  { id: 'valves', de: 'Armaturen', en: 'Valves', ar: 'الصمامات' },
  { id: 'weld-in-saddles', de: 'Anschweißsättel', en: 'Weld-in saddles', ar: 'سروج اللحام' },
  { id: 'accessories', de: 'Zubehör', en: 'Accessories', ar: 'الملحقات' },
];

export default function LvDownloads({ locale }: { locale: string }) {
  const l = pickLang(locale);
  const t = TEXT[l]!;
  const sprache = lvLang(l);

  const positionen = buildLeistungsverzeichnis(getBimComponentRecords(), sprache);

  /* Als Beispiel ein Rohr: es führt die meisten Angaben — Druckstufe,
     Wasserinhalt, Lieferlänge —, zeigt also am ehesten, was in einer Position
     steckt. Fällt die Nummer je weg, greift die erste Position. */
  const beispielRecord = getBimRecord('AQ111P32');
  const beispiel = beispielRecord
    ? toLvPosition(beispielRecord, sprache, 125)
    : (positionen[0] ?? null);

  const basis = '/api/bim/lv';
  const spracheParam = sprache === 'de' ? '' : '&sprache=en';

  const formate = [
    { key: 'txt', label: t.txt, desc: t.txtDesc, href: `${basis}?format=txt${spracheParam}` },
    { key: 'csv', label: t.csv, desc: t.csvDesc, href: `${basis}?format=csv${spracheParam}` },
    { key: 'json', label: t.json, desc: t.jsonDesc, href: `${basis}?format=json${spracheParam}` },
  ];

  return (
    <div className="flex flex-col gap-16">
      {/* Ein echtes Beispiel — der Punkt der ganzen Seite */}
      {beispiel && (
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-3">
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">
              {t.exampleTitle}
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              {t.edition}: {CATALOG_EDITION}
            </span>
          </div>
          <p className="text-muted-foreground mb-8 max-w-2xl">{t.exampleLead}</p>

          <div className="rounded-2xl border border-card-border bg-card overflow-hidden">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3 border-b border-card-border bg-background-subtle">
              <span className="font-mono text-sm font-bold text-primary">{beispiel.oz}</span>
              <span className="font-heading font-bold">{beispiel.kurztext}</span>
              <span className="font-mono text-xs text-muted-foreground ms-auto">
                {t.unit}: {beispiel.einheit}
              </span>
            </div>
            <div className="px-5 py-4 overflow-x-auto">
              <ul className="flex flex-col gap-1.5 text-sm leading-relaxed min-w-0">
                {beispiel.langtext.map((zeile, i) => (
                  <li key={i} className="text-muted-foreground">
                    {zeile}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Downloads, die wirklich eine Datei liefern */}
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-3">
          <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">
            {t.downloadTitle}
          </h3>
          <span className="font-mono text-xs text-muted-foreground">
            {positionen.length} {t.positions}
          </span>
        </div>
        <p className="text-muted-foreground mb-8 max-w-2xl">{t.downloadLead}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {formate.map((f) => (
            <a
              key={f.key}
              href={f.href}
              className="group flex flex-col gap-3 p-6 bg-card border border-card-border rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-heading font-bold">{f.label}</span>
                <span className="font-mono text-xs text-muted-foreground">.{f.key}</span>
                <Download className="w-4 h-4 text-muted-foreground ms-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </a>
          ))}
        </div>

        {/* Je Gewerkeabschnitt — wer nur Rohre ausschreibt, braucht nicht alles */}
        <h4 className="mt-12 mb-4 font-heading font-bold text-lg">{t.byCategory}</h4>
        <div className="flex flex-wrap gap-2">
          {ABSCHNITTE.map((a) => (
            <a
              key={a.id}
              href={`${basis}?format=txt&kategorie=${a.id}${spracheParam}`}
              className="px-3.5 py-1.5 rounded-lg border border-card-border bg-card text-xs font-mono hover:border-primary hover:text-primary transition-colors"
            >
              {a[l]}
            </a>
          ))}
        </div>

        {/* Die andere Sprachfassung */}
        <div className="flex flex-wrap gap-2 mt-4">
          <a
            href={`${basis}?format=txt`}
            className="px-3.5 py-1.5 rounded-lg border border-card-border bg-card text-xs font-mono hover:border-primary hover:text-primary transition-colors"
          >
            {t.german} · .txt
          </a>
          <a
            href={`${basis}?format=txt&sprache=en`}
            className="px-3.5 py-1.5 rounded-lg border border-card-border bg-card text-xs font-mono hover:border-primary hover:text-primary transition-colors"
          >
            {t.english} · .txt
          </a>
        </div>

        {/* Was es NICHT gibt, und warum — dieselbe Ehrlichkeit wie im BIM-Portal */}
        <div className="mt-10 p-5 rounded-2xl border border-dashed border-card-border bg-background-subtle">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
            {t.gaebTitle}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">{t.gaebNote}</p>
        </div>
      </div>
    </div>
  );
}
