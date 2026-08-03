"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    title: "Direct Social Impact",
    desc: "Coordinate relief kit supplies, blood banking hubs, and eco reforestation campaigns to create measurable change in rural ecosystems.",
    badge: "🤝",
  },
  {
    title: "Skill Enrichment",
    desc: "Develop core competencies in event logistics management, public operations auditing, communication strategies, and healthcare coordination.",
    badge: "📈",
  },
  {
    title: "Cultural Preservation",
    desc: "Play an active role in planning green Ganeshotsav festivals, Dahi Handi safety frameworks, and preserving traditional folk arts.",
    badge: "🚩",
  },
  {
    title: "Community & Networking",
    desc: "Establish lifelong connections with dedicated student volunteers, community leaders, municipal authorities, and corporate CSR sponsors.",
    badge: "🌐",
  },
];

export default function VolunteerWhyJoin() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-join-card",
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-50" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Values</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Why Volunteer With Us?
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((item, index) => (
            <div
              key={index}
              className="why-join-card glass-panel p-8 rounded-block flex flex-col justify-between hover:border-saffron/30 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div>
                <div className="text-4xl mb-6">{item.badge}</div>
                <h3 className="text-xl font-extrabold text-foreground mb-3 font-heading">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-grey leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 text-[10px] text-saffron uppercase font-bold tracking-widest">
                Core Value
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
