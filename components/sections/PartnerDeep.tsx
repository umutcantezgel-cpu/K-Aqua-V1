// K-Aqua - PartnerDeep: KESSEL-Ökosystem, Wasserwege (Versorgung+Entwässerung), gemeinsame
// Roadmap, Spezifikations-Kanäle (GAEB/BIM/Datenblätter).
//
// QUELLE: kaqua-deep-sections-2.jsx (PartnerDeep). PORTIERT 1:1 (4 Abschnitte).
// ANGEPASST: usePageL('partnerx') -> getTranslations('partnerx') (Server Component).
// BentoCard -> Card. Roadmap-Schritte behalten den Status-Chip (r.s: "Heute"/"Im Ausbau"/
// "Perspektive") bei - dafür kein StepFlow (das kennt keinen Chip), sondern die
// Original-Markup-Struktur 1:1 nachgebaut.
// Reine Server Component -> KEIN "use client".
import React from "react";
import { getTranslations, getLocale } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Card } from "@/components/ui/Card";

interface EcoItem {
  t: string;
  d: string;
}
interface FlowItem {
  t: string;
  d: string;
}
interface RoadItem {
  t: string;
  d: string;
  s: string;
}
interface SpecItem {
  t: string;
  d: string;
}

export async function PartnerDeep() {
  const locale = await getLocale();
  const t = await getTranslations("partnerx");
  const eco = t.raw("eco") as EcoItem[];
  const flow = t.raw("flow") as FlowItem[];
  const road = t.raw("road") as RoadItem[];
  const spec = t.raw("spec") as SpecItem[];

  return (
    <React.Fragment>
      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="partner-ecosystem">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("ecoEyebrow")} title={t("ecoTitle")} lead={t("ecoLead")} />
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {eco.map((e, i) => (
              <Reveal key={e.t} delay={i * 0.07}>
                <Card className="h-full">
                  <div className="font-heading text-small font-bold text-foreground">{e.t}</div>
                  <p className="text-tiny text-muted-foreground">{e.d}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="partner-flow">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("flowEyebrow")} title={t("flowTitle")} lead={t("flowLead")} />
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {flow.map((f, i) => (
              <Reveal key={f.t} delay={i * 0.08}>
                <Card tint={i === 2} className="h-full">
                  <div className="font-heading text-body font-bold text-foreground">{f.t}</div>
                  <p className="text-small text-muted-foreground">{f.d}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[clamp(64px,9vw,120px)]" data-screen-label="partner-roadmap">
        <div className="mx-auto max-w-[760px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("roadEyebrow")} title={t("roadTitle")} />
          </Reveal>
          <div className="flex flex-col">
            {road.map((r, i) => (
              <div
                key={r.t}
                className={i > 0 ? "grid grid-cols-[44px_minmax(0,1fr)] gap-4 border-t border-dashed border-card-border py-4" : "grid grid-cols-[44px_minmax(0,1fr)] gap-4 py-4"}
              >
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft font-heading text-lead font-extrabold text-primary"
                >
                  {i + 1}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="font-heading text-body font-bold text-foreground">{r.t}</div>
                    <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-tiny font-bold text-primary">{r.s}</span>
                  </div>
                  <p className="text-small leading-relaxed text-muted-foreground">{r.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-subtle py-[clamp(64px,9vw,120px)]" data-screen-label="partner-spec">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal>
            <SectionHead eyebrow={t("specEyebrow")} title={t("specTitle")} lead={t("specLead")} />
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {spec.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.08}>
                <Card className="h-full">
                  <div className="font-heading text-small font-bold text-foreground">{s.t}</div>
                  <p className="text-tiny text-muted-foreground">{s.d}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[clamp(64px,9vw,120px)] border-t border-card-border" data-screen-label="partner-seo-block">
        <div className="mx-auto max-w-[800px] px-6">
          <div className="prose dark:prose-invert text-muted-foreground text-sm max-w-none text-start">
            {locale === 'de' && (
              <>
                <p className="mb-4">
                  Die K-Aqua Partnerschaft ist ein strategisches Bündnis, das weit über herkömmliche Lieferantenbeziehungen hinausgeht. In der modernen Gebäude- und Infrastrukturtechnik sind Synergien zwischen Komponentenherstellern und Systemintegratoren entscheidend für den Projekterfolg. Durch unser tief integriertes Partner-Ökosystem gewährleisten wir, dass PP-R und PP-RCT Rohrsysteme nahtlos mit modernsten Entwässerungslösungen und Gebäudesteuerungen harmonieren. Diese ganzheitliche Herangehensweise eliminiert Schnittstellenverluste während der Planungs- und Ausführungsphase.
                </p>
                <p className="mb-4">
                  Ein Kernbestandteil unserer Kooperation ist der konsequente Wissensaustausch. Über unsere Academy-Plattform erhalten Partner exklusiven Zugang zu spezialisierten Schulungen im Bereich Heizelement-Muffenschweißung (Socket Fusion) und Stumpfschweißung (Butt Welding). Wir vermitteln tiefgreifendes technisches Know-how über die thermische Längenausdehnung von Kunststoffen, korrekte Befestigungsabstände und die hydraulische Optimierung von komplexen Netzwerken. Dieses Wissen ist essenziell, um die volle Leistungsfähigkeit und die über 50-jährige Lebensdauer unserer Systeme in der Praxis zu realisieren.
                </p>
                <p>
                  Darüber hinaus treiben wir gemeinsam mit unseren Partnern die Digitalisierung der Baubranche voran. Die Bereitstellung von hochpräzisen BIM-Daten (Building Information Modeling) und standardisierten GAEB-Ausschreibungstexten ermöglicht eine fehlerfreie, modellbasierte Planung. Ob in Trinkwasserinstallationen mit höchsten hygienischen Anforderungen, in industriellen Kühlkreisläufen oder bei großvolumigen Fernwärmeprojekten – eine K-Aqua Partnerschaft bedeutet Planungssicherheit, höchste Materialqualität und einen direkten Draht zu unserem "German Engineering" Support-Team. Gemeinsam setzen wir den Standard für die Wasserinfrastruktur der Zukunft.
                </p>
              </>
            )}
            {locale === 'en' && (
              <>
                <p className="mb-4">
                  The K-Aqua partnership is a strategic alliance that goes far beyond conventional supplier relationships. In modern building and infrastructure technology, synergies between component manufacturers and system integrators are crucial for project success. Through our deeply integrated partner ecosystem, we ensure that PP-R and PP-RCT piping systems harmonize seamlessly with state-of-the-art drainage solutions and building controls. This holistic approach eliminates interface losses during the planning and execution phases.
                </p>
                <p className="mb-4">
                  A core component of our cooperation is consistent knowledge exchange. Through our Academy platform, partners gain exclusive access to specialized training in socket fusion and butt welding techniques. We impart in-depth technical know-how regarding the thermal expansion of plastics, correct support spacing, and the hydraulic optimization of complex networks. This knowledge is essential to realize the full performance capability and the over 50-year lifespan of our systems in practical applications.
                </p>
                <p>
                  Furthermore, together with our partners, we are driving the digitalization of the construction industry forward. The provision of high-precision BIM (Building Information Modeling) data and standardized specification texts enables flawless, model-based planning. Whether in potable water installations with the highest hygienic requirements, industrial cooling circuits, or large-volume district heating projects – a K-Aqua partnership means planning security, the highest material quality, and a direct line to our "German Engineering" support team. Together, we are setting the standard for the water infrastructure of the future.
                </p>
              </>
            )}
            {locale === 'ar' && (
              <div dir="rtl">
                <p className="mb-4">
                  إن شراكة K-Aqua هي تحالف استراتيجي يتجاوز بكثير علاقات الموردين التقليدية. في تكنولوجيا المباني والبنية التحتية الحديثة، يعتبر التآزر بين مصنعي المكونات ومكملي الأنظمة أمرًا حاسمًا لنجاح المشروع. من خلال نظامنا البيئي المتكامل للشراكة، نضمن أن أنظمة أنابيب PP-R و PP-RCT تتناغم بسلاسة مع أحدث حلول الصرف الصحي وأنظمة التحكم في المباني. يزيل هذا النهج الشامل خسائر الواجهة أثناء مرحلتي التخطيط والتنفيذ.
                </p>
                <p className="mb-4">
                  المكون الأساسي لتعاوننا هو التبادل المستمر للمعرفة. من خلال منصة الأكاديمية الخاصة بنا، يحصل الشركاء على وصول حصري إلى تدريب متخصص في تقنيات اللحام بالصهر الحراري واللحام التناكبي. نحن ننقل المعرفة الفنية المتعمقة فيما يتعلق بالتمدد الحراري للمواد البلاستيكية، والمسافات الصحيحة للدعامات، والتحسين الهيدروليكي للشبكات المعقدة. هذه المعرفة ضرورية لتحقيق القدرة الكاملة للأداء وعمر افتراضي يزيد عن 50 عامًا لأنظمتنا في التطبيقات العملية.
                </p>
                <p>
                  علاوة على ذلك، وبالتعاون مع شركائنا، نحن ندفع رقمنة صناعة البناء إلى الأمام. يتيح توفير بيانات نمذجة معلومات البناء (BIM) عالية الدقة ونصوص المواصفات الموحدة تخطيطًا خاليًا من الأخطاء قائمًا على النماذج. سواء في تركيبات مياه الشرب التي تتطلب أعلى المتطلبات الصحية، أو دوائر التبريد الصناعية، أو مشاريع التدفئة المركزية ذات الحجم الكبير - تعني شراكة K-Aqua أمان التخطيط، وأعلى جودة للمواد، وخط اتصال مباشر مع فريق دعم "الهندسة الألمانية" لدينا. معًا، نضع معيارًا للبنية التحتية للمياه في المستقبل.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
