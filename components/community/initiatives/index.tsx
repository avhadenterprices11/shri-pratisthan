"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const INITIATIVES_SUMMARY = [
  {
    title: "Healthcare & Life drives",
    desc: "Active blood banking networks, emergency medical support registries, and routine rural checkup camps.",
    tag: "Arogya",
    icon: (
      <svg className="w-8 h-8 text-saffron fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
    anchor: "#blood-donation",
  },
  {
    title: "Ecological Revival",
    desc: "Mass tree planting campaigns on barren hills, seed balls scattering, and nurturing green forest canopies.",
    tag: "Vasundhara",
    icon: (
      <svg className="w-8 h-8 text-saffron fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    anchor: "#tree-plantation",
  },
  {
    title: "Socio-Educational Support",
    desc: "Providing textbooks, custom study desks to rural schools, dry ration distribution, and immediate disaster aid.",
    tag: "Seva",
    icon: (
      <svg className="w-8 h-8 text-saffron fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    anchor: "#charity-social-work",
  },
];

export default function CommunityInitiatives() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".initiative-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
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

  const handleScrollToSection = (anchor: string) => {
    const el = document.querySelector(anchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Our Pillars</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Key Focus Areas
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIATIVES_SUMMARY.map((item, index) => (
            <div
              key={index}
              onClick={() => handleScrollToSection(item.anchor)}
              className="initiative-card glass-panel glass-panel-hover p-8 rounded-block flex flex-col justify-between cursor-pointer transition-all duration-300 bg-white"
            >
              <div>
                <div className="w-16 h-16 rounded-full bg-saffron/5 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <div className="text-xs uppercase font-extrabold tracking-widest text-saffron mb-2">
                  {item.tag}
                </div>
                <h3 className="text-2xl font-extrabold text-foreground mb-4 font-heading">
                  {item.title}
                </h3>
                <p className="text-base text-slate-grey leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-saffron group">
                <span>View Details</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
