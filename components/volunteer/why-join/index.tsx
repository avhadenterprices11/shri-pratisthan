"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ValueItem {
  title: string;
  desc: string;
  badge: string;
}

const VALUES: ValueItem[] = [
  {
    title: "Direct Social Impact",
    desc: "Coordinate 50+ blood donation drives, free medical checkups, student aid kits, and relief campaigns to create measurable change in Indira Nagar and Nashik.",
    badge: "🤝",
  },
  {
    title: "Youth Leadership & Skills",
    desc: "Develop competencies in major cultural event management, stage coordination, emergency response, public communications, and social administration.",
    badge: "📈",
  },
  {
    title: "Cultural Heritage Preservation",
    desc: "Lead historic celebrations including the iconic Gudipadwa Swagat Yatra, Shree Ganeshotsav, Navratri, Shiv Jayanti, and traditional Lezim / Dhol Tasha.",
    badge: "🚩",
  },
  {
    title: "Camaraderie & Brotherhood",
    desc: "Experience the genuine sportsmanship and unity born from our 2006 cricket origin, building lifelong bonds with over 100+ active organizers and founding pillars.",
    badge: "🌐",
  },
];

export default function VolunteerWhyJoin() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardContentRef = useRef<HTMLDivElement>(null);

  // Stagger reveal section elements on scroll
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".split-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Automatic slide interval (3.5 seconds) - restarts whenever timerKey changes
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % VALUES.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [timerKey]);

  // Micro fade-and-slide up animation when activeIdx switches
  useEffect(() => {
    if (!cardContentRef.current) return;
    
    gsap.fromTo(
      cardContentRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, [activeIdx]);

  const handleTabClick = (idx: number) => {
    setActiveIdx(idx);
    setTimerKey((prev) => prev + 1); // Reset auto-play timer key
  };

  return (
    <section
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background border-t border-black/5"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-45 z-0" />
      
      <div className="max-w-6xl mx-auto relative z-10 split-reveal">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight font-heading leading-tight uppercase">
            Why Volunteer With Us?
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
        </div>

        {/* Interactive Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Tab list (scrolling tabs on mobile) */}
          <div className="md:col-span-5 flex md:flex-col gap-2.5 sm:gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-none w-full">
            {VALUES.map((item, index) => {
              const isActive = activeIdx === index;
              return (
                <button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  className={`text-left p-3 sm:p-5 rounded-xl border transition-all duration-300 flex items-center gap-2.5 sm:gap-4 group cursor-pointer shrink-0 md:shrink ${
                    isActive 
                      ? "bg-white border-saffron/20 shadow-lg" 
                      : "bg-transparent border-transparent hover:bg-white/40"
                  }`}
                >
                  <span className={`text-xs sm:text-base md:text-lg font-normal font-heading transition-colors duration-300 ${isActive ? "text-saffron" : "text-slate-grey group-hover:text-neutral-900"}`}>
                    0{index + 1}
                  </span>
                  <span className={`text-xs sm:text-base md:text-lg font-normal font-heading transition-colors duration-300 uppercase ${isActive ? "text-neutral-900" : "text-slate-grey group-hover:text-neutral-900"}`}>
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Display Card Portal */}
          <div className="md:col-span-7">
            <div className="glass-panel p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-block bg-white border border-saffron/15 shadow-2xl relative min-h-[220px] sm:min-h-[280px] flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-20 z-0" />
              
              <div ref={cardContentRef} className="relative z-10">
                {/* Title */}
                <h3 className="text-xl sm:text-3xl font-normal text-neutral-900 mb-2.5 sm:mb-4 font-heading leading-snug uppercase">
                  {VALUES[activeIdx].title}
                </h3>
                
                {/* Description */}
                <p className="text-slate-grey text-xs sm:text-base md:text-lg leading-[1.7] sm:leading-[1.75] font-sans font-normal">
                  {VALUES[activeIdx].desc}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
