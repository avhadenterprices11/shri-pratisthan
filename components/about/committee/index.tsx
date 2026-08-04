"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutCommittee() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrance staggered fade reveal
      gsap.fromTo(
        ".committee-member-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
          },
        }
      );

      // 2. Interactive mouse tilt & magnetic pulls on cards (Desktop only)
      const cards = gsap.utils.toArray<HTMLElement>(".committee-member-card");
      cards.forEach((card) => {
        const avatar = card.querySelector(".committee-avatar");
        const watermark = card.querySelector(".committee-watermark");

        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const mouseX = e.clientX - rect.left - rect.width / 2;
          const mouseY = e.clientY - rect.top - rect.height / 2;

          // 3D Card Tilt
          gsap.to(card, {
            rotateY: mouseX * 0.05,
            rotateX: -mouseY * 0.05,
            transformPerspective: 800,
            duration: 0.5,
            ease: "power2.out",
          });

          // Parallax background watermark shift
          if (watermark) {
            gsap.to(watermark, {
              x: -mouseX * 0.12,
              y: -mouseY * 0.12,
              duration: 0.5,
              ease: "power2.out",
            });
          }

          // Magnetic Avatar pull
          if (avatar) {
            gsap.to(avatar, {
              x: mouseX * 0.15,
              y: mouseY * 0.15,
              duration: 0.4,
              ease: "power2.out",
            });
          }
        };

        const handleMouseLeave = () => {
          // Reset elements smoothly
          gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
          if (watermark) gsap.to(watermark, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
          if (avatar) gsap.to(avatar, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-24 px-6 md:px-12 xl:px-24 bg-[#FFFDF9] border-t border-saffron/10 relative overflow-hidden select-none z-10"
    >
      {/* Background Grid Accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 106, 54, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 106, 54, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-saffron/15 mb-16 relative z-10">
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-800 font-heading uppercase leading-none">
              Trust Governance Committee
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-grey max-w-md font-sans font-light leading-relaxed">
            Our core administrators bring together creative direction, medical organization, and logistics deployment parameters to guide daily operations.
          </p>
        </div>

        {/* Asymmetrical Split Editorial Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch w-full">
          
          {/* Left Column: Founder Card (Taller Focus Frame) */}
          <div className="w-full lg:w-1/2 flex">
            <div className="committee-member-card w-full min-h-[440px] bg-white border border-saffron/15 rounded-[3rem] p-10 flex flex-col justify-between items-start shadow-xl shadow-saffron/5 group hover:border-saffron/30 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              
              {/* Saffron Initials Watermark */}
              <div className="committee-watermark absolute right-0 top-0 text-[18rem] font-black text-saffron/5 select-none leading-none -translate-y-16 translate-x-12 font-heading pointer-events-none transition-colors duration-500">
                A
              </div>

              {/* Avatar Indicator */}
              <div className="committee-avatar w-24 h-24 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-xl font-bold font-heading text-saffron shadow-md relative z-10">
                AC
              </div>

              {/* Founder Text */}
              <div className="relative z-10 mt-12 text-left">
                <span className="text-xs font-bold text-saffron uppercase tracking-widest block mb-2">Founder & Lead Creative Director</span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading uppercase leading-none mb-4 group-hover:text-saffron transition-colors duration-300">
                  Aarti Shantaram Chavan
                </h3>
                <p className="text-xs sm:text-sm text-slate-grey font-sans font-light leading-relaxed max-w-md">
                  Pioneered the trust registration and guides all visual design, cultural musical troupe setups, and eco-friendly Ganeshotsav coordination models.
                </p>
              </div>

              {/* Footer Stamp */}
              <div className="border-t border-saffron/10 w-full pt-4 mt-6 text-[10px] text-slate-grey uppercase font-bold tracking-wider relative z-10 text-left">
                Active Member since foundation • Verified Administrator
              </div>

            </div>
          </div>

          {/* Right Column: Stacked Trustees (Two Shorter Horizontal Cards) */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            
            {/* Dr. Mangesh (Chairman) */}
            <div className="committee-member-card w-full min-h-[204px] bg-white border border-saffron/15 rounded-[2.5rem] p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl shadow-saffron/5 group hover:border-saffron/30 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="committee-watermark absolute right-0 top-0 text-[12rem] font-black text-saffron/5 select-none leading-none -translate-y-8 translate-x-8 font-heading pointer-events-none">
                M
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
                <div className="committee-avatar w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-lg font-bold font-heading text-emerald-600 shadow-sm">
                  MB
                </div>
                <div className="flex flex-col items-start text-left max-w-sm">
                  <span className="text-[10px] font-bold text-saffron uppercase tracking-wider mb-1">Chairman & Medical Coordinator</span>
                  <h3 className="text-xl font-black text-slate-800 font-heading uppercase leading-tight group-hover:text-saffron transition-colors">
                    Dr. Mangesh Sudhkar Bange
                  </h3>
                  <p className="text-xs text-slate-grey font-sans font-light mt-1">
                    Directs rural diagnostic medical desks, coordinates city hospital links, and manages health care camps.
                  </p>
                </div>
              </div>

              <div className="text-[10px] text-slate-grey uppercase font-bold tracking-wider self-start sm:self-center relative z-10 pt-4 sm:pt-0 sm:border-l border-saffron/15 sm:pl-6">
                Since 2018
              </div>
            </div>

            {/* Sanjay Sawant (Field Logistics) */}
            <div className="committee-member-card w-full min-h-[204px] bg-white border border-saffron/15 rounded-[2.5rem] p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl shadow-saffron/5 group hover:border-saffron/30 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="committee-watermark absolute right-0 top-0 text-[12rem] font-black text-saffron/5 select-none leading-none -translate-y-8 translate-x-8 font-heading pointer-events-none">
                S
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
                <div className="committee-avatar w-20 h-20 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-lg font-bold font-heading text-blue-600 shadow-sm">
                  SS
                </div>
                <div className="flex flex-col items-start text-left max-w-sm">
                  <span className="text-[10px] font-bold text-saffron uppercase tracking-wider mb-1">Lead Field Logistics Organizer</span>
                  <h3 className="text-xl font-black text-slate-800 font-heading uppercase leading-tight group-hover:text-saffron transition-colors">
                    Sanjay Sawant
                  </h3>
                  <p className="text-xs text-slate-grey font-sans font-light mt-1">
                    Guides emergency response logistics, handles cargo supply deployment, and organizes village setup volunteers.
                  </p>
                </div>
              </div>

              <div className="text-[10px] text-slate-grey uppercase font-bold tracking-wider self-start sm:self-center relative z-10 pt-4 sm:pt-0 sm:border-l border-saffron/15 sm:pl-6">
                Since 2018
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
