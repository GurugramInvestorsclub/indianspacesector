"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

function ScrollParagraph({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null);
  
  // Opacity transitions from 0.15 to 1.0 as the paragraph passes 90% to 60% of the viewport height
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 60%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [12, 0]);

  return (
    <motion.p
      ref={ref}
      style={{ opacity, y }}
      className="text-lg md:text-xl text-white/80 font-normal leading-relaxed mb-10 tracking-wide font-sans text-left max-w-2xl"
    >
      {children}
    </motion.p>
  );
}

export function Beginning() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax translation for the portrait image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-45, 45]);

  return (
    <section
      ref={containerRef}
      id="beginning"
      className="relative w-full bg-[#030308] border-b border-white/10 py-32 md:py-48 overflow-hidden"
    >
      {/* Subtle Orbital Background Graphics - very low opacity */}
      <svg
        className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.02] select-none z-0"
        viewBox="0 0 1000 1000"
        fill="none"
      >
        <circle cx="700" cy="500" r="300" stroke="white" strokeWidth="1.5" strokeDasharray="6 12" />
        <circle cx="700" cy="500" r="450" stroke="white" strokeWidth="1" />
        <ellipse cx="700" cy="500" rx="600" ry="250" stroke="white" strokeWidth="1" strokeDasharray="3 6" transform="rotate(-20 700 500)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Portrait of Dr. Vikram Sarabhai - Sticky */}
          <div className="lg:sticky lg:top-28 w-full z-10">
            <div className="relative w-full aspect-[3/4] overflow-hidden border border-white/10 bg-[#05050f] rounded-sm group">
              <motion.div 
                style={{ y: imageY }}
                className="absolute inset-[-15%] w-[130%] h-[130%]"
              >
                <Image
                  src="/vikram_sarabhai.jpg"
                  alt="Dr. Vikram Sarabhai portrait"
                  fill
                  priority
                  sizes="(max-w-1024px) 100vw, 40vw"
                  className="object-cover object-center grayscale contrast-[1.15] brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1200ms] ease-out"
                />
              </motion.div>
              {/* Overlay styling for an editorial photography frame look */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030308]/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 font-mono text-[9px] tracking-widest text-white/40 uppercase">
                Dr. Vikram Sarabhai
              </div>
            </div>
          </div>

          {/* Right Column: Editorial storytelling content */}
          <div className="flex flex-col pt-2 lg:pt-8 z-10">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#00F0FF] mb-4">
              1962–1975
            </span>
            <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-white/50 mb-6">
              THE BEGINNING
            </h2>
            <h3 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-white leading-[1.05] mb-12 max-w-3xl"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              The Man Who Saw Space As A Tool For Development
            </h3>

            {/* Narrative text block */}
            <div className="space-y-6">
              <ScrollParagraph>
                In 1962, as the Cold War superpower space race escalated into a geopolitical spectacle, a quiet decision in New Delhi set India on a fundamentally different trajectory. Dr. Vikram Sarabhai, a Harvard-educated physicist and industrialist, convinced Prime Minister Jawaharlal Nehru that space was not a luxury for a developing nation, but a necessity. Sarabhai argued that to play a meaningful role nationally and internationally, India must be second to none in the application of advanced technologies to the real problems of man and society.
              </ScrollParagraph>

              <ScrollParagraph>
                This vision materialized in INCOSPAR—the Indian National Committee for Space Research. The early team set up operations in Thumba, a tiny fishing village near Trivandrum chosen for its proximity to Earth&apos;s magnetic equator. Lacking laboratories, they worked inside the St. Mary Magdalene Church. Equipment was transported by bicycles and bullock carts, and rocket payloads were integrated in bishop&apos;s offices. On November 21, 1963, a sounding rocket soared into the Thumba skies, signaling the modest but defiant birth of India&apos;s space era.
              </ScrollParagraph>

              <ScrollParagraph>
                By 1969, the experimental committee transitioned into a national institution: the Indian Space Research Organisation (ISRO). Sarabhai’s focus remained unwavering—he did not seek military dominance or vanity missions, but satellite systems that could predict monsoons, guide fishermen, and broadcast educational television to thousands of remote villages. He laid the institutional and intellectual foundations that transformed India from a country launching foreign sounding rockets into a self-reliant space powerhouse.
              </ScrollParagraph>
            </div>
          </div>
        </div>

        {/* Transition Bridge at the bottom of the section */}
        <AryabhataBridge />
      </div>
    </section>
  );
}

function AryabhataBridge() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="relative w-full overflow-hidden border border-white/10 bg-[#05050f] p-8 md:p-16 mt-32 md:mt-48 rounded-sm z-10"
    >
      {/* Background Year Overlay */}
      <div className="absolute right-0 bottom-[-20%] md:bottom-[-30%] font-mono text-[9rem] md:text-[18rem] font-black tracking-tighter text-[#00F0FF]/[0.02] select-none leading-none pointer-events-none">
        1975
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10 relative">
        <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/10 rounded-sm">
          <Image
            src="/aryabhata.png"
            alt="Aryabhata Satellite"
            fill
            sizes="(max-w-768px) 100vw, 45vw"
            className="object-cover grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-700 ease-out"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FF6B00] mb-4">
            First Milestone
          </span>
          <h4 
            className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 uppercase"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Aryabhata
          </h4>
          <p className="text-base text-white/70 leading-relaxed max-w-md mb-8">
            Sovereign orbital entry. The launch of India&apos;s first indigenously designed satellite, establishing the technical foundations of space engineering.
          </p>
          <div className="font-mono text-xs tracking-widest text-[#00F0FF] uppercase flex items-center gap-2">
            <span>Discover the history below</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
