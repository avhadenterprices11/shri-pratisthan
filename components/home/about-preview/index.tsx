"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Reveal header text characters or words
      gsap.fromTo(
        ".about-text-reveal",
        { opacity: 0.1, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 1.2,
          scrollTrigger: {
            trigger: ".about-text-trigger",
            start: "top 80%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );

      // Staggered slide in for the key pillars cards
      gsap.fromTo(
        ".about-pillar-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.0,
          scrollTrigger: {
            trigger: ".about-pillars-trigger",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef} 
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-white/40 border-y border-saffron/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Heading & Large Text */}
          <div className="lg:col-span-6 about-text-trigger">
            <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Who We Are</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-8 font-heading">
              <span className="about-text-reveal block">Bridging Legacy</span>
              <span className="about-text-reveal block text-saffron">And Social Progress</span>
            </h2>
            <p className="text-lg text-slate-grey leading-relaxed mb-6">
              Shree Prathishthan is a registered public charitable institution operating out of Maharashtra. Founded on principles of cultural reverence, we channel local energy during grand celebrations into continuous social action.
            </p>
            <p className="text-base text-slate-grey/80 leading-relaxed mb-8">
              Whether organizing the athletic heights of Dahi Handi, the mass devotional gatherings of Ganeshotsav, or rural education checkups, we believe true culture lives through human service.
            </p>
          </div>

          {/* Right Column: Key Pillars Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 about-pillars-trigger">
            {/* Pillar 1 */}
            <div className="about-pillar-card glass-panel glass-panel-hover p-6 rounded-block">
              <div className="w-12 h-12 rounded-full bg-saffron/10 flex items-center justify-center text-saffron mb-6">
                <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-heading">Cultural Integrity</h3>
              <p className="text-sm text-slate-grey leading-relaxed">
                Hosting pristine festivals that protect the identity, music, and performance heritage of Maharashtra.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="about-pillar-card glass-panel glass-panel-hover p-6 rounded-block">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6">
                <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-heading">Healthcare Drives</h3>
              <p className="text-sm text-slate-grey leading-relaxed">
                Free diagnostic checks, diagnostics and blood donation camps matching regional public demands.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="about-pillar-card glass-panel glass-panel-hover p-6 rounded-block sm:col-span-2">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-6">
                <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-heading">Rural Empowerment</h3>
              <p className="text-sm text-slate-grey leading-relaxed">
                Empowering backward regions with books, primary tools, health counseling, and water management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
