"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MailOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-form-reveal",
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
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section
      id="contact-form"
      ref={containerRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-background scroll-mt-20"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40 animate-pulse" />
      <div className="max-w-4xl mx-auto relative z-10 contact-form-reveal">
        <div className="glass-panel p-8 sm:p-12 rounded-block bg-white border border-saffron/10 shadow-2xl">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight font-heading">
              Get In Touch With Us
            </h2>
            <p className="text-slate-grey mt-3 text-sm sm:text-base">
              Submit your inquiry below. Our administrative office will review your message and reach out shortly.
            </p>
            <div className="w-12 h-1 bg-saffron mx-auto mt-4 rounded-full" />
          </div>

          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-saffron/20 to-saffron/5 text-saffron flex items-center justify-center mx-auto border border-saffron/30 shadow-md">
                <MailOpen className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="text-2xl font-extrabold text-foreground font-heading">
                Message Sent Successfully!
              </h3>
              <p className="text-slate-grey max-w-md mx-auto text-sm">
                Thank you, **{formData.name}**. We have logged your request under subject **"{formData.subject || "General Inquiry"}"**. A liaison officer will email you at **{formData.email}** within 24-48 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                  });
                }}
                className="text-xs uppercase font-extrabold tracking-widest text-saffron hover:underline mt-4 cursor-pointer"
              >
                Send another message
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
                    className="w-full bg-slate-50/50 border border-slate-200 focus:border-saffron focus:ring-2 focus:ring-saffron/10 focus:bg-white rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-slate-400 focus:outline-none transition-all duration-300 shadow-inner"
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
                    className="w-full bg-slate-50/50 border border-slate-200 focus:border-saffron focus:ring-2 focus:ring-saffron/10 focus:bg-white rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-slate-400 focus:outline-none transition-all duration-300 shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200 focus:border-saffron focus:ring-2 focus:ring-saffron/10 focus:bg-white rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-slate-400 focus:outline-none transition-all duration-300 shadow-inner"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    placeholder="e.g. CSR Partnership, Grievance"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200 focus:border-saffron focus:ring-2 focus:ring-saffron/10 focus:bg-white rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-slate-400 focus:outline-none transition-all duration-300 shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs uppercase font-extrabold tracking-wider text-foreground block">
                  Detailed Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Tell us what you'd like to coordinate..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50/50 border border-slate-200 focus:border-saffron focus:ring-2 focus:ring-saffron/10 focus:bg-white rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-slate-400 focus:outline-none transition-all duration-300 shadow-inner resize-none"
                />
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-saffron hover:bg-saffron/90 hover:shadow-lg hover:shadow-saffron/20 text-white font-extrabold text-xs uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-300 active:scale-95 cursor-pointer inline-block"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
