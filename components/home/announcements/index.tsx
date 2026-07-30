"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NEWS = [
  {
    date: "July 30, 2026",
    title: "Urgent: Blood Donation Camp at Mumbai Central Office",
    desc: "In response to emergency needs, we are holding a major blood donation campaign tomorrow. Register today to reserve a slot.",
    urgent: true,
  },
  {
    date: "July 28, 2026",
    title: "Vasundhara Hill Clean-Up Schedule Announced",
    desc: "Our next green initiative cleanup is scheduled for August 5. Buses leave Pune Center at 6:00 AM.",
    urgent: false,
  },
  {
    date: "July 25, 2026",
    title: "Ganeshotsav Volunteers Coordination Onboarding",
    desc: "Onboarding calls for cultural and logistics volunteers start this Friday. Check details in the portal.",
    urgent: false,
  },
];

export default function Announcements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".news-strip",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
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
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Realtime Feed</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Active Announcements
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {NEWS.map((item, index) => (
            <div 
              key={index}
              className={`news-strip glass-panel p-6 rounded-block border-l-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-lg transition-shadow duration-300 ${
                item.urgent ? "border-l-saffron bg-orange-50/20" : "border-l-gold"
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] text-slate-grey font-bold tracking-widest uppercase">{item.date}</span>
                  {item.urgent && (
                    <span className="bg-saffron text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                      Critical Alert
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-extrabold text-foreground font-heading mb-1">{item.title}</h3>
                <p className="text-sm text-slate-grey leading-relaxed">{item.desc}</p>
              </div>

              <a 
                href="#volunteer" 
                className="self-end sm:self-auto text-saffron text-xs font-bold uppercase tracking-widest hover:text-saffron/80 whitespace-nowrap"
              >
                Sign Up & Participate →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
