"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface EventPanel {
  id: string;
  num: string;
  category: string;
  title: string;
  description: string;
  image: string;
  details: string[];
  link: string;
}

const EVENTS: EventPanel[] = [
  {
    id: "ganesh",
    num: "01",
    category: "Ganeshotsav",
    title: "Shree Ganeshotsav",
    description: "A grand 10-day celebration in Indira Nagar uniting the community through devotional aartis, traditional Dhol-Tasha pageantry, and eco-friendly social initiatives.",
    image: "/images/ganesh.jpg",
    details: [
      "Eco-Friendly Idols",
      "Traditional Aarti",
      "Dhol Tasha Troupe",
      "Social Cleanliness Drives"
    ],
    link: "/events"
  },
  {
    id: "swagat-yatra",
    num: "02",
    category: "Swagat Yatra",
    title: "Gudipadwa Swagat Yatra",
    description: "Welcoming the Marathi New Year with a grand cultural procession across Indira Nagar, featuring traditional attire, Lezim, saffron flags, and cultural floats.",
    image: "/images/dahi-handi.jpg",
    details: [
      "Grand Cultural Rally",
      "Traditional Attire",
      "Lezim & Dhol",
      "Community Celebration"
    ],
    link: "/events"
  },
  {
    id: "navratri",
    num: "03",
    category: "Navratri",
    title: "Navratri Utsav",
    description: "Nine nights of cultural vibrancy celebrating divine strength with traditional Garba & Dandiya rhythms, prayers, and women empowerment programs.",
    image: "/images/navratri.jpg",
    details: [
      "Traditional Dandiya",
      "Garba Nights",
      "Devotional Puja",
      "Prasad Distribution"
    ],
    link: "/events"
  },
  {
    id: "shiv-jayanti",
    num: "04",
    category: "Shiv Jayanti",
    title: "Chhatrapati Shivaji Maharaj Jayanti",
    description: "Commemorating the visionary Chhatrapati Shivaji Maharaj with inspiring youth rallies, historical lectures, traditional saffron flags, and cultural tributes.",
    image: "/images/dussehra.png",
    details: [
      "Historical Lectures",
      "Inspirational Rally",
      "Youth Tributes",
      "Cultural Procession"
    ],
    link: "/events"
  },
  {
    id: "ambedkar-jayanti",
    num: "05",
    category: "Ambedkar Jayanti",
    title: "Dr. Babasaheb Ambedkar Jayanti",
    description: "Honoring the architect of the Indian Constitution through social equality programs, book distributions, educational felicitation, and community harmony drives.",
    image: "/images/ganesh.jpg",
    details: [
      "Book Distribution",
      "Student Felicitation",
      "Social Equality Drive",
      "Community Harmony"
    ],
    link: "/events"
  },
  {
    id: "sports-tournaments",
    num: "06",
    category: "Sports Tournaments",
    title: "Annual Sports & Cricket Tournaments",
    description: "Honoring our 2006 cricket founding roots with competitive local cricket tournaments, athletics, and sports coaching for Indira Nagar youth.",
    image: "/images/dahi-handi.jpg",
    details: [
      "Cricket League",
      "Youth Athletics",
      "Fitness Coaching",
      "Trophy Felicitation"
    ],
    link: "/events"
  }
];

export default function FeaturedEvents() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeMobileId, setActiveMobileId] = useState<string | null>("ganesh");

  // Track active slide (hovered one on desktop, or default mobile first)
  const activeEvent = EVENTS.find(e => e.id === (hoveredId || activeMobileId)) || EVENTS[0];

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      // ScrollTrigger reveal for grid row
      gsap.fromTo(
        gridRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background z-20"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-5" />
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Editorial Heading Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight font-heading leading-none uppercase">
              Upcoming Cultural Celebrations
            </h2>
          </div>
          <p className="text-slate-grey max-w-md text-sm md:text-base leading-relaxed font-light">
            Bringing the Indira Nagar and Nashik community together through vibrant cultural celebrations, traditional street processions, youth sports, and social welfare drives.
          </p>
        </div>

        {/* Layout Row */}
        <div 
          ref={gridRef}
          className="flex flex-col md:flex-row gap-12 items-start relative min-h-[580px]"
        >
          
          {/* Left Column: Sticky Metadata Details (Desktop only) */}
          <div className="hidden md:flex md:w-[40%] flex-col justify-between pr-10 border-r border-saffron/10 min-h-[560px] sticky top-28">
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-3xl lg:text-4xl font-black text-foreground mt-2 font-heading uppercase leading-tight">
                  {activeEvent.title}
                </h3>
              </div>

              {/* Active Image Render Box inside Sidebar */}
              <div className="relative w-full h-[220px] lg:h-[240px] rounded-3xl overflow-hidden shadow-lg border border-saffron/10 mt-1">
                <div className="relative w-full h-full bg-neutral-950">
                  {EVENTS.map((event) => (
                    <Image
                      key={event.id}
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-w-768px) 100vw, 40vw"
                      className={cn(
                        "object-cover object-center absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        activeEvent.id === event.id 
                          ? "opacity-90 scale-100 blur-0" 
                          : "opacity-0 scale-105 blur-[2px]"
                      )}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent pointer-events-none" />
                </div>
              </div>

              <p className="text-slate-grey text-xs lg:text-sm leading-relaxed mt-2 font-light min-h-[60px]">
                {activeEvent.description}
              </p>
            </div>
            
            <div className="mt-4">
              <div className="flex flex-wrap gap-1.5">
                {activeEvent.details.map((detail, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1.5 rounded-full bg-saffron/5 border border-saffron/15 text-[9px] font-bold text-saffron uppercase tracking-wider transition-all duration-300"
                  >
                    {detail}
                  </span>
                ))}
              </div>

              <Link 
                href={activeEvent.link}
                className="mt-6 inline-flex items-center gap-2.5 py-2.5 px-5 rounded-full bg-saffron text-white text-[9px] font-bold uppercase tracking-widest hover:bg-saffron/90 hover:shadow-lg transition-all duration-300"
              >
                Explore Spotlight
                <svg className="w-3.5 h-3.5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive List */}
          <div 
            className="w-full md:w-[60%] flex flex-col border-t border-saffron/10 md:border-t-0 md:pl-16 relative"
          >
            {EVENTS.map((event) => (
              <div
                key={event.id}
                onMouseEnter={() => setHoveredId(event.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => {
                  setActiveMobileId(activeMobileId === event.id ? null : event.id);
                }}
                className="py-8 md:py-10 border-b border-saffron/10 flex flex-col md:flex-row md:justify-between md:items-center group transition-colors duration-300 relative cursor-pointer"
              >
                {/* Desktop List Layout */}
                <div className="flex items-baseline gap-6 select-none">
                  <span className="text-xs md:text-sm font-bold text-saffron tracking-wider font-sans">
                    {event.num}
                  </span>
                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-800 group-hover:text-saffron transition-all duration-300 font-heading uppercase leading-none">
                    {event.category}
                  </h3>
                </div>
                <span className="hidden md:inline text-xs uppercase font-extrabold tracking-widest text-slate-400 group-hover:text-saffron transition-colors duration-300 mt-2 md:mt-0">
                  {event.id === "ganesh" || event.id === "navratri" ? "10 Days" : (event.id === "swagat-yatra" ? "Annual Yatra" : (event.id === "sports-tournaments" ? "Tournament" : "Annual Utsav"))}
                </span>

                {/* Mobile Dropdown Details (Toggled on click) */}
                <div 
                  className={cn(
                    "md:hidden transition-all duration-500 overflow-hidden flex flex-col gap-4 items-start w-full",
                    activeMobileId === event.id ? "max-h-[550px] opacity-100 mt-5 pb-2" : "max-h-0 opacity-0 pointer-events-none"
                  )}
                >
                  <div className="relative w-full h-[200px] rounded-2xl overflow-hidden shadow-lg border border-saffron/10">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="100vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <p className="text-xs text-slate-grey leading-relaxed">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {event.details.map((detail, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full bg-saffron/5 border border-saffron/10 text-[9px] font-bold text-saffron uppercase">
                        {detail}
                      </span>
                    ))}
                  </div>

                  <Link 
                    href={event.link} 
                    className="py-2.5 px-4 rounded-full bg-saffron text-white text-[9px] uppercase font-bold tracking-widest flex items-center gap-1.5 shadow-md mt-2"
                  >
                    Explore Spotlight
                    <svg className="w-3 h-3 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}
