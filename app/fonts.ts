import localFont from 'next/font/local';
import { Tajawal } from 'next/font/google';

export const outfit = localFont({
  src: '../fonts/outfit-variable-latin.woff2',
  variable: '--font-outfit',
  display: 'swap',
});

export const inter = localFont({
  src: '../fonts/inter-variable-latin.woff2',
  variable: '--font-inter',
  display: 'swap',
});

// `preload: false` ist hier Absicht.
//
// `next/font` koppelt das Vorladen an den Modulgraphen, nicht an die Sprache:
// weil `app/[locale]/layout.tsx` diese Datei importiert, landeten bisher ALLE
// sechs Schriftschnitte im `<head>` jeder Seite — gemessen an `de.html` also
// vier arabische Schnitte (36.204 Bytes), die dort nie benutzt werden. Sie
// konkurrierten während des LCP mit dem eigentlichen Inhalt um Bandbreite, und
// zwar auf rund 330 der 335 gebauten Seiten.
//
// Der Gegenwert für Arabisch ist gering: `display: 'swap'` zeigt den Text
// sofort in der System-Arabischschrift, Tajawal wird nach dem Stylesheet
// nachgeladen und tauscht ein. Die lateinischen Schnitte bleiben dagegen
// vorgeladen — arabische Seiten enthalten durchgehend lateinischen Text
// (Produktnamen, „PP-R", Artikelnummern wie AQ11PL20).
export const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
  preload: false,
});
