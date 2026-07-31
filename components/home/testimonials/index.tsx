"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TestimonialItem {
  id: string | number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

interface TestimonialsCardProps {
  items: TestimonialItem[];
  className?: string;
  width?: number;
  showNavigation?: boolean;
  showCounter?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 1,
    title: "Rajesh Kulkarni",
    subtitle: "Local Administration Coordinator",
    description: "Shree Prathishthan's Ganeshotsav sets the benchmark for cultural heritage preservation. Their volunteers worked hand-in-hand with our logistics team to ensure flawless safety standards.",
    image: "/portrait_admin.png",
  },
  {
    id: 2,
    title: "Sunita Deshmukh",
    subtitle: "Community Supporter",
    description: "Partnering with Shree Prathishthan to organize our local Ganeshotsav decorations has been an absolute joy. Their energy and devotion towards preserving Maharashtra's true art is inspiring.",
    image: "/portrait_csr.png",
  },
  {
    id: 3,
    title: "Amit Shinde",
    subtitle: "Dhol Tasha Player",
    description: "Registering as a volunteer took less than a minute. Since joining, I've played in 15 street performances and practice sessions. It is the best group of friends to learn folk instruments and celebrate festivals.",
    image: "/portrait_volunteer.png",
  },
];

export function TestimonialsCard({
  items,
  className,
  width = 720,
  showNavigation = true,
  showCounter = true,
  autoPlay = false,
  autoPlayInterval = 3000,
}: TestimonialsCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const activeItem = items[activeIndex];

  // Auto-play effect
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length]);

  const handleNext = () => {
    if (activeIndex < items.length - 1) {
      setDirection(1);
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex(activeIndex - 1);
    }
  };

  // Pre-calculate rotations for visual variety
  const rotations = useMemo(() => [4, -2, -9, 7], []);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex items-center justify-center p-4 sm:p-8", className)}>
      <div
        className="relative grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 w-full items-center"
        style={{ perspective: "1400px", maxWidth: `${width}px` }}
      >
        {/* Counter */}
        {showCounter && (
          <div className="absolute right-4 top-0 font-mono text-xs font-bold uppercase tracking-wider text-slate-grey">
            {activeIndex + 1} / {items.length}
          </div>
        )}

        {/* Image Card Stack */}
        <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[380px] lg:max-w-[440px] mx-auto md:mx-0">
          <AnimatePresence custom={direction}>
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              const offset = index - activeIndex;

              // Only render adjacent cards to keep stack depth lightweight
              if (Math.abs(offset) > 2) return null;

              return (
                <motion.div
                  key={item.id}
                  className="absolute inset-0 w-full h-full overflow-hidden border-[6px] bg-slate-100 border-white shadow-2xl rounded-block border-saffron/10"
                  initial={{
                    x: offset * 12,
                    y: Math.abs(offset) * 6,
                    z: -120 * Math.abs(offset),
                    scale: 0.88 - Math.abs(offset) * 0.04,
                    rotateZ: rotations[index % 4],
                    opacity: isActive ? 1 : 0.4,
                    zIndex: 10 - Math.abs(offset),
                  }}
                  animate={
                    isActive
                      ? {
                          x: [offset * 12, direction === 1 ? -240 : 240, 0],
                          y: [Math.abs(offset) * 6, 0, 0],
                          z: [-150, 100, 200],
                          scale: [0.88, 1.04, 1],
                          rotateZ: [rotations[index % 4], -4, 0],
                          opacity: 1,
                          zIndex: 100,
                        }
                      : {
                          x: offset * 12,
                          y: Math.abs(offset) * 6,
                          z: -120 * Math.abs(offset),
                          rotateZ: rotations[index % 4],
                          scale: 0.88 - Math.abs(offset) * 0.04,
                          opacity: 0.5,
                          zIndex: 10 - Math.abs(offset),
                        }
                  }
                  exit={{
                    x: direction === 1 ? -300 : 300,
                    z: -200,
                    scale: 0.8,
                    rotateZ: direction === 1 ? -8 : 8,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover select-none"
                    draggable={false}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Text Area */}
        <div className="flex flex-col justify-center min-h-[160px] text-center md:text-left pr-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xs font-bold text-saffron uppercase tracking-widest block mb-1">
                {activeItem.subtitle}
              </span>
              <h3 className="text-2xl font-extrabold text-foreground font-heading">
                {activeItem.title}
              </h3>
              <div className="w-8 h-0.5 bg-gold my-3 rounded-full mx-auto md:mx-0" />
              <p className="text-sm sm:text-base text-slate-grey leading-relaxed italic font-serif">
                “{activeItem.description}”
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {showNavigation && items.length > 1 && (
            <div className="flex gap-3 mt-6 justify-center md:justify-start">
              <button
                disabled={activeIndex === 0}
                onClick={handlePrev}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border border-saffron/10 bg-white shadow-md text-foreground transition-all hover:scale-105 active:scale-95",
                  activeIndex === 0
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-saffron/5 hover:text-saffron hover:border-saffron/30"
                )}
                aria-label="Previous card"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                disabled={activeIndex === items.length - 1}
                onClick={handleNext}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border border-saffron/10 bg-white shadow-md text-foreground transition-all hover:scale-105 active:scale-95",
                  activeIndex === items.length - 1
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-saffron/5 hover:text-saffron hover:border-saffron/30"
                )}
                aria-label="Next card"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonials-viewport",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-white z-20 border-t border-saffron/5"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40" />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Community Voice</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Patron & Volunteer Testimonial
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        {/* stack container */}
        <div className="testimonials-viewport w-full flex justify-center">
          <TestimonialsCard items={TESTIMONIALS_DATA} width={1140} autoPlay={true} autoPlayInterval={2000} showNavigation={false} />
        </div>
      </div>
    </section>
  );
}
