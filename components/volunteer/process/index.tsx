"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StageItem {
  step: string;
  title: string;
  desc: string;
}

const STAGES: StageItem[] = [
  {
    step: "01",
    title: "Online Intake Form",
    desc: "Submit your basic information, interests, and availability in the registration form below in under 2 minutes.",
  },
  {
    step: "02",
    title: "Alignment Connection",
    desc: "Our community team schedules a quick 10-minute checkup call to align your skills with active program roles.",
  },
  {
    step: "03",
    title: "Orientation Briefing",
    desc: "Join a short virtual onboarding session outlining safety parameters, code-of-conduct guidelines, and coordinators.",
  },
  {
    step: "04",
    title: "Active Field Deployment",
    desc: "Report to your designated regional drive (blood camps, ecology plantation, relief) and begin driving change.",
  },
];

const ANGLES = [-45, -15, 15, 45]; // Crescent node angles in degrees

export default function VolunteerProcess() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dialRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollTriggerInstance = useRef<any>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop viewports: Pinned Scroll-Scrubbed Half-Circle Dial
    mm.add("(min-width: 768px)", () => {
      if (!dialRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: "#processPinContainer",
        start: "top top",
        end: "+=150%",
        scrub: 0.5,
        pin: true,
        pinSpacing: true, // Explicitly enforce layout spacer padding
        anticipatePin: 1, // Prevent scroll jitter on pin start
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // Map scroll progress (0 to 1) to step index (0 to 3)
          const index = Math.min(
            Math.floor(progress * STAGES.length),
            STAGES.length - 1
          );
          if (index !== activeIdxRef.current) {
            activeIdxRef.current = index;
            setActiveIdx(index);
          }
        },
      });

      scrollTriggerInstance.current = trigger;

      // Animate dial rotation manually via scroll scrub timeline
      gsap.fromTo(
        dialRef.current,
        { rotation: 45 },
        {
          rotation: -45,
          ease: "none",
          scrollTrigger: {
            trigger: "#processPinContainer",
            start: "top top",
            end: "+=150%",
            scrub: 0.5,
            pinSpacing: true,
          },
        }
      );
    });

    // Mobile fallback viewports: Simple scroll reveal entrance
    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        ".process-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    });

    // Force recalculate scroll positions after a short delay
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      mm.revert();
      clearTimeout(refreshTimer);
    };
  }, []);

  // Micro fade-and-slide up animation when activeIdx switches
  useEffect(() => {
    if (!detailsRef.current) return;
    
    gsap.fromTo(
      detailsRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, [activeIdx]);

  const handleStepClick = (idx: number) => {
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop && scrollTriggerInstance.current) {
      const start = scrollTriggerInstance.current.start;
      const end = scrollTriggerInstance.current.end;
      // Scroll proportionally to snap to selected step offset
      const progress = idx / (STAGES.length - 1);
      const scrollPos = start + (end - start) * progress;
      window.scrollTo({
        top: scrollPos,
        behavior: "smooth",
      });
    } else {
      setActiveIdx(idx);
    }
  };

  return (
    <div 
      id="processPinContainer" 
      ref={containerRef} 
      className="bg-background relative w-full md:h-screen md:min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 z-0 animate-pulse" />
      
      <div className="relative z-10 w-full flex flex-col justify-center py-16 md:py-0 overflow-hidden process-reveal">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12 px-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight font-heading leading-tight">
            Our Onboarding Process
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        {/* 2-Column Dial Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center px-6 md:px-12 max-w-6xl mx-auto w-full">
          
          {/* Left Column: Radial Dial (Left-shifted half-circle) */}
          <div className="hidden md:col-span-5 md:flex items-center justify-center relative overflow-hidden h-[340px] md:h-[380px] w-full">
            {/* The Rotating Dial Circle (Translated left by exactly half-width to show only right half) */}
            <div 
              ref={dialRef}
              className="absolute -left-[150px] lg:-left-[180px] w-[300px] h-[300px] lg:w-[360px] lg:h-[360px] rounded-full border-2 border-dashed border-saffron/20 flex items-center justify-center [--dial-radius:120px] lg:[--dial-radius:145px]"
            >
              {/* Crescent Step Nodes */}
              {STAGES.map((stage, index) => {
                const isActive = activeIdx === index;
                const angle = ANGLES[index];
                
                return (
                  <button
                    key={stage.step}
                    onClick={() => handleStepClick(index)}
                    className={`absolute w-12 h-12 rounded-full border flex items-center justify-center text-sm font-extrabold font-heading shadow-md cursor-pointer transition-all duration-300 ${
                      isActive 
                        ? "bg-saffron text-white border-saffron scale-110 shadow-lg shadow-saffron/30 z-20" 
                        : "bg-white text-slate-grey border-black/8 hover:border-saffron hover:text-saffron z-10"
                    }`}
                    style={{
                      transform: `rotate(${angle}deg) translateX(var(--dial-radius)) rotate(${-angle}deg)`,
                    }}
                  >
                    {stage.step}
                  </button>
                );
              })}
            </div>

            {/* Glowing active selector arrow at the apex center line */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-saffron rotate-45 rounded-sm z-30 shadow-md shadow-saffron/20" />
          </div>

          {/* Mobile Fallback: Horizontal step pills */}
          <div className="flex md:hidden flex-row gap-3 overflow-x-auto pb-4 scrollbar-none w-full">
            {STAGES.map((stage, index) => {
              const isActive = activeIdx === index;
              return (
                <button
                  key={stage.step}
                  onClick={() => handleStepClick(index)}
                  className={`px-5 py-2.5 rounded-full border text-xs font-extrabold tracking-wider uppercase shrink-0 transition-all duration-300 ${
                    isActive 
                      ? "bg-saffron border-saffron text-white shadow-lg" 
                      : "bg-transparent border-black/8 text-slate-grey"
                  }`}
                >
                  Step {stage.step}
                </button>
              );
            })}
          </div>

          {/* Right Column: Display Card Panel */}
          <div className="md:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-block bg-white border border-saffron/15 shadow-2xl relative min-h-[220px] sm:min-h-[200px] flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-20 z-0" />
              
              <div ref={detailsRef} className="relative z-10 text-left">
                
                {/* Stage Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-4 font-heading">
                  {STAGES[activeIdx].title}
                </h3>
                
                {/* Description */}
                <p className="text-slate-grey text-base sm:text-lg leading-relaxed font-sans">
                  {STAGES[activeIdx].desc}
                </p>
              </div>

              {/* Progress Tracker Footer */}
              <div className="relative z-10 mt-8 pt-6 border-t border-saffron/10 flex justify-end items-center text-xs uppercase font-extrabold tracking-widest text-slate-grey font-heading">
                <span>Scroll to Advance</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
