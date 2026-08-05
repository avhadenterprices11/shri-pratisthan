import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community & Social Welfare",
  description:
    "Shree Prathishthan's community initiatives: blood donation camps, tree plantation drives, disaster relief operations, and socio-educational material support across Maharashtra.",
  openGraph: {
    title: "Community & Social Welfare | Shree Prathishthan",
    description:
      "Blood donation camps, tree plantation, disaster relief, and socio-educational support across Maharashtra.",
    url: "https://www.shreepratishthan.org/community",
    images: [{ url: "/community_assembly.png", width: 1200, height: 630, alt: "Community Welfare by Shree Prathishthan" }],
  },
  twitter: {
    title: "Community & Social Welfare | Shree Prathishthan",
    description: "Blood donation, tree plantation, disaster relief, and socio-educational support.",
    images: ["/community_assembly.png"],
  },
  alternates: { canonical: "https://www.shreepratishthan.org/community" },
};

import CommunityHero from "@/components/community/hero";
import CommunityMission from "@/components/community/mission";
import CommunityInitiatives from "@/components/community/initiatives";
import BloodDonation from "@/components/community/blood-donation";
import TreePlantation from "@/components/community/tree-plantation";
import CharitySocialWork from "@/components/community/charity-social-work";
import CommunityImpact from "@/components/community/impact";
import SuccessStories from "@/components/community/success-stories";
import JoinMission from "@/components/community/join-mission";

export default function CommunityPage() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      {/* 1. Hero Landing Block */}
      <CommunityHero />

      {/* 2. Philosophy & Mission Statement */}
      <CommunityMission />

      {/* 3. Focus Initiatives Cards Grid */}
      <CommunityInitiatives />

      {/* 4. Blood Donation Campaigns Detail Section */}
      <BloodDonation />

      {/* 5. Tree Plantation & Environmental Section */}
      <TreePlantation />

      {/* 6. Charity & Material Social Work Section */}
      <CharitySocialWork />

      {/* 7. Live Metrics Counter Grid */}
      <CommunityImpact />

      {/* 8. Success Stories Slider/Carousel */}
      <SuccessStories />

      {/* 9. Volunteer Joining Onboarding CTA */}
      <JoinMission />
    </main>
  );
}
