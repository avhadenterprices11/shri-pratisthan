"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FESTIVAL_STAGES = [
  {
    id: "ganesh",
    title: "Ganeshotsav",
    video: "/festival_drums.mp4",
    color: "#E25822", // Saffron
  },
  {
    id: "dahihandi",
    title: "Dahi Handi",
    video: "/festival_celebration.mp4",
    color: "#D4AF37", // Gold
  },
  {
    id: "navratri",
    title: "Navratri Garba",
    video: "/Create_a_cinematic_second_h.mp4",
    color: "#FF007F", // Magenta/Pink
  },
  {
    id: "diwali",
    title: "Diwali Lights",
    video: "/about_showcase_video.mp4",
    color: "#FF9900", // Warm Amber
  },
  {
    id: "service",
    title: "Social Welfare",
    video: "/festival_celebration.mp4", // Re-use celebration loops
    color: "#00A86B", // Teal/Emerald
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !viewportRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial entrance animation
      gsap.fromTo(
        viewportRef.current,
        { clipPath: "inset(0 50% 0 50%)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0%)", opacity: 1, duration: 1.4, ease: "power3.inOut" }
      );

      // 2. ScrollTrigger timeline for pinning and cross-fading stages
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // 4 scrolls distance
          pin: true,
          scrub: 1, // Smooth scrub
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const time = progress * 5;
            let index = 0;
            if (time < 0.8) index = 0;
            else if (time < 1.8) index = 1;
            else if (time < 2.8) index = 2;
            else if (time < 3.8) index = 3;
            else index = 4;
            setActiveStageIndex(index);
          },
        },
      });

      // Animate background video opacity transitions
      // Slide 0 starts at opacity 1. Slides 1 to 4 start at opacity 0.
      tl.to(".hero-slide-0", { opacity: 0, ease: "power1.inOut", duration: 0.6 }, 0.7)
        .to(".hero-slide-1", { opacity: 1, ease: "power1.inOut", duration: 0.6 }, 0.7)
        .to(".hero-glow-0", { opacity: 0, ease: "power1.inOut", duration: 0.6 }, 0.7)
        .to(".hero-glow-1", { opacity: 1, ease: "power1.inOut", duration: 0.6 }, 0.7)
        
        .to(".hero-slide-1", { opacity: 0, ease: "power1.inOut", duration: 0.6 }, 1.7)
        .to(".hero-slide-2", { opacity: 1, ease: "power1.inOut", duration: 0.6 }, 1.7)
        .to(".hero-glow-1", { opacity: 0, ease: "power1.inOut", duration: 0.6 }, 1.7)
        .to(".hero-glow-2", { opacity: 1, ease: "power1.inOut", duration: 0.6 }, 1.7)

        .to(".hero-slide-2", { opacity: 0, ease: "power1.inOut", duration: 0.6 }, 2.7)
        .to(".hero-slide-3", { opacity: 1, ease: "power1.inOut", duration: 0.6 }, 2.7)
        .to(".hero-glow-2", { opacity: 0, ease: "power1.inOut", duration: 0.6 }, 2.7)
        .to(".hero-glow-3", { opacity: 1, ease: "power1.inOut", duration: 0.6 }, 2.7)

        .to(".hero-slide-3", { opacity: 0, ease: "power1.inOut", duration: 0.6 }, 3.7)
        .to(".hero-slide-4", { opacity: 1, ease: "power1.inOut", duration: 0.6 }, 3.7)
        .to(".hero-glow-3", { opacity: 0, ease: "power1.inOut", duration: 0.6 }, 3.7)
        .to(".hero-glow-4", { opacity: 1, ease: "power1.inOut", duration: 0.6 }, 3.7);

      // Animate text layers transitions
      // Text 0 starts at opacity 1, y: 0. Others start at opacity 0, y: 30.
      tl.to(".hero-text-0", { opacity: 0, y: -40, ease: "power2.inOut", duration: 0.5 }, 0.7)
        .fromTo(".hero-text-1", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "power2.inOut", duration: 0.5 }, 0.8)

        .to(".hero-text-1", { opacity: 0, y: -40, ease: "power2.inOut", duration: 0.5 }, 1.7)
        .fromTo(".hero-text-2", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "power2.inOut", duration: 0.5 }, 1.8)

        .to(".hero-text-2", { opacity: 0, y: -40, ease: "power2.inOut", duration: 0.5 }, 2.7)
        .fromTo(".hero-text-3", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "power2.inOut", duration: 0.5 }, 2.8)

        .to(".hero-text-3", { opacity: 0, y: -40, ease: "power2.inOut", duration: 0.5 }, 3.7)
        .fromTo(".hero-text-4", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "power2.inOut", duration: 0.5 }, 3.8);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Play/pause videos based on the active index
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === activeStageIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeStageIndex]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[500vh] bg-[#0b0b0c] select-none"
    >
      <div
        ref={viewportRef}
        style={{ clipPath: "inset(0 50% 0 50%)" }}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* Background Visual Layers (Videos) */}
        <div className="absolute inset-0 z-0 bg-black">
          {FESTIVAL_STAGES.map((stage, idx) => (
            <div
              key={stage.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out hero-slide-${idx} overflow-hidden`}
              style={{ opacity: idx === 0 ? 1 : 0 }}
            >
              <video
                ref={(el) => {
                  videoRefs.current[idx] = el;
                }}
                src={stage.video}
                loop
                muted
                playsInline
                autoPlay={idx === 0}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Ambient Glows Layer */}
        <div className="absolute inset-0 z-1 pointer-events-none opacity-60">
          {FESTIVAL_STAGES.map((stage, idx) => (
            <div
              key={stage.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out hero-glow-${idx}`}
              style={{
                opacity: idx === 0 ? 1 : 0,
                background: `radial-gradient(circle at 50% 50%, ${stage.color}40 0%, rgba(11, 11, 12, 0) 75%)`,
              }}
            />
          ))}
        </div>

        {/* Lighting and Gradient Overlays for High-Contrast Readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0b0b0c]/80 via-transparent to-[#0b0b0c]/90 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-black/35 pointer-events-none" />

        {/* Main Content Layout Overlay */}
        <div className="absolute inset-0 z-20 px-6 md:px-12 md:pl-20 pointer-events-none h-full w-full">
          <div className="max-w-[1400px] mx-auto w-full h-full flex flex-col justify-between pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-12 relative">
            
            {/* Top Heading: left-aligned */}
            <div className="text-left w-full">
              <h1 className="text-[44px] sm:text-[72px] lg:text-[96px] font-black text-white/95 leading-none tracking-tighter uppercase font-heading">
                Celebrating
              </h1>
            </div>

            {/* Center Heading: Dynamic transitioning stage title (left-aligned) */}
            <div className="relative flex-grow flex items-center justify-start w-full">
              {FESTIVAL_STAGES.map((stage, idx) => (
                <h1
                  key={stage.id}
                  className={`hero-text-${idx} absolute left-0 text-left text-[44px] sm:text-[72px] md:text-[96px] lg:text-[112px] font-black leading-none tracking-tighter uppercase font-heading select-none filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] ${
                    idx === 0 ? "opacity-100" : "opacity-0 translate-y-[30px]"
                  }`}
                  style={{ color: stage.color }}
                >
                  {stage.title}
                </h1>
              ))}
            </div>

            {/* Bottom Heading: right-aligned */}
            <div className="text-right flex justify-end w-full">
              <h1 className="text-[44px] sm:text-[72px] lg:text-[96px] font-black text-saffron leading-none tracking-tighter uppercase font-heading">
                Together.
              </h1>
            </div>

          </div>
        </div>

        {/* Sticky Saffron Volunteer Tab on the right side of the screen */}
        <div
          onClick={() => {
            const el = document.getElementById("volunteer");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="fixed right-0 top-1/2 -translate-y-1/2 bg-saffron text-white border-l border-y border-saffron/20 py-4 px-2.5 rounded-l-md font-bold uppercase text-[9px] tracking-widest [writing-mode:vertical-lr] cursor-pointer hover:bg-saffron/90 hover:text-white transition-all duration-300 shadow-lg z-50 hover:pl-3.5 select-none"
        >
          Become a Volunteer
        </div>
      </div>
    </section>
  );
}
