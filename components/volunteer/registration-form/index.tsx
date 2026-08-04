"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VolunteerRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    age: "",
    track: "event-logistics",
    availability: "weekends",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".form-reveal",
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
    if (!formData.name || !formData.phone || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section
      id="registration-form"
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background scroll-mt-20"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40 animate-pulse" />
      <div className="max-w-6xl mx-auto relative z-10 form-reveal">
        <div className="glass-panel p-8 sm:p-12 rounded-block bg-white border border-saffron/10 shadow-2xl">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-heading">
              Volunteer Registration Form
            </h2>
            <p className="text-slate-grey mt-3 text-sm sm:text-base">
              Submit your interest below. Our district onboarding coordinates will review your file and reach out shortly.
            </p>
            <div className="w-12 h-1 bg-saffron mx-auto mt-4 rounded-full" />
          </div>

          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-saffron/10 text-saffron flex items-center justify-center text-2xl font-bold font-heading mx-auto border border-saffron/20">
                ✓
              </div>
              <h3 className="text-2xl font-extrabold text-foreground font-heading">
                Application Received!
              </h3>
              <p className="text-slate-grey max-w-md mx-auto text-sm">
                Thank you for applying, **{formData.name}**. We have logged your email (**{formData.email}**) and phone number (**{formData.phone}**). A regional team lead will call you to explain upcoming drive locations and coordinates.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    location: "",
                    age: "",
                    track: "event-logistics",
                    availability: "weekends",
                    message: "",
                  });
                }}
                className="text-xs uppercase font-extrabold tracking-widest text-saffron hover:underline mt-4 cursor-pointer"
              >
                Submit another application
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
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-saffron focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-saffron focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-saffron focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="location" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                    District / City
                  </label>
                  <input
                    type="text"
                    id="location"
                    required
                    placeholder="e.g. Bhandup, Mumbai"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-saffron focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="age" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    required
                    min="16"
                    max="100"
                    placeholder="Min age: 16"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-saffron focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="track" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                    Preferred Volunteer Track
                  </label>
                  <select
                    id="track"
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-saffron focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="event-logistics">Cultural Event Logistics (Ganeshotsav / Dahi Handi)</option>
                    <option value="medical-camps">Medical Camp & Blood drives (Arogya)</option>
                    <option value="tree-plantation">Tree Plantation Drives (Vasundhara)</option>
                    <option value="relief-work">Socio-Educational & Material Relief (Seva)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="availability" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                    Time Availability
                  </label>
                  <select
                    id="availability"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-saffron focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="weekends">Weekends Only</option>
                    <option value="weekdays">Weekdays Only</option>
                    <option value="both">Both Weekdays & Weekends</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                  Relevant Skills / Message (Optional)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Share any past NGO skills, medical experience, or specific questions..."
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
                  Submit Volunteer Application
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
