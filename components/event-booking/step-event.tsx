"use client";

import React from "react";
import { Calendar, Users, Clock, ShieldAlert, Phone, UserCheck } from "lucide-react";
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
  { value: "ganesh-utsav-2026", label: "Ganesh Utsav Grand Celebration 2026", sublabel: "Sept 15 - Sept 25, 2026" },
  { value: "dahi-handi-2026", label: "Annual Dahi Handi Championship 2026", sublabel: "Aug 28, 2026" },
  { value: "navratri-utsav-2026", label: "Navratri Dandiya & Garba Nights", sublabel: "Oct 10 - Oct 19, 2026" },
  { value: "health-medical-camp", label: "Free Health & Blood Donation Camp", sublabel: "Aug 30, 2026" },
  { value: "tree-plantation-drive", label: "Mega Tree Plantation & Eco-Drive", sublabel: "Sept 05, 2026" },
];

const CATEGORY_OPTIONS = [
  { value: "general-attendee", label: "General Attendee" },
  { value: "vip-guest", label: "Special Guest / VIP Seating" },
  { value: "cultural-performer", label: "Cultural Performer / Artist" },
  { value: "dhol-tasha-player", label: "Dhol Tasha Troupe Player" },
  { value: "volunteer-participant", label: "Volunteer Participant" },
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Event Details Section */}
      <div className="space-y-6">
        <div className="border-b border-neutral-200 pb-4">
          <h3 className="text-xl md:text-2xl font-bold font-heading text-neutral-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-saffron" />
            Step 2: Event Details & Emergency Contact
          </h3>
          <p className="text-sm text-neutral-600 mt-1">
            Choose your target event, participation preferences, and provide emergency contact details.
          </p>
        </div>

        {/* Event Selection */}
        <div className="space-y-2">
          <label htmlFor="eventId" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Select Event <span className="text-saffron">*</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Participation Category */}
          <div className="space-y-2">
            <label htmlFor="participationCategory" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
              Participation Category <span className="text-saffron">*</span>
            </label>
            <CustomSelect
              id="participationCategory"
              options={CATEGORY_OPTIONS}
              value={formData.participationCategory || "general-attendee"}
              onChange={(val) => updateFields({ participationCategory: val as EventBookingInput["participationCategory"] })}
            />
            {errors.participationCategory && (
              <p className="text-xs text-red-600 font-medium">{errors.participationCategory}</p>
            )}
          </div>

          {/* Number of Participants */}
          <div className="space-y-2">
            <label htmlFor="numberOfParticipants" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
              Number of Participants <span className="text-saffron">*</span>
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

          {/* Preferred Time Slot */}
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="preferredTimeSlot" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
              Preferred Time Slot <span className="text-saffron">*</span>
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

        {/* Volunteer Interest Checkbox */}
        <div className="p-4 bg-saffron/5 border border-saffron/20 rounded-xl flex items-start gap-3">
          <input
            id="volunteerInterest"
            type="checkbox"
            checked={formData.volunteerInterest || false}
            onChange={(e) => updateFields({ volunteerInterest: e.target.checked })}
            className="mt-1 w-4 h-4 text-saffron accent-saffron border-neutral-300 rounded focus:ring-saffron"
          />
          <label htmlFor="volunteerInterest" className="text-xs md:text-sm text-neutral-800 cursor-pointer">
            <strong className="text-saffron font-bold">Volunteer Interest:</strong> Check this if you would also like to assist as an event volunteer marshal during festival logistics.
          </label>
        </div>

        {/* Special Requirements */}
        <div className="space-y-2">
          <label htmlFor="specialRequirements" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Special Requirements <span className="text-neutral-400 font-normal">(Senior citizen seating, wheelchair access, medical needs)</span>
          </label>
          <textarea
            id="specialRequirements"
            rows={2}
            placeholder="Specify any special arrangements required..."
            value={formData.specialRequirements || ""}
            onChange={(e) => updateFields({ specialRequirements: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm resize-none"
          />
        </div>

        {/* Additional Notes */}
        <div className="space-y-2">
          <label htmlFor="additionalNotes" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Additional Notes <span className="text-neutral-400 font-normal">(Optional)</span>
          </label>
          <textarea
            id="additionalNotes"
            rows={2}
            placeholder="Any extra comments or queries for organizers..."
            value={formData.additionalNotes || ""}
            onChange={(e) => updateFields({ additionalNotes: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm resize-none"
          />
        </div>
      </div>

      {/* Emergency Contact Section */}
      <div className="space-y-6 pt-4 border-t border-neutral-200">
        <div className="flex items-center gap-2 text-neutral-900 font-bold font-heading text-lg">
          <ShieldAlert className="w-5 h-5 text-saffron" />
          Emergency Contact Information
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Emergency Contact Name */}
          <div className="space-y-2">
            <label htmlFor="emergencyContactName" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
              Contact Person Name <span className="text-saffron">*</span>
            </label>
            <div className="relative">
              <UserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                id="emergencyContactName"
                type="text"
                required
                placeholder="Relative or Family Contact"
                value={formData.emergencyContactName || ""}
                onChange={(e) => updateFields({ emergencyContactName: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm font-semibold"
              />
            </div>
            {errors.emergencyContactName && (
              <p className="text-xs text-red-600 font-medium">{errors.emergencyContactName}</p>
            )}
          </div>

          {/* Relationship */}
          <div className="space-y-2">
            <label htmlFor="emergencyRelationship" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
              Relationship <span className="text-saffron">*</span>
            </label>
            <input
              id="emergencyRelationship"
              type="text"
              required
              placeholder="e.g. Father, Spouse, Sister, Friend"
              value={formData.emergencyRelationship || ""}
              onChange={(e) => updateFields({ emergencyRelationship: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm font-semibold"
            />
            {errors.emergencyRelationship && (
              <p className="text-xs text-red-600 font-medium">{errors.emergencyRelationship}</p>
            )}
          </div>

          {/* Emergency Mobile */}
          <div className="space-y-2">
            <label htmlFor="emergencyMobile" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
              Emergency Mobile <span className="text-saffron">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                id="emergencyMobile"
                type="tel"
                required
                placeholder="Primary emergency number"
                value={formData.emergencyMobile || ""}
                onChange={(e) => updateFields({ emergencyMobile: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm font-semibold"
              />
            </div>
            {errors.emergencyMobile && (
              <p className="text-xs text-red-600 font-medium">{errors.emergencyMobile}</p>
            )}
          </div>

          {/* Emergency Alternate Mobile */}
          <div className="space-y-2">
            <label htmlFor="emergencyAltMobile" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
              Alternate Number <span className="text-neutral-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                id="emergencyAltMobile"
                type="tel"
                placeholder="Secondary emergency contact"
                value={formData.emergencyAltMobile || ""}
                onChange={(e) => updateFields({ emergencyAltMobile: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm font-semibold"
              />
            </div>
          </div>
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
          Next: Address Details &rarr;
        </button>
      </div>
    </form>
  );
}
