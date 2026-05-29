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
function localeUrl(l: string, cleanPath: string) {
  return l === routing.defaultLocale
    ? `${SITE_URL}${cleanPath || "/"}`
    : `${SITE_URL}/${l}${cleanPath}`;
}

export function buildAlternates(locale: string, path: string) {
  const cleanPath = path === "/" ? "" : path;
  const languages: LangMap = {};
  for (const l of routing.locales) {
    languages[l] = localeUrl(l, cleanPath);
  }
  languages["x-default"] = localeUrl(routing.defaultLocale, cleanPath);

  return {
    canonical: localeUrl(locale, cleanPath),
    languages,
  };
}
