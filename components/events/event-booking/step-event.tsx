"use client";

import React from "react";
import { Calendar, Users, Clock } from "lucide-react";
import CustomSelect from "@/components/ui/custom-select";
import { EventBookingInput } from "@/lib/validations";

interface StepEventProps {
  formData: Partial<EventBookingInput>;
  updateFields: (fields: Partial<EventBookingInput>) => void;
  errors: Record<string, string>;
  onNext: () => void;
  onBack: () => void;
}

const EVENTS_LIST_OPTIONS = [
  { value: "ganesh-utsav-2026", label: "Shree Ganeshotsav 2026 (श्री गणेशोत्सव)", sublabel: "Aug 27 - Sep 06, 2026" },
  { value: "gudipadwa-swagat-yatra-2026", label: "Gudipadwa Bhavya Swagat Yatra", sublabel: "Mar 19, 2026" },
  { value: "navratri-garba-2026", label: "Navratri Utsav & Dandiya Nights", sublabel: "Sep 22 - Oct 02, 2026" },
  { value: "blood-donation-camp-2026", label: "Bhavya Blood Donation & Health Camp", sublabel: "Aug 30, 2026" },
  { value: "shiv-jayanti-2026", label: "Shiv Jayanti Celebrations (शिवजयंती)", sublabel: "Feb 19, 2026" },
  { value: "cricket-tournament-2026", label: "Annual Sports & Cricket Tournament", sublabel: "Dec 18 - 25, 2026" },
  { value: "yoga-day-health-camp-2026", label: "International Yoga Day & Health Camp", sublabel: "Jun 21, 2026" },
  { value: "dr-ambedkar-jayanti-2026", label: "Dr. Babasaheb Ambedkar Jayanti", sublabel: "Apr 14, 2026" },
];

const TIME_SLOT_OPTIONS = [
  { value: "morning", label: "Morning Slot (08:00 AM - 12:00 PM)" },
  { value: "afternoon", label: "Afternoon Slot (12:00 PM - 04:00 PM)" },
  { value: "evening", label: "Evening Slot (04:00 PM - 09:00 PM)" },
  { value: "full-day", label: "Full Day Pass (08:00 AM - 10:00 PM)" },
];

export default function StepEvent({
  formData,
  updateFields,
  errors,
  onNext,
  onBack,
}: StepEventProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-neutral-200 pb-4 mb-6">
        <h3 className="text-xl md:text-2xl font-bold font-heading text-neutral-900 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-saffron" />
          Step 2: Booking Slot
        </h3>
        <p className="text-sm text-neutral-600 mt-1">
          Select your festival/event, choose your attendance date on the calendar, and pick your time slot.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        {/* 1. Select Event */}
        <div className="space-y-2">
          <label htmlFor="eventId" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Select Festival / Event <span className="text-saffron">*</span>
          </label>
          <CustomSelect
            id="eventId"
            options={EVENTS_LIST_OPTIONS}
            value={formData.eventId || EVENTS_LIST_OPTIONS[0].value}
            onChange={(val) => updateFields({ eventId: val })}
            icon={<Calendar className="w-4 h-4" />}
          />
          {errors.eventId && (
            <p className="text-xs text-red-600 font-medium">{errors.eventId}</p>
          )}
        </div>

        {/* 2. Grid: Date Calendar & Time Slot Dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Calendar Date Picker */}
          <div className="space-y-2">
            <label htmlFor="dateOfBirth" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
              Calendar Date Selection <span className="text-saffron">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                id="dateOfBirth"
                type="date"
                required
                value={formData.dateOfBirth || "2026-08-27"}
                onChange={(e) => updateFields({ dateOfBirth: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm font-medium"
              />
            </div>
            {errors.dateOfBirth && (
              <p className="text-xs text-red-600 font-medium">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Time Slot Selector in Dropdown */}
          <div className="space-y-2">
            <label htmlFor="preferredTimeSlot" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
              Time Slot Selector <span className="text-saffron">*</span>
            </label>
            <CustomSelect
              id="preferredTimeSlot"
              options={TIME_SLOT_OPTIONS}
              value={formData.preferredTimeSlot || "morning"}
              onChange={(val) => updateFields({ preferredTimeSlot: val })}
              icon={<Clock className="w-4 h-4" />}
            />
            {errors.preferredTimeSlot && (
              <p className="text-xs text-red-600 font-medium">{errors.preferredTimeSlot}</p>
            )}
          </div>
        </div>

        {/* 3. Number of Attendees */}
        <div className="space-y-2">
          <label htmlFor="numberOfParticipants" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Number of Attendees / Passes <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              id="numberOfParticipants"
              type="number"
              min={1}
              max={20}
              required
              value={formData.numberOfParticipants || 1}
              onChange={(e) => updateFields({ numberOfParticipants: parseInt(e.target.value) || 1 })}
              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm font-semibold shadow-sm"
            />
          </div>
          {errors.numberOfParticipants && (
            <p className="text-xs text-red-600 font-medium">{errors.numberOfParticipants}</p>
          )}
        </div>

        {/* Short Note Info Box */}
        <div className="p-4 bg-saffron/5 border border-saffron/20 rounded-xl text-xs text-slate-700 leading-relaxed">
          <strong className="text-saffron font-bold">Venue &amp; Entry:</strong> Free community passes for Indira Nagar, Nashik. Entry coordinators will reserve your designated time slot on the event ground.
        </div>
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
          Next: Review &amp; Confirm &rarr;
        </button>
      </div>
    </form>
  );
}
