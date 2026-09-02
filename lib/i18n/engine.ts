import enLocale from "@/locales/en.json";
import mrLocale from "@/locales/mr.json";
import hiLocale from "@/locales/hi.json";
import { SupportedLang, LocaleSchema } from "./types";

export type { SupportedLang, LocaleSchema };

export const LOCALES: Record<SupportedLang, LocaleSchema> = {
  en: enLocale as LocaleSchema,
  mr: mrLocale as LocaleSchema,
  hi: hiLocale as LocaleSchema,
};

/**
 * Type-safe dot notation key resolver
 * e.g. t('nav.home', 'mr') => 'मुख्यपृष्ठ'
 * e.g. t('cultural.swagatYatra', 'mr') => 'स्वागत यात्रा' (Preserved identity, NEVER 'Welcome Pride')
 */
export function getTranslation(key: string, lang: SupportedLang = "en"): string {
  const dict = LOCALES[lang] || LOCALES.en;
  const parts = key.split(".");

  let current: any = dict;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      // Fallback to English dictionary
      let fallback: any = LOCALES.en;
      for (const fbPart of parts) {
        if (fallback && typeof fallback === "object" && fbPart in fallback) {
          fallback = fallback[fbPart];
        } else {
          return key; // return key if not found
        }
      }
      return typeof fallback === "string" ? fallback : key;
    }
  }

  return typeof current === "string" ? current : key;
}

// Global helper for simple access
export const t = getTranslation;
