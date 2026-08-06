"use client";

import React from "react";
import { User, Phone, Mail, Calendar, Briefcase, Camera } from "lucide-react";
import CustomSelect from "@/components/ui/custom-select";
import { EventBookingInput } from "@/lib/validations";

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

interface StepPersonalProps {
  formData: Partial<EventBookingInput>;
  updateFields: (fields: Partial<EventBookingInput>) => void;
  errors: Record<string, string>;
  onNext: () => void;
}

export default function StepPersonal({
  formData,
  updateFields,
  errors,
  onNext,
}: StepPersonalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-neutral-200 pb-4 mb-6">
        <h3 className="text-xl md:text-2xl font-bold font-heading text-neutral-900 flex items-center gap-2">
          <User className="w-6 h-6 text-saffron" />
          Step 1: Personal Information
        </h3>
        <p className="text-sm text-neutral-600 mt-1">
          Please provide your identity details for participant verification and official communication.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Full Name <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              id="fullName"
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={formData.fullName || ""}
              onChange={(e) => updateFields({ fullName: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm"
            />
          </div>
          {errors.fullName && (
            <p className="text-xs text-red-600 font-medium">{errors.fullName}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <label htmlFor="dateOfBirth" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Date of Birth <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              id="dateOfBirth"
              type="date"
              required
              value={formData.dateOfBirth || ""}
              onChange={(e) => updateFields({ dateOfBirth: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm"
            />
          </div>
          {errors.dateOfBirth && (
            <p className="text-xs text-red-600 font-medium">{errors.dateOfBirth}</p>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label htmlFor="gender" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Gender <span className="text-saffron">*</span>
          </label>
          <CustomSelect
            id="gender"
            options={GENDER_OPTIONS}
            value={formData.gender || "male"}
            onChange={(val) => updateFields({ gender: val as EventBookingInput["gender"] })}
          />
          {errors.gender && (
            <p className="text-xs text-red-600 font-medium">{errors.gender}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div className="space-y-2">
          <label htmlFor="mobileNumber" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Mobile Number <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              id="mobileNumber"
              type="tel"
              required
              placeholder="10-digit mobile number"
              value={formData.mobileNumber || ""}
              onChange={(e) => updateFields({ mobileNumber: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm"
            />
          </div>
          {errors.mobileNumber && (
            <p className="text-xs text-red-600 font-medium">{errors.mobileNumber}</p>
          )}
        </div>

        {/* Alternate Mobile */}
        <div className="space-y-2">
          <label htmlFor="alternateMobile" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Alternate Mobile <span className="text-neutral-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              id="alternateMobile"
              type="tel"
              placeholder="Secondary contact number"
              value={formData.alternateMobile || ""}
              onChange={(e) => updateFields({ alternateMobile: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Email Address <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              id="email"
              type="email"
              required
              placeholder="name@example.com"
              value={formData.email || ""}
              onChange={(e) => updateFields({ email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-600 font-medium">{errors.email}</p>
          )}
        </div>

        {/* Occupation */}
        <div className="space-y-2">
          <label htmlFor="occupation" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Occupation <span className="text-neutral-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              id="occupation"
              type="text"
              placeholder="e.g. Student, Engineer, Business"
              value={formData.occupation || ""}
              onChange={(e) => updateFields({ occupation: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm"
            />
          </div>
        </div>

        {/* Profile Photo (Optional) */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="profilePhoto" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
            Profile Photo Link / URL <span className="text-neutral-400 font-normal">(Optional for Identity Badge)</span>
          </label>
          <div className="relative">
            <Camera className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              id="profilePhoto"
              type="url"
              placeholder="https://example.com/my-photo.jpg"
              value={formData.profilePhoto || ""}
              onChange={(e) => updateFields({ profilePhoto: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* Action Navigation */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="px-8 py-3.5 bg-saffron hover:bg-saffron/90 text-white font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg hover:shadow-saffron/25 transition-all duration-300 cursor-pointer"
        >
          Next: Event Details &rarr;
        </button>
      </div>
    </form>
  );
}
