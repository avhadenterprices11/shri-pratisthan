"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeartHandshake, ShieldAlert, Leaf, Music, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// InteractiveGlowBackground - Custom SVG mesh generator with soft bright light flares
// ============================================================================
interface GlowBgProps {
  activeIdx: number | null;
}

function InteractiveGlowBackground({ activeIdx }: GlowBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<SVGCircleElement>(null);
  const blob2Ref = useRef<SVGCircleElement>(null);
  const blob3Ref = useRef<SVGCircleElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });

  // Soft light flares suited for a bright background
  const getBlob1Color = () => {
    if (activeIdx === 0) return "rgba(226, 88, 34, 0.18)"; // Saffron highlight
    if (activeIdx === 1) return "rgba(226, 88, 34, 0.04)";
    if (activeIdx === 2) return "rgba(226, 88, 34, 0.06)";
    if (activeIdx === 3) return "rgba(226, 88, 34, 0.04)";
    return "rgba(226, 88, 34, 0.1)";
  };

  const getBlob2Color = () => {
    if (activeIdx === 0) return "rgba(212, 175, 55, 0.04)";
    if (activeIdx === 1) return "rgba(212, 175, 55, 0.22)"; // Gold highlight
    if (activeIdx === 2) return "rgba(212, 175, 55, 0.06)";
    if (activeIdx === 3) return "rgba(212, 175, 55, 0.04)";
    return "rgba(212, 175, 55, 0.1)";
  };

  const getBlob3Color = () => {
    if (activeIdx === 0) return "rgba(244, 117, 96, 0.04)";
    if (activeIdx === 1) return "rgba(244, 117, 96, 0.04)";
    if (activeIdx === 2) return "rgba(244, 117, 96, 0.18)"; // Coral highlight
    if (activeIdx === 3) return "rgba(220, 38, 38, 0.18)";  // Crimson highlight
    return "rgba(244, 117, 96, 0.08)";
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const rect = container.getBoundingClientRect();
    mouseRef.current.x = rect.width / 2;
    mouseRef.current.y = rect.height / 2;
    currentMouseRef.current.x = rect.width / 2;
    currentMouseRef.current.y = rect.height / 2;

    let frameId: number;
    const animate = () => {
      currentMouseRef.current.x += (mouseRef.current.x - currentMouseRef.current.x) * 0.05;
      currentMouseRef.current.y += (mouseRef.current.y - currentMouseRef.current.y) * 0.05;

      const time = Date.now() * 0.001;

      // Blob 1: Saffron
      if (blob1Ref.current) {
        const x = currentMouseRef.current.x;
        const y = currentMouseRef.current.y;
        blob1Ref.current.setAttribute("cx", x.toString());
        blob1Ref.current.setAttribute("cy", y.toString());
        const r = 200 + Math.sin(time * 1.1) * 25;
        blob1Ref.current.setAttribute("r", r.toString());
      }

      // Blob 2: Gold
      if (blob2Ref.current) {
        const bx = (rect.width * 0.25) + Math.cos(time * 0.4) * 140 + (currentMouseRef.current.x * 0.05);
        const by = (rect.height * 0.35) + Math.sin(time * 0.5) * 90 + (currentMouseRef.current.y * 0.05);
        blob2Ref.current.setAttribute("cx", bx.toString());
        blob2Ref.current.setAttribute("cy", by.toString());
        const r = 240 + Math.cos(time * 0.8) * 30;
        blob2Ref.current.setAttribute("r", r.toString());
      }

      // Blob 3: Coral/Crimson
      if (blob3Ref.current) {
        const cx = (rect.width * 0.75) + Math.sin(time * 0.6) * 150 + (currentMouseRef.current.x * 0.08);
        const cy = (rect.height * 0.65) + Math.cos(time * 0.4) * 100 + (currentMouseRef.current.y * 0.08);
        blob3Ref.current.setAttribute("cx", cx.toString());
        blob3Ref.current.setAttribute("cy", cy.toString());
        const r = 170 + Math.sin(time * 1.2) * 30;
        blob3Ref.current.setAttribute("r", r.toString());
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
    >
      <svg className="w-full h-full opacity-30 filter blur-[90px]">
        <circle
          ref={blob1Ref}
          fill={getBlob1Color()}
          cx="0"
          cy="0"
          r="200"
          className="transition-colors duration-700 ease-out"
        />
        <circle
          ref={blob2Ref}
          fill={getBlob2Color()}
          cx="0"
          cy="0"
          r="240"
          className="transition-colors duration-700 ease-out"
        />
        <circle
          ref={blob3Ref}
          fill={getBlob3Color()}
          cx="0"
          cy="0"
          r="170"
          className="transition-colors duration-700 ease-out"
        />
      </svg>
    </div>
  );
}

// ============================================================================
// AccordionPanel - Vertical strip expanding horizontally on hover (Desktop)
// ============================================================================
interface PanelData {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  tags: string[];
  color: string;
}

interface PanelProps {
  panel: PanelData;
  index: number;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHover: (index: number | null) => void;
  onClick: () => void;
}

function AccordionPanel({
  panel,
  index,
  isHovered,
  isAnyHovered,
  onHover,
  onClick,
}: PanelProps) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const nx = (x / rect.width) - 0.5;
    const ny = (y / rect.height) - 0.5;

    setParallax({ x: nx * 25, y: ny * 25 });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
    onHover(null);
  };

  const handleMouseEnter = () => {
    onHover(index);
  };

  const widthStyle = isAnyHovered ? (isHovered ? "w-[52%]" : "w-[16%]") : "w-[25%]";

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transition: "width 0.75s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s",
      }}
      className={`relative h-[400px] overflow-hidden rounded-block border border-saffron/15 bg-white group cursor-pointer ${widthStyle} hidden md:block shadow-[0_4px_20px_rgba(0,0,0,0.04)]`}
      data-hover="pointer"
    >
      {/* Background Image with Mouse Parallax (100% crisp, no foggy overlays) */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0) scale(1.1)`,
        }}
      >
        <img
          src={panel.image}
          alt={panel.title}
          className="w-full h-full object-cover select-none pointer-events-none brightness-[0.9] group-hover:brightness-[0.95] transition-all duration-700"
          draggable={false}
        />
      </div>

      {/* Solid absolute float icon badge */}
      <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-white border border-saffron/10 text-saffron shadow-sm z-20">
        {panel.icon}
      </div>

      {/* Collapsed Rotated Title (Visible when collapsed, using high contrast text drop-shadow) */}
      <div
        className={`absolute bottom-6 left-6 origin-bottom-left transition-all duration-500 z-20 ${
          isHovered ? "opacity-0 translate-y-6 pointer-events-none scale-90" : "opacity-100 translate-y-0 scale-100"
        }`}
        style={{
          transform: "rotate(-90deg) translate3d(0, 100%, 0)",
          transformOrigin: "left bottom",
          width: "240px",
        }}
      >
        <h3 className="text-[10px] font-black text-charcoal/80 tracking-[0.25em] font-heading whitespace-nowrap uppercase drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)]">
          {panel.title}
        </h3>
      </div>

      {/* Expanded Solid Detail Drawer (Perfect visibility, no blurriness or blending gradients) */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white/95 p-5 border-t border-saffron/15 rounded-t-2xl z-20 transition-all duration-500 ease-out flex flex-col justify-between ${
          isHovered ? "translate-y-0 opacity-100" : "translate-y-[220px] opacity-0 pointer-events-none"
        }`}
        style={{
          height: "170px",
        }}
      >
        <div>
          <h3 className="text-lg font-black text-charcoal font-heading mb-1.5 tracking-tight">
            {panel.title}
          </h3>
          <p className="text-xs text-slate-grey leading-relaxed line-clamp-2 font-sans mb-3">
            {panel.description}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-saffron/10 pt-2.5">
          <div className="flex flex-wrap gap-1.5">
            {panel.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="text-[8px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-saffron/5 text-saffron border border-saffron/10"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="inline-flex items-center gap-1 text-[10px] uppercase font-extrabold tracking-widest text-saffron group-hover:text-gold transition-colors">
            <span>Apply</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MobileAccordionPanel - Horizontal strip expanding vertically on touch (Mobile)
// ============================================================================
function MobileAccordionPanel({
  panel,
  index,
  isHovered,
  isAnyHovered,
  onClick,
}: PanelProps) {
  const heightStyle = isAnyHovered ? (isHovered ? "h-[250px]" : "h-[75px]") : "h-[105px]";

  return (
    <div
      onClick={onClick}
      style={{
        transition: "height 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s",
      }}
      className={`relative w-full overflow-hidden rounded-block border border-saffron/10 bg-white group cursor-pointer transition-all duration-300 select-none ${heightStyle} md:hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)]`}
      data-hover="pointer"
    >
      {/* Background Image (100% crisp) */}
      <div className="absolute inset-0 scale-105">
        <img
          src={panel.image}
          alt={panel.title}
          className="w-full h-full object-cover brightness-[0.9]"
          draggable={false}
        />
      </div>

      {/* Top Bar Icon Badge */}
      <div className={`absolute top-3 left-3 p-1.5 rounded-lg bg-white border border-saffron/10 text-saffron z-20 transition-opacity ${
        isHovered ? "opacity-0" : "opacity-100"
      }`}>
        {panel.icon}
      </div>

      {/* Mobile Title (shown when collapsed) */}
      <div className={`absolute bottom-3 left-12 right-3 z-20 transition-all ${
        isHovered ? "opacity-0" : "opacity-100"
      }`}>
        <h3 className="text-sm font-bold text-charcoal font-heading drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
          {panel.title}
        </h3>
      </div>

      {/* Mobile Solid Detail Drawer */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-saffron/15 rounded-t-xl z-20 transition-all duration-500 ease-out flex flex-col justify-between ${
          isHovered ? "translate-y-0 opacity-100" : "translate-y-[180px] opacity-0 pointer-events-none"
        }`}
        style={{
          height: "150px",
        }}
      >
        <div>
          <h3 className="text-sm font-bold text-charcoal font-heading mb-1">
            {panel.title}
          </h3>
          <p className="text-[11px] text-slate-grey leading-relaxed line-clamp-2 font-sans">
            {panel.description}
          </p>
        </div>

        <div className="flex justify-between items-center border-t border-saffron/10 pt-2">
          <div className="flex gap-1">
            {panel.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="text-[7px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-saffron/5 text-saffron border border-saffron/10"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="inline-flex items-center gap-1 text-[9px] uppercase font-extrabold tracking-widest text-saffron">
            <span>Apply</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main VolunteerCTA Section Component
// ============================================================================
export default function VolunteerCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonAreaRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [btnCoords, setBtnCoords] = useState({ x: 0, y: 0 });
  
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const handleMouseMoveContainer = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: xPercent, y: yPercent });
  };

  const handleAreaMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const area = buttonAreaRef.current;
    if (!area) return;

    const rect = area.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    setBtnCoords({ x: x * 0.35, y: y * 0.35 });
  };

  const handleAreaMouseLeave = () => {
    setBtnCoords({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // General elements fade-in reveals
      gsap.fromTo(
        ".volunteer-text-fade",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // Accordion entrance reveal
      gsap.fromTo(
        ".volunteer-accordion-reveal",
        { opacity: 0, y: 40, scale: 0.99 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleRoleRedirect = (roleId: string) => {
    router.push(`/volunteer?role=${roleId}`);
  };

  const ROLES = [
    {
      id: "coordinator",
      title: "Festival Coordinator",
      description: "Direct event logistics, coordinate crowd control, and schedule rituals during grand Ganeshotsav and Dahi Handi events.",
      image: "/volunteer_coordinator.png",
      icon: <HeartHandshake className="w-5 h-5" />,
      tags: ["Festivals", "Logistics", "Coordination"],
      color: "rgba(226, 106, 54, 0.18)",
    },
    {
      id: "safety",
      title: "Safety Marshal",
      description: "Secure safety harnesses, distribute protective gear, and organize crowd coordinates for Dahi Handi pyramid climbs.",
      image: "/volunteer_safety.png",
      icon: <ShieldAlert className="w-5 h-5" />,
      tags: ["Safety", "Emergency", "Crowd Control"],
      color: "rgba(212, 175, 55, 0.2)",
    },
    {
      id: "eco",
      title: "Eco-Ganesha Helper",
      description: "Organize environment-friendly clay Ganesha workshops and manage plastic-free decoration drives inside pandals.",
      image: "/volunteer_eco.png",
      icon: <Leaf className="w-5 h-5" />,
      tags: ["Eco-Mitra", "Workshops", "Go Green"],
      color: "rgba(244, 117, 96, 0.18)",
    },
    {
      id: "musician",
      title: "Cultural Musician",
      description: "Represent Maharashtra's heritage by joining the historic Dhol Tasha musical troupes performing in regional streets.",
      image: "/volunteer_musician.png",
      icon: <Music className="w-5 h-5" />,
      tags: ["Cultural Arts", "Music Troupe", "Heritage"],
      color: "rgba(220, 38, 38, 0.2)",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="volunteer"
      onMouseMove={handleMouseMoveContainer}
      style={{
        "--mx": `${mousePos.x}%`,
        "--my": `${mousePos.y}%`,
      } as React.CSSProperties}
      className="py-16 px-6 md:px-12 relative overflow-hidden bg-[#FBFBFA] border-t border-b border-saffron/10 w-full select-none"
    >
      {/* Ambient soft glow background */}
      <InteractiveGlowBackground activeIdx={hoveredIdx} />

      {/* Side-by-Side Screen-Perfect Grid Container (Perfect left margin alignment) */}
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Heading and Description & Magnetic Button */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <span className="volunteer-text-fade text-saffron font-bold text-xs uppercase tracking-widest block mb-3 font-sans">
            Be the Change
          </span>

          <h2 className="volunteer-text-fade text-2xl sm:text-3xl lg:text-[2.2rem] font-black text-charcoal tracking-tight font-heading leading-[1.1] mb-4">
            Ready to Join the <span className="text-saffron">Movement?</span>
          </h2>

          <p className="volunteer-text-fade text-sm text-slate-grey leading-relaxed max-w-sm mb-6 font-sans">
            Dedicate your time and skills to build a stronger community. Shree Prathishthan channels local energy into continuous social progress.
          </p>

          {/* Magnetic Interaction Button wrapper */}
          <div
            ref={buttonAreaRef}
            onMouseMove={handleAreaMouseMove}
            onMouseLeave={handleAreaMouseLeave}
            className="py-4 px-8 -ml-8 flex items-center justify-center cursor-none"
            data-hover="pointer"
          >
            <LiquidMetalButton
              ref={buttonRef}
              onClick={() => router.push("/volunteer")}
              style={{
                transform: `translate3d(${btnCoords.x}px, ${btnCoords.y}px, 0)`,
                transition: btnCoords.x === 0 ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
              }}
              metalConfig={{
                colorBack: "#E26A36", // Saffron Accent
                colorTint: "#D4AF37", // Gold Accent
              }}
              size="md"
              className="text-xs uppercase font-extrabold tracking-widest font-heading shadow-xl shadow-saffron/10 cursor-none"
              data-hover="pointer"
            >
              Become a Volunteer
            </LiquidMetalButton>
          </div>
        </div>

        {/* Right Column: Compact Horizontal Accordion Viewport */}
        <div className="volunteer-accordion-reveal lg:col-span-7 w-full flex flex-col md:flex-row gap-3">
          {ROLES.map((panel, idx) => {
            const isHovered = hoveredIdx === idx;
            const isAnyHovered = hoveredIdx !== null;

            return (
              <React.Fragment key={panel.id}>
                {/* Desktop Panel */}
                <AccordionPanel
                  panel={panel}
                  index={idx}
                  isHovered={isHovered}
                  isAnyHovered={isAnyHovered}
                  onHover={setHoveredIdx}
                  onClick={() => handleRoleRedirect(panel.id)}
                />

                {/* Mobile Panel */}
                <MobileAccordionPanel
                  panel={panel}
                  index={idx}
                  isHovered={isHovered}
                  isAnyHovered={isAnyHovered}
                  onHover={setHoveredIdx}
                  onClick={() => {
                    if (hoveredIdx === idx) {
                      handleRoleRedirect(panel.id);
                    } else {
                      setHoveredIdx(idx);
                    }
                  }}
                />
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
}
