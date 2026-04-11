export const defaultLocale = "en";

export const locales = [
  "en", "hi", "es", "ru", "fr", "de", "it", "pt",
  "bn", "ja", "ko", "ms", "pl", "id", "ar", "bg", "tr", "sv"
] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  es: "Español",
  ru: "Русский",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  pt: "Português",
  bn: "বাংলা",
  ja: "日本語",
  ko: "한국어",
  ms: "Bahasa Melayu",
  pl: "Polski",
  id: "Bahasa Indonesia",
  ar: "العربية",
  bg: "Български",
  tr: "Türkçe",
  sv: "Svenska",
};

export const rtlLocales: Locale[] = ["ar"];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export const ogLocaleMap: Record<Locale, string> = {
  en: "en_US",
  hi: "hi_IN",
  es: "es_ES",
  ru: "ru_RU",
  fr: "fr_FR",
  de: "de_DE",
  it: "it_IT",
  pt: "pt_BR",
  bn: "bn_BD",
  ja: "ja_JP",
  ko: "ko_KR",
  ms: "ms_MY",
  pl: "pl_PL",
  id: "id_ID",
  ar: "ar_SA",
  bg: "bg_BG",
  tr: "tr_TR",
  sv: "sv_SE",
};
