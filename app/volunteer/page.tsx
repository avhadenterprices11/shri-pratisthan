import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volunteer With Us",
  description:
    "Join Shree Prathishthan's volunteer programs across Maharashtra. Opportunities in cultural event logistics, medical camps, tree plantation drives, and socio-educational relief. All skill levels welcome.",
  openGraph: {
    title: "Volunteer With Us | Shree Prathishthan",
    description:
      "Join our volunteer programs: cultural events, medical camps, tree plantation, and relief work across Maharashtra.",
    url: "https://www.shreepratishthan.org/volunteer",
    images: [{ url: "/volunteer_coordinator.png", width: 1200, height: 630, alt: "Volunteer with Shree Prathishthan" }],
  },
  twitter: {
    title: "Volunteer With Us | Shree Prathishthan",
    description: "Join cultural events, medical camps, tree plantation, and relief work across Maharashtra.",
    images: ["/volunteer_coordinator.png"],
  },
  alternates: { canonical: "https://www.shreepratishthan.org/volunteer" },
};

import VolunteerHero from "@/components/volunteer/hero";
import VolunteerWhyJoin from "@/components/volunteer/why-join";
import VolunteerOpportunities from "@/components/volunteer/opportunities";
import VolunteerBenefits from "@/components/volunteer/benefits";
import VolunteerProcess from "@/components/volunteer/process";
import VolunteerTestimonials from "@/components/volunteer/testimonials";
import VolunteerFAQ from "@/components/volunteer/faq";
import VolunteerRegistrationForm from "@/components/volunteer/registration-form";

export default function VolunteerPage() {
  return (
    <main className="w-full min-h-screen">
      {/* 1. Hero Landing Block */}
      <VolunteerHero />

      {/* 2. Motivations & Value Proposition */}
      <VolunteerWhyJoin />

      {/* 3. Opportunities & Action Tracks */}
      <VolunteerOpportunities />

      {/* 4. Support & Incentives Perks */}
      <VolunteerBenefits />

      {/* 5. Pipeline Stages Walkthrough */}
      <VolunteerProcess />

      {/* 6. Active Volunteers Stories Grid */}
      <VolunteerTestimonials />

      {/* 7. Common Queries Accordion Panel */}
      <VolunteerFAQ />

      {/* 8. Active Intake Form Block */}
      <VolunteerRegistrationForm />
    </main>
  );
}
