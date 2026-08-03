"use client";

import React, { useEffect, useRef } from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !portalRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrance timeline on load
      const entryTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      gsap.set(".reveal-char", { y: 120, rotateX: 60, opacity: 0 });
      gsap.set(".left-desc, .right-desc, .portal-video-frame", { opacity: 0, scale: 0.95 });

      entryTl
        .to(".portal-video-frame", { opacity: 1, scale: 1, duration: 1.4 })
        .to(".reveal-char", { y: 0, rotateX: 0, opacity: 1, stagger: 0.04, duration: 1.2 }, "-=1.0")
        .to(".left-desc, .right-desc", { opacity: 1, scale: 1, duration: 1.0 }, "-=0.8");

      // 2. Scroll-controlled Portal Zoom Timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1200",
          pin: true,
          scrub: 1,
        }
      });

      scrollTl
        // Zoom and flatten the arched video portal to full viewport
        .to(portalRef.current, {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          borderWidth: "0px",
          boxShadow: "none",
          ease: "power2.inOut",
        }, 0)
        // Move the left-side text out of screen
        .to(".left-text-wrapper", {
          xPercent: -150,
          opacity: 0,
          ease: "power1.inOut",
        }, 0)
        // Move the right-side text out of screen
        .to(".right-text-wrapper", {
          xPercent: 150,
          opacity: 0,
          ease: "power1.inOut",
        }, 0)
        // Fade out Mesh Shader background
        .to(".mesh-gradient-bg", {
          opacity: 0,
          ease: "power1.inOut",
        }, 0)
        // Fade in full screen editorial content overlay
        .fromTo(".overlay-content", 
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const TITLE_WORD_1 = "OUR";
  const TITLE_WORD_2 = "LEGACY";

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[180vh] bg-slate-950 overflow-hidden select-none"
    >
      {/* Pinned Viewport Wrapper */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10">
        
        {/* 1. Dynamic WebGL Shader Background (fades out on scroll) */}
        <div className="mesh-gradient-bg absolute inset-0 z-0 pointer-events-none opacity-40">
          <MeshGradient
            colors={["#FFFDF9", "#FFEED9", "#F7D8A2", "#E26A36", "#E9A851"]}
            distortion={0.35}
            swirl={0.15}
            grainMixer={0.1}
            grainOverlay={0.06}
            speed={0.1}
            className="w-full h-full"
          />
        </div>

        {/* 2. Grid Lines overlay (fades out as portal scales) */}
        <div 
          className="mesh-gradient-bg absolute inset-0 pointer-events-none opacity-15 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(226, 106, 54, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(226, 106, 54, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px"
          }}
        />

        {/* 3. Left Editorial Text Panel */}
        <div className="left-text-wrapper absolute left-4 sm:left-6 lg:left-8 z-20 flex flex-col items-start gap-5 max-w-xs md:max-w-sm pointer-events-none">
          <div className="hero-badge inline-flex items-center gap-2 bg-saffron/10 text-saffron font-bold text-xs uppercase tracking-widest px-4.5 py-2 rounded-full border border-saffron/20 shadow-sm backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
            <span>Foundations</span>
          </div>

          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter font-heading uppercase flex gap-1">
            {TITLE_WORD_1.split("").map((char, i) => (
              <span key={i} className="reveal-char inline-block cursor-default">{char}</span>
            ))}
          </h2>

          <p className="left-desc text-white/70 text-xs sm:text-sm font-sans font-light leading-relaxed">
            Preserving cultural roots while building transparent, youth-led community progress across Maharashtra. Estd 2012.
          </p>
        </div>

        {/* 4. Right Editorial Text Panel */}
        <div className="right-text-wrapper absolute right-4 sm:right-6 lg:right-8 z-20 flex flex-col items-end text-right gap-5 max-w-xs md:max-w-sm pointer-events-none">
          
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-saffron leading-[0.85] tracking-tighter font-heading uppercase flex gap-1">
            {TITLE_WORD_2.split("").map((char, i) => (
              <span key={i} className="reveal-char inline-block cursor-default">{char}</span>
            ))}
          </h2>

          <div className="right-desc text-white/50 text-[10px] uppercase font-bold tracking-widest leading-relaxed border-t border-saffron/20 pt-4 flex flex-col gap-1">
            <span>✦ Estd 2012 Maharashtra</span>
            <span>✦ 10K+ Active Volunteers</span>
            <span>✦ 50+ Ongoing Initiatives</span>
          </div>
        </div>

        {/* 5. Center Zoom Square Video Portal */}
        <div
          ref={portalRef}
          className="portal-video-frame absolute w-[280px] sm:w-[360px] aspect-square overflow-hidden rounded-[2.5rem] border border-saffron/30 shadow-[0_0_50px_rgba(226,106,54,0.12)] z-30 bg-slate-950"
        >
          {/* Internal Border Trim */}
          <div className="absolute inset-0 border border-saffron/10 rounded-[2.5rem] pointer-events-none z-20" />
          
          <video
            className="absolute inset-0 w-full h-full object-cover scale-105"
            src="/Create_a_cinematic_second_h.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent z-10" />
        </div>

        {/* 6. Cinematic Editorial Overlay (fades in when portal zooms full bleed) */}
        <div className="overlay-content absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-6 pointer-events-none bg-slate-950/60 backdrop-blur-sm">
          
          <div className="inline-flex items-center gap-2 mb-6 bg-saffron/15 text-saffron font-bold text-xs uppercase tracking-widest px-5 py-2 rounded-full border border-saffron/35 shadow-lg backdrop-blur-md">
            <span>Shree Prathishthan Trust</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] font-heading uppercase max-w-4xl mb-6 tracking-tighter">
            A Decade of Devotion <br className="hidden sm:inline" />
            <span className="text-saffron">& community service</span>
          </h2>
          
          <p className="text-white/80 text-sm sm:text-base max-w-xl font-light font-sans leading-relaxed">
            From coordinating the historic Dhol Tasha musical troupes to establishing disaster relief forces and eco-friendly Ganesha workshops, our progress is powered by volunteer transparency.
          </p>

        </div>

      </div>
    </section>
  );
}
