import React from "react";
import VolunteerHero from "@/components/volunteer/hero";
import VolunteerWhyJoin from "@/components/volunteer/why-join";
import VolunteerOpportunities from "@/components/volunteer/opportunities";
import VolunteerBenefits from "@/components/volunteer/benefits";
import VolunteerProcess from "@/components/volunteer/process";
import VolunteerTestimonials from "@/components/volunteer/testimonials";
import VolunteerFAQ from "@/components/volunteer/faq";
import VolunteerRegistrationForm from "@/components/volunteer/registration-form";
import VolunteerFooter from "@/components/volunteer/footer";

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

      {/* 9. Page specific Footer component */}
      <VolunteerFooter />
    </main>
  );
}
