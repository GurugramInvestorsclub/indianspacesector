"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  RotateCcw, 
  Clock, 
  BookOpen, 
  Menu, 
  Layers, 
  ChevronRight, 
  ChevronLeft,
  X,
  Search
} from "lucide-react";

interface SpeakerNote {
  title: string;
  notes: string[];
}

const SPEAKER_NOTES: Record<number, SpeakerNote> = {
  1: {
    title: "Chapter 1: The Question",
    notes: [
      "HOOK: Space is not about colonization or exploration; it's about the invisible digital infrastructure running modern life.",
      "METRIC: 90% of global transactions and navigation rely on satellite coordinates.",
      "KEY POINT: Downstream services (sat-comm, banking sync, weather monitoring, agricultural yield estimation) are the true value drivers.",
      "TRANSITION: Introduce the idea that space is the new digital substrate, not a distant sandbox."
    ]
  },
  2: {
    title: "Chapter 2: Where It All Began",
    notes: [
      "HOOK: India's space journey did not begin with Chandrayaan or PSLV. It began with a vision in 1957 after Sputnik shocked the world.",
      "THE GLOBAL RACE: Sputnik 1 marked the dawn of the Space Age. While superpowers saw military prestige, Vikram Sarabhai saw developmental potential.",
      "THE VISIONARY: Dr. Vikram Sarabhai believed space technology could solve India's greatest developmental challenges - communication, education, and weather forecasting.",
      "INCOSPAR (1962): Sarabhai and Homi J. Bhabha established the Indian National Committee for Space Research, the foundation stone of India's space program.",
      "THUMBA (1963): Launched the first sounding rocket from Thumba, Kerala, near the magnetic equator. A tiny church and fishing village sparked a revolution."
    ]
  },
  3: {
    title: "Chapter 3: The Space Stack",
    notes: [
      "THE Bloomberg Moment: Explain this diagram from the bottom up.",
      "Layer 1: Component hardware is highly specialized and has high gross margins (70%+).",
      "Layer 2: Launchers are the bottleneck, but private firms (Skyroot, Agnikul) are introducing customized orbits.",
      "Layer 3: Downstream applications (Data, Defense, Insights) hold the highest valuation multiples (15x-20x EV/Revenue).",
      "ACTION: Click nodes to show the interdependencies live to the audience."
    ]
  },
  4: {
    title: "Chapter 4: The Builder",
    notes: [
      "LOSS OF THE ARCHITECT: Vikram Sarabhai passed away in December 1971. He did not live to witness Aryabhata's orbit in 1975.",
      "ENTER SATISH DHAWAN (1972): Took charge of ISRO. An engineer-academician, Dhawan brought systemic rigor, aerospace standards, and wind tunnels.",
      "A NEW PRIORITY: India could build satellites, but had no independent launcher. Satellites sat on the ground waiting for foreign slots.",
      "THE DIRECTIVE: Dhawan established a single, defining priority: BUILD THE ROCKETS. Without launchers, India could never be a true spacefaring nation."
    ]
  },
  5: {
    title: "Chapter 5: The Misconception",
    notes: [
      "DEBUNK: 'Rockets are the space opportunity' is false.",
      "ANALOGY: Launchers are the railways; the money is made on the goods shipped and the cities built along the line.",
      "INSIGHT: Launch represents only 5% of space economy revenues. Applications, analytics, and navigation dominate the other 95%.",
      "LEADERSHIP LESSON (1979 Failure): The first launch of SLV-3 failed. Satish Dhawan took the blame at the press conference. When it succeeded in 1980, Dhawan told Kalam to lead the press conference. Kalam's takeaway: 'A leader absorbs failure, and distributes success.'",
      "TRANSITION: Direct the focus to defense and high-priority applications."
    ]
  },
  6: {
    title: "Chapter 6: Defense & Autonomy",
    notes: [
      "GEOPOLITICS: Space is the ultimate high ground. Autonomy in space is a matter of national security.",
      "TOPICS: ISR (Intelligence, Surveillance, Reconnaissance) is crucial for border monitoring.",
      "NavIC: India's independent GPS equivalent, guaranteeing tracking without foreign reliance.",
      "MARKET: Government defense procurement remains the largest capital sponsor of space hardware."
    ]
  },
  7: {
    title: "Chapter 7: Global Comparison",
    notes: [
      "COST ADVANTAGE: India satellite manufacturing is 30-40% cheaper than Europe or the US due to engineering talent cost margins.",
      "LAUNCH LIMITS: USA (via SpaceX) dominates payload mass, but India is catching up rapidly in private sector launcher capacity.",
      "REGULATORY: USA has high ITAR constraints, Europe is fragmented; India offers a fast-launch alternative for commercial satellite constellations."
    ]
  },
  8: {
    title: "Chapter 8: Case Studies",
    notes: [
      "ANNOUNCE: Introduce our detailed research papers.",
      "NOTE: Highly recommend attendees to check out these routes (/chapters/[slug]) on their own devices.",
      "CASE STUDY METRIC: Earth Observation downstream software market is growing at a 18% CAGR."
    ]
  },
  9: {
    title: "Chapter 9: What Most People Miss",
    notes: [
      "INSIGHT 1: Ground Segment underappreciation. Everyone looks at launchers, but ground stations are steady cash-flow utilities.",
      "INSIGHT 2: Data is the product. Raw imagery is cheap; vectorized tracking of crop health or maritime routes is gold."
    ]
  },
  10: {
    title: "Chapter 10: The Opportunity",
    notes: [
      "CLOSING CALL: India's space economy is scaling from $8B to $44B+ by 2040.",
      "SUMMARY: The stack is integrated. Private capital, government support, and cost-advantages are aligned.",
      "FINAL STATEMENT: 'India's Space Revolution Has Only Just Begun.' Invite questions."
    ]
  }
};

interface PresenterModeProps {
  activeChapter: number;
  onNavigateChapter: (chapterNum: number) => void;
  isOpen?: boolean;
  onToggleOpen?: (isOpen: boolean) => void;
  onPrevState?: () => void;
  onNextState?: () => void;
  isFirstState?: boolean;
  isLastState?: boolean;
}

export function PresenterMode({ 
  activeChapter, 
  onNavigateChapter,
  isOpen: controlledIsOpen,
  onToggleOpen,
  onPrevState,
  onNextState,
  isFirstState = false,
  isLastState = false
}: PresenterModeProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  
  const toggleOpen = () => {
    if (onToggleOpen) {
      onToggleOpen(!isOpen);
    } else {
      setInternalIsOpen(!isOpen);
    }
  };

  const closePresenter = () => {
    if (onToggleOpen) {
      onToggleOpen(false);
    } else {
      setInternalIsOpen(false);
    }
  };

  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Avoid hydration issues by mounting client-side only
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Listen to keyboard shortcut 'P'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "p" && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        toggleOpen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onToggleOpen]);

  // Timer runner
  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive]);

  const formatTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setElapsedTime(0);
  };

  const currentNotes = SPEAKER_NOTES[activeChapter] || { title: `Chapter ${activeChapter}`, notes: ["No notes for this chapter."] };

  // Filtered chapters for quick search
  const chapterList = [
    { num: 1, title: "1. The Question" },
    { num: 2, title: "2. The Transformation" },
    { num: 3, title: "3. The Space Stack" },
    { num: 4, title: "4. The Builder" },
    { num: 5, title: "5. The Misconception" },
    { num: 6, title: "6. Defense & Autonomy" },
    { num: 7, title: "7. Global Comparison" },
    { num: 8, title: "8. Case Studies" },
    { num: 9, title: "9. What Most People Miss" },
    { num: 10, title: "10. The Opportunity" }
  ];

  const filteredChapters = chapterList.filter(ch => 
    ch.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isClient) return null;

  return (
    <>


      {/* Main Presenter Overlay Console */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#020205]/95 flex flex-col font-sans select-none border border-space-border/20">
          
          {/* Header Panel */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-space-border bg-[#050510] text-white">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan flex items-center gap-2">
                <Layers className="w-4 h-4" /> PRESENTER MODE ACTIVE
              </span>
              <div className="hidden md:flex items-center gap-2 bg-white/5 border border-space-border px-3 py-1 rounded-md text-xs">
                <Search className="w-3.5 h-3.5 text-white/55" />
                <input
                  type="text"
                  placeholder="Quick jump..."
                  className="bg-transparent outline-none text-white text-xs w-32 focus:w-48 transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Timer HUD */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-[#090918] border border-space-border px-4 py-2 rounded-lg font-mono">
                <Clock className="w-4 h-4 text-accent-orange" />
                <span className="text-sm font-semibold tracking-wider text-white">
                  ELAPSED: {formatTime(elapsedTime)}
                </span>
                <button 
                  onClick={() => setTimerActive(!timerActive)}
                  className="ml-2 hover:text-accent-cyan transition-colors"
                >
                  <Play className={`w-3.5 h-3.5 ${timerActive ? "fill-white/80" : ""}`} />
                </button>
                <button 
                  onClick={resetTimer}
                  className="ml-1 hover:text-accent-orange transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
              <button 
                onClick={closePresenter}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Console Grid Layout */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-[#04040a]">
            
            {/* Left Column: Chapters Navigation */}
            <div className="lg:col-span-3 border-r border-space-border flex flex-col overflow-y-auto bg-[#04040c]/80 p-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-3 px-2">Presentation Flow</span>
              <div className="space-y-1">
                {filteredChapters.map((ch) => (
                  <button
                    key={ch.num}
                    onClick={() => {
                      onNavigateChapter(ch.num);
                    }}
                    className={`w-full text-left px-3 py-3 rounded-lg flex items-center justify-between transition-all ${
                      activeChapter === ch.num
                        ? "bg-[#0b0b20] border border-accent-cyan/30 text-accent-cyan"
                        : "hover:bg-white/5 border border-transparent text-white/70 hover:text-white"
                    }`}
                  >
                    <span className="text-xs font-medium font-mono">{ch.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                ))}
              </div>
            </div>

            {/* Middle Column: Current Chapter & Speaker Notes */}
            <div className="lg:col-span-6 flex flex-col p-6 overflow-y-auto border-r border-space-border">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-space-border/50">
                <div>
                  <span className="text-accent-cyan text-[10px] font-mono uppercase tracking-[0.2em]">Active Chapter notes</span>
                  <h2 className="text-xl font-bold tracking-tight text-white mt-1">{currentNotes.title}</h2>
                </div>
                <BookOpen className="w-5 h-5 text-accent-cyan/80" />
              </div>

              {/* Speaker Notes Bullet Cards */}
              <div className="space-y-4 flex-1">
                {currentNotes.notes.map((note, index) => {
                  let isBoldKeyword = note.startsWith("HOOK:") || note.startsWith("METRIC:") || note.startsWith("KEY POINT:") || note.startsWith("TRANSITION:") || note.startsWith("DEBUNK:") || note.startsWith("ANALOGY:") || note.startsWith("INSIGHT:") || note.startsWith("GEOPOLITICS:") || note.startsWith("COST ADVANTAGE:") || note.startsWith("LAUNCH LIMITS:") || note.startsWith("REGULATORY:") || note.startsWith("ANNOUNCE:") || note.startsWith("SUMMARY:") || note.startsWith("FINAL STATEMENT:");
                  let splitIndex = note.indexOf(":");
                  
                  return (
                    <div 
                      key={index} 
                      className="bg-[#0b0b18] border border-space-border/60 hover:border-accent-cyan/20 p-4 rounded-xl transition-all duration-300 shadow-md flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center text-[10px] font-mono text-accent-cyan mt-0.5 shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-sm text-white/90 leading-relaxed">
                        {isBoldKeyword ? (
                          <>
                            <span className="text-accent-cyan font-bold tracking-wider mr-1.5">
                              {note.substring(0, splitIndex + 1)}
                            </span>
                            {note.substring(splitIndex + 1)}
                          </>
                        ) : note}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Presenter Footer Control Keys */}
              <div className="mt-6 pt-4 border-t border-space-border/50 flex justify-between items-center text-[10px] font-mono text-white/40">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan"></span>
                  Keyboard Shortcuts Active:
                </div>
                <div className="flex items-center gap-3">
                  <span>Toggle HUD: <kbd className="bg-white/10 px-1 py-0.5 rounded text-white font-bold">P</kbd></span>
                  <span>Previous: <kbd className="bg-white/10 px-1 py-0.5 rounded text-white font-bold">Left</kbd></span>
                  <span>Next: <kbd className="bg-white/10 px-1 py-0.5 rounded text-white font-bold">Right</kbd></span>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Status & Global Slide Deck Metrics */}
            <div className="lg:col-span-3 p-6 overflow-y-auto flex flex-col justify-between bg-[#04040c]/40">
              
              <div>
                <div className="mb-6">
                  <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest block mb-2">Webinar Metrics</span>
                  <div className="bg-[#080814] border border-space-border p-4 rounded-xl space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/60">Estimated Audience</span>
                      <span className="text-xs font-mono font-bold text-accent-cyan">420 Live</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/60">Current Status</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">Stream Stable</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/60">Frames Per Second</span>
                      <span className="text-xs font-mono font-bold text-accent-orange">60 FPS</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/60">Presenter Connection</span>
                      <span className="text-xs font-mono font-bold text-accent-cyan">Dual Link</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest block mb-2">Presentation Progress</span>
                  <div className="bg-[#080814] border border-space-border p-4 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span>Completed Chapters</span>
                      <span className="font-mono font-bold text-white">{activeChapter} / 10</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent-cyan transition-all duration-500 ease-out" 
                        style={{ width: `${(activeChapter / 10) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-[10px] font-mono text-white/40 text-right mt-1">
                      {Math.round((activeChapter / 10) * 100)}% Slide Weight
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Prev/Next buttons in Presenter Mode */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  disabled={isFirstState}
                  onClick={onPrevState}
                  className="bg-white/5 hover:bg-white/15 disabled:opacity-40 disabled:hover:bg-white/5 py-3 rounded-lg flex items-center justify-center gap-1.5 border border-space-border transition-all text-xs font-mono text-white"
                >
                  <ChevronLeft className="w-4 h-4" /> PREV
                </button>
                <button
                  disabled={isLastState}
                  onClick={onNextState}
                  className="bg-accent-cyan/15 hover:bg-accent-cyan/25 border border-accent-cyan/30 text-accent-cyan py-3 rounded-lg flex items-center justify-center gap-1.5 transition-all text-xs font-mono disabled:opacity-40"
                >
                  NEXT <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}
