"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    title: "Registered Head Office",
    details: [
      "Building 4B, Sector 3,",
      "Station Road, Bhandup (East),",
      "Mumbai, MH - 400042",
    ],
    accent: "📍",
  },
  {
    title: "Administrative Coordinates",
    details: [
      "Inquiries: info@shripratisthan.org",
      "Volunteer Coordinator: +91 98765 43210",
      "Office Landline: 022-2567-8910",
    ],
    accent: "📞",
  },
  {
    title: "Regional Liaison Office",
    details: [
      "Prathishthan Seva Kendra,",
      "Main Market Road, Karjat,",
      "Raigad, MH - 410201",
    ],
    accent: "🏡",
  },
  {
    title: "Trust Registrations",
    details: [
      "Trust Act Reg: E-32456 (Mumbai)",
      "Section 80G Tax Exemption Certified",
      "Section 12A Regulatory Clearance",
    ],
    accent: "🛡️",
  },
];

export default function ContactInformation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".info-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
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
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-50" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">
            Coordinates
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Official Contact Directory
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CARDS.map((item, index) => (
            <div
              key={index}
              className="info-card glass-panel p-8 rounded-block flex flex-col justify-between hover:border-saffron/30 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div>
                <div className="text-4xl mb-6">{item.accent}</div>
                <h3 className="text-lg font-extrabold text-foreground mb-4 font-heading">
                  {item.title}
                </h3>
                <div className="space-y-1">
                  {item.details.map((line, idx) => (
                    <p key={idx} className="text-sm text-slate-grey font-medium leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-[10px] text-saffron uppercase font-bold tracking-widest">
                Official Directory
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
