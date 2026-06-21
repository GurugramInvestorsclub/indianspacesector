"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section
      id="overview"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden border-b border-white/10 bg-[#030308]"
    >
      {/* Background Image - Highlighted */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_background.png"
          alt="Earth horizon from orbit with sun rising"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-90 select-none pointer-events-none"
        />
        {/* Subtle top/bottom gradients to preserve navigation contrast and transition smoothly to the next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/90 via-transparent to-[#030308]" />
      </div>

      {/* Main Content - Headline Only */}
      <div className="relative z-10 mx-auto px-6 text-center max-w-7xl mt-[-4vh]">
        <h1 className="text-balance text-5xl font-black tracking-[-0.05em] uppercase text-white sm:text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.85] select-none">
          India&apos;s space <br />
          revolution
        </h1>
      </div>
    </section>
  );
}
