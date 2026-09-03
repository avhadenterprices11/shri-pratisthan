"use client";

import React, { useState, useEffect } from "react";
import { useLanguage, Language } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  variant?: "header" | "drawer" | "floating";
  className?: string;
}

const LANGUAGES: { code: Language; shortLabel: string; fullLabel: string }[] = [
  { code: "en", shortLabel: "EN", fullLabel: "English" },
  { code: "mr", shortLabel: "म", fullLabel: "मराठी" },
  { code: "hi", shortLabel: "हिं", fullLabel: "हिंदी" },
];

export function LanguageSwitcher({ variant = "header", className }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  // Header Variant: Compact glassmorphic segmented capsule
  if (variant === "header") {
    return (
      <div
        className={cn(
          "inline-flex items-center p-1 bg-white/95 backdrop-blur-md border border-saffron/15 rounded-full shadow-md pointer-events-auto select-none",
          className
        )}
        role="group"
        aria-label="Language Selector"
      >
        {LANGUAGES.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={cn(
                "px-2.5 py-1 text-[11px] font-bold tracking-wider rounded-full transition-all duration-200 cursor-pointer font-sans",
                isActive
                  ? "bg-saffron text-white shadow-xs"
                  : "text-neutral-700 hover:text-saffron hover:bg-saffron/5"
              )}
              title={lang.fullLabel}
            >
              {lang.shortLabel}
            </button>
          );
        })}
      </div>
    );
  }

  // Drawer Variant: Full touch targets for mobile/drawer menu
  return (
    <div
      className={cn(
        "flex items-center p-1 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/10 select-none w-full",
        className
      )}
      role="group"
      aria-label="Language Selector"
    >
      {LANGUAGES.map((lang) => {
        const isActive = language === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            className={cn(
              "flex-1 py-2 text-xs font-bold font-sans tracking-wide rounded-xl transition-all duration-200 cursor-pointer text-center",
              isActive
                ? "bg-saffron text-white shadow-sm"
                : "text-neutral-700 hover:text-neutral-900"
            )}
          >
            {lang.fullLabel}
          </button>
        );
      })}
    </div>
  );
}
