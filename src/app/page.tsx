"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { MonitorPlay, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Speaker } from "@/components/sections/speaker";
import { Disclaimer } from "@/components/sections/disclaimer";
import { DeepTechWebinars } from "@/components/sections/webinars";
import { Beginning } from "@/components/sections/beginning";
import { Aryabhata } from "@/components/sections/aryabhata";
import { TheBuilder } from "@/components/sections/the-builder";
import { LaunchEvolution } from "@/components/sections/launch-evolution";
import { Exploration } from "@/components/sections/exploration";
import { NewEra } from "@/components/sections/new-era";
import { PresenterMode } from "@/components/presenter-mode";

// 39 presentation frames defined in scroll vh units, aligned to the center of each scene's active visibility range:
const FRAMES = [
  0,    // 0: Hero Overview
  100,  // 1: Your Speaker Profile
  200,  // 2: Disclaimer
  300,  // 3: DeepTech Webinars
  450,  // 4: Beginning Part 1 (Sputnik 1957)
  565,  // 5: Beginning Part 2 (Vikram Sarabhai Portrait)
  665,  // 6: Beginning Part 3 (The Vision Quote)
  765,  // 7: Beginning Part 4 (INCOSPAR Node Network)
  865,  // 8: Beginning Part 5 (Thumba Rocket)
  950,  // 9: Aryabhata Scene 1 (Thirteen years later...)
  1050, // 10: Aryabhata Scene 2 (1975 Milestone Year)
  1230, // 11: Aryabhata Scene 3 & 4 (Sovereign Ascent Satellite & Story)
  1360, // 12: Aryabhata Scene 5 (Legacy Echoes)
  1465, // 13: The Builder Scene 1 (December 1971)
  1600, // 14: The Builder Scene 2 (Satish Dhawan 1972)
  1720, // 15: The Builder Scene 3 (A New Priority)
  1780, // 16: The Builder Scene 3 Sub (Build The Rockets Directive)
  1840, // 17: Launch Evolution Intro Text
  1930, // 18: Launch Evolution SLV-3
  2030, // 19: Leadership Lesson (Failure of 1979)
  2140, // 20: Launch Evolution ASLV
  2240, // 21: Launch Evolution PSLV
  2350, // 22: Launch Evolution GSLV
  2450, // 23: Launch Evolution LVM3
  2540, // 24: Launch Evolution SSLV
  2630, // 25: Exploration Act 1 (Moon - Background Only)
  2680, // 26: Exploration Act 1 (Moon - Chandrayaan Text)
  2790, // 27: Exploration Act 2 (Mars - Mangalyaan)
  2920, // 28: Exploration Act 3 (Sun - Aditya L-1)
  3030, // 29: New Era Scene 1 (Transition: For decades...)
  3075, // 30: New Era Scene 1 Sub 1B (Sector Privatization)
  3160, // 31: New Era Scene 2 (Opportunity Chart: $8B to $40B)
  3260, // 32: New Era Scene 3 (Why would companies...)
  3360, // 33: New Era Scene 4 & 5 (Constellation)
  3425, // 34: New Era Scene 5 Sub (Jio Proof)
  3520, // 35: New Era Scene 6 (Downstream Use Cases Network Map)
  3630, // 36: New Era Scene 7 (The Big Realization - Railways)
  3735, // 37: New Era Scene 8 (Conclusion / The Frontier Opens)
  3770  // 38: New Era Scene 8 Sub (Conclusion / The Next Chapter Climax)
];


// Map each frame index to a corresponding Chapter index (1 to 10) for PresenterMode speaker notes
const FRAME_TO_CHAPTER = [
  1,  // Frame 0 (Hero) -> Chapter 1: The Question
  1,  // Frame 1 (Speaker) -> Chapter 1: The Question
  1,  // Frame 2 (Disclaimer) -> Chapter 1: The Question
  1,  // Frame 3 (Webinars) -> Chapter 1: The Question
  2,  // Frame 4 (Scene 1) -> Chapter 2: Where It All Began
  2,  // Frame 5 (Scene 2) -> Chapter 2: Where It All Began
  2,  // Frame 6 (Scene 3) -> Chapter 2: Where It All Began
  2,  // Frame 7 (Scene 4) -> Chapter 2: Where It All Began
  2,  // Frame 8 (Scene 5) -> Chapter 2: Where It All Began
  3,  // Frame 9 (Aryabhata 1) -> Chapter 3: The Space Stack
  3,  // Frame 10 (Aryabhata 2) -> Chapter 3: The Space Stack
  3,  // Frame 11 (Aryabhata 3) -> Chapter 3: The Space Stack
  3,  // Frame 12 (Aryabhata 4) -> Chapter 3: The Space Stack
  4,  // Frame 13 (The Builder 1) -> Chapter 4: The Builder
  4,  // Frame 14 (The Builder 2) -> Chapter 4: The Builder
  4,  // Frame 15 (The Builder 3) -> Chapter 4: The Builder
  4,  // Frame 16 (The Builder 3 Sub) -> Chapter 4: The Builder
  5,  // Frame 17 (LaunchEvolution Intro) -> Chapter 5: The Misconception
  5,  // Frame 18 (LaunchEvolution SLV-3) -> Chapter 5: The Misconception
  5,  // Frame 19 (Leadership Lesson) -> Chapter 5: The Misconception
  5,  // Frame 20 (LaunchEvolution ASLV) -> Chapter 5: The Misconception
  5,  // Frame 21 (LaunchEvolution PSLV) -> Chapter 5: The Misconception
  5,  // Frame 22 (LaunchEvolution GSLV) -> Chapter 5: The Misconception
  5,  // Frame 23 (LaunchEvolution LVM3) -> Chapter 5: The Misconception
  5,  // Frame 24 (LaunchEvolution SSLV) -> Chapter 5: The Misconception
  6,  // Frame 25 (Exploration 1 - Background Only) -> Chapter 6: Defense & Autonomy
  6,  // Frame 26 (Exploration 1 - Text) -> Chapter 6: Defense & Autonomy
  6,  // Frame 27 (Exploration 2) -> Chapter 6: Defense & Autonomy
  6,  // Frame 28 (Exploration 3) -> Chapter 6: Defense & Autonomy
  7,  // Frame 29 (NewEra 1) -> Chapter 7: Global Comparison
  7,  // Frame 30 (NewEra 2) -> Chapter 7: Global Comparison
  7,  // Frame 31 (NewEra Opportunity Chart) -> Chapter 7: Global Comparison
  8,  // Frame 32 (NewEra 3) -> Chapter 8: Case Studies
  9,  // Frame 33 (NewEra 4 & 5) -> Chapter 9: What Most People Miss
  9,  // Frame 34 (NewEra Jio Proof) -> Chapter 9: What Most People Miss
  9,  // Frame 35 (NewEra 6) -> Chapter 9: What Most People Miss
  9,  // Frame 36 (NewEra 7) -> Chapter 9: What Most People Miss
  10, // Frame 37 (NewEra 8) -> Chapter 10: The Opportunity
  10  // Frame 38 (NewEra 8 Climax) -> Chapter 10: The Opportunity
];

interface PresentationScene {
  id: string;
  name: string;
  label: string;
  startFrame: number;
  endFrame: number;
}

const PRESENTATION_SCENES: PresentationScene[] = [
  { id: "hero", name: "The Challenge", label: "01 / 39", startFrame: 0, endFrame: 0 },
  { id: "speaker", name: "Your Speaker", label: "02 / 39", startFrame: 1, endFrame: 1 },
  { id: "disclaimer", name: "Disclaimer", label: "03 / 39", startFrame: 2, endFrame: 2 },
  { id: "webinars", name: "DeepTech Webinars", label: "04 / 39", startFrame: 3, endFrame: 3 },
  { id: "sputnik", name: "Where It All Began", label: "05 / 39", startFrame: 4, endFrame: 4 },
  { id: "sarabhai", name: "The Visionary", label: "06 / 39", startFrame: 5, endFrame: 5 },
  { id: "vision", name: "The Core Philosophy", label: "07 / 39", startFrame: 6, endFrame: 6 },
  { id: "incospar", name: "INCOSPAR Node Network", label: "08 / 39", startFrame: 7, endFrame: 7 },
  { id: "thumba", name: "Thumba Sounding Rocket", label: "09 / 39", startFrame: 8, endFrame: 8 },
  { id: "aryabhata-intro", name: "The Aryabhata Era", label: "10 / 39", startFrame: 9, endFrame: 9 },
  { id: "milestone-1975", name: "1975 Satellite Milestone", label: "11 / 39", startFrame: 10, endFrame: 10 },
  { id: "sovereign-ascent", name: "Aryabhata Orbital Success", label: "12 / 39", startFrame: 11, endFrame: 11 },
  { id: "legacy-echoes", name: "Early Space Footprints", label: "13 / 39", startFrame: 12, endFrame: 12 },
  { id: "loss-sarabhai", name: "Loss of the Architect", label: "14 / 39", startFrame: 13, endFrame: 13 },
  { id: "dhawan-charge", name: "Satish Dhawan Takes Charge", label: "15 / 39", startFrame: 14, endFrame: 14 },
  { id: "new-priority", name: "Rocket Blueprint & Assembly", label: "16 / 39", startFrame: 15, endFrame: 15 },
  { id: "build-the-rockets", name: "Build The Rockets Directive", label: "17 / 39", startFrame: 16, endFrame: 16 },
  { id: "launch-intro", name: "The Launcher Bottleneck", label: "18 / 39", startFrame: 17, endFrame: 17 },
  { id: "slv3", name: "First Launcher: SLV-3", label: "19 / 39", startFrame: 18, endFrame: 18 },
  { id: "failure-1979", name: "Leadership: 1979 Failure", label: "20 / 39", startFrame: 19, endFrame: 19 },
  { id: "aslv", name: "Booster Tech: ASLV", label: "21 / 39", startFrame: 20, endFrame: 20 },
  { id: "pslv", name: "Trusted Workhorse: PSLV", label: "22 / 39", startFrame: 21, endFrame: 21 },
  { id: "gslv", name: "Cryo Breakthrough: GSLV", label: "23 / 39", startFrame: 22, endFrame: 22 },
  { id: "lvm3", name: "Heavy Lift: LVM3", label: "24 / 39", startFrame: 23, endFrame: 23 },
  { id: "sslv", name: "On-Demand Launch: SSLV", label: "25 / 39", startFrame: 24, endFrame: 24 },
  { id: "moon-bg", name: "Moon Mission: Chandrayaan (Visual)", label: "26 / 39", startFrame: 25, endFrame: 25 },
  { id: "moon", name: "Moon Mission: Chandrayaan", label: "27 / 39", startFrame: 26, endFrame: 26 },
  { id: "mars", name: "Interplanetary: Mangalyaan", label: "28 / 39", startFrame: 27, endFrame: 27 },
  { id: "sun", name: "Solar Observation: Aditya L-1", label: "29 / 39", startFrame: 28, endFrame: 28 },
  { id: "commercial-ascent", name: "Decades of Growth", label: "30 / 39", startFrame: 29, endFrame: 29 },
  { id: "privatization", name: "Sector Privatization Influx", label: "31 / 39", startFrame: 30, endFrame: 30 },
  { id: "market-growth", name: "Opportunity Scaling to $40B", label: "32 / 39", startFrame: 31, endFrame: 31 },
  { id: "why-launch", name: "Why Do Companies Launch?", label: "33 / 39", startFrame: 32, endFrame: 32 },
  { id: "constellations", name: "Global Constellation Demand", label: "34 / 39", startFrame: 33, endFrame: 33 },
  { id: "jio-proof", name: "Broadband Proof: Jio", label: "35 / 39", startFrame: 34, endFrame: 34 },
  { id: "downstream-soft", name: "Downstream Network Map", label: "36 / 39", startFrame: 35, endFrame: 35 },
  { id: "railways-realization", name: "Downstream Infrastructure", label: "37 / 39", startFrame: 36, endFrame: 36 },
  { id: "opportunity-sign", name: "Conclusion: The Frontier", label: "38 / 39", startFrame: 37, endFrame: 37 },
  { id: "climax-statement", name: "Conclusion: The Next Chapter", label: "39 / 39", startFrame: 38, endFrame: 38 }
];

const SECTIONS = [
  { name: "Hero", frames: [0] },
  { name: "Speaker", frames: [1] },
  { name: "Disclaimer", frames: [2] },
  { name: "Webinars", frames: [3] },
  { name: "Beginning", frames: [4, 5, 6, 7, 8] },
  { name: "Aryabhata", frames: [9, 10, 11, 12] },
  { name: "TheBuilder", frames: [13, 14, 15, 16] },
  { name: "LaunchEvolution", frames: [17, 18, 19, 20, 21, 22, 23, 24] },
  { name: "Exploration", frames: [25, 26, 27, 28] },
  { name: "NewEra", frames: [29, 30, 31, 32, 33, 34, 35, 36, 37, 38] }
];

export default function Home() {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [presentationActive, setPresentationActive] = useState(false);
  const [hudOpen, setHudOpen] = useState(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Cinematic smooth scroll helper using Lenis or GSAP
  const scrollToFrame = (index: number) => {
    if (index < 0 || index >= FRAMES.length) return;
    const targetVh = FRAMES[index];
    const targetScrollY = (targetVh * window.innerHeight) / 100;
    
    // Check if lenis is available globally
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(targetScrollY, {
        duration: 1.2,
        force: true // ensures it scrolls even if some other system thinks it shouldn't
      });
    } else {
      // Kill any running scroll animation tween (fallback to GSAP)
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
      
      const scrollObj = { y: window.scrollY };
      
      // Animate the window scroll position smoothly over 1.2s with power3.inOut ease
      tweenRef.current = gsap.to(scrollObj, {
        y: targetScrollY,
        duration: 1.2,
        ease: "power3.inOut",
        onUpdate: () => {
          window.scrollTo(0, scrollObj.y);
        },
        onComplete: () => {
          tweenRef.current = null;
        }
      });
    }
  };

  // Section State Machine Helpers
  const getActiveSection = useCallback((frameIndex: number) => {
    return SECTIONS.find(sec => sec.frames.includes(frameIndex)) || SECTIONS[0];
  }, []);

  const getLocalStateIndex = useCallback((frameIndex: number) => {
    const sec = getActiveSection(frameIndex);
    return sec.frames.indexOf(frameIndex);
  }, [getActiveSection]);

  const getStateCount = useCallback(() => {
    const sec = getActiveSection(currentFrameIndex);
    return sec.frames.length;
  }, [currentFrameIndex, getActiveSection]);

  const isFirstState = currentFrameIndex === 0;
  const isLastState = currentFrameIndex === FRAMES.length - 1;

  const nextState = useCallback(() => {
    if (currentFrameIndex < FRAMES.length - 1) {
      scrollToFrame(currentFrameIndex + 1);
    }
  }, [currentFrameIndex]);

  const previousState = useCallback(() => {
    if (currentFrameIndex > 0) {
      scrollToFrame(currentFrameIndex - 1);
    }
  }, [currentFrameIndex]);

  const goToState = useCallback((index: number) => {
    const sec = getActiveSection(currentFrameIndex);
    if (index >= 0 && index < sec.frames.length) {
      scrollToFrame(sec.frames[index]);
    }
  }, [currentFrameIndex, getActiveSection]);

  // Sync presentation active status with URL parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("presentation") === "true") {
      setPresentationActive(true);
    }
  }, []);

  // Lock manual scroll events when presentation mode is active
  useEffect(() => {
    if (!presentationActive) return;

    const preventDefault = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Add scroll lock event listeners in capture phase to intercept before Lenis or standard scroll can process them
    window.addEventListener("wheel", preventDefault, { passive: false, capture: true });
    window.addEventListener("touchmove", preventDefault, { passive: false, capture: true });

    // Inject presentation scrollbar hiding classes
    document.documentElement.classList.add("presentation-active");
    document.body.classList.add("presentation-active");

    return () => {
      window.removeEventListener("wheel", preventDefault, { capture: true });
      window.removeEventListener("touchmove", preventDefault, { capture: true });
      document.documentElement.classList.remove("presentation-active");
      document.body.classList.remove("presentation-active");
    };
  }, [presentationActive]);

  // Cancel the transition animation if the user manually interrupts it via wheel/touch (only when presentation mode is off)
  useEffect(() => {
    const handleInterrupt = () => {
      if (presentationActive) return; // ignore manual interrupts during presentation mode
      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }
    };

    window.addEventListener("wheel", handleInterrupt, { passive: true });
    window.addEventListener("touchmove", handleInterrupt, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleInterrupt);
      window.removeEventListener("touchmove", handleInterrupt);
    };
  }, [presentationActive]);

  // Sync currentFrameIndex dynamically with manual window scroll position
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollVh = (window.scrollY / window.innerHeight) * 100;
      
      let closestIdx = 0;
      let minDiff = Infinity;
      for (let i = 0; i < FRAMES.length; i++) {
        const diff = Math.abs(FRAMES[i] - currentScrollVh);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = i;
        }
      }
      setCurrentFrameIndex(closestIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Frame navigation helper (forward or backward) calculated from current scroll position
  const advanceFrame = useCallback((forward: boolean = true) => {
    const currentScrollVh = (window.scrollY / window.innerHeight) * 100;
    let targetIndex = 0;
    
    if (forward) {
      // Find first frame that is significantly ahead of current scroll
      const index = FRAMES.findIndex(f => f > currentScrollVh + 12);
      targetIndex = index !== -1 ? index : FRAMES.length - 1;
    } else {
      // Find last frame that is significantly behind current scroll
      const reversedIndex = [...FRAMES].reverse().findIndex(f => f < currentScrollVh - 12);
      targetIndex = reversedIndex !== -1 ? FRAMES.length - 1 - reversedIndex : 0;
    }
    
    scrollToFrame(targetIndex);
  }, []);

  // Centralized Scene Controller Methods for Presentation Mode
  const nextScene = useCallback(() => {
    nextState();
  }, [nextState]);

  const previousScene = useCallback(() => {
    previousState();
  }, [previousState]);

  const goToScene = useCallback((sceneIndex: number) => {
    if (sceneIndex < 0 || sceneIndex >= PRESENTATION_SCENES.length) return;
    const targetFrame = PRESENTATION_SCENES[sceneIndex].startFrame;
    scrollToFrame(targetFrame);
  }, []);

  // Set up click & contextmenu listeners for presentation mode
  useEffect(() => {
    if (!presentationActive) return;

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Ignore click if it is on nav links, buttons, inputs, HUD overlay, or presentation control containers
      if (
        target.closest(
          "a, button, input, textarea, select, kbd, [role='button'], .interactive-control, .presenter-hud-container, .presentation-controls"
        )
      ) {
        return;
      }
      
      e.preventDefault();
      // Shift+Click goes back, normal Click advances
      if (e.shiftKey) {
        previousState();
      } else {
        nextState();
      }
    };

    // Right click anywhere on the page to go back
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          "a, button, input, textarea, select, kbd, [role='button'], .interactive-control, .presenter-hud-container, .presentation-controls"
        )
      ) {
        return;
      }
      e.preventDefault();
      previousState();
    };

    window.addEventListener("click", handleGlobalClick);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [presentationActive, nextState, previousState]);

  // Set up keyboard listeners for presentation mode
  useEffect(() => {
    if (!presentationActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Spacebar, ArrowRight, ArrowDown, Enter advance
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        nextState();
      } 
      // ArrowLeft, ArrowUp, Backspace go back
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "Backspace") {
        e.preventDefault();
        previousState();
      } 
      // Block page scrolling keys
      else if (e.key === "PageDown" || e.key === "PageUp" || e.key === "Home" || e.key === "End") {
        e.preventDefault();
      }
      // Escape to exit
      else if (e.key === "Escape") {
        e.preventDefault();
        setPresentationActive(false);
        setHudOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [presentationActive, nextState, previousState]);

  // Sync HUD open state with Presentation mode toggle
  const handleToggleHud = (open: boolean) => {
    setHudOpen(open);
    if (open) {
      setPresentationActive(true);
    }
  };

  const handleNavigateChapter = (chapterNum: number) => {
    const chapterToFrameIndex: Record<number, number> = {
      1: 0,  // Chapter 1: Hero Overview / Speaker / Disclaimer / Webinars
      2: 4,  // Chapter 2: Where It All Began (Sputnik starts at Frame 4 now)
      3: 9,  // Chapter 3: Aryabhata (starts at Frame 9 now)
      4: 13, // Chapter 4: The Builder (starts at Frame 13 now)
      5: 17, // Chapter 5: LaunchEvolution (starts at Frame 17 now)
      6: 25, // Chapter 6: Exploration (starts at Frame 25 now)
      7: 29, // Chapter 7: NewEra intro (starts at Frame 29 now)
      8: 32, // Chapter 8: Case Studies (starts at Frame 32 now)
      9: 33, // Chapter 9: What Most People Miss (starts at Frame 33 now)
      10: 37 // Chapter 10: The Opportunity (starts at Frame 37 now)
    };

    const targetFrameIndex = chapterToFrameIndex[chapterNum];
    if (targetFrameIndex !== undefined) {
      scrollToFrame(targetFrameIndex);
    }
  };

  const activeChapter = FRAME_TO_CHAPTER[currentFrameIndex] || 1;

  // Resolve current active scene for HUD indicator
  const activeScene = PRESENTATION_SCENES.find(
    (s) => currentFrameIndex >= s.startFrame && currentFrameIndex <= s.endFrame
  ) || PRESENTATION_SCENES[0];

  return (
    <main className="min-h-screen bg-[#030308] text-white selection:bg-[#FFB800] selection:text-[#030308]">
      <Navbar />
      <Hero />
      <Speaker />
      <Disclaimer />
      <DeepTechWebinars presentationActive={presentationActive} />
      <Beginning />
      <Aryabhata />
      <TheBuilder />
      <LaunchEvolution />
      <Exploration />
      <NewEra />

      {/* Top-Right Presentation Mode Toggle Button */}
      <div className="fixed top-20 right-6 z-40 font-mono text-xs">
        <div className="flex items-center gap-3 bg-[#030308]/75 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
          <span className="text-white/60 tracking-wider uppercase text-[9px] font-bold">Presentation Mode</span>
          <div className="flex items-center bg-black/40 border border-white/5 rounded-full p-0.5">
            <button
              onClick={() => {
                setPresentationActive(true);
              }}
              className={`px-3 py-0.5 rounded-full text-[9px] font-bold tracking-widest transition-all ${
                presentationActive 
                  ? "bg-[#FFB800] text-[#030308]" 
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              ON
            </button>
            <button
              onClick={() => {
                setPresentationActive(false);
                setHudOpen(false);
              }}
              className={`px-3 py-0.5 rounded-full text-[9px] font-bold tracking-widest transition-all ${
                !presentationActive 
                  ? "bg-white/15 text-white" 
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              OFF
            </button>
          </div>
        </div>
      </div>

      {/* Bottom-Right Floating Controls & Scene Indicator */}
      {presentationActive && (
        <div className="fixed bottom-6 right-6 z-40 font-mono flex flex-col gap-2 pointer-events-auto presentation-controls">
          <div className="bg-[#030308]/80 border border-white/10 backdrop-blur-md px-5 py-4 rounded-xl shadow-2xl flex flex-col gap-3 min-w-[280px]">
            
            {/* Scene Indicator & Title */}
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-[#FFB800] font-bold tracking-widest uppercase">
                {activeScene.label}
              </span>
              <span className="text-sm font-semibold tracking-wide text-white font-sans uppercase">
                {activeScene.name}
              </span>
            </div>

            {/* Progress line */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#FFB800] transition-all duration-500 ease-out" 
                style={{ 
                  width: `${((PRESENTATION_SCENES.indexOf(activeScene) + 1) / PRESENTATION_SCENES.length) * 100}%` 
                }}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4 mt-1">
              <button
                onClick={previousScene}
                disabled={currentFrameIndex === 0}
                className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/50 hover:text-white disabled:opacity-30 disabled:hover:text-white/50 transition-colors bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-md cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>

              <button
                onClick={nextScene}
                disabled={currentFrameIndex === FRAMES.length - 1}
                className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#FFB800] hover:text-[#FFC830] disabled:opacity-30 disabled:hover:text-[#FFB800] transition-colors bg-[#FFB800]/10 hover:bg-[#FFB800]/20 border border-[#FFB800]/20 px-3 py-1.5 rounded-md cursor-pointer"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Presentation Mode Toggle Badge (Bottom-Left) */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2 font-mono">
        <button
          onClick={() => {
            const nextActive = !presentationActive;
            setPresentationActive(nextActive);
            if (!nextActive) {
              setHudOpen(false);
            }
          }}
          className={`interactive-control px-4 py-2 rounded-full border text-[10px] font-bold tracking-wider transition-all duration-300 flex items-center gap-2 backdrop-blur-md shadow-lg cursor-pointer ${
            presentationActive
              ? "bg-[#FFB800]/15 border-[#FFB800] text-[#FFB800] shadow-[#FFB800]/10"
              : "bg-[#030308]/80 border-white/10 text-white/60 hover:text-white hover:border-white/20"
          }`}
        >
          <MonitorPlay className={`w-3.5 h-3.5 ${presentationActive ? "animate-pulse" : ""}`} />
          <span>PRESENTER CLICKER: {presentationActive ? "ACTIVE" : "ON"}</span>
        </button>
      </div>

      {/* Bottom Center Presentation Help Hint overlay */}
      {presentationActive && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none animate-fade-in hidden md:block">
          <div className="bg-[#050512]/90 backdrop-blur-md border border-[#FFB800]/20 px-5 py-2.5 rounded-full flex items-center gap-4 text-[9px] font-mono tracking-widest text-white/50 uppercase shadow-lg shadow-black/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] animate-pulse"></span>
            <span>Left-Click: Next Frame</span>
            <span className="opacity-30">|</span>
            <span>Right-Click: Prev Frame</span>
            <span className="opacity-30">|</span>
            <span>Arrow Keys: Navigate</span>
            <span className="opacity-30">|</span>
            <span>Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded border border-white/20 text-white text-[8px] font-bold">P</kbd> for HUD</span>
          </div>
        </div>
      )}

      {/* Presenter Mode Speaker Notes Console Overlay */}
      <div className="presenter-hud-container">
        <PresenterMode 
          activeChapter={activeChapter} 
          onNavigateChapter={handleNavigateChapter}
          isOpen={hudOpen}
          onToggleOpen={handleToggleHud}
          onPrevState={previousState}
          onNextState={nextState}
          isFirstState={isFirstState}
          isLastState={isLastState}
        />
      </div>
    </main>
  );
}
