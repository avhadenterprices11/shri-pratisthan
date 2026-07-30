import React from "react";
import ContactHero from "@/components/contact/hero";
import ContactInformation from "@/components/contact/contact-information";
import CommitteeDirectory from "@/components/contact/committee-directory";
import ContactForm from "@/components/contact/contact-form";
import LocationMap from "@/components/contact/location-map";
import ContactSocialMedia from "@/components/contact/social-media";
import ContactFAQ from "@/components/contact/faq";
import ContactSupportCTA from "@/components/contact/support-cta";
import ContactFooter from "@/components/contact/footer";

export default function ContactPage() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      {/* 1. Hero Landing Block */}
      <ContactHero />

      {/* 2. Addresses & Registration Codes Info */}
      <ContactInformation />

      {/* 3. Area Coordinators Telephone Directories */}
      <CommitteeDirectory />

      {/* 4. Active Messaging Intake Form */}
      <ContactForm />

      {/* 5. Styled HQ Geographic Coordinates */}
      <LocationMap />

      {/* 6. Social Channels Visual Grid */}
      <ContactSocialMedia />

      {/* 7. Common Coordination Queries FAQ */}
      <ContactFAQ />

      {/* 8. Action Guides Conversion Block */}
      <ContactSupportCTA />

      {/* 9. Global Page Footer Wrapper */}
      <ContactFooter />
    </main>
  );
}
