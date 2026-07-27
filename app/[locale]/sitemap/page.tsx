import React from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { constructMetadata } from '@/lib/seo/metadata';
import type { Metadata } from 'next';
import { getAllProducts } from '@/lib/products';
import { getAllNews, resolveLocalized } from '@/content/news';
import { GEO_HUBS, GEO_MARKETS } from '@/lib/data/geo';
import { routing } from '@/lib/i18n/routing';

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  return constructMetadata({
    title: "Sitemap | K-Aqua",
    description: "Sitemap der K-Aqua Website mit allen Produkten, News und Ressourcen.",
    path: "/sitemap",
    locale,
  });
}

export default async function SitemapPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'nav' });

  const products = getAllProducts();
  const news = getAllNews();

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <section className="relative overflow-hidden pt-32 pb-16 lg:py-40 border-b border-card-border">
        <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
          <h1 className="text-h1 font-heading font-extrabold tracking-tight text-foreground leading-[1.1] mt-4 mb-4">
            HTML Sitemap
          </h1>
          <p className="text-xl text-muted-foreground font-normal mb-6" data-nosnippet="true">
            {locale === 'de' ? 'Willkommen auf unserer vollumfänglichen HTML Sitemap. Hier finden Sie sämtliche verfügbaren Seiten und Unterseiten unserer Webpräsenz auf einen Blick übersichtlich und strukturiert aufgelistet, um Ihnen die Orientierung zu erleichtern.' 
             : locale === 'en' ? 'Welcome to our comprehensive HTML Sitemap. Here you will find all available pages and subpages of our website listed clearly and structured at a glance to make orientation easier for you.'
             : 'مرحبًا بك في خريطة موقع HTML الشاملة الخاصة بنا. ستجد هنا جميع الصفحات والصفحات الفرعية المتاحة لموقعنا مدرجة بوضوح وهيكلة لتسهيل التوجيه.'}
            <span className="sr-only"> - K-Aqua HTML Sitemap</span>
          </p>
          <p className="sr-only">
              HTML Sitemap
              {locale === 'de' ? 'Willkommen auf unserer vollumfänglichen HTML Sitemap. Hier finden Sie sämtliche verfügbaren Seiten und Unterseiten unserer Webpräsenz auf einen Blick übersichtlich und strukturiert aufgelistet, um Ihnen die Orientierung zu erleichtern.' 
               : locale === 'en' ? 'Welcome to our comprehensive HTML Sitemap. Here you will find all available pages and subpages of our website listed clearly and structured at a glance to make orientation easier for you.'
               : 'مرحبًا بك في خريطة موقع HTML الشاملة الخاصة بنا. ستجد هنا جميع الصفحات والصفحات الفرعية المتاحة لموقعنا مدرجة بوضوح وهيكلة لتسهيل التوجيه.'}
               - K-Aqua HTML Sitemap
          </p>
          <div className="mt-6 space-y-4 text-lg text-muted-foreground" data-nosnippet="true">
            <p>
              {locale === 'de' ? 'Die K-Aqua Website ist umfangreich und bietet detaillierte Informationen zu unseren hochmodernen PP-R und PPRCT Rohrsystemen, Formteilen, Armaturen und branchenspezifischen Lösungen. Nutzen Sie diese HTML Sitemap als zentralen Navigationsknotenpunkt, um ohne Umwege direkt zu den gewünschten Produktdatenblättern, Ausschreibungstexten, technischen Katalogen oder zu unserem interaktiven Produktfinder zu gelangen.'
               : locale === 'en' ? 'The K-Aqua website is extensive and offers detailed information about our ultra-modern PP-R and PPRCT piping systems, fittings, valves, and industry-specific solutions. Use this HTML sitemap as a central navigation hub to go straight to the desired product data sheets, technical catalogs, or our interactive product finder.'
               : 'يقدم موقع K-Aqua معلومات تفصيلية عن أنظمة أنابيب PP-R و PPRCT فائقة الحداثة، والتجهيزات، والصمامات، والحلول الخاصة بالصناعة. استخدم خريطة الموقع هذه كمركز تنقل للوصول مباشرة إلى أوراق بيانات المنتج أو الكتالوجات الفنية.'}
            </p>
            <p>
              {locale === 'de' ? 'Egal, ob Sie als Fachplaner nach spezifischen SDR-Klassen für ein industrielles Großprojekt suchen, als Installateur die passenden Schweißwerkzeuge benötigen, oder sich als Bauherr über die nachhaltigen Aspekte und CO2-Einsparungen unserer Produkte informieren möchten – die Sitemap führt Sie zielgerichtet an den richtigen Ort. Zudem finden Sie hier direkten Zugang zu unseren globalen Marktniederlassungen, aktuellen Unternehmensnachrichten sowie unserer K-Aqua Academy für professionelle Schulungen.'
               : locale === 'en' ? 'Whether you are a technical planner looking for specific SDR classes for a major industrial project, an installer in need of the right welding tools, or a builder wanting to find out about the sustainable aspects and CO2 savings of our products – the sitemap will guide you to the right place. You will also find direct access to our global market branches and company news.'
               : 'سواء كنت مخططًا تقنيًا يبحث عن فئات SDR محددة لمشروع صناعي كبير، أو مُركِّبًا يحتاج إلى أدوات اللحام المناسبة، أو منشئًا يرغب في التعرف على الجوانب المستدامة وتوفير ثاني أكسيد الكربون لمنتجاتنا - فإن خريطة الموقع سترشدك إلى المكان الصحيح.'}
            </p>
            <p>
              {locale === 'de' ? 'Eine transparente und logisch aufgebaute Architektur ist uns wichtig. Diese Sitemap unterstützt nicht nur unsere Besucher bei der schnellen Informationsbeschaffung, sondern hilft auch Suchmaschinen-Crawlern dabei, die Zusammenhänge und Hierarchien unserer Inhalte optimal zu erfassen und zu indexieren. Wir aktualisieren diese Übersicht kontinuierlich, um neue Produkte und Serviceangebote zeitnah abzubilden.'
               : locale === 'en' ? 'A transparent and logically structured architecture is important to us. This sitemap not only helps our visitors to find information quickly, but also helps search engine crawlers to optimally record and index the relationships and hierarchies of our content. We continuously update this overview to reflect new products and services.'
               : 'تعتبر الهندسة المعمارية الشفافة والمنظمة منطقيًا مهمة بالنسبة لنا. لا تساعد خريطة الموقع هذه زوارنا في العثور على المعلومات بسرعة فحسب، بل تساعد أيضًا زواحف محركات البحث على تسجيل وفهرسة علاقات وتسلسلات محتوياتنا بشكل مثالي.'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* Main Pages */}
          <div>
            <h2 className="text-2xl font-bold mb-6 font-heading text-primary">Hauptseiten</h2>
            <ul className="flex flex-col gap-3">
              <li><Link href="/" className="hover:text-primary transition-colors">{t('home') || 'Startseite'}</Link></li>
              <li><Link href="/produkte" className="hover:text-primary transition-colors">{t('products') || 'Produkte'}</Link></li>
              <li><Link href="/maerkte" className="hover:text-primary transition-colors">{t('markets') || 'Märkte'}</Link></li>
              <li><Link href="/loesungen" className="hover:text-primary transition-colors">{t('solutions') || 'Lösungen'}</Link></li>
              <li><Link href="/academy" className="hover:text-primary transition-colors">{t('academy') || 'Academy'}</Link></li>
              <li><Link href="/news" className="hover:text-primary transition-colors">{t('news') || 'News'}</Link></li>
              <li><Link href="/referenzen" className="hover:text-primary transition-colors">{t('references') || 'Referenzen'}</Link></li>
              <li><Link href="/unternehmen" className="hover:text-primary transition-colors">{t('about') || 'Unternehmen'}</Link></li>
              <li><Link href="/karriere" className="hover:text-primary transition-colors">{t('career') || 'Karriere'}</Link></li>
              <li><Link href="/kontakt" className="hover:text-primary transition-colors">{t('contact') || 'Kontakt'}</Link></li>
              <li><Link href="/impressum" className="hover:text-primary transition-colors">Impressum</Link></li>
              <li><Link href="/datenschutz" className="hover:text-primary transition-colors">Datenschutz</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h2 className="text-2xl font-bold mb-6 font-heading text-primary">Produkte & Kategorien</h2>
            <div className="flex flex-col gap-6">
              {Object.entries(productsByCategory).map(([category, prods]) => (
                <div key={category}>
                  <Link href={`/produkte/${category}`} className="block text-lg font-bold mb-3 uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
                    {category}
                  </Link>
                  <ul className="flex flex-col gap-2">
                    {prods.map(p => (
                      <li key={p.slug}>
                        <Link href={`/produkte/${category}/${p.slug}`} className="hover:text-primary transition-colors text-sm">
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* News & Academy */}
          <div>
            <h2 className="text-2xl font-bold mb-6 font-heading text-primary">News & Presse</h2>
            <ul className="flex flex-col gap-2 mb-12">
              {news.map(n => (
                <li key={n.slug}>
                  <Link href={`/news/${n.slug}`} className="hover:text-primary transition-colors text-sm">
                    {resolveLocalized(n.title, locale)}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold mb-6 font-heading text-primary">Märkte & Regionen</h2>
            <div className="flex flex-col gap-6">
              {GEO_HUBS.map(hub => {
                const hubMarkets = GEO_MARKETS.filter(m => m.hubSlug === hub.slug);
                return (
                  <div key={hub.slug}>
                    <Link href={`/maerkte/${hub.slug}`} className="block text-lg font-bold mb-3 uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
                      {hub.name}
                    </Link>
                    {hubMarkets.length > 0 && (
                      <ul className="flex flex-col gap-2">
                        {hubMarkets.map(market => (
                          <li key={market.slug}>
                            <Link href={`/maerkte/${hub.slug}/${market.slug}`} className="hover:text-primary transition-colors text-sm">
                              {market.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
