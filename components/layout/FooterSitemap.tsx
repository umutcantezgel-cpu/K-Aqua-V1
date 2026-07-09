"use client";

import { Link } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function FooterSitemap() {
  const t = useTranslations('FooterSitemap');

  const sitemapGroups = [
    {
      id: 'products',
      links: [
        { href: '/produkte', labelId: 'all_products', fallback: 'Alle Produkte' },
        { href: '/produkte/rohre', labelId: 'pipes', fallback: 'Rohre & Rohrsysteme' },
        { href: '/produkte/fittings', labelId: 'fittings', fallback: 'Formteile & Fittings' },
        { href: '/produkte/armaturen', labelId: 'valves', fallback: 'Armaturen & Ventile' },
        { href: '/produkte/werkzeuge', labelId: 'tools', fallback: 'Werkzeuge & Zubehör' },
        { href: '/produkte/katalog', labelId: 'catalog', fallback: 'Gesamtkatalog' },
      ],
      fallback: 'Produkte'
    },
    {
      id: 'markets',
      links: [
        { href: '/maerkte', labelId: 'all_markets', fallback: 'Alle Märkte' },
        { href: '/maerkte/trinkwasser', labelId: 'potable_water', fallback: 'Trinkwasser' },
        { href: '/maerkte/klimaanlagen', labelId: 'hvac', fallback: 'Klima & Kühlung' },
        { href: '/maerkte/industrie', labelId: 'industrial', fallback: 'Industrieanlagen' },
        { href: '/maerkte/schiffbau', labelId: 'shipbuilding', fallback: 'Schiffbau' },
        { href: '/maerkte/landwirtschaft', labelId: 'agriculture', fallback: 'Landwirtschaft' },
      ],
      fallback: 'Märkte'
    },
    {
      id: 'solutions',
      links: [
        { href: '/loesungen', labelId: 'all_solutions', fallback: 'Alle Lösungen' },
        { href: '/loesungen/hochhaus', labelId: 'high_rise', fallback: 'Hochhausbau' },
        { href: '/loesungen/krankenhaus', labelId: 'hospitals', fallback: 'Krankenhäuser' },
        { href: '/loesungen/hotels', labelId: 'hotels', fallback: 'Hotels & Resorts' },
        { href: '/loesungen/rechenzentrum', labelId: 'datacenters', fallback: 'Rechenzentren' },
        { href: '/loesungen/vorfertigung', labelId: 'prefab', fallback: 'Vorfertigung' },
      ],
      fallback: 'Lösungen'
    },
    {
      id: 'academy',
      links: [
        { href: '/academy', labelId: 'overview', fallback: 'Academy Übersicht' },
        { href: '/academy/schulungen', labelId: 'trainings', fallback: 'Schulungen' },
        { href: '/academy/webinare', labelId: 'webinars', fallback: 'Webinare' },
        { href: '/academy/zertifizierung', labelId: 'certification', fallback: 'Zertifikate' },
        { href: '/academy/faq', labelId: 'faq', fallback: 'FAQ & Wissen' },
        { href: '/academy/glossar', labelId: 'glossary', fallback: 'Glossar' },
      ],
      fallback: 'Academy'
    },
    {
      id: 'resources',
      links: [
        { href: '/ressourcen/downloads', labelId: 'downloads', fallback: 'Downloads' },
        { href: '/ressourcen/bim-daten', labelId: 'bim_data', fallback: 'BIM Daten' },
        { href: '/ressourcen/co2-rechner', labelId: 'co2_calc', fallback: 'CO2-Rechner' },
        { href: '/ressourcen/ausschreibungstexte', labelId: 'specifications', fallback: 'Ausschreibungstexte' },
        { href: '/referenzen', labelId: 'references', fallback: 'Referenzen' },
        { href: '/ressourcen/support', labelId: 'support', fallback: 'Technischer Support' },
      ],
      fallback: 'Ressourcen'
    },
    {
      id: 'company',
      links: [
        { href: '/unternehmen', labelId: 'about_us', fallback: 'Über uns' },
        { href: '/unternehmen/karriere', labelId: 'career', fallback: 'Karriere' },
        { href: '/unternehmen/news', labelId: 'news', fallback: 'News & Presse' },
        { href: '/unternehmen/kontakt', labelId: 'contact', fallback: 'Kontakt' },
        { href: '/unternehmen/partner', labelId: 'partners', fallback: 'Partnernetzwerk' },
        { href: '/trust-center', labelId: 'trust', fallback: 'Trust Center' },
      ],
      fallback: 'Unternehmen'
    },
  ];

  const getTranslation = (key: string, fallback: string) => {
    try {
      const translation = t(key);
      return translation && typeof translation === 'string' ? translation : fallback;
    } catch {
      return fallback;
    }
  };

  return (
    <div className="bg-inverse-surface/95 border-t border-inverse-foreground/10 py-16 md:py-24 relative z-10 text-inverse-foreground">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {sitemapGroups.map((group) => (
            <motion.div 
              key={group.id} 
              className="flex flex-col gap-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
              }}
            >
              <h3 className="font-heading font-bold text-tiny tracking-wider uppercase opacity-55 mb-2 select-none">
                {getTranslation(`${group.id}.title`, group.fallback)}
              </h3>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href as any}
                      className="text-body text-small opacity-75 hover:opacity-100 hover:text-primary transition-colors py-1 inline-flex items-center"
                    >
                      {getTranslation(`${group.id}.links.${link.labelId}`, link.fallback)}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
