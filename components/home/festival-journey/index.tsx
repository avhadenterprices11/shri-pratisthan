"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function FestivalJourney() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
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

  const totalMilestones = milestonesData.length;

  // Responsive slide size measurement
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
        setSlideSize(Math.min(width - 48, 350));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Silky Smooth GSAP Pinned Scroll Progression (Zero Tilt, 100% Level, GPU-Accelerated)
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Total travel distance to bring each card smoothly to center
      const travelDistance = (totalMilestones - 1) * slideSize;

      // Animate the track horizontally on scrub
      const anim = gsap.to(track, {
        x: -travelDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 1.2, 1000)}`,
          scrub: 0.3,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const rawIndex = self.progress * (totalMilestones - 1);
            const clampedIndex = Math.min(
              totalMilestones - 1,
              Math.max(0, Math.round(rawIndex))
            );
            setActiveIndex((prev) => (prev !== clampedIndex ? clampedIndex : prev));
          },
        },
      });

      scrollTriggerRef.current = anim.scrollTrigger ?? null;
    }, sectionRef);

    // Refresh after DOM layout stabilization
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      ctx.revert();
      clearTimeout(timer);
      scrollTriggerRef.current = null;
    };
  }, [totalMilestones, slideSize]);

  // Click navigation: smoothly scrolls the page so the pinned journey lands on target milestone
  const scrollToMilestone = useCallback((targetIndex: number) => {
    const st = scrollTriggerRef.current;
    if (st) {
      const targetScroll = st.start + (targetIndex / (totalMilestones - 1)) * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    } else {
      setActiveIndex(targetIndex);
    }
  }, [totalMilestones]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-background flex flex-col justify-between py-6 sm:py-10 select-none"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-35" />
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none translate-y-12 opacity-25" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto px-4 sm:px-6 relative z-20 space-y-2 pt-2 sm:pt-4">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-foreground tracking-tight font-heading leading-snug">
          {t("festivalJourney.title")}
        </h2>
        <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-2 rounded-full" />
      </div>

      {/* Carousel Viewport with Level Cards */}
      <div className="relative w-full h-[360px] sm:h-[410px] lg:h-[440px] my-auto flex items-center justify-center overflow-hidden">

        {/* Level Track — Animate horizontal X via GSAP on scroll scrub */}
        <div
          ref={trackRef}
          className="absolute left-[50%] flex w-fit items-center will-change-transform"
          style={{
            // Card 0 starts centered exactly in viewport
            marginLeft: -slideSize / 2,
          }}
        >
          {milestonesData.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={item.year}
                className="flex shrink-0 flex-col items-center justify-center will-change-transform px-2 sm:px-4"
                style={{ width: slideSize }}
                onClick={() => scrollToMilestone(index)}
              >
                {/* Milestone Detail Card — Always Level, Straight, and Elegant */}
                <div
                  className={cn(
                    "group w-full h-[320px] sm:h-[370px] lg:h-[400px] rounded-2xl sm:rounded-block overflow-hidden flex flex-col justify-between border bg-[#121214] shadow-2xl transition-[opacity,border-color,box-shadow] duration-300 relative cursor-pointer",
                    isActive
                      ? "border-saffron/50 shadow-saffron/25 ring-2 ring-saffron/35 scale-100 opacity-100"
                      : "border-slate-800/80 shadow-slate-950/60 scale-[0.94] opacity-40 hover:opacity-75"
                  )}
                >
                  {/* Background Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 340px, 440px"
                    priority={index === 0}
                    className={cn(
                      "transition-transform duration-700 ease-out group-hover:scale-105",
                      item.fit === "contain"
                        ? "object-contain p-6 sm:p-8 -translate-y-3"
                        : "object-cover"
                    )}
                  />

                  {/* Gradient Overlay for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/25 z-10" />

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
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Year Milestones Selector & Progress Track */}
      <div className="text-center relative z-20 pb-2 sm:pb-4 flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-1.5 sm:gap-3 bg-black/60 dark:bg-white/5 backdrop-blur-md border border-white/10 p-1.5 rounded-full shadow-lg">
          {milestonesData.map((item, idx) => {
            const isCurrent = activeIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToMilestone(idx)}
                aria-label={`Milestone ${item.year}`}
                className={cn(
                  "px-3.5 sm:px-5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-300 font-sans cursor-pointer flex items-center gap-1.5",
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
