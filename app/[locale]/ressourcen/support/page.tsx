import React from 'react';
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from '@/components/ui/icon';
import { CTABand } from '@/components/ui/CTABand';
import { getTranslations, setRequestLocale } from 'next-intl/server';

// Premium Scroll-Telling Components
import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'resources.support' });
  
  return constructMetadata({
    title: `${t('title')} | K-Aqua`,
    description: t('metaDesc'),
    path: "/ressourcen/support",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'resources' });
  const tMeta = await getTranslations({ locale, namespace: 'resources.support' });
  const jsonLd = await getWebPageJsonLd(locale, "support", "WebPage", { title: tMeta('metaTitle'), description: tMeta('metaDesc') });

  return (
    <>
      <JsonLd schema={jsonLd} />
      <div className="sr-only">
        {locale === 'de' ? 'Technischer Support & Kundenservice | K-Aqua' : locale === 'ar' ? 'الدعم الفني وخدمة العملاء | K-Aqua' : 'Technical Support & Customer Service | K-Aqua'}
      </div>
      <div className="sr-only">{t('support.hero.title1')} {t('support.hero.title2')}</div>
      <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      
      {/* 1) Epic Parallax Hero */}
      <ParallaxHero
        eyebrow={t('support.hero.eyebrow')}
        title={
          <>
            {t('support.hero.title1')} <br /> <span className="text-muted-foreground">{t('support.hero.title2')}</span>
          </>
        }
        description={t('support.hero.desc')}
      >
        <Button variant="primary" size="lg" href="/projektanfrage">{t('support.hero.btnPrimary')}</Button>
        <Button variant="ghost" size="lg" href="#protocols">{t('support.hero.btnGhost')}</Button>
      </ParallaxHero>

      {/* 2) Core Philosophy / Intro */}
      <section className="py-32 md:py-48 bg-background border-b border-card-border overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-black tracking-tighter mb-10 leading-[1.05]">
              {t('support.intro.title1')} <br/>
              <span className="text-primary">{t('support.intro.title2')}</span>
            </h2>
            <div className="flex flex-col gap-8 text-xl sm:text-2xl text-muted-foreground leading-relaxed font-light">
              <p>
                {t('support.intro.p1')}
              </p>
              <p>
                {t('support.intro.p2')}
              </p>
              <p className="font-medium text-foreground text-2xl sm:text-3xl mt-4">
                {t('support.intro.p3')}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 4) Bento Grid: Engineering Services */}
      <section className="py-32 md:py-48 bg-background kq-band kq-band--slant-t relative z-10">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('support.bento.eyebrow')}
            title={t('support.bento.title')}
            lead={t('support.bento.lead')}
            align="center"
          />
          <div className="mt-24">
            <BentoGrid>
              <BentoGridItem
                title={t('support.bento.items.0.title')}
                description={t('support.bento.items.0.desc')}
                header={<PremiumAssetPlaceholder label={t('support.bento.items.0.title')} image="/images/new-k-aqua/pipes-profil.png" className="min-h-[240px]" />}
                colSpan={2}
              />
              <BentoGridItem
                title={t('support.bento.items.1.title')}
                description={t('support.bento.items.1.desc')}
                header={<PremiumAssetPlaceholder label={t('support.bento.items.1.title')} video="/videos/socket-welding-hand.mp4" className="min-h-[240px]" />}
                colSpan={1}
              />
              <BentoGridItem
                title={t('support.bento.items.2.title')}
                description={t('support.bento.items.2.desc')}
                header={<PremiumAssetPlaceholder label={t('support.bento.items.2.title')} video="/videos/factory.mp4" className="min-h-[240px]" />}
                colSpan={1}
              />
              <BentoGridItem
                title={t('support.bento.items.3.title')}
                description={t('support.bento.items.3.desc')}
                header={<PremiumAssetPlaceholder label={t('support.bento.items.3.title')} image="/images/new-k-aqua/fittings-profil.png" className="min-h-[240px]" />}
                colSpan={2}
              />
              <BentoGridItem
                title={t('support.bento.items.4.title')}
                description={t('support.bento.items.4.desc')}
                header={<PremiumAssetPlaceholder label={t('support.bento.items.4.title')} image="/images/new-k-aqua/weld-in-saddles.png" className="min-h-[300px]" />}
                colSpan={3}
              />
            </BentoGrid>
          </div>
        </div>
      </section>


      {/* 6) Deep Technical Metrics / Philosophy */}
      <section className="py-32 md:py-48 bg-card border-y border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col gap-8">
              <span className="font-heading font-bold text-sm tracking-widest uppercase text-primary">{t('support.metrics.badge')}</span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tighter leading-[1.05]">
                {t('support.metrics.title1')} <br/> <span className="text-muted-foreground">{t('support.metrics.title2')}</span>
              </h2>
              <div className="flex flex-col gap-6 text-muted-foreground leading-relaxed text-xl font-light">
                <p>
                  {t('support.metrics.p1')}
                </p>
                <p>
                  {t('support.metrics.p2')}
                </p>
              </div>
              <ul className="flex flex-col gap-6 mt-8">
                {[
                  t('support.metrics.items.0'),
                  t('support.metrics.items.1'),
                  t('support.metrics.items.2'),
                  t('support.metrics.items.3')
                ].map((li, i) => (
                  <li key={i} className="flex items-start gap-4 font-medium text-lg">
                    <span className="text-primary font-bold mt-1 shrink-0"><ArrowRight className="w-6 h-6" /></span> 
                    <span className="text-foreground">{li}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-full min-h-[700px] rounded-[2rem] overflow-hidden border border-card-border relative shadow-2xl">
              <PremiumAssetPlaceholder label={t('support.metrics.badge')} image="/images/new-k-aqua/fertigung-pipes.jpg" />
            </div>
          </div>
        </div>
      </section>

      {/* SEO Expansion Block for Thin Content Fix */}
      <section className="py-20 bg-background border-t border-card-border">
        <div className="mx-auto max-w-[800px] px-6">
          <div className="prose dark:prose-invert text-muted-foreground text-sm max-w-none text-start">
            {locale === 'de' && (
              <>
                <p className="mb-4">
                  Der technische Support von K-Aqua ist das Fundament für die erfolgreiche Umsetzung anspruchsvoller Gebäudeinfrastruktur-Projekte. Unser Expertenteam begleitet Sie von der ersten hydraulischen Auslegung über die Materialkalkulation bis hin zur finalen Bauabnahme. Wir verstehen, dass die Installation von PP-R und PP-RCT Rohrsystemen tiefgreifendes Fachwissen erfordert, insbesondere wenn es um die Kompensation von thermischer Längenausdehnung, die Dimensionierung von Steigleitungen oder die korrekte Durchführung der Heizelement-Muffenschweißung geht. 
                </p>
                <p className="mb-4">
                  Zusätzlich zu unserer persönlichen Beratung bieten wir ein umfassendes Spektrum an digitalen Ressourcen. Dazu gehören hochdetaillierte Produktdatenblätter, BIM-Modelle für die Kollisionsprüfung in der TGA-Planung sowie normgerechte Ausschreibungstexte für öffentliche und private Bauvorhaben. Im Bereich der Trinkwasserhygiene unterstützen wir Sie bei der Einhaltung strenger Richtlinien zur Vermeidung von Legionellenbildung, indem wir Spülpläne und Isolationsvorgaben bereitstellen.
                </p>
                <p>
                  Ob bei akuten Fragestellungen auf der Baustelle oder bei der langfristigen Projektplanung – der K-Aqua Support garantiert Ihnen höchste Zuverlässigkeit. Unsere Ingenieure bringen jahrzehntelange Erfahrung aus internationalen Großprojekten mit, von industriellen Kühlsystemen bis hin zu komplexen Fernwärmenetzen. Mit unserer "German Engineering" Philosophie sichern wir ab, dass Ihre Anlagen nicht nur heute reibungslos funktionieren, sondern auch in 50 Jahren noch den höchsten Effizienz- und Sicherheitsstandards entsprechen.
                </p>
              </>
            )}
            {locale === 'en' && (
              <>
                <p className="mb-4">
                  K-Aqua's technical support is the foundation for the successful implementation of demanding building infrastructure projects. Our expert team assists you from the initial hydraulic design and material calculation all the way to final building acceptance. We understand that installing PP-R and PP-RCT piping systems requires profound technical knowledge, particularly when dealing with the compensation of thermal expansion, sizing of risers, or the correct execution of socket fusion welding.
                </p>
                <p className="mb-4">
                  In addition to our personalized consulting, we offer a comprehensive spectrum of digital resources. These include highly detailed product data sheets, BIM models for clash detection in MEP planning, and standards-compliant specification texts for public and private construction projects. In the field of potable water hygiene, we support you in adhering to strict guidelines to prevent Legionella growth by providing flushing protocols and insulation specifications.
                </p>
                <p>
                  Whether addressing urgent questions on the job site or engaging in long-term project planning – K-Aqua Support guarantees maximum reliability. Our engineers bring decades of experience from major international projects, ranging from industrial cooling systems to complex district heating networks. With our "German Engineering" philosophy, we ensure that your installations not only function flawlessly today but will continue to meet the highest efficiency and safety standards for over 50 years.
                </p>
              </>
            )}
            {locale === 'ar' && (
              <div dir="rtl">
                <p className="mb-4">
                  يعتبر الدعم الفني من K-Aqua الأساس للتنفيذ الناجح لمشاريع البنية التحتية المعقدة للمباني. يرافقك فريق الخبراء لدينا بدءًا من التصميم الهيدروليكي الأولي وحساب المواد وصولاً إلى القبول النهائي للمبنى. نحن ندرك أن تركيب أنظمة أنابيب PP-R و PP-RCT يتطلب معرفة فنية عميقة، خاصة عند التعامل مع تعويض التمدد الحراري، وتحديد حجم الأنابيب الصاعدة، أو التنفيذ الصحيح للحام بالصهر الحراري.
                </p>
                <p className="mb-4">
                  بالإضافة إلى استشاراتنا الشخصية، نقدم مجموعة شاملة من الموارد الرقمية. ويشمل ذلك أوراق بيانات المنتجات عالية التفاصيل، ونماذج BIM لاكتشاف التعارضات في تخطيط الهندسة الميكانيكية والكهربائية والسباكة (MEP)، ونصوص المواصفات المطابقة للمعايير لمشاريع البناء العامة والخاصة. في مجال نظافة مياه الشرب، ندعمك في الالتزام بالمبادئ التوجيهية الصارمة لمنع نمو بكتيريا الفيلقية من خلال توفير بروتوكولات الشطف ومواصفات العزل.
                </p>
                <p>
                  سواء كان الأمر يتعلق بمعالجة أسئلة عاجلة في موقع العمل أو المشاركة في تخطيط المشاريع طويلة الأجل - يضمن دعم K-Aqua أقصى درجات الموثوقية. يجلب مهندسونا عقودًا من الخبرة من المشاريع الدولية الكبرى، بدءًا من أنظمة التبريد الصناعية إلى شبكات التدفئة المركزية المعقدة. من خلال فلسفتنا "الهندسة الألمانية"، نضمن أن منشآتك لن تعمل بشكل لا تشوبه شائبة اليوم فحسب، بل ستستمر في تلبية أعلى معايير الكفاءة والسلامة لأكثر من 50 عامًا.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7) Massive CTA */}
      <section className="py-32 md:py-48 bg-background relative overflow-hidden border-t border-card-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(var(--primary),0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <CTABand className="py-20 md:py-32">
            <div className="max-w-4xl flex flex-col items-start gap-8">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black text-inverse-foreground tracking-tighter leading-[1.05]">
                {t('support.cta.title1')} <br/> {t('support.cta.title2')} <br/> <span className="text-primary-foreground opacity-90">{t('support.cta.title3')}</span>
              </h2>
              <p className="text-2xl text-inverse-foreground/80 leading-relaxed font-light max-w-2xl">
                {t('support.cta.desc')}
              </p>
              <div className="flex flex-wrap gap-6 mt-8">
                <Button variant="inverse" size="lg" href="/projektanfrage" className="text-xl px-10 py-7 font-bold">{t('support.cta.btnPrimary')}</Button>
                <Button variant="ghost" size="lg" href="/kontakt" className="text-xl px-10 py-7 border-inverse-foreground/20 text-inverse-foreground hover:bg-inverse-surface/10 hover:border-inverse-foreground/50">{t('support.cta.btnGhost')}</Button>
              </div>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
    </>
  );
}
