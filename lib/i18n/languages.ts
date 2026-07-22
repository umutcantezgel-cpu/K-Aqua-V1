// lib/i18n/languages.ts
// K-Aqua Language Switch Module — zentrale Sprachdatenbank (65 Sprachen).
// Jede Sprache: interne id, next-intl locale (BCP-47), deutsches Label,
// Eigenname, lokalisiertes "Bestätigen", Kontinentgruppe, Anker [lon, lat]
// (flyTo + Panel-Position) und ISO-3166-numerische Länder-IDs (world-atlas).
//
// Leitfarben werden deterministisch über den Goldenen Winkel vergeben:
// identische Chroma/Helligkeit (K-Aqua-Akzentregel), maximal
// unterscheidbare Hues. Reihenfolge der Einträge NICHT ändern,
// sonst verschieben sich die Farben.

export type LangGroup = 'eu' | 'am' | 'af' | 'as';

export type LanguageTier = 'full' | 'partial' | 'auto';

export interface KAquaLanguage {
  id: string;
  /** next-intl locale — muss in eurer routing.locales-Liste stehen */
  locale: string;
  de: string;
  nat: string;
  ok: string;
  grp: LangGroup;
  /** [lon, lat] */
  anchor: [number, number];
  /** ISO-3166-1 numeric IDs (world-atlas countries-110m) */
  countries: number[];
  rtl?: boolean;
  hue: number;
  /** Fläche auf Pergament (Light) */
  color: string;
  /** Glow / Dark-Theme */
  bright: string;
  /** Konturen / Text */
  deep: string;
  /**
   * full: manually curated + reviewed (de/en/ar).
   * partial: has its own messages/<locale>.json but not editorially reviewed.
   * auto: no message file — falls back to defaultLocale content.
   */
  tier: LanguageTier;
}

/** The three editorially curated, fully reviewed locales. */
export const FULLY_CURATED_LOCALES = ['de', 'en', 'ar'] as const;

/** Locales with their own messages/<locale>.json (superset of FULLY_CURATED_LOCALES). */
export const TRANSLATED_LOCALES = [
  'ar', 'de', 'en', 'en-GB', 'es', 'es-ES', 'fr', 'it', 'nl', 'pl', 'pt-BR', 'pt', 'ru', 'tr', 'zh',
] as const;

type Row = [
  id: string, locale: string, de: string, nat: string, ok: string,
  grp: LangGroup, lon: number, lat: number, countries: number[], rtl?: boolean,
];

const ROWS: Row[] = [
  /* ---------------- Europa ---------------- */
  ['de', 'de', 'Deutsch', 'Deutsch', 'Bestätigen', 'eu', 10.0, 50.8, [276, 40, 756]],
  ['en_uk', 'en', 'Englisch (Global)', 'English (Global)', 'Confirm', 'eu', -1.8, 53.0, [826, 372]],
  ['fr', 'fr', 'Französisch', 'Français', 'Confirmer', 'eu', 2.2, 46.6, [250]],
  ['es_eu', 'es-ES', 'Spanisch (Europa)', 'Español (España)', 'Confirmar', 'eu', -3.7, 40.2, [724]],
  ['pt_eu', 'pt-PT', 'Portugiesisch (Europa)', 'Português (Portugal)', 'Confirmar', 'eu', -8.1, 39.6, [620]],
  ['it', 'it', 'Italienisch', 'Italiano', 'Conferma', 'eu', 12.5, 42.6, [380]],
  ['nl', 'nl', 'Niederländisch', 'Nederlands', 'Bevestigen', 'eu', 5.2, 52.2, [528, 56]],
  ['pl', 'pl', 'Polnisch', 'Polski', 'Potwierdź', 'eu', 19.3, 52.0, [616]],
  ['cs', 'cs', 'Tschechisch', 'Čeština', 'Potvrdit', 'eu', 15.5, 49.8, [203]],
  ['sk', 'sk', 'Slowakisch', 'Slovenčina', 'Potvrdiť', 'eu', 19.5, 48.7, [703]],
  ['hu', 'hu', 'Ungarisch', 'Magyar', 'Megerősítés', 'eu', 19.4, 47.2, [348]],
  ['ro', 'ro', 'Rumänisch', 'Română', 'Confirmă', 'eu', 25.0, 45.9, [642, 498]],
  ['bg', 'bg', 'Bulgarisch', 'Български', 'Потвърди', 'eu', 25.2, 42.7, [100]],
  ['el', 'el', 'Griechisch', 'Ελληνικά', 'Επιβεβαίωση', 'eu', 22.5, 39.3, [300, 196]],
  ['sr', 'sr', 'Serbisch', 'Српски', 'Потврди', 'eu', 20.9, 44.2, [688, 499]],
  ['hr', 'hr', 'Kroatisch', 'Hrvatski', 'Potvrdi', 'eu', 16.4, 45.4, [191, 70]],
  ['sl', 'sl', 'Slowenisch', 'Slovenščina', 'Potrdi', 'eu', 14.8, 46.1, [705]],
  ['sq', 'sq', 'Albanisch', 'Shqip', 'Konfirmo', 'eu', 20.1, 41.1, [8]],
  ['mk', 'mk', 'Mazedonisch', 'Македонски', 'Потврди', 'eu', 21.7, 41.6, [807]],
  ['sv', 'sv', 'Schwedisch', 'Svenska', 'Bekräfta', 'eu', 15.5, 60.5, [752]],
  ['no', 'no', 'Norwegisch', 'Norsk', 'Bekreft', 'eu', 8.8, 61.5, [578]],
  ['da', 'da', 'Dänisch', 'Dansk', 'Bekræft', 'eu', 9.3, 56.1, [208, 304]],
  ['fi', 'fi', 'Finnisch', 'Suomi', 'Vahvista', 'eu', 26.0, 63.5, [246]],
  ['is', 'is', 'Isländisch', 'Íslenska', 'Staðfesta', 'eu', -18.8, 64.9, [352]],
  ['et', 'et', 'Estnisch', 'Eesti', 'Kinnita', 'eu', 25.8, 58.8, [233]],
  ['lv', 'lv', 'Lettisch', 'Latviešu', 'Apstiprināt', 'eu', 24.9, 56.9, [428]],
  ['lt', 'lt', 'Litauisch', 'Lietuvių', 'Patvirtinti', 'eu', 24.0, 55.2, [440]],
  ['uk', 'uk', 'Ukrainisch', 'Українська', 'Підтвердити', 'eu', 31.2, 49.3, [804]],
  ['ru', 'ru', 'Russisch', 'Русский', 'Подтвердить', 'eu', 44.0, 56.5, [643, 112, 417]],
  ['tr', 'tr', 'Türkisch', 'Türkçe', 'Onayla', 'eu', 34.0, 39.2, [792]],
  ['az', 'az', 'Aserbaidschanisch', 'Azərbaycanca', 'Təsdiq et', 'eu', 47.6, 40.3, [31]],
  ['ka', 'ka', 'Georgisch', 'ქართული', 'დადასტურება', 'eu', 43.5, 42.2, [268]],
  ['hy', 'hy', 'Armenisch', 'Հայերեն', 'Հաստատել', 'eu', 44.8, 40.2, [51]],
  /* ---------------- Amerika ---------------- */
  ['en_us', 'en-US', 'Englisch (US & Kanada)', 'English (US)', 'Confirm', 'am', -98.5, 41.0, [840, 124]],
  ['es_la', 'es-419', 'Spanisch (Lateinamerika)', 'Español (Latinoamérica)', 'Confirmar', 'am', -64.0, -16.0, [484, 320, 340, 222, 558, 188, 591, 192, 214, 170, 862, 218, 604, 68, 600, 152, 32, 858]],
  ['pt_br', 'pt-BR', 'Portugiesisch (Brasilien)', 'Português (Brasil)', 'Confirmar', 'am', -51.5, -10.5, [76]],
  /* ---------------- Afrika & Nahost ---------------- */
  ['ar', 'ar', 'Arabisch', 'العربية', 'تأكيد', 'af', 44.0, 25.0, [682, 887, 512, 784, 634, 48, 414, 368, 400, 760, 422, 275, 818, 434, 788, 12, 504, 732, 478, 729, 262], true],
  ['he', 'he', 'Hebräisch', 'עברית', 'אישור', 'af', 34.9, 31.4, [376], true],
  ['fa', 'fa', 'Persisch', 'فارسی', 'تأیید', 'af', 53.0, 32.5, [364, 4, 762], true],
  ['sw', 'sw', 'Suaheli', 'Kiswahili', 'Thibitisha', 'af', 35.7, -4.5, [404, 834, 800, 646]],
  ['am', 'am', 'Amharisch', 'አማርኛ', 'አረጋግጥ', 'af', 39.0, 9.0, [231]],
  ['fr_af', 'fr-SN', 'Französisch (Afrika)', 'Français (Afrique)', 'Confirmer', 'af', -2.0, 14.5, [466, 562, 148, 686, 324, 384, 854, 204, 768, 120, 266, 178, 180, 140, 450, 108]],
  ['en_waf', 'en-NG', 'Englisch (Westafrika)', 'English (West Africa)', 'Confirm', 'af', 7.5, 9.0, [566, 288, 694, 430, 270]],
  ['en_saf', 'en-ZA', 'Englisch (Südl. Afrika)', 'English (Southern Africa)', 'Confirm', 'af', 24.0, -29.0, [710, 716, 894, 72, 516, 426, 748, 454]],
  ['pt_af', 'pt-AO', 'Portugiesisch (Afrika)', 'Português (África)', 'Confirmar', 'af', 17.0, -12.0, [24, 508, 624]],
  /* ---------------- Asien & Ozeanien ---------------- */
  ['hi', 'hi', 'Hindi', 'हिन्दी', 'पुष्टि करें', 'as', 78.5, 22.5, [356]],
  ['ur', 'ur', 'Urdu', 'اردو', 'تصدیق کریں', 'as', 69.5, 29.5, [586], true],
  ['bn', 'bn', 'Bengalisch', 'বাংলা', 'নিশ্চিত করুন', 'as', 90.2, 23.8, [50]],
  ['si', 'si', 'Singhalesisch', 'සිංහල', 'තහවුරු කරන්න', 'as', 80.7, 7.6, [144]],
  ['zh_hans', 'zh-Hans', 'Mandarin (vereinfacht)', '中文（简体）', '确认', 'as', 104.0, 34.5, [156]],
  ['zh_hant', 'zh-Hant', 'Chinesisch (traditionell)', '中文（繁體）', '確認', 'as', 121.0, 23.8, [158]],
  ['ja', 'ja', 'Japanisch', '日本語', '確認する', 'as', 138.5, 36.5, [392]],
  ['ko', 'ko', 'Koreanisch', '한국어', '확인', 'as', 127.6, 36.3, [410, 408]],
  ['mn', 'mn', 'Mongolisch', 'Монгол хэл', 'Батлах', 'as', 103.0, 46.9, [496]],
  ['kk', 'kk', 'Kasachisch', 'Қазақша', 'Растау', 'as', 67.0, 48.2, [398]],
  ['uz', 'uz', 'Usbekisch', 'Oʻzbekcha', 'Tasdiqlash', 'as', 64.5, 41.4, [860]],
  ['th', 'th', 'Thailändisch', 'ไทย', 'ยืนยัน', 'as', 101.0, 15.2, [764]],
  ['vi', 'vi', 'Vietnamesisch', 'Tiếng Việt', 'Xác nhận', 'as', 105.3, 21.0, [704]],
  ['km', 'km', 'Khmer', 'ភាសាខ្មែរ', 'បញ្ជាក់', 'as', 104.9, 12.5, [116]],
  ['my', 'my', 'Birmanisch', 'မြန်မာဘာသာ', 'အတည်ပြုပါ', 'as', 96.2, 21.0, [104]],
  ['lo', 'lo', 'Laotisch', 'ພາສາລາວ', 'ຢືນຢັນ', 'as', 103.0, 18.5, [418]],
  ['ms', 'ms', 'Malaiisch', 'Bahasa Melayu', 'Sahkan', 'as', 102.2, 3.9, [458, 96]],
  ['id', 'id', 'Indonesisch', 'Bahasa Indonesia', 'Konfirmasi', 'as', 113.0, -2.0, [360]],
  ['fil', 'fil', 'Filipino', 'Filipino', 'Kumpirmahin', 'as', 122.5, 12.5, [608]],
  ['en_oc', 'en-AU', 'Englisch (Ozeanien)', 'English (Oceania)', 'Confirm', 'as', 134.0, -25.0, [36, 554, 598]],
];

function tierFor(locale: string): LanguageTier {
  if ((FULLY_CURATED_LOCALES as readonly string[]).includes(locale)) return 'full';
  if ((TRANSLATED_LOCALES as readonly string[]).includes(locale)) return 'partial';
  return 'auto';
}

export const LANGUAGES: KAquaLanguage[] = ROWS.map((r, i) => {
  const hue = +(((i * 137.508 + 14) % 360).toFixed(1));
  return {
    id: r[0], locale: r[1], de: r[2], nat: r[3], ok: r[4], grp: r[5],
    anchor: [r[6], r[7]], countries: r[8], rtl: r[9],
    hue,
    color: `oklch(0.54 0.135 ${hue})`,
    bright: `oklch(0.72 0.155 ${hue})`,
    deep: `oklch(0.42 0.12 ${hue})`,
    tier: tierFor(r[1]),
  };
});

export const LANGUAGES_BY_ID: Record<string, KAquaLanguage> = Object.fromEntries(
  LANGUAGES.map((l) => [l.id, l]),
);

export const LANGUAGES_BY_COUNTRY: Record<number, KAquaLanguage> = {};
for (const l of LANGUAGES) for (const n of l.countries) LANGUAGES_BY_COUNTRY[n] = l;

export const LANGUAGE_INDEX_BY_ID: Record<string, number> = Object.fromEntries(
  LANGUAGES.map((l, i) => [l.id, i]),
);

/** Für eure next-intl routing config: alle locale-Codes des Moduls */
export const ALL_LOCALE_CODES = LANGUAGES.map((l) => l.locale);

export const LANGUAGE_GROUPS: { id: LangGroup; label: string }[] = [
  { id: 'eu', label: 'Europa' },
  { id: 'am', label: 'Amerika' },
  { id: 'af', label: 'Afrika & Nahost' },
  { id: 'as', label: 'Asien & Ozeanien' },
];

export function groupLabel(g: LangGroup): string {
  return LANGUAGE_GROUPS.find((x) => x.id === g)?.label ?? g;
}
