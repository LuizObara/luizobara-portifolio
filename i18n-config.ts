export const i18n = {
    defaultLocale: 'pt',
    locales: ['pt', 'es', 'en'],
} as const
  
export type Locale = (typeof i18n)['locales'][number];

export const localeNames: Record<Locale, string> = {
    pt: "Português",
    es: "Español",
    en: "English",
};