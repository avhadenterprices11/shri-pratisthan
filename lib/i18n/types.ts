export type SupportedLang = "en" | "mr" | "hi";

export interface LocaleSchema {
  nav: {
    home: string;
    about: string;
    community: string;
    volunteer: string;
    events: string;
    gallery: string;
    contact: string;
    quickLinks: string;
    privacy: string;
    terms: string;
  };
  cultural: {
    trustName: string;
    trustSubname: string;
    founder: string;
    founderTitle: string;
    location: string;
    swagatYatra: string;
    bhavyaSwagatYatra: string;
    ganeshotsav: string;
    dahiHandi: string;
    shivJayanti: string;
    shreeNaadPathak: string;
    lezim: string;
    mahaAarti: string;
    mahaPrasad: string;
    motto: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    ctaExplore: string;
    ctaVolunteer: string;
    badgeYear: string;
    badgeImpact: string;
  };
  aboutPreview: {
    eyebrow: string;
    heading: string;
    description: string;
    learnMore: string;
  };
  socialWork: {
    eyebrow: string;
    heading: string;
    description: string;
    bannerText: string;
    joinTroupe: string;
    participate: string;
  };
  galleryPreview: {
    eyebrow: string;
    heading: string;
    description: string;
    viewAll: string;
  };
  events: {
    eyebrow: string;
    heading: string;
    description: string;
    viewAllEvents: string;
    bookPass: string;
    registrationOpen: string;
    registrationClosed: string;
    closingSoon: string;
    freeEntry: string;
  };
  volunteer: {
    eyebrow: string;
    heading: string;
    description: string;
    cta: string;
  };
  footer: {
    tagline: string;
    addressTitle: string;
    addressText: string;
    regNo: string;
    phone: string;
    email: string;
    rights: string;
    designedWith: string;
  };
  common: {
    readMore: string;
    viewDetails: string;
    submit: string;
    back: string;
    next: string;
    contactHelpline: string;
    getDirections: string;
  };
}
