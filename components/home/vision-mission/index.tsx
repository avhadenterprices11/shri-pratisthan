"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VisionMission() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vision-box",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 1.0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-24 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Our Foundations</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Vision & Mission
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Block */}
          <div className="vision-box glass-panel p-8 sm:p-12 rounded-block relative overflow-hidden group hover:border-saffron/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/5 rounded-full blur-3xl group-hover:bg-saffron/10 transition-all" />
            <div className="text-xs uppercase font-bold tracking-widest text-saffron mb-4">The Vision</div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-6 font-heading">
              Cultural Purity, Youth Unity
            </h3>
            <p className="text-base sm:text-lg text-slate-grey leading-relaxed mb-6">
              To build a close-knit group of friends where Maharashtra's traditional heritage is celebrated with dynamic pride, acting as a catalyst for local volunteer collaboration and community joy.
            </p>
            <p className="text-sm text-slate-grey/80 leading-relaxed">
              We envision a future where our friends group unites neighborhoods, fosters strong bonds of brotherhood, and our traditional street festivals set benchmarks for safe, organized, and lively operations.
            </p>
          </div>

          {/* Mission Block */}
          <div className="vision-box glass-panel p-8 sm:p-12 rounded-block relative overflow-hidden group hover:border-gold/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-all" />
            <div className="text-xs uppercase font-bold tracking-widest text-gold mb-4">The Mission</div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-6 font-heading">
              Energy in Performance, Pride in Legacy
            </h3>
            <p className="text-base sm:text-lg text-slate-grey leading-relaxed mb-6">
              To organize high-standard street celebrations, safe athletic events like Dahi Handi, and preserve folk music traditions through dedicated practice.
            </p>
            <p className="text-sm text-slate-grey/80 leading-relaxed">
              We execute our mission through active youth enlistment, regular Dhol Tasha practice workshops, and coordinate decorative arts to bring vibrant festive moments directly to Maharashtra's streets.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
