"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { motion, type Transition } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    year: "2006",
    title: "Group Formed",
    description: "Shri Pratisthan was founded in Indira Nagar, Nashik by dedicated youth uniting together with a shared mission to serve the local community.",
    tag: "Founding",
    image: "/ganeshotsav_award_group.jpg",
    fit: "cover",
  },
  {
    year: "2012",
    title: "Cultural & Utsav Expansion",
    description: "Initiated grand Dahi Handi, Ganeshotsav, and Navratri celebrations with massive community participation across Nashik.",
    tag: "Festivals",
    image: "/dahihandi_2018.jpg",
    fit: "cover",
  },
  {
    year: "2018",
    title: "Official Trust Registration",
    description: "Formally registered as Late Dharmaraj Badode Bahuuddeshiya Sevabhavi Sanstha (Reg: nashik/0000153/2018) under Adv. Shyam Badode.",
    tag: "Trust Reg.",
    image: "/trust_seal.png",
    fit: "contain",
  },
  {
    year: "Present",
    title: "20 Years of Impact",
    description: "Over 100+ active members organizing iconic cultural sets (Jaipur Palace dekhava), Swagat Yatra, and mass community welfare initiatives.",
    tag: "Community Impact",
    image: "/ganeshotsav_2017_jaipur.jpg",
    fit: "cover",
  },
];

const DEFAULT_TRANSITION: Transition = {
  type: "tween",
  ease: [0.16, 1, 0.3, 1],
  duration: 0.32,
};

export default function FestivalJourney() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideSize, setSlideSize] = useState(440);
  const [isMobile, setIsMobile] = useState(false);

  const milestonesData = useMemo(() => [
    {
      year: t("festivalJourney.m1.year"),
      title: t("festivalJourney.m1.title"),
      description: t("festivalJourney.m1.description"),
      tag: t("festivalJourney.m1.tag"),
      image: "/ganeshotsav_award_group.jpg",
      fit: "cover",
    },
    {
      year: t("festivalJourney.m2.year"),
      title: t("festivalJourney.m2.title"),
      description: t("festivalJourney.m2.description"),
      tag: t("festivalJourney.m2.tag"),
      image: "/dahihandi_2018.jpg",
      fit: "cover",
    },
    {
      year: t("festivalJourney.m3.year"),
      title: t("festivalJourney.m3.title"),
      description: t("festivalJourney.m3.description"),
      tag: t("festivalJourney.m3.tag"),
      image: "/trust_seal.png",
      fit: "contain",
    },
    {
      year: t("festivalJourney.m4.year"),
      title: t("festivalJourney.m4.title"),
      description: t("festivalJourney.m4.description"),
      tag: t("festivalJourney.m4.tag"),
      image: "/ganeshotsav_2017_jaipur.jpg",
      fit: "cover",
    },
  ], [t]);

  // Monitor viewport size to adjust slide sizing dynamically
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mob = width < 768;
      setIsMobile(mob);
      if (width >= 1024) {
        setSlideSize(440);
      } else if (width >= 640) {
        setSlideSize(380);
      } else {
        setSlideSize(Math.min(width - 56, 320));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP: Scroll-driven milestone progression (Continuous, natural scroll with zero viewport locking)
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom 25%",
        scrub: 0.3,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          let index = 0;
          if (progress < 0.25) index = 0;
          else if (progress < 0.5) index = 1;
          else if (progress < 0.75) index = 2;
          else index = 3;
          setActiveIndex((prev) => (prev !== index ? index : prev));
        },
      });
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[620px] sm:min-h-[700px] overflow-hidden bg-background flex flex-col justify-between py-10 sm:py-16 select-none"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40" />
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none translate-y-12 opacity-30" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto px-4 sm:px-6 relative z-20 space-y-2 sm:space-y-3 pt-2 sm:pt-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase bg-saffron/10 border border-saffron/25 text-saffron font-sans mb-1.5 shadow-xs">
            <Sparkles className="w-3 h-3 text-saffron animate-pulse" />
            {t("festivalJourney.eyebrow", "Decades of Devotion")}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-foreground tracking-tight font-heading leading-tight">
            {t("festivalJourney.title")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-2 rounded-full" />
        </div>

        {/* Scroll Instruction Hint for Phone & Desktop */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-sans">
          <span className="animate-bounce">↓</span>
          <span className="text-[11px] sm:text-xs font-medium tracking-wide">
            {t("common.scrollProgress", "Scroll down to travel through time")}
          </span>
        </div>
      </div>

      {/* Cascade Carousel Viewport (Responsive for both Phone & Desktop via Scroll Animation) */}
      <div className="relative flex-grow items-center justify-center w-full select-none overflow-hidden my-auto flex">
        <motion.div
          className="absolute left-[50%] top-[50%] flex w-fit -translate-y-1/2"
          animate={{ x: -(activeIndex * slideSize + slideSize / 2) }}
          transition={DEFAULT_TRANSITION}
        >
          {milestonesData.map((item, index) => {
            const isActive = activeIndex === index;
            const distance = index - activeIndex;

            return (
              <motion.div
                key={item.year}
                className="flex shrink-0 flex-col items-center justify-center will-change-transform px-2 sm:px-4"
                style={{ width: slideSize }}
                animate={{
                  rotate: distance * (isMobile ? 3 : 10),
                  scale: isActive ? 1 : (isMobile ? 0.88 : 0.78),
                  y: distance * (isMobile ? 12 : 32),
                  opacity: isActive ? 1 : (isMobile ? 0.35 : 0.3),
                }}
                transition={DEFAULT_TRANSITION}
                onClick={() => setActiveIndex(index)}
              >
                {/* Milestone Detail Card */}
                <div
                  className={cn(
                    "group w-full h-[320px] sm:h-[360px] lg:h-[390px] rounded-2xl sm:rounded-block overflow-hidden flex flex-col justify-between border bg-[#121214] shadow-2xl transition-all duration-500 relative cursor-pointer",
                    isActive
                      ? "border-saffron/40 shadow-saffron/20 ring-2 ring-saffron/25"
                      : "border-slate-800/60 shadow-slate-900 opacity-90 hover:opacity-100"
                  )}
                >
                  {/* Background Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 320px, 440px"
                    priority={index === 0}
                    className={cn(
                      "transition-transform duration-700 ease-out group-hover:scale-105",
                      item.fit === "contain"
                        ? "object-contain p-6 sm:p-8 -translate-y-3"
                        : "object-cover"
                    )}
                  />

                  {/* Gradient Overlay for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-charcoal/65 to-black/30 z-10 transition-all duration-500" />

                  {/* Header: Year & Tag */}
                  <div className="relative z-20 flex justify-between items-center p-5 sm:p-7">
                    <span className="text-2xl sm:text-3xl font-normal text-saffron font-heading drop-shadow-sm">
                      {item.year}
                    </span>
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-200 font-bold bg-white/15 px-3 py-1 rounded-full backdrop-blur-md font-sans border border-white/20">
                      {item.tag}
                    </span>
                  </div>

                  {/* Body: Title & Content */}
                  <div className="relative z-20 p-5 sm:p-7 text-left space-y-1.5 sm:space-y-2 mt-auto">
                    <h3 className="text-lg sm:text-xl font-normal text-white font-heading leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed line-clamp-3 sm:line-clamp-4 font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom Year Milestones Indicator (Animated with Scroll on both Mobile & Desktop, NO ARROWS) */}
      <div className="text-center relative z-20 pb-3 sm:pb-5 flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2 sm:gap-3 bg-black/50 dark:bg-white/5 backdrop-blur-md border border-white/10 px-3.5 py-1.5 sm:py-2 rounded-full shadow-lg">
          {milestonesData.map((item, idx) => {
            const isCurrent = activeIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Milestone ${item.year}`}
                className={cn(
                  "px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-300 font-sans cursor-pointer flex items-center gap-1.5",
                  isCurrent
                    ? "bg-saffron text-white shadow-md shadow-saffron/40 scale-105"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                )}
              >
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all",
                    isCurrent ? "bg-white animate-pulse" : "bg-white/30"
                  )}
                />
                <span>{item.year}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
