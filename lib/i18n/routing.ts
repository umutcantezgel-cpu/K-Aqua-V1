/* eslint-disable */

import { defineRouting } from 'next-intl/routing';
import { ALL_LOCALE_CODES } from '@/lib/i18n/languages';

export const coreLocales = ALL_LOCALE_CODES;
export const lazyLocales = ALL_LOCALE_CODES.filter(code => !coreLocales.includes(code as any));

export const routing = defineRouting({
  // A list of all locales that are supported
  // Core locales are built statically (SSG), lazy locales are built on-demand (ISR)
  locales: [...coreLocales, ...lazyLocales],

  // Used when no locale matches (matches the x-default hreflang -> /de)
  defaultLocale: 'de',
  localePrefix: 'always',
  localeDetection: false
});
