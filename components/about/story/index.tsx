"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".story-slide-in",
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
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Narrative Headline */}
          <div className="lg:col-span-5 story-slide-in">
            <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Our Roots</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-6 font-heading">
              Born from a Passion for <span className="text-saffron">Community</span>
            </h2>
            <div className="w-12 h-1 bg-gold rounded-full mb-8" />
            <blockquote className="border-l-4 border-saffron pl-6 italic text-slate-grey text-lg leading-relaxed mb-6">
              "We realized that the immense energy gathered during our annual cultural celebrations could be directed to help solve local community issues year-round."
            </blockquote>
          </div>

          {/* Right Column: Detailed Narrative */}
          <div className="lg:col-span-7 story-slide-in space-y-6 text-slate-grey text-base leading-relaxed">
            <p>
              Shree Prathishthan was conceptualized in Shivaji Park, Mumbai, initially as a small, informal collective of youth volunteers dedicated to organizing safe and orderly logistics during regional Ganeshotsav festivals. Over the years, the sheer volume of volunteer enthusiasm inspired a larger vision.
            </p>
            <p>
              In 2018, the group formally structured itself, registering under the Bombay Public Trust Act as a public charitable institution. The goal was simple yet profound: to prevent cultural pride from becoming static history, translating it instead into immediate social progress, emergency relief, and rural empowerment campaigns.
            </p>
            <p>
              Today, Shree Prathishthan acts as a vital bridge between urban resources and rural development needs. By organizing massive healthcare drives, executing notebook distributions across deforested village zones, and structuring eco-friendly cultural festivals, we demonstrate that legacy and care belong together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
