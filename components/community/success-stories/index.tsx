"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STORIES = [
  {
    title: "A Study Desk of One's Own",
    beneficiary: "Rahul Gavit, 5th Grade Student",
    location: "Karjat Tribal School",
    story: "Rahul used to write his homework sitting on a mud floor under a dim lamp. Since Shree Prathishthan donated dual-study desks and educational kits to his school, Rahul and his classmates can study comfortably, showing a marked improvement in focus and attendance.",
    imageText: "📚",
    accent: "border-saffron/30 text-saffron bg-saffron/5",
  },
  {
    title: "Emergency Units Saves a Father's Life",
    beneficiary: "Mahendra Patil, Heart Surgery Patient",
    location: "Bhandup General Hospital",
    story: "During an emergency bypass surgery, Mahendra's family was desperately searching for O-negative blood units. Shree Prathishthan's active emergency blood donor registry coordinates immediate response, dispatching a donor within 30 minutes to complete the transfusion.",
    imageText: "❤️",
    accent: "border-red-500/30 text-red-500 bg-red-500/5",
  },
  {
    title: "Restoring the Bhandup Slope Ecosystem",
    beneficiary: "Anjali Tambe, Eco-Volunteer Coordinator",
    location: "Bhandup Green Hills Project",
    story: "Two years ago, the hill slopes behind the township were barren and used for illegal trash dumping. Under Project Vasundhara, we cleared tons of waste and nurtured 1,500+ saplings. Today, birds have returned, soil run-off has stabilized, and green cover has expanded.",
    imageText: "🌱",
    accent: "border-emerald-500/30 text-emerald-500 bg-emerald-500/5",
  },
];

export default function SuccessStories() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stories-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
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

  const handleNext = () => {
    // Fade out current slide
    gsap.to(cardRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      onComplete: () => {
        setActiveIdx((prev) => (prev + 1) % STORIES.length);
        // Set initial state for new slide
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
        );
      },
    });
  };

  const handlePrev = () => {
    // Fade out current slide
    gsap.to(cardRef.current, {
      opacity: 0,
      x: 20,
      duration: 0.3,
      onComplete: () => {
        setActiveIdx((prev) => (prev - 1 + STORIES.length) % STORIES.length);
        // Set initial state for new slide
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
        );
      },
    });
  };

  const currentStory = STORIES[activeIdx];

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40" />
      <div className="max-w-5xl mx-auto relative z-10 stories-reveal">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">
            Testimonials of Hope
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Stories of Transformation
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[400px] flex flex-col justify-between">
          <div
            ref={cardRef}
            className={`glass-panel p-8 sm:p-12 rounded-block flex flex-col md:flex-row gap-8 items-center bg-white border border-saffron/15 shadow-xl`}
          >
            {/* Story Icon/Avatar */}
            <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 flex items-center justify-center text-4xl sm:text-5xl shadow-md ${currentStory.accent} flex-shrink-0`}>
              {currentStory.imageText}
            </div>

            {/* Content block */}
            <div className="flex-grow space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-saffron/10 text-saffron px-2.5 py-1 rounded">
                  {currentStory.location}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-slate-100 text-slate-grey px-2.5 py-1 rounded">
                  {currentStory.beneficiary}
                </span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">
                {currentStory.title}
              </h3>
              
              <p className="text-slate-grey leading-relaxed text-sm sm:text-base italic">
                “{currentStory.story}”
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            <div className="text-xs uppercase font-extrabold tracking-widest text-slate-grey">
              Story {activeIdx + 1} of {STORIES.length}
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                aria-label="Previous story"
                className="w-12 h-12 rounded-full border border-saffron/20 hover:border-saffron text-saffron hover:bg-saffron/5 flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                aria-label="Next story"
                className="w-12 h-12 rounded-full border border-saffron/20 hover:border-saffron text-saffron hover:bg-saffron/5 flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
