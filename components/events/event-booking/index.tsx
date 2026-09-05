"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import StepProgress from "./step-progress";
import StepPersonal from "./step-personal";
import StepEvent from "./step-event";
import StepReview from "./step-review";
import StepPaymentConfirmation from "./step-payment-confirmation";
import { EventBookingInput } from "@/lib/validations";
import { getEventById } from "@/lib/events-data";
import { useLanguage } from "@/context/LanguageContext";

const initialFormData: Partial<EventBookingInput> = {
  fullName: "",
  profilePhoto: "",
  dateOfBirth: "2026-08-27",
  gender: "male",
  mobileNumber: "",
  alternateMobile: "",
  email: "",
  occupation: "",

  houseNumber: "N/A",
  streetArea: "",
  landmark: "",
  city: "Nashik",
  district: "Nashik",
  state: "Maharashtra",
  pinCode: "422009",
  googleMapUrl: "",

  eventId: "ganesh-utsav-2026",
  participationCategory: "general-attendee",
  numberOfParticipants: 1,
  preferredTimeSlot: "morning",
  volunteerInterest: false,
  specialRequirements: "",
  additionalNotes: "",

  emergencyContactName: "Shree Pratishtan Desk",
  emergencyRelationship: "Coordinator",
  emergencyMobile: "9922786608",
  emergencyAltMobile: "",

  agreedToTerms: true,
  mediaConsent: true,
  contributionAmount: 0,
  paymentMethod: "free",
  customAnswers: {},
};

function EventBookingContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const eventParam = searchParams?.get("event");

  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [formData, setFormData] = useState<Partial<EventBookingInput>>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync eventId from URL if available
  useEffect(() => {
    if (eventParam) {
      const matched = getEventById(eventParam);
      if (matched) {
        setFormData((prev) => ({
          ...prev,
          eventId: matched.id,
          dateOfBirth: matched.startDate || prev.dateOfBirth,
        }));
      }
    }
  }, [eventParam]);

  const updateFields = (fields: Partial<EventBookingInput>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    // Clear specific field errors when user modifies them
    const newErrors = { ...errors };
    Object.keys(fields).forEach((key) => {
      delete newErrors[key];
    });
    setErrors(newErrors);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName || formData.fullName.trim().length < 2) {
        newErrors.fullName = "Full name must be at least 2 characters.";
      }
      if (!formData.mobileNumber || formData.mobileNumber.trim().length < 10) {
        newErrors.mobileNumber = "Please enter a valid 10-digit phone number.";
      }
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
      if (!formData.streetArea || formData.streetArea.trim().length < 3) {
        newErrors.streetArea = "Please enter your residential address.";
      }

      // Validate required custom questions if configured
      const activeEvent = getEventById(formData.eventId || "ganesh-utsav-2026");
      if (activeEvent?.customQuestions) {
        activeEvent.customQuestions.forEach((q) => {
          if (q.required && (!formData.customAnswers || !formData.customAnswers[q.id])) {
            newErrors[`custom_${q.id}`] = `Please answer "${q.label}".`;
          }
        });
      }
    } else if (step === 2) {
      if (!formData.eventId) {
        newErrors.eventId = "Please select an event.";
      }
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = "Please select an attendance date.";
      }
      if (!formData.preferredTimeSlot) {
        newErrors.preferredTimeSlot = "Please choose a time slot.";
      }
      if (!formData.numberOfParticipants || formData.numberOfParticipants < 1) {
        newErrors.numberOfParticipants = "At least 1 attendee is required.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (nextStep > maxStepReached) {
        setMaxStepReached(nextStep);
      }
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleJumpToStep = (step: number) => {
    if (step <= maxStepReached) {
      setCurrentStep(step);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setMaxStepReached(1);
    setErrors({});
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 select-none">
      {/* 3-Step Progress indicator during Steps 1 to 3 */}
      {currentStep <= 3 && (
        <StepProgress
          currentStep={currentStep}
          onStepClick={handleJumpToStep}
          maxStepReached={maxStepReached}
        />
      )}

      {/* Confirmation Pass Screen (Triggered upon completing Step 3) */}
      {currentStep > 3 ? (
        <StepPaymentConfirmation
          formData={formData}
          updateFields={updateFields}
          onBack={handleBack}
          onReset={handleReset}
        />
      ) : (
        /* Form Steps 1-3 Glassmorphic Panel */
        <div className="glass-panel p-6 sm:p-10 md:p-12 rounded-block border border-saffron/20 dark:border-white/10 bg-white/85 dark:bg-[#121214] shadow-xl relative overflow-hidden max-w-5xl mx-auto">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-saffron via-gold to-saffron" />

          {currentStep === 1 && (
            <StepPersonal
              formData={formData}
              updateFields={updateFields}
              errors={errors}
              onNext={handleNext}
            />
          )}

          {currentStep === 2 && (
            <StepEvent
              formData={formData}
              updateFields={updateFields}
              errors={errors}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <StepReview
              formData={formData}
              updateFields={updateFields}
              errors={errors}
              onJumpToStep={handleJumpToStep}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default function EventBookingContainer() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-slate-500 font-sans">Loading booking portal...</div>}>
      <EventBookingContent />
    </Suspense>
  );
}
