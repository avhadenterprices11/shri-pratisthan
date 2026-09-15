import { GalleryItem } from "@/app/gallery/gallery-data";
import { Language } from "@/context/LanguageContext";

export interface LocalizedGalleryFields {
  title: string;
  category: string;
  date: string;
  metric?: string;
  description: string;
  details: string;
}

export const GALLERY_LOCALIZATIONS: Record<string, Record<Language, LocalizedGalleryFields>> = {
  "ganeshotsav-processions": {
    en: {
      title: "Shree Ganeshotsav — Jejuri Gad Dekhava",
      category: "Festival",
      date: "September 2024",
      metric: "10-Day Festival",
      description: "Our grand Ganeshotsav celebration in Indira Nagar, Nashik featuring historic theme replicas like Jejuri Gad.",
      details: "The annual Ganeshotsav celebration is one of Shree Pratishtan's signature cultural events in Indira Nagar, Nashik. The event features magnificent theme replicas such as Shri Khandoba Maharaj Jejuri Gad, daily spiritual Maha Aartis, traditional Dhol Tasha drummers playing in synchronization, and eco-friendly Shadu Mati clay idols."
    },
    mr: {
      title: "श्री गणेशोत्सव — जेजुरी गड देखावा",
      category: "उत्सव",
      date: "सप्टेंबर २०२४",
      metric: "१० दिवसांचा उत्सव",
      description: "इंदिरा नगर, नाशिक येथे जेजुरी गड देखाव्याच्या भव्य प्रतिकृतीसह साजरा झालेला भव्य गणेशोत्सव.",
      details: "श्री प्रतिष्ठानचा वार्षिक गणेशोत्सव हा इंदिरा नगर, नाशिक येथील मुख्य सांस्कृतिक उत्सव आहे. यामध्ये श्री खंडोबा महाराज जेजुरी गड देखावा, दररोज सायंकाळी भाविकांच्या उपस्थितीत महाआरती, पारंपारिक ढोल-ताशा पथकांचे वादन आणि पर्यावरणपूरक शाडू मातीच्या गणेश मूर्तींचा समावेश असतो."
    },
    hi: {
      title: "श्री गणेशोत्सव — जेजुरी गढ़ झांकी",
      category: "महोत्सव",
      date: "सितंबर 2024",
      metric: "10 दिवसीय महोत्सव",
      description: "इंदिरा नगर, नाशिक में जेजुरी गढ़ की ऐतिहासिक प्रतिकृति के साथ मनाया गया भव्य गणेशोत्सव।",
      details: "श्री प्रतिष्ठान का वार्षिक गणेशोत्सव इंदिरा नगर, नाशिक का प्रमुख सांस्कृतिक उत्सव है। इसमें श्री खंडोबा महाराज जेजुरी गढ़ की भव्य झांकी, नित्य संध्या महाआरती, पारंपरिक ढोल-ताशा वादन और पर्यावरण अनुकूल शाडू मिट्टी की गणेश प्रतिमाएं शामिल हैं।"
    }
  },
  "gudipadwa-swagat-yatra": {
    en: {
      title: "Gudipadwa Bhavya Swagat Yatra",
      category: "Festival",
      date: "March 2024",
      metric: "Grand Yatra",
      description: "Grand Marathi New Year procession with traditional Lezim, Dhol Tasha, and cultural rallies across Indira Nagar.",
      details: "Commencing the Marathi New Year, the Gudipadwa Swagat Yatra unites thousands of families across Indira Nagar, Nashik in traditional attire. Featuring majestic saffron flags, live Lezim performances, synchronised Dhol Tasha percussion, and decorated floats, this yatra showcases Maharashtra's rich cultural heritage and brotherhood."
    },
    mr: {
      title: "गुढीपाडवा भव्य स्वागत यात्रा",
      category: "उत्सव",
      date: "मार्च २०२४",
      metric: "भव्य शोभायात्रा",
      description: "इंदिरा नगरमध्ये पारंपरिक लेझीम, ढोल-ताशा व सांस्कृतिक देखाव्यांसह भव्य स्वागत यात्रा.",
      details: "मराठी नववर्षाचे स्वागत करणारी गुढीपाडवा स्वागत यात्रा हजारो कुटुंबांना पारंपरिक वेशभूषेत एकत्र आणते. भगवे ध्वज, लेझीम पथके, ढोल-ताशांचे नाद आणि सुशोभित चित्ररथांसह ही यात्रा महाराष्ट्राचा सांस्कृतिक वारसा प्रकट करते."
    },
    hi: {
      title: "गुढीपाडवा भव्य शोभायात्रा",
      category: "महोत्सव",
      date: "मार्च 2024",
      metric: "भव्य शोभायात्रा",
      description: "इंदिरा नगर में पारंपरिक लेजिम, ढोल-ताशा और सांस्कृतिक झांकियों के साथ भव्य शोभायात्रा।",
      details: "नववर्ष के स्वागत में आयोजित गुढीपाडवा शोभायात्रा में हजारों परिवार पारंपरिक परिधानों में सम्मिलित होते हैं। भगवा ध्वज, लेजिम प्रदर्शन, ढोल-ताशा वादन और सजी हुई झांकियां महाराष्ट्र की गौरवशाली संस्कृति को दर्शाती हैं।"
    }
  },
  "mahashivratri-celebration": {
    en: {
      title: "Mahashivratri — 108-ft Mahamrutyunjay Mandir",
      category: "Festival",
      date: "February 2024",
      metric: "108-Ft Shivling",
      description: "Grand Mahashivratri celebration featuring monumental 108-ft Mahamrutyunjay Mandir Shivling replica and sacred abhishek.",
      details: "Shree Pratishtan's grand Mahashivratri utsav in Indira Nagar, Nashik features monumental architectural replicas including the sacred 108-foot Mahamrutyunjay Mandir (Assam) Shivling. Tens of thousands of devotees assemble for continuous chanting, sacred bilva patra offerings, and evening light spectacles."
    },
    mr: {
      title: "महाशिवरात्रोत्सव — १०८ फूट महामृत्युंजय मंदिर प्रतिकृती",
      category: "उत्सव",
      date: "फेब्रुवारी २०२४",
      metric: "१०८ फूट शिवलिंग",
      description: "१०८ फूट भव्य महामृत्युंजय मंदिर शिवलिंग प्रतिकृती व पवित्र रुद्राभिषेक सोहळा.",
      details: "इंदिरा नगर, नाशिक येथील महाशिवरात्रोत्सवात आसाममधील पवित्र १०८ फूट महामृत्युंजय मंदिराच्या शिवलिंगाची भव्य प्रतिकृती साकारण्यात आली. हजारो भाविकांनी महाआरती, मंत्रोच्चार व दर्शनाचा लाभ घेतला."
    },
    hi: {
      title: "महाशिवरात्रोत्सव — 108 फीट महामृत्युंजय मंदिर प्रतिकृति",
      category: "महोत्सव",
      date: "फरवरी 2024",
      metric: "108 फीट शिवलिंग",
      description: "108 फीट भव्य महामृत्युंजय मंदिर शिवलिंग प्रतिकृति एवं पावन रुद्राभिषेक महोत्सव।",
      details: "इंदिरा नगर, नाशिक में महाशिवरात्रि पर असम के 108 फीट महामृत्युंजय मंदिर शिवलिंग की भव्य प्रतिकृति बनाई गई। हजारों श्रद्धालुओं ने महाआरती, मंत्रोच्चार और दर्शन का पुण्य लाभ प्राप्त किया।"
    }
  },
  "mahashivratri-utsav": {
    en: {
      title: "108-Ft Mahamrutyunjay Mandir Pratikruti",
      category: "Festival",
      date: "February 2024",
      metric: "108-Ft Shivling",
      description: "Spectacular 108-foot Mahamrutyunjay Shivling replica during Mahashivratri in Indira Nagar, Nashik.",
      details: "A monumental 108-foot architectural replica welcoming thousands of devotees for darshan, continuous Vedic chanting, and community aarti."
    },
    mr: {
      title: "१०८ फूट महामृत्युंजय मंदिर भव्य प्रतिकृती",
      category: "उत्सव",
      date: "फेब्रुवारी २०२४",
      metric: "१०८ फूट शिवलिंग",
      description: "महाशिवरात्रीनिमित्त १०८ फूट भव्य महामृत्युंजय शिवलिंग प्रतिकृती व अखंड नामस्मरण सोहळा.",
      details: "हजारो भाविकांच्या उपस्थितीत महाशिवरात्रोत्सवात १०८ फूट प्रतिकृतीचे दर्शन, रुद्राभिषेक आणि सामुदायिक महाआरती पार पडली."
    },
    hi: {
      title: "108 फीट महामृत्युंजय मंदिर भव्य प्रतिकृति",
      category: "महोत्सव",
      date: "फरवरी 2024",
      metric: "108 फीट शिवलिंग",
      description: "महाशिवरात्रि पर 108 फीट विशाल महामृत्युंजय शिवलिंग प्रतिकृति एवं अखंड नामजप अनुष्ठान।",
      details: "हजारों श्रद्धालुओं की उपस्थिति में 108 फीट प्रतिकृति दर्शन, रुद्राभिषेक और सामूहिक महाआरती का आयोजन हुआ।"
    }
  },
  "dahi-handi-utsav": {
    en: {
      title: "Bhavya Dahi Handi Utsav & Govinda Pathaks",
      category: "Festival",
      date: "August 2024",
      metric: "Multi-Tier Pyramids",
      description: "Thrilling Dahi Handi celebration with top Govinda pathaks competing in towering multi-tier pyramids in Indira Nagar.",
      details: "Our annual Dahi Handi Utsav in Indira Nagar attracts thousands of spectators and premier Govinda pathaks from across Maharashtra. The high-energy festival promotes youth fitness, discipline, and unity with cultural music and celebratory rewards."
    },
    mr: {
      title: "भव्य दहीहंडी उत्सव व गोविंद पथके",
      category: "उत्सव",
      date: "ऑगस्ट २०२४",
      metric: "थरांचे मानकरी",
      description: "महाराष्ट्रातील नामांकित गोविंदा पथकांची मानवी मनोरे रचत रोमांचक दहीहंडी स्पर्धा.",
      details: "इंदिरा नगर येथील वार्षिक दहीहंडी उत्सवात हजारो नागरिक उपस्थित असतात. शिस्तबद्ध मानवी मनोरे, सांस्कृतिक संगीत आणि युवकांच्या उत्साहाने हा उत्सव अत्यंत जल्लोषात पार पडतो."
    },
    hi: {
      title: "भव्य दही हांडी उत्सव एवं गोविंदा दल",
      category: "महोत्सव",
      date: "अगस्त 2024",
      metric: "मानव पिरामिड",
      description: "शीर्ष गोविंदा दलों द्वारा गगनचुंबी मानव पिरामिड बनाकर रोमांचक दही हांडी प्रतियोगिता।",
      details: "इंदिरा नगर में आयोजित वार्षिक दही हांडी उत्सव में हजारों दर्शक उपस्थित होते हैं। अनुशासन, खेल भावना और युवा उत्साह के साथ यह महोत्सव हर्षोल्लास से संपन्न होता है।"
    }
  },
  "dahi-handi-celebration": {
    en: {
      title: "Dahi Handi Govinda Human Pyramids",
      category: "Festival",
      date: "August 2024",
      metric: "Multi-Tier Pyramids",
      description: "Electrifying crowd and multi-tier human pyramids during Dahi Handi in Indira Nagar.",
      details: "Over 10,000 citizens gather to cheer youth Govinda pathaks forming high pyramids in devotion and sportsmanship."
    },
    mr: {
      title: "दहीहंडी गोविंदा मानवी मनोरे",
      category: "उत्सव",
      date: "ऑगस्ट २०२४",
      metric: "मानवी मनोरे",
      description: "इंदिरा नगरमधील रोमांचक दहीहंडी जल्लोष आणि युवकांचे गगनचुंबी मानवी थर.",
      details: "१०,००० हून अधिक नागरिकांच्या जल्लोषात नामांकित गोविंदा पथकांनी भक्ती आणि शिस्तीचे दर्शन घडवत मनोरे रचले."
    },
    hi: {
      title: "दही हांडी गोविंदा मानव पिरामिड",
      category: "महोत्सव",
      date: "अगस्त 2024",
      metric: "मानव पिरामिड",
      description: "इंदिरा नगर में रोमांचक दही हांडी का उत्साह और युवाओं के गगनचुंबी पिरामिड।",
      details: "10,000 से अधिक नागरिकों की उपस्थिति में शीर्ष गोविंदा दलों ने भक्ति एवं खेल भावना का परिचय दिया।"
    }
  },
  "navratri-garba-utsav": {
    en: {
      title: "Navratri Garba & Dandiya Utsav",
      category: "Festival",
      date: "October 2024",
      metric: "9 Nights Garba",
      description: "A lively, colorful 9-night celebration of traditional Raas Garba, community bonding, and cultural devotion in Indira Nagar.",
      details: "The Navratri Garba Utsav organized by Shree Pratishtan in Indira Nagar, Nashik brings together thousands of families for an evening of dance, worship, and vibrant traditional attire. Devotees dance to authentic traditional folk rhythms, reinforcing cultural preservation and harmony. The event concludes each night with a sacred Maha Aarti dedicated to community welfare and peace."
    },
    mr: {
      title: "नवरात्रौत्सव गरबा व दांडिया रास",
      category: "उत्सव",
      date: "ऑक्टोबर २०२४",
      metric: "९ रात्रींचा गरबा",
      description: "९ रात्रींचा पारंपरिक रास-गरबा, कौटुंबिक आनंद व भवानी मातेची महाआरती.",
      details: "इंदिरा नगर, नाशिक येथे आयोजित नवरात्रौत्सवात हजारो कुटुंबे एकत्र येतात. पारंपरिक लोकसंगीत, शिस्तबद्ध वातावरण आणि दररोज रात्री सामूहिक महाआरतीचे आयोजन केले जाते."
    },
    hi: {
      title: "नवरात्रोत्सव गरबा एवं डांडिया रास",
      category: "महोत्सव",
      date: "अक्टूबर 2024",
      metric: "9 रात्रियों का गरबा",
      description: "9 पावन रात्रियों का पारंपरिक रास-गरबा, पारिवारिक उल्लास एवं भवानी माता की महाआरती।",
      details: "इंदिरा नगर, नाशिक में आयोजित नवरात्रोत्सव में हजारों परिवार सम्मिलित होते हैं। पारंपरिक लोकसंगीत, सुरक्षित पारिवारिक वातावरण और नित्य संध्या सामूहिक महाआरती का आयोजन होता है।"
    }
  },
  "shiv-jayanti-celebration": {
    en: {
      title: "Shiv Jayanti Grand Historical Procession",
      category: "Festival",
      date: "February 2024",
      metric: "Youth Rallies",
      description: "Inspiring youth rallies, historical exhibitions, and traditional martial arts demonstrations in Indira Nagar.",
      details: "Honoring Chhatrapati Shivaji Maharaj, our annual Shiv Jayanti festival features youth processions, historical lectures, and live demonstrations of traditional Marathi Mardani Khel martial arts. The event inspires local youth with Swarajya values, good governance, discipline, and community service."
    },
    mr: {
      title: "शिवजयंती भव्य शोभायात्रा व मर्दानी खेळ",
      category: "उत्सव",
      date: "फेब्रुवारी २०२४",
      metric: "युवा शोभायात्रा",
      description: "छत्रपती शिवाजी महाराजांच्या चरित्रावर व्याख्याने, मर्दानी खेळांची प्रात्यक्षिके व भव्य मिरवणूक.",
      details: "छत्रपती शिवाजी महाराज यांच्या जयंतीनिमित्त इंदिरा नगरमध्ये भव्य ऐतिहासिक मिरवणूक काढण्यात येते. पारंपारिक वेशभूषा, मर्दानी खेळ, शिवकालीन शस्त्रकला प्रात्यक्षिके आणि स्वराज्य मूल्यांचा जागर केला जातो."
    },
    hi: {
      title: "शिव जयंती भव्य शोभायात्रा एवं मर्दानी खेल",
      category: "महोत्सव",
      date: "फरवरी 2024",
      metric: "युवा शोभायात्रा",
      description: "छत्रपति शिवाजी महाराज की स्मृति में भव्य शोभायात्रा, ऐतिहासिक व्याख्यान एवं पारंपरिक युद्धकला प्रदर्शन।",
      details: "छत्रपति शिवाजी महाराज की जयंती पर इंदिरा नगर में भव्य ऐतिहासिक शोभायात्रा निकाली जाती है। पारंपरिक वेशभूषा, मर्दानी खेल, शस्त्रकला प्रदर्शन और स्वराज्य के गौरवशाली आदर्शों का संदेश दिया जाता है।"
    }
  },
  "dr-ambedkar-jayanti": {
    en: {
      title: "Dr. Ambedkar Jayanti Student Welfare",
      category: "Education",
      date: "April 2024",
      metric: "2,500+ Kits",
      description: "Social equality seminars, academic merit honors, and free educational study kit distribution for students in Nashik.",
      details: "Celebrating the birth anniversary of Bharat Ratna Dr. Babasaheb Ambedkar, Shree Pratishtan organizes educational aid drives. We distribute comprehensive study kits, school bags, and notebooks to underprivileged students while felicitating top academic achievers from Indira Nagar and municipal schools."
    },
    mr: {
      title: "डॉ. बाबासाहेब आंबेडकर जयंती विद्यार्थी मदत",
      category: "शिक्षण",
      date: "एप्रिल २०२४",
      metric: "२,५००+ संच वाटप",
      description: "विद्यार्थ्यांना मोफत वह्या-पुस्तके, शैक्षणिक संच वाटप व संविधान जागृती उपक्रम.",
      details: "भारतरत्न डॉ. बाबासाहेब आंबेडकर जयंतीनिमित्त गरजू विद्यार्थ्यांना शालेय बॅग, वह्या व शैक्षणिक साहित्याचे वाटप केले जाते तसेच गुणवंत विद्यार्थ्यांचा गौरव केला जातो."
    },
    hi: {
      title: "डॉ. आंबेडकर जयंती विद्यार्थी कल्याण",
      category: "शिक्षा",
      date: "अप्रैल 2024",
      metric: "2,500+ किट वितरण",
      description: "छात्रों को निःशुल्क अध्ययन सामग्री, कॉपियां वितरण एवं संविधान चेतना अभियान।",
      details: "भारत रत्न डॉ. बाबासाहेब आंबेडकर की जयंती पर निर्धन विद्यार्थियों को स्कूल बैग, कापियां व शिक्षण सामग्री वितरित की जाती है और मेधावी छात्रों को सम्मानित किया जाता है।"
    }
  },
  "yoga-wellness-camps": {
    en: {
      title: "International Yoga Day & Wellness Clinics",
      category: "Healthcare",
      date: "June 2024",
      metric: "500+ Participants",
      description: "Mass guided yoga protocols, breathing workshops, and preventative health screenings for senior citizens and families.",
      details: "Observed on June 21st in Indira Nagar, our mass Yoga Day brings together residents for certified yoga asana practice, pranayama sessions, and holistic wellness consultations. Specialist physicians provide blood pressure, diabetes, and bone density screenings to encourage proactive healthcare."
    },
    mr: {
      title: "आंतरराष्ट्रीय योग दिन व आरोग्य शिबिर",
      category: "आरोग्य",
      date: "जून २०२४",
      metric: "५००+ सहभागी",
      description: "सामूहिक योगासने, प्राणायाम मार्गदर्शन व नागरिकांसाठी मोफत आरोग्य तपासणी.",
      details: "२१ जून रोजी इंदिरा नगर येथे सामूहिक योग दिन साजरा केला जातो. प्रमाणित योग शिक्षकांद्वारे योगासने, तणावमुक्ती प्राणायाम आणि ज्येष्ठ नागरिकांसाठी आरोग्य तपासणी केली जाते."
    },
    hi: {
      title: "अंतरराष्ट्रीय योग दिवस एवं स्वास्थ्य शिविर",
      category: "स्वास्थ्य",
      date: "जून 2024",
      metric: "500+ प्रतिभागी",
      description: "सामूहिक योगाभ्यास, प्राणायाम मार्गदर्शन एवं नागरिकों के लिए निःशुल्क स्वास्थ्य परीक्षण।",
      details: "21 जून को इंदिरा नगर में सामूहिक योग दिवस का आयोजन होता है। योग प्रशिक्षकों द्वारा योगासन, प्राणायाम और वरिष्ठ नागरिकों के लिए स्वास्थ्य परीक्षण की व्यवस्था की जाती है।"
    }
  },
  "eco-preservation": {
    en: {
      title: "Vasundhara Tree Plantation Drive",
      category: "Environment",
      date: "July 2024",
      metric: "Green Drive",
      description: "Afforestation, native sapling plantation, and soil conservation drives across Nashik.",
      details: "To enhance urban green cover and improve biodiversity, our Vasundhara Tree Plantation Drive leads regular campaigns across Indira Nagar and Nashik open spaces. Volunteers plant indigenous shade and fruit saplings, nurture them with weekly watering rounds, and organize eco-awareness sessions for schoolchildren."
    },
    mr: {
      title: "वसुंधरा वृक्षारोपण व संवर्धन मोहीम",
      category: "पर्यावरण",
      date: "जुलै २०२४",
      metric: "हरित मोहीम",
      description: "नाशिक परिसरात देशी झाडांचे रोपण, संवर्धन आणि पर्यावरण जागृती उपक्रम.",
      details: "इंदिरा नगर व नाशिक परिसरात हरित आच्छादन वाढवण्यासाठी नियमित वृक्षारोपण केले जाते आणि झाडांची नियमित निगा राखली जाते."
    },
    hi: {
      title: "वसुंधरा पौधरोपण एवं पर्यावरण संरक्षण",
      category: "पर्यावरण",
      date: "जुलाई 2024",
      metric: "हरित अभियान",
      description: "नाशिक क्षेत्र में देशी वृक्षारोपण, संरक्षण एवं पर्यावरण जागरूकता अभियान।",
      details: "इंदिरा नगर और नाशिक में हरियाली बढ़ाने के लिए नियमित पौधरोपण किया जाता है और उनकी निरंतर देखभाल की जाती है।"
    }
  },
  "diagnostics-camp": {
    en: {
      title: "Free Specialist Health Checkup Camp",
      category: "Healthcare",
      date: "December 2024",
      metric: "Health Camp",
      description: "Medical checkups, doctor consultations, and basic diagnostics for families in Nashik.",
      details: "The Community Diagnostics Camp is a healthcare drive organized by Shree Pratishtan in Indira Nagar, Nashik. Our team, along with qualified doctors, conducts primary health screenings, blood sugar and pressure testing, and distributes free prescription medicines. By diagnosing common ailments early, we help reduce the long-term healthcare burden on local families."
    },
    mr: {
      title: "मोफत तज्ज्ञ आरोग्य तपासणी शिबिर",
      category: "आरोग्य",
      date: "डिसेंबर २०२४",
      metric: "आरोग्य शिबिर",
      description: "तज्ज्ञ डॉक्टरांकडून आरोग्य तपासणी, औषध वाटप आणि मार्गदर्शन.",
      details: "इंदिरा नगरमध्ये आयोजित शिबिरात रक्तदाब, मधुमेह तपासणी आणि तज्ज्ञ डॉक्टरांचा मोफत सल्ला उपलब्ध करून दिला जातो."
    },
    hi: {
      title: "निःशुल्क विशेषज्ञ स्वास्थ्य परीक्षण शिविर",
      category: "स्वास्थ्य",
      date: "दिसंबर 2024",
      metric: "स्वास्थ्य शिविर",
      description: "विशेषज्ञ चिकित्सकों द्वारा स्वास्थ्य परीक्षण, औषधि वितरण एवं परामर्श।",
      details: "इंदिरा नगर में आयोजित शिविर में रक्तचाप, मधुमेह जांच एवं विशेषज्ञ डॉक्टरों द्वारा निःशुल्क परामर्श दिया जाता है।"
    }
  },
  "disaster-relief": {
    en: {
      title: "Community Relief & Winter Aid Drives",
      category: "Social Welfare",
      date: "November 2024",
      metric: "Relief Drive",
      description: "Distributing warm blankets, food rations, and essential supplies to vulnerable families in Nashik.",
      details: "During seasonal cold waves and hardships in Nashik, Shree Pratishtan's volunteer unit is swiftly deployed. Our volunteers pack and distribute warm blankets, clothing, dry rations, and basic medicines to support vulnerable citizens."
    },
    mr: {
      title: "सामाजिक मदत व थंडीत ब्लँकेट वाटप",
      category: "समाजसेवा",
      date: "नोव्हेंबर २०२४",
      metric: "मदत मोहीम",
      description: "गरजू कुटुंबांना उबदार ब्लँकेट्स, अन्नधान्य आणि जीवनावश्यक साहित्याची मदत.",
      details: "हिवाळ्यात गरजू नागरिकांना थंडीपासून संरक्षणासाठी गरम ब्लँकेट्स व जीवनावश्यक वस्तूंचे वाटप केले जाते."
    },
    hi: {
      title: "सामाजिक सहायता एवं कंबल वितरण",
      category: "समाजसेवा",
      date: "नवंबर 2024",
      metric: "सहायता अभियान",
      description: "जरूरतमंद परिवारों को गर्म कंबल, खाद्य सामग्री एवं आवश्यक सहायता।",
      details: "शीतऋतु में जरूरतमंद नागरिकों की सुरक्षा के लिए गर्म कंबल एवं आवश्यक वस्तुओं का वितरण किया जाता है।"
    }
  },
  "sports-athletics": {
    en: {
      title: "Youth Athletics Meet & Awards",
      category: "Sports",
      date: "January 2025",
      metric: "Youth Sports",
      description: "Annual athletics events, running races, and youth sportsmanship trophies in Indira Nagar.",
      details: "Promoting physical fitness and healthy habits among school and college students in Indira Nagar, Nashik with competitive running and athletics meets."
    },
    mr: {
      title: "युवा मैदानी क्रीडा स्पर्धा व पुरस्कार",
      category: "क्रीडा",
      date: "जानेवारी २०२५",
      metric: "युवा क्रीडा",
      description: "विद्यार्थ्यांसाठी वार्षिक धावण्याच्या स्पर्धा, मैदानी खेळ आणि क्रीडा पारितोषिक वितरण.",
      details: "इंदिरा नगरमधील शाळा-महाविद्यालयांच्या विद्यार्थ्यांसाठी मैदानी खेळांचे आयोजन करून खिलाडूवृत्तीला प्रोत्साहन दिले जाते."
    },
    hi: {
      title: "युवा एथलेटिक्स खेलकूद प्रतियोगिता एवं पुरस्कार",
      category: "खेलकूद",
      date: "जनवरी 2025",
      metric: "युवा खेल",
      description: "विद्यार्थियों के लिए वार्षिक दौड़ प्रतियोगिता, मैदानी खेल एवं खेल सम्मान।",
      details: "इंदिरा नगर के विद्यार्थियों के लिए खेलकूद प्रतियोगिताओं का आयोजन कर शारीरिक स्वास्थ्य एवं खेल भावना को बढ़ावा दिया जाता है।"
    }
  }
};

export function getLocalizedGalleryItem(rawItem: GalleryItem, language: Language): GalleryItem {
  const loc = GALLERY_LOCALIZATIONS[rawItem.id]?.[language];
  if (!loc) return rawItem;

  return {
    ...rawItem,
    title: loc.title || rawItem.title,
    category: loc.category || rawItem.category,
    date: loc.date || rawItem.date,
    metric: loc.metric || rawItem.metric,
    description: loc.description || rawItem.description,
    details: loc.details || rawItem.details,
  };
}

export interface VideoItem {
  title: string;
  category: string;
  location: string;
  duration: string;
  src: string;
  poster: string;
}

export const BASE_VIDEOS: VideoItem[] = [
  { 
    title: "Gudipadwa Swagat Yatra & Lezim Parades",
    category: "Cultural Heritage",
    location: "Indira Nagar, Nashik",
    duration: "2:15", 
    src: "/festival_celebration.mp4", 
    poster: "/gallery_dhol_tasha_camps.png" 
  },
  { 
    title: "Shree Ganeshotsav Grand Maha Aarti & Parades",
    category: "Devotional Festival",
    location: "Indira Nagar, Nashik",
    duration: "2:40", 
    src: "/festival_drums.mp4", 
    poster: "/gallery_ganeshotsav_aarthi.png" 
  },
  { 
    title: "50+ Blood Donation & Health Camp Drives",
    category: "Healthcare Seva",
    location: "Nashik Civil Hospital Partner",
    duration: "1:55", 
    src: "/about_showcase_video.mp4", 
    poster: "/volunteer_medical.png" 
  },
  { 
    title: "Annual 32-Team Cricket Championship",
    category: "Sports Tournament",
    location: "Indira Nagar Ground, Nashik",
    duration: "2:10", 
    src: "/shri_pratisthan.mp4", 
    poster: "/gallery_dahi_handi_pyramids.png" 
  },
  { 
    title: "Shiv Jayanti Mardani Khel & Youth Rallies",
    category: "Martial Arts & History",
    location: "Indira Nagar, Nashik",
    duration: "2:30", 
    src: "/festival_drums.mp4", 
    poster: "/gallery_shiv_jayanti_rally.png" 
  },
  { 
    title: "Navratri Raas Dandiya & Garba Celebrations",
    category: "Folk Traditions",
    location: "Indira Nagar, Nashik",
    duration: "2:05", 
    src: "/festival_celebration.mp4", 
    poster: "/gallery_navratri_garba.png" 
  },
  { 
    title: "Vasundhara Tree Plantation & Eco Drives",
    category: "Environmental Seva",
    location: "Nashik Green Avenues",
    duration: "1:45", 
    src: "/about_showcase_video.mp4", 
    poster: "/volunteer_eco.png" 
  },
  { 
    title: "Student Study Kits & Educational Aid Drive",
    category: "Education Relief",
    location: "Nashik Municipal Schools",
    duration: "1:50", 
    src: "/about_showcase_video.mp4", 
    poster: "/volunteer_coordinator.png" 
  },
];

export const VIDEO_LOCALIZATIONS: Record<number, Record<Language, { title: string; category: string; location: string }>> = {
  0: {
    en: { title: "Gudipadwa Swagat Yatra & Lezim Parades", category: "Cultural Heritage", location: "Indira Nagar, Nashik" },
    mr: { title: "गुढीपाडवा स्वागत यात्रा व लेझीम पथक", category: "सांस्कृतिक वारसा", location: "इंदिरा नगर, नाशिक" },
    hi: { title: "गुढीपाडवा शोभायात्रा एवं लेजिम दल", category: "सांस्कृतिक धरोहर", location: "इंदिरा नगर, नाशिक" },
  },
  1: {
    en: { title: "Shree Ganeshotsav Grand Maha Aarti & Parades", category: "Devotional Festival", location: "Indira Nagar, Nashik" },
    mr: { title: "श्री गणेशोत्सव महाआरती व मिरवणूक", category: "भक्ती उत्सव", location: "इंदिरा नगर, नाशिक" },
    hi: { title: "श्री गणेशोत्सव महाआरती एवं शोभायात्रा", category: "भक्ति महोत्सव", location: "इंदिरा नगर, नाशिक" },
  },
  2: {
    en: { title: "50+ Blood Donation & Health Camp Drives", category: "Healthcare Seva", location: "Nashik Civil Hospital Partner" },
    mr: { title: "५०+ रक्तदान व आरोग्य तपासणी शिबिरे", category: "आरोग्य सेवा", location: "नाशिक जिल्हा रुग्णालय सहकार्य" },
    hi: { title: "50+ रक्तदान एवं स्वास्थ्य शिविर अभियान", category: "स्वास्थ्य सेवा", location: "नाशिक जिला अस्पताल सहयोगी" },
  },
  3: {
    en: { title: "Annual 32-Team Cricket Championship", category: "Sports Tournament", location: "Indira Nagar Ground, Nashik" },
    mr: { title: "वार्षिक ३२-संघ भव्य क्रिकेट स्पर्धा", category: "क्रीडा स्पर्धा", location: "इंदिरा नगर मैदान, नाशिक" },
    hi: { title: "वार्षिक 32-टीम भव्य क्रिकेट प्रतियोगिता", category: "खेलकूद प्रतियोगिता", location: "इंदिरा नगर मैदान, नाशिक" },
  },
  4: {
    en: { title: "Shiv Jayanti Mardani Khel & Youth Rallies", category: "Martial Arts & History", location: "Indira Nagar, Nashik" },
    mr: { title: "शिवजयंती मर्दानी खेळ व युवा मिरवणूक", category: "शौर्य व इतिहास", location: "इंदिरा नगर, नाशिक" },
    hi: { title: "शिव जयंती मर्दानी खेल एवं युवा रैली", category: "शौर्य एवं इतिहास", location: "इंदिरा नगर, नाशिक" },
  },
  5: {
    en: { title: "Navratri Raas Dandiya & Garba Celebrations", category: "Folk Traditions", location: "Indira Nagar, Nashik" },
    mr: { title: "नवरात्रौत्सव रास दांडिया व गरबा सोहळा", category: "लोकपरंपरा", location: "इंदिरा नगर, नाशिक" },
    hi: { title: "नवरात्रोत्सव रास डांडिया एवं गरबा महोत्सव", category: "लोक परंपरा", location: "इंदिरा नगर, नाशिक" },
  },
  6: {
    en: { title: "Vasundhara Tree Plantation & Eco Drives", category: "Environmental Seva", location: "Nashik Green Avenues" },
    mr: { title: "वसुंधरा वृक्षारोपण व पर्यावरण संवर्धन", category: "पर्यावरण सेवा", location: "नाशिक हरित परिसर" },
    hi: { title: "वसुंधरा पौधरोपण एवं पर्यावरण संरक्षण", category: "पर्यावरण सेवा", location: "नाशिक हरित क्षेत्र" },
  },
  7: {
    en: { title: "Student Study Kits & Educational Aid Drive", category: "Education Relief", location: "Nashik Municipal Schools" },
    mr: { title: "विद्यार्थी शैक्षणिक साहित्य व दप्तर वाटप", category: "शैक्षणिक मदत", location: "नाशिक मनपा शाळा" },
    hi: { title: "छात्र अध्ययन सामग्री एवं बस्ता वितरण", category: "शैक्षणिक सहयोग", location: "नाशिक नगर निगम विद्यालय" },
  },
};

export function getLocalizedVideos(language: Language): VideoItem[] {
  return BASE_VIDEOS.map((vid, idx) => {
    const loc = VIDEO_LOCALIZATIONS[idx]?.[language];
    if (!loc) return vid;
    return {
      ...vid,
      title: loc.title || vid.title,
      category: loc.category || vid.category,
      location: loc.location || vid.location,
    };
  });
}
