"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Landmark, TrendingUp, Cpu, Compass, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ChapterTwoProps {
  onActiveState: () => void;
}

export function ChapterTwo({ onActiveState }: ChapterTwoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const timelineEvents = [
    {
      year: "2014",
      title: "Mars Orbiter Mission (MOM)",
      subtitle: "Frugal Innovation Milestone",
      desc: "Successfully orbited Mars on the first attempt, costing just $74 million and validating India's high-efficiency aerospace engineering.",
      focus: "TECHNOLOGY",
      icon: <Compass className="w-5 h-5 text-accent-cyan" />,
      metric: "$74M",
      metricLabel: "Mission Budget"
    },
    {
      year: "2020",
      title: "National Space Reforms",
      subtitle: "Deregulating the State Monopoly",
      desc: "Established IN-SPACe to promote and authorize private operators, shifting space programs to commercial speeds.",
      focus: "POLICY",
      icon: <Landmark className="w-5 h-5 text-accent-orange" />,
      metric: "IN-SPACe",
      metricLabel: "Regulatory Body"
    },
    {
      year: "2022",
      title: "Private Launch Era",
      subtitle: "Vikram-S Reaches Sub-Orbit",
      desc: "Skyroot Aerospace launches India's first private rocket, signaling the start of independent commercial launches.",
      focus: "STARTUPS",
      icon: <Rocket className="w-5 h-5 text-accent-cyan" />,
      metric: "Vikram-S",
      metricLabel: "Private Rocket Init"
    },
    {
      year: "2024",
      title: "Startup Acceleration",
      subtitle: "Capital and Infrastructure Flywheel",
      desc: "Venture funding surges with 150+ startups registered and 100% FDI permitted for satellite integration.",
      focus: "CAPITAL",
      icon: <TrendingUp className="w-5 h-5 text-accent-orange" />,
      metric: "150+",
      metricLabel: "Active Space Startups"
    },
    {
      year: "2030+",
      title: "The Horizon Opportunity",
      subtitle: "Capturing Downstream Domination",
      desc: "Targeting a $40B+ space market, launching national space stations, and building low-cost satellite fleets.",
      focus: "HORIZON",
      icon: <Cpu className="w-5 h-5 text-accent-cyan" />,
      metric: "$40B+",
      metricLabel: "Projected Economy Size"
    }
  ];

  useEffect(() => {
    if (!containerRef.current || !leftColRef.current || !rightColRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the left column while the right column scrolls
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftColRef.current,
        pinSpacing: false,
        onToggle: (self) => {
          if (self.isActive) onActiveState();
        }
      });

      // Synchronize year highlight state with scrolling right column items
      const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");
      cards.forEach((card, idx) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              // Highlight the corresponding year link on the left
              gsap.to(`.year-indicator-${idx}`, {
                color: "#FFB800",
                scale: 1.15,
                opacity: 1,
                duration: 0.3
              });
              gsap.to(`.year-dot-${idx}`, {
                backgroundColor: "#FFB800",
                scale: 1.3,
                boxShadow: "0 0 12px #FFB800",
                duration: 0.3
              });
            } else {
              // Dim the corresponding year link
              gsap.to(`.year-indicator-${idx}`, {
                color: "rgba(255, 255, 255, 0.3)",
                scale: 1.0,
                opacity: 0.5,
                duration: 0.3
              });
              gsap.to(`.year-dot-${idx}`, {
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                scale: 1.0,
                boxShadow: "none",
                duration: 0.3
              });
            }
          }
        });

        // Subtly animate card entering
        gsap.fromTo(card,
          { opacity: 0.3, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=10%",
              end: "top center",
              scrub: 1
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onActiveState]);

  return (
    <section 
      id="chapter-2" 
      ref={containerRef} 
      className="relative w-full bg-[#05050f] border-t border-space-border/20 flex flex-col md:flex-row"
    >
      {/* Left Column: Pinned Year Visuals */}
      <div 
        ref={leftColRef} 
        className="w-full md:w-[40%] h-auto md:h-[100dvh] flex flex-col justify-center px-8 lg:px-16 py-12 md:py-0 border-b md:border-b-0 md:border-r border-space-border/20 bg-[#05050f]/80 backdrop-blur-md z-10"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-accent-cyan uppercase mb-2">
          CHAPTER 02 : TRANSFORMATION FLOW
        </span>
        <h2 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tighter leading-none text-white">
          The <br />
          Transformation
        </h2>
        <p className="text-white/50 text-sm max-w-sm mt-4 font-sans leading-relaxed">
          Watch the timeline. Explore how India's space program evolved from an academic monopoly to a hyper-growth private venture stack.
        </p>

        {/* Year Indicators Tracker Panel */}
        <div className="relative mt-12 pl-6 border-l border-white/10 space-y-8 py-2">
          {timelineEvents.map((evt, idx) => (
            <div key={idx} className="flex items-center gap-4 relative">
              <div 
                className={`year-dot-${idx} absolute -left-[29px] w-3 h-3 rounded-full bg-white/15 border border-[#05050f] transition-all`}
              ></div>
              <div 
                className={`year-indicator-${idx} font-mono text-lg font-extrabold tracking-wider text-white/30 transition-all`}
              >
                {evt.year}
              </div>
              <span className="text-[10px] font-mono tracking-widest text-white/20 uppercase">
                &mdash; {evt.focus}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Scrolling Timeline Cards */}
      <div 
        ref={rightColRef} 
        className="w-full md:w-[60%] px-6 lg:px-16 py-32 space-y-48"
      >
        {timelineEvents.map((evt, idx) => (
          <div 
            key={idx} 
            className="timeline-card bg-space-dark/60 border border-white/5 p-8 rounded-3xl relative flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] hover:border-accent-cyan/15 transition-all duration-500"
          >
            <div>
              {/* Category tag */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] text-accent-cyan tracking-[0.2em] uppercase bg-accent-cyan/5 border border-accent-cyan/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                  {evt.icon} {evt.focus} LAYER
                </span>
                <span className="text-4xl font-mono font-extrabold text-white/10 tracking-tight">
                  {evt.year}
                </span>
              </div>

              {/* Heading */}
              <h3 className="text-2xl md:text-3xl font-sans font-extrabold text-white tracking-tight leading-snug">
                {evt.title}
              </h3>
              <p className="text-accent-orange text-xs font-mono font-semibold tracking-wider uppercase mt-1">
                {evt.subtitle}
              </p>

              {/* Description */}
              <p className="text-white/70 text-sm md:text-base leading-relaxed mt-4">
                {evt.desc}
              </p>
            </div>

            {/* Metrics Widget */}
            <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[9px] font-mono text-white/40 tracking-wider uppercase block">Key Marker</span>
                <span className="text-lg font-mono font-extrabold text-white tracking-tight mt-0.5 block">{evt.metric}</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-white/40 tracking-wider uppercase block">Data Context</span>
                <span className="text-xs font-sans text-white/60 mt-1 block">{evt.metricLabel}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
