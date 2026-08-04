"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

interface SlideItem {
  id: number;
  title: string;
  image: string;
}

const slidesData: SlideItem[] = [
  {
    id: 1,
    title: "Cultural Celebrations",
    image: "/volunteer_coordinator.png",
  },
  {
    id: 2,
    title: "Healthcare Campaigns",
    image: "/volunteer_medical.png",
  },
  {
    id: 3,
    title: "Ecological Initiatives",
    image: "/volunteer_eco.png",
  }
];

export default function EventsHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  const isAnimating = useRef(false);

  // SVG mask path step values for animation transition (matching 1400x800 coordinate scale)
  const steps = {
    step1: "M1402,800h-2V0h1c0.6,0,1,0.4,1,1V800z",
    step2: "M1400,800H379L771.2,0H1399c0.6,0,1,0.4,1,1V800z",
    step3: "M1400,800H0V0h1399c0.6,0,1,0.4,1,1V800z",
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".reveal-line",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.15, duration: 1.2 }
      ).fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNext = useCallback(() => {
    if (isAnimating.current || !pathRef.current) return;
    isAnimating.current = true;

    const nextIndex = (currentIndex + 1) % slidesData.length;

    // GSAP morph timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(nextIndex);
        // Reset the path back to step3 (full mask) immediately when slide index swaps
        if (pathRef.current) {
          gsap.set(pathRef.current, { attr: { d: steps.step3 } });
        }
        isAnimating.current = false;
      },
    });

    // Morph transition swipes out, index swaps on timeline complete
    tl.to(pathRef.current, {
      duration: 0.45,
      attr: { d: steps.step2 },
      ease: "power2.in",
    }).to(pathRef.current, {
      duration: 0.45,
      attr: { d: steps.step1 },
      ease: "power2.out",
    });
  }, [currentIndex, steps.step1, steps.step2, steps.step3]);

  // Automatic slide changing transition within 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex, handleNext]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex flex-col justify-start py-20 px-6 overflow-hidden md:px-12 bg-[#FBFBFA]"
    >
      {/* SVG Mask Definition (Scales responsive bounding box coordinate range 0-1) */}
      <svg className="absolute w-0 h-0" viewBox="0 0 1 1">
        <defs>
          <clipPath id="svg-mask" clipPathUnits="objectBoundingBox">
            <path
              ref={pathRef}
              d={steps.step3}
              transform="scale(0.00071428571, 0.00125)"
            />
          </clipPath>
        </defs>
      </svg>

      {/* Fullscreen Slider Backdrop Container */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#FBFBFA]">
        <div className="relative w-full h-full">
          {slidesData.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                style={{
                  clipPath: isActive ? "url(#svg-mask)" : "none",
                }}
              >
                {/* Campaign Visual backdrop (Fully Visible & Clear) */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover filter brightness-100"
                />

                {/* Subtle top-left light overlay to guarantee text legibility without washing out the image */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FBFBFA]/75 via-[#FBFBFA]/20 to-transparent z-10 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Overlaid Page Header (Z-20) */}
      <div className="max-w-[1600px] w-full mx-auto relative z-20 flex flex-col justify-start text-left pointer-events-none">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-neutral-900 leading-[1.05] tracking-tight mb-6 font-heading pointer-events-auto">
          <div className="overflow-hidden px-4 -mx-4 py-2 -my-2">
            <span className="block reveal-line">Festivals &</span>
          </div>
          <div className="overflow-hidden px-4 -mx-4 py-2 -my-2">
            <span className="block reveal-line text-saffron text-outline-festive">Social Campaigns.</span>
          </div>
        </h1>

        <p className="hero-subtitle text-base sm:text-lg text-neutral-800 max-w-2xl leading-relaxed font-medium pointer-events-auto [text-shadow:_0_1px_2px_rgba(255,255,255,0.7)]">
          Discover our upcoming celebrations, medical camps, and cleanup schedules. Align your time to participate or volunteer directly.
        </p>
      </div>
    </section>
  );
}
