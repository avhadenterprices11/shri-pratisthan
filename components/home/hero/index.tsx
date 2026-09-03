"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const irisCardRef = useRef<HTMLDivElement>(null);
  const topRibbonRef = useRef<HTMLDivElement>(null);
  const bottomRibbonRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const SLIDES = [
    {
      id: "ganesh-utsav",
      title: t("hero.slide1.title"),
      description: t("hero.slide1.description"),
      image: "/images/ganesh-utsav.jpg",
      label: t("hero.slide1.label"),
      eventUrl: "/events/ganesh-utsav-2026",
    },
    {
      id: "swagat-yatra",
      title: t("hero.slide2.title"),
      description: t("hero.slide2.description"),
      image: "/images/swagat-yatra.jpg",
      label: t("hero.slide2.label"),
      eventUrl: "/events/gudipadwa-swagat-yatra-2026",
    },
    {
      id: "dahi-handi",
      title: t("hero.slide3.title"),
      description: t("hero.slide3.description"),
      image: "/images/dahihandi-utsav.jpg",
      label: t("hero.slide3.label"),
      eventUrl: "/events",
    },
    {
      id: "maha-shivratri",
      title: t("hero.slide4.title"),
      description: t("hero.slide4.description"),
      image: "/images/mahashivratri.jpg",
      label: t("hero.slide4.label"),
      eventUrl: "/events",
    },
  ];

  useEffect(() => {
    if (!containerRef.current || !irisCardRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const scrollDistance = isMobile ? 2400 : 3400;

      // 1. Preloader Typographic Portal Zoom Entrance
      const entryTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set(".portal-text", { scale: 0.85, opacity: 0 });

      entryTl
        .fromTo(
          containerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 }
        )
        .to(".portal-text", { scale: 1, opacity: 1, duration: 0.7 })
        .to({}, { duration: 0.25 })
        .to(".portal-text", {
          scale: 18,
          opacity: 0,
          duration: 1.1,
          ease: "power3.in",
        }, "+=0.1")
        .to(".portal-intro", {
          opacity: 0,
          duration: 0.7,
          ease: "power2.inOut",
        }, "-=0.85")
        .set(".portal-intro", { display: "none" });

      // 2. Master Scroll-Driven Timeline (strictly paused; expands ONLY on scroll)
      const masterTl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.1, // Silky soft inertia scrub
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      masterTl.progress(0);

      // ── STEP 1: Card Expands from Center to Full-Bleed Canvas & Ribbons Glide Out (Progress 0.0 -> 0.35) ──
      masterTl
        // Top solid ribbon glides left & floats upward
        .to(topRibbonRef.current, {
          x: isMobile ? "-35vw" : "-50vw",
          y: "-90px",
          opacity: 0.2,
          ease: "none",
          duration: 1.2,
        }, 0)
        // Bottom outline ribbon glides right & floats downward
        .to(bottomRibbonRef.current, {
          x: isMobile ? "35vw" : "50vw",
          y: "90px",
          opacity: 0.2,
          ease: "none",
          duration: 1.2,
        }, 0)
        // Central Card smoothly expands into 100vw × 100vh full-bleed canvas
        .to(irisCardRef.current, {
          width: "100vw",
          height: "100vh",
          maxWidth: "100vw",
          maxHeight: "100vh",
          borderRadius: "0px",
          borderWidth: "0px",
          boxShadow: "none",
          ease: "power2.inOut",
          duration: 1.2,
        }, 0)
        // Fade out scroll prompt
        .to(".scroll-indicator-hint", {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.out",
        }, 0)
        // Resting Cushion: Full-bleed view of Slide 0 is enjoyed
        .to({}, { duration: 0.6 });

      // ── STEP 2: 3D Z-Axis Spatial Fly-Through Runway (Progress 0.35 -> 1.0) ──
      // Slide 0 -> Slide 1 Fly-Through
      masterTl
        .to(".fly-slide-0", {
          z: 500,
          scale: 1.4,
          opacity: 0,
          filter: "blur(10px)",
          ease: "power2.in",
          duration: 1,
        }, 1.8)
        .fromTo(".fly-slide-1", 
          { z: -800, scale: 0.65, opacity: 0, filter: "blur(8px)" },
          { z: 0, scale: 1, opacity: 1, filter: "blur(0px)", ease: "power2.out", duration: 1 },
          2.0
        )
        // Cushion for Slide 1
        .to({}, { duration: 0.5 });

      // Slide 1 -> Slide 2 Fly-Through
      masterTl
        .to(".fly-slide-1", {
          z: 500,
          scale: 1.4,
          opacity: 0,
          filter: "blur(10px)",
          ease: "power2.in",
          duration: 1,
        }, 3.5)
        .fromTo(".fly-slide-2", 
          { z: -800, scale: 0.65, opacity: 0, filter: "blur(8px)" },
          { z: 0, scale: 1, opacity: 1, filter: "blur(0px)", ease: "power2.out", duration: 1 },
          3.7
        )
        // Cushion for Slide 2
        .to({}, { duration: 0.5 });

      // Slide 2 -> Slide 3 Fly-Through
      masterTl
        .to(".fly-slide-2", {
          z: 500,
          scale: 1.4,
          opacity: 0,
          filter: "blur(10px)",
          ease: "power2.in",
          duration: 1,
        }, 5.2)
        .fromTo(".fly-slide-3", 
          { z: -800, scale: 0.65, opacity: 0, filter: "blur(8px)" },
          { z: 0, scale: 1, opacity: 1, filter: "blur(0px)", ease: "power2.out", duration: 1 },
          5.4
        );

    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#090909] text-white overflow-hidden select-none"
    >
      {/* ── Typographic Portal Zoom Preloader Overlay ── */}
      <div className="absolute inset-0 z-[60] bg-saffron flex flex-col items-center justify-center text-center portal-intro pointer-events-none px-4">
        <h2 className="portal-text text-3xl sm:text-5xl md:text-[6.5vw] font-normal text-white select-none uppercase font-heading leading-tight sm:leading-snug tracking-normal text-center whitespace-pre-line py-2">
          {t("hero.portalText")}
        </h2>
      </div>

      {/* ── Background Subtle Ambient Particles & Aura ── */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-saffron/15 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* ── Top Bar Metadata Pill ── */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-10 z-30 flex items-center gap-3 pointer-events-none">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-saffron-light">
          <Sparkles className="w-3.5 h-3.5 text-saffron" />
          {t("hero.eyebrow")}
        </span>
      </div>

      {/* ── Top Counter-Scrolling Solid Typography Ribbon ── */}
      <div
        ref={topRibbonRef}
        className="absolute top-[8vh] sm:top-[12vh] left-[5vw] w-max whitespace-nowrap text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-heading font-black text-white/80 uppercase tracking-tight pointer-events-none will-change-transform z-10 select-none"
      >
        ॥ संस्कृती • अखंड परंपरा • अविरत जनसेवा • १९+ वर्षांचा वारसा ॥
      </div>

      {/* ── Bottom Counter-Scrolling Hollow Outline Typography Ribbon ── */}
      <div
        ref={bottomRibbonRef}
        className="absolute bottom-[8vh] sm:bottom-[12vh] left-[-30vw] w-max whitespace-nowrap text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-heading font-black text-outline uppercase tracking-tight pointer-events-none will-change-transform z-10 select-none"
      >
        ॥ श्री प्रतिष्ठान • इंदिरा नगर, नाशिक • भव्य सांस्कृतिक उत्सव ॥
      </div>

      {/* ── The Centerpiece Card (OPEN & Visible by Default) ── */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div
          ref={irisCardRef}
          style={{ perspective: "1400px" }}
          className="relative w-[90vw] max-w-[540px] h-[350px] sm:h-[430px] rounded-3xl overflow-hidden border border-saffron/35 shadow-[0_20px_60px_-15px_rgba(255,119,0,0.35)] bg-neutral-950 will-change-transform transform-gpu flex items-center justify-center pointer-events-auto"
        >
          {/* 3D Spatial Fly-Through Slides */}
          {SLIDES.map((slide, idx) => {
            const isInitial = idx === 0;

            return (
              <div
                key={slide.id}
                className={`fly-slide-${idx} absolute inset-0 w-full h-full flex flex-col justify-center items-start p-6 sm:p-12 md:p-16 will-change-transform transform-gpu ${
                  isInitial ? "opacity-100 scale-100 z-10" : "opacity-0 scale-75 z-0 pointer-events-none"
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* 4K Background Image */}
                <Image
                  src={slide.image}
                  alt={slide.label}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center brightness-[0.7] contrast-[1.1] scale-105"
                  sizes="100vw"
                />

                {/* Dark Cinematic Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/25 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Ambient Saffron Corner Glow */}
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-saffron/25 blur-3xl rounded-full pointer-events-none" />

                {/* Slide Main Typography & Content - Left Center Adjusted Down */}
                <div className="relative z-20 max-w-3xl space-y-3 sm:space-y-4 text-left translate-y-2 sm:translate-y-5">
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-white font-heading leading-[1.12] tracking-normal uppercase whitespace-pre-line drop-shadow-lg">
                    {slide.title}
                  </h1>

                  <p className="text-xs sm:text-base md:text-lg text-neutral-300 font-normal font-sans max-w-xl leading-relaxed italic border-l-2 border-saffron pl-3 sm:pl-4 py-1 line-clamp-2 sm:line-clamp-none">
                    "{slide.description}"
                  </p>

                  {/* Interactive CTAs */}
                  <div className="pt-2 flex items-center gap-3 sm:gap-4 flex-wrap">
                    <Link
                      href={slide.eventUrl}
                      className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-saffron hover:bg-saffron-deep text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-saffron/30 transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <span>{slide.label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href="/volunteer"
                      className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <span>{t("common.volunteer")}</span>
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* ── Scroll Indicator Prompt (Fades as you scroll) ── */}
      <div className="scroll-indicator-hint absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none text-center">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/70">
          {t("hero.scrollExplore")}
        </span>
        <ChevronDown className="w-4 h-4 text-saffron animate-bounce" />
      </div>

    </section>
  );
}
