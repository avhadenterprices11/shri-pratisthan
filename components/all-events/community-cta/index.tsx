"use client";

import React from "react";
import VolunteerCTA from "@/components/ui/volunteer-cta";

export default function AllEventsCommunityCTA() {
  return (
    <VolunteerCTA
      title={
        <>
          Join the Cultural Legacy.<br />
          <span className="text-saffron">Be the Change.</span>
        </>
      }
      description="Direct event logistics, coordinate safety marshals, organize eco-friendly clay workshops, or participate in cultural drives. Shree Prathishthan channels your energy directly into community progress."
      buttonText="Become a Volunteer / Partner"
      buttonLink="/volunteer"
    />
  );
}
