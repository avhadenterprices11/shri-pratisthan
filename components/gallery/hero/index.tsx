"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GalleryHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".reveal-line",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.15, duration: 1.2 }
      )
      .fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[50vh] flex flex-col justify-center items-center py-24 px-6 overflow-hidden md:px-12 text-center border-b border-saffron/10"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none" />
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none translate-y-12" />
      
      <div className="w-full max-w-4xl relative z-10">
        <div className="inline-flex items-center gap-2 mb-4 bg-saffron/10 text-saffron font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-saffron/20">
          <span>Visual Vault</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.05] tracking-tight mb-6 font-heading">
          <div className="overflow-hidden">
            <span className="block reveal-line">Immersive</span>
          </div>
          <div className="overflow-hidden">
            <span className="block reveal-line text-saffron text-outline-festive">Media Gallery.</span>
          </div>
        </h1>

        <p className="hero-subtitle text-base sm:text-lg text-slate-grey max-w-2xl mx-auto leading-relaxed">
          Explore photographic logs and looping video snippet reels of our cultural celebrations and community health operations.
        </p>
      </div>
    </section>
  );
}
