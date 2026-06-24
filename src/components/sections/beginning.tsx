"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, animate } from "motion/react";

interface CityPoint3D {
  name: string;
  lat: number;
  lon: number;
}

const CITIES: CityPoint3D[] = [
  { name: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
  { name: "Thumba", lat: 8.5241, lon: 76.9366 },
  { name: "New York", lat: 40.7128, lon: -74.0060 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "Moscow", lat: 55.7558, lon: 37.6173 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 }
];

interface SectionProps {
  presentationActive?: boolean;
  currentFrameIndex?: number;
}

export function Beginning({ presentationActive = false, currentFrameIndex = 0 }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const reduce = useReducedMotion();

  // Track scroll progress across the h-[500vh] scroll track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progress = useMotionValue(0);

  useEffect(() => {
    if (presentationActive) {
      let p = 0;
      if (currentFrameIndex === 4) p = 0.08;
      else if (currentFrameIndex === 5) p = 0.30;
      else if (currentFrameIndex === 6) p = 0.50;
      else if (currentFrameIndex === 7) p = 0.71;
      else if (currentFrameIndex === 8) p = 0.90;
      else if (currentFrameIndex < 4) p = 0.0;
      else p = 1.0;
      
      const controls = animate(progress, p, { duration: 0.6, ease: [0.25, 1, 0.5, 1] });
      return () => controls.stop();
    } else {
      progress.set(scrollYProgress.get());
      return scrollYProgress.onChange((latest) => {
        progress.set(latest);
      });
    }
  }, [presentationActive, currentFrameIndex, scrollYProgress, progress]);

  // Track window resizing for mobile layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // -------------------------------------------------------------
  // TRANSFORMATION VALUES FOR SCENES
  // -------------------------------------------------------------

  // Scene 1: Sputnik & entering the space age
  const scene1Opacity = useTransform(progress, [0.0, 0.05, 0.15, 0.25], [0, 1, 1, 0]);
  const scene1Y = useTransform(progress, [0.0, 0.05, 0.15, 0.25], [20, 0, 0, -20]);
  
  // Archival visual image block in Scene 1
  const archivalOpacity = useTransform(progress, [0.02, 0.08, 0.15, 0.25], [0, 1, 1, 0]);
  const archivalScale = useTransform(progress, [0.02, 0.25], [0.95, 1.03]);

  // Scene 2: Vikram Sarabhai Portrait & Scientific Sketches
  const scene2Opacity = useTransform(progress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
  const portraitY = useTransform(progress, [0.15, 0.25, 0.35, 0.45], [40, 0, 0, -30]);
  const sketchesY = useTransform(progress, [0.15, 0.45], [20, -40]); // slower scroll for depth

  // Scene 3: The Vision Quote
  const scene3Opacity = useTransform(progress, [0.35, 0.45, 0.58, 0.68], [0, 1, 1, 0]);
  
  // Scene 3 progressive line transforms
  const quoteLine1Opacity = useTransform(progress, [0.36, 0.40, 0.58, 0.68], [0, 1, 1, 0]);
  const quoteLine2Opacity = useTransform(progress, [0.37, 0.41, 0.58, 0.68], [0, 1, 1, 0]);
  const quoteLine3Opacity = useTransform(progress, [0.38, 0.42, 0.58, 0.68], [0, 1, 1, 0]);
  const quoteLine4Opacity = useTransform(progress, [0.40, 0.43, 0.58, 0.68], [0, 1, 1, 0]);
  const quoteLine5Opacity = useTransform(progress, [0.41, 0.44, 0.58, 0.68], [0, 1, 1, 0]);
  const quoteLine6Opacity = useTransform(progress, [0.42, 0.45, 0.58, 0.68], [0, 1, 1, 0]);
  const quoteLine7Opacity = useTransform(progress, [0.43, 0.46, 0.58, 0.68], [0, 1, 1, 0]);

  // Scene 4: Birth of Indian Space Program (INCOSPAR Node Network)
  const scene4Opacity = useTransform(progress, [0.58, 0.68, 0.75, 0.85], [0, 1, 1, 0]);
  const mapScale = useTransform(progress, [0.58, 0.85], [0.92, 1.05]);
  const pathLength = useTransform(progress, [0.60, 0.72], [0, 1]);
  const nodeConnectionsOpacity = useTransform(progress, [0.65, 0.73], [0, 1]);

  // Scene 5: Thumba Launching Site
  const scene5Opacity = useTransform(progress, [0.75, 0.85, 0.95, 1.0], [0, 1, 1, 0]);
  const magneticEquatorOpacity = useTransform(progress, [0.77, 0.81], [0, 0.8]);
  const oceanWaveOffset = useTransform(progress, [0.75, 1.0], [0, 80]);
  const rocketY = useTransform(progress, [0.79, 0.93], [250, -450]);
  const starsDensity = useTransform(progress, [0.81, 0.93], [0, 1]);

  // Archival photos (bicycle & bullock cart) transitions in Scene 4 (INCOSPAR)
  const bicycleOpacity = useTransform(progress, [0.58, 0.66, 0.75, 0.85], [0, 1, 1, 0]);
  const bicycleX = useTransform(progress, [0.58, 0.66], [-30, 0]);
  const cartOpacity = useTransform(progress, [0.60, 0.68, 0.75, 0.85], [0, 1, 1, 0]);
  const cartX = useTransform(progress, [0.60, 0.68], [30, 0]);

  // -------------------------------------------------------------
  // CANVAS ANIMATION LOOP (3D ROTATING GLOBE & SPUTNIK)
  // -------------------------------------------------------------
  useEffect(() => {
    if (reduce || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Handles resizing of canvas inside the screen
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect?.width || window.innerWidth;
      canvas.height = rect?.height || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Setup 3D coordinates for wireframe grid
    const gridPoints: { lat: number; lon: number }[] = [];
    
    // Generate latitude rings
    for (let lat = -60; lat <= 60; lat += 20) {
      for (let lon = 0; lon < 360; lon += 8) {
        gridPoints.push({ lat, lon });
      }
    }
    // Generate longitude meridians
    for (let lon = 0; lon < 360; lon += 30) {
      for (let lat = -80; lat <= 80; lat += 6) {
        gridPoints.push({ lat, lon });
      }
    }

    // Helper for 3D projection
    const project = (
      lat: number,
      lon: number,
      rotX: number,
      rotY: number,
      radius: number,
      zoom: number,
      cx: number,
      cy: number
    ) => {
      const latRad = (lat * Math.PI) / 180;
      const lonRad = (lon * Math.PI) / 180;

      // 3D coordinates on unit sphere
      const x = radius * Math.cos(latRad) * Math.sin(lonRad);
      const y = radius * Math.sin(latRad);
      const z = radius * Math.cos(latRad) * Math.cos(lonRad);

      // Rotate around Y axis (spin)
      const x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
      const y1 = y;
      const z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);

      // Rotate around X axis (tilt)
      const x2 = x1;
      const y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
      const z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);

      return {
        x: cx + x2 * zoom,
        y: cy - y2 * zoom, // invert Y for screen space
        z: z2,
        visible: z2 > 0
      };
    };

    // Sputnik orbit parameters
    const sputnikOrbitRadius = 1.35;
    const orbitTilt = (55 * Math.PI) / 180; // 55 degree inclination
    let sputnikHistory: { x: number; y: number; opacity: number }[] = [];

    // Main animation loop
    const render = () => {
      const pVal = progress.get();
      
      // Clear canvas with subtle radial depth overlay
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Only draw the globe if we are in Scene 1 or Scene 2
      if (pVal > 0.40) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Compute globe center and size based on screen width
      const width = canvas.width;
      const height = canvas.height;
      const baseRadius = Math.min(width, height) * (isMobile ? 0.28 : 0.22);
      
      // Interpolate center position (cx, cy) and zoom factor based on scroll progress
      let cx = width / 2;
      let cy = height / 2;
      let zoom = 1.0;
      let globeOpacity = 1.0;

      // Auto rotation based on time + scroll progress
      const timeAngle = (Date.now() * 0.00015) % (Math.PI * 2);
      const scrollAngle = pVal * Math.PI * 2.5;
      let rotY = timeAngle + scrollAngle;
      let rotX = (15 * Math.PI) / 180; // Default slight tilt

      if (pVal < 0.20) {
        // Scene 1: Centered globe, regular spin
        cx = width / 2;
        cy = height / 2;
        zoom = 1.0;
        globeOpacity = pVal < 0.02 ? pVal / 0.02 : 1.0;
      } else if (pVal < 0.30) {
        // Transition Scene 1 -> Scene 2: Pan left, zoom in, lock on India/Ahmedabad
        const t = (pVal - 0.20) / 0.10;
        const easeT = t * t * (3 - 2 * t); // smoothstep

        const targetRotY = (-72.57 * Math.PI) / 180;
        const targetRotX = (23.02 * Math.PI) / 180;

        // Smoothly interpolate rotation to face India/Ahmedabad
        rotY = rotY + (targetRotY - rotY) * easeT;
        rotX = rotX + (targetRotX - rotX) * easeT;

        zoom = 1.0 + 1.8 * easeT;
        
        if (isMobile) {
          cx = width / 2;
          cy = height * 0.4;
        } else {
          cx = width / 2 - (width * 0.2) * easeT;
          cy = height / 2;
        }
      } else {
        // Scene 2: Centered on Ahmedabad, fixed position
        rotY = (-72.57 * Math.PI) / 180;
        rotX = (23.02 * Math.PI) / 180;
        zoom = 2.8;
        
        if (isMobile) {
          cx = width / 2;
          cy = height * 0.4;
        } else {
          cx = width * 0.3;
          cy = height / 2;
        }

        // Fade out as we transition into Scene 3
        if (pVal > 0.38) {
          globeOpacity = Math.max(0, 1.0 - (pVal - 0.38) / 0.02);
        }
      }

      ctx.save();
      ctx.globalAlpha = globeOpacity;

      // Draw subtle atmosphere glow behind globe
      const glowGrad = ctx.createRadialGradient(cx, cy, baseRadius * zoom * 0.9, cx, cy, baseRadius * zoom * 1.15);
      glowGrad.addColorStop(0, "rgba(255, 184, 0, 0.1)");
      glowGrad.addColorStop(0.3, "rgba(255, 184, 0, 0.03)");
      glowGrad.addColorStop(1, "rgba(255, 184, 0, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * zoom * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Draw Earth body background sphere
      ctx.fillStyle = "#04040d";
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * zoom, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw grid lines
      ctx.lineWidth = 0.8;
      
      // Group points by coordinates to draw smooth latitude rings
      for (let lat = -60; lat <= 60; lat += 20) {
        ctx.beginPath();
        let first = true;
        for (let lon = 0; lon <= 360; lon += 8) {
          const pt = project(lat, lon, rotX, rotY, baseRadius, zoom, cx, cy);
          if (pt.visible) {
            ctx.strokeStyle = "rgba(255, 184, 0, 0.06)";
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Group points for longitude meridians
      for (let lon = 0; lon < 360; lon += 30) {
        ctx.beginPath();
        let first = true;
        for (let lat = -80; lat <= 80; lat += 6) {
          const pt = project(lat, lon, rotX, rotY, baseRadius, zoom, cx, cy);
          if (pt.visible) {
            ctx.strokeStyle = "rgba(255, 184, 0, 0.06)";
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Draw back-side wireframe (very faint dashed lines for depth)
      ctx.setLineDash([2, 5]);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      for (let lat = -60; lat <= 60; lat += 40) {
        ctx.beginPath();
        let first = true;
        for (let lon = 0; lon <= 360; lon += 12) {
          const pt = project(lat, lon, rotX, rotY, baseRadius, zoom, cx, cy);
          if (!pt.visible) {
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }
      ctx.setLineDash([]); // Reset line dash

      // Draw city dots
      CITIES.forEach((city) => {
        const pt = project(city.lat, city.lon, rotX, rotY, baseRadius, zoom, cx, cy);
        if (pt.visible) {
          const isIndiaCity = city.name === "Ahmedabad" || city.name === "Thumba";
          
          if (isIndiaCity && pVal >= 0.22) {
            // Draw special glowing ring for India cities when zoomed in
            ctx.fillStyle = "#FFB800";
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
            ctx.fill();

            // Pulsing highlight
            const pulse = (Math.sin(Date.now() * 0.004) + 1) / 2;
            ctx.strokeStyle = "rgba(255, 184, 0, 0.8)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 4 + pulse * 14, 0, Math.PI * 2);
            ctx.stroke();

            // City name tag
            ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
            ctx.font = "bold 9px monospace";
            ctx.fillText(city.name.toUpperCase(), pt.x + 8, pt.y + 3);
          } else {
            // Regular global cities
            ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // Draw Sputnik 1 Orbit & Satellite (Only in Scene 1)
      if (pVal < 0.25) {
        const sputnikTime = Date.now() * 0.001;
        const sputnikAngle = (sputnikTime) % (Math.PI * 2);

        // Smoothly fade out Sputnik elements as we approach Scene 2 (progress 0.15 to 0.25)
        let sputnikFade = 1.0;
        if (pVal > 0.15) {
          sputnikFade = Math.max(0, 1.0 - (pVal - 0.15) / 0.10);
        }

        // 1. Draw Orbit Line
        ctx.beginPath();
        let firstSputnikPt = true;
        for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.05) {
          // Orbit circular in its own plane
          const ox = baseRadius * sputnikOrbitRadius * Math.cos(a);
          const oy = baseRadius * sputnikOrbitRadius * Math.sin(a) * Math.cos(orbitTilt);
          const oz = baseRadius * sputnikOrbitRadius * Math.sin(a) * Math.sin(orbitTilt);

          // Rotate orbit points with the camera
          const ox1 = ox * Math.cos(rotY) + oz * Math.sin(rotY);
          const oy1 = oy;
          const oz1 = -ox * Math.sin(rotY) + oz * Math.cos(rotY);

          const ox2 = ox1;
          const oy2 = oy1 * Math.cos(rotX) - oz1 * Math.sin(rotX);
          const oz2 = oy1 * Math.sin(rotX) + oz1 * Math.cos(rotX);

          const px = cx + ox2 * zoom;
          const py = cy - oy2 * zoom;

          if (oz2 > 0) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * sputnikFade})`;
            if (firstSputnikPt) {
              ctx.moveTo(px, py);
              firstSputnikPt = false;
            } else {
              ctx.lineTo(px, py);
            }
          } else {
            firstSputnikPt = true; // break path across back side
          }
        }
        ctx.stroke();

        // 2. Compute Sputnik Current Position
        const sx = baseRadius * sputnikOrbitRadius * Math.cos(sputnikAngle);
        const sy = baseRadius * sputnikOrbitRadius * Math.sin(sputnikAngle) * Math.cos(orbitTilt);
        const sz = baseRadius * sputnikOrbitRadius * Math.sin(sputnikAngle) * Math.sin(orbitTilt);

        // Camera rotate
        const sx1 = sx * Math.cos(rotY) + sz * Math.sin(rotY);
        const sy1 = sy;
        const sz1 = -sx * Math.sin(rotY) + sz * Math.cos(rotY);

        const sx2 = sx1;
        const sy2 = sy1 * Math.cos(rotX) - sz1 * Math.sin(rotX);
        const sz2 = sy1 * Math.sin(rotX) + sz1 * Math.cos(rotX);

        const spx = cx + sx2 * zoom;
        const spy = cy - sy2 * zoom;
        const isSputnikFront = sz2 > 0;

        // Maintain Sputnik History for trail
        sputnikHistory.push({ x: spx, y: spy, opacity: (isSputnikFront ? 1.0 : 0.2) * sputnikFade });
        if (sputnikHistory.length > 35) {
          sputnikHistory.shift();
        }

        // Draw glowing gradient trail
        if (sputnikHistory.length > 1) {
          ctx.beginPath();
          ctx.moveTo(sputnikHistory[0].x, sputnikHistory[0].y);
          for (let i = 1; i < sputnikHistory.length; i++) {
            ctx.lineTo(sputnikHistory[i].x, sputnikHistory[i].y);
          }
          const trailGrad = ctx.createLinearGradient(
            sputnikHistory[0].x, sputnikHistory[0].y,
            sputnikHistory[sputnikHistory.length - 1].x, sputnikHistory[sputnikHistory.length - 1].y
          );
          trailGrad.addColorStop(0, "rgba(255, 184, 0, 0)");
          trailGrad.addColorStop(1, `rgba(255, 184, 0, ${0.4 * sputnikFade})`);
          ctx.strokeStyle = trailGrad;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Draw Sputnik satellite body & antennae
        ctx.save();
        ctx.globalAlpha = (isSputnikFront ? 1.0 : 0.25) * sputnikFade;
        
        // Draw 4 antennae lines pointing backwards (opposite to orbit tangent)
        const tangentAngle = sputnikAngle + Math.PI / 2;
        const tax = Math.cos(tangentAngle);
        const tay = Math.sin(tangentAngle) * Math.cos(orbitTilt);
        // Project tangent direction
        const taxRot = tax * Math.cos(rotY);
        const tayRot = tay * Math.cos(rotX);
        const antLen = 14;

        ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
        ctx.lineWidth = 0.8;
        
        // Antenna 1
        ctx.beginPath();
        ctx.moveTo(spx, spy);
        ctx.lineTo(spx - taxRot * antLen - 4, spy + tayRot * antLen - 4);
        ctx.stroke();

        // Antenna 2
        ctx.beginPath();
        ctx.moveTo(spx, spy);
        ctx.lineTo(spx - taxRot * antLen + 4, spy + tayRot * antLen + 4);
        ctx.stroke();

        // Antenna 3
        ctx.beginPath();
        ctx.moveTo(spx, spy);
        ctx.lineTo(spx - taxRot * (antLen * 1.3) - 2, spy + tayRot * (antLen * 1.3) + 2);
        ctx.stroke();

        // Antenna 4
        ctx.beginPath();
        ctx.moveTo(spx, spy);
        ctx.lineTo(spx - taxRot * (antLen * 0.8) + 2, spy + tayRot * (antLen * 0.8) - 2);
        ctx.stroke();

        // Draw Sputnik core body (polished silver bead)
        const coreGlow = ctx.createRadialGradient(spx - 1.5, spy - 1.5, 0.5, spx, spy, 4);
        coreGlow.addColorStop(0, "#ffffff");
        coreGlow.addColorStop(0.3, "#FFB800");
        coreGlow.addColorStop(1, "#9a6c00");
        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(spx, spy, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // 3. Draw radio-wave transmission pulses (expanding rings)
        if (isSputnikFront) {
          const pulseOffset = (Date.now() * 0.001) % 1.5;
          ctx.strokeStyle = `rgba(255, 184, 0, ${Math.max(0, (0.7 - pulseOffset / 1.5) * sputnikFade)})`;
          ctx.lineWidth = 1;
          
          ctx.beginPath();
          ctx.arc(spx, spy, pulseOffset * 30, 0, Math.PI * 2);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(spx, spy, ((pulseOffset + 0.5) % 1.5) * 30, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, reduce, progress]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[500vh] bg-[#030308]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center">
        
        {/* Subtle Ambient Space stars in background */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(255,184,0,0.015)_0%,transparent_80%] pointer-events-none z-0" />
        
        {/* ------------------------------------------------------------- */}
        {/* CANVAS: 3D Globe & Sputnik */}
        {/* ------------------------------------------------------------- */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* SCENE 1: Sputnik 1957 (0.00 - 0.22) */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: scene1Opacity, y: scene1Y }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-between py-20 px-6 max-w-7xl mx-auto pointer-events-none"
        >
          {/* Section Chapter indicator */}
          <div className="text-center">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#FFB800] uppercase mb-3 block opacity-60">
              Chapter II
            </span>
            <h2 className="text-sm font-mono tracking-widest text-white/40 uppercase">
              Where It All Began
            </h2>
          </div>

          {/* Large Typography reveal */}
          <div className="text-center max-w-3xl my-auto">
            <h3 className="text-5xl md:text-7xl font-extralight tracking-tight text-white leading-none mb-6">
              1957.
            </h3>
            <p className="text-xl md:text-2xl font-extralight text-white/70 tracking-wide max-w-xl mx-auto leading-relaxed">
              Humanity entered the Space Age.
            </p>
          </div>

          {/* Archival Box showing Sputnik 1 B&W visual */}
          <motion.div
            style={{ opacity: archivalOpacity, scale: archivalScale }}
            className="w-full max-w-[280px] bg-[#090912]/80 border border-white/10 rounded-xl p-3 flex flex-col gap-3 backdrop-blur-md shadow-2xl relative"
          >
            {/* Film Grain effect overlay */}
            <div className="absolute inset-0 rounded-xl pointer-events-none z-10 bg-repeat opacity-[0.04] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
            
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-black border border-white/5">
              <Image
                src="/sputnik_archive.png"
                alt="Sputnik 1 Orbiting Earth - 1957 Archival B&W photo"
                fill
                sizes="280px"
                className="object-cover grayscale brightness-[0.8] contrast-[1.3] pointer-events-none"
              />
            </div>
            <div className="font-mono text-[9px] tracking-wider text-white/50 flex justify-between items-center">
              <span className="text-[#FFB800] font-bold">SPUTNIK 1</span>
              <span>OCTOBER 4, 1957</span>
            </div>
          </motion.div>
        </motion.div>


        {/* ------------------------------------------------------------- */}
        {/* SCENE 2: Vikram Sarabhai (0.22 - 0.44) */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: scene2Opacity }}
          className="absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-between px-6 md:px-20 max-w-7xl mx-auto pointer-events-none"
        >
          {/* Scientific sketches layered behind Vikram Sarabhai portrait */}
          <motion.div
            style={{ y: sketchesY }}
            className="absolute inset-0 z-0 opacity-15 pointer-events-none flex items-center justify-center"
          >
            <svg 
              className="w-[120%] h-[120%] max-w-[1200px] max-h-[800px] text-[#FFB800]" 
              viewBox="0 0 1000 600" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.75"
            >
              {/* Ellipse Kepler trajectories */}
              <ellipse cx="400" cy="300" rx="350" ry="120" strokeDasharray="3, 6" />
              <ellipse cx="400" cy="300" rx="200" ry="70" />
              <line x1="400" y1="300" x2="750" y2="300" />
              <line x1="400" y1="300" x2="600" y2="420" />
              <path d="M 580 300 A 180 180 0 0 1 570 380" strokeWidth="1.5" />
              
              {/* Equations */}
              <text x="70" y="100" className="font-mono text-[9px] fill-current opacity-70">
                Δv = Isp · g₀ · ln(m₀ / mf)
              </text>
              <text x="70" y="120" className="font-mono text-[9px] fill-current opacity-70">
                T = 2π · √(a³ / GM)
              </text>
              <text x="750" y="150" className="font-mono text-[9px] fill-current opacity-70">
                dp/dt = F_thrust - F_drag - m·g
              </text>

              {/* Ionosphere atmospheric layers chart */}
              <path d="M 50 480 C 150 460, 450 490, 950 470" />
              <path d="M 50 510 C 150 490, 450 520, 950 500" strokeDasharray="4, 4" />
              <path d="M 50 540 C 150 520, 450 550, 950 530" />
              <text x="60" y="465" className="font-mono text-[8px] fill-current opacity-50">IONOSPHERE ~ 85km</text>
              <text x="60" y="495" className="font-mono text-[8px] fill-current opacity-50">MESOSPHERE ~ 50km</text>
              <text x="60" y="525" className="font-mono text-[8px] fill-current opacity-50">STRATOSPHERE ~ 12km</text>
            </svg>
          </motion.div>

          {/* Left Block: Vikram Sarabhai Portrait (Separated Layer) */}
          <motion.div
            style={{ y: portraitY }}
            className="relative w-full max-w-[280px] md:max-w-[340px] aspect-[3/4] md:ml-[35%] lg:ml-[25%] rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] z-10"
          >
            <Image
              src="/vikram_sarabhai.jpg"
              alt="Dr. Vikram Sarabhai"
              fill
              priority
              sizes="(max-w-768px) 280px, 340px"
              className="object-cover grayscale contrast-[1.2] brightness-[0.8] select-none pointer-events-none"
            />
            {/* Vignette overlays to blend nicely */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
            <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_45%,rgba(3,3,8,0.7)_100%]" />
            
            {/* Minimal Name Badge */}
            <div className="absolute bottom-6 left-6 font-sans">
              <p className="text-[10px] font-mono tracking-[0.2em] text-[#FFB800] uppercase mb-1">
                Founding Father
              </p>
              <h4 className="text-xl font-light text-white tracking-wide">
                Dr. Vikram Sarabhai
              </h4>
            </div>
          </motion.div>

          {/* Right Block: Cinematic Copy */}
          <div className="w-full md:max-w-[380px] flex flex-col gap-6 md:mr-10 text-left justify-center mt-8 md:mt-0 z-10">
            <div className="h-[1px] w-12 bg-[#FFB800]/50" />
            <p className="text-xl md:text-2xl font-extralight text-white/95 leading-relaxed">
              While the world saw rockets, one physicist saw something else.
            </p>
            <p className="text-sm md:text-base font-extralight text-white/60 leading-relaxed">
              He believed space technology could help solve India&apos;s greatest developmental challenges, bringing communication and education to the furthest villages.
            </p>
          </div>
        </motion.div>


        {/* ------------------------------------------------------------- */}
        {/* SCENE 3: The Vision (0.44 - 0.64) */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: scene3Opacity }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 max-w-4xl mx-auto pointer-events-none"
        >
          <div className="text-left md:text-center space-y-6 md:space-y-8 select-none">
            <motion.p
              style={{ opacity: quoteLine1Opacity }}
              className="text-xl md:text-2xl font-mono text-[#FFB800]/60 tracking-wider"
            >
              For Vikram Sarabhai,
            </motion.p>
            <motion.p
              style={{ opacity: quoteLine2Opacity }}
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white/90"
            >
              space was never about prestige.
            </motion.p>
            <motion.p
              style={{ opacity: quoteLine3Opacity, fontFamily: "Georgia, serif" }}
              className="text-2xl md:text-3xl font-mono italic text-[#FFB800]/80 text-left md:text-center block"
            >
              It was about development.
            </motion.p>
            
            {/* Progressive staggered terms */}
            <div className="flex flex-wrap items-center justify-start md:justify-center gap-x-6 gap-y-2 pt-4 font-mono text-sm md:text-base tracking-[0.2em] text-white/50 uppercase">
              <motion.span style={{ opacity: quoteLine4Opacity }} className="text-white">
                Communication.
              </motion.span>
              <motion.span style={{ opacity: quoteLine5Opacity }} className="text-white/80">
                Education.
              </motion.span>
              <motion.span style={{ opacity: quoteLine6Opacity }} className="text-white/60">
                Weather forecasting.
              </motion.span>
              <motion.span style={{ opacity: quoteLine7Opacity }} className="text-[#FFB800] font-bold">
                National progress.
              </motion.span>
            </div>
          </div>
        </motion.div>


        {/* ------------------------------------------------------------- */}
        {/* SCENE 4: Birth of Space Program / INCOSPAR (0.64 - 0.84) */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: scene4Opacity }}
          className="absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 max-w-7xl mx-auto pointer-events-none"
        >
          {/* Left Column: Large Archival Photo Collage of Early Struggles */}
          <div className="w-full md:w-1/2 flex items-center justify-center mt-6 md:mt-0">
            <motion.div 
              style={{ scale: mapScale }}
              className="relative w-[350px] h-[400px] md:w-[570px] md:h-[470px]"
            >
              {/* Left Polaroid - Rocket on Bicycle */}
              <motion.div
                style={{ opacity: bicycleOpacity, x: bicycleX }}
                className="absolute left-0 top-0 w-[200px] md:w-[310px] bg-[#090912]/90 border border-white/10 rounded-xl p-2 md:p-3.5 flex flex-col gap-2 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 rotate-[-4deg]"
              >
                {/* Film Grain overlay */}
                <div className="absolute inset-0 rounded-xl pointer-events-none z-10 bg-repeat opacity-[0.04] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-black border border-white/5">
                  <Image
                    src="/rocket_bicycle.png"
                    alt="Nike-Apache rocket parts on a bicycle, Thumba 1963"
                    fill
                    sizes="(max-w-768px) 200px, 310px"
                    className="object-cover grayscale brightness-[0.8] contrast-[1.2] pointer-events-none"
                  />
                </div>
                <div className="font-mono text-[7px] md:text-[9px] tracking-wider text-white/50 flex justify-between items-center">
                  <span className="text-[#FFB800] font-bold">1963 — BICYCLE TRANSIT</span>
                  <span className="text-white/40">THUMBA</span>
                </div>
                <p className="text-[7px] md:text-[9px] font-mono text-white/40 leading-relaxed">
                  Nike-Apache rocket nose cone transported by bicycle.
                </p>
              </motion.div>

              {/* Right Polaroid - Satellite on Bullock Cart */}
              <motion.div
                style={{ opacity: cartOpacity, x: cartX }}
                className="absolute right-0 bottom-0 w-[200px] md:w-[310px] bg-[#090912]/90 border border-white/10 rounded-xl p-2 md:p-3.5 flex flex-col gap-2 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-20 rotate-[4deg]"
              >
                {/* Film Grain overlay */}
                <div className="absolute inset-0 rounded-xl pointer-events-none z-10 bg-repeat opacity-[0.04] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-black border border-white/5">
                  <Image
                    src="/satellite_cart.png"
                    alt="APPLE satellite on a bullock cart for testing, 1981"
                    fill
                    sizes="(max-w-768px) 200px, 310px"
                    className="object-cover grayscale brightness-[0.8] contrast-[1.2] pointer-events-none"
                  />
                </div>
                <div className="font-mono text-[7px] md:text-[9px] tracking-wider text-white/50 flex justify-between items-center">
                  <span className="text-[#FFB800] font-bold">1981 — BULLOCK CART</span>
                  <span className="text-white/40">APPLE</span>
                </div>
                <p className="text-[7px] md:text-[9px] font-mono text-white/40 leading-relaxed">
                  APPLE satellite carried on a cart for antenna tests.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Text and timeline */}
          <div className="w-full md:w-1/2 md:max-w-md flex flex-col gap-6 text-left justify-center mt-6 md:mt-0">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#FFB800] uppercase">
              1962 — The Foundation
            </span>
            <h3 className="text-3xl md:text-4xl font-light tracking-tight text-white leading-tight">
              Indian National Committee for Space Research
            </h3>
            <p className="text-sm md:text-base font-extralight text-white/70 leading-relaxed">
              In 1962, Dr. Vikram Sarabhai and Dr. Homi J. Bhabha joined forces under the Department of Atomic Energy to establish INCOSPAR. 
            </p>
            <p className="text-xs md:text-sm font-mono text-[#FF6B00] tracking-wide leading-relaxed">
              This structural commitment consolidated India&apos;s scattered space efforts and laid the legal and operational foundations for what would later become ISRO.
            </p>
            
            {/* Timeline sequence dots */}
            <div className="flex items-center gap-4 pt-4 font-mono text-[10px] tracking-wider text-white/40">
              <span className="text-[#FFB800]">1957 Sputnik</span>
              <span>→</span>
              <span className="text-white font-semibold">1962 INCOSPAR</span>
              <span>→</span>
              <span>1963 Sounding Rocket</span>
            </div>
          </div>
        </motion.div>


        {/* ------------------------------------------------------------- */}
        {/* SCENE 5: Thumba equatorial rocket launch (0.84 - 1.0) */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: scene5Opacity }}
          className="absolute inset-0 z-20 flex flex-col justify-between py-20 px-6 max-w-7xl mx-auto pointer-events-none"
        >
          {/* Header context */}
          <div className="text-center">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#FFB800] uppercase mb-2 block">
              Scene V — Thumba Coastline
            </span>
            <h4 className="text-sm font-mono tracking-widest text-white/30 uppercase">
              November 21, 1963
            </h4>
          </div>



          {/* Interactive Coastline visual background */}
          <div className="absolute inset-0 z-0 flex flex-col justify-end pointer-events-none">
            {/* Twinkling stars */}
            <motion.div 
              style={{ opacity: starsDensity }}
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none"
            >
              {/* Twinkling Stars generated via CSS shadows */}
              <div className="absolute top-[10%] left-[20%] w-[1.5px] h-[1.5px] rounded-full bg-white/60 animate-pulse" style={{ animationDuration: "2.4s" }} />
              <div className="absolute top-[18%] left-[75%] w-[1px] h-[1px] rounded-full bg-white/40 animate-pulse" style={{ animationDuration: "3.2s" }} />
              <div className="absolute top-[28%] left-[45%] w-[2px] h-[2px] rounded-full bg-white/70 animate-pulse" style={{ animationDuration: "1.8s" }} />
              <div className="absolute top-[35%] left-[15%] w-[1px] h-[1px] rounded-full bg-white/30 animate-pulse" style={{ animationDuration: "4s" }} />
              <div className="absolute top-[40%] left-[85%] w-[1.5px] h-[1.5px] rounded-full bg-white/50 animate-pulse" style={{ animationDuration: "2.8s" }} />
            </motion.div>

            {/* Earth's Magnetic Equator Line */}
            <motion.div
              style={{ opacity: magneticEquatorOpacity }}
              className="absolute top-[35%] w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFB800]/40 to-transparent flex items-center justify-center font-mono text-[8px] tracking-[0.3em] text-[#FFB800]/70"
            >
              <span className="bg-[#030308] px-4 py-1 border border-[#FFB800]/20 rounded-full shadow-[0_0_15px_rgba(255,184,0,0.1)]">
                EARTH&apos;S MAGNETIC DIP EQUATOR
              </span>
            </motion.div>

            {/* Sounding Rocket and trajectory */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[12vh] flex flex-col items-center">
              {/* Trajectory dotted line */}
              <div className="absolute bottom-[20px] w-[1px] h-[800px] bg-gradient-to-t from-[#FFB800]/40 via-[#FFB800]/10 to-transparent border-l border-dashed border-[#FFB800]/30" />

              {/* Minimalist Sounding Rocket */}
              <motion.div 
                style={{ y: rocketY }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Nike-Apache sounding rocket mockup shape */}
                <div className="w-[3px] h-[36px] bg-white rounded-t-sm shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                <div className="w-[9px] h-[1px] bg-[#FFB800]" />
                
                {/* Rocket fins */}
                <div className="w-[11px] h-[4px] bg-[#FFB800] rounded-b-sm" />
                
                {/* Subtly glowing tail smoke (no fire/explosions, purely structural trail) */}
                <div className="w-[1px] h-[22px] bg-gradient-to-b from-[#FFB800]/60 to-transparent mt-0.5" />
              </motion.div>
            </div>

            {/* Ocean Waves and Palm Trees silhouettes */}
            <svg 
              className="w-full h-[22vh] min-h-[140px] text-[#050510]" 
              viewBox="0 0 1440 200" 
              fill="currentColor"
              preserveAspectRatio="none"
            >
              {/* First Ocean Wave layer */}
              <motion.path 
                style={{ x: oceanWaveOffset }}
                d="M0,130 C320,110 440,150 720,130 C1000,110 1120,150 1440,130 L1440,200 L0,200 Z" 
                fill="rgba(5, 5, 20, 0.7)"
              />
              
              {/* Second Ocean Wave layer (Offset) */}
              <path 
                d="M0,150 C240,170 480,130 720,150 C960,170 1200,130 1440,150 L1440,200 L0,200 Z" 
                fill="#04040a"
              />

              {/* Left Palm Trees silhouette path */}
              <path 
                d="M 50,200 Q 65,160 55,100 Q 30,105 15,115 M 55,100 Q 75,98 90,110 M 55,100 Q 58,78 45,70 M 55,100 Q 62,80 72,75 M 55,100 Q 40,88 30,95 M 55,100 Q 70,88 80,95
                   M 110,200 Q 120,170 115,120 Q 90,122 80,130 M 115,120 Q 130,118 140,128 M 115,120 Q 118,102 108,95 M 115,120 Q 122,104 130,100 Z"
                fill="#020205"
              />
              
              {/* Right Palm Trees silhouette path */}
              <path 
                d="M 1320,200 Q 1310,165 1315,110 Q 1290,112 1280,120 M 1315,110 Q 1330,108 1400,118 M 1315,110 Q 1318,92 1308,85 M 1315,110 Q 1322,94 1330,90 Z"
                fill="#020205"
              />
            </svg>
          </div>

          {/* Editorial narration */}
          <div className="relative z-10 w-full flex flex-col md:flex-row items-end justify-between gap-8 mt-auto mb-[25vh]">
            <div className="max-w-md text-left">
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#FFB800] uppercase mb-3 block">
                Magnetic Equator Advantage
              </span>
              <p className="text-xl md:text-2xl font-extralight text-white leading-relaxed">
                Near the magnetic equator, India built its first launch site.
              </p>
            </div>
            
            <div className="max-w-md text-left bg-gradient-to-t from-[#030308]/90 to-transparent p-4 rounded-lg md:border-l md:border-[#FFB800]/20 md:pl-6">
              <h5 className="font-mono text-xs text-[#FFB800] tracking-wider uppercase mb-1">
                Thumba Equatorial Rocket Launching Station
              </h5>
              <p className="text-xs font-mono text-white/55 leading-relaxed">
                21 November 1963: A small Nike-Apache sounding rocket rose into the Kerala night sky, leaving a glowing trail that marked the official birth of India&apos;s journey into the cosmos.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
