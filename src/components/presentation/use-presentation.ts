"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useScroll, useMotionValue, type MotionValue } from "motion/react";

// ---------------------------------------------------------------------------
// usePresentation
// ---------------------------------------------------------------------------
// Shared implementation of the deck's per-page presentation system, extracted
// verbatim from the Paradigm Shift page so every scrollytelling chapter behaves
// identically: the same ON/OFF toggle, the same arrow / space / click clicker
// navigation, the same scroll-driven scenes, the same "?presentation=true"
// deep link, and the same scroll-lock behaviour.
//
// A page wires this up by:
//   1. attaching `containerRef` to its tall scroll track
//   2. driving its scroll-mode scene transforms from `progress`
//   3. switching presentation-mode scenes off `currentFrameIndex`
//   4. rendering <PresentationChrome /> with the returned controller
// ---------------------------------------------------------------------------

const TRANSITION_DURATION = 500;

export interface PresentationController {
  containerRef: React.RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
  totalFrames: number;
  presentationActive: boolean;
  currentFrameIndex: number;
  hudOpen: boolean;
  elapsedTime: number;
  isTransitioning: boolean;
  setHudOpen: React.Dispatch<React.SetStateAction<boolean>>;
  goToFrame: (idx: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  enter: () => void;
  exit: () => void;
}

export function usePresentation(totalFrames: number): PresentationController {
  const containerRef = useRef<HTMLDivElement>(null);

  const [presentationActive, setPresentationActive] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [hudOpen, setHudOpen] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useMotionValue(0);

  // Sync progress with scroll (scroll mode only).
  useEffect(() => {
    if (presentationActive) return;
    progress.set(scrollYProgress.get());
    const unsub = scrollYProgress.on("change", (v) => progress.set(v));
    return unsub;
  }, [presentationActive, scrollYProgress, progress]);

  // Derive the active frame index from scroll position.
  useEffect(() => {
    if (presentationActive) return;
    const unsub = progress.on("change", (v) => {
      const idx = Math.max(0, Math.min(totalFrames - 1, Math.floor(v * totalFrames)));
      setCurrentFrameIndex(idx);
    });
    return unsub;
  }, [presentationActive, progress, totalFrames]);

  // Deep link: ?presentation=true opens straight into the deck.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("presentation") === "true") {
      setPresentationActive(true);
      setHudOpen(true);
    }
  }, []);

  // Lock the page scroll while presenting.
  useEffect(() => {
    if (!presentationActive) return;
    const prevent = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener("wheel", prevent, { passive: false, capture: true });
    window.addEventListener("touchmove", prevent, { passive: false, capture: true });
    document.documentElement.classList.add("presentation-active");
    document.body.classList.add("presentation-active");
    return () => {
      window.removeEventListener("wheel", prevent, { capture: true });
      window.removeEventListener("touchmove", prevent, { capture: true });
      document.documentElement.classList.remove("presentation-active");
      document.body.classList.remove("presentation-active");
    };
  }, [presentationActive]);

  const goToFrame = useCallback(
    (idx: number) => {
      if (isTransitioning) return;
      const target = Math.max(0, Math.min(totalFrames - 1, idx));
      if (target === currentFrameIndex) return;
      setIsTransitioning(true);
      setCurrentFrameIndex(target);
      setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
    },
    [isTransitioning, currentFrameIndex, totalFrames]
  );

  const nextSlide = useCallback(
    () => goToFrame(currentFrameIndex + 1),
    [goToFrame, currentFrameIndex]
  );
  const prevSlide = useCallback(
    () => goToFrame(currentFrameIndex - 1),
    [goToFrame, currentFrameIndex]
  );

  const enter = useCallback(() => {
    setPresentationActive(true);
    setHudOpen(true);
    setCurrentFrameIndex(0);
  }, []);

  const exit = useCallback(() => {
    setPresentationActive(false);
    setHudOpen(false);
  }, []);

  // Keyboard navigation while presenting (clicker arrows + space + escape + P).
  useEffect(() => {
    if (!presentationActive) return;
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", " ", "Enter"].includes(e.key)) {
        e.preventDefault();
        nextSlide();
      } else if (["ArrowLeft", "ArrowUp", "Backspace"].includes(e.key)) {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Escape") {
        e.preventDefault();
        exit();
      } else if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        setHudOpen((h) => !h);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [presentationActive, nextSlide, prevSlide, exit]);

  // Click anywhere to advance (shift-click to go back). Interactive controls opt out.
  useEffect(() => {
    if (!presentationActive) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          "a, button, input, textarea, select, [role='button'], .interactive-control, .hud-overlay"
        )
      )
        return;
      e.preventDefault();
      if (e.shiftKey) prevSlide();
      else nextSlide();
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [presentationActive, nextSlide, prevSlide]);

  // P to enter the deck from scroll mode.
  useEffect(() => {
    if (presentationActive) return;
    const onKey = (e: KeyboardEvent) => {
      if (
        (e.key === "p" || e.key === "P") &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        enter();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [presentationActive, enter]);

  // Elapsed timer runs only while presenting.
  useEffect(() => {
    if (presentationActive) {
      timerRef.current = setInterval(() => setElapsedTime((t) => t + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      setElapsedTime(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [presentationActive]);

  return {
    containerRef,
    progress,
    totalFrames,
    presentationActive,
    currentFrameIndex,
    hudOpen,
    elapsedTime,
    isTransitioning,
    setHudOpen,
    goToFrame,
    nextSlide,
    prevSlide,
    enter,
    exit,
  };
}
