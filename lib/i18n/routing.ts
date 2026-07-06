import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  // Other locales (e.g. 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'tr', 'ru', 'zh') should only be enabled
  // after 100% translation is complete (RULES §2).
  locales: ['de', 'en', 'ar', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'tr', 'ru', 'zh'],

  // Used when no locale matches
  defaultLocale: 'de',
  localePrefix: 'always'
});

