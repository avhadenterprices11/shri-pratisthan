"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-saffron text-white relative overflow-hidden border-t border-white/10">
      {/* Inline styles for high-performance marquee scrolling */}
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        .animate-marquee-left {
          animation: marquee 28s linear infinite;
        }
      `}</style>

      {/* Ribbon: Left-to-Right Scrolling Brand Banner */}
      <div className="relative w-full overflow-hidden whitespace-nowrap py-3 bg-white border-b border-white/10 flex select-none pointer-events-none">
        <div className="inline-flex gap-8 animate-marquee-left shrink-0 min-w-full justify-around">
          <span className="text-[10px] uppercase font-black tracking-widest text-slate-900 font-sans">Shree Prathishthan Trust</span>
          <span className="text-slate-400 font-sans">•</span>
          <span className="text-[10px] uppercase font-black tracking-widest text-saffron font-sans">Cultural Legacy</span>
          <span className="text-slate-400 font-sans">•</span>
          <span className="text-[10px] uppercase font-black tracking-widest text-saffron font-sans">Social Progress</span>
          <span className="text-slate-400 font-sans">•</span>
          <span className="text-[10px] uppercase font-black tracking-widest text-saffron font-sans">Rural Empowerment</span>
          <span className="text-slate-400 font-sans">•</span>
        </div>
        <div className="inline-flex gap-8 animate-marquee-left shrink-0 min-w-full justify-around" aria-hidden="true">
          <span className="text-[10px] uppercase font-black tracking-widest text-slate-900 font-sans">Shree Prathishthan Trust</span>
          <span className="text-slate-400 font-sans">•</span>
          <span className="text-[10px] uppercase font-black tracking-widest text-saffron font-sans">Cultural Legacy</span>
          <span className="text-slate-400 font-sans">•</span>
          <span className="text-[10px] uppercase font-black tracking-widest text-saffron font-sans">Social Progress</span>
          <span className="text-slate-400 font-sans">•</span>
          <span className="text-[10px] uppercase font-black tracking-widest text-saffron font-sans">Rural Empowerment</span>
          <span className="text-slate-400 font-sans">•</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 py-16 px-6 md:px-12">

        {/* Lower Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">

          {/* Brand Narrative Column */}
          <div className="md:col-span-5 flex flex-col justify-start items-start pr-4">
            <h3 className="text-xl font-black tracking-tight text-white mb-4 font-heading flex items-center gap-2 select-none">
              <span>Shree</span>
              <span>Prathishthan</span>
            </h3>

            <p className="text-sm text-white/80 leading-relaxed max-w-sm font-light font-sans">
              Translating Maharashtra's rich cultural devotion into active social progress, athletic safety, environmental stewardship, and youth coordination.
            </p>
          </div>

          {/* Coordinates Column */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/70 mb-6 font-sans">Coordinates</h4>
            <ul className="space-y-4 text-sm text-white/90">
              <li>
                <span className="text-white font-extrabold block mb-0.5 font-heading uppercase text-xs tracking-wider">Pune Hub</span>
                <span className="text-xs text-white/80 leading-tight block">Shaniwar Peth, Pune, MH 411030</span>
              </li>
              <li>
                <span className="text-white font-extrabold block mb-0.5 font-heading uppercase text-xs tracking-wider">Mumbai Hub</span>
                <span className="text-xs text-white/80 leading-tight block">Dadar West, Mumbai, MH 400028</span>
              </li>
              <li>
                <span className="text-xs text-white/70 block mb-0.5">Contact Inbox</span>
                <a href="mailto:contact@shripratisthan.org" className="hover:text-amber-200 transition-colors duration-200 text-xs font-sans font-bold">
                  contact@shripratisthan.org
                </a>
              </li>
            </ul>
          </div>

          {/* Directories Columns */}
          <div className="grid grid-cols-2 gap-8 md:col-span-4">
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/70 mb-6 font-sans">Explore</h4>
              <ul className="space-y-3 text-sm text-white/90">
                <li><a href="#about" className="hover:text-amber-200 transition-colors duration-200 block py-0.5 font-medium">About Us</a></li>
                <li><a href="#featured-events" className="hover:text-amber-200 transition-colors duration-200 block py-0.5 font-medium">Festivals</a></li>
                <li><a href="#social-work" className="hover:text-amber-200 transition-colors duration-200 block py-0.5 font-medium">Initiatives</a></li>
                <li><a href="#gallery" className="hover:text-amber-200 transition-colors duration-200 block py-0.5 font-medium">Gallery</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/70 mb-6 font-sans">Connect</h4>
              <ul className="space-y-3 text-sm text-white/90">
                <li><a href="#" className="hover:text-amber-200 transition-colors duration-200 block py-0.5 font-medium">Instagram</a></li>
                <li><a href="#" className="hover:text-amber-200 transition-colors duration-200 block py-0.5 font-medium">Facebook</a></li>
                <li><a href="#" className="hover:text-amber-200 transition-colors duration-200 block py-0.5 font-medium">LinkedIn</a></li>
                <li><a href="#" className="hover:text-amber-200 transition-colors duration-200 block py-0.5 font-medium">Twitter</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Lower Metadata Row */}
        <div className="border-t border-white/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/60 select-none">
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
