"use client";

import VolunteerCTA from "@/components/ui/volunteer-cta";

export default function AboutJoinCTA() {
  return (
    <VolunteerCTA
      badge="Be Part of the Story"
      title={
        <>
          Help Us Write the<br />
          <span className="text-saffron">Next Chapter</span>
        </>
      }
      description="Our trust expands operations exclusively based on volunteer energy and transparent resources. Register today to contribute your capabilities."
      buttonText="Sign Up As Volunteer"
      buttonLink="/volunteer"
    />
  );
}
