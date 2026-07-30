"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HISTORY = [
  {
    year: "2018",
    title: "Official Registration",
    desc: "Registered under Bombay Public Trust Act as a public charity. Formed active regional governance committees in Maharashtra.",
  },
  {
    year: "2020",
    title: "Social Relief Campaigns",
    desc: "Dedicated resources to support stranded workers and rural regions with vital provisions during pandemic lockdowns.",
  },
  {
    year: "2022",
    title: "Healthcare Centers Setup",
    desc: "Set up central diagnostic counseling desks and organized massive blood donation drives coordinating with urban hospitals.",
  },
  {
    year: "2025",
    title: "Ecology Vasundhara Project",
    desc: "Adopted 12 deforested hill locations to conduct mass tree planting and constructed primary school desks for rural students.",
  },
];

export default function AboutTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !progressBarRef.current) return;

    const ctx = gsap.context(() => {
      // Timeline line progress height linked to scroll
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

      // Stagger nodes in
      gsap.fromTo(
        ".about-timeline-node",
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-white"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Milestones</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Trust Timeline History
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline Core */}
        <div className="relative">
          {/* Vertical Progress Bar */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-1/2">
            <div 
              ref={progressBarRef}
              className="w-full h-full bg-gradient-to-b from-saffron to-gold origin-top scale-y-0"
            />
          </div>

          <div className="space-y-16">
            {HISTORY.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={item.year}
                  className="about-timeline-node flex flex-col md:flex-row relative items-start md:items-center"
                >
                  {/* Saffron Bullet Indicator */}
                  <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-white border-4 border-saffron -translate-x-1/2 z-10" />

                  {/* Left block (alternating grid) */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:px-12 ${isEven ? "md:order-1 md:text-right" : "md:order-2 md:text-left"}`}>
                    <div className="glass-panel p-6 rounded-block">
                      <span className="text-xs font-bold text-saffron uppercase tracking-widest">{item.year}</span>
                      <h3 className="text-xl font-extrabold text-foreground mt-1 mb-2 font-heading">{item.title}</h3>
                      <p className="text-sm text-slate-grey leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* Right empty spacer helper */}
                  <div className={`hidden md:block w-1/2 ${isEven ? "md:order-2" : "md:order-1"}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
