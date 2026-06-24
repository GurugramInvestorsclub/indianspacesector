"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { MonitorPlay } from "lucide-react";
import { gsap } from "gsap";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Beginning } from "@/components/sections/beginning";
import { Aryabhata } from "@/components/sections/aryabhata";
import { TheBuilder } from "@/components/sections/the-builder";
import { LaunchEvolution } from "@/components/sections/launch-evolution";
import { Exploration } from "@/components/sections/exploration";
import { NewEra } from "@/components/sections/new-era";
import { PresenterMode } from "@/components/presenter-mode";

// 31 presentation frames defined in scroll vh units:
const FRAMES = [
  0,    // Hero Overview
  150,  // Beginning Part 1 (Sputnik 1957)
  250,  // Beginning Part 2 (Vikram Sarabhai Portrait)
  360,  // Beginning Part 3 (The Vision Quote)
  470,  // Beginning Part 4 (INCOSPAR Node Network)
  570,  // Beginning Part 5 (Thumba Rocket)
  650,  // Aryabhata Scene 1 (Thirteen years later...)
  750,  // Aryabhata Scene 2 (1975 Milestone Year)
  925,  // Aryabhata Scene 3 & 4 (Sovereign Ascent Satellite & Story)
  1050, // Aryabhata Scene 5 (Legacy Echoes)
  1120, // The Builder Scene 1 (December 1971)
  1220, // The Builder Scene 2 (Satish Dhawan 1972)
  1320, // The Builder Scene 3 (A New Priority)
  1420, // Launch Evolution Intro Text
  1520, // Launch Evolution SLV-3
  1620, // Leadership Lesson (Failure of 1979)
  1720, // Launch Evolution ASLV
  1820, // Launch Evolution PSLV
  1920, // Launch Evolution GSLV
  2020, // Launch Evolution LVM3
  2120, // Launch Evolution SSLV
  2220, // Exploration Act 1 (Moon - Chandrayaan)
  2348, // Exploration Act 2 (Mars - Mangalyaan)
  2484, // Exploration Act 3 (Sun - Aditya L-1)
  2608, // New Era Scene 1 (Transition: For decades...)
  2720, // New Era Scene 2 (Opportunity Chart: $8B to $40B)
  2824, // New Era Scene 3 (Why would companies...)
  2944, // New Era Scene 4 & 5 (Constellation & Jio Proof)
  3080, // New Era Scene 6 (Downstream Use Cases Network Map)
  3184, // New Era Scene 7 (The Big Realization - Railways)
  3320  // New Era Scene 8 (Conclusion / Briefing signup)
];

// Map each frame index to a corresponding Chapter index (1 to 10) for PresenterMode speaker notes
const FRAME_TO_CHAPTER = [
  1,  // Frame 0 (Hero) -> Chapter 1: The Question
  2,  // Frame 1 (Scene 1) -> Chapter 2: Where It All Began
  2,  // Frame 2 (Scene 2) -> Chapter 2: Where It All Began
  2,  // Frame 3 (Scene 3) -> Chapter 2: Where It All Began
  2,  // Frame 4 (Scene 4) -> Chapter 2: Where It All Began
  2,  // Frame 5 (Scene 5) -> Chapter 2: Where It All Began
  3,  // Frame 6 (Aryabhata 1) -> Chapter 3: The Space Stack
  3,  // Frame 7 (Aryabhata 2) -> Chapter 3: The Space Stack
  3,  // Frame 8 (Aryabhata 3) -> Chapter 3: The Space Stack
  3,  // Frame 9 (Aryabhata 4) -> Chapter 3: The Space Stack
  4,  // Frame 10 (The Builder 1) -> Chapter 4: The Builder
  4,  // Frame 11 (The Builder 2) -> Chapter 4: The Builder
  4,  // Frame 12 (The Builder 3) -> Chapter 4: The Builder
  5,  // Frame 13 (LaunchEvolution Intro) -> Chapter 5: The Misconception
  5,  // Frame 14 (LaunchEvolution SLV-3) -> Chapter 5: The Misconception
  5,  // Frame 15 (Leadership Lesson) -> Chapter 5: The Misconception
  5,  // Frame 16 (LaunchEvolution ASLV) -> Chapter 5: The Misconception
  5,  // Frame 17 (LaunchEvolution PSLV) -> Chapter 5: The Misconception
  5,  // Frame 18 (LaunchEvolution GSLV) -> Chapter 5: The Misconception
  5,  // Frame 19 (LaunchEvolution LVM3) -> Chapter 5: The Misconception
  5,  // Frame 20 (LaunchEvolution SSLV) -> Chapter 5: The Misconception
  6,  // Frame 21 (Exploration 1) -> Chapter 6: Defense & Autonomy
  6,  // Frame 22 (Exploration 2) -> Chapter 6: Defense & Autonomy
  6,  // Frame 23 (Exploration 3) -> Chapter 6: Defense & Autonomy
  7,  // Frame 24 (NewEra 1) -> Chapter 7: Global Comparison
  7,  // Frame 25 (NewEra 2) -> Chapter 7: Global Comparison
  8,  // Frame 26 (NewEra 3) -> Chapter 8: Case Studies
  9,  // Frame 27 (NewEra 4 & 5) -> Chapter 9: What Most People Miss
  9,  // Frame 28 (NewEra 6) -> Chapter 9: What Most People Miss
  9,  // Frame 29 (NewEra 7) -> Chapter 9: What Most People Miss
  10  // Frame 30 (NewEra 8) -> Chapter 10: The Opportunity
];

export default function Home() {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [presentationActive, setPresentationActive] = useState(false);
  const [hudOpen, setHudOpen] = useState(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Cinematic smooth scroll helper using GSAP
  const scrollToFrame = (index: number) => {
    if (index < 0 || index >= FRAMES.length) return;
    const targetVh = FRAMES[index];
    const targetScrollY = (targetVh * window.innerHeight) / 100;
    
    // Kill any running scroll animation tween
    if (tweenRef.current) {
      tweenRef.current.kill();
    }
    
    const scrollObj = { y: window.scrollY };
    
    // Animate the window scroll position smoothly over 1.6s
    tweenRef.current = gsap.to(scrollObj, {
      y: targetScrollY,
      duration: 1.6,
      ease: "power3.out",
      onUpdate: () => {
        window.scrollTo(0, scrollObj.y);
      },
      onComplete: () => {
        tweenRef.current = null;
      }
    });
  };

  // Cancel the transition animation if the user manually interrupts it via wheel/touch
  useEffect(() => {
    const handleInterrupt = () => {
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
  }, []);

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

  // Set up click & contextmenu listeners for presentation mode
  useEffect(() => {
    if (!presentationActive) return;

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Ignore click if it is on nav links, buttons, inputs, HUD overlay console, or other control wrappers
      if (
        target.closest(
          "a, button, input, textarea, select, kbd, [role='button'], .interactive-control, .presenter-hud-container"
        )
      ) {
        return;
      }
      
      e.preventDefault();
      // Shift+Click goes back, normal Click advances
      advanceFrame(!e.shiftKey);
    };

    // Right click anywhere on the page to go back
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          "a, button, input, textarea, select, kbd, [role='button'], .interactive-control, .presenter-hud-container"
        )
      ) {
        return;
      }
      e.preventDefault();
      advanceFrame(false);
    };

    window.addEventListener("click", handleGlobalClick);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [presentationActive, advanceFrame]);

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

      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        advanceFrame(true);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "Backspace") {
        e.preventDefault();
        advanceFrame(false);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setPresentationActive(false);
        setHudOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [presentationActive, advanceFrame]);

  // Sync HUD open state with Presentation mode toggle
  const handleToggleHud = (open: boolean) => {
    setHudOpen(open);
    if (open) {
      setPresentationActive(true);
    }
  };

  // Map active chapter to corresponding first frame index when jumping from HUD
  const handleNavigateChapter = (chapterNum: number) => {
    const chapterToFrameIndex: Record<number, number> = {
      1: 0,  // Chapter 1: Hero Overview
      2: 1,  // Chapter 2: Where It All Began
      3: 6,  // Chapter 3: Aryabhata
      4: 10, // Chapter 4: The Builder
      5: 13, // Chapter 5: LaunchEvolution
      6: 21, // Chapter 6: Exploration
      7: 24, // Chapter 7: NewEra intro
      8: 26, // Chapter 8: Case Studies
      9: 27, // Chapter 9: What Most People Miss
      10: 30 // Chapter 10: The Opportunity
    };

    const targetFrameIndex = chapterToFrameIndex[chapterNum];
    if (targetFrameIndex !== undefined) {
      scrollToFrame(targetFrameIndex);
    }
  };

  const activeChapter = FRAME_TO_CHAPTER[currentFrameIndex] || 1;

  return (
    <main className="min-h-screen bg-[#030308] text-white selection:bg-[#FFB800] selection:text-[#030308]">
      <Navbar />
      <Hero />
      <Beginning />
      <Aryabhata />
      <TheBuilder />
      <LaunchEvolution />
      <Exploration />
      <NewEra />

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
        />
      </div>
    </main>
  );
}
