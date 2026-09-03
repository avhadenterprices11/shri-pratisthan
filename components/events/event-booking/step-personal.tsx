"use client";

import React from "react";
import { User, Phone, Mail, MapPin, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { EventBookingInput } from "@/lib/validations";
import { getEventById } from "@/lib/events-data";
import CustomSelect from "@/components/ui/custom-select";

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
  const activeEvent = getEventById(formData.eventId || "ganesh-utsav-2026");
  const customQuestions = activeEvent?.customQuestions || [];

  const handleCustomAnswerChange = (questionId: string, value: string | boolean) => {
    const currentAnswers = formData.customAnswers || {};
    updateFields({
      customAnswers: {
        ...currentAnswers,
        [questionId]: value,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 select-none text-left">
      {/* Section Header */}
      <div className="border-b border-black/8 pb-5 space-y-1">
        <div className="inline-flex items-center gap-2 text-saffron text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] font-sans">
          <span>Step 01 • Attendee Profile</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-normal font-heading text-neutral-900 uppercase tracking-tight">
          Personal Information
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
          Provide your primary contact details for instant gate pass issuance and festival security verification.
        </p>
      </div>

      {/* Grid: Primary Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Full Name */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 font-sans">
            Full Name <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="fullName"
              type="text"
              required
              placeholder="e.g. Adv. Rahul Sharma"
              value={formData.fullName || ""}
              onChange={(e) => updateFields({ fullName: e.target.value })}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-neutral-200 rounded-2xl text-neutral-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-saffron/10 focus:border-saffron transition-all text-xs sm:text-sm font-medium font-sans shadow-xs"
            />
          </div>
          {errors.fullName && (
            <p className="text-xs text-red-600 font-medium font-sans">{errors.fullName}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label htmlFor="mobileNumber" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 font-sans">
            Mobile Number (For Pass SMS) <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="mobileNumber"
              type="tel"
              required
              placeholder="10-digit phone number"
              value={formData.mobileNumber || ""}
              onChange={(e) => updateFields({ mobileNumber: e.target.value })}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-neutral-200 rounded-2xl text-neutral-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-saffron/10 focus:border-saffron transition-all text-xs sm:text-sm font-medium font-sans shadow-xs"
            />
          </div>
          {errors.mobileNumber && (
            <p className="text-xs text-red-600 font-medium font-sans">{errors.mobileNumber}</p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 font-sans">
            Email Address (For Digital QR Pass) <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="email"
              type="email"
              required
              placeholder="name@domain.com"
              value={formData.email || ""}
              onChange={(e) => updateFields({ email: e.target.value })}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-neutral-200 rounded-2xl text-neutral-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-saffron/10 focus:border-saffron transition-all text-xs sm:text-sm font-medium font-sans shadow-xs"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-600 font-medium font-sans">{errors.email}</p>
          )}
        </div>

        {/* Residential Address */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="streetArea" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 font-sans">
            Residential Address &amp; Area in Nashik <span className="text-saffron">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
            <textarea
              id="streetArea"
              required
              rows={3}
              placeholder="Flat/House no., Society/Street, Landmark & City (e.g. Flat 402, Shree Heights, Indira Nagar, Nashik - 422009)"
              value={formData.streetArea || ""}
              onChange={(e) => updateFields({ 
                streetArea: e.target.value,
                houseNumber: "N/A",
                city: "Nashik",
                district: "Nashik",
                pinCode: "422009"
              })}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-neutral-200 rounded-2xl text-neutral-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-saffron/10 focus:border-saffron transition-all text-xs sm:text-sm font-medium resize-none font-sans shadow-xs"
            />
          </div>
          {errors.streetArea && (
            <p className="text-xs text-red-600 font-medium font-sans">{errors.streetArea}</p>
          )}
        </div>
      </div>

      {/* Dynamic Custom Registration Questions (With Premium CustomSelect) */}
      {customQuestions.length > 0 && (
        <div className="pt-6 border-t border-black/8 space-y-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-saffron/10 text-saffron flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900 font-heading">
                Celebration Specific Questions
              </h4>
              <p className="text-xs text-slate-500 font-sans">
                Tailored for {activeEvent?.title}
              </p>
            </div>
          </div>

          <div className="space-y-4 bg-neutral-50/70 p-5 rounded-2xl border border-black/6">
            {customQuestions.map((q) => {
              const currentVal = formData.customAnswers?.[q.id] ?? "";
              const errKey = `custom_${q.id}`;

              return (
                <div key={q.id} className="space-y-2">
                  <label htmlFor={`custom_${q.id}`} className="block text-xs font-bold text-neutral-800 font-sans">
                    {q.label} {q.required && <span className="text-saffron">*</span>}
                  </label>

                  {/* Premium Custom Dropdown */}
                  {q.type === "select" && q.options && (
                    <CustomSelect
                      id={`custom_${q.id}`}
                      options={q.options.map((opt) => ({
                        value: opt,
                        label: opt,
                      }))}
                      value={String(currentVal)}
                      onChange={(val) => handleCustomAnswerChange(q.id, val)}
                      placeholder="Select an option..."
                    />
                  )}

                  {q.type === "text" && (
                    <input
                      id={`custom_${q.id}`}
                      type="text"
                      required={q.required}
                      placeholder={q.placeholder || "Enter details..."}
                      value={String(currentVal)}
                      onChange={(e) => handleCustomAnswerChange(q.id, e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-2xl text-neutral-900 text-xs sm:text-sm font-medium font-sans focus:outline-none focus:ring-4 focus:ring-saffron/10 focus:border-saffron shadow-xs"
                    />
                  )}

                  {q.type === "checkbox" && (
                    <label className="flex items-center gap-2.5 cursor-pointer mt-1 select-none">
                      <input
                        type="checkbox"
                        checked={Boolean(currentVal)}
                        onChange={(e) => handleCustomAnswerChange(q.id, e.target.checked)}
                        className="w-4 h-4 rounded text-saffron focus:ring-saffron border-neutral-300"
                      />
                      <span className="text-xs text-neutral-700 font-sans font-medium">{q.placeholder || "Yes, confirm"}</span>
                    </label>
                  )}

                  {errors[errKey] && (
                    <p className="text-xs text-red-600 font-medium font-sans">{errors[errKey]}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex justify-end pt-4 border-t border-black/8">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-8 py-4 bg-saffron hover:bg-saffron/90 text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-lg shadow-saffron/20 hover:shadow-saffron/30 transition-all duration-300 cursor-pointer font-sans group"
        >
          <span>Continue to Booking Slot</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </form>
  );
}
