"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

interface OrbitsIllustrationProps {
  active: boolean;
}

// 3D coordinate projection helper
interface Point3D {
  x: number;
  y: number;
  z: number;
  phi?: number;
}

const project3D = (radius: number, phi: number, pitch: number, roll: number, yaw: number): Point3D => {
  // 1. Position in orbit plane (Z is 0 initially)
  const x = radius * Math.cos(phi);
  const y = radius * Math.sin(phi);
  const z = 0;

  // 2. Rotate around X (pitch)
  const px = (pitch * Math.PI) / 180;
  const x1 = x;
  const y1 = y * Math.cos(px) - z * Math.sin(px);
  const z1 = y * Math.sin(px) + z * Math.cos(px);

  // 3. Rotate around Y (yaw)
  const py = (yaw * Math.PI) / 180;
  const x2 = x1 * Math.cos(py) + z1 * Math.sin(py);
  const y2 = y1;
  const z2 = -x1 * Math.sin(py) + z1 * Math.cos(py);

  // 4. Rotate around Z (roll)
  const pz = (roll * Math.PI) / 180;
  const x3 = x2 * Math.cos(pz) - y2 * Math.sin(pz);
  const y3 = x2 * Math.sin(pz) + y2 * Math.cos(pz);
  const z3 = z2;

  return { x: x3, y: y3, z: z3, phi };
};

export function OrbitsIllustration({ active }: OrbitsIllustrationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Satellite element references to update their positions directly in the DOM for maximum performance
  const leoSatRef = useRef<HTMLDivElement>(null);
  const polarSatRef = useRef<HTMLDivElement>(null);
  const geoSatRef = useRef<HTMLDivElement>(null);

  // Sparkle / energy pulse state using SVG strokeDashoffset
  const leoPulseRef = useRef<SVGPathElement>(null);
  const polarPulseRef = useRef<SVGPathElement>(null);
  const geoPulseRef = useRef<SVGPathElement>(null);

  // Polar SSO orbit golden glow trail element
  const polarGlowRef = useRef<SVGPathElement>(null);

  // LEO trail path element
  const leoTrailRef = useRef<SVGPathElement>(null);

  // GEO communication pulse line & dot
  const geoPulseLineRef = useRef<SVGLineElement>(null);
  const geoPulseDotRef = useRef<SVGCircleElement>(null);

  // Camera drift state
  const cameraRef = useRef<HTMLDivElement>(null);

  // Local state for depth sorting (React controls which DOM branch LEO/Polar/GEO sits in)
  const [leoIsFront, setLeoIsFront] = useState(true);
  const [polarIsFront, setPolarIsFront] = useState(true);
  const [geoIsFront, setGeoIsFront] = useState(true);

  // Orbit Geometry Parameters (calibrated to match the static image composition perfectly)
  const earthRadius = 120; // 240px diameter

  const orbits = {
    leo: { radius: 152, pitch: 74, roll: -9, yaw: 0 },
    polar: { radius: 168, pitch: 20, roll: -76, yaw: 12 },
    geo: { radius: 380, pitch: 78, roll: -2, yaw: 0 }
  };

  // Generate orbit path points
  const getOrbitPoints = (radius: number, pitch: number, roll: number, yaw: number, steps = 120) => {
    const pts = [];
    for (let i = 0; i <= steps; i++) {
      const phi = (i / steps) * Math.PI * 2;
      pts.push(project3D(radius, phi, pitch, roll, yaw));
    }
    return pts;
  };

  const leoPoints = getOrbitPoints(orbits.leo.radius, orbits.leo.pitch, orbits.leo.roll, orbits.leo.yaw);
  const polarPoints = getOrbitPoints(orbits.polar.radius, orbits.polar.pitch, orbits.polar.roll, orbits.polar.yaw);
  const geoPoints = getOrbitPoints(orbits.geo.radius, orbits.geo.pitch, orbits.geo.roll, orbits.geo.yaw);

  // Helper to generate SVG path string
  const getSvgPathString = (points: Point3D[]) => {
    return `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ") + " Z";
  };

  // Generate foreground path (drawn in front of Earth where z >= -2px)
  const getForegroundPathString = (points: Point3D[]) => {
    const segments: Point3D[][] = [];
    let currentSegment: Point3D[] = [];
    const doubledPoints = [...points, ...points]; // duplicate to handle circular wrapping

    for (let i = 0; i < doubledPoints.length; i++) {
      const p = doubledPoints[i];
      if (p.z >= -2) {
        currentSegment.push(p);
      } else {
        if (currentSegment.length > 0) {
          if (currentSegment.length <= points.length) {
            segments.push(currentSegment);
          }
          currentSegment = [];
        }
      }
    }
    if (currentSegment.length > 0 && currentSegment.length <= points.length) {
      segments.push(currentSegment);
    }

    return segments.map(seg => {
      if (seg.length === 0) return "";
      return `M ${seg[0].x} ${seg[0].y} ` + seg.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ");
    }).join(" ");
  };

  const leoPath = getSvgPathString(leoPoints);
  const polarPath = getSvgPathString(polarPoints);
  const geoPath = getSvgPathString(geoPoints);

  const leoForegroundPath = getForegroundPathString(leoPoints);
  const polarForegroundPath = getForegroundPathString(polarPoints);
  const geoForegroundPath = getForegroundPathString(geoPoints);

  // Twinkling stars generation
  const [stars] = useState(() => {
    const list = [];
    for (let i = 0; i < 120; i++) {
      list.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 2
      });
    }
    return list;
  });

  // Floating dust particles
  const [dust] = useState(() => {
    const list = [];
    for (let i = 0; i < 15; i++) {
      list.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.05,
        speedY: (Math.random() - 0.5) * 0.05
      });
    }
    return list;
  });

  useEffect(() => {
    if (!active) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const animateOrbits = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) / 1000; // time in seconds

      // Loop duration is 24 seconds
      const loopTime = elapsed % 24;

      // 1. Earth & Clouds Rotation (subtle west-to-east sliding)
      if (earthRef.current) {
        // earth rotates once in 24s. equirectangular map slides horizontally.
        const earthPos = -(loopTime / 24) * 100;
        earthRef.current.style.backgroundPositionX = `${earthPos}%`;
      }
      if (cloudsRef.current) {
        // clouds slide slightly faster (loop in 20s) for a nice parallax effect
        const cloudsPos = -(loopTime / 20) * 100;
        cloudsRef.current.style.backgroundPositionX = `${cloudsPos}%`;
      }

      // 2. Camera cinematic drift and zoom (2-3px translation, 3% scale zoom over 24s loop)
      if (cameraRef.current) {
        const driftX = Math.sin(loopTime * (Math.PI * 2 / 24)) * 2;
        const driftY = Math.cos(loopTime * (Math.PI * 2 / 24)) * 1.5;
        const zoom = 1.0 + (Math.sin(loopTime * (Math.PI / 24)) * 0.015); // zoom in then out slowly
        cameraRef.current.style.transform = `translate3d(${driftX}px, ${driftY}px, 0) scale(${zoom})`;
      }

      // 3. LEO Satellite Position (orbits once every 8s)
      const phiLEO = (loopTime / 8) * Math.PI * 2;
      const pLEO = project3D(orbits.leo.radius, phiLEO, orbits.leo.pitch, orbits.leo.roll, orbits.leo.yaw);
      
      // Calculate tangent angle for rotation alignment
      const pLEONext = project3D(orbits.leo.radius, phiLEO + 0.01, orbits.leo.pitch, orbits.leo.roll, orbits.leo.yaw);
      const angleLEO = Math.atan2(pLEONext.y - pLEO.y, pLEONext.x - pLEO.x);

      if (leoSatRef.current) {
        leoSatRef.current.style.transform = `translate3d(${pLEO.x}px, ${pLEO.y}px, 0) rotate(${angleLEO}rad)`;
      }
      setLeoIsFront(pLEO.z >= -2);

      // LEO Motion Trail (drawn as a trailing SVG path from phiLEO - 0.4 to phiLEO)
      if (leoTrailRef.current) {
        const trailPts = [];
        const trailSteps = 15;
        for (let i = 0; i <= trailSteps; i++) {
          const trailPhi = phiLEO - (i / trailSteps) * 0.5;
          trailPts.push(project3D(orbits.leo.radius, trailPhi, orbits.leo.pitch, orbits.leo.roll, orbits.leo.yaw));
        }
        leoTrailRef.current.setAttribute("d", getSvgPathString(trailPts));
      }

      // 4. Polar Satellite Position (orbits once every 12s)
      const phiPolar = (loopTime / 12) * Math.PI * 2;
      const pPolar = project3D(orbits.polar.radius, phiPolar, orbits.polar.pitch, orbits.polar.roll, orbits.polar.yaw);
      
      const pPolarNext = project3D(orbits.polar.radius, phiPolar + 0.01, orbits.polar.pitch, orbits.polar.roll, orbits.polar.yaw);
      const anglePolar = Math.atan2(pPolarNext.y - pPolar.y, pPolarNext.x - pPolar.x);

      if (polarSatRef.current) {
        polarSatRef.current.style.transform = `translate3d(${pPolar.x}px, ${pPolar.y}px, 0) rotate(${anglePolar}rad)`;
      }
      setPolarIsFront(pPolar.z >= -2);

      // Polar Orbit Golden Glow Trail (localized glow around the satellite)
      if (polarGlowRef.current) {
        const glowPts = [];
        const glowSteps = 20;
        for (let i = 0; i <= glowSteps; i++) {
          const glowPhi = phiPolar - (i / glowSteps) * 0.4;
          glowPts.push(project3D(orbits.polar.radius, glowPhi, orbits.polar.pitch, orbits.polar.roll, orbits.polar.yaw));
        }
        polarGlowRef.current.setAttribute("d", getSvgPathString(glowPts));
      }

      // 5. GEO Satellite Position (fixed relative to Earth's rotation = 24s period)
      // Stationary above the center point on Earth, which revolves in 24 seconds.
      const phiGEO = (loopTime / 24) * Math.PI * 2 + Math.PI * 0.15; // Offset slightly to align with the original mockup
      const pGEO = project3D(orbits.geo.radius, phiGEO, orbits.geo.pitch, orbits.geo.roll, orbits.geo.yaw);
      
      const pGEONext = project3D(orbits.geo.radius, phiGEO + 0.01, orbits.geo.pitch, orbits.geo.roll, orbits.geo.yaw);
      const angleGEO = Math.atan2(pGEONext.y - pGEO.y, pGEONext.x - pGEO.x);

      if (geoSatRef.current) {
        geoSatRef.current.style.transform = `translate3d(${pGEO.x}px, ${pGEO.y}px, 0) rotate(${angleGEO}rad)`;
      }
      setGeoIsFront(pGEO.z >= -2);

      // GEO Communication Pulse (orange wave propagating towards the Earth's surface)
      // Pulse fires every 3 seconds:
      const pulsePeriod = 3;
      const pulseTime = elapsed % pulsePeriod;
      const pulseProgress = pulseTime / pulsePeriod; // 0 to 1

      if (geoPulseLineRef.current && geoPulseDotRef.current) {
        // Target surface point is on the Earth sphere directly below the GEO satellite
        // (which lies on the ray from center to GEO satellite, at Earth radius)
        const geoDist = Math.sqrt(pGEO.x * pGEO.x + pGEO.y * pGEO.y + pGEO.z * pGEO.z);
        const surfaceRatio = earthRadius / geoDist;
        const pSurface = {
          x: pGEO.x * surfaceRatio,
          y: pGEO.y * surfaceRatio,
          z: pGEO.z * surfaceRatio
        };

        geoPulseLineRef.current.setAttribute("x1", `${pGEO.x}`);
        geoPulseLineRef.current.setAttribute("y1", `${pGEO.y}`);
        geoPulseLineRef.current.setAttribute("x2", `${pSurface.x}`);
        geoPulseLineRef.current.setAttribute("y2", `${pSurface.y}`);

        // Dot travels along this line
        const dotX = pGEO.x + (pSurface.x - pGEO.x) * pulseProgress;
        const dotY = pGEO.y + (pSurface.y - pGEO.y) * pulseProgress;
        geoPulseDotRef.current.setAttribute("cx", `${dotX}`);
        geoPulseDotRef.current.setAttribute("cy", `${dotY}`);
        
        // Fade out as it nears Earth
        const opacity = Math.max(0, 1 - pulseProgress) * (pGEO.z >= -2 ? 1 : 0.2); // dimmer if behind Earth
        geoPulseDotRef.current.setAttribute("opacity", `${opacity}`);
        geoPulseLineRef.current.setAttribute("opacity", `${opacity * 0.15}`);
      }

      // 6. Slowly traveling energy pulses on the static orbit lines (dashOffset)
      const pulseSpeed = elapsed * 50;
      if (leoPulseRef.current) {
        leoPulseRef.current.style.strokeDashoffset = `${-pulseSpeed}`;
      }
      if (polarPulseRef.current) {
        polarPulseRef.current.style.strokeDashoffset = `${-pulseSpeed * 0.8}`;
      }
      if (geoPulseRef.current) {
        geoPulseRef.current.style.strokeDashoffset = `${-pulseSpeed * 0.6}`;
      }

      requestRef.current = requestAnimationFrame(animateOrbits);
    };

    requestRef.current = requestAnimationFrame(animateOrbits);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [active]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center bg-[#030308] overflow-hidden select-none"
    >
      {/* 1. TWINKLING STARS BACKGROUND WITH PARALLAX */}
      <div className="absolute inset-0 z-0 opacity-60">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `twinkle ${star.duration}s infinite ease-in-out`,
              animationDelay: `${star.delay}s`,
              boxShadow: star.size > 1 ? "0 0 4px rgba(255, 255, 255, 0.4)" : "none"
            }}
          />
        ))}
      </div>

      {/* 2. DUST PARTICLES DRIFTING SLOWLY */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        {dust.map((d) => (
          <motion.div
            key={d.id}
            className="absolute rounded-full bg-white/40 blur-[1px]"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: `${d.size}px`,
              height: `${d.size}px`,
            }}
            animate={{
              x: [0, d.speedX * 5000],
              y: [0, d.speedY * 5000]
            }}
            transition={{
              duration: 120,
              ease: "linear",
              repeat: Infinity
            }}
          />
        ))}
      </div>

      {/* CAMERA INNER CONTAINER FOR DRFT/ZOOM */}
      <div 
        ref={cameraRef}
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out z-10"
      >
        {/* Subtle grid pattern behind the Earth */}
        <div className="absolute w-[800px] h-[800px] bg-grid-pattern opacity-[0.015] pointer-events-none rounded-full" />

        {/* ================================================================= */}
        {/* BACKGROUND RENDER LAYER (Behind Earth) */}
        {/* ================================================================= */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <svg 
            viewBox="-500 -300 1000 600" 
            className="w-full h-full max-w-5xl overflow-visible filter blur-[0.3px]"
          >
            <defs>
              {/* Soft bloom filters */}
              <filter id="bloom-blue" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="bloom-yellow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="bloom-orange" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              
              {/* Gradients for orbit paths */}
              <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00a2ff" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#0055ff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00d2ff" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="yellow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffb800" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#ff8800" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="orange-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#ff3300" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ff8800" stopOpacity="0.6" />
              </linearGradient>

              {/* Satellite trail linear gradients */}
              <linearGradient id="leo-trail-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#0055ff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="polar-glow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffb800" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ffb800" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Static Complete Orbit Paths (drawn in background with lower opacity) */}
            {/* LEO (Blue) */}
            <path
              d={leoPath}
              fill="none"
              stroke="url(#blue-gradient)"
              strokeWidth="1.2"
              opacity="0.8"
              filter="url(#bloom-blue)"
            />
            {/* Polar SSO (Yellow) */}
            <path
              d={polarPath}
              fill="none"
              stroke="url(#yellow-gradient)"
              strokeWidth="1.0"
              strokeDasharray="4 4"
              opacity="0.55"
              filter="url(#bloom-yellow)"
            />
            {/* GEO (Orange) */}
            <path
              d={geoPath}
              fill="none"
              stroke="url(#orange-gradient)"
              strokeWidth="1.2"
              opacity="0.65"
              filter="url(#bloom-orange)"
            />

            {/* Traveling energy sparks along the orbits */}
            <path
              ref={leoPulseRef}
              d={leoPath}
              fill="none"
              stroke="#00d2ff"
              strokeWidth="1.8"
              strokeDasharray="15 300"
              opacity="0.9"
              filter="url(#bloom-blue)"
            />
            <path
              ref={polarPulseRef}
              d={polarPath}
              fill="none"
              stroke="#ffb800"
              strokeWidth="1.5"
              strokeDasharray="25 400"
              opacity="0.85"
              filter="url(#bloom-yellow)"
            />
            <path
              ref={geoPulseRef}
              d={geoPath}
              fill="none"
              stroke="#ff6b00"
              strokeWidth="2.0"
              strokeDasharray="35 800"
              opacity="0.9"
              filter="url(#bloom-orange)"
            />

            {/* LEO Satellite motion trail (when satellite is in background) */}
            {!leoIsFront && (
              <path
                ref={leoTrailRef}
                fill="none"
                stroke="url(#leo-trail-grad)"
                strokeWidth="2.5"
                opacity="0.8"
                filter="url(#bloom-blue)"
              />
            )}

            {/* Polar satellite golden glow (when satellite is in background) */}
            {!polarIsFront && (
              <path
                ref={polarGlowRef}
                fill="none"
                stroke="url(#polar-glow-grad)"
                strokeWidth="3.0"
                opacity="0.9"
                filter="url(#bloom-yellow)"
              />
            )}

            {/* GEO satellite communication pulse line (when GEO is in background) */}
            {!geoIsFront && (
              <>
                <line ref={geoPulseLineRef} stroke="#ff6b00" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle ref={geoPulseDotRef} r="4" fill="#ff6b00" filter="url(#bloom-orange)" />
              </>
            )}
          </svg>
        </div>

        {/* SATELLITES BACKGROUND CONTAINER (Rendered behind Earth) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-15">
          {/* LEO Satellite (Background) */}
          {!leoIsFront && (
            <div ref={leoSatRef} className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 opacity-70">
              <div className="w-1.5 h-1.5 bg-[#00d2ff] rounded-full shadow-[0_0_8px_#00d2ff]" />
            </div>
          )}

          {/* Polar Satellite (Background) */}
          {!polarIsFront && (
            <div ref={polarSatRef} className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 opacity-75">
              <div className="w-2 h-2 bg-[#ffb800] rounded-full shadow-[0_0_8px_#ffb800]" />
            </div>
          )}

          {/* GEO Satellite (Background) */}
          {!geoIsFront && (
            <div ref={geoSatRef} className="absolute w-7 h-7 -translate-x-1/2 -translate-y-1/2 opacity-65">
              <div className="w-3 h-2 bg-[#ff6b00] rounded-sm shadow-[0_0_10px_#ff6b00]" />
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* CENTRAL EARTH SYSTEM */}
        {/* ================================================================= */}
        <div className="absolute z-20 w-[240px] h-[240px] flex items-center justify-center">
          
          {/* Atmospheric Glow (Outer) - Soft blue pulse */}
          <div 
            className="absolute w-[246px] h-[246px] rounded-full pointer-events-none transition-all duration-1000"
            style={{
              background: "transparent",
              boxShadow: "0 0 50px rgba(0, 162, 255, 0.45), inset 0 0 20px rgba(0, 162, 255, 0.2)",
              animation: "atmosphereGlow 8s infinite ease-in-out"
            }}
          />

          {/* Sunlight Bloom - Soft white/cyan crescent rim light on the upper-left edge */}
          <div 
            className="absolute w-[241px] h-[241px] rounded-full pointer-events-none mix-blend-screen opacity-90 z-21"
            style={{
              background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7) 0%, rgba(0,162,255,0.3) 25%, transparent 60%)",
            }}
          />

          {/* Masked Earth Sphere */}
          <div 
            className="relative w-[240px] h-[240px] rounded-full overflow-hidden border border-white/10 z-20 shadow-2xl"
          >
            {/* Sliding Landmass Surface Layer */}
            <div 
              ref={earthRef}
              className="absolute inset-0 bg-cover bg-repeat-x grayscale-[15%] saturate-[110%] brightness-[1.05]"
              style={{
                backgroundImage: "url('/earth_map.jpg')",
                backgroundSize: "auto 100%",
                willChange: "background-position"
              }}
            />

            {/* Sliding Clouds Layer */}
            <div 
              ref={cloudsRef}
              className="absolute inset-0 bg-cover bg-repeat-x opacity-45 mix-blend-screen pointer-events-none"
              style={{
                backgroundImage: "url('/earth_clouds.png')",
                backgroundSize: "auto 100%",
                willChange: "background-position"
              }}
            />

            {/* 3D Sphere Specular Shadow Overlay (Terminator / Shadow side) */}
            <div 
              className="absolute inset-0 pointer-events-none z-22"
              style={{
                background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.92) 80%)",
              }}
            />
          </div>
        </div>

        {/* ================================================================= */}
        {/* FOREGROUND RENDER LAYER (In Front of Earth) */}
        {/* ================================================================= */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <svg 
            viewBox="-500 -300 1000 600" 
            className="w-full h-full max-w-5xl overflow-visible filter blur-[0.2px]"
          >
            {/* Render foreground segments of orbits with glow (bloom) */}
            {/* LEO Foreground */}
            <path
              d={leoForegroundPath}
              fill="none"
              stroke="#00d2ff"
              strokeWidth="1.6"
              opacity="0.95"
              filter="url(#bloom-blue)"
            />
            {/* Polar SSO Foreground */}
            <path
              d={polarForegroundPath}
              fill="none"
              stroke="#ffb800"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              opacity="0.9"
              filter="url(#bloom-yellow)"
            />
            {/* GEO Foreground */}
            <path
              d={geoForegroundPath}
              fill="none"
              stroke="#ff6b00"
              strokeWidth="1.8"
              opacity="0.85"
              filter="url(#bloom-orange)"
            />

            {/* LEO Satellite motion trail (when in foreground) */}
            {leoIsFront && (
              <path
                ref={leoTrailRef}
                fill="none"
                stroke="url(#leo-trail-grad)"
                strokeWidth="2.5"
                opacity="0.95"
                filter="url(#bloom-blue)"
              />
            )}

            {/* Polar satellite golden glow (when in foreground) */}
            {polarIsFront && (
              <path
                ref={polarGlowRef}
                fill="none"
                stroke="url(#polar-glow-grad)"
                strokeWidth="3.0"
                opacity="1.0"
                filter="url(#bloom-yellow)"
              />
            )}

            {/* GEO satellite communication pulse line (when GEO is in foreground) */}
            {geoIsFront && (
              <>
                <line ref={geoPulseLineRef} stroke="#ff6b00" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle ref={geoPulseDotRef} r="4.5" fill="#ff8800" filter="url(#bloom-orange)" />
              </>
            )}
          </svg>
        </div>

        {/* SATELLITES FOREGROUND CONTAINER (Rendered in front of Earth) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-35">
          
          {/* LEO Satellite (Foreground) */}
          {leoIsFront && (
            <div ref={leoSatRef} className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
              {/* Premium detailed satellite vector */}
              <svg viewBox="0 0 24 24" className="w-full h-full text-[#00d2ff]">
                {/* Solar panels */}
                <rect x="2" y="10" width="6" height="4" rx="0.5" fill="#0055ff" stroke="#00d2ff" strokeWidth="0.8" />
                <rect x="16" y="10" width="6" height="4" rx="0.5" fill="#0055ff" stroke="#00d2ff" strokeWidth="0.8" />
                {/* Connector trusses */}
                <line x1="8" y1="12" x2="16" y2="12" stroke="#00d2ff" strokeWidth="1.5" />
                {/* Central body */}
                <rect x="10" y="8" width="4" height="8" rx="1" fill="#030308" stroke="#00d2ff" strokeWidth="1.0" />
                {/* High gain dish antenna */}
                <path d="M 12 16 L 12 19 M 10 19 L 14 19" stroke="#00d2ff" strokeWidth="0.8" />
              </svg>
              {/* Blinking Navigation Light */}
              <span className="absolute left-[50%] top-[30%] flex h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00d2ff]"></span>
              </span>
            </div>
          )}

          {/* Polar Sun-Synchronous Satellite (Foreground) */}
          {polarIsFront && (
            <div ref={polarSatRef} className="absolute w-9 h-9 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
              <svg viewBox="0 0 24 24" className="w-full h-full text-[#ffb800]">
                {/* Solar panels (angled) */}
                <rect x="1" y="9" width="7" height="4.5" rx="0.5" transform="rotate(-10 4.5 11.25)" fill="#b88600" stroke="#ffb800" strokeWidth="0.8" />
                <rect x="16" y="9" width="7" height="4.5" rx="0.5" transform="rotate(10 19.5 11.25)" fill="#b88600" stroke="#ffb800" strokeWidth="0.8" />
                <line x1="8" y1="11.5" x2="16" y2="11.5" stroke="#ffb800" strokeWidth="1.5" />
                {/* Hexagonal Core Body */}
                <polygon points="12,5 15,8 15,15 12,18 9,15 9,8" fill="#030308" stroke="#ffb800" strokeWidth="1.2" />
                {/* Sensor aperture */}
                <circle cx="12" cy="11.5" r="2.2" fill="#ffb800" opacity="0.3" />
                <circle cx="12" cy="11.5" r="1.0" fill="#ffb800" />
              </svg>
            </div>
          )}

          {/* GEOSTATIONARY SATELLITE (Foreground) */}
          {geoIsFront && (
            <div ref={geoSatRef} className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
              <svg viewBox="0 0 32 32" className="w-full h-full text-[#ff6b00]">
                {/* Giant multi-panel solar wings */}
                <rect x="0" y="13" width="9" height="6" rx="0.5" fill="#994400" stroke="#ff6b00" strokeWidth="0.8" />
                <line x1="3" y1="13" x2="3" y2="19" stroke="#ff6b00" strokeWidth="0.6" />
                <line x1="6" y1="13" x2="6" y2="19" stroke="#ff6b00" strokeWidth="0.6" />

                <rect x="23" y="13" width="9" height="6" rx="0.5" fill="#994400" stroke="#ff6b00" strokeWidth="0.8" />
                <line x1="26" y1="13" x2="26" y2="19" stroke="#ff6b00" strokeWidth="0.6" />
                <line x1="29" y1="13" x2="29" y2="19" stroke="#ff6b00" strokeWidth="0.6" />

                <line x1="9" y1="16" x2="23" y2="16" stroke="#ff6b00" strokeWidth="2.0" />
                {/* Heavy Sat Platform Core */}
                <rect x="11" y="10" width="10" height="12" rx="1.5" fill="#030308" stroke="#ff6b00" strokeWidth="1.5" />
                {/* Gold sensor foil texture detail */}
                <rect x="13" y="12" width="6" height="8" rx="0.5" fill="#ffb800" opacity="0.15" />
                {/* Parabolic reflector mesh antenna */}
                <path d="M 16 22 L 16 26 M 12 26 C 12 26 13 29 16 29 C 19 29 20 26 20 26" fill="none" stroke="#ff6b00" strokeWidth="1.0" />
              </svg>
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* LEADER LINES AND LABELS (Aligned perfectly to mockup) */}
        {/* ================================================================= */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-40">
          
          {/* LOW EARTH ORBIT (LEO) - LEFT */}
          <div 
            className="absolute flex items-center gap-3.5"
            style={{ left: "calc(50% - 370px)", top: "calc(50% - 75px)" }}
          >
            {/* Blue Icon container */}
            <div className="w-11 h-11 rounded-full border border-[#00d2ff]/30 bg-[#00d2ff]/5 flex items-center justify-center shadow-[0_0_15px_rgba(0,210,255,0.15)]">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#00d2ff]" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="5" y="10" width="4" height="4" rx="0.5" />
                <rect x="15" y="10" width="4" height="4" rx="0.5" />
                <line x1="9" y1="12" x2="15" y2="12" />
                <rect x="11" y="9" width="2" height="6" rx="0.5" />
                <circle cx="12" cy="12" r="0.5" fill="currentColor" />
              </svg>
            </div>
            {/* Typography */}
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold tracking-widest text-[#00d2ff]">
                LOW EARTH ORBIT (LEO)
              </span>
            </div>
            {/* Leader line pointer (connects to blue path) */}
            <svg className="absolute overflow-visible w-20 h-10 left-[180px] top-[18px]">
              <path 
                d="M 0 5 L 45 5 L 60 15" 
                fill="none" 
                stroke="#00d2ff" 
                strokeWidth="1.0" 
                strokeDasharray="2 2" 
                opacity="0.6"
              />
              <circle cx="60" cy="15" r="2.0" fill="#00d2ff" />
            </svg>
          </div>

          {/* POLAR SUN-SYNCHRONOUS ORBIT (SSO) - TOP RIGHT */}
          <div 
            className="absolute flex items-center gap-3.5 flex-row"
            style={{ left: "calc(50% + 5px)", top: "calc(50% - 215px)" }}
          >
            {/* Yellow Icon container */}
            <div className="w-11 h-11 rounded-full border border-[#ffb800]/30 bg-[#ffb800]/5 flex items-center justify-center shadow-[0_0_15px_rgba(255,184,0,0.15)]">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#ffb800]" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path d="M 12 3 C 15 3, 17 7, 17 12 C 17 17, 15 21, 12 21 C 9 21, 7 17, 7 12 C 7 7, 9 3, 12 3 Z" />
                <line x1="3" y1="12" x2="21" y2="12" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold tracking-widest text-[#ffb800]">
                POLAR SUN-SYNCHRONOUS ORBIT (SSO)
              </span>
            </div>
            {/* Leader line pointer */}
            <svg className="absolute overflow-visible w-20 h-20 left-[-42px] top-[22px]">
              <path 
                d="M 10 5 L -15 25 L -25 45" 
                fill="none" 
                stroke="#ffb800" 
                strokeWidth="1.0" 
                strokeDasharray="2 2" 
                opacity="0.6"
              />
              <circle cx="-25" cy="45" r="2.0" fill="#ffb800" />
            </svg>
          </div>

          {/* GEOSTATIONARY ORBIT (GEO) - BOTTOM RIGHT */}
          <div 
            className="absolute flex items-center gap-3.5 flex-row-reverse"
            style={{ left: "calc(50% + 80px)", top: "calc(50% + 145px)" }}
          >
            {/* Orange Icon container */}
            <div className="w-11 h-11 rounded-full border border-[#ff6b00]/30 bg-[#ff6b00]/5 flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.15)]">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#ff6b00]" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M 12 18 C 15.3 18, 18 15.3, 18 12 C 18 8.7, 15.3 6, 12 6 C 8.7 6, 6 8.7, 6 12 C 6 13.5, 6.6 14.8, 7.5 15.8" />
                <path d="M 12 14 A 2 2 0 1 0 12 10 A 2 2 0 1 0 12 14 Z" fill="currentColor" />
                <line x1="8.5" y1="18.5" x2="5.5" y2="21.5" />
                <line x1="15.5" y1="18.5" x2="18.5" y2="21.5" />
              </svg>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-mono text-xs font-bold tracking-widest text-[#ff6b00]">
                GEOSTATIONARY ORBIT (GEO)
              </span>
            </div>
            {/* Leader line pointer */}
            <svg className="absolute overflow-visible w-32 h-16 right-[15px] top-[-55px]">
              <path 
                d="M 15 0 L 15 35 L 55 45" 
                fill="none" 
                stroke="#ff6b00" 
                strokeWidth="1.0" 
                strokeDasharray="2 2" 
                opacity="0.6"
              />
              <circle cx="15" cy="0" r="2.0" fill="#ff6b00" />
            </svg>
          </div>
        </div>

      </div>

      {/* CSS KEYFRAME ANIMATIONS INJECTED DIRECTLY */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 1.0; }
        }
        @keyframes atmosphereGlow {
          0%, 100% {
            box-shadow: 0 0 45px rgba(0, 162, 255, 0.45), inset 0 0 15px rgba(0, 162, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 60px rgba(0, 162, 255, 0.65), inset 0 0 25px rgba(0, 162, 255, 0.35);
          }
        }
      `}</style>
    </div>
  );
}
