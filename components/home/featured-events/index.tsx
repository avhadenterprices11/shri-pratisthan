"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function TiltCard({ 
  category, 
  title, 
  description, 
  details, 
  colorClass, 
  icon 
}: { 
  category: string; 
  title: string; 
  description: string; 
  details: string[]; 
  colorClass: string; 
  icon: React.ReactNode 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Tilt limit
    setRotate({
      x: -(y / (rect.height / 2)) * 6,
      y: (x / (rect.width / 2)) * 6
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="glass-panel p-8 rounded-block flex flex-col justify-between h-full hover:border-saffron/30 hover:shadow-2xl transition-shadow duration-500"
    >
      <div>
        <div className={`w-12 h-12 rounded-full ${colorClass} flex items-center justify-center mb-6`}>
          {icon}
        </div>
        <span className="text-xs uppercase font-bold tracking-widest text-saffron">{category}</span>
        <h3 className="text-3xl font-extrabold text-foreground mt-2 mb-4 font-heading">{title}</h3>
        <p className="text-base text-slate-grey leading-relaxed mb-6">{description}</p>
      </div>
      
      <div className="border-t border-saffron/10 pt-6">
        <h4 className="text-xs uppercase font-bold tracking-widest text-gold mb-3">Key Highlights</h4>
        <ul className="space-y-2">
          {details.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-slate-grey">
              <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function FeaturedEvents() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".event-card-wrapper",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1.0,
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-white z-20"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Festivals Spotlight</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-heading">
            Major Cultural Celebrations
          </h2>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="event-card-wrapper">
            <TiltCard
              category="Ganeshotsav"
              title="Shree Ganeshotsav"
              description="A grand 10-day celebration merging community prayer, local music heritage, and custom decorations. Beyond devotional setups, we organize traditional street rituals and eco-friendly clay Ganesha workshops."
              colorClass="bg-amber-100 text-amber-600"
              details={[
                "Ecological clay Ganesha sculpting",
                "24/7 volunteer crowd management & security",
                "Traditional Dhol Tasha musical displays",
                "Special Gauri Ganpati decoration setups"
              ]}
              icon={
                <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              }
            />
          </div>

          <div className="event-card-wrapper">
            <TiltCard
              category="Dahi Handi"
              title="Dahi Handi Utsav"
              description="Reflecting Maharashtra's athletic courage. Our Dahi Handi events prioritize safe team coordinates, supporting young participants (Gopals and Gopis) while routing festival collection proceedings to rural child funds."
              colorClass="bg-blue-100 text-blue-600"
              details={[
                "Advanced security harnesses & helmets",
                "Focus on youth fitness & coordination",
                "Daytime athletic pyramid structures",
                "Proceedings fund rural diagnostic checks"
              ]}
              icon={
                <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
