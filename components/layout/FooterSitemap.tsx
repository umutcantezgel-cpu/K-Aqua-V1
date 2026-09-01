"use client";

import { Link } from '@/lib/i18n/navigation';
import { FluidLink } from '@/components/ui/FluidTransition';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { useRevealSafety } from '@/components/ui/Reveal';

// Beschriftungen kommen aus messages/<locale>.json unter footerSitemap.*.
// labelId und die Gruppen-id sind die Message-Keys.
const sitemapGroups = [
  {
    id: 'products',
    links: [
      { href: '/produkte', labelId: 'all_products' },
      { href: '/produkte/finder', labelId: 'finder' },
      { href: '/produkte/pipes', labelId: 'pipes' },
      { href: '/produkte/fittings', labelId: 'fittings' },
      { href: '/produkte/valves', labelId: 'valves' },
      { href: '/produkte/tools', labelId: 'tools' },
      { href: '/produkte/transition-fittings', labelId: 'transition' },
    ],
  },
  {
    id: 'markets-solutions',
    links: [
      { href: '/maerkte', labelId: 'all_markets' },
      { href: '/loesungen', labelId: 'all_solutions' },
    ],
  },
  {
    id: 'academy-resources',
    links: [
      { href: '/academy', labelId: 'overview' },
      { href: '/co2-rechner', labelId: 'co2_calc' },
      // Download-Center, BIM-Portal und Technikhandbuch standen weder hier noch
      // im Hauptmenue — drei von fuenf /ressourcen-Seiten waren ueber die
      // Navigation nicht erreichbar.
      { href: '/ressourcen/downloads', labelId: 'downloads' },
      { href: '/ressourcen/bim', labelId: 'bim' },
      { href: '/ressourcen/technik', labelId: 'technik' },
      { href: '/ressourcen/ausschreibungstexte', labelId: 'specifications' },
      { href: '/referenzen', labelId: 'references' },
      { href: '/ressourcen/support', labelId: 'support' },
    ],
  },
  {
    id: 'company',
    links: [
      { href: '/unternehmen', labelId: 'about_us' },
      { href: '/karriere', labelId: 'career' },
      { href: '/news', labelId: 'news' },
      { href: '/kontakt', labelId: 'contact' },
      { href: '/service', labelId: 'service' },
      { href: '/projektanfrage', labelId: 'rfq' },
      { href: '/partnerschaft', labelId: 'partners' },
      { href: '/trust-center', labelId: 'trust' },
      { href: '/sitemap', labelId: 'sitemap' },
      // Kein Link, sondern ein Aufruf des Einwilligungsdialogs. Art. 7 Abs. 3 DSGVO
      // verlangt, dass der Widerruf so einfach erreichbar ist wie die Erteilung.
      { href: '/datenschutz', labelId: 'cookieSettings', action: 'consent' as const },
    ],
  },
];

const mainRoutes = [
  '/', '/produkte', '/produkte/finder', '/loesungen', '/co2-rechner', 
  '/academy', '/trust-center', '/partnerschaft', '/service', '/maerkte', 
  '/referenzen', '/unternehmen', '/karriere', '/projektanfrage', '/news', '/kontakt'
];

function FooterAccordionGroup({ group }: { group: typeof sitemapGroups[0] }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('footerSitemap');

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
        <span>{t(`groups.${group.id}`)}</span>
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
            {group.links.map((link) => {
              const isMainRoute = mainRoutes.includes(link.href);
              const LinkComp = isMainRoute ? FluidLink : Link;
              return (
                <li key={link.href}>
                  <LinkComp
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    href={link.href as any}
                    {...('action' in link ? { 'data-consent-open': '' } : {})}
                    className="group inline-flex items-center text-sm text-white/60 hover:text-white transition-colors py-1"
                  >
                    <span className="transform transition-transform duration-300 ease-out group-hover:translate-x-1">
                      {t(`links.${link.labelId}`)}
                    </span>
                  </LinkComp>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Desktop Always Visible Content */}
      <ul className="hidden lg:flex flex-col gap-3.5">
        {group.links.map((link) => {
          const isMainRoute = mainRoutes.includes(link.href);
          const LinkComp = isMainRoute ? FluidLink : Link;
          return (
            <li key={link.href}>
              <LinkComp
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                href={link.href as any}
                {...('action' in link ? { 'data-consent-open': '' } : {})}
                className="group inline-flex items-center text-sm text-white/60 hover:text-white transition-colors py-1"
              >
                <span className="transform transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                  {t(`links.${link.labelId}`)}
                </span>
              </LinkComp>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

export default function FooterSitemap() {
  const forceVisible = useRevealSafety();
  return (
    <div className="w-full relative z-10 text-inverse-foreground" data-nosnippet="true">
      <div className="w-full">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-y-12"
          initial="hidden"
          animate={forceVisible ? 'visible' : undefined}
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
