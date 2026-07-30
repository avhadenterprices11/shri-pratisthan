import React from "react";
import AboutHero from "@/components/about/hero";
import AboutStory from "@/components/about/story";
import AboutVision from "@/components/about/vision";
import AboutMission from "@/components/about/mission";
import AboutValues from "@/components/about/values";
import AboutTimeline from "@/components/about/timeline";
import AboutCommittee from "@/components/about/committee";
import AboutAchievements from "@/components/about/achievements";
import AboutJoinCTA from "@/components/about/join-cta";
import AboutFooter from "@/components/about/footer";

export default function AboutPage() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      {/* 1. Hero Landing Block */}
      <AboutHero />

      {/* 2. Trust Founding Story */}
      <AboutStory />

      {/* 3. Vision statement */}
      <AboutVision />

      {/* 4. Mission statement */}
      <AboutMission />

      {/* 5. Values checklist */}
      <AboutValues />

      {/* 6. Milestones Vertical Progress Timeline */}
      <AboutTimeline />

      {/* 7. Committee Trustees Grid */}
      <AboutCommittee />

      {/* 8. Credentials & Achievements Panel */}
      <AboutAchievements />

      {/* 9. Join Onboarding Call-out */}
      <AboutJoinCTA />

      {/* 10. Global Footer Map */}
      <AboutFooter />
    </main>
  );
}
