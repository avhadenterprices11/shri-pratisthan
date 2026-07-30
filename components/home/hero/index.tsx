"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Animate lines/letters up
      tl.fromTo(
        ".reveal-line",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.15, duration: 1.2 }
      )
      .fromTo(
        ".hero-photo-layer",
        { scale: 0.9, opacity: 0, rotate: -2 },
        { scale: 1, opacity: 1, rotate: 0, stagger: 0.1, duration: 1.5 },
        "-=0.8"
      )
      .fromTo(
        ".hero-cta-btn",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
        "-=1.0"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-center items-center py-20 px-6 overflow-hidden md:px-12"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none" />
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none translate-y-20" />
      
      <div className="w-full max-w-7xl grid grid-cols-1 gap-12 items-center relative z-10 lg:grid-cols-12">
        {/* Left Column: Typography Content */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <div className="inline-flex items-center gap-2 mb-4 bg-saffron/10 text-saffron font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-saffron/20 animate-pulse">
            <span>संस्कृति: सेवा च परम धर्म:</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.05] tracking-tight mb-6 font-heading">
            <div className="overflow-hidden">
              <span className="block reveal-line">Preserving</span>
            </div>
            <div className="overflow-hidden">
              <span className="block reveal-line text-saffron text-outline-festive">Our Heritage.</span>
            </div>
            <div className="overflow-hidden">
              <span className="block reveal-line">Empowering</span>
            </div>
            <div className="overflow-hidden">
              <span className="block reveal-line text-gold">Communities.</span>
            </div>
          </h1>

          <p className="text-base sm:text-lg text-slate-grey max-w-xl mb-8 leading-relaxed">
            Shree Prathishthan bridges the rich cultural legacy of Maharashtra with modern community welfare. Join us in translating devotion into active social transformation.
          </p>

          <div className="flex flex-wrap gap-4">
            <a 
              href="#volunteer"
              className="hero-cta-btn bg-saffron hover:bg-saffron/90 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-saffron/20 transition-all hover:scale-105 active:scale-95"
            >
              Join the Movement
            </a>
            <a 
              href="#about"
              className="hero-cta-btn bg-white/80 hover:bg-white text-foreground font-semibold px-8 py-3.5 rounded-full border border-border transition-all hover:scale-105 active:scale-95"
            >
              Discover Our Impact
            </a>
          </div>
        </div>

        {/* Right Column: Layered Visual Stack */}
        <div className="relative flex justify-center items-center lg:col-span-5 h-[350px] sm:h-[450px]">
          {/* Card 1: Ganeshotsav Portal Card */}
          <div className="hero-photo-layer absolute w-[70%] h-[70%] bg-amber-50 border border-gold/30 rounded-block overflow-hidden shadow-2xl rotate-[-4deg] translate-x-[-15%] translate-y-[-10%] flex flex-col justify-end p-4">
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-100 via-amber-50 to-orange-50" />
            
            {/* Visual vector abstraction of Ganesha */}
            <div className="w-full h-full flex items-center justify-center opacity-65 translate-y-[-10%]">
              <svg className="w-24 h-24 stroke-saffron fill-none" viewBox="0 0 24 24" strokeWidth="1">
                <path d="M12 2a4 4 0 0 0-4 4v2c0 2.5 1.5 4.5 4 5M12 2a4 4 0 0 1 4 4v2c0 2.5-1.5 4.5-4 5M12 13v7m-3 0h6m-6-3h6M7 8h10" />
              </svg>
            </div>
            
            <div className="relative z-20">
              <span className="text-[10px] text-saffron uppercase font-bold tracking-widest">Cultural Pageantry</span>
              <h3 className="text-lg font-bold text-amber-950 font-heading">Shree Ganeshotsav</h3>
            </div>
          </div>

          {/* Card 2: Welfare Portal Card */}
          <div className="hero-photo-layer absolute w-[70%] h-[70%] bg-emerald-50 border border-emerald-200 rounded-block overflow-hidden shadow-2xl rotate-[4deg] translate-x-[15%] translate-y-[10%] flex flex-col justify-end p-4">
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-100 via-emerald-50 to-teal-50" />
            
            {/* Visual vector abstraction of Hands / Community */}
            <div className="w-full h-full flex items-center justify-center opacity-60 translate-y-[-10%]">
              <svg className="w-24 h-24 stroke-emerald-600 fill-none" viewBox="0 0 24 24" strokeWidth="1">
                <path d="M12 14c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-3.3 0-10 1.7-10 5v1h20v-1c0-3.3-6.7-5-10-5z" />
              </svg>
            </div>
            
            <div className="relative z-20">
              <span className="text-[10px] text-emerald-700 uppercase font-bold tracking-widest">Social Work</span>
              <h3 className="text-lg font-bold text-emerald-950 font-heading">Community Medical Camps</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Saffron Scroll Arrow */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70 animate-bounce">
        <span className="text-[10px] text-saffron uppercase font-bold tracking-widest">Scroll</span>
        <svg className="w-5 h-5 stroke-saffron fill-none" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </div>
    </section>
  );
}
