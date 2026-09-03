"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Check, 
  Copy, 
  CheckCircle2, 
  Calendar as CalendarIcon, 
  MapPin, 
  Download, 
  Printer, 
  Mail, 
  MessageCircle, 
  Clock, 
  FileText, 
  Heart, 
  Share2, 
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Building2,
  ExternalLink
} from "lucide-react";
import { EventBookingInput } from "@/lib/validations";
import { useLanguage } from "@/context/LanguageContext";

interface StepPaymentConfirmationProps {
  formData: Partial<EventBookingInput>;
  updateFields: (fields: Partial<EventBookingInput>) => void;
  onBack: () => void;
  onReset: () => void;
}

export default function StepPaymentConfirmation({
  formData,
  updateFields,
  onBack,
  onReset,
}: StepPaymentConfirmationProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Fallback demo data if fields are empty
  const bookingId = "SP-2026-" + Math.floor(1000 + Math.random() * 9000);
  const participantName = formData.fullName || "Adv. Rahul Sharma";
  const email = formData.email || "Info@shreepratishthan.com";
  const mobile = formData.mobileNumber || "+91 9922786608";
  const eventName = formData.eventId
    ? formData.eventId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Shree Ganeshotsav 2026";
  const participantCount = formData.numberOfParticipants || 1;
  const slotTime = formData.preferredTimeSlot
    ? formData.preferredTimeSlot.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Morning";
  const eventDate = formData.dateOfBirth || "2026-08-27";
  const address = formData.streetArea || "Indira Nagar, Nashik";
  const venue = "Shree Pratishtan Mandal, Indira Nagar, Nashik - 422009";

  const handleCopyBookingId = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-7xl mx-auto text-neutral-900 space-y-8 animate-in fade-in duration-500 font-sans print:p-0 print:bg-white">
      
      {/* 1. Top Success Confirmation Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-white border border-saffron/20 shadow-xl space-y-4 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 shadow-inner mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="space-y-2 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
            {t("eventsPage.booking.freeEntryBadge")}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-heading text-neutral-900">
            {t("eventsPage.booking.passReadyTitle")}
          </h2>
          <p className="text-sm sm:text-base font-semibold text-neutral-800 leading-relaxed bg-amber-50/80 border border-amber-200 p-3.5 rounded-2xl">
            {t("eventsPage.booking.passReadyDesc")}
          </p>
          <p className="text-xs text-neutral-500">
            No online payment is collected. This event booking is completely free. Any physical seva contributions are handled in person at our Indira Nagar, Nashik office.
          </p>
        </div>
      </div>

      {/* 2. 3-Column Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Event Booking Summary */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 border-b border-neutral-100 pb-4">
              <FileText className="w-5 h-5 text-saffron" />
              <h3 className="font-extrabold font-heading text-lg text-neutral-900">
                Booking Summary
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-medium">Participant Name</span>
                <span className="font-bold text-neutral-900">{participantName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-medium">Phone Number</span>
                <span className="font-semibold text-neutral-900">{mobile}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-medium">Booked Event</span>
                <span className="font-bold text-saffron">{eventName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-medium">Event Date</span>
                <span className="font-semibold text-neutral-900">{eventDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-medium">Time Slot</span>
                <span className="font-medium text-neutral-900">{slotTime} Slot</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 font-medium">Attendees Count</span>
                <span className="font-bold text-neutral-900">{participantCount} Person(s)</span>
              </div>
              <div className="pt-2 border-t border-neutral-100 flex items-start justify-between gap-4">
                <span className="text-neutral-500 font-medium whitespace-nowrap">Residential Area</span>
                <span className="font-medium text-neutral-900 text-right">{address}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-xs text-neutral-500">Booking Status:</span>
            <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              CONFIRMED (Free)
            </span>
          </div>
        </div>

        {/* Card 2: Your Event Booking Slip */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-5">
          <div className="w-full flex items-center gap-2.5 border-b border-neutral-100 pb-4 text-left">
            <Sparkles className="w-5 h-5 text-saffron" />
            <h3 className="font-extrabold font-heading text-lg text-neutral-900">
              Event Booking Slip
            </h3>
          </div>

          {/* Dark Metallic Ticket Box */}
          <div className="w-full bg-neutral-950 text-white rounded-2xl p-5 border-2 border-saffron/40 shadow-xl relative overflow-hidden space-y-3">
            <div className="space-y-0.5">
              <h4 className="font-black font-heading text-sm sm:text-base tracking-wider uppercase text-amber-300">
                {eventName}
              </h4>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                Indira Nagar Ground • Event Booked
              </span>
            </div>

            {/* Scannable Vector QR Code Square */}
            <div className="w-32 h-32 bg-white p-2.5 rounded-xl mx-auto shadow-inner flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-neutral-950">
                <rect x="5" y="5" width="30" height="30" rx="3" />
                <rect x="10" y="10" width="20" height="20" fill="white" />
                <rect x="15" y="15" width="10" height="10" />
                <rect x="65" y="5" width="30" height="30" rx="3" />
                <rect x="70" y="10" width="20" height="20" fill="white" />
                <rect x="75" y="15" width="10" height="10" />
                <rect x="5" y="65" width="30" height="30" rx="3" />
                <rect x="10" y="70" width="20" height="20" fill="white" />
                <rect x="15" y="75" width="10" height="10" />
                <rect x="45" y="45" width="10" height="10" />
                <rect x="60" y="45" width="15" height="15" />
                <rect x="45" y="65" width="20" height="10" />
                <rect x="75" y="75" width="20" height="20" />
              </svg>
            </div>

            <div className="text-[11px] font-mono text-amber-400 tracking-wider">
              BOOKING ID: {bookingId}
            </div>
          </div>

          {/* Action Buttons Grid */}
          <div className="w-full space-y-2.5 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className="w-full py-3 bg-saffron hover:bg-saffron/90 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-saffron/20"
            >
              <Printer className="w-4 h-4" /> Print / Save Booking Slip
            </button>
            <button
              type="button"
              onClick={handleCopyBookingId}
              className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-neutral-200"
            >
              <Copy className="w-3.5 h-3.5" /> {copied ? "Copied Booking ID!" : "Copy Booking ID"}
            </button>
          </div>
        </div>

        {/* Card 3: Ground Entry Instructions */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-5">
          <div className="flex items-center gap-2.5 border-b border-neutral-100 pb-4">
            <Clock className="w-5 h-5 text-saffron" />
            <h3 className="font-extrabold font-heading text-lg text-neutral-900">
              Next Steps
            </h3>
          </div>

          {/* Instructions Timeline */}
          <div className="space-y-4 relative pl-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-100">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-bold text-xs sm:text-sm text-neutral-900">Reach the Mandal Ground</h5>
                <p className="text-xs text-neutral-500">Mention your Booking ID or mobile number at the event coordination desk.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-indigo-100">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-bold text-xs sm:text-sm text-neutral-900">Coordinator Assistance</h5>
                <p className="text-xs text-neutral-500">Our 100+ active volunteer marshals will assist your seating and darshan slots.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-100">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-bold text-xs sm:text-sm text-neutral-900">Physical Seva &amp; Receipts</h5>
                <p className="text-xs text-neutral-500">Any voluntary contributions are received physically with Samarth Sahakari Bank receipts.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-rose-100">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-bold text-xs sm:text-sm text-neutral-900">वारसा संस्कृतीचा, ध्यास समाजसेवेचा</h5>
                <p className="text-xs text-neutral-500">We look forward to welcoming you and your family!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Venue Map & Trust Contact Desk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h4 className="font-extrabold font-heading text-base text-neutral-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-saffron" />
              Event Ground Location
            </h4>
            <span className="text-xs font-semibold text-slate-500">Indira Nagar, Nashik</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            <strong>Location:</strong> {venue}. Parking is available around the ground for all devotees and tournament participants.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://maps.google.com/?q=Indira+Nagar+Nashik"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2.5 rounded-xl transition-all"
            >
              <span>Open Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="tel:+919922786608"
              className="inline-flex items-center gap-2 text-xs font-bold bg-saffron/10 text-saffron border border-saffron/20 px-4 py-2.5 rounded-xl hover:bg-saffron/20 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Helpline: +91 9922786608</span>
            </a>
          </div>
        </div>

        {/* Book Another Event Button */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h4 className="font-extrabold font-heading text-base text-neutral-900">
              Book Another Event?
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Book slots for additional family members, sports teams, or upcoming festival celebrations.
            </p>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer border border-neutral-300"
          >
            Book Another Event Slot
          </button>
        </div>
      </div>

    </div>
  );
}
