// export const localeValues = ['es', 'en', 'de', 'fr'] as const;
export const localeValues = ['es', 'en', 'de'] as const;

export type Locale = (typeof localeValues)[number];

export const locales: readonly Locale[] = localeValues;

export const defaultLocale: Locale = 'en';
