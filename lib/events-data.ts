export interface EventMetric {
  label: string;
  value: string;
}

export interface EventAgendaItem {
  time: string;
  title: string;
  description: string;
}

export interface EventOrganizationDetail {
  heading: string;
  content: string;
}

export interface EventItem {
  id: string;
  title: string;
  tagline: string;
  category: "cultural" | "sports" | "health" | "eco" | "charity";
  categoryLabel: string;
  status: "upcoming" | "active" | "completed";
  date: string;
  time: string;
  location: string;
  mapUrl: string;
  mainImage: string;
  galleryImages: string[];
  description: string;
  metrics: EventMetric[];
  organizedDetails: EventOrganizationDetail[];
  agenda: EventAgendaItem[];
  organizerName: string;
  organizerPhone: string;
  organizerEmail: string;
}

export const ALL_EVENTS: EventItem[] = [
  {
    id: "ganesh-utsav-2026",
    title: "Ganesh Utsav Grand Celebration 2026",
    tagline: "10 Days of Devotion, Cultural Unity, and Grand Aarti",
    category: "cultural",
    categoryLabel: "Cultural Festival",
    status: "upcoming",
    date: "Aug 27 – Sep 06, 2026",
    time: "06:00 AM – 11:00 PM Daily",
    location: "Shree Prathishthan Mandal, Central Ground, Pune",
    mapUrl: "https://maps.google.com/?q=Pune+Maharashtra",
    mainImage: "/gallery_ganeshotsav_aarthi.png",
    galleryImages: [
      "/gallery_ganeshotsav_aarthi.png",
      "/hero_ganesh.png",
      "/ganeshotsav_backdrop.png",
      "/gallery_gauri_ganpati_decor.png",
    ],
    description:
      "Shree Prathishthan's signature annual festival uniting thousands of devotees in traditional celebration, eco-friendly idol immersion, daily grand aarti, cultural performances, and community prasad distribution.",
    metrics: [
      { label: "Expected Footfall", value: "75,000+" },
      { label: "Volunteer Marshals", value: "250+" },
      { label: "Cultural Programs", value: "15 Performances" },
      { label: "Prasad Distributed", value: "50,000 Meals" },
    ],
    organizedDetails: [
      {
        heading: "A to Z Festival Planning & Municipal Approvals",
        content:
          "Preparation starts 3 months in advance with municipal clearances, police permissions, fire safety audits, and structural inspections of the central Pandal. Electrical wiring is triple-tested with backup generators.",
      },
      {
        heading: "Eco-Friendly Clay Idol & Green Visarjan Infrastructure",
        content:
          "Continuing our environmental pledge, the central Bappa idol is sculpted using 100% natural eco-friendly clay (Shadu Mati) and organic colors. Artificial water tanks are installed at the venue for eco-immersion.",
      },
      {
        heading: "Crowd Safety, CCTV Surveillance & Medical Tents",
        content:
          "24/7 CCTV surveillance connected to a central control room ensures safety. Dedicated queues for senior citizens and families are maintained alongside ambulance units and emergency medical booths staffed by trained doctors.",
      },
      {
        heading: "Cultural Stages & Daily Maha Prasad Management",
        content:
          "Every evening features classical Maharashtrian folk performances, Dhol Tasha musical beats, and youth drama plays. Over 5,000 meals of hygienic Maha Prasad are served daily under strict quality standards.",
      },
    ],
    agenda: [
      { time: "06:00 AM", title: "Prabhat Aarti & Morning Bhajans", description: "Traditional morning prayers to commence the festival day." },
      { time: "10:30 AM", title: "Eco-Workshop & School Visits", description: "Interactive clay modeling sessions for visiting school children." },
      { time: "07:00 PM", title: "Grand Evening Maha Aarti", description: "Resonant 108-lamp aarti attended by prominent community leaders." },
      { time: "08:30 PM", title: "Cultural Drama & Dhol Tasha Performance", description: "Live stage performances celebrating Maharashtra's rich heritage." },
    ],
    organizerName: "Shree Prathishthan Utsav Committee",
    organizerPhone: "+91 98765 43210",
    organizerEmail: "events@shreepratishthan.org",
  },

  {
    id: "dahi-handi-2026",
    title: "Annual Dahi Handi Championship 2026",
    tagline: "Fearless Spirit, Teamwork, and 7-Tier Human Pyramids",
    category: "sports",
    categoryLabel: "Sports & Cultural",
    status: "upcoming",
    date: "Aug 16, 2026",
    time: "03:00 PM – 10:00 PM",
    location: "Pratishthan Sports Arena, Shivaji Nagar, Pune",
    mapUrl: "https://maps.google.com/?q=Pune+Maharashtra",
    mainImage: "/gallery_dahi_handi_pyramids.png",
    galleryImages: [
      "/gallery_dahi_handi_pyramids.png",
      "/hero_dahihandi.png",
      "/dahihandi_backdrop.png",
      "/dahihandi_bright.png",
    ],
    description:
      "A thrilling display of strength, balance, and athletic unity as top Govinda Pathaks compete to break the suspended Dahi Handi under world-class safety harnesses and sports protocols.",
    metrics: [
      { label: "Govinda Teams", value: "35+ Troupes" },
      { label: "Spectators", value: "25,000+" },
      { label: "Safety Marshals", value: "180 Personnel" },
      { label: "Prize Fund", value: "₹5,00,000" },
    ],
    organizedDetails: [
      {
        heading: "Safety First Architecture & Harness Rigging",
        content:
          "Safety is paramount. All participating Govindas wear certified helmets, chest guards, and double-braided climbing harnesses. High-density foam crash mats and air cushions cover the entire ground area.",
      },
      {
        heading: "Medical Infrastructure & Rapid On-Site Doctors",
        content:
          "Two fully equipped ICU ambulances with trauma response doctors and orthopedic specialists are stationed on the perimeter for zero-delay medical care.",
      },
      {
        heading: "Public Crowd Control & Elevated Viewing Decks",
        content:
          "Tiered barricading separates spectator zones from the central arena, featuring elevated media decks and designated family seating areas.",
      },
    ],
    agenda: [
      { time: "03:00 PM", title: "Govinda Pathak Reporting & Safety Check", description: "Inspection of helmets, gear, and registration numbers." },
      { time: "04:30 PM", title: "Initial Rounds & 5-Tier Pyramids", description: "Opening attempts by local youth clubs." },
      { time: "07:30 PM", title: "Championship Round & 7-Tier Pyramids", description: "Top Govinda Pathaks attempt the high-suspended Handi." },
      { time: "09:30 PM", title: "Trophy Presentation & Awards", description: "Felicitation of winners, sportsmanship honors, and safety awards." },
    ],
    organizerName: "Govinda Sports Federation & Shree Prathishthan",
    organizerPhone: "+91 98765 43211",
    organizerEmail: "sports@shreepratishthan.org",
  },

  {
    id: "navratri-garba-2026",
    title: "Navratri Dandiya & Garba Nights 2026",
    tagline: "Nine Nights of Tradition, Traditional Attire, and Folk Dance",
    category: "cultural",
    categoryLabel: "Cultural Festival",
    status: "upcoming",
    date: "Sep 22 – Oct 02, 2026",
    time: "07:30 PM – 11:30 PM Daily",
    location: "Heritage Cultural Grounds, Kothrud, Pune",
    mapUrl: "https://maps.google.com/?q=Pune+Maharashtra",
    mainImage: "/gallery_navratri_garba.png",
    galleryImages: [
      "/gallery_navratri_garba.png",
      "/hero_navratri.png",
      "/community_assembly.png",
    ],
    description:
      "A vibrant celebration of Goddess Durga through energetic Garba, Raas Dandiya, live traditional acoustic orchestras, ethnic costume contests, and eco-friendly food stalls.",
    metrics: [
      { label: "Nightly Dancers", value: "10,000+" },
      { label: "Live Orchestra", value: "12 Musicians" },
      { label: "Best Attire Prizes", value: "Daily Awards" },
      { label: "Security Marshals", value: "120 Women Bouncers & Police" },
    ],
    organizedDetails: [
      {
        heading: "Women Safety & Dedicated Security Zones",
        content:
          "Female security marshals, undercover police constables, and well-lit entry gates ensure total safety and comfort for women and children dancers.",
      },
      {
        heading: "Acoustic Stage & Wooden Flooring Setup",
        content:
          "Over 30,000 sq. ft. of smooth anti-skid wooden flooring is laid out to prevent injuries during fast Garba steps, accompanied by state-of-the-art surround sound.",
      },
    ],
    agenda: [
      { time: "07:30 PM", title: "Goddess Durga Aarti", description: "Solemn opening prayer and lamp lighting." },
      { time: "08:15 PM", title: "Traditional Raas & Garba Round 1", description: "Slow to medium tempo folk dance." },
      { time: "09:45 PM", title: "Dandiya Fusion Round 2", description: "High-energy stick dance accompanied by live percussion." },
      { time: "11:15 PM", title: "Daily Best Dress & Dancing Awards", description: "Recognition of top traditional dancers." },
    ],
    organizerName: "Cultural Cell - Shree Prathishthan",
    organizerPhone: "+91 98765 43212",
    organizerEmail: "navratri@shreepratishthan.org",
  },

  {
    id: "health-medical-camp",
    title: "Free Health Checkup & Blood Donation Camp",
    tagline: "Saving Lives Through Healthcare Access and Donor Solidarity",
    category: "health",
    categoryLabel: "Healthcare Social Work",
    status: "upcoming",
    date: "Aug 30, 2026",
    time: "08:00 AM – 04:00 PM",
    location: "Shree Prathishthan Hall, Swargate, Pune",
    mapUrl: "https://maps.google.com/?q=Pune+Maharashtra",
    mainImage: "/volunteer_medical.png",
    galleryImages: [
      "/volunteer_medical.png",
      "/community_assembly.png",
      "/volunteer_coordinator.png",
    ],
    description:
      "A comprehensive medical initiative providing free diagnostic health screenings, eye checkups, blood pressure & sugar tests, free medicine distribution, and a mega blood donation drive.",
    metrics: [
      { label: "Blood Units Collected", value: "500+ Units" },
      { label: "Patients Examined", value: "1,200+" },
      { label: "Doctor Specialists", value: "25 Physicians" },
      { label: "Free Prescription Kits", value: "800 Kits" },
    ],
    organizedDetails: [
      {
        heading: "Hospital Collaborations & Sterile Medical Setup",
        content:
          "Organized in partnership with leading government blood banks and private hospitals. Sterile air-conditioned donor beds, single-use needles, and certified phlebotomists ensure medical perfection.",
      },
      {
        heading: "Comprehensive Screening Counter Workflow",
        content:
          "Token-based registration system guides visitors through blood testing, ECG, eye refraction tests, dental checkups, and doctor consultations with zero waiting hassle.",
      },
    ],
    agenda: [
      { time: "08:00 AM", title: "Camp Inauguration & Doctor Briefing", description: "Sterilization check and volunteer allocation." },
      { time: "08:30 AM", title: "Donor Registration & Screening Starts", description: "Hemoglobin test and donor eligibility check." },
      { time: "01:00 PM", title: "Donor Refreshment & Nutrition Drive", description: "Juice, fruit, and certificate distribution to donors." },
      { time: "04:00 PM", title: "Blood Bag Transport to Government Bank", description: "Cold-chain blood transportation to regional hospitals." },
    ],
    organizerName: "Medical Seva Wing - Shree Prathishthan",
    organizerPhone: "+91 98765 43213",
    organizerEmail: "medical@shreepratishthan.org",
  },

  {
    id: "tree-plantation-drive",
    title: "Mega Tree Plantation & Eco-Drive",
    tagline: "Nurturing 2,500 Native Trees for a Greener Tomorrow",
    category: "eco",
    categoryLabel: "Ecological Social Work",
    status: "upcoming",
    date: "Sep 05, 2026",
    time: "07:00 AM – 11:00 AM",
    location: "Tekadi Bio-Reserve & Hill Slopes, Pune",
    mapUrl: "https://maps.google.com/?q=Pune+Maharashtra",
    mainImage: "/volunteer_eco.png",
    galleryImages: [
      "/volunteer_eco.png",
      "/community_assembly.png",
      "/about_showcase.png",
    ],
    description:
      "A large-scale environmental restoration campaign planting indigenous trees (Neem, Banyan, Peepal, Gulmohar) equipped with geo-tagging and a 3-year survival care agreement.",
    metrics: [
      { label: "Saplings Planted", value: "2,500 Saplings" },
      { label: "Volunteer Eco-Warriors", value: "350+" },
      { label: "Survival Rate Tracked", value: "92%" },
      { label: "Green Cover Added", value: "5 Acres" },
    ],
    organizedDetails: [
      {
        heading: "Soil Analysis & Native Species Selection",
        content:
          "Botanical experts pre-surveyed the Tekadi hill slopes to dig 2,500 pits, mix organic compost, and select resilient indigenous saplings requiring minimal artificial watering after monsoon.",
      },
      {
        heading: "Post-Plantation 3-Year Maintenance Pledge",
        content:
          "Unlike standard drives, Shree Prathishthan assigns volunteer tree guardians and drip irrigation maintenance teams to water and weed the saplings every weekend for 3 years.",
      },
    ],
    agenda: [
      { time: "07:00 AM", title: "Assembly at Tekadi Foothills", description: "Distribution of saplings, gardening tools, and gloves." },
      { time: "07:30 AM", title: "Plantation Guidance & Pit Allocation", description: "Demonstration of proper root planting technique." },
      { time: "09:30 AM", title: "Drip Irrigation Installation", description: "Connecting rainwater storage pipes to sapling rows." },
      { time: "10:30 AM", title: "Tree Guardian Adoption Sign-Up", description: "Volunteers tag saplings with unique adoption IDs." },
    ],
    organizerName: "Green Earth Cell - Shree Prathishthan",
    organizerPhone: "+91 98765 43214",
    organizerEmail: "eco@shreepratishthan.org",
  },

  {
    id: "shiv-jayanti-rally",
    title: "Shiv Jayanti Heritage Rally & Procession",
    tagline: "Honoring Chhatrapati Shivaji Maharaj's Legacy of Valour",
    category: "cultural",
    categoryLabel: "Heritage & Cultural",
    status: "completed",
    date: "Feb 19, 2026",
    time: "08:00 AM – 02:00 PM",
    location: "Historic Fort Gate to City Center, Pune",
    mapUrl: "https://maps.google.com/?q=Pune+Maharashtra",
    mainImage: "/gallery_shiv_jayanti_rally.png",
    galleryImages: [
      "/gallery_shiv_jayanti_rally.png",
      "/gallery_dhol_tasha_camps.png",
      "/community_assembly.png",
    ],
    description:
      "A grand historic rally featuring traditional saffron flags, martial arts demonstrations (Mardani Khel), horse contingents, and rhythmic Dhol Tasha performances.",
    metrics: [
      { label: "Rally Participants", value: "15,000+" },
      { label: "Dhol Tasha Players", value: "300 Troupe Members" },
      { label: "Horse Contingents", value: "25 Horses" },
      { label: "Cleanliness Marshals", value: "50 Zero-Waste Volunteers" },
    ],
    organizedDetails: [
      {
        heading: "Route Mapping & Zero-Waste Cleanliness Drive",
        content:
          "Coordinated with city traffic police for seamless route diversion. A dedicated green volunteer team followed behind the procession to collect all flower petals and waste, leaving the road spotless.",
      },
    ],
    agenda: [
      { time: "08:00 AM", title: "Statue Wreath Laying Ceremony", description: "Traditional tribute to Chhatrapati Shivaji Maharaj." },
      { time: "09:00 AM", title: "Procession Flag-Off", description: "Dhol Tasha beat salute and flag hoisting." },
      { time: "11:30 AM", title: "Mardani Khel Martial Arts Show", description: "Demonstration of traditional swordplay and archery." },
      { time: "01:30 PM", title: "Cleanliness Drive & Concluding Ceremony", description: "Zero-waste sweep of the rally route." },
    ],
    organizerName: "Heritage Cell - Shree Prathishthan",
    organizerPhone: "+91 98765 43215",
    organizerEmail: "heritage@shreepratishthan.org",
  },

  {
    id: "diwali-charity-relief",
    title: "Diwali Anand Food & Clothes Relief Drive",
    tagline: "Spreading Warmth, Sweets, and New Clothing to Rural Families",
    category: "charity",
    categoryLabel: "Charity & Social Relief",
    status: "completed",
    date: "Nov 01, 2025",
    time: "09:00 AM – 05:00 PM",
    location: "Rural Tribal Hamlets, Bhor & Velhe Taluka",
    mapUrl: "https://maps.google.com/?q=Pune+Maharashtra",
    mainImage: "/volunteer_disaster.png",
    galleryImages: [
      "/volunteer_disaster.png",
      "/portrait_volunteer.png",
      "/community_assembly.png",
    ],
    description:
      "A festive outreach initiative distributing new festive clothes, ration kits, Faral sweet boxes, and educational stationery to underprivileged rural families and orphanages.",
    metrics: [
      { label: "Families Supported", value: "1,500 Families" },
      { label: "New Clothes Kits", value: "3,000 Outfits" },
      { label: "Faral Sweet Boxes", value: "1,500 Boxes" },
      { label: "Distribution Vans", value: "8 Vehicles" },
    ],
    organizedDetails: [
      {
        heading: "Door-to-Door Need Assessment & Quality Control",
        content:
          "Volunteers pre-surveyed 12 remote hamlets to compile exact family sizes and clothing requirements. All donated clothes were brand new or freshly laundered and categorized by age.",
      },
    ],
    agenda: [
      { time: "09:00 AM", title: "Relief Van Flag-Off", description: "Dispatch of 8 distribution vehicles from Mandal office." },
      { time: "11:00 AM", title: "Hamlet Distribution Phase 1", description: "Handing out clothes and Faral sweet boxes to children." },
      { time: "02:00 PM", title: "Ration Kit Handover", description: "Distribution of monthly grain and oil kits to senior citizens." },
      { time: "05:00 PM", title: "Volunteer Debrief", description: "Completion check and community feedback collection." },
    ],
    organizerName: "Charity & Relief Cell - Shree Prathishthan",
    organizerPhone: "+91 98765 43216",
    organizerEmail: "charity@shreepratishthan.org",
  },

  {
    id: "dhol-tasha-workshop",
    title: "Dhol Tasha Pathak Training & Music Workshop",
    tagline: "Preserving Maharashtra's Traditional Folk Percussion Arts",
    category: "cultural",
    categoryLabel: "Folk Music & Youth Work",
    status: "completed",
    date: "Jul 10, 2026",
    time: "05:00 PM – 08:30 PM",
    location: "Pratishthan Cultural Complex, Pune",
    mapUrl: "https://maps.google.com/?q=Pune+Maharashtra",
    mainImage: "/gallery_dhol_tasha_camps.png",
    galleryImages: [
      "/gallery_dhol_tasha_camps.png",
      "/hero_ganesh.png",
      "/community_assembly.png",
    ],
    description:
      "A dedicated 30-day intensive music camp teaching youth the complex rhythm cycles (Taal & Legim) of Dhol Tasha percussion under veteran master drummers.",
    metrics: [
      { label: "Youth Trainees", value: "150 Players" },
      { label: "Master Tutors", value: "8 Veteran Drummers" },
      { label: "Instruments Provided", value: "80 Dhols & Tashas" },
      { label: "Public Concerts", value: "3 Grand Recitals" },
    ],
    organizedDetails: [
      {
        heading: "Traditional Rhythmic Discipline & Ear Safety",
        content:
          "Trainees were provided custom noise-attenuation earplugs, wrist support bands, and ergonomic instrument harnesses to master heavy drum playing safely.",
      },
    ],
    agenda: [
      { time: "05:00 PM", title: "Rhythm Warm-Up & Hand Technique", description: "Practicing basic Taal counting and stick coordination." },
      { time: "06:30 PM", title: "Ensemble Sync & Synchronized Formations", description: "Group drumming in circular marching formations." },
      { time: "08:00 PM", title: "Tasha Solo Variations & Finale", description: "High-tempo climax percussion recitals." },
    ],
    organizerName: "Dhol Tasha Troupe - Shree Prathishthan",
    organizerPhone: "+91 98765 43217",
    organizerEmail: "dholtasha@shreepratishthan.org",
  },
];

export function getEventById(id: string): EventItem | undefined {
  return ALL_EVENTS.find((e) => e.id === id);
}
