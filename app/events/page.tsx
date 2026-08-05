import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Festivals",
  description:
    "Explore Shree Prathishthan's grand festival calendar: Ganeshotsav, Dahi Handi, Navratri, Shiv Jayanti, Dussehra, and more. Join thousands of devotees in Maharashtra's biggest celebrations.",
  openGraph: {
    title: "Events & Festivals | Shree Prathishthan",
    description:
      "Grand festival calendar: Ganeshotsav, Dahi Handi, Navratri, Shiv Jayanti, and more. Maharashtra's biggest celebrations.",
    url: "https://www.shreepratishthan.org/events",
    images: [{ url: "/gallery_ganeshotsav_aarthi.png", width: 1200, height: 630, alt: "Shree Prathishthan Events & Festivals" }],
  },
  twitter: {
    title: "Events & Festivals | Shree Prathishthan",
    description: "Grand festivals: Ganeshotsav, Dahi Handi, Navratri, and more. Join Maharashtra's celebrations.",
    images: ["/gallery_ganeshotsav_aarthi.png"],
  },
  alternates: { canonical: "https://www.shreepratishthan.org/events" },
};

import EventsHero from "@/components/events/hero";
import UpcomingEvents from "@/components/events/upcoming-events";
import FestivalCalendar from "@/components/events/festival-calendar";
import FeaturedFestivals from "@/components/events/featured-festivals";
import EventJourney from "@/components/events/event-journey";
import PastEvents from "@/components/events/past-events";
import EventsHighlights from "@/components/events/highlights";
import EventsRegistration from "@/components/events/registration";

export default function EventsPage() {
  return (
    <main className="w-full min-h-screen">
      {/* 1. Hero Landing Block */}
      <EventsHero />

      {/* 2. Near-future Listings */}
      <UpcomingEvents />

      {/* 3. Chronological Calendar Tabs */}
      <FestivalCalendar />

      {/* 4. Ganeshotsav & Dahi Handi Featured Cards */}
      <FeaturedFestivals />

      {/* 5. Campaign Lifecycle Timeline */}
      <EventJourney />

      {/* 6. Completed Drives Grid */}
      <PastEvents />

      {/* 7. Image Snapshots */}
      <EventsHighlights />

      {/* 8. Active Registration Sheet */}
      <EventsRegistration />
    </main>
  );
}
