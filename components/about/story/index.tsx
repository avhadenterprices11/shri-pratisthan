"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STORY_STEPS = [
  {
    year: "2012",
    title: "Shivaji Park Roots",
    description: "Shree Prathishthan started as a small, informal collective of youth volunteers in Shivaji Park, Mumbai. Dedicated to organizing safe and orderly logistics during regional Ganeshotsav festivals, their energy became the catalyst for a larger vision.",
    image: "/images/ganesh.jpg",
    badge: "The Spark",
  },
  {
    year: "2018",
    title: "Public Charitable Trust",
    description: "In 2018, the group formally structured itself, registering under the Bombay Public Trust Act. The goal was to prevent cultural pride from becoming static history, translating it into immediate social progress and disaster relief.",
    image: "/images/dahi-handi.jpg",
    badge: "Formal Structure",
  },
  {
    year: "Present",
    title: "Rural Mobilization",
    description: "Today, we act as a vital bridge between urban resources and rural development needs. By organizing healthcare drives, supply distribution, and eco-friendly workshops, we demonstrate that legacy and care belong together.",
    image: "/images/social-work.jpg",
    badge: "Continuous Impact",
  },
];

export default function AboutStory() {
  const [activeYear, setActiveYear] = useState(STORY_STEPS[0].year);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeYearRef = useRef(activeYear);

  // Sync ref with state
  useEffect(() => {
    activeYearRef.current = activeYear;
    gsap.fromTo(
      ".story-year-text",
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
    );
  }, [activeYear]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cardItems = gsap.utils.toArray<HTMLElement>(".story-card-item");
      
      cardItems.forEach((card) => {
        const year = card.getAttribute("data-year");
        if (!year) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => {
            if (activeYearRef.current !== year) {
              setActiveYear(year);
            }
          },
          onEnterBack: () => {
            if (activeYearRef.current !== year) {
              setActiveYear(year);
            }
          },
        });
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
      className="relative w-full bg-[#FFFDF9] py-20 px-6 md:px-12 xl:px-24 border-t border-saffron/10 z-10 select-none"
    >
      {/* Background Grid Accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 106, 54, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 106, 54, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px"
        }}
      />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-start relative z-10">
        
        {/* Left Column: Sticky Sidebar Info & Giant Year */}
        <div className="w-full lg:w-5/12 lg:sticky lg:top-[16vh] flex flex-col items-start gap-6 z-20 will-change-transform">

          <h2 className="text-3xl sm:text-5xl font-black text-slate-800 tracking-tighter uppercase font-heading">
            Our Roots & Evolution
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-grey max-w-md leading-relaxed font-sans font-light">
            We realized that the immense energy gathered during our annual cultural celebrations could be directed to help solve local community issues year-round.
          </p>

          {/* Giant Active Year Indicator display */}
          <div className="relative overflow-hidden h-[100px] sm:h-[130px] w-full mt-4 flex items-center justify-start border-t border-saffron/15 pt-6">
            {/* Outline Shadow Text */}
            <div className="absolute left-0 text-7xl sm:text-8xl font-black text-saffron/10 font-heading select-none uppercase tracking-tighter leading-none">
              {activeYear}
            </div>
            {/* Animated Solid Text */}
            <div 
              className="text-6xl sm:text-7xl font-black text-saffron font-heading uppercase tracking-tighter leading-none story-year-text relative z-10"
            >
              {activeYear}
            </div>
          </div>

        </div>

        {/* Right Column: Editorial Cards Feed (Natural Y scroll) */}
        <div className="w-full lg:w-7/12 flex flex-col gap-16 relative z-10">
          {STORY_STEPS.map((step, index) => {
            return (
              <div
                key={index}
                className="story-card-item w-full bg-white border border-saffron/15 rounded-[2.5rem] p-8 sm:p-10 shadow-xl shadow-saffron/5 flex flex-col gap-6 transition-all duration-300 hover:border-saffron/30 hover:shadow-2xl will-change-transform"
                data-year={step.year}
              >
                {/* Card Image Frame */}
                <div className="w-full aspect-[16/10] relative overflow-hidden rounded-[1.8rem] border border-saffron/10 shadow-md bg-slate-100">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-103"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                  {/* Subtle vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                </div>

                {/* Card Text Content */}
                <div className="flex flex-col items-start gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-saffron font-heading leading-none">
                      {step.year}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight font-heading">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-grey leading-relaxed font-sans font-light">
                    {step.description}
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
