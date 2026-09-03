import React from "react";
import type { Metadata } from "next";
import EventBookingContainer from "@/components/events/event-booking";

export const metadata: Metadata = {
  title: "Event Booking & Digital Entry Pass | Shree Pratishtan (श्री प्रतिष्ठान)",
  description:
    "Book your passes and register for upcoming Shree Pratishtan cultural celebrations, Gudipadwa Swagat Yatra, Ganeshotsav, Navratri, health camps, and sports leagues in Indira Nagar, Nashik.",
  openGraph: {
    title: "Event Booking & Digital Entry Pass | Shree Pratishtan (श्री प्रतिष्ठान)",
    description:
      "Book your passes and register for upcoming cultural celebrations and social drives in Indira Nagar, Nashik. Get your instant digital pass with QR verification.",
    url: "https://www.shreepratishthan.org/event-booking",
    images: [{ url: "/hero_ganesh.png", width: 1200, height: 630, alt: "Event Booking Shree Pratishtan" }],
  },
  twitter: {
    title: "Event Booking & Digital Entry Pass | Shree Pratishtan (श्री प्रतिष्ठान)",
    description: "Book passes for upcoming cultural celebrations and social drives in Indira Nagar, Nashik.",
    images: ["/hero_ganesh.png"],
  },
  alternates: { canonical: "https://www.shreepratishthan.org/event-booking" },
};

export default function EventBookingPage() {
  return (
    <main className="flex flex-col w-full min-h-screen pt-20 sm:pt-28 pb-20 bg-[#FBFBFA] relative overflow-hidden select-none">
      {/* Subtle ambient lighting glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-saffron/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-gold/6 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Multi-Step Form Container */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <EventBookingContainer />
      </div>
    </main>
  );
}
