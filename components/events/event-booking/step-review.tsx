"use client";

import React from "react";
import { 
  ClipboardCheck, 
  Edit3, 
  User, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  HelpCircle,
  Building2,
  Accessibility,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Ticket,
  Compass
} from "lucide-react";
import { EventBookingInput } from "@/lib/validations";
import { getEventById } from "@/lib/events-data";

interface StepReviewProps {
  formData: Partial<EventBookingInput>;
  updateFields: (fields: Partial<EventBookingInput>) => void;
  errors: Record<string, string>;
  onJumpToStep: (step: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepReview({
  formData,
  updateFields,
  errors,
  onJumpToStep,
  onNext,
  onBack,
}: StepReviewProps) {
  const activeEvent = getEventById(formData.eventId || "ganesh-utsav-2026");
  const customQuestions = activeEvent?.customQuestions || [];
  const customAnswers = formData.customAnswers || {};
  const isWaitlist = Boolean(activeEvent?.isCapacityFull && activeEvent?.waitlistEnabled);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 select-none text-left">
      {/* Section Header */}
      <div className="border-b border-black/8 pb-5 space-y-1">
        <div className="inline-flex items-center gap-2 text-saffron text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] font-sans">
          <span>Step 03 • Final Verification</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-normal font-heading text-neutral-900 uppercase tracking-tight">
          Review &amp; Confirm Pass
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
          Verify your registration details, custom answers, and celebration schedule before generating your official digital pass.
        </p>
      </div>

      {/* Verification Dossier Cards */}
      <div className="space-y-6">
        
        {/* Section 1: Personal Details Dossier */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-black/5 pb-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-saffron/10 text-saffron flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-neutral-900 text-sm sm:text-base font-heading uppercase tracking-wide">
                1. Attendee Profile
              </h4>
            </div>

            <button
              type="button"
              onClick={() => onJumpToStep(1)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron hover:text-gold transition-colors cursor-pointer bg-saffron/10 hover:bg-saffron/15 px-3.5 py-1 rounded-full font-sans"
            >
              <Edit3 className="w-3 h-3" /> Edit
            </button>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs sm:text-sm font-sans">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Full Name</span>
              <span className="font-bold text-neutral-900 mt-0.5 block">{formData.fullName || "—"}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Phone Number</span>
              <span className="font-semibold text-neutral-900 mt-0.5 block">{formData.mobileNumber || "—"}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Email Address</span>
              <span className="font-semibold text-neutral-900 mt-0.5 block">{formData.email || "—"}</span>
            </div>
            <div className="sm:col-span-2 md:col-span-3 pt-1 border-t border-black/5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Residential Area</span>
              <span className="font-medium text-neutral-800 mt-0.5 block">{formData.streetArea || "Indira Nagar, Nashik"}</span>
            </div>
          </div>

          {/* Custom Questions Breakdown */}
          {customQuestions.length > 0 && (
            <div className="pt-4 border-t border-black/5 space-y-3">
              <span className="text-[10px] uppercase font-bold text-saffron tracking-widest flex items-center gap-1.5 font-sans">
                <HelpCircle className="w-3.5 h-3.5" /> Celebration Specific Answers
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                {customQuestions.map((q) => {
                  const val = customAnswers[q.id];
                  return (
                    <div key={q.id} className="p-3 rounded-2xl bg-neutral-50/80 border border-black/5 space-y-1">
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold leading-tight">{q.label}</span>
                      <span className="font-bold text-neutral-900 block">
                        {typeof val === "boolean" ? (val ? "Yes, Confirmed" : "No") : (val || "Not specified")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Celebration & Slot Details Dossier */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-black/5 pb-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-saffron/10 text-saffron flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-neutral-900 text-sm sm:text-base font-heading uppercase tracking-wide">
                2. Celebration, Schedule &amp; Venue
              </h4>
            </div>

            <button
              type="button"
              onClick={() => onJumpToStep(2)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron hover:text-gold transition-colors cursor-pointer bg-saffron/10 hover:bg-saffron/15 px-3.5 py-1 rounded-full font-sans"
            >
              <Edit3 className="w-3 h-3" /> Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs sm:text-sm font-sans">
            <div className="sm:col-span-2">
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Booked Celebration</span>
              <span className="font-bold text-saffron text-sm sm:text-base font-heading uppercase mt-0.5 block">
                {activeEvent?.title}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Official Dates</span>
              <span className="font-semibold text-neutral-900 mt-0.5 block">{activeEvent?.date}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Attendance Date</span>
              <span className="font-bold text-neutral-900 mt-0.5 block">{formData.dateOfBirth || activeEvent?.startDate || "—"}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Selected Slot</span>
              <span className="font-semibold text-neutral-900 capitalize mt-0.5 block">{formData.preferredTimeSlot || "Morning"} Slot</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Number of Passes</span>
              <span className="font-bold text-neutral-900 mt-0.5 block">{formData.numberOfParticipants || 1} Person(s) Pass</span>
            </div>

            <div className="sm:col-span-2 pt-1 border-t border-black/5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Venue &amp; Location</span>
              <span className="font-medium text-neutral-800 mt-0.5 block">
                {activeEvent?.venueName} — {activeEvent?.addressLine1}, {activeEvent?.city}, {activeEvent?.state} {activeEvent?.postalCode}
              </span>
            </div>
            <div className="pt-1 border-t border-black/5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Check-in Mode</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-neutral-800 bg-neutral-100 px-3 py-1 rounded-full border border-black/8 mt-1 text-xs">
                <Compass className="w-3.5 h-3.5 text-saffron" />
                <span>{activeEvent?.eventMode || "In-Person"}</span>
              </span>
            </div>
          </div>

          {/* Accessibility Tags */}
          {activeEvent?.accessibilityInfo && activeEvent.accessibilityInfo.length > 0 && (
            <div className="pt-4 border-t border-black/5 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1.5 font-sans">
                <Accessibility className="w-3.5 h-3.5 text-saffron" /> Accessibility &amp; On-Site Safety Facilities
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-sans">
                {activeEvent.accessibilityInfo.map((acc, i) => (
                  <span key={i} className="px-3 py-1 bg-neutral-50 rounded-full border border-black/8 text-slate-700 font-medium text-[11px]">
                    ✓ {acc}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Prominent Verification Notice Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-saffron/5 via-amber-500/5 to-saffron/5 border border-saffron/25 rounded-3xl space-y-2 font-sans">
        <div className="flex items-center gap-2 text-neutral-900 font-bold font-heading text-sm sm:text-base uppercase">
          <ShieldCheck className="w-5 h-5 text-saffron shrink-0" />
          <span>{isWaitlist ? "Priority Waitlist Verification" : "Official Free Pass Verification"}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          {isWaitlist
            ? "Your pass request will be placed on our priority waitlist. Our coordination team will reach out via SMS if further passes become available."
            : "No online payment is collected. This entry pass is 100% free for community members. Your digital pass will be confirmed immediately."}
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-black/8">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs sm:text-sm uppercase rounded-full transition-all cursor-pointer font-sans"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-8 py-4 bg-saffron hover:bg-saffron/90 text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-lg shadow-saffron/20 hover:shadow-saffron/30 transition-all duration-300 cursor-pointer font-sans group"
        >
          <Ticket className="w-4 h-4" />
          <span>{isWaitlist ? "Confirm Waitlist Entry" : "Confirm & Generate Digital Pass"}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </form>
  );
}
