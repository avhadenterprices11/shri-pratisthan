"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight, Ticket } from "lucide-react";
import { EventItem } from "@/lib/events-data";

interface EventsGridProps {
  events: EventItem[];
}

export default function EventsGrid({ events }: EventsGridProps) {
  if (events.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-16 text-center">
        <p className="text-lg text-neutral-500 font-medium">No events found matching the selected category.</p>
      </div>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="group bg-white border border-neutral-200/90 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-saffron/40 transition-all duration-500 flex flex-col justify-between"
          >
            {/* Image Box */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-neutral-100">
              <Image
                src={event.mainImage}
                alt={event.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Status Badge */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-2">
                <span className="px-2.5 sm:px-3 py-1 bg-saffron text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.2em] rounded-full shadow-md font-sans">
                  {event.categoryLabel}
                </span>
              </div>

              {/* Tag for Status */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                <span
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur-md shadow-md font-sans ${
                    event.status === "upcoming"
                      ? "bg-emerald-500 text-white"
                      : event.status === "active"
                      ? "bg-amber-500 text-white animate-pulse"
                      : "bg-black/60 text-neutral-300 border border-white/20"
                  }`}
                >
                  {event.status === "upcoming"
                    ? "Upcoming"
                    : event.status === "active"
                    ? "Happening Now"
                    : "Completed Archive"}
                </span>
              </div>

              {/* Bottom Image Overlay Title */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                <span className="text-[10px] sm:text-[11px] font-medium text-amber-300 flex items-center gap-1 font-sans">
                  <Calendar className="w-3.5 h-3.5" /> {event.date}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-1.5 sm:space-y-2">
                <h3 className="text-lg sm:text-xl font-normal font-heading text-neutral-900 leading-snug group-hover:text-saffron transition-colors uppercase">
                  {event.title}
                </h3>
                <p className="text-xs text-neutral-600 font-normal line-clamp-2 leading-[1.6] font-sans">
                  {event.description}
                </p>
              </div>

              {/* Venue & Time Info */}
              <div className="space-y-1.5 sm:space-y-2 pt-2 border-t border-neutral-100 text-xs text-neutral-700 font-normal font-sans">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-saffron flex-shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-saffron flex-shrink-0" />
                  <span>{event.metrics[0]?.label}: <strong>{event.metrics[0]?.value}</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 sm:pt-4 flex items-center justify-between gap-2.5 sm:gap-3 border-t border-neutral-100">
                <Link
                  href={`/events/${event.id}`}
                  className="flex-1 py-2 sm:py-2.5 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] text-center transition-all flex items-center justify-center gap-1.5 font-sans"
                >
                  Details <ArrowRight className="w-3.5 h-3.5 text-saffron" />
                </Link>

                {event.status !== "completed" && (
                  <Link
                    href={`/event-booking?event=${event.id}`}
                    className="py-2 sm:py-2.5 px-3.5 sm:px-4 bg-saffron hover:bg-saffron/90 text-white rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] transition-all flex items-center gap-1 shadow-md hover:shadow-saffron/20 font-sans"
                  >
                    <Ticket className="w-3.5 h-3.5" /> Book Event
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
