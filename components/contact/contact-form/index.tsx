"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MailOpen, Loader2, AlertCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

// ─── Field Error Component ────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
      <AlertCircle className="w-3 h-3 shrink-0" />
      {message}
    </p>
  );
}

// ─── Input class helper ───────────────────────────────────────────────────────

function inputClass(hasError?: boolean) {
  return [
    "w-full bg-slate-50/50 border rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-neutral-900 font-sans",
    "placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all duration-300 shadow-inner",
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-slate-200 focus:border-saffron focus:ring-2 focus:ring-saffron/10",
  ].join(" ");
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  // ── GSAP entrance animation (unchanged) ────────────────────────────────────
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

  // ── Client-side validation ─────────────────────────────────────────────────
  function validate(): boolean {
    const errors: FieldErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim() || formData.name.trim().length < 2)
      errors.name = "Full name must be at least 2 characters.";
    if (!formData.email.trim() || !emailRegex.test(formData.email))
      errors.email = "Please enter a valid email address.";
    if (!formData.subject.trim() || formData.subject.trim().length < 2)
      errors.subject = "Subject must be at least 2 characters.";
    if (!formData.message.trim() || formData.message.trim().length < 10)
      errors.message = "Message must be at least 10 characters.";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  // ── Form submission ────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "loading") return; // prevent duplicate submissions
    if (!validate()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json() as { success: boolean; message: string; errors?: Array<{ field: string; message: string }> };

      if (!response.ok || !result.success) {
        // Map server validation errors back to fields if present
        if (result.errors && Array.isArray(result.errors)) {
          const serverErrors: FieldErrors = {};
          result.errors.forEach((err) => {
            if (err.field in INITIAL_FORM) {
              (serverErrors as Record<string, string>)[err.field] = err.message;
            }
          });
          setFieldErrors(serverErrors);
        }
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  // ── Reset handler ──────────────────────────────────────────────────────────
  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setFieldErrors({});
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <section
      id="contact-form"
      ref={containerRef}
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-background scroll-mt-20"
    >
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-40 animate-pulse" />
      <div className="max-w-4xl mx-auto relative z-10 contact-form-reveal">
        <div className="glass-panel p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-block bg-white border border-saffron/10 shadow-2xl">

          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight font-heading leading-tight uppercase">
              Get In Touch With Us
            </h2>
            <p className="text-slate-grey mt-2.5 sm:mt-3 text-xs sm:text-base font-sans leading-[1.7] sm:leading-relaxed font-normal">
              Submit your inquiry below. Our administrative office will review your message and reach out shortly.
            </p>
            <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
          </div>

          {/* ── Success State ────────────────────────────────────────────── */}
          {status === "success" ? (
            <div className="text-center py-8 sm:py-12 space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-saffron/20 to-saffron/5 text-saffron flex items-center justify-center mx-auto border border-saffron/30 shadow-md">
                <MailOpen className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.5]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-normal text-neutral-900 font-heading uppercase">
                Message Sent Successfully!
              </h3>
              <p className="text-slate-grey max-w-md mx-auto text-xs sm:text-sm font-sans leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. We have logged your request under
                subject <strong>&ldquo;{formData.subject || "General Inquiry"}&rdquo;</strong>.
                A liaison officer will email you at <strong>{formData.email}</strong> within 24–48 hours.
              </p>
              <button
                onClick={handleReset}
                className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.2em] text-saffron hover:underline mt-3 sm:mt-4 cursor-pointer font-sans"
              >
                Send another message
              </button>
            </div>
          ) : (
            /* ── Form ───────────────────────────────────────────────────── */
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>

              {/* Global error banner */}
              {status === "error" && errorMessage && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-red-700 font-sans">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="cf-name" className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.18em] text-neutral-900 block font-sans">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="cf-name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={status === "loading"}
                    aria-describedby={fieldErrors.name ? "cf-name-error" : undefined}
                    className={inputClass(!!fieldErrors.name)}
                  />
                  <FieldError message={fieldErrors.name} />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="cf-email" className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.18em] text-neutral-900 block font-sans">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="cf-email"
                    required
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={status === "loading"}
                    aria-describedby={fieldErrors.email ? "cf-email-error" : undefined}
                    className={inputClass(!!fieldErrors.email)}
                  />
                  <FieldError message={fieldErrors.email} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="cf-phone" className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.18em] text-neutral-900 block font-sans">
                    Phone Number <span className="text-slate-400 normal-case font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="cf-phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={status === "loading"}
                    className={inputClass(false)}
                  />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="cf-subject" className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.18em] text-neutral-900 block font-sans">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="cf-subject"
                    required
                    placeholder="e.g. CSR Partnership, Grievance"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    disabled={status === "loading"}
                    aria-describedby={fieldErrors.subject ? "cf-subject-error" : undefined}
                    className={inputClass(!!fieldErrors.subject)}
                  />
                  <FieldError message={fieldErrors.subject} />
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <label htmlFor="cf-message" className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.18em] text-neutral-900 block font-sans">
                  Detailed Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="cf-message"
                  required
                  rows={5}
                  placeholder="Tell us what you'd like to coordinate..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={status === "loading"}
                  aria-describedby={fieldErrors.message ? "cf-message-error" : undefined}
                  className={inputClass(!!fieldErrors.message) + " resize-none"}
                />
                <FieldError message={fieldErrors.message} />
              </div>

              <div className="text-center pt-2 sm:pt-4">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto bg-saffron hover:bg-saffron/90 hover:shadow-lg hover:shadow-saffron/20 text-white font-bold text-xs uppercase tracking-[0.2em] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full transition-all duration-300 active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 font-sans"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
