"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { SupportedLang, getTranslation } from "@/lib/i18n/engine";

interface LanguageContextType {
  language: SupportedLang;
  setLanguage: (lang: SupportedLang) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = "shree_pratisthan_active_lang";
const CYCLE_ORDER: SupportedLang[] = ["en", "mr", "hi"];

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLang>("en");
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as SupportedLang;
      if (savedLang && (savedLang === "en" || savedLang === "mr" || savedLang === "hi")) {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
      } else {
        document.documentElement.lang = "en";
      }
    } catch {
      // Ignore localStorage errors
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const setLanguage = useCallback((lang: SupportedLang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const nextIndex = (CYCLE_ORDER.indexOf(prev) + 1) % CYCLE_ORDER.length;
      const nextLang = CYCLE_ORDER[nextIndex];
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLang);
        document.documentElement.lang = nextLang;
      } catch {
        // Ignore localStorage errors
      }
      return nextLang;
    });
  }, []);

  const translateHelper = useCallback(
    (key: string): string => {
      return getTranslation(key, language);
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
