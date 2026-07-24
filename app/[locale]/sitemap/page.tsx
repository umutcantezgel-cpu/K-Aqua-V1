import React from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { constructMetadata } from '@/lib/seo/metadata';
import type { Metadata } from 'next';
import { getAllProducts } from '@/lib/products';
import { getAllNews, resolveLocalized } from '@/content/news';
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
          <h1 className="text-h1 font-heading font-extrabold tracking-tight mt-4 mb-6 text-foreground leading-[1.1]">
            HTML Sitemap
          </h1>
          <p className="text-xl text-muted-foreground">Alle Seiten auf einen Blick</p>
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
            <h2 className="text-2xl font-bold mb-6 font-heading text-primary">Produkte</h2>
            <div className="flex flex-col gap-6">
              {Object.entries(productsByCategory).map(([category, prods]) => (
                <div key={category}>
                  <h3 className="text-lg font-bold mb-3 uppercase tracking-wider text-muted-foreground">{category}</h3>
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
            <ul className="flex flex-col gap-2 mb-8">
              {news.map(n => (
                <li key={n.slug}>
                  <Link href={`/news/${n.slug}`} className="hover:text-primary transition-colors text-sm">
                    {resolveLocalized(n.title, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
}
