"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "Who is eligible to volunteer?",
    a: "Anyone above 16 years of age who is passionate about public welfare, environmental conservation, or cultural coordination is welcome to register. No previous NGO experience is required.",
  },
  {
    q: "What is the minimum time commitment?",
    a: "We do not enforce rigid commitments. You can sign up for specific campaigns (like a single Sunday tree planting drive) or choose to volunteer during the festive Ganeshotsav season depending on your schedule.",
  },
  {
    q: "Do volunteers receive certificates?",
    a: "Yes. Shree Prathishthan issues official Trust certificates detailing your volunteering project and the hours you contributed. These certificates are verified by our governance committee.",
  },
  {
    q: "Is there any training provided?",
    a: "Yes. Before any field deployment (such as medical camp setups or crowd safety logistics), our area coordinators organize brief orientation calls to explain task lists, protocols, and safety norms.",
  },
];

export default function VolunteerFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
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

  const toggleFAQ = (index: number) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 animate-pulse" />
      <div className="max-w-4xl mx-auto relative z-10 faq-reveal">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">FAQ</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className="glass-panel rounded-xl overflow-hidden bg-white border border-saffron/5 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left font-bold text-foreground font-heading hover:text-saffron transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <span className={`text-xl font-light transform transition-transform duration-300 ${isOpen ? "rotate-45 text-saffron" : "text-slate-grey"}`}>
                    ＋
                  </span>
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[200px] border-t border-saffron/5" : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-sm text-slate-grey leading-relaxed font-sans bg-slate-50/20">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
