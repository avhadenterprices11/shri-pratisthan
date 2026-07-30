"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const INITIATIVES = [
  {
    title: "Educational Kits (Shiksha)",
    desc: "Distributing quality notebooks, laptops, and constructs study desks in rural zones across Deforested Hills.",
    icon: (
      <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    color: "bg-orange-100 text-orange-600",
    metrics: "2,200+ Students Supported",
  },
  {
    title: "Medical Camps (Arogya)",
    desc: "Weekly diagnostic drives, distribution of free medicines, cancer screenings, and regular blood donation aggregation.",
    icon: (
      <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    color: "bg-emerald-100 text-emerald-600",
    metrics: "15,000+ Consultations",
  },
  {
    title: "Eco Tree Planting (Vasundhara)",
    desc: "Mass tree planting campaigns on hills to combat erosion, alongside cleanup campaigns for local rivers.",
    icon: (
      <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
      </svg>
    ),
    color: "bg-green-100 text-green-600",
    metrics: "5,000+ Saplings Planted",
  },
  {
    title: "Disaster Emergency Relief",
    desc: "Delivering primary dry foods, clothes, and cleaning equipment directly to zones hit by floods and slides.",
    icon: (
      <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4m0 4h.01" />
      </svg>
    ),
    color: "bg-red-100 text-red-600",
    metrics: "1,200+ Families Aided",
  },
];

export default function SocialWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollTrackRef.current) return;

    const ctx = gsap.context(() => {
      // Horizontal scroll animation mapped to vertical scroll
      const pinWidth = scrollTrackRef.current!.scrollWidth;
      const viewWidth = window.innerWidth;
      const amountToScroll = pinWidth - viewWidth + 48; // add buffer padding

      if (amountToScroll > 0) {
        gsap.to(scrollTrackRef.current, {
          x: -amountToScroll,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${pinWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative bg-white overflow-hidden"
    >
      <div className="min-h-screen flex flex-col justify-center py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-12">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Our Operations</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading max-w-2xl">
            Community Transformation in Action
          </h2>
          <p className="text-slate-grey mt-4 max-w-xl">
            Scroll down to explore how our specialized welfare programs empower communities.
          </p>
        </div>

        {/* Horizontal Track */}
        <div className="flex overflow-x-hidden w-full relative">
          <div 
            ref={scrollTrackRef}
            className="flex gap-8 px-6 md:px-12 pb-8 flex-nowrap"
          >
            {INITIATIVES.map((item, index) => (
              <div 
                key={index}
                className="w-[300px] sm:w-[400px] flex-shrink-0 glass-panel p-8 rounded-block flex flex-col justify-between hover:border-saffron/30 hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mb-6`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-extrabold text-foreground mb-4 font-heading">{item.title}</h3>
                  <p className="text-base text-slate-grey leading-relaxed">{item.desc}</p>
                </div>
                
                <div className="border-t border-saffron/10 pt-6 mt-6 flex justify-between items-center">
                  <span className="text-xs uppercase font-bold tracking-widest text-saffron">{item.metrics}</span>
                  <svg className="w-5 h-5 text-gold stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
