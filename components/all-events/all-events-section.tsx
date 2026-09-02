"use client";

import React, { useState } from "react";
import AllEventsFilter from "./all-events-filter";
import EventsGrid from "./events-grid";
import { ALL_EVENTS } from "@/lib/events-data";

export default function AllEventsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Compute event counts per category
  const counts = {
    all: ALL_EVENTS.length,
    cultural: ALL_EVENTS.filter((e) => e.category === "cultural").length,
    sports: ALL_EVENTS.filter((e) => e.category === "sports").length,
    health: ALL_EVENTS.filter((e) => e.category === "health").length,
    eco: ALL_EVENTS.filter((e) => e.category === "eco").length,
    charity: ALL_EVENTS.filter((e) => e.category === "charity").length,
  };

  // Filter active/upcoming events for grid based on category
  const filteredEvents = ALL_EVENTS.filter((e) => {
    if (selectedCategory === "all") return true;
    return e.category === selectedCategory;
  });

  return (
    <section id="all-events-grid" className="w-full py-10 sm:py-16 bg-neutral-50/50 border-t border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-6 sm:mb-8 text-center">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight font-heading leading-tight uppercase">
          Explore All Events
        </h2>
        <p className="text-xs sm:text-base text-neutral-600 max-w-2xl mx-auto mt-2 sm:mt-3 font-normal font-sans leading-relaxed">
          Filter our ongoing celebrations, upcoming health camps, cultural festivals, and community initiatives.
        </p>
        <div className="w-12 sm:w-16 h-1 bg-saffron mx-auto mt-3 sm:mt-4 rounded-full" />
      </div>

      {/* Interactive Category Filter Bar */}
      <AllEventsFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        counts={counts}
      />

      {/* Active & Upcoming Events Grid */}
      <EventsGrid events={filteredEvents} />
    </section>
  );
}
