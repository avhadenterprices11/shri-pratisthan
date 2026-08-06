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
  Info,
  Award,
  Users
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
    title: `${event.title} | Shree Prathishthan`,
    description: event.description,
    openGraph: {
      title: `${event.title} | Shree Prathishthan`,
      description: event.description,
      url: `https://www.shreepratishthan.org/events/${event.id}`,
      images: [{ url: event.mainImage, width: 1200, height: 630, alt: event.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} | Shree Prathishthan`,
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

  return (
    <main className="min-h-screen py-28 px-6 md:px-12 relative overflow-hidden bg-background">
      {/* Decorative ambient backgrounds matching /gallery/[id] */}
      <div className="absolute inset-0 ambient-saffron-glow pointer-events-none opacity-60" />
      <div className="absolute inset-0 ambient-gold-glow pointer-events-none translate-y-1/3 opacity-60" />

      <div className="max-w-[1400px] w-full mx-auto relative z-10 space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/all-events"
            className="inline-flex items-center gap-2 text-saffron hover:text-saffron/85 font-extrabold text-xs uppercase tracking-widest transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Events
          </Link>
        </div>

        {/* Main Glassmorphic Showcase Panel */}
        <div className="glass-panel p-6 sm:p-12 rounded-block border border-saffron/20 relative overflow-hidden bg-white/75 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Image Showcase */}
            <div className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden rounded-block border border-saffron/10 shadow-lg bg-neutral-100">
              <Image
                src={event.mainImage}
                alt={event.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="inline-flex items-center bg-saffron text-white font-extrabold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                  {event.categoryLabel}
                </span>
                <span
                  className={`inline-flex items-center font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-sm ${
                    event.status === "upcoming"
                      ? "bg-emerald-500 text-white"
                      : "bg-neutral-800 text-neutral-200"
                  }`}
                >
                  {event.status === "upcoming" ? "Upcoming Event" : "Completed Archive"}
                </span>
              </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-saffron uppercase tracking-widest font-mono block">
                {event.tagline}
              </span>

              <h1 className="text-3xl sm:text-5xl font-black text-foreground font-heading leading-none uppercase tracking-tight">
                {event.title}
              </h1>

              {/* Quote block */}
              <div className="flex gap-3 border-l-4 border-saffron pl-4 py-1">
                <p className="text-base sm:text-lg font-bold text-slate-800 italic leading-relaxed">
                  "{event.description}"
                </p>
              </div>

              {/* Quick Details List */}
              <div className="border-t border-saffron/10 pt-6 space-y-3 text-xs sm:text-sm text-slate-grey font-medium">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-saffron flex-shrink-0" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-saffron flex-shrink-0" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-saffron flex-shrink-0" />
                  <span>{event.location}</span>
                </div>
              </div>

              {/* CTAs */}
              {event.status !== "completed" && (
                <div className="pt-2">
                  <Link
                    href={`/event-booking?event=${event.id}`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-saffron hover:bg-saffron/90 text-white font-extrabold text-xs uppercase tracking-widest rounded-full shadow-lg hover:shadow-saffron/20 transition-all"
                  >
                    <Ticket className="w-4 h-4" /> Book Entry Pass
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Impact Metrics Callout Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {event.metrics.map((m, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-interactive border border-saffron/15 text-center space-y-1 bg-white/70">
              <span className="text-2xl sm:text-4xl font-black text-saffron font-heading block">{m.value}</span>
              <span className="text-[11px] text-slate-grey font-extrabold uppercase tracking-wider">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Comprehensive Organization Story */}
        <div className="glass-panel p-6 sm:p-12 rounded-block border border-saffron/20 bg-white/75 shadow-xl space-y-8">
          <div className="border-b border-saffron/10 pb-6">
            <span className="inline-flex items-center gap-1.5 bg-saffron/10 text-saffron font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full border border-saffron/20 shadow-sm mb-3">
              <Info className="w-3.5 h-3.5" />
              Event Operations & Logistics
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-heading text-foreground uppercase tracking-tight">
              HOW THIS EVENT WAS <span className="text-saffron">ORGANIZED</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {event.organizedDetails.map((detail, idx) => (
              <div key={idx} className="space-y-2 border-l-2 border-saffron/30 pl-4 py-1">
                <h3 className="font-extrabold font-heading text-foreground text-lg">
                  {idx + 1}. {detail.heading}
                </h3>
                <p className="text-sm text-slate-grey leading-relaxed font-sans">
                  {detail.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Agenda Timeline */}
        {event.agenda && event.agenda.length > 0 && (
          <div className="glass-panel p-6 sm:p-12 rounded-block border border-saffron/20 bg-white/80 shadow-xl space-y-8">
            <div className="border-b border-saffron/10 pb-4">
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-foreground uppercase tracking-tight">
                PROGRAM AGENDA & TIMELINE
              </h2>
            </div>

            <div className="space-y-4">
              {event.agenda.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-white/90 border border-saffron/10 rounded-interactive">
                  <span className="px-3.5 py-1.5 bg-saffron text-white font-mono font-bold text-xs rounded-full whitespace-nowrap shadow-sm">
                    {item.time}
                  </span>
                  <div>
                    <h4 className="font-extrabold text-foreground text-base font-heading">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-grey mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photo Gallery Grid */}
        <div className="glass-panel p-6 sm:p-12 rounded-block border border-saffron/20 bg-white/75 shadow-xl space-y-6">
          <h2 className="text-2xl font-black font-heading text-foreground uppercase tracking-tight">
            EVENT MOMENTS GALLERY
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {event.galleryImages.map((img, idx) => (
              <div key={idx} className="relative aspect-video w-full rounded-interactive overflow-hidden border border-saffron/10 shadow-sm group">
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

        {/* Contacts & Map Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 sm:p-8 rounded-block border border-saffron/15 bg-white/75 space-y-3">
            <h3 className="font-extrabold font-heading text-foreground text-lg flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-saffron" />
              Event Helpline
            </h3>
            <p className="text-sm text-slate-grey font-medium"><strong>Organizer:</strong> {event.organizerName}</p>
            <p className="text-sm text-slate-grey font-medium"><strong>Phone:</strong> {event.organizerPhone}</p>
            <p className="text-sm text-slate-grey font-medium"><strong>Email:</strong> {event.organizerEmail}</p>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-block border border-saffron/15 bg-white/75 space-y-4 flex flex-col justify-between">
            <h3 className="font-extrabold font-heading text-foreground text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-saffron" />
              Location Coordinates
            </h3>
            <p className="text-sm text-slate-grey font-medium">{event.location}</p>
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-md"
            >
              View on Google Maps <ExternalLink className="w-3.5 h-3.5 text-saffron" />
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
