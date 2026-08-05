"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VIDEOS = [
  { 
    title: "Dahi Handi Safe Pyramid Coordination", 
    duration: "1:24", 
    src: "/festival_celebration.mp4", 
    poster: "/gallery_dahi_handi_pyramids.png" 
  },
  { 
    title: "Ganeshotsav Traditional Drum Ensembles", 
    duration: "2:10", 
    src: "/festival_drums.mp4", 
    poster: "/gallery_dhol_tasha_camps.png" 
  },
  { 
    title: "Vasundhara Hill Tree Planting Drive Log", 
    duration: "1:45", 
    src: "/about_showcase_video.mp4", 
    poster: "/volunteer_eco.png" 
  },
  { 
    title: "Gauri Ganpati Home Decor Showcase", 
    duration: "1:30", 
    src: "/Create_a_cinematic_second_h.mp4", 
    poster: "/gallery_gauri_ganpati_decor.png" 
  },
  { 
    title: "Shiv Jayanti Cultural Rally Highlights", 
    duration: "2:45", 
    src: "/festival_drums.mp4", 
    poster: "/gallery_shiv_jayanti_rally.png" 
  },
  { 
    title: "Emergency Disaster Relief Operations", 
    duration: "2:05", 
    src: "/about_showcase_video.mp4", 
    poster: "/volunteer_disaster.png" 
  },
];

export default function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState<{ title: string; src: string } | null>(null);
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-50" />
      <div className="max-w-[1600px] w-full mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Video Reels
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VIDEOS.map((item, index) => (
            <div 
              key={index}
              onClick={() => setActiveVideo({ title: item.title, src: item.src })}
              className="video-card glass-panel rounded-block overflow-hidden relative group cursor-pointer hover:shadow-2xl transition-all duration-300"
              data-hover="pointer"
            >
              {/* Visual wrapper */}
              <div className="h-[220px] relative overflow-hidden flex items-center justify-center text-7xl select-none">
                <Image 
                  src={item.poster} 
                  alt={item.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity z-10">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-saffron shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 fill-current stroke-current ml-1" viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="p-6 bg-white border-t border-saffron/10 flex justify-between items-center relative z-20">
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
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="w-full max-w-4xl rounded-block bg-neutral-900 border border-white/10 p-4 relative shadow-2xl flex flex-col gap-4">
            <div className="flex justify-between items-center text-white border-b border-white/10 pb-2">
              <h3 className="text-lg sm:text-xl font-extrabold font-heading text-saffron">{activeVideo.title}</h3>
              <button 
                onClick={() => setActiveVideo(null)}
                className="text-white hover:text-saffron font-bold text-sm tracking-widest uppercase transition-colors focus:outline-none cursor-pointer flex items-center gap-1.5"
              >
                ✕ Close
              </button>
            </div>
            
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-white/5 shadow-inner">
              <video 
                src={activeVideo.src} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
