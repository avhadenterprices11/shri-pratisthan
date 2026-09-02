"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HISTORY = [
  {
    year: "2006",
    title: "Indira Nagar Cricket Spark",
    desc: "Started as a close circle of 20 friends playing cricket daily in Indira Nagar, deciding to channel their bond and energy into community service.",
  },
  {
    year: "2012",
    title: "Festival & Youth Expansion",
    desc: "Expanded into organizing grand cultural celebrations, including the iconic Gudipadwa Swagat Yatra, Ganeshotsav, and youth sports events in Nashik.",
  },
  {
    year: "2018",
    title: "Official Trust Registration",
    desc: "Formally registered as 'कै.धर्मराज बडोदे बहुउद्देशिय सेवाभावी संस्था इंदिरानगर नाशिक' (Reg: nashik/0000153/2018) under Adv. Shyam Dharmaraj Badode.",
  },
  {
    year: "2021",
    title: "Pandemic Relief & Health Drives",
    desc: "Organized urgent food grain distribution, medical support during lockdowns, and accelerated regular blood donation drives across Nashik.",
  },
  {
    year: "Present",
    title: "19+ Years Legacy & Leadership",
    desc: "Leading 100+ active members and 20 founding pillars, conducting 50+ health drives, major cultural yatras, and annual sports tournaments.",
  },
];

export default function AboutTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".timeline-row");
      
      rows.forEach((row) => {
        const fillYear = row.querySelector(".timeline-fill-year");
        const detail = row.querySelector(".timeline-detail-content");
        
        // 1. Scrub Clip-Path Liquid Fill on scroll
        if (fillYear) {
          gsap.fromTo(
            fillYear,
            { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
            {
              clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 80%", // Starts filling as row moves up from bottom
                end: "bottom 35%", // Completes fill near top
                scrub: true,
              }
            }
          );
        }

        // 2. Smooth Slide Reveal for details on enter
        if (detail) {
          gsap.fromTo(
            detail,
            { opacity: 0, x: 40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row,
                start: "top 78%",
                toggleActions: "play none none reverse",
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-[#FFFDF9] border-t border-saffron/10 z-10 select-none"
    >
      {/* Background Grid Accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 106, 54, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 106, 54, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-saffron/15 mb-8 sm:mb-16 relative z-10">
          <div className="flex flex-col items-start gap-2 sm:gap-3">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-slate-800 font-heading uppercase leading-tight tracking-tight">
              Trust History
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-grey max-w-md font-sans font-normal leading-[1.75]">
            Our key operational milestones, reflecting direct social welfare impacts and structured organizational expansion.
          </p>
        </div>

        {/* Timeline Rows List */}
        <div className="max-w-5xl mx-auto flex flex-col gap-6 sm:gap-10 md:gap-14 relative z-10">
          {HISTORY.map((item) => {
            const isLongLabel = item.year.length > 4;
            const textSizeClass = isLongLabel
              ? "text-4xl sm:text-6xl md:text-7xl"
              : "text-5xl sm:text-7xl md:text-8xl";

            return (
              <div 
                key={item.year}
                className="timeline-row w-full grid grid-cols-1 md:grid-cols-12 items-center gap-3 sm:gap-6 md:gap-12 py-4 sm:py-8 border-b border-saffron/10 last:border-0 relative"
              >
                {/* Left Column: Giant Year outlines */}
                <div className="md:col-span-5 relative select-none leading-none h-[50px] sm:h-[80px] md:h-[120px] flex items-center justify-start overflow-hidden">
                  
                  {/* Outline Year Background */}
                  <div 
                    className={`${textSizeClass} font-normal font-heading tracking-tight leading-none whitespace-nowrap`}
                    style={{
                      WebkitTextStroke: "2px rgba(226, 106, 54, 0.18)",
                      color: "transparent",
                    }}
                  >
                    {item.year}
                  </div>

                  {/* Saffron Filled Liquid Text layer */}
                  <div 
                    className={`timeline-fill-year absolute left-0 ${textSizeClass} font-normal text-saffron font-heading tracking-tight leading-none whitespace-nowrap`}
                    style={{
                      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
                      willChange: "clip-path",
                    }}
                  >
                    {item.year}
                  </div>

                </div>

                {/* Right Column: Title and details */}
                <div className="timeline-detail-content md:col-span-7 flex flex-col items-start gap-2 sm:gap-3 text-left">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-normal text-slate-800 uppercase tracking-tight font-heading leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-grey leading-[1.7] font-sans font-normal">
                    {item.desc}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
