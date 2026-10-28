"use client";

import { useRef } from "react";
import { CanvasSequence } from "@/components/canvas-sequence";

export function CinematicSequenceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full border-b border-white/10 bg-[#050505] text-white"
    >
      <div className="mx-auto max-w-7xl px-6 pt-20 text-center md:px-10">
        <p className="text-xs font-semibold tracking-[0.35em] text-[#F5B041]">
          240-FRAME BLENDER CINEMATICS
        </p>
        <h2 className="mt-3 text-4xl font-bold md:text-6xl">Visceral Honey Dynamics</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/65 md:text-base">
          Scroll to scrub through 240 pre-rendered photorealistic physics frames capturing the burst,
          suspension, and viscous flow of raw honey.
        </p>
      </div>

      <div className="relative mx-auto mt-10 h-[520px] max-w-6xl overflow-hidden rounded-[26px] border border-white/15 bg-black shadow-[0_40px_100px_rgba(0,0,0,0.8)] md:h-[700px]">
        <CanvasSequence triggerSelector="#cinematic-scroll-trigger" frameCount={240} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="pointer-events-none absolute bottom-6 inset-x-0 text-center text-xs tracking-widest text-white/40">
          ↕ SCROLL TO SCRUB CINEMATIC FRAMES (1 - 240)
        </div>
      </div>

      <div id="cinematic-scroll-trigger" className="h-[90vh]" />
    </section>
  );
}
