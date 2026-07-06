// Tailwind CSS 4 — tokens live in app/globals.css (@theme inline).
// This file only declares content globs + the dark-mode strategy.
// (Tailwind 4 reads most config from CSS; keep JS surface minimal.)
import type { Config } from 'tailwindcss';

export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
} satisfies Config;
