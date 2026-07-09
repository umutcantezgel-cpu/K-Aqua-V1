'use client';

import { Link } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/ui/Logo';
import LangPicker from './LangPicker';

import FooterSitemap from './FooterSitemap';
import FooterTrustBadges from './FooterTrustBadges';
import dynamic from 'next/dynamic';

const FooterNewsletter = dynamic(() => import('./FooterNewsletter'), { ssr: false });
const FooterMap = dynamic(() => import('./FooterMap'), { ssr: false });

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-[oklch(0.18_0.02_260)] text-[oklch(0.95_0.02_260)] relative overflow-hidden pt-24 pb-8 md:pt-32 md:pb-12 before:content-[''] before:absolute before:w-[1200px] before:h-[1200px] before:start-[-400px] before:bottom-[-800px] before:bg-[radial-gradient(circle,oklch(0.35_0.15_260_/_0.15),transparent_65%)] before:pointer-events-none">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-16 md:gap-24">
        
        {/* Tier 1: Interactive Top */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <FooterNewsletter />
          <FooterMap />
        </div>

        {/* Tier 2: Sitemap Catalog */}
        <div className="w-full">
          <FooterSitemap />
        </div>

        {/* Tier 3: Trust Badges */}
        <div className="w-full">
          <FooterTrustBadges />
        </div>

        {/* Tier 4: Legal & Localization */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-6 text-sm font-body opacity-60">
            <Logo height={48} className="text-current" />
            <span className="text-center md:text-left">
              {t('footer.copyright')} {t('footer.rights')}
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-body opacity-70">
              <Link href="/impressum" className="hover:opacity-100 hover:text-white transition-opacity">
                {t('footer.imprint')}
              </Link>
              <Link href="/datenschutz" className="hover:opacity-100 hover:text-white transition-opacity">
                {t('footer.privacy')}
              </Link>
            </div>
            
            <LangPicker />
          </div>
        </div>

      </div>
    </footer>
  );
}
