"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Ticket, 
  ShieldCheck, 
  Share2, 
  ExternalLink,
  ChevronRight,
  HeartHandshake,
  Award,
  PhoneCall,
  Info,
  Video,
  AlertCircle,
  Building2,
  QrCode,
  Sparkles,
} from "lucide-react";
import { getLocalizedEvent } from "@/lib/events-i18n";
import { EventItem } from "@/lib/events-data";
import { useLanguage } from "@/context/LanguageContext";

export default function EventDetailContent({ event: rawEvent }: { event: EventItem }) {
  const { t, language } = useLanguage();
  const event = getLocalizedEvent(rawEvent, language);

  const isRegistrationOpen = 
    event.registrationStatus === "open" || 
    event.registrationStatus === "closing_soon" || 
    event.registrationStatus === "free_entry";

  const getSponsorTierLabel = (tier: string) => {
    if (tier === "Title Sponsor") {
      return language === "mr" ? "मुख्य प्रायोजक" : language === "hi" ? "शीर्ष प्रायोजक" : "Title Sponsor";
    }
    if (tier === "Gold Sponsor") {
      return language === "mr" ? "सुवर्ण प्रायोजक" : language === "hi" ? "स्वर्ण प्रायोजक" : "Gold Sponsor";
    }
    if (tier === "Powered By") {
      return language === "mr" ? "सहकार्य" : language === "hi" ? "सहयोगी" : "Powered By";
    }
    if (tier === "Associate Sponsor") {
      return language === "mr" ? "सह-प्रायोजक" : language === "hi" ? "सह-प्रायोजक" : "Associate Sponsor";
    }
    return tier;
  };

  return (
    <main className="min-h-screen bg-warm-white py-12 md:py-20 selection:bg-saffron selection:text-white font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 space-y-8 sm:space-y-12">

        {/* Top Breadcrumb & Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-saffron/15 pb-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-grey font-sans">
            <Link href="/events" className="hover:text-saffron transition-colors">
              {t("eventsPage.detail.breadcrumb")}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-saffron font-bold truncate max-w-[200px] sm:max-w-[320px]">
              {event.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] text-saffron bg-saffron/10 px-3 py-1 rounded-full border border-saffron/20 font-sans">
              {t("eventsPage.detail.dossierBadge")}
            </span>
          </div>
        </div>

        {/* 1. Main Glassmorphic Showcase Panel */}
        <div className="glass-panel p-4 sm:p-8 md:p-10 rounded-2xl sm:rounded-block border border-saffron/20 relative overflow-hidden bg-white/80 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
            
            {/* Left Column: Image Showcase */}
            <div className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-block border border-saffron/10 shadow-lg bg-neutral-100 group">
              <Image
                src={event.mainImage}
                alt={event.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover group-hover:scale-103 transition-transform duration-700"
              />
              
              {/* Badges Top Overlay */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center bg-saffron text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.2em] px-2.5 sm:px-3 py-1 rounded-full shadow-sm font-sans">
                  {event.categoryLabel}
                </span>

                <span className="inline-flex items-center gap-1 bg-neutral-900/90 text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.16em] px-2.5 sm:px-3 py-1 rounded-full shadow-sm font-sans backdrop-blur-md">
                  <MapPin className="w-3 h-3 text-gold" />
                  {event.eventMode}
                </span>

                <span className="inline-flex items-center gap-1 bg-white/90 text-neutral-900 font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.16em] px-2.5 sm:px-3 py-1 rounded-full shadow-sm font-sans backdrop-blur-md border border-black/10">
                  <QrCode className="w-3 h-3 text-saffron" />
                  {event.checkInMode}
                </span>
              </div>
            </div>

            {/* Right Column: Hero Content & Registration Controls */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-saffron uppercase tracking-[0.2em] font-sans block mb-1">
                  {event.tagline}
                </span>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-neutral-900 font-heading leading-tight uppercase tracking-tight">
                  {event.title}
                </h1>

                {/* Quote / Narrative description */}
                <div className="mt-3 flex gap-3 border-l-2 border-saffron pl-3.5 py-1">
                  <p className="text-xs sm:text-sm md:text-base font-normal text-slate-700 italic leading-relaxed font-sans">
                    &ldquo;{event.description}&rdquo;
                  </p>
                </div>
              </div>

              {/* Registration Status Banner */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-saffron/[0.04] border border-saffron/20 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-500 font-sans">
                    {t("eventsPage.detail.registrationStatus")}
                  </span>
                  
                  {event.registrationStatus === "open" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      {t("eventsPage.detail.open")}
                    </span>
                  )}
                  {event.registrationStatus === "closing_soon" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
                      {t("eventsPage.detail.closingSoon")}
                    </span>
                  )}
                  {event.registrationStatus === "free_entry" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-300 font-sans">
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      {t("eventsPage.detail.freeEntry")}
                    </span>
                  )}
                  {event.registrationStatus === "closed" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-neutral-200 text-neutral-700 border border-neutral-300 font-sans">
                      {t("eventsPage.detail.closed")}
                    </span>
                  )}
                </div>

                {event.registrationCloseDate && (
                  <p className="text-[11px] sm:text-xs text-slate-grey font-sans">
                    <strong>{t("eventsPage.detail.deadlineLabel")}:</strong> {event.registrationCloseDate}
                  </p>
                )}
              </div>

              {/* Quick Details List */}
              <div className="border-t border-saffron/10 pt-3.5 space-y-2 text-xs sm:text-sm text-slate-grey font-medium font-sans">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-saffron flex-shrink-0" />
                  <span><strong>{t("eventsPage.detail.dateLabel")}:</strong> {event.date}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-saffron flex-shrink-0" />
                  <span><strong>{t("eventsPage.detail.timeLabel")}:</strong> {event.time}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-saffron flex-shrink-0" />
                  <span><strong>{t("eventsPage.detail.venueLabel")}:</strong> {event.venueName}, {event.city}</span>
                </div>
              </div>

              {/* Booking CTA Button */}
              <div className="pt-2">
                {isRegistrationOpen ? (
                  <Link
                    href={`/event-booking?event=${event.id}`}
                    className="inline-flex items-center justify-center gap-2 w-full px-6 sm:px-8 py-3.5 bg-saffron hover:bg-saffron/90 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full shadow-lg hover:shadow-saffron/20 transition-all font-sans cursor-pointer"
                  >
                    <Ticket className="w-4 h-4" /> {t("eventsPage.detail.bookPassBtn")}
                  </Link>
                ) : (
                  <div className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-neutral-200 text-neutral-600 font-bold text-xs uppercase tracking-[0.2em] rounded-full font-sans cursor-not-allowed border border-neutral-300">
                    <AlertCircle className="w-4 h-4" /> {t("eventsPage.detail.closed")}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* 2. Impact Metrics Callout Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {event.metrics.map((m, idx) => (
            <div key={idx} className="glass-panel p-3.5 sm:p-5 rounded-xl sm:rounded-interactive border border-saffron/15 text-center space-y-1 bg-white/75 shadow-sm">
              <span className="text-xl sm:text-3xl md:text-4xl font-normal text-saffron font-heading block">{m.value}</span>
              <span className="text-[10px] sm:text-[11px] text-slate-grey font-bold uppercase tracking-[0.16em] font-sans">{m.label}</span>
            </div>
          ))}
        </div>

        {/* 3. Detailed Venue, Address & Google Maps Card */}
        <div className="glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-block border border-saffron/20 bg-white/80 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-saffron/15">
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-saffron font-sans">
                <Building2 className="w-3.5 h-3.5" /> {t("eventsPage.detail.venue")}
              </span>
              <h2 className="text-xl sm:text-2xl font-normal font-heading text-neutral-900 uppercase tracking-tight mt-1">
                {event.venueName}
              </h2>
            </div>
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2.5 px-5 bg-neutral-900 text-white rounded-full text-xs font-bold uppercase tracking-[0.16em] hover:bg-black transition-all shadow-sm font-sans shrink-0"
            >
              {t("eventsPage.detail.openInMaps")} <ExternalLink className="w-3.5 h-3.5 text-gold" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs sm:text-sm text-slate-700 font-sans">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">{t("eventsPage.detail.streetAddress")}</span>
              <p className="mt-0.5 font-medium">{event.addressLine1}</p>
              {event.addressLine2 && <p className="text-slate-500">{event.addressLine2}</p>}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">{t("eventsPage.detail.cityState")}</span>
              <p className="mt-0.5 font-medium">{event.city}, {event.state}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">{t("eventsPage.detail.postalCountry")}</span>
              <p className="mt-0.5 font-medium">{event.postalCode}, {event.country}</p>
            </div>
          </div>
        </div>

        {/* 4. Accessibility & Safety Accommodations Section */}
        {event.accessibilityInfo && event.accessibilityInfo.length > 0 && (
          <div className="glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-block border border-saffron/20 bg-white/80 shadow-md space-y-4 sm:space-y-6">
            <div className="border-b border-saffron/15 pb-3">
              <span className="inline-flex items-center gap-1.5 bg-saffron/10 text-saffron font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-saffron/20 shadow-sm font-sans mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t("eventsPage.detail.accessibility")}
              </span>
              <h2 className="text-xl sm:text-2xl font-normal font-heading text-neutral-900 uppercase tracking-tight">
                {t("eventsPage.detail.accessibility")}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {event.accessibilityInfo.map((facility, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 bg-neutral-50/80 rounded-xl border border-black/5">
                  <div className="w-6 h-6 rounded-full bg-saffron/10 text-saffron flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-sans font-medium">
                    {facility}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Organization Operations Story */}
        <div className="glass-panel p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-block border border-saffron/20 bg-white/80 shadow-md space-y-6">
          <div className="border-b border-saffron/15 pb-4">
            <span className="inline-flex items-center gap-1.5 bg-saffron/10 text-saffron font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-saffron/20 shadow-sm font-sans mb-1.5">
              <Info className="w-3.5 h-3.5" />
              {t("eventsPage.detail.operationsBadge")}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-normal font-heading text-neutral-900 uppercase tracking-tight">
              {t("eventsPage.detail.operationsTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {event.organizedDetails.map((detail, idx) => (
              <div key={idx} className="space-y-1.5 border-l-2 border-saffron/40 pl-3.5 py-1">
                <h3 className="font-normal font-heading text-neutral-900 text-base uppercase">
                  {idx + 1}. {detail.heading}
                </h3>
                <p className="text-xs sm:text-sm text-slate-grey leading-[1.7] font-sans font-normal">
                  {detail.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Agenda Timeline */}
        {event.agenda && event.agenda.length > 0 && (
          <div className="glass-panel p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-block border border-saffron/20 bg-white/80 shadow-md space-y-6">
            <div className="border-b border-saffron/15 pb-3">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-normal font-heading text-neutral-900 uppercase tracking-tight">
                {t("eventsPage.detail.schedule")}
              </h2>
            </div>

            <div className="space-y-3">
              {event.agenda.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3.5 sm:p-4 bg-white/90 border border-saffron/10 rounded-xl shadow-xs">
                  <span className="px-3 py-1 bg-saffron text-white font-mono font-bold text-[10px] sm:text-xs rounded-full whitespace-nowrap shadow-xs">
                    {item.time}
                  </span>
                  <div>
                    <h4 className="font-normal text-neutral-900 text-sm sm:text-base font-heading uppercase">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-grey mt-0.5 leading-[1.6] font-sans font-normal">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. Promo Video Player */}
        {event.promoVideoUrl && (
          <div className="glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-block border border-saffron/20 bg-white/80 shadow-md space-y-4">
            <div className="flex items-center gap-2 border-b border-saffron/15 pb-3">
              <Video className="w-5 h-5 text-saffron" />
              <h2 className="text-xl sm:text-2xl font-normal font-heading text-neutral-900 uppercase tracking-tight">
                {t("eventsPage.detail.promoVideoTitle")}
              </h2>
            </div>
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-saffron/15 shadow-inner bg-black">
              <iframe
                src={event.promoVideoUrl}
                title={`${event.title} Promo Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        )}

        {/* 8. Photo Moments Gallery Grid */}
        <div className="glass-panel p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-block border border-saffron/20 bg-white/80 shadow-md space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-normal font-heading text-neutral-900 uppercase tracking-tight">
            {t("eventsPage.detail.momentsGalleryTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {event.galleryImages.map((img, idx) => (
              <div key={idx} className="relative aspect-video w-full rounded-xl overflow-hidden border border-saffron/10 shadow-xs group">
                <Image
                  src={img}
                  alt={`${event.title} photo ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 9. Our Partners & Event Sponsors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Partners Card */}
          <div className="glass-panel p-5 sm:p-7 rounded-2xl border border-saffron/15 bg-white/80 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-black/5 pb-3">
              <HeartHandshake className="w-5 h-5 text-saffron" />
              <h3 className="font-normal font-heading text-neutral-900 text-base sm:text-lg uppercase">
                {t("eventsPage.detail.partners")}
              </h3>
            </div>
            <div className="space-y-2.5">
              {event.partners.map((partner, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-black/5 text-xs sm:text-sm font-sans">
                  <span className="font-bold text-slate-800">{partner.name}</span>
                  {partner.role && (
                    <span className="text-[10px] uppercase font-bold text-saffron bg-saffron/10 px-2.5 py-0.5 rounded-full">
                      {partner.role}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sponsors Card */}
          <div className="glass-panel p-5 sm:p-7 rounded-2xl border border-saffron/15 bg-white/80 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-black/5 pb-3">
              <Award className="w-5 h-5 text-gold" />
              <h3 className="font-normal font-heading text-neutral-900 text-base sm:text-lg uppercase">
                {t("eventsPage.detail.sponsors")}
              </h3>
            </div>
            <div className="space-y-2.5">
              {event.sponsors.map((sponsor, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-black/5 text-xs sm:text-sm font-sans">
                  <span className="font-bold text-slate-800">{sponsor.name}</span>
                  <span className="text-[10px] uppercase font-bold text-gold bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                    {getSponsorTierLabel(sponsor.tier)}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 10. Helpline, Emergency Staff Contact & Location Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Emergency Coordinator Contact */}
          <div className="glass-panel p-5 sm:p-7 rounded-2xl border border-saffron/20 bg-white/80 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 border-b border-black/5 pb-3">
              <PhoneCall className="w-5 h-5 text-saffron shrink-0" />
              <h3 className="font-normal font-heading text-neutral-900 text-base sm:text-lg uppercase">
                {t("eventsPage.detail.organizer")}
              </h3>
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-slate-grey font-sans">
              <p><strong>{t("eventsPage.detail.coordinatorLabel")}:</strong> {event.emergencyContactName}</p>
              <p><strong>{t("eventsPage.detail.hotlineLabel")}:</strong> <a href={`tel:${event.emergencyContactPhone}`} className="text-saffron font-bold hover:underline">{event.emergencyContactPhone}</a></p>
              <p><strong>{t("eventsPage.detail.emailLabel")}:</strong> <a href={`mailto:${event.organizerEmail}`} className="text-slate-800 hover:underline">{event.organizerEmail}</a></p>
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block">
                  {t("eventsPage.detail.active247")}
                </span>
              </div>
            </div>
          </div>

          {/* Location Summary */}
          <div className="glass-panel p-5 sm:p-7 rounded-2xl border border-saffron/20 bg-white/80 space-y-3 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 border-b border-black/5 pb-3">
                <MapPin className="w-5 h-5 text-saffron shrink-0" />
                <h3 className="font-normal font-heading text-neutral-900 text-base sm:text-lg uppercase">
                  {t("eventsPage.detail.locationCoordinates")}
                </h3>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-slate-700 font-sans font-medium">
                {event.venueName} — {event.addressLine1}, {event.city}, {event.state} {event.postalCode}
              </p>
            </div>
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 py-3 px-6 bg-neutral-900 text-white rounded-full text-xs font-bold uppercase tracking-[0.16em] hover:bg-black transition-all shadow-md font-sans"
            >
              {t("eventsPage.detail.getDirections")} <ExternalLink className="w-3.5 h-3.5 text-gold" />
            </a>
          </div>

        </div>

      </div>
    </main>
  );
}
