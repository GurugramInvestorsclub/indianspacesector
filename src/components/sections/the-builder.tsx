"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";

interface Particle {
  ox: number; // original X relative to center
  oy: number; // original Y relative to center
  r: number;
  g: number;
  b: number;
  vx: number;
  vy: number;
  noisePhase: number;
  noiseSpeed: number;
}

export function TheBuilder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const imageLoadedRef = useRef<boolean>(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [alignmentStatus, setAlignmentStatus] = useState("ALIGNING...");

  // Active scene calculation:
  // Scene 1: 0.0 to 0.33
  // Scene 2: 0.33 to 0.66
  // Scene 3: 0.66 to 1.0
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) {
      setActiveIndex(1);
    } else if (latest < 0.66) {
      setActiveIndex(2);
    } else {
      setActiveIndex(3);
    }

    if (latest >= 0.85) {
      setAlignmentStatus("CALIBRATED");
    } else {
      setAlignmentStatus("ALIGNING...");
    }
  });

  // Scene Opacities & Positions
  // Scene 1: Fades in early, fades out at 0.3
  const scene1Opacity = useTransform(scrollYProgress, [0.0, 0.05, 0.28, 0.33], [0, 1, 1, 0]);
  const scene1Y = useTransform(scrollYProgress, [0.0, 0.28, 0.33], [0, 0, -25]);

  // Scene 2: Fades in at 0.33, fades out at 0.63
  const scene2Opacity = useTransform(scrollYProgress, [0.33, 0.38, 0.62, 0.66], [0, 1, 1, 0]);
  const scene2Y = useTransform(scrollYProgress, [0.33, 0.38, 0.62, 0.66], [25, 0, 0, -25]);

  // Scene 3: Fades in at 0.66
  const scene3Opacity = useTransform(scrollYProgress, [0.66, 0.72, 0.96, 1.0], [0, 1, 1, 0]);
  const scene3Y = useTransform(scrollYProgress, [0.66, 0.72], [25, 0]);

  // Parallax values for Scene 2 (Satish Dhawan blueprints)
  const bgBlueprintY = useTransform(scrollYProgress, [0.33, 0.66], [-40, 40]);
  const silhouetteY = useTransform(scrollYProgress, [0.33, 0.66], [10, -10]);

  // Rocket parts assembly in Scene 3 (0.66 to 0.90)
  const assemblyProgress = useTransform(scrollYProgress, [0.68, 0.88], [0, 1]);
  const part1Y = useTransform(scrollYProgress, [0.68, 0.88], [-180, 0]); // Nose Cone
  const part1Rotate = useTransform(scrollYProgress, [0.68, 0.88], [-12, 0]);
  const part2Y = useTransform(scrollYProgress, [0.68, 0.88], [-60, 0]);  // Upper stage
  const part3Y = useTransform(scrollYProgress, [0.68, 0.88], [60, 0]);   // Lower stage
  const part4Y = useTransform(scrollYProgress, [0.68, 0.88], [180, 0]);  // Nozzle / Fins
  const part4Rotate = useTransform(scrollYProgress, [0.68, 0.88], [8, 0]);

  // Satellite waiting elements in Scene 3
  const satelliteOpacity = useTransform(scrollYProgress, [0.68, 0.78, 0.88, 0.93], [0, 0.4, 0.4, 0]);
  const satelliteScale = useTransform(scrollYProgress, [0.68, 0.93], [0.9, 0.8]);

  // BUILD THE ROCKETS text scale and glow
  const textScale = useTransform(scrollYProgress, [0.85, 0.93], [0.85, 1.05]);
  const textOpacity = useTransform(scrollYProgress, [0.85, 0.93], [0, 1]);

  // Keep track of scroll position inside Ref to prevent react re-renders on canvas animation
  const scrollValRef = useRef(0);
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      scrollValRef.current = latest;
    });
  }, [scrollYProgress]);

  // Load Vikram Sarabhai image & create stardust particles
  useEffect(() => {
    const img = new window.Image();
    img.src = "/vikram_sarabhai.jpg";
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageRef.current = img;
      imageLoadedRef.current = true;
      
      // Sample pixels on a temp offscreen canvas
      const tempCanvas = document.createElement("canvas");
      const targetW = 140;
      const targetH = 175;
      tempCanvas.width = targetW;
      tempCanvas.height = targetH;
      const tempCtx = tempCanvas.getContext("2d");
      
      if (tempCtx) {
        tempCtx.drawImage(img, 0, 0, targetW, targetH);
        try {
          const imgData = tempCtx.getImageData(0, 0, targetW, targetH);
          const data = imgData.data;
          const particles: Particle[] = [];
          const step = 2; // sample every 2nd pixel
          
          for (let y = 0; y < targetH; y += step) {
            for (let x = 0; x < targetW; x += step) {
              const idx = (y * targetW + x) * 4;
              const r = data[idx];
              const g = data[idx + 1];
              const b = data[idx + 2];
              const a = data[idx + 3];
              
              // Sample only pixels with color/brightness (skip pure dark backgrounds)
              const brightness = (r + g + b) / 3;
              if (a > 120 && brightness > 30) {
                particles.push({
                  ox: x - targetW / 2,
                  oy: y - targetH / 2,
                  r,
                  g,
                  b,
                  // dispersion motion
                  vx: (Math.random() - 0.5) * 120 + (x - targetW / 2) * 0.4,
                  vy: -Math.random() * 150 - 40,
                  noisePhase: Math.random() * Math.PI * 2,
                  noiseSpeed: Math.random() * 3 + 1,
                });
              }
            }
          }
          particlesRef.current = particles;
        } catch (e) {
          console.warn("Failed to sample pixels, falling back to simple canvas fade.", e);
        }
      }
    };
  }, []);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = 1;
    const resizeCanvas = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = 300 * dpr;
      canvas.height = 360 * dpr;
      canvas.style.width = "300px";
      canvas.style.height = "360px";
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scroll = scrollValRef.current;

      if (!imageLoadedRef.current || !imageRef.current) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Scene 1 Active Dissolve Domain
      // 0.0 to 0.12 -> Image is static & sharp
      // 0.12 to 0.28 -> Particles disperse
      // 0.28 to 0.33 -> Particles fade out
      if (scroll <= 0.12) {
        // Draw image directly for crispness
        const w = 140 * dpr;
        const h = 175 * dpr;
        ctx.save();
        // Subtle B&W polaroid style vignette around image
        ctx.drawImage(imageRef.current, cx - w / 2, cy - h / 2, w, h);
        
        // overlay light grid lines
        ctx.strokeStyle = "rgba(255, 184, 0, 0.08)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(cx - w/2, cy); ctx.lineTo(cx + w/2, cy);
        ctx.moveTo(cx, cy - h/2); ctx.lineTo(cx, cy + h/2);
        ctx.stroke();
        ctx.restore();
      } else if (scroll > 0.12 && scroll < 0.33) {
        // Render stardust particles
        const particles = particlesRef.current;
        const rawProgress = (scroll - 0.12) / 0.16; // 0.0 to 1.0 from 0.12 to 0.28 scroll
        const p = Math.min(1.0, Math.max(0.0, rawProgress));
        
        // Easing for dispersion acceleration
        const pEased = p * p;
        const alpha = Math.max(0, 1 - (scroll - 0.24) / 0.08); // fade out entirely at 0.32

        ctx.save();
        ctx.scale(dpr, dpr);

        if (particles.length === 0) {
          // Fallback if pixel reading failed: just fade and scale image
          const w = 140;
          const h = 175;
          ctx.globalAlpha = Math.max(0, 1 - p * 1.5);
          ctx.drawImage(imageRef.current, 150 - w / 2, 180 - h / 2, w, h);
        } else {
          // Draw stardust particles
          for (let i = 0; i < particles.length; i++) {
            const part = particles[i];
            
            // Calculate stardust trajectory
            // vx carries outward velocity, vy carries upward drift
            // Add subtle wave oscillation
            const waveX = Math.sin(part.noisePhase + p * part.noiseSpeed * 8) * 12 * p;
            const px = part.ox + part.vx * pEased + waveX;
            const py = part.oy + part.vy * pEased;

            // Fade individual particle earlier depending on its height for a trailing effect
            const individualAlpha = Math.max(0, (1 - pEased) * alpha);
            
            ctx.fillStyle = `rgba(${part.r}, ${part.g}, ${part.b}, ${individualAlpha})`;
            // Draw slightly larger stardust particles as they drift
            const size = p > 0.4 ? 1.5 : 1.0;
            ctx.fillRect(150 + px - size / 2, 180 + py - size / 2, size, size);
          }
        }
        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="the-builder"
      className="relative w-full h-[500vh] bg-[#030308]"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center">
        
        {/* Ambient background glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,5,15,0.8)_0%,#030308_100%)] pointer-events-none" />
        <div className="absolute top-[20%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-[#FFB800]/[0.015] blur-[120px] pointer-events-none" />
        
        {/* Subtle grid system background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

        {/* ============================================================= */}
        {/* SCENE 1: The Unexpected Loss (0.0 - 0.33) */}
        {/* ============================================================= */}
        <motion.div
          style={{ opacity: scene1Opacity, y: scene1Y }}
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center px-6 max-w-5xl mx-auto ${
            activeIndex === 1 ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          {/* Header context */}
          <div className="text-center mb-8">
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#FFB800] uppercase mb-2 block">
              SECTION 3 — &ldquo;THE BUILDER&rdquo;
            </span>
            <p className="text-xs font-mono tracking-widest text-white/35 uppercase">
              1971 — The Shift
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px_1fr] gap-12 items-center w-full max-w-4xl">
            {/* Left Column: Loss Text */}
            <div className="text-left flex flex-col gap-4">
              <span className="font-mono text-[10px] text-[#FFB800] tracking-widest uppercase">
                [IN MEMORIAM]
              </span>
              <h3 
                className="text-2xl md:text-3xl font-extralight text-white/80 leading-relaxed italic"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Vikram Sarabhai did not live to see Aryabhata orbit the Earth.
              </h3>
              <p className="text-xs font-mono text-white/50 leading-relaxed mt-2 border-l border-[#FFB800]/20 pl-4">
                The founder of India&apos;s space dream passed away in December 1971, leaving a vacuum of uncertainty.
              </p>
            </div>

            {/* Center Canvas: Portrait Dissolving into Stardust */}
            <div className="relative flex justify-center items-center h-[360px]">
              {/* Double Bezel Outer Shell for the Canvas portrait */}
              <div className="p-1 rounded-[1.5rem] bg-white/[0.03] border border-white/5 shadow-2xl">
                <div className="rounded-[1.2rem] bg-[#050510] overflow-hidden p-3 border border-white/10">
                  <canvas ref={canvasRef} className="block select-none pointer-events-none" />
                </div>
              </div>

              {/* Minimal caption details */}
              <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 font-mono text-[9px] text-white/20 tracking-wider whitespace-nowrap">
                DR. VIKRAM SARABHAI (1919 - 1971)
              </div>
            </div>

            {/* Right Column: Uncertainty */}
            <div className="text-left flex flex-col gap-4">
              <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
                [THE FUTURE VECTOR]
              </span>
              <h4 
                className="text-xl md:text-2xl font-light text-white leading-snug"
                style={{ fontFamily: "Georgia, serif" }}
              >
                December 1971.
              </h4>
              <p className="text-sm text-white/70 leading-relaxed font-sans">
                India lost the architect of its space programme.
              </p>
              <div className="h-[1px] w-12 bg-white/10 my-2" />
              <p className="text-sm font-light text-white/60 italic leading-relaxed">
                &ldquo;The vision remained. But who would carry it forward?&rdquo;
              </p>
            </div>
          </div>
        </motion.div>


        {/* ============================================================= */}
        {/* SCENE 2: Enter Satish Dhawan (0.33 - 0.66) */}
        {/* ============================================================= */}
        <motion.div
          style={{ opacity: scene2Opacity, y: scene2Y }}
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center px-6 max-w-6xl mx-auto ${
            activeIndex === 2 ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          {/* Parallax Blueprint elements in the background */}
          <motion.div
            style={{ y: bgBlueprintY }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.04]"
          >
            {/* Wind tunnel / trajectory outlines */}
            <svg className="w-[85%] h-[85%]" viewBox="0 0 1000 800" fill="none">
              <circle cx="500" cy="400" r="300" stroke="white" strokeWidth="1" strokeDasharray="5 5" />
              <path d="M 0,250 C 300,100 700,550 1000,400" stroke="white" strokeWidth="1.5" />
              <path d="M 0,320 C 250,220 750,420 1000,320" stroke="white" strokeWidth="1" />
              <path d="M 0,400 Q 500,80 1000,400" stroke="white" strokeWidth="1" strokeDasharray="3 9" />
              {/* Telemetry coordinate marks */}
              <text x="750" y="420" fill="white" fontSize="10" fontFamily="monospace">LAUNCH VECTOR: SRIHARIKOTA 13.7° N</text>
              <text x="150" y="220" fill="white" fontSize="10" fontFamily="monospace">WIND TUNNEL FLUID VECTORS</text>
            </svg>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center w-full z-10">
            {/* Left: Silhouette/Blueprint drawing & wind tunnel flow */}
            <div className="relative flex justify-center items-center">
              {/* Wind tunnel aerodynamic flow animation overlay */}
              <svg className="absolute w-[110%] h-[110%] opacity-20 pointer-events-none z-0" viewBox="0 0 500 400" fill="none">
                {/* Wind streamlines moving across screen */}
                <motion.path 
                  d="M 50,150 C 150,120 250,180 350,150 T 450,160" 
                  stroke="#FFB800" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 8"
                  style={{ strokeDashoffset: useTransform(scrollYProgress, [0.33, 0.66], [0, -100]) }}
                />
                <motion.path 
                  d="M 50,200 C 150,170 250,230 350,200 T 450,210" 
                  stroke="#FFB800" 
                  strokeWidth="1" 
                  strokeDasharray="8 8"
                  style={{ strokeDashoffset: useTransform(scrollYProgress, [0.33, 0.66], [100, 0]) }}
                />
                <motion.path 
                  d="M 50,250 C 150,220 250,280 350,250 T 450,260" 
                  stroke="#FFB800" 
                  strokeWidth="1.5" 
                  strokeDasharray="2 4"
                  style={{ strokeDashoffset: useTransform(scrollYProgress, [0.33, 0.66], [0, -50]) }}
                />
              </svg>

              {/* Layered Parallax Portrait representing Satish Dhawan */}
              <motion.div
                style={{ y: silhouetteY }}
                className="relative w-[280px] h-[350px] flex justify-center items-center"
              >
                {/* Outer blueprint card frame */}
                <div className="absolute inset-0 border border-white/5 rounded-sm p-3 bg-gradient-to-tr from-[#050510]/90 to-[#030308]/90 backdrop-blur-md flex flex-col justify-between shadow-2xl">
                  
                  {/* Detailed Blueprint actual photo of Dhawan */}
                  <div className="relative w-full h-[88%] rounded-sm overflow-hidden border border-white/10">
                    <Image
                      src="/satish_dhawan.png"
                      alt="Dr. Satish Dhawan Portrait"
                      fill
                      priority
                      className="object-cover object-top grayscale contrast-[1.25] brightness-[0.75] select-none pointer-events-none"
                    />
                    
                    {/* Grid overlay over photo */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
                    <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_35%,#030308_95%] opacity-90 pointer-events-none" />

                    {/* Target crosshairs */}
                    <svg className="absolute inset-0 w-full h-full opacity-30 text-[#FFB800]" viewBox="0 0 100 100" fill="none">
                      <circle cx="50" cy="45" r="8" stroke="currentColor" strokeWidth="0.5" />
                      <line x1="50" y1="32" x2="50" y2="58" stroke="currentColor" strokeWidth="0.5" />
                      <line x1="37" y1="45" x2="63" y2="45" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                  </div>
                  
                  {/* Blueprint annotations */}
                  <div className="flex justify-between items-end z-10 font-mono text-[8px] text-white/50 px-1 mt-1.5">
                    <div className="flex flex-col">
                      <span className="text-[#FFB800] font-bold">MODEL: SD-1972</span>
                      <span>ROLE: ISRO CHAIRMAN</span>
                    </div>
                    <span className="opacity-40">Sriharikota 13.7° N</span>
                  </div>
                  
                  {/* Subtle technical scanner effect line */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFB800]/40 to-transparent animate-scan" style={{ animationDuration: "6s" }} />
                </div>

                <span className="absolute top-2 right-4 font-mono text-[9px] text-[#FFB800] tracking-widest bg-[#030308] px-2 py-0.5 rounded border border-[#FFB800]/20 uppercase z-10">
                  ACTIVE SCHEMATIC
                </span>
              </motion.div>
            </div>

            {/* Right: Narrative introduction */}
            <div className="text-left flex flex-col gap-6">
              <div>
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#FFB800] uppercase mb-2 block">
                  Scene II — Enter The Architect of Scale
                </span>
                <h3 
                  className="text-3xl md:text-4xl font-extralight tracking-tight text-white mb-2"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Enter Satish Dhawan.
                </h3>
                <span className="font-mono text-xs text-white/40 block">ISRO CHAIRMAN (1972)</span>
              </div>

              <div className="h-[1px] w-24 bg-[#FFB800]/30" />

              <p className="text-base text-white/80 leading-relaxed font-sans">
                In 1972, Prof. Satish Dhawan took charge of ISRO. If Sarabhai was the visionary who imagined the dream, Dhawan was the engineer who systematized it.
              </p>

              <blockquote className="border-l border-[#FFB800] pl-6 py-2 my-2 bg-white/[0.01]">
                <p className="text-lg md:text-xl font-extralight text-white leading-relaxed italic" style={{ fontFamily: "Georgia, serif" }}>
                  &ldquo;Sarabhai imagined the future. Dhawan began building it.&rdquo;
                </p>
              </blockquote>

              <p className="text-xs font-mono text-white/55 leading-relaxed">
                Dhawan became Chairman of ISRO in 1972 after Sarabhai&apos;s death and led the organisation through a period of major institutional and technological growth.
              </p>
            </div>
          </div>
        </motion.div>


        {/* ============================================================= */}
        {/* SCENE 3: A New Priority ("BUILD THE ROCKETS") (0.66 - 1.0) */}
        {/* ============================================================= */}
        <motion.div
          style={{ opacity: scene3Opacity, y: scene3Y }}
          className={`absolute inset-0 z-10 flex flex-col items-center justify-between py-16 px-6 max-w-7xl mx-auto ${
            activeIndex === 3 ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          {/* Header context */}
          <div className="text-center">
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#FFB800] uppercase mb-2 block">
              Scene III — The Directive
            </span>
            <p className="text-xs font-mono tracking-widest text-white/35 uppercase">
              Launch Vehicle Program Initialization
            </p>
          </div>

          {/* Interactive Workshop Blueprint Assembly */}
          <div className="relative w-full max-w-3xl h-[45vh] flex items-center justify-center z-10">
            
            {/* Assembly grid background */}
            <div className="absolute inset-0 border border-white/5 bg-[#050512]/30 backdrop-blur-sm rounded-lg overflow-hidden flex items-center justify-center">
              {/* Technical blueprints grid lines */}
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              <div className="absolute top-[10%] left-[5%] text-[7px] font-mono text-white/20">GRID: SLV3-ASSY-TRACKER</div>
              
              {/* Concentric assembly calibration rings */}
              <svg className="absolute w-[300px] h-[300px] opacity-10" viewBox="0 0 300 300">
                <circle cx="150" cy="150" r="100" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="150" cy="150" r="130" stroke="white" strokeWidth="0.5" />
                <line x1="0" y1="150" x2="300" y2="150" stroke="white" strokeWidth="0.5" />
                <line x1="150" y1="0" x2="150" y2="300" stroke="white" strokeWidth="0.5" />
              </svg>

              {/* Satellites waiting on the ground (represented as technical graphics) */}
              <motion.div 
                style={{ opacity: satelliteOpacity, scale: satelliteScale }}
                className="absolute bottom-6 left-12 flex flex-col items-center gap-2 border border-white/10 p-3 bg-black/60 rounded"
              >
                {/* Aryabhata satellite vector graphic */}
                <svg className="w-16 h-16 text-[#FFB800]" viewBox="0 0 80 80" fill="none">
                  <polygon points="40,15 65,30 65,55 40,70 15,55 15,30" stroke="currentColor" strokeWidth="1.2" />
                  <polygon points="40,25 55,35 55,50 40,60 25,50 25,35" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
                  <circle cx="40" cy="42" r="5" fill="currentColor" opacity="0.3" />
                  <line x1="40" y1="15" x2="40" y2="0" stroke="currentColor" strokeWidth="1" />
                  <line x1="15" y1="30" x2="5" y2="25" stroke="currentColor" strokeWidth="0.8" />
                  <line x1="65" y1="30" x2="75" y2="25" stroke="currentColor" strokeWidth="0.8" />
                </svg>
                <span className="font-mono text-[7px] text-[#FFB800] tracking-widest uppercase">
                  SATELLITE WAITING
                </span>
                <span className="font-mono text-[6px] text-white/40 tracking-wider">
                  NO INDIAN LAUNCHER AVAILABLE
                </span>
              </motion.div>

              {/* Rocket Components assembling vertically in the center */}
              <div className="relative flex flex-col items-center justify-center h-[90%] w-[120px]">
                
                {/* Nose Cone Section */}
                <motion.div 
                  style={{ y: part1Y, rotate: part1Rotate }} 
                  className="relative z-30 flex flex-col items-center"
                >
                  <svg className="w-8 h-12 text-white" viewBox="0 0 32 48" fill="none">
                    <path d="M 16,4 C 16,4 26,20 26,48 L 6,48 C 6,20 16,4 16,4 Z" stroke="currentColor" strokeWidth="1.2" fill="rgba(255,255,255,0.05)" />
                    <line x1="16" y1="4" x2="16" y2="48" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                  </svg>
                  <span className="absolute right-[-40px] top-[15px] font-mono text-[6px] text-white/30 whitespace-nowrap">[01 NOSE CONE]</span>
                </motion.div>

                {/* Upper Stage Section */}
                <motion.div 
                  style={{ y: part2Y }} 
                  className="relative z-20 flex flex-col items-center mt-[-1px]"
                >
                  <svg className="w-8 h-10 text-white" viewBox="0 0 32 40" fill="none">
                    <rect x="6" y="2" width="20" height="36" rx="1" stroke="currentColor" strokeWidth="1.2" fill="rgba(255,255,255,0.05)" />
                    <line x1="6" y1="12" x2="26" y2="12" stroke="currentColor" strokeWidth="0.8" />
                    <line x1="6" y1="24" x2="26" y2="24" stroke="currentColor" strokeWidth="0.8" />
                  </svg>
                  <span className="absolute left-[-45px] top-[12px] font-mono text-[6px] text-white/30 whitespace-nowrap">[02 STAGE 2/3]</span>
                </motion.div>

                {/* Main Booster Stage Section */}
                <motion.div 
                  style={{ y: part3Y }} 
                  className="relative z-15 flex flex-col items-center mt-[-1px]"
                >
                  <svg className="w-10 h-16 text-white" viewBox="0 0 40 64" fill="none">
                    <rect x="7" y="2" width="26" height="60" rx="1" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,255,255,0.05)" />
                    <line x1="7" y1="15" x2="33" y2="15" stroke="currentColor" strokeWidth="0.8" />
                    <line x1="7" y1="30" x2="33" y2="30" stroke="currentColor" strokeWidth="0.8" />
                    <line x1="7" y1="45" x2="33" y2="45" stroke="currentColor" strokeWidth="0.8" />
                  </svg>
                  <span className="absolute right-[-45px] top-[24px] font-mono text-[6px] text-white/30 whitespace-nowrap">[03 MAIN SOLID CORE]</span>
                </motion.div>

                {/* Nozzle & Fins Section */}
                <motion.div 
                  style={{ y: part4Y, rotate: part4Rotate }} 
                  className="relative z-10 flex flex-col items-center mt-[-1px]"
                >
                  <svg className="w-12 h-10 text-white" viewBox="0 0 48 40" fill="none">
                    <polygon points="18,0 30,0 36,24 12,24" stroke="currentColor" strokeWidth="1.2" fill="rgba(255,255,255,0.05)" />
                    <path d="M 12,0 L 4,24 L 12,24 Z" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M 36,0 L 44,24 L 36,24 Z" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  <span className="absolute left-[-45px] top-[8px] font-mono text-[6px] text-white/30 whitespace-nowrap">[04 NOZZLE / FINS]</span>
                </motion.div>

                {/* Connection Glow lines */}
                <motion.div
                  style={{ 
                    opacity: useTransform(scrollYProgress, [0.85, 0.88, 0.93], [0, 1, 0]),
                    scaleX: useTransform(scrollYProgress, [0.85, 0.88], [1.3, 1.0])
                  }}
                  className="absolute w-[60px] h-[1px] bg-[#FFB800] shadow-[0_0_10px_#FFB800] z-40 pointer-events-none top-[47%]"
                />
                <motion.div
                  style={{ 
                    opacity: useTransform(scrollYProgress, [0.85, 0.88, 0.93], [0, 1, 0]),
                    scaleX: useTransform(scrollYProgress, [0.85, 0.88], [1.3, 1.0])
                  }}
                  className="absolute w-[60px] h-[1px] bg-[#FFB800] shadow-[0_0_10px_#FFB800] z-40 pointer-events-none top-[71%]"
                />
              </div>

              {/* HUD alignment label */}
              <div className="absolute bottom-4 right-6 flex items-center gap-2 font-mono text-[8px] tracking-widest text-[#FFB800]">
                <span>ALIGNMENT STATUS:</span>
                <motion.span
                  className="px-2 py-0.5 rounded bg-[#FFB800]/15 border border-[#FFB800]/30 font-bold"
                  style={{
                    color: alignmentStatus === "CALIBRATED" ? "#34c759" : "#ff3b30",
                  }}
                >
                  {alignmentStatus}
                </motion.span>
              </div>

            </div>

            {/* Dynamic "BUILD THE ROCKETS" typography overlay */}
            <motion.div 
              style={{ opacity: textOpacity, scale: textScale }}
              className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none text-center"
            >
              <h1 
                className="text-[4rem] sm:text-[6rem] md:text-[8rem] font-black tracking-tighter leading-none text-[#FFB800] drop-shadow-[0_0_60px_rgba(255,184,0,0.25)] select-none uppercase"
                style={{ fontFamily: "Georgia, serif" }}
              >
                BUILD THE ROCKETS
              </h1>
              <p className="font-mono text-[10px] tracking-[0.4em] text-white/80 uppercase mt-4 max-w-md bg-[#030308]/90 border border-white/10 px-4 py-2 rounded-sm backdrop-blur-md">
                THE DEFINING DIRECTIVE OF DHAWAN&apos;S ISRO
              </p>
            </motion.div>
          </div>

          {/* Narration script block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end w-full max-w-5xl z-10 text-left">
            <div>
              <span className="font-mono text-[9px] text-[#FFB800] tracking-[0.25em] uppercase mb-2.5 block">
                The Bottleneck
              </span>
              <p className="text-lg md:text-xl font-extralight text-white leading-relaxed">
                Satellites were important. But India had no independent way to launch them.
              </p>
            </div>
            <div className="border-l border-white/10 pl-6">
              <p className="text-xs font-mono text-white/55 leading-relaxed">
                In the early 1970s, India built satellites like Aryabhata but had to wait for Soviet launcher slots. Dhawan recognized that to be a true spacefaring nation, self-reliance in rocketry was not an option—it was a strategic necessity.
              </p>
            </div>
          </div>

        </motion.div>

      </div>
    </div>
  );
}
