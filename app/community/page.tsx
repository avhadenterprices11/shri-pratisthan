import React from "react";
import CommunityHero from "@/components/community/hero";
import CommunityMission from "@/components/community/mission";
import CommunityInitiatives from "@/components/community/initiatives";
import BloodDonation from "@/components/community/blood-donation";
import TreePlantation from "@/components/community/tree-plantation";
import CharitySocialWork from "@/components/community/charity-social-work";
import CommunityImpact from "@/components/community/impact";
import SuccessStories from "@/components/community/success-stories";
import JoinMission from "@/components/community/join-mission";
import CommunityFooter from "@/components/community/footer";

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

      {/* 10. Global Footer Map */}
      <CommunityFooter />
    </main>
  );
}
