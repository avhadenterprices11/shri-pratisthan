"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, type Transition } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    year: "2018",
    title: "Group Foundation",
    description: "Shree Prathishthan is formed by a group of close friends in Pune to coordinate local Ganeshotsav decorations and crowd safety.",
    tag: "Foundation",
    image: "/about_showcase.png",
  },
  {
    year: "2020",
    title: "Naad Pathak Founded",
    description: "Established our traditional musical troupe to preserve folk instruments, starting with 20 passionate drumming members.",
    tag: "Dhol Tasha",
    image: "/volunteer_musician.png",
  },
  {
    year: "2022",
    title: "Govinda Team Creation",
    description: "Formed our formal Dahi Handi Govinda team, training regional youth in athletic formations and safety harness usage.",
    tag: "Dahi Handi",
    image: "/volunteer_safety.png",
  },
  {
    year: "2025",
    title: "Mahotsav Expansion",
    description: "Expanded regional collaborations to organize Navratri Dandiya events, Shiv Jayanti street rallies, and local sports tournaments.",
    tag: "Utsav Expansion",
    image: "/volunteer_coordinator.png",
  },
];

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  bounce: 0.12,
  duration: 0.8,
};

export default function FestivalJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideSize, setSlideSize] = useState(440);

  // Monitor viewport size to adjust slide size dynamically
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setSlideSize(440);
      } else {
        setSlideSize(310);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the section in the viewport while scrolling through the cards
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=1200", // Scroll depth of the pin
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          let index = 0;
          if (progress < 0.22) {
            index = 0;
          } else if (progress < 0.44) {
            index = 1;
          } else if (progress < 0.66) {
            index = 2;
          } else {
            index = 3; // Keep active for final 34% scroll buffer
          }
          setActiveIndex(index);
        },
      });
    }, containerRef);

    // Recalculate offsets after client-side layout completes rendering
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
      className="relative w-full h-screen bg-white overflow-hidden flex flex-col justify-between py-12 border-y border-saffron/10 select-none"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40" />
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none translate-y-12 opacity-30" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto px-6 mt-4 relative z-20">
        <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-2">Our History</span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
          The Journey of Shree Prathishthan
        </h2>
        <div className="w-16 h-1 bg-saffron mx-auto mt-3 rounded-full" />
      </div>

      {/* Diagonal Cascade Carousel Viewport */}
      <div className="relative flex-grow flex items-center justify-center w-full overflow-hidden select-none">
        <motion.div
          className="absolute left-[50%] top-[45%] sm:top-[43%] flex w-fit -translate-y-1/2"
          animate={{ x: -(activeIndex * slideSize + slideSize / 2) }}
          transition={DEFAULT_TRANSITION}
        >
          {MILESTONES.map((item, index) => {
            const isActive = activeIndex === index;
            const distance = index - activeIndex;

            return (
              <motion.div
                key={item.year}
                className="flex shrink-0 flex-col items-center justify-center gap-4 will-change-transform px-4"
                style={{ width: slideSize }}
                animate={{
                  rotate: distance * 16,
                  scale: isActive ? 1 : 0.72,
                  y: distance * 60,
                  opacity: isActive ? 1 : 0.35,
                }}
                transition={DEFAULT_TRANSITION}
              >
                {/* Milestone Detail Card */}
                <div
                  className={cn(
                    "group w-full h-[340px] sm:h-[320px] rounded-block overflow-hidden flex flex-col justify-between border bg-[#121214] shadow-2xl transition-all duration-500 relative",
                    isActive 
                      ? "border-saffron/25 shadow-saffron/10" 
                      : "border-slate-800/60 shadow-slate-900 opacity-90"
                  )}
                >
                  {/* Full-bleed Background Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 440px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Overlay for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/55 to-black/25 z-10 transition-all duration-500 group-hover:via-charcoal/60 group-hover:to-black/35" />

                  {/* Header: Year & Category Tag */}
                  <div className="relative z-20 flex justify-between items-center p-6 sm:p-7">
                    <span className="text-2xl sm:text-3xl font-extrabold text-saffron font-heading drop-shadow-sm">
                      {item.year}
                    </span>
                    <span className="text-[9px] font-extrabold text-white uppercase tracking-widest bg-saffron border border-saffron/20 px-2.5 py-1 rounded shadow-md">
                      {item.tag}
                    </span>
                  </div>

                  {/* Body: Title & Content */}
                  <div className="relative z-20 p-6 sm:p-7 text-left space-y-2 mt-auto">
                    <h3 className="text-lg sm:text-xl font-extrabold text-white font-heading">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-200 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Footer Navigation Progress Indicator */}
      <div className="text-center relative z-20 mb-4 flex flex-col items-center justify-center gap-1 opacity-70">
        <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-grey">
          {activeIndex === 3 ? "Keep scrolling to continue ↓" : "Scroll to explore timeline ↓"}
        </span>
        <div className="flex gap-2.5 mt-2">
          {MILESTONES.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "h-1.5 rounded-full bg-saffron transition-all duration-300",
                activeIndex === idx ? "w-6 opacity-100" : "w-1.5 opacity-25"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
