"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    title: "Ganeshotsav Aarthi",
    tag: "Festival",
    bgColor: "bg-amber-100",
    icon: "🕉️",
  },
  {
    title: "Primary School Distribution",
    tag: "Education",
    bgColor: "bg-orange-100",
    icon: "📚",
  },
  {
    title: "Blood Donation Volunteers",
    tag: "Healthcare",
    bgColor: "bg-emerald-100",
    icon: "🩺",
  },
  {
    title: "Dahi Handi Human Pyramids",
    tag: "Athletics",
    bgColor: "bg-blue-100",
    icon: "🏺",
  },
  {
    title: "Vasundhara Planting Drive",
    tag: "Environment",
    bgColor: "bg-green-100",
    icon: "🌱",
  },
  {
    title: "Flood Relief Packaging",
    tag: "Welfare",
    bgColor: "bg-red-100",
    icon: "📦",
  },
];

export default function GalleryPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-item",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-white/40 border-y border-saffron/10"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16">
          <div>
            <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Media Archive</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
              Moments of Legacy & Care
            </h2>
          </div>
          <a 
            href="/gallery"
            className="group mt-4 md:mt-0 inline-flex items-center gap-2 text-saffron font-bold uppercase text-xs tracking-widest hover:text-saffron/80 transition-colors"
          >
            Explore Complete Archive
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </a>
        </div>

        {/* Masonry-like dynamic grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item, index) => {
            const isTall = index === 1 || index === 4;
            return (
              <div 
                key={index}
                className={`gallery-item group relative overflow-hidden rounded-block border border-saffron/10 shadow-md ${item.bgColor} ${
                  isTall ? "lg:row-span-2 min-h-[350px]" : "min-h-[250px]"
                } flex flex-col justify-between p-6 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]`}
              >
                {/* Background overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                {/* Tag */}
                <div className="relative z-20 self-start bg-white/85 text-saffron font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-saffron/20 shadow-sm">
                  {item.tag}
                </div>

                {/* Abstract Visual Center */}
                <div className="absolute inset-0 flex items-center justify-center text-7xl select-none group-hover:scale-110 transition-transform duration-500 opacity-60">
                  {item.icon}
                </div>

                {/* Title overlay */}
                <div className="relative z-20 mt-auto translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 group-hover:text-white transition-colors duration-300 font-heading">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
