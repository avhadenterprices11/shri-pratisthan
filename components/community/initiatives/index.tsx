"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Shield, Leaf, ArrowDownRight } from "lucide-react";

interface InitiativeItem {
  title: string;
  desc: string;
  tag: string;
  icon: React.ReactNode;
  anchor: string;
}

const INITIATIVES_SUMMARY: InitiativeItem[] = [
  {
    title: "Healthcare & Life Drives",
    desc: "Over 50+ mass blood donation camps, International Yoga Day sessions, emergency donor registry, and free medical checkup drives across Nashik.",
    tag: "Arogya",
    icon: <Heart className="w-6 h-6 text-saffron" />,
    anchor: "#blood-donation",
  },
  {
    title: "Ecological & Cleanliness",
    desc: "Mass tree planting campaigns, green cover enhancement, civic cleanliness drives, and promoting eco-friendly festival celebrations in Indira Nagar.",
    tag: "Vasundhara",
    icon: <Leaf className="w-6 h-6 text-saffron" />,
    anchor: "#tree-plantation",
  },
  {
    title: "Socio-Educational & Relief",
    desc: "Educational study kits and books for students, dry ration distribution, disaster support, and empowering youth through community welfare.",
    tag: "Seva",
    icon: <Shield className="w-6 h-6 text-saffron" />,
    anchor: "#charity-social-work",
  },
];

export default function CommunityInitiatives() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchRow, setTouchRow] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrance fade-in animation for rows
      gsap.fromTo(
        ".initiative-row-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
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

  const handleScrollToSection = (anchor: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const el = document.querySelector(anchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background border-t border-black/5 select-none"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl mb-8 sm:mb-16">
          <span className="text-saffron font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.25em] block mb-2 sm:mb-3 font-sans">
            Our Pillars
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight font-heading leading-tight uppercase">
            Key Focus Areas
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mt-3 sm:mt-4 rounded-full" />
        </div>

        {/* Marquee Rows Accordion List */}
        <div className="flex flex-col border-t border-neutral-300">
          {INITIATIVES_SUMMARY.map((item, index) => {
            const isTouchActive = touchRow === index;

            return (
              <div
                key={index}
                onClick={() => handleScrollToSection(item.anchor)}
                onTouchStart={() => setTouchRow(index)}
                onTouchEnd={() => setTouchRow(null)}
                onTouchCancel={() => setTouchRow(null)}
                className="initiative-row-item group border-b border-neutral-300 py-6 sm:py-10 cursor-pointer overflow-hidden transition-all duration-500 ease-in-out relative flex flex-col justify-start"
              >
                {/* Hardware Accelerated Infinite CSS Marquee */}
                <div className="w-full overflow-hidden flex relative z-10 py-1 sm:py-2">
                  <div
                    className="flex whitespace-nowrap animate-marquee lg:group-hover:[animation-play-state:paused] will-change-transform"
                    style={{
                      animationPlayState: isTouchActive ? "paused" : undefined,
                    }}
                  >
                    
                    {/* First continuous loop panel */}
                    <div className="flex whitespace-nowrap gap-x-6 sm:gap-x-12 pr-6 sm:pr-12">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 sm:gap-8">
                          <span className="text-[9px] sm:text-[10px] font-bold text-saffron tracking-[0.2em] uppercase bg-saffron/10 px-2.5 sm:px-3 py-1 rounded-full border border-saffron/20 flex items-center gap-1.5 font-sans">
                            0{index + 1} / {item.tag}
                          </span>
                          <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal font-heading text-outline-festive tracking-tight uppercase transition-all duration-300 group-hover:text-saffron">
                            {item.title}
                          </span>
                          <div className="shrink-0 scale-85 sm:scale-100">{item.icon}</div>
                        </div>
                      ))}
                    </div>

                    {/* Second panel for seamless repeating */}
                    <div className="flex whitespace-nowrap gap-x-6 sm:gap-x-12 pr-6 sm:pr-12" aria-hidden="true">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 sm:gap-8">
                          <span className="text-[9px] sm:text-[10px] font-bold text-saffron tracking-[0.2em] uppercase bg-saffron/10 px-2.5 sm:px-3 py-1 rounded-full border border-saffron/20 flex items-center gap-1.5 font-sans">
                            0{index + 1} / {item.tag}
                          </span>
                          <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal font-heading text-outline-festive tracking-tight uppercase transition-all duration-300 group-hover:text-saffron">
                            {item.title}
                          </span>
                          <div className="shrink-0 scale-85 sm:scale-100">{item.icon}</div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Expanded detailed description - Always readable on mobile and animated on desktop */}
                <div className="max-w-4xl px-2 sm:px-4 mt-3 sm:mt-0 sm:max-h-0 sm:opacity-0 group-hover:sm:max-h-[160px] group-hover:sm:opacity-100 transition-all duration-500 ease-out group-hover:sm:mt-6">
                  <p className="text-xs sm:text-base md:text-lg text-[#525250] leading-[1.7] sm:leading-[1.75] max-w-3xl font-sans font-normal">
                    {item.desc}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => handleScrollToSection(item.anchor, e)}
                    className="mt-2.5 sm:mt-4 inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white bg-saffron hover:bg-saffron/90 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md transition-all cursor-pointer group-hover:scale-102 font-sans"
                  >
                    <span>Explore details</span>
                    <ArrowDownRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

