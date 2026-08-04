"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function JoinMission() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    interest: "blood-donation",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".join-reveal",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;
    setSubmitted(true);
  };

  return (
    <section
      id="join-mission"
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background scroll-mt-20"
    >
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none opacity-40 animate-pulse" />
      <div className="max-w-5xl mx-auto relative z-10 join-reveal">
        <div className="glass-panel p-8 sm:p-12 rounded-block bg-white border border-saffron/10 shadow-2xl">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-heading">
              Join Our Mission
            </h2>
            <p className="text-slate-grey mt-3 text-sm sm:text-base">
              Be a catalyst for change. Register your coordinates to donate blood, plant saplings, or support local relief distributions.
            </p>
            <div className="w-12 h-1 bg-saffron mx-auto mt-4 rounded-full" />
          </div>

          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-saffron/10 text-saffron flex items-center justify-center text-2xl font-bold font-heading mx-auto border border-saffron/20">
                ✓
              </div>
              <h3 className="text-2xl font-extrabold text-foreground font-heading">
                Registration Successful!
              </h3>
              <p className="text-slate-grey max-w-md mx-auto text-sm">
                Thank you, **{formData.name}**. One of our community coordinators will contact you shortly on **{formData.contact}** to align on upcoming initiatives.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", contact: "", interest: "blood-donation", message: "" });
                }}
                className="text-xs uppercase font-extrabold tracking-widest text-saffron hover:underline mt-4"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-saffron focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                    Phone / Email
                  </label>
                  <input
                    type="text"
                    id="contact"
                    required
                    placeholder="Where can we reach you?"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-saffron focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="interest" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                  Area of Interest
                </label>
                <select
                  id="interest"
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-saffron focus:bg-white transition-all cursor-pointer"
                >
                  <option value="blood-donation">Blood Donation Camp (Arogya)</option>
                  <option value="tree-plantation">Tree Plantation Drives (Vasundhara)</option>
                  <option value="charity-work">Socio-Educational & Material Relief (Seva)</option>
                  <option value="all">All Initiatives</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                  Short Message (Optional)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us a bit about yourself or ask any questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-saffron focus:bg-white transition-all resize-none"
                />
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-saffron hover:bg-saffron/90 hover:shadow-lg hover:shadow-saffron/20 text-white font-extrabold text-xs uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-300 active:scale-95 cursor-pointer inline-block"
                >
                  Send Registration
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
