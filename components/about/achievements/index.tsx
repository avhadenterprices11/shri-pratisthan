"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AWARDS = [
  {
    title: "100% Tax Exemption Clearances",
    desc: "Fully authorized certificate credentials matching regulatory guidelines, giving complete transparency to corporate CSR donors.",
    badge: "🛡️",
  },
  {
    title: "Socio-Cultural Preservation Award",
    desc: "Recognized by regional cultural committees for maintaining ecological parameters and musical legacy guidelines in festivals.",
    badge: "🏆",
  },
  {
    title: "Emergency Aid Acknowledgment",
    desc: "Awarded by municipal boards for coordinates assistance and dry food packaging deliveries in flooded areas.",
    badge: "🎖️",
  },
];

export default function AboutAchievements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".achievement-tile",
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
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-50" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Credentials</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Trust Achievements & Credentials
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AWARDS.map((item, index) => (
            <div 
              key={index}
              className="achievement-tile glass-panel p-8 rounded-block flex flex-col justify-between items-start hover:border-saffron/30 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div>
                <div className="text-4xl mb-6">{item.badge}</div>
                <h3 className="text-xl font-extrabold text-foreground mb-3 font-heading">{item.title}</h3>
                <p className="text-sm text-slate-grey leading-relaxed">{item.desc}</p>
              </div>
              
              <div className="mt-6 text-[10px] text-saffron uppercase font-bold tracking-widest">
                Verified Credential
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
