"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, type Transition } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
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
    title: "19+ Years of Impact",
    description: "Over 100+ active members organizing iconic cultural sets (Jaipur Palace dekhava), Swagat Yatra, and mass community welfare initiatives.",
    tag: "Community Impact",
    image: "/ganeshotsav_2017_jaipur.jpg",
    fit: "cover",
  },
];

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  bounce: 0.12,
  duration: 0.8,
};

export default function FestivalJourney() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideSize, setSlideSize] = useState(440);
  const [isMobile, setIsMobile] = useState(false);

  // Touch Swipe Gesture Refs for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const milestonesData = [
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
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      // Swiped left -> Next
      setActiveIndex((prev) => Math.min(prev + 1, milestonesData.length - 1));
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> Prev
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Monitor viewport size to adjust desktop slide sizing
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width >= 768) {
        setSlideSize(440);
      } else {
        setSlideSize(Math.min(width - 48, 340));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP: Only pin on Desktop (min-width: 1024px). On phones & tablets, no pin-spacer!
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=1200",
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            let index = 0;
            if (progress < 0.22) index = 0;
            else if (progress < 0.44) index = 1;
            else if (progress < 0.66) index = 2;
            else index = 3;
            setActiveIndex(index);
          },
        });
      });
      // Mobile screens (<1024px) do NOT get pinned, preserving native scroll!
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full lg:h-screen lg:overflow-hidden bg-background flex flex-col justify-between py-10 sm:py-14 select-none"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40" />
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none translate-y-12 opacity-30" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto px-4 sm:px-6 relative z-20 space-y-3">
        <div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-foreground tracking-tight font-heading leading-tight">
            {t("festivalJourney.title")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-2 sm:mt-3 rounded-full" />
        </div>

        {/* Mobile Quick Year Switcher Buttons */}
        <div className="flex lg:hidden items-center justify-center gap-2 pt-1 overflow-x-auto no-scrollbar">
          {milestonesData.map((item, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 font-sans cursor-pointer",
                  isSelected
                    ? "bg-saffron text-white shadow-md shadow-saffron/30 scale-105"
                    : "bg-black/5 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-black/10"
                )}
              >
                {item.year}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Desktop Diagonal Cascade Carousel Viewport (Hidden on Mobile) */}
      <div className="hidden lg:flex relative flex-grow items-center justify-center w-full select-none overflow-hidden my-4">
        <motion.div
          className="absolute left-[50%] top-[48%] flex w-fit -translate-y-1/2"
          animate={{ x: -(activeIndex * slideSize + slideSize / 2) }}
          transition={DEFAULT_TRANSITION}
        >
          {milestonesData.map((item, index) => {
            const isActive = activeIndex === index;
            const distance = index - activeIndex;

            return (
              <motion.div
                key={item.year}
                className="flex shrink-0 flex-col items-center justify-center gap-4 will-change-transform px-4"
                style={{ width: slideSize }}
                animate={{
                  rotate: distance * 12,
                  scale: isActive ? 1 : 0.75,
                  y: distance * 40,
                  opacity: isActive ? 1 : 0.35,
                }}
                transition={DEFAULT_TRANSITION}
                onClick={() => setActiveIndex(index)}
              >
                {/* Milestone Detail Card */}
                <div
                  className={cn(
                    "group w-full h-[320px] rounded-block overflow-hidden flex flex-col justify-between border bg-[#121214] shadow-2xl transition-all duration-500 relative cursor-pointer",
                    isActive 
                      ? "border-saffron/30 shadow-saffron/15 ring-1 ring-saffron/20" 
                      : "border-slate-800/60 shadow-slate-900 opacity-90"
                  )}
                >
                  {/* Background Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="440px"
                    className={cn(
                      "transition-transform duration-700 ease-out group-hover:scale-105",
                      item.fit === "contain" 
                        ? "object-contain p-8 -translate-y-4" 
                        : "object-cover"
                    )}
                  />

                  {/* Gradient Overlay for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/55 to-black/25 z-10 transition-all duration-500 group-hover:via-charcoal/60 group-hover:to-black/35" />

                  {/* Header: Year */}
                  <div className="relative z-20 flex justify-between items-center p-7">
                    <span className="text-3xl font-normal text-saffron font-heading drop-shadow-sm">
                      {item.year}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-slate-300 font-bold bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs font-sans border border-white/15">
                      {item.tag}
                    </span>
                  </div>

                  {/* Body: Title & Content */}
                  <div className="relative z-20 p-7 text-left space-y-2 mt-auto">
                    <h3 className="text-xl font-normal text-white font-heading leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-200 leading-relaxed line-clamp-3 font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* 2. Mobile Phone-Friendly Touch-Swipe Card Deck (Visible only on Mobile & Tablets) */}
      <div 
        className="lg:hidden relative w-full px-4 py-4 my-2 flex flex-col items-center justify-center select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-full max-w-[360px] mx-auto relative overflow-hidden">
          <motion.div
            key={activeIndex}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -40) {
                setActiveIndex((prev) => Math.min(prev + 1, milestonesData.length - 1));
              } else if (info.offset.x > 40) {
                setActiveIndex((prev) => Math.max(prev - 1, 0));
              }
            }}
            initial={{ opacity: 0.6, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-[350px] sm:h-[370px] rounded-2xl overflow-hidden flex flex-col justify-between border border-saffron/30 bg-[#121214] shadow-2xl relative cursor-grab active:cursor-grabbing"
          >
            {/* Background Image */}
            <Image
              src={milestonesData[activeIndex].image}
              alt={milestonesData[activeIndex].title}
              fill
              sizes="(max-width: 640px) 100vw, 360px"
              priority
              className={cn(
                "transition-transform duration-700 ease-out pointer-events-none",
                milestonesData[activeIndex].fit === "contain" 
                  ? "object-contain p-8 -translate-y-4" 
                  : "object-cover"
              )}
            />

            {/* Gradient Overlay for Text Clarity */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-charcoal/65 to-black/35 z-10 pointer-events-none" />

            {/* Card Header: Year & Tag */}
            <div className="relative z-20 flex justify-between items-center p-5 pointer-events-none">
              <span className="text-2xl sm:text-3xl font-normal text-saffron font-heading drop-shadow-sm">
                {milestonesData[activeIndex].year}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-200 font-bold bg-white/15 px-3 py-1 rounded-full backdrop-blur-md font-sans border border-white/20">
                {milestonesData[activeIndex].tag}
              </span>
            </div>

            {/* Card Body: Title & Description */}
            <div className="relative z-20 p-5 text-left space-y-1.5 mt-auto pointer-events-none">
              <h3 className="text-lg sm:text-xl font-normal text-white font-heading leading-snug">
                {milestonesData[activeIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {milestonesData[activeIndex].description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mobile Touch Controls & Thumb Arrows */}
        <div className="w-full max-w-[360px] flex items-center justify-between gap-3 mt-4 pt-1">
          <button
            type="button"
            onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
            disabled={activeIndex === 0}
            aria-label="Previous milestone"
            className="w-10 h-10 rounded-full border border-saffron/25 bg-white/90 dark:bg-neutral-800 flex items-center justify-center text-foreground disabled:opacity-25 disabled:cursor-not-allowed active:scale-90 transition-all shadow-sm cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-saffron" />
          </button>

          <div className="flex flex-col items-center">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-slate-500 font-sans">
              Swipe or Tap • {activeIndex + 1} of {milestonesData.length}
            </span>
            <div className="flex gap-1.5 mt-1.5">
              {milestonesData.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to milestone ${idx + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                    activeIndex === idx ? "w-6 bg-saffron" : "w-1.5 bg-saffron/30"
                  )}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveIndex((prev) => Math.min(prev + 1, milestonesData.length - 1))}
            disabled={activeIndex === milestonesData.length - 1}
            aria-label="Next milestone"
            className="w-10 h-10 rounded-full border border-saffron/25 bg-white/90 dark:bg-neutral-800 flex items-center justify-center text-foreground disabled:opacity-25 disabled:cursor-not-allowed active:scale-90 transition-all shadow-sm cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-saffron" />
          </button>
        </div>
      </div>

      {/* Desktop Navigation Progress Indicator (Hidden on Mobile) */}
      <div className="hidden lg:flex text-center relative z-20 mb-2 sm:mb-4 flex-col items-center justify-center gap-1">
        <div className="flex gap-2.5 mt-2">
          {MILESTONES.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to ${item.year}`}
              className={cn(
                "h-2 rounded-full bg-saffron transition-all duration-300 cursor-pointer",
                activeIndex === idx ? "w-8 opacity-100 shadow-sm" : "w-2 opacity-30 hover:opacity-70"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
