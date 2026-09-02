"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EventsRegistration() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reg-slide-in",
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
      id="register"
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="glass-panel p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-block border border-saffron/20 bg-white reg-slide-in shadow-xl">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-4xl font-normal text-neutral-900 tracking-tight font-heading leading-tight uppercase">
              Register for an Initiative
            </h2>
            <p className="text-slate-grey mt-2 max-w-lg mx-auto font-sans leading-relaxed text-xs sm:text-sm font-normal">
              Select your event or campaign and submit your info to connect with our Indira Nagar, Nashik organizers.
            </p>
          </div>

          <form className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="text-[10px] text-slate-grey uppercase font-bold tracking-[0.2em] block mb-1.5 sm:mb-2 font-sans">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter name"
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-interactive border border-border bg-background focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 text-base sm:text-sm transition-all font-sans"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-grey uppercase font-bold tracking-[0.2em] block mb-1.5 sm:mb-2 font-sans">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter email"
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-interactive border border-border bg-background focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 text-base sm:text-sm transition-all font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="text-[10px] text-slate-grey uppercase font-bold tracking-[0.2em] block mb-1.5 sm:mb-2 font-sans">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="Enter phone"
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-interactive border border-border bg-background focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 text-base sm:text-sm transition-all font-sans"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-grey uppercase font-bold tracking-[0.2em] block mb-1.5 sm:mb-2 font-sans">Target Event / Campaign</label>
                <select className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-interactive border border-border bg-background focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 text-base sm:text-sm transition-all font-sans">
                  <option>Shree Ganeshotsav 2026 (Aug 27 - Sep 06)</option>
                  <option>Gudipadwa Swagat Yatra (Mar 19)</option>
                  <option>Bhavya Blood Donation &amp; Health Camp (Aug 30)</option>
                  <option>Annual Sports &amp; Cricket Tournament (Dec 18 - 25)</option>
                  <option>Navratri Utsav &amp; Dandiya Nights (Sep 22 - Oct 02)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-grey uppercase font-bold tracking-[0.2em] block mb-1.5 sm:mb-2 font-sans">Additional Experience / Notes</label>
              <textarea 
                rows={3} 
                placeholder="Let us know if you have previous medical, logistical, or musical experience..."
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-interactive border border-border bg-background focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 text-base sm:text-sm transition-all resize-none font-sans"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-saffron hover:bg-saffron/90 text-white font-bold py-3.5 sm:py-4 rounded-full text-xs uppercase tracking-[0.2em] shadow-md shadow-saffron/25 transition-all hover:scale-[1.01] font-sans"
            >
              Submit Registration
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
