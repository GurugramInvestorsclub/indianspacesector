"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

// ---------------------------------------------------------------------------
// ChapterNavButton
// ---------------------------------------------------------------------------
// Reusable forward / back navigation CTA shared across chapter pages. Mirrors
// the amber pill treatment already used at the end of the Paradigm Shift deck
// so every chapter-to-chapter handoff feels identical.
// ---------------------------------------------------------------------------

interface ChapterNavButtonProps {
  href: string;
  label: string;
  variant?: "primary" | "ghost";
  direction?: "forward" | "back";
  className?: string;
}

export function ChapterNavButton({
  href,
  label,
  variant = "primary",
  direction = "forward",
  className = "",
}: ChapterNavButtonProps) {
  const base =
    "interactive-control group flex items-center justify-center gap-2 px-7 py-3.5 font-mono text-xs uppercase tracking-widest rounded-full font-bold transition-all duration-300 w-full sm:w-auto";

  const tone =
    variant === "primary"
      ? "bg-[#FFB800] hover:bg-[#cc9300] text-[#030308] shadow-lg"
      : "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white";

  const Arrow = direction === "back" ? ArrowLeft : ArrowRight;

  return (
    <Link href={href} className={`${base} ${tone} ${className}`}>
      {direction === "back" && (
        <Arrow className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      )}
      {label}
      {direction === "forward" && (
        <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      )}
    </Link>
  );
}
