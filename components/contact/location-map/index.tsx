"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".map-animate-left",
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
        ".map-animate-right",
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
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background border-b border-saffron/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-saffron/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Office visiting details */}
          <div className="map-animate-left space-y-6">
            <span className="text-saffron font-bold text-xs uppercase tracking-widest block">
              Office Visits
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading leading-tight">
              Coordinate Your <br />
              <span className="text-saffron text-outline-festive">Office Visits</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-grey leading-relaxed">
              We welcome donors, event coordinators, and trust patrons to our registered head office in Bhandup. To ensure administrative availability, please connect with a coordinator or send a message ahead of your visit.
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-1">🗓️</span>
                <div>
                  <h4 className="font-bold text-foreground font-sans">Visiting Hours</h4>
                  <p className="text-sm text-slate-grey mt-0.5">
                    Monday to Friday: 10:00 AM – 5:00 PM <br />
                    Saturday: 10:00 AM – 1:00 PM (By prior appointment only)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Stylized Map Box */}
          <div className="map-animate-right glass-panel p-8 rounded-block bg-white relative flex flex-col justify-between min-h-[350px] shadow-xl">
            <div className="absolute top-4 right-6 text-xs uppercase font-extrabold tracking-widest text-saffron bg-saffron/5 px-3 py-1 rounded-full border border-saffron/10">
              HQ Location
            </div>
            
            <div>
              <h3 className="text-2xl font-extrabold text-foreground mb-4 font-heading">
                Bhandup Headquarters
              </h3>
              <p className="text-sm text-slate-grey mb-6">
                Located near Bhandup station, giving easy accessibility via Eastern Express Highway or Central Railway.
              </p>
              
              {/* Graphic/Stylized Map Mockup */}
              <div className="w-full h-40 bg-saffron/5 rounded-xl border border-saffron/10 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-50" />
                <span className="text-4xl animate-bounce">📍</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-grey mt-2">
                  Station Road, Bhandup (E)
                </span>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-foreground hover:bg-saffron hover:shadow-lg hover:shadow-saffron/20 text-background hover:text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 active:scale-95 inline-block cursor-pointer"
              >
                Navigate via Google Maps
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
