"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    title: "Transparency (Satya)",
    desc: "We publish detailed annual audit summaries and visual metrics tracking 100% of public donations directly to active rural beneficiaries.",
    image: "/images/social-work.jpg",
  },
  {
    title: "Service (Seva)",
    desc: "Dedicated to continuous social support campaigns. Our volunteers organize medical checks, educational toolkits, and deforested hill tree planting.",
    image: "/images/dahi-handi.jpg",
  },
  {
    title: "Integrity (Nishtha)",
    desc: "Operating fully independent of political networks, focusing strictly on cultural integrity and non-discriminatory humanitarian relief.",
    image: "/images/ganesh.jpg",
  },
  {
    title: "Unity (Ekta)",
    desc: "Structuring festivals safely to promote community integration, bridging municipal resources with remote village assistance needs.",
    image: "/images/social-work.jpg",
  },
];

export default function AboutValues() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Scroll Entrance Reveals for list items
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".value-row-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Cursor follow physics and scroll-hide safety (Desktop only)
  useEffect(() => {
    const floatingEl = document.querySelector(".floating-preview");
    if (!floatingEl) return;

    const setX = gsap.quickSetter(floatingEl, "x", "px");
    const setY = gsap.quickSetter(floatingEl, "y", "px");

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half of card width/height to center on cursor
      setX(e.clientX - 110);
      setY(e.clientY - 75);
    };

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      setHoveredIdx(null);
      gsap.to(floatingEl, { scale: 0.75, opacity: 0, duration: 0.15, overwrite: "auto" });

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150); // Re-enable pointer events 150ms after scroll stops
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#FFFDF9] py-24 px-6 md:px-12 xl:px-24 select-none border-t border-saffron/10 z-20 overflow-hidden"
    >
      {/* Background Grid Accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 106, 54, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 106, 54, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px"
        }}
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-saffron/15 mb-16 relative z-10">
        <div className="flex flex-col items-start gap-3">
          <span className="text-[10px] uppercase font-black tracking-widest text-saffron">Our Philosophy</span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-800 font-heading uppercase leading-none">
            Our Core Values
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-grey max-w-md font-sans font-light leading-relaxed">
          We hold ourselves to strict ethical commitments, aligning cultural pride directly with transparent civic duty.
        </p>
      </div>

      {/* Interactive Spotlight Rows List */}
      <div className={cn(
        "max-w-7xl mx-auto flex flex-col relative z-10 transition-opacity duration-300",
        isScrolling && "pointer-events-none"
      )}>
        {VALUES.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          const isAnyHovered = hoveredIdx !== null;
          return (
            <div
              key={idx}
              onMouseEnter={() => {
                if (isScrolling) return;
                setHoveredIdx(idx);
                setActiveImage(item.image);
                gsap.to(".floating-preview", { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.4)" });
              }}
              onMouseLeave={() => {
                setHoveredIdx(null);
                gsap.to(".floating-preview", { scale: 0.75, opacity: 0, duration: 0.2, ease: "power2.out" });
              }}
              className={cn(
                "value-row-item group py-10 border-b border-saffron/15 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-500 relative z-10 cursor-pointer",
                isAnyHovered && !isHovered ? "opacity-30" : "opacity-100"
              )}
            >
              {/* Left Column: Index & Heading */}
              <div className="flex items-center gap-6 lg:w-5/12">
                <span className="text-xs sm:text-sm font-bold text-saffron/50 font-sans group-hover:text-saffron transition-colors">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl sm:text-3xl font-black text-slate-800 font-heading uppercase tracking-tight group-hover:text-saffron transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Right Column: Description */}
              <p className="text-xs sm:text-sm text-slate-grey leading-relaxed lg:w-7/12 font-sans font-light transition-all duration-500 group-hover:text-slate-700">
                {item.desc}
              </p>

              {/* Mobile Fallback: Inline Photo Frame */}
              <div className="w-full aspect-[16/10] relative overflow-hidden rounded-[1.8rem] border border-saffron/10 shadow-md lg:hidden mt-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>

            </div>
          );
        })}
      </div>

      {/* Floating Cursor Preview Frame (Desktop only - No CSS transitions to prevent GSAP conflict) */}
      <div 
        className="floating-preview pointer-events-none fixed top-0 left-0 w-[220px] h-[150px] rounded-2xl overflow-hidden shadow-2xl z-50 opacity-0 scale-75 origin-center hidden lg:block border-2 border-saffron/20 bg-white"
        style={{ willChange: "transform" }}
      >
        {activeImage && (
          <Image
            src={activeImage}
            alt="Preview"
            fill
            className="object-cover"
            sizes="220px"
          />
        )}
      </div>

    </section>
  );
}
