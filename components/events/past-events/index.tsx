"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PAST = [
  {
    title: "Monsoon Vasundhara Planting",
    date: "July 2025",
    desc: "Planted native saplings on bare hillsides to prevent erosion, in coordinates with forestry departments.",
    metric: "5,000+ Trees Planted",
    colorClass: "bg-green-100 text-green-600",
  },
  {
    title: "Pandemic Social Aid",
    date: "April-June 2020",
    desc: "Distributed dry provisions and medical sanitization kits to families in remote villages.",
    metric: "10,000+ Families Aided",
    colorClass: "bg-red-100 text-red-600",
  },
  {
    title: "Shiksha Notebook Support",
    date: "November 2024",
    desc: "Supplied quality learning notebooks, desks, and visual study aids to local schools in Thane district.",
    metric: "2,200+ Students Guided",
    colorClass: "bg-orange-100 text-orange-600",
  },
];

export default function PastEvents() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".past-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-white"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-50" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Completed Drives</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Past Campaigns Impact
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PAST.map((item, index) => (
            <div 
              key={index}
              className="past-card glass-panel p-8 rounded-block flex flex-col justify-between hover:border-saffron/30 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${item.colorClass}`}>
                    {item.metric}
                  </span>
                  <span className="text-xs text-slate-grey font-bold tracking-widest uppercase">
                    {item.date}
                  </span>
                </div>
                
                <h3 className="text-xl font-extrabold text-foreground mb-3 font-heading">{item.title}</h3>
                <p className="text-sm text-slate-grey leading-relaxed">{item.desc}</p>
              </div>

              <div className="border-t border-saffron/10 pt-4 mt-6 text-xs text-saffron font-bold uppercase tracking-widest">
                Audit Clearances Verified
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
