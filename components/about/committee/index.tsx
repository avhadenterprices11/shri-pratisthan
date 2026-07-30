"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MEMBERS = [
  {
    name: "Aarti Shantaram Chavan",
    role: "Founder & Lead Creative Director",
    avatar: "👩‍🎨",
    bgColor: "bg-orange-50 border-orange-200",
  },
  {
    name: "Dr. Mangesh Sudhkar Bange",
    role: "Chairman & Medical Coordinator",
    avatar: "👨‍⚕️",
    bgColor: "bg-emerald-50 border-emerald-200",
  },
  {
    name: "Sanjay Sawant",
    role: "Lead Field Logistics Organizer",
    avatar: "🧑‍💼",
    bgColor: "bg-blue-50 border-blue-200",
  },
];

export default function AboutCommittee() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".committee-member",
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-white/40 border-y border-saffron/10"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Leadership</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Trust Governance Committee
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MEMBERS.map((item, index) => (
            <div 
              key={index}
              className="committee-member glass-panel p-8 rounded-block text-center flex flex-col justify-between items-center group hover:border-saffron/30 hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex flex-col items-center">
                {/* Visual Avatar */}
                <div className={`w-24 h-24 rounded-full ${item.bgColor} border flex items-center justify-center text-4xl shadow-md mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  {item.avatar}
                </div>
                
                <h3 className="text-xl font-extrabold text-foreground mb-2 font-heading group-hover:text-saffron transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-xs font-bold text-gold uppercase tracking-widest mb-4">
                  {item.role}
                </p>
              </div>
              
              <div className="border-t border-saffron/10 w-full pt-4 mt-4 text-xs text-slate-grey">
                Active Member since foundation
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
