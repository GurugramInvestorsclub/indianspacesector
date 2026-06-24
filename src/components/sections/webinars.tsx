"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Play, X, Calendar, User, BookOpen, ChevronRight, CheckCircle2, Send, Sparkles } from "lucide-react";

interface Webinar {
  id: string;
  category: string;
  title: string;
  date: string;
  image: string;
  description: string;
  speaker: string;
  duration: string;
  syllabus: string[];
  takeaways: string[];
  courseLink?: string;
}

const WEBINARS: Webinar[] = [
  {
    id: "space",
    category: "SPACE REVOLUTION",
    title: "India's Space Revolution",
    date: "28th June",
    image: "/webinar_space.jpg",
    speaker: "Rahul Rao, CFA",
    duration: "90 Minutes",
    description: "Understanding ISRO, launch vehicles, satellites, privatization and the emerging opportunities in the Indian space ecosystem.",
    syllabus: [
      "The Historical Foundation: Sputnik to Thumba soundings",
      "The Infrastructure Stack: SLV, PSLV, GSLV, and LVM3 capability deep dives",
      "Privatization & Policy: The role of IN-SPACe, NSIL, and private space startups",
      "Ecosystem Economics: Satellite broadband, downstream applications, and global launch markets"
    ],
    takeaways: [
      "Comprehensive framework for valuing launch vs. downstream satellite services",
      "Detailed analysis of the Indian private space landscape (Dhruva, Pixxel, Skyroot, Agnikul)",
      "Understanding policy changes and FDI allowance in space technologies"
    ]
  },
  {
    id: "nuclear",
    category: "NUCLEAR RENAISSANCE",
    title: "India's Nuclear Renaissance",
    date: "18th April 2026",
    image: "/webinar_nuclear.png",
    speaker: "Rahul Rao, CFA",
    duration: "75 Minutes",
    description: "A deep dive into nuclear energy, SMRs, HALEU, fuel cycles and the companies enabling India's nuclear future.",
    syllabus: [
      "The Three-Stage Nuclear Program: India's unique thorium pathway",
      "Small Modular Reactors (SMRs): Decentralized industrial power and private investment models",
      "Fuel Cycles & Enrichment: HALEU, fuel sourcing, and strategic uranium stockpiles",
      "Industrial Partners: Public and private suppliers manufacturing reactor cores and turbines"
    ],
    takeaways: [
      "Deep understanding of India's baseload power requirements and the role of nuclear",
      "Mapped list of private suppliers, fabricators, and heavy engineering firms in the supply chain",
      "The commercial viability and timelines of SMRs in the Indian industrial sector"
    ],
    courseLink: "https://superprofile.bio/course/d51f7a8f-6e7e-4b88-898a-b2353f8cfd49"
  },
  {
    id: "aerospace",
    category: "AEROSPACE & DEFENCE",
    title: "India's Aerospace & Defence Opportunity",
    date: "23rd May",
    image: "/webinar_aerospace.jpg",
    speaker: "Rahul Rao, CFA",
    duration: "105 Minutes",
    description: "Exploring defence manufacturing, aerospace supply chains, engines, avionics and India's strategic ambitions.",
    syllabus: [
      "The Indigenization Mandate: Analyzing negative import lists and defence acquisition policies",
      "Aerospace Manufacturing: Fighter aircraft (Tejas), utility helicopters, and tactical UAV systems",
      "Propulsion Frontiers: The engineering and geopolitical challenge of indigenous jet engines",
      "Defence Electronics & Avionics: Sensors, radar arrays, and battle management suites"
    ],
    takeaways: [
      "Understanding the procurement cycles and budget allocation dynamics of the MoD",
      "Identification of key tier-1 and tier-2 aerospace suppliers in private corridors",
      "Technical breakdown of avionics and engine technology bottlenecks and investment opportunities"
    ],
    courseLink: "https://superprofile.bio/course/a8699cb8-7e46-4508-8444-927dbb9c625f"
  }
];

interface DeepTechWebinarsProps {
  presentationActive?: boolean;
}

export function DeepTechWebinars({ presentationActive = false }: DeepTechWebinarsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);
  const [registeredWebinarId, setRegisteredWebinarId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState<"syllabus" | "takeaways">("syllabus");

  // Dismiss modal if presentation mode is activated
  React.useEffect(() => {
    if (presentationActive) {
      setSelectedWebinar(null);
    }
  }, [presentationActive]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scroll animations for cinematic entrance
  const opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [40, 0, 0, -40]);

  const handleRegister = (e: React.FormEvent, webinarId: string) => {
    e.preventDefault();
    if (!email || !name) return;
    // Simulate API registration
    setRegisteredWebinarId(webinarId);
    setTimeout(() => {
      setSelectedWebinar(null);
      setRegisteredWebinarId(null);
      setEmail("");
      setName("");
    }, 2000);
  };

  return (
    <section
      ref={containerRef}
      id="webinars"
      className="relative w-full min-h-[100vh] bg-[#030308] flex flex-col justify-center overflow-hidden py-24 border-b border-white/10"
    >
      {/* Background Aesthetics */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] pointer-events-none" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] rounded-full bg-radial from-[#FFB800]/[0.005] to-transparent blur-[150px] pointer-events-none" />
      
      {/* Slow moving particles or stars background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#FFB800]/30 rounded-full animate-pulse" style={{ animationDuration: "3s" }} />
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" style={{ animationDuration: "4.5s" }} />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-[#FFB800]/25 rounded-full animate-pulse" style={{ animationDuration: "6s" }} />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white/15 rounded-full animate-pulse" style={{ animationDuration: "5s" }} />
      </div>

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 w-full max-w-7xl px-6 md:px-12 lg:px-16 mx-auto flex flex-col justify-center"
      >
        {/* Header Block */}
        <div className="text-left mb-16 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#FFB800]" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#FFB800] uppercase font-bold">
              PLATFORM RESEARCH SERIES
            </span>
          </div>
          {/* Title: Styled as h2 to automatically inherit the Georgia serif editorial style from globals.css */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 uppercase select-none">
            DEEPTECH WEBINARS
          </h2>
          <p className="font-sans text-base md:text-lg text-white/65 leading-relaxed tracking-wide">
            Explore India&apos;s most important technology revolutions through first-principles research.
          </p>
        </div>

        {/* Cinematic Webinar Panels Container (Swipeable on mobile, Grid on desktop) */}
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0">
          {WEBINARS.map((webinar, index) => (
            <div
              key={webinar.id}
              className={`min-w-[290px] sm:min-w-[340px] md:min-w-0 snap-center flex-shrink-0 group ${
                presentationActive ? "pointer-events-none select-none" : "cursor-pointer"
              }`}
              onClick={() => setSelectedWebinar(webinar)}
            >
              {/* Cinematic Panel Cover */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#050510] border border-white/10 shadow-2xl transition-all duration-500 ease-out group-hover:border-[#FFB800]/30 group-hover:shadow-[0_0_30px_rgba(255,184,0,0.08)]">
                
                {/* Full Resolution Poster Image */}
                <Image
                  src={webinar.image}
                  alt={webinar.title}
                  fill
                  sizes="(max-w-768px) 340px, 400px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  priority={index === 0}
                />

                {/* Subtle Radial Vignette overlay to tie image to dark theme */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-transparent opacity-80" />

                {/* Technical Grid Overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />

                {/* Hover Play Glow Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/35 backdrop-blur-[2px]">
                  <div className="w-14 h-14 rounded-full bg-[#FFB800] text-[#030308] flex items-center justify-center shadow-lg shadow-[#FFB800]/20 transform scale-90 group-hover:scale-100 transition-transform duration-500 ease-out">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Date Tag Overlay */}
                <div className="absolute top-4 left-4 z-10 bg-[#030308]/85 backdrop-blur-md border border-white/10 px-3 py-1 rounded-md">
                  <span className="font-mono text-[9px] tracking-widest text-[#FFB800] uppercase font-bold flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" /> {webinar.date}
                  </span>
                </div>
              </div>

              {/* Text Info Below Image */}
              <div className="mt-5 space-y-2 text-left">
                <span className="font-mono text-[10px] tracking-widest text-[#FFB800]/80 font-bold uppercase">
                  {webinar.category}
                </span>
                <h3 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-white transition-colors duration-300 group-hover:text-[#FFB800]">
                  {webinar.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed line-clamp-2 font-sans font-normal">
                  {webinar.description}
                </p>
                
                <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-white/40 group-hover:text-white/60 transition-colors">
                  <span>Explore Research Briefing</span>
                  <ChevronRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Immersive Detail Modal & Register Overlay */}
      <AnimatePresence>
        {selectedWebinar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-4xl bg-[#050512] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedWebinar(null)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 border border-white/10 text-white/60 hover:text-white hover:border-white/25 hover:scale-105 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Body Layout */}
              <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-0">
                
                {/* Left Side: Media Coverage & Syllabus */}
                <div className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between bg-black/40">
                  <div>
                    {/* Visual Media Poster Block (Simulating streaming player) */}
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-white/5 shadow-inner mb-6 group">
                      <Image
                        src={selectedWebinar.image}
                        alt={selectedWebinar.title}
                        fill
                        className="object-cover opacity-70 group-hover:scale-102 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center justify-center shadow-lg shadow-black/40 hover:bg-[#FFB800] hover:text-[#030308] hover:border-[#FFB800] hover:scale-105 transition-all duration-300 cursor-pointer">
                          <Play className="w-5 h-5 fill-current translate-x-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-black/75 px-2 py-0.5 rounded text-[9px] font-mono text-white/55 uppercase tracking-widest">
                        Preview Trailer
                      </div>
                    </div>

                    <span className="font-mono text-[9px] tracking-[0.2em] text-[#FFB800] uppercase font-bold">
                      {selectedWebinar.category}
                    </span>
                    {/* Styled as h3 to inherit the Georgia serif editorial style */}
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1 mb-3">
                      {selectedWebinar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-6 font-sans">
                      {selectedWebinar.description}
                    </p>

                    {/* Metadata indicators */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-b border-white/5 py-3 mb-6 font-mono text-[10px] text-white/40">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#FFB800]" />
                        <span>Date: <strong className="text-white/80">{selectedWebinar.date}</strong></span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-white/10" />
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#FFB800]" />
                        <span>Speaker: <strong className="text-white/80">{selectedWebinar.speaker}</strong></span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-white/10" />
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#FFB800]" />
                        <span>Duration: <strong className="text-white/80">{selectedWebinar.duration}</strong></span>
                      </div>
                    </div>

                    {/* Syllabus / Takeaways Tabs */}
                    <div className="flex gap-4 border-b border-white/5 pb-2 mb-4 font-mono text-[10px]">
                      <button
                        onClick={() => setActiveTab("syllabus")}
                        className={`pb-1.5 font-bold tracking-wider uppercase transition-colors border-b-2 cursor-pointer ${
                          activeTab === "syllabus"
                            ? "text-[#FFB800] border-[#FFB800]"
                            : "text-white/40 border-transparent hover:text-white/60"
                        }`}
                      >
                        Webinar Agenda
                      </button>
                      <button
                        onClick={() => setActiveTab("takeaways")}
                        className={`pb-1.5 font-bold tracking-wider uppercase transition-colors border-b-2 cursor-pointer ${
                          activeTab === "takeaways"
                            ? "text-[#FFB800] border-[#FFB800]"
                            : "text-white/40 border-transparent hover:text-white/60"
                        }`}
                      >
                        Key Takeaways
                      </button>
                    </div>

                    {/* Tab Content */}
                    <div className="space-y-3 min-h-[160px] text-left">
                      {activeTab === "syllabus" ? (
                        selectedWebinar.syllabus.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                            <span className="font-mono text-[#FFB800] font-bold shrink-0">0{idx + 1}.</span>
                            <p className="text-white/70 leading-relaxed font-sans">{item}</p>
                          </div>
                        ))
                      ) : (
                        selectedWebinar.takeaways.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                            <CheckCircle2 className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
                            <p className="text-white/70 leading-relaxed font-sans">{item}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side: High-End Registration Form */}
                <div className="p-6 sm:p-8 flex flex-col justify-center bg-gradient-to-br from-[#050512] to-[#0a0a22]">
                  <div className="w-full max-w-sm mx-auto text-left">
                    
                    <div className="bg-[#FFB800]/5 border border-[#FFB800]/10 p-4 rounded-xl mb-6">
                      <div className="flex gap-2.5">
                        <Sparkles className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
                        <div className="text-[11px] font-mono text-white/70 leading-relaxed">
                          <span className="text-[#FFB800] font-bold">EXCLUSIVITY BRIEF:</span> This briefing session is restricted to professional investors, builders, and deep-tech enthusiasts. Registration is mandatory to receive the PDF research dossier and calendar invites.
                        </div>
                      </div>
                    </div>

                    <div className="text-lg font-bold text-white font-sans mb-1 uppercase tracking-wide">
                      Reserve Your Briefing Seat
                    </div>
                    <p className="text-[11px] font-mono text-white/45 mb-6 uppercase">
                      NO FEES REQUIRED • DIGITAL CERTIFICATE OF ACCESS
                    </p>

                    <AnimatePresence mode="wait">
                      {selectedWebinar.courseLink ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="py-6 flex flex-col gap-4 text-left"
                        >
                          <p className="text-xs text-white/60 font-sans leading-relaxed">
                            This briefing is hosted externally. Click below to register and secure your seat on Superprofile.
                          </p>
                          
                          <a
                            href={selectedWebinar.courseLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-[#FFB800] hover:bg-[#FFC700] text-[#030308] font-bold py-3.5 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#FFB800]/10 hover:shadow-[#FFB800]/20 hover:-translate-y-0.5 cursor-pointer text-xs uppercase tracking-widest font-mono text-center"
                          >
                            <span>REGISTER ON SUPERPROFILE</span>
                            <Send className="w-3.5 h-3.5" />
                          </a>
                        </motion.div>
                      ) : registeredWebinarId === selectedWebinar.id ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="py-12 flex flex-col items-center justify-center text-center gap-3 bg-emerald-500/[0.02] border border-emerald-500/20 rounded-xl"
                        >
                          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-1">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                          <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest">
                            ACCESS GRANTED
                          </span>
                          <p className="text-xs text-white/60 font-sans max-w-[220px]">
                            Check your inbox for coordinates and preparation briefing.
                          </p>
                        </motion.div>
                      ) : (
                        <motion.form
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onSubmit={(e) => handleRegister(e, selectedWebinar.id)}
                          className="space-y-4 font-mono text-xs"
                        >
                          <div>
                            <label className="block text-white/50 text-[10px] uppercase tracking-wider mb-2 font-bold">
                              Full Name
                            </label>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="e.g. Rahul Rao"
                              className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/25 focus:border-[#FFB800] focus:ring-1 focus:ring-[#FFB800] outline-none transition-all font-sans"
                            />
                          </div>

                          <div>
                            <label className="block text-white/50 text-[10px] uppercase tracking-wider mb-2 font-bold">
                              Professional Email
                            </label>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="e.g. rahul@firstprinciples.in"
                              className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/25 focus:border-[#FFB800] focus:ring-1 focus:ring-[#FFB800] outline-none transition-all font-sans"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-[#FFB800] hover:bg-[#FFC700] text-[#030308] font-bold py-3.5 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#FFB800]/10 hover:shadow-[#FFB800]/20 hover:-translate-y-0.5 cursor-pointer text-xs uppercase tracking-widest mt-6"
                          >
                            <span>SECURE COMPLIANCE SEAT</span>
                            <Send className="w-3.5 h-3.5" />
                          </button>

                          <p className="text-[9px] text-white/25 leading-relaxed text-center mt-4">
                            By submitting you agree to receive follow-up research dossiers. Zero spam, unsubscribe with 1-click.
                          </p>
                        </motion.form>
                      )}
                    </AnimatePresence>

                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
