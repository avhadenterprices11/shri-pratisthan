"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface PhotoProps {
  activeCategory: string;
}

const PHOTOS = [
  { title: "Ganeshotsav Evening Arati", category: "festival", bgClass: "bg-amber-100", emoji: "🕉️" },
  { title: "Village Diagnostics Consulting Desk", category: "healthcare", bgClass: "bg-emerald-100", emoji: "🩺" },
  { title: "Desktop Supplies Distribution", category: "education", bgClass: "bg-orange-100", emoji: "📚" },
  { title: "Traditional Drum Performers (Dhol)", category: "festival", bgClass: "bg-orange-50", emoji: "🥁" },
  { title: "Rural Clean Water Filter Support", category: "education", bgClass: "bg-yellow-50", emoji: "🚰" },
  { title: "Blood Bank Donation Aggregator", category: "healthcare", bgClass: "bg-red-50", emoji: "🏥" },
];

export default function PhotoGallery({ activeCategory }: PhotoProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  // Stagger grid item updates on category changes
  useEffect(() => {
    gsap.fromTo(
      ".photo-card-row",
      { opacity: 0, y: 15, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.4, ease: "power2.out" }
    );
  }, [activeCategory]);

  const filteredPhotos = activeCategory === "all" 
    ? PHOTOS 
    : PHOTOS.filter(p => p.category === activeCategory);

  return (
    <section 
      ref={gridRef}
      className="py-16 px-6 md:px-12 relative overflow-hidden bg-white/40 border-b border-saffron/10"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((item, index) => {
            const isTall = index === 1 || index === 4;
            return (
              <div 
                key={index}
                className={`photo-card-row group relative overflow-hidden rounded-block border border-saffron/10 shadow-md ${item.bgClass} ${
                  isTall ? "lg:row-span-2 min-h-[350px]" : "min-h-[250px]"
                } flex flex-col justify-between p-6 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]`}
              >
                {/* Visual mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                {/* Tag */}
                <div className="relative z-20 self-start bg-white/90 text-saffron font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-saffron/20 shadow-sm">
                  {item.category}
                </div>

                {/* Abstract Emoji */}
                <div className="absolute inset-0 flex items-center justify-center text-7xl select-none group-hover:scale-110 transition-transform duration-500 opacity-60">
                  {item.emoji}
                </div>

                {/* Narrative label */}
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
