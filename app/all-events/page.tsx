"use client";

import React, { useState } from "react";
import AllEventsHero from "@/components/all-events/hero";
import AllEventsFilter from "@/components/all-events/all-events-filter";
import EventsGrid from "@/components/all-events/events-grid";
import PastEventsArchive from "@/components/all-events/past-events";
import AllEventsCommunityCTA from "@/components/all-events/community-cta";
import { ALL_EVENTS } from "@/lib/events-data";

export default function AllEventsPage() {
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
    <main className="flex flex-col w-full min-h-screen bg-background">
      {/* 1. All Events Hero Banner */}
      <AllEventsHero />

      {/* 2. Interactive Category Filter Bar */}
      <AllEventsFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        counts={counts}
      />

      {/* 3. Active & Upcoming Events Grid */}
      <EventsGrid events={filteredEvents} />

      {/* 4. Historical Past Events Showcase */}
      <PastEventsArchive />

      {/* 5. Community Participation CTA Banner */}
      <AllEventsCommunityCTA />
    </main>
  );
}
