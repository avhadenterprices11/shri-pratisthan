"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail || !cleanEmail.includes("@") || cleanEmail.startsWith("@") || cleanEmail.endsWith("@")) {
      setStatus("error");
      setFeedbackMsg("Please enter a valid email address (e.g. name@domain.com)");
      return;
    }

    setStatus("submitting");
    setFeedbackMsg("");

    setTimeout(() => {
      setStatus("success");
      setFeedbackMsg("Subscribed! Thank you for joining our newsletter.");
      setEmail("");

      setTimeout(() => {
        setStatus("idle");
        setFeedbackMsg("");
      }, 4000);
    }, 500);
  };

  return (
    <footer className="bg-[#111111] text-white relative overflow-hidden border-t border-white/10 select-none">

      {/* 1. Interactive Expandable Awwwards-Style Header Marquee */}
      <div 
        className="footer-marquee-wrap group/marquee relative w-full overflow-hidden whitespace-nowrap py-3 sm:py-4.5 hover:py-8 sm:hover:py-12 md:hover:py-14 bg-[#111] flex border-b border-white/5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none"
        title="Hover to slow down and expand"
      >
        {/* Left & Right Gradient Soft Fades */}
        <div className="absolute left-0 top-0 h-full w-12 sm:w-28 bg-gradient-to-r from-[#111] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 h-full w-12 sm:w-28 bg-gradient-to-l from-[#111] to-transparent pointer-events-none z-10" />

        <div className="inline-flex gap-8 sm:gap-16 animate-footer-marquee shrink-0 min-w-full justify-around pr-8 sm:pr-16 text-base sm:text-xl md:text-2xl group-hover/marquee:text-3xl sm:group-hover/marquee:text-5xl md:group-hover/marquee:text-[4.8vw] font-normal uppercase font-heading tracking-normal opacity-70 group-hover/marquee:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <span className="text-white">{t("common.motto")}</span>
          <span className="text-outline font-heading">{t("common.trustName")}</span>
          <span className="text-saffron font-heading">{t("common.location")}</span>
          <span className="text-white">✦</span>
        </div>
        <div className="inline-flex gap-8 sm:gap-16 animate-footer-marquee shrink-0 min-w-full justify-around pr-8 sm:pr-16 text-base sm:text-xl md:text-2xl group-hover/marquee:text-3xl sm:group-hover/marquee:text-5xl md:group-hover/marquee:text-[4.8vw] font-normal uppercase font-heading tracking-normal opacity-70 group-hover/marquee:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" aria-hidden="true">
          <span className="text-white">{t("common.motto")}</span>
          <span className="text-outline font-heading">{t("common.trustName")}</span>
          <span className="text-saffron font-heading">{t("common.location")}</span>
          <span className="text-white">✦</span>
        </div>
      </div>

      {/* 2. Footer Content Grid (Streamlined with Zero Bloated Bottom Gap) */}
      <div className="max-w-7xl mx-auto relative z-10 pt-8 sm:pt-10 pb-6 sm:pb-8 px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">

          {/* Left Block: Description & Email Subscription */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4 sm:gap-5">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-white/20 bg-white/5 shrink-0 shadow-md">
                <Image
                  src="/logo.png"
                  alt="Shree Pratisthan Official Logo"
                  fill
                  sizes="44px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-normal tracking-tight text-white font-heading uppercase">
                  {t("common.trustName")}
                </span>
                <span className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-[0.2em] font-sans">
                  {t("footer.legalName")}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/60 leading-[1.75] max-w-md font-normal font-sans">
              {t("footer.tagline")}
            </p>

            <div className="w-full max-w-md">
              <form
                onSubmit={handleSubscribe}
                noValidate
                className="flex flex-col sm:flex-row items-stretch sm:items-center bg-[#1c1c1c] border border-white/10 rounded-2xl sm:rounded-full p-1.5 w-full focus-within:border-saffron/50 transition-colors gap-2 sm:gap-0"
              >
                <input
                  type="text"
                  placeholder={t("footer.subscribePlaceholder")}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  className="bg-transparent text-base sm:text-sm text-white placeholder-white/30 px-4 sm:px-5 py-2.5 sm:py-3 outline-none flex-grow w-full font-sans"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="bg-white hover:bg-neutral-200 text-black text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-full transition-all duration-200 cursor-pointer shrink-0 disabled:opacity-50 inline-flex items-center justify-center gap-1.5 font-sans"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>{t("footer.subscribing")}</span>
                    </>
                  ) : (
                    t("footer.subscribeButton")
                  )}
                </button>
              </form>

              {status === "error" && feedbackMsg && (
                <p className="text-[11px] text-red-400 font-medium mt-2 px-3 sm:px-4 flex items-center gap-1.5 font-sans">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {feedbackMsg}
                </p>
              )}

              {status === "success" && feedbackMsg && (
                <p className="text-[11px] text-emerald-400 font-medium mt-2 px-3 sm:px-4 flex items-center gap-1.5 animate-in fade-in duration-200 font-sans">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  {feedbackMsg}
                </p>
              )}
            </div>

            {/* Compact integrated copyright notice (Option A) */}
            <p className="text-[10px] text-white/40 font-sans mt-1">
              © {new Date().getFullYear()} {t("common.trustName")} ({t("footer.legalName")} — Reg: nashik/0000153/2018). {t("footer.rights")}
            </p>
          </div>

          {/* Right Block: Directory Links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4 sm:mb-5 font-sans">{t("footer.quickLinks")}</h4>
              <ul className="space-y-2.5 sm:space-y-3.5 text-xs text-white/50 font-sans">
                <li><Link href="/" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-[0.18em]">{t("navbar.home")}</Link></li>
                <li><Link href="/events" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-[0.18em]">{t("navbar.events")}</Link></li>
                <li><Link href="/community" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-[0.18em]">{t("navbar.community")}</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-[0.18em]">{t("navbar.about")}</Link></li>
                <li><Link href="/gallery" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-[0.18em]">{t("navbar.gallery")}</Link></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4 sm:mb-5 font-sans">{t("footer.supportLegal")}</h4>
              <ul className="space-y-2.5 sm:space-y-3.5 text-xs text-white/50 font-sans">
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-[0.18em]">{t("footer.privacyPolicy")}</Link></li>
                <li><Link href="/terms-conditions" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-[0.18em]">{t("footer.termsConditions")}</Link></li>
                <li><Link href="/volunteer" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-[0.18em]">{t("common.volunteer")}</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-[0.18em]">{t("navbar.contact")}</Link></li>
              </ul>
            </div>

            {/* Follow Us On In Icon Form */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4 sm:mb-5 font-sans">{t("footer.followUs")}</h4>
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("footer.facebook")}
                  title={t("footer.facebook")}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-saffron text-white/70 hover:text-white border border-white/10 hover:border-saffron shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("footer.instagram")}
                  title={t("footer.instagram")}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-saffron text-white/70 hover:text-white border border-white/10 hover:border-saffron shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("footer.youtube")}
                  title={t("footer.youtube")}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-saffron text-white/70 hover:text-white border border-white/10 hover:border-saffron shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
                  </svg>
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("footer.twitter")}
                  title={t("footer.twitter")}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-saffron text-white/70 hover:text-white border border-white/10 hover:border-saffron shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}
