"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const MARQUEE_ITEMS = [
  {
    title: "Ganeshotsav Aarthi",
    tag: "Festival",
    image: "/gallery_ganeshotsav_aarthi.png",
    icon: "🕉️",
  },
  {
    title: "Naad Pathak Practice",
    tag: "Music",
    image: "/gallery_dhol_tasha_camps.png",
    icon: "🥁",
  },
  {
    title: "Govinda Pyramid Target",
    tag: "Athletics",
    image: "/gallery_dahi_handi_pyramids.png",
    icon: "🏺",
  },
  {
    title: "Navratri Dandiya Garba",
    tag: "Navratri",
    image: "/gallery_navratri_garba.png",
    icon: "💃",
  },
  {
    title: "Shiv Jayanti Rally",
    tag: "Utsav",
    image: "/gallery_shiv_jayanti_rally.png",
    icon: "🚩",
  },
  {
    title: "Gauri Ganpati Decor",
    tag: "Decoration",
    image: "/gallery_gauri_ganpati_decor.png",
    icon: "✨",
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Wipe open the section clipPath horizontally from center
      tl.fromTo(
        containerRef.current,
        { clipPath: "inset(0 50% 0 50%)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0%)", opacity: 1, duration: 1.4, ease: "power3.inOut" }
      )
      // 2. Slide the main title up from below its overflow-hidden mask
      .fromTo(
        ".hero-title-top",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        "-=0.6"
      )
      // 3. Fade and slide subtext paragraph
      .fromTo(
        ".hero-subtext",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
        "-=0.8"
      )
      // 4. Wipe open and scale the marquee row
      .fromTo(
        ".hero-marquee-row",
        { scaleY: 0.9, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
        "-=0.8"
      )
      // 5. Slide Together. down from above its overflow-hidden mask
      .fromTo(
        ".hero-title-bottom",
        { yPercent: -110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        "-=1.1"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const anim = gsap.to(marquee, {
      xPercent: -50,
      repeat: -1,
      duration: 25,
      ease: "none",
    });

    return () => {
      anim.kill();
    };
  }, []);

  const DOUBLE_MARQUEE_ITEMS = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section
      ref={containerRef}
      style={{ clipPath: "inset(0 50% 0 50%)" }}
      className="relative w-full min-h-[88vh] flex flex-col justify-between bg-white overflow-hidden border-b border-saffron/10 opacity-0"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-10" />
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none translate-y-20 opacity-10" />

      {/* 2. Main Content Row: Upper Headline and Metrics stacked vertically */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-8 relative z-10 flex flex-col justify-start text-left pt-24 md:pt-28 lg:pt-32 pb-4 md:pb-6 gap-3">
        <div className="overflow-hidden">
          <h1 className="text-[44px] sm:text-[72px] lg:text-[96px] font-black text-foreground leading-none tracking-tighter uppercase font-heading hero-title-top opacity-0">
            Celebrating
          </h1>
        </div>
        <div className="max-w-xl text-left hero-subtext opacity-0">
          <p className="text-xs sm:text-sm text-slate-grey leading-relaxed">
            Welcome to the age of traditional energy. **350+ Performers**, 9-Layer formations. The future of cultural legacy starts here.
          </p>
        </div>
      </div>

      {/* 3. Middle Infinite Scrolling Image Marquee Row */}
      <div className="w-full border-y border-saffron/10 bg-amber-50/10 py-4 md:py-5 overflow-hidden relative z-10 flex select-none hero-marquee-row opacity-0">
        <div ref={marqueeRef} className="flex gap-6 shrink-0 pr-6 w-max">
          {DOUBLE_MARQUEE_ITEMS.map((item, idx) => (
            <div key={idx} className="w-[220px] sm:w-[280px] h-[120px] sm:h-[140px] rounded-block overflow-hidden relative border border-saffron/10 group flex flex-col justify-end p-4 shrink-0 bg-white hover:border-saffron/30 transition-all duration-300 shadow-sm">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="280px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent z-10" />
              <div className="relative z-20 flex text-left">
                <div>
                  <span className="text-[9px] font-bold text-saffron uppercase tracking-widest">{item.tag}</span>
                  <h3 className="text-xs sm:text-sm font-extrabold text-white font-heading mt-0.5">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Lower Title Row right-aligned */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-8 relative z-10 pt-4 md:pt-6 pb-8 md:pb-12 text-right flex justify-end">
        <div className="overflow-hidden">
          <h1 className="text-[44px] sm:text-[72px] lg:text-[96px] font-black text-saffron leading-none tracking-tighter uppercase font-heading hero-title-bottom opacity-0">
            Together.
          </h1>
        </div>
      </div>

      {/* 5. Sticky Saffron Volunteer Tab on the right side of the screen */}
      <div
        onClick={() => {
          const el = document.getElementById("volunteer");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-saffron text-white border-l border-y border-saffron/20 py-4 px-2.5 rounded-l-md font-bold uppercase text-[9px] tracking-widest [writing-mode:vertical-lr] cursor-pointer hover:bg-saffron/90 hover:text-white transition-all duration-300 shadow-lg z-50 hover:pl-3.5 select-none"
      >
        Become a Volunteer
      </div>
    </section>
  );
}
