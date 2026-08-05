import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Shree Prathishthan's founding story, our vision, mission, and the dedicated committee trustees who lead Maharashtra's premier cultural and social welfare trust.",
  openGraph: {
    title: "About Us | Shree Prathishthan",
    description:
      "Our founding story, vision, mission, and the committee behind Maharashtra's premier cultural trust.",
    url: "https://www.shreepratishthan.org/about",
    images: [{ url: "/about_showcase.png", width: 1200, height: 630, alt: "About Shree Prathishthan" }],
  },
  twitter: {
    title: "About Us | Shree Prathishthan",
    description: "Our founding story, vision, mission, and the committee behind Maharashtra's premier cultural trust.",
    images: ["/about_showcase.png"],
  },
  alternates: { canonical: "https://www.shreepratishthan.org/about" },
};

import AboutHero from "@/components/about/hero";
import AboutStory from "@/components/about/story";
import AboutVision from "@/components/about/vision";
import AboutMission from "@/components/about/mission";
import AboutValues from "@/components/about/values";
import AboutTimeline from "@/components/about/timeline";
import AboutCommittee from "@/components/about/committee";
import AboutAchievements from "@/components/about/achievements";
import AboutJoinCTA from "@/components/about/join-cta";

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
    </main>
  );
}
