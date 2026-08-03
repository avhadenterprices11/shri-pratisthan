"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const UPCOMING = [
  {
    date: "Aug 12, 2026",
    time: "9:00 AM - 5:00 PM",
    title: "Free Diagnostics Medical Camp",
    location: "Rural Clinic Center, Thane District",
    category: "Healthcare",
    colorClass: "bg-emerald-100 text-emerald-600",
  },
  {
    date: "Aug 20, 2026",
    time: "10:00 AM - 6:00 PM",
    title: "Vasundhara Hill Tree Planting Drive",
    location: "Deforested Slopes, Pune Region",
    category: "Ecology",
    colorClass: "bg-green-100 text-green-600",
  },
];

export default function UpcomingEvents() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".upcoming-card",
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Join In</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Immediate Initiatives
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {UPCOMING.map((item, index) => (
            <div 
              key={index}
              className="upcoming-card glass-panel p-8 rounded-block flex flex-col justify-between hover:border-saffron/30 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${item.colorClass}`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-grey font-bold tracking-widest uppercase">
                    {item.date}
                  </span>
                </div>
                
                <h3 className="text-2xl font-extrabold text-foreground mb-4 font-heading">{item.title}</h3>
                
                <div className="space-y-2 mb-8 text-sm text-slate-grey">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-saffron stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gold stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              <a 
                href="#register"
                className="w-full bg-saffron hover:bg-saffron/90 text-white font-extrabold text-center py-4 rounded-full text-xs uppercase tracking-widest shadow-md shadow-saffron/25 transition-all hover:scale-[1.01]"
              >
                Register To Attend
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
