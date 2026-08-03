"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MEMBERS = [
  {
    name: "Vikram R. Shinde",
    role: "Central Operations Director",
    zone: "Headquarters (Mumbai)",
    phone: "+91 98200 11223",
    email: "vikram.shinde@shripratisthan.org",
  },
  {
    name: "Anand G. Kulkarni",
    role: "Liaison & CSR Coordinator",
    zone: "Mulund & Bhandup Zones",
    phone: "+91 98200 44556",
    email: "anand.k@shripratisthan.org",
  },
  {
    name: "Sunil S. Patil",
    role: "Rural Welfare Lead",
    zone: "Karjat Foothills & Raigad",
    phone: "+91 98200 77889",
    email: "sunil.patil@shripratisthan.org",
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">
            Governance
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Regional Coordinators Directory
          </h2>
          <p className="text-slate-grey mt-4">
            Directly connect with our administrative coordinators overseeing local zones.
          </p>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MEMBERS.map((member, index) => (
            <div
              key={index}
              className="member-card glass-panel p-8 rounded-block hover:border-saffron/30 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-saffron bg-saffron/5 border border-saffron/10 px-2.5 py-1 rounded block w-fit mb-4">
                  {member.zone}
                </span>
                <h3 className="text-xl font-extrabold text-foreground font-heading">
                  {member.name}
                </h3>
                <p className="text-xs uppercase tracking-wider text-slate-grey font-bold mt-1">
                  {member.role}
                </p>
              </div>

              <div className="mt-8 space-y-2 border-t border-saffron/10 pt-6">
                <div className="flex items-center gap-2 text-sm text-slate-grey font-medium">
                  <span>📞</span>
                  <a href={`tel:${member.phone.replace(/\s+/g, "")}`} className="hover:text-saffron transition-colors">
                    {member.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-grey font-medium">
                  <span>✉️</span>
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
