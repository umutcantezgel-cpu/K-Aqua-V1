import React from 'react';
import { BIM_MATERIALS, CREEP_STRENGTH_BAR } from '@/lib/bim/tables/material';
import {
  APPLICATION_CLASSES,
  APPLICATION_CLASS_NOTES,
} from '@/lib/bim/tables/application-classes';
import {
  SUPPORT_SPACING_TABLES,
  SUSPECT_VALUES,
} from '@/lib/bim/tables/support-spacing';
import {
  EXPANSION_COEFFICIENT_PER_K,
  EXPANSION_NOTES,
  EXPANSION_SOURCE,
  BENDING_LIMB_CONSTANT_PPR,
  EXPANSION_BEND_SPACING_FACTOR,
} from '@/lib/bim/tables/expansion';
import { STANDARDS, QUALITY_SUPERVISION, STANDARDS_SOURCE } from '@/lib/bim/tables/standards';
import { SOCKET_WELDING_TABLE_A } from '@/lib/bim/tables/welding';

/* Das technische Handbuch.
 *
 * Dieselben Zahlen, die als IFC-Merkmale in jede Bauteildatei wandern, hier
 * einmal fuer Menschen. Beides stammt aus derselben Schicht unter
 * lib/bim/tables/ — ein Wert kann also nicht an einer Stelle richtig und an
 * der anderen falsch sein.
 *
 * Zu den Beschriftungen: wie in den uebrigen BIM-Bausteinen fuehrt diese
 * Komponente ihre wenigen Woerter selbst, statt Nachrichtenschluessel in 65
 * Sprachdateien anzulegen. Der Inhalt — Zahlen, Einheiten, Normbezeichnungen —
 * ist ohnehin sprachunabhaengig.
 */

type Lang = 'de' | 'en' | 'ar';

function pickLang(locale: string): Lang {
  if (locale.startsWith('de')) return 'de';
  if (locale.startsWith('ar')) return 'ar';
  return 'en';
}

/* Ein echter Typ statt Record<string, string>: unter
 * `noUncheckedIndexedAccess` waere jeder Zugriff sonst `string | undefined`,
 * und jede Beschriftung muesste an der Verwendungsstelle abgesichert werden. */
interface Labels {
  material: string;
  materialLead: string;
  property: string;
  value: string;
  unit: string;
  condition: string;
  method: string;
  creep: string;
  creepLead: string;
  minimum: string;
  classes: string;
  classesLead: string;
  cls: string;
  designTemp: string;
  life: string;
  maxTemp: string;
  malTemp: string;
  application: string;
  collective: string;
  support: string;
  supportLead: string;
  diameter: string;
  expansion: string;
  expansionLead: string;
  monolayer: string;
  fiber: string;
  formula: string;
  welding: string;
  weldingLead: string;
  heating: string;
  processing: string;
  cooling: string;
  depth: string;
  standards: string;
  standardsLead: string;
  supervision: string;
  source: string;
  printError: string;
  printErrorLead: string;
  printed: string;
  conservative: string;
}

const T: Record<Lang, Labels> = {
  de: {
    material: 'Werkstoffkennwerte',
    materialLead: 'Physikalische Eigenschaften von PP-R und PP-RCT, wie sie der Herstellerkatalog führt.',
    property: 'Eigenschaft',
    value: 'Wert',
    unit: 'Einheit',
    condition: 'Bedingung',
    method: 'Prüfnorm',
    creep: 'Zeitstandfestigkeit',
    creepLead: 'Innendruckfestigkeit über Temperatur und Zeit. Erst in der Wärme zeigt sich der Unterschied der Werkstoffe.',
    minimum: 'Mindestanforderung',
    classes: 'Anwendungsklassen',
    classesLead: 'Betriebsbedingungen nach DIN EN ISO 15874-1 mit dem zulässigen Betriebsdruck je Rohrsystem.',
    cls: 'Klasse',
    designTemp: 'T_D',
    life: 'Betriebsdauer',
    maxTemp: 'T_max',
    malTemp: 'T_mal',
    application: 'Anwendungsbereich',
    collective: 'Betriebskollektiv',
    support: 'Halterungsabstände',
    supportLead: 'Abstand zwischen den Rohrbefestigungen in Zentimetern, je Rohrbauart, Druckstufe und Betriebstemperatur.',
    diameter: 'Ø mm',
    expansion: 'Wärmeausdehnung',
    expansionLead: 'Der Kennwert, der über die Länge eines Dehnungsschenkels entscheidet.',
    monolayer: 'Monoschichtrohr',
    fiber: 'K-Fiber-Rohr',
    formula: 'Formel',
    welding: 'Schweißparameter',
    weldingLead: 'Muffenschweißung nach DVS 2207-11, Heizelement bei 260 °C ± 10 °C.',
    heating: 'Anwärmzeit',
    processing: 'Fügezeit',
    cooling: 'Abkühlzeit',
    depth: 'Einschweißtiefe',
    standards: 'Normen und Regelwerke',
    standardsLead: 'Das Regelwerk, nach dem das System gebaut, geprüft und überwacht wird.',
    supervision: 'Fremdüberwachung',
    source: 'Quelle',
    printError: 'Beanstandeter Druckwert',
    printErrorLead: 'Der Katalog widerspricht sich an dieser Stelle selbst. Der gedruckte Wert steht unverändert in der Tabelle; für die Planung gilt der belastbare Ersatz.',
    printed: 'gedruckt',
    conservative: 'belastbar',
  },
  en: {
    material: 'Material properties',
    materialLead: 'Physical properties of PP-R and PP-RCT as printed in the manufacturer catalogue.',
    property: 'Property',
    value: 'Value',
    unit: 'Unit',
    condition: 'Condition',
    method: 'Test method',
    creep: 'Long-term strength',
    creepLead: 'Internal pressure strength over temperature and time. The materials differ only once it gets hot.',
    minimum: 'Minimum requirement',
    classes: 'Application classes',
    classesLead: 'Operating conditions to DIN EN ISO 15874-1 with the allowable operating pressure per pipe system.',
    cls: 'Class',
    designTemp: 'T_D',
    life: 'Service life',
    maxTemp: 'T_max',
    malTemp: 'T_mal',
    application: 'Application area',
    collective: 'Temperature collective',
    support: 'Support spacing',
    supportLead: 'Distance between pipe fixings in centimetres, by pipe type, pressure class and operating temperature.',
    diameter: 'Ø mm',
    expansion: 'Thermal expansion',
    expansionLead: 'The figure that determines the length of a bending limb.',
    monolayer: 'Monolayer pipe',
    fiber: 'K-Fiber pipe',
    formula: 'Formula',
    welding: 'Welding parameters',
    weldingLead: 'Socket welding to DVS 2207-11, heating element at 260 °C ± 10 °C.',
    heating: 'Heating time',
    processing: 'Processing time',
    cooling: 'Cooling time',
    depth: 'Welding depth',
    standards: 'Standards and codes',
    standardsLead: 'The framework the system is built, tested and supervised against.',
    supervision: 'External supervision',
    source: 'Source',
    printError: 'Disputed printed value',
    printErrorLead: 'The catalogue contradicts itself here. The printed value stands unchanged in the table; for design work use the conservative substitute.',
    printed: 'printed',
    conservative: 'conservative',
  },
  ar: {
    material: 'خصائص المواد',
    materialLead: 'الخصائص الفيزيائية لـ PP-R و PP-RCT كما وردت في كتالوج الشركة المصنّعة.',
    property: 'الخاصية',
    value: 'القيمة',
    unit: 'الوحدة',
    condition: 'الشرط',
    method: 'معيار الاختبار',
    creep: 'مقاومة الزحف',
    creepLead: 'مقاومة الضغط الداخلي عبر درجة الحرارة والزمن.',
    minimum: 'الحد الأدنى المطلوب',
    classes: 'فئات الاستخدام',
    classesLead: 'ظروف التشغيل وفق DIN EN ISO 15874-1 مع ضغط التشغيل المسموح لكل نظام أنابيب.',
    cls: 'الفئة',
    designTemp: 'T_D',
    life: 'مدة التشغيل',
    maxTemp: 'T_max',
    malTemp: 'T_mal',
    application: 'مجال الاستخدام',
    collective: 'مجموعة درجات الحرارة',
    support: 'مسافات التثبيت',
    supportLead: 'المسافة بين مثبتات الأنابيب بالسنتيمتر، حسب نوع الأنبوب وفئة الضغط ودرجة حرارة التشغيل.',
    diameter: 'Ø مم',
    expansion: 'التمدد الحراري',
    expansionLead: 'القيمة التي تحدد طول ذراع التمدد.',
    monolayer: 'أنبوب أحادي الطبقة',
    fiber: 'أنبوب K-Fiber',
    formula: 'المعادلة',
    welding: 'معاملات اللحام',
    weldingLead: 'لحام الجلبة وفق DVS 2207-11، عنصر التسخين عند 260 °م ± 10 °م.',
    heating: 'زمن التسخين',
    processing: 'زمن التركيب',
    cooling: 'زمن التبريد',
    depth: 'عمق اللحام',
    standards: 'المعايير واللوائح',
    standardsLead: 'الإطار الذي يُبنى النظام ويُختبر ويُراقب وفقه.',
    supervision: 'الإشراف الخارجي',
    source: 'المصدر',
    printError: 'قيمة مطبوعة محل اعتراض',
    printErrorLead: 'الكتالوج يناقض نفسه هنا. القيمة المطبوعة تبقى دون تغيير؛ وللتخطيط يُستخدم البديل الآمن.',
    printed: 'مطبوع',
    conservative: 'آمن',
  },
};

function Section({
  id,
  title,
  lead,
  source,
  children,
}: {
  id: string;
  title: string;
  lead: string;
  source?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-2">
        <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">
          {title}
        </h2>
        {source ? (
          <span className="font-mono text-[11px] text-muted-foreground">{source}</span>
        ) : null}
      </div>
      <p className="text-muted-foreground mb-8 max-w-3xl">{lead}</p>
      {children}
    </section>
  );
}

/** Jede breite Tabelle scrollt in ihrem eigenen Kasten, nie die Seite. */
function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-card-border bg-card">
      <table className="w-full text-sm border-collapse [font-variant-numeric:tabular-nums]">
        {children}
      </table>
    </div>
  );
}

const TH = 'px-4 py-3 text-start font-heading font-semibold text-xs uppercase tracking-wide text-muted-foreground border-b border-card-border whitespace-nowrap';
const TD = 'px-4 py-2.5 border-b border-card-border/50 whitespace-nowrap';

export default function TechnicalTables({ locale }: { locale: string }) {
  const lang = pickLang(locale);
  const t = T[lang];
  const isDe = lang === 'de';

  /* Anzeigetexte ausserhalb des JSX bilden. Das haelt die Auszeichnung frei
   * von Zeichenketten — die Regel `react/jsx-no-literals` wacht darueber,
   * damit kein uebersetzbarer Text im Code haengenbleibt. Einheiten und
   * Formeln sind zwar nicht uebersetzbar, aber die Ausnahme dafuer im
   * Regelwerk zu erweitern waere die schlechtere Loesung: sie wuerde die
   * Regel auch dort lockern, wo sie gebraucht wird. */
  const schweissZeilen = SOCKET_WELDING_TABLE_A.rows.map((row) => ({
    d: row.dMm,
    heating: `${row.heatingTimeS} s`,
    processing: `${row.processingTimeS} s`,
    cooling: `${row.coolingTimeMin} min`,
    depth: `${row.weldingDepthMm} mm`,
  }));

  const ausdehnungKarten = [
    { label: t.monolayer, value: EXPANSION_COEFFICIENT_PER_K.monolayer },
    { label: t.fiber, value: EXPANSION_COEFFICIENT_PER_K.fiber },
  ].map((k) => ({
    label: k.label,
    display: `${(k.value * 1e4).toLocaleString(isDe ? 'de-DE' : 'en-GB')}·10⁻⁴ K⁻¹`,
  }));

  const formeln = [
    'Δl = εt · L · Δt',
    `L_s = ${BENDING_LIMB_CONSTANT_PPR} · √(d · ΔL)`,
    `B ≥ ${EXPANSION_BEND_SPACING_FACTOR} · d`,
  ];

  const beanstandungen = SUSPECT_VALUES.map((s) => ({
    key: `${s.table}-${s.d}-${s.temperatureC}`,
    headline: `${s.table} · d${s.d} · ${s.temperatureC} °C — ${t.printed} ${s.printed} cm, ${t.conservative} ${s.conservative} cm`,
    reason: s.reasonDe,
  }));

  const beanstandungTitel = `* ${t.printError}`;

  const klassenZeilen = APPLICATION_CLASSES.map((c) => ({
    id: c.id,
    collective: c.collective.map((s) => `${s.temperatureC} °C · ${s.years} a`).join('  →  '),
    max: `${c.maxTemperatureC} °C · ${c.maxServiceLifeYears} a`,
    mal: `${c.malfunctionTemperatureC} °C · ${c.malfunctionServiceLifeHours} h`,
    application: isDe ? c.applicationDe : c.applicationEn,
    ppr: `${c.pressurePpRSdr6Bar} bar`,
    pprct: `${c.pressurePpRctSdr74Bar} bar`,
  }));

  const KLASSEN_KOPF = { ppr: 'PP-R SDR 6', pprct: 'PP-RCT SDR 7,4' };

  const halterungTabellen = Object.values(SUPPORT_SPACING_TABLES).map((table) => ({
    table,
    heading: `${isDe ? table.pipeTypeDe : table.pipeTypeEn} · ${table.pressureMpa} MPa`,
    spalten: table.temperaturesC.map((c) => ({ c, label: `${c} °C` })),
  }));

  return (
    <div className="flex flex-col gap-24">
      {/* Werkstoffkennwerte */}
      <Section
        id="werkstoff"
        title={t.material}
        lead={t.materialLead}
        source={BIM_MATERIALS['PP-R'].source}
      >
        <div className="flex flex-col gap-8">
          {(['PP-R', 'PP-RCT'] as const).map((id) => (
            <div key={id}>
              <h3 className="font-heading font-bold mb-3">{id}</h3>
              <Table>
                <thead>
                  <tr>
                    <th className={TH}>{t.property}</th>
                    <th className={TH}>{t.value}</th>
                    <th className={TH}>{t.unit}</th>
                    <th className={TH}>{t.condition}</th>
                    <th className={TH}>{t.method}</th>
                  </tr>
                </thead>
                <tbody>
                  {BIM_MATERIALS[id].properties.map((p) => (
                    <tr key={`${id}-${p.key}-${p.condition ?? ''}`}>
                      <td className={TD}>{isDe ? p.labelDe : p.labelEn}</td>
                      <td className={`${TD} font-mono`}>
                        {typeof p.value === 'number'
                          ? p.value.toLocaleString(isDe ? 'de-DE' : 'en-GB', {
                              maximumSignificantDigits: 6,
                            })
                          : p.value}
                      </td>
                      <td className={`${TD} font-mono text-muted-foreground`}>{p.unit}</td>
                      <td className={`${TD} text-muted-foreground`}>{p.condition ?? ''}</td>
                      <td className={`${TD} font-mono text-xs text-muted-foreground`}>
                        {p.testMethod}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ))}
        </div>
      </Section>

      {/* Zeitstandfestigkeit */}
      <Section id="zeitstand" title={t.creep} lead={t.creepLead} source="S. 22">
        <Table>
          <thead>
            <tr>
              <th className={TH}>{t.condition}</th>
              <th className={TH}>PP-R</th>
              <th className={TH}>PP-RCT</th>
              <th className={TH}>{t.minimum}</th>
            </tr>
          </thead>
          <tbody>
            {(
              [
                ['20 °C · 50 a', '20C_50a'],
                ['70 °C · 50 a', '70C_50a'],
                ['95 °C · 5 a', '95C_5a'],
              ] as const
            ).map(([label, key]) => {
              const row = CREEP_STRENGTH_BAR[key];
              return (
                <tr key={key}>
                  <td className={TD}>{label}</td>
                  <td className={`${TD} font-mono`}>{row['PP-R']}</td>
                  <td className={`${TD} font-mono`}>{row['PP-RCT']}</td>
                  <td className={`${TD} font-mono text-muted-foreground`}>
                    {row.minimum ?? '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Section>

      {/* Anwendungsklassen */}
      <Section
        id="anwendungsklassen"
        title={t.classes}
        lead={t.classesLead}
        source="S. 51"
      >
        <Table>
          <thead>
            <tr>
              <th className={TH}>{t.cls}</th>
              <th className={TH}>{t.collective}</th>
              <th className={TH}>{t.maxTemp}</th>
              <th className={TH}>{t.malTemp}</th>
              <th className={TH}>{t.application}</th>
              <th className={TH}>{KLASSEN_KOPF.ppr}</th>
              <th className={TH}>{KLASSEN_KOPF.pprct}</th>
            </tr>
          </thead>
          <tbody>
            {klassenZeilen.map((c) => (
              <tr key={c.id}>
                <td className={`${TD} font-mono font-semibold`}>{c.id}</td>
                <td className={`${TD} font-mono text-xs`}>{c.collective}</td>
                <td className={`${TD} font-mono`}>{c.max}</td>
                <td className={`${TD} font-mono`}>{c.mal}</td>
                <td className={`${TD} whitespace-normal`}>{c.application}</td>
                <td className={`${TD} font-mono`}>{c.ppr}</td>
                <td className={`${TD} font-mono`}>{c.pprct}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <p className="text-xs text-muted-foreground mt-4 max-w-3xl leading-relaxed">
          {isDe ? APPLICATION_CLASS_NOTES.malfunctionDe : APPLICATION_CLASS_NOTES.malfunctionEn}
        </p>
      </Section>

      {/* Halterungsabstände */}
      <Section id="halterung" title={t.support} lead={t.supportLead} source="S. 63–64">
        <div className="flex flex-col gap-8">
          {halterungTabellen.map(({ table, heading, spalten }) => (
            <div key={table.id}>
              <h3 className="font-heading font-bold mb-3">{heading}</h3>
              <Table>
                <thead>
                  <tr>
                    <th className={TH}>{t.diameter}</th>
                    {spalten.map((s) => (
                      <th key={s.c} className={TH}>
                        {s.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row) => (
                    <tr key={row.d}>
                      <td className={`${TD} font-mono font-semibold`}>{row.d}</td>
                      {row.spacingCm.map((cm, i) => {
                        const beanstandet = SUSPECT_VALUES.some(
                          (s) =>
                            s.table === table.id &&
                            s.d === row.d &&
                            s.temperatureC === table.temperaturesC[i],
                        );
                        return (
                          <td
                            key={i}
                            className={`${TD} font-mono ${
                              beanstandet ? 'text-primary font-semibold' : ''
                            }`}
                            title={beanstandet ? t.printError : undefined}
                          >
                            {cm}
                            {beanstandet ? ' *' : ''}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ))}
        </div>

        {SUSPECT_VALUES.length > 0 ? (
          <div className="mt-8 p-6 rounded-xl border border-primary/30 bg-primary-soft/30">
            <h4 className="font-heading font-bold text-sm mb-2">{beanstandungTitel}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {t.printErrorLead}
            </p>
            <ul className="flex flex-col gap-3">
              {beanstandungen.map((b) => (
                <li key={b.key} className="text-sm">
                  <span className="font-mono">{b.headline}</span>
                  <span className="block text-xs text-muted-foreground mt-1 leading-relaxed">
                    {b.reason}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>

      {/* Wärmeausdehnung */}
      <Section
        id="ausdehnung"
        title={t.expansion}
        lead={t.expansionLead}
        source={EXPANSION_SOURCE}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {ausdehnungKarten.map((k) => (
            <div key={k.label} className="p-6 rounded-xl border border-card-border bg-card">
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                {k.label}
              </div>
              <div className="font-mono text-2xl font-bold text-primary">{k.display}</div>
            </div>
          ))}
        </div>
        <div className="p-6 rounded-xl border border-card-border bg-card font-mono text-sm flex flex-col gap-2">
          {formeln.map((f) => (
            <div key={f}>{f}</div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-6 max-w-3xl leading-relaxed">
          {isDe ? EXPANSION_NOTES.principleDe : EXPANSION_NOTES.principleEn}
        </p>
      </Section>

      {/* Schweißparameter */}
      <Section id="schweissen" title={t.welding} lead={t.weldingLead} source="S. 41">
        <Table>
          <thead>
            <tr>
              <th className={TH}>{t.diameter}</th>
              <th className={TH}>{t.heating}</th>
              <th className={TH}>{t.processing}</th>
              <th className={TH}>{t.cooling}</th>
              <th className={TH}>{t.depth}</th>
            </tr>
          </thead>
          <tbody>
            {schweissZeilen.map((row) => (
              <tr key={row.d}>
                <td className={`${TD} font-mono font-semibold`}>{row.d}</td>
                <td className={`${TD} font-mono`}>{row.heating}</td>
                <td className={`${TD} font-mono`}>{row.processing}</td>
                <td className={`${TD} font-mono`}>{row.cooling}</td>
                <td className={`${TD} font-mono`}>{row.depth}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>

      {/* Normen */}
      <Section
        id="normen"
        title={t.standards}
        lead={t.standardsLead}
        source={STANDARDS_SOURCE}
      >
        <Table>
          <tbody>
            {STANDARDS.map((s) => (
              <tr key={s.code}>
                <td className={`${TD} font-mono font-semibold align-top`}>{s.code}</td>
                <td className={`${TD} whitespace-normal`}>
                  {isDe ? s.titleDe : s.titleEn}
                  {s.parts ? (
                    <ul className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground">
                      {s.parts.map((p) => (
                        <li key={p.part}>
                          <span className="font-mono me-2">{p.part}</span>
                          {isDe ? p.titleDe : p.titleEn}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="mt-6 p-6 rounded-xl border border-card-border bg-card">
          <h4 className="font-heading font-bold text-sm mb-2">{t.supervision}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isDe ? QUALITY_SUPERVISION.textDe : QUALITY_SUPERVISION.textEn}
          </p>
        </div>
      </Section>
    </div>
  );
}
