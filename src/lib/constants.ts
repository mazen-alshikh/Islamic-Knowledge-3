export const SUPPORTED_LOCALES = ['ar', 'en'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];

export const LOCALE_NAMES: Record<Locale, string> = {
  ar: 'العربية',
  en: 'English'
};

export const RTL_LOCALES: Locale[] = ['ar'];

export const DEFAULT_LOCALE: Locale = 'ar';

export const RESOURCE_TYPES = {
  QURAN: 'quran',
  HADITH: 'hadith',
  TAFSIR: 'tafsir',
  FIQH: 'fiqh'
} as const;

export const RESOURCE_TYPE_LABELS: Record<string, string> = {
  [RESOURCE_TYPES.QURAN]: 'القرآن الكريم',
  [RESOURCE_TYPES.HADITH]: 'الحديث الشريف',
  [RESOURCE_TYPES.TAFSIR]: 'التفسير',
  [RESOURCE_TYPES.FIQH]: 'الفقه'
};