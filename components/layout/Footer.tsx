'use client';

import { Link } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/ui/Logo';

import FooterSitemap from './FooterSitemap';
import FooterTrustBadges from './FooterTrustBadges';
import CodayAttribution from './CodayAttribution';


export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-[oklch(0.18_0.02_260)] text-[oklch(0.95_0.02_260)] relative overflow-hidden pt-24 pb-8 md:pt-32 md:pb-12">
      {/* Background Glow */}
      <div className="absolute w-[1200px] h-[1200px] start-[-400px] bottom-[-800px] bg-[radial-gradient(circle,oklch(0.35_0.15_260_/_0.15),transparent_65%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-16 md:gap-24">
        
        {/* Top Area: Brand & Links */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-16 lg:gap-8">
          
          {/* Brand */}
          <div className="flex flex-col gap-8 md:gap-12">
            <div>
              <Logo height={56} className="text-current mb-6" />
              <p className="text-body font-body opacity-70 max-w-sm leading-relaxed">
                Innovation, Nachhaltigkeit und höchste Präzision für zukunftsweisende Rohrsysteme weltweit.
              </p>
            </div>
          </div>

          {/* Sitemap */}
          <div className="w-full">
            <FooterSitemap />
          </div>

        </div>

        {/* Trust Badges Full Width */}
        <div className="w-full">
          <FooterTrustBadges />
        </div>

        {/* Bottom Bar: Legal & Localization */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/10">
          
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-body opacity-70">
            <span>
              {t('footer.copyright')} {t('footer.rights')}
            </span>
            <Link href="/impressum" className="hover:opacity-100 hover:text-white transition-opacity">
              {t('footer.imprint')}
            </Link>
            <Link href="/datenschutz" className="hover:opacity-100 hover:text-white transition-opacity">
              {t('footer.privacy')}
            </Link>
          </div>

          <div className="flex justify-center md:justify-end">
            <CodayAttribution />
          </div>
        </div>

      </div>
    </footer>
  );
}
