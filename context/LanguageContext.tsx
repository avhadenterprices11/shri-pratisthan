"use client";

import React, { createContext, useContext, useEffect, useCallback, useSyncExternalStore } from "react";
import { SupportedLang, getTranslation } from "@/lib/i18n/engine";

export type MultilingualRecord = {
  en?: string;
  mr?: string;
  hi?: string;
} & Record<string, string | undefined>;

interface LanguageContextType {
  language: SupportedLang;
  setLanguage: (lang: SupportedLang) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  resolveMultilingual: (field?: { en?: string; mr?: string; hi?: string } | null) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = "shree_pratisthan_active_lang";
const CYCLE_ORDER: SupportedLang[] = ["en", "mr", "hi"];
const DEFAULT_LANG: SupportedLang = "en";

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("language-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("language-change", callback);
  };
}

function getSnapshot(): SupportedLang {
  if (typeof window === "undefined") return DEFAULT_LANG;
  try {
    const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as SupportedLang;
    if (savedLang === "en" || savedLang === "mr" || savedLang === "hi") {
      return savedLang;
    }
  } catch {
    // Ignore localStorage errors
  }
  return DEFAULT_LANG;
}

function getServerSnapshot(): SupportedLang {
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // useSyncExternalStore guarantees identical initial hydration pass to server HTML
  // and smoothly updates to stored client locale immediately after hydration.
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Sync document element lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: SupportedLang) => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      document.documentElement.lang = lang;
      window.dispatchEvent(new Event("language-change"));
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    const current = getSnapshot();
    const nextIndex = (CYCLE_ORDER.indexOf(current) + 1) % CYCLE_ORDER.length;
    const nextLang = CYCLE_ORDER[nextIndex];
    setLanguage(nextLang);
  }, [setLanguage]);

  const translateHelper = useCallback(
    (key: string): string => {
      return getTranslation(key, language);
    },
    [language]
  );

  /**
   * Resolves a dynamic multilingual field saved in the database ({ en, mr, hi })
   * based on the currently selected language, with fallback to English.
   */
  const resolveMultilingual = useCallback(
    (field?: { en?: string; mr?: string; hi?: string } | null): string => {
      if (!field) return "";
      return (field as Record<string, string | undefined>)[language] || field.en || field.mr || field.hi || "";
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: translateHelper,
        resolveMultilingual,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
