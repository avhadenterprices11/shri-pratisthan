"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MEMBERS = [
  {
    name: "Adv. Shyam Dharmaraj Badode",
    role: "Founder & President (संस्थापक अध्यक्ष)",
    zone: "Central Leadership (Nashik)",
    phone: "+91 9922786608",
    email: "Info@shreepratishthan.com",
  },
  {
    name: "Festival Operations & Logistics",
    role: "Swagat Yatra & Festival Lead",
    zone: "Indira Nagar & Nashik Zone",
    phone: "+91 9922786608",
    email: "Info@shreepratishthan.com",
  },
  {
    name: "Arogya & Blood Drive Coordinator",
    role: "50+ Blood Camps & Hospital Liaison",
    zone: "Nashik Civil Hospital Network",
    phone: "+91 9922786608",
    email: "Info@shreepratishthan.com",
  },
];

export default function CommitteeDirectory() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".member-card",
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
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight font-heading leading-tight uppercase">
            Regional Coordinators Directory
          </h2>
          <p className="text-slate-grey mt-2.5 sm:mt-4 font-sans leading-[1.7] sm:leading-relaxed text-xs sm:text-base font-normal">
            Directly connect with our administrative coordinators overseeing local zones.
          </p>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {MEMBERS.map((member, index) => (
            <div
              key={index}
              className="member-card glass-panel group p-5 sm:p-8 rounded-2xl sm:rounded-block hover:border-saffron/30 hover:shadow-xl transition-all duration-300 bg-white border border-saffron/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.16em] sm:tracking-[0.2em] text-saffron bg-saffron/5 border border-saffron/10 px-2.5 py-1 rounded block w-fit mb-3 sm:mb-4 font-sans">
                  {member.zone}
                </span>
                <h3 className="text-lg sm:text-xl font-normal text-neutral-900 font-heading leading-snug uppercase">
                  {member.name}
                </h3>
                <p className="text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.18em] text-slate-grey font-bold mt-1 font-sans">
                  {member.role}
                </p>
              </div>

              <div className="mt-6 sm:mt-8 space-y-2.5 sm:space-y-3 border-t border-saffron/10 pt-4 sm:pt-6">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-grey font-medium group/item">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-saffron/5 border border-saffron/10 flex items-center justify-center text-saffron group-hover:bg-saffron/10 group-hover:scale-105 transition-all duration-300 shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </span>
                  <a href={`tel:${member.phone.replace(/\s+/g, "")}`} className="hover:text-saffron transition-colors">
                    {member.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-grey font-medium group/item">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-saffron/5 border border-saffron/10 flex items-center justify-center text-saffron group-hover:bg-saffron/10 group-hover:scale-105 transition-all duration-300 shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  <a href={`mailto:${member.email}`} className="hover:text-saffron transition-colors truncate">
                    {member.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
