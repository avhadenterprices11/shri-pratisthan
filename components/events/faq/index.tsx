"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "What are the Aarti & Darshan timings during Shree Ganeshotsav?",
    a: "Daily Prabhat Aarti begins at 6:00 AM, afternoon community darshan runs through 1:00 PM, and the grand 108-lamp evening Maha Aarti commences at 7:30 PM at the Indira Nagar Mandal Ground, Nashik.",
  },
  {
    q: "Who can participate in the Gudipadwa Swagat Yatra & Cricket Tournaments?",
    a: "Our cultural processions, health drives, and annual cricket championships are open to all citizens, families, and youth clubs across Indira Nagar and Nashik district. Registration is free and welcome to all.",
  },
  {
    q: "Are events free and how do I obtain an entry or booking pass?",
    a: "All cultural festivals, aartis, and health camps are completely free for the public. You can generate an instant digital pass with QR verification directly on our Event Booking portal.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    if (open) {
      gsap.to(contentRef.current, { height: "auto", duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(contentRef.current, { height: 0, duration: 0.3, ease: "power2.out" });
    }
  }, [open]);

  return (
    <div className="glass-panel rounded-xl sm:rounded-block overflow-hidden transition-all duration-300 border border-saffron/15 bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center text-left focus:outline-none gap-3"
      >
        <span className="text-sm sm:text-base md:text-lg font-normal text-neutral-900 font-heading leading-snug uppercase">{q}</span>
        <span className={`text-saffron text-xl sm:text-2xl font-normal transition-transform duration-300 shrink-0 ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <div 
        ref={contentRef} 
        className="height-0 overflow-hidden"
        style={{ height: 0 }}
      >
        <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-xs sm:text-sm text-slate-grey leading-[1.75] font-sans border-t border-saffron/10 pt-3 sm:pt-4 bg-orange-50/10 font-normal">
          {a}
        </div>
      </div>
    </div>
  );
}

export default function EventsFAQ() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-slide-in",
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
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background border-t border-black/5"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40" />
      <div className="max-w-4xl mx-auto relative z-10 faq-slide-in">
        <div className="text-center mb-8 sm:mb-16 px-4 sm:px-6">
          <span className="text-saffron font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.25em] block mb-2 sm:mb-3 font-sans">FAQ</span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight font-heading leading-tight uppercase">
            Common Questions
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
        </div>

        <div className="space-y-3 sm:space-y-4">
          {FAQS.map((item, index) => (
            <FaqItem key={index} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
