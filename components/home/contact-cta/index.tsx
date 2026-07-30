"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-slide-in",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
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
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-white/40 border-y border-saffron/10"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Office Contacts */}
          <div className="lg:col-span-5 contact-slide-in">
            <span className="text-saffron font-bold text-xs uppercase tracking-widest block mb-4">Connect With Us</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-8 font-heading">
              Get in Touch
            </h2>
            <p className="text-base text-slate-grey leading-relaxed mb-8">
              Have questions regarding village initiatives, donation audits, or coordinating festival groups? Reach out to our central administrative desk.
            </p>

            <div className="space-y-6">
              {/* Telephone */}
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-saffron/10 flex items-center justify-center text-saffron">
                  <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-slate-grey uppercase font-bold tracking-widest block">Helpline Phone</span>
                  <span className="text-base font-extrabold text-foreground font-heading">+91 22 9876 5432</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-slate-grey uppercase font-bold tracking-widest block">Administrative Mail</span>
                  <span className="text-base font-extrabold text-foreground font-heading">desk@shreeprathishthan.org</span>
                </div>
              </div>

              {/* Office Location */}
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-slate-grey uppercase font-bold tracking-widest block">Headquarters Office</span>
                  <span className="text-base font-extrabold text-foreground font-heading">Shivaji Park, Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 contact-slide-in glass-panel p-8 sm:p-10 rounded-block border border-saffron/20 bg-white">
            <h3 className="text-2xl font-extrabold text-foreground mb-6 font-heading">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] text-slate-grey uppercase font-bold tracking-widest block mb-2">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter name"
                    className="w-full px-4 py-3 rounded-interactive border border-border bg-background focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-grey uppercase font-bold tracking-widest block mb-2">Your Email</label>
                  <input 
                    type="email" 
                    placeholder="Enter email"
                    className="w-full px-4 py-3 rounded-interactive border border-border bg-background focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-grey uppercase font-bold tracking-widest block mb-2">Subject</label>
                <select className="w-full px-4 py-3 rounded-interactive border border-border bg-background focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 text-sm transition-all">
                  <option>General Support / Inquiry</option>
                  <option>Corporate Partnership / CSR</option>
                  <option>Volunteer Registration</option>
                  <option>Festival Coordination Support</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-grey uppercase font-bold tracking-widest block mb-2">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="Type message here..."
                  className="w-full px-4 py-3 rounded-interactive border border-border bg-background focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 text-sm transition-all resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-saffron hover:bg-saffron/90 text-white font-extrabold py-4 rounded-full text-xs uppercase tracking-widest shadow-md shadow-saffron/25 transition-all hover:scale-[1.01]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
