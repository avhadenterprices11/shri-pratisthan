export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  src: string;
  metric?: string;
  description: string;
  details: string;
  type: "memory" | "photo";
}

export const FEATURED_MEMORIES: GalleryItem[] = [
  {
    id: "ganeshotsav-processions",
    title: "Ganeshotsav Shivaji Park Processions",
    category: "Festival",
    date: "September 2024",
    src: "/gallery_ganeshotsav_aarthi.png",
    metric: "Dhol Tasha Parade",
    description: "Our grand Ganeshotsav street procession celebrating unity, devotion, and traditional music.",
    details: "The annual Ganeshotsav celebration is one of our organization's signature events. The Shivaji Park procession featured a massive gathering of local communities, traditional Dhol Tasha drummers playing in synchronization, and beautifully decorated floats. Our volunteer teams coordinated safety corridors, distributed water, and worked closely with local authorities to ensure a peaceful, clean, and safe celebration for tens of thousands of devotees.",
    type: "memory"
  },
  {
    id: "rural-health-clinic",
    title: "First Rural Health Clinic Launch",
    category: "Welfare",
    date: "May 2023",
    src: "/volunteer_medical.png",
    metric: "150+ Patients Guided",
    description: "Successfully establishing our first permanent diagnostics consulting desk and clinic in rural regions.",
    details: "Designed to bridge the gap in rural healthcare access, our first Rural Health Clinic launched in May 2023 with modern diagnostic equipment. Our consulting desk guides local villagers through preventative health assessments, diagnostic tests, and connects them with expert medical advice. With over 150 patients guided on day one, the clinic continues to run weekly check-ups and distribute critical medicines to underprivileged families.",
    type: "memory"
  },
  {
    id: "dahi-handi-pyramids",
    title: "Dahi Handi Festive Pyramid Team",
    category: "Festival",
    date: "August 2024",
    src: "/gallery_dahi_handi_pyramids.png",
    metric: "Festive Pyramids",
    description: "Celebrating Gokulashtami with safe multi-tier human pyramids and local coordination.",
    details: "Our Dahi Handi team celebrated Krishna Janmashtami by forming massive, highly coordinated human pyramids in Bhandup. Prioritizing safety, our organization sponsored safety gear, protective mats, and insurance for all participants. The event serves as a symbol of unity, trust, and strength, bringing together youth from all neighborhoods to build community bonds.",
    type: "memory"
  },
  {
    id: "navratri-garba-utsav",
    title: "Navratri Garba Utsav",
    category: "Festival",
    date: "October 2024",
    src: "/gallery_navratri_garba.png",
    metric: "Garba & Dandiya",
    description: "A lively, colorful Navratri night of traditional dance, community bonding, and cultural harmony.",
    details: "The Navratri Garba Utsav organized by Shri Pratisthan brought together community members of all ages for an evening of dance, worship, and vibrant traditional attire. Over a thousand participants danced to traditional Gujarati and Marathi folk rhythms, reinforcing cultural preservation and mutual respect. The event concluded with an arati dedicated to community welfare and peace.",
    type: "memory"
  }
];

export const PHOTO_ITEMS: GalleryItem[] = [
  {
    id: "ganeshotsav-arati",
    title: "Ganeshotsav Evening Arati",
    category: "festival",
    date: "September 2024",
    src: "/gallery_ganeshotsav_aarthi.png",
    description: "Spiritual evening prayer ceremonies during the autumn Ganeshotsav festival.",
    details: "Every evening during the 10-day Ganeshotsav festival, community members gather for the twilight prayers (arati). The event is characterized by oil lamps, incense, traditional hymns, and musical accompaniment. Our volunteer teams assist in organizing the space, ensuring crowd control, and making sure that prasadam is prepared and distributed in a clean, orderly manner.",
    type: "photo"
  },
  {
    id: "diagnostics-camp",
    title: "Village Diagnostics Camp",
    category: "healthcare",
    date: "December 2023",
    src: "/volunteer_medical.png",
    description: "Mobile medical checkups and basic diagnostics in remote community villages.",
    details: "The Village Diagnostics Camp is a mobile health drive that travels to remote, underserved hamlets. Our team, along with qualified doctors, conducts primary health screenings, blood sugar and pressure testing, and distributes free prescription eyewear. By diagnosing common ailments early, we help reduce the long-term healthcare burden on these families.",
    type: "photo"
  },
  {
    id: "supplies-distribution",
    title: "Educational Supplies Distribution",
    category: "education",
    date: "June 2024",
    src: "/volunteer_coordinator.png",
    description: "Supplying notebooks, stationery, and backpacks to local village primary school kids.",
    details: "Ahead of the academic year, Shri Pratisthan organizes school supply drives to support primary school children in rural areas. We distribute quality backpacks, notebooks, stationery sets, and mathematical kits. This initiative supports families who struggle with educational costs and motivates young students to attend school regularly.",
    type: "photo"
  },
  {
    id: "dhol-tasha",
    title: "Dhol Tasha Parade",
    category: "festival",
    date: "September 2024",
    src: "/gallery_dhol_tasha_camps.png",
    description: "Traditional drum ensembles performing during festive celebrations.",
    details: "The rhythmic beats of the Dhol Tasha ensemble are the heartbeat of Maharashtra's festivals. Our youth troupe trains for months to perform complex rhythms in public celebrations. Playing these traditional instruments fosters discipline, teamwork, and cultural pride among the local youth, giving them a constructive outlet for their energy.",
    type: "photo"
  },
  {
    id: "eco-preservation",
    title: "Eco Preservation Drive",
    category: "education",
    date: "July 2024",
    src: "/volunteer_eco.png",
    description: "Hillside afforestation and soil conservation initiatives.",
    details: "To combat urban erosion and improve air quality, our Eco Preservation Drive leads regular tree-planting campaigns on the hills surrounding the city. Volunteers plant indigenous saplings, build natural irrigation run-offs, and clean plastic debris from the trails. We also host educational workshops for kids to learn about local biodiversity.",
    type: "photo"
  },
  {
    id: "navratri-celebration",
    title: "Navratri Garba Celebration",
    category: "festival",
    date: "October 2024",
    src: "/gallery_navratri_garba.png",
    description: "Nine nights of devotional folk dances, music, and community integration.",
    details: "Navratri is celebrated with high energy and devotion. Our community grounds host public Garba and Dandiya nights that emphasize local integration. We provide a safe, family-friendly space for neighbors to connect, share traditional food, and celebrate cultural inheritance together.",
    type: "photo"
  },
  {
    id: "safety-training",
    title: "Civic Safety Training",
    category: "healthcare",
    date: "November 2023",
    src: "/volunteer_safety.png",
    description: "Empowering residents with basic life support (BLS), CPR, and first aid skills.",
    details: "Conducted by certified medical practitioners, our Civic Safety workshops teach emergency response skills. Residents learn to perform CPR, handle choke emergencies, and apply basic wound dressings. Empowering citizens with these life-saving skills transforms bystanders into active community responders during disasters.",
    type: "photo"
  },
  {
    id: "shiv-jayanti",
    title: "Shiv Jayanti Rally",
    category: "festival",
    date: "February 2024",
    src: "/gallery_shiv_jayanti_rally.png",
    description: "Grand historical procession honoring Chhatrapati Shivaji Maharaj.",
    details: "The birth anniversary of Chhatrapati Shivaji Maharaj is marked by a majestic historical procession. Featuring traditional costumes, martial arts demonstrations, and history recitals, the rally serves to educate younger generations about the ideals of good governance, courage, and social equality championed by the great leader.",
    type: "photo"
  },
  {
    id: "disaster-relief",
    title: "Disaster Relief Operations",
    category: "healthcare",
    date: "August 2024",
    src: "/volunteer_disaster.png",
    description: "Responding to monsoon flooding with emergency packages and support.",
    details: "When monsoon flooding impacted low-lying regions in Bhandup, Shri Pratisthan's emergency response unit was deployed. Our volunteers packed and distributed survival packages containing clean drinking water, dry rations, sanitary items, and basic medicines, working around the clock to support families displaced by rising water levels.",
    type: "photo"
  }
];

export function getGalleryItem(id: string): GalleryItem | undefined {
  const allItems = [...FEATURED_MEMORIES, ...PHOTO_ITEMS];
  return allItems.find(item => item.id === id);
}
