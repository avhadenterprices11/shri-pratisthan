import React from "react";
import type { Metadata } from "next";
import EventBookingHero from "@/components/event-booking/hero";
import EventBookingContainer from "@/components/event-booking";

export const metadata: Metadata = {
  title: "Event Booking & Registration Pass",
  description:
    "Register for upcoming Shree Prathishthan cultural celebrations, Dahi Handi competitions, Navratri garba, health camps, and volunteer events. Obtain your instant digital entry pass.",
  openGraph: {
    title: "Event Booking & Entry Pass | Shree Prathishthan",
    description:
      "Register for upcoming cultural celebrations and social drives. Get your instant digital entry pass with QR verification.",
    url: "https://www.shreepratishthan.org/event-booking",
    images: [{ url: "/hero_ganesh.png", width: 1200, height: 630, alt: "Event Booking Shree Prathishthan" }],
  },
  twitter: {
    title: "Event Booking & Entry Pass | Shree Prathishthan",
    description: "Register for upcoming cultural celebrations and social drives.",
    images: ["/hero_ganesh.png"],
  },
  alternates: { canonical: "https://www.shreepratishthan.org/event-booking" },
};

export default function EventBookingPage() {
  return (
    <main className="flex flex-col w-full min-h-screen pb-20 bg-background relative overflow-hidden">
      {/* 1. Next-Level Interactive Hero Component */}
      <EventBookingHero />

      {/* 2. Main Multi-Step Form Interactive Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-4">
        <EventBookingContainer />
      </div>
    </main>
  );
}
