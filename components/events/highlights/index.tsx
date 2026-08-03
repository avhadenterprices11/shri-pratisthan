"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MEDIA = [
  { text: "🪔", title: "Cultural Heritage Parades", bg: "bg-amber-100" },
  { text: "🩺", title: "Emergency Health camps", bg: "bg-emerald-100" },
  { text: "📚", title: "Notebook Distribution Drives", bg: "bg-orange-100" },
];

export default function EventsHighlights() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".highlight-card",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.15,
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Highlights</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Celebration Snapshots
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MEDIA.map((item, index) => (
            <div 
              key={index}
              className={`highlight-card glass-panel p-8 rounded-block text-center flex flex-col justify-center items-center group overflow-hidden ${item.bg} border-saffron/10 hover:border-saffron/30 hover:shadow-2xl transition-all duration-500 min-h-[300px]`}
            >
              <div className="text-7xl group-hover:scale-110 transition-transform duration-500 opacity-60 mb-6 select-none">
                {item.text}
              </div>
              <h3 className="text-xl font-extrabold text-slate-800 font-heading">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
