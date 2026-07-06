import { useTranslations } from 'next-intl';

export default function SkipLink() {
  const t = useTranslations('nav');
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg z-50 min-h-[44px]"
    >
      {t('skipToContent')}
    </a>
  );
}
