"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    year: "2018",
    title: "The Genesis",
    description: "Shree Prathishthan is established by passionate community leaders to structure local Ganeshotsav festival logistics safely.",
    tag: "Foundation",
  },
  {
    year: "2020",
    title: "Pandemic Response",
    description: "Pivoted entirely to social aid during emergency lockdowns, distributing over 10,000 food and sanitization packs to rural areas.",
    tag: "Welfare Expansion",
  },
  {
    year: "2022",
    title: "Healthcare Initiative Launched",
    description: "Began organizing regular, free medical diagnostics and blood donation camps across Mumbai and Pune districts.",
    tag: "Healthcare",
  },
  {
    year: "2025",
    title: "Adopting Villages",
    description: "Expanded our rural outreach program by adopting 12 deforested, water-stressed villages for tree planting and school support.",
    tag: "Sustainability",
  },
];

export default function FestivalJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !progressBarRef.current) return;

    const ctx = gsap.context(() => {
      // Connect timeline progress height to scroll position
      gsap.fromTo(
        progressBarRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );

      // Animate timeline nodes
      gsap.fromTo(
        ".timeline-node",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-white/40 border-y border-saffron/10"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Our History</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            The Journey of Shree Prathishthan
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Progress Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-1/2">
            <div 
              ref={progressBarRef}
              className="w-full h-full bg-gradient-to-b from-saffron to-gold origin-top scale-y-0"
            />
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-16">
            {MILESTONES.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={item.year}
                  className={`timeline-node flex flex-col md:flex-row relative items-start md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Outer dot */}
                  <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-white border-4 border-saffron -translate-x-1/2 z-10" />

                  {/* Left Content Side */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                    <div className={`glass-panel p-6 rounded-block relative ${isEven ? "md:text-left" : "md:text-right"}`}>
                      <span className="text-xs font-bold text-saffron uppercase tracking-widest">{item.tag}</span>
                      <h3 className="text-2xl font-extrabold text-foreground mt-1 mb-2 font-heading">{item.year} - {item.title}</h3>
                      <p className="text-sm text-slate-grey leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Empty Side helper for grid spacing */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
