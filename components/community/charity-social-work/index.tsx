"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CAMPAIGNS = [
  {
    title: "Educational Study Desks & Kits",
    desc: "We construct and distribute sturdy dual-benches and provide full notebook & stationary sets to remote tribal schools in Western Maharashtra.",
    metric: "2,200+ Kits Distributed",
    icon: (
      <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M12 22v-9M12 13H5v9h14v-9h-7z" />
        <path d="M22 7H2v6h20V7z" />
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
      </svg>
    ),
  },
  {
    title: "Emergency Flood & Disaster Relief",
    desc: "When monsoon flooding isolates local riverine villages, our quick-response teams deliver packets of dry grains, clean water, and medical kits directly.",
    metric: "1,200+ Families Supported",
    icon: (
      <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Winter Blankets & Clothing Bank",
    desc: "Collection drives aggregating warm clothing, sweaters, and blankets from urban hubs and distributing them to forest settlements before winter peaks.",
    metric: "3,500+ Blankets Donated",
    icon: (
      <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="2.5" />
        <path d="M6 12h12M12 6v12" />
      </svg>
    ),
  },
];

export default function CharitySocialWork() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".charity-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".charity-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="charity-social-work"
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background scroll-mt-20"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40" />
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="charity-title text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">
            Social Welfare • Seva
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Charity & Direct Relief Work
          </h2>
          <p className="text-slate-grey mt-4">
            Delivering essential support directly to students, families in crises, and marginalized communities.
          </p>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CAMPAIGNS.map((item, index) => (
            <div
              key={index}
              className="charity-card glass-panel p-8 rounded-block flex flex-col justify-between hover:border-saffron/30 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-saffron/5 flex items-center justify-center text-saffron mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-extrabold text-foreground mb-4 font-heading">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-grey leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="border-t border-saffron/10 pt-6 mt-6 flex justify-between items-center">
                <span className="text-xs uppercase font-extrabold tracking-widest text-saffron">
                  {item.metric}
                </span>
                <span className="text-[10px] text-slate-grey uppercase font-bold tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                  Distributed
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
