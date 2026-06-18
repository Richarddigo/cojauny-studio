export const BRAND = {
  bg: '#0C1120',
  surface: '#1C2336',
  surface2: '#2A3550',
  accent: '#5B7BFF',
  accentDim: '#3A59D9',
  accentLight: '#93A8FF',
  text: '#F1F5F9',
  muted: '#94A3B8',
  faint: '#8B9DBF',
  success: '#22C55E',
  error: '#EF4444',
  border: 'rgba(255,255,255,0.08)',
  siteUrl: 'https://studio.cojauny.com',
} as const;

export type EmailLocale = 'en' | 'es' | 'de' | 'fr';

export function resolveEmailLocale(locale: string): EmailLocale {
  if (locale === 'es' || locale === 'en' || locale === 'de' || locale === 'fr') return locale;
  return 'en';
}
