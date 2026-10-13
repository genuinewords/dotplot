export const defaultLocale = "en";

export const locales = ["en"] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
};

export const rtlLocales: Locale[] = [];

export function isRtl(locale: Locale): boolean {
  return false;
}

export const ogLocaleMap: Record<Locale, string> = {
  en: "en_US",
};

