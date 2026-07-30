"use client";

import React from "react";

const CORPORATES = [
  "Sahyadri Foundations",
  "Maharashtra Health Trust",
  "Pune Cultural Federation",
  "Mumbai Social Welfare Board",
  "Deccan Green Initiative",
  "Western Ghats CSR League",
];

export default function Sponsors() {
  return (
    <section className="py-16 bg-white overflow-hidden border-b border-saffron/10 relative">
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-8 text-center">
        <span className="text-slate-grey/60 font-bold text-[10px] uppercase tracking-widest block">Supported & Endorsed By</span>
      </div>

      {/* Ticker Row */}
      <div className="w-full flex relative overflow-hidden py-4 select-none">
        {/* Shadow masks at edges for premium visual blend */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Infinite scrolling block */}
        <div className="animate-marquee flex gap-16 items-center">
          {/* First loop */}
          {CORPORATES.map((item, index) => (
            <div 
              key={`loop1-${index}`}
              className="text-lg sm:text-xl font-black text-slate-grey/35 font-heading tracking-tight hover:text-saffron transition-colors"
            >
              {item}
            </div>
          ))}
          {/* Second loop (duplicated for continuity) */}
          {CORPORATES.map((item, index) => (
            <div 
              key={`loop2-${index}`}
              className="text-lg sm:text-xl font-black text-slate-grey/35 font-heading tracking-tight hover:text-saffron transition-colors"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
