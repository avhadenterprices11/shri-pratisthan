"use client";

import React from "react";
import { ClipboardCheck, Edit3, User, MapPin, Calendar, ShieldCheck, AlertCircle } from "lucide-react";
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
          Step 4: Review Your Registration
        </h3>
        <p className="text-sm text-neutral-600 mt-1">
          Double-check all entered information before confirming your registration.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs md:text-sm">
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Full Name</span>
              <span className="font-semibold text-neutral-900">{formData.fullName || "-"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Mobile</span>
              <span className="font-medium text-neutral-900">{formData.mobileNumber || "-"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Email</span>
              <span className="font-medium text-neutral-900">{formData.email || "-"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Date of Birth</span>
              <span className="font-medium text-neutral-900">{formData.dateOfBirth || "-"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Gender</span>
              <span className="font-medium text-neutral-900 capitalize">{formData.gender || "-"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Occupation</span>
              <span className="font-medium text-neutral-900">{formData.occupation || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Event Details */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 relative transition-all hover:border-saffron/30">
          <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3 mb-3">
            <h4 className="font-bold text-neutral-900 flex items-center gap-2 text-base font-heading">
              <Calendar className="w-4 h-4 text-saffron" />
              2. Event & Emergency Contact
            </h4>
            <button
              type="button"
              onClick={() => onJumpToStep(2)}
              className="inline-flex items-center gap-1 text-xs font-bold text-saffron hover:underline cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs md:text-sm">
            <div className="sm:col-span-2">
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Selected Event</span>
              <span className="font-bold text-saffron">{formData.eventId || "Ganesh Utsav 2026"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Category</span>
              <span className="font-medium text-neutral-900 capitalize">{formData.participationCategory || "-"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Participants Count</span>
              <span className="font-semibold text-neutral-900">{formData.numberOfParticipants || 1} Person(s)</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Time Slot</span>
              <span className="font-medium text-neutral-900 capitalize">{formData.preferredTimeSlot || "-"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Volunteer Interest</span>
              <span className="font-medium text-neutral-900">{formData.volunteerInterest ? "Yes, interested" : "No"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Emergency Person</span>
              <span className="font-semibold text-neutral-900">{formData.emergencyContactName || "-"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Emergency Relation</span>
              <span className="font-medium text-neutral-900">{formData.emergencyRelationship || "-"}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Emergency Phone</span>
              <span className="font-medium text-neutral-900">{formData.emergencyMobile || "-"}</span>
            </div>
          </div>
        </div>

        {/* Section 3: Address Details */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 relative transition-all hover:border-saffron/30">
          <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3 mb-3">
            <h4 className="font-bold text-neutral-900 flex items-center gap-2 text-base font-heading">
              <MapPin className="w-4 h-4 text-saffron" />
              3. Address Details
            </h4>
            <button
              type="button"
              onClick={() => onJumpToStep(3)}
              className="inline-flex items-center gap-1 text-xs font-bold text-saffron hover:underline cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs md:text-sm">
            <div className="sm:col-span-2">
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">Full Address</span>
              <span className="font-medium text-neutral-900">
                {formData.houseNumber}, {formData.streetArea}
                {formData.landmark ? `, Near ${formData.landmark}` : ""}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">City & District</span>
              <span className="font-medium text-neutral-900">{formData.city}, {formData.district}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">State</span>
              <span className="font-medium text-neutral-900">{formData.state}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[11px] uppercase font-semibold">PIN Code</span>
              <span className="font-semibold text-neutral-900">{formData.pinCode}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Permissions Section */}
      <div className="p-6 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-neutral-900 font-bold font-heading text-base">
          <ShieldCheck className="w-5 h-5 text-saffron" />
          Terms & Permissions Consent
        </div>

        {/* Checkbox 1: Terms & Rules */}
        <div className="flex items-start gap-3">
          <input
            id="agreedToTerms"
            type="checkbox"
            required
            checked={Boolean(formData.agreedToTerms)}
            onChange={(e) => updateFields({ agreedToTerms: e.target.checked })}
            className="mt-1 w-4 h-4 text-saffron accent-saffron border-neutral-300 rounded focus:ring-saffron"
          />
          <label htmlFor="agreedToTerms" className="text-xs md:text-sm text-neutral-800 cursor-pointer">
            I hereby agree to follow all <strong>Event Safety Guidelines</strong>, <strong>Ground Rules</strong>, and the <strong>Shree Prathishthan Code of Conduct</strong> during the event. <span className="text-saffron font-bold">*</span>
          </label>
        </div>

        {/* Checkbox 2: Media Release */}
        <div className="flex items-start gap-3">
          <input
            id="mediaConsent"
            type="checkbox"
            checked={Boolean(formData.mediaConsent !== false)}
            onChange={(e) => updateFields({ mediaConsent: e.target.checked })}
            className="mt-1 w-4 h-4 text-saffron accent-saffron border-neutral-300 rounded focus:ring-saffron"
          />
          <label htmlFor="mediaConsent" className="text-xs md:text-sm text-neutral-800 cursor-pointer">
            I consent to event photography & videography for non-commercial community archives.
          </label>
        </div>

        {errors.agreedToTerms && (
          <div className="flex items-center gap-2 text-xs text-red-600 font-bold pt-1">
            <AlertCircle className="w-4 h-4" />
            {errors.agreedToTerms}
          </div>
        )}
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
          Proceed to Payment & Pass &rarr;
        </button>
      </div>
    </form>
  );
}
