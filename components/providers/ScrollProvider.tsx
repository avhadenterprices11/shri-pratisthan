"use client";

import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { Agentation } from "agentation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Only run smooth scroll hijack on non-touch desktop viewports
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 1024;

    // Restore GSAP lagSmoothing to smoothly handle frame dips without stuttering
    gsap.ticker.lagSmoothing(500, 33);

    if (isTouch) {
      // Mobile & touch devices use 100% native 120Hz hardware-accelerated scrolling
      return;
    }

    // Instantiate Lenis engine for desktop
    const lenis = new Lenis({
      lerp: 0.1,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 0,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll events with ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    // Sync Lenis with GSAP's unified high-frequency ticker loop
    const updatePhysics = (time: number) => {
      lenis.raf(time * 1000); // GSAP uses seconds; Lenis expects milliseconds
    };
    gsap.ticker.add(updatePhysics);

    return () => {
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      gsap.ticker.remove(updatePhysics);
      lenisRef.current = null;
    };
  }, []);

  return (
    <>
      {children}
      {mounted && process.env.NODE_ENV === "development" && <Agentation />}
    </>
  );
}
