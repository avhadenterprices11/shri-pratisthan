"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function MemoryCard({ 
  title, 
  category, 
  date, 
  metric, 
  emoji, 
  bgGradient 
}: { 
  title: string; 
  category: string; 
  date: string; 
  metric: string; 
  emoji: string; 
  bgGradient: string 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setRotate({
      x: -(y / (rect.height / 2)) * 6,
      y: (x / (rect.width / 2)) * 6
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`glass-panel p-8 rounded-block flex flex-col justify-between h-[300px] hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${bgGradient} hover:border-saffron/30`}
    >
      <div className="flex justify-between items-start">
        <span className="text-[10px] text-saffron font-bold uppercase tracking-widest bg-white/80 border border-saffron/10 px-3 py-1 rounded-full">
          {category}
        </span>
        <span className="text-4xl select-none">{emoji}</span>
      </div>

      <div>
        <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase block mb-1">
          {date}
        </span>
        <h3 className="text-2xl font-extrabold text-slate-800 leading-snug font-heading mb-4">
          {title}
        </h3>
        <div className="border-t border-saffron/10 pt-4 flex justify-between items-center text-xs text-saffron font-bold uppercase tracking-widest">
          <span>{metric}</span>
          <span>→</span>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedMemories() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-mem-card",
        { opacity: 0, y: 35 },
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
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Iconic Moments</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Featured Memories
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="featured-mem-card">
            <MemoryCard
              title="Ganeshotsav Shivaji Park Processions"
              category="Festival"
              date="September 2024"
              metric="Dhol Tasha Parade"
              emoji="🪔"
              bgGradient="from-amber-50 to-orange-50/50"
            />
          </div>
          <div className="featured-mem-card">
            <MemoryCard
              title="First Rural Health Clinic Launch"
              category="Welfare"
              date="May 2023"
              metric="150+ Patients Guided"
              emoji="🩺"
              bgGradient="from-emerald-50 to-teal-50/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
