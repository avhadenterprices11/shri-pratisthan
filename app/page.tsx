import React from "react";
import Hero from "@/components/home/hero";
import AboutPreview from "@/components/home/about-preview";

import FestivalJourney from "@/components/home/festival-journey";
import FeaturedEvents from "@/components/home/featured-events";
import CommunityImpact from "@/components/home/community-impact";
import CulturalInitiatives from "@/components/home/social-work";
import GalleryPreview from "@/components/home/gallery-preview";
import Testimonials from "@/components/home/testimonials";
import VolunteerCTA from "@/components/home/volunteer-cta";
import Sponsors from "@/components/home/sponsors";
import ContactCTA from "@/components/home/contact-cta";
import Footer from "@/components/home/footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen block">
      {/* 1. Hero Landing Block */}
      <Hero />

      {/* 2. Editorial About Preview */}
      <AboutPreview />



      {/* 4. Timeline Milestone Journey */}
      <FestivalJourney />

      {/* 5. Ganeshotsav & Dahi Handi Featured Cards */}
      <FeaturedEvents />

      {/* 6. Live Metrics & Counter-ups */}
      <CommunityImpact />

      {/* 7. Horizontal Scroller of Cultural Initiatives */}
      <CulturalInitiatives />

      {/* 8. Media Masonry Grid */}
      <GalleryPreview />

      {/* 9. Patron & Volunteer Testimonial */}
      <Testimonials />

      {/* 10. Volunteer Conversion Banner */}
      <VolunteerCTA />

      {/* 11. Sponsors Infinite Scroll Ticker */}
      <Sponsors />

      {/* 13. Message Inbox & Administrative Coordinates */}
      <ContactCTA />

      {/* 14. Global Page Footer Map */}
      <Footer />
    </main>
  );
}
