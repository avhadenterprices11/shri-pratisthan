"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

// Register ScrollTrigger client-side
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useLanguage();

  const SLIDES = [
    {
      title: t("hero.slide1.title"),
      description: t("hero.slide1.description"),
      image: "/images/ganesh-utsav.jpg",
      label: t("hero.slide1.label"),
    },
    {
      title: t("hero.slide2.title"),
      description: t("hero.slide2.description"),
      image: "/images/swagat-yatra.jpg",
      label: t("hero.slide2.label"),
    },
    {
      title: t("hero.slide3.title"),
      description: t("hero.slide3.description"),
      image: "/images/dahihandi-utsav.jpg",
      label: t("hero.slide3.label"),
    },
    {
      title: t("hero.slide4.title"),
      description: t("hero.slide4.description"),
      image: "/images/mahashivratri.jpg",
      label: t("hero.slide4.label"),
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 1. Set initial states of slides
      const slides = gsap.utils.toArray<HTMLElement>(".slide-container");
      const slideBgs = gsap.utils.toArray<HTMLElement>(".slide-bg");
      const slideContents = gsap.utils.toArray<HTMLElement>(".slide-content");

      gsap.set(slides.slice(1), { opacity: 0, pointerEvents: "none" });
      gsap.set(slideBgs.slice(1), { scale: 1.15 });

      // 2. Build ScrollTrigger timeline with resting buffers
      mm.add("(min-width: 768px)", () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=1800",
            pin: true,
            scrub: 1,
            snap: {
              snapTo: [0, 2.5 / 7, 4.5 / 7, 1.0],
              duration: { min: 0.2, max: 0.5 },
              delay: 0.05,
              ease: "power2.inOut",
            },
            onUpdate: (self) => {
              const progress = self.progress;
              const time = progress * 7;
              let index = 0;
              if (time < 1.5) index = 0;
              else if (time < 3.5) index = 1;
              else if (time < 5.5) index = 2;
              else index = 3;
              setActiveIndex(index);
            },
          },
        })
          // Transitions between slides
          .fromTo(slides[0], { opacity: 1, pointerEvents: "auto" }, { opacity: 0, pointerEvents: "none", duration: 1 }, 1)
          .fromTo(slideBgs[0], { scale: 1 }, { scale: 0.95, duration: 1 }, 1)
          .fromTo(slides[1], { opacity: 0, pointerEvents: "none" }, { opacity: 1, pointerEvents: "auto", duration: 1 }, 1)
          .fromTo(slideBgs[1], { scale: 1.15 }, { scale: 1, duration: 1 }, 1)
          .fromTo(slideContents[0], { y: 0, opacity: 1 }, { y: -50, opacity: 0, duration: 0.8 }, 1)
          .fromTo(slideContents[1], { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1.2)

          .fromTo(slides[1], { opacity: 1, pointerEvents: "auto" }, { opacity: 0, pointerEvents: "none", duration: 1 }, 3)
          .fromTo(slideBgs[1], { scale: 1 }, { scale: 0.95, duration: 1 }, 3)
          .fromTo(slides[2], { opacity: 0, pointerEvents: "none" }, { opacity: 1, pointerEvents: "auto", duration: 1 }, 3)
          .fromTo(slideBgs[2], { scale: 1.15 }, { scale: 1, duration: 1 }, 3)
          .fromTo(slideContents[1], { y: 0, opacity: 1 }, { y: -50, opacity: 0, duration: 0.8 }, 3)
          .fromTo(slideContents[2], { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 3.2)

          .fromTo(slides[2], { opacity: 1, pointerEvents: "auto" }, { opacity: 0, pointerEvents: "none", duration: 1 }, 5)
          .fromTo(slideBgs[2], { scale: 1 }, { scale: 0.95, duration: 1 }, 5)
          .fromTo(slides[3], { opacity: 0, pointerEvents: "none" }, { opacity: 1, pointerEvents: "auto", duration: 1 }, 5)
          .fromTo(slideBgs[3], { scale: 1.15 }, { scale: 1, duration: 1 }, 5)
          .fromTo(slideContents[2], { y: 0, opacity: 1 }, { y: -50, opacity: 0, duration: 0.8 }, 5)
          .fromTo(slideContents[3], { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 5.2);
      });

      // Mobile Optimized Timeline (shorter scroll depth, effortless touch scrolling)
      mm.add("(max-width: 767px)", () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=1000",
            pin: true,
            scrub: 0.8,
            onUpdate: (self) => {
              const progress = self.progress;
              const time = progress * 7;
              let index = 0;
              if (time < 1.5) index = 0;
              else if (time < 3.5) index = 1;
              else if (time < 5.5) index = 2;
              else index = 3;
              setActiveIndex(index);
            },
          },
        })
          .fromTo(slides[0], { opacity: 1, pointerEvents: "auto" }, { opacity: 0, pointerEvents: "none", duration: 1 }, 1)
          .fromTo(slides[1], { opacity: 0, pointerEvents: "none" }, { opacity: 1, pointerEvents: "auto", duration: 1 }, 1)
          .fromTo(slideContents[0], { y: 0, opacity: 1 }, { y: -30, opacity: 0, duration: 0.8 }, 1)
          .fromTo(slideContents[1], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1.2)

          .fromTo(slides[1], { opacity: 1, pointerEvents: "auto" }, { opacity: 0, pointerEvents: "none", duration: 1 }, 3)
          .fromTo(slides[2], { opacity: 0, pointerEvents: "none" }, { opacity: 1, pointerEvents: "auto", duration: 1 }, 3)
          .fromTo(slideContents[1], { y: 0, opacity: 1 }, { y: -30, opacity: 0, duration: 0.8 }, 3)
          .fromTo(slideContents[2], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 3.2)

          .fromTo(slides[2], { opacity: 1, pointerEvents: "auto" }, { opacity: 0, pointerEvents: "none", duration: 1 }, 5)
          .fromTo(slides[3], { opacity: 0, pointerEvents: "none" }, { opacity: 1, pointerEvents: "auto", duration: 1 }, 5)
          .fromTo(slideContents[2], { y: 0, opacity: 1 }, { y: -30, opacity: 0, duration: 0.8 }, 5)
          .fromTo(slideContents[3], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 5.2);
      });

      // 3. Entrance Intro Animation on Mount
      const entryTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set(".portal-text", { scale: 0.85, opacity: 0 });

      entryTl
        .fromTo(
          containerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 }
        )
        .to(".portal-text", { scale: 1, opacity: 1, duration: 0.8 })
        .to({}, { duration: 0.2 })
        .to(".portal-text", {
          scale: 18,
          opacity: 0,
          duration: 1.2,
          ease: "power3.in"
        }, "+=0.1")
        .to(".portal-intro", {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut"
        }, "-=1.0")
        .fromTo(
          ".slide-bg-0",
          { scale: 1.15, filter: "blur(4px)" },
          { scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.out" },
          "-=1.0"
        )
        .set(".portal-intro", { display: "none" })
        .fromTo(
          ".slide-content-0",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        );
    }, containerRef);

    // Refresh ScrollTrigger to ensure correct measurements
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-obsidian-deep overflow-hidden flex flex-col justify-between select-none opacity-0"
    >
      {/* Typographic Portal Reveal Overlay */}
      <div className="absolute inset-0 z-[60] bg-saffron flex flex-col items-center justify-center text-center portal-intro pointer-events-none px-4">
        <h2 className="portal-text text-3xl sm:text-5xl md:text-[7vw] font-normal text-white select-none uppercase font-heading leading-[0.9] tracking-tight text-center whitespace-pre-line">
          {t("hero.portalText")}
        </h2>
      </div>

      {/* Background Slides */}
      <div className="absolute inset-0 w-full h-full z-0">
        {SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={cn(
              "absolute inset-0 w-full h-full slide-container",
              idx === 0 ? "slide-0" : ""
            )}
          >
            {/* Slide Background Image */}
            <div
              className={cn(
                "absolute inset-0 w-full h-full slide-bg",
                idx === 0 ? "slide-bg-0" : ""
              )}
            >
              <Image
                src={slide.image}
                alt={slide.label}
                fill
                priority={idx === 0}
                className="object-cover object-center animate-pulse-slow opacity-90"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-obsidian-deep/50 to-obsidian-deep/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-obsidian-deep/90 via-obsidian-deep/30 to-transparent" />
            </div>

            {/* Ambient glows inside active slide */}
            <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-15" />
            <div className="absolute inset-0 ambient-gold-glow pointer-events-none translate-y-40 opacity-10" />
          </div>
        ))}
      </div>

      {/* Main Slide Content Area */}
      <div className="relative z-20 flex-grow w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col justify-center text-left">
        <div className="max-w-4xl relative w-full h-[55vh] sm:h-[60vh] flex items-center">
          {SLIDES.map((slide, idx) => (
            <div
              key={idx}
              className={cn(
                "absolute left-0 w-full flex flex-col items-start gap-4 pointer-events-none",
                activeIndex === idx ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-10"
              )}
            >
              <div className={cn(
                "slide-content flex flex-col items-start gap-2.5 sm:gap-4 md:gap-5",
                idx === 0 ? "slide-content-0" : ""
              )}>
                {/* Big Bold Title */}
                <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[7.5rem] font-normal text-white font-heading leading-[0.94] tracking-tight uppercase whitespace-pre-line">
                  {slide.title}
                </h1>

                {/* Story Quote */}
                <p className="text-sm sm:text-lg md:text-2xl text-pebble font-normal font-sans max-w-2xl leading-relaxed italic border-l-2 border-saffron/50 pl-3 sm:pl-4 py-1 line-clamp-3 sm:line-clamp-none">
                  "{slide.description}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
