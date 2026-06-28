"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PresentationController } from "./use-presentation";

// ---------------------------------------------------------------------------
// PresentationChrome
// ---------------------------------------------------------------------------
// The shared on-screen furniture for the deck's presentation system: the
// top-right ON/OFF toggle, the bottom-right "Present [P]" entry button, the
// floating clicker control bar, and the scroll-progress dots. Lifted straight
// out of the Paradigm Shift page so every chapter looks and behaves the same.
// ---------------------------------------------------------------------------

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export interface PresentationScene {
  id: string;
  name: string;
  label: string;
  startFrame: number;
  endFrame: number;
}

function FirstPrinciplesLogo() {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 select-none pointer-events-none bg-[#03030b]/60 px-3.5 py-2 rounded-full border border-white/10 backdrop-blur-md shadow-lg">
      {/* Icon: Gold circle with neural network brain */}
      <svg width="18" height="18" viewBox="0 0 22 22" fill="none" className="w-4.5 h-4.5 shrink-0 opacity-90">
        <circle cx="11" cy="11" r="10" stroke="#FFB800" strokeWidth="1" />
        {/* Brain outline path */}
        <path
          d="M11 6C9.2 6 8.2 7.0 8.2 8.5C8.2 9.0 8.3 9.3 8.4 9.6C7.5 10.2 7.0 11.0 7.0 12.0C7.0 13.5 8.2 14.5 9.5 14.5C9.8 14.5 10.1 14.4 10.4 14.3C10.7 15.0 11.4 15.5 12.2 15.5C13.0 15.5 13.7 15.0 14.0 14.3C14.3 14.4 14.6 14.5 14.9 14.5C16.2 14.5 17.4 13.5 17.4 12.0C17.4 11.0 16.9 10.2 16.0 9.6C16.1 9.3 16.2 9.0 16.2 8.5C16.2 7.0 15.2 6 13.4 6H11Z"
          stroke="#FFB800"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-70"
        />
        {/* Neural Network Nodes */}
        <circle cx="10" cy="8" r="0.6" fill="#FFB800" />
        <circle cx="12" cy="7.5" r="0.6" fill="#FFB800" />
        <circle cx="14" cy="8" r="0.6" fill="#FFB800" />
        <circle cx="9.5" cy="10" r="0.6" fill="#FFB800" />
        <circle cx="11.5" cy="9.5" r="0.6" fill="#FFB800" />
        <circle cx="13.5" cy="10" r="0.6" fill="#FFB800" />
        <circle cx="15.5" cy="9.5" r="0.6" fill="#FFB800" />
        <circle cx="10.5" cy="11.5" r="0.6" fill="#FFB800" />
        <circle cx="12.5" cy="11.5" r="0.6" fill="#FFB800" />
        <circle cx="14.5" cy="11" r="0.6" fill="#FFB800" />
        <circle cx="11.5" cy="13.5" r="0.6" fill="#FFB800" />
        <circle cx="13.5" cy="13" r="0.6" fill="#FFB800" />
        {/* Node connections */}
        <line x1="10" y1="8" x2="12" y2="7.5" stroke="#FFB800" strokeWidth="0.4" className="opacity-40" />
        <line x1="12" y1="7.5" x2="14" y2="8" stroke="#FFB800" strokeWidth="0.4" className="opacity-40" />
        <line x1="10" y1="8" x2="9.5" y2="10" stroke="#FFB800" strokeWidth="0.4" className="opacity-40" />
        <line x1="12" y1="7.5" x2="11.5" y2="9.5" stroke="#FFB800" strokeWidth="0.4" className="opacity-40" />
        <line x1="14" y1="8" x2="13.5" y2="10" stroke="#FFB800" strokeWidth="0.4" className="opacity-40" />
        <line x1="14" y1="8" x2="15.5" y2="9.5" stroke="#FFB800" strokeWidth="0.4" className="opacity-40" />
        <line x1="9.5" y1="10" x2="11.5" y2="9.5" stroke="#FFB800" strokeWidth="0.4" className="opacity-40" />
        <line x1="11.5" y1="9.5" x2="13.5" y2="10" stroke="#FFB800" strokeWidth="0.4" className="opacity-40" />
        <line x1="13.5" y1="10" x2="15.5" y2="9.5" stroke="#FFB800" strokeWidth="0.4" className="opacity-40" />
        <line x1="9.5" y1="10" x2="10.5" y2="11.5" stroke="#FFB800" strokeWidth="0.4" className="opacity-40" />
        <line x1="11.5" y1="9.5" x2="10.5" y2="11.5" stroke="#FFB800" strokeWidth="0.4" className="opacity-40" />
        <line x1="11.5" y1="9.5" x2="12.5" y2="11.5" stroke="#FFB800" strokeWidth="0.4" className="opacity-40" />
        <line x1="13.5" y1="10" x2="12.5" y2="11.5" stroke="#FFB800" strokeWidth="0.4" className="opacity-40" />
        <line x1="13.5" y1="10" x2="14.5" y2="11" stroke="#FFB800" strokeWidth="0.4" className="opacity-40" />
        <line x1="15.5" y1="9.5" x2="14.5" y2="11" stroke="#FFB800" strokeWidth="0.4" className="opacity-40" />
        <line x1="10.5" y1="11.5" x2="11.5" y2="13.5" stroke="#FFB800" strokeWidth="0.4" className="opacity-40" />
        <line x1="12.5" y1="11.5" x2="11.5" y2="13.5" stroke="#FFB800" strokeWidth="0.4" className="opacity-40" />
        <line x1="12.5" y1="11.5" x2="13.5" y2="13" stroke="#FFB800" strokeWidth="0.4" className="opacity-40" />
        <line x1="14.5" y1="11" x2="13.5" y2="13" stroke="#FFB800" strokeWidth="0.4" className="opacity-40" />
      </svg>
      {/* Brand Text */}
      <span className="font-sans text-[10px] font-medium tracking-wide flex items-center gap-1 select-none">
        <span className="text-white/90">First Principles</span>
        <span className="text-[#FFB800] font-semibold">Investing</span>
      </span>
    </div>
  );
}

export function PresentationChrome({
  controller,
}: {
  controller: PresentationController;
  scenes?: PresentationScene[];
}) {
  const {
    totalFrames,
    presentationActive,
    currentFrameIndex,
    hudOpen,
    elapsedTime,
    isTransitioning,
    nextSlide,
    prevSlide,
    enter,
    exit,
  } = controller;

  return (
    <>
      {/* Brand Logo - Fixed at bottom left on all frames */}
      <FirstPrinciplesLogo />

      {/* Top-right Presentation Mode toggle */}
      <div className="fixed top-20 right-6 z-40 font-mono text-xs">
        <div className="flex items-center gap-3 bg-[#030308]/75 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
          <span className="text-white/60 tracking-wider uppercase text-[9px] font-bold">
            Presentation Mode
          </span>
          <div className="flex items-center bg-black/40 border border-white/5 rounded-full p-0.5">
            <button
              onClick={enter}
              className={`px-3 py-0.5 rounded-full text-[9px] font-bold tracking-widest transition-all interactive-control ${
                presentationActive
                  ? "bg-[#FFB800] text-[#030308]"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              ON
            </button>
            <button
              onClick={exit}
              className={`px-3 py-0.5 rounded-full text-[9px] font-bold tracking-widest transition-all interactive-control ${
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

      {/* Floating clicker control bar */}
      <AnimatePresence>
        {presentationActive && hudOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 bg-[#0a0a14]/80 border border-white/10 rounded-full pl-4 pr-2 py-1.5 shadow-2xl backdrop-blur-xl hud-overlay opacity-40 hover:opacity-100 transition-opacity duration-300"
          >
            <button
              onClick={prevSlide}
              disabled={currentFrameIndex === 0 || isTransitioning}
              className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-25 transition-all cursor-pointer interactive-control"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-[10px] text-white/70 tabular-nums w-9 text-center">
              {currentFrameIndex + 1} / {totalFrames}
            </span>
            <button
              onClick={nextSlide}
              disabled={currentFrameIndex === totalFrames - 1 || isTransitioning}
              className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-25 transition-all cursor-pointer interactive-control"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="w-px h-4 bg-white/10" />
            <span className="font-mono text-[9px] text-white/40 tabular-nums hidden sm:inline">
              {formatTime(elapsedTime)}
            </span>
            <button
              onClick={exit}
              className="px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest text-[#FFB800] hover:bg-[#FFB800]/10 transition-all cursor-pointer interactive-control"
            >
              EXIT
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enter-presentation button (scroll mode) */}
      {!presentationActive && (
        <button
          onClick={enter}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-[#0a0a14]/90 border border-[#FFB800]/30 hover:border-[#FFB800]/70 text-[#FFB800] font-mono text-[10px] uppercase tracking-widest rounded-full shadow-xl backdrop-blur-md transition-all duration-300 interactive-control"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
          Present [P]
        </button>
      )}

      {/* Scroll progress dots */}
      {!presentationActive && (
        <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1.5">
          {Array.from({ length: totalFrames }).map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                currentFrameIndex === i ? "bg-[#FFB800] scale-125" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
