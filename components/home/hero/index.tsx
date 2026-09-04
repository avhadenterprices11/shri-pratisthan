"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { HeroCarouselItem } from "@/components/ui/hero-carousel";
import { useLanguage } from "@/context/LanguageContext";

const HeroCarousel = dynamic(
  () => import("@/components/ui/hero-carousel").then((mod) => mod.HeroCarousel),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full h-[100dvh] min-h-[560px] bg-black flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-saffron border-t-transparent animate-spin" />
      </div>
    ),
  }
);

export default function Hero() {
  const { t, tArray } = useLanguage();

  const slides: HeroCarouselItem[] = useMemo(() => [
    {
      id: "ganesh-utsav",
      title: t("hero.slide1.title", "Shree\nGanpati"),
      image: "/hero_ganesh.png",
      credit: t("hero.slide1.credit", "Indira Nagar, Nashik"),
      meta: tArray("hero.slide1.meta").length > 0
        ? tArray("hero.slide1.meta")
        : ["Bhadrapada Shuddha", "10 Days", "Grand Dekhava"],
      accent: "#e8590c",
      href: "/events/ganesh-utsav-2026",
    },
    {
      id: "swagat-yatra",
      title: t("hero.slide2.title", "Swagat\nYatra"),
      image: "/swagat_yatra.jpg",
      credit: t("hero.slide2.credit", "Marathi New Year"),
      meta: tArray("hero.slide2.meta").length > 0
        ? tArray("hero.slide2.meta")
        : ["Chaitra Pratipada", "Dhol Tasha", "Traditional Costumes"],
      accent: "#d97706",
      href: "/events/gudipadwa-swagat-yatra-2026",
    },
    {
      id: "dahi-handi",
      title: t("hero.slide3.title", "Dahi\nHandi"),
      image: "/hero_dahihandi.png",
      credit: t("hero.slide3.credit", "Youth Energy & Unity"),
      meta: tArray("hero.slide3.meta").length > 0
        ? tArray("hero.slide3.meta")
        : ["Gokulashtami", "Human Pyramids", "Rhythmic Beats"],
      accent: "#0284c7",
      href: "/events",
    },
    {
      id: "maha-shivratri",
      title: t("hero.slide4.title", "Maha\nShivratri"),
      image: "/images/mahashivratri.jpg",
      credit: t("hero.slide4.credit", "Sacred Devotion"),
      meta: tArray("hero.slide4.meta").length > 0
        ? tArray("hero.slide4.meta")
        : ["108-Ft Shivling", "Maha Aarti", "Mass Congregation"],
      accent: "#7c3aed",
      href: "/events",
    },
    {
      id: "navratri-utsav",
      title: t("hero.slide5.title", "Navratri\nMahotsav"),
      image: "/hero_navratri.png",
      credit: t("hero.slide5.credit", "9 Nights of Shakti"),
      meta: tArray("hero.slide5.meta").length > 0
        ? tArray("hero.slide5.meta")
        : ["Garba & Dandiya", "Maha Pooja", "Cultural Unity"],
      accent: "#db2777",
      href: "/events",
    },
    {
      id: "samajik-seva",
      title: t("hero.slide6.title", "Samajik\nSeva"),
      image: "/hero_service.png",
      credit: t("hero.slide6.credit", "Dedicated Community Service"),
      meta: tArray("hero.slide6.meta").length > 0
        ? tArray("hero.slide6.meta")
        : ["Blood Donation", "Tree Plantation", "Relief Drives"],
      accent: "#059669",
      href: "/community",
    },
  ], [t, tArray]);

  return (
    <section className="relative w-full h-[100dvh] min-h-[560px] max-h-[1080px] overflow-hidden bg-black select-none">
      <HeroCarousel
        items={slides}
        defaultIndex={0}
        autoplay={true}
        autoplayDelay={4800}
        className="h-full w-full"
        cta={
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:scale-105 shadow-md"
            >
              <Sparkles className="w-3 h-3 text-saffron" />
              <span>{t("common.exploreMore", "Explore Events")}</span>
              <ArrowRight className="w-3 h-3 text-white/70" />
            </Link>
            <Link
              href="/volunteer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-saffron hover:bg-saffron-dark text-black font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-md"
            >
              <span>{t("common.becomeVolunteer", "Join As Volunteer")}</span>
            </Link>
          </div>
        }
      />
    </section>
  );
}
