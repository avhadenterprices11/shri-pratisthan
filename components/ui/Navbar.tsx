"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if nav should change visual style (scrolled down past 50px)
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Slide up nav on scroll down, slide down on scroll up
      if (navRef.current) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
          // Scrolling down - hide nav
          gsap.to(navRef.current, { y: -100, duration: 0.3, ease: "power2.out" });
        } else {
          // Scrolling up - show nav
          gsap.to(navRef.current, { y: 0, duration: 0.3, ease: "power2.out" });
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Slide-in animation for mobile menu
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".mobile-link",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  const navLinks = [
    { label: "About Us", href: "/about" },
    { label: "Community", href: "/community" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
  ];

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6 px-6 md:px-12 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-md border-b border-saffron/10 py-4"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left: Logo (Rising Sun Visual Icon) */}
          <Link href="/" className="flex items-center gap-3 group" data-hover="pointer">
            <svg 
              className="w-10 h-10 stroke-saffron fill-none transition-transform duration-500 group-hover:rotate-12"
              viewBox="0 0 100 100" 
              strokeWidth="5" 
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
            <span className="text-lg font-black tracking-tight text-foreground font-heading">
              SHREE <span className="text-saffron">PRATHISHTHAN</span>
            </span>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs uppercase font-extrabold tracking-widest transition-colors duration-300 relative py-1 hover:text-saffron ${
                    isActive ? "text-saffron" : "text-slate-grey"
                  }`}
                  data-hover="pointer"
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-saffron rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Contact Us Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="bg-foreground hover:bg-saffron hover:shadow-lg hover:shadow-saffron/20 text-background hover:text-white font-extrabold text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-300 active:scale-95 inline-block"
              data-hover="pointer"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md flex flex-col justify-center p-8 md:hidden">
          <nav className="flex flex-col gap-6 text-left mb-12">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="mobile-link text-3xl font-extrabold text-foreground font-heading hover:text-saffron transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="mobile-link border-t border-saffron/10 pt-8">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="bg-saffron text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-full text-center shadow-lg shadow-saffron/25 block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
