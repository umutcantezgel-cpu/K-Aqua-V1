"use client";

import { Link } from '@/lib/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { GEO_MARKETS } from '@/lib/data/geo';

const sitemapGroups = [
  {
    id: 'products',
    links: [
      { href: '/produkte', labelId: 'all_products', fallback: 'Alle Produkte' },
      { href: '/produkte/finder', labelId: 'finder', fallback: 'Product Finder' },
      { href: '/produkte/pipes', labelId: 'pipes', fallback: 'Rohre & Rohrsysteme' },
      { href: '/produkte/fittings', labelId: 'fittings', fallback: 'Formteile & Fittings' },
      { href: '/produkte/valves', labelId: 'valves', fallback: 'Armaturen & Ventile' },
      { href: '/produkte/tools', labelId: 'tools', fallback: 'Werkzeuge & Zubehör' },
      { href: '/produkte/transition-fittings', labelId: 'transition', fallback: 'Übergänge' },
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
      ...GEO_MARKETS.map(market => ({
        href: `/maerkte/${market.slug}`,
        labelId: `geo_${market.slug}`,
        fallback: market.city
      }))
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
      { href: '/wissen', labelId: 'wissen', fallback: 'Wissensdatenbank' },
      { href: '/academy/schulungen', labelId: 'trainings', fallback: 'Schulungen' },
      { href: '/academy/webinare', labelId: 'webinars', fallback: 'Webinare' },
      { href: '/academy/zertifizierung', labelId: 'certification', fallback: 'Zertifikate' },
      { href: '/academy/faq', labelId: 'faq', fallback: 'FAQ & Wissen' },
      { href: '/academy/glossar', labelId: 'glossary', fallback: 'Glossar' },
    ],
    fallback: 'Academy & Wissen'
  },
  {
    id: 'resources',
    links: [
      { href: '/ressourcen/downloads', labelId: 'downloads', fallback: 'Downloads' },
      { href: '/ressourcen/bim-daten', labelId: 'bim_data', fallback: 'BIM Daten' },
      { href: '/co2-rechner', labelId: 'co2_calc', fallback: 'CO2-Rechner' },
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
      { href: '/karriere', labelId: 'career', fallback: 'Karriere' },
      { href: '/news', labelId: 'news', fallback: 'News & Presse' },
      { href: '/kontakt', labelId: 'contact', fallback: 'Kontakt' },
      { href: '/service', labelId: 'service', fallback: 'Service' },
      { href: '/projektanfrage', labelId: 'rfq', fallback: 'Projektanfrage' },
      { href: '/partnerschaft', labelId: 'partners', fallback: 'Partnernetzwerk' },
      { href: '/trust-center', labelId: 'trust', fallback: 'Trust Center' },
    ],
    fallback: 'Unternehmen'
  },
];

function FooterAccordionGroup({ group }: { group: typeof sitemapGroups[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="flex flex-col border-b border-white/10 lg:border-none lg:block"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
      }}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 lg:py-0 lg:mb-4 text-start font-heading font-bold text-tiny tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity select-none lg:cursor-default"
      >
        <span>{group.fallback}</span>
        <ChevronDown 
          size={16} 
          className={`lg:hidden transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Mobile/Tablet Accordion Content */}
      <AnimatePresence initial={false}>
        {(isOpen) && (
          <motion.ul 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-col gap-3 overflow-hidden lg:hidden pb-4"
          >
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href as any}
                  className="text-body text-small opacity-75 hover:opacity-100 hover:text-white transition-colors py-1 inline-flex items-center"
                >
                  {link.fallback}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Desktop Always Visible Content */}
      <ul className="hidden lg:flex flex-col gap-3">
        {group.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href as any}
              className="text-body text-small opacity-75 hover:opacity-100 hover:text-white transition-colors py-1 inline-flex items-center"
            >
              {link.fallback}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function FooterSitemap() {
  return (
    <div className="w-full relative z-10 text-inverse-foreground">
      <div className="w-full">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-8 lg:gap-y-12"
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
            <FooterAccordionGroup key={group.id} group={group} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
