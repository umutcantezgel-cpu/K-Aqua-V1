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

export const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
});
