"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VOLUNTEER_TESTIMONIALS = [
  {
    quote: "Working on the Ganeshotsav logistics safety team was a massive learning experience. Coordinating queues of thousands taught me teamwork and composure under pressure.",
    name: "Swapnil Mehta",
    role: "Management Student",
    avatar: "🧑‍🎓",
  },
  {
    quote: "Project Vasundhara allowed me to contribute to forest recovery directly. Seeing our saplings root and grow over seasons makes every Sunday climb completely worth it.",
    name: "Priya Deshpande",
    role: "Environmental Volunteer",
    avatar: "👩‍🌾",
  },
  {
    quote: "The operations setup is highly organized. Every medical camp has pre-assigned tasks and resource logs, which helps volunteers deliver aid efficiently.",
    name: "Dr. Rohan Sen",
    role: "Volunteer Doctor",
    avatar: "👨‍⚕️",
  },
];

export default function VolunteerTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
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
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-50" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Voices</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Volunteer Experiences
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VOLUNTEER_TESTIMONIALS.map((item, index) => (
            <div
              key={index}
              className="testimonial-card glass-panel p-8 rounded-block flex flex-col justify-between hover:border-saffron/30 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div>
                <div className="text-4xl text-saffron opacity-30 mb-4">“</div>
                <p className="text-slate-grey leading-relaxed italic mb-6">
                  {item.quote}
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-saffron/10 pt-6">
                <div className="w-10 h-10 rounded-full bg-saffron/10 flex items-center justify-center text-lg shadow-sm border border-saffron/10">
                  {item.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-foreground font-heading">{item.name}</h4>
                  <p className="text-xs text-slate-grey">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
