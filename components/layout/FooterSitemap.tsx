"use client";

import { Link } from '@/lib/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const sitemapGroups = [
  {
    id: 'products',
    links: [
      { href: '/produkte', labelId: 'all_products', fallback: 'Alle K-Aqua Produkte' },
      { href: '/produkte/finder', labelId: 'finder', fallback: 'Product Finder für Rohre' },
      { href: '/produkte/pipes', labelId: 'pipes', fallback: 'Rohre & Rohrsysteme (PP-R)' },
      { href: '/produkte/fittings', labelId: 'fittings', fallback: 'Formteile & Fittings' },
      { href: '/produkte/valves', labelId: 'valves', fallback: 'Armaturen & Ventile' },
      { href: '/produkte/tools', labelId: 'tools', fallback: 'Werkzeuge & Zubehör' },
      { href: '/produkte/transition-fittings', labelId: 'transition', fallback: 'Übergänge für Rohre' },
    ],
    fallback: 'Produkte'
  },
  {
    id: 'markets-solutions',
    links: [
      { href: '/maerkte', labelId: 'all_markets', fallback: 'Alle K-Aqua Märkte' },
      { href: '/loesungen', labelId: 'all_solutions', fallback: 'Alle K-Aqua Lösungen' }
    ],
    fallback: 'Märkte & Lösungen'
  },
  {
    id: 'academy-resources',
    links: [
      { href: '/academy', labelId: 'overview', fallback: 'K-Aqua Academy Übersicht' },
      { href: '/co2-rechner', labelId: 'co2_calc', fallback: 'CO2-Rechner für PP-R' },
      { href: '/ressourcen/ausschreibungstexte', labelId: 'specifications', fallback: 'K-Aqua Ausschreibungstexte' },
      { href: '/referenzen', labelId: 'references', fallback: 'K-Aqua Referenzen weltweit' },
      { href: '/ressourcen/support', labelId: 'support', fallback: 'Technischer Support für K-Aqua' },
    ],
    fallback: 'Academy & Ressourcen'
  },
  {
    id: 'company',
    links: [
      { href: '/unternehmen', labelId: 'about_us', fallback: 'Über K-Aqua' },
      { href: '/karriere', labelId: 'career', fallback: 'Karriere bei K-Aqua' },
      { href: '/news', labelId: 'news', fallback: 'K-Aqua News & Presse' },
      { href: '/kontakt', labelId: 'contact', fallback: 'K-Aqua Kontaktieren' },
      { href: '/service', labelId: 'service', fallback: 'K-Aqua Service & Wartung' },
      { href: '/projektanfrage', labelId: 'rfq', fallback: 'Projektanfrage für Rohrsysteme' },
      { href: '/partnerschaft', labelId: 'partners', fallback: 'K-Aqua Partnernetzwerk' },
      { href: '/trust-center', labelId: 'trust', fallback: 'K-Aqua Trust Center' },
      { href: '/sitemap', labelId: 'sitemap', fallback: 'Sitemap (HTML)' },
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
        className="flex w-full items-center justify-between py-4 lg:py-0 lg:mb-6 text-start font-heading font-bold text-[10px] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors select-none lg:cursor-default"
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
            className="flex flex-col gap-3 overflow-hidden lg:hidden pb-6"
          >
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  href={link.href as any}
                  className="group inline-flex items-center text-sm text-white/60 hover:text-white transition-colors py-1"
                >
                  <span className="transform transition-transform duration-300 ease-out group-hover:translate-x-1">
                    {link.fallback}
                  </span>
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Desktop Always Visible Content */}
      <ul className="hidden lg:flex flex-col gap-3.5">
        {group.links.map((link) => (
          <li key={link.href}>
            <Link
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              href={link.href as any}
              className="group inline-flex items-center text-sm text-white/60 hover:text-white transition-colors py-1"
            >
              <span className="transform transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                {link.fallback}
              </span>
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-y-12"
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
