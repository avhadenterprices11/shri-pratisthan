"use client";

import React, { useState } from "react";
import StepProgress from "./step-progress";
import StepPersonal from "./step-personal";
import StepEvent from "./step-event";
import StepAddress from "./step-address";
import StepReview from "./step-review";
import StepPaymentConfirmation from "./step-payment-confirmation";
import { eventBookingSchema, EventBookingInput } from "@/lib/validations";

const initialFormData: Partial<EventBookingInput> = {
  fullName: "",
  profilePhoto: "",
  dateOfBirth: "",
  gender: "male",
  mobileNumber: "",
  alternateMobile: "",
  email: "",
  occupation: "",

  houseNumber: "",
  streetArea: "",
  landmark: "",
  city: "",
  district: "",
  state: "Maharashtra",
  pinCode: "",
  googleMapUrl: "",

  eventId: "ganesh-utsav-2026",
  participationCategory: "general-attendee",
  numberOfParticipants: 1,
  preferredTimeSlot: "morning",
  volunteerInterest: false,
  specialRequirements: "",
  additionalNotes: "",

  emergencyContactName: "",
  emergencyRelationship: "",
  emergencyMobile: "",
  emergencyAltMobile: "",

  agreedToTerms: true,
  mediaConsent: true,
  contributionAmount: 0,
  paymentMethod: "free",
};

export default function EventBookingContainer() {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [formData, setFormData] = useState<Partial<EventBookingInput>>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = "Date of birth is required.";
      }
      if (!formData.mobileNumber || formData.mobileNumber.trim().length < 10) {
        newErrors.mobileNumber = "Please enter a valid 10-digit mobile number.";
      }
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    } else if (step === 2) {
      if (!formData.eventId) {
        newErrors.eventId = "Please select an event.";
      }
      if (!formData.emergencyContactName || formData.emergencyContactName.trim().length < 2) {
        newErrors.emergencyContactName = "Emergency contact name is required.";
      }
      if (!formData.emergencyRelationship || formData.emergencyRelationship.trim().length < 2) {
        newErrors.emergencyRelationship = "Emergency relationship is required.";
      }
      if (!formData.emergencyMobile || formData.emergencyMobile.trim().length < 10) {
        newErrors.emergencyMobile = "Please enter a valid 10-digit emergency mobile number.";
      }
    } else if (step === 3) {
      if (!formData.houseNumber || formData.houseNumber.trim().length < 1) {
        newErrors.houseNumber = "House / Flat number is required.";
      }
      if (!formData.streetArea || formData.streetArea.trim().length < 2) {
        newErrors.streetArea = "Street / Area is required.";
      }
      if (!formData.city || formData.city.trim().length < 2) {
        newErrors.city = "City is required.";
      }
      if (!formData.district || formData.district.trim().length < 2) {
        newErrors.district = "District is required.";
      }
      if (!formData.pinCode || formData.pinCode.trim().length < 6) {
        newErrors.pinCode = "Please enter a valid 6-digit PIN code.";
      }
    } else if (step === 4) {
      if (!formData.agreedToTerms) {
        newErrors.agreedToTerms = "You must agree to the event rules and terms to register.";
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
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Render Step Progress indicator for form steps 1 to 4 */}
      {currentStep < 5 && (
        <StepProgress
          currentStep={currentStep}
          onStepClick={handleJumpToStep}
          maxStepReached={maxStepReached}
        />
      )}

      {/* Step 5 (Booking Confirmed) renders full-width page layout without box wrapper */}
      {currentStep === 5 ? (
        <StepPaymentConfirmation
          formData={formData}
          updateFields={updateFields}
          onBack={handleBack}
          onReset={handleReset}
        />
      ) : (
        /* Form Steps 1-4 Glassmorphic Page Panel */
        <div className="glass-panel p-6 sm:p-10 md:p-12 rounded-block border border-saffron/20 bg-white/85 shadow-xl relative overflow-hidden max-w-5xl mx-auto">
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
            <StepAddress
              formData={formData}
              updateFields={updateFields}
              errors={errors}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 4 && (
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
