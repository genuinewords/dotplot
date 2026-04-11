import { defaultLocale, locales, type Locale } from "./config";

// Import all translation files
import en from "./translations/en.json";
import hi from "./translations/hi.json";
import es from "./translations/es.json";
import ru from "./translations/ru.json";
import fr from "./translations/fr.json";
import de from "./translations/de.json";
import it from "./translations/it.json";
import pt from "./translations/pt.json";
import bn from "./translations/bn.json";
import ja from "./translations/ja.json";
import ko from "./translations/ko.json";
import ms from "./translations/ms.json";
import pl from "./translations/pl.json";
import id from "./translations/id.json";
import ar from "./translations/ar.json";
import bg from "./translations/bg.json";
import tr from "./translations/tr.json";
import sv from "./translations/sv.json";

const translations: Record<Locale, Record<string, any>> = {
  en, hi, es, ru, fr, de, it, pt, bn, ja, ko, ms, pl, id, ar, bg, tr, sv,
};

/**
 * Get translation value by key with English fallback
 */
export function t(locale: Locale, key: string): string {
  const keys = key.split(".");
  let value: any = translations[locale];
  for (const k of keys) {
    value = value?.[k];
  }
  if (value !== undefined && value !== null) return String(value);

  // Fallback to English
  let fallback: any = translations[defaultLocale];
  for (const k of keys) {
    fallback = fallback?.[k];
  }
  return fallback !== undefined && fallback !== null ? String(fallback) : key;
}

/**
 * Get full translation object for a locale (for FAQ arrays, etc.)
 */
export function getTranslations(locale: Locale): Record<string, any> {
  return translations[locale] || translations[defaultLocale];
}

/**
 * Extract locale from URL pathname
 */
export function getLocaleFromUrl(url: URL): Locale {
  const segments = url.pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  if (firstSegment && locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }
  return defaultLocale;
}

/**
 * Extract locale from Astro params
 */
export function getLocaleFromParams(params: Record<string, string | undefined>): Locale {
  const locale = params.locale;
  if (locale && locales.includes(locale as Locale)) {
    return locale as Locale;
  }
  return defaultLocale;
}

/**
 * Generate a localized URL
 */
export function localizedUrl(path: string, locale: Locale): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) {
    return cleanPath;
  }
  return `/${locale}${cleanPath}`;
}

/**
 * Generate static paths for all non-default locales
 */
export function getStaticLocalePaths() {
  return locales
    .filter((l) => l !== defaultLocale)
    .map((locale) => ({
      params: { locale },
    }));
}

/**
 * Get localized home URL for a locale
 */
export function getLocaleHomeUrl(locale: Locale): string {
  if (locale === defaultLocale) return "/";
  return `/${locale}/`;
}
