"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SupportedLang } from "@/lib/i18n/types";
import { Globe, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const LANGUAGES: { code: SupportedLang; label: string; nativeName: string; short: string }[] = [
  { code: "en", label: "English", nativeName: "English", short: "EN" },
  { code: "mr", label: "Marathi", nativeName: "मराठी", short: "मराठी" },
  { code: "hi", label: "Hindi", nativeName: "हिन्दी", short: "हिन्दी" },
];

interface LanguageSwitcherProps {
  variant?: "header" | "drawer" | "footer";
  className?: string;
}

export function LanguageSwitcher({ variant = "header", className }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Drawer variant (Segmented bar for mobile drawer)
  if (variant === "drawer") {
    return (
      <div className={cn("flex items-center gap-1.5 p-1 bg-black/5 rounded-full border border-black/10 select-none", className)}>
        {LANGUAGES.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-bold font-sans transition-all duration-300 cursor-pointer",
                isSelected
                  ? "bg-saffron text-white shadow-sm scale-102"
                  : "text-neutral-700 hover:text-saffron hover:bg-white/60"
              )}
            >
              {lang.nativeName}
            </button>
          );
        })}
      </div>
    );
  }

  // Header Floating Pill / Dropdown Variant
  return (
    <div ref={dropdownRef} className={cn("relative inline-block select-none pointer-events-auto", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white/95 backdrop-blur-md border border-saffron/20 hover:border-saffron text-neutral-900 shadow-md hover:shadow-saffron/20 transition-all duration-300 group cursor-pointer"
        aria-label={`Select language. Current language: ${currentLang.nativeName}`}
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-saffron transition-transform group-hover:rotate-45 duration-500" />
        <span className="text-xs sm:text-[13px] font-bold font-sans tracking-wide text-charcoal">
          {currentLang.nativeName}
        </span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-neutral-400 transition-transform duration-300 group-hover:text-saffron",
            isOpen && "rotate-180 text-saffron"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-2xl bg-white/98 backdrop-blur-2xl border border-saffron/20 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="px-3 py-1.5 text-[10px] uppercase font-extrabold tracking-widest text-slate-400 border-b border-black/5 mb-1 font-sans">
            Choose Language
          </div>
          {LANGUAGES.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold font-sans transition-all duration-200 cursor-pointer text-left",
                  isSelected
                    ? "bg-saffron text-white shadow-xs"
                    : "text-neutral-800 hover:bg-saffron/10 hover:text-saffron"
                )}
              >
                <div className="flex flex-col">
                  <span className="leading-tight">{lang.nativeName}</span>
                  <span className={cn("text-[10px] font-normal", isSelected ? "text-white/80" : "text-slate-400")}>
                    {lang.label}
                  </span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
