"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white relative overflow-hidden border-t border-white/10 select-none">
      {/* High-Performance Infinite Marquee CSS */}
      <style>{`
        @keyframes footer-marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        .animate-footer-marquee {
          animation: footer-marquee 25s linear infinite;
        }
        .text-outline {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25);
        }
      `}</style>

      {/* 1. Giant Awwwards-Style Header Marquee */}
      <div className="relative w-full overflow-hidden whitespace-nowrap py-10 bg-[#111] flex border-b border-white/5">
        {/* Left & Right Gradient Soft Fades */}
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#111] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#111] to-transparent pointer-events-none z-10" />

        <div className="inline-flex gap-16 animate-footer-marquee shrink-0 min-w-full justify-around pr-16 text-4xl sm:text-6xl md:text-[5vw] font-black uppercase font-sans">
          <span className="text-white">Devotion & Service!</span>
          <span className="text-outline">Shree Prathishthan</span>
          <span className="text-saffron">Cultural Legacy</span>
          <span className="text-white">✦</span>
        </div>
        <div className="inline-flex gap-16 animate-footer-marquee shrink-0 min-w-full justify-around pr-16 text-4xl sm:text-6xl md:text-[5vw] font-black uppercase font-sans" aria-hidden="true">
          <span className="text-white">Devotion & Service!</span>
          <span className="text-outline">Shree Prathishthan</span>
          <span className="text-saffron">Cultural Legacy</span>
          <span className="text-white">✦</span>
        </div>
      </div>

      {/* 2. Footer Content Grid */}
      <div className="max-w-7xl mx-auto relative z-10 py-16 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          
          {/* Left Block: Description & Email Subscription */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6">
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-md font-light font-sans">
              Whether you're looking for cultural roots, youth collaboration, or active community service, we have projects to support. Get transparent trust announcements, newsletter articles, and volunteering calls directly in your inbox.
            </p>

            <form 
              onSubmit={(e) => e.preventDefault()} 
              className="flex items-center bg-[#1c1c1c] border border-white/10 rounded-full p-1.5 w-full max-w-md"
            >
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent text-xs sm:text-sm text-white placeholder-white/30 px-5 py-3 outline-none flex-grow w-full"
                required
              />
              <button
                type="submit"
                className="bg-white hover:bg-neutral-200 text-black text-[10px] sm:text-xs font-black uppercase tracking-widest px-6 sm:px-8 py-3 rounded-full transition-all duration-200 cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Right Block: Directory Links */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            
            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-white mb-6 font-sans">Quick links</h4>
              <ul className="space-y-4 text-xs text-white/50">
                <li><Link href="/" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider">Home</Link></li>
                <li><Link href="/events" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider">Events</Link></li>
                <li><Link href="/community" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider">Community</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider">About Us</Link></li>
                <li><Link href="/gallery" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider">Gallery</Link></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-white mb-6 font-sans">Support</h4>
              <ul className="space-y-4 text-xs text-white/50">
                <li><Link href="#" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider">Committees</Link></li>
                <li><Link href="/volunteer" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider">Register As Volunteer</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider">FAQ</Link></li>
              </ul>
            </div>

            {/* Follow Us On */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-white mb-6 font-sans">Follow us on</h4>
              <ul className="space-y-4 text-xs text-white/50">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider inline-flex items-center gap-1">
                    Facebook <span className="text-[10px] text-white/30">↗</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider inline-flex items-center gap-1">
                    Instagram <span className="text-[10px] text-white/30">↗</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider inline-flex items-center gap-1">
                    YouTube <span className="text-[10px] text-white/30">↗</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 uppercase font-bold tracking-wider inline-flex items-center gap-1">
                    Twitter <span className="text-[10px] text-white/30">↗</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* 3. Lower Metadata Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs text-white/30">
          <div>
            © {new Date().getFullYear()} Shree Prathishthan Trust. All Rights Reserved.
          </div>
          <div className="flex gap-1.5 items-center font-sans font-light">
            <span>Designed with Devotion</span>
            <span className="text-white text-sm">❤</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
