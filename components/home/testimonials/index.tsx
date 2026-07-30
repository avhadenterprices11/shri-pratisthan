"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: "Shree Prathishthan's Ganeshotsav sets the benchmark for cultural heritage preservation. Their volunteers worked hand-in-hand with our logistics team to ensure flawless safety standards.",
    name: "Rajesh Kulkarni",
    role: "Local Administration Coordinator",
    avatar: "👤",
  },
  {
    quote: "Partnering with Shree Prathishthan for our annual medical CSR drive was seamless. Their community audit files and transparency index are outstanding, guaranteeing direct support to beneficiaries.",
    name: "Sunita Deshmukh",
    role: "CSR Director, Sahyadri Tech Foundations",
    avatar: "👩‍💼",
  },
  {
    quote: "Registering as a volunteer took less than a minute. Since joining, I've coordinates 12 cleanup and rural aid programs. The community structure is exceptionally friendly and focused.",
    name: "Amit Shinde",
    role: "Student & Active Volunteer",
    avatar: "🧑‍🎓",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
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
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Community Voice</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Patron & Volunteer Testimonial
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, index) => (
            <div 
              key={index}
              className="testimonial-card glass-panel p-8 rounded-block flex flex-col justify-between hover:border-saffron/30 hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* Quote Icon */}
                <div className="text-4xl text-saffron opacity-30 mb-4">“</div>
                <p className="text-slate-grey leading-relaxed italic mb-6">
                  {item.quote}
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-saffron/10 pt-6">
                <div className="w-10 h-10 rounded-full bg-saffron/10 flex items-center justify-center text-lg shadow-sm border border-saffron/10">
                  {item.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-foreground font-heading">{item.name}</h4>
                  <p className="text-xs text-slate-grey">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
