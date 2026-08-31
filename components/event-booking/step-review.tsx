"use client";

import React from "react";
import { ClipboardCheck, Edit3, User, MapPin, Calendar, Clock, Users, ShieldCheck, CheckCircle2 } from "lucide-react";
import { EventBookingInput } from "@/lib/validations";

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="border-b border-neutral-200 pb-4">
        <h3 className="text-xl md:text-2xl font-bold font-heading text-neutral-900 flex items-center gap-2">
          <ClipboardCheck className="w-6 h-6 text-saffron" />
          Step 3: Review Details &amp; Confirmation
        </h3>
        <p className="text-sm text-neutral-600 mt-1">
          Review your personal details and booking slot before submitting your registration.
        </p>
      </div>

      {/* Review Cards Grid */}
      <div className="space-y-6">
        {/* Section 1: Personal Details */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 relative transition-all hover:border-saffron/30">
          <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3 mb-3">
            <h4 className="font-bold text-neutral-900 flex items-center gap-2 text-base font-heading">
              <User className="w-4 h-4 text-saffron" />
              1. Personal Details
            </h4>
            <button
              type="button"
              onClick={() => onJumpToStep(1)}
              className="inline-flex items-center gap-1 text-xs font-bold text-saffron hover:underline cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs md:text-sm">
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Full Name</span>
              <span className="font-semibold text-neutral-900">{formData.fullName || "-"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Phone Number</span>
              <span className="font-medium text-neutral-900">{formData.mobileNumber || "-"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Email Address</span>
              <span className="font-medium text-neutral-900">{formData.email || "-"}</span>
            </div>
            <div className="sm:col-span-2 md:col-span-3">
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Residential Address</span>
              <span className="font-medium text-neutral-900">{formData.streetArea || "Indira Nagar, Nashik"}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Booking Slot */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 relative transition-all hover:border-saffron/30">
          <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3 mb-3">
            <h4 className="font-bold text-neutral-900 flex items-center gap-2 text-base font-heading">
              <Calendar className="w-4 h-4 text-saffron" />
              2. Booking Slot &amp; Schedule
            </h4>
            <button
              type="button"
              onClick={() => onJumpToStep(2)}
              className="inline-flex items-center gap-1 text-xs font-bold text-saffron hover:underline cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs md:text-sm">
            <div className="sm:col-span-2">
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Selected Event</span>
              <span className="font-bold text-saffron capitalize">{formData.eventId?.replace(/-/g, " ") || "Shree Ganeshotsav 2026"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Selected Date</span>
              <span className="font-semibold text-neutral-900">{formData.dateOfBirth || "2026-08-27"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Time Slot</span>
              <span className="font-medium text-neutral-900 capitalize">{formData.preferredTimeSlot || "Morning"} Slot</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Number of Attendees</span>
              <span className="font-semibold text-neutral-900">{formData.numberOfParticipants || 1} Person(s)</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Location / Venue</span>
              <span className="font-semibold text-neutral-900">Indira Nagar, Nashik</span>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Follow-up Note Box */}
      <div className="p-6 bg-gradient-to-r from-saffron/10 via-amber-50 to-saffron/10 border-2 border-saffron/30 rounded-2xl space-y-3">
        <div className="flex items-center gap-2.5 text-neutral-900 font-bold font-heading text-base">
          <CheckCircle2 className="w-5 h-5 text-saffron shrink-0" />
          <span>Event Booking Notice</span>
        </div>
        <p className="text-sm sm:text-base font-semibold text-neutral-800 leading-relaxed">
          &ldquo;We will address and contact you as soon as possible regarding your event booking and ground coordination details.&rdquo;
        </p>
        <p className="text-xs text-slate-500">
          Our team at Shree Pratishtan (Indira Nagar, Nashik) verifies every booking slot for festival crowd safety.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-sm uppercase rounded-xl transition-all cursor-pointer"
        >
          &larr; Back
        </button>

        <button
          type="submit"
          className="px-8 py-3.5 bg-saffron hover:bg-saffron/90 text-white font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg hover:shadow-saffron/25 transition-all duration-300 cursor-pointer"
        >
          Confirm Event Booking &rarr;
        </button>
      </div>
    </form>
  );
}
