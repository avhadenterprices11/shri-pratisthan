import { EventItem } from "./events-data";
import { Language } from "@/context/LanguageContext";

export interface LocalizedEventFields {
  title: string;
  tagline?: string;
  description: string;
  categoryLabel: string;
  date: string;
  time?: string;
  registrationCloseDate?: string;
  location: string;
  venueName?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  eventMode?: string;
  checkInMode?: string;
  emergencyContactName?: string;
  metricLabel?: string;
  metricValue?: string;
  allMetrics?: { label: string; value: string }[];
  accessibilityInfo?: string[];
  organizedDetails?: { heading: string; content: string }[];
  agenda?: { time: string; title: string; description: string }[];
  partners?: { name: string; role?: string }[];
  sponsors?: { name: string; tier: "Title Sponsor" | "Gold Sponsor" | "Powered By" | "Associate Sponsor" }[];
}

export const EVENT_LOCALIZATIONS: Record<
  string,
  {
    mr: LocalizedEventFields;
    hi: LocalizedEventFields;
    en: LocalizedEventFields;
  }
> = {
  "ganesh-utsav-2026": {
    en: {
      title: "Shree Ganeshotsav Grand Celebration 2026",
      tagline: "10 Days of Devotion, Cultural Unity, and Grand Maha Aarti",
      description:
        "Shree Pratisthan's signature annual festival uniting thousands of devotees across Indira Nagar and Nashik in traditional celebration, eco-friendly clay idol immersion, daily grand aarti, cultural plays, and hygienic Maha Prasad distribution.",
      categoryLabel: "Cultural Festival",
      date: "Aug 27 – Sep 06, 2026",
      time: "6:00 AM – 11:00 PM Daily",
      registrationCloseDate: "Sep 06, 2026 at 06:00 PM",
      location: "Shree Pratishtan Mandal, Indira Nagar Ground, Nashik",
      venueName: "Shree Pratisthan Pandal, Indira Nagar",
      addressLine1: "Main Grounds, Opposite Joggers Park, Indira Nagar",
      addressLine2: "Near Rane Nagar Link Road",
      city: "Nashik",
      state: "Maharashtra",
      country: "India",
      eventMode: "In-Person Event",
      checkInMode: "QR Code Scan",
      emergencyContactName: "Adv. Shyam Dharmaraj Badode",
      metricLabel: "Expected Devotees",
      metricValue: "50,000+",
      allMetrics: [
        { label: "Expected Devotees", value: "50,000+" },
        { label: "Volunteer Marshals", value: "100+ Organizers" },
        { label: "Cultural Programs", value: "10 Days Drama & Music" },
        { label: "Prasad Distributed", value: "25,000 Meals" },
      ],
      accessibilityInfo: [
        "Dedicated Wheelchair Ramps at North & South Entrances",
        "Reserved Senior Citizen Seating Row for Evening Maha Aarti",
        "24/7 On-site First Aid Booth & Ambulance Staging Area",
        "Free Purified Cold Drinking Water Stations throughout the arena",
        "Braille & Signage Wayfinding with Volunteer Marshals",
      ],
      organizedDetails: [
        {
          heading: "Community Planning & Municipal Approvals",
          content:
            "Full planning coordinated with Nashik Municipal Corporation, police clearances, fire safety audits, and structural inspections of the central Pandal with backup generators.",
        },
        {
          heading: "Eco-Friendly Shadu Clay Idol & Green Visarjan",
          content:
            "Continuing our environmental pledge, the central Bappa idol is sculpted using 100% natural eco-friendly clay (Shadu Mati) with organic colors, supported by artificial immersion tanks.",
        },
        {
          heading: "Crowd Safety, CCTV Surveillance & Medical Booths",
          content:
            "24/7 CCTV surveillance connected to our Indira Nagar coordination desk ensures safety for senior citizens and families alongside first-aid stations staffed by doctors.",
        },
        {
          heading: "Cultural Stages & Daily Maha Prasad Management",
          content:
            "Evenings feature traditional Maharashtrian devotional bhajans, Dhol Tasha rhythm, and youth performances with nutritious Maha Prasad served daily.",
        },
      ],
      agenda: [
        {
          time: "06:00 AM",
          title: "Prabhat Aarti & Morning Prayers",
          description: "Traditional morning prayers to commence the festival day.",
        },
        {
          time: "11:00 AM",
          title: "Eco-Workshop & Children Activity",
          description: "Interactive clay modeling and cultural sessions for local school students.",
        },
        {
          time: "07:30 PM",
          title: "Grand Evening Maha Aarti",
          description: "Resonant 108-lamp aarti attended by community elders and youth.",
        },
        {
          time: "09:00 PM",
          title: "Cultural Drama & Dhol Tasha Recital",
          description: "Live stage performances celebrating Maharashtra's rich legacy.",
        },
      ],
      partners: [
        { name: "Nashik Municipal Corporation", role: "Civic & Safety Partner" },
        { name: "Indira Nagar Welfare Trust", role: "Community Partner" },
        { name: "Nashik Civil Hospital", role: "Medical Support Partner" },
      ],
      sponsors: [
        { name: "Badode Associates & Legal Counsel", tier: "Title Sponsor" },
        { name: "Nashik City Infra Developers", tier: "Gold Sponsor" },
        { name: "Maharashtra Gramin Bank", tier: "Powered By" },
      ],
    },
    mr: {
      title: "श्री गणेशोत्सव महासोहळा २०२६",
      tagline: "१० दिवसांचा भक्तिमय सोहळा, सांस्कृतिक एकता व भव्य महाआरती",
      description:
        "इंदिरा नगर व नाशिक परिसरातील भाविकांना एकत्र आणणारा श्री प्रतिष्ठानचा महासोहळा. पर्यावरणपूरक शाडू मातीची मूर्ती, दररोज भव्य महाआरती, सांस्कृतिक कार्यक्रम व महाप्रसाद वितरण.",
      categoryLabel: "सांस्कृतिक उत्सव",
      date: "२७ ऑगस्ट – ०६ सप्टेंबर २०२६",
      time: "दररोज सकाळी ०६:०० ते रात्री ११:००",
      registrationCloseDate: "०६ सप्टेंबर २०२६, संध्याकाळी ०६:००",
      location: "श्री प्रतिष्ठान मंडळ, इंदिरा नगर मैदान, नाशिक",
      venueName: "श्री प्रतिष्ठान मध्यवर्ती मंडप, इंदिरा नगर",
      addressLine1: "मुख्य मैदान, जॉगर्स पार्क समोर, इंदिरा नगर",
      addressLine2: "राणे नगर लिंक रोड जवळ",
      city: "नाशिक",
      state: "महाराष्ट्र",
      country: "भारत",
      eventMode: "प्रत्यक्ष उपस्थिती सोहळा",
      checkInMode: "क्यूआर कोड स्कॅन",
      emergencyContactName: "ॲड. श्याम धर्मराज बदोडे",
      metricLabel: "अपेक्षित भाविक",
      metricValue: "५०,०००+",
      allMetrics: [
        { label: "अपेक्षित भाविक", value: "५०,०००+" },
        { label: "स्वयंसेवक दल", value: "१००+ कार्यकर्ते" },
        { label: "सांस्कृतिक सोहळा", value: "१० दिवस नाट्य व संगीत" },
        { label: "महाप्रसाद वितरण", value: "२५,००० भोजनावळी" },
      ],
      accessibilityInfo: [
        "उत्तर व दक्षिण प्रवेशद्वारावर विशेष व्हीलचेअर रॅम्प व्यवस्था",
        "संध्याकाळच्या महाआरतीसाठी ज्येष्ठ नागरिकांसाठी राखीव बैठक व्यवस्था",
        "२४/७ तत्पर प्रथमोपचार केंद्र आणि रुग्णवाहिका सज्जता",
        "परिसरात सर्वत्र मोफत शुद्ध व थंड पिण्याच्या पाण्याची सोय",
        "मार्गदर्शनासाठी स्वयंसेवक व स्पष्ट दिशादर्शक फलक",
      ],
      organizedDetails: [
        {
          heading: "प्रशासकीय नियोजन व मनपा परवानग्या",
          content:
            "नाशिक महानगरपालिका, पोलीस प्रशासन, अग्निशामक दल आणि सुरक्षा परीक्षण पूर्ण करून मध्यवर्ती मंडप व जनरेटर बॅकअपसह संपूर्ण सोहळ्याचे नियोजन.",
        },
        {
          heading: "पर्यावरणपूरक शाडू माती मूर्ती व विसर्जन",
          content:
            "पर्यावरण संवर्धनाचा वसा जपत १००% नैसर्गिक शाडू मातीची बाप्पांची मूर्ती आणि कृत्रिम विसर्जन हौदांची सुसज्ज व्यवस्था.",
        },
        {
          heading: "गर्दी नियंत्रण, सीसीटीव्ही व वैद्यकीय मदत",
          content:
            "इंदिरा नगर नियंत्रण कक्षाशी जोडलेली २४/७ सीसीटीव्ही यंत्रणा, कुटुंब व ज्येष्ठ नागरिकांची सुरक्षा आणि डॉक्टरांसह सुसज्ज प्रथमोपचार केंद्र.",
        },
        {
          heading: "सांस्कृतिक मंच व दैनंदिन महाप्रसाद व्यवस्था",
          content:
            "दररोज संध्याकाळी पारंपरिक भजने, ढोल-ताशा वादन, बालनाट्य आणि हजारो भाविकांसाठी स्वच्छतापूर्ण महाप्रसाद वितरण.",
        },
      ],
      agenda: [
        {
          time: "सकाळी ०६:००",
          title: "प्रभात आरती व मंगल प्रार्थना",
          description: "उत्सव दिनाची सुरुवात करणारी मंगलमय प्रभात आरती.",
        },
        {
          time: "सकाळी ११:००",
          title: "पर्यावरण कार्यशाळा व बाल उपक्रम",
          description: "शाळकरी विद्यार्थ्यांसाठी शाडू मातीकाम व सांस्कृतिक संस्कार सत्र.",
        },
        {
          time: "संध्याकाळी ०७:३०",
          title: "भव्य सायंकालीन महाआरती",
          description: "१०८ दिव्यांची दीपारती आणि हजारो भाविकांचा सहभाग.",
        },
        {
          time: "रात्री ०९:००",
          title: "सांस्कृतिक नाटक व ढोल-ताशा वादन",
          description: "महाराष्ट्राच्या वैभवशाली परंपरेचे दर्शन घडवणारे मंचीय सादरीकरण.",
        },
      ],
      partners: [
        { name: "नाशिक महानगरपालिका", role: "प्रशासकीय व सुरक्षा सहकार्य" },
        { name: "इंदिरा नगर रहिवासी कल्याण ट्रस्ट", role: "स्थानिक सहकार्य" },
        { name: "नाशिक जिल्हा रुग्णालय", role: "वैद्यकीय मदत केंद्र" },
      ],
      sponsors: [
        { name: "बदोडे असोसिएट्स अँड लीगल कौन्सिल", tier: "Title Sponsor" },
        { name: "नाशिक सिटी इन्फ्रा डेव्हलपर्स", tier: "Gold Sponsor" },
        { name: "महाराष्ट्र ग्रामीण बँक", tier: "Powered By" },
      ],
    },
    hi: {
      title: "श्री गणेशोत्सव भव्य महोत्सव 2026",
      tagline: "10 दिवसीय भक्तिमय उत्सव, सांस्कृतिक एकता एवं भव्य महाआरती",
      description:
        "इंदिरा नगर एवं नाशिक के श्रद्धालुओं को जोड़ने वाला श्री प्रतिष्ठान का प्रमुख वार्षिकोत्सव। पर्यावरण-अनुकूल मिट्टी की प्रतिमा, दैनिक महाआरती, सांस्कृतिक मंचन एवं महाप्रसाद वितरण।",
      categoryLabel: "सांस्कृतिक महोत्सव",
      date: "27 अगस्त – 06 सितंबर 2026",
      time: "प्रतिदिन प्रातः 06:00 से रात्रि 11:00",
      registrationCloseDate: "06 सितंबर 2026, सायं 06:00",
      location: "श्री प्रतिष्ठान मंडल, इंदिरा नगर मैदान, नाशिक",
      venueName: "श्री प्रतिष्ठान केंद्रीय पंडाल, इंदिरा नगर",
      addressLine1: "मुख्य मैदान, जॉगर्स पार्क के सामने, इंदिरा नगर",
      addressLine2: "राणे नगर लिंक रोड के पास",
      city: "नाशिक",
      state: "महाराष्ट्र",
      country: "भारत",
      eventMode: "प्रत्यक्ष उपस्थिति कार्यक्रम",
      checkInMode: "क्यूआर कोड स्कैन",
      emergencyContactName: "अधिवक्ता श्याम धर्मराज बदोडे",
      metricLabel: "अनुमानित श्रद्धालु",
      metricValue: "50,000+",
      allMetrics: [
        { label: "अनुमानित श्रद्धालु", value: "50,000+" },
        { label: "स्वयंसेवक दल", value: "100+ कार्यकर्ता" },
        { label: "सांस्कृतिक मंचन", value: "10 दिन नाट्य एवं संगीत" },
        { label: "महाप्रसाद वितरण", value: "25,000 भोजन" },
      ],
      accessibilityInfo: [
        "उत्तर एवं दक्षिण प्रवेश द्वार पर व्हीलचेयर रैंप सुविधा",
        "संध्या महाआरती के लिए वरिष्ठ नागरिकों हेतु आरक्षित बैठक व्यवस्था",
        "24/7 प्राथमिक चिकित्सा केंद्र एवं एम्बुलेंस तत्परता",
        "परिसर में निःशुल्क स्वच्छ एवं शीतल पेयजल की समुचित व्यवस्था",
        "मार्गदर्शन हेतु स्वयंसेवक एवं स्पष्ट सूचना पट्ट",
      ],
      organizedDetails: [
        {
          heading: "प्रशासनिक योजना एवं आवश्यक स्वीकृतियां",
          content:
            "नाशिक नगर निगम, पुलिस प्रशासन, अग्निशमन दल एवं सुरक्षा निरीक्षण के साथ केंद्रीय पंडाल एवं जनरेटर बैकअप की सुदृढ़ व्यवस्था।",
        },
        {
          heading: "पर्यावरण-अनुकूल शाडू मिट्टी प्रतिमा एवं विसर्जन",
          content:
            "पर्यावरण संरक्षण के संकल्प के साथ 100% प्राकृतिक शाडू मिट्टी की प्रतिमा एवं कृत्रिम विसर्जन कुंडों की समुचित व्यवस्था।",
        },
        {
          heading: "भीड़ प्रबंधन, सीसीटीवी निगरानी एवं स्वास्थ्य सेवा",
          content:
            "इंदिरा नगर नियंत्रण कक्ष से जुड़ी 24/7 सीसीटीवी निगरानी, वरिष्ठ नागरिकों की सुरक्षा एवं चिकित्सकों से सुसज्ज प्राथमिक चिकित्सा केंद्र।",
        },
        {
          heading: "सांस्कृतिक मंच एवं दैनिक महाप्रसाद प्रबंधन",
          content:
            "प्रतिदिन संध्या पारंपरिक भजन, ढोल-ताशा वादन, सांस्कृतिक मंचन एवं श्रद्धालुओं के लिए स्वच्छ महाप्रसाद वितरण।",
        },
      ],
      agenda: [
        {
          time: "प्रातः 06:00",
          title: "प्रभात आरती एवं मंगल प्रार्थना",
          description: "उत्सव दिवस का शुभारंभ करने वाली पावन प्रभात आरती।",
        },
        {
          time: "प्रातः 11:00",
          title: "पर्यावरण कार्यशाला एवं बाल गतिविधि",
          description: "स्कूली विद्यार्थियों के लिए मिट्टी की कला एवं सांस्कृतिक सत्र।",
        },
        {
          time: "सायं 07:30",
          title: "भव्य संध्या महाआरती",
          description: "108 दीपों की दिव्य महाआरती एवं श्रद्धालुओं का सामूहिक सहभाग।",
        },
        {
          time: "रात्रि 09:00",
          title: "सांस्कृतिक नाटक एवं ढोल-ताशा वादन",
          description: "महाराष्ट्र की समृद्ध संस्कृति को प्रदर्शित करने वाली मंचीय प्रस्तुतियां।",
        },
      ],
      partners: [
        { name: "नाशिक नगर निगम", role: "प्रशासनिक एवं सुरक्षा सहयोगी" },
        { name: "इंदिरा नगर जनकल्याण ट्रस्ट", role: "स्थानीय सहयोगी" },
        { name: "नाशिक जिला अस्पताल", role: "चिकित्सा सेवा सहयोगी" },
      ],
      sponsors: [
        { name: "बदोडे एसोसिएट्स एंड लीगल काउंसिल", tier: "Title Sponsor" },
        { name: "नाशिक सिटी इन्फ्रा डेवलपर्स", tier: "Gold Sponsor" },
        { name: "महाराष्ट्र ग्रामीण बैंक", tier: "Powered By" },
      ],
    },
  },
  "gudipadwa-swagat-yatra-2026": {
    en: {
      title: "Gudipadwa Grand Welcome Procession 2026",
      tagline: "Grand Welcoming of the Marathi New Year With Cultural Splendor",
      description:
        "Traditional Marathi New Year grand procession with traditional Dhol-Tasha recitals, saffron dhvaj patakas, Lejim troupes, and cultural pageantry celebrating Maharashtra's rich festive legacy.",
      categoryLabel: "Cultural Festival",
      date: "Mar 19, 2026",
      location: "Indira Nagar Main Avenue to Rane Nagar, Nashik",
      metricLabel: "Swagat Yatra Participants",
      metricValue: "15,000+",
    },
    mr: {
      title: "गुढीपाडवा भव्य स्वागत यात्रा २०२६",
      tagline: "पारंपरिक उत्साहात व सांस्कृतिक वैभवात नववर्ष स्वागत",
      description:
        "पारंपरिक मराठी नववर्षाचे स्वागत करणारी भव्य शोभायात्रा. ढोल-ताशा पथके, भगवे ध्वज पताका, लेझीम पथके आणि महाराष्ट्राच्या वैभवशाली संस्कृतीचे दर्शन घडवणारे देखावे.",
      categoryLabel: "सांस्कृतिक उत्सव",
      date: "१९ मार्च २०२६",
      location: "इंदिरा नगर मुख्य रस्ता ते राणे नगर, नाशिक",
      metricLabel: "यात्रा सहभागी नागरिक",
      metricValue: "१५,०००+",
    },
    hi: {
      title: "गुढीपाडवा भव्य शोभायात्रा 2026",
      tagline: "पारंपरिक उल्लास एवं सांस्कृतिक वैभव के साथ नववर्ष स्वागत",
      description:
        "पारंपरिक नववर्ष का स्वागत करने वाली भव्य सांस्कृतिक शोभायात्रा। ढोल-ताशा वादन, भगवा ध्वज, लेजिम दल और महाराष्ट्र की गौरवशाली सांस्कृतिक धरोहर की झांकियां।",
      categoryLabel: "सांस्कृतिक महोत्सव",
      date: "19 मार्च 2026",
      location: "इंदिरा नगर मुख्य मार्ग से राणे नगर, नाशिक",
      metricLabel: "शोभायात्रा प्रतिभागी",
      metricValue: "15,000+",
    },
  },
  "navratri-garba-2026": {
    en: {
      title: "Navratri Festival & Dandiya Nights 2026",
      tagline: "9 Nights of Devotion, Folk Rhythm, and Family Garba",
      description:
        "9 divine nights of traditional Raas-Garba, classical Bhavani Mata Aarti, cultural folk presentations, and safe family celebrations in Indira Nagar.",
      categoryLabel: "Cultural Festival",
      date: "Sep 22 – Oct 02, 2026",
      location: "Indira Nagar Sports Complex, Nashik",
      metricLabel: "Nightly Attendance",
      metricValue: "8,000+",
    },
    mr: {
      title: "नवरात्रौत्सव व दांडिया रास २०२६",
      tagline: "९ रात्रींची अखंड भक्ती, लोककला आणि कौटुंबिक गरबा सोहळा",
      description:
        "९ रात्रींचा अखंड भक्तिमय सोहळा, पारंपारिक रास-गरबा, भवानी मातेची महाआरती, लोककला सादरीकरण आणि सुरक्षित कौटुंबिक उत्सव.",
      categoryLabel: "सांस्कृतिक उत्सव",
      date: "२२ सप्टेंबर – ०२ ऑक्टोबर २०२६",
      location: "इंदिरा नगर क्रीडा संकुल, नाशिक",
      metricLabel: "प्रतिरात्र उपस्थिती",
      metricValue: "८,०००+",
    },
    hi: {
      title: "नवरात्रोत्सव एवं डांडिया नाइट्स 2026",
      tagline: "9 पावन रात्रियों की भक्ति, लोकसंस्कृति और पारिवारिक गरबा",
      description:
        "9 पावन रात्रियों का भक्तिमय डांडिया एवं रास-गरबा उत्सव, माता भवानी की दिव्य महाआरती, पारंपरिक लोकनृत्य और सुरक्षित पारिवारिक वातावरण।",
      categoryLabel: "सांस्कृतिक महोत्सव",
      date: "22 सितंबर – 02 अक्टूबर 2026",
      location: "इंदिरा नगर स्पोर्ट्स कॉम्प्लेक्स, नाशिक",
      metricLabel: "प्रतिदिन उपस्थिति",
      metricValue: "8,000+",
    },
  },
  "shiv-jayanti-2026": {
    en: {
      title: "Chhatrapati Shivaji Maharaj Jayanti 2026",
      tagline: "Saluting the Legacy of Hindavi Swarajya and Youth Inspiration",
      description:
        "Commemorating Chhatrapati Shivaji Maharaj with grand Shiv Charitra recitals, historic shastra exhibition, youth marathi speeches, and inspirational youth rallies.",
      categoryLabel: "Historical & Youth",
      date: "Feb 19, 2026",
      location: "Shivaji Statue Chowk, Indira Nagar, Nashik",
      metricLabel: "Youth Assembly",
      metricValue: "12,000+",
    },
    mr: {
      title: "छत्रपती शिवाजी महाराज जयंती २०२६",
      tagline: "हिंदवी स्वराज्याची प्रेरणा आणि भव्य युवा चेतना सोहळा",
      description:
        "छत्रपती शिवाजी महाराज यांच्या प्रेरणेचा जयघोष, शिवचरित्र व्याख्यान, ऐतिहासिक शस्त्र प्रदर्शन, पोवाडे आणि भव्य युवा प्रेरणा रॅली.",
      categoryLabel: "ऐतिहासिक व युवक",
      date: "१९ फेब्रुवारी २०२६",
      location: "शिवाजी महाराज पुतळा चौक, इंदिरा नगर, नाशिक",
      metricLabel: "युवा सहभाग",
      metricValue: "१२,०००+",
    },
    hi: {
      title: "छत्रपति शिवाजी महाराज जयंती 2026",
      tagline: "हिंदवी स्वराज्य की प्रेरणा एवं विशाल युवा चेतना उत्सव",
      description:
        "छत्रपति शिवाजी महाराज के जीवन आदर्शों पर व्याख्यान, ऐतिहासिक शस्त्र प्रदर्शनी, वीर रस के पोवाडे और विशाल युवा प्रेरणा यात्रा।",
      categoryLabel: "ऐतिहासिक एवं युवा",
      date: "19 फरवरी 2026",
      location: "शिवाजी महाराज प्रतिमा चौक, इंदिरा नगर, नाशिक",
      metricLabel: "युवा सम्मेलन",
      metricValue: "12,000+",
    },
  },
  "dr-ambedkar-jayanti-2026": {
    en: {
      title: "Dr. Babasaheb Ambedkar Jayanti 2026",
      tagline: "Constitution Awareness, Education Kits, and Social Equality",
      description:
        "Celebrating the architect of the Indian Constitution with free educational books distribution, constitutional awareness seminars, and scholarships for meritorious students.",
      categoryLabel: "Social Harmony & Education",
      date: "Apr 14, 2026",
      location: "Pratishtan Seva Bhavan, Indira Nagar, Nashik",
      metricLabel: "Students Benefited",
      metricValue: "1,500+",
    },
    mr: {
      title: "डॉ. बाबासाहेब आंबेडकर जयंती २०२६",
      tagline: "संविधान जागृती, शैक्षणिक मदत आणि सामाजिक समता",
      description:
        "भारतीय संविधानाचे शिल्पकार डॉ. बाबासाहेब आंबेडकर यांच्या जयंतीनिमित्त मोफत शैक्षणिक साहित्य वाटप, संविधान जागृती व्याख्याने व गुणवंत विद्यार्थ्यांचा सत्कार.",
      categoryLabel: "सामाजिक समता व शिक्षण",
      date: "१४ एप्रिल २०२६",
      location: "प्रतिष्ठान सेवा भवन, इंदिरा नगर, नाशिक",
      metricLabel: "लाभार्थी विद्यार्थी",
      metricValue: "१,५००+",
    },
    hi: {
      title: "डॉ. बाबासाहेब आंबेडकर जयंती 2026",
      tagline: "संविधान चेतना, शैक्षणिक सहयोग एवं सामाजिक समरसता",
      description:
        "संविधान निर्माता डॉ. बाबासाहेब आंबेडकर की जयंती पर निःशुल्क अध्ययन सामग्री वितरण, संविधान जागरूकता संगोष्ठी एवं मेधावी छात्रों का अभिनंदन।",
      categoryLabel: "सामाजिक समरसता एवं शिक्षा",
      date: "14 अप्रैल 2026",
      location: "प्रतिष्ठान सेवा भवन, इंदिरा नगर, नाशिक",
      metricLabel: "लाभान्वित विद्यार्थी",
      metricValue: "1,500+",
    },
  },
  "blood-donation-camp-2026": {
    en: {
      title: "Bhavya Blood Donation & Health Camp 2026",
      tagline: "Life-Saving Mission Supporting Nashik Civil Hospital",
      description:
        "Annual mega life-saving voluntary blood donation camp in partnership with Nashik Civil Hospital and certified regional blood banks to save emergency lives.",
      categoryLabel: "Healthcare & Life Drive",
      date: "Aug 30, 2026",
      location: "Indira Nagar Community Hall, Nashik",
      metricLabel: "Target Blood Units",
      metricValue: "250+ Units",
    },
    mr: {
      title: "भव्य रक्तदान व आरोग्य शिबिर २०२६",
      tagline: "नाशिक जिल्हा रुग्णालयासाठी जीवनदायी रक्तसंकलन मोहीम",
      description:
        "नाशिक जिल्हा रुग्णालय व अधिकृत रक्तपेढ्यांच्या सहकार्याने आयोजित भव्य रक्तदान शिबिर, गरजू रुग्णांसाठी जीवनदान देणारा उपक्रम.",
      categoryLabel: "आरोग्य व जीवनदान",
      date: "३० ऑगस्ट २०२६",
      location: "इंदिरा नगर समाज मंदिर, नाशिक",
      metricLabel: "अपेक्षित रक्त पिशव्या",
      metricValue: "२५०+ बाटल्या",
    },
    hi: {
      title: "भव्य रक्तदान एवं स्वास्थ्य शिविर 2026",
      tagline: "नाशिक जिला अस्पताल के लिए जीवन रक्षा रक्तदान अभियान",
      description:
        "नाशिक जिला अस्पताल एवं प्रमाणित रक्तकोशों के सहयोग से आयोजित विशाल रक्तदान शिविर, आपातकालीन जीवन रक्षा के लिए समर्पित।",
      categoryLabel: "स्वास्थ्य एवं जीवनदान",
      date: "30 अगस्त 2026",
      location: "इंदिरा नगर सामुदायिक भवन, नाशिक",
      metricLabel: "लक्षित रक्त इकाइयां",
      metricValue: "250+ यूनिट",
    },
  },
  "yoga-day-health-camp-2026": {
    en: {
      title: "International Yoga Day & Free Health Checkup",
      tagline: "Holistic Wellness, Guided Pranayama, and Preventative Screening",
      description:
        "Community sunrise Yoga and Pranayama sessions guided by certified instructors, combined with free holistic health checkups, diabetes and BP screenings.",
      categoryLabel: "Wellness & Health",
      date: "Jun 21, 2026",
      location: "Indira Nagar Public Sports Ground, Nashik",
      metricLabel: "Yoga Participants",
      metricValue: "2,000+",
    },
    mr: {
      title: "आंतरराष्ट्रीय योग दिन व मोफत आरोग्य तपासणी",
      tagline: "आरोग्य संवर्धन, प्राणायाम सराव आणि मोफत वैद्यकीय तपासणी",
      description:
        "प्रमाणित योगशिक्षकांच्या मार्गदर्शनाखाली सामूहिक योगासने व प्राणायाम सत्र, तसेच मोफत आरोग्य तपासणी, मधुमेह व रक्तदाब चाचणी शिबिर.",
      categoryLabel: "आरोग्य व निरोगी जीवन",
      date: "२१ जून २०२६",
      location: "इंदिरा नगर सार्वजनिक क्रीडांगण, नाशिक",
      metricLabel: "योग शिबिरार्थी",
      metricValue: "२,०००+",
    },
    hi: {
      title: "अंतरराष्ट्रीय योग दिवस एवं निःशुल्क स्वास्थ्य जांच",
      tagline: "आरोग्य साधना, प्राणायाम अभ्यास और निःशुल्क स्वास्थ्य परीक्षण",
      description:
        "प्रमाणित प्रशिक्षकों द्वारा सामूहिक योगासन एवं प्राणायाम अभ्यास, साथ ही निःशुल्क स्वास्थ्य परीक्षण, मधुमेह व रक्तचाप जांच शिविर।",
      categoryLabel: "स्वास्थ्य एवं योग",
      date: "21 जून 2026",
      location: "इंदिरा नगर सार्वजनिक खेल मैदान, नाशिक",
      metricLabel: "योग प्रतिभागी",
      metricValue: "2,000+",
    },
  },
  "cricket-tournament-2026": {
    en: {
      title: "Annual Sports & Cricket Tournament 2026",
      tagline: "Fostering Youth Athletic Talent, Fitness, and Fair Play",
      description:
        "Exciting 7-day multi-tier tennis ball cricket tournament and athletics meet encouraging youth fitness, teamwork, sportsmanship, and local athletic talent.",
      categoryLabel: "Sports & Youth Tournament",
      date: "Dec 18 – Dec 25, 2026",
      location: "Indira Nagar Cricket Arena, Nashik",
      metricLabel: "Participating Teams",
      metricValue: "32 Teams",
    },
    mr: {
      title: "वार्षिक क्रीडा स्पर्धा व क्रिकेट महोत्सव २०२६",
      tagline: "युवा खेळाडूंना प्रोत्साहन, फिटनेस आणि खिलाडूवृत्ती",
      description:
        "युवकांमधील क्रीडागुणांना प्रोत्साहन देणारा ७ दिवसांचा भव्य क्रिकेट महासोहळा व ॲथलेटिक्स स्पर्धा, सांघिक भावना व शिस्त वाढवणारा उपक्रम.",
      categoryLabel: "क्रीडा व युवक स्पर्धा",
      date: "१८ डिसेंबर – २५ डिसेंबर २०२६",
      location: "इंदिरा नगर क्रिकेट मैदान, नाशिक",
      metricLabel: "सहभागी संघ",
      metricValue: "३२ संघ",
    },
    hi: {
      title: "वार्षिक खेलकूद एवं क्रिकेट प्रतियोगिता 2026",
      tagline: "युवा प्रतिभा को मंच, फिटनेस और खेल भावना का उत्सव",
      description:
        "युवाओं में खेल भावना और फिटनेस को प्रोत्साहित करने वाली 7 दिवसीय क्रिकेट प्रतियोगिता एवं एथलेटिक्स मीट।",
      categoryLabel: "खेल एवं युवा प्रतियोगिता",
      date: "18 दिसंबर – 25 दिसंबर 2026",
      location: "इंदिरा नगर क्रिकेट एरिना, नाशिक",
      metricLabel: "प्रतिभागी टीमें",
      metricValue: "32 टीमें",
    },
  },
  "civic-welfare-relief-2026": {
    en: {
      title: "Student Study Kits & Community Welfare Drive",
      tagline: "Empowering Underprivileged Children With Quality School Essentials",
      description:
        "Social welfare distribution providing backpacks, notebooks, uniforms, and stationery sets to underprivileged municipal school students across Nashik.",
      categoryLabel: "Social Welfare",
      date: "Jul 15, 2026",
      location: "Indira Nagar & Nashik District Municipal Schools",
      metricLabel: "Distributed Kits",
      metricValue: "2,500+ Kits",
    },
    mr: {
      title: "विद्यार्थी शैक्षणिक साहित्य वाटप व समाजकल्याण मोहीम",
      tagline: "गरजू विद्यार्थ्यांना शैक्षणिक साहित्य देऊन शिक्षणाची नवी उमेद",
      description:
        "नाशिक जिल्ह्यातील मनपा व गरजू शाळांमधील विद्यार्थ्यांना शैक्षणिक साहित्य, दप्तरे, वह्या व गणवेशाचे मोफत वाटप.",
      categoryLabel: "सामाजिक कल्याण",
      date: "१५ जुलै २०२६",
      location: "इंदिरा नगर व नाशिक महानगरपालिका शाळा",
      metricLabel: "वाटप केलेले साहित्य",
      metricValue: "२,५००+ संच",
    },
    hi: {
      title: "विद्यार्थी शैक्षणिक किट एवं जन कल्याण अभियान",
      tagline: "जरूरतमंद बच्चों को पठन सामग्री देकर शिक्षा का संबल",
      description:
        "नाशिक जिले के नगर निगम एवं जरूरतमंद विद्यालयों के विद्यार्थियों को स्कूल बैग, कापियां और अध्ययन सामग्री का निःशुल्क वितरण।",
      categoryLabel: "सामाजिक कल्याण",
      date: "15 जुलाई 2026",
      location: "इंदिरा नगर एवं नाशिक नगर निगम विद्यालय",
      metricLabel: "वितरित सामग्री",
      metricValue: "2,500+ किट",
    },
  },
};

/**
 * Returns a localized copy of the EventItem according to current language
 */
export function getLocalizedEvent(event: EventItem, language: Language): EventItem {
  const loc = EVENT_LOCALIZATIONS[event.id]?.[language] || EVENT_LOCALIZATIONS[event.id]?.en;
  if (!loc) return event;

  let metrics = [...event.metrics];
  if (loc.allMetrics && loc.allMetrics.length > 0) {
    metrics = loc.allMetrics;
  } else if (metrics.length > 0 && loc.metricLabel && loc.metricValue) {
    metrics[0] = {
      label: loc.metricLabel,
      value: loc.metricValue,
    };
  }

  return {
    ...event,
    title: loc.title,
    tagline: loc.tagline || event.tagline,
    description: loc.description,
    categoryLabel: loc.categoryLabel,
    date: loc.date,
    time: loc.time || event.time,
    registrationCloseDate: loc.registrationCloseDate || event.registrationCloseDate,
    location: loc.location,
    venueName: loc.venueName || event.venueName,
    addressLine1: loc.addressLine1 || event.addressLine1,
    addressLine2: loc.addressLine2 !== undefined ? loc.addressLine2 : event.addressLine2,
    city: loc.city || event.city,
    state: loc.state || event.state,
    country: loc.country || event.country,
    eventMode: (loc.eventMode || event.eventMode) as any,
    checkInMode: (loc.checkInMode || event.checkInMode) as any,
    emergencyContactName: loc.emergencyContactName || event.emergencyContactName,
    accessibilityInfo: loc.accessibilityInfo || event.accessibilityInfo,
    organizedDetails: loc.organizedDetails || event.organizedDetails,
    agenda: loc.agenda || event.agenda,
    partners: loc.partners || event.partners,
    sponsors: loc.sponsors || event.sponsors,
    metrics,
  };
}
