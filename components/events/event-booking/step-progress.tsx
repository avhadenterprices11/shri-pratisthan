"use client";

import React from "react";
import { Check, User, Calendar, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepProgressProps {
  currentStep: number; // 1 to 3
  onStepClick: (step: number) => void;
  maxStepReached: number;
}

const STEPS = [
  { id: 1, label: "Personal Info", shortLabel: "Personal", icon: User },
  { id: 2, label: "Booking Slot", shortLabel: "Slot", icon: Calendar },
  { id: 3, label: "Review & Confirm", shortLabel: "Confirm", icon: ClipboardCheck },
];

export default function StepProgress({
  currentStep,
  onStepClick,
  maxStepReached,
}: StepProgressProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8 px-2 flex justify-center">
      {/* Minimalist Apple-Style Status Dock */}
      <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-white/95 backdrop-blur-xl border border-black/10 rounded-full shadow-md">
        {STEPS.map((step, idx) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isClickable = step.id <= maxStepReached;

          return (
            <React.Fragment key={step.id}>
              <button
                type="button"
                onClick={() => isClickable && onStepClick(step.id)}
                disabled={!isClickable}
                className={cn(
                  "group relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold font-sans transition-all duration-300 select-none",
                  isCurrent
                    ? "bg-saffron text-white shadow-md shadow-saffron/25 font-bold"
                    : isCompleted
                    ? "bg-emerald-50 text-emerald-800 hover:bg-emerald-100/80 cursor-pointer"
                    : isClickable
                    ? "text-neutral-700 hover:bg-black/5 cursor-pointer"
                    : "text-neutral-400 cursor-not-allowed opacity-60"
                )}
              >
                {/* Step Pill Icon / Number */}
                <div
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-transform duration-200 shrink-0",
                    isCurrent
                      ? "bg-white text-saffron"
                      : isCompleted
                      ? "bg-emerald-600 text-white"
                      : "bg-neutral-100 text-neutral-500"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>

                {/* Step Label */}
                <span className="hidden sm:inline whitespace-nowrap tracking-wider uppercase text-[11px]">
                  {step.label}
                </span>
                <span className="sm:hidden whitespace-nowrap tracking-wider uppercase text-[10px]">
                  {step.shortLabel}
                </span>
              </button>

              {/* Minimalist hairline separator between steps */}
              {idx < STEPS.length - 1 && (
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-200 shrink-0 hidden sm:inline-block" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
