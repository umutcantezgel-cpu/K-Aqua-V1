import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import requireIntlLink from './scripts/eslint-rules/require-intl-link.cjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      'custom-rules': requireIntlLink,
    },
    // ── UNIVERSAL i18n GUARD (binding, see agents/RULES.md) ──
    // No user-visible string may be hardcoded in JSX. Every text goes through
    // useTranslations(). Brand proper-nouns are the only exception — wrap them
    // in {' '} or add an inline // eslint-disable-next-line with a reason.
    files: ['app/**/*.tsx', 'components/**/*.tsx'],
    rules: {
      'react/jsx-no-literals': [
        'warn',
        {
          noStrings: true,
          allowedStrings: ['·', '—', '/', '+', '×', '•', 'K-Aqua', 'KWT', 'KESSEL', 'PP-R', 'PP-RCT', 'ISO', 'CO₂'],
          ignoreProps: true,
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          name: 'next/link',
          message: 'Please import from `@/lib/i18n/navigation` instead.',
        },
      ],
      'custom-rules/require-intl-link': 'error',
    },
  },
  {
    ignores: ['prototype/**', '.next/**', 'node_modules/**', 'scripts/**', 'kaqua-antigravity 6/**'],
  },
];

export default eslintConfig;
