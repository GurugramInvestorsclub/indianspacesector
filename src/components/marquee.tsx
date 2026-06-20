"use client";

import React from "react";

export function InfiniteMarquee() {
  const brands = [
    "DHRUVA SPACE",
    "PIXXEL",
    "SKYROOT AEROSPACE",
    "AGNIKUL COSMOS",
    "BELLATRIX AEROSPACE",
    "DIGANTARA",
    "GALAXEYE SPACE",
    "SATSURE",
    "ANANTH TECHNOLOGIES",
    "MAPMYINDIA",
    "L&T SPACE",
    "IN-SPACE",
    "ISRO NSIL"
  ];

  // Duplicate the array to ensure smooth seamless looping
  const doubleBrands = [...brands, ...brands, ...brands];

  return (
    <div className="w-full bg-[#04040c]/40 border-y border-space-border/20 py-8 overflow-hidden relative select-none">
      {/* Left/Right fading edge washes */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-space-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-space-black to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex w-max animate-[marquee_45s_linear_infinite]">
        <div className="flex gap-16 text-white/30 font-mono text-xs font-bold tracking-[0.25em] items-center">
          {doubleBrands.map((brand, idx) => (
            <div key={idx} className="flex items-center gap-6">
              <span>{brand}</span>
              <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full opacity-40"></span>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translate3d(-33.3333%, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}
