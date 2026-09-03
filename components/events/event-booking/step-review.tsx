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
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle,
  Accessibility
} from "lucide-react";
import { EventBookingInput } from "@/lib/validations";
import { getEventById } from "@/lib/events-data";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t } = useLanguage();
  const activeEvent = getEventById(formData.eventId || "ganesh-utsav-2026");
  const customQuestions = activeEvent?.customQuestions || [];
  const customAnswers = formData.customAnswers || {};
  const isWaitlist = Boolean(activeEvent?.isCapacityFull && activeEvent?.waitlistEnabled);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 select-none">
      <div className="border-b border-neutral-200 pb-4">
        <h3 className="text-xl md:text-2xl font-bold font-heading text-neutral-900 flex items-center gap-2">
          <ClipboardCheck className="w-6 h-6 text-saffron" />
          {t("eventsPage.booking.step3")}
        </h3>
        <p className="text-sm text-neutral-600 mt-1 font-sans">
          {t("eventsPage.booking.reviewDesc")}
        </p>
      </div>

      {/* Review Cards Grid */}
      <div className="space-y-6">
        
        {/* Section 1: Personal Details & Custom Questions */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 sm:p-6 relative transition-all hover:border-saffron/30 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3">
            <h4 className="font-bold text-neutral-900 flex items-center gap-2 text-base font-heading uppercase">
              <User className="w-4 h-4 text-saffron" />
              1. {t("eventsPage.booking.attendeeTitle")}
            </h4>
            <button
              type="button"
              onClick={() => onJumpToStep(1)}
              className="inline-flex items-center gap-1 text-xs font-bold text-saffron hover:underline cursor-pointer bg-saffron/10 px-3 py-1 rounded-full font-sans"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>

          {/* Basic Personal Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs md:text-sm font-sans">
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">{t("eventsPage.booking.fullName")}</span>
              <span className="font-semibold text-neutral-900">{formData.fullName || "-"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">{t("eventsPage.booking.phone")}</span>
              <span className="font-medium text-neutral-900">{formData.mobileNumber || "-"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">{t("eventsPage.booking.email")}</span>
              <span className="font-medium text-neutral-900">{formData.email || "-"}</span>
            </div>
            <div className="sm:col-span-2 md:col-span-3">
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">{t("eventsPage.booking.address")}</span>
              <span className="font-medium text-neutral-900">{formData.streetArea || "Indira Nagar, Nashik"}</span>
            </div>
          </div>

          {/* Custom Registration Answers Breakdown */}
          {customQuestions.length > 0 && (
            <div className="pt-3 border-t border-neutral-200/60 space-y-2">
              <span className="text-[11px] uppercase font-bold text-saffron tracking-wider flex items-center gap-1 font-sans">
                <HelpCircle className="w-3.5 h-3.5" /> Custom Registration Answers
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                {customQuestions.map((q) => {
                  const val = customAnswers[q.id];
                  return (
                    <div key={q.id} className="p-2.5 rounded-xl bg-white border border-neutral-200">
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold leading-tight">{q.label}</span>
                      <span className="font-bold text-slate-800 mt-0.5 block">
                        {typeof val === "boolean" ? (val ? "Yes" : "No") : (val || "Not specified")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Event Details, Booking Slot & Venue */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 sm:p-6 relative transition-all hover:border-saffron/30 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3">
            <h4 className="font-bold text-neutral-900 flex items-center gap-2 text-base font-heading uppercase">
              <Calendar className="w-4 h-4 text-saffron" />
              2. {t("eventsPage.booking.dateLabel")} &amp; {t("eventsPage.booking.venueLabel")}
            </h4>
            <button
              type="button"
              onClick={() => onJumpToStep(2)}
              className="inline-flex items-center gap-1 text-xs font-bold text-saffron hover:underline cursor-pointer bg-saffron/10 px-3 py-1 rounded-full font-sans"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs md:text-sm font-sans">
            <div className="sm:col-span-2">
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Event Name</span>
              <span className="font-bold text-saffron text-sm md:text-base">{activeEvent?.title}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Official Event Date</span>
              <span className="font-semibold text-neutral-900">{activeEvent?.date}</span>
            </div>

            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">{t("eventsPage.booking.dateLabel")}</span>
              <span className="font-bold text-neutral-900">{formData.dateOfBirth || activeEvent?.startDate || "-"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Time Slot</span>
              <span className="font-semibold text-neutral-900 capitalize">{formData.preferredTimeSlot || "Morning"} Slot</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Attendees</span>
              <span className="font-bold text-neutral-900">{formData.numberOfParticipants || 1} Pass(es)</span>
            </div>

            <div className="sm:col-span-2">
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">{t("eventsPage.booking.venueLabel")}</span>
              <span className="font-medium text-neutral-900 block">
                {activeEvent?.venueName} — {activeEvent?.addressLine1}, {activeEvent?.city}, {activeEvent?.state} {activeEvent?.postalCode}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">{t("eventsPage.booking.modeLabel")}</span>
              <span className="inline-flex items-center gap-1 font-bold text-slate-800 bg-white px-2.5 py-0.5 rounded-full border border-black/10 mt-0.5 font-sans">
                <MapPin className="w-3 h-3 text-saffron" />
                {activeEvent?.eventMode || "In-Person"}
              </span>
            </div>
          </div>

          {/* Section 3: Accessibility Information */}
          {activeEvent?.accessibilityInfo && activeEvent.accessibilityInfo.length > 0 && (
            <div className="pt-3 border-t border-neutral-200/60 space-y-2">
              <span className="text-[11px] uppercase font-bold text-slate-600 tracking-wider flex items-center gap-1 font-sans">
                <Accessibility className="w-3.5 h-3.5 text-saffron" /> Accessibility &amp; Safety
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-sans">
                {activeEvent.accessibilityInfo.map((acc, i) => (
                  <span key={i} className="px-3 py-1 bg-white rounded-full border border-neutral-200 text-slate-700 font-medium text-[11px]">
                    ✓ {acc}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Prominent Follow-up Notice */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-saffron/10 via-amber-50 to-saffron/10 border-2 border-saffron/30 rounded-2xl space-y-2 font-sans">
        <div className="flex items-center gap-2.5 text-neutral-900 font-bold font-heading text-base uppercase">
          <CheckCircle2 className="w-5 h-5 text-saffron shrink-0" />
          <span>{isWaitlist ? "Waitlist Registration Notice" : "Event Booking Notice"}</span>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-neutral-800 leading-relaxed">
          {isWaitlist
            ? "Your request will be placed on our priority waitlist. Our coordination team will notify you via SMS as soon as additional seating opens."
            : "We will address and contact you as soon as possible regarding your event booking and ground coordination details."}
        </p>
        <p className="text-[11px] text-slate-500">
          Shree Pratishtan (Indira Nagar, Nashik) verifies every booking slot for festival crowd safety and smooth gate entry.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs sm:text-sm uppercase rounded-xl transition-all cursor-pointer font-sans"
        >
          &larr; {t("eventsPage.booking.prevStep")}
        </button>

        <button
          type="submit"
          className="px-8 py-3.5 bg-saffron hover:bg-saffron/90 text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-lg hover:shadow-saffron/25 transition-all duration-300 cursor-pointer font-sans"
        >
          {isWaitlist ? "Confirm Waitlist Entry →" : `${t("eventsPage.booking.confirmBooking")} →`}
        </button>
      </div>
    </form>
  );
}
