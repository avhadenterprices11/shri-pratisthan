"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TRACKS = [
  {
    title: "Cultural Event Logistics",
    desc: "Oversee layout structures, safety barricades, queue arrangements, and crowd coordination during major festivals like Ganeshotsav and Dahi Handi.",
    skills: "Crowd Safety, Event Planning, Leadership",
    icon: (
      <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Arogya Health Mobilizer",
    desc: "Assist with patient aggregation, registration desk files, queue configurations, and medical doctor assistance in weekly rural checkup drives.",
    skills: "Healthcare Support, Empathy, Desk Mgmt",
    icon: (
      <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: "Vasundhara Eco-Guard",
    desc: "Participate in weekend tree plantation drives, barren slope cleanups, digging water storage trenches, and watering young trees.",
    skills: "Eco-restoration, Teamwork, Outdoors Care",
    icon: (
      <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
      </svg>
    ),
  },
  {
    title: "Seva Relief Coordinator",
    desc: "Help assemble dry food supply packages, inspect clothing banks, build wooden study desks, and deliver items to remote tribal zones.",
    skills: "Resource Tracking, Logistics, Aid Delivery",
    icon: (
      <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="2.5" />
        <path d="M6 12h12M12 6v12" />
      </svg>
    ),
  },
];

export default function VolunteerOpportunities() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".track-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToForm = () => {
    const el = document.querySelector("#registration-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background border-b border-saffron/10"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Opportunities</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Active Volunteer Tracks
          </h2>
          <p className="text-slate-grey mt-4">
            Select a pathway that aligns with your interest and contribute to high-efficiency community systems.
          </p>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TRACKS.map((item, index) => (
            <div
              key={index}
              onClick={handleScrollToForm}
              className="track-card glass-panel glass-panel-hover p-8 rounded-block flex flex-col sm:flex-row gap-6 cursor-pointer bg-white transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-saffron/5 flex items-center justify-center text-saffron flex-shrink-0">
                {item.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-extrabold text-foreground font-heading">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-grey leading-relaxed">
                  {item.desc}
                </p>
                <div className="text-[10px] uppercase font-bold tracking-widest text-saffron bg-saffron/5 border border-saffron/10 px-2 py-0.5 rounded inline-block">
                  Skills: {item.skills}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
