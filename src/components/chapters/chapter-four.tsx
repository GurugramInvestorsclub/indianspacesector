"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Info, HelpCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ChapterFourProps {
  onActiveState: () => void;
}

export function ChapterFour({ onActiveState }: ChapterFourProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !triggerRef.current || !headline1Ref.current || !headline2Ref.current || !statsRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onToggle: (self) => {
            if (self.isActive) onActiveState();
          }
        }
      });

      // 1. Initial State: "Most people think rockets are the opportunity" is highlighted.
      // 2. Scroll: Fade out headline 1, fade in headline 2
      tl.to(headline1Ref.current, {
        opacity: 0.15,
        scale: 0.96,
        duration: 1
      });

      tl.to(headline2Ref.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2
      }, "-=0.6");

      // 3. Scroll: Reveal downstream comparison statistics
      tl.to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2
      }, "+=0.2");

      // Keep screen state
      tl.to({}, { duration: 0.8 });

    }, containerRef);

    return () => ctx.revert();
  }, [onActiveState]);

  return (
    <div ref={containerRef}>
      {/* Scroll Trigger Wrapper */}
      <section 
        ref={triggerRef} 
        className="relative w-full h-[100dvh] bg-[#020206] flex flex-col justify-center items-center px-6 overflow-hidden"
      >
        {/* Background grids */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020206]/70 to-[#020206] z-0"></div>

        {/* Section badge */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
          <span className="font-mono text-[10px] tracking-[0.25em] text-accent-cyan uppercase bg-space-black/60 px-4 py-1.5 rounded-full border border-space-border/55 backdrop-blur-md">
            CHAPTER 04 : THE PARADIGM SHIFT
          </span>
        </div>

        <div className="max-w-6xl w-full flex flex-col items-center justify-center relative z-10 text-center">
          
          {/* Headline 1: The Misconception */}
          <h1 
            ref={headline1Ref}
            className="text-4xl md:text-6xl lg:text-7xl font-sans font-extrabold tracking-tighter leading-none text-white max-w-4xl"
          >
            "Most people believe <br />
            <span className="text-accent-orange uppercase">Rockets & Launch</span> represent the primary opportunity."
          </h1>

          {/* Headline 2: The Downstream Reveal */}
          <h2 
            ref={headline2Ref}
            className="text-3xl md:text-5xl lg:text-6xl font-sans font-extrabold tracking-tighter leading-tight text-white mt-12 max-w-4xl opacity-0 translate-y-16 scale-95"
          >
            But rockets are just <span className="text-accent-cyan italic font-light">the railway tracks.</span> <br />
            The real wealth accumulates in <span className="text-accent-cyan uppercase">the cargo.</span>
          </h2>

          {/* Comparative Metrics Panel */}
          <div 
            ref={statsRef}
            className="mt-16 w-full max-w-4xl opacity-0 translate-y-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
          >
            {/* Launch Sector */}
            <div className="bg-[#050510] border border-white/5 p-6 rounded-2xl flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
              <div>
                <span className="font-mono text-[10px] text-accent-orange uppercase tracking-widest block mb-2">
                  Upstream: Launch Services
                </span>
                <p className="text-white/60 text-xs font-sans leading-relaxed">
                  Building, firing, and operating rocket platforms. High capital expenditure, long lead-times, and heavy payload risk.
                </p>
              </div>
              <div className="mt-8">
                <span className="text-[10px] font-mono text-white/40 block">Global Sector Valuation Share</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl lg:text-4xl font-mono font-extrabold text-white">~5%</span>
                  <span className="text-xs font-mono text-[#ff4c4c] flex items-center gap-0.5">
                    (Lower Multiple)
                  </span>
                </div>
                {/* Visual Bar */}
                <div className="w-full h-1 bg-white/5 rounded-full mt-3 overflow-hidden">
                  <div className="w-[5%] h-full bg-accent-orange"></div>
                </div>
              </div>
            </div>

            {/* Downstream Applications Sector */}
            <div className="bg-[#050510] border border-accent-cyan/10 p-6 rounded-2xl flex flex-col justify-between shadow-[0_0_15px_rgba(0,240,255,0.02)]">
              <div>
                <span className="font-mono text-[10px] text-accent-cyan uppercase tracking-widest block mb-2">
                  Downstream: Data & Applications
                </span>
                <p className="text-white/60 text-xs font-sans leading-relaxed">
                  Aggregating orbital data, processing insights, satellite communication subscriptions, and intelligence-as-a-service.
                </p>
              </div>
              <div className="mt-8">
                <span className="text-[10px] font-mono text-white/40 block">Global Sector Valuation Share</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl lg:text-4xl font-mono font-extrabold text-white">~95%</span>
                  <span className="text-xs font-mono text-emerald-400">
                    (High Multiple 15x+)
                  </span>
                </div>
                {/* Visual Bar */}
                <div className="w-full h-1 bg-white/5 rounded-full mt-3 overflow-hidden">
                  <div className="w-[95%] h-full bg-accent-cyan"></div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Aha! Badge footer */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none">
          <HelpCircle className="w-4 h-4 text-accent-cyan" />
          <span className="font-mono text-[10px] tracking-wider text-white/40 uppercase">
            Aha! Moment 02 &mdash; Downstream Arbitrage
          </span>
        </div>

      </section>
    </div>
  );
}
