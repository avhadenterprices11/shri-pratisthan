"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, Ticket } from "lucide-react";
import { EventItem } from "@/lib/events-data";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedEvent } from "@/lib/events-i18n";

interface EventsGridProps {
  events: EventItem[];
}

export default function EventsGrid({ events }: EventsGridProps) {
  const { t, language } = useLanguage();

  if (events.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-16 text-center">
        <p className="text-lg text-neutral-500 font-medium">{t("eventsPage.allEvents.noEvents")}</p>
      </div>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2 sm:py-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {events.map((rawEvent) => {
          const event = getLocalizedEvent(rawEvent, language);
          return (
            <div
              key={event.id}
              className="group bg-white dark:bg-[#121214] border border-neutral-200/90 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-saffron/40 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Box */}
              <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <Image
                  src={event.mainImage}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-3 sm:top-3.5 left-3 sm:left-3.5 flex gap-2">
                  <span className="px-2.5 py-0.5 sm:py-1 bg-saffron text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.2em] rounded-full shadow-md font-sans">
                    {event.categoryLabel}
                  </span>
                </div>

                {/* Tag for Status */}
                <div className="absolute top-3 sm:top-3.5 right-3 sm:right-3.5">
                  <span
                    className={`px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur-md shadow-md font-sans ${
                      event.status === "upcoming"
                        ? "bg-emerald-500 text-white"
                        : event.status === "active"
                        ? "bg-amber-500 text-white animate-pulse"
                        : "bg-black/60 text-neutral-300 border border-white/20"
                    }`}
                  >
                    {event.status === "upcoming"
                      ? t("eventsPage.allEvents.upcoming")
                      : event.status === "active"
                      ? t("eventsPage.allEvents.active")
                      : t("eventsPage.allEvents.completed")}
                  </span>
                </div>

                {/* Bottom Image Overlay Date */}
                <div className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-3.5 right-3 sm:right-3.5 text-white">
                  <span className="text-[10px] sm:text-[11px] font-medium text-amber-300 flex items-center gap-1 font-sans">
                    <Calendar className="w-3.5 h-3.5" /> {event.date}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-3.5 sm:p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-normal font-heading text-neutral-900 dark:text-neutral-100 leading-snug group-hover:text-saffron transition-colors uppercase">
                    {event.title}
                  </h3>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex items-center justify-between gap-2 border-t border-neutral-100 dark:border-white/10 mt-3">
                  <Link
                    href={`/events/${event.id}`}
                    className="flex-1 py-2 px-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] text-center transition-all flex items-center justify-center gap-1.5 font-sans"
                  >
                    {t("eventsPage.allEvents.detailsBtn")} <ArrowRight className="w-3.5 h-3.5 text-saffron" />
                  </Link>

                  {event.status !== "completed" && (
                    <Link
                      href={`/event-booking?event=${event.id}`}
                      className="py-2 px-3 sm:px-3.5 bg-saffron hover:bg-saffron/90 text-white rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] transition-all flex items-center gap-1 shadow-md hover:shadow-saffron/20 font-sans"
                    >
                      <Ticket className="w-3.5 h-3.5" /> {t("eventsPage.allEvents.bookBtn")}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
