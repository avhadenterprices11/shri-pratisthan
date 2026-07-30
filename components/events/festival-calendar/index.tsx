"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CULTURAL = [
  { month: "March", title: "Shiv Jayanti Celebrations", desc: "Traditional processions, martial arts (Mardani Khel) displays, and history lectures celebrating Chhatrapati Shivaji Maharaj." },
  { month: "August", title: "Dahi Handi Utsav", desc: "Athletic human pyramids celebrating Krishna Janmashtami with focus on volunteer safety coordinates." },
  { month: "September", title: "Shree Ganeshotsav", desc: "10-day grand festival of Ganesha featuring traditional Dhol Tasha musical ensembles and environmental clay icons." },
];

const WELFARE = [
  { month: "Monthly", title: "Arogya Blood Aggregation Drives", desc: "Recurring diagnostic counseling and emergency blood donations coordinates in partnership with local hospitals." },
  { month: "July-Sept", title: "Vasundhara Planting Campaigns", desc: "Mass tree planting drives on deforested hill slopes during active monsoon seasons." },
  { month: "Oct-Nov", title: "Shiksha Notebook Distribution", desc: "Constructing classroom desks and distributing school kits to underprivileged rural students." },
];

export default function FestivalCalendar() {
  const [activeTab, setActiveTab] = useState<"cultural" | "welfare">("cultural");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".calendar-slide-in",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Quick tab fade trigger
  useEffect(() => {
    gsap.fromTo(
      ".calendar-item-row",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 }
    );
  }, [activeTab]);

  const items = activeTab === "cultural" ? CULTURAL : WELFARE;

  return (
    <section 
      ref={containerRef} 
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-white/40 border-y border-saffron/10"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10 calendar-slide-in">
        <div className="text-center mb-12">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Chronology</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Yearly Calendar Schedule
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("cultural")}
            className={`font-extrabold text-xs uppercase tracking-widest px-6 py-3 rounded-full border transition-all ${
              activeTab === "cultural"
                ? "bg-saffron text-white border-saffron shadow-md"
                : "bg-white/80 text-slate-grey border-border hover:border-saffron"
            }`}
          >
            Cultural Festivals
          </button>
          <button
            onClick={() => setActiveTab("welfare")}
            className={`font-extrabold text-xs uppercase tracking-widest px-6 py-3 rounded-full border transition-all ${
              activeTab === "welfare"
                ? "bg-saffron text-white border-saffron shadow-md"
                : "bg-white/80 text-slate-grey border-border hover:border-saffron"
            }`}
          >
            Social Campaigns
          </button>
        </div>

        {/* Items List */}
        <div className="space-y-6">
          {items.map((item, index) => (
            <div 
              key={index}
              className="calendar-item-row glass-panel p-6 rounded-block flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-saffron/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-20 font-black text-lg text-saffron uppercase font-heading sm:text-xl">
                  {item.month}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-foreground font-heading mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-grey leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
