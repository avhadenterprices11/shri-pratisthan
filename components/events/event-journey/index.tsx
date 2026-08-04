"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SlideItem {
  stage: string;
  title: string;
  desc: string;
  image: string;
}

const SLIDES: SlideItem[] = [
  {
    stage: "Operations",
    title: "Campaign Lifecycle Journey",
    desc: "Tracing our structured project lifecycle from initial volunteer alignment to transparent post-campaign audits.",
    image: "/about_showcase.png",
  },
  {
    stage: "Stage 01",
    title: "Volunteer Alignment",
    desc: "Gathering and grouping local volunteers into specialized divisions (Logistics, Safety, and Medical support coordinates).",
    image: "/volunteer_coordinator.png",
  },
  {
    stage: "Stage 02",
    title: "Safety & Launch Execution",
    desc: "Inspecting structure coordinates, securing helmets/safety harnesses, and executing active campaigns (blood donations, planting, or pyramids) under structured supervision.",
    image: "/hero_dahihandi.png",
  },
  {
    stage: "Stage 03",
    title: "Transparency & Audits",
    desc: "Publishing detailed expenditure audits and impact reports directly to patrons, community members, and corporate CSR partners.",
    image: "/community_assembly.png",
  },
];

export default function EventJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const slides = gsap.utils.toArray<HTMLElement>(".parallax-slide");

    const ctx = gsap.context(() => {
      // Loop through slides and bind vertical parallax movement to backplates
      slides.forEach((slideEl) => {
        const bg = slideEl.querySelector(".parallax-bg-target");
        if (!bg) return;

        gsap.fromTo(
          bg,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: slideEl,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full relative overflow-hidden bg-background">
      {SLIDES.map((slide, index) => {
        const isHeader = index === 0;
        return (
          <section
            key={index}
            className="parallax-slide relative w-full h-[85vh] md:h-screen overflow-hidden flex items-center justify-center border-b border-black/5"
          >
            {/* Background visual parallax layer */}
            <div
              className="absolute inset-0 bg-cover bg-center parallax-bg-target scale-110"
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            {/* Dark Overlay vignette for readability */}
            <div className={`absolute inset-0 z-0 pointer-events-none ${isHeader ? "bg-black/50" : "bg-neutral-900/35"}`} />

            {isHeader ? (
              /* Title Header Slide - Giant Typographic Overlay */
              <div className="relative z-10 text-center text-white px-6 max-w-3xl space-y-4">
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading leading-none tracking-tight drop-shadow-lg text-white">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-neutral-200 leading-relaxed font-sans max-w-xl mx-auto drop-shadow-md font-medium">
                  {slide.desc}
                </p>
              </div>
            ) : (
              /* Floating Glass Card content for stages */
              <div className="relative z-10 glass-panel p-8 sm:p-12 bg-white/95 border border-white/50 backdrop-blur-md shadow-2xl max-w-xl w-full text-center space-y-4 rounded-block mx-6">
                <h3 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 font-heading leading-tight">
                  {slide.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans font-medium">
                  {slide.desc}
                </p>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
