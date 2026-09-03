"use client";

import React from "react";
import { Calendar, Users, Clock, MapPin, Sparkles, ArrowLeft, ArrowRight, Sun, Sunset, Moon, Compass } from "lucide-react";
import CustomSelect, { CustomSelectOption } from "@/components/ui/custom-select";
import { EventBookingInput } from "@/lib/validations";
import { getEventById } from "@/lib/events-data";

interface StepEventProps {
  formData: Partial<EventBookingInput>;
  updateFields: (fields: Partial<EventBookingInput>) => void;
  errors: Record<string, string>;
  onNext: () => void;
  onBack: () => void;
}

const TIME_SLOT_OPTIONS: CustomSelectOption[] = [
  { 
    value: "morning", 
    label: "Morning Slot", 
    sublabel: "06:30 AM – 12:00 PM (Prabhat Pujan & Recital)",
    icon: <Sun className="w-4 h-4" />
  },
  { 
    value: "afternoon", 
    label: "Afternoon Slot", 
    sublabel: "12:00 PM – 04:00 PM (Cultural Exhibits & Seva)",
    icon: <Sun className="w-4 h-4 text-amber-500" />
  },
  { 
    value: "evening", 
    label: "Evening Slot", 
    sublabel: "04:00 PM – 09:30 PM (Grand Maha Aarti & Troupe)",
    icon: <Sunset className="w-4 h-4 text-saffron" />
  },
  { 
    value: "full-day", 
    label: "Full Day Pass", 
    sublabel: "All day open celebration access",
    icon: <Moon className="w-4 h-4 text-indigo-500" />
  },
];

export default function StepEvent({
  formData,
  updateFields,
  errors,
  onNext,
  onBack,
}: StepEventProps) {
  const activeEvent = getEventById(formData.eventId || "ganesh-utsav-2026");
  const isWaitlist = Boolean(activeEvent?.isCapacityFull && activeEvent?.waitlistEnabled);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const participantCount = formData.numberOfParticipants || 1;

  const handleDecrement = () => {
    if (participantCount > 1) {
      updateFields({ numberOfParticipants: participantCount - 1 });
    }
  };

  const handleIncrement = () => {
    if (participantCount < 20) {
      updateFields({ numberOfParticipants: participantCount + 1 });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 select-none text-left">
      {/* Section Header */}
      <div className="border-b border-black/8 pb-5 space-y-1">
        <div className="inline-flex items-center gap-2 text-saffron text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] font-sans">
          <span>Step 02 • Schedule &amp; Passes</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-normal font-heading text-neutral-900 uppercase tracking-tight">
          Select Booking Slot
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
          Your celebration is locked in. Select your preferred date, time slot, and number of entry passes.
        </p>
      </div>

      {/* 1. Luminous Locked Celebration Header Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-neutral-50/90 border border-black/8 space-y-3 relative overflow-hidden shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-saffron bg-saffron/10 px-3 py-1 rounded-full border border-saffron/20 font-sans">
              Selected Celebration
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 font-sans">
              • {activeEvent?.categoryLabel}
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-800 bg-white px-3 py-1 rounded-full border border-black/8 font-sans shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-saffron" />
            <span>{activeEvent?.eventMode || "In-Person"}</span>
          </span>
        </div>

        <h4 className="text-xl sm:text-2xl font-normal text-neutral-900 font-heading uppercase leading-tight pt-1">
          {activeEvent?.title}
        </h4>

        <div className="flex flex-wrap items-center gap-y-1.5 gap-x-5 text-xs text-slate-600 font-sans pt-1 border-t border-black/5">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-saffron" />
            <span><strong>Dates:</strong> {activeEvent?.date}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-saffron" />
            <span><strong>Venue:</strong> {activeEvent?.venueName}, {activeEvent?.city}</span>
          </span>
        </div>
      </div>

      {/* 2. Slot Selection & Attendees Grid */}
      <div className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Attendance Date Selection */}
          <div className="space-y-2">
            <label htmlFor="dateOfBirth" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 font-sans">
              Attendance Date <span className="text-saffron">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="dateOfBirth"
                type="date"
                required
                min={activeEvent?.startDate || "2026-01-01"}
                max={activeEvent?.endDate || "2026-12-31"}
                value={formData.dateOfBirth || activeEvent?.startDate || "2026-08-27"}
                onChange={(e) => updateFields({ dateOfBirth: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-neutral-200 rounded-2xl text-neutral-900 focus:outline-none focus:ring-4 focus:ring-saffron/10 focus:border-saffron transition-all text-xs sm:text-sm font-semibold font-sans shadow-xs"
              />
            </div>
            {errors.dateOfBirth && (
              <p className="text-xs text-red-600 font-medium font-sans">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Time Slot Selector with CustomSelect */}
          <div className="space-y-2">
            <label htmlFor="preferredTimeSlot" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 font-sans">
              Time Slot Selector <span className="text-saffron">*</span>
            </label>
            <CustomSelect
              id="preferredTimeSlot"
              options={TIME_SLOT_OPTIONS}
              value={formData.preferredTimeSlot || "morning"}
              onChange={(val) => updateFields({ preferredTimeSlot: val })}
              placeholder="Choose your slot..."
              icon={<Clock className="w-4 h-4" />}
            />
            {errors.preferredTimeSlot && (
              <p className="text-xs text-red-600 font-medium font-sans">{errors.preferredTimeSlot}</p>
            )}
          </div>
        </div>

        {/* Number of Attendees Stepper */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 font-sans">
            Number of Attendees / Passes (Max 20 Per Family) <span className="text-saffron">*</span>
          </label>
          
          <div className="flex items-center gap-4 p-3 bg-white border border-neutral-200 rounded-2xl shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-saffron/10 text-saffron flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>

            <div className="flex-1">
              <span className="text-xs sm:text-sm font-bold text-neutral-900 font-sans">
                {participantCount} {participantCount === 1 ? "Person" : "Persons"} Entry Pass
              </span>
              <span className="text-[11px] text-slate-400 block font-sans">
                Full free gate access for family &amp; friends
              </span>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={participantCount <= 1}
                className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-lg flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Decrease passes"
              >
                –
              </button>

              <span className="w-8 text-center text-sm sm:text-base font-bold text-neutral-900 font-sans">
                {participantCount}
              </span>

              <button
                type="button"
                onClick={handleIncrement}
                disabled={participantCount >= 20}
                className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-lg flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Increase passes"
              >
                +
              </button>
            </div>
          </div>
          {errors.numberOfParticipants && (
            <p className="text-xs text-red-600 font-medium font-sans">{errors.numberOfParticipants}</p>
          )}
        </div>

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
          <span>Review &amp; Confirm Pass</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </form>
  );
}
