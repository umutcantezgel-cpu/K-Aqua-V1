import { Link } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/ui/Logo';

export default function Footer() {
  const t = useTranslations();

  const getPageTitle = (id: string) => {
    try {
      const arr = t.raw(`pages.${id}`);
      return Array.isArray(arr) ? arr[0] : id;
    } catch {
      return id;
    }
  };

  return (
    <footer className="bg-inverse-surface text-inverse-foreground mt-24 relative overflow-hidden py-12 md:py-20 before:content-[''] before:absolute before:w-[900px] before:h-[900px] before:start-[-300px] before:bottom-[-600px] before:bg-[radial-gradient(circle,oklch(0.6_0.16_302_/_0.22),transparent_65%)] before:pointer-events-none">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 md:gap-12 text-start">
          {/* Column 1: Logo & Tagline */}
          <div className="flex flex-col gap-4 items-start">
            <Logo height={26} className="[&_span]:text-inverse-foreground" />
            <p className="text-small opacity-65 max-w-[320px] text-wrap-pretty font-body">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Column 2: Tools */}
          <div className="flex flex-col gap-3 items-start">
            <span className="font-heading font-bold text-tiny tracking-wider uppercase opacity-55 mb-2 select-none">
              {t('footer.colTools')}
            </span>
            <Link href="/produkte" className="text-body opacity-75 hover:opacity-100 hover:text-primary transition-colors py-1">
              {getPageTitle('products')}
            </Link>
            <Link href="/produkte/finder" className="text-body opacity-75 hover:opacity-100 hover:text-primary transition-colors py-1">
              {getPageTitle('finder')}
            </Link>
            <Link href="/co2-rechner" className="text-body opacity-75 hover:opacity-100 hover:text-primary transition-colors py-1">
              {getPageTitle('co2')}
            </Link>
            <Link href="/loesungen" className="text-body opacity-75 hover:opacity-100 hover:text-primary transition-colors py-1">
              {getPageTitle('solutions')}
            </Link>
            <Link href="/academy" className="text-body opacity-75 hover:opacity-100 hover:text-primary transition-colors py-1">
              {getPageTitle('academy')}
            </Link>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-3 items-start">
            <span className="font-heading font-bold text-tiny tracking-wider uppercase opacity-55 mb-2 select-none">
              {t('footer.colCompany')}
            </span>
            <Link href="/unternehmen" className="text-body opacity-75 hover:opacity-100 hover:text-primary transition-colors py-1">
              {getPageTitle('about')}
            </Link>
            <Link href="/maerkte" className="text-body opacity-75 hover:opacity-100 hover:text-primary transition-colors py-1">
              {getPageTitle('markets')}
            </Link>
            <Link href="/trust-center" className="text-body opacity-75 hover:opacity-100 hover:text-primary transition-colors py-1">
              {getPageTitle('trust')}
            </Link>
            <Link href="/partnerschaft" className="text-body opacity-75 hover:opacity-100 hover:text-primary transition-colors py-1">
              {getPageTitle('partner')}
            </Link>
            <Link href="/referenzen" className="text-body opacity-75 hover:opacity-100 hover:text-primary transition-colors py-1">
              {getPageTitle('references')}
            </Link>
            <Link href="/news" className="text-body opacity-75 hover:opacity-100 hover:text-primary transition-colors py-1">
              {getPageTitle('news')}
            </Link>
            <Link href="/karriere" className="text-body opacity-75 hover:opacity-100 hover:text-primary transition-colors py-1">
              {getPageTitle('career')}
            </Link>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-3 items-start">
            <span className="font-heading font-bold text-tiny tracking-wider uppercase opacity-55 mb-2 select-none">
              {t('footer.colContact')}
            </span>
            <Link href="/kontakt" className="text-body opacity-75 hover:opacity-100 hover:text-primary transition-colors py-1">
              {getPageTitle('contact')}
            </Link>
            <a href={`tel:${t('footer.phone').replace(/\s+/g, '')}`} className="text-body opacity-75 hover:opacity-100 hover:text-primary transition-colors py-1 font-body">
              {t('footer.phone')}
            </a>
            <a href={`mailto:${t('footer.email')}`} className="text-body opacity-75 hover:opacity-100 hover:text-primary transition-colors py-1 font-body">
              {t('footer.email')}
            </a>
            <span className="text-body opacity-75 py-1 font-body select-text">
              {t('footer.address')}
            </span>
            <Link href="/kontakt" className="text-body opacity-75 hover:opacity-100 hover:text-primary transition-colors py-1">
              {t('footer.directions')}
            </Link>
          </div>
        </div>

        {/* Lower bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-6 border-t border-inverse-foreground/12">
          <span className="text-small opacity-55 font-body">
            {t('footer.copyright')} {t('footer.rights')}
          </span>
          <div className="flex gap-6 font-body">
            <Link href="/impressum" className="text-small opacity-75 hover:opacity-100 transition-colors">
              {t('footer.imprint')}
            </Link>
            <Link href="/datenschutz" className="text-small opacity-75 hover:opacity-100 transition-colors">
              {t('footer.privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
