'use client';

import { Link } from '@/lib/i18n/navigation';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { useTranslations } from 'next-intl';
/* eslint-disable react/jsx-no-literals */

import FooterSitemap from './FooterSitemap';
import FooterTrustBadges from './FooterTrustBadges';
import CodayAttribution from './CodayAttribution';

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-[#050505] text-white relative overflow-hidden pt-24 pb-6 md:pt-40 md:pb-8 selection:bg-white/20">
      {/* Background Glow */}
      <div className="absolute w-[1200px] h-[1200px] start-[-400px] bottom-[-800px] bg-[radial-gradient(circle,oklch(0.35_0.15_260_/_0.12),transparent_70%)] pointer-events-none" />
      
      {/* Optional Noise Texture Layer */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 flex flex-col">
        
        {/* Top Area: Massive Brand Statement */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-b border-white/10 pb-16 md:pb-24 mb-16 md:mb-24">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-5xl lg:text-[4.5rem] leading-[1.05] tracking-tight font-heading font-medium text-white/90">
              {t('footer.tagline')}
            </h2>
          </div>
          <div className="shrink-0 flex flex-col gap-4">
            <ButtonPrimary 
              href="/kontakt" 
              className="px-8 py-4 !text-base"
            >
              Projekt anfragen
            </ButtonPrimary>
          </div>
        </div>

        {/* Middle Area: Sitemap */}
        <div className="w-full mb-16 md:mb-24">
          <FooterSitemap />
        </div>

        {/* Trust Badges Full Width */}
        <div className="w-full">
          <FooterTrustBadges />
        </div>

        {/* Bottom Area: Mega Logo & Legal */}
        <div className="mt-16 md:mt-24">
          {/* Mega Logo */}
          <div className="w-full flex justify-center items-center opacity-5 mb-16 pointer-events-none select-none">
            <div className="text-[15vw] leading-none font-bold tracking-tighter text-white whitespace-nowrap">
              K-AQUA
            </div>
          </div>

          {/* Bottom Bar: Legal & Localization */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 pt-6 border-t border-white/10">
            
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-[11px] uppercase tracking-widest font-medium opacity-50">
              <span>
                &copy; {new Date().getFullYear()} {t('footer.rights')}
              </span>
              <div className="flex items-center gap-8">
                <Link href="/impressum" className="hover:opacity-100 hover:text-white transition-opacity">
                  {t('footer.imprint')}
                </Link>
                <Link href="/datenschutz" className="hover:opacity-100 hover:text-white transition-opacity">
                  {t('footer.privacy')}
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <CodayAttribution />
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
