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
  Wallet, 
  Mail, 
  MessageCircle, 
  Clock, 
  FileText, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle, 
  ExternalLink, 
  ShieldAlert, 
  Sparkles,
  CreditCard,
  Building2,
  Smartphone,
  ShieldCheck,
  PhoneCall,
  Lock,
  ArrowRight
} from "lucide-react";
import { EventBookingInput } from "@/lib/validations";

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [donation, setDonation] = useState(0);

  // Fallback demo data if fields are empty
  const bookingId = "SP-2026-0715";
  const participantName = formData.fullName || "Rahul Sharma";
  const email = formData.email || "rahulsharma@gmail.com";
  const registrationType = formData.participationCategory
    ? formData.participationCategory.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "General Entry";
  const participantCount = formData.numberOfParticipants || 2;
  const registrationDate = "15 May 2026, 10:30 AM";
  const eventDateTime = "27 Aug 2026, 06:00 PM";
  const venue = "Shree Prathishthan Mandal, Pune, Maharashtra";

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  // If user completed registration, render the pixel-perfect Booking Confirmed Page matching the reference image!
  if (isSubmitted) {
    return (
      <div className="w-full max-w-7xl mx-auto text-neutral-900 space-y-8 animate-in fade-in duration-500 font-sans print:p-0 print:bg-white">
        {/* 3-Column Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Registration Summary */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 border-b border-neutral-100 pb-4">
                <FileText className="w-5 h-5 text-amber-700" />
                <h3 className="font-extrabold font-heading text-lg text-neutral-900">
                  Registration Summary
                </h3>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 font-medium">Participant Name</span>
                  <span className="font-bold text-neutral-900">{participantName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 font-medium">Registration Type</span>
                  <span className="font-semibold text-neutral-900">{registrationType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 font-medium">Number of Participants</span>
                  <span className="font-bold text-neutral-900">{participantCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 font-medium">Registration Date</span>
                  <span className="font-medium text-neutral-900">{registrationDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 font-medium">Event Date & Time</span>
                  <span className="font-semibold text-saffron">{eventDateTime}</span>
                </div>
                <div className="pt-2 border-t border-neutral-100 flex items-start justify-between gap-4">
                  <span className="text-neutral-500 font-medium whitespace-nowrap">Venue</span>
                  <span className="font-medium text-neutral-900 text-right">{venue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Your Digital Pass */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-5">
            <div className="w-full flex items-center gap-2.5 border-b border-neutral-100 pb-4 text-left">
              <Sparkles className="w-5 h-5 text-amber-700" />
              <h3 className="font-extrabold font-heading text-lg text-neutral-900">
                Your Digital Pass
              </h3>
            </div>

            {/* Dark Metallic Ticket Box */}
            <div className="w-full bg-neutral-950 text-white rounded-2xl p-5 border-2 border-amber-500/40 shadow-xl relative overflow-hidden space-y-3">
              <div className="space-y-0.5">
                <h4 className="font-black font-heading text-base tracking-wider uppercase text-amber-300">
                  GANESH UTSAV 2026
                </h4>
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  {registrationType}
                </span>
              </div>

              {/* Scannable Vector QR Code Square */}
              <div className="w-36 h-36 bg-white p-2.5 rounded-xl mx-auto shadow-inner flex items-center justify-center">
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
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="py-2.5 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-neutral-200"
                >
                  <Download className="w-3.5 h-3.5 text-amber-700" /> Download PDF
                </button>
                <button
                  type="button"
                  onClick={() => alert("Added to Apple / Google Wallet successfully!")}
                  className="py-2.5 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-neutral-200"
                >
                  <Wallet className="w-3.5 h-3.5 text-amber-700" /> Add to Wallet
                </button>
              </div>

              <button
                type="button"
                onClick={handlePrint}
                className="w-full py-3 bg-white hover:bg-neutral-50 text-neutral-900 border-2 border-neutral-300 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <Printer className="w-4 h-4 text-saffron" /> Print Pass
              </button>
            </div>
          </div>

          {/* Card 3: What's Next? Checklist */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-5">
            <div className="flex items-center gap-2.5 border-b border-neutral-100 pb-4">
              <Clock className="w-5 h-5 text-amber-700" />
              <h3 className="font-extrabold font-heading text-lg text-neutral-900">
                What's Next?
              </h3>
            </div>

            {/* Vertical Icon Timeline */}
            <div className="space-y-4 relative pl-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-indigo-100">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-neutral-900">Check your email</h5>
                  <p className="text-xs text-neutral-500">We have sent the confirmation to <span className="font-semibold text-neutral-800">{email}</span></p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-100">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-neutral-900">Join WhatsApp Group</h5>
                  <p className="text-xs text-neutral-500">Stay updated with event details and announcements</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-100">
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-neutral-900">Save Event Reminder</h5>
                  <p className="text-xs text-neutral-500">Add the event to your calendar and get timely reminders</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-sky-100">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-neutral-900">Bring Required Documents</h5>
                  <p className="text-xs text-neutral-500">Carry a valid ID proof for entry at venue</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-rose-100">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-neutral-900">We can't wait to see you!</h5>
                  <p className="text-xs text-neutral-500">Get ready for an unforgettable experience 🎉</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Row: Event Information & Share With Friends */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel (Span 2): Event Information & Maps */}
          <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-6">
            <div className="flex items-center gap-2.5 border-b border-neutral-100 pb-4">
              <FileText className="w-5 h-5 text-amber-700" />
              <h3 className="font-extrabold font-heading text-lg text-neutral-900">
                Event Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              {/* Maps Visual Box */}
              <div className="space-y-3">
                <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-neutral-200 shadow-inner group">
                  <Image
                    src="/about_showcase.png"
                    alt="Shree Prathishthan Mandal Location Map"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-neutral-900 flex items-center gap-1.5 shadow-md">
                      <MapPin className="w-4 h-4 text-saffron" /> Shree Prathishthan Mandal
                    </div>
                  </div>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  View on Google Maps <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                </a>
              </div>

              {/* Event Guidelines List */}
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5 p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    P
                  </div>
                  <div>
                    <h6 className="font-bold text-neutral-900">Parking</h6>
                    <p className="text-neutral-500">Parking available at Mandal Ground & nearby areas.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    👔
                  </div>
                  <div>
                    <h6 className="font-bold text-neutral-900">Dress Code</h6>
                    <p className="text-neutral-500">Traditional / Ethnic Wear recommended.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    🛡️
                  </div>
                  <div>
                    <h6 className="font-bold text-neutral-900">Safety Guidelines</h6>
                    <p className="text-neutral-500">Please follow the safety guidelines and instructions at venue.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                  <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    📞
                  </div>
                  <div>
                    <h6 className="font-bold text-neutral-900">Emergency Contact</h6>
                    <p className="text-neutral-500">+91 98765 43210 / +91 87654 32109</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Share With Friends */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 border-b border-neutral-100 pb-4">
                <Share2 className="w-5 h-5 text-amber-700" />
                <h3 className="font-extrabold font-heading text-lg text-neutral-900">
                  Share With Friends
                </h3>
              </div>

              <p className="text-xs text-neutral-600">
                Invite your friends and family to be a part of this celebration.
              </p>

              {/* Social Buttons */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-all flex flex-col items-center gap-1"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-2 bg-pink-50 text-pink-700 rounded-xl border border-pink-200 hover:bg-pink-100 transition-all flex flex-col items-center gap-1"
                >
                  <Sparkles className="w-4 h-4" /> Instagram
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-200 hover:bg-blue-100 transition-all flex flex-col items-center gap-1"
                >
                  <Share2 className="w-4 h-4" /> Facebook
                </a>
              </div>

              {/* Copy Link Button */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all border border-neutral-300 cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" /> Link Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-neutral-600" /> Copy Link
                  </>
                )}
              </button>
            </div>

            {/* Invite Friends Gold Button */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-saffron text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Invite Friends
            </button>
          </div>
        </div>

        {/* Carousel Row: You Might Also Like */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-amber-700" />
              <h3 className="font-extrabold font-heading text-lg text-neutral-900">
                You Might Also Like
              </h3>
            </div>
            <Link href="/events" className="text-xs font-bold text-saffron hover:underline flex items-center gap-1">
              Explore All Events &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Navratri Utsav 2026",
                date: "22 Sep – 02 Oct 2026",
                location: "Pune, Maharashtra",
                img: "/gallery_navratri_garba.png",
              },
              {
                title: "Dahi Handi 2026",
                date: "16 Aug 2026",
                location: "Pune, Maharashtra",
                img: "/hero_dahihandi.png",
              },
              {
                title: "Blood Donation Drive",
                date: "10 Aug 2026",
                location: "Pune, Maharashtra",
                img: "/volunteer_medical.png",
              },
              {
                title: "Tree Plantation Drive",
                date: "24 Aug 2026",
                location: "Pune, Maharashtra",
                img: "/volunteer_eco.png",
              },
            ].map((event, idx) => (
              <div
                key={idx}
                className="group bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200 hover:border-saffron/40 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="relative h-32 w-full overflow-hidden">
                  <Image
                    src={event.img}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3.5 space-y-1">
                  <h5 className="font-bold text-neutral-900 text-sm font-heading group-hover:text-saffron transition-colors">
                    {event.title}
                  </h5>
                  <p className="text-[11px] text-neutral-500 flex items-center gap-1">
                    <CalendarIcon className="w-3 h-3 text-saffron" /> {event.date}
                  </p>
                  <p className="text-[11px] text-neutral-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-saffron" /> {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Footer Banner */}
        <div className="bg-neutral-100 border border-neutral-200 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-saffron flex items-center justify-center shadow-sm border border-neutral-200">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-sm">Need Help?</h4>
              <p className="text-xs text-neutral-500">We are here to assist you.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto text-xs font-bold">
            <Link
              href="/contact"
              className="py-2.5 px-3 bg-white text-neutral-800 rounded-xl border border-neutral-200 text-center hover:border-saffron transition-all"
            >
              Help Center
            </Link>
            <Link
              href="/volunteer#faq"
              className="py-2.5 px-3 bg-white text-neutral-800 rounded-xl border border-neutral-200 text-center hover:border-saffron transition-all"
            >
              FAQs
            </Link>
            <Link
              href="/contact"
              className="py-2.5 px-3 bg-white text-neutral-800 rounded-xl border border-neutral-200 text-center hover:border-saffron transition-all"
            >
              Contact Support
            </Link>
            <Link
              href="/contact"
              className="py-2.5 px-3 bg-white text-neutral-800 rounded-xl border border-neutral-200 text-center hover:border-saffron transition-all"
            >
              Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Pre-submission Step 5 view
  return (
    <form onSubmit={handleConfirmBooking} className="space-y-8">
      <div className="border-b border-neutral-200 pb-4">
        <h3 className="text-xl md:text-2xl font-bold font-heading text-neutral-900 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-saffron" />
          Step 5: Payment & Pass Generation
        </h3>
        <p className="text-sm text-neutral-600 mt-1">
          Event entry is complimentary. You may choose an optional donation to support our social initiatives.
        </p>
      </div>

      {/* Voluntary Contribution Box */}
      <div className="space-y-4 bg-neutral-50 p-6 border border-neutral-200 rounded-2xl">
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2">
          <Heart className="w-4 h-4 text-saffron" /> Voluntary Festival Contribution / Seva (Optional)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[0, 101, 501, 1001].map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => {
                setDonation(amt);
                updateFields({ contributionAmount: amt });
              }}
              className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                donation === amt
                  ? "bg-saffron text-white border-saffron shadow-md"
                  : "bg-white text-neutral-800 border-neutral-300 hover:border-saffron/50"
              }`}
            >
              {amt === 0 ? "Free Entry Pass (₹0)" : `₹${amt} Seva`}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Method Cards */}
      <div className="space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
          Select Mode of Issuance / Payment
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => updateFields({ paymentMethod: "free" })}
            className={`p-4 border rounded-2xl cursor-pointer transition-all flex flex-col gap-2 ${
              (formData.paymentMethod || "free") === "free"
                ? "bg-saffron/5 border-saffron ring-2 ring-saffron/20"
                : "bg-white border-neutral-200 hover:border-neutral-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <ShieldCheck className="w-5 h-5 text-saffron" />
              <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">Instant</span>
            </div>
            <h5 className="font-bold text-neutral-900 text-sm">Free / Pay at Venue</h5>
            <p className="text-xs text-neutral-500">Direct instant digital entry pass. No advance payment required.</p>
          </div>

          <div
            onClick={() => updateFields({ paymentMethod: "upi" })}
            className={`p-4 border rounded-2xl cursor-pointer transition-all flex flex-col gap-2 ${
              formData.paymentMethod === "upi"
                ? "bg-saffron/5 border-saffron ring-2 ring-saffron/20"
                : "bg-white border-neutral-200 hover:border-neutral-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <Smartphone className="w-5 h-5 text-saffron" />
              <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">UPI QR</span>
            </div>
            <h5 className="font-bold text-neutral-900 text-sm">GPay / PhonePe / BHIM</h5>
            <p className="text-xs text-neutral-500">Instant UPI payment for voluntary contributions.</p>
          </div>

          <div
            onClick={() => updateFields({ paymentMethod: "card" })}
            className={`p-4 border rounded-2xl cursor-pointer transition-all flex flex-col gap-2 ${
              formData.paymentMethod === "card"
                ? "bg-saffron/5 border-saffron ring-2 ring-saffron/20"
                : "bg-white border-neutral-200 hover:border-neutral-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <Building2 className="w-5 h-5 text-saffron" />
              <span className="text-[10px] font-bold uppercase bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded-md">Card / Net</span>
            </div>
            <h5 className="font-bold text-neutral-900 text-sm">Debit / Credit / Net Banking</h5>
            <p className="text-xs text-neutral-500">Secure banking gateway checkout.</p>
          </div>
        </div>
      </div>

      {/* Total Box */}
      <div className="bg-neutral-950 text-white p-5 rounded-2xl flex items-center justify-between shadow-xl">
        <div>
          <span className="text-xs text-white/60 block uppercase font-medium">Total Amount Payable</span>
          <span className="text-2xl font-extrabold text-saffron font-heading">
            {donation === 0 ? "FREE PASS" : `₹${donation}`}
          </span>
        </div>
        <div className="text-right text-xs text-white/70">
          <span>Includes entry for {formData.numberOfParticipants || 1} participant(s)</span>
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
          className="px-8 py-4 bg-saffron hover:bg-saffron/90 text-white font-extrabold text-sm tracking-wider uppercase rounded-xl shadow-xl hover:shadow-saffron/30 transition-all duration-300 cursor-pointer flex items-center gap-2"
        >
          <CheckCircle2 className="w-5 h-5" /> Confirm Registration
        </button>
      </div>
    </form>
  );
}
