"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function Disclaimer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax translation & fade in/out for seamless presentation transitions
  const opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [40, 0, 0, -40]);

  return (
    <section
      ref={containerRef}
      id="disclaimer"
      className="relative w-full min-h-[100vh] bg-[#030308] flex flex-col justify-between overflow-hidden pt-24"
    >
      {/* Background grid pattern & atmospheric ambient glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <div className="absolute top-[30%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-[#FFB800]/[0.008] blur-[130px] pointer-events-none" />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 w-full max-w-7xl px-8 md:px-16 mx-auto my-auto flex flex-col justify-center"
      >
        {/* Title: Styled as a div to bypass the Georgia serif !important override on h1-h6 in globals.css */}
        <div className="text-3xl md:text-4xl lg:text-5xl font-sans font-black tracking-wider text-[#FFB800] mb-8 uppercase select-none">
          DISCLAIMER
        </div>

        {/* Disclaimer text content as a single contiguous paragraph */}
        <p className="font-sans text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose text-white/80 text-justify tracking-wide max-w-[95%]">
          This presentation is for educational and informational purposes only and does not constitute investment advice, a research report, or a recommendation to buy, sell, or hold any security. It is not a solicitation or offer to deal in any security. The companies, sectors, and securities discussed are referenced solely to illustrate the analytical framework and themes presented; their inclusion is not a recommendation.{" "}
          <span className="bg-[#FFB800] text-[#030308] px-2 py-0.5 rounded-[2px] font-bold inline-block md:inline">
            The speaker and / or associated persons may hold positions in one or more of the securities mentioned, and those positions may change at any time without notice.
          </span>{" "}
          All information drawn from sources believed to be reliable and from publicly available primary documents, but no representation or warranty, express or implied, is made as to its accuracy, completeness, or timeliness. Forward-looking statements and management guidance referenced herein are subject to change and inherent uncertainty. Past performance is not indicative of future results. Investing in securities carries risk, including possible loss of principal. Recipients should conduct their own independent due diligence and consult a SEBI-registered investment adviser before making any investment decision. The speaker accepts no liability for any loss arising from reliance on this material.
        </p>
      </motion.div>

      {/* Bottom border hazard stripe tape spanning full width, matching the user's screenshot exactly */}
      <div 
        className="w-full h-8 md:h-10 mt-auto opacity-100 z-20" 
        style={{
          background: "repeating-linear-gradient(45deg, #FFB800, #FFB800 20px, #030308 20px, #030308 40px)"
        }}
      />
    </section>
  );
}

