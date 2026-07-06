import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

/**
 * Localized 404 page — rendered when `notFound()` is called
 * inside any `app/[locale]/` route segment.
 */
export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p
        className="text-[8rem] font-bold leading-none text-primary/20"
        aria-hidden="true"
      >
        {/* eslint-disable-next-line react/jsx-no-literals -- HTTP status code, not user-facing text */}
        {'404'}
      </p>
      <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
        {t('title')}
      </h1>
      <p className="max-w-md text-muted-foreground">
        {t('description')}
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {t('backHome')}
      </Link>
    </section>
  );
}
