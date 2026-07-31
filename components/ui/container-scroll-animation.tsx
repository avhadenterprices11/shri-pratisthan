"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { LiquidMetal } from "./liquid-metal-button";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 0.6], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.6], [0, -100]);

  return (
    <div
      className="h-[48rem] md:h-[58rem] flex items-center justify-center relative p-2 md:p-10"
      ref={containerRef}
    >
      <div
        className="py-6 md:py-10 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  translate,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        translateY: translate,
      }}
      className="relative max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full p-[6px] rounded-[30px] shadow-2xl overflow-hidden"
    >
      {/* Animated Liquid Metal Border Bezel */}
      <LiquidMetal
        colorBack="#aaaaac"
        colorTint="#ffffff"
        speed={0.4}
        repetition={5}
        distortion={0.12}
        className="absolute inset-0 z-0"
      />

      {/* Inner Content Body */}
      <div className="relative z-10 h-full w-full overflow-hidden rounded-2xl bg-white md:rounded-2xl">
        {children}
      </div>
    </motion.div>
  );
};
