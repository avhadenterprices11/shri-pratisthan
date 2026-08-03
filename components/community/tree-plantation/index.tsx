"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SPECIES = [
  { name: "Neem (Azadirachta indica)", type: "Air Purifying & Medicinal", count: "1,500+" },
  { name: "Banyan (Ficus benghalensis)", type: "Shade & Canopy Growth", count: "800+" },
  { name: "Mango (Mangifera indica)", type: "Fruiting & Local Ecology", count: "1,200+" },
  { name: "Peepal (Ficus religiosa)", type: "Oxygen Rich & Soil Stability", count: "900+" },
];

export default function TreePlantation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tree-animate-left",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".tree-animate-right",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tree-plantation"
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background scroll-mt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Visual Species Selection */}
          <div className="tree-animate-left order-2 lg:order-1 glass-panel p-8 rounded-block bg-white relative">
            <div className="absolute top-4 right-6 text-xs uppercase font-extrabold tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Ecology
            </div>
            <h3 className="text-2xl font-extrabold text-foreground mb-6 font-heading">
              Sown & Nurtured Saplings
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SPECIES.map((spec, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-emerald-200 hover:bg-emerald-50/10 transition-all duration-300"
                >
                  <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 block font-heading">
                    {spec.count}
                  </span>
                  <h4 className="text-sm font-bold text-foreground mt-1 font-sans">
                    {spec.name}
                  </h4>
                  <p className="text-[10px] uppercase tracking-widest text-slate-grey font-semibold mt-1">
                    {spec.type}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center text-xs text-slate-grey font-medium">
              🌱 Saplings are monitored and watered under our Sunday Care initiatives.
            </div>
          </div>

          {/* Right Column: Info & Stats */}
          <div className="tree-animate-right order-1 lg:order-2 space-y-6">
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest block">
              Environmental Revival • Vasundhara
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading leading-tight">
              Restoring Eco-Balance to <br />
              <span className="text-emerald-600 text-outline-festive hover:text-emerald-600">Barren Slopes</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-grey leading-relaxed">
              Industrial progress and hill weathering have reduced local tree cover. Through project **Vasundhara**, Shree Prathishthan mobilizes citizen groups on weekends to clear plastic, construct water catchments, and plant native fruit and shade trees.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold text-emerald-600 font-heading">5,000+</span>
                <span className="text-xs uppercase font-bold tracking-widest text-slate-grey">
                  Saplings Planted
                </span>
              </div>
              <div className="w-px h-10 bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold text-emerald-600 font-heading">4+ Hills</span>
                <span className="text-xs uppercase font-bold tracking-widest text-slate-grey">
                  Actively Restored
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
