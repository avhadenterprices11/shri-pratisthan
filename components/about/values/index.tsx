"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    title: "Transparency (Satya)",
    desc: "We publish detailed annual audit summaries and visual metrics tracking 100% of public donations directly to active rural beneficiaries.",
    icon: (
      <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Service (Seva)",
    desc: "Dedicated to continuous social support campaigns. Our volunteers organize medical checks, educational toolkits, and deforested hill tree planting.",
    icon: (
      <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Integrity (Nishtha)",
    desc: "Operating fully independent of political networks, focusing strictly on cultural integrity and non-discriminatory humanitarian relief.",
    icon: (
      <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Unity (Ekta)",
    desc: "Structuring festivals safely to promote community integration, bridging municipal resources with remote village assistance needs.",
    icon: (
      <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: "bg-purple-100 text-purple-600",
  },
];

export default function AboutValues() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".value-card",
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-white/40 border-y border-saffron/10"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Our Integrity</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Our Core Values
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((item, index) => (
            <div 
              key={index}
              className="value-card glass-panel glass-panel-hover p-6 rounded-block flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mb-6`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-extrabold text-foreground mb-3 font-heading">{item.title}</h3>
                <p className="text-sm text-slate-grey leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
