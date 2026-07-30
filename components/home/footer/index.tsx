"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/90 py-16 px-6 md:px-12 relative overflow-hidden border-t border-saffron/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-saffron/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Logo & Slogan Column */}
          <div className="md:col-span-4 flex flex-col justify-start">
            <h3 className="text-2xl font-black tracking-tight text-white mb-4 font-heading flex items-center gap-2">
              <span className="text-saffron">Shree</span>
              <span>Prathishthan</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              संस्कृति: सेवा च परम धर्म: — Translating Maharashtra's rich cultural devotion into active social progress and rural empowerment.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-saffron mb-6">Explore</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><a href="#about" className="hover:text-gold transition-colors">About Us</a></li>
              <li><a href="#featured-events" className="hover:text-gold transition-colors">Festivals Spotlight</a></li>
              <li><a href="#social-work" className="hover:text-gold transition-colors">Welfare Operations</a></li>
              <li><a href="#gallery" className="hover:text-gold transition-colors">Immersive Gallery</a></li>
            </ul>
          </div>

          {/* Pillars Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-gold mb-6">Pillars</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><a href="#social-work" className="hover:text-saffron transition-colors">Shiksha Education</a></li>
              <li><a href="#social-work" className="hover:text-saffron transition-colors">Arogya Healthcare</a></li>
              <li><a href="#social-work" className="hover:text-saffron transition-colors">Vasundhara Ecology</a></li>
              <li><a href="#volunteer" className="hover:text-saffron transition-colors">Volunteer Portal</a></li>
            </ul>
          </div>

          {/* Certifications / Contact Info */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-6">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><span>Reg: Bombay Public Trust Act</span></li>
              <li><a href="#" className="hover:text-gold transition-colors">Annual Audit Reports</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Transparency Index</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Shree Prathishthan Trust. All Rights Reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-saffron transition-colors">Instagram</a>
            <a href="#" className="hover:text-saffron transition-colors">Facebook</a>
            <a href="#" className="hover:text-saffron transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
