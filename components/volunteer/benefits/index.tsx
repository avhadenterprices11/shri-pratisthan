"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BENEFITS = [
  {
    title: "Official Verification Credentials",
    desc: "Receive an official Trust Certificate documenting your volunteer hours, contributions, and project alignments—highly valued for university and professional applications.",
    icon: "📜",
  },
  {
    title: "Skill Enhancement Programs",
    desc: "Gain access to regular training workshops covering first aid, trauma response basics, ecological farming techniques, and public communications.",
    icon: "🧠",
  },
  {
    title: "Leadership Pathways",
    desc: "Take charge of local operations. Transition from field volunteer to area drive coordinator, overseeing teams and resource management.",
    icon: "👑",
  },
  {
    title: "Corporate CSR Exposure",
    desc: "Interact with corporate donors, administrative officers, and public auditors, understanding structural NGO accountability and planning.",
    icon: "👔",
  },
];

export default function VolunteerBenefits() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".benefit-card",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.15,
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

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-white border-b border-saffron/10"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Perks</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Volunteer Rewards & Benefits
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BENEFITS.map((item, index) => (
            <div
              key={index}
              className="benefit-card glass-panel p-8 rounded-block flex flex-col justify-between hover:border-saffron/30 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div>
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-extrabold text-foreground mb-3 font-heading">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-grey leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 border-t border-saffron/10 pt-4 flex justify-between items-center text-xs text-saffron font-bold uppercase tracking-wider">
                <span>Verified Benefit</span>
                <span>⭐</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
