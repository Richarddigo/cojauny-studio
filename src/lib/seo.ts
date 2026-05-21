import { routing } from "@/i18n/routing";

export const SITE_URL = "https://studio.cojauny.com";

type LangMap = Record<string, string>;

/**
 * Build canonical + hreflang alternates for a given locale and path.
 *
 * @param locale Current locale, e.g. "en"
 * @param path   Path WITHOUT the locale prefix and without trailing slash,
 *               e.g. "/services". Use "" for the locale home.
 */
export function buildAlternates(locale: string, path: string) {
  const cleanPath = path === "/" ? "" : path;
  const languages: LangMap = {};
  for (const l of routing.locales) {
    languages[l] = `${SITE_URL}/${l}${cleanPath}`;
  }
  languages["x-default"] = `${SITE_URL}/${routing.defaultLocale}${cleanPath}`;

  return {
    canonical: `${SITE_URL}/${locale}${cleanPath}`,
    languages,
  };
}
