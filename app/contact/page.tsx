import React from "react";
import ContactInformation from "@/components/contact/contact-information";
import CommitteeDirectory from "@/components/contact/committee-directory";
import ContactForm from "@/components/contact/contact-form";
import LocationMap from "@/components/contact/location-map";
import ContactSocialMedia from "@/components/contact/social-media";
import ContactSupportCTA from "@/components/contact/support-cta";
import ContactFooter from "@/components/contact/footer";

export default function ContactPage() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      {/* 1. Addresses & Registration Codes Info */}
      <ContactInformation />

      {/* 2. Area Coordinators Telephone Directories */}
      <CommitteeDirectory />

      {/* 3. Active Messaging Intake Form */}
      <ContactForm />

      {/* 4. Styled HQ Geographic Coordinates */}
      <LocationMap />

      {/* 5. Social Channels Visual Grid */}
      <ContactSocialMedia />

      {/* 6. Action Guides Conversion Block */}
      <ContactSupportCTA />

      {/* 7. Global Page Footer Wrapper */}
      <ContactFooter />
    </main>
  );
}
