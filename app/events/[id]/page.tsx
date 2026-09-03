import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getEventById, ALL_EVENTS } from "@/lib/events-data";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  Ticket, 
  PhoneCall, 
  ExternalLink,
  ShieldCheck,
  HeartHandshake,
  Award,
  Video,
  AlertCircle,
  Building2,
  QrCode,
  Sparkles,
  Mail,
  CheckCircle2,
  ChevronRight,
  Compass
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ALL_EVENTS.map((event) => ({
    id: event.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `${event.title} | Shree Pratishtan (श्री प्रतिष्ठान)`,
    description: event.description,
    openGraph: {
      title: `${event.title} | Shree Pratishtan (श्री प्रतिष्ठान)`,
      description: event.description,
      url: `https://www.shreepratishthan.org/events/${event.id}`,
      images: [{ url: event.mainImage, width: 1200, height: 630, alt: event.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} | Shree Pratishtan (श्री प्रतिष्ठान)`,
      description: event.description,
      images: [event.mainImage],
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) {
    notFound();
  }

  const isRegistrationOpen = 
    event.registrationStatus === "open" || 
    event.registrationStatus === "closing_soon" || 
    event.registrationStatus === "free_entry";

  return (
    <main className="min-h-screen pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-[#FBFBFA] select-none">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-saffron/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-gold/6 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1400px] w-full mx-auto relative z-10 space-y-10 sm:space-y-14">
        
        {/* Top Minimal Breadcrumb Navigation */}
        <nav className="flex items-center justify-between border-b border-black/5 pb-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-charcoal hover:text-saffron font-bold text-xs uppercase tracking-[0.2em] transition-colors duration-200 group font-sans"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-200 text-saffron" />
            <span>All Celebrations &amp; Events</span>
          </Link>

          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Official Event Dossier</span>
          </div>
        </nav>

        {/* 1. CINEMA HERO STAGE (Apple Keynote Style) */}
        <section className="relative w-full rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-2xl bg-neutral-950 border border-black/10">
          {/* Main Visual Image Backdrop */}
          <div className="relative w-full min-h-[460px] sm:min-h-[540px] md:min-h-[620px] lg:min-h-[680px] flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16">
            <Image
              src={event.mainImage}
              alt={event.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center filter brightness-[0.88] contrast-[1.05]"
            />
            {/* Multi-tier gradient overlay for cinematic contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/65 to-neutral-950/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-neutral-950/40 pointer-events-none" />
            <div className="absolute inset-0 ambient-saffron-glow opacity-25 pointer-events-none" />

            {/* Top Badges Floating Row */}
            <div className="relative z-10 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center bg-saffron text-white font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full shadow-md font-sans">
                {event.categoryLabel}
              </span>

              <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white/90 font-bold text-[10px] sm:text-xs uppercase tracking-[0.16em] px-3 py-1.5 rounded-full border border-white/15 font-sans">
                <Compass className="w-3.5 h-3.5 text-gold" />
                {event.eventMode}
              </span>

              <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-neutral-950 font-bold text-[10px] sm:text-xs uppercase tracking-[0.16em] px-3 py-1.5 rounded-full border border-white/20 font-sans shadow-sm">
                <QrCode className="w-3.5 h-3.5 text-saffron" />
                {event.checkInMode}
              </span>
            </div>

            {/* Center & Bottom Editorial Typography */}
            <div className="relative z-10 max-w-4xl space-y-3 sm:space-y-4 pt-16 sm:pt-24 text-left">
              <p className="text-xs sm:text-sm md:text-base font-bold text-gold uppercase tracking-[0.25em] font-sans">
                {event.tagline}
              </p>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white font-heading leading-[0.96] tracking-tight uppercase [text-shadow:_0_2px_20px_rgba(0,0,0,0.8)]">
                {event.title}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-200 font-sans font-normal leading-relaxed max-w-3xl pt-2 border-l-2 border-saffron/70 pl-4 sm:pl-5 italic">
                &ldquo;{event.description}&rdquo;
              </p>
            </div>

            {/* Integrated Floating Key-Spec Bar (Apple Product Spec Bar - Light Glass Card) */}
            <div className="relative z-10 mt-8 sm:mt-12 w-full bg-white/95 backdrop-blur-2xl border border-white/90 rounded-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-black/10 text-neutral-900">
                
                {/* Spec 1: Date */}
                <div className="flex items-center gap-3 md:px-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-saffron/10 border border-saffron/25 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-saffron" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-slate-400 block font-sans">Date</span>
                    <span className="text-xs sm:text-sm font-bold font-sans text-neutral-900 leading-tight block">{event.date}</span>
                  </div>
                </div>

                {/* Spec 2: Time */}
                <div className="flex items-center gap-3 md:px-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-saffron/10 border border-saffron/25 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-saffron" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-slate-400 block font-sans">Schedule</span>
                    <span className="text-xs sm:text-sm font-bold font-sans text-neutral-900 leading-tight block">{event.time}</span>
                  </div>
                </div>

                {/* Spec 3: Venue */}
                <div className="flex items-center gap-3 md:px-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-saffron/10 border border-saffron/25 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-saffron" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-slate-400 block font-sans">Location</span>
                    <span className="text-xs sm:text-sm font-bold font-sans text-neutral-900 leading-tight block truncate max-w-[170px]">{event.venueName}</span>
                  </div>
                </div>

                {/* Spec 4: Entry Access */}
                <div className="flex items-center gap-3 md:px-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-saffron/10 border border-saffron/25 flex items-center justify-center shrink-0">
                    <Ticket className="w-4 h-4 sm:w-5 sm:h-5 text-saffron" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-slate-400 block font-sans">Admission</span>
                    <span className="text-xs sm:text-sm font-bold font-sans text-neutral-900 leading-tight block">
                      {event.registrationStatus === "free_entry" ? "Free Open Gate" : event.registrationStatus === "open" ? "Pass Available" : "Closed"}
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 2. TYPOGRAPHIC IMPACT METRICS (Zero Box Cards, Monument Numerals) */}
        <section className="w-full py-4 border-y border-black/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:divide-x lg:divide-black/10 text-left">
            {event.metrics.map((metric, idx) => (
              <div key={idx} className="lg:px-6 first:pl-0 space-y-1">
                <span className="text-3xl sm:text-5xl md:text-6xl font-normal font-heading text-saffron leading-none block">
                  {metric.value}
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-500 font-sans block">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. TWO-COLUMN EDITORIAL MAGAZINE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* ════ LEFT COLUMN: DEEP CELEBRATION STORY (70% Width) ════ */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-14 sm:space-y-20 text-left">
            
            {/* A. Cultural Significance & Story */}
            <section className="space-y-4">
              <div className="inline-flex items-center gap-2 text-saffron text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] font-sans">
                <span>✦ Cultural Legacy &amp; Devotional Spirit</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal font-heading text-neutral-900 uppercase tracking-tight">
                About the Celebration
              </h2>
              <div className="prose prose-neutral max-w-none text-slate-700 text-sm sm:text-base leading-relaxed font-sans space-y-4">
                <p>
                  Organized by <strong>{event.organizerName}</strong> in Indira Nagar, Nashik, {event.title} stands as a testament to 19+ years of united community leadership, preserving traditional Maharashtrian cultural roots and social service under the enduring motto <em>&ldquo;वारसा संस्कृतीचा, ध्यास समाजसेवेचा&rdquo;</em>.
                </p>
                <p>
                  From youth volunteer mobilizations to grand traditional musical recitals, this festival brings together thousands of families across Nashik to experience authentic devotion, artistic brilliance, and communal harmony.
                </p>
              </div>
            </section>

            {/* B. Program Agenda (Architectural Timeline, Not Cluttered Boxes) */}
            {event.agenda && event.agenda.length > 0 && (
              <section className="space-y-6">
                <div className="border-b border-black/10 pb-4">
                  <span className="text-saffron text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] font-sans block mb-1">
                    Timeline
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal font-heading text-neutral-900 uppercase tracking-tight">
                    Program Agenda &amp; Schedule
                  </h2>
                </div>

                <div className="relative pl-6 sm:pl-8 border-l-2 border-saffron/30 ml-2 sm:ml-4 space-y-8 sm:space-y-10">
                  {event.agenda.map((item, idx) => (
                    <div key={idx} className="relative group">
                      {/* Glowing timeline node */}
                      <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-saffron shadow-sm group-hover:scale-125 group-hover:bg-saffron transition-all duration-300" />

                      <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-saffron/10 text-saffron font-bold text-[10px] sm:text-xs font-mono uppercase tracking-wider">
                            {item.time}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-normal font-heading text-neutral-900 uppercase">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* C. How It Is Organized (Curated Editorial Stages) */}
            <section className="space-y-6">
              <div className="border-b border-black/10 pb-4">
                <span className="text-saffron text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] font-sans block mb-1">
                  Operations &amp; Logistics
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal font-heading text-neutral-900 uppercase tracking-tight">
                  How This Event Is Organized
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {event.organizedDetails.map((detail, idx) => (
                  <div key={idx} className="space-y-2 border-t border-black/10 pt-4">
                    <span className="text-2xl sm:text-3xl font-heading text-saffron/50 block">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base sm:text-lg font-normal font-heading text-neutral-900 uppercase">
                      {detail.heading}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                      {detail.content}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* D. Cinema Highlights Video Teaser (if present) */}
            {event.promoVideoUrl && (
              <section className="space-y-4">
                <div className="border-b border-black/10 pb-3 flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-normal font-heading text-neutral-900 uppercase tracking-tight flex items-center gap-2">
                    <Video className="w-4 h-4 text-saffron" />
                    Video Teaser &amp; Highlights
                  </h2>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-sans">
                    1080p Cinema Player
                  </span>
                </div>
                
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-950 border border-black/15 shadow-xl">
                  <iframe
                    src={event.promoVideoUrl}
                    title={`${event.title} Promo Video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              </section>
            )}

            {/* E. Visual Moments Gallery (Editorial Magazine Layout) */}
            {event.galleryImages && event.galleryImages.length > 0 && (
              <section className="space-y-4">
                <div className="border-b border-black/10 pb-3 flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-normal font-heading text-neutral-900 uppercase tracking-tight">
                    Visual Moments Gallery
                  </h2>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-sans">
                    {event.galleryImages.length} High-Res Snapshots
                  </span>
                </div>

                {/* Magazine Asymmetric Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.galleryImages.map((img, idx) => (
                    <div 
                      key={idx} 
                      className={`relative rounded-2xl overflow-hidden shadow-sm group border border-black/10 ${
                        idx === 0 ? "sm:col-span-2 aspect-[21/9]" : "aspect-[16/10]"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${event.title} snapshot ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center group-hover:scale-104 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* F. Civic Partners, Sponsors & Benefactors */}
            <section className="space-y-6 pt-4">
              <div className="border-b border-black/10 pb-3">
                <h2 className="text-xl sm:text-2xl font-normal font-heading text-neutral-900 uppercase tracking-tight">
                  Partners &amp; Benefactors
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Partners List */}
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans flex items-center gap-1.5">
                    <HeartHandshake className="w-3.5 h-3.5 text-saffron" />
                    Civic &amp; Community Partners
                  </span>
                  <div className="space-y-2">
                    {event.partners.map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white border border-black/5 shadow-xs text-xs font-sans">
                        <span className="font-semibold text-neutral-900">{p.name}</span>
                        {p.role && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-saffron bg-saffron/10 px-2.5 py-0.5 rounded-full">
                            {p.role}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sponsors List */}
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-gold" />
                    Event Benefactors
                  </span>
                  <div className="space-y-2">
                    {event.sponsors.map((s, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white border border-black/5 shadow-xs text-xs font-sans">
                        <span className="font-semibold text-neutral-900">{s.name}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          {s.tier}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>

          </div>

          {/* ════ RIGHT COLUMN: STICKY TICKET & ACTION DOCK (30% Width) ════ */}
          <aside className="lg:col-span-5 xl:col-span-4 sticky top-24 space-y-6 text-left">
            
            {/* 1. Ticket / Pass Booking Dock (Apple Light Theme Card) */}
            <div className="relative rounded-3xl bg-white text-neutral-900 p-6 sm:p-7 shadow-xl border border-black/8 overflow-hidden">
              {/* Subtle top saffron glow accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-saffron/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-5">
                
                {/* Header: Badge & Status */}
                <div className="flex items-center justify-between gap-2 border-b border-black/8 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-saffron/10 flex items-center justify-center">
                      <Ticket className="w-3.5 h-3.5 text-saffron" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-900 font-sans">
                      Entry Pass
                    </span>
                  </div>

                  {event.registrationStatus === "open" && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Registration Open
                    </span>
                  )}
                  {event.registrationStatus === "closing_soon" && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                      Closing Soon
                    </span>
                  )}
                  {event.registrationStatus === "free_entry" && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-sans">
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      Free Open Gate
                    </span>
                  )}
                  {event.registrationStatus === "closed" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-neutral-100 text-neutral-500 border border-black/5 font-sans">
                      Closed
                    </span>
                  )}
                </div>

                {/* Pass Key Meta */}
                <div className="space-y-2.5 text-xs font-sans text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Date</span>
                    <span className="font-bold text-neutral-900">{event.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Hours</span>
                    <span className="font-bold text-neutral-900">{event.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Check-in</span>
                    <span className="font-bold text-neutral-900">{event.checkInMode}</span>
                  </div>
                  {event.registrationCloseDate && (
                    <div className="flex items-center justify-between pt-1.5 border-t border-black/5 text-amber-700 font-medium">
                      <span>Registration Closes</span>
                      <span className="font-bold">{event.registrationCloseDate}</span>
                    </div>
                  )}
                </div>

                {/* Primary CTA */}
                <div>
                  {isRegistrationOpen ? (
                    <Link
                      href={`/event-booking?event=${event.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-saffron hover:bg-saffron/90 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full shadow-lg shadow-saffron/20 hover:shadow-saffron/30 transition-all font-sans cursor-pointer group"
                    >
                      <span>Book Entry Pass</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <div className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-neutral-100 text-neutral-400 font-bold text-xs uppercase tracking-[0.2em] rounded-full font-sans cursor-not-allowed border border-black/5">
                      <AlertCircle className="w-4 h-4" />
                      <span>Registration Closed</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-black/5 flex items-center justify-between text-[10px] text-slate-400 font-sans">
                  <span>✓ Instant Confirmation</span>
                  <span>✓ Verified Official Pass</span>
                </div>

              </div>
            </div>

            {/* 2. Venue & Navigation Card */}
            <div className="rounded-3xl bg-white p-6 sm:p-7 shadow-md border border-black/8 space-y-4">
              <div className="flex items-center gap-2 border-b border-black/5 pb-3">
                <Building2 className="w-4 h-4 text-saffron" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 font-sans">
                  Venue &amp; Location
                </h3>
              </div>

              <div className="space-y-1 text-xs sm:text-sm font-sans">
                <p className="font-bold text-neutral-900">{event.venueName}</p>
                <p className="text-slate-600">{event.addressLine1}</p>
                {event.addressLine2 && <p className="text-slate-500">{event.addressLine2}</p>}
                <p className="text-slate-600 font-medium pt-1">
                  {event.city}, {event.state} {event.postalCode}
                </p>
              </div>

              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-neutral-900 hover:bg-saffron text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 shadow-sm font-sans"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold" />
              </a>
            </div>

            {/* 3. Safety & Accessibility Card */}
            {event.accessibilityInfo && event.accessibilityInfo.length > 0 && (
              <div className="rounded-3xl bg-white p-6 sm:p-7 shadow-md border border-black/8 space-y-4">
                <div className="flex items-center gap-2 border-b border-black/5 pb-3">
                  <ShieldCheck className="w-4 h-4 text-saffron" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 font-sans">
                    Safety &amp; Inclusivity
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {event.accessibilityInfo.map((facility, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Organizer Helpline Dock */}
            <div className="rounded-3xl bg-white p-6 sm:p-7 shadow-md border border-black/8 space-y-3">
              <div className="flex items-center gap-2 border-b border-black/5 pb-3">
                <PhoneCall className="w-4 h-4 text-saffron" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 font-sans">
                  Organizer Helpline
                </h3>
              </div>

              <div className="space-y-2 text-xs font-sans text-slate-600">
                <p>
                  <strong className="text-neutral-900">Coordinator:</strong> {event.emergencyContactName}
                </p>
                <p>
                  <strong className="text-neutral-900">Hotline:</strong>{" "}
                  <a href={`tel:${event.emergencyContactPhone}`} className="text-saffron font-bold hover:underline">
                    {event.emergencyContactPhone}
                  </a>
                </p>
                <p>
                  <strong className="text-neutral-900">Email:</strong>{" "}
                  <a href={`mailto:${event.organizerEmail}`} className="text-neutral-900 hover:text-saffron hover:underline">
                    {event.organizerEmail}
                  </a>
                </p>
                <div className="pt-2 border-t border-black/5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block">
                    ● 24/7 Response Active During Event
                  </span>
                </div>
              </div>
            </div>

          </aside>

        </div>

      </div>
    </main>
  );
}
