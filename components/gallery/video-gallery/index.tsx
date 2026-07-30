"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VIDEOS = [
  { title: "Dahi Handi Safe Pyramid Coordination", duration: "1:24", colorClass: "bg-blue-100", emoji: "🏺" },
  { title: "Ganeshotsav Traditional Drum Ensembles", duration: "2:10", colorClass: "bg-amber-100", emoji: "🥁" },
  { title: "Vasundhara Hill Tree Plantation Drive Log", duration: "1:45", colorClass: "bg-green-100", emoji: "🌱" },
];

export default function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".video-card",
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-white"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-50" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Motion Archives</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Video Reels
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VIDEOS.map((item, index) => (
            <div 
              key={index}
              onClick={() => setActiveVideo(item.title)}
              className="video-card glass-panel rounded-block overflow-hidden relative group cursor-none hover:shadow-2xl transition-all duration-300"
              data-hover="pointer"
            >
              {/* Visual wrapper */}
              <div className={`h-[220px] ${item.colorClass} flex items-center justify-center text-7xl select-none group-hover:scale-105 transition-transform duration-500`}>
                {item.emoji}
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-saffron shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 fill-current stroke-current" viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="p-6 bg-white border-t border-saffron/10 flex justify-between items-center">
                <div>
                  <h3 className="text-base font-extrabold text-foreground font-heading">{item.title}</h3>
                  <span className="text-xs text-slate-grey font-bold tracking-widest uppercase">Duration: {item.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6">
          <div className="glass-panel w-full max-w-4xl rounded-block bg-white p-6 relative">
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 text-slate-800 font-extrabold text-xl hover:text-saffron transition-colors focus:outline-none"
            >
              ✕ Close
            </button>
            <div className="text-center py-20 bg-saffron/5 rounded-block border border-saffron/20 mb-6 flex flex-col justify-center items-center">
              <span className="text-6xl mb-4">🎬</span>
              <h3 className="text-2xl font-extrabold text-foreground font-heading">{activeVideo}</h3>
              <p className="text-slate-grey text-sm mt-2">Connecting to Shree Prathishthan CDN Media Stream...</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
