import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

// Locale negotiation + redirect. Only locales whose dictionaries are 100 %
// complete may be listed in routing.locales (see agents/RULES.md → language purity).
export default createMiddleware(routing);

export const config = {
  // Match everything except API routes, Next internals, and files with an extension.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
