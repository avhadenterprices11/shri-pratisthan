"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CommunityMission() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mission-slide",
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
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-50" />
      <div className="max-w-6xl mx-auto relative z-10 mission-slide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8 order-2 md:order-1">
            <p className="text-lg sm:text-xl text-slate-grey leading-relaxed mb-6 font-medium font-sans">
              We believe that true societal transformation begins at the grassroots level. By structuring local networks, Shree Prathishthan bridges critical healthcare deficits and environmental challenges.
            </p>
            <p className="text-base text-slate-grey/80 leading-relaxed font-sans">
              Our community initiatives focus on immediate humanitarian relief, ecological restoration through active tree plantation, and establishing robust emergency volunteer registers to safeguard lives when crises strike.
            </p>
          </div>

          <div className="md:col-span-4 order-1 md:order-2">
            <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Our Vision</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading leading-tight">
              Sustained Welfare, United Action
            </h2>
            <div className="w-12 h-1 bg-saffron mt-4 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
