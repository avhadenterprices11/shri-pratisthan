"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedFestivals() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-fest-panel",
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Celebrations</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Featured Festivals
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Panel 1 */}
          <div className="featured-fest-panel glass-panel p-8 sm:p-12 rounded-block bg-white flex flex-col justify-between hover:border-saffron/30 hover:shadow-2xl transition-all duration-500">
            <div>
              <span className="text-[10px] text-saffron uppercase font-bold tracking-widest">Shree Ganeshotsav</span>
              <h3 className="text-3xl font-extrabold text-foreground mt-2 mb-6 font-heading">Ecological Devotion</h3>
              <p className="text-base text-slate-grey leading-relaxed mb-6">
                Our Ganeshotsav focuses heavily on environmental protection. We construct traditional Mandap infrastructure using clay sculpture modeling and coordinate massive Dhol Tasha musical parades.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-slate-grey">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                  Free medical checkup clinics inside the Mandap
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                  Water tanks for safe immersion (Visarjan)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                  150+ trained security volunteers on standby
                </li>
              </ul>
            </div>
            <a 
              href="#register"
              className="text-center bg-saffron hover:bg-saffron/90 text-white font-extrabold py-4 rounded-full text-xs uppercase tracking-widest transition-all hover:scale-[1.01]"
            >
              Register As Ganeshotsav Volunteer
            </a>
          </div>

          {/* Panel 2 */}
          <div className="featured-fest-panel glass-panel p-8 sm:p-12 rounded-block bg-white flex flex-col justify-between hover:border-gold/30 hover:shadow-2xl transition-all duration-500">
            <div>
              <span className="text-[10px] text-gold uppercase font-bold tracking-widest">Dahi Handi Utsav</span>
              <h3 className="text-3xl font-extrabold text-foreground mt-2 mb-6 font-heading">Safety & Coordination</h3>
              <p className="text-base text-slate-grey leading-relaxed mb-6">
                Redefining the sport of Dahi Handi. We focus on extreme safety parameters: safety nets, head protection harnesses, and detailed team registration logs to support athletic youth coordinates.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-slate-grey">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Safety helmets and foam mat protection layouts
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Immediate trauma ambulance standby
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Proceedings route to local child education support
                </li>
              </ul>
            </div>
            <a 
              href="#register"
              className="text-center bg-foreground hover:bg-saffron hover:text-white text-background font-extrabold py-4 rounded-full text-xs uppercase tracking-widest transition-all hover:scale-[1.01]"
            >
              Register As Dahi Handi Volunteer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
