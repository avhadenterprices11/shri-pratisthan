"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

interface CalendarItem {
  num: string;
  month: string;
  title: string;
  desc: string;
  type: string;
  badgeClass: string;
}

export default function FestivalCalendar() {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const CALENDAR_ITEMS: CalendarItem[] = [
    {
      num: "1",
      month: t("eventsPage.calendar.c1Month"),
      title: t("eventsPage.calendar.c1Title"),
      desc: t("eventsPage.calendar.c1Desc"),
      type: t("eventsPage.calendar.c1Type"),
      badgeClass: "bg-saffron/10 border-saffron/30 text-saffron",
    },
    {
      num: "2",
      month: t("eventsPage.calendar.c2Month"),
      title: t("eventsPage.calendar.c2Title"),
      desc: t("eventsPage.calendar.c2Desc"),
      type: t("eventsPage.calendar.c2Type"),
      badgeClass: "bg-amber-50 border-amber-200 text-amber-600",
    },
    {
      num: "3",
      month: t("eventsPage.calendar.c3Month"),
      title: t("eventsPage.calendar.c3Title"),
      desc: t("eventsPage.calendar.c3Desc"),
      type: t("eventsPage.calendar.c3Type"),
      badgeClass: "bg-rose-50 border-rose-200 text-rose-600",
    },
    {
      num: "4",
      month: t("eventsPage.calendar.c4Month"),
      title: t("eventsPage.calendar.c4Title"),
      desc: t("eventsPage.calendar.c4Desc"),
      type: t("eventsPage.calendar.c4Type"),
      badgeClass: "bg-saffron/10 border-saffron/30 text-saffron",
    },
    {
      num: "5",
      month: t("eventsPage.calendar.c5Month"),
      title: t("eventsPage.calendar.c5Title"),
      desc: t("eventsPage.calendar.c5Desc"),
      type: t("eventsPage.calendar.c5Type"),
      badgeClass: "bg-red-50 border-red-200 text-red-600",
    },
    {
      num: "6",
      month: t("eventsPage.calendar.c6Month"),
      title: t("eventsPage.calendar.c6Title"),
      desc: t("eventsPage.calendar.c6Desc"),
      type: t("eventsPage.calendar.c6Type"),
      badgeClass: "bg-orange-50 border-orange-200 text-orange-600",
    },
    {
      num: "7",
      month: t("eventsPage.calendar.c7Month"),
      title: t("eventsPage.calendar.c7Title"),
      desc: t("eventsPage.calendar.c7Desc"),
      type: t("eventsPage.calendar.c7Type"),
      badgeClass: "bg-gold/10 border-gold/30 text-amber-700",
    },
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !sliderRef.current) return;

    const mm = gsap.matchMedia();

    // Mobile Phone Preview: Responsive pinned horizontal timeline with compact scroll distance
    mm.add("(max-width: 767px)", () => {
      const slider = sliderRef.current;
      const container = containerRef.current;
      if (!slider || !container) return;

      const cardWidth = 260;
      const gap = 14;
      const step = cardWidth + gap;

      const W = container.clientWidth || window.innerWidth;
      const offset = (W - cardWidth) / 2;

      const startX = offset;
      const endX = offset - (CALENDAR_ITEMS.length - 1) * step;
      // Snappy 480px scrub distance so all 7 months scroll gracefully without feeling stuck
      const scrollDistance = 480;

      gsap.fromTo(
        slider,
        { x: startX },
        {
          x: endX,
          ease: "none",
          scrollTrigger: {
            trigger: "#calendarPinContainer",
            start: "top 8%",
            end: () => `+=${scrollDistance}`,
            scrub: 0.35,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            preventOverlaps: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const currentX = startX + (endX - startX) * progress;
              const index = Math.round((offset - currentX) / step);
              const boundedIndex = Math.max(0, Math.min(index, CALENDAR_ITEMS.length - 1));
              setActiveIdx(boundedIndex);
            },
          },
        }
      );
    });

    // Desktop Preview: Smooth pinned scrub
    mm.add("(min-width: 768px)", () => {
      const slider = sliderRef.current;
      const container = containerRef.current;
      if (!slider || !container) return;

      const cardWidth = 320;
      const gap = 28;
      const step = cardWidth + gap;

      const W = container.clientWidth;
      const offset = (W - cardWidth) / 2;

      const startX = offset;
      const endX = offset - (CALENDAR_ITEMS.length - 1) * step;
      const scrollDistance = 700;

      gsap.fromTo(
        slider,
        { x: startX },
        {
          x: endX,
          ease: "none",
          scrollTrigger: {
            trigger: "#calendarPinContainer",
            start: "top 12%",
            end: () => `+=${scrollDistance}`,
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            preventOverlaps: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const currentX = startX + (endX - startX) * progress;
              const index = Math.round((offset - currentX) / step);
              const boundedIndex = Math.max(0, Math.min(index, CALENDAR_ITEMS.length - 1));
              setActiveIdx(boundedIndex);
            },
          },
        }
      );
    });

    // Recalculate heights after layout hydration settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      mm.revert();
      clearTimeout(refreshTimer);
    };
  }, []);

  const handleCardClick = (idx: number) => {
    const triggers = ScrollTrigger.getAll();
    const calendarTrigger = triggers.find(t => t.trigger?.id === "calendarPinContainer");
    if (calendarTrigger) {
      const start = calendarTrigger.start;
      const end = calendarTrigger.end;
      const progress = idx / (CALENDAR_ITEMS.length - 1);
      const scrollPos = start + (end - start) * progress;
      window.scrollTo({
        top: scrollPos,
        behavior: "smooth",
      });
    }
    setActiveIdx(idx);
  };

  return (
    <section 
      id="calendarPinContainer" 
      ref={containerRef}
      className="bg-background relative w-full py-6 sm:py-10 md:py-14 flex flex-col justify-center overflow-hidden select-none border-t border-black/5"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 z-0 animate-pulse" />
      
      <div className="relative z-10 w-full flex flex-col justify-center overflow-hidden">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-2 sm:mb-5 md:mb-7 px-4 sm:px-6 overflow-visible">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 font-heading leading-normal sm:leading-snug tracking-normal">
            {t("eventsPage.calendar.heading")}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-1.5 sm:mt-2.5 rounded-full" />
        </div>

        {/* Scroll Instruction Banner */}
        <div className="text-center mb-2.5 sm:mb-4">
          <span className="text-[10px] sm:text-xs text-slate-grey/70 font-bold uppercase tracking-[0.2em] bg-black/5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full inline-block font-sans select-none">
            {t("eventsPage.calendar.scrollInstruction")}
          </span>
        </div>

        {/* The Scroll Viewport Track */}
        <div className="relative w-full overflow-hidden pb-2 sm:pb-5 pt-1 select-none">
          {/* Animated GSAP Track */}
          <div 
            ref={sliderRef}
            className="flex gap-3.5 sm:gap-6 md:gap-7 w-max will-change-transform transform-gpu"
          >
            {CALENDAR_ITEMS.map((item, index) => {
              const isActive = activeIdx === index;
              return (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`w-[260px] sm:w-[290px] md:w-[320px] shrink-0 p-4 sm:p-6 md:p-7 rounded-2xl bg-white/95 border transition-[border-color,box-shadow,opacity] duration-300 min-h-[210px] sm:min-h-[250px] flex flex-col justify-between cursor-pointer select-none transform-gpu will-change-transform ${
                    isActive 
                      ? "border-saffron/40 shadow-xl opacity-100 z-10 shadow-saffron/15" 
                      : "border-black/5 opacity-60 sm:opacity-50 hover:opacity-75 z-0 shadow-sm"
                  }`}
                >
                  <div>
                    {/* Month Title */}
                    <span className="text-xl sm:text-2xl md:text-3xl font-normal font-heading text-neutral-900 block mb-1 leading-none uppercase">
                      {item.month}
                    </span>

                    {/* Event Title */}
                    <h3 className="text-sm sm:text-base font-normal text-neutral-900 font-heading mb-1.5 sm:mb-2 leading-snug">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-grey leading-[1.6] font-sans select-none pointer-events-none line-clamp-3">
                      {item.desc}
                    </p>
                  </div>

                  {/* Indicator stamp */}
                  <div className="mt-3 sm:mt-5 pt-2.5 sm:pt-3 border-t border-saffron/10 flex justify-between items-center text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] text-saffron font-sans">
                    <span>{t("eventsPage.calendar.activeDriveLocation")}</span>
                    <span>★</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestone Indicator tracker */}
        <div className="flex justify-center gap-1.5 mt-2 sm:mt-3 select-none">
          {CALENDAR_ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleCardClick(idx)}
              aria-label={`Month ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIdx === idx ? "w-6 sm:w-8 bg-saffron" : "w-1.5 sm:w-2 bg-neutral-300 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
