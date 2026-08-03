"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Scroll listener: smart hide on scroll down, reveal on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let isHidden = false;

    const handleScroll = () => {
      // If the portal intro overlay is still active, ignore scroll events
      const portal = document.querySelector('.portal-intro') as HTMLElement;
      if (portal && portal.style.display !== 'none') {
        return;
      }

      const currentScrollY = window.scrollY;
      
      // If we are at the very top of the page, always show the Navbar
      if (currentScrollY <= 50) {
        if (isHidden) {
          isHidden = false;
          gsap.to(navRef.current, { 
            y: 0, 
            opacity: 1, 
            duration: 0.4, 
            ease: "power2.out" 
          });
        }
        setScrolled(false);
        lastScrollY = currentScrollY;
        return;
      }

      // Track scroll direction (5px threshold to prevent minor noise triggering)
      if (currentScrollY > lastScrollY + 5) {
        // Scrolling down: hide Navbar
        if (!isHidden) {
          isHidden = true;
          setScrolled(true);
          gsap.to(navRef.current, { 
            y: -120, 
            opacity: 0, 
            duration: 0.4, 
            ease: "power2.out" 
          });
        }
      } else if (currentScrollY < lastScrollY - 5) {
        // Scrolling up: show Navbar
        if (isHidden) {
          isHidden = false;
          setScrolled(false);
          gsap.to(navRef.current, { 
            y: 0, 
            opacity: 1, 
            duration: 0.4, 
            ease: "power2.out" 
          });
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entrance reveal: detect when the Hero portal intro overlay finishes
  useEffect(() => {
    const portal = document.querySelector('.portal-intro') as HTMLElement;
    if (!portal) {
      // If no portal (e.g. on subpages), show Navbar immediately
      gsap.to(navRef.current, { opacity: 1, y: 0, duration: 0.5 });
      return;
    }

    // Check if it's already hidden (in case we mounted after it finished)
    if (portal.style.display === 'none') {
      gsap.to(navRef.current, { opacity: 1, y: 0, duration: 0.5 });
      return;
    }

    const observer = new MutationObserver(() => {
      if (portal.style.display === 'none') {
        gsap.to(navRef.current, { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out" 
        });
        observer.disconnect();
      }
    });

    observer.observe(portal, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Slide-in and fade animations for drawer elements
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".nav-drawer-link",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.08, duration: 0.5, ease: "power3.out" }
      );
      gsap.fromTo(
        ".nav-drawer-info",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out", delay: 0.15 }
      );
    }
  }, [isOpen]);

  const navLinks = [
    { label: "About Us", href: "/about" },
    { label: "Community", href: "/community" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-12 bg-transparent pointer-events-none transition-transform opacity-0 -translate-y-[100px]"
      >
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          {/* Left: Logo (Rising Sun Visual Icon inside Floating Glass Pill) */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group bg-white/95 backdrop-blur-md border border-saffron/10 px-5 py-2.5 rounded-full shadow-lg pointer-events-auto hover:border-saffron/30 hover:scale-[1.02] transition-all duration-300 select-none" 
            onClick={() => setIsOpen(false)}
            data-hover="pointer"
          >
            <svg 
              className="w-6 h-6 stroke-saffron fill-none transition-transform duration-500 group-hover:rotate-12"
              viewBox="0 0 100 100" 
              strokeWidth="6" 
              strokeLinecap="round"
            >
              {/* Sunrise arches */}
              <path d="M20 70 A30 30 0 0 1 80 70" />
              <line x1="50" y1="40" x2="50" y2="15" />
              <line x1="28.79" y1="48.79" x2="11.11" y2="31.11" />
              <line x1="71.21" y1="48.79" x2="88.89" y2="31.11" />
              <line x1="20" y1="70" x2="5" y2="70" />
              <line x1="80" y1="70" x2="95" y2="70" />
              <path d="M5 80 L95 80" />
            </svg>
            <span className="text-xs sm:text-sm font-black tracking-tight text-foreground font-heading">
              SHREE <span className="text-saffron">PRATHISHTHAN</span>
            </span>
          </Link>

          {/* Right: Floating Dark Glassmorphic Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group flex flex-col items-end justify-center w-14 h-10 px-4 rounded-full bg-neutral-950/95 border border-white/10 hover:border-saffron/30 transition-all duration-300 pointer-events-auto shadow-lg z-50 relative gap-1.5 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
            data-hover="pointer"
          >
            <span className={cn(
              "h-[2px] bg-white transition-all duration-300 origin-center",
              isOpen ? "w-6 rotate-45 translate-y-[4px] bg-saffron" : "w-6 group-hover:bg-saffron"
            )} />
            <span className={cn(
              "h-[2px] bg-white transition-all duration-300 origin-center",
              isOpen ? "w-6 -rotate-45 -translate-y-[4px] bg-saffron" : "w-4 group-hover:w-6 group-hover:bg-saffron"
            )} />
          </button>
        </div>
      </header>

      {/* Next-Level Full-Screen Menu Overlay Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl flex flex-col md:flex-row p-8 md:p-24 overflow-y-auto">
          {/* Ambient decorative glows */}
          <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-5" />
          <div className="absolute inset-0 ambient-gold-glow pointer-events-none translate-y-40 opacity-5" />

          {/* Left Column: Branding, Motto & Contact Coordinates */}
          <div className="w-full md:w-1/2 flex flex-col justify-between border-b md:border-b-0 md:border-r border-saffron/10 pb-8 md:pb-0 md:pr-16 mb-8 md:mb-0 relative z-10 pt-20 md:pt-0">
            {/* Top Logo & Title */}
            <div className="nav-drawer-info">
              <svg 
                className="w-16 h-16 stroke-saffron fill-none mb-6 animate-pulse"
                viewBox="0 0 100 100" 
                strokeWidth="4" 
                strokeLinecap="round"
              >
                <path d="M20 70 A30 30 0 0 1 80 70" />
                <line x1="50" y1="40" x2="50" y2="15" />
                <line x1="28.79" y1="48.79" x2="11.11" y2="31.11" />
                <line x1="71.21" y1="48.79" x2="88.89" y2="31.11" />
                <line x1="20" y1="70" x2="5" y2="70" />
                <line x1="80" y1="70" x2="95" y2="70" />
                <path d="M5 80 L95 80" />
              </svg>
              <h2 className="text-2xl font-black tracking-tight text-foreground font-heading">
                SHREE <span className="text-saffron">PRATHISHTHAN</span>
              </h2>
              <p className="text-xs text-saffron uppercase font-bold tracking-[0.25em] font-sans mt-2">
                संस्कृति · सेवा · सन्मान
              </p>
            </div>

            {/* Bottom Contact Coordinates */}
            <div className="nav-drawer-info flex flex-col gap-4 mt-8 md:mt-0 text-slate-grey">
              <div>
                <span className="text-[10px] font-bold text-saffron uppercase tracking-widest block mb-1">Office Location</span>
                <p className="text-sm font-medium">Pune, Maharashtra, India</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-saffron uppercase tracking-widest block mb-1">Electronic Mail</span>
                <p className="text-sm font-medium hover:text-saffron transition-colors">
                  <a href="mailto:contact@shreepratishthan.org">contact@shreepratishthan.org</a>
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <a href="#" className="text-xs uppercase font-extrabold tracking-widest text-slate-grey hover:text-saffron transition-colors">Facebook</a>
                <a href="#" className="text-xs uppercase font-extrabold tracking-widest text-slate-grey hover:text-saffron transition-colors">Instagram</a>
                <a href="#" className="text-xs uppercase font-extrabold tracking-widest text-slate-grey hover:text-saffron transition-colors">Twitter</a>
              </div>
            </div>
          </div>

          {/* Right Column: Staggered Giant Menu Links */}
          <div className="w-full md:w-1/2 flex flex-col justify-center md:pl-16 relative z-10 pt-4 md:pt-0">
            <nav className="flex flex-col gap-4 md:gap-6 text-left">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="nav-drawer-link group relative block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight uppercase transition-all duration-300"
                    data-hover="pointer"
                  >
                    <span className={`inline-block transition-transform duration-300 group-hover:translate-x-3 ${
                      isActive ? "text-saffron" : "text-foreground hover:text-saffron"
                    }`}>
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
