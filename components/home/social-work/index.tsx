"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const impactCards = [
  {
    id: 0,
    metric: "50+ Drives",
    title: "Blood Donation Camps",
    description:
      "Regular mass blood donation drives organized in collaboration with top Nashik hospitals to save critical lives in times of emergency.",
    image: "/volunteer_musician.png",
    bg: "bg-orange-50/70 border-saffron/15",
    text: "text-charcoal",
    isFeature: true,
    featureLabel: "Life-Saving Seva",
  },
  {
    id: 1,
    metric: "1,000+",
    title: "Yoga & Wellness Camps",
    description:
      "Mass community sessions on International Yoga Day and fitness workshops promoting holistic mental and physical well-being.",
    image: "/volunteer_safety.png",
    bg: "bg-amber-50/70 border-gold/15",
    text: "text-charcoal",
  },
  {
    id: 2,
    metric: "5,000+",
    title: "Health Diagnostic Camps",
    description:
      "Free medical examinations, eye checkup drives, and essential healthcare assistance for senior citizens and local families.",
    image: "/volunteer_coordinator.png",
    bg: "bg-[#121214] border-coal",
    text: "text-alabaster",
  },
  {
    id: 3,
    metric: "100%",
    title: "Community & Student Aid",
    description:
      "Distributing notebooks, study materials for underprivileged children, cleanliness drives, and prompt emergency community assistance.",
    image: "/volunteer_eco.png",
    bg: "bg-rose-50/70 border-red-200/15",
    text: "text-charcoal",
  },
];

export default function CulturalInitiatives() {
  const [openCard, setOpenCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="social-work" className="w-full bg-background py-10 sm:py-16 md:py-20 select-none">
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex items-start justify-between gap-6 mb-6 sm:mb-10">
          <div className="max-w-[620px] text-left">
            <h2 className="text-2xl sm:text-[34px] md:text-[40px] leading-[1.15] font-normal text-charcoal font-heading tracking-tight">
              Social Welfare &amp; Healthcare Drives
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-[15px] text-slate-grey leading-[1.75] max-w-[560px] font-sans">
              Dedicated community initiatives, life-saving blood donation drives, wellness camps, and educational support across Indira Nagar.
            </p>
          </div>
        </div>

        {/* Framer-Motion Accordion Layout */}
        <div 
          onMouseLeave={() => setOpenCard(null)}
          className="flex flex-col md:flex-row md:items-end gap-3 md:gap-0"
        >
          {impactCards.map((card, idx) => {
            const isOpen = openCard === idx;
            const closedHeights = [280, 330, 390, 430];
            const targetHeight = isMobile
              ? (isOpen ? 400 : 88)
              : (isOpen ? 480 : closedHeights[idx]);

            return (
              <motion.div
                key={card.id}
                onMouseEnter={() => !isMobile && setOpenCard(idx)}
                onFocus={() => setOpenCard(idx)}
                onClick={() => setOpenCard(isOpen ? null : idx)}
                tabIndex={0}
                animate={{ flex: isOpen ? 4.8 : 1.5 }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className={`${card.bg} ${card.text} relative overflow-hidden border border-saffron/10 h-auto cursor-pointer rounded-2xl md:rounded-none`}
              >
                <motion.div
                  animate={{ height: targetHeight }}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  className="h-full"
                >
                  {isOpen ? (
                    <div className="h-full p-4 sm:p-6 md:p-7 flex flex-col justify-between text-left">
                      {card.isFeature ? (
                        <div className="max-w-[280px]">
                          <h3 className="text-xl sm:text-[28px] md:text-[32px] leading-[1.1] font-normal font-heading mb-2 sm:mb-3 text-charcoal">
                            Shree
                            <br />
                            Naad Pathak
                          </h3>
                          <Link
                            href="/volunteer"
                            className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-bold text-saffron hover:text-gold transition-colors cursor-pointer font-sans"
                            data-hover="pointer"
                          >
                            Join the Troupe <ArrowRight size={14} />
                          </Link>
                        </div>
                      ) : (
                        <div className="max-w-[300px]">
                          <h3 className={`text-lg sm:text-[24px] md:text-[26px] leading-[1.15] font-normal font-heading ${
                            card.id === 2 ? "text-white" : "text-charcoal"
                          }`}>
                            {card.title}
                          </h3>
                          <p className={`mt-1.5 sm:mt-2 text-xs sm:text-[13px] leading-[1.65] font-sans ${
                            card.id === 2 ? "text-slate-300" : "text-slate-grey"
                          }`}>
                            {card.description}
                          </p>
                          <Link
                            href="/volunteer"
                            className={`mt-2 sm:mt-3 inline-flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-bold transition-colors cursor-pointer font-sans ${
                              card.id === 2 ? "text-gold hover:text-saffron" : "text-saffron hover:text-gold"
                            }`}
                            data-hover="pointer"
                          >
                            Participate <ArrowRight size={14} />
                          </Link>
                        </div>
                      )}

                      <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-[1.05fr_1fr] gap-3 sm:gap-4 flex-1 items-end">
                        <div className="self-end">
                          <p className="text-3xl sm:text-[50px] md:text-[56px] font-normal leading-none font-heading text-saffron">
                            {card.metric}
                          </p>
                          <p className={`mt-1 sm:mt-2 text-[9px] sm:text-[11px] tracking-[0.18em] uppercase font-bold font-sans ${
                            card.id === 2 ? "text-white/80" : "text-charcoal/80"
                          }`}>
                            {card.title}
                          </p>
                        </div>

                        <div
                          className={`relative w-full rounded-xl sm:rounded-block overflow-hidden border border-saffron/10 ${
                            card.isFeature
                              ? "h-[110px] sm:h-[180px] md:h-[200px]"
                              : "h-[100px] sm:h-[140px] md:h-[155px]"
                          }`}
                        >
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full p-4 sm:p-5 flex items-center md:flex-col justify-between text-left">
                      <div className="flex items-center md:flex-col md:items-start justify-between w-full">
                        <p className="text-base sm:text-xl lg:text-2xl font-normal leading-none font-heading text-saffron whitespace-nowrap">
                          {card.metric}
                        </p>
                        <p className={`text-[10px] sm:text-[9px] lg:text-[10px] tracking-wider uppercase font-bold font-sans leading-tight max-w-[140px] md:max-w-[90px] ${
                          card.id === 2 ? "text-white/70" : "text-charcoal/70"
                        }`}>
                          {card.title}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Troupe Volunteer Invitation Banner */}
        <Link 
          href="/volunteer"
          className="mt-8 sm:mt-12 bg-charcoal text-white rounded-2xl sm:rounded-full px-4 sm:px-8 py-3.5 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center cursor-pointer hover:bg-charcoal/95 transition-all border border-saffron/10 group shadow-md block"
          data-hover="pointer"
        >
          <p className="text-xs sm:text-[14px] leading-[1.4] text-slate-200 font-sans">
            Ready to drum, climb, or design? Register with our friends troupe and join the next grand celebration!
          </p>
          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-saffron flex items-center gap-1.5 whitespace-nowrap bg-white/95 px-4 py-2 rounded-full shadow-sm group-hover:text-gold transition-colors">
            Become a Volunteer <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </Link>

      </div>
    </section>
  );
}
