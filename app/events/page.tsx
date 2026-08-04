import React from "react";
import EventsHero from "@/components/events/hero";
import UpcomingEvents from "@/components/events/upcoming-events";
import FestivalCalendar from "@/components/events/festival-calendar";
import FeaturedFestivals from "@/components/events/featured-festivals";
import EventJourney from "@/components/events/event-journey";
import PastEvents from "@/components/events/past-events";
import EventsHighlights from "@/components/events/highlights";
import EventsRegistration from "@/components/events/registration";
import EventsFooter from "@/components/events/footer";

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

      {/* 10. Global Footer Map */}
      <EventsFooter />
    </main>
  );
}
