"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutVision() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vision-slide",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10 vision-slide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4">
            <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Our Vision</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading leading-tight">
              Cultural Purity & Collective Upliftment
            </h2>
            <div className="w-12 h-1 bg-saffron mt-4 rounded-full" />
          </div>

          <div className="md:col-span-8">
            <p className="text-lg sm:text-xl text-slate-grey leading-relaxed mb-6 font-medium">
              We envision a future where India's rich cultural legacy acts as a direct catalyst for civic duty, local empowerment, and educational equality.
            </p>
            <p className="text-base text-slate-grey/80 leading-relaxed">
              By channeling public festival coordination into continuous welfare operations, we aim to ensure that no underprivileged child lacks learning tools and no rural community is isolated from primary medical diagnostics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
